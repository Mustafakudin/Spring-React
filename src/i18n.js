import i18n from 'i18next' ;
import {initReactI18next} from 'react-i18next';


i18n.use(initReactI18next).init({
    resources: {  
      en: {
        translations: {
          'Sign Up': 'Sign Up',
          'Password mismatch': 'Password mismatch',
          Username: 'Username',
          'Display Name': 'Display Name',
          Password: 'Password',
          'Password Repeat': 'Password Repeat',
          Login:"Login",
          Logout:"Logout",
          Signup :"Signup",
          Users :'Users',
          Next : 'next >',
          Previous : '< previous',
          'Load failure' : 'Load failure',
          'User not found ':'User not found ',
          Edit : "Edit",
          "Change Display Name" : "Change Display Name",
          Save :"Save",
          Cancel :"Cancel"
        }
      },
      tr: {
        translations: {
          "Sign up":"Kayit Ol", 
          'Password mismatch': 'Ayni şifreyi giriniz',
          Username: 'Kullanici Adi',
          'Display Name': 'Tercih Edilen İsim',
          Password: 'Şifre',
          'Password Repeat': 'Şifreyi Tekrarla',
          Login :"Sisteme gir",
          Logout:"Çık",
          Signup :"Kullanıcı gir",
          Users : 'Kullanıcılar',
          Next: 'Sonraki >',
          Previous : '< önceki',
          'Load failure' : 'Liste alınamadı',
          'User not found ' : 'Kullanıcı bulunamadı',
          Edit: "Düzenle",
          "Change Display Name" : "Görünür isminizi değiştirin",
          Save :"Kaydet",
          Cancel :"İptal et"
        }
      }
    },
    fallbackLng: 'en', // burrayı tr yaparsan turkce gelicek 
    ns: ['translations'], // kelimeleri hangi havuzdan alıcak 
    defaultNS: 'translations',
    keySeparator: false,// cok onemli değil acıcaksı bunu ogrenmen intternetten al yapıstır 
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });
  
  export default i18n;