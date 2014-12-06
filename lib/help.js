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

var path = require('path'), // Node core lib
  pkg = require('../package.json'); // Project metadata

// Display nengine-cli version
exports.version = function (verbose){
  console.log(
    'nengine-cli '.cyan.bold +
    ('v' + pkg.version).green.bold +
    (verbose ? ' installed in: ' +
    path.dirname(__dirname).magenta.bold : '')
  );
};

// Show help, then exit with a message and error code
exports.fatal = function (msg, code){
  exports.helpHeader();
  console.log('');
  console.log('Fatal error: '.red.bold + msg.yellow.bold);
  console.log('');
  exports.helpFooter();
  process.exit(code);
};

// Show help and exit
exports.help = function (){
  exports.helpHeader();
  console.log('');
  exports.helpFooter();
  process.exit();
};

// Help header
exports.helpHeader = function (){
  console.log(
    'nengine-cli: '.cyan.bold + (pkg.description +
    ' (').bold + ('v' + pkg.version).green.bold + ')'.bold
  );
};

// Help footer
exports.helpFooter = function (){
  console.log([
    'If you\'re seeing this message, nengine hasn\'t been installed',
    'locally to your project. For more information about installing',
    'and configuring nengine, please see the Getting Started guide:',
    '',
    'https://nuintun.github.io/nengine'.magenta.bold.underline
  ].join('\n'));
};
