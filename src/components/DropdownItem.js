import React from 'react';
import listActions from '../streams/list';

export default class DropdownItem extends React.Component {
  constructor(props) {
    super(props);
    this.showListById = () => listActions.renderList(this.props.list);
  }

  render() {
    return (
      <li key={this.props.list}><a onClick={this.showListById} href="#">{this.props.list}</a></li>
    );
  }
}
