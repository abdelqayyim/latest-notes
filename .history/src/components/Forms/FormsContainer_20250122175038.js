import React from 'react';
import { useSelector } from 'react-redux';
import { FORMS } from '../../redux/slice';
import Create
const FormContainer = () => {
    const currentForm = useSelector((state) => state.language.currentForm);

  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <FormA />;
    
    default:
      return null;
  }
};

export default FormContainer;
