import React, {useState} from 'react';
import styles from './NoteDetailTag.module.css';

const NoteDetailTag = ({options,currentLanguage}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.noteDetailTagParent} onClick={()=>setOpen(prev=>!prev)}>
             <div >
                {options.find(option=>option.name === currentLanguage)?.displayName}
            </div>
            {open && 
                <div className={styles.noteDetailTagOptions}>
                    {options.map((option, index) => (
                        <div className={styles.noteDetailTagListItem} onClick={()=>{option.onAction(); }} key={index}>
                            {option.displayName}
                        </div>
                        
                    ))}
                </div>
            }
        </div>
    )
};
export default NoteDetailTag;