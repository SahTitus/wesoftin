/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProfileCard = ({ handleUserClick, user }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-2 sm:mb-4">
                    <Avatar name={user.name} src={user.profilePicture} />
                </div>
                <div className="text-center">
                    <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{user.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{user.email}</p>
                    <Link
                        to={`/details/${user.id}`}
                        className="block mt-3 sm:mt-4 bg-#2196f3 text-white px-3 py-1 rounded bg-[#2196f3] hover:bg-blue-700 transition-colors duration-300 text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
