import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
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
                    <button ref={prevRef} ></button>
                </div>
            </div>
            <Swiper>
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