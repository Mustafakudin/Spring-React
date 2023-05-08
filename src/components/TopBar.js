import React from 'react'
import logo from '../assets/Ribble-Logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import { Authentication } from '../shared/AuthenticationContext';
import { useDispatch,useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
//import { Authentication } from '../shared/AuthenticationContext';


const Topbar = props => {
  const {t} = useTranslation();
  const {username,isLoggedIn} =useSelector((store)=>({  // mapstoPropsun aynısını  

      isLoggedIn:store.isLoggedIn, // cevaben ıslog ve username donup bu objeyi donmus olucak
      username:store.username
    }));
  
  const dispatch=useDispatch();
  const onLogoutSuccess =() =>{
    dispatch(logoutSuccess());
  }

  //const {onLogoutSuccess} =props;  // burada component üstü vs oldugundan dolayı burada direkt props alaım diyoruz 
 
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
                        
                       </Link>
                      {links}
                  </nav>
               </div>
              );
};
export default Topbar;
