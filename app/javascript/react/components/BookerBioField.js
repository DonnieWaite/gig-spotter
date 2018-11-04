import React from 'react';

const BookerBioField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBookerBioChange}
      />
    </label>
  );
}

export default BookerBioField;
