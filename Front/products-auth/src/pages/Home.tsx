import React, { useContext } from 'react';
import { UserContext } from '../useContext/userContext';

export const Home = () => {
  const { user } = useContext(UserContext);

  console.log('user home', user);
  return <div>Home</div>;
};
