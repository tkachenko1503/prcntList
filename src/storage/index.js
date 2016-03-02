import R from 'ramda';

const store = {
  categories: [
    {id: 1, prcnt: 10},
    {id: 2, prcnt: 20},
    {id: 3, prcnt: 30},
    {id: 4, prcnt: 40},
    {id: 5, prcnt: 50},
    {id: 6, prcnt: 60},
    {id: 7, prcnt: 70},
    {id: 8, prcnt: 80},
    {id: 9, prcnt: 90},
    {id: 10, prcnt: 100}
  ],
  items: [
    {id: 1, prcnt: 10},
    {id: 2, prcnt: 20},
    {id: 3, prcnt: 30},
    {id: 4, prcnt: 40},
    {id: 5, prcnt: 50},
    {id: 6, prcnt: 60},
    {id: 7, prcnt: 70},
    {id: 8, prcnt: 80},
    {id: 9, prcnt: 90},
    {id: 10, prcnt: 100}
  ]
};

const predItems = R.find(R.__, store.items);
const predCats = R.find(R.__, store.categories);

const storage = {
  getItem: id => predItems(R.propEq('id', id)),
  getCategory: id => predCats(R.propEq('id', id)),
  getAllItems: R.always(store.items),
  getAllCategories: R.always(store.categories)
};

export default storage;
