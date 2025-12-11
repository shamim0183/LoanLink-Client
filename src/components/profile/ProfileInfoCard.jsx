import React from "react"
const ProfileInfoCard = ({ icon: Icon, label, value, note }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
      <Icon className="text-2xl text-primary" />
      <div>
        <p className="text-sm opacity-70">{label}</p>
        <p className="font-semibold">{value}</p>
        {note && <p className="text-xs opacity-60 mt-1">{note}</p>}
      </div>
    </div>
  )
}

export default ProfileInfoCard
