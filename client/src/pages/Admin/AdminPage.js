import React from 'react';
import CreateAlumni from '../../components/CreateAlumni/CreateAlumni';
import CreateMeeting from '../../components/CreateMeeting/CreateMeeting';
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
  
  var soupkitchens = ['Zamie', 'Gabe', 'Jonny', 'Daniel', 'Andrei', 'Daniel', 'Nick'];
  
  function updateCurrentSearch(newS){
    
  };
  
  function searchMe(toFind)
  {
    var i = 0;
    var newList = []
    while(i<soupkitchens.length)
    {
      if(!soupkitchens[i].search(toFind))
      {
        newList[newList.length] = soupkitchens[i];
      }
      i++;
    }

    if (newList.length === soupkitchens.length) {
      return;
    }

    return (
      <ol>
        {newList.map(variable => (
          <h2 key={variable}>{variable}</h2>
        ))}
      </ol>
    );
  }

  return (
    <div>
      <CreateAlumni />
      <CreateMeeting />
      <Form style={style.searchbar}>
          <Form.Field>
            <Input
//              id='search'
//              type='search'
//              name='search'
//              value={currentSearch.search}
//              size='massive'
//              onChange={updateCurrentSearch}
//              onClick={console.log(currentSearch.search)}
//              icon='search'
              placeholder='Find a student!'
            />
          </Form.Field>
        </Form>
      //To search, change the word in quotes. So, for example, change "Zamie" to "Gabe"
      <h1>{searchMe("Zamie")}</h1>
    </div>
  );
}
