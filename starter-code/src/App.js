import React, { Component } from 'react';

import 'bulma/css/bulma.css';
import foodsJson from './foods.json'
import FoodBox from './Components/FoodBox'
import AddFood from './Components/AddFood'

class App extends Component {

  state = {
    foods: foodsJson,
    foodToAdd: '',
    caloriesToAdd: 0,
    showForm: false,
    search: ''
    // searchFoods: []
  }


  showFoods = (index) => {
    return this.state.foods.map((eachFood, i) => {
      return < FoodBox key={i} {...eachFood} />
    })
  }

  addFood = (e) => {
    e.preventDefault()
    // console.log(e.target.children[0].value )
    console.log('add food ', this.state)
    let newFoods = [... this.state.foods] // copy of all the previous food


    let newFood = {
      name: this.state.foodToAdd,
      calories: this.state.caloriesToAdd,
      image: '',
      quantity: 0
    }

    newFoods.unshift(newFood) // I added my new food to the list


    this.setState({
      foods: newFoods,
      foodToAdd: '',
      caloriesToAdd: 0,
    })
    this.setFormToTrue()
  }

  setInputs = (e) => {
    console.log(e.target.value, e.target.name)
    this.setState({
      [e.target.name]: e.target.value // === food: 'pizza'
    })
  }

  setFormToTrue = () => {
    this.setState ({
      showForm: !this.state.showForm,
    })
  }

  setSearch = (e) => {
    this.setState({
      'search': e.target.value 
    })
   let filterFoods = [... foodsJson].filter(eachFood => {
     return eachFood.name.toLowerCase().includes(e.target.value.toLowerCase())
   })

   this.setState({
     'search': e.target.value,
     foods: filterFoods
   })
  }

  showTheForm = () => {
    return (
      this.state.showForm ?

        <form onSubmit={this.addFood}>
          <input onChange={this.setInputs} placeholder="add a food" name='foodToAdd' type='text' />
          <input onChange={this.setInputs} placeholder="calories" name='caloriesToAdd' type='number' />
          <input name='submit' type='submit' value='Add Food' />
        </form>

        : <button  onClick={this.setFormToTrue}>Show Form</button>
    )
  }

  render() {

    return (
      <div className='App'>

        <h1>{Math.random()}</h1>


<input type='text' name='search' placeholder='Search for food' onChange={this.setSearch} />

        {this.showTheForm()}
        {this.showFoods()}

      </div>
    );
  }
}


export default App
