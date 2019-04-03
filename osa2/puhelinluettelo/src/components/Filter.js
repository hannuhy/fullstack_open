import React from 'react';

const Filter = ({term, handleChange}) => {
  return (
    <div>rajaa näytettäviä 
      <input value={term} onChange={handleChange} />
    </div>
  );
}

export default Filter;