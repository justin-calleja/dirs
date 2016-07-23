import * as fs from 'fs';
import { join } from 'path';
import { filterLimit } from 'async';
import { cpus } from 'os';

var numOfCpus = cpus().length;
const ASYNC_OPS_LIMIT = numOfCpus + Math.floor(numOfCpus / 2);

export function dirsSync(absPath: string): string[] {
  var fileNames = [];
  try {
    fileNames = fs.readdirSync(absPath);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  // if fileNames was read successfully, it contains valid fileNames which exist on the filesystem
  // if it's empty, no problem
  var filtered: string[] = fileNames.filter((fileName) => fs.statSync(join(absPath, fileName)).isDirectory());
  return filtered;
}

export function dirs(absPath: string, cb: (err: Error, dirNames?: string[]) => any, asyncOpsLimit: number = ASYNC_OPS_LIMIT): any {
  fs.readdir(absPath, (err, files: string[]) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // if path doesn't exist, it's not an error, just return []
        return cb(null, []);
      }
      return cb(err);
    }
    filterLimit(files, asyncOpsLimit, function truthTest(file: string, truthTestCb: (err, truthValue?: boolean) => void): void {
      fs.stat(join(absPath, file), (statErr, stats: fs.Stats) => {
        if (statErr) {
          return truthTestCb(statErr);
        }
        truthTestCb(null, stats.isDirectory());
      });
    }, function filteringDoneCb(filteringError, dirNames: string[]) {
      if (filteringError) {
        return cb(filteringError);
      }
      return cb(null, dirNames);
    });
  });
}
