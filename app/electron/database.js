const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;

const appPath = app.getAppPath();
const path = require('path');

const VideoFunctions = require('./video-functions');

const Datastore = require('nedb');
const db = new Datastore();

db.videoLibraries = new Datastore({
  filename: path.join(appPath, '../data/videoLibraries.db'),
  autoload: true
});

db.videos = new Datastore({
  filename: path.join(appPath, '../data/videos.db'),
  autoload: true
});

db.videos.ensureIndex({ fieldName: '_id', unique: true });
db.videos.ensureIndex({ fieldName: 'completePath', unique: true });
db.videoLibraries.ensureIndex({ fieldName: '_id', unique: true });
db.videoLibraries.ensureIndex({ fieldName: 'name', unique: true });

var Database = {

  compactVideosDb:() => {
    console.log('Compacting the database...');
    db.videos.persistence.compactDatafile();
  },

  insertVideo: (video) => {
    return new Promise((resolve, reject) => {
      db.videos.insert(video, (err, newDoc) => { err ? reject(err) : resolve(newDoc) });
    });
  },

  updateVideo: (video) => {
    return new Promise((resolve, reject) => {
      db.videos.update({ _id: video._id }, video,
        { multi: false, returnUpdatedDocs: true }, (err, numAffected, affectedDocuments) => {
        err ? reject(err) : resolve(affectedDocuments)
      });
    });
  },

  findVideo: (options) => {
    return new Promise((resolve, reject) => {
      db.videos.find(options, (err, videos) => { err ? reject(err) : resolve(videos) });
    });
  },

  removeVideo: (videoId) => {
    return new Promise((resolve, reject) => {
      db.videos.remove({ _id: videoId }, {}, (err, numRemoved) => err ? reject(err) : resolve(numRemoved));
    });
  },

  saveVideoFile: async (videoFile, videoLibraryId) => {

    videoFile.videoLibraryId = videoLibraryId;
    let video = await Database.insertVideo(videoFile);

    let images = await VideoFunctions.generateScreenshot(video, 'cover.jpg');
    video.cover = images[0];

    let metadata = await VideoFunctions.getMetadata(video.completePath);
    video.size = metadata['format']['size'];
    video.duration = metadata['format']['duration'];
    video.width = metadata['streams'][0]['width'];
    video.height = metadata['streams'][0]['height'];

    return Database.updateVideo(video);

  },

  insertVideoLibrary: (videoLibrary) => {
    return new Promise((resolve, reject) => {
      db.videoLibraries.insert(videoLibrary, (err, newDoc) => { err ? reject(err) : resolve(newDoc) });
    });
  },

  updateVideoLibrary: (videoLibrary) => {
    return new Promise((resolve, reject) => {
      db.videoLibraries.update({ _id: videoLibrary._id }, videoLibrary,
        { multi: false, returnUpdatedDocs: true }, (err, numAffected, affectedDocuments) => {
          err ? reject(err) : resolve(affectedDocuments)
        });
    });
  },

  removeVideoLibrary: (videoLibraryId) => {
    return new Promise((resolve, reject) => {
      db.videoLibraries.remove({ _id: videoLibraryId }, {}, (err, numRemoved) => err ? reject(err) : resolve(numRemoved));
    });
  },

  findVideoLibrary: (options) => {
    return new Promise((resolve, reject) => {
      db.videoLibraries.find(options, (err, videoLibraries) => { err ? reject(err) : resolve(videoLibraries) });
    });
  },

};

ipcMain.on('videoLibraries:insert', async (event, videoLibrary) => {
  event.returnValue = await Database.insertVideoLibrary(videoLibrary);
});

ipcMain.on('videoLibraries:update', async (event, videoLibrary) => {
  event.returnValue = await Database.updateVideoLibrary(videoLibrary);
});

ipcMain.on('videoLibraries:remove', async (event, videoLibraryId) => {
  event.returnValue = await Database.removeVideoLibrary(videoLibraryId);
});

ipcMain.on('videoLibraries:find', async (event, options) => {
  event.returnValue = await Database.findVideoLibrary(options);
});

ipcMain.on('videos:insert', async (event, video) => {
  event.returnValue = await Database.insertVideo(video);
});

ipcMain.on('videos:update', async (event, video) => {
  event.returnValue = await Database.updateVideo(video);
});

ipcMain.on('videos:remove', async (event, videoId) => {
  event.returnValue = await Database.removeVideo(videoId);
});

ipcMain.on('videos:find', async (event, options) => {
  event.returnValue = await Database.findVideo(options);
});

ipcMain.on('videos:findAndSaveFiles', async (event, videosPaths, videoLibraryId) => {

  let allVideos = await Database.findVideo({videoLibraryId});
  let existingVideos = [];
  for (let video of allVideos) {
    existingVideos.push(video.completePath);
  }

  let videos = [];
  let videosFiles = [];
  for (let videoPath of videosPaths) {
    videosFiles.push(...VideoFunctions.findVideoFiles(videoPath, existingVideos));
  }

  for (let videoFile of videosFiles) {

    try {
      let video = await Database.saveVideoFile(videoFile, videoLibraryId);
      event.sender.send('videos:findAndSaveFiles:end', video);
      videos.push(video);
    } catch (err) {
      console.log(err);
    }

  }

  event.sender.send('videos:findAndSaveFiles:endAll', videos);

});

// module.exports = db;
