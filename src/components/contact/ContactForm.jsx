import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa"

const ContactForm = ({ formData, handleSubmit, handleChange }) => {
  return (
    <motion.div
      className="card bg-base-200 shadow-2xl ring-1 ring-base-300"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="card-body">
        <h2 className="card-title text-3xl mb-6">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className="textarea textarea-bordered h-32"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            <FaPaperPlane className="mr-2" />
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default ContactForm
