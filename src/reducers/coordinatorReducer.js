export const CoordinatorReducer = (state = {}, action) => {
   switch (action.type) {
     case 'LOADED_COORDINATOR':
       return {
         coordinator: action.coordinator
       };
     default:
       return state;
   }
}
