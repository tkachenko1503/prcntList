import React from 'react';

export default class Header extends React.Component {
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
          {this.props.saved.map(list => {
            return <li key={list}><a onClick={() => {this.props.showListById(list)}} href="#">{list}</a></li>
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
              <li key="0" role="presentation"><a onClick={this.props.showNewList} href="#">New List</a></li>
              {this.renderSavedLists()}
            </ul>
          </nav>
          <h3 className="text-muted">PrcntList</h3>
        </div>
    );
  }
}
