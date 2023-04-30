import React from "react";
import LanugageSelector from "../components/LanugageSelector";
import LoginPage from "../pages/LoginPage";
import UserSignupPage from "../pages/UserSignupPage"; 
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import TopBar from "../components/TopBar";
//import { Authentication } from "../shared/AuthenticationContext";   // BUNU SUNDAN YAPIYORUZ LOGİN OLDUGUMUZDA URL DEN LOGİN YAZDIGMIZDA TEKRAR AYNI SAYFAYA GİTTİGİMİZDEN DÜZELTMEK İÇİN YANİ
import {connect} from 'react-redux';
class App extends React.Component {  // react ile logo vs vardı
 // static contextType=Authentication;

  //state={  // AuthenticationContext sınıfına tasıdık daha bagımsız olması için
    //  isLoggedIn: false ,  // bu normalde topbardaydı lakin biz sorulması gerek soru şu ki login sayfasında girdiğimiz datalar nasıl olurda burdaki topbarın değişikliini tetikler lifting state up bunun anlamı su state bulundugunuz konumdan daha yukardaki componentlere taşıyın diyor bu da topbarla login hangi classta ortak bi bkaıyoruz ki app.js de ortak o zaman state buraya taşımalıyız
      //userName:undefined  
   //}; 
   //onLoginSuccess= username =>{  // burada amac islogginde appteki isloggin ve username değerlerini doldurup değiştirmeye yarıyacak bir fonksiyon ekliyecegiz onLogginSuccses
    //this.setState({   // burada succes durumda loggin true olsun diyoruz 
      //userName,
      //isLoggedIn : true
    //});
   //};
   
   //onLogoutSuccess=()=>{   // eğer cıkıs vs yaptıgında ise false duruma geri gelsin diyoruz 
    //this.setState({
      //isLoggedIn:false,
      //userName : undefined
    //});
   //};
   render(){
    const {isLoggedIn} = this.props;   //this.context.this.state.isLoggedIn;  contexten geliyor  // BÖYLE YAPARAK LOGİN OLDUKTAN SONRA URL LOGİN YAZARSAK ARTIK ANASAYAFA DÜŞMEK İÇİN 
    //const userName =undefined buna artık gerek yok cunku context hallediyor bunu sırf lifting yontemi için 
  //   const {isLoggedIn,username}=this.state;
    return (                            //username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess} topbardan sıldık cunku appten alıcaz o da autenhtication dan alıcak
      <div>   
         <Router> 
          <TopBar /> 
          <Switch>
            <Route exact path ="/" component={HomePages}/> 
            {!isLoggedIn &&( <Route path ="/login" component={LoginPage}/>) }
            <Route path ="/signup" component={UserSignupPage}/>
            <Route path="/user/:username" component={UserPage}/>  
            <Redirect to ="/"/>
          </Switch>
        </Router>
       <LanugageSelector/>
    </div>
                                                                                                            
      );
    }
  }

  
  const mapStateToProps= store =>{
    return{
      isLoggedIn:store.isLoggedIn
    }; 
  };

export default connect(mapStateToProps)(App);
