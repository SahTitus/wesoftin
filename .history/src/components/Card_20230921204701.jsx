// Card.js
import  { useContext } from 'react';
import { ModalContext } from './ModalContext';

const Card = ({ email, name, profile }) => {
  const { setModalData } = useContext(ModalContext);

  const handleClick = () => {
    setModalData({ email, name, profile });
  };

  return (
    <div onClick={handleClick}>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
