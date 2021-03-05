import React from 'react';
import DiningHall from '../../components/DiningHall/DiningHall';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import UserIcon from './img/account_circle-24px.svg'
import EventIcon from './img/event-24px.svg'
import './style.css';

export default () => {
  return (
    <div className='h-100'>
      <HomeNavbar />
      <div id="homePage">
        <div id="banner">
          <h1>MENTOR MEETINGS</h1>
          <div>Stay in touch with your rowing alumni mentors by keeping track of your mentor meetings here.</div>
        </div>
        <div id="profile">
          <img id="profilePicture" src={UserIcon}/>
          <div id="profileInfo">
            <h1>Jamie Dimon</h1>
            <h1>Class of 1978</h1>
          </div>
          <div id="position">Chief Executive Officer of JP Morgan Chase</div>
          <div id="connection">Connected based on job interest and hometown.</div>
        </div>
        <div id="timeline">
          <div>Meeting Timeline</div>
          <div id="scrollmenu">
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>X months until the next meeting</div>
              <button class="calendarButtons">Schedule now</button>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Met on X</div>
              <button class="calendarButtons">Add a short description</button>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 3</div>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 4</div>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 5</div>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 6</div>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 7</div>
            </div>
            <div class="meetings">
              <img class="icons" src={EventIcon}/>
              <div>Meeting 8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
