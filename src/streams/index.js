import R from 'ramda';
import flyd from 'flyd';
import actionsStream from './main';
import {ItemsCases, itemsActions} from './items';
import {CategoriesCases, categoriesActions} from './categories';
import {ListCases} from './list';
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

const appState = ActionType.caseOn({
  Categories: CategoriesCases,
  Items: ItemsCases,
  List: ListCases
});

const appStateStream = flyd.scan(R.flip(appState), initialState(), actionsStream);

// log
flyd.on((a) => {console.log('action - ',a.name, a)}, actionsStream);
flyd.on((s) => {console.log('state - ', s)}, appStateStream);

export default appStateStream;
