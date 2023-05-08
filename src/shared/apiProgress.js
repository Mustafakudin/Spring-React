import  {useEffect, useState } from 'react'
import axios from 'axios';


export const useApiProgress= (apiMethod,apiPath) =>{
  const [pendingApiCall,setPendingApiCall] =useState(false);

  useEffect(() => {  // yeni bir effecten sonra 
    let requestInterceptor ,responseInterceptor;
   const  updateApiCallFor=(method ,url,inProgress) =>{
      if(url.startsWith(apiPath) && method === apiMethod){
        setPendingApiCall(inProgress); //  this.setState({pendingApiCall:inProgress});
      }
    };
  const registerInterceptors=() =>{
     requestInterceptor=  axios.interceptors.request.use(request=>{
      const{method,url} =request;
      updateApiCallFor(method,url,true);
      return request; 
    });

    responseInterceptor=axios.interceptors.response.use(response=>{
      const{url,method} = response.config;
      updateApiCallFor(method,url,false);
      return response;
    },
    error=>{
      const{url,method }=error.config;
      updateApiCallFor(method,url,false);
      throw error;   // her yerde calısabilir bi kod 
    }
  );
 };
    
   const  unregisterInterceptors =() =>{
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.request.eject(responseInterceptor);
    }

    registerInterceptors();
    return function  unmount() {
      unregisterInterceptors();
    };
  }, [apiPath,apiMethod]);
  return pendingApiCall;
};


