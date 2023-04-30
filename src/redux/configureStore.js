import { createStore,applyMiddleware ,compose} from 'redux';
import authReducer from './authReducer';
import SecureLs from 'secure-ls';
import thunk from 'redux-thunk';
const secureLs = new SecureLs();

const getStateFromStorage =() =>{ 
    const ribbleData =secureLs.get('ribble-auth');

    let stateInLocalStorage ={
      isLoggedIn: false ,  // bu normalde topbardaydı lakin biz sorulması gerek soru şu ki login sayfasında girdiğimiz datalar nasıl olurda burdaki topbarın değişikliini tetikler lifting state up bunun anlamı su state bulundugunuz konumdan daha yukardaki componentlere taşıyın diyor bu da topbarla login hangi classta ortak bi bkaıyoruz ki app.js de ortak o zaman state buraya taşımalıyız
      username:undefined ,  // username displayname image login cevabından alabiliyoruz ama password kullanıcı girdiği degeri alabiliriz bir tek 
      displayName:undefined,
      image:undefined,
      password:undefined
    }
    if(ribbleData){
    
      return ribbleData;
        }
    return stateInLocalStorage;
}

const updateStateInStorage=newState =>{
    secureLs.set('ribble-auth',newState);

}
const consfigureStore=() =>{
    
     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const store = createStore(authReducer,getStateFromStorage(),applyMiddleware(thunk ));
    store.subscribe(() =>{
        updateStateInStorage(store.getState());
    })
    return store;
};
export default consfigureStore;