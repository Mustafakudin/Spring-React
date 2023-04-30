import axios from "axios";

export const signup = body => {
   return axios.post('/api/1.0/users', body); //,{headers:{'accept-language' : 'tr'} kısaca belirtik post metodunda tanımlı oldugu için accept tr diyebiliyoruz direkt
 };

 export const login = creds => {
  return axios.post('/api/1.0/auth' , {} , { auth: creds}); // ilk {} bu request body bos olsun  üçüncü basicaututhen ile yapıcaz diye bu parametreyi kullanıcaz
 };

 export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] =language;
 }
 