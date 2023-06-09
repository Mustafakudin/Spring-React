import React, { useState } from 'react';
import Input from '../components/Input';
import {useTranslation} from 'react-i18next'; 
import ButtonWithProgress from '../components/ButtonWithProgress';                                              
import { useApiProgress } from '../shared/apiProgress';
import{useDispatch} from 'react-redux';
import { signupHandler } from '../redux/authActions';
// yenilendi calisir durumda
const  UserSignupPage = (props) =>{
    const [form,setForm] =useState({
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null
    }); 
    const [errors , setErrors] =useState({});
    const dispatch =useDispatch();

    const  onChange =(event) =>{    
    const {name , value } = event.target;
    setErrors((previousErrors) => ({...previousErrors,[name]:undefined}));       // cevaben suan değiştirilen field undefiend döner diyelim
    setForm((previousForm) => ({...previousForm,[name]:value }))   // onceki forumn copyasını alıp  ve sonra suan degismekte olan field için yeni value  veririz 
    };
    const onClickSignUp  = async (event) =>{ 
        event.preventDefault(); 
         
        const{history} =props;
        const{push} =history;
        const {username, displayName,password} =form; 
        const body ={
            username,  
            displayName,
            password,
        };
         
           try{
            await dispatch(signupHandler(body));  // signup olduktan sonra push olarak anasayfaya gitsin diyoruz burada  signupHandler authActionstan getirtik
            push("/")
         }catch(error){
            if(error.response.data.validationErrors){ 
                setErrors(error.response.data.validationErrors);
             
            }
            
        } 
    };
            const{t} = useTranslation();
            const{username:usernameError,displayName:displayNameError ,password:passwordError}=errors; // errorsten username alıyormus gibi kullanıcagımız söylüyorz 
            const pendingApiCallSignup = useApiProgress('post' , '/api/1.0/users');
            const pendingApiCallLogin = useApiProgress('post' , '/api/1.0/auth');
            const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;
            let passwordRepeatError;   // değişken oldugu için let 
            if(form.password!==form.passwordRepeat){ 
                passwordRepeatError=t('Password mismatch');
            }
        return(
            <div className='container'> 
             <form>
                <h1 className="text-center"> {t("Sign up")} </h1>
                <Input name="username"  label={t("Username")} error={usernameError} onChange={onChange} />
                <Input name="displayName"  label={t("Display Name")} error ={displayNameError} onChange={onChange} />
                <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password"/>
                <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} onChange={onChange} type="password"/>
                <div className='text-center'>
                    
                    <ButtonWithProgress 
                    onClick={onClickSignUp}
                    disabled={pendingApiCall || passwordRepeatError !== undefined}
                    pendingApiCall={pendingApiCall}
                    text={t("Sign up")}
                    />  
                </div>
                
            </form>        
         </div> 
                            
        );      
             
};
 

export default UserSignupPage;