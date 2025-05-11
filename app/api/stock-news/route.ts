import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'
import NodeCache from 'node-cache'

// Cache memory 10 นาที
const stockNewsCache = new NodeCache({ stdTTL: 600 })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol') || 'AAPL'

  const cachedData = stockNewsCache.get(symbol)
  if (cachedData) {
    return NextResponse.json({ articles: cachedData })
  }

  try {
    const rssUrl = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`
    const res = await fetch(rssUrl)

    if (!res.ok) {
      console.error(`Yahoo RSS error: ${res.status} ${res.statusText}`)
      return NextResponse.json({ articles: [] }, { status: 200 }) // Return empty list gracefully
    }

    const xml = await res.text()
    const parsed = await parseStringPromise(xml, { trim: true })

    const items = parsed?.rss?.channel?.[0]?.item ?? []

    const articles = items.slice(0, 10).map((item: any) => ({
      title: item.title?.[0] ?? 'No title available',
      url: item.link?.[0] ?? '#',
      date: item.pubDate
        ? new Date(item.pubDate[0]).toLocaleString('th-TH', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        : 'No date available',
      description: item.description?.[0] ?? 'No description available',
    }))

    // Even if articles = [], cache it to avoid frequent failed requests
    stockNewsCache.set(symbol, articles)

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Unexpected error fetching Yahoo RSS:', error)
    return NextResponse.json(
      { articles: [], error: 'An error occurred while fetching the news.' },
      { status: 500 }
    )
  }
}
