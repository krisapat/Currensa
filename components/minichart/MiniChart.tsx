'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const MiniChart = ({
  symbol = 'NASDAQ:AAPL',
  width = '100%',
  height = '300',
  uniqueId = 'default',
}) => {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width,
      height,
      locale: 'en',
      dateRange: '1D',
      colorTheme: resolvedTheme === 'dark' ? 'dark' : 'light',
      isTransparent: false,
      autosize: true,
    })

    const container = document.getElementById(`tradingview-mini-chart-${uniqueId}`)
    if (container) {
      container.innerHTML = ''
      container.appendChild(script)
    }
  }, [symbol, resolvedTheme, width, height, uniqueId])

  return <div className='rounded-lg overflow-hidden' id={`tradingview-mini-chart-${uniqueId}`} />
}

export default MiniChart
