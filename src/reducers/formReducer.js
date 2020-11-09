export const FormReducer = (state = {form: {}}, action) => {
   switch (action.type) {
     case 'SAVED_TO_FORM':
       const form = Object.assign(state.form, action.value);
       return { form };
     default:
       return state;
   }
}
