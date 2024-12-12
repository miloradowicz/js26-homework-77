import { promises as fs } from 'fs';
import { Feedback } from './types';
import path from 'path';
import config from './config';

const filename = path.join(config.dbPath, config.dbFilename);

let data: Feedback[];

const fileDb = {
  async init() {
    try {
      const file = await fs.readFile(filename);
      data = JSON.parse(file.toString());
    } catch (e: any) {
      if ('code' in e && e.code === 'ENOENT') {
        data = [];
      } else {
        throw e;
      }
    }
  },

  getItems() {
    return data;
  },

  async addItem(item: Feedback) {
    data.push(item);
    await this.save();
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  },
};

export default fileDb;
