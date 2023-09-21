import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../redux/userSlice";
import { userLinks } from "../services/endpoint";
import UserContext from "../userContext/userContext";
import UserModal from "../components/Modal";
import Search from "../components/Search";
import ProfileCard from "../components/ProfileCard";

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
      
    </UserContext.Provider>
  );
}

export default UserProfileList;
