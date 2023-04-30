import React from 'react';
import { withRouter } from 'react-router-dom'; // burada tam olarak su var props ıcındeki match onun içindeki params içindeki username ulaşmıs oluyoruz profilcard kullanabilmek için 

import {connect} from 'react-redux';

const ProfileCard = props => {  // eğer login olduysak biz bu kullanıcıların bilgilerini güncelleyebiliriz aksi durumda güncelleyemezi 
  // iki veriye ihtiyacımız var birinicis login olan kullanıcı bilgisi ikincisi ise biz suan hangi sayfadayız yani login olan kullanıcıyla bulunudugmuz sayfa birbirine eşit ise  o zaman biz suan kullanıcın login olan sayfasındayız ve editleyebiliriz 

      const pathUsername=props.match.params.username;  // burada sunu yaptık components yani browserdaki props kazıya kazıya en yukardan en aşaıga ulaştık 
                          // const loggedInUsername=props.username;   //  value içinden getirebiliriz auten sınıfda vlaue onun içinde state statte yukarda username vs fieldları tutuyor    bunu yapmamızın amacı login olduktan sonra user1 tıkladıgımızda we can edit yazabilsin diye  
      let message="we cannot edit ";
      if(pathUsername === props.loggedInUsername){
        message="We can edit";
      }
      return <div>
            {message}
            </div>;
};
//class ProfileCardContextWrapper extends React.Component{ 
 // static contextType =Authentication;
  //render(){
    //return <ProfileCard {...this.props} username={this.context.state.username}/>

//   }
//}

const mapStateToProps= store =>{
  return{
    loggedInUsername:store.username
  }; 
};


export default connect(mapStateToProps)(withRouter(ProfileCard)) ;
