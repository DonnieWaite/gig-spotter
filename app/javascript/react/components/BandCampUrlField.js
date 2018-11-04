import React from 'react';

const BandCampUrlField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBandCampUrlChange}
      />
    </label>
  );
}

export default BandCampUrlField;
