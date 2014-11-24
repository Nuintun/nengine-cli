/**
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license.
 * http://github.com/Nuintun/nengine-cli/LICENSE-MIT
 */

'use strict';

// External lib.
var nopt = require('nopt');

// CLI options we care about.
exports.known = { help: Boolean, version: Boolean };
exports.aliases = { h: '--help', v: '--version' };

// Parse them and return an options object.
Object.defineProperty(exports, 'options', {
    get: function (){
        var parsed = nopt(exports.known, exports.aliases, process.argv, 2);

        // clean parsed
        delete parsed.argv;

        return parsed;
    }
});