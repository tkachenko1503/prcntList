import React from 'react';
import storage from '../storage';

const CategoryPanel = (props) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <span className="one-line">Category {props.params.id} - {props.params.prcnt}%</span>
      {props.editForm}
      <form onSubmit={props.addItem} className="form-inline one-line actions__col">
      <div className="form-group">
        <label>Add item: </label>
        <select className="form-control" name="addItemSel">
          {storage.getAllItems().map((op, i) => {
            return <option key={i} value={op.id}>{op.prcnt}%</option>
          })}
        </select>
      </div>
      <button type="submit" className="btn btn-sm btn-primary">+</button>
    </form>
    <button onClick={props.remove} type="button" className="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="panel-body">
      <ul>
        {props.items}
      </ul>
    </div>
  </div>
);

export default CategoryPanel;
