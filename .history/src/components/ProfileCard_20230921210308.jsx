import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProfileCard = ({ handleUserClick, user }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-8 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <Avatar name={user.name} src={user.profilePicture} />

      <h2 className="text-2xl font-semibold mt-4 text-center">{user.name}</h2>
      <p className="text-gray-300 text-center mt-2">{user.email}</p>

      <div className="flex justify-center mt-6">
        <Link
          to={`/details/${user.id}`}
          className="bg-white hover:bg-gray-200 text-blue-500 font-semibold px-6 py-3 rounded-full transition-colors duration-300"
        >
          View User Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
