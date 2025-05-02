'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useState } from 'react'
import MiniChart from './MiniChart'
import { quicksand } from '@/utils/font'
import { stockItems } from '@/utils/stockItemslist'

export default function RecommendedStocks() {
    const [visibleIndexes, setVisibleIndexes] = useState([0])

    const handleSlideChange = (swiper: SwiperClass) => {
        const current = swiper.realIndex
        if (!visibleIndexes.includes(current)) {
            setVisibleIndexes((prev) => [...prev, current])
        }
    }

    return (
        <div className="w-full overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                onSlideChange={handleSlideChange}
                spaceBetween={20}
                slidesPerView={1}
            >
                {stockItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            {visibleIndexes.includes(index) && (
                                <MiniChart symbol={item.symbol} height="300" uniqueId={`chart-${index}`} />
                            )}
                            <div className="pt-4 text-center">
                                <h1 className={`${quicksand.className} text-xl font-semibold`}>{item.title}</h1>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}
