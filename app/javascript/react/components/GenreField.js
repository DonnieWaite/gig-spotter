import React from 'react';

const GenreField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleGenreChange}
      />
    </label>
  );
}

export default GenreField;
