import React, { useState, useContext } from 'react';
import './style.css';
import Arrow from './Arrow.png';
import DownArrow from './DownArrow.png'

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { authUser, setAuthUser } = useContext(AuthContext);

  const name= authUser.user.firstname + " " + authUser.user.lastname;

  function initialize()
  {
  					//<!--This will be replaced with database stuff-->
  					var name= authUser.user.firstname + " " + authUser.user.lastname;
  					var email="jd1234@columbia.edu";
  					var gradYear=2023;
  					var biography="From Wikipedia: \"John Doe\" (for males) and \"Jane Doe\" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.[1][2][3] In the context of law enforcement in the United States, such names are often used to refer to a corpse whose identity is unknown or unconfirmed. Secondly, such names are also often used to refer to a hypothetical \"everyman\" in other contexts, in a manner similar to \"John Q. Public\" or \"Joe Public\". There are many variants to the above names, including \"John Roe\", \"Richard Roe\", \"Jane Roe\" and \"Baby Doe\", \"Janie Doe\" or \"Johnny Doe\" (for children).";

  					document.getElementById("name").innerHTML=name;
  					document.getElementById("email").innerHTML=email;
  					document.getElementById("gradYear").innerHTML=gradYear;
  					document.getElementById("biography").innerHTML=biography;
  }

  function initName()
  {
      return name;
  }

  function initEmail()
  {
      return "jd1234@columbia.edu";
  }

  function initGradYear()
  {
      return 2023;
  }

  function initBio()
  {
      return "From Wikipedia: \"John Doe\" (for males) and \"Jane Doe\" (for females) are multiple-use names that are used when the true name of a person is unknown or is being intentionally concealed.[1][2][3] In the context of law enforcement in the United States, such names are often used to refer to a corpse whose identity is unknown or unconfirmed. Secondly, such names are also often used to refer to a hypothetical \"everyman\" in other contexts, in a manner similar to \"John Q. Public\" or \"Joe Public\". There are many variants to the above names, including \"John Roe\", \"Richard Roe\", \"Jane Roe\" and \"Baby Doe\", \"Janie Doe\" or \"Johnny Doe\" (for children).";
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

  return (
    <div id="header">
      <style>{'body { background-color: #00a651; }'}</style>
      	<body onload="initialize()" class="text-white">
      		<div id="fullContainer" class="w-75">
      			<h1><b>Student Profile</b> <img src={"Arrow"} alt="Arrow"/></h1>

      			<div id="profile">
      				<h4><p id='tag'>{initName()}</p></h4>
      				<h4><p id='tag'>{initEmail()}</p></h4>
      				<div>Graduation Year: <h4><p id='tag'>{initGradYear()}</p></h4></div>

      				<label for="biography">Biography&nbsp;</label><img src="{DownArrow}" alt="DownArrow"/><button onclick="bioInput(true)" id="editButton" class="btn btn-primary btn-sm">Edit</button>
      				<div><h4><p id='tag'>{initBio()}</p></h4></div>
      				<div id="bioForm" class="form-group">
      					<textarea id="textBox" class="form-control" rows="8"></textarea>
      					<button onclick="bioInput(false)" class="btn btn-primary">Submit</button>
      				</div>
      			</div>

      			<button id="logout" class="btn">Logout</button>
      		</div>
        </body>
    </div>
  );
}
