import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/apiCalls'
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/apiProgress';
import Spinner from './Spinner';

const  UserList= () =>{
    const[page , setPage] = useState({
        content : [],
        size : 3,
        number : 0
    });
    const [loadFailure ,setLoadFailure] = useState(false);
    const pendingApiCall=useApiProgress('get' , '/api/1.0/users?page');
    
    useEffect(() => {
        loadUsers();
    }, []);

  //  componentDidMount(){   // burada kullanıcıları listeliyoruz    
    //  this.loadUser(); // boyle yapınca bir içine deger vermezsek paage undifend kaldıgından apiCalls taki gibi page 0 size3  olarak cıkıcak ılk basta 
    //}
    const onClickNext = () => {  // bu bize net butonuna bastıgımızda artık diğer kullanıcıları göstericek 
        const nextPage =page.number + 1;  // biz suan hangi sayfadayız 
        loadUsers(nextPage); 
    }
    const onClickPrevious=()=>{  // bu bu first aslında en basta true du sonraki sayfaya gecınce false gecıs yapıcak ondan sonra bizim onumuze previous cıkmıs olucak 
        const previousPage =page.number - 1;  // biz suan hangi sayfadayız 
        loadUsers(previousPage); 
    }
    const loadUsers = async page =>{
        setLoadFailure(false); // next butonun altında yazdırıyoruz 
       try{
         const response = await  getUsers(page);// getUser cagırcaz nasıl cagırıcaz var olan page in bi sonrakisiyle
         setPage(response.data);
        }catch (error) {
            setLoadFailure(true); 
        }
    }

   const {t} = useTranslation();
   const {content: users,last,first } =page;  // burada anasayfaya sıralam ıslemı yaptık kullanıcıları  // content yeni bir isim verdik
   let actionDiv = (
    <div>
            {first ===false && <button className='btn btn-sm btn-light ' onClick={onClickPrevious}>{t('Previous')}</button>}
            {last ===false && <button className='btn btn-sm btn-light float-end' onClick={onClickNext}>{t('Next')}</button>}
        </div>
   );
   if (pendingApiCall) {
    actionDiv = (<Spinner/>
    )
}
   return (
    <div className='card'>
        <h3 className='card-header text-center'>{t('Users')}</h3>
        <div className='list-group'>
            {
            users.map(user =>(   // burada indexin aslında bizi cok yanıltacagını görüyoruz ondan dolayı boyle devam ettik 
            <UserListItem key ={user.username} user ={user} />
               // <div key={index }>{user.username}</div> // key eklemek gerekiyor böyle bir list component ekliyorsam unieq bir key ekle 
        ))}
        </div>
        {actionDiv}
        {loadFailure && <div className='text-center text-danger'>{t('Load failure')} </div>}
    </div>
   );
}   
export default UserList;