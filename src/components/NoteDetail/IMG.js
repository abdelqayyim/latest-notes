import React from 'react'; 
import styles from '../NoteDetail/IMG.module.css';

const IMG = ({ img, index, removeElement, moveElement }) => {
    const moveHandler = () => {
        moveElement(index);
    };

    const deleteHandler = () => {
        removeElement(index);
    };

    // Resize settings: max width and height for the image
    const imgStyles = {
        maxWidth: '100%',  // Adjust width as needed (e.g., 100% to fit parent container)
        height: 'auto',    // Maintain aspect ratio
        maxHeight: '500px' // Adjust the max height as needed
    };

    return (
        <div className={styles.parent} style={{ marginTop: "10px" }}>
            <div className={styles.btn}>
                {index !== 0 && (
                    <div onMouseDown={moveHandler}>
                        <span className="material-symbols-outlined">expand_less</span>
                    </div>
                )}
                <div onMouseDown={deleteHandler}>
                    <span className="material-symbols-outlined">delete_forever</span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <img type="image" src={img} style={imgStyles} alt="note" />
            </div>
        </div>
    );
};

export default IMG;
