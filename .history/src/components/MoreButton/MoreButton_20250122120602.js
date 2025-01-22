import React, { useState, useRef } from 'react';
import styles from './MoreButton.module.css';
import Overlay from '../Overlay/Overlay';

const MoreButton = ({ menuItems }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const buttonRef = useRef(null); // Reference to the "More" button

  // Handle clicking outside to close the options
  const handleOverlayClose = () => setOpenOptions(false);

  const listItem = (item, index) => (
    <div className={styles.moreButtonListItem} onClick={() => item.onAction()} key={index}>
      {item.child}
    </div>
  );

  const buttonStyles = buttonRef.current ? {
    position: 'absolute',
    top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight,
    left: buttonRef.current.offsetLeft,
  } : {};

  return (
    <div className={styles.moreButtonParentDiv}>
      <div ref={buttonRef} onClick={() => setOpenOptions(prev => !prev)}>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
      
      {openOptions && (
        <Overlay isVisible={openOptions} onClose={handleOverlayClose} isOverlayVisible={true}>
          <div className={styles.moreButtonOptions} style={buttonStyles}>
            {menuItems?.map((item, index) => listItem(item, index))}
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default MoreButton;
