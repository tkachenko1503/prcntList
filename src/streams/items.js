import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import {createActions} from '../utils';
import {ItemActionType, ActionType} from '../types';

const actions = createActions(['add', 'remove', 'removeParent', 'edit', 'reset']);
const allActions = mergeAll([
  actions.add.map(i => ItemActionType.Add(i.id, i.pid)),
  actions.remove.map(ItemActionType.Remove),
  actions.removeParent.map(ItemActionType.RemoveParent),
  actions.edit.map(i => ItemActionType.Edit(i.item, i.newPrcnt)),
  actions.reset.map(ItemActionType.Reset)
]);
flyd.on(R.pipe(ActionType.Items, actionsStream), allActions);

export default actions;
