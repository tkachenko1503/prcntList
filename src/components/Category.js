import React from 'react';
import Editable from './Editable';
import itemsActions from '../streams/items';
import categoriesActions from '../streams/categories';
import Item from './Item';
import CategoryPanel from './CategoryPanel';

export default class Category extends Editable {
  addItem(e) {
    e.preventDefault();
    let itemId = Number(e.target.elements["addItemSel"].value);
    itemsActions.add({
      id: itemId,
      pid: this.props.params.id
    });
  }

  editAction(value) {
    categoriesActions.edit({
      item: this.props.params,
      newPrcnt: value
    });
  }

  removeAction() {
    categoriesActions.remove(this.props.params);
  }

  renderItems(items) {
    if (items && items.length > 0) {
      return items.map((item, i) => {
        return <Item key={i} params={item} canEditItem={this.props.canEditItem} />
      });
    }
  }

  render() {
    let {params, items} = this.props;

    return(
      <CategoryPanel
        params={params}
        editForm={this.editableMarkup(this.props.canEditCategory)}
        addItem={this.addItem.bind(this)}
        remove={this.removeAction.bind(this)}
        items={this.renderItems(items)}
      />
    );
  }
}
