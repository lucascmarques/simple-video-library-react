import _ from "lodash";
import { FETCH_VIDEOS, UPDATE_VIDEO, SELECT_VIDEO } from "../actions/videos";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_VIDEOS:
      return _.mapKeys(action.payload, "_id");
    case UPDATE_VIDEO:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
}
