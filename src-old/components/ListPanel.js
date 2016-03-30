import React from 'react';
import storage from '../storage';

const ListPanel = (props) => (
  <div>
    <h4>{props.listId ? props.listId : "New List"}</h4>
    Actions:
    <div className="panel panel-default">
      <div className="actions">
        <div className="actions__col">
          <form onSubmit={props.addCategory} className="form-inline">
            <div className="form-group">
              <label>Add category:</label>
              <select className="form-control" name="addCategorySel">
                {storage.getAllCategories().map((op, i) => {
                  return <option key={i} value={op.id}>{op.prcnt}%</option>
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-sm btn-primary">+</button>
          </form>
        </div>
        <div className="actions__col">
          <a href="#" onClick={props.saveList}>Save</a>
        </div>
      </div>
    </div>
    {props.categories}
  </div>
);

export default ListPanel;
