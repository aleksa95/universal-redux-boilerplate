const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SELECTED':
      return action.payload;
    default:
      return state;
  }
  return state;
};
