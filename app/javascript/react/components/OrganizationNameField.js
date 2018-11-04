import React from 'react';

const OrganizationNameField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        id={props.id}
        type='text'
        value={props.content}
        onChange={props.handleOrganizationNameChange}
      />
    </label>
  );
}

export default OrganizationNameField;
