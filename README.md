[![NPM](https://nodei.co/npm/@justinc/dirs.png?downloads=true)](https://nodei.co/npm/@justinc/dirs/)

This package contains:

### dirsSync(absPath: string): string[]

### dirs(absPath: string, cb: (e: Error, dirNames?: string[]) => any, asyncOpsLimit: number): any

`asyncOpsLimit` is optional. It controls the number of asynchronous operations when filtering files from directories (since each op requires reading from filesystem and this read is also done asynchronously). Default value is `ASYNC_OPS_LIMIT`:

```js
var numOfCpus = cpus().length;
const ASYNC_OPS_LIMIT = numOfCpus + Math.floor(numOfCpus / 2);
```

---

If you want to get all directories in more than one path:

```js
var async = require('async');
var dirs = require('@justinc/dirs').dirs;
var _ = require('lodash');

var paths = ['/path/1', '/path/2'];
async.map(paths, dirs, (err, allDirs) => {
  // allDirs[0] are all the directories in paths[0] etc…
  // so you can use something like lodash's zipObject to group
  // the output:
  _.zipObject(paths, allDirs);
  // -> { '/path/1': ['dirA', 'dirB'], '/path/2': ['dirC', 'dirD'] }
});
```
