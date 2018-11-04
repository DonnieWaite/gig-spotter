import React from 'react';

const BandNameField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBandNameChange}
      />
    </label>
  );
}

export default BandNameField;
