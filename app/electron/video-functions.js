const electron = require('electron');
const app = electron.app;
const shell = electron.shell;
const appPath = app.getAppPath();
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ipcMain = electron.ipcMain;

if (process.platform === 'win32') {
  ffmpeg.setFfmpegPath(path.join(appPath, '../tmp/ffmpeg.exe'));
  ffmpeg.setFfprobePath(path.join(appPath, '../tmp/ffprobe.exe'));
}

var VideoFunctions = {

  findVideoFiles: (filePath, existingVideos) => {

    let videos = [];
    let filter = /^.*\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4|mkv|MKV|mov|MOV)$/;

    let files = fs.readdirSync(filePath);
    for (let fileName of files) {

      var completePath = path.join(filePath, fileName);
      if (existingVideos.indexOf(completePath) >= 0) {
        continue;
      }

      var name = path.parse(fileName).name;
      var ext = path.parse(fileName).ext;
      var stat = fs.lstatSync(completePath);

      if (stat.isDirectory()) {
        videos.push(...VideoFunctions.findVideoFiles(completePath, existingVideos));
      } else if (fileName.charAt(0) != '.' && filter.test(fileName)) {
        videos.push({ name: name, extension: ext, fileName: fileName, filePath: filePath, completePath: completePath });
      }

    }

    return videos;

  },

  generateScreenshot: (video, fileName, imagesPath = '', count = 1) => {

    imagesPath = path.join(appPath, `../images/${video._id}/${imagesPath}`);

    return new Promise((resolve, reject) => {
      ffmpeg(video.completePath).outputOptions('-qscale:v 2')
        .screenshots({
          count: count,
          size: '240x135',
          folder: imagesPath,
          filename: fileName
        }).on('end', () => {
          let images = [];
          for (let fileName of fs.readdirSync(imagesPath)) {
            images.push(path.join(imagesPath, fileName));
          }
          resolve(images);
        }).on('error', (error) => reject(error));
    });

  },

  getMetadata: (videoFile) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoFile, (err, metadata) => { err? reject(err) : resolve(metadata) });
    });
  }

};

ipcMain.on('videos:open', (event, video) => {
  shell.openItem(video.completePath);
});

module.exports = VideoFunctions;
