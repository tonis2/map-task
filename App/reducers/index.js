import { ADD_POINT, REMOVE_POINT, REARRANGE } from "../actions/types";

export default function mapReducer(state = [], action) {
  switch (action.type) {
    case ADD_POINT:
      state = [...state, action.payload];
      return state;
    case REMOVE_POINT:
      state = state.filter(item => item.id !== action.payload.id)
      return state;
    case REARRANGE:
      state = state.map(item => {
        if (item.id === action.payload.id) {
          item = action.payload
        }
        return item
      })
      return state;
    default:
      return state;
  }
}