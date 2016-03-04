import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import {createActions} from '../utils';
import {CategoryActionType, ActionType} from '../types';

const actions = createActions(['add', 'remove', 'edit', 'reset', 'showEmptyError']);
const allActions = mergeAll([
  actions.add.map(CategoryActionType.Add),
  actions.remove.map(CategoryActionType.Remove),
  actions.edit.map(c => CategoryActionType.Edit(c.item, c.newPrcnt)),
  actions.reset.map(CategoryActionType.Reset),
  actions.showEmptyError.map(CategoryActionType.ShowEmptyError)
]);
flyd.on(R.pipe(ActionType.Categories, actionsStream), allActions);

export default actions;
