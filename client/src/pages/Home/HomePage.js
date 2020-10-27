import React from 'react';
import DiningHall from '../../components/DiningHall/DiningHall';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import './style.css';

export default () => {
  return (
    <div className='h-100'>
      <HomeNavbar />
      <DiningHall />
    </div>
  );
}
