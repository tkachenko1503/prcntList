import R from 'ramda';
import {stream, map} from 'flyd';
import mergeAll from 'flyd/module/mergeall';

export const getStateError = function (state) {
  // if (state.categories.length === 0) {
  //   return {type: 'EMPTY_LIST'};
  // }
  //
  // let catIds = R.pluck('id', state.categories);
  // let itemsPids = R.pluck('pid', state.items);
  // let diff = [for (i of catIds) if (itemsPids.indexOf(i) === -1) i];
  //
  // if (state.items.length === 0 || diff.length > 0) {
  //     return {type: 'EMPTY_CATEGORY'};
  // }
}

export const createActions = (list) => (R.zipObj(list, R.times(() => stream(), list.length)));

export const addToList = R.curry((props, list) => {
  let newChild,
    newList,
    currentPrcnt;

  if (list.length > 0) {
    currentPrcnt = (100 - props.prcnt) / list.length;
    newChild = {...props};
  } else {
    currentPrcnt = 0;
    newChild = {...props, prcnt: 100};
  }

  newList = list.map((i) => {
    return {...i, prcnt: currentPrcnt};
  });
  newList.push(newChild);

  return newList;
});

export const editListChildren = R.curry((c, prcnt, list) => {
  let newList,
    index = list.indexOf(c),
    currentPrcnt;

  currentPrcnt = (100 - prcnt) / (list.length - 1);
  newList = sliceList(index, list)
    .map(i => ({...i, prcnt: currentPrcnt}));

  newList.push({...c, prcnt: prcnt})
  return newList;
});

export const removeFromList = R.curry((c, list) => {
  let newList,
    index = list.indexOf(c),
    currentPrcnt;

  currentPrcnt = (list.length - 1) > 1
    ? 100 / (list.length - 1)
    : 100;

  newList = sliceList(index, list)
    .map(i => ({...i, prcnt: currentPrcnt}));

  return newList;
});

function sliceList(i, list) {
  return [
    ...list.slice(0, i),
    ...list.slice(i + 1)
  ];
}
