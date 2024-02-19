import React, { useRef, useState } from 'react';
import corusel_img from "../../../public/coruselone.svg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Corusel.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
export default function Courusel() {
    const {t,i18n}=useTranslation()
    return (
        <>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper h-[348px] mb-[146px]"
            >
                <SwiperSlide>
                    <div className='w-[347px] pl-[86px]  '>
                        <h2 className='corusel-title'>
                            {t("corusel.temuriy")}
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide> <div className='w-[347px] pl-[86px]  '>
                    <h2 className='corusel-title'>
                        {t("corusel.jahon")}
                    </h2>
                </div></SwiperSlide>
                <SwiperSlide> <div className='w-[347px] pl-[86px]  '>
                    <h2 className='corusel-title'>
                        {t("corusel.sovet")}
                    </h2>
                </div></SwiperSlide>
                <SwiperSlide>

                    <div className='w-[347px] pl-[86px]  '>
                        <h2 className='corusel-title'>
                            {t("corusel.mustaqillik")}
                        </h2>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
