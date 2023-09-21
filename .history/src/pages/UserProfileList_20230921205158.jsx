import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../redux/userSlice";
import { Link } from "react-router-dom";
import { userLinks } from "../services/endpoint";
import UserContext from "../userContext/userContext";
import UserModal from "../components/Modal";
import Avatar from "../components/Avatar";
import Search from "../components/Search";
function UserProfileList() {
  const dispatch = useDispatch();
  const { profiles, isLoading, error } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = profiles.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());

      try {
        const response = await fetch(`${userLinks}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure(error.message));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider value={selectedUser}>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
        <h1 className="text-3xl font-bold mb-8 text-center">User Profiles</h1>
        <Search
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {filteredProfiles.length===0?(<div><h3>No User Found</h3></div>):(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((user) => (
 <
          ))}
        </div>)}
        {isModalOpen && <UserModal closeModal={closeModal} />}
      </div>
    </UserContext.Provider>
  );
}
export default UserProfileList;
