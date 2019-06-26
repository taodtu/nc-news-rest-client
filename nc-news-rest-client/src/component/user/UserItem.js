import React from 'react';
import Style from './User.module.css';


const UserItem = ({ user: { avatar_url, username, name } }) => {
 return (

  <div className={Style.user}>
   <img src={avatar_url} alt="avatar_img" className={Style.img} />
   <div className={Style.description}>
    <p> Username: {username}</p>
    <p>Name: {name}</p>
   </div>
  </div>

 );
};

export default UserItem;