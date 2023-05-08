import React, { useEffect, useState } from 'react'  // rcc diyerek olusturduk
import Input from '../components/Input';
import { useTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';  
import { useApiProgress } from '../shared/apiProgress';
import {useDispatch} from 'react-redux';
import { loginHandler  } from '../redux/authActions';

const LoginPage =props => {  // hhooks için const cevirdik  
 
  const [username ,setUsername] =useState(); // bu useState herhani bir değer için başlangıc değer atabiliriz ilk paramatere değişkenin adı ikinci parametre o değişkeni güncelleyecek fonksiyon adı
  const [password,setPassword] = useState();
  const [error,setError] =useState();
  const dispatch = useDispatch(); // burada tanımlamamız lazım aksi durumda bir hata alıyoruz 

  useEffect(() =>{      // bir etki oldugunda tetikelencek fonskiyon// iki parametre alıyor ilki cagıralacak fonskiyon ikincisi bu fonksiyon cagrılmasını tetikeylecek depencdy listesi
    setError(undefined);  // erroru sil
  },[username,password]);  // username veya password bir değişim olursa 
   
    const onClickLogin = async event =>{   
      event.preventDefault();
     
      const creds = {
        username,
        password
      };
      const{history} = props;
      const{push} =history;
      setError(undefined); // burada error güncel halini tutnus oluyoruz 
     
      try{
        await dispatch(loginHandler(creds));  
      push('/');
      }
      catch(apiError){
         setError(apiError.response.data.message);  // bunu ekleyerek browserda hata mesajını görmemzi saglıyor
     
      }

     
    }
    const{t} = useTranslation();// sebebi daha basit olması cunku extra bir rapping işlemine yani exportta kullanmdık high herder cmoponentle sarmıs olmadık yani

    const pendingApiCall =useApiProgress('post' , '/api/1.0/auth');

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


export default LoginPage; // bunu yapmamızın sebebi ise ....