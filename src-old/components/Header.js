import React from 'react';
import listActions from '../streams/list';
import DropdownItem from './DropdownItem';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSavedLists() {
    if (!this.props.saved.length) {
      return;
    }

    return (
      <li role="presentation" className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          Saved Lists
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {this.props.saved.map(id => {
            return <DropdownItem list={id} />
          })}
        </ul>
      </li>
    );
  }

  render() {
    return (
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li key="0" role="presentation"><a onClick={listActions.createNewList} href="#">New List</a></li>
              {this.renderSavedLists()}
            </ul>
          </nav>
          <h3 className="text-muted">PrcntList</h3>
        </div>
    );
  }
}
