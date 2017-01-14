import React, { Component, PropTypes } from 'react';

export default class EditableTimer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editFormOpen: false
    }
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(timer){
    this.props.onFormSubmit(timer);
    this.closeForm();
  }

  handleEditClick(){
    this.openForm();
  }


  handleFormClose(){
    this.closeForm();
  }

  openForm(){
    this.setState({
      editFormOpen: true
    })
  }

  closeForm(){
    this.setState({
      editFormOpen: false
    })
  }

  render () {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
        id={this.props.id}
        title={this.props.title}
        project={this.props.project}
        onFormSubmit={this.handleSubmit}
        onFormClose={this.handleFormClose}/>
      )
    } else {
        return (
          <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.props.onDeleteClick}/>
      )
    }

  }
}

