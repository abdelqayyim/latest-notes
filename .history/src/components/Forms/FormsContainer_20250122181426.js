import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FORMS, setCurrentForm } from '../../redux/slice';
import CreateCourseForm from './CreateCourseForm';
import { useEffect } from 'react';
const FormsContainer = () => {
    const dispatch = useDispatch();
    const currentForm = useSelector((state) => state.language?.currentForm);
    console.log(`currentForm`, currentForm);
    
    useEffect(() => { },[])
  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <CreateCourseForm open={true} onClose={()=>dispatch(setCurrentForm(undefined))}/>;
    
    default:
      return null;
  }
};

export default FormsContainer;
