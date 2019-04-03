import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonsList from './PersonsList';
import Notification from './Notification';
import personsService from '../services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ notification, setNotification ] = useState(null);

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
    const confirm = window.confirm("Haluatko varmasti poistaa?");
    if (confirm) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification({
            message: 'Poisto onnistui',
            status: 'success'
          });
          setTimeout(() => {
            setNotification(null)
          }, 5000);
        })
        .catch(error => {
          setNotification({
            message: 'Henkilö oli jo poistettu',
            status: 'error'
          });
          setTimeout(() => {
            setNotification(null)
          }, 5000);
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
            setNotification({
              message: 'Muokkaus onnistui',
              status: 'success'
            });
            setTimeout(() => {
              setNotification(null)
            }, 5000); 
          })
      }
    } else {
      personsService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification({
            message: 'Lisäys onnistui',
            status: 'success'
          });
          setTimeout(() => {
            setNotification(null)
          }, 5000);
        });
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification notification={notification} status="success" />

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