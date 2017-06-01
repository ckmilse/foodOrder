// TODO(gdi2290): switch to DLLs

// Polyfills

// import 'ie-shim'; // Internet Explorer 9 support


// import 'core-js/es6';
// Added parts of es6 which are necessary for your project or your browser support requirements.
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';
// see issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
// import 'core-js/es6/promise';

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
console.log(ENV);

self['jQuery'] = require('jquery');
self['$'] = self['jQuery'];

// self.jQuery: any = {};
// let $ = require('jquery');
// self.jQuery = $;
// console.log(self.jQuery);
//  self['jQuery']= require('jquery');
// >>>>>>> develop_mainfest
// require('bootstrap'); // wraning,not error,not work
//  require('./../styles/css/bootstrap.css');
// import './assets/lib/bootstrap/css/bootstrap.css';
// import './../assets/lib/bootstrap/js/bootstrap.js'; //not work well
require('./assets/lib/bootstrap/js/bootstrap.js');
require('./assets/lib/adminTheme/js/sb-admin-2.js');
require('./assets/lib/metisMenu/metisMenu.js');
require('./assets/lib/xcConfirm/js/xcConfirm.js');
require('./assets/lib/sweetAlert/js/sweet-alert.js');
require('jquery-mousewheel');
require('./assets/lib/datetimepicker/datetimepicker.min.js');
// import './../assets/lib/sweetAlert/css/sweet-alert.css';
//  require("style-loader!css-loader!./../assets/lib/bootstrap/css/bootstrap.css");
// import 'bootstrap'; //not work
// import 'bootstrap-loader';
// Application wide providers
// require('bootstrap-loader');//error



if ('production' === ENV) {
    // Production
    if (navigator.onLine && window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        window.applicationCache.update();
    }
} else {

    // Development
    Error.stackTraceLimit = Infinity;

    /* tslint:disable no-var-requires */
    require('zone.js/dist/long-stack-trace-zone');

}
