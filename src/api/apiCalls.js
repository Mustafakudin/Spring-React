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
 export const getUsers = (page =0, size = 3) =>{ // burada page ve size default olarak yapılandırma ypaıyoruz cunku UserList ccomponentDidMount belirtemdigimizden 
  return axios.get(`/api/1.0/users?page=${page}&size=${size} ` );
 }
  export const setAuthorizationHeader=({username,password , isLoggedIn}) =>{
    if(isLoggedIn){
      const authorizationHeaderValue =`Basic ${btoa(username + ":" +password )}` // bu btoa string base64 ceviriyor 
    axios.defaults.headers['Authorization'] =authorizationHeaderValue;
    }else {
      delete axios.defaults.headers['Authorization'];
    }
    
  }
  export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
  }
  export const updateUser = (username,body) => {
    return axios.put(`/api/1.0/users/${username}`,body);
  }
