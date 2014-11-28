/**
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license
 * https://github.com/Nuintun/nengine-cli/blob/master/LICENSE
 */

'use strict';

// Import internal libs
var fs = require('fs'),
    path = require('path');

/**
 * Normalize path
 * @param path
 * @returns {string}
 */
function normalize(path){
    var sepRE = /\\/g;

    // Replace \ to /
    return path.replace(sepRE, '/');
}

/**
 * Search module in path
 * @param moudule
 * @param root
 * @returns {*}
 */
function search(moudule, root){
    var pkg, main = null;

    // Read package.json
    try {
        pkg = require(path.join(root, 'package.json'));

        // Find moudule package.json
        if (pkg.name === moudule) {
            main = path.join(root, pkg.main || 'index');

            // Is module exists, test main + '.js' first, because most modules without extension name
            if (fs.existsSync(main + '.js') || fs.existsSync(main)) {
                return normalize(main);
            }
        }
    } catch (e) {
        // Failed to parse package.json
        return main;
    }

    // Return module path
    return main;
}

/**
 * Recurse directory
 * @param moudule
 * @param root
 * @param subdir
 * @returns {*}
 */
function recurse(moudule, root, subdir){
    var i, stat, fspath, fsname,
        main = search(moudule, root);

    // Found module
    if (main !== null) {
        return main;
    }

    // Set root to subdir directory
    root = path.join(root, subdir);

    // if root exists recurse root
    if (fs.existsSync(root)) {
        // Search module in subdirs
        main = search(moudule, root);

        // Found module
        if (main !== null) {
            return main;
        }

        // Get directory files
        fsname = fs.readdirSync(root);
        i = fsname.length - 1;

        // Recurse sub directory
        for (; i >= 0; i--) {
            // Get full path
            fspath = path.join(root, fsname[i]);

            // Get file or directory stat
            try {
                stat = fs.statSync(fspath);
            } catch (e) {
                // Get stat failed
                continue;
            }

            // Only directory do recurse
            if (stat.isDirectory()) {
                // Recurse sub directory
                main = resolve(moudule, fspath);

                // Found module
                if (main !== null) {
                    return main;
                }
            }
        }
    }

    // Return module path
    return main;
}

/**
 * Resolve moudule
 * @param moudule
 * @param root
 * @returns {*}
 */
function resolve(moudule, root){
    // Root net exists return null
    if (!fs.existsSync(root)) return null;

    // Recurse sub directory
    return recurse(moudule, root, 'node_modules');
}

// Exports resolve
module.exports = resolve;
