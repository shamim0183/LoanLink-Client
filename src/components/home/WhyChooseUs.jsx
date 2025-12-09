import React from "react"
import {
  FaChartLine,
  FaHeadset,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa"

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaShieldAlt className="text-5xl text-primary" />,
      title: "Secure & Transparent",
      description:
        "Your data is protected with bank-level security. All terms and conditions are transparent with no hidden fees.",
    },
    {
      icon: <FaHeadset className="text-5xl text-secondary" />,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round the clock to help you with any questions or concerns.",
    },
    {
      icon: <FaMoneyBillWave className="text-5xl text-primary" />,
      title: "Competitive Rates",
      description:
        "We offer some of the most competitive interest rates in the market with flexible repayment options.",
    },
    {
      icon: <FaChartLine className="text-5xl text-primary" />,
      title: "Fast Approval",
      description:
        "Get approved within 24-48 hours. Quick processing ensures you get funds when you need them most.",
    },
  ]

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose LoanLink?
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            We're committed to providing you with the best microlo experience.
            Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-base-200 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="opacity-70">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 card bg-gradient-to-r from-primary to-secondary text-white shadow-2xl">
          <div className="card-body text-center">
            <h3 className="card-title text-3xl justify-center mb-4">
              Join 5,000+ Satisfied Borrowers Today!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start your journey to financial freedom with LoanLink's trusted
              microloan services.
            </p>
            <div>
              <a href="/register" className="btn btn-neutral btn-lg">
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
