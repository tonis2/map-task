import uuidv4 from "uuid/v4";
import { ADD_POINT, REMOVE_POINT, REORDER, DOWNLOAD_DATA } from "./types";

export const AddPoint = (lat, lng) => ({
  type: ADD_POINT,
  payload: {
    lat,
    lng
  }
});


export const RemovePoint = (lat, lng) => ({
  type: REMOVE_POINT,
  payload: {
    lat,
    lng
  }
});


export const Reorder = (lat, lng) => ({
  type: ADD_POINT,
  payload: {
    lat,
    lng
  }
});


export const Download = (lat, lng) => ({

});
