import React from "react";
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaSave } from "react-icons/fa"

const AddLoan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [showOnHome, setShowOnHome] = useState(false)
  const [emiPlans, setEmiPlans] = useState([{ months: 6, rate: 5 }])

  const handleAddEMI = () => {
    setEmiPlans([...emiPlans, { months: 12, rate: 5 }])
  }

  const handleRemoveEMI = (index) => {
    setEmiPlans(emiPlans.filter((_, i) => i !== index))
  }

  const handleEMIChange = (index, field, value) => {
    const updated = [...emiPlans]
    updated[index][field] = Number(value)
    setEmiPlans(updated)
  }

  const onSubmit = async (data) => {
    try {
      const loanData = {
        title: data.title,
        description: data.description,
        category: data.category,
        interestRate: Number(data.interest), // Changed from interest
        maxLoanLimit: Number(data.maxLimit), // Changed from maxLimit
        requiredDocuments: data.requiredDocs
          .split(",")
          .map((doc) => doc.trim()), // Changed from requiredDocs
        emiPlans: emiPlans.map((plan) => JSON.stringify(plan)), // Convert objects to strings
        images: [data.image], // Wrap single image URL in array
        showOnHome,
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/manager/loans`,
        loanData,
        {
          withCredentials: true,
        }
      )

      toast.success("Loan created successfully!")
      reset()
      setEmiPlans([{ months: 6, rate: 5 }])
      setShowOnHome(false)
    } catch (error) {
      toast.error("Failed to create loan")
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Loan</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Loan Title *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className="text-error text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category *</span>
                </label>
                <select
                  className="select select-bordered"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Emergency">Emergency</option>
                </select>
                {errors.category && (
                  <span className="text-error text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description *</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-error text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Interest Rate (%) *</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="input input-bordered"
                  {...register("interest", {
                    required: "Interest rate is required",
                    min: 0,
                  })}
                />
                {errors.interest && (
                  <span className="text-error text-sm">
                    {errors.interest.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Maximum Loan Limit ($) *</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  {...register("maxLimit", {
                    required: "Max limit is required",
                    min: 1,
                  })}
                />
                {errors.maxLimit && (
                  <span className="text-error text-sm">
                    {errors.maxLimit.message}
                  </span>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Required Documents (comma separated) *
                </span>
              </label>
              <input
                type="text"
                placeholder="National ID, Proof of Income, Bank Statement"
                className="input input-bordered"
                {...register("requiredDocs", {
                  required: "Required documents are needed",
                })}
              />
              {errors.requiredDocs && (
                <span className="text-error text-sm">
                  {errors.requiredDocs.message}
                </span>
              )}
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL *</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/loan-image.jpg"
                className="input input-bordered"
                {...register("image", { required: "Image URL is required" })}
              />
              {errors.image && (
                <span className="text-error text-sm">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* EMI Plans */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">EMI Plans</h3>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleAddEMI}
                >
                  + Add Plan
                </button>
              </div>

              <div className="space-y-3">
                {emiPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center bg-base-200 p-3 rounded"
                  >
                    <div className="form-control flex-1">
                      <label className="label-text text-xs">Months</label>
                      <input
                        type="number"
                        className="input input-bordered input-sm"
                        value={plan.months}
                        onChange={(e) =>
                          handleEMIChange(index, "months", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-control flex-1">
                      <label className="label-text text-xs">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="input input-bordered input-sm"
                        value={plan.rate}
                        onChange={(e) =>
                          handleEMIChange(index, "rate", e.target.value)
                        }
                      />
                    </div>
                    {emiPlans.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleRemoveEMI(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Show on Home Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={showOnHome}
                  onChange={(e) => setShowOnHome(e.target.checked)}
                />
                <span className="label-text">Show on Home Page</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary gap-2">
                <FaSave /> Create Loan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddLoan
