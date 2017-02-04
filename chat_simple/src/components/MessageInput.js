import React, { Component } from 'react';
import Field from './Field'

class MessageInput extends React.Component {


  onFormSubmit(){

  }


  render(){
        console.log(store.getState())
    return(
      <div>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='enter text'
            name='message'
            validate={(val) => (val ? true : false)}
          />

          <input type='submit' />

        </form>
      </div>
    );
  }
}

export default MessageInput
