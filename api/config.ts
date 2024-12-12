import path from 'path';

const rootPath = __dirname;

const config = {
  port: 8000,
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  dbPath: '.',
  dbFilename: 'db.json',
};

export default config;
