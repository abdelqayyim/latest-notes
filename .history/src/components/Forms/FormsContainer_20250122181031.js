import React from 'react';
import { useSelector } from 'react-redux';
import { FORMS } from '../../redux/slice';
import CreateCourseForm from './CreateCourseForm';
const FormsContainer = () => {
    const currentForm = useSelector((state) => state.language?.currentForm);
    console.log(`currentForm`,currentForm);
  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <CreateCourseForm open={}/>;
    
    default:
      return null;
  }
};

export default FormsContainer;
