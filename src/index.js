import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
import './i18n'; 
import App from './container/App';
//simport AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux'; 
import consfigureStore from './redux/configureStore';



const store= consfigureStore(); 
const root = ReactDOM.createRoot(document.getElementById('root'));
 // bu bi parametre  // statimiz nolsun gibi dusun 
root.render(
   <Provider store={store}>
        <App/>       
   </Provider>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
