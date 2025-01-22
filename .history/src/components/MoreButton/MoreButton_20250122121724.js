import React, { useState, useRef, useEffect, useState } from 'react';
import styles from './MoreButton.module.css';
import Overlay from '../Overlay/Overlay';

const MoreButton = ({ menuItems }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null); // Reference to the "More" button

  // Handle clicking outside to close the options
  const handleOverlayClose = () => setOpenOptions(false);

  // Calculate position of the button to position the options dropdown correctly
  useEffect(() => {
    if (buttonRef.current) {
      const { top, left, height } = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: top + height,  // Position the options right below the button
        left: left,
      });
    }
  }, [openOptions]); // Recalculate position when the options open

  const listItem = (item, index) => (
    <div className={styles.moreButtonListItem} onClick={() => item.onAction()} key={index}>
      {item.child}
    </div>
  );

  return (
    <div className={styles.moreButtonParentDiv}>
      <div ref={buttonRef} onClick={() => setOpenOptions(prev => !prev)}>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
      
      {openOptions && (
        <Overlay isVisible={openOptions} onClose={handleOverlayClose} isOverlayVisible={true}>
          <div
            className={styles.moreButtonOptions}
            style={{
              top: buttonPosition.top + 'px', // Set the top position dynamically
              left: buttonPosition.left + 'px', // Set the left position dynamically
            }}
          >
            {menuItems?.map((item, index) => listItem(item, index))}
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default MoreButton;
