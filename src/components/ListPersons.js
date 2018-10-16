import React from 'react'

const ListPersons = ({ persons, deletePerson }) => (
  <div>
    <h2>Numerot</h2>
    <table>
      <tbody>
        {
          persons.map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>   
              <td><button onClick={deletePerson(person.id)}>poista</button></td>          
            </tr>
          )
        }
      </tbody>
    </table>
  </div>
)

export default ListPersons