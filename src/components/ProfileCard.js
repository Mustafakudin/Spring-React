import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // burada tam olarak su var props ıcındeki match onun içindeki params içindeki username ulaşmıs oluyoruz profilcard kullanabilmek için 
import {useSelector} from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/apiProgress';
import ButtonWithProgress from './ButtonWithProgress';

    const ProfileCard = props => {  // eğer login olduysak biz bu kullanıcıların bilgilerini güncelleyebiliriz aksi durumda güncelleyemezi 
                                    // iki veriye ihtiyacımız var birinicis login olan kullanıcı bilgisi ikincisi ise biz suan hangi sayfadayız yani login olan kullanıcıyla bulunudugmuz sayfa birbirine eşit ise  o zaman biz suan kullanıcın login olan sayfasındayız ve editleyebiliriz 
      const[inEditMode , setInEditMode] =useState(false);
      const[updateDisplayName ,setUpdateDisplayName] = useState();
      const {username : loggedInUsername} = useSelector((store) => ({username : store.username}))
      const routeParams=useParams();
      const pathUsername=routeParams.username; 
      const [user,setUser]  =useState({});
      const [editable ,setEditable] = useState(false);
      useEffect(() =>{
        setUser(props.user)
      },[props.user]) 
      useEffect(() =>{
        setEditable(pathUsername === loggedInUsername)
       
      },[pathUsername,loggedInUsername])

      const{username,displayName,image} = user;
      const{t} = useTranslation();
      
      useEffect(() => {
        if(!inEditMode){
          setUpdateDisplayName(undefined);
        }else{
          setUpdateDisplayName(displayName)
        }
        
      },[inEditMode,displayName])
      const onClickSave = async () => {
        const body = { 
          displayName:updateDisplayName
        };
        try{
          const response = await updateUser(username,body);
          setInEditMode(false);
          setUser(response.data);
        }
        catch(error) {}
        
      };
      
      const onChangeFile  = (event)  =>{

      }
      const pendingApiCall  =  useApiProgress['put', '/api/1.0/users/' + username]  
      return(
        <div className='card text-center'>
          <div className='card-header'>
               <ProfileImageWithDefault className='rounded-circle-shadow'
                width="200" 
                 height="200"
                 alt={`${user.username} profile `}
                 image = {image}/>
          </div>
            <div className='card body '>
              {!inEditMode&&(
                <>
                  <h3>
                  {displayName}@{username}
                  </h3>
                  {editable && (<button className='btn btn-success d-inline-flex' onClick={() =>setInEditMode(true)}>
                  <span className="material-symbols-outlined">edit</span>
                    {t("Edit")}
                  </button>
                  )}
                </>
            ) }
            {inEditMode&&(
              <div>
                <Input label={t("Change Display Name")} defaultValue={displayName} onClick={(event) => {setUpdateDisplayName(event.target.value)}}
                /> 
                <input type='file'  onChange={onChangeFile}/> 
                <div>
                  <ButtonWithProgress
                      className='btn btn-primary d-inline-flex'
                       onClick={onClickSave}
                       disabled ={pendingApiCall}
                       pendingApiCall={pendingApiCall}
                       text ={
                        <>
                        <span className="material-symbols-outlined">save</span>
                        {t("Save")}
                        </>
                       }
                  /> 
                <button className='btn btn-light d-inline-flex ml-1' 
                onClick={() =>setInEditMode(false)}
                disabled={pendingApiCall}>
                <span className="material-symbols-outlined">close</span>{t("Cancel")}
                </button>
                </div>
              </div>
            )}
            </div>
     </div>
      );
};
export default ProfileCard;
