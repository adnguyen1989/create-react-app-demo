import React, { Component, PropTypes } from 'react';

export default class ToggleableTimerForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormClose(){
    this.setState({isOpen: false})
  }

  handleFormOpen (){
    this.setState({isOpen: true})
  }

  handleFormSubmit(timer){
    this.props.onFormSubmit(timer);
    this.setState({isOpen: false});
  }

  render () {
    if (this.state.isOpen) {
      return (<TimerForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit}  />);
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.handleFormOpen}>
            <i className='plus icon'></i>
          </button>
        </div>
      );
    }
  }
}

