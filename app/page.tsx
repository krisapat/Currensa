
import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import MiniChartSwiper from "@/components/minichart/MiniChartSwiper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UseModel from '@/components/UseModel'
import { LineChart, Calculator } from 'lucide-react';
import { Metadata } from "next"
import { FeatureCard } from "@/components/้home/FeatureCard"
import { FunctionCard } from "@/components/้home/FunctionCard"
export const metadata: Metadata = {
  title: "Currensa | Real-Time Stock Charts & Investment Tools",
  description: "Track live stock charts, get instant financial news, and analyze trends with powerful tools — all in one smart platform for modern investors.",
};

const page = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <UseModel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
        </div>

        <FadeUpWhenVisible>
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 drop-shadow-lg">
              Plan your investments<br />with real-time stock data
            </h1>
            <p className="text-xl md:text-2xl max-w-xl mb-6">
              Currensa has all the features an investor needs — stock charts, economic news, calculators and in-depth analysis
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/Real-time_graph">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">See all features</Link>
              </Button>
            </div>
          </div>
        </FadeUpWhenVisible>
      </section>

      {/* FEATURE CARDS */}
      <section id="features" className="w-[95vw] mx-auto mt-20 py-12 px-6 rounded-xl backdrop-blur-md bg-white/50 dark:bg-white/10 border border-white/20 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-12">What can we do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <FeatureCard icon={<LineChart className="w-10 h-10 text-blue-500 mx-auto mb-4" />} title="Real-time stock chart" desc="View minute-by-minute stock price movements with indicators from TradingView." />
          <FeatureCard icon={<Calculator className="w-10 h-10 text-green-500 mx-auto mb-4" />} title="Financial calculator" desc="Calculate DCA, convert currencies and analyze dividends in a few clicks." />
        </div>
      </section>

      {/* FUNCTION SECTION */}
      <section className="w-full py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Main features of Currensa</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <FunctionCard
            title="Real-time stock chart"
            content={[
              'Follow live asset charts',
              'Free indicators from TradingView',
              'Multi-asset portfolio including stocks, crypto and indices',
            ]}
            link="/Real-time_graph"
          />
          <FunctionCard
            title="Calculating tools"
            content={[
              'Calculate DCA Investment',
              'Convert foreign currencies',
              'Calculate dividend yield',
            ]}
            link="/calculation"
          />
        </div>
      </section>

      {/* RECOMMENDED STOCKS */}
      <section className="w-full px-6 py-20 bg-gradient-to-t from-white/20 to-transparent dark:from-white/5">
        <div className="w-full h-auto bg-white/50 dark:bg-white/10 p-8 rounded-xl border border-white/20 shadow-md backdrop-blur-lg">
          <h2 className="text-3xl font-semibold text-center mb-12">Recommended stocks</h2>
          <div className="max-w-5xl mx-auto">
            <MiniChartSwiper />
          </div>
        </div>

      </section>
    </div>

  )
}
export default page
