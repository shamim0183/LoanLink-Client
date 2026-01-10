import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { motion } from "framer-motion"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import ReactPaginate from "react-paginate"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import LoanCard from "../components/shared/LoanCard"
import useDocumentTitle from "../hooks/useDocumentTitle"

const AllLoans = () => {
  useDocumentTitle("All Loans - LoanLink")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [maxInterestRate, setMaxInterestRate] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFiltering, setIsFiltering] = useState(false)
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

    // Normalize categories for comparison (case-insensitive)
    const normalizedLoanCategory =
      (loan.category || "").charAt(0).toUpperCase() +
      (loan.category || "").slice(1).toLowerCase()
    const normalizedSelectedCategory =
      selectedCategory.charAt(0).toUpperCase() +
      selectedCategory.slice(1).toLowerCase()

    const matchesCategory =
      selectedCategory === "all" ||
      normalizedLoanCategory === normalizedSelectedCategory

    const matchesInterestRate = loan.interestRate <= maxInterestRate

    return matchesSearch && matchesCategory && matchesInterestRate
  })

  // Sort filtered loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.maxLoanLimit - b.maxLoanLimit
      case "price-high":
        return b.maxLoanLimit - a.maxLoanLimit
      case "interest-low":
        return a.interestRate - b.interestRate
      case "interest-high":
        return b.interestRate - a.interestRate
      case "newest":
      default:
        // If loans have createdAt field, sort by it; otherwise maintain current order
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
        return 0
    }
  })

  // Pagination
  const pageCount = Math.ceil(sortedLoans.length / loansPerPage)
  const offset = currentPage * loansPerPage
  const currentLoans = sortedLoans.slice(offset, offset + loansPerPage)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Get unique categories (capitalize first letter to handle case inconsistencies)
  const allCategories = loans.map((loan) => {
    const category = loan.category || ""
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  })
  const categories = ["all", ...new Set(allCategories).values()].filter(Boolean)

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
          <div className="flex flex-col gap-4">
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

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setIsFiltering(true)
                  setSelectedCategory(e.target.value)
                  setCurrentPage(0)
                  setTimeout(() => setIsFiltering(false), 700)
                }}
                className="select-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setIsFiltering(true)
                  setSortBy(e.target.value)
                  setCurrentPage(0)
                  setTimeout(() => setIsFiltering(false), 700)
                }}
                className="select-field"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="interest-low">Interest: Low to High</option>
                <option value="interest-high">Interest: High to Low</option>
              </select>

              {/* Interest Rate Filter */}
              <div className="flex items-center gap-3 bg-base-200 px-4 py-2 rounded-lg">
                <label className="text-sm font-medium whitespace-nowrap">
                  Max Interest:
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={maxInterestRate}
                  onChange={(e) => {
                    setIsFiltering(true)
                    setMaxInterestRate(parseFloat(e.target.value))
                    setCurrentPage(0)
                    setTimeout(() => setIsFiltering(false), 700)
                  }}
                  className="range range-primary range-sm flex-1"
                />
                <span className="text-sm font-semibold text-primary min-w-[3rem] text-right">
                  {maxInterestRate}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-base-content/70">
            Showing{" "}
            <span className="font-semibold text-primary">
              {currentLoans.length}
            </span>{" "}
            of {sortedLoans.length} loan
            {sortedLoans.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Loans Grid */}
        {isFiltering ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(loansPerPage)].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 border border-base-content/10 shadow-xl h-full flex flex-col overflow-hidden"
              >
                {/* Image Skeleton */}
                <div className="skeleton h-48 w-full rounded-none"></div>

                <div className="card-body p-5 space-y-4">
                  {/* Category Badge Skeleton */}
                  <div className="skeleton h-6 w-20"></div>

                  {/* Title Skeleton */}
                  <div className="skeleton h-6 w-full"></div>

                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                  </div>

                  {/* Details Skeleton */}
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="skeleton h-12 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : currentLoans.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  containerClassName={"flex items-center gap-2"}
                  pageClassName={""}
                  pageLinkClassName={
                    "px-4 py-2 rounded-lg bg-base-100 border border-base-content/10 hover:border-primary hover:bg-primary/10 transition-all duration-200 font-medium"
                  }
                  previousClassName={""}
                  previousLinkClassName={
                    "px-4 py-2 rounded-lg bg-base-100 border border-base-content/10 hover:border-primary hover:bg-primary/10 transition-all duration-200 font-medium flex items-center gap-1"
                  }
                  nextClassName={""}
                  nextLinkClassName={
                    "px-4 py-2 rounded-lg bg-base-100 border border-base-content/10 hover:border-primary hover:bg-primary/10 transition-all duration-200 font-medium flex items-center gap-1"
                  }
                  activeLinkClassName={
                    "!bg-primary !text-white !border-primary shadow-md"
                  }
                  disabledLinkClassName={
                    "opacity-50 cursor-not-allowed hover:!bg-base-100 hover:!border-base-content/10"
                  }
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
