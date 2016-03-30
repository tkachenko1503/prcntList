import React from 'react';
import R from 'ramda';
import ErrorsPanel from './ErrorsPanel';
import ListPanel from './ListPanel';
import Category from './Category';
import categoriesActions from '../streams/categories';
import listActions from '../streams/list';

const byId = R.groupBy(R.prop('pid'));

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.saveList = this.saveList.bind(this);
  }

  addCategory(e) {
    e.preventDefault();
    let categoryId = Number(e.target.elements["addCategorySel"].value);
    categoriesActions.add(categoryId);
  }

  saveList(e) {
    e.preventDefault();
    listActions.saveList(this.props.list.id);
  }

  render() {
    let items = byId(this.props.items);
    let canEditCategory = this.props.categories.length > 1;
    let canEditItem = this.props.items.length > 1;
    let categories = this.props.categories.map((category, i) => {
      return <Category
                key={i}
                params={category}
                items={items[category.id]}
                canEditCategory={canEditCategory}
                canEditItem={canEditItem} />
    });

    return(
      <div>
        <ErrorsPanel errors={this.props.list.err} />
        <ListPanel
          listId={this.props.list.id}
          addCategory={this.addCategory}
          saveList={this.saveList}
          categories={categories}
        />
      </div>
    );
  }
}
