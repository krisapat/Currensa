
import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import MiniChartSwiper from "@/components/minichart/MiniChartSwiper"
import { Button } from "@/components/ui/button"
import { quicksand } from "@/utils/font"
import Link from "next/link"
import UseModel from '@/components/UseModel'

const page = () => {
  return (
    <div className="p-4">
      {/* 1 */}
      <div
        className="flex flex-col md:flex-row mt-20 justify-between items-center z-10
                  bg-white/30 dark:bg-white/10
                  border border-white/30 dark:border-white/10
                  backdrop-blur-md rounded-xl"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="w-full md:w-1/2 px-8">
          <h1 className={`${quicksand.className} text-3xl mb-2 text-left font-semibold`}>
            View stocks in real time<br />
            Easy analysis<br />
            All in one website
          </h1>
          <h2 className={`${quicksand.className} text-xl mb-2 text-left font-semibold`}>
            Follow real-time stock charts with news, analysis and calculation tools for investors of all levels.
          </h2>
          <Button>
            <Link href={'/Real-time_graph'}>View features</Link>
          </Button>
        </div>
        <div className="w-full md:w-1/2" style={{ height: 'calc(100vh - 80px)' }}>
          <UseModel />
        </div>
      </div>
      {/* 2 */}
      <div className="w-full z-10 flex flex-col justify-center items-center mt-9" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <FadeUpWhenVisible>
          <h1 className={`${quicksand.className} text-3xl mb-2 text-center font-semibold`}>Function</h1>
        </FadeUpWhenVisible>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div
            className="relative p-6 rounded-xl border min-h-[300px] transition-all duration-300 hover:scale-[1.01]
                      bg-white/30 dark:bg-white/10
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg"
          >
            <h1 className={`${quicksand.className} text-2xl mb-2 text-center font-semibold`}>Real-time graph</h1>
            <h2 className={`${quicksand.className} text-lg mb-2 text-center font-md`}>
              1.Track asset graphs in real time<br />
              2.There are free indicators from Trading View available<br />
              3.There are a variety of assets to look at
            </h2>
            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Link href={'/Real-time_graph'}>View features</Link>
            </Button>
          </div>


          <div
            className="relative p-6 rounded-xl border min-h-[300px] transition-all duration-300 hover:scale-[1.01]
                      bg-white/30 dark:bg-white/10
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg"
          >
            <h1 className={`${quicksand.className} text-2xl mb-2 text-center font-semibold`}>Calculation</h1>
            <h2 className={`${quicksand.className} text-lg mb-2 text-center font-md`}>
              1.Calculate DCA Investment<br />
              2.Currency conversion<br />
              3.Calculate dividends
            </h2>
            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Link href={'/calculation'}>View features</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="w-[90vw] mx-auto mt-8 z-10">
        <div className="my-auto px-8">
          <FadeUpWhenVisible>
            <h1 className={`${quicksand.className} text-3xl mb-8 text-center font-semibold`}>Recommended Stocks</h1>
            <MiniChartSwiper />
          </FadeUpWhenVisible>
        </div>
      </div>
    </div>
  )
}
export default page
