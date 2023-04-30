import React from 'react';

const ButtonWithProgress = (props) => {
    const{onClick,pendingApiCall,disabled,text}= props;  // burada isterlerimizi yazıyoruz button kodunda ,pendingapi her iki sayfada var onu tek ekledik lakin paswoordrepat ibirnde var birinde yok bndan dolayı paswordrepait yerine disabled diyoruz 
    return (                                        // signup da text diye alıyoruz 
             <button className="btn btn-primary" onClick={onClick} disabled={disabled}
                    >{pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
                    </button >  
    );
};

export default ButtonWithProgress;