  import React from 'react';
import ListPersons from './components/ListPersons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  componentDidMount() {
    personService
      .getPersons()
      .then(persons => {
        this.setState({ persons })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if((this.state.newName === '') || (this.state.newNumber === '')) {
      this.setState({
        error: `kumpikaan kenttä ei saa olla tyhjä`
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
      return
    }

    const searchPerson = this.state.persons.find(person => person.name === this.state.newName)
    if (!searchPerson) {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            error: `lisättiin ${personObject.name}`
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)

        })
    } else {
      this.updatePhone(searchPerson.id)
    }
  }

  updatePhone = (id) => {
    const name = this.state.newName
    
    if(!window.confirm(`${name} on jo olemassa, haluatko antaa uuden numeron`)){
      this.setState({
        newName: '',
        newNumber: ''
      })
      return
    }

    const person = this.state.persons.find(person => person.id === id)
    const updatedPerson = { ...person, number: this.state.newNumber}
    personService
      .update(id, updatedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : updatedPerson ),
          newName: '',
          newNumber: '',
          error: `${updatedPerson.name} numero päivitetty`
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
  }

  deletePerson = (id) => {
    return () => {
      const personDelete = this.state.persons.find(personId => personId.id === id)
      
      if(window.confirm('poistetaanko '+personDelete.name+'')) {
        personService
          .remove(personDelete.id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person=>person !== personDelete),
              newName: '',
              newNumber: '',
              error: `${personDelete.name} poistettiin onnistuneesti`
            })
            console.log('poistettu')
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)  
          })
          .catch(error => {
            console.log('poistaminen epäonnistui')
          })
      }
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    const personsToShow =
      this.state.persons.filter(person => person.name.toString().toLowerCase().includes(this.state.filter))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error} />
        <Filter status={this.state.filter} change={this.handleFilterChange} />
        <AddPerson statusName={this.state.name} statusNumber={this.state.number} changeName={this.handleNameChange} changeNumber={this.handleNumberChange} add={this.addPerson} />
        <ListPersons persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App