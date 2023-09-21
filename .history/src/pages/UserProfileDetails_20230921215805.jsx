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
    <div className="min-h-screen bg-gray-100 text-gray-800 p-5">
      <button
        onClick={handleBackClick}
        className="mb-5 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Go Back
      </button>

      <div className="bg-white rounded-lg p-8 shadow-lg mx-auto max-w-md">
        <div className="text-center">
          <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto rounded-full border-4 border-blue-700" />

          <h2 className="text-3xl font-semibold mt-4">{userDetails.name}</h2>
          <p className="text-lg mt-2">{userDetails.email}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Address:</h3>
          <div className="text-base">
            <p>
              <strong>Street:</strong> {userDetails.address.street}
            </p>
            <p>
              <strong>Suite:</strong> {userDetails.address.suite}
            </p>
            <p>
              <strong>City:</strong> {userDetails.address.city}
            </p>
            <p>
              <strong>Zipcode:</strong> {userDetails.address.zipcode}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-medium mb-2">Geo Information:</h3>
          <div className="text-base">
            <p>
              <strong>Latitude:</strong> {userDetails.address.geo.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {userDetails.address.geo.lng}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
