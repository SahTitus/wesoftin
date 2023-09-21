/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const ProfileCard = ({ handleUserClick, user }) => {
    return (
        <div
            className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleUserClick(user)}
        >
            <Avatar name={user.name} src={user.profilePicture} />
            <h2 className="text-xl font-semibold mb-2 text-center">
                {user.name}
            </h2>
            <p className="text-gray-600 text-center">{user.email}</p>
            <Link
                to={`/details/${user.id}`}
                className="block mt-4 text-center bg-#2196f3 text-white px-4 py-2 rounded bg-[#2196f3] hover:bg-blue-700 transition-colors duration-300"
            >
                View User Details
            </Link>
        </div>
    )
}

export default ProfileCard