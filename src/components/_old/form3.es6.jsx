import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';

export default class Form3 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      fieldErrors: {},
      people: []
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const people = [...this.state.people];
    const person = this.state.fields;

    const a = this.validate()
    if (this.validate()) return
    people.push(person);
    this.setState({ people: people, fields: {} });
  }

  validate(){
    const person = this.state.fields;
    console.log(person);
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);


    if (!person.name || !person.email || errMessages.length) return true;

    return false
  }

  onInputChange(name, error, value){
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({ fields: fields, fieldErrors: fieldErrors });
  }

  render () {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name || ""}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : "Name Required")}
          />

          <br />

          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email || ""}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : "Invalid")}
          />

          <br />

          <input type='submit' disabled={this.validate()}/>
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

