const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;

const appPath = app.getAppPath();
const path = require('path');

const sqlite = require('sqlite3');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  storage: path.join(appPath, '../data/database.sqlite')
});

const Video = sequelize.define('video', {
  name: Sequelize.STRING,
  fileName: Sequelize.STRING,
  filePath: Sequelize.STRING,
  extension: Sequelize.STRING,
  completePath: Sequelize.STRING,
  videoLibraryId: Sequelize.STRING,
  cover: Sequelize.STRING,
  duration: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  size: Sequelize.FLOAT,
  rating: Sequelize.INTEGER
});

const Actor = sequelize.define('actor', {
  name: Sequelize.STRING
});

Video.hasMany(Actor, { as: 'actors' });
