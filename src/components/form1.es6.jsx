import React, { Component, PropTypes } from 'react';


export default class Form1 extends React.Component {

  onGreatClick(evt){
    console.log("The user clicked button-1: great", evt);
  }

  onAmazingClick(evt){
    console.log("The user clicked button-2: amazing", evt);
  }

  onClick(evt){
    const btn = evt.target
    console.log("The user clicked " + btn.name + " with value " + btn.value)
  }

  render () {
    return (
      <div>
        <h1>What do you think of React?</h1>
        <button name="button-1" value="Great" onClick={this.onClick}> Great</button>
        <button name="button-2" value="Amazing" onClick={this.onClick}> Amazing</button>
      </div>
    )
  }
}

