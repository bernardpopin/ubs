export const CoordinatorReducer = (state = {}, action) => {
   switch (action.type) {
     case 'LOADED_RESPONSIBLE':
       return {
         responsible: action.responsible
       };
     default:
       return state;
   }
}
