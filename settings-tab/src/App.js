/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Group from './Group.js';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'helenlu2001@gmail.com',
      groupMembers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15],
      groupName: 'heckMIT',
      name: '',
      groups: {
        'heckMIT':  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15],
        'herMIT': [1,2,3,4,5,6],
        'kerMIT': [2,3,4],
        'turNIP': [2, 4, 6, 10]
      },
      nameValue: '',
      groupNameValue: '',
      joinCodeValue: '',
      createNameValue: '',
      createCodeValue: '',


    }

    this.nameChange = this.nameChange.bind(this);
    this.groupNameChange = this.groupNameChange.bind(this);
    this.joinCodeChange = this.joinCodeChange.bind(this);
    this.createNameChange = this.createNameChange.bind(this);
    this.createCodeChange = this.createCodeChange.bind(this);

    this.createGroup = this.createGroup.bind(this);
    this.joinGroup = this.joinGroup.bind(this);

  }

  componentDidMount() {
    // need an api call to retrieve all groups and respective members that the member is in
  }

  nameChange(event) {
    this.setState({
      nameValue: event.target.value,
    });
  }

  groupNameChange (event) {
    console.log('change');
    this.setState({
      groupNameValue: event.target.value,
    });
    console.log(event.target.value);
  }

  joinCodeChange (event) {
    this.setState({
      joinCodeValue: event.target.value,
    });
    console.log(event.target.value);
  }

  createNameChange (event) {
    console.log('change');

    this.setState({
      createNameValue: event.target.value,
    });
    console.log(event.target.value);

  }

  createCodeChange(event) {
    console.log('change');

    this.setState({
      createCodeValue: event.target.value,
    });
    console.log(event.target.value);

  }

  joinGroup() {
    chrome.runtime.sendMessage({audience: "background", operation: "subscribe", data: {groupname: this.state.groupNameValue}});
    this.setState({joinCodeValue: ''});
  }

  createGroup() {
    chrome.runtime.sendMessage({audience: "background", operation: "createGroup", data: {joinCode: this.state.joinCodeValue, displayName: this.state.groupNameValue}});
    this.setState({createNameValue: '', createCodeValue: ''});

  }

  render() {
    let first = true;
    let groups = [];
    for(const [groupName, groupMembers] of Object.entries(this.state.groups)) {
      groups.push(
        <div className='App-single-group'>
          <Group groupMembers={groupMembers} groupName={groupName} first={first}/>
          <div
            className='App-group-leave'
          >
          </div>
        </div>
      );
      first = false;  
    }

    return (
      <>
        <div className='App-container'> 
          <div className='App-vibeBox'> 
            <div className='App-title'><em>~vibe check~</em></div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> screen name </div>
              <div className='App-nameContainer'>   
                <input 
                  className='App-name'
                  value={this.state.nameValue}
                  onChange={this.nameChange}
                  placeholder={this.state.name}
                />
                <div className='App-nameSubmit'> change </div>
              </div>
              
            </div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> join new group </div>
              <div className='App-nameContainer'>   
                <input 
                  className='App-name'
                  value={this.state.joinCodeValue}
                  onChange={this.joinCodeChange}
                  placeholder='enter join code'
                />
                <div className='App-nameSubmit' onClick={this.joinGroup}> join! </div>
             </div>
            </div>


            <Group groupMembers={this.state.groupMembers} groupName={this.state.groupName} first={true}/>

            <div className='App-fieldContainer' style={{marginTop: 32, marginBottom: 16}}> 
              <div className='App-fields'> create new group </div>
              <div className='App-inputContainer'>
                <input 
                  value={this.state.createNameValue}
                  onChange={this.createNameChange}
                  placeholder='enter group name'
                />
                <input 
                  value={this.state.createCodeValue}
                  onChange={this.createCodeChange}
                  placeholder='enter join code'
                />               
              </div>
            </div>

            <div className='App-buttonContainer' style={{marginBottom: 32}}> 
              <div className='App-button' onClick={this.createGroup}> create group </div>
            </div>

            <div className='App-displayGroups'> 
              <div className='App-fields App-group'> your current groups </div>
              {groups}
              
            </div>


          </div>
        </div>

      </>
    );
  }
}  

export default App;

