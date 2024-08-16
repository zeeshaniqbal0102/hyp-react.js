import { combineReducers } from "redux";
import videoReducer from "./videoReducer";
import headVideoReducer from "./headVideoReducer";

export default combineReducers({
    videoLoaded: videoReducer,
    headVideo: headVideoReducer
})
