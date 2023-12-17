import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination,Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <div>
            <img src="https://i.ibb.co/sP0rSLw/Banner1.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="https://i.ibb.co/qnxJ7pz/banner2.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="https://i.ibb.co/S6dyycN/Banner3.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
