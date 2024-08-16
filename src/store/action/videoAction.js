import { SET_VIDEO } from "../action/types";

export const setApiLoaded = (data) => (dispatch) => {
    dispatch({
        type: SET_VIDEO,
        payload: {isLoaded: data.isLoaded, videoName: data.videoName, homeData : data.homeData, servPopup : data.servPopup}
    })
};
