import React from 'react';

const BandImageField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBandImageChange}
      />
    </label>
  );
}

export default BandImageField;
