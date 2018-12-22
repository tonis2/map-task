import { ADD_POINT, REMOVE_POINT, REORDER, DOWNLOAD_DATA } from "../actions/types";

export default function mapReducer(state = [], action) {
  switch (action.type) {
    case ADD_POINT:
      state = [...state, action.payload];
      return state;
    default:
      return state;
  }
}