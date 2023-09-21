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
    <div className="min-h-screen bg-primary text-white p-5">
      <button
        onClick={handleBackClick}
        className="mb-5 bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary focus:outline-none"
      >
        Go Back
      </button>

      <div className="bg-secondary rounded-lg p-8 shadow-lg mx-auto max-w-md">
        <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto rounded-full border-4 border-accent" />

        <h2 className="text-3xl font-semibold mt-6 text-center">{userDetails.name}</h2>
        <p className="text-base text-center mt-2">{userDetails.email}</p>

        <div className="mt-8">
          <h3 className="text-xl font-medium">Address:</h3>
          <div className="mt-2">
            <p className="text-base">
              <strong>Street:</strong> {userDetails.address.street}
            </p>
            <p className="text-base">
              <strong>Suite:</strong> {userDetails.address.suite}
            </p>
            <p className="text-base">
              <strong>City:</strong> {userDetails.address.city}
            </p>
            <p className="text-base">
              <strong>Zipcode:</strong> {userDetails.address.zipcode}
            </p>
          </div>
          <p className="text-base mt-4">
            <strong>Geo - Lat:</strong> {userDetails.address.geo.lat}, <strong>Lng:</strong> {userDetails.address.geo.lng}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
