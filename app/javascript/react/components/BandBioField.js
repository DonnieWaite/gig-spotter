import React from 'react';

const BandBioField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBandBioChange}
      />
    </label>
  );
}

export default BandBioField;
