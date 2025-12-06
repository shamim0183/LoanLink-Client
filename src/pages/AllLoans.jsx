import React from "react"
import axios from "axios";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaSearch } from "react-icons/fa"
import ReactPaginate from "react-paginate"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import LoanCard from "../components/shared/LoanCard"

const AllLoans = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)
  const loansPerPage = 6

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/loans`)
      setLoans(data.loans || [])
    } catch (error) {
      console.error("Error fetching loans:", error)
      toast.error("Failed to load loans")
      // Demo data for development
      setLoans([
        {
          _id: "1",
          title: "Personal Loan",
          description: "Quick personal loans for your immediate needs",
          category: "Personal",
          interestRate: 8.5,
          maxLoanLimit: 50000,
          images: [
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
          ],
        },
        {
          _id: "2",
          title: "Business Expansion Loan",
          description: "Grow your business with our flexible business loans",
          category: "Business",
          interestRate: 9.2,
          maxLoanLimit: 100000,
          images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          ],
        },
        {
          _id: "3",
          title: "Education Loan",
          description: "Invest in your future with our education loans",
          category: "Education",
          interestRate: 7.5,
          maxLoanLimit: 75000,
          images: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
          ],
        },
        {
          _id: "4",
          title: "Home Renovation Loan",
          description: "Transform your home with our renovation loans",
          category: "Home",
          interestRate: 8.0,
          maxLoanLimit: 80000,
          images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
          ],
        },
        {
          _id: "5",
          title: "Emergency Loan",
          description: "Quick approval for urgent financial needs",
          category: "Emergency",
          interestRate: 10.0,
          maxLoanLimit: 25000,
          images: [
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
          ],
        },
        {
          _id: "6",
          title: "Wedding Loan",
          description: "Make your special day memorable",
          category: "Personal",
          interestRate: 9.5,
          maxLoanLimit: 60000,
          images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
          ],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Filter loans
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || loan.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination
  const pageCount = Math.ceil(filteredLoans.length / loansPerPage)
  const offset = currentPage * loansPerPage
  const currentLoans = filteredLoans.slice(offset, offset + loansPerPage)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Get unique categories
  const categories = ["all", ...new Set(loans.map((loan) => loan.category))]

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Available Loan Products
          </h1>
          <p className="text-lg text-base-content/70">
            Choose from our wide range of flexible loan options
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-base-100 p-6 rounded-xl shadow-md"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(0)
                }}
                className="input-field pl-12"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(0)
              }}
              className="select-field md:w-64"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-base-content/70">
            Showing{" "}
            <span className="font-semibold text-primary">
              {currentLoans.length}
            </span>{" "}
            of {filteredLoans.length} loan{filteredLoans.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Loans Grid */}
        {currentLoans.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentLoans.map((loan, index) => (
                <motion.div
                  key={loan._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LoanCard loan={loan} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="mt-12 flex justify-center">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"join"}
                  pageClassName={"join-item btn btn-sm"}
                  previousClassName={"join-item btn btn-sm"}
                  nextClassName={"join-item btn btn-sm"}
                  activeClassName={"btn-active btn-primary"}
                  disabledClassName={"btn-disabled"}
                  forcePage={currentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-base-content/70">
              No loans found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllLoans
