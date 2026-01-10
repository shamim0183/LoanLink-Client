import React from "react"
import { motion } from "framer-motion";
import { useState } from "react"
import toast from "react-hot-toast"
import { FaPaperPlane } from "react-icons/fa"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
      toast.success(
        "Thank you for subscribing! Check your inbox for confirmation."
      )
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <FaPaperPlane className="text-3xl text-primary" />
          </div>

          <h2 className="heading-secondary mb-4">Stay Updated</h2>
          <p className="text-lg text-base-content/70 mb-8">
            Subscribe to our newsletter and get the latest updates on loan
            products, financial tips, and exclusive offers delivered straight to
            your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered flex-1 bg-base-100"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Subscribe
                    <FaPaperPlane />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-base-content/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-base-content/10">
            <div>
              <p className="text-2xl font-bold text-primary">10K+</p>
              <p className="text-sm text-base-content/70">Subscribers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">Weekly</p>
              <p className="text-sm text-base-content/70">Updates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">100%</p>
              <p className="text-sm text-base-content/70">Free</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
