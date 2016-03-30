import Type from 'union-type';
import R from 'ramda';

const Maybe = (type) => Type({
  Just: [type],
  Nothing: []
});

export const MaybeNum = Maybe(Number);
MaybeNum.from = (v) => (v ? MaybeNum.Just(v) : MaybeNum.Nothing());
