import React from 'react';
import { useParams } from 'react-router-dom'; // burada tam olarak su var props ıcındeki match onun içindeki params içindeki username ulaşmıs oluyoruz profilcard kullanabilmek için 

import {useSelector} from 'react-redux';

import ProfileImageWithDefault from './ProfileImageWithDefault';

    const ProfileCard = props => {  // eğer login olduysak biz bu kullanıcıların bilgilerini güncelleyebiliriz aksi durumda güncelleyemezi 
  // iki veriye ihtiyacımız var birinicis login olan kullanıcı bilgisi ikincisi ise biz suan hangi sayfadayız yani login olan kullanıcıyla bulunudugmuz sayfa birbirine eşit ise  o zaman biz suan kullanıcın login olan sayfasındayız ve editleyebiliriz 
      const {username : loggedInUsername} = useSelector((store) => ({
        username : store.username
      }))
      const routeParams=useParams();
      const{user} = props;
      const{username,displayName,image} = user;
      const pathUsername=routeParams.username;  // burada sunu yaptık components yani browserdaki props kazıya kazıya en yukardan en aşaıga ulaştık 
                          // const loggedInUsername=props.username;   //  value içinden getirebiliriz auten sınıfda vlaue onun içinde state statte yukarda username vs fieldları tutuyor    bunu yapmamızın amacı login olduktan sonra user1 tıkladıgımızda we can edit yazabilsin diye  
      let message="we cannot edit ";
      if(pathUsername === loggedInUsername){
        message="We can edit";
      }  
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
              <h3>
               {displayName}@{username}
              </h3>
            </div>
     </div>
      );
      
}
export default ProfileCard;
