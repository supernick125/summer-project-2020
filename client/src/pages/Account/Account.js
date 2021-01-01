import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import Arrow from './Arrow.png';
import DownArrow from './DownArrow.png';
import Axios from 'axios';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { authUser, setAuthUser } = useContext(AuthContext);
  
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    graduationyear: '',
    biography: ''
  });
  
  const getUserInfo = () => {
    Axios.get("api/user/:username/", { params: { email: authUser.user.email } })
      .then(resp => {
        console.log(resp);
        console.log(resp.data);
        
        setCurrentUser({
          name: resp.data.user.firstname + " " + resp.data.user.lastname,
          email: resp.data.user.email,
          graduationyear: resp.data.user.graduationyear,
          biography: resp.data.user.biography
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Bug: keeps on retrieving information from the database nonstop
  //      -- will have to fix later, but still functional as is. 
  function initEmail()
  {
    getUserInfo();
    return currentUser.email;
  }
      
  function initFirstName()
  {
    return "John";
  }
  
  function initLastName()
  {
    return "Doe";
  }
  
  function initGradYear()
  {
    return currentUser.graduationyear;
  }
  
  function initBio()
  {
    return currentUser.biography;
  }

  function initPhoneNum()
  {
    return 1234567890;
  }

  function initHometown()
  {
    return "Earth";
  }

  function initHighSchool()
  {
    return "Brooklyn Technical High School";
  }
      
  function initSchool()
  {
    return "Columbia University";
  }

  function initGradYear()
  {
    return 2023;
  }

  function initMajor()
  {
    return "Computer Science";
  }
      
  function initMajorTwo()
  {
    return "Computer Engineering";
  }
  
  function initMinor()
  {
    return "Electrical Engineering";
  }
      
  function initPrimaryIndustry()
  {
    return "Web Development";
  }
      
  function initSecondaryIndustry()
  {
    return "Cybersecurity";
  }
      
  function initCities()
  {
    return "New York";
  }

  function bioInput(show)
  {
  					//<!--I handled the biography here, but this should probably be done through back-end interfacing with the database-->
  					if(show)
            {
  							document.getElementById("textBox").value=biography;
  							document.getElementById("bioForm").style.display="block";
  							document.getElementById("editButton").style.display="none";
  							document.getElementById("biography").style.display="none";
            }
  					else
            {
  							var biography=document.getElementById("textBox").value;
  							document.getElementById("biography").innerHTML=biography;
  							document.getElementById("bioForm").style.display="none";
  							document.getElementById("editButton").style.display="inline";
  							document.getElementById("biography").style.display="block";
            }
  }
  
  //if true, return becomes editable version. If false, return is static.
  function edit()
  {
            return false;
  }

  if(!edit())
  {
    return (
      <div id="header" onload="getUserInfo()">
      <style>{'body { background-color: #00a651; }'}</style>
      		<div id="fullContainer" className="w-75 text-white">
      			<div>
              <h1><b>Student Profile</b> <img src={Arrow} alt="Arrow"/><button id="edit">edit</button></h1>
            </div>

      				<div id="profile">
      					<h3>Personal Information</h3>
      						<div id="personalInfo">
      							<div><b><label htmlFor="email">Email:&nbsp;</label></b><span id="email">{initEmail()}</span></div>

      							<div><b><label htmlFor="firstName">First Name:&nbsp;</label></b><span id="firstName">{initFirstName()}</span></div>

      							<div><b><label htmlFor="lastName">Last Name:&nbsp;</label></b><span id="lastName">{initLastName()}</span></div>

      							<div><b><label htmlFor="phoneNum">Primary Contact Number:&nbsp;</label></b><span id="phoneNum">{initPhoneNum()}</span></div>

      							<div><b><label htmlFor="hometown">Hometown:&nbsp;</label></b><span id="hometown">{initHometown()}</span></div>

      							<div><b><label htmlFor="highSchool">High School:&nbsp;</label></b><span id="highSchool">{initHighSchool()}</span></div>
      						</div>
      					<h3>Academic Information</h3>
      						<div id="academicInfo">
      							<div><b><label htmlFor="school">School:&nbsp;</label></b><span id="school">{initSchool()}</span></div>

      							<div><b><label htmlFor="gradYear">Graduation Year:&nbsp;</label></b><span id="gradYear">{initGradYear()}</span></div>

      							<div><b><label htmlFor="major">Major:&nbsp;</label></b><span id="major">{initMajor()}</span></div>

      							<div><b><label htmlFor="majorTwo">2nd Major:&nbsp;</label></b><span id="majorTwo">{initMajorTwo()}</span></div>

      							<div><b><label htmlFor="minor">Minor or Concentration:&nbsp;</label></b><span id="minor">{initMinor()}</span></div>
      						</div>
      					<h3>Industry Information</h3>
      						<div id="industryInfo">
      							<div><b><label htmlFor="primaryIndustry">Primary Industry Interest:&nbsp;</label></b><span id="primaryIndustry">{initPrimaryIndustry()}</span></div>

      							<div><b><label htmlFor="secondaryIndustry">Secondary Industry Interest:&nbsp;</label></b><span id="secondaryIndustry">{initSecondaryIndustry()}</span></div>

      							<div><b><label htmlFor="cities">Particular Cities of Interest:&nbsp;</label></b><span id="cities">{initCities()}</span></div>
      						</div>
      					<h3>Biography Information</h3>
      						<label htmlFor="biography">Biography&nbsp;</label><img src={DownArrow} alt="DownArrow"/>
      						<div><h4><p id='biography'>{initBio()}</p></h4></div>
      			</div>
            <button id="logout">Logout</button>
      		</div>
        </div>
    );
  }else
  {
    return (
      <div id="header" onload="getUserInfo()">
      <style>{'body { background-color: #00a651; }'}</style>
      		<div id="fullContainer" className="w-75 text-white">
      			<h1><b>Student Profile</b> <img src={Arrow} alt="Arrow"/></h1>
      				<div id="profile">
      					<h3>Personal Information</h3>
      						<div id="personalInfo">
      							<div><b><label htmlFor="email">Email:&nbsp;</label></b></div>
      							<div id="emailForm" className="form-group">
      								<input id="emailBox" type="email" className="form-control" value={initEmail()}/>
      							</div>

      							<div><b><label htmlFor="firstName">First Name:&nbsp;</label></b><span id="firstName">{initFirstName()}</span></div>

      							<div><b><label htmlFor="lastName">Last Name:&nbsp;</label></b><span id="lastName">{initLastName()}</span></div>

      							<div><b><label htmlFor="phoneNum">Primary Contact Number:&nbsp;</label></b></div>
      							<div id="phoneForm" className="form-group">
      								<input id="phoneBox"  className="form-control" value={initPhoneNum()}/>
      							</div>

      							<div><b><label htmlFor="hometown">Hometown:&nbsp;</label></b></div>
      							<div id="hometownForm" className="form-group">
      								<input id="hometownBox"  className="form-control" value="Hometown"/>
      							</div>

      							<div><b><label htmlFor="highSchool">High School:&nbsp;</label></b></div>
      							<div id="highSchoolForm" className="form-group">
      								<input id="highSchoolBox"  className="form-control" value={initHighSchool()}/>
      							</div>
      						</div>
      					<h3>Academic Information</h3>
      						<div id="academicInfo">
      							<div><b><label htmlFor="school">School:&nbsp;</label></b></div>
      							<div id="schoolForm" className="form-group">
      								<input id="schoolBox"  className="form-control" value={initSchool()}/>
      							</div>

      							<div><b><label htmlFor="gradYear">Graduation Year:&nbsp;</label></b></div>
      							<div id="gradYearForm" className="form-group">
      								<input id="gradYearBox"  className="form-control" value={initGradYear()}/>
      							</div>

      							<div><b><label htmlFor="major">Major:&nbsp;</label></b></div>
      							<div id="majorForm" className="form-group">
      								<input id="majorBox"  className="form-control" value={initMajor()}/>
      							</div>

      							<div><b><label htmlFor="majorTwo">2nd Major:&nbsp;</label></b></div>
      							<div id="majorTwoForm" className="form-group">
      								<input id="majorTwoBox"  className="form-control" value={initMajorTwo()}/>
      							</div>

      							<div><b><label htmlFor="minor">Minor or Concentration:&nbsp;</label></b></div>
      							<div id="minorForm" className="form-group">
      								<input id="minorBox"  className="form-control" value={initMinor()}/>
      							</div>
      						</div>
      					<h3>Industry Information</h3>
      						<div id="industryInfo">
      							<div><b><label htmlFor="primaryIndustry">Primary Industry Interest:&nbsp;</label></b></div>
      							<div id="primaryIndustryForm" className="form-group">
      								<input id="primaryIndustryBox"  className="form-control" value={initPrimaryIndustry()}/>
      							</div>

      							<div><b><label htmlFor="secondaryIndustry">Secondary Industry Interest:&nbsp;</label></b></div>
      							<div id="secondaryIndustryForm" className="form-group">
      								<input id="secondaryIndustryBox"  className="form-control" value={initSecondaryIndustry()}/>
      							</div>

      							<div><b><label htmlFor="cities">Particular Cities of Interest:&nbsp;</label></b></div>
      							<div id="citiesForm" className="form-group">
      								<input id="citiesBox"  className="form-control" value={initCities()}/>
      							</div>
      						</div>
      					<h3>Biography Information</h3>
      						<label htmlFor="biography">Biography&nbsp;</label><img src={DownArrow} alt="DownArrow"/>
                  <div id="bio" className="form-group">
                    <textarea id="bioBox"  className="form-control" rows="8" value={initBio()}/>
                  </div>
      			</div>
            <div>
              <button id="edit">Save Edits</button>
            </div>
            <div>
              <button id="logout">Logout</button>
            </div>
      		</div>
        </div>
    );
  }
}