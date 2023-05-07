import  {useEffect, useState } from 'react'
import axios from 'axios';


export const useApiProgress= apiPath =>{
  const [pendingApiCall,setPendingApiCall] =useState(false) 

  useEffect(() => {  // yeni bir effecten sonra 
    let requestInterceptors ,responseInterceptors;
   const  updateApiCallFor=(url,inProgress) =>{
      if(url.startsWith(apiPath)){
        setPendingApiCall(inProgress); //  this.setState({pendingApiCall:inProgress});
      }
    };
    const registerInterceptors=() =>{
      requestInterceptors=  axios.interceptors.request.use(request=>{
        console.log("running request interceptors" ,apiPath)
 //     if(request.url ===this.props.path){
   //       this.setState({pendingApiCall:true});
     // }
     updateApiCallFor(request.url,true);
      return request;
    });

    responseInterceptors=axios.interceptors.response.use(
      response=>{
     //   if(response.config.url===this.props.path){
          
      //this.setState({pendingApiCall:false});
      // }
      updateApiCallFor(response.config.url,false);
      return response;
    },
    error=>{
    //  if(error.config.url===this.props.path){
      //   this.setState({pendingApiCall:false});
      //}
    updateApiCallFor(error.config.url,false);
      throw error;   // her yerde calısabilir bi kod 
    }
    );
    }
    
   const  unregisterInterceptors =() =>{
      axios.interceptors.request.eject(requestInterceptors);
      axios.interceptors.request.eject(responseInterceptors);
    }

    registerInterceptors();
    return function  unmount() {
      unregisterInterceptors();
    };
  }, [apiPath]);
  return pendingApiCall;
};


