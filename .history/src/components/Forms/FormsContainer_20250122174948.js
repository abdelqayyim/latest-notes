import React from 'react';
import { useSelector } from 'react-redux';
import { FORMS } from '../../redux/slice';

const FormContainer = () => {
    const currentForm = useSelector((state) => state.language.currentForm);

  switch (currentForm) {
    case 'formA':
      return <FormA />;
    
    default:
      return null;
  }
};

export default FormContainer;
