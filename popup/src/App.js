/* global chrome */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import GroupCard from './GroupCard.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myGroups: ['hi','hello'],
      checked: false,
    };
    this.handleCheck = this.handleCheck.bind(this)
  }

handleCheck() {
  console.log('a')
  console.log(this.state)
  this.setState({checked: !this.state.checked}, function () {
    chrome.runtime.sendMessage({audience: 'background', operation: 'setAvailabilty', data: {available: this.state.checked}})  
  })
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
          <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked}/>
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



