import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProfileCard = ({ handleUserClick, user }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <Avatar name={user.name} src={user.profilePicture} />

      <h2 className="text-xl font-semibold mt-4 text-center text-gray-800">
        {user.name}
      </h2>
      <p className="text-gray-600 text-center mt-2">{user.email}</p>

      <div className="flex justify-center mt-6">
        <Link
          to={`/details/${user.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
