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

    const listItem = (item, index) => {
        return (
            <div className={styles.moreButtonListItem} onClick={()=>item.onAction()} key={index}>
                {item.child}
            </div>
        )
    }
    return (
        <div className={styles.moreButtonParentDiv}>
            <div onClick={()=>setOpenOptions(prev=>!prev)}>
                <span class="material-symbols-outlined">
                more_vert
                </span>
            </div>
            {openOptions &&
                    <Overlay isVisible={openOptions} isOverlayVisible={true} onClose={()=>setOpenOptions(false)} >
                        <div className={styles.moreButtonOptions}>
                            {menuItems?.map((item,index) =>listItem(item, index))}
                        </div>
                    </Overlay>
                }
        </div>
        
    )
        
}

export default MoreButton;