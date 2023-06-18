import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [username, setUsername] = useState('');
  const [signInStatus, setSignInStatus] = useState(false);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [menuItems, setMenuItems] = useState([]);

  return (
    <UserContext.Provider value={{username, setUsername, signInStatus, setSignInStatus, cart, setCart, total, setTotal, menuItems, setMenuItems }}>
    {props.children}
  </UserContext.Provider>
  );
};
