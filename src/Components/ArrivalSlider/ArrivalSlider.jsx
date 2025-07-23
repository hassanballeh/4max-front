import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {useRef} from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
const ArrivalSlider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const breakpoints = {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        1440: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
    }

    return (
        <div className='overflow-hidden relative p-10'>

            <div>
                <div>
                    <button ref={prevRef}><HiArrowLeftCircle size={'2.5rem'}/></button>
                </div>
                <div>
                    <button ref={nextRef}><HiArrowRightCircle size={'2.5rem'}/></button>
                </div>
            </div>
            <Swiper>
                {/* modules={{Navigation}}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }} */}
                <SwiperSlide>
                    <img src="bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" alt="arrival one"></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" alt="arrival two"></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" alt="arrival three"></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" alt="arrival four"></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" alt="arrival five"></img>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ArrivalSlider;