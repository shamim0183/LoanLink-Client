import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaHandshake,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import HowItWorks from "../components/home/HowItWorks"
import Testimonials from "../components/home/Testimonials"
import TrustedPartners from "../components/home/TrustedPartners"
import WhyChooseUs from "../components/home/WhyChooseUs"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import LoanCard from "../components/shared/LoanCard"

const Home = () => {
  // Fetch featured loans using TanStack Query
  const { data: featuredLoans = [], isLoading: loadingLoans } = useQuery({
    queryKey: ["featured-loans"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/loans/featured`
      )
      return data.loans || []
    },
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-neutral via-neutral to-blue-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Path to{" "}
                <span className="text-primary">Financial Freedom</span>
              </h1>
              <p className="text-lg md:text-xl text-white mb-8">
                Quick, transparent, and accessible microloans designed to
                empower your dreams. Get approved in minutes, not weeks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn btn-primary btn-lg gap-2">
                  Apply for Loan
                  <FaArrowRight />
                </Link>
                <Link
                  to="/all-loans"
                  className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-neutral"
                >
                  Explore Loans
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <h3 className="text-3xl font-bold text-primary">5K+</h3>
                  <p className="text-sm text-base-content/70">Loans Approved</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">98%</h3>
                  <p className="text-sm text-base-content/70">
                    Satisfaction Rate
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">24h</h3>
                  <p className="text-sm text-base-content/70">Avg. Approval</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=600&fit=crop"
                  alt="Financial Growth"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-xl">
                  <p className="text-sm font-semibold">Interest Rate</p>
                  <p className="text-3xl font-bold">5.9%</p>
                  <p className="text-xs">Starting from</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-base-200">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">Why Choose LoanLink?</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              We're committed to making microloans accessible, transparent, and
              hassle-free for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaMoneyBillWave className="text-4xl text-primary" />,
                title: "Quick Approval",
                description:
                  "Get loan approval within 24 hours with minimal documentation",
              },
              {
                icon: <FaChartLine className="text-4xl text-primary" />,
                title: "Flexible EMI",
                description:
                  "Choose repayment plans that suit your financial situation",
              },
              {
                icon: <FaShieldAlt className="text-4xl text-primary" />,
                title: "100% Secure",
                description:
                  "Your data is protected with bank-level encryption",
              },
              {
                icon: <FaHandshake className="text-4xl text-primary" />,
                title: "Transparent Process",
                description:
                  "No hidden charges, clear terms, honest communication",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-all"
              >
                <div className="card-body items-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Loans Section with Swiper */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Featured Loan Products</h2>
            <p className="text-lg text-base-content/70">
              Discover our most popular loan options tailored to your needs
            </p>
          </motion.div>

          {loadingLoans ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : featuredLoans.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {featuredLoans.map((loan) => (
                <SwiperSlide key={loan._id}>
                  <LoanCard loan={loan} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12 bg-base-200 rounded-xl">
              <p className="text-base-content/70">
                No featured loans available
              </p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/all-loans" className="btn btn-primary btn-lg">
              View All Loans
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Trusted Partners Section */}
      <TrustedPartners />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust LoanLink for their
              financial needs
            </p>
            <Link to="/register" className="btn btn-neutral btn-lg">
              Apply Now - It's Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
