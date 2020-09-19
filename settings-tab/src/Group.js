import React from 'react';
import logo from './logo.svg';
import './Group.css';

class Group extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <>
        <div className='Group-displayMembersContainer'>
          <div className='Group-groupTitle'> people in {this.props.groupName} </div>
          <hr/>
          <div className='Group-displayMembers'> 
            {this.props.groupMembers.map((e) => <div> {e} </div>)}
          </div>
        </div>
      </>
    );
  }
}  

export default Group;

