/**
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license
 * https://github.com/Nuintun/nengine-cli/blob/master/LICENSE
 */

'use strict';

// Color console
require('colors');

// Project metadata
var pkg = require('../package.json');

// Display nengine-cli version
exports.version = function (){
    console.log('nengine-cli '.cyan.bold + ('v' + pkg.version).green.bold);
};

// Show help, then exit with a message and error code
exports.fatal = function (msg, code){
    exports.helpHeader();
    console.log('Fatal error: '.red.bold + msg.yellow.bold);
    exports.helpFooter();
    process.exit(code);
};

// Show help and exit
exports.help = function (){
    exports.helpHeader();
    exports.helpFooter();
    process.exit();
};

// Help header
exports.helpHeader = function (){
    console.log('nengine-cli: '.cyan.bold + (pkg.description + ' (').bold + ('v' + pkg.version).green.bold + ')'.bold);
    console.log('');
};

// Help footer
exports.helpFooter = function (){
    [
        '',
        'If you\'re seeing this message, nengine hasn\'t been installed',
        'locally to your project. For more information about installing',
        'and configuring nengine, please see the Getting Started guide:',
        '',
        'https://nuintun.github.io/nengine'.magenta.bold
    ].forEach(function (str){ console.log(str); });
};
