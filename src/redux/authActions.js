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

export const loginHandler=  credentials =>{
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

export const signupHandler =user =>{
    return async  function(dispatch){
        const response =await signup(user);
        await dispatch(loginHandler(user));
        return response;
    };

};