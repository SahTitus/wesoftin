import  { useState, useEffect } from 'react';
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
                const response = await fetch(`${userLinks}/${id}`);  // Adjust this if necessary

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
        return <div>Loading...</div>;
    }

    const handleBackClick = () => {
        history(-1)
    };

    return (
    
        
    );
}

export default DetailsPage;