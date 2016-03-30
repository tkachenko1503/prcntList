import Type from 'union-type';
import React from 'react';
import flyd from 'flyd';
import forwardTo from 'flyd-forwardto';

import List from './List';
import AppContainer from '../blocks/AppContainer';

// MODEL

const Model = Type({
  State: {
    list: List.Model
  }
});

// return initial model
const init = (id) => {
  return Model.StateOf({
    list: List.init(id)
  });
};

// UPDATE

// action types
const Actions = Type({
  SwitchList: [Number], //id
  ListAction: [List.Actions]
});

// state reducer
const update = Actions.caseOn({
  SwitchList: (id) => Model.State(List.init(id)),
  ListAction: (action, state) => Model.State(List.update(action, state.list))
});

// VIEW

class View extends React.Component {
  constructor(props) {
    super(props);

    // handlers
    this.switchList$ = forwardTo(props.actions$, Actions.SwitchList);
    this.listAction$ = forwardTo(props.actions$, Actions.ListAction);
  }

  render() {
    const {actions$, model} = this.props;

    return (
      <AppContainer switchList={this.switchList$}>
        <List.View model={model.list} actions$={this.listAction$} />
      </AppContainer>
    );
  }
}

export default {Model, Actions, View, update, init};
