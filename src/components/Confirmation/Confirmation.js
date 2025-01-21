import React from 'react'; 
import styles from './Confirmation.module.css';


const Confirmation = (props)=>{
    return (
        <div className={styles.mainDiv}>
            <div className={styles.container}>
                <div className={styles.title}>{ props.title}</div>
                <div className={styles.btns}>
                    <div onClick={()=>props.response("no")} className={styles.cancel}>Cancel</div>
                    <div onClick={()=>props.response("yes")} className={styles.confirm}>Confirm</div>
                </div>
            </div>
        </div>
    )
};

export default Confirmation;