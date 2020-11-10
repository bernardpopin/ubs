import { AboutReducer } from '../src/reducers/aboutReducer';

describe('aboutReducer', () => {
  it('should handle LOADED_CATEGORY', () => {

    const category = [{id: 0, name: "Cycling"}];

    expect(
      AboutReducer([], {
        type: 'LOADED_CATEGORY',
        category
      })
    ).toEqual(
      {
        category: [{id: 0, name: "Cycling"}]
      }
    );

  })
})
