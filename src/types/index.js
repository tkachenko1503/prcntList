import unionType from 'union-type';

const ItemActionType = unionType({
  Add: [Number, Number], // id, pid
  Edit: [Object, Number], // id, prcnt
  Remove: [Object], // id
  RemoveParent: [Number], // id
  Reset: [Array]
});

const CategoryActionType = unionType({
  Add: [Number], // id
  Edit: [Object, Number], // c, prcnt
  Remove: [Object], // c
  Reset: [Array],
  ShowEmptyError: [Number]
});

const ListActionType = unionType({
  Save: [],
  RenderList: [],
  NewList: [],
  ShowEmptyError: []
});

const ActionType = unionType({
  Categories: [CategoryActionType],
  Items: [ItemActionType],
  List: [ListActionType]
});

export {
  ItemActionType,
  CategoryActionType,
  ListActionType,
  ActionType
};
