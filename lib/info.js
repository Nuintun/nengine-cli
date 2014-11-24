/**
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license.
 * http://github.com/Nuintun/nengine-cli/LICENSE-MIT
 */

'use strict';

// Project metadata.
var pkg = require('../package.json');

// Display nengine-cli version.
exports.version = function (){
    console.log('nengine-cli v' + pkg.version);
};

// Show help, then exit with a message and error code.
exports.fatal = function (msg, code){
    exports.helpHeader();
    console.log('Fatal error: ' + msg);
    console.log('');
    exports.helpFooter();
    process.exit(code);
};

// Show help and exit.
exports.help = function (){
    exports.helpHeader();
    console.log('Usage: npm <command>');
    exports.helpFooter();
    process.exit();
};

// Help header.
exports.helpHeader = function (){
    console.log('nengine-cli: ' + pkg.description + ' (v' + pkg.version + ')');
    console.log('');
};

// Help footer.
exports.helpFooter = function (){
    [
        'If you\'re seeing this message, nengine hasn\'t been installed',
        'locally to your project. For more information about installing',
        'and configuring nengine, please see the Getting Started guide:',
        '',
        'https://nuintun.github.io/nengine'
    ].forEach(function (str){ console.log(str); });
};

function stuout(){

}