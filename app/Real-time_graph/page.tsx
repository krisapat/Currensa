import StockGrid from "@/components/realtimeGraph/Realtime"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'Currensa | Real-Time Stock Charts',
  description: 'Analyze stocks in real-time with interactive charts, live price updates, historical performance, and technical indicators — all in one intuitive dashboard for investors.',
}
const page = () => {
  return (
    <div className="mt-20 px-4 pt-4">
      <StockGrid />
    </div>
  )
}
export default page 