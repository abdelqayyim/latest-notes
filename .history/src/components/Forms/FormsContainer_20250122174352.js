import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentForm } from '../redux/formSlice';
import FormA from './forms/FormA';
import FormB from './forms/FormB';
import FormC from './forms/FormC';

const FormContainer = () => {
  const currentForm = useSelector(selectCurrentForm);

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
