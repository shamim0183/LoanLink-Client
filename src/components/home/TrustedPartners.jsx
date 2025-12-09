import React from "react"
import Marquee from "react-fast-marquee"

const TrustedPartners = () => {
  const stats = [
    { label: "Total Loans Disbursed", value: "$2.5M+", color: "text-primary" },
    { label: "Active Borrowers", value: "5,000+", color: "text-secondary" },
    { label: "Loan Approval Rate", value: "95%", color: "text-accent" },
    {
      label: "Average Processing Time",
      value: "24 hrs",
      color: "text-primary",
    },
  ]

  const partners = [
    "Financial Services Inc",
    "MicroCredit Alliance",
    "Small Business Fund",
    "Community Bank Network",
    "Digital Finance Partners",
    "Startup Capital Group",
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-lg opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Partners Marquee */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8">
            Trusted by Leading Organizations
          </h3>
          <Marquee
            gradient={false}
            speed={50}
            className="bg-base-100 py-8 rounded-lg shadow-lg"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="mx-12 px-8 py-4 bg-base-200 rounded-lg font-semibold text-lg hover:scale-110 transition-transform"
              >
                {partner}
              </div>
            ))}
          </Marquee>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-base-100 rounded-lg shadow">
            <p className="text-sm opacity-70">SSL Certified</p>
            <p className="font-bold text-primary">🔒 Secure</p>
          </div>
          <div className="p-6 bg-base-100 rounded-lg shadow">
            <p className="text-sm opacity-70">Verified Business</p>
            <p className="font-bold text-secondary">✓ Trusted</p>
          </div>
          <div className="p-6 bg-base-100 rounded-lg shadow">
            <p className="text-sm opacity-70">FDIC Insured</p>
            <p className="font-bold text-primary">🛡️ Protected</p>
          </div>
          <div className="p-6 bg-base-100 rounded-lg shadow">
            <p className="text-sm opacity-70">Best Rated 2024</p>
            <p className="font-bold text-primary">⭐ 4.9/5</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedPartners
