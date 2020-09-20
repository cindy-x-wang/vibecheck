import React from 'react';
import logo from './logo.svg';
import './App.css';
import GroupCard from './GroupCard.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myGroups: ['hi','hello'],
    }

  }


  render() {
    return (
      <>
        <div className='extension-container'> 
          <div className='App-title'> 
            ~Vibe Check~
          </div>
        
        <div className="smallvibe"> Im vibing! </div>
        <div className="smallvibe">
          <input type="checkbox"/>
        </div>
        
        <h2> my groups </h2>
        <div>
          {this.state.myGroups.map(g =>
            <GroupCard name={g}/>
          )}
        </div>
        </div>

      </>
    );
  }
}  

export default App;



