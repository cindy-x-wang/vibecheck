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

  }

  toggleShowMembers() {
    this.setState({
      showMembers: !this.state.showMembers,
    });
  }


  render() {
    return (
      <>
        <div 
          className='Group-displayMembersContainer'
          onClick={this.toggleShowMembers}
        >
          <div className='Group-groupTitle'> {this.props.groupName} </div>
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

