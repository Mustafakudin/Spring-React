import React from 'react'
import logo from '../assets/Ribble-Logo.png';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
//import { Authentication } from '../shared/AuthenticationContext';


const Topbar = (props) => {
  //  const context =useContext(Authentication);

//   state={
  //    isLoggedIn:false ,    // burada loginde girdigimiz datalar topbarı tetiklesin diye bir üst component olan app.js tasıdık 
    //  username:"user1"
   //};

 //  static contextType=Authentication;

 //onClickLogout=() =>{
  // const action ={type:'Logout-success'};
  //this.props.dispatch( logoutSuccess());  

//}
  const {t,username,isLoggedIn,onLogoutSuccess} =props;  // burada component üstü vs oldugundan dolayı burada direkt props alaım diyoruz 
 
    //const{state ,onLogoutSuccess}=this.context; // bu state authencontexteki state  ve logout bu
  
    // const{isLoggedIn, username} = state; 
   // const isLoggedIn=false
   // const username=undefined ;
    let links = (   // burada normalde const vardı lakin const sabit bir değer oldugu için yeni bir değer alamıyordu bunun ıcın bizde let ekledik 
      <ul className='navbar-nav ms-auto'> 
        <li>
           <Link className="nav-link " to="/login">
             {t('Login')}
           </Link>
        </li>
        <li>
           <Link className="nav-link" to="/signup">
            {t('Signup')}  
           </Link>
        </li>
      </ul>
    );                                                          // {'/user/' +username}> burada aynısı daha efektif olsun diye
           if(isLoggedIn){  // burada öncelikle state true yaptık farz edelim ki kullanıcı login oldu ve anasayfada nelerin cıkması gerektigini yaptık
             links =(
                <ul className='navbar-nav ms-auto'> 
                  <li>
                   <Link className="nav-link" to={`/user/${username}`}> 
                    {username}
                   </Link>
                  </li>
                <li className='nav-link ' onClick={onLogoutSuccess} style={{cursor:'pointer'}}>
                   {t("Logout")}
                   </li>
                </ul>
             );
           }
              return (
               <div className='shadow-sm bg-light mb-2'> 
                  <nav className='navbar navbar-light container navbar-expand'> 
                       <Link className="navbar-brand" to="/">
                          <img src={logo} width="150" alt='Ribble Logo '/>
                        Ribble
                       </Link>
                      {links}
                  </nav>
               </div>
              );
 // render () {   // ,isLoggedIn,username ,onLogoutSuccess bunları daha burada kullanmıyoruz ondan cıkardım
   //         }
}
const TopBarWithTranslation = withTranslation()(Topbar);

const mapStateToProps= store =>{
  return{
    isLoggedIn:store.isLoggedIn,
    username:store.username
  }; 
};

const mapDispatchToProps = dispatch =>{
 return {
    onLogoutSuccess :()=>dispatch(logoutSuccess())
    
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TopBarWithTranslation);
