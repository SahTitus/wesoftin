
import { useContext } from 'react';
import UserContext from '../userContext/userContext';
import Avatar from './Avatar';

const UserModal = ({ closeModal }) => {
    const user = useContext(UserContext);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
            <div className="bg-white rounded-lg p-8 w-1/3 relative" onClick={e => e.stopPropagation()}>
                <button className="absolute top-4 right-4" onClick={closeModal}>X</button>
                <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
                <p className="mb-4">{user.email}</p>
                <Avatar name={user.name} src={user.profilePicture} />
            </div>
        </div>
    );
};

export default UserModal;
