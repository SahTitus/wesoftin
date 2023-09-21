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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Go Back
          </button>
          <div className="text-3xl font-semibold">{userDetails.name}</div>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:flex items-center justify-center">
              <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 rounded-full" />
            </div>
            <div className="md:flex flex-col justify-center">
              <h2 className="text-2xl font-semibold">{userDetails.name}</h2>
              <div className="text-lg mt-2">
                <strong>Email:</strong> {userDetails.email}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Street:</strong> {userDetails.address.street}
              </div>
              <div>
                <strong>Suite:</strong> {userDetails.address.suite}
              </div>
              <div>
                <strong>City:</strong> {userDetails.address.city}
              </div>
              <div>
                <strong>Zipcode:</strong> {userDetails.address.zipcode}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Geo Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Latitude:</strong> {userDetails.address.geo.lat}
              </div>
              <div>
                <strong>Longitude:</strong> {userDetails.address.geo.lng}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4 text-center text-white">
        <p className="text-lg">
          Thank you for visiting the user details page. This UI uses GitHub's dark theme color.
        </p>
      </div>
    </div>
  );
}

export default DetailsPage;
