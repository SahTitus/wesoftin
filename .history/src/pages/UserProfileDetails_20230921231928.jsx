import { useState, useEffect } from 'react';
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
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex items-center">
            <Avatar name={userDetails.name} src={userDetails.profilePicture} className="mr-w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0" />

            <div className="md:ml-8 flex-grow">
              <h2 className="text-2xl font-semibold">{userDetails.name}</h2>
              <div className="text-lg">
                <strong>Email:</strong> {userDetails.email}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Address</h2>
            <table className="table-fixed w-full text-lg">
              <tbody>
                <tr>
                  <td className="font-semibold">Street:</td>
                  <td>{userDetails.address.street}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Suite:</td>
                  <td>{userDetails.address.suite}</td>
                </tr>
                <tr>
                  <td className="font-semibold">City:</td>
                  <td>{userDetails.address.city}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Zipcode:</td>
                  <td>{userDetails.address.zipcode}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Geo Information</h2>
            <table className="table-fixed w-full text-lg">
              <tbody>
                <tr>
                  <td className="font-semibold">Latitude:</td>
                  <td>{userDetails.address.geo.lat}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Longitude:</td>
                  <td>{userDetails.address.geo.lng}</td>
                </tr>
              </tbody>
            </table>
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
