import Type from 'union-type';
import React from 'react';
import R from 'ramda';
import flyd from 'flyd';
import forwardTo from 'flyd-forwardto';

import {MaybeNum} from '../types/Maybe';

// MODEL

const Model = Type({
  List: {
    id: Number,
    categories: Array,
    items: Array
  }
});

// return initial model
const init = (id = -1) => {
  // @TODO get list by id from store
  return Model.ListOf({
    id: id,
    categories: [],
    items: []
  });
};

// UPDATE

// action types
const Actions = Type({
  SaveList: [MaybeNum], // id or null
  CreateNewList: []
});

// state reducer
const update = Actions.caseOn({
  SaveList: (id, state) => state,
  CreateNewList: (state) => state
});

// VIEW

class View extends React.Component {
  constructor(props) {
    super(props);

    // handlers
    this.save$ = forwardTo(props.actions$, (e) => {
      return Actions.SaveList(MaybeNum.from(12));
    });
    this.create$ = forwardTo(props.actions$, R.always(Actions.CreateNewList()));
  }

  render() {
    const {actions$, model} = this.props;

    return (
      <div>
        This is List!
        <button onClick={this.save$}>
          Test SaveList
        </button>
        <button onClick={this.create$}>
          Test CreateNewList
        </button>
      </div>
    );
  }
}

export default {Model, Actions, View, update, init};
