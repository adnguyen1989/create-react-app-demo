import React, { Component, PropTypes } from 'react';


export default class TimersDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: []
    };
    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
    this.handleUpdateFormSubmit = this.handleUpdateFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.loadTimersFromServer = this.loadTimersFromServer.bind(this);
  }

  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }

  loadTimersFromServer(){
    client.getTimers((serverTimers) => (
      this.setState({
        timers: serverTimers
      })
    ));
  }

  handleStartClick(id){
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === id) {
          return Object.assign({}, timer, {
            runningSince: now,
          })
        } else {
          return timer;
        }
      })
    })

    client.startTimer({id: id, start: now})
  }

  handleStopClick(id){
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === id) {
          // const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + now - timer.runningSince,
            runningSince: null,
          })
        } else {
          return timer;
        }
      })
    })

    client.stopTimer({id: id, stop: now})
  }

  handleDeleteClick(id) {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== id)
    })

    client.deleteTimer(id, {id: id})
  }

  handleCreateFormSubmit(timer) {
    this.createTimer(timer);
  }

  handleUpdateFormSubmit(attrs) {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          })
        } else {
          return timer;
        }
      })
    })

    client.updateTimer(attrs.id, {title: attrs.title, project: attrs.project})
  }

  createTimer(timer) {
    client.createTimer({title: timer.title, project: timer.project})
    .then(this.loadTimersFromServer)
    // const t = this.newTimer(timer);

    // this.setState({
    //   timers: this.state.timers.concat(t),
    //   function() {
    //     console.log(this.state.timers);
    //   }
    // })

  }

  newTimer(timer) {
    timer.id = Math.floor((Math.random() * 10000) + 1);
    timer.elapsed = 0;
    timer.runningSince = null;
    return timer;
  }

  render () {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleUpdateFormSubmit}
            onDeleteClick={this.handleDeleteClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />

          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    )
  }
}

