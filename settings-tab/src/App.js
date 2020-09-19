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
      groups: {
        'heckMIT':  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15],
        'herMIT': [1,2,3,4,5,6],
        'kerMIT': [2,3,4],
        'turNIP': [2, 4, 6, 10]
      }
    }

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
                <input className='App-name'/>
                <div className='App-nameSubmit'> change </div>
              </div>
              
            </div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> join new group </div>
              <div className='App-inputContainer'>
                <input />
                <input />               
              </div>
            </div>

            <Group groupMembers={this.state.groupMembers} groupName={this.state.groupName} first={true}/>

            <div className='App-fieldContainer' style={{marginTop: 32}}> 
              <div className='App-fields'> create new group </div>
              <div className='App-inputContainer'>
                <input />
                <input />               
              </div>
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

