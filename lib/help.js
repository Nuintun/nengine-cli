/*!
 * nengine-cli
 * https://nuintun.github.io/nengine-cli
 *
 * Licensed under the MIT license
 * https://github.com/Nuintun/nengine-cli/blob/master/LICENSE
 */

'use strict';

var path = require('path'); // node core lib
var pkg = require('../package.json'); // project metadata
var colors = require('colors/safe'); // color console

// display nengine-cli version
exports.version = function (verbose){
  console.log(
    colors.cyan.bold('nengine-cli ') +
    colors.green.bold('v' + pkg.version) +
    (verbose ? ' installed in: ' + colors.magenta.bold(path.dirname(__dirname)) : '')
  );
};

// show help, then exit with a message and error code
exports.fatal = function (msg, code){
  exports.helpHeader();
  console.log('');
  console.log(colors.red.bold('Fatal error: ') + colors.yellow.bold(msg));
  console.log('');
  exports.helpFooter();
  process.exit(code);
};

// show help and exit
exports.help = function (){
  exports.helpHeader();
  console.log('');
  exports.helpFooter();
  process.exit();
};

// help header
exports.helpHeader = function (){
  console.log(
    colors.cyan.bold('nengine-cli: ')
    + colors.bold(pkg.description + ' (')
    + colors.green.bold('v' + pkg.version)
    + colors.bold(')')
  );
};

// help footer
exports.helpFooter = function (){
  console.log([
    'If you\'re seeing this message, nengine hasn\'t been installed',
    'locally to your project. For more information about installing',
    'and configuring nengine, please see the Getting Started guide:',
    '',
    colors.magenta.bold.underline('https://nuintun.github.io/nengine')
  ].join('\n'));
};
