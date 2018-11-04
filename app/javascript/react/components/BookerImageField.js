import React from 'react';

const BookerImageField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleBookerImageChange}
      />
    </label>
  );
}

export default BookerImageField;
