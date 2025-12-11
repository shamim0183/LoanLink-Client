import React from "react"
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react"
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import Swal from "sweetalert2"
import { ContactForm, ContactInfoItem } from "../components/contact"
import LocationMap from "../components/LocationMap"
import useDocumentTitle from "../hooks/useDocumentTitle"

const Contact = () => {
  useDocumentTitle("Contact Us - LoanLink")

  const mapRef = useRef(null)
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 })
  const [mapVisible, setMapVisible] = useState(false)

  useEffect(() => {
    if (isMapInView) {
      setMapVisible(true)
    }
  }, [isMapInView])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We'll get back to you soon!",
      confirmButtonColor: "#570DF8",
      confirmButtonText: "Great!",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary/20 to-secondary/20 py-20">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-base-content/70">
              Have questions? We'd love to hear from you. Send us a message!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-lg mb-8 text-white">
                Feel free to reach out to us through any of these channels. Our
                team is here to help you!
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem
                icon={<FaMapMarkerAlt />}
                title="Address"
                lines={["Level-4, 34, Awal Centre", "Dhaka 1213, Bangladesh"]}
                iconBgColor="bg-primary/20"
                iconColor="text-primary"
              />

              <ContactInfoItem
                icon={<FaPhone />}
                title="Phone"
                lines={["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"]}
                iconBgColor="bg-secondary/20"
                iconColor="text-secondary"
              />

              <ContactInfoItem
                icon={<FaEnvelope />}
                title="Email"
                lines={["support@loanlink.com", "info@loanlink.com"]}
                iconBgColor="bg-primary/20"
                iconColor="text-primary"
              />
            </div>

            {/* Office Hours */}
            <motion.div
              className="card bg-base-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="card-body">
                <h3 className="card-title">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div ref={mapRef} className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
          <LocationMap
            latitude={23.793807217195145}
            longitude={90.4053528677049}
            locationName="LoanLink Office"
            isVisible={mapVisible}
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
