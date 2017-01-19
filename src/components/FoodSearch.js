import React, { Component, PropTypes } from 'react'
import Client from '../helpers/Client'

export default class FoodSearch extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filterText: "",
      searchResults: []
    }
    this.onSearchChange = this.onSearchChange.bind(this)
    this.getFoods = this.getFoods.bind(this)
    this.clearFilterText = this.clearFilterText.bind(this)
  }

  componentWillMount() {
    this.getFoods(this.state.filterText)
  }

  onSearchChange(evt){
    const filterText = evt.target.value
    this.setState({
      filterText: evt.target.value,
    })

    this.getFoods(filterText)
  }

  getFoods(filterText){
    Client.search(filterText, (response)=>{
      this.setState({
        searchResults: response || []
      })
    })
  }

  clearFilterText(){
    this.setState({
      filterText: ""
    })
    this.getFoods("")
  }

  render(){
    return (
      <div>
        <form>
          <input id="searchField" type="text"
          name="searchField"
          placeholder="Enter a search term"
          onChange={this.onSearchChange}
          value={this.state.filterText}>
          </input>
        </form>

        <br />

        <button className="remove icon" onClick={this.clearFilterText} hidden={this.state.filterText===""}>Clear Filter Text</button>

        <br />
        <br />
        <br />

        <table className='ui selectable structured large table' id='selectedResults'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Carbohydrate_g</th>
              <th>Kcal</th>
              <th>Protein</th>
              <th>Sugar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.searchResults.map((food, key)=>
              <tr key={food.id}>
                <td>{food.description}</td>
                <td>{food.carbohydrate_g}</td>
                <td>{food.kcal}</td>
                <td>{food.protein_g}</td>
                <td>{food.sugar_g}</td>
                <td><button className="add-button" onClick={() => this.props.onSubmit(food)}>Add</button></td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
