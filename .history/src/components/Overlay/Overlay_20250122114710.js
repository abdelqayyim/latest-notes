import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overlay.module.css'; // Create a CSS file for styling

const Overlay = ({ isVisible, isOverlayVisible, onClose, children, closeOnOutsideClick = true }) => {
  if (!isVisible) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      console.log("Overlay has been clicked");
      onClose();
    }
  };

  return (
    <div className={`${styles["overlay"]} ${isOverlayVisible ? styles["show"]: ""}`} onClick={handleOverlayClick}>
      <div className={styles["overlay-content"]}>
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  closeOnOutsideClick: PropTypes.bool,
};

export default Overlay;
