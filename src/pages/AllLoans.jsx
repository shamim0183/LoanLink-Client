import React from "react"
import axios from "axios";
import { motion } from "framer-motion"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import ReactPaginate from "react-paginate"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import LoanCard from "../components/shared/LoanCard"

const AllLoans = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)
  const loansPerPage = 6

  // Fetch all loans using TanStack Query
  const { data: loans = [], isLoading: loading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/loans`)
      return data.loans || []
    },
  })

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
            of {filteredLoans.length} loan
            {filteredLoans.length !== 1 ? "s" : ""}
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
