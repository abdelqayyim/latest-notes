import React, use from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FORMS, setCurrentForm } from '../../redux/slice';
import CreateCourseForm from './CreateCourseForm';
const FormsContainer = () => {
    const dispatch = useDispatch();
    const currentForm = useSelector((state) => state.language?.currentForm);
    console.log(`currentForm`,currentForm);
  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <CreateCourseForm open={true} onClose={()=>dispatch(setCurrentForm(undefined))}/>;
    
    default:
      return null;
  }
};

export default FormsContainer;
