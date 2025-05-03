import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import { Button } from "@/components/ui/button"
import { quicksand } from "@/utils/font"
import Link from "next/link"

const calculation = () => {
    return (
        <div className="w-full z-10 flex flex-col justify-center items-center mt-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <FadeUpWhenVisible>
                <h1 className={`${quicksand.className} text-3xl mb-2 text-center font-semibold`}>Function</h1>
            </FadeUpWhenVisible>
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
                <div
                    className="relative p-6 rounded-xl border min-h-[300px] transition-all duration-300 hover:scale-[1.01]
                      bg-white/30 dark:bg-white/10
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg"
                >
                    <h1 className={`${quicksand.className} text-2xl mb-2 text-center font-semibold`}>Calculate DCA Investment</h1>
                    <h2 className={`${quicksand.className} text-lg mb-2 text-center font-md`}>
                        Calculate the results of DCA investments
                    </h2>
                    <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Link href={'/calculation/dca'}>View features</Link>
                    </Button>
                </div>
                <div
                    className="relative p-6 rounded-xl border min-h-[300px] transition-all duration-300 hover:scale-[1.01]
                      bg-white/30 dark:bg-white/10
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg"
                >
                    <h1 className={`${quicksand.className} text-2xl mb-2 text-center font-semibold`}>Currency conversion</h1>
                    <h2 className={`${quicksand.className} text-lg mb-2 text-center font-md`}>
                        Convert currencies in real time
                    </h2>
                    <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Link href={'/calculation/currency_conversion'}>View features</Link>
                    </Button>
                </div>


                <div
                    className="relative p-6 rounded-xl border min-h-[300px] transition-all duration-300 hover:scale-[1.01]
                      bg-white/30 dark:bg-white/10
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg"
                >
                    <h1 className={`${quicksand.className} text-2xl mb-2 text-center font-semibold`}>Calculate dividends</h1>
                    <h2 className={`${quicksand.className} text-lg mb-2 text-center font-md`}>
                        Tell us the dividend you want and the system will calculate how much you need to invest
                    </h2>
                    <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <Link href={'/calculation/calculate_dividends'}>View features</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default calculation