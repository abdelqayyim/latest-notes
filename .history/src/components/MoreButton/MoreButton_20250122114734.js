import React, {useState} from 'react';
import styles from './MoreButton.module.css'
import Overlay from '../Overlay/Overlay';

const MoreButton = ({ menuItems}) => {
    const [openOptions, setOpenOptions] = useState(false);
    /*
        menuItems = [
            { child: "Edit", onAction: () => { console.log("Edit button was clicked"); } },
            { child: "Edit", onAction: () => { console.log("Edit button was clicked"); } }
        ]
    */
    // let menuItems = [
    //     { child: "Edit", onAction: () => { console.log("Edit button was clicked"); } },
    //     { child: "Edit", onAction: () => { console.log("Edit button was clicked"); } }
    // ]

    const listItem = (item) => {
        return (
            <div className={styles.moreButtonListItem} onClick={()=>item.onAction()}>
                {item.child}
            </div>
        )
    }
    return (
        <div className={styles.moreButtonParentDiv} onClick={()=>setOpenOptions(prev=>!prev)}>
            <span class="material-symbols-outlined">
            more_vert
            </span>
            {openOptions &&
                <Overlay isVisible={openOptions} isOverlayVisible={true} onClose={()=>console.log("More should be closed")} >
                    <div className={styles.moreButtonOptions}>
                        {menuItems?.map(item =>listItem(item))}
                    </div>
                </Overlay>
            }
        </div>
    )
        
}

export default MoreButton;