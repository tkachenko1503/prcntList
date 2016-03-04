import R from 'ramda';
import {stream, map} from 'flyd';
import mergeAll from 'flyd/module/mergeall';

export const createActions = (list) => R.zipObj(list, R.times(() => stream(), list.length));
export const filterByParent = R.pipe(R.propEq('pid'), R.filter);

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

export const removeWithParent = R.curry((pid, list) => {
  let newList,
    currentPrcnt,
    childrens = filterByParent(pid)(list),
    lengthLeft = list.length - childrens.length;
    
    currentPrcnt = lengthLeft > 1 ? 100 / lengthLeft : 100;
    newList = R.map(i => ({...i, prcnt: currentPrcnt}), R.without(childrens, list));

    return newList;
});

export const patchWithError = R.curry((err, id, list) => {
  let c = R.find(R.propEq('id', id), list),
    index = list.indexOf(c);

  return [
    ...list.slice(0, index),
    {...c, err: err},
    ...list.slice(index + 1)
  ];
});


function sliceList(i, list) {
  return [
    ...list.slice(0, i),
    ...list.slice(i + 1)
  ];
}
