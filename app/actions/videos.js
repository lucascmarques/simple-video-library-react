import electron, { ipcRenderer } from 'electron';

export const FETCH_VIDEOS = "fetch_videos";
export const OPEN_VIDEO = "open_video";
export const SELECT_VIDEO = "select_video";
export const UPDATE_VIDEO = "update_video";

export function fetchVideos(videoLibraryId) {
  const videos = ipcRenderer.sendSync('videos:find', { videoLibraryId: videoLibraryId });

  return {
    type: FETCH_VIDEOS,
    payload: videos
  };
}

export function openVideo(video) {
  ipcRenderer.send('videos:open', video);

  return {
    type: OPEN_VIDEO,
    payload: video
  };
}

export function updateVideo(video) {
  const videoUpdated = ipcRenderer.sendSync('videos:update', video);

  return {
    type: UPDATE_VIDEO,
    payload: videoUpdated
  };
}

export function rateVideo(video, rating) {
  return updateVideo({...video, rating: rating});
}

export function selectVideo(video) {

  return {
    type: SELECT_VIDEO,
    payload: video
  };
}
