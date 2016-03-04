import R from 'ramda';
import flyd from 'flyd';
import actionsStream from './main';
import itemsActions from './items';
import * as utils from '../utils';
import {ItemActionType, CategoryActionType, ListActionType, ActionType} from '../types';
import storage from '../storage';

const initialState = R.always({
  categories: [],
  items: [],
  list: {
    id: null
  },
  allLists: []
});

const emptyError = {
  type: 'EMPTY_CATEGORY',
  message: 'Add some items to category'
};

const Items = ItemActionType.caseOn({
  Add: (id, pid, state) => R.evolve({items: utils.addToList({id, pid, prcnt: storage.getItem(id).prcnt})}, state),
  Edit: (i, prcnt, state) => R.evolve({items: utils.editListChildren(i, prcnt)}, state),
  Remove: (i, state) => R.evolve({items: utils.removeFromList(i)}, state),
  RemoveParent: (pid, state) => R.evolve({items: utils.removeWithParent(pid)}, state),
  Reset: (items, state) => R.evolve({items: R.always(items)}, state)
});

const Categories = CategoryActionType.caseOn({
  Add: (id, state) => R.evolve({categories: utils.addToList({id, prcnt: storage.getCategory(id).prcnt})}, state),
  Edit: (c, prcnt, state) => R.evolve({categories: utils.editListChildren(c, prcnt)}, state),
  Remove: (c, state) => {
    itemsActions.removeParent(c.id);
    return R.evolve({categories: utils.removeFromList(c)}, state);
  },
  Reset: (categories, state) => R.evolve({categories: R.always(categories)}, state),
  ShowEmptyError: (id, state) => R.evolve({categories: utils.patchWithError(emptyError, id)}, state)
});

const List = ListActionType.caseOn({
  Save: R.identity,
  RenderList: R.identity,
  NewList: R.identity
});

const appState = ActionType.caseOn({
  Categories: Categories,
  Items: Items,
  List: List
});

const appStateStream = flyd.scan(R.flip(appState), initialState(), actionsStream);

export default appStateStream;
