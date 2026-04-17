import React, { useEffect, useState } from 'react';
import img1 from "../../../assets/images/banner/1.jpg";
import img2 from "../../../assets/images/banner/2.jpg";
import img3 from "../../../assets/images/banner/3.jpg";
import img4 from "../../../assets/images/banner/4.jpg";
import img5 from "../../../assets/images/banner/5.jpg";
import img6 from "../../../assets/images/banner/6.jpg";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Banner = () => {
    const images = [img1, img2, img3, img4, img5, img6];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);

    const changeSlide = (newIndex) => {
        setFade(false);

        setTimeout(() => {
            setCurrentSlide(newIndex);
            setFade(true);
        }, 300);
    };

    const nextSlide = () => {
        const newIndex = (currentSlide + 1) % images.length;
        changeSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentSlide - 1 + images.length) % images.length;
        changeSlide(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = (currentSlide + 1) % images.length;
            changeSlide(newIndex);
        }, 10000);

        return () => clearInterval(interval);
    }, [currentSlide, images.length]);

    return (
        <div className="relative w-full mt-5 overflow-hidden rounded-lg">
            <div className='hidden md:flex md:flex-col  absolute left-0 z-10 top-[25%] md:w-1/2 lg:w-[40%] pl-20 space-y-3 lg:space-y-5'>
                <h3 className=' text-4xl lg:text-6xl font-bold text-white'>Affordable Price For Car Servicing</h3>
                <p className='text-white text-lg mt-4'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                <div className='flex gap-4'>
                    <button className='bg-[#FF3811] text-lg font-semibold text-white md:px-3  lg:px-5 py-3 rounded-lg'>Discover More</button>
                    <button className='md:px-3 lg:px-5 py-3 text-white border border-white  rounded-lg'>Latest Project</button>
                </div>
            </div>
            <img
                src={images[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className={`w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[550px] xl:h-[650px] object-cover rounded-lg transition-all duration-700 ease-in-out ${
                    fade ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            />

            <div className="hidden md:flex absolute inset-0 bg-gradient-to-r from-[#0c0b0be0] via-[#1b151544] to-transparent rounded-lg"></div>

            <div className="absolute flex gap-2 sm:gap-4 bottom-4 sm:bottom-6 right-4 sm:right-8 lg:right-10">
                <button
                    onClick={prevSlide}
                    className="btn btn-circle border-none bg-[#312929bd] hover:bg-[#FF3811] w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 min-h-0"
                >
                    <IoIosArrowRoundBack className="text-white text-2xl sm:text-3xl" />
                </button>

                <button
                    onClick={nextSlide}
                    className="btn btn-circle border-none bg-[#312929bd] hover:bg-[#FF3811] w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 min-h-0"
                >
                    <IoIosArrowRoundForward className="text-white text-2xl sm:text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default Banner;