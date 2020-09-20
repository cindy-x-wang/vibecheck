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
            Vibe Check!
          </div>
        </div>
        <h1> Vibe Check! </h1>
        <div> Im vibing! </div>
        <input type="checkbox"/>
        <h2> current groups </h2>
        <a> 
        <span>
            llama
        </span>
        </a>

      </>
    );
  }
}  

export default App;



