var assert = require('chai').assert;
var path = require('path');
var dirs = require('../lib').dirs;
var dirsSync = require('../lib').dirsSync;

var fixturesPath = path.join(__dirname, 'fixtures');

describe('readers', function() {

  describe('dirs', function() {
    it('does not throw exception when given directories that do not exist', function (cb) {
      dirs(path.join(fixturesPath, 'doesnotexist'), (err, result) => {
        assert.isArray(result, 'expecting result to be an array');
        assert.equal(result.length, 0, 'expecting empty array');
        cb();
      });
    });

    it('reads directory names in given path', function (cb) {
      dirs(path.join(fixturesPath, 'dir1'), (err, result) => {
        assert.isArray(result, 'expecting result to be an array');
        assert.equal(result.length, 5, 'expecting 5 items in array');
        assert.equal(result.filter(el => el === 'a')[0], 'a', 'expecting to find \'a\' in result');
        assert.equal(result.filter(el => el === 'c')[0], 'c', 'expecting to find \'c\' in result');
        assert.equal(result.filter(el => el === 'e')[0], 'e', 'expecting to find \'e\' in result');
        assert.equal(result.filter(el => el === 'g')[0], 'g', 'expecting to find \'g\' in result');
        assert.equal(result.filter(el => el === 'meh')[0], 'meh', 'expecting to find \'meh\' in result');
        cb();
      });
    });
  });

  describe('dirsSync', function() {
    it('does not throw exception when given directories that do not exist', function () {
      var result = dirsSync(path.join(fixturesPath, 'doesnotexist'));
      assert.isArray(result, 'expecting result to be an array');
      assert.equal(result.length, 0, 'expecting empty array');
    });

    it('reads directory names in given path', function () {
      var result = dirsSync(path.join(fixturesPath, 'dir1'));
      assert.isArray(result, 'expecting result to be an array');
      assert.equal(result.length, 5, 'expecting 5 items in array');
      assert.equal(result.filter(el => el === 'a')[0], 'a', 'expecting to find \'a\' in result');
      assert.equal(result.filter(el => el === 'c')[0], 'c', 'expecting to find \'c\' in result');
      assert.equal(result.filter(el => el === 'e')[0], 'e', 'expecting to find \'e\' in result');
      assert.equal(result.filter(el => el === 'g')[0], 'g', 'expecting to find \'g\' in result');
      assert.equal(result.filter(el => el === 'meh')[0], 'meh', 'expecting to find \'meh\' in result');
    });
  });

});
