import { ADD_POINT, REMOVE_POINT, REARRANGE } from "./types";
import uuidv4 from "uuid/v4";

export const AddPoint = (lat, lng) => ({
  type: ADD_POINT,
  payload: {
    id: uuidv4(),
    lat,
    lng
  }
});

export const RemovePoint = id => ({
  type: REMOVE_POINT,
  payload: {
    id
  }
});

export const MovePoint = (id, lat, lng) => ({
  type: REARRANGE,
  payload: {
    id,
    lat,
    lng
  }
});


