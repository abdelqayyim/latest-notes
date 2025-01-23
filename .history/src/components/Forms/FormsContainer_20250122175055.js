import React from 'react';
import { useSelector } from 'react-redux';
import { FORMS } from '../../redux/slice';
import CreateCourseForm from './CreateCourseForm';
const FormsContainer = () => {
    const currentForm = useSelector((state) => state.language.currentForm);

  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <CreateCourseForm />;
    
    default:
      return null;
  }
};

export default FormContainer;
