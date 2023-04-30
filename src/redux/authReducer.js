import * as ACTİONS from './constans';

const defaulState={
    isLoggedIn: false ,  // bu normalde topbardaydı lakin biz sorulması gerek soru şu ki login sayfasında girdiğimiz datalar nasıl olurda burdaki topbarın değişikliini tetikler lifting state up bunun anlamı su state bulundugunuz konumdan daha yukardaki componentlere taşıyın diyor bu da topbarla login hangi classta ortak bi bkaıyoruz ki app.js de ortak o zaman state buraya taşımalıyız
      username:undefined ,  // username displayname image login cevabından alabiliyoruz ama password kullanıcı girdiği degeri alabiliriz bir tek 
      displayName:undefined,
      image:undefined,
      password:undefined

}
const authReducer =(state={...defaulState},action)=>{ // guncel state üretip bize dönücek olan fonksiyon
    if(action.type === ACTİONS.LOGOUT_SUCCESS){
        return defaulState;
    }else if (action.type === ACTİONS.LOGİN_SUCCESS){
        return{
            ...action.payload,
            isLoggedIn:true
        };
    }
    return state;

};

export default authReducer;