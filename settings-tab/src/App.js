import React from 'react';
import logo from './logo.svg';
import './App.css';
import Group from './Group.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({
      groupNameValue: event.target.value,
    });
  }

  joinCodeChange (event) {
    this.setState({
      joinCodeValue: event.target.value,
    });
  }

  createNameChange (event) {
    this.setState({
      createNameValue: event.target.value,
    });
  }

  createCodeChange(event) {
    this.setState({
      createCodeValue: event.target.value,
    });
  }

  joinGroup() {

  }

  createGroup() {

  }



  render() {
    let first = true;
    let groups = [];
    console.log(Object.entries(this.state.groups));
    for(const [groupName, groupMembers] of Object.entries(this.state.groups)) {
      groups.push(<Group groupMembers={groupMembers} groupName={groupName} first={first}/>);
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
              <div className='App-inputContainer'>
                <input 
                  value={this.state.groupNameValue}
                  onChange={this.groupNameChange}
                  placeholder='enter group name'
                />
                <input 
                  value={this.state.joinCodeValue}
                  onChange={this.joinCodeChange}
                  placeholder='enter join code'
                />               
              </div>
            </div>

            <Group groupMembers={this.state.groupMembers} groupName={this.state.groupName} first={true}/>


            <div className='App-buttonContainer'> 
              <div className='App-button' onClick={this.joinGroup}> add me! </div>
            </div>


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

