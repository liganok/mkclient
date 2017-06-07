import {
  GET_AGENDALIST,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_AGENDALIST:
      return {
        ...state,
        agendas:action.payload.agendas,
        currentPage:0
      };

    default:
      return state;
  }

  return state;
};
