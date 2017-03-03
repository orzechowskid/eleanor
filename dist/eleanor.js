module.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Router=e.actionType=void 0;var o=n(1),i=function t(e){r(this,t),a.call(this);var n=e.initialRoute,o=e.routes,i=e.startRouting,u=e.store;if(!u||!u.dispatch)throw new Error("Redux store must be provided to router");this.initialRoute=n,this.store=u,o&&(registerRoutes(o),i&&this.startRouting())},a=function(){var t=this;this.onPopstate=function(){var e=window.location.hash.slice(1);e&&(0,o.dispatchAction)(t.routeMaps,e,t.store)},this.registerRoutes=function(e){t.routeMaps=(0,o.buildRouteMaps)(e)},this.setLocation=function(e){window.location.hash=e,(0,o.dispatchAction)(t.routeMaps,e,t.store)},this.startRouting=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.initialRoute,r=void 0===n?null:n,o=e.useLocationHash,i=void 0!==o&&o,a=window.location.hash.slice(1)||null,u=null;console.log("opts:",e),window.addEventListener("popstate",t.onPopstate),u=i&&window.location.hash.length>1?window.location.hash.slice(1):r||t.initialRoute||"/",u!==a&&(console.log("pushing:","#"+u),window.history.pushState(null,null,"#"+u)),console.log("calling onPopstate"),t.onPopstate()},this.stopRouting=function(){window.removeEventListener("popstate",t.onPopstate)}};e.actionType=o.actionType,e.Router=i,e.default=i},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.dispatchAction=e.buildRouteMaps=e.actionType=void 0;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=n(2),u=r(a),s="pageRouter",c=s+"/TRIGGER_ROUTE",p=function(t){return t.map(function(t){var e=[],n=(0,u.default)(t.route,e);return{regexp:n,regexpKeys:e,routeDescription:t}})},l=function(t,e,n){var r=t.find(function(t){return t.regexp.test(e)});if(!r)return!1;var a=r.regexp.exec(e),u={meta:{path:window.location.hash.slice(1),routeParams:r.regexpKeys.reduce(function(t,e,n){return i({},t,o({},e.name,a[1+n]))},{})},payload:r.routeDescription,type:c};return n.dispatch(u),!0};e.actionType=c,e.buildRouteMaps=p,e.dispatchAction=l,e.default={actionType:c,buildRouteMaps:p,dispatchAction:l}},function(t,e,n){"use strict";function r(t,e){for(var n,r=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(n=x.exec(t));){var p=n[0],l=n[1],f=n.index;if(a+=t.slice(i,f),i=f+p.length,l)a+=l[1];else{var d=t[i],h=n[2],g=n[3],v=n[4],y=n[5],w=n[6],m=n[7];a&&(r.push(a),a="");var R=null!=h&&null!=d&&d!==h,b="+"===w||"*"===w,E="?"===w||"*"===w,T=n[2]||u,A=v||y;r.push({name:g||o++,prefix:h||"",delimiter:T,optional:E,repeat:b,partial:R,asterisk:!!m,pattern:A?c(A):m?".*":"[^"+s(T)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function o(t,e){return u(r(t,e))}function i(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function a(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function u(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"===y(t[n])&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var o="",u=n||{},s=r||{},c=s.pretty?i:encodeURIComponent,p=0;p<t.length;p++){var l=t[p];if("string"!=typeof l){var f,d=u[l.name];if(null==d){if(l.optional){l.partial&&(o+=l.prefix);continue}throw new TypeError('Expected "'+l.name+'" to be defined')}if(w(d)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but received `'+JSON.stringify(d)+"`");if(0===d.length){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var h=0;h<d.length;h++){if(f=c(d[h]),!e[p].test(f))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'", but received `'+JSON.stringify(f)+"`");o+=(0===h?l.prefix:l.delimiter)+f}}else{if(f=l.asterisk?a(d):c(d),!e[p].test(f))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but received "'+f+'"');o+=l.prefix+f}}else o+=l}return o}}function s(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function c(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function p(t,e){return t.keys=e,t}function l(t){return t.sensitive?"":"i"}function f(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return p(t,e)}function d(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push(v(t[o],e,n).source);var i=new RegExp("(?:"+r.join("|")+")",l(n));return p(i,e)}function h(t,e,n){return g(r(t,n),e,n)}function g(t,e,n){w(e)||(n=e||n,e=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=s(u);else{var c=s(u.prefix),f="(?:"+u.pattern+")";e.push(u),u.repeat&&(f+="(?:"+c+f+")*"),f=u.optional?u.partial?c+"("+f+")?":"(?:"+c+"("+f+"))?":c+"("+f+")",i+=f}}var d=s(n.delimiter||"/"),h=i.slice(-d.length)===d;return r||(i=(h?i.slice(0,-d.length):i)+"(?:"+d+"(?=$))?"),i+=o?"$":r&&h?"":"(?="+d+"|$)",p(new RegExp("^"+i,l(n)),e)}function v(t,e,n){return w(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?f(t,e):w(t)?d(t,e,n):h(t,e,n)}var y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w=n(3);t.exports=v,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=u,t.exports.tokensToRegExp=g;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},function(t,e){"use strict";t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}}]);