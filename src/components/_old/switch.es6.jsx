import React, { Component, PropTypes } from 'react';

const CREDITCARD = 'Credit Card';
const BTC = 'Bitcoin';

const Choice = function(props) {
  let active = props.active === true ? "active" : ""

  return (
    <div className="choice" onClick={props.onClick} className={active}>{props.label}</div>
  )
}

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payMethod: BTC
    }
  }

  select(choice) {
    return (() => {
      this.setState({
        payMethod: choice
      })
    })
  }

  // renderChoice(choice) {
  //   let active = this.state.payMethod === choice ? "active" : ""

  //   return(<div className="choice" onClick={this.select(choice)} className={active}>{choice}</div>)
  // }

  render () {
    return(
      <div className="switch">
        <Choice onClick={this.select(CREDITCARD)} label={"PAY WITH CREDITCARD"} active={this.state.payMethod === CREDITCARD} />
        <Choice onClick={this.select(BTC)} label={"PAY WITH BITCOIn"} active={this.state.payMethod === BTC} />
        Paying with {this.state.payMethod}
      </div>
    )
  }
}

