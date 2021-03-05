import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import Axios from 'axios';
import ProfileIcon from './img/account_circle-24px.svg'
import PhoneIcon from './img/phone-24px.svg'
import EmailIcon from './img/mail-24px.svg'
import HomeIcon from './img/home-24px.svg'

import { Context as AuthContext } from '../../context/Auth';

export default () => {

	const { authUser, setAuthUser } = useContext(AuthContext);
	
	const [currentUser, setCurrentUser] = useState({
		first_name: '',
		last_name: '',
		email: '',
		graduationyear: '',
		phone_number: '',
		hometown: '',
		high_school: '',
		biography: '',
		school: '',
		major: '',
		major2: '',
		minor: '',
		primary_industry_interest: '',
		secondary_industry_interest: '',
		cities_of_interest: ''
		});
	
	const [editable, setEditable] = useState({edit: false});
	
	useEffect(() => {
		const getUserInfo = async () => {
			Axios.get("api/user/:username/", { params: { email: authUser.user.email } })
			.then(resp => {
				console.log(resp);
				console.log(resp.data);
				
				setCurrentUser({
					first_name: resp.data.user.firstname,
					last_name: resp.data.user.lastname,
					email: resp.data.user.email,
					graduationyear: resp.data.user.graduationyear,
					phone_number: resp.data.user.phone_number,
					hometown: resp.data.user.hometown,
					high_school: resp.data.user.high_school,
					biography: resp.data.user.biography,
					school: resp.data.user.school,
					major: resp.data.user.major,
					major2: resp.data.user.major2,
					minor: resp.data.user.minor,
					primary_industry_interest: resp.data.user.primary_industry_interest,
					secondary_industry_interest: resp.data.user.secondary_industry_interest,
					cities_of_interest: resp.data.user.cities_of_interest
					});
				})
			.catch(error => {
				console.error(error);
				});
			}
		getUserInfo();
		}, [editable.edit]);
	const makeChanges = async () => {
		try {
			const resp = await Axios({
				method: 'POST',
				url: '/api/user/update',
				headers: {
					'Content-Type': 'application/json'
					},
					data: currentUser
				});
		console.log(resp);
		console.log(resp.data);
		} catch (error) {
		console.error(error);
		console.error("Failed to update the user.");
		}
	}

	const logoutUser = (event) => {
		event.preventDefault();
		document.cookie = 'x-auth-token= ; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		delete Axios.defaults.headers.common['x-auth-token'];
		setAuthUser({
			action: 'LOGOUT_USER',
			payload: null
		});
		window.location.reload();
		}

	const updateCurrentUser = (event) => {
		setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
	}

	function initEmail()
	{
		return currentUser.email;
	}

	function initFirstName()
	{
		return currentUser.first_name;
	}

	function initLastName()
	{
		return currentUser.last_name;
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
		return currentUser.phone_number;
	}

	function initHometown()
	{
		return currentUser.hometown;
	}

	function initHighSchool()
	{
		return currentUser.high_school;
	}

	function initSchool()
	{
		return currentUser.school;
	}

	function initMajor()
	{
		return currentUser.major;
	}

	function initMajorTwo()
	{
		return currentUser.major2;
	}

	function initMinor()
	{
		return currentUser.minor;
	}

	function initPrimaryIndustry()
	{
		return currentUser.primary_industry_interest;
	}

	function initSecondaryIndustry()
	{
		return currentUser.secondary_industry_interest;
	}

	function initCities()
	{
		return currentUser.cities_of_interest;
	}

	//if true, return becomes editable version. If false, return is static.
	function edit()
	{
		return editable.edit
	}

	function refresh()
	{
		if (editable.edit === true)
			makeChanges();

		var change = !editable.edit;
		setEditable({edit: change});
	}

	function reload()
	{
		window.location.reload();
	}

	function getNameType()
	{
		if(initFirstName().length+initLastName().length>11)
			return <><div id="firstName">{initFirstName()}</div><div id="lastName">{initLastName()}</div></>;
		else
			return <h1 id="name">{initFirstName()} {initLastName()}</h1>;
	}
	
	function getMajorType()
	{
		if(initMajorTwo().length==0)
			return <h3 id="major">Major: {initMajor()}</h3>
		else
			return <><h3 id="major">Major 1: {initMajor()}</h3><h3 id="majorTwo">Major 2: {initMajorTwo()}</h3></>
	}

	if(!edit())
	{
		return (
      <div className='h-100'>
        <HomeNavbar />
        <div id="accountPage">
          <div id="block1" className="blocks">
            <div id="block1left">
              <img alt="" id="profilePicture" src={ProfileIcon} />
              </div>
              <div id="block1right">
              {getNameType()}
                <h2 id="studentoralumni">{"Student"} in {initSchool()}</h2>
                <h2>Class of <span id="gradYear">{initGradYear()}</span></h2>
              </div>
            </div>
            <div id="block2" className="blocks">
              <div id="block2left">
                <h3 id="phoneNum"><img alt="" className="icons" src={PhoneIcon}/>Phone Number: {initPhoneNum()}</h3>
                <h3 id="email"><img alt="" className="icons" src={EmailIcon}/>Email: {initEmail()}</h3>
                <h3 id="hometown"><img alt="" className="icons" src={HomeIcon}/>Hometown: {initHometown()}</h3>
              </div>
              <div id="block2right">
                <h2>Academics</h2>
                <h3 id="school">School: {initSchool()}</h3>
              {getMajorType()}
                <h3 id="minor">Minor/Concentration: {initMinor()}</h3>
                <h3 id="highSchool">High School: {initHighSchool()}</h3>
              </div>
            </div>
            <div id="block3" className="blocks">
              <div id="block3left">
                <h2>Biography</h2>
                <h3 id="biography">{initBio()}</h3>
              </div>
              <div id="block3right">
                <h2>Career</h2>
                <h3 id="primaryIndustry">Primary Industry Interest: {initPrimaryIndustry()}</h3>
                <h3 id="secondaryIndustry">Secondary Industry Interest: {initSecondaryIndustry()}</h3>
                <h3 id="cities">Particular Cities of Interest: {initCities()}</h3>
              </div>
            </div>

            <button id="editButton" onClick={refresh}>Edit</button>
            <button id="logout">Logout</button>
          </div>
        </div>
		);
	}
	else
	{
		return (
      <div className='h-100'>
        <HomeNavbar />
          <div id="accountPage">
          <button onClick={reload}>Refresh Page</button>
          <div id="block1" className="blocks">
            <div id="block1left">
              <img alt="" id="profilePicture" src={ProfileIcon}/>
            </div>
            <div id="block1right">
              {getNameType()}
              <h2 id="studentoralumni">{"Student"} in {initSchool()}</h2>
              <h2>Class of <span id="gradYear">{initGradYear()}</span></h2>
              <div id="gradYearForm" className="form-group">
                <input id="gradYearBox" type="graduationyear" name="graduationyear" className="form-control" value={initGradYear()} onChange={updateCurrentUser}/>
              </div>
            </div>
          </div>
          <div id="block2" className="blocks">
            <div id="block2left">
              <h3 id="phoneNum"><img alt="" className="icons" src={PhoneIcon}/>Phone Number: {initPhoneNum()}</h3>
              <div id="phoneForm" className="form-group">
                <input id="phoneBox" type="phone_number" name="phone_number" className="form-control" value={initPhoneNum()} onChange={updateCurrentUser}/>
              </div>
              <h3 id="email"><img alt="" className="icons" src={EmailIcon}/>Email: {initEmail()}</h3>
              <h3 id="hometown"><img alt="" className="icons" src={HomeIcon}/>Hometown: {initHometown()}</h3>
              <div id="hometownForm" className="form-group">
                <input id="hometownBox" type="hometown" name="hometown" className="form-control" value={initHometown()} onChange={updateCurrentUser}/>
              </div>
            </div>
            <div id="block2right">
              <h2>Academics</h2>
                <h3 id="school">School: {initSchool()}</h3>
                <div id="schoolForm" className="form-group">
                  <input id="schoolBox" type="school" name="school" className="form-control" value={initSchool()} onChange={updateCurrentUser}/>
                </div>
                <h3 id="major">Major 1: {initMajor()}</h3>
                <h3 id="majorTwo">Major 2: {initMajorTwo()}</h3>
                <div id="majorForm" className="form-group">
                  <input id="majorBox" type="major" name="major" className="form-control" value={initMajor()} onChange={updateCurrentUser}/>
                  <input id="majorTwoBox" type="major2" name="major2" className="form-control" value={initMajorTwo()} onChange={updateCurrentUser}/>
                </div>
                <h3 id="minor">Minor/Concentration: {initMinor()}</h3>
                <div id="minorForm" className="form-group">
                  <input id="minorBox" type="minor" name="minor" className="form-control" value={initMinor()} onChange={updateCurrentUser}/>
                </div>
                <h3 id="highSchool">High School: {initHighSchool()}</h3>
                <div id="highSchoolForm" className="form-group">
                  <input id="highSchoolBox" type="high_school" name="high_school" className="form-control" value={initHighSchool()} onChange={updateCurrentUser}/>
                </div>
            </div>
          </div>
          <div id="block3" className="blocks">
            <div id="block3left">
              <h2>Biography</h2>
                <h3 id="biography">{initBio()}</h3>
                <div id="bio" className="form-group">
                  <textarea id="bioBox" type="biography" name="biography" className="form-control" rows="8" value={initBio()} onChange={updateCurrentUser}/>
                </div>
            </div>
            <div id="block3right">
              <h2>Career</h2>
                <h3 id="primaryIndustry">Primary Industry Interest: {initPrimaryIndustry()}</h3>
              <div id="primaryIndustryForm" className="form-group">
                <input id="primaryIndustryBox" type="primary_industry_interest" name="primary_industry_interest" className="form-control" value={initPrimaryIndustry()} onChange={updateCurrentUser}/>
              </div>
              <h3 id="secondaryIndustry">Secondary Industry Interest: {initSecondaryIndustry()}</h3>
              <div id="secondaryIndustryForm" className="form-group">
                <input id="secondaryIndustryBox" type="secondary_industry_interest" name="secondary_industry_interest" className="form-control" value={initSecondaryIndustry()} onChange={updateCurrentUser}/>
              </div>
              <h3 id="cities">Particular Cities of Interest: {initCities()}</h3>
              <div id="citiesForm" className="form-group">
                <input id="citiesBox" type="cities_of_interest" name="cities_of_interest" className="form-control" value={initCities()} onChange={updateCurrentUser}/>
              </div>
            </div>
          </div>

          <button type="button" id="editButton" onClick={refresh}>Confirm</button>
          <button id="logout">Logout</button>
        </div>
      </div>
		);
	}
}
