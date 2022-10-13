const initialState = {
  isApply: false,
  isRemoveDateRange: false,
};
export const selectorsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_STATUS_APPLY':
      return Object.assign({}, state, {
        isApply: action.payload,
      });
    case 'REMOVE_DATE_RANGE':
      return Object.assign({}, state, {
        isRemoveDateRange: action.payload,
      });
    default:
      return state;
  }
};
