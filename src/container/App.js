import React from "react";
import LanugageSelector from "../components/LanugageSelector";
import LoginPage from "../pages/LoginPage";
import UserSignupPage from "../pages/UserSignupPage"; 
import HomePages from "../pages/HomePages";
import UserPage from "../pages/UserPage";
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import TopBar from "../components/TopBar";
//import { Authentication } from "../shared/AuthenticationContext";   // BUNU SUNDAN YAPIYORUZ LOGİN OLDUGUMUZDA URL DEN LOGİN YAZDIGMIZDA TEKRAR AYNI SAYFAYA GİTTİGİMİZDEN DÜZELTMEK İÇİN YANİ
import {useSelector} from 'react-redux';
const App = () => {  // react ile logo vs vardı
  const{isLoggedIn}=useSelector((store) =>({
    isLoggedIn:store.isLoggedIn
  }))
 
    return (                     
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
export default App;
