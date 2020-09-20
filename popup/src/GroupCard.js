import React from 'react';
import "./GroupCard.css";

class GroupCard extends React.Component{
    constructor(props) {
        super(props);
      }
    render() {
        return(
            <div className="cardContainer">
                {this.props.name}
                <div className="leaveGroupContainer">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21h8v-2l1-1v4h-9v2l-10-3v-18l10-3v2h9v5l-1-1v-3h-8v18zm10.053-9l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>
                </div>
            </div>
        )
    }
}

export default GroupCard;