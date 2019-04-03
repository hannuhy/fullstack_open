import React from 'react';

const PersonsList = ({ searchTerm, persons, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter(person => searchTerm === '' || 
                          person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>poista</button></li>)
      }
    </ul>
  )
}

export default PersonsList;