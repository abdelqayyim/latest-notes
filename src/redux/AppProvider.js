'use client'
import store from './store';
import { Provider } from 'react-redux';


const AppProvider = (props)=>{
    return (
        <Provider store={store}>
            { props.children}
        </Provider>
    )
};

export default AppProvider;