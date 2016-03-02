import R from 'ramda';
import flyd from 'flyd';
import mergeAll from 'flyd/module/mergeall';
import actionsStream from './main';
import {createActions} from '../utils';
import {ListActionType, ActionType} from '../types';

const actions = createActions(['saveList', 'renderFromList', 'renderNewList']);
const allActions = mergeAll([
  actions.saveList.map(ListActionType.Save),
  actions.renderFromList.map(ListActionType.RenderList),
  actions.renderNewList.map(ListActionType.NewList)
]);
flyd.on(R.pipe(ActionType.List, actionsStream), allActions);

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
