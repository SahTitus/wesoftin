import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProfileCard = ({ handleUserClick, user }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 md:p-8 lg:p-10 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <Avatar name={user.name} src={user.profilePicture} />

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 text-center text-white">
        {user.name}
      </h2>
      <p className="text-gray-300 text-center mt-2">{user.email}</p>

      <div className="flex justify-center mt-6">
        <Link
          to={`/details/${user.id}`}
          className="bg-white hover:bg-gray-200 text-blue-500 font-semibold px-6 md:px-8 lg:px-10 py-3 rounded-full transition-colors duration-300"
        >
          View User Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
