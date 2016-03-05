import React from 'react';
import Editable from './Editable';
import itemsActions from '../streams/items';

export default class Item extends Editable {
  constructor(props) {
    super(props);
    this.removeAction = this.removeAction.bind(this);
  }

  editAction(value) {
    itemsActions.edit({
      item: this.props.params,
      newPrcnt: value
    });
  }

  removeAction() {
    itemsActions.remove(this.props.params);
  }

  render() {
    let {params} = this.props;

    return(
      <li>
        Item - {params.prcnt}%
        {this.editableMarkup(this.props.canEditItem)}
        <button onClick={this.removeAction} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
    );
  }
}
