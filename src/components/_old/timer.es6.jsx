import React, { Component, PropTypes } from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      hovered: false
    }
  }

  handleMouseEnter(){
    this.setState({hovered: true})
  }

  handleMouseLeave(){
    this.setState({hovered: false})
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval)
  }

  onDeleteClick(){
    this.props.onDeleteClick(this.props.id)
  }

  millisecondsToString(s){
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
  }

  digitize(n) {
    return n > 9 ? "" + n: "0" + n;
  }

  handleStartClick(){
    this.props.onStartClick(this.props.id)
  }

  handleStopClick(){
    this.props.onStopClick(this.props.id)
  }

  calculateElapsed(elapsed, runningSince){
    if (runningSince != null) {
      return elapsed + Date.now() - runningSince
    } else {
      return elapsed
    }
  }

  render () {
    const elapsedString = this.millisecondsToString(this.calculateElapsed(this.props.elapsed, this.props.runningSince))
    var action_buttons = ""
    if (this.state.hovered) {
      action_buttons = (
        <div className='extra content'>
          <a className='right floated edit icon' onClick={this.props.onEditClick}>
            <i className='edit icon'></i>
          </a>
          <a className='right floated trash icon' onClick={this.onDeleteClick}>
            <i className='trash icon'></i>
          </a>
        </div>
      )
    }
    return (
      <div className='ui centered card' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>

          <div className='meta'>
            {this.props.project}
          </div>

          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>

          {action_buttons}
        </div>

        <TimerActionButton timerIsRunning={!!this.props.runningSince} onStartClick={this.handleStartClick} onStopClick={this.handleStopClick} />
      </div>
    );
  }
}

