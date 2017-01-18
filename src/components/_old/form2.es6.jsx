import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';

export default class Form2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      fieldErrors: {},
      people: []
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const people = [...this.state.people];
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({fieldErrors});

    if (Object.keys(fieldErrors).length) return
    people.push(person);
    this.setState({ people: people, fields: {} });
  }

  onInputChange(evt){
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields: fields });
  }

  validate(person){
    const errors = {};
    if (!person.name) errors.name = "Name is required";
    if (!person.email) errors.email = "Email is required";
    if (person.email && !isEmail(person.email)) errors.email = "Invalid email";
    return errors;
  }

  render () {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            name='name'
            value={this.state.fields.name || ""}
            onChange={this.onInputChange}
          />
          <span style={{color: 'red'}}>{this.state.fieldErrors.name} </span>

          <br />

          <input
            placeholder='Email'
            name='email'
            value={this.state.fields.email || ""}
            onChange={this.onInputChange}
          />
          <span style={{color: 'red'}}>{this.state.fieldErrors.email} </span>

          <br />

          <input type='submit' />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email }, i) =>
              <li key={i}>{name} ({ email })</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}

