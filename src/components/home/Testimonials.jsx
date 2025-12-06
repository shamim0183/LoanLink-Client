import React from "react"
import { FaStar } from "react-icons/fa"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "LoanLink helped me secure funding for my bakery expansion. The process was smooth and the team was incredibly supportive. Highly recommended!",
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "I needed funds quickly for new equipment. LoanLink delivered! The approval was fast and the interest rates were fair. Thank you!",
    },
    {
      name: "Emily Rodriguez",
      role: "Restaurant Owner",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      text: "Starting my restaurant was a dream come true, thanks to LoanLink. The flexible repayment options made managing finances much easier.",
    },
    {
      name: "David Kim",
      role: "Tech Startup Founder",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      text: "LoanLink believed in my vision when others didn't. Their support helped me launch my startup successfully. Grateful for the opportunity!",
    },
    {
      name: "Maria Garcia",
      role: "Fashion Boutique Owner",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      rating: 5,
      text: "The customer service is outstanding! They guided me through every step and answered all my questions. My boutique is thriving now!",
    },
    {
      name: "James Wilson",
      role: "Construction Contractor",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      rating: 5,
      text: "After being turned down elsewhere, LoanLink gave me a chance. Their fair assessment and quick turnaround saved my business. Excellent service!",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience with LoanLink.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-100 shadow-xl h-full">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm opacity-70">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>

                  <p className="italic opacity-80">"{testimonial.text}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
