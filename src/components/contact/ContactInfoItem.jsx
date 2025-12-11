import React from "react"

const ContactInfoItem = ({ icon, title, lines, iconBgColor, iconColor }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className={`${iconBgColor} p-4 rounded-lg`}>
        {React.cloneElement(icon, { className: `text-2xl ${iconColor}` })}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        {lines.map((line, index) => (
          <p key={index} className="text-base-content/70">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ContactInfoItem
