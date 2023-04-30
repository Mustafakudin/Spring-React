import React from 'react';
import { withTranslation} from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';


const LanugageSelector = (props) => {
   const onChangeLanguage =language => {
        const{i18n} =props;
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

export default withTranslation()(LanugageSelector);