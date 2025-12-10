import React from "react";
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaSave } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { FormInput, FormSelect, FormTextarea } from "../../../components/forms"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../../constants"

const AddLoan = () => {
  const navigate = useNavigate()
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
        interestRate: Number(data.interest),
        maxLoanLimit: Number(data.maxLimit),
        requiredDocuments: data.requiredDocs
          .split(",")
          .map((doc) => doc.trim()),
        emiPlans: emiPlans.map((plan) => JSON.stringify(plan)),
        images: [data.image],
        showOnHome,
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/loans`,
        loanData,
        {
          withCredentials: true,
        }
      )

      toast.success(SUCCESS_MESSAGES.LOAN_CREATED)
      reset()
      setEmiPlans([{ months: 6, rate: 5 }])
      setShowOnHome(false)

      // Redirect to dashboard after successful creation
      setTimeout(() => navigate("/dashboard"), 1500)
    } catch (error) {
      toast.error(ERROR_MESSAGES.LOAN_CREATE_FAILED)
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
              <FormInput
                label="Loan Title"
                error={errors.title}
                {...register("title", { required: "Title is required" })}
              />

              <FormSelect
                label="Category"
                placeholder="Select Category"
                error={errors.category}
                options={[
                  { value: "Personal", label: "Personal" },
                  { value: "Business", label: "Business" },
                  { value: "Education", label: "Education" },
                  { value: "Emergency", label: "Emergency" },
                ]}
                {...register("category", { required: "Category is required" })}
              />
            </div>

            {/* Description */}
            <FormTextarea
              label="Description"
              className="h-32"
              error={errors.description}
              {...register("description", {
                required: "Description is required",
              })}
            />

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                error={errors.interest}
                {...register("interest", {
                  required: "Interest rate is required",
                  min: 0,
                })}
              />

              <FormInput
                label="Maximum Loan Limit ($)"
                type="number"
                error={errors.maxLimit}
                {...register("maxLimit", {
                  required: "Max limit is required",
                  min: 1,
                })}
              />
            </div>

            {/* Required Documents */}
            <FormInput
              label="Required Documents (comma separated)"
              placeholder="National ID, Proof of Income, Bank Statement"
              error={errors.requiredDocs}
              {...register("requiredDocs", {
                required: "Required documents are needed",
              })}
            />

            {/* Image URL */}
            <FormInput
              label="Image URL"
              type="url"
              placeholder="https://example.com/loan-image.jpg"
              error={errors.image}
              {...register("image", { required: "Image URL is required" })}
            />

            {/* EMI Plans */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">EMI Plans</h3>
                <button
                  type="button"
                  className="btn btn-primary"
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
