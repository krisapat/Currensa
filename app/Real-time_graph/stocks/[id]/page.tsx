import { stockSymbols } from '@/utils/stockSymbols'
import AdvancedChart from '@/components/minichart/AdvancedChart'
import StockNews from '@/components/minichart/StockNews'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import { quicksand } from '@/utils/font'


export default function StockDetail({ params }: { params: { id: string } }) {
  const stock = stockSymbols.find(s => s.id.toLowerCase() === params.id.toLowerCase())

  if (!stock) return <div className="p-4">ไม่พบข้อมูลหุ้น</div>

  return (
    <div className="h-screen pt-20 px-4">
      <div className="flex space-x-4 my-4">
        <h1 className={`${quicksand.className} text-2xl font-bold`}>{stock.id}</h1>
        <Button className='bg-white dark:bg-black/30'>
          <Link href={'/Real-time_graph'}><Undo2 className='text-black dark:text-white' /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* กราฟ: 3/4 บนหน้าจอใหญ่ */}
        <div className="lg:col-span-3">
          <AdvancedChart symbol={stock.symbol} uniqueId={stock.id + '-detail'} />
        </div>

        {/* ข่าว: 1/4 บน desktop, ลงล่างบน mobile */}
        <div className="lg:col-span-1">
          <StockNews symbol={stock.id} />
        </div>
      </div>
    </div>
  )
}