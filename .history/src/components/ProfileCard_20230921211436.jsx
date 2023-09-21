/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const ProfileCard = ({ handleUserClick, user }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                    <Avatar name={user.name} src={user.profilePicture} />
                </div>
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <Link
                        to={`/details/${user.id}`}
                        className="block mt-4 bg-#2196f3 text-white px-4 py-2 rounded bg-[#2196f3] hover:bg-blue-700 transition-colors duration-300"
                    >
                        View User Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
