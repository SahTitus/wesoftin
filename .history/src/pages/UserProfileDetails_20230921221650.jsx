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
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-gray-600 text-2xl">Loading...</div>
      </div>
    );
  }

  const handleBackClick = () => {
    history(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Go Back
          </button>
          <div className="text-3xl font-semibold">{userDetails.name}</div>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 text-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="text-center md:pr-6">
              <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto rounded-full border-4 border-white" />
            </div>
            <div className="mt-6 md:mt-0">
              <h2 className="text-3xl font-semibold">User Information</h2>
              <div className="text-lg">
                <strong>Name:</strong> {userDetails.name}
              </div>
              <div className="text-lg">
                <strong>Email:</strong> {userDetails.email}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mt-8">Address</h2>
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

          <h2 className="text-3xl font-semibold mt-8">Geo Information</h2>
          <div className="text-lg">
            <strong>Latitude:</strong> {userDetails.address.geo.lat}
          </div>
          <div className="text-lg">
            <strong>Longitude:</strong> {userDetails.address.geo.lng}
          </div>
        </div>
      </div>
      <footer className="bg-blue-600 py-4 text-center text-white">
        <p className="text-lg">
          Thank you for visiting the user details page! This unique UI was designed with care.
        </p>
      </footer>
    </div>
  );
}

export default DetailsPage;
