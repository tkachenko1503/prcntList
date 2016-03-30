import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import itemsActions from './items';
import categoriesActions from './categories';
import {createActions} from '../utils';
import {ListActionType, ActionType} from '../types';
import storage from '../storage';

const emptyListError = {
  type: 'EMPTY_LIST',
  message: 'Add some categories'
};

const actions = createActions(['saveNewList','saveExsistingList','renderList','createNewList','showEmptyError']);
const allActions = mergeAll([
  actions.saveNewList.map(ListActionType.SaveNewList),
  actions.saveExsistingList.map(ListActionType.SaveExsistingList),
  actions.renderList.map(ListActionType.RenderList),
  actions.createNewList.map(_ => ListActionType.CreateNewList()),
  actions.showEmptyError.map(ListActionType.ShowEmptyError)
]);

flyd.on(R.pipe(ActionType.List, actionsStream), allActions);

export const ListCases = ListActionType.caseOn({
  SaveNewList: (state) => {
    let id = storage.saveList(state);
    return R.evolve({list: {id: id}}, state);
  },
  SaveExsistingList: (id, state) => {
    storage.updateList(id, state);
    return state;
  },
  RenderList: (id, state) => {
    let listData = storage.getList(id);

    itemsActions.reset(listData.items);
    categoriesActions.reset(listData.categories);

    return R.evolve({
      list: listData.list
    }, state);
  },
  CreateNewList: (state) => {
    itemsActions.reset([]);
    categoriesActions.reset([]);

    return R.evolve({list: R.always({id: null})}, state);
  },
  ShowEmptyError: (state) => {
    return R.evolve({list: {...state.list, err: emptyListError}}, state);
  }
});

export default actions;

// export default {
//   saveList: function (id = Date.now()) {
//     let currentState = appState();
//     let stateError = utils.getStateError(currentState);
//
//     if (stateError) {
//       errorStream(stateError);
//       return;
//     }
//
//     let allLists = this.getAllLists();
//
//     allLists[id] = currentState;
//     localStorage.setItem('prcnt-lists', JSON.stringify(allLists));
//     appStream({listId: id});
//   },
//   getAllLists: function () {
//     let data = localStorage.getItem('prcnt-lists');
//     return JSON.parse(data) || {};
//   },
//   renderFromList: function (list, id) {
//     categoriesActions.reset(list.categories);
//     itemsActions.reset(list.items);
//     appStream({listId: id});
//   },
//   renderNewList: function () {
//     categoriesActions.reset([]);
//     itemsActions.reset([]);
//     appStream({listId: undefined});
//   }
// };
