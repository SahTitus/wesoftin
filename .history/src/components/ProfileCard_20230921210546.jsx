import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProfileCard = ({ handleUserClick, user }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="relative">
        <Avatar name={user.name} src={user.profilePicture} />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
            View Details
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-center">{user.name}</h2>
        <p className="text-gray-600 text-center">{user.email}</p>
      </div>
      <Link
        to={`/details/${user.id}`}
        className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        View User Details
      </Link>
    </div>
  );
};

export default ProfileCard;
