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
        <>
        </>
        
    )
        
}

export default MoreButton;