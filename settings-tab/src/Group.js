/* global chrome */

import React from 'react';
import logo from './logo.svg';
import './Group.css';

class Group extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showMembers: false,
    }

    this.toggleShowMembers = this.toggleShowMembers.bind(this);
    this.handleLeave = this.handleLeave.bind(this);

  }

  toggleShowMembers() {
    this.setState({
      showMembers: !this.state.showMembers,
    });
  }


  handleLeave() {
    if (window.confirm('Please confirm you want to leave group "' + this.props.groupName + '"')) {
      chrome.runtime.sendMessage({audience: "background", operation: "unsubscribe", data: {groupname: this.props.groupName}})
    }
  }

  render() {
    return (
      <>
        <div 
          className='Group-displayMembersContainer'
          onClick={this.toggleShowMembers}
        >
          <div className='Group-groupTitle'> {this.props.groupName} 
          <div className="leaveGroupContainer" onClick={this.handleLeave}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21h8v-2l1-1v4h-9v2l-10-3v-18l10-3v2h9v5l-1-1v-3h-8v18zm10.053-9l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>
          </div>
          </div>
          <hr/>
          { this.state.showMembers ? 
            <div className='Group-displayMembers'> 
              {this.props.groupMembers.map((e) => <div> {e} </div>)}
            </div>
            :
            <div></div>
          }   

        </div>
      </>
    );
  }
}  

export default Group;

