import React from 'react';
import { useTranslation} from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';


const LanugageSelector = (props) => {
   const {i18n} = useTranslation();
   const onChangeLanguage =language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };
    return (
       
        <div className="container">
        <button
            className="btn btn-primary m-2"
            onClick={() => onChangeLanguage('tr')}>TR
        </button>
        <button
            className="btn btn-primary m-2"
            onClick={() => onChangeLanguage('en')}> EN
        </button>
    </div>
    );
};

export default LanugageSelector;