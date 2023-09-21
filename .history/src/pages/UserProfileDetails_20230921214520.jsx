import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userLinks } from "../services/endpoint";
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
                console.error("Error fetching user details:", error);
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
        <div className="min-h-screen bg-gray-100 p-5">
            <button
                onClick={handleBackClick}
                className="mb-5 bg-primary text-white px-4 py-2 rounded-md hover:bg-accent focus:outline-none"
            >
                Go Back
            </button>

            <div className="bg-white rounded-lg p-8 shadow-md mx-auto max-w-2xl">
                <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto rounded-full border border-primary" />

                <h2 className="text-2xl md:text-3xl font-semibold mt-6 text-center text-primary">{userDetails.name}</h2>
                <p className="text-base md:text-lg text-gray-600 text-center mt-2">{userDetails.email}</p>

                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-700">Address:</h3>
                    <p className="text-base text-gray-600"><strong>Street:</strong> {userDetails.address.street}</p>
                    <p className="text-base text-gray-600"><strong>Suite:</strong> {userDetails.address.suite}</p>
                    <p className="text-base text-gray-600"><strong>City:</strong> {userDetails.address.city}</p>
                    <p className="text-base text-gray-600"><strong>Zipcode:</strong> {userDetails.address.zipcode}</p>
                    <p className="text-base text-gray-600 mt-2"><strong>Geo - Lat:</strong> {userDetails.address.geo.lat}, <strong>Lng:</strong> {userDetails.address.geo.lng}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
