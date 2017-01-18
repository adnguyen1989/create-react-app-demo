import React, { Component, PropTypes } from 'react';
import FoodSearch from "./FoodSearch"
import SelectedFoods from "./SelectedFoods"

export default class FoodLookup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFoods: []
    }
    this.onFoodSubmit = this.onFoodSubmit.bind(this)
  }

  onFoodSubmit(food){
    const item = this.state.selectedFoods.find(function(e) {
      return e.id == food.id;
    });

    if (item) return

    this.setState({
      selectedFoods: this.state.selectedFoods.concat(food)
    })
  }

  render(){
    return(
      <div>
        <SelectedFoods selectedResults={this.state.selectedFoods} />
        <FoodSearch onSubmit={this.onFoodSubmit} />
      </div>
    )
  }
}
