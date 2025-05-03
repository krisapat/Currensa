'use client'

import { useEffect, useState } from 'react'

interface NewsItem {
  title: string
  description: string
  url: string
  date: string
}

export default function StockNews({ symbol }: { symbol: string }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/stock-news?symbol=${symbol}`)
        const data = await res.json()
        // Limit the news to the first 10 articles
        setNews(data.articles.slice(0, 10))
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [symbol])

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-4 rounded-xl shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Latest news about {symbol}</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : news.length === 0 ? (
        <p>No news found for {symbol}</p>
      ) : (
        <div className="space-y-4 max-h-full overflow-y-auto">
          {news.map((item, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-white/20 pb-4">
              <h3 className="text-md font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
              <p className="text-sm mt-1">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Read more...
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
