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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
            <button
                onClick={handleBackClick}
                className="mb-5 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
            </button>

            <div className="bg-white rounded-lg p-8 shadow-md w-full sm:w-96">
                <Avatar name={userDetails.name} src={userDetails.profilePicture} className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500" />

                <h2 className="text-3xl font-semibold mt-6 text-center text-blue-600">{userDetails.name}</h2>
                <p className="text-gray-600 text-center text-lg">{userDetails.email}</p>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700">Address:</h3>
                    <div className="mt-2">
                        <p className="text-gray-600"><span className="font-semibold">Street:</span> {userDetails.address.street}</p>
                        <p className="text-gray-600"><span className="font-semibold">Suite:</span> {userDetails.address.suite}</p>
                        <p className="text-gray-600"><span className="font-semibold">City:</span> {userDetails.address.city}</p>
                        <p className="text-gray-600"><span className="font-semibold">Zipcode:</span> {userDetails.address.zipcode}</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Geo:</span> Lat: {userDetails.address.geo.lat}, Lng: {userDetails.address.geo.lng}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
