/**
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license.
 * https://github.com/Nuintun/nengine-cli/blob/master/LICENSE
 */

'use strict';

// External lib.
var nopt = require('nopt'),
    path = require('path');

// CLI options we care about.
exports.known = { help: Boolean, version: Boolean, verbose: Boolean, root: path, configfile: path };
exports.aliases = { h: '--help', V: '--version', v: '--verbose', r: '--root', c: '--configfile' };

// Parse them and return an options object.
Object.defineProperty(exports, 'options', {
    get: function (){
        return nopt(exports.known, exports.aliases, process.argv, 2);
    }
});