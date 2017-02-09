/*!
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license
 * https://github.com/Nuintun/nengine-cli/blob/master/LICENSE
 */

'use strict';

// import internal libs
var fs = require('fs');
var path = require('path');

/**
 * search module in path
 * @param moudule
 * @param root
 * @returns {*}
 */
function search(moudule, root) {
  var pkg, main = null;

  // read package.json
  try {
    pkg = require(path.join(root, 'package.json'));

    // find moudule package.json
    if (pkg.name === moudule) {
      main = path.join(root, pkg.main || 'index');

      // is module exists, test main + '.js' first, because most modules without extension name
      if (fs.existsSync(main + '.js') || fs.existsSync(main)) {
        return main;
      }
    }
  } catch (e) {
    // failed to parse package.json
    return main;
  }

  // return module path
  return main;
}

/**
 * recurse directory
 * @param moudule
 * @param root
 * @param subdir
 * @returns {*}
 */
function recurse(moudule, root, subdir) {
  var i, stat, fspath, fsname;
  var main = search(moudule, root);

  // found module
  if (main !== null) {
    return main;
  }

  // set root to subdir directory
  root = path.join(root, subdir);

  // if root exists recurse root
  if (fs.existsSync(root)) {
    // search module in subdirs
    main = search(moudule, root);

    // found module
    if (main !== null) {
      return main;
    }

    // get directory files
    fsname = fs.readdirSync(root);
    i = fsname.length - 1;

    // recurse sub directory
    for (; i >= 0; i--) {
      // get full path
      fspath = path.join(root, fsname[i]);

      // get file or directory stat
      try {
        stat = fs.statSync(fspath);
      } catch (e) {
        // get stat failed
        continue;
      }

      // only directory do recurse
      if (stat.isDirectory()) {
        // recurse sub directory
        main = resolve(moudule, fspath);

        // found module
        if (main !== null) {
          return main;
        }
      }
    }
  }

  // return module path
  return main;
}

/**
 * resolve moudule
 * @param moudule
 * @param root
 * @returns {*}
 */
function resolve(moudule, root) {
  // root net exists return null
  if (!fs.existsSync(root)) return null;

  // recurse sub directory
  return recurse(moudule, root, 'node_modules');
}

// exports resolve
module.exports = resolve;
