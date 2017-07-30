import _ from "lodash";
import { FETCH_VIDEOS, UPDATE_VIDEO, SELECT_VIDEO } from "../actions/videos";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_VIDEOS:
      return { data: _.mapKeys(action.payload, "_id") };
    case UPDATE_VIDEO:
      let newState = { ...state };
      newState.data[action.payload._id] = action.payload;
      return newState;
    case SELECT_VIDEO:
      return { ...state, selectedVideo: action.payload };
    default:
      return state;
  }
}
