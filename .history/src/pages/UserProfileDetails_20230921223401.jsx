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
      <header className="bg-green-500 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Go Back
          </button>
          <div className="text-3xl font-semibold">{userDetails.name}</div>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-20 h-20 mx-auto rounded-full" />

          <h2 className="text-2xl font-semibold mt-4">User Information</h2>
          <div className="text-lg">
            <strong>Name:</strong> {userDetails.name}
          </div>
          <div className="text-lg">
            <strong>Email:</strong> {userDetails.email}
          </div>

          <h2 className="text-2xl font-semibold mt-6">Address</h2>
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

          <h2 className="text-2xl font-semibold mt-6">Geo Information</h2>
          <div className="text-lg">
            <strong>Latitude:</strong> {userDetails.address.geo.lat}
          </div>
          <div className="text-lg">
            <strong>Longitude:</strong> {userDetails.address.geo.lng}
          </div>
        </div>
      </div>
      <div className="bg-green-500 py-4 text-center text-white">
        <p className="text-lg">
          Thank you for visiting the user details page. This UI uses GitHub's green theme color.
        </p>
      </div>
    </div>
  );
