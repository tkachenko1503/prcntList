import {expect} from 'chai';

import App from '../src/types/App';
import List from '../src/types/List';
import {MaybeNum} from '../src/types/Maybe';

import {initialize} from '../src/core/app';

describe('application state:', () => {

  describe('initialize:', () => {

    it('should convert values to types', () => {
      const data = [{
        id: 0,
        categories: [],
        items: []
      }];
      const state = initialize(data);
      const expectedState = App.StateOf({
        currentList: MaybeNum.from(null),
        lists: [List.ListOf(data[0])]
      });

      expect(state.name).to.equal('State');
      expect(state.currentList).to.deep.equal(expectedState.currentList);
      expect(state.lists).to.deep.equal(expectedState.lists);
    });

  });

});
