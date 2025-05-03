'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const MiniChart = ({
  symbol = 'NASDAQ:AAPL',
  width = '100%',
  height = '300',
  uniqueId = 'default',
}) => {
  const { resolvedTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !resolvedTheme) return

    const container = document.getElementById(`tradingview-mini-chart-${uniqueId}`)
    if (!container) return

    container.innerHTML = '' // ล้างของเดิมก่อน
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
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

    container.appendChild(script)
  }, [symbol, resolvedTheme, width, height, uniqueId, isClient])

  return <div className="rounded-lg overflow-hidden" id={`tradingview-mini-chart-${uniqueId}`} />
}

export default MiniChart
