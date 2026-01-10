import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How quickly can I get approved for a loan?",
      answer:
        "Most loan applications are reviewed within 24 hours. Once approved, funds are typically disbursed within 1-2 business days directly to your bank account.",
    },
    {
      question: "What documents do I need to apply?",
      answer:
        "Required documents vary by loan type but typically include: valid government-issued ID, proof of income (pay stubs or tax returns), bank statements from the last 3 months, and proof of address.",
    },
    {
      question: "Can I pay off my loan early without penalties?",
      answer:
        "Yes! We encourage early repayment and do not charge any prepayment penalties. Paying off your loan early can save you money on interest.",
    },
    {
      question: "What is the minimum credit score required?",
      answer:
        "We consider applications from all credit backgrounds. While a higher credit score improves your chances and may result in better interest rates, we evaluate each application holistically including income, employment history, and debt-to-income ratio.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "Absolutely not. We believe in complete transparency. All fees, including processing fees and interest rates, are clearly disclosed upfront during the application process. There are no hidden charges.",
    },
    {
      question: "Can I modify my EMI plan after approval?",
      answer:
        "Yes, we offer flexibility. If your financial situation changes, you can contact our support team to discuss restructuring your EMI plan. Terms and conditions apply.",
    },
    {
      question: "What happens if I miss a payment?",
      answer:
        "We understand that circumstances change. If you miss a payment, please contact us immediately. We offer grace periods and can work with you to create a revised payment schedule. Late fees may apply as per your loan agreement.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, your data security is our top priority. We use bank-level encryption (256-bit SSL) to protect all your personal and financial information. We never share your data with third parties without your explicit consent.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-base-200">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know
            about our loan products and services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card border border-base-content/10"
            >
              <div className="card-body p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-base-200 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <span className="text-primary flex-shrink-0">
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-base-content/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
