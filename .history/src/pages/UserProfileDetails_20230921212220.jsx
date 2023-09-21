import { useEffect, useState } from 'react';
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
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    return <div className="min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  const handleBackClick = () => {
    history(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <button
        onClick={handleBackClick}
        className="mb-5 bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>

      <div className="rounded-lg p-8 shadow-md mx-auto max-w-2xl bg-gray-800">
        <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto" />

        <h2 className="text-2xl font-semibold mt-6 text-blue-600">{userDetails.name}</h2>
        <p className="text-gray-600 text-center">{userDetails.email}</p>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-400">Address:</h3>
          <p className="text-gray-600">Street: {userDetails.address.street}</p>
          <p className="text-gray-600">Suite: {userDetails.address.suite}</p>
          <p className="text-gray-600">City: {userDetails.address.city}</p>
          <p className="text-gray-600">Zipcode: {userDetails.address.zipcode}</p>
          <p className="text-gray-600">
            Geo - Lat: {userDetails.address.geo.lat}, Lng: {userDetails.address.geo.lng}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
