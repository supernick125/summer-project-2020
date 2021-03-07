import React from 'react';
import CreateAlumni from '../../components/CreateAlumni/CreateAlumni';
import CreateMeeting from '../../components/CreateMeeting/CreateMeeting';
import { Container, Header, Form, Input } from 'semantic-ui-react';
import './style.css'

const style = {
  logo: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  searchbar: {
    margin: '3em',
    iconSize: 'massive',
  },
  intro: {
    fontSize: '1.5em',
    marginTop: '1em',
    marginBottom: '1em',
  },
};

export default () => {

  var students = ['Zamie', 'Gabe', 'Jonny', 'Daniel', 'Andrei', 'Greg', 'Nick', 'Nathan'];

  function updateCurrentSearch(newS){

  };

  function searchMe(toFind)
  {
    var i = 0;
    var newList = []
    while(i<students.length)
    {
      if(!students[i].search(toFind))
      {
        newList[newList.length] = students[i];
      }
      i++;
    }

    if (newList.length === students.length) {
      return;
    }

    return (
      <div>
        <ol>
          {newList.map(variable => (
            <h2 key={variable}>{variable}</h2>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
      <div class='row'>
        <div class='column'>
          <div class='wrap'>
            <div class="search">
              <Form style={style.searchbar}>
                <Form.Field>
                  <Input
                   // id='search'
                   // type='search'
                   // name='search'
                   // value={currentSearch.search}
                   // size='massive'
                   // onChange={updateCurrentSearch}
                   // onClick={console.log(currentSearch.search)}
                   // icon='search'
                    placeholder='Find a student!'
                  />
                </Form.Field>
              </Form>
            </div>
            <div class="top">
              <div class="hero"></div>
            </div>
            <main>
              {searchMe("G")}
            </main>
          </div>
        </div>
        <div class='column'>
          <div class='wrap'>
            <div class="search">
              <Form style={style.searchbar}>
                <Form.Field>
                  <Input
                   // id='search'
                   // type='search'
                   // name='search'
                   // value={currentSearch.search}
                   // size='massive'
                   // onChange={updateCurrentSearch}
                   // onClick={console.log(currentSearch.search)}
                   // icon='search'
                    placeholder='Find a student!'
                  />
                </Form.Field>
              </Form>
            </div>
            <div class="top">
              <div class="hero"></div>
            </div>
            <main>
              {searchMe("N")}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
