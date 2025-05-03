import { NextResponse } from 'next/server'

interface Article {
  title: string
  description: string
  url: string
  publishedAt: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol') || 'AAPL'

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${symbol}&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
    )

    if (!res.ok) {
      console.error(`News API error: ${res.status} ${res.statusText}`)
      return NextResponse.json({ articles: [] }, { status: res.status })
    }

    const data = await res.json()

    if (!Array.isArray(data.articles)) {
      console.error("Invalid API response format:", data)
      return NextResponse.json({ articles: [] }, { status: 500 })
    }

    const articles = data.articles.map((article: Article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      date: new Date(article.publishedAt).toLocaleString('th-TH', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    }))

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Unexpected error fetching news:", error)
    return NextResponse.json({ articles: [] }, { status: 500 })
  }
}
