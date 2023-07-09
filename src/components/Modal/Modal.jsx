import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalSt, Img } from './Modal.styled';

export const Modal = ({ showModal, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      showModal();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      showModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalSt>
        <Img src={largeImage} alt={largeImage} />
      </ModalSt>
    </Overlay>
  );
};

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
