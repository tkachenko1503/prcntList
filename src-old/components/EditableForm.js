import React from 'react';

const EditableForm = (props) => (
  <form onSubmit={props.submitCallback} className="form-inline one-line marg-left">
    <div className="input-group">
      <input type="number" max="100" className="form-control" name="editedValue" placeholder="Edit" />
      <span className="input-group-btn">
        <button className="btn btn-default" type="submit">Save</button>
        <button onClick={props.cancelCallback} className="btn btn-default" type="submit">Cancel</button>
      </span>
    </div>
  </form>
);

export default EditableForm;
