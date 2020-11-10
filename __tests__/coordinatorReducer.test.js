import { CoordinatorReducer } from '../src/reducers/coordinatorReducer';

describe('coordinatorReducer', () => {
  it('should handle LOADED_RESPONSIBLE', () => {

    const responsible = [{id: 0, name: "Daniel", lastname: "Mitchell", email: "daniel.mitchell@hussa.rs"}];

    expect(
      CoordinatorReducer([], {
        type: 'LOADED_RESPONSIBLE',
        responsible
      })
    ).toEqual(
      {
        responsible: [{id: 0, name: "Daniel", lastname: "Mitchell", email: "daniel.mitchell@hussa.rs"}]
      }
    );

  })
})
