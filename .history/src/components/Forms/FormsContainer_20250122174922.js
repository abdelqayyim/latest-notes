import React from 'react';
import { useSelector } from 'react-redux';
import { FORMS } from '../../redux/slice';

const FormContainer = () => {
    const currentForm = useSelector((state) => state.lang);

  switch (currentForm) {
    case 'formA':
      return <FormA />;
    case 'formB':
      return <FormB />;
    case 'formC':
      return <FormC />;
    default:
      return <div>Select a form to display</div>;
  }
};

export default FormContainer;
