import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userLinks } from '../services/endpoint';
import Avatar from '../components/Avatar';

function DetailsPage() {
  const { id } = useParams();
  const history = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${userLinks}/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // You can add error handling here
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  const handleBackClick = () => {
    history(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </button>
          <h1 className="text-3xl font-semibold">{userDetails.name}</h1>
          <div className="w-10 h-10">
            <Avatar name={userDetails.name} src={userDetails.profilePicture} className="rounded-full" />
          </div>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-lg">
              <strong>Name:</strong> {userDetails.name}
            </div>
            <div className="text-lg">
              <strong>Email:</strong> {userDetails.email}
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-lg">
              <strong>Street:</strong> {userDetails.address.street}
            </div>
            <div className="text-lg">
              <strong>Suite:</strong> {userDetails.address.suite}
            </div>
            <div className="text-lg">
              <strong>City:</strong> {userDetails.address.city}
            </div>
            <div className="text-lg">
              <strong>Zipcode:</strong> {userDetails.address.zipcode}
            </div>
            <div className="text-lg">
              <strong>Geo - Lat:</strong> {userDetails.address.geo.lat}
            </div>
            <div className="text-lg">
              <strong>Geo - Lng:</strong> {userDetails.address.geo.lng}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 py-4 text-center text-white">
        <p className="text-lg">
          Thank you for visiting the user details page! This unique UI was designed with care.
        </p>
      </div>
    </div>
  );
}

export default DetailsPage;
