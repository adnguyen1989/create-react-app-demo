import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';

class Field extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value,
      error: false
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(evt){
    const value = evt.target.value
    const error = this.props.validate ? this.props.validate(value) : false
    this.setState({value: value, error: error})
    this.props.onChange({name: this.props.name, error: error, value: value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  render () {
    return(
      <div>
        <input
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value || ""}
          onChange={this.onChange}
        />
        <span style={{color: 'red'}}>{this.state.error} </span>
      </div>
    )
  }
}

export default Field;
