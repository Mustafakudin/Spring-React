import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/apiProgress';
import Spinner from '../components/Spinner';

 const UserPage  = () => {

    const [user,setUser] = useState({});
    const[username ] = useParams;  // bunu props.match.params.username almaktansa hook un params objesini kullanıırız

    const [notFound ,setNotFound] = useState(false);
    
    const[t] = useTranslation();
    const pendingApiCall = useApiProgress('/api/1.0/users/' + username);  // bu path ait olan requestleri takip edioyr olacagız 
    
    useEffect (() =>{
      setNotFound(false);  // burada ise artık tekrardan false geç diyoruz baska bir kullanıcı girilerse 
    },[user]);
    
    useEffect(() =>{   // belirledigimiz kırıtlerdeki hiçbir şey de olabilir veyahut belirledigimiz array içinde itemlar olabilir bu itemlarda abir değişim olursa o zaman bu fonsk yon calssın boyle bir implementasyon 
    const loadUser =async () => {
      try{
        const response =await getUser(username);
        setUser(response.data)
        
      }catch(error){
        setNotFound(true);  // burada hataya duserse true geç ve hata mesajını aldır diyoruz 
      }
    };
    loadUser();
  },[username]);

  if(pendingApiCall){
    return <Spinner/>
  };
  if(notFound){
    return(
      <div className="alert alert-danger text-center">  
        <div>
         <span className="material-symbols-outlined" style={{fontSize:'48px '}}> 
          error
          </span>
        </div>
        {t("User not found")} 
     </div>
    )
  }
     return (
      <div className='container'>
        <ProfileCard  user = {user}/>  
      </div>// profilCard da artık props ıcınde user alabilir 
    );
  };

export default UserPage;