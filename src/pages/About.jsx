import React from "react"
import { FaChartLine, FaHandshake, FaShieldAlt, FaUsers } from "react-icons/fa"
import { Link } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle"

const About = () => {
  useDocumentTitle("About Us - LoanLink")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary/20 to-secondary/20 py-20">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">About LoanLink</h1>
            <p className="text-lg opacity-80">
              Empowering dreams through accessible microloans
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-4">
              LoanLink is dedicated to providing accessible microloans to
              individuals and small businesses who need financial support to
              achieve their goals.
            </p>
            <p className="text-lg mb-4">
              We believe that everyone deserves access to fair and transparent
              financial services, regardless of their economic background.
            </p>
            <p className="text-lg">
              Through our platform, we connect borrowers with loan managers who
              understand their needs and can provide personalized financial
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat bg-base-200 rounded-lg p-6">
              <div className="stat-title">Active Loans</div>
              <div className="stat-value text-primary">1,200+</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-6">
              <div className="stat-title">Happy Clients</div>
              <div className="stat-value text-secondary">5,000+</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-6">
              <div className="stat-title">Success Rate</div>
              <div className="stat-value text-primary">95%</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-6">
              <div className="stat-title">Total Funds</div>
              <div className="stat-value text-primary">$2M+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaHandshake className="text-5xl text-primary mb-4" />
                <h3 className="card-title">Trust</h3>
                <p>
                  Building lasting relationships through transparent and honest
                  practices
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaUsers className="text-5xl text-secondary mb-4" />
                <h3 className="card-title">Community</h3>
                <p>
                  Supporting local businesses and individuals to grow together
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaChartLine className="text-5xl text-primary mb-4" />
                <h3 className="card-title">Growth</h3>
                <p>
                  Empowering financial independence and sustainable development
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaShieldAlt className="text-5xl text-primary mb-4" />
                <h3 className="card-title">Security</h3>
                <p>
                  Protecting your data with industry-leading security measures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Founder",
              image: "https://i.ibb.co/gLYGTc6j/01838326265.jpg",
            },
            {
              name: "Michael Chen",
              role: "CTO",
              image: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            {
              name: "Emily Rodriguez",
              role: "Head of Operations",
              image: "https://randomuser.me/api/portraits/women/3.jpg",
            },
          ].map((member, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{member.name}</h3>
                <p className="text-sm opacity-70">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied borrowers and take the first step
            towards achieving your financial goals
          </p>
          <Link to="/all-loans" className="btn btn-neutral btn-lg">
            Explore Loans
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
