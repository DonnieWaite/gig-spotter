import React from 'react';

const ConcertLocationField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleConcertLocationChange}
      />
    </label>
  );
}

export default ConcertLocationField;
