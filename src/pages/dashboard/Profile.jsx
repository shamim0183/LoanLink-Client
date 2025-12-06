import {
  FaCalendar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa"
import useAuth from "../../hooks/useAuth"

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/128"}
                    alt={user.name}
                  />
                </div>
              </div>
              <h2 className="card-title text-2xl mt-4">{user.name}</h2>
              <div className="badge badge-primary badge-lg capitalize">
                {user.role}
              </div>
              <p className="text-sm opacity-70 mt-2">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Profile Information</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaUser className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Full Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaEnvelope className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Email Address</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <FaCalendar className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Account Role</p>
                    <p className="font-semibold capitalize">{user.role}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                    <FaPhone className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Phone Number</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.address && (
                  <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                    <div>
                      <p className="text-sm opacity-70">Address</p>
                      <p className="font-semibold">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary">Edit Profile</button>
              </div> */}
            </div>
          </div>

          {/* Account Stats */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title mb-4">Account Statistics</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Active Loans</div>
                  <div className="stat-value text-primary">0</div>
                </div>
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Applications</div>
                  <div className="stat-value text-secondary">0</div>
                </div>
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Total Paid</div>
                  <div className="stat-value text-accent">$0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
