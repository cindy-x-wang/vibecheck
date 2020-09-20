/* global chrome */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import GroupCard from './GroupCard.js'
import Checkbox from '@material-ui/core/Checkbox';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myGroups: ['hi','hello'],
      myGroupNames: [],
      checked: false,
    };
    this.handleCheck = this.handleCheck.bind(this)
    this.getGroups = this.getGroups.bind(this)
    const reactThis = this 
    chrome.storage.onChanged.addListener(function (changes, areaname) {
      if (areaname !== "sync") {
          return;
      }
      reactThis.getGroups()
    })
    this.getGroups()
  }

handleCheck() {
  console.log('a')
  console.log(this.state)
  this.setState({checked: !this.state.checked}, function () {
    chrome.runtime.sendMessage({audience: 'background', operation: 'setAvailabilty', data: {available: this.state.checked}})  
  })
}

getGroups(){
  const reactThis = this
  chrome.storage.sync.get(['groupnames'], function (result) {
    console.log(result.groupnames)
    chrome.runtime.sendMessage({audience: 'background', operation: 'fetchLatestGroupData'}, function(response) {
      console.log(response.latestGroupData);
      let bothGroupNames = []
      for (const groupnametoquery of result.groupnames) {
        bothGroupNames.push(
          {
            joinCode: groupnametoquery,
            localName: response.latestGroupData[groupnametoquery].groupName
          }
        )
      }
      reactThis.setState({myGroups: result.groupnames, myGroupNames: bothGroupNames})
    });
    
})
}

openSettings() {
  
  chrome.windows.create({
    url: '/settings/index.html'
})
}


  render() {
    return (
      <>
        <div className='extension-container'> 
          <div className="settings-icon" onClick={this.openSettings}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
          </div>
          <div className='App-title'> 
            ~Vibe Check~
          </div>
        
        <div className="smallvibe"> I'm vibing! </div>
        <div className="smallvibe">
          {/* <Checkbox onChange={this.handleCheck} defaultChecked={this.state.checked}/> */}
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleCheck}
            size="medium"
            inputProps={{ 'aria-label': 'vibin checkbox' }}
          />
        </div>
        
        <h2> my groups </h2>
        <div>
          {this.state.myGroupNames.map(g =>
            <GroupCard joinCode={g.joinCode} localName={g.localName}/>
          )}
        </div>
        </div>

      </>
    );
  }
}  

export default App;



