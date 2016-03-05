import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import itemsActions from './items';
import * as utils from '../utils';
import {CategoryActionType, ActionType} from '../types';
import storage from '../storage';

const emptyError = {
  type: 'EMPTY_CATEGORY',
  message: 'Add some items to category'
};

const actions = utils.createActions(['add', 'remove', 'edit', 'reset', 'showEmptyError']);
const allActions = mergeAll([
  actions.add.map(CategoryActionType.Add),
  actions.remove.map(CategoryActionType.Remove),
  actions.edit.map(c => CategoryActionType.Edit(c.item, c.newPrcnt)),
  actions.reset.map(CategoryActionType.Reset),
  actions.showEmptyError.map(CategoryActionType.ShowEmptyError)
]);

flyd.on(R.pipe(ActionType.Categories, actionsStream), allActions);

export const CategoriesCases = CategoryActionType.caseOn({
  Add: (id, state) => R.evolve({categories: utils.addToList({id, prcnt: storage.getCategory(id).prcnt})}, state),
  Edit: (c, prcnt, state) => R.evolve({categories: utils.editListChildren(c, prcnt)}, state),
  Remove: (c, state) => {
    itemsActions.removeParent(c.id);
    return R.evolve({categories: utils.removeFromList(c)}, state);
  },
  Reset: (categories, state) => R.evolve({categories: R.always(categories)}, state),
  ShowEmptyError: (id, state) => R.evolve({categories: utils.patchWithError(emptyError, id)}, state)
});

export default actions;
