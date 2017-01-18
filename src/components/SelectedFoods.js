import React, { Component, PropTypes } from 'react';

export default class SelectedFoods extends React.Component {

  render(){
    return(
      <div>
        <table>
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
            {this.props.selectedResults.map(({carbohydrate_g, description, id, kcal, protein_g, sugar_g}, key)=>
              <tr key={id}>
                <td>{description}</td>
                <td>{carbohydrate_g}</td>
                <td>{kcal}</td>
                <td>{protein_g}</td>
                <td>{sugar_g}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}
