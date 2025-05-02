import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol') || 'AAPL'

  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=${process.env.NEWS_API_KEY}`)
    const data = await res.json()

    const articles = data.articles.map((article: any) => ({
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
    console.error("Error fetching news:", error)
    return NextResponse.json({ articles: [] }, { status: 500 })
  }
}
