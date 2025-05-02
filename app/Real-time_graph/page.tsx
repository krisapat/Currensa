'use client'

import { useState } from 'react'
import MiniChart from "@/components/minichart/MiniChart"
import { quicksand } from "@/utils/font"
import StockFilter, { Category } from '@/components/realtimeGraph/StockFilter'
import { stockSymbols } from '@/utils/stockSymbols'
import Link from 'next/link'
export default function StockGrid() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('all')

  const filteredStocks = stockSymbols.filter((stock) => {
    const matchSearch = stock.id.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || stock.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="mt-20 px-4 pt-4">
      <StockFilter search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredStocks.map((stock) => (
          <div key={stock.id} className="p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01]
                        bg-white/30 dark:bg-white/10
                        border-white/30 dark:border-white/10
                        shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                        backdrop-blur-lg"
            >
            <Link href={`/Real-time_graph/stocks/${stock.id}`} passHref className={`${quicksand.className} text-lg mb-2 text-center font-semibold`}>{stock.id}</Link>
            <MiniChart symbol={stock.symbol} height="200" uniqueId={stock.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
