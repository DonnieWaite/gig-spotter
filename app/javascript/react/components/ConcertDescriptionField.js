import React from 'react';

const ConcertDescriptionField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleConcertDescriptionChange}
      />
    </label>
  );
}

export default ConcertDescriptionField;
