'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const AdvancedChart = ({
  symbol = 'NASDAQ:AAPL',
  height = '80vh',
  uniqueId = 'advanced',
}) => {
  const { resolvedTheme } = useTheme()
  const isChartLoaded = useRef(false)

  useEffect(() => {
    const container = document.getElementById(`tradingview-advanced-chart-${uniqueId}`)
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
    if (isChartLoaded.current) {
      const existingScript = container.querySelector('script')
      if (existingScript) {
        existingScript.remove()
      }
    }

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme,
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      withdateranges: true,
      studies: ['MACD@tv-basicstudies', 'RSI@tv-basicstudies'],
      container_id: `tradingview-advanced-chart-${uniqueId}`,
    })

    container.innerHTML = ''
    container.appendChild(script)
    isChartLoaded.current = true
  }, [resolvedTheme, symbol, uniqueId])


  return (
    <div
      className="rounded-lg overflow-hidden"
      id={`tradingview-advanced-chart-${uniqueId}`}
      style={{ height }}
    />
  )
}

export default AdvancedChart
