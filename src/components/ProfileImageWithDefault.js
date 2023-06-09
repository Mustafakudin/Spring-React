import React from 'react';
import defaultPicture from '../assets/profile.png'
const ProfileImageWithDefault = (props) => {
    const {image,tempImage} = props;
    let imageSource =defaultPicture;  // burada yaptıgımız olay şu tempImage bizim choose yanı sectıgımız resim eklemek için eğer eklemediysek
                                    // default olarak ımageSource gitsin return de orda let kısmında defaultPicturs dönsün
    if(image) {
        imageSource = 'images/'+ image;
    }
    return <img 
    alt={` profile `} 
    src={tempImage || imageSource} {...props}
    onError={ event =>{
        event.target.src=defaultPicture;
    }

    }
    />
            

};

export default ProfileImageWithDefault;