import React, { useEffect, useState } from 'react'  // rcc diyerek olusturduk
import Input from '../components/Input';
import { useTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';  
import { withApiProgress } from '../shared/apiProgress';
import {useDispatch} from 'react-redux';
import { loginHandler  } from '../redux/authActions';

const LoginPage =props => {
 
  const [username ,setUsername] =useState();
  const [password,setPassword] = useState();
  const [error,setError] =useState();
  const dispatch = useDispatch();

  useEffect(() =>{
    setError(undefined);
  },[username,password]);
   
    const onClickLogin = async event =>{  
      event.preventDefault();
     
      const creds = {
        username,
        password
      };
      const{history} = props;
      const{push} =history
      setError(undefined);
     
      try{
          await dispatch(loginHandler(creds));
      
      push('/');
      }
      catch(apiError){
         setError(apiError.response.data.message);
     
      }

     
    }
    const{t} = useTranslation();
    const{pendingApiCall} = props;
    const buttonEnabled = username && password; 
    return (
      <div className="container">
        <form>
            <h1 className='text-center'> {t("Login")} </h1> 
            <Input label ={t("Username")}  onChange={(event) =>setUsername(event.target.value)}/>  
            <Input label ={t("Password")}  type="password" onChange ={(event) => setPassword(event.target.value)}/>
            {error && <div className="alert alert-danger" >{error}</div>}
            <div className='text-center'>
              <ButtonWithProgress  //burada button yazılan kodu sildik cunku importtan gelen buttonwithprogressten aldık ondan dolayı buraya ekledik 
               onClick={onClickLogin} // burada yapılan button kısa süreligine spinnerli gözüküyor yani yükleniyor işaretli 
               disabled={!buttonEnabled ||  pendingApiCall} 
               pendingApiCall={pendingApiCall}
               text={t("Login")} 
               /> 
            </div>

        </form>
      </div>
    ); 
}


export default withApiProgress(LoginPage,'/api/1.0/auth'); // bunu yapmamızın sebebi ise ....