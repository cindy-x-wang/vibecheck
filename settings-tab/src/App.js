import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <>
        <div className='App-container'> 
          <div className='App-vibeBox'> 
            <div className='App-title'><em>~vibe check~</em></div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> screen name: </div>
              <input className='App-name'/>
            </div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> join new group </div>
              <div className='App-inputContainer'>
                <input />
                <input />               
              </div>
            </div>

            <div style={{border: '2px solid black', height: 30, marginBottom: 32}}> TEMPORARY GROUP MEMBER PLACEMENT </div>

            <div className='App-fieldContainer'> 
              <div className='App-fields'> create new group </div>
              <div className='App-inputContainer'>
                <input />
                <input />               
              </div>
            </div>

            <div className='App-displayGroups'> 
              <div className='App-fields'> your current groups </div>
            </div>

            <div style={{border: '2px solid black', height: 30, marginBottom: 32}}> TEMPORARY GROUPS PLACEMENT </div>

          </div>
        </div>

      </>
    );
  }
}  

export default App;

