import React from "react"
const FinancialInformationFields = ({ register, errors, maxLoanLimit }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="form-label">Income Source</label>
          <select
            className={`select-field ${
              errors.incomeSource ? "border-error" : ""
            }`}
            {...register("incomeSource", {
              required: "Income source is required",
            })}
          >
            <option value="">Select income source</option>
            <option value="Salary">Salary/Employment</option>
            <option value="Business">Business</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Other">Other</option>
          </select>
          {errors.incomeSource && (
            <span className="error-text">{errors.incomeSource.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="form-label">Monthly Income ($)</label>
          <input
            type="number"
            className={`input-field ${
              errors.monthlyIncome ? "border-error" : ""
            }`}
            {...register("monthlyIncome", {
              required: "Monthly income is required",
              min: { value: 0, message: "Invalid amount" },
            })}
          />
          {errors.monthlyIncome && (
            <span className="error-text">{errors.monthlyIncome.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="form-label">Loan Amount ($)</label>
          <input
            type="number"
            className={`input-field ${errors.loanAmount ? "border-error" : ""}`}
            {...register("loanAmount", {
              required: "Loan amount is required",
              min: { value: 10, message: "Minimum $10" },
              max: {
                value: maxLoanLimit,
                message: `Maximum $${maxLoanLimit}`,
              },
            })}
          />
          {errors.loanAmount && (
            <span className="error-text">{errors.loanAmount.message}</span>
          )}
          <span className="text-sm text-base-content/70 mt-1">
            Max: ${maxLoanLimit?.toLocaleString()}
          </span>
        </div>

        <div className="form-control">
          <label className="form-label">Reason for Loan</label>
          <input
            type="text"
            className={`input-field ${errors.reason ? "border-error" : ""}`}
            {...register("reason", { required: "Reason is required" })}
          />
          {errors.reason && (
            <span className="error-text">{errors.reason.message}</span>
          )}
        </div>
      </div>

      <div className="form-control">
        <label className="form-label">Additional Notes (Optional)</label>
        <textarea
          className="textarea-field"
          rows="3"
          placeholder="Any additional information..."
          {...register("extraNotes")}
        ></textarea>
      </div>
    </>
  )
}

export default FinancialInformationFields
