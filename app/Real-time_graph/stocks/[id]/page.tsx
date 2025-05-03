import { stockSymbols } from '@/utils/stockSymbols'
import AdvancedChart from '@/components/realtimeGraph/AdvancedChart'
import StockNews from '@/components/realtimeGraph/StockNews'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import { quicksand } from '@/utils/font'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const stock = stockSymbols.find((s) => s.id.toLowerCase() === id.toLowerCase())

  if (!stock) {
    return {
      title: 'Stock Not Found',
      description: 'This stock symbol was not found in our database.',
    }
  }

  return {
    title: `Currensa | ${stock.id} | Real-Time Stock Analysis`,
    description: `Analyze ${stock.id} in real-time with interactive charts, live price updates, historical performance, and technical indicators — all in one intuitive dashboard for traders and investors.`,
  }
}

export default function StockDetail({
  params,
}: {
  params: { id: string }
}) {
  const stock = stockSymbols.find(
    (s) => s.id.toLowerCase() === params.id.toLowerCase()
  )

  if (!stock) return <div className="p-4">ไม่พบข้อมูลหุ้น</div>

  return (
    <div className="h-screen pt-20 px-4">
      <div className="flex space-x-4 my-4">
        <h1 className={`${quicksand.className} text-2xl font-bold`}>
          {stock.id}
        </h1>
        <Button className="bg-white dark:bg-black/30">
          <Link href="/Real-time_graph">
            <Undo2 className="text-black dark:text-white" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <AdvancedChart
            symbol={stock.symbol}
            uniqueId={stock.id + '-detail'}
          />
        </div>
        <div className="lg:col-span-1">
          <StockNews symbol={stock.id} />
        </div>
      </div>
    </div>
  )
}
