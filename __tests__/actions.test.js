import { store, loadedResponsible, loadedCategory } from '../src/actions/index';
import { doApiGet } from '../src/shared/api';

describe('loadedResponsible', () => {
  it('should create an action to pass responsible', () => {

    const responsible = [{id: 0, name: "Daniel", lastname: "Mitchell", email: "daniel.mitchell@hussa.rs"}];
    const expectedAction = {
      type: 'LOADED_RESPONSIBLE',
      responsible
    };

    expect(loadedResponsible(responsible)).toEqual(expectedAction);

  })
})

describe('loadResponsible', () => {
  it('should load responsible from server', (done) => {

    return doApiGet('5bcdd7992f00006300c855d5')
      .then((data) => {
        expect(data.data[0].email).toEqual('daniel.mitchell@hussa.rs');
        done();
      });

  })
})

describe('loadedCategory', () => {
  it('should create an action to pass category', () => {

    const category = [{id: 0, name: "Cycling"}];
    const expectedAction = {
      type: 'LOADED_CATEGORY',
      category
    };

    expect(loadedCategory(category)).toEqual(expectedAction);

  })
})

describe('loadCategory', () => {
  it('should load category from server', (done) => {

    return doApiGet('5bcdd3942f00002c00c855ba')
      .then((data) => {
        expect(data.data[0].name).toEqual('Cycling');
        done();
      });

  })
})
