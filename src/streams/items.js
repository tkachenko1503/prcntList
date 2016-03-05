import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import * as utils from '../utils';
import {ItemActionType, ActionType} from '../types';
import storage from '../storage';

const actions = utils.createActions(['add', 'remove', 'removeParent', 'edit', 'reset']);
const allActions = mergeAll([
  actions.add.map(i => ItemActionType.Add(i.id, i.pid)),
  actions.remove.map(ItemActionType.Remove),
  actions.removeParent.map(ItemActionType.RemoveParent),
  actions.edit.map(i => ItemActionType.Edit(i.item, i.newPrcnt)),
  actions.reset.map(ItemActionType.Reset)
]);

flyd.on(R.pipe(ActionType.Items, actionsStream), allActions);

export const ItemsCases = ItemActionType.caseOn({
  Add: (id, pid, state) => R.evolve({items: utils.addToList({id, pid, prcnt: storage.getItem(id).prcnt})}, state),
  Edit: (i, prcnt, state) => R.evolve({items: utils.editListChildren(i, prcnt)}, state),
  Remove: (i, state) => R.evolve({items: utils.removeFromList(i)}, state),
  RemoveParent: (pid, state) => R.evolve({items: utils.removeWithParent(pid)}, state),
  Reset: (items, state) => R.evolve({items: R.always(items)}, state)
});

export default actions;
