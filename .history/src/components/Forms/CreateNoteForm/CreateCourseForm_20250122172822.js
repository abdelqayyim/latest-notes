import React from 'react'; 
// import './CreateCourseForm.css';
import Overlay from '../../Overlay/Overlay';

const CreateCourseForm = ({open, onClose})=>{
    return (
        <Overlay isVisible={open} isOverlayVisible={true}>
            <div>Hello world</div>
        </Overlay>
    )
};

export default CreateCourseForm;