import React from 'react';

const EditableFormButton = (props) => (
  <button onClick={props.openEditingForm} type="button" className="btn btn-xs btn-default marg-left" aria-label="Left Align">
    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
  </button>
);

export default EditableFormButton;
