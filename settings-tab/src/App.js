/*global chrome*/

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Group from './Group.js';
import firebase from './Firestore'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'helenlu2001@gmail.com',
      groupMembers: [],
      groupName: '',
      name: '',
      groups: {
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

    this.getGroups = this.getGroups.bind(this);
    this.changeName = this.changeName.bind(this);

  }

  getGroups(){
    const reactThis = this
    chrome.storage.sync.get(['groupnames', 'userId'],async function (result) {
      console.log(result.groupnames)
      const myUserRef = firebase.firestore().collection('users').doc(result.userId)
      const myUserContent = await myUserRef.get()
      if (myUserContent.exists) {
        reactThis.setState({
          nameValue: myUserContent.data().name || ""
        })
      }
      chrome.runtime.sendMessage({audience: 'background', operation: 'fetchLatestGroupData'}, async function(response) {
        console.log(response.latestGroupData);
        let groups = {}
        for (const groupnametoquery of result.groupnames) {
          const peopleUuids = response.latestGroupData[groupnametoquery].everyone || []
          const people = await Promise.all(peopleUuids.map(async (a) => {
            const userRef = firebase.firestore().collection('users').doc(a)
            const userData = await userRef.get();
            if (userData.exists) {
              return userData.data().name
            }
            return 'User ' + a.substring(0,8)
          }))
          groups[groupnametoquery] = people
        }
        reactThis.setState({groups:groups})
      });
      
  })
  }

  componentDidMount() {
    // need an api call to retrieve all groups and respective members that the member is in
    const reactThis = this 
    chrome.storage.onChanged.addListener(function (changes, areaname) {
      if (areaname !== "sync") {
          return;
      }
      reactThis.getGroups()
    })
    this.getGroups();
    
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
    console.log(this.state)
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
    chrome.runtime.sendMessage({audience: "background", operation: "subscribe", data: {groupname: this.state.joinCodeValue}});
    this.setState({joinCodeValue: ''});
  }

  createGroup() {
    console.log({joinCode: this.state.joinCodeValue, displayName: this.state.groupNameValue})
    chrome.runtime.sendMessage({audience: "background", operation: "createGroup", data: {joinCode: this.state.joinCodeValue, displayName: this.state.groupNameValue}});
    this.setState({createNameValue: '', createCodeValue: ''});
  }

  changeName() {
    const reactThis = this
    chrome.storage.sync.get(['groupnames', 'userId'],async function (result) {
      const myUserRef = firebase.firestore().collection('users').doc(result.userId)
      await myUserRef.set({
        name: reactThis.state.nameValue
      })
    })
  }

  render() {
    let first = true;
    let groups = [];
    for(const [groupName, groupMembers] of Object.entries(this.state.groups)) {
      groups.push(
        <div className='App-single-group'>
          <Group groupMembers={groupMembers} groupName={groupName} first={first} />
          <div
            className='App-group-leave'
            // onClick={}
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
                <div className='App-nameSubmit' onClick={this.changeName}> change </div>
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


            {/* <Group groupMembers={this.state.groupMembers} groupName={this.state.groupName} first={true}/>


            <div className='App-buttonContainer'> 
              <div className='App-button' onClick={this.joinGroup}> add me! </div>
            </div> */}


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
              {/* {Object.keys(this.state.groups).map((key) => {
                return (
                  <div className='group-div'>
                    <div className='group-name'> {key} </div>
                    <div className='group-members'> {this.state.groups[key]} </div>
                  </div>
                )
              })} */}
            </div>


          </div>
        </div>

      </>
    );
  }
}  

export default App;

