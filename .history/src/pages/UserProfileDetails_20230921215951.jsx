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
      <div className="bg-primary py-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark focus:outline-none"
          >
            Go Back
          </button>
          <h1 className="text-3xl font-semibold">{userDetails.name}</h1>
          <div className="w-10 h-10">
            <Avatar name={userDetails.name} src={userDetails.profilePicture} className="rounded-full" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">User Information</h2>
              <p className="text-lg">
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {userDetails.email}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Address</h2>
              <p className="text-lg">
                <strong>Street:</strong> {userDetails.address.street}
              </p>
              <p className="text-lg">
                <strong>Suite:</strong> {userDetails.address.suite}
              </p>
              <p className="text-lg">
                <strong>City:</strong> {userDetails.address.city}
              </p>
              <p className="text-lg">
                <strong>Zipcode:</strong> {userDetails.address.zipcode}
              </p>
              <p className="text-lg">
                <strong>Geo:</strong> Lat: {userDetails.address.geo.lat}, Lng: {userDetails.address.geo.lng}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
