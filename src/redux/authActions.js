import * as ACTİONS from './constans';
import { login ,signup} from '../api/apiCalls';

export const logoutSuccess=() =>{
    return {
        type:ACTİONS.LOGOUT_SUCCESS
    };
}

export const loginSuccess=authState =>{
    return{
        type:ACTİONS.LOGİN_SUCCESS,
        payload :authState
    }


}

export const loginHandler=  credentials =>{  // HEM LOGİN YAPMAK İÇİN HEMDE LOGİNSSUCCESS DÖNDÜRMEK İÇİN 
    return async function(dispatch){
    const response =await login(credentials);
         const authState = {
          ...response.data, 
          password:credentials.password
         };
         dispatch(loginSuccess(authState));
         return response; 
        };
};

export const signupHandler =user =>{  // burada signup olduktan sonra logine de request atabiliyor olmamız lazım ondan dolau 
    return async  function(dispatch){
        const response =await signup(user);   // 
        await dispatch(loginHandler(user));  // dispatch aldıktan sonra biraz beklememiz lazım ondan awati dedik
        return response;            // her şey success se repsonse bırakalım artık işlemleri
    };

};