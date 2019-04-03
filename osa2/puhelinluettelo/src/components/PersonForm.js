import React from 'react';

const PersonForm = ({name, number, handleNameChange, handleNumberChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        nimi: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        numero: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
}

export default PersonForm;