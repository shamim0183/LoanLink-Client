import {
  FaCheckCircle,
  FaCreditCard,
  FaFileAlt,
  FaHandHoldingUsd,
} from "react-icons/fa"

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileAlt className="text-5xl text-primary" />,
      title: "1. Choose Your Loan",
      description:
        "Browse our available loans and select the one that matches your needs. Review interest rates and terms.",
    },
    {
      icon: <FaCheckCircle className="text-5xl text-secondary" />,
      title: "2. Submit Application",
      description:
        "Fill out a simple application form with your details. Upload required documents for verification.",
    },
    {
      icon: <FaCreditCard className="text-5xl text-accent" />,
      title: "3. Get Approved",
      description:
        "Our loan managers review your application within 24-48 hours. Get notified of approval status.",
    },
    {
      icon: <FaHandHoldingUsd className="text-5xl text-primary" />,
      title: "4. Receive Funds",
      description:
        "Once approved, funds are transferred directly to your account. Start achieving your goals!",
    },
  ]

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Getting a loan with LoanLink is simple and straightforward. Follow
            these easy steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="card-title text-xl mb-3">{step.title}</h3>
                <p className="opacity-70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-6">Ready to get started?</p>
          <a href="/all-loans" className="btn btn-primary btn-lg">
            Browse Loans
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
