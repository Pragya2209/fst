import types from '../types';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_DETAIL:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer