import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    { id: 1, image: "bannerPhoto/IMG_5631.JPG" },
    { id: 2, image: "bannerPhoto/photo_2_2025-07-30_22-00-59.jpg" },
    { id: 3, image: "bannerPhoto/photo_2025-08-07_02-36-56.jpg" },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto pr-0 md:pr-12 pt-4">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.title}
              className="rounded w-full max-h-[300px] md:max-h-[500px] h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
