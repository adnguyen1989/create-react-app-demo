import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';
import Field from './Field'
import CourseSelect from './Course_select'

class Form4 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      fieldErrors: {},
      people: [],
      _loading: false,
      _saveStatus: 'READY'
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    this.setState({_loading: true});
    this.fetchUser().then((response)=> {
      this.setState({people: response || [], _loading:false})
    })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJSON(response) {
    return response.json();
  }

  fetchUser(){
    return fetch('http://accounts.dev/api/users', {
      headers: {
        Accept: 'application/json',
      }
    }).then(this.checkStatus)
    .then(this.parseJSON)
  }

  saveUser(data){
    return fetch('http://accounts.dev/api/users', {
      method: 'post',
      body: JSON.stringify({user: data}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this.parseJSON)
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const people = [...this.state.people];
    const person = this.state.fields;

    const a = this.validate()
    if (this.validate()) return
    people.push(person);

    this.setState({_saveStatus: 'SAVING'});
    this.saveUser(person)
      .then((response)=>{
        console.log(response)
        if (!response.errors){
          this.setState({ people: people, fields: {}, _saveStatus: 'SUCCESS' });
        }
        else {
          const response_body = response.errors
          const fieldErrors = this.state.fieldErrors;
          Object.keys(response_body).forEach((key)=>{
            fieldErrors[key] = response_body[key]
          })

          this.setState({_saveStatus: 'ERROR'})
        }

      })

  }

  validate(){
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((index) => fieldErrors[index].every((element) => element));
    // console.log(errMessages);

    if (!person.name || !person.email || errMessages.length || !person.department || !person.course) return true;

    return false
  }

  onInputChange({name, error, value}){
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    fields[name] = value;
    fieldErrors[name] = [error];
    this.setState({ fields: fields, fieldErrors: fieldErrors, _saveStatus: 'READY' }, function(){
      // console.log(this.state)
    });
  }

  renderSubmissionError(){
    const fieldErrors = this.state.fieldErrors;
    if (this.state._saveStatus !== 'ERROR') return
    return(
      <div>
        <ul>
          {
            Object.keys(fieldErrors).map((field, i) => {
              return (
                fieldErrors[field].map((error, j) => {
                  if (error){
                    return(<li key={i-j}>{field} : {error}</li>)
                  }
                })
              )
            })
          }
        </ul>
      </div>
    )
  }

  render () {

    return (
      <div>
        <h1>Sign Up Sheet</h1>

        { this.renderSubmissionError() }

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

          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />

          <br />

          {{
            READY: <input type='submit' value='Submit' disabled={this.validate()}/>,
            SAVING: <input type='submit' value='Saving' disabled/>,
            SUCCESS: <input type='submit' value='Success' disabled/>,
            ERROR: <input type='submit' value='Save failed' disabled={this.validate()}/>
          }[this.state._saveStatus]}

        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email, department, course }, i) =>
              <li key={i}>{name} ({ email }) - {department} ({course})</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Form4;
