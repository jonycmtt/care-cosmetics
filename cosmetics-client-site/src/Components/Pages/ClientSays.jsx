import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
const ClientSays = () => {

  const [reviews,setReviews] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/review")
    .then(res => res.json())
    .then(data => setReviews(data))
  },[])


  const swipStyle = {
    padding : '40px 0px'
  }
  return (
    <div className=" rounded-md text-white text-center px-3 lg:px-12 w-full md:max-w-5xl mx-auto bg-slate-800">
      <Swiper
      style={swipStyle}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {
          reviews.map( review => 
          <SwiperSlide key={review._id}>
            <div className="flex flex-col justify-center items-center">
              <img className="w-16 h-16 rounded-full" 
              src={review.userImg} alt="" />
              <h2 className="text-2xl font-semibold my-4">{review.name}</h2>
              <h3 className="btn btn-primary cursor-text btn-sm mb-5">{review.emotion}</h3>
              <blockquote>
                <q>
                  {review.review}
                </q>
              </blockquote>
            </div>
          </SwiperSlide>)
        }

        {/* <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 h-16 rounded-full" src="https://i.ibb.co/S6JN6Bg/person-2.jpg" alt="" />
            <h2 className="text-2xl font-semibold my-4">Emma Roberts</h2>
            <h3 className="btn btn-primary cursor-text btn-sm mb-5">Excellent</h3>
            <blockquote>
              <q>
                Good delivery. as the new ordained general of lucifers legions
                general powercree blasterous. this product is to be applied to
                his Lance by all mites during his adulation ceremony
              </q>
            </blockquote>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 h-16 rounded-full" src="https://i.ibb.co/JxYWXDq/person-3.jpg" alt="" />
            <h2 className="text-2xl font-semibold my-4">Bruce Mars</h2>
            <h3 className="btn btn-primary cursor-text btn-sm mb-5">Good</h3>
            <blockquote>
              <q>
                Good delivery. as the new ordained general of lucifers legions
                general powercree blasterous.this product is to be applied to
                his Lance by all mites during his adulation ceremony
              </q>
            </blockquote>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default ClientSays;
