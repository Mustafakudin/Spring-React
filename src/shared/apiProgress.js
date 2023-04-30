import React, { Component } from 'react'
import axios from 'axios';

function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component '
}

export function withApiProgress(WrappedComponent,apiPath){
  return class  extends Component {
    static displayName= `apiProgress(${getDisplayName(WrappedComponent)})`;  // bu altakiyle aynı işlevi yapıyor sadece javasrcipt bir özelliği diye
  //  static  displayName ='apiProgress('+ getDisplayName(WrappedComponent)+')'; // browserdaki componentin yapısını isimlendirmesinin daha anlamlı hale getirmeye çalışıyoruz 
    state={
        pendingApiCall:false
    };
    componentDidMount(){
      this.requestInterceptor=  axios.interceptors.request.use(request=>{
            console.log("running request interceptors" ,apiPath)
     //     if(request.url ===this.props.path){
       //       this.setState({pendingApiCall:true});
         // }
         this.updateApiCallFor(request.url,true);
          return request;
        });
  
      this.responseInterceptor=axios.interceptors.response.use(
          response=>{
         //   if(response.config.url===this.props.path){
              
          //this.setState({pendingApiCall:false});
          // }
          this.updateApiCallFor(response.config.url,false);
          return response;
        },
        error=>{
        //  if(error.config.url===this.props.path){
          //   this.setState({pendingApiCall:false});
          //}
         this.updateApiCallFor(error.config.url,false);
          throw error;   // her yerde calısabilir bi kod 
        }
        );
      }

      componentWillUnmount(){
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.request.eject(this.responseInterceptor);
      }

  updateApiCallFor=(url,inProgress) =>{
    if(url===apiPath){
      this.setState({pendingApiCall:inProgress});
    }
  }
  render() {
  
    const pendingApiCall=this.state.pendingApiCall || this.props.pendingApiCall;
    return <WrappedComponent {...this.props} pendingApiCall={pendingApiCall}/> ; // bir obje olarak bu componetnın dişarıdan aldıgı bütün propertileri ... ile pasla diyoruz 
      //<div>{React.cloneElement(this.props.children,{pendingApiCall})}</div>;  // childern component olarak degılde bir parametre olarak alalım o da wrappedCommenent 
      
    }

}
}
