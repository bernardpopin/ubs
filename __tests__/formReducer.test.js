import { FormReducer } from '../src/reducers/formReducer';

describe('formReducer', () => {
  it('should handle SAVED_TO_FORM', () => {

    const title = {title: 'Sport event'};

    expect(
      FormReducer(undefined, {
        type: 'SAVED_TO_FORM',
        value: title
      })
    ).toEqual(
      {
        form: {title: 'Sport event'}
      }
    );

  })
})
