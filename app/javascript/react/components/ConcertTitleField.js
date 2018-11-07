import React from 'react';

const ConcertTitleField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleConcertTitleChange}
      />
    </label>
  );
}

export default ConcertTitleField;
