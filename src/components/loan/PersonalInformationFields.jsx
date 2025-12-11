import React from "react"
import { FormInput } from "../forms"

const PersonalInformationFields = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          error={errors.firstName}
          {...register("firstName", { required: "First name is required" })}
        />

        <FormInput
          label="Last Name"
          error={errors.lastName}
          {...register("lastName", { required: "Last name is required" })}
        />

        <FormInput
          label="Contact Number"
          type="tel"
          error={errors.contactNumber}
          {...register("contactNumber", {
            required: "Contact number is required",
          })}
        />

        <FormInput
          label="National ID"
          error={errors.nationalId}
          {...register("nationalId", { required: "National ID is required" })}
        />
      </div>

      <div className="form-control">
        <label className="form-label">Address</label>
        <textarea
          className={`textarea-field ${errors.address ? "border-error" : ""}`}
          rows="3"
          {...register("address", { required: "Address is required" })}
        ></textarea>
        {errors.address && (
          <span className="error-text">{errors.address.message}</span>
        )}
      </div>
    </>
  )
}

export default PersonalInformationFields
