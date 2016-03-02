import R from 'ramda';
import flyd from 'flyd';
import actionsStream from './main';
import {addToList, editListChildren, removeFromList} from '../utils';
import {ItemActionType, CategoryActionType, ListActionType, ActionType} from '../types';
import storage from '../storage';

const initialState = R.always({
  categories: [],
  items: [],
  currentList: null,
  allLists: [],
  errors: []
});

const Items = ItemActionType.caseOn({
  Add: (id, pid, state) => R.evolve({items: addToList({id, pid, prcnt: storage.getItem(id).prcnt})}, state),
  Edit: (i, prcnt, state) => R.evolve({items: editListChildren(i, prcnt)}, state),
  Remove: (i, state) => R.evolve({items: removeFromList(i)}, state),
  RemoveParent: (id, state) => {
    // let childrens = [for (i of state) if (i.pid === action.value.pid) i];
    // let lengthLeft = state.length - childrens.length;
    // currentPrcnt = lengthLeft > 1 ? 100 / lengthLeft : 100;
    // currentState = [for (i of state) if (i.pid !== action.value.pid) {...i, prcnt: currentPrcnt}];
  },
  Reset: (items, state) => R.evolve({items: R.always(items)}, state)
});

const Categories = CategoryActionType.caseOn({
  Add: (id, state) => R.evolve({categories: addToList({id, prcnt: storage.getCategory(id).prcnt})}, state),
  Edit: (c, prcnt, state) => R.evolve({categories: editListChildren(c, prcnt)}, state),
  Remove: (c, state) => R.evolve({categories: removeFromList(c)}, state),
    // itemsActions.removeParent({
    //   pid: id
    // });
  Reset: (categories, state) => R.evolve({categories: R.always(categories)}, state)
});

const List = ListActionType.caseOn({
  Save: R.identity,
  RenderList: R.identity,
  NewList: R.identity
});

const appState = ActionType.caseOn({
  Categories: Categories,
  Items: Items,
  List: List,
  Errors: (message, oldState) => {console.log(message)}
});

const appStateStream = flyd.scan(R.flip(appState), initialState(), actionsStream);

export default appStateStream;
