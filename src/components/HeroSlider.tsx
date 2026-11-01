"use client";

import { useSyncExternalStore } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Link from "next/link";

const sliders = [
  {
    image: "/images/slider01.jpg",
    title: "Discover Your Perfect Studio",
    description: "Find beautiful creative spaces for your next project.",
  },
  {
    image: "/images/slider02.jpg",
    title: "Host Your Creative Space",
    description: "Share your studio and connect with creative people.",
  },
  {
    image: "/images/slider03.jpg",
    title: "Inspire and Be Inspired",
    description: "Explore a world of creativity and inspiration.",
  },
];

const HeroSliderPage = () => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="w-full h-[550px]" />;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full h-[550px]"
    >
      {sliders.map((slider, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-[550px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slider.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 text-white">
              <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
                {slider.title}
              </h1>

              <p className="mt-4 text-lg max-w-xl">{slider.description}</p>

              <div className="flex gap-4 mt-8 flex-wrap">
                <Link
                  href="/studios"
                  className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg font-semibold"
                >
                  Explore Studios
                </Link>

                <Link
                  href="/studios"
                  className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold"
                >
                  Host Your Space
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSliderPage;
