import React, { Component, PropTypes } from 'react';

export default class EditableTimerList extends React.Component {
  render () {
    var divs = [];
    this.props.timers.forEach((timer) => {
      divs.push(<EditableTimer
          key={'editable-timer-' + timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          onFormSubmit={this.props.onFormSubmit}
          onDeleteClick={this.props.onDeleteClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      )
    });

    return (
      <div id='timers'>
        {divs}
      </div>
    );
  }
}

