import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FORMS, setCurrentForm } from '../../redux/slice';
import CreateCourseForm from './CreateCourseForm';
import CreateNoteForm from './CreateNoteForm';
const FormsContainer = () => {
    const dispatch = useDispatch();
    const currentForm = useSelector((state) => state.languages.currentForm);
    

  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return <CreateCourseForm open={true} onClose={()=>dispatch(setCurrentForm(undefined))}/>;
    
    default:
      return null;
  }
};

export default FormsContainer;
