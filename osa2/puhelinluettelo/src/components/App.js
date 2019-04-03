import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonsList from './PersonsList';
import personsService from '../services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(personsList => {
        setPersons(personsList);
      })
  }, []);

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  }

  const handleNameChange = (evt) => {
    setNewName(evt.target.value);
  }

  const handleNumberChange = (evt) => {
    setNewNumber(evt.target.value);
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newPerson = persons.find(person => person.name === newName);
    if (newPerson) {
      const confirm = window.confirm(`${newName} on jo puhelinluettelossa, korvataanko numero?`);
      if (confirm) {
        personsService
          .update(newPerson.id, {...newPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== newPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber(''); 
          })
      }
    } else {
      personsService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter 
        term={searchTerm} 
        handleChange={handleSearchChange} 
      />

      <h3>Lisää uusi</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numerot</h3>
      <PersonsList
        searchTerm={searchTerm}
        persons={persons}
        handleDelete={(id) => handleDelete(id)}
      />
    </div>
  );
}

export default App