export const AboutReducer = (state = {}, action) => {
   switch (action.type) {
     case 'LOADED_CATEGORY':
       return {
         category: action.category
       };
     default:
       return state;
   }
}
