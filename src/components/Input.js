import React from "react";

const Input =(props)=>{ // props aldıgı değerleri asagıda kullanabiliriz
    const{label,errors,name, onChange ,type , defaultValue }=props; // object districton kullanabiliriz daha rahat olsun diye type sonradan ekledik cunku eklemezsek password kısmında sifre acık sekilde yazımı cıkıyor ondan doolayı buraya ekledik 
  
    const className=errors ? 'form-control is-invalid ' : 'form-control'; // tipi belirttik ki password gizli göstersin  eğer error varsa form kontrol is valid yoksa form control kullanılsın 

    return( 
        <div className="mb-3"> 
                    <label>{label}</label>
                    <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue}/> 
                    <div className="invalid-feedback"> {props.errors}</div>
         </div>
 
    );
}

export default Input;  