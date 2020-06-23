var fxcm = fxcm || {};
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());


/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());

/*!
 * Amplify Core 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
(function(e,t){var n=[].slice,r={},i=e.amplify={publish:function(e){if(typeof e!="string")throw new Error("You must provide a valid topic to publish.");var t=n.call(arguments,1),i,s,o,u=0,a;if(!r[e])return!0;i=r[e].slice();for(o=i.length;u<o;u++){s=i[u],a=s.callback.apply(s.context,t);if(a===!1)break}return a!==!1},subscribe:function(e,t,n,i){if(typeof e!="string")throw new Error("You must provide a valid topic to create a subscription.");arguments.length===3&&typeof n=="number"&&(i=n,n=t,t=null),arguments.length===2&&(n=t,t=null),i=i||10;var s=0,o=e.split(/\s/),u=o.length,a;for(;s<u;s++){e=o[s],a=!1,r[e]||(r[e]=[]);var f=r[e].length-1,l={callback:n,context:t,priority:i};for(;f>=0;f--)if(r[e][f].priority<=i){r[e].splice(f+1,0,l),a=!0;break}a||r[e].unshift(l)}return n},unsubscribe:function(e,t,n){if(typeof e!="string")throw new Error("You must provide a valid topic to remove a subscription.");arguments.length===2&&(n=t,t=null);if(!r[e])return;var i=r[e].length,s=0;for(;s<i;s++)r[e][s].callback===n&&(!t||r[e][s].context===t)&&(r[e].splice(s,1),s--,i--)}}})(this)
/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
//! moment.js
//! version : 2.17.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return od.apply(null,arguments)}
// This is done to register the method called with moment()
// without creating circular dependencies.
    function b(a){od=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){
// IE8 will treat undefined and null as object if it wasn't for
// input != null
        return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)
// even if its not own property I'd still call it non-empty
        return!1;return!0}function f(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function g(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function h(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function i(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function j(a,b){for(var c in b)i(b,c)&&(a[c]=b[c]);return i(b,"toString")&&(a.toString=b.toString),i(b,"valueOf")&&(a.valueOf=b.valueOf),a}function k(a,b,c,d){return rb(a,b,c,d,!0).utc()}function l(){
// We need to deep clone this object.
        return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function m(a){return null==a._pf&&(a._pf=l()),a._pf}function n(a){if(null==a._isValid){var b=m(a),c=qd.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d}return a._isValid}function o(a){var b=k(NaN);return null!=a?j(m(b),a):m(b).userInvalidated=!0,b}function p(a){return void 0===a}function q(a,b){var c,d,e;if(p(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),p(b._i)||(a._i=b._i),p(b._f)||(a._f=b._f),p(b._l)||(a._l=b._l),p(b._strict)||(a._strict=b._strict),p(b._tzm)||(a._tzm=b._tzm),p(b._isUTC)||(a._isUTC=b._isUTC),p(b._offset)||(a._offset=b._offset),p(b._pf)||(a._pf=m(b)),p(b._locale)||(a._locale=b._locale),rd.length>0)for(c in rd)d=rd[c],e=b[d],p(e)||(a[d]=e);return a}
// Moment prototype object
    function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),
// Prevent infinite loop in case updateOffset creates new moment
// objects.
    sd===!1&&(sd=!0,a.updateOffset(this),sd=!1)}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}
// compare two arrays, return the number of differences
    function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function x(b,c){var d=!0;return j(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2)}else e=arguments[g];f.push(e)}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),td[b]||(w(c),td[b]=!0)}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,
// Lenient ordinal parsing accepts just a number in addition to
// number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function B(a,b){var c,e=j({},a);for(c in b)i(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},j(e[c],a[c]),j(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)i(a,c)&&!i(b,c)&&d(a[c])&&(
// make sure changes to properties don't modify parent config
        e[c]=j({},e[c]));return e}function C(a){null!=a&&this.set(a)}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Dd[c]=Dd[c+"s"]=Dd[b]=a}function K(a){return"string"==typeof a?Dd[a]||Dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)i(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){Ed[a]=b}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:Ed[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}
// MOMENTS
    function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit])}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}
// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
    function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Id[a]=e),b&&(Id[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Id[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Fd);for(b=0,c=d.length;b<c;b++)Id[d[b]]?d[b]=Id[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}
// format date using native date object
    function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Hd[b]=Hd[b]||W(b),Hd[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Gd.lastIndex=0;d>=0&&Gd.test(a);)a=a.replace(Gd,c),Gd.lastIndex=0,d-=1;return a}function Z(a,b,c){$d[a]=z(b)?b:function(a,d){return a&&c?c:b}}function $(a,b){return i($d,a)?$d[a](b._strict,b._locale):new RegExp(_(a))}
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),f(b)&&(d=function(a,c){c[b]=u(a)}),c=0;c<a.length;c++)_d[a[c]]=d}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function da(a,b,c){null!=b&&i(_d,a)&&_d[a](b,c._a,c,a)}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||ke).test(b)?"format":"standalone"][a.month()]:this._months}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[ke.test(b)?"format":"standalone"][a.month()]:this._monthsShort}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(
// this is not used
        this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=k([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:null):(e=je.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=je.call(this._shortMonthsParse,g),e!==-1?e:(e=je.call(this._longMonthsParse,g),e!==-1?e:null)):(e=je.call(this._longMonthsParse,g),e!==-1?e:(e=je.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);
// TODO: add sorting
// Sorting makes sure if one month (or abbr) is a prefix of another
// see sorting in computeMonthsParse
        for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){
// test the regex
            if(
// make the regex if we don't have it already
                e=k([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}
// MOMENTS
    function ja(a,b){var c;if(!a.isValid())
// No op
        return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else
// TODO: Another silent failure?
    if(b=a.localeData().monthsParse(b),!f(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(i(this,"_monthsShortRegex")||(this._monthsShortRegex=ne),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(i(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(i(this,"_monthsRegex")||(this._monthsRegex=oe),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)
// make the regex if we don't have it already
        c=k([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(
// Sorting makes sure if one month (or abbr) is a prefix of another it
// will match the longer piece.
        d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}
// HELPERS
    function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){
//can't just apply() to create a date:
//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var h=new Date(a,b,c,d,e,f,g);
//the date constructor remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));
//the Date.UTC function remaps years 0-99 to 1900-1999
        return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}
// start-of-first-week - start-of-year
    function ua(a,b,c){var// first-week day -- which january is always in the first week (4 for iso, 1 for other)
        d=7+b-c,
// first-week day local weekday -- which local weekday is fwd
        e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}
// HELPERS
// LOCALES
    function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}
// MOMENTS
    function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}
// HELPERS
    function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:this._weekdays}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=k([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=je.call(this._minWeekdaysParse,g),e!==-1?e:(e=je.call(this._weekdaysParse,g),e!==-1?e:(e=je.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){
// test the regex
        if(
// make the regex if we don't have it already
            e=k([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}
// MOMENTS
    function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;
// behaves the same as moment#day except
// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
// as a setter, sunday should belong to the previous week.
        if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(i(this,"_weekdaysRegex")||(this._weekdaysRegex=ue),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(i(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ve),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(i(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(i(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=we),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)
// make the regex if we don't have it already
        c=k([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(
// Sorting makes sure if one weekday (or abbr) is a prefix of another it
// will match the longer piece.
        g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}
// FORMATTING
    function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}
// PARSING
    function Ua(a,b){return b._meridiemParse}
// LOCALES
    function Va(a){
// IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
// Using charAt should be more compatible.
        return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)
//the next array item is better than a shallower substring of this one
        break;b--}f++}return null}function Za(a){var b=null;
// TODO: Find a better way to register and load all the locales in Node
        if(!Be[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=xe._abbr,require("./locale/"+a),
// because defineLocale currently also sets the global locale, we
// want to undo that for lazy loaded locales
            $a(b)}catch(a){}return Be[a]}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
    function $a(a,b){var c;
// moment.duration._locale = moment._locale = data;
        return a&&(c=p(b)?bb(a):_a(a,b),c&&(xe=c)),xe._abbr}function _a(a,b){if(null!==b){var c=Ae;if(b.abbr=a,null!=Be[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Be[a]._config;else if(null!=b.parentLocale){if(null==Be[b.parentLocale])return Ce[b.parentLocale]||(Ce[b.parentLocale]=[]),Ce[b.parentLocale].push({name:a,config:b}),null;c=Be[b.parentLocale]._config}
// backwards compat for now: also set the locale
// make sure we set the locale AFTER all child locales have been
// created, so we won't end up with the child locale set.
        return Be[a]=new C(B(c,b)),Ce[a]&&Ce[a].forEach(function(a){_a(a.name,a.config)}),$a(a),Be[a]}
// useful for testing
        return delete Be[a],null}function ab(a,b){if(null!=b){var c,d=Ae;
// MERGE
        null!=Be[a]&&(d=Be[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Be[a],Be[a]=c,
// backwards compat for now: also set the locale
            $a(a)}else
// pass null for config to unupdate, useful for tests
        null!=Be[a]&&(null!=Be[a].parentLocale?Be[a]=Be[a].parentLocale:null!=Be[a]&&delete Be[a]);return Be[a]}
// returns locale data
    function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return xe;if(!c(a)){if(
//short-circuit everything else
        b=Za(a))return b;a=[a]}return Ya(a)}function cb(){return wd(Be)}function db(a){var b,c=a._a;return c&&m(a).overflow===-2&&(b=c[be]<0||c[be]>11?be:c[ce]<1||c[ce]>ea(c[ae],c[be])?ce:c[de]<0||c[de]>24||24===c[de]&&(0!==c[ee]||0!==c[fe]||0!==c[ge])?de:c[ee]<0||c[ee]>59?ee:c[fe]<0||c[fe]>59?fe:c[ge]<0||c[ge]>999?ge:-1,m(a)._overflowDayOfYear&&(b<ae||b>ce)&&(b=ce),m(a)._overflowWeeks&&b===-1&&(b=he),m(a)._overflowWeekday&&b===-1&&(b=ie),m(a).overflow=b),a}
// date from iso format
    function eb(a){var b,c,d,e,f,g,h=a._i,i=De.exec(h)||Ee.exec(h);if(i){for(m(a).iso=!0,b=0,c=Ge.length;b<c;b++)if(Ge[b][1].exec(i[1])){e=Ge[b][0],d=Ge[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=He.length;b<c;b++)if(He[b][1].exec(i[3])){
// match[2] should be 'T' or space
        f=(i[2]||" ")+He[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Fe.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),kb(a)}else a._isValid=!1}
// date from iso format or fallback
    function fb(b){var c=Ie.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}
// Pick the first defined of two or three arguments.
    function gb(a,b,c){return null!=a?a:null!=b?b:c}function hb(b){
// hooks is actually the exported moment object
        var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
    function ib(a){var b,c,d,e,f=[];if(!a._d){
// Default to current date.
// * if no year, month, day of month are given, default to today
// * if day of month is given, default month and year
// * if month is given, default only year
// * if year is given, don't default anything
        for(d=hb(a),
//compute day of the year from weeks and weekdays
            a._w&&null==a._a[ce]&&null==a._a[be]&&jb(a),
//if the day of the year is set, figure out what it is
            a._dayOfYear&&(e=gb(a._a[ae],d[ae]),a._dayOfYear>pa(e)&&(m(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[be]=c.getUTCMonth(),a._a[ce]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];
// Zero out whatever was not defaulted, including time
        for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];
// Check for 24:00:00.000
        24===a._a[de]&&0===a._a[ee]&&0===a._a[fe]&&0===a._a[ge]&&(a._nextDay=!0,a._a[de]=0),a._d=(a._useUTC?ta:sa).apply(null,f),
// Apply timezone offset from input. The actual utcOffset can be changed
// with parseZone.
        null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[de]=24)}}function jb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,
// TODO: We need to take the current isoWeekYear, but that depends on
// how we interpret now (local, utc, fixed offset). So create
// a now version of current config (take local/utc/offset flags, and
// create now).
        c=gb(b.GG,a._a[ae],wa(sb(),1,4).year),d=gb(b.W,1),e=gb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(sb(),f,g);c=gb(b.gg,a._a[ae],j.year),
// Default to current week.
        d=gb(b.w,j.week),null!=b.d?(
// weekday -- low day numbers are considered next week
        e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(
// local weekday -- counting starts from begining of week
        e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):
// default to begining of week
        e=f}d<1||d>xa(c,f,g)?m(a)._overflowWeeks=!0:null!=i?m(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[ae]=h.year,a._dayOfYear=h.dayOfYear)}
// date from string and format string
    function kb(b){
// TODO: Move this to another part of the creation flow to prevent circular deps
        if(b._f===a.ISO_8601)return void eb(b);b._a=[],m(b).empty=!0;
// This array is used to make a Date, either with `new Date` or `Date.UTC`
        var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Fd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],
// console.log('token', token, 'parsedInput', parsedInput,
//         'regex', getParseRegexForToken(token, config));
        d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&m(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),
// don't parse if it's not a known token
            Id[f]?(d?m(b).empty=!1:m(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&m(b).unusedTokens.push(f);
// add remaining unparsed input length to the string
        m(b).charsLeftOver=i-j,h.length>0&&m(b).unusedInput.push(h),
// clear _12h flag if hour is <= 12
        b._a[de]<=12&&m(b).bigHour===!0&&b._a[de]>0&&(m(b).bigHour=void 0),m(b).parsedDateParts=b._a.slice(0),m(b).meridiem=b._meridiem,
// handle meridiem
            b._a[de]=lb(b._locale,b._a[de],b._meridiem),ib(b),db(b)}function lb(a,b,c){var d;
// Fallback
        return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}
// date from string and array of format strings
    function mb(a){var b,c,d,e,f;if(0===a._f.length)return m(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],kb(b),n(b)&&(
// if there is any input that was not parsed add a penalty for that format
        f+=m(b).charsLeftOver,
//or tokens
        f+=10*m(b).unusedTokens.length,m(b).score=f,(null==d||f<d)&&(d=f,c=b));j(a,c||b)}function nb(a){if(!a._d){var b=L(a._i);a._a=h([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ib(a)}}function ob(a){var b=new r(db(pb(a)));
// Adding is smart enough around DST
        return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function pb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?o({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(g(b)?a._d=b:c(d)?mb(a):d?kb(a):qb(a),n(a)||(a._d=null),a))}function qb(b){var d=b._i;void 0===d?b._d=new Date(a.now()):g(d)?b._d=new Date(d.valueOf()):"string"==typeof d?fb(b):c(d)?(b._a=h(d.slice(0),function(a){return parseInt(a,10)}),ib(b)):"object"==typeof d?nb(b):f(d)?
// from milliseconds
        b._d=new Date(d):a.createFromInputFallback(b)}function rb(a,b,f,g,h){var i={};
// object construction must be done this way.
// https://github.com/moment/moment/issues/1423
        return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,ob(i)}function sb(a,b,c,d){return rb(a,b,c,d,!1)}
// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
    function tb(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return sb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}
// TODO: Use [].sort instead?
    function ub(){var a=[].slice.call(arguments,0);return tb("isBefore",a)}function vb(){var a=[].slice.call(arguments,0);return tb("isAfter",a)}function wb(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;
// representation for dateAddRemove
        this._milliseconds=+k+1e3*j+// 1000
            6e4*i+// 1000 * 60
            1e3*h*60*60,//using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
// Because of dateAddRemove treats 24 hours as different from a
// day when working around DST, we need to store them separately
            this._days=+g+7*f,
// It is impossible translate months into days without knowing
// which months you are are talking about, so we have to store
// it separately.
            this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble()}function xb(a){return a instanceof wb}function yb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}
// FORMATTING
    function zb(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)})}function Ab(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Me)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}
// Return a moment from input, that is local/utc/zone equivalent to model.
    function Bb(b,c){var d,e;
// Use low-level api, because this fn is low-level api.
        return c._isUTC?(d=c.clone(),e=(s(b)||g(b)?b.valueOf():sb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):sb(b).local()}function Cb(a){
// On Firefox.24 Date#getTimezoneOffset returns a floating point.
// https://github.com/moment/moment/pull/1871
        return 15*-Math.round(a._d.getTimezoneOffset()/15)}
// MOMENTS
// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
    function Db(b,c){var d,e=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Ab(Xd,b),null===b)return this}else Math.abs(b)<16&&(b=60*b);return!this._isUTC&&c&&(d=Cb(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?Tb(this,Ob(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?e:Cb(this)}function Eb(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Fb(a){return this.utcOffset(0,a)}function Gb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Cb(this),"m")),this}function Hb(){if(null!=this._tzm)this.utcOffset(this._tzm);else if("string"==typeof this._i){var a=Ab(Wd,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0)}return this}function Ib(a){return!!this.isValid()&&(a=a?sb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Jb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Kb(){if(!p(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=pb(a),a._a){var b=a._isUTC?k(a._a):sb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Lb(){return!!this.isValid()&&!this._isUTC}function Mb(){return!!this.isValid()&&this._isUTC}function Nb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Ob(a,b){var c,d,e,g=a,
// matching against regexp is expensive, do it on demand
        h=null;// checks for null or undefined
        return xb(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:f(a)?(g={},b?g[b]=a:g.milliseconds=a):(h=Ne.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:u(h[ce])*c,h:u(h[de])*c,m:u(h[ee])*c,s:u(h[fe])*c,ms:u(yb(1e3*h[ge]))*c}):(h=Oe.exec(a))?(c="-"===h[1]?-1:1,g={y:Pb(h[2],c),M:Pb(h[3],c),w:Pb(h[4],c),d:Pb(h[5],c),h:Pb(h[6],c),m:Pb(h[7],c),s:Pb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Rb(sb(g.from),sb(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new wb(g),xb(a)&&i(a,"_locale")&&(d._locale=a._locale),d}function Pb(a,b){
// We'd normally use ~~inp for this, but unfortunately it also
// converts floats to ints.
// inp may be undefined, so careful calling replace on it.
        var c=a&&parseFloat(a.replace(",","."));
// apply sign while we're at it
        return(isNaN(c)?0:c)*b}function Qb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Rb(a,b){var c;return a.isValid()&&b.isValid()?(b=Bb(b,a),a.isBefore(b)?c=Qb(a,b):(c=Qb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}
// TODO: remove 'name' arg after deprecation is removed
    function Sb(a,b){return function(c,d){var e,f;
//invert the arguments, but complain about it
        return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Ob(c,d),Tb(this,e,a),this}}function Tb(b,c,d,e){var f=c._milliseconds,g=yb(c._days),h=yb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function Ub(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Vb(b,c){
// We want to compare the start of today, vs this.
// Getting start-of-today depends on whether we're local/utc/offset or not.
        var d=b||sb(),e=Bb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,sb(d)))}function Wb(){return new r(this)}function Xb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function Yb(a,b){var c=s(a)?a:sb(a);return!(!this.isValid()||!c.isValid())&&(b=K(p(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function Zb(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function $b(a,b){var c,d=s(a)?a:sb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function _b(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ac(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function bc(a,b,c){var d,e,f,g;// 1000
// 1000 * 60
// 1000 * 60 * 60
// 1000 * 60 * 60 * 24, negate dst
// 1000 * 60 * 60 * 24 * 7, negate dst
        return this.isValid()?(d=Bb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=cc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function cc(a,b){
// difference in months
        var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),
// b is in (anchor - 1 month, anchor + 1 month)
            f=a.clone().add(e,"months");
//check for negative zero, return zero if negative zero
// linear across the month
// linear across the month
        return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function dc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ec(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}/**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function fc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function gc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function hc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ic(a){return this.from(sb(),a)}function jc(a,b){return this.isValid()&&(s(a)&&a.isValid()||sb(a).isValid())?Ob({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function kc(a){return this.to(sb(),a)}
// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
    function lc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function mc(){return this._locale}function nc(a){
// the following switch intentionally omits break keywords
// to utilize falling through the cases.
        switch(a=K(a)){case"year":this.month(0);/* falls through */
            case"quarter":case"month":this.date(1);/* falls through */
            case"week":case"isoWeek":case"day":case"date":this.hours(0);/* falls through */
            case"hour":this.minutes(0);/* falls through */
            case"minute":this.seconds(0);/* falls through */
            case"second":this.milliseconds(0)}
// weeks are a special case
// quarters are also special
        return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function oc(a){
// 'date' is an alias for 'day', so it should be considered as such.
        return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function pc(){return this._d.valueOf()-6e4*(this._offset||0)}function qc(){return Math.floor(this.valueOf()/1e3)}function rc(){return new Date(this.valueOf())}function sc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function tc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function uc(){
// new Date(NaN).toJSON() === null
        return this.isValid()?this.toISOString():null}function vc(){return n(this)}function wc(){return j({},m(this))}function xc(){return m(this).overflow}function yc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function zc(a,b){U(0,[a,a.length],0,b)}
// MOMENTS
    function Ac(a){return Ec.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Bc(a){return Ec.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Cc(){return xa(this.year(),1,4)}function Dc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ec(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Fc.call(this,a,b,c,d,e))}function Fc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}
// MOMENTS
    function Gc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}
// HELPERS
// MOMENTS
    function Hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Ic(a,b){b[ge]=u(1e3*("0."+a))}
// MOMENTS
    function Jc(){return this._isUTC?"UTC":""}function Kc(){return this._isUTC?"Coordinated Universal Time":""}function Lc(a){return sb(1e3*a)}function Mc(){return sb.apply(null,arguments).parseZone()}function Nc(a){return a}function Oc(a,b,c,d){var e=bb(),f=k().set(d,b);return e[c](f,a)}function Pc(a,b,c){if(f(a)&&(b=a,a=void 0),a=a||"",null!=b)return Oc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Oc(a,d,c,"month");return e}
// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
    function Qc(a,b,c,d){"boolean"==typeof a?(f(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,f(b)&&(c=b,b=void 0),b=b||"");var e=bb(),g=a?e._week.dow:0;if(null!=c)return Oc(b,(c+g)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Oc(b,(h+g)%7,d,"day");return i}function Rc(a,b){return Pc(a,b,"months")}function Sc(a,b){return Pc(a,b,"monthsShort")}function Tc(a,b,c){return Qc(a,b,c,"weekdays")}function Uc(a,b,c){return Qc(a,b,c,"weekdaysShort")}function Vc(a,b,c){return Qc(a,b,c,"weekdaysMin")}function Wc(){var a=this._data;return this._milliseconds=Ze(this._milliseconds),this._days=Ze(this._days),this._months=Ze(this._months),a.milliseconds=Ze(a.milliseconds),a.seconds=Ze(a.seconds),a.minutes=Ze(a.minutes),a.hours=Ze(a.hours),a.months=Ze(a.months),a.years=Ze(a.years),this}function Xc(a,b,c,d){var e=Ob(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}
// supports only 2.0-style add(1, 's') or add(duration)
    function Yc(a,b){return Xc(this,a,b,1)}
// supports only 2.0-style subtract(1, 's') or subtract(duration)
    function Zc(a,b){return Xc(this,a,b,-1)}function $c(a){return a<0?Math.floor(a):Math.ceil(a)}function _c(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;
// if we have a mix of positive and negative values, bubble down first
// check: https://github.com/moment/moment/issues/2166
// The following code bubbles up values, see the tests for
// examples of what that means.
// convert days to months
// 12 months -> 1 year
        return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*$c(bd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ad(g)),h+=e,g-=$c(bd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ad(a){
// 400 years have 146097 days (taking into account leap year rules)
// 400 years have 12 months === 4800
        return 4800*a/146097}function bd(a){
// the reverse of daysToMonths
        return 146097*a/4800}function cd(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ad(b),"month"===a?c:c/12;switch(
// handle milliseconds separately because of floating point math errors (issue #1867)
        b=this._days+Math.round(bd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;
// Math.floor prevents floating point math errors here
        case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}
// TODO: Use this.as('ms')?
    function dd(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12)}function ed(a){return function(){return this.as(a)}}function fd(a){return a=K(a),this[a+"s"]()}function gd(a){return function(){return this._data[a]}}function hd(){return t(this.days()/7)}
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function id(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function jd(a,b,c){var d=Ob(a).abs(),e=of(d.as("s")),f=of(d.as("m")),g=of(d.as("h")),h=of(d.as("d")),i=of(d.as("M")),j=of(d.as("y")),k=e<pf.s&&["s",e]||f<=1&&["m"]||f<pf.m&&["mm",f]||g<=1&&["h"]||g<pf.h&&["hh",g]||h<=1&&["d"]||h<pf.d&&["dd",h]||i<=1&&["M"]||i<pf.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,id.apply(null,k)}
// This function allows you to set the rounding function for relative time strings
    function kd(a){return void 0===a?of:"function"==typeof a&&(of=a,!0)}
// This function allows you to set a threshold for relative time strings
    function ld(a,b){return void 0!==pf[a]&&(void 0===b?pf[a]:(pf[a]=b,!0))}function md(a){var b=this.localeData(),c=jd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function nd(){
// for ISO strings we do not use the normal bubbling rules:
//  * milliseconds bubble up until they become hours
//  * days do not bubble at all
//  * months bubble up until they become years
// This is because there is no context-free conversion between hours and days
// (think of clock changes)
// and also not between days and months (28-31 days per month)
        var a,b,c,d=qf(this._milliseconds)/1e3,e=qf(this._days),f=qf(this._months);
// 3600 seconds -> 60 minutes -> 1 hour
        a=t(d/60),b=t(a/60),d%=60,a%=60,
// 12 months -> 1 year
            c=t(f/12),f%=12;
// inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var od,pd;pd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var qd=pd,rd=a.momentProperties=[],sd=!1,td={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var ud;ud=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)i(a,b)&&c.push(b);return c};var vd,wd=ud,xd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},yd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},zd="Invalid date",Ad="%d",Bd=/\d{1,2}/,Cd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Dd={},Ed={},Fd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Gd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Hd={},Id={},Jd=/\d/,Kd=/\d\d/,Ld=/\d{3}/,Md=/\d{4}/,Nd=/[+-]?\d{6}/,Od=/\d\d?/,Pd=/\d\d\d\d?/,Qd=/\d\d\d\d\d\d?/,Rd=/\d{1,3}/,Sd=/\d{1,4}/,Td=/[+-]?\d{1,6}/,Ud=/\d+/,Vd=/[+-]?\d+/,Wd=/Z|[+-]\d\d:?\d\d/gi,Xd=/Z|[+-]\d\d(?::?\d\d)?/gi,Yd=/[+-]?\d+(\.\d{1,3})?/,Zd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,$d={},_d={},ae=0,be=1,ce=2,de=3,ee=4,fe=5,ge=6,he=7,ie=8;vd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){
// I know
        var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var je=vd;
// FORMATTING
    U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),
// ALIASES
        J("month","M"),
// PRIORITY
        M("month",8),
// PARSING
        Z("M",Od),Z("MM",Od,Kd),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[be]=u(a)-1}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);
// if we didn't find a month name, mark the date as invalid.
        null!=e?b[be]=e:m(c).invalidMonth=a});
// LOCALES
    var ke=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,le="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),me="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),ne=Zd,oe=Zd;
// FORMATTING
    U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),
// ALIASES
        J("year","y"),
// PRIORITIES
        M("year",1),
// PARSING
        Z("Y",Vd),Z("YY",Od,Kd),Z("YYYY",Sd,Md),Z("YYYYY",Td,Nd),Z("YYYYYY",Td,Nd),ba(["YYYYY","YYYYYY"],ae),ba("YYYY",function(b,c){c[ae]=2===b.length?a.parseTwoDigitYear(b):u(b)}),ba("YY",function(b,c){c[ae]=a.parseTwoDigitYear(b)}),ba("Y",function(a,b){b[ae]=parseInt(a,10)}),
// HOOKS
        a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};
// MOMENTS
    var pe=O("FullYear",!0);
// FORMATTING
    U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),
// ALIASES
        J("week","w"),J("isoWeek","W"),
// PRIORITIES
        M("week",5),M("isoWeek",5),
// PARSING
        Z("w",Od),Z("ww",Od,Kd),Z("W",Od),Z("WW",Od,Kd),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a)});var qe={dow:0,// Sunday is the first day of the week.
        doy:6};
// FORMATTING
    U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),
// ALIASES
        J("day","d"),J("weekday","e"),J("isoWeekday","E"),
// PRIORITY
        M("day",11),M("weekday",11),M("isoWeekday",11),
// PARSING
        Z("d",Od),Z("e",Od),Z("E",Od),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);
// if we didn't get a weekday name, mark the date as invalid
        null!=e?b.d=e:m(c).invalidWeekday=a}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a)});
// LOCALES
    var re="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),se="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),te="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ue=Zd,ve=Zd,we=Zd;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),
// ALIASES
        J("hour","h"),
// PRIORITY
        M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Od),Z("h",Od),Z("HH",Od,Kd),Z("hh",Od,Kd),Z("hmm",Pd),Z("hmmss",Qd),Z("Hmm",Pd),Z("Hmmss",Qd),ba(["H","HH"],de),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),ba(["h","hh"],function(a,b,c){b[de]=u(a),m(c).bigHour=!0}),ba("hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d)),m(c).bigHour=!0}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e)),m(c).bigHour=!0}),ba("Hmm",function(a,b,c){var d=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d))}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[de]=u(a.substr(0,d)),b[ee]=u(a.substr(d,2)),b[fe]=u(a.substr(e))});var xe,ye=/[ap]\.?m?\.?/i,ze=O("Hours",!0),Ae={calendar:xd,longDateFormat:yd,invalidDate:zd,ordinal:Ad,ordinalParse:Bd,relativeTime:Cd,months:le,monthsShort:me,week:qe,weekdays:re,weekdaysMin:te,weekdaysShort:se,meridiemParse:ye},Be={},Ce={},De=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ee=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Fe=/Z|[+-]\d\d(?::?\d\d)?/,Ge=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],
// YYYYMM is NOT allowed by the standard
        ["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],He=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ie=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=x("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),
// constant that refers to the ISO standard
        a.ISO_8601=function(){};var Je=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:o()}),Ke=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=sb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:o()}),Le=function(){return Date.now?Date.now():+new Date};zb("Z",":"),zb("ZZ",""),
// PARSING
        Z("Z",Xd),Z("ZZ",Xd),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ab(Xd,a)});
// HELPERS
// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
    var Me=/([\+\-]|\d\d)/gi;
// HOOKS
// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
    a.updateOffset=function(){};
// ASP.NET json date format regex
    var Ne=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Oe=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Ob.fn=wb.prototype;var Pe=Sb(1,"add"),Qe=Sb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Re=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});
// FORMATTING
    U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),zc("gggg","weekYear"),zc("ggggg","weekYear"),zc("GGGG","isoWeekYear"),zc("GGGGG","isoWeekYear"),
// ALIASES
        J("weekYear","gg"),J("isoWeekYear","GG"),
// PRIORITY
        M("weekYear",1),M("isoWeekYear",1),
// PARSING
        Z("G",Vd),Z("g",Vd),Z("GG",Od,Kd),Z("gg",Od,Kd),Z("GGGG",Sd,Md),Z("gggg",Sd,Md),Z("GGGGG",Td,Nd),Z("ggggg",Td,Nd),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a)}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),
// FORMATTING
        U("Q",0,"Qo","quarter"),
// ALIASES
        J("quarter","Q"),
// PRIORITY
        M("quarter",7),
// PARSING
        Z("Q",Jd),ba("Q",function(a,b){b[be]=3*(u(a)-1)}),
// FORMATTING
        U("D",["DD",2],"Do","date"),
// ALIASES
        J("date","D"),
// PRIOROITY
        M("date",9),
// PARSING
        Z("D",Od),Z("DD",Od,Kd),Z("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),ba(["D","DD"],ce),ba("Do",function(a,b){b[ce]=u(a.match(Od)[0],10)});
// MOMENTS
    var Se=O("Date",!0);
// FORMATTING
    U("DDD",["DDDD",3],"DDDo","dayOfYear"),
// ALIASES
        J("dayOfYear","DDD"),
// PRIORITY
        M("dayOfYear",4),
// PARSING
        Z("DDD",Rd),Z("DDDD",Ld),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a)}),
// FORMATTING
        U("m",["mm",2],0,"minute"),
// ALIASES
        J("minute","m"),
// PRIORITY
        M("minute",14),
// PARSING
        Z("m",Od),Z("mm",Od,Kd),ba(["m","mm"],ee);
// MOMENTS
    var Te=O("Minutes",!1);
// FORMATTING
    U("s",["ss",2],0,"second"),
// ALIASES
        J("second","s"),
// PRIORITY
        M("second",15),
// PARSING
        Z("s",Od),Z("ss",Od,Kd),ba(["s","ss"],fe);
// MOMENTS
    var Ue=O("Seconds",!1);
// FORMATTING
    U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),
// ALIASES
        J("millisecond","ms"),
// PRIORITY
        M("millisecond",16),
// PARSING
        Z("S",Rd,Jd),Z("SS",Rd,Kd),Z("SSS",Rd,Ld);var Ve;for(Ve="SSSS";Ve.length<=9;Ve+="S")Z(Ve,Ud);for(Ve="S";Ve.length<=9;Ve+="S")ba(Ve,Ic);
// MOMENTS
    var We=O("Milliseconds",!1);
// FORMATTING
    U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var Xe=r.prototype;Xe.add=Pe,Xe.calendar=Vb,Xe.clone=Wb,Xe.diff=bc,Xe.endOf=oc,Xe.format=gc,Xe.from=hc,Xe.fromNow=ic,Xe.to=jc,Xe.toNow=kc,Xe.get=R,Xe.invalidAt=xc,Xe.isAfter=Xb,Xe.isBefore=Yb,Xe.isBetween=Zb,Xe.isSame=$b,Xe.isSameOrAfter=_b,Xe.isSameOrBefore=ac,Xe.isValid=vc,Xe.lang=Re,Xe.locale=lc,Xe.localeData=mc,Xe.max=Ke,Xe.min=Je,Xe.parsingFlags=wc,Xe.set=S,Xe.startOf=nc,Xe.subtract=Qe,Xe.toArray=sc,Xe.toObject=tc,Xe.toDate=rc,Xe.toISOString=ec,Xe.inspect=fc,Xe.toJSON=uc,Xe.toString=dc,Xe.unix=qc,Xe.valueOf=pc,Xe.creationData=yc,
// Year
        Xe.year=pe,Xe.isLeapYear=ra,
// Week Year
        Xe.weekYear=Ac,Xe.isoWeekYear=Bc,
// Quarter
        Xe.quarter=Xe.quarters=Gc,
// Month
        Xe.month=ka,Xe.daysInMonth=la,
// Week
        Xe.week=Xe.weeks=Ba,Xe.isoWeek=Xe.isoWeeks=Ca,Xe.weeksInYear=Dc,Xe.isoWeeksInYear=Cc,
// Day
        Xe.date=Se,Xe.day=Xe.days=Ka,Xe.weekday=La,Xe.isoWeekday=Ma,Xe.dayOfYear=Hc,
// Hour
        Xe.hour=Xe.hours=ze,
// Minute
        Xe.minute=Xe.minutes=Te,
// Second
        Xe.second=Xe.seconds=Ue,
// Millisecond
        Xe.millisecond=Xe.milliseconds=We,
// Offset
        Xe.utcOffset=Db,Xe.utc=Fb,Xe.local=Gb,Xe.parseZone=Hb,Xe.hasAlignedHourOffset=Ib,Xe.isDST=Jb,Xe.isLocal=Lb,Xe.isUtcOffset=Mb,Xe.isUtc=Nb,Xe.isUTC=Nb,
// Timezone
        Xe.zoneAbbr=Jc,Xe.zoneName=Kc,
// Deprecations
        Xe.dates=x("dates accessor is deprecated. Use date instead.",Se),Xe.months=x("months accessor is deprecated. Use month instead",ka),Xe.years=x("years accessor is deprecated. Use year instead",pe),Xe.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Eb),Xe.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Kb);var Ye=C.prototype;Ye.calendar=D,Ye.longDateFormat=E,Ye.invalidDate=F,Ye.ordinal=G,Ye.preparse=Nc,Ye.postformat=Nc,Ye.relativeTime=H,Ye.pastFuture=I,Ye.set=A,
// Month
        Ye.months=fa,Ye.monthsShort=ga,Ye.monthsParse=ia,Ye.monthsRegex=na,Ye.monthsShortRegex=ma,
// Week
        Ye.week=ya,Ye.firstDayOfYear=Aa,Ye.firstDayOfWeek=za,
// Day of Week
        Ye.weekdays=Fa,Ye.weekdaysMin=Ha,Ye.weekdaysShort=Ga,Ye.weekdaysParse=Ja,Ye.weekdaysRegex=Na,Ye.weekdaysShortRegex=Oa,Ye.weekdaysMinRegex=Pa,
// Hours
        Ye.isPM=Va,Ye.meridiem=Wa,$a("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),
// Side effect imports
        a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var Ze=Math.abs,$e=ed("ms"),_e=ed("s"),af=ed("m"),bf=ed("h"),cf=ed("d"),df=ed("w"),ef=ed("M"),ff=ed("y"),gf=gd("milliseconds"),hf=gd("seconds"),jf=gd("minutes"),kf=gd("hours"),lf=gd("days"),mf=gd("months"),nf=gd("years"),of=Math.round,pf={s:45,// seconds to minute
        m:45,// minutes to hour
        h:22,// hours to day
        d:26,// days to month
        M:11},qf=Math.abs,rf=wb.prototype;
// Deprecations
// Side effect imports
// FORMATTING
// PARSING
// Side effect imports
    return rf.abs=Wc,rf.add=Yc,rf.subtract=Zc,rf.as=cd,rf.asMilliseconds=$e,rf.asSeconds=_e,rf.asMinutes=af,rf.asHours=bf,rf.asDays=cf,rf.asWeeks=df,rf.asMonths=ef,rf.asYears=ff,rf.valueOf=dd,rf._bubble=_c,rf.get=fd,rf.milliseconds=gf,rf.seconds=hf,rf.minutes=jf,rf.hours=kf,rf.days=lf,rf.weeks=hd,rf.months=mf,rf.years=nf,rf.humanize=md,rf.toISOString=nd,rf.toString=nd,rf.toJSON=nd,rf.locale=lc,rf.localeData=mc,rf.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",nd),rf.lang=Re,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Vd),Z("X",Yd),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),ba("x",function(a,b,c){c._d=new Date(u(a))}),a.version="2.17.1",b(sb),a.fn=Xe,a.min=ub,a.max=vb,a.now=Le,a.utc=k,a.unix=Lc,a.months=Rc,a.isDate=g,a.locale=$a,a.invalid=o,a.duration=Ob,a.isMoment=s,a.weekdays=Tc,a.parseZone=Mc,a.localeData=bb,a.isDuration=xb,a.monthsShort=Sc,a.weekdaysMin=Vc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Uc,a.normalizeUnits=K,a.relativeTimeRounding=kd,a.relativeTimeThreshold=ld,a.calendarFormat=Ub,a.prototype=Xe,a});

//! moment-timezone.js
//! version : 0.5.11
//! Copyright (c) JS Foundation and other contributors
//! license : MIT
//! github.com/moment/moment-timezone
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["moment"],b):"object"==typeof module&&module.exports?module.exports=b(require("moment")):b(a.moment)}(this,function(a){"use strict";function b(a){return a>96?a-87:a>64?a-29:a-48}function c(a){var c,d=0,e=a.split("."),f=e[0],g=e[1]||"",h=1,i=0,j=1;for(45===a.charCodeAt(0)&&(d=1,j=-1),d;d<f.length;d++)c=b(f.charCodeAt(d)),i=60*i+c;for(d=0;d<g.length;d++)h/=60,c=b(g.charCodeAt(d)),i+=c*h;return i*j}function d(a){for(var b=0;b<a.length;b++)a[b]=c(a[b])}function e(a,b){for(var c=0;c<b;c++)a[c]=Math.round((a[c-1]||0)+6e4*a[c]);a[b-1]=1/0}function f(a,b){var c,d=[];for(c=0;c<b.length;c++)d[c]=a[b[c]];return d}function g(a){var b=a.split("|"),c=b[2].split(" "),g=b[3].split(""),h=b[4].split(" ");return d(c),d(g),d(h),e(h,g.length),{name:b[0],abbrs:f(b[1].split(" "),g),offsets:f(c,g),untils:h,population:0|b[5]}}function h(a){a&&this._set(g(a))}function i(a){var b=a.toTimeString(),c=b.match(/\([a-z ]+\)/i);c&&c[0]?(c=c[0].match(/[A-Z]/g),c=c?c.join(""):void 0):(c=b.match(/[A-Z]{3,5}/g),c=c?c[0]:void 0),"GMT"===c&&(c=void 0),this.at=+a,this.abbr=c,this.offset=a.getTimezoneOffset()}function j(a){this.zone=a,this.offsetScore=0,this.abbrScore=0}function k(a,b){for(var c,d;d=6e4*((b.at-a.at)/12e4|0);)c=new i(new Date(a.at+d)),c.offset===a.offset?a=c:b=c;return a}function l(){var a,b,c,d=(new Date).getFullYear()-2,e=new i(new Date(d,0,1)),f=[e];for(c=1;c<48;c++)b=new i(new Date(d,c,1)),b.offset!==e.offset&&(a=k(e,b),f.push(a),f.push(new i(new Date(a.at+6e4)))),e=b;for(c=0;c<4;c++)f.push(new i(new Date(d+c,0,1))),f.push(new i(new Date(d+c,6,1)));return f}function m(a,b){return a.offsetScore!==b.offsetScore?a.offsetScore-b.offsetScore:a.abbrScore!==b.abbrScore?a.abbrScore-b.abbrScore:b.zone.population-a.zone.population}function n(a,b){var c,e;for(d(b),c=0;c<b.length;c++)e=b[c],I[e]=I[e]||{},I[e][a]=!0}function o(a){var b,c,d,e=a.length,f={},g=[];for(b=0;b<e;b++){d=I[a[b].offset]||{};for(c in d)d.hasOwnProperty(c)&&(f[c]=!0)}for(b in f)f.hasOwnProperty(b)&&g.push(H[b]);return g}function p(){try{var a=Intl.DateTimeFormat().resolvedOptions().timeZone;if(a){var b=H[r(a)];if(b)return b;z("Moment Timezone found "+a+" from the Intl api, but did not have that data loaded.")}}catch(c){}var d,e,f,g=l(),h=g.length,i=o(g),k=[];for(e=0;e<i.length;e++){for(d=new j(t(i[e]),h),f=0;f<h;f++)d.scoreOffsetAt(g[f]);k.push(d)}return k.sort(m),k.length>0?k[0].zone.name:void 0}function q(a){return D&&!a||(D=p()),D}function r(a){return(a||"").toLowerCase().replace(/\//g,"_")}function s(a){var b,c,d,e;for("string"==typeof a&&(a=[a]),b=0;b<a.length;b++)d=a[b].split("|"),c=d[0],e=r(c),F[e]=a[b],H[e]=c,d[5]&&n(e,d[2].split(" "))}function t(a,b){a=r(a);var c,d=F[a];return d instanceof h?d:"string"==typeof d?(d=new h(d),F[a]=d,d):G[a]&&b!==t&&(c=t(G[a],t))?(d=F[a]=new h,d._set(c),d.name=H[a],d):null}function u(){var a,b=[];for(a in H)H.hasOwnProperty(a)&&(F[a]||F[G[a]])&&H[a]&&b.push(H[a]);return b.sort()}function v(a){var b,c,d,e;for("string"==typeof a&&(a=[a]),b=0;b<a.length;b++)c=a[b].split("|"),d=r(c[0]),e=r(c[1]),G[d]=e,H[d]=c[0],G[e]=d,H[e]=c[1]}function w(a){s(a.zones),v(a.links),A.dataVersion=a.version}function x(a){return x.didShowError||(x.didShowError=!0,z("moment.tz.zoneExists('"+a+"') has been deprecated in favor of !moment.tz.zone('"+a+"')")),!!t(a)}function y(a){return!(!a._a||void 0!==a._tzm)}function z(a){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(a)}function A(b){var c=Array.prototype.slice.call(arguments,0,-1),d=arguments[arguments.length-1],e=t(d),f=a.utc.apply(null,c);return e&&!a.isMoment(b)&&y(f)&&f.add(e.parse(f),"minutes"),f.tz(d),f}function B(a){return function(){return this._z?this._z.abbr(this):a.call(this)}}function C(a){return function(){return this._z=null,a.apply(this,arguments)}}var D,E="0.5.11",F={},G={},H={},I={},J=a.version.split("."),K=+J[0],L=+J[1];(K<2||2===K&&L<6)&&z("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js "+a.version+". See momentjs.com"),h.prototype={_set:function(a){this.name=a.name,this.abbrs=a.abbrs,this.untils=a.untils,this.offsets=a.offsets,this.population=a.population},_index:function(a){var b,c=+a,d=this.untils;for(b=0;b<d.length;b++)if(c<d[b])return b},parse:function(a){var b,c,d,e,f=+a,g=this.offsets,h=this.untils,i=h.length-1;for(e=0;e<i;e++)if(b=g[e],c=g[e+1],d=g[e?e-1:e],b<c&&A.moveAmbiguousForward?b=c:b>d&&A.moveInvalidForward&&(b=d),f<h[e]-6e4*b)return g[e];return g[i]},abbr:function(a){return this.abbrs[this._index(a)]},offset:function(a){return this.offsets[this._index(a)]}},j.prototype.scoreOffsetAt=function(a){this.offsetScore+=Math.abs(this.zone.offset(a.at)-a.offset),this.zone.abbr(a.at).replace(/[^A-Z]/g,"")!==a.abbr&&this.abbrScore++},A.version=E,A.dataVersion="",A._zones=F,A._links=G,A._names=H,A.add=s,A.link=v,A.load=w,A.zone=t,A.zoneExists=x,A.guess=q,A.names=u,A.Zone=h,A.unpack=g,A.unpackBase60=c,A.needsOffset=y,A.moveInvalidForward=!0,A.moveAmbiguousForward=!1;var M=a.fn;a.tz=A,a.defaultZone=null,a.updateOffset=function(b,c){var d,e=a.defaultZone;void 0===b._z&&(e&&y(b)&&!b._isUTC&&(b._d=a.utc(b._a)._d,b.utc().add(e.parse(b),"minutes")),b._z=e),b._z&&(d=b._z.offset(b),Math.abs(d)<16&&(d/=60),void 0!==b.utcOffset?b.utcOffset(-d,c):b.zone(d,c))},M.tz=function(b){return b?(this._z=t(b),this._z?a.updateOffset(this):z("Moment Timezone has no data for "+b+". See http://momentjs.com/timezone/docs/#/data-loading/."),this):this._z?this._z.name:void 0},M.zoneName=B(M.zoneName),M.zoneAbbr=B(M.zoneAbbr),M.utc=C(M.utc),a.tz.setDefault=function(b){return(K<2||2===K&&L<9)&&z("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js "+a.version+"."),a.defaultZone=b?t(b):null,a};var N=a.momentProperties;return"[object Array]"===Object.prototype.toString.call(N)?(N.push("_z"),N.push("_a")):N&&(N._z=null),w({version:"2016j",zones:["Africa/Abidjan|GMT|0|0||48e5","Africa/Khartoum|EAT|-30|0||51e5","Africa/Algiers|CET|-10|0||26e5","Africa/Lagos|WAT|-10|0||17e6","Africa/Maputo|CAT|-20|0||26e5","Africa/Cairo|EET EEST|-20 -30|010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6","Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0|32e5","Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6","Africa/Johannesburg|SAST|-20|0||84e5","Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00|11e5","Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0|32e4","America/Adak|HST HDT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326","America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4","America/Santo_Domingo|AST|40|0||29e5","America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0|14e4","America/Argentina/Buenos_Aires|ART|30|0|","America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5","America/Panama|EST|50|0||15e5","America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0|27e5","America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3","America/Fortaleza|BRT|30|0||34e5","America/Managua|CST|60|0||22e5","America/Manaus|AMT|40|0||19e5","America/Bogota|COT|50|0||90e5","America/Denver|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5","America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|77e4","America/Cancun|CST CDT EST|60 50 50|010101010102|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4","America/Caracas|VET VET|4u 40|01|1QMT0|29e5","America/Cayenne|GFT|30|0||58e3","America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5","America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4","America/Phoenix|MST|70|0||42e5","America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6","America/New_York|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6","America/Rio_Branco|AMT ACT|40 50|01|1KLE0|31e4","America/Fort_Nelson|PST PDT MST|80 70 70|010101010102|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2","America/Halifax|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4","America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3","America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2","America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2","America/Guayaquil|ECT|50|0||27e5","America/Guyana|GYT|40|0||80e4","America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5","America/La_Paz|BOT|40|0||19e5","America/Lima|PET|50|0||11e6","America/Mexico_City|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6","America/Metlakatla|PST AKST AKDT|80 90 80|012121212121|1PAa0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2","America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2","America/Montevideo|UYST UYT|20 30|010101010101|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5","America/Noronha|FNT|20|0||30e2","America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0","America/Paramaribo|SRT|30|0||24e4","America/Port-au-Prince|EST EDT|50 40|010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5","America/Santiago|CLST CLT|30 40|010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|62e5","America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|20e6","America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452","America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4","Antarctica/Casey|+11 +08|-b0 -80|01010|1BN30 40P0 KL0 blz0|10","Antarctica/Davis|+05 +07|-50 -70|0101|1BPw0 3Wn0 KN0|70","Antarctica/DumontDUrville|+10|-a0|0||80","Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140|1","Asia/Tashkent|+05|-50|0||23e5","Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5","Antarctica/Rothera|-03|30|0||130","Antarctica/Syowa|+03|-30|0||20","Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40","Asia/Almaty|+06|-60|0||15e5","Asia/Baghdad|AST|-30|0||66e5","Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|25e5","Asia/Kamchatka|+12 +11|-c0 -b0|010|1Dp30 WM0|18e4","Asia/Baku|+04 +05|-40 -50|0101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5","Asia/Bangkok|ICT|-70|0||15e6","Asia/Barnaul|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 3rd0","Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5","Asia/Brunei|BNT|-80|0||42e4","Asia/Kolkata|IST|-5u|0||15e6","Asia/Chita|+09 +10 +08|-90 -a0 -80|010120|1BWh0 1qM0 WM0 8Hz0 3re0|33e4","Asia/Choibalsan|CHOT CHOST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|38e3","Asia/Shanghai|CST|-80|0||23e6","Asia/Colombo|+0530|-5u|0||22e5","Asia/Dhaka|BDT|-60|0||16e6","Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0|26e5","Asia/Dili|TLT|-90|0||19e4","Asia/Dubai|GST|-40|0||39e5","Asia/Famagusta|EET EEST +03|-20 -30 -30|010101010101012|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0","Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|18e5","Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|25e4","Asia/Hong_Kong|HKT|-80|0||73e5","Asia/Hovd|HOVT HOVST|-70 -80|0101010101010|1O8H0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|81e3","Asia/Irkutsk|+08 +09|-80 -90|01010|1BWi0 1qM0 WM0 8Hz0|60e4","Europe/Istanbul|EET EEST +03|-20 -30 -30|010101010101012|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6","Asia/Jakarta|WIB|-70|0||31e6","Asia/Jayapura|WIT|-90|0||26e4","Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4","Asia/Kabul|AFT|-4u|0||46e5","Asia/Karachi|PKT|-50|0||24e6","Asia/Urumqi|XJT|-60|0||32e5","Asia/Kathmandu|NPT|-5J|0||12e5","Asia/Khandyga|+10 +11 +09|-a0 -b0 -90|010102|1BWg0 1qM0 WM0 17V0 7zD0|66e2","Asia/Krasnoyarsk|+07 +08|-70 -80|01010|1BWj0 1qM0 WM0 8Hz0|10e5","Asia/Kuala_Lumpur|MYT|-80|0||71e5","Asia/Magadan|+11 +12 +10|-b0 -c0 -a0|010120|1BWf0 1qM0 WM0 8Hz0 3Cq0|95e3","Asia/Makassar|WITA|-80|0||15e5","Asia/Manila|PHT|-80|0||24e6","Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5","Asia/Novokuznetsk|+07 +06|-70 -60|010|1Dp80 WM0|55e4","Asia/Novosibirsk|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 4eN0|15e5","Asia/Omsk|+06 +07|-60 -70|01010|1BWk0 1qM0 WM0 8Hz0|12e5","Asia/Pyongyang|KST KST|-90 -8u|01|1P4D0|29e5","Asia/Rangoon|MMT|-6u|0||48e5","Asia/Sakhalin|+10 +11|-a0 -b0|010101|1BWg0 1qM0 WM0 8Hz0 3rd0|58e4","Asia/Seoul|KST|-90|0||23e6","Asia/Singapore|SGT|-80|0||56e5","Asia/Srednekolymsk|+11 +12|-b0 -c0|01010|1BWf0 1qM0 WM0 8Hz0|35e2","Asia/Tbilisi|+04|-40|0||11e5","Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6","Asia/Thimphu|BTT|-60|0||79e3","Asia/Tokyo|JST|-90|0||38e6","Asia/Tomsk|+06 +07|-60 -70|010101|1BWk0 1qM0 WM0 8Hz0 3Qp0|10e5","Asia/Ulaanbaatar|ULAT ULAST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|12e5","Asia/Ust-Nera|+11 +12 +10|-b0 -c0 -a0|010102|1BWf0 1qM0 WM0 17V0 7zD0|65e2","Asia/Vladivostok|+10 +11|-a0 -b0|01010|1BWg0 1qM0 WM0 8Hz0|60e4","Asia/Yakutsk|+09 +10|-90 -a0|01010|1BWh0 1qM0 WM0 8Hz0|28e4","Asia/Yekaterinburg|+05 +06|-50 -60|01010|1BWl0 1qM0 WM0 8Hz0|14e5","Asia/Yerevan|+04 +05|-40 -50|01010|1BWm0 1qM0 WM0 1qM0|13e5","Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4","Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5","Atlantic/Cape_Verde|CVT|10|0||50e4","Atlantic/South_Georgia|GST|20|0||30","Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10|21e2","Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5","Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5","Australia/Brisbane|AEST|-a0|0||20e5","Australia/Darwin|ACST|-9u|0||12e4","Australia/Eucla|ACWST|-8J|0||368","Australia/Lord_Howe|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347","Australia/Perth|AWST|-80|0||18e5","Pacific/Easter|EASST EAST|50 60|010101010101010101010|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|30e2","Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5","Etc/GMT+1|-01|10|0|","Etc/GMT+10|-10|a0|0|","Etc/GMT+11|-11|b0|0|","Etc/GMT+12|-12|c0|0|","Etc/GMT+2|-02|20|0|","Etc/GMT+4|-04|40|0|","Etc/GMT+5|-05|50|0|","Etc/GMT+6|-06|60|0|","Etc/GMT+7|-07|70|0|","Etc/GMT+8|-08|80|0|","Etc/GMT+9|-09|90|0|","Etc/GMT-1|+01|-10|0|","Etc/GMT-11|+11|-b0|0|","Etc/GMT-12|+12|-c0|0|","Etc/GMT-13|+13|-d0|0|","Etc/GMT-14|+14|-e0|0|","Etc/GMT-2|+02|-20|0|","Etc/GMT-7|+07|-70|0|","Etc/GMT-8|+08|-80|0|","Etc/GMT-9|+09|-90|0|","Etc/UCT|UCT|0|0|","Etc/UTC|UTC|0|0|","Europe/Astrakhan|+03 +04|-30 -40|010101|1BWn0 1qM0 WM0 8Hz0 3rd0","Europe/London|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6","Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4","Europe/Kaliningrad|EET EEST +03|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0|44e4","Europe/Volgograd|+03 +04|-30 -40|01010|1BWn0 1qM0 WM0 8Hz0|10e5","Europe/Minsk|EET EEST +03|-20 -30 -30|0102|1BWo0 1qM0 WM0|19e5","Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6","Europe/Samara|+04 +03|-40 -30|010|1Dpb0 WM0|12e5","Europe/Saratov|+03 +04|-30 -40|010101|1BWn0 1qM0 WM0 8Hz0 5810","Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4","Pacific/Honolulu|HST|a0|0||37e4","Indian/Chagos|IOT|-60|0||30e2","Indian/Christmas|CXT|-70|0||21e2","Indian/Cocos|CCT|-6u|0||596","Indian/Mahe|SCT|-40|0||79e3","Indian/Maldives|MVT|-50|0||35e4","Indian/Mauritius|MUT|-40|0||15e4","Indian/Reunion|RET|-40|0||84e4","Pacific/Majuro|MHT|-c0|0||28e3","MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00","Pacific/Chatham|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600","Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3","Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0|18e4","Pacific/Chuuk|CHUT|-a0|0||49e3","Pacific/Efate|VUT|-b0|0||66e3","Pacific/Enderbury|PHOT|-d0|0||1","Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0|483","Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0|88e4","Pacific/Funafuti|TVT|-c0|0||45e2","Pacific/Galapagos|GALT|60|0||25e3","Pacific/Gambier|GAMT|90|0||125","Pacific/Guadalcanal|SBT|-b0|0||11e4","Pacific/Guam|ChST|-a0|0||17e4","Pacific/Kiritimati|LINT|-e0|0||51e2","Pacific/Kosrae|KOST|-b0|0||66e2","Pacific/Marquesas|MART|9u|0||86e2","Pacific/Pago_Pago|SST|b0|0||37e2","Pacific/Nauru|NRT|-c0|0||10e3","Pacific/Niue|NUT|b0|0||12e2","Pacific/Norfolk|NFT NFT|-bu -b0|01|1PoCu|25e4","Pacific/Noumea|NCT|-b0|0||98e3","Pacific/Palau|PWT|-90|0||21e3","Pacific/Pitcairn|PST|80|0||56","Pacific/Pohnpei|PONT|-b0|0||34e3","Pacific/Port_Moresby|PGT|-a0|0||25e4","Pacific/Rarotonga|CKT|a0|0||13e3","Pacific/Tahiti|TAHT|a0|0||18e4","Pacific/Tarawa|GILT|-c0|0||29e3","Pacific/Tongatapu|+13 +14|-d0 -e0|0101010101|1S4d0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0|75e3","Pacific/Wake|WAKT|-c0|0||16e3","Pacific/Wallis|WFT|-c0|0||94"],links:["Africa/Abidjan|Africa/Accra","Africa/Abidjan|Africa/Bamako","Africa/Abidjan|Africa/Banjul","Africa/Abidjan|Africa/Bissau","Africa/Abidjan|Africa/Conakry","Africa/Abidjan|Africa/Dakar","Africa/Abidjan|Africa/Freetown","Africa/Abidjan|Africa/Lome","Africa/Abidjan|Africa/Monrovia","Africa/Abidjan|Africa/Nouakchott","Africa/Abidjan|Africa/Ouagadougou","Africa/Abidjan|Africa/Sao_Tome","Africa/Abidjan|Africa/Timbuktu","Africa/Abidjan|America/Danmarkshavn","Africa/Abidjan|Atlantic/Reykjavik","Africa/Abidjan|Atlantic/St_Helena","Africa/Abidjan|Etc/GMT","Africa/Abidjan|Etc/GMT+0","Africa/Abidjan|Etc/GMT-0","Africa/Abidjan|Etc/GMT0","Africa/Abidjan|Etc/Greenwich","Africa/Abidjan|GMT","Africa/Abidjan|GMT+0","Africa/Abidjan|GMT-0","Africa/Abidjan|GMT0","Africa/Abidjan|Greenwich","Africa/Abidjan|Iceland","Africa/Algiers|Africa/Tunis","Africa/Cairo|Egypt","Africa/Casablanca|Africa/El_Aaiun","Africa/Johannesburg|Africa/Maseru","Africa/Johannesburg|Africa/Mbabane","Africa/Khartoum|Africa/Addis_Ababa","Africa/Khartoum|Africa/Asmara","Africa/Khartoum|Africa/Asmera","Africa/Khartoum|Africa/Dar_es_Salaam","Africa/Khartoum|Africa/Djibouti","Africa/Khartoum|Africa/Juba","Africa/Khartoum|Africa/Kampala","Africa/Khartoum|Africa/Mogadishu","Africa/Khartoum|Africa/Nairobi","Africa/Khartoum|Indian/Antananarivo","Africa/Khartoum|Indian/Comoro","Africa/Khartoum|Indian/Mayotte","Africa/Lagos|Africa/Bangui","Africa/Lagos|Africa/Brazzaville","Africa/Lagos|Africa/Douala","Africa/Lagos|Africa/Kinshasa","Africa/Lagos|Africa/Libreville","Africa/Lagos|Africa/Luanda","Africa/Lagos|Africa/Malabo","Africa/Lagos|Africa/Ndjamena","Africa/Lagos|Africa/Niamey","Africa/Lagos|Africa/Porto-Novo","Africa/Maputo|Africa/Blantyre","Africa/Maputo|Africa/Bujumbura","Africa/Maputo|Africa/Gaborone","Africa/Maputo|Africa/Harare","Africa/Maputo|Africa/Kigali","Africa/Maputo|Africa/Lubumbashi","Africa/Maputo|Africa/Lusaka","Africa/Tripoli|Libya","America/Adak|America/Atka","America/Adak|US/Aleutian","America/Anchorage|America/Juneau","America/Anchorage|America/Nome","America/Anchorage|America/Sitka","America/Anchorage|America/Yakutat","America/Anchorage|US/Alaska","America/Argentina/Buenos_Aires|America/Argentina/Catamarca","America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia","America/Argentina/Buenos_Aires|America/Argentina/Cordoba","America/Argentina/Buenos_Aires|America/Argentina/Jujuy","America/Argentina/Buenos_Aires|America/Argentina/La_Rioja","America/Argentina/Buenos_Aires|America/Argentina/Mendoza","America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos","America/Argentina/Buenos_Aires|America/Argentina/Salta","America/Argentina/Buenos_Aires|America/Argentina/San_Juan","America/Argentina/Buenos_Aires|America/Argentina/San_Luis","America/Argentina/Buenos_Aires|America/Argentina/Tucuman","America/Argentina/Buenos_Aires|America/Argentina/Ushuaia","America/Argentina/Buenos_Aires|America/Buenos_Aires","America/Argentina/Buenos_Aires|America/Catamarca","America/Argentina/Buenos_Aires|America/Cordoba","America/Argentina/Buenos_Aires|America/Jujuy","America/Argentina/Buenos_Aires|America/Mendoza","America/Argentina/Buenos_Aires|America/Rosario","America/Campo_Grande|America/Cuiaba","America/Chicago|America/Indiana/Knox","America/Chicago|America/Indiana/Tell_City","America/Chicago|America/Knox_IN","America/Chicago|America/Matamoros","America/Chicago|America/Menominee","America/Chicago|America/North_Dakota/Center","America/Chicago|America/North_Dakota/New_Salem","America/Chicago|America/Rainy_River","America/Chicago|America/Rankin_Inlet","America/Chicago|America/Resolute","America/Chicago|America/Winnipeg","America/Chicago|CST6CDT","America/Chicago|Canada/Central","America/Chicago|US/Central","America/Chicago|US/Indiana-Starke","America/Chihuahua|America/Mazatlan","America/Chihuahua|Mexico/BajaSur","America/Denver|America/Boise","America/Denver|America/Cambridge_Bay","America/Denver|America/Edmonton","America/Denver|America/Inuvik","America/Denver|America/Ojinaga","America/Denver|America/Shiprock","America/Denver|America/Yellowknife","America/Denver|Canada/Mountain","America/Denver|MST7MDT","America/Denver|Navajo","America/Denver|US/Mountain","America/Fortaleza|America/Belem","America/Fortaleza|America/Maceio","America/Fortaleza|America/Recife","America/Fortaleza|America/Santarem","America/Halifax|America/Glace_Bay","America/Halifax|America/Moncton","America/Halifax|America/Thule","America/Halifax|Atlantic/Bermuda","America/Halifax|Canada/Atlantic","America/Havana|Cuba","America/Los_Angeles|America/Dawson","America/Los_Angeles|America/Ensenada","America/Los_Angeles|America/Santa_Isabel","America/Los_Angeles|America/Tijuana","America/Los_Angeles|America/Vancouver","America/Los_Angeles|America/Whitehorse","America/Los_Angeles|Canada/Pacific","America/Los_Angeles|Canada/Yukon","America/Los_Angeles|Mexico/BajaNorte","America/Los_Angeles|PST8PDT","America/Los_Angeles|US/Pacific","America/Los_Angeles|US/Pacific-New","America/Managua|America/Belize","America/Managua|America/Costa_Rica","America/Managua|America/El_Salvador","America/Managua|America/Guatemala","America/Managua|America/Regina","America/Managua|America/Swift_Current","America/Managua|America/Tegucigalpa","America/Managua|Canada/East-Saskatchewan","America/Managua|Canada/Saskatchewan","America/Manaus|America/Boa_Vista","America/Manaus|America/Porto_Velho","America/Manaus|Brazil/West","America/Mexico_City|America/Merida","America/Mexico_City|America/Monterrey","America/Mexico_City|Mexico/General","America/New_York|America/Detroit","America/New_York|America/Fort_Wayne","America/New_York|America/Indiana/Indianapolis","America/New_York|America/Indiana/Marengo","America/New_York|America/Indiana/Petersburg","America/New_York|America/Indiana/Vevay","America/New_York|America/Indiana/Vincennes","America/New_York|America/Indiana/Winamac","America/New_York|America/Indianapolis","America/New_York|America/Iqaluit","America/New_York|America/Kentucky/Louisville","America/New_York|America/Kentucky/Monticello","America/New_York|America/Louisville","America/New_York|America/Montreal","America/New_York|America/Nassau","America/New_York|America/Nipigon","America/New_York|America/Pangnirtung","America/New_York|America/Thunder_Bay","America/New_York|America/Toronto","America/New_York|Canada/Eastern","America/New_York|EST5EDT","America/New_York|US/East-Indiana","America/New_York|US/Eastern","America/New_York|US/Michigan","America/Noronha|Brazil/DeNoronha","America/Panama|America/Atikokan","America/Panama|America/Cayman","America/Panama|America/Coral_Harbour","America/Panama|America/Jamaica","America/Panama|EST","America/Panama|Jamaica","America/Phoenix|America/Creston","America/Phoenix|America/Dawson_Creek","America/Phoenix|America/Hermosillo","America/Phoenix|MST","America/Phoenix|US/Arizona","America/Rio_Branco|America/Eirunepe","America/Rio_Branco|America/Porto_Acre","America/Rio_Branco|Brazil/Acre","America/Santiago|Antarctica/Palmer","America/Santiago|Chile/Continental","America/Santo_Domingo|America/Anguilla","America/Santo_Domingo|America/Antigua","America/Santo_Domingo|America/Aruba","America/Santo_Domingo|America/Barbados","America/Santo_Domingo|America/Blanc-Sablon","America/Santo_Domingo|America/Curacao","America/Santo_Domingo|America/Dominica","America/Santo_Domingo|America/Grenada","America/Santo_Domingo|America/Guadeloupe","America/Santo_Domingo|America/Kralendijk","America/Santo_Domingo|America/Lower_Princes","America/Santo_Domingo|America/Marigot","America/Santo_Domingo|America/Martinique","America/Santo_Domingo|America/Montserrat","America/Santo_Domingo|America/Port_of_Spain","America/Santo_Domingo|America/Puerto_Rico","America/Santo_Domingo|America/St_Barthelemy","America/Santo_Domingo|America/St_Kitts","America/Santo_Domingo|America/St_Lucia","America/Santo_Domingo|America/St_Thomas","America/Santo_Domingo|America/St_Vincent","America/Santo_Domingo|America/Tortola","America/Santo_Domingo|America/Virgin","America/Sao_Paulo|Brazil/East","America/St_Johns|Canada/Newfoundland","Antarctica/DumontDUrville|Etc/GMT-10","Antarctica/Rothera|Etc/GMT+3","Antarctica/Syowa|Etc/GMT-3","Asia/Almaty|Antarctica/Vostok","Asia/Almaty|Asia/Bishkek","Asia/Almaty|Asia/Qyzylorda","Asia/Almaty|Etc/GMT-6","Asia/Baghdad|Asia/Aden","Asia/Baghdad|Asia/Bahrain","Asia/Baghdad|Asia/Kuwait","Asia/Baghdad|Asia/Qatar","Asia/Baghdad|Asia/Riyadh","Asia/Bangkok|Asia/Ho_Chi_Minh","Asia/Bangkok|Asia/Phnom_Penh","Asia/Bangkok|Asia/Saigon","Asia/Bangkok|Asia/Vientiane","Asia/Dhaka|Asia/Dacca","Asia/Dubai|Asia/Muscat","Asia/Hong_Kong|Hongkong","Asia/Jakarta|Asia/Pontianak","Asia/Jerusalem|Asia/Tel_Aviv","Asia/Jerusalem|Israel","Asia/Kamchatka|Asia/Anadyr","Asia/Kathmandu|Asia/Katmandu","Asia/Kolkata|Asia/Calcutta","Asia/Kuala_Lumpur|Asia/Kuching","Asia/Makassar|Asia/Ujung_Pandang","Asia/Rangoon|Asia/Yangon","Asia/Seoul|ROK","Asia/Shanghai|Asia/Chongqing","Asia/Shanghai|Asia/Chungking","Asia/Shanghai|Asia/Harbin","Asia/Shanghai|Asia/Macao","Asia/Shanghai|Asia/Macau","Asia/Shanghai|Asia/Taipei","Asia/Shanghai|PRC","Asia/Shanghai|ROC","Asia/Singapore|Singapore","Asia/Tashkent|Antarctica/Mawson","Asia/Tashkent|Asia/Aqtau","Asia/Tashkent|Asia/Aqtobe","Asia/Tashkent|Asia/Ashgabat","Asia/Tashkent|Asia/Ashkhabad","Asia/Tashkent|Asia/Atyrau","Asia/Tashkent|Asia/Dushanbe","Asia/Tashkent|Asia/Oral","Asia/Tashkent|Asia/Samarkand","Asia/Tashkent|Etc/GMT-5","Asia/Tashkent|Indian/Kerguelen","Asia/Tbilisi|Etc/GMT-4","Asia/Tehran|Iran","Asia/Thimphu|Asia/Thimbu","Asia/Tokyo|Japan","Asia/Ulaanbaatar|Asia/Ulan_Bator","Asia/Urumqi|Asia/Kashgar","Australia/Adelaide|Australia/Broken_Hill","Australia/Adelaide|Australia/South","Australia/Adelaide|Australia/Yancowinna","Australia/Brisbane|Australia/Lindeman","Australia/Brisbane|Australia/Queensland","Australia/Darwin|Australia/North","Australia/Lord_Howe|Australia/LHI","Australia/Perth|Australia/West","Australia/Sydney|Australia/ACT","Australia/Sydney|Australia/Canberra","Australia/Sydney|Australia/Currie","Australia/Sydney|Australia/Hobart","Australia/Sydney|Australia/Melbourne","Australia/Sydney|Australia/NSW","Australia/Sydney|Australia/Tasmania","Australia/Sydney|Australia/Victoria","Etc/UCT|UCT","Etc/UTC|Etc/Universal","Etc/UTC|Etc/Zulu","Etc/UTC|UTC","Etc/UTC|Universal","Etc/UTC|Zulu","Europe/Astrakhan|Europe/Ulyanovsk","Europe/Athens|Asia/Nicosia","Europe/Athens|EET","Europe/Athens|Europe/Bucharest","Europe/Athens|Europe/Helsinki","Europe/Athens|Europe/Kiev","Europe/Athens|Europe/Mariehamn","Europe/Athens|Europe/Nicosia","Europe/Athens|Europe/Riga","Europe/Athens|Europe/Sofia","Europe/Athens|Europe/Tallinn","Europe/Athens|Europe/Uzhgorod","Europe/Athens|Europe/Vilnius","Europe/Athens|Europe/Zaporozhye","Europe/Chisinau|Europe/Tiraspol","Europe/Dublin|Eire","Europe/Istanbul|Asia/Istanbul","Europe/Istanbul|Turkey","Europe/Lisbon|Atlantic/Canary","Europe/Lisbon|Atlantic/Faeroe","Europe/Lisbon|Atlantic/Faroe","Europe/Lisbon|Atlantic/Madeira","Europe/Lisbon|Portugal","Europe/Lisbon|WET","Europe/London|Europe/Belfast","Europe/London|Europe/Guernsey","Europe/London|Europe/Isle_of_Man","Europe/London|Europe/Jersey","Europe/London|GB","Europe/London|GB-Eire","Europe/Moscow|W-SU","Europe/Paris|Africa/Ceuta","Europe/Paris|Arctic/Longyearbyen","Europe/Paris|Atlantic/Jan_Mayen","Europe/Paris|CET","Europe/Paris|Europe/Amsterdam","Europe/Paris|Europe/Andorra","Europe/Paris|Europe/Belgrade","Europe/Paris|Europe/Berlin","Europe/Paris|Europe/Bratislava","Europe/Paris|Europe/Brussels","Europe/Paris|Europe/Budapest","Europe/Paris|Europe/Busingen","Europe/Paris|Europe/Copenhagen","Europe/Paris|Europe/Gibraltar","Europe/Paris|Europe/Ljubljana","Europe/Paris|Europe/Luxembourg","Europe/Paris|Europe/Madrid","Europe/Paris|Europe/Malta","Europe/Paris|Europe/Monaco","Europe/Paris|Europe/Oslo","Europe/Paris|Europe/Podgorica","Europe/Paris|Europe/Prague","Europe/Paris|Europe/Rome","Europe/Paris|Europe/San_Marino","Europe/Paris|Europe/Sarajevo","Europe/Paris|Europe/Skopje","Europe/Paris|Europe/Stockholm","Europe/Paris|Europe/Tirane","Europe/Paris|Europe/Vaduz","Europe/Paris|Europe/Vatican","Europe/Paris|Europe/Vienna","Europe/Paris|Europe/Warsaw","Europe/Paris|Europe/Zagreb","Europe/Paris|Europe/Zurich","Europe/Paris|Poland","Europe/Volgograd|Europe/Kirov","Pacific/Auckland|Antarctica/McMurdo","Pacific/Auckland|Antarctica/South_Pole","Pacific/Auckland|NZ","Pacific/Chatham|NZ-CHAT","Pacific/Chuuk|Pacific/Truk","Pacific/Chuuk|Pacific/Yap","Pacific/Easter|Chile/EasterIsland","Pacific/Guam|Pacific/Saipan","Pacific/Honolulu|HST","Pacific/Honolulu|Pacific/Johnston","Pacific/Honolulu|US/Hawaii","Pacific/Majuro|Kwajalein","Pacific/Majuro|Pacific/Kwajalein","Pacific/Pago_Pago|Pacific/Midway","Pacific/Pago_Pago|Pacific/Samoa","Pacific/Pago_Pago|US/Samoa","Pacific/Pohnpei|Pacific/Ponape"]
}),a});



/* locales */

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';

    var pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    };
    var plurals = {
        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    };
    var pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    };
    var months = [
        'كانون الثاني يناير',
        'شباط فبراير',
        'آذار مارس',
        'نيسان أبريل',
        'أيار مايو',
        'حزيران يونيو',
        'تموز يوليو',
        'آب أغسطس',
        'أيلول سبتمبر',
        'تشرين الأول أكتوبر',
        'تشرين الثاني نوفمبر',
        'كانون الأول ديسمبر'
    ];

    var ar = moment.defineLocale('ar', {
        months : months,
        monthsShort : months,
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'بعد %s',
            past : 'منذ %s',
            s : pluralize('s'),
            m : pluralize('m'),
            mm : pluralize('m'),
            h : pluralize('h'),
            hh : pluralize('h'),
            d : pluralize('d'),
            dd : pluralize('d'),
            M : pluralize('M'),
            MM : pluralize('M'),
            y : pluralize('y'),
            yy : pluralize('y')
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ar;

})));

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de = moment.defineLocale('de', {
        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            m : processRelativeTime,
            mm : '%d Minuten',
            h : processRelativeTime,
            hh : '%d Stunden',
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return de;

})));

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';


    var fr = moment.defineLocale('fr', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fr;

})));

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';


    var it = moment.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return it;

})));

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';


    var uk = moment.defineLocale('uk', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return uk;

})));

//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) { 'use strict';


    var au = moment.defineLocale('au', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return au;

})));

/*!--------------------------------------------------------------------
 JAVASCRIPT "Outdated Browser"
 Version:    1.1.2 - 2015
 author:     Burocratik
 website:    http://www.burocratik.com
 * @preserve
 -----------------------------------------------------------------------*/
var outdatedBrowser = function(options) {

	//Variable definition (before ajax)
	var outdated = document.getElementById("outdated");

	// Default settings
	this.defaultOpts = {
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '../outdatedbrowser/lang/en.html'
	}

	if (options) {
		//assign css3 property or js property to IE browser version
		if (options.lowerThan == 'IE8' || options.lowerThan == 'borderSpacing') {
			options.lowerThan = 'borderSpacing';
		} else if (options.lowerThan == 'IE9' || options.lowerThan == 'boxShadow') {
			options.lowerThan = 'boxShadow';
		} else if (options.lowerThan == 'IE10' || options.lowerThan == 'transform' || options.lowerThan == '' || typeof options.lowerThan === "undefined") {
			options.lowerThan = 'transform';
		} else if (options.lowerThan == 'IE11' || options.lowerThan == 'borderImage') {
			options.lowerThan = 'borderImage';
		}  else if (options.lowerThan == 'Edge' || options.lowerThan == 'js:Promise') {
			options.lowerThan = 'js:Promise';
		}

		//all properties
		this.defaultOpts.bgColor = options.bgColor;
		this.defaultOpts.color = options.color;
		this.defaultOpts.lowerThan = options.lowerThan;
		this.defaultOpts.languagePath = options.languagePath;

		bkgColor = this.defaultOpts.bgColor;
		txtColor = this.defaultOpts.color;
		cssProp = this.defaultOpts.lowerThan;
		languagePath = this.defaultOpts.languagePath;
	} else {
		bkgColor = this.defaultOpts.bgColor;
		txtColor = this.defaultOpts.color;
		cssProp = this.defaultOpts.lowerThan;
		languagePath = this.defaultOpts.languagePath;
	} //end if options


	//Define opacity and fadeIn/fadeOut functions
	var done = true;

	function function_opacity(opacity_value) {
		outdated.style.opacity = opacity_value / 100;
		outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
	}

	// function function_fade_out(opacity_value) {
	//     function_opacity(opacity_value);
	//     if (opacity_value == 1) {
	//         outdated.style.display = 'none';
	//         done = true;
	//     }
	// }

	function function_fade_in(opacity_value) {
		function_opacity(opacity_value);
		if (opacity_value == 1) {
			outdated.style.display = 'block';
		}
		if (opacity_value == 100) {
			done = true;
		}
	}

	//check if element has a particular class
	// function hasClass(element, cls) {
	//     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	// }

	var supports = ( function() {
		var div = document.createElement('div');
		var vendors = 'Khtml Ms O Moz Webkit'.split(' ');
		var len = vendors.length;

		return function(prop) {
			if (prop in div.style) return true;

			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});

			while (len--) {
				if (vendors[len] + prop in div.style) {
					return true;
				}
			}
			return false;
		};
	} )();

	var validBrowser = false;

	// browser check by js props
	if(/^js:+/g.test(cssProp)) {
		var jsProp = cssProp.split(':')[1];
		if(!jsProp)
			return;

		switch (jsProp) {
			case 'Promise':
				validBrowser = window.Promise !== undefined && window.Promise !== null && Object.prototype.toString.call(window.Promise.resolve()) === '[object Promise]';
				break;
			default:
				validBrowser = false;
		}
	} else {
		// check by css3 property (transform=default)
		validBrowser = supports('' + cssProp + '');
	}


	if (!validBrowser) {
		if (done && outdated.style.opacity !== '1') {
			done = false;
			for (var i = 1; i <= 100; i++) {
				setTimeout((function (x) {
					return function () {
						function_fade_in(x);
					};
				})(i), i * 8);
			}
		}
	} else {
		return;
	} //end if


	//Check AJAX Options: if languagePath == '' > use no Ajax way, html is needed inside <div id="outdated">
	if (languagePath === ' ' || languagePath.length == 0) {
		startStylesAndEvents();
	} else {
		grabFile(languagePath);
	}

	//events and colors
	function startStylesAndEvents() {
		var btnClose = document.getElementById("btnCloseUpdateBrowser");
		var btnUpdate = document.getElementById("btnUpdateBrowser");

		//check settings attributes
		outdated.style.backgroundColor = bkgColor;
		//way too hard to put !important on IE6
		outdated.style.color = txtColor;
		outdated.children[0].style.color = txtColor;
		outdated.children[1].style.color = txtColor;

		//check settings attributes
		btnUpdate.style.color = txtColor;
		// btnUpdate.style.borderColor = txtColor;
		if (btnUpdate.style.borderColor) {
			btnUpdate.style.borderColor = txtColor;
		}
		btnClose.style.color = txtColor;

		//close button
		btnClose.onmousedown = function() {
			outdated.style.display = 'none';
			return false;
		};

		//Override the update button color to match the background color
		btnUpdate.onmouseover = function() {
			this.style.color = bkgColor;
			this.style.backgroundColor = txtColor;
		};
		btnUpdate.onmouseout = function() {
			this.style.color = txtColor;
			this.style.backgroundColor = bkgColor;
		};
	} //end styles and events


	// IF AJAX with request ERROR > insert english default
	var ajaxEnglishDefault = '<h6>Your browser is out-of-date!</h6>'
		+ '<p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>'
		+ '<p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';


	//** AJAX FUNCTIONS - Bulletproof Ajax by Jeremy Keith **
	function getHTTPObject() {
		var xhr = false;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch ( e ) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch ( e ) {
					xhr = false;
				}
			}
		}
		return xhr;
	}//end function

	function grabFile(file) {
		var request = getHTTPObject();
		if (request) {
			request.onreadystatechange = function() {
				displayResponse(request);
			};
			request.open("GET", file, true);
			request.send(null);
		}
		return false;
	} //end grabFile

	function displayResponse(request) {
		var insertContentHere = document.getElementById("outdated");
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 304) {
				insertContentHere.innerHTML = request.responseText;
			} else {
				insertContentHere.innerHTML = ajaxEnglishDefault;
			}
			startStylesAndEvents();
		}
		return false;
	}//end displayResponse

	////////END of outdatedBrowser function
};
// Checks for browser support
fxcm.support = new function() {
	var thatSupport = this;
	
	var _select = document.createElement('select');
	var _opt = _select.appendChild(document.createElement('option'));
	
	// Make sure that the options inside disabled selects aren't marked as disabled (WebKit marks them as disabled)
	_select.disabled = true;
	this.optDisabled = !_opt.disabled;

	// Add fallback support for Array.indexOf in older versions of IE: IE6-8 or compatibility/quirks mode
	// Code taken from https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
	(function(){
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
				"use strict";
		        if (this == null) {
					throw new TypeError();
				}
				var t = Object(this);
				var len = t.length >>> 0;
				if (len === 0) {
					return -1;
				}
		        var n = 0;
		        if (arguments.length > 1) {
					n = Number(arguments[1]);
					if (n != n) { // shortcut for verifying if it's NaN
						n = 0;
					} else if (n != 0 && n != Infinity && n != -Infinity) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
					}
				}
				if (n >= len) {
					return -1;
				}
				var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
				for (; k < len; k++) {
					if (k in t && t[k] === searchElement) {
						return k;
					}
				}
				return -1;
			};
		}
	})();

	// Polyfill - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}
	
}();
// Library of utility functions
fxcm.lib = new function() {
	var thatLib = this;

	/* makeClass - By John Resig (MIT Licensed), modified by Anthony DiSanti
	Allows a class to be instantiated without using the new keyword and uses prototypical inheritance
	Usage:
	var className = makeClass();
	className.prototype.init = function() {
		// Constructor Function
	}

	var obj1 = new newClass(); // Correct class instantiation using the new keyword, properly returns an instance of className
	var obj2 = newClass(); // Incorrect class instantiation missing the new keyword, still properly returns an instance of className */
	this.makeClass = function() {
		return function(args) {
			if (this instanceof arguments.callee) {
				if (typeof this.init === 'function') {
					this.init.apply(this, args && args.callee ? args : arguments);
				}
			} else {
				return new arguments.callee(arguments);
			}
		};
	};


    // Retrieves a URL query parameter, null if it does not exist
	this.getURLParameter = function(parameter) {
		// Confirm that there are URL parameters at all
		if (document.location.search === '') { return false; }

		var parameters = document.location.search.substring(1).split('&');	// Strip off the leading ? and split the string into individual key/value pairs
		for (parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
			var parameterParts = parameters[parameterIndex].split('=');	// Split the key and the value
			if (decodeURIComponent(parameterParts[0]).toUpperCase() === parameter.toUpperCase()) {
				return parameterParts.length >= 2 ? decodeURIComponent(parameterParts[1]) : null;	// Return null if the parameter doesn't have a value
			}
		}

		return false;	// Return false if the parameter doesn't exist
	};


	// Sets a URL query parameter
	this.setURLParameter = function (URL, parameter, value) {
		var URLParts = URL.toLowerCase().match('^(.*[\?&]' + parameter.toLowerCase() + '=).*?([\?&#].*)?$');

		if (URLParts)	{
			// Use the original URL so that we don't force the URL and parameters to be lower case
			return URL.substr(0,URLParts[1].length) + value + (typeof URLParts[2] !== 'undefined' ? URL.substr(URL.length - URLParts[2].length) : '');
		} else {
			// Account for a possible anchor
			var anchorLocation = URL.indexOf('#');
			if (anchorLocation >= 0) {
				return [URL.substr(0,anchorLocation), (URL.indexOf('?') == -1 ? '?' : '&'), parameter, '=', value, URL.substr(anchorLocation)].join('');
			} else {
				return URL + (URL.indexOf('?') == -1 ? '?' : '&') + parameter + '=' + value;
			}
		}
	};


	// Prepends padChar to a string or number to reach desired length
	this.padLeft = function(string, padChar, length) {
		return _padString(string, padChar, length, true);
	};


	// Appends padChar to a string or number to reach desired length
	this.padRight = function(string, padChar, length) {
		return _padString(string, padChar, length, false);
	};


	// Pads a string with padChar to the desired length
	function _padString(string, padChar, length, left) {
		// Convert numbers to strings
		if (typeof string === 'number') { string = String(string); }
		if (typeof padChar === 'number') { padChar = String(padChar); }

		// If string isn't a string or padChar isn't a 1 character string or left isn't a boolean, bomb out
		if (typeof string !== 'string' || typeof padChar !== 'string' || padChar.length !== 1 || typeof left !== 'boolean') { return false; }

		var padFunction = left ? Array.prototype.unshift : Array.prototype.push;

		var padCount = length - string.length;
		var finalString = [string];
		while (padCount > 0) {
			padFunction.call(finalString, padChar);
			padCount--;
		}

		return finalString.join('');
	}


	// Validates an e-mail address
	_validEmail = /^[^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*@(\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,})$/i;
	this.isValidEmail = function(email) {
		if (typeof email !== 'string') { return false; }

		return _validEmail.test(email);
	}


	// Validates a date
	this.isValidDate = function(date, longDay, longMonth, longYear, delimiter, internationalFormat) {
		if (typeof date !== 'string') { return false; }

		if (typeof longDay !== 'boolean') { longDay = false; }
		if (typeof longMonth !== 'boolean') { longMonth = false; }
		if (typeof longYear !== 'boolean') { longYear = false; }


		var day = ['(0', (longDay ? '' : '?'), '[1-9]|[12][0-9]|3[01])'];
		var year = ['(19|20)', (longYear ? '' : '?'), '\\d\\d'];
		if (typeof delimiter !== 'string') { delimiter = '[-\\/.]'; }
		delimiter = [delimiter];

		var dateRegEx;
		if (typeof internationalFormat !== 'boolean') {
			// Accept both US and international formats
			dateRegEx = [].concat(['^'], day, delimiter, day, delimiter, year, ['$']);
		} else {
			var month = ['(0', (longMonth ? '' : '?'), '[1-9]|1[0-2])'];
			if (internationalFormat) {
				dateRegEx = [].concat(['^'], day, delimiter, month, delimiter, year, ['$']);
			} else {
				dateRegEx = [].concat(['^'], month, delimiter, day, delimiter, year, ['$']);
			}
		}

		console.log(dateRegEx.join(''));
		return new RegExp(dateRegEx.join('')).test(date);
	}


	// Generates Locally Unique IDs (length parameter is optional)
	this.generateNumericID = function(length) {
		if (typeof length !== 'undefined' && typeof length !== 'number') { return false; }

		if (typeof length === 'undefined') {
			length = 20;	// Maximum length before the browser uses scientific notation
		}
		return Math.floor(Math.random() * Math.pow(10, length));
	}


	/* Like typeof, but can tell different types of built-in objects apart
	Adapted from jQuery 1.5.2 */
	this.type = function(object) {
		var parameterType = typeof object;
        if (parameterType !== 'object') {
            return parameterType;
        } else {
			if (object instanceof Date) {
				return 'date';
			} else if (object instanceof Array) {
				return 'array';
			} else if (object instanceof RegExp) {
				return 'regexp';
			} else {
				return 'object';
			}
        }
	};


    /* Reads a cookie
	Adapted from JQuery Cookie: https://github.com/carhartl/jquery-cookie 7/8/11 Snapshot */
    this.readCookie = function(name) {
        if (typeof name !== 'string') { return false; }

        var cookieParts = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
        return cookieParts !== null ? decodeURIComponent(cookieParts[1]) : null;
    };


    // Writes a cookie (Adapted from JQuery Cookie: https://github.com/carhartl/jquery-cookie 7/8/11 Snapshot)
    this.writeCookie = function(name, value, options) {
        if (typeof name !== 'string') { return false; }

        switch (typeof value) {
            case 'string':  // Ideal
                break;

            case 'undefined':   // Parameter wasn't passed, set a cookie with no value
                value = '';
                break;

            case 'object':
                if (value === null) {   // Treat null as an intention to set a cookie with no value
                    value = '';
                } else {    // We could JSON.stringify all other objects, but then we need to duck punch JSON.stringify into older browsers, let the client app deal with that
                    return false;
                }
                break;

            default:    // Cast other primitives to string
                value = String(value);
                break;
        }

        if (typeof options !== 'object') { options = {}; }

        return (document.cookie = [
            encodeURIComponent(name) + '=' + (value !== '' ? encodeURIComponent(value) : ''),
            options.expires instanceof Date ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            typeof options.path === 'string' ? '; path=' + options.path : '',
            typeof options.domain === 'string' ? '; domain=' + options.domain : '',
            typeof options.secure !== 'undefined' && options.secure ? '; secure' : ''
        ].join(''));
    };


    // Deletes a cookie
    this.deleteCookie = function(name, options) {
        if (typeof options !== 'object') { options = {}; }

        options.expires = new Date(0);    // Set cookie expiration to epoch
        return thatLib.writeCookie(name, '', options) ? true : false;
    }


	/* A crude way of determining if an object is a window
	Taken from jQuery 1.5.2 */
	this.isWindow = function(object) {
		return object && typeof object === "object" && "setInterval" in object;
	};

	// Adapted from isPlainObject in jQuery 1.5.2
	this.isDOMElement = function(object) {
		return object && (thatLib.type(object) === 'object') && (object.nodeType || thatLib.isWindow(object));
	};


	/* typeof returns "object" for arrays, use this function instead
	Taken from jQuery 1.5.2 */
	this.isArray = function(object) {
		return thatLib.type(object) === 'array';
	};


	/* Checks if object was created using "{}" or "new Object()"
	Taken from jQuery 1.5.2 */
	this.isPlainObject = function(object) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (typeof object !== 'object' || thatLib.type(object) !== "object" || object.nodeType || thatLib.isWindow(object)) {
			return false;
		}

		// Not own constructor property must be Object
		if (object.constructor &&
			!Object.prototype.hasOwnProperty.call(object, "constructor") &&
			!Object.prototype.hasOwnProperty.call(object.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up, if last one is own, then all properties are own.
		var key;
		for (key in object) {}

		return typeof key === 'undefined' || Object.prototype.hasOwnProperty.call(object, key);
	};

	/* Checks if object is a jquery object (as opposed to native DOM element) */
	this.isJqueryElement = function(object) {
		return jQuery && object instanceof jQuery;
	}

	/* Clones an object
	source is the object to clone
	deep is a boolean signifying whether or not to perform a recursive copy
	Adapted from jQuery 1.5.2's extend called with parameters (deep, {}, source) */
	this.cloneObject = function(source, deep) {
		if (typeof source === 'undefined' || source === null) { return source; }
		if (typeof deep === 'undefined') { deep = false; }

		var clone = (thatLib.isArray(source) ? [] : {});

		for (name in source) {
			if (typeof source[name] !== 'undefined' && source !== null) {
				if (deep && (thatLib.isArray(source[name]) || thatLib.isPlainObject(source[name]))) {
					clone[name] = thatLib.cloneObject(source[name], deep);  // Never move original objects, clone them
				} else {    // Shallow copy primitives or if in shallow copy mode
					clone[name] = source[name];
				}
			}
		}

		// Return the clone
		return clone;
	};


	/* Ignore Earlier Callbacks v1.0
	Cancels earlier callbacks that haven't been invoked yet for the given id.
	This is especially useful when UI elements can trigger async calls directly.
	Wrapping the callback in this function will prevent it from being called repeatedly.
	This becomes very important for asynchronous calls because the responses are not guaranteed to
	arrive in the same order in which the requests were sent.
	Usage:
	asyncCall(parameters, fxcm.lib.ignoreEarlierCallbacks(callback, id)); */
	var _callbacksCount = {};

	this.ignoreEarlierCallbacks = function(callback, id) {
		if (typeof id === 'undefined') { id = callback; }

		if (typeof _callbacksCount[id] === 'undefined') { _callbacksCount[id] = 0; }
		_callbacksCount[id]++;

		var callbackWrapper = {};
		callbackWrapper.index = _callbacksCount[id];
		callbackWrapper.f = function() {
			if (_callbacksCount[id] === callbackWrapper.index) {
				callback.apply(this, arguments);
			}
		};
		return callbackWrapper.f;
	};


	// Queues callback functions to be executed in FIFO order
	var _callbacksQueues = {};
	this.queueCallback = function(callback, id) {
		if (typeof id === 'undefined') { id = callback; }

		if (typeof _callbacksQueues[id] === 'undefined') { _callbacksQueues[id] = []; }
		_callbacksQueues[id].push(callback);

		return function() {
			while (_callbacksQueues[id].length > 0) {
				_callbacksQueues[id].shift().apply(this, arguments);
			}
		};
	};


	// Stacks callback functions to be executed in FILO order
	var _callbacksStacks = {};
	this.stackCallback = function(callback, id) {
		if (typeof id === 'undefined') { id = callback; }

		if (typeof _callbacksStacks[id] === 'undefined') { _callbacksStacks[id] = []; }
		_callbacksStacks[id].push(callback);

		return function() {
			while (_callbacksStacks[id].length > 0) {
				_callbacksStacks[id].pop().apply(this, arguments);
			}
		};
	};


	// Performs an AJAX POST request
	this.ajaxPost = function(URL, postData, callback) {
		if (typeof postData === 'undefined') { postData = ''; }

		if (typeof postData === 'object') {
			if (!(postData instanceof Array)) {
				var dataArray = [];

				for (var field in postData) {
					if (dataArray.length > 0) {
						dataArray.push('&');
					}
					dataArray.push(field, '=', postData[field]);
				}

				postData = dataArray;
			}

			postData = postData.join('');
		}

		if (typeof URL !== 'string' || typeof postData !== 'string') {
			return false;
		}

		if (document.location.host !== thatLib.getHost(URL)) { return false; }	// Cannot perform cross-domain POSTs

		var httpRequest = thatLib.getAJAXObject();	// The XMLHttpRequest object is recreated on every call to workaround an IE cache problem
		if(!httpRequest) { return false; }	// The browser doesn't support AJAX

		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
		}

		// Workaround for IE caching issue
		URL+= (url.indexOf('?') === -1 ? '?' : '&') + 'cacheBuster=' + thatLib.generateNumericID();

		// Open the connection
		httpRequest.open('POST', URL, true);

		// Set the proper headers
		httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		httpRequest.setRequestHeader('Content-length', postData.length);
		httpRequest.setRequestHeader('Connection', 'close');

		httpRequest.onreadystatechange = function () {	// Callback for handling the response
			if (httpRequest.readyState === 4) {	// Response has been fully received
				if (httpRequest.status === 200) {	// Successful submission
					if (httpRequest.responseText) {
						if (typeof callback === 'function') {
							callback.call(this, httpRequest.responseText);
						}
					}
				}
			}
		}

		httpRequest.send(postData);
	};


	// Extracts the hostname from a URL
	this.getHost = function (URL) {
		if (typeof URL !== 'string') { return false; }

		var host = URL.match(/^(?:(?:.*:)?\/\/)?([^/]+)/);
		if (!host) { return false; }	// Regex didn't match

		return host[1];
	};


	// Instantiates a browser-specific AJAX communication object
	this.getAJAXObject = function() {
		if (typeof ActiveXObject !== 'undefined') {	// Check for IE's ActiveX object
			try {
				var http = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					var http = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {
					var http = false;
				}
			}
		} else if (typeof XMLHttpRequest === 'function') {	// Use XMLHttpRequest if ActiveX is not available
			try {
				var http = new XMLHttpRequest();
			} catch (e) {
				var http = false;
			}
		} else {	// The browser does not support AJAX communication
			var http = false;
		}

		return http;
	};


	// Loads a script dynamically and invokes callback after it loads
	this.getScript = function(URL, callback) {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		if (typeof callback === 'function') {
			thatLib.addLoadHandler(script, callback);
		}
		//script.setAttribute('src', encodeURI(URL));
		script.setAttribute('src', URL);
		thatLib.attachElement(script);
	};


	// Loads a URL dynamically and invokes callback after it loads
	this.getURL = function(URL, callback) {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('style', 'display:none');
		if (typeof callback === 'function') {
			thatLib.addLoadHandler(iframe, callback);
		}
		iframe.setAttribute('src', URL);
		thatLib.attachElement(iframe);
	};


	// send data to URL via POST
	this.postURL = function(URL, data, callback) {
		if( typeof URL !== 'string' ) return false;

		callback = typeof data === 'function' ? data : ( typeof callback === 'function' ? callback : function(){} );
		data = typeof data === 'object' ? data : {};

		$.ajax(
			{
				'url' : URL,
				'data' : data,
				'method' : 'POST',
				'success' : function( data, status ) {
					callback( true, data, status );
				},
				'error' : function( jqXHR, desc, e ) {
					callback( false, desc, e );
				}
			}
		);
	};


	/* Attaches an element to the current document
	Taken from jQuery 1.5.2
	Inspired by code by Andrea Giammarchi
	http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html */
	this.attachElement = function(element) {
		var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

		head.appendChild(element);
	};


	/* Parses ISO-8601 dates into javascript Date objects
	Adapted from Colin Snover's <http://zetafleet.com> Date.parse with progressive enhancement for ISO-8601, version 2 */
	this.parseISO8601 = function(ISO8601) {
		var timezoneOffset = 0, dateParts;
		if (dateParts = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(ISO8601)) {
			if (dateParts[4]) {  // Includes the time
				if (dateParts[8] !== 'Z') {
					timezoneOffset = +dateParts[10] * 60 + (+dateParts[11]); // timezoneOffset = Timezone Hours * 60 + Timezone Minutes

					if (dateParts[9] === '+') {
						timezoneOffset*= -1;  // If the timezone is ahead of UTC, the offset must be negative
					}
				}

				dateParts[7] = +dateParts[7].substr(0, 3);
			} else {    // Date only
				dateParts[4] = 0;   // Hours
				dateParts[5] = new Date().getTimezoneOffset();   // Set minutes to offset from UTC so that resulting date will be midnight in the local time zone
				dateParts[6] = 0;   // Seconds
				dateParts[7] = 0;   // Milliseconds
			}

			// Date.UTC returns the milliseconds since epoch in UTC time, which is then used to initialize a Date object to prevent local time zone issues
			return new Date(Date.UTC(+dateParts[1], +dateParts[2] - 1, +dateParts[3], +dateParts[4], +dateParts[5] + timezoneOffset, +dateParts[6], dateParts[7]));
		} else {
			return false;   // Parameter did not meet ISO-8601 format specifications
		}
	};


    // Removes illegal characters and invalid prefixes (numbers, --, or -number) from text to generate a valid CSS class name
    this.generateCSSClassName = function(text) {
        if (typeof text !== 'string' && typeof text !== 'number') { return ''; }
		text = String(text);

        text = text.replace(/[^-a-zA-Z_0-9]/g,'_');
        var prefixTrimmed = text.replace(/^([0-9]|-[^a-zA-Z_])*/, '');

        return (prefixTrimmed.length >= 2 ? prefixTrimmed : 'class_' + text);
    };


    // Removes illegal characters and invalid prefixes (any non-letter) from text to generate a valid CSS class name
    this.generateCSSID = function(text) {
        if (typeof text !== 'string' && typeof text !== 'number') { return ''; }
		text = String(text);

        text = text.replace(/[^-a-zA-Z_0-9:.]/g,'_');
        var prefixTrimmed = text.replace(/^[^a-zA-Z]*/, '');

        return (prefixTrimmed.length >= 0 ? prefixTrimmed : 'id_' + text);
    };


	// Removes illegal characters and invalid prefixes (anything other than letters, $, or _) from text to generate a valid javascript function name
    this.generateFunctionName = function(text) {
        if (typeof text !== 'string' && typeof text !== 'number') { return ''; }
		text = String(text);

		var illegalSuffixChars = /[^a-zA-Z0-9_]/g;

		var prefix = text.charAt(0);
		if (prefix.match(/[a-zA-Z$_]/)) {
			return prefix + text.substr(1).replace(illegalSuffixChars,'_');
		} else {
			return 'function_' + text.replace(illegalSuffixChars,'_');
		}
    };


    // Calculates the timestamp for midnight of the parameter
    this.midnightTimestamp = function(date) {
        switch (typeof date) {
			case 'object':
				if (!(date instanceof Date)) {
					return false;
				}
				break;

			case 'number':
			case 'string':
				date = new Date(date);
				break;

			case 'undefined':
			default:
			    return false;
		}

        return date.getTime() - (((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000 + date.getMilliseconds());
    };


    // Removes whitespace from the beginning and end of a string
    this.trim = function(text) {
        if (typeof text !== 'string') { return false; }

        if (String.prototype.trim) {    // Use native implementation if it exists
            return String.prototype.trim.call(text);
        } else {
            return text.replace(/^\s+/, '').replace(/\s+$/, '');
        }
    }


    /* Adapted from jQuery 1.6.1
    Adds one or more space-separated classes to element */
    this.addClass = function(element, classNames) {
        if (typeof classNames !== 'string') { return false; }

        switch (typeof element) {
            case 'object':
                if (!thatLib.isDOMElement(element)) {
                    return false;
                }
                break;

            case 'string':
                element = document.getElementById(element);
                if (element === null) {
                    return false;
                }
                break;

            default:
                return false;
        }

        if (classNames === '') { return true; }

        if (!element.className) {
            element.className = classNames;
        } else {
            var className = ' ' + element.className + ' ';
            var setClass = element.className;

            classNames = classNames.split(/\s+/);
            for (var classNamesIndex = 0; classNamesIndex < classNames.length; classNamesIndex++) {
                if (className.indexOf(' ' + classNames[classNamesIndex] + ' ') < 0 ) {
                    setClass += ' ' + classNames[classNamesIndex];
                }
            }

            element.className = setClass;
        }

        return true;
    };


    /* Adapted from jQuery 1.6.1
    Removes one or more space-separated classes to element */
    this.removeClass = function(element, classNames) {
        if (!(typeof classNames === 'string' || typeof classNames === 'undefined')) { return false; }

        switch (typeof element) {
            case 'object':
                if (!thatLib.isDOMElement(element)) {
                    return false;
                }
                break;

            case 'string':
                element = document.getElementById(element);
                if (element === null) {
                    return false;
                }
                break;

            default:
                return false;
        }

        if (!element.className) { return true; }
        if (typeof classNames === 'undefined' || classNames === '') {
            element.className = '';
            return true;
        }

        classNames = classNames.split(/\s+/);
        var className = (' ' + element.className + ' ').replace(/[\n\r\t]/g, ' ');

        for (var classNamesIndex = 0; classNamesIndex < classNames.length; classNamesIndex++) {
            className = className.replace(' ' + classNames[classNamesIndex] + ' ', ' ');
        }

        element.className = thatLib.trim(className);

        return true;
    };


    /* Translates Date.getDay() to the name of the day.
    If shortForm is true, only returns the first 3 characters */
    var _dayNames = {};
    _dayNames['english'] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	this.formatDay = function(day, shortForm, language) {
		if (typeof language !== 'string' || typeof _dayNames[language.toLowerCase()] === 'undefined') {
			language = 'english';
		}

        if (typeof shortForm === 'undefined') {
            shortForm = false;
        }

        var dayName = _dayNames[language.toLowerCase()][day];
		if (shortForm) {
            return dayName.substr(0,3);
        } else {
            return dayName;
        }
	};


    /* Translates Date.getMonth() to the name of the month.
    If shortForm is true, only returns the first 3 characters */
	var _monthNames = {};
    _monthNames['english'] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.formatMonth = function(month, shortForm, language) {
		if (typeof language !== 'string' && typeof _monthNames[language] === 'undefined') {
			language = 'english';
		}

        if (typeof shortForm === 'undefined') {
            shortForm = false;
        }

        var monthName = _monthNames[language.toLowerCase()][month];
		if (shortForm) {
            return monthName.substr(0,3);
        } else {
            return monthName;
        }
	};

	// Attaches events with cross-browser support, properly setting the context of this
	this.addEventHandler = function(element, event, handler, capture) {
		if (!thatLib.isDOMElement(element) || typeof event !== 'string' || typeof handler !== 'function') { return false; }
		if (event.substr(0,2) === 'on') { event = event.substr(2); }	// Strip the 'on' at the beginning of the event if it is present

		if (typeof element.addEventListener === 'function') {	// Primary way of adding event listeners
			if (typeof capture === 'undefined') { capture = false; }
			return element.addEventListener(event, handler, capture);
		} else if (typeof element.attachEvent !== 'undefined') {	// Special case for IE (also, strangely typeof element.attachEvent = 'object' in IE)
			return element.attachEvent('on' + event, function(e) { return handler.call(element, e); });
		} else {
			return false;
		}
	};


	// Adds an onload handler for script and iframe elements (supports IE)
	var _addLoadHandlerCallbackFired = {};
	this.addLoadHandler = function(element, callback) {
		if (typeof callback !== 'function') { return false; }

		var callbackID = thatLib.generateNumericID();	// Generate an ID for the callback
		_addLoadHandlerCallbackFired[callbackID] = false;	// Initialize its state as not fired
		callback = thatLib.queueCallback(callback, 'fxcm.lib.addLoadHandler:' + callbackID);	// Support multiple callbacks on the same element
		var wrappedCallback = function() {	// Wrap callback to set state to fired when called
				_addLoadHandlerCallbackFired[callbackID] = true;
				return callback.call(element);
			};

		// Attach standard load handler
		thatLib.addEventHandler(element, 'load', wrappedCallback);

		/* Hack to replicate element.onload in IE
		Adapted from Nick Spacek's code at https://gist.github.com/461797 */
		thatLib.addEventHandler(element, 'readystatechange', function() {
				if ((element.readyState === 'loaded' || element.readyState === 'complete') && _addLoadHandlerCallbackFired[callbackID] === false) {
					return wrappedCallback.call(element);
				}
			});

		return true;
	};


	/* Returns an object of name/value pairs for the contents of a form
	Inspired by jQuery 1.6.2's serializeArray() */
	var _selectTextareaRegEx = /^(?:select|textarea)/i;
	var _inputTypesRegEx = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;

	this.serializeForm = function(form) {
		// Dereference an ID
		if (typeof form === 'string') { form = document.getElementById(form); }

		// Confirm that form is a form element
		if (!(thatLib.isDOMElement(form) && form.tagName === 'FORM')) { return false; }

		var serializedForm = {};
		for (elementIndex = 0; elementIndex < form.elements.length; elementIndex++) {
			var element = form.elements[elementIndex];

			if (element.name && !element.disabled && (element.checked || _selectTextareaRegEx.test(element.tagName) || _inputTypesRegEx.test(element.type))) {
				serializedForm[element.name] = thatLib.inputValue(element);
			}
		}

		return serializedForm;
	};


	/*	Returns the value of an input (supports all types)
	Inspired by jQuery 1.6.2's val() */
	var _hardReturnRegEx = /\r/g;

	this.inputValue = function(element) {
		if (!thatLib.isDOMElement(element)) { return false; }

		switch(element.tagName) {
			case 'SELECT':
				var selectedIndex = element.selectedIndex;
				if (selectedIndex < 0) { return null; }

				if (element.type === 'select-one') {
					var option = element.options[selectedIndex];

					if (option.selected && thatLib.isEnabledOption(option)) {
						return thatLib.inputValue(option);
					} else {
						return null;
					}
				} else {
					var options = element.options;

					var values = [];
					for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
						var option = options[optionIndex];

						if (option.selected && thatLib.isEnabledOption(option)) {
							values.push(thatLib.inputValue(option));
						}
					}

					if (values.length === 0) {
						return null;
					} else if (values.length === 1) {
						return values[0];
					} else {
						return values;
					}
				}

				return null;

			case 'OPTION':
				var attrValue = element.attributes.value;
				if (!attrValue || attrValue.specified) {
					return element.value;
				} else {
					return element.text;
				}

			case 'INPUT':
				var value = element.value;
				if (typeof value === 'string') {
					return value.replace(_hardReturnRegEx, '');
				} else if (value == null) {
					return '';
				} else {
					return value;
				}

			case 'TEXTAREA':
				var value = element.value;
				if (value == null) {
					return '';
				} else {
					return value;
				}

			default:
				return false;
		}
	};


	// Checks if the option element has been disabled or is in a disabled optgroup
	this.isEnabledOption = function(option) {
		return (fxcm.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) &&
			(!option.parentNode.disabled || option.parentNode.tagName === 'OPTGROUP');
	};


	/* Cancels events in a cross-browser compatible way
	Usage:

	return fxcm.lib.cancelEvent(event);	*/
	this.cancelEvent = function(event) {
		if (typeof event !== 'object') { return false; }

		// Cancel the default action
		if (typeof event.preventDefault === 'function') {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		// Stop the event from bubbling
		if (typeof event.stopPropagation === 'function') {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}

		// Return false
		return false;
	}

	// Returns a copy of the array with numberOfElements shifted off
	this.shiftArray = function(array, numberOfElements) {
		if (typeof numberOfElements === 'undefined') {
			numberOfElements = 1;
		} else 	if (typeof numberOfElements !== 'number' || numberOfElements < 0) {
			return false;
		}

		var returnArray = [];
		for (var index = numberOfElements; index < array.length; index++) {
			returnArray.push(array[index]);
		}

		return returnArray;
	};

	// Returns a copy of the array with numberOfElements popped off
	this.popArray = function(array, numberOfElements) {
		if (typeof numberOfElements === 'undefined') {
			numberOfElements = 1;
		} else 	if (typeof numberOfElements !== 'number' || numberOfElements < 0) {
			return false;
		}

		var returnArray = [];
		for (var index = array.length - numberOfElements - 1; index >= 0; index--) {
			returnArray.unshift(array[index]);
		}

		return returnArray;
	};

	// Dynamically adds style to the current document
	this.addStyle = function() {
		var styleElement = thatLib.createStyleElement.apply(this, arguments);
		return thatLib.attachElement(styleElement);
	};

	// Dynamically creates a style element
	this.createStyleElement = function(id, style) {
		var styleContent = id + ' { ' + style + ' }';

		var styleElement = document.createElement('style');
		styleElement.type = 'text/css';

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = styleContent;
		} else {
			styleElement.appendChild(document.createTextNode(styleContent));
		}

		return styleElement;
	};

    // Returns the name of the current form being validated. Tracked as eVar23
    this.getFormName = function(currentForm) {
        return currentForm.getAttribute('name') || currentForm.getAttribute('id') || currentForm.parentNode.getAttribute('name') || currentForm.parentNode.getAttribute('id') || currentForm.parentNode.className || "Form Not Named";
    };

	// Returns the name or id for the form input field
	this.getFieldName = function( field ) {
		return field.getAttribute('name') || field.getAttribute('id') || field.getAttribute('type') || field.className || "Field needs identifier";
	};
}();
// The calendar class queries a Google Calendar and generates HTML
fxcm.Calendar = fxcm.lib.makeClass();
fxcm.Calendar.prototype.init = function(timeframe, displayCallback, calendarCallback, googCalendar, apiKey) {
	var thatCalendar = this;

	var _settings = {
		categories: {},
		types: {}
	};

	var _defaults = {
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		months_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		days_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],		
		text_join_title: 'Join Webinar'
	};

	/**
	 * Requests from the fxcm calendars account events relevant to the timeframe.
	 * @param timeframe: "today" | "previousWeek" | "thisWeek" | "nextWeek" | "featured"
	 * @param displayCallback: function used to display anything to the user; will be passed the start and end dates
	 * @param calendarCallback: function used to process the items retrieved from the calendar; will be passed the array of items
	 * @param googCalendar: google email address of calednar to poll, with URL-safe characters, e.g. %40
	 * @param apiKey: public API key
	 * @returns 
	 */

	function _outputTime24h(time) {
		return _padZero(time.getHours()) + ":" + _padZero(time.getMinutes());
	}

	function _eventTypeToClass(type) {
		if (typeof(type) == "undefined") return "";
		if (type.toLowerCase() == "live client") return "live_client";
		return type.toLowerCase();
	}

	/**
	 * Handle values that are undefined
	 * @param str
	 * @returns
	 */
	function _coalesceOutput(str){
		return typeof(str) == "undefined" ? "&nbsp" : str;
	}


	/**
	 * Look up translated value in the provided array, and if not found, return itself
	 */
	function _translateValue(translationArray, key) {
		var value = _coalesceOutput(key);
		if (translationArray === null) {return value;}
		var lookup = translationArray[value.toLowerCase().trim()];
		return (typeof(lookup) !== "undefined" && lookup !== "") ? lookup : value;
	}

	function _parseDateTime(string) {
		var split = string.split("T");
		var dateElements = split[0].split("-");
		var timeElements = split[1].substring(0,8).split(":");
		return new Date(dateElements[0], (parseFloat(dateElements[1]) - 1 + 12) % 12, dateElements[2], timeElements[0], timeElements[1], timeElements[2]);
	}

	function _getStartOfLastWeek() {
		var start = _getStartOfThisWeek();
		start.setDate(start.getDate() - 7);
		return start;
	}

	function _getStartOfNextWeek() {
		var start = _getStartOfThisWeek();
		start.setDate(start.getDate() + 7);
		return start;
	}

	function _getStartOfThisWeek() {
		var datetime = new Date();
		datetime.setDate(datetime.getDate() - datetime.getDay());
		_zeroOut(datetime);
		return datetime;
	}

	function _getStartOfToday() {
		var datetime = new Date();
		_zeroOut(datetime);
		return datetime;
	}

	function _getEndOfLastWeek() {
		var end = _getEndOfThisWeek();
		end.setDate(end.getDate() - 7);
		return end;
	}

	function _getEndOfNextWeek() {
		var end = _getEndOfThisWeek();
		end.setDate(end.getDate() + 7);
		return end;
	}

	function _getEndOfThisWeek() {
		var datetime = new Date();
		datetime.setDate(datetime.getDate() + (6 - datetime.getDay() + 1));
		_zeroOut(datetime);
		return datetime;
	}

	function _getEndOfToday() {
		var datetime = new Date();
		datetime.setDate(datetime.getDate() + 1);
		_zeroOut(datetime);
		return datetime;
	}

	function _zeroOut(datetime) {
		datetime.setHours(0);
		datetime.setMinutes(0);
		datetime.setSeconds(0);
		datetime.setMilliseconds(0);
	}

	function formatHours(n) {
		if (n % 12 === 0) return 12;
		return n % 12;
	}

	function _padZero(n) { return n <= 9 ? "0" + n : n; }

	function _padTwoZero(n) {
		if (n <= 9) {
			return "00" + n;
		} else if (n <= 99) {
			return "0" + n;
		} else {
			return n;
		}
	}

	this.requestEvents = function(timeframe, displayCallback, calendarCallback, googCalendar, apiKey) {
		if (typeof(googCalendar) == "undefined") googCalendar = "fxcmcalendars%40gmail.com";
		if (typeof(apiKey) == "undefined") apiKey = "AIzaSyAd-5yprrBP9QEM4fS-PWCBNeMMdv3Jrlo";
		var url = "https://www.googleapis.com/calendar/v3/calendars/" + googCalendar + "/events?key=" + apiKey + "&maxResults=200&orderBy=startTime&singleEvents=true&timeZone=" + jstz.determine().name();
		var start;
		var end;
		switch(timeframe) {
		case "today":
			start = _getStartOfToday();
			end = _getEndOfToday();
			break;
		case "previousWeek":
			start = _getStartOfLastWeek();
			end = _getEndOfLastWeek();
			break;
		case "thisWeek":
			start = _getStartOfThisWeek();
			end = _getEndOfThisWeek();
			break;
		case "nextWeek":
			start = _getStartOfNextWeek();
			end = _getEndOfNextWeek();
			break;
		case "featured":
			start = new Date();
			end = _getEndOfNextWeek();
			break;
		default:
			start = _getStartOfThisWeek();
			end = _getEndOfThisWeek();
		}
		if (start.toISOString) {
			url += "&timeMin=" + start.toISOString() + "&timeMax=" + end.toISOString();
		} else {
			var offsetStart = new Date(start.getTime());
			offsetStart.setMinutes(offsetStart.getMinutes() + offsetStart.getTimezoneOffset());
			var startString = offsetStart.getFullYear() + "-" + _padZero(offsetStart.getMonth() + 1) + "-" + _padZero(offsetStart.getDate()) + "T" + _padZero(offsetStart.getHours()) + ":" + _padZero(offsetStart.getMinutes()) + ":" + _padZero(offsetStart.getSeconds()) + "." + _padTwoZero(offsetStart.getMilliseconds()) + "Z";
			var offsetEnd = new Date(end.getTime());
			offsetEnd.setMinutes(offsetEnd.getMinutes() + offsetEnd.getTimezoneOffset());
			var endString = offsetEnd.getFullYear() + "-" + _padZero(offsetEnd.getMonth() + 1) + "-" + _padZero(offsetEnd.getDate()) + "T" + _padZero(offsetEnd.getHours()) + ":" + _padZero(offsetEnd.getMinutes()) + ":" + _padZero(offsetEnd.getSeconds()) + "." + _padTwoZero(offsetEnd.getMilliseconds()) + "Z";
			url += "&timeMin=" + startString + "&timeMax=" + endString;
		}
		displayCallback(start, end);

		$.ajax({
			async: true,
			cache: false,
			crossDomain: true,
			type: "GET",
			url: url,
			dataType: "jsonp",
			success: function (data) {
				calendarCallback(data.items);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(errorThrown); console.log(textStatus); console.log(XMLHttpRequest);
			}
		});
	};

	/**
	 * Outputs an event in HTML form.  Default for DFX; can/should be overwritten for other usage.
	 * @param event
	 * @returns {String}
	 */
	this.outputEvent = function(event) {
		var output = "";
		var eventStart = _parseDateTime(event.start.dateTime);
		var eventItems = thatCalendar.parseEventDescription(event.description);
		
		output += "<li class='event'>";
		output += "<a class='eventLink' href='" + _coalesceOutput(eventItems["room-link"]) + "' target='_blank' title='" + _defaults.text_join_title + "'></a>";
		output += "<ul class='eventDescr'>";
		output += "<li class='date'><span><strong>" + _defaults.days[eventStart.getDay()] + "</strong> " + _defaults.months[eventStart.getMonth()] + " " + eventStart.getDate() + "</span></li>";
		output += "<li class='time'>" + formatHours(eventStart.getHours()) + ":" + _padZero(eventStart.getMinutes()) + (eventStart.getHours() >= 12 ? "P" : "A") + "</li>";
		output += "<li class='title'>" + event.summary + "</li>";
		output += "<li class='host'>" + _coalesceOutput(eventItems["host"]) + "</li>";
		output += "<li class='category'>" + _translateValue(_settings.categories, eventItems["category"]) + "</li>";
		output += "<li class='type " + _eventTypeToClass(eventItems["type"]) + "'>" + _translateValue(_settings.types, eventItems["type"]) + "</li>";
		output += "</ul></li>";
		
		return output;
	};

	this.parseEventDescription = function(eventDescription) {
		if (typeof eventDescription === "undefined") {return [];}
		var descriptionItems =[];
		var tokens = eventDescription.split("\n");
		for (var i = 0; i < tokens.length; i++) {
			var split = tokens[i].split(":");
			var splitLength = split.length;
			var key = split[0].toLowerCase();
			var val = "";
			for (var j = 1; j < splitLength; j++) {
				val += $.trim(split[j]);
				if (splitLength >= 3 && j < splitLength - 1) val += ":";
			}
			descriptionItems[key] = val;
		}
		return descriptionItems;
	};

	this.outputFeaturedEvent = function(event) {
		var output = "";
		var eventStart = _parseDateTime(event.start.dateTime);
		var eventItems = thatCalendar.parseEventDescription(event.description);
		
		output += "<li class='featured-event'>";
		output += "<i class='ico ico-simple-light-grey ico-star-lg'></i>";
		output += "<span class='date'>" + _defaults.days_full[eventStart.getDay()] + ", " + _defaults.months_full[eventStart.getMonth()] + " " + eventStart.getDate() + "</span> ";
		output += formatHours(eventStart.getHours()) + ":" + _padZero(eventStart.getMinutes()) + (eventStart.getHours() >= 12 ? "P" : "A");
		output += "<a href='" + _coalesceOutput(eventItems["room-link"]) + "' target='_blank'>" + event.summary + "</a>";
		output += "</li>";
		return output;
	};

};


fxcm.Demo = fxcm.lib.makeClass();
fxcm.Demo.prototype.init = function(rb, form, successCallback, currency) {
	var thatDemo = this;

	var _settings = {};
	_settings.submissionTargets = {};
	_settings.submissionTargets.get = [];
	_settings.submissionTargets.post = [];
	_settings.submissionTargets.JSONP = [];
	_settings.submissionTargets.eloqua = [];

	var _timeoutID = null;
	var _requestsQueue = [];

	this.setRB = function(rb) {
		if (typeof rb !== 'string') { return false; }

		return _settings.rb = rb.toLowerCase();
	};

	this.getRB = function() {
		return _settings.rb;
	};

	this.setDB = function(rb, currency) {
		if (typeof rb !== 'string') { return false; }

		var _db = _dbLookup(rb, currency);

		if(!_db){
			return false;
		} else {
			return _settings.db = _db;
		}
	};

	this.getDB = function() {
		return _settings.db;
	};

	this.setCurrency = function(currency){
		if (typeof currency !== 'string') { return false; }

		return _settings.currency = currency.toUpperCase();
	};

	this.getCurrency = function(){
		return _settings.currency;
	};

	this.setConversionData = function() {
		var _rb = thatDemo.getRB();
		var _data = {};

		if (typeof fxcm.registration.demoRBMap !== 'object' || typeof fxcm.registration.demoRBMap[_rb] !== 'object')  { return false; }

		var _raw = fxcm.registration.demoRBMap[_rb];

		// feed values into object for returning
		_data.rb = _rb;
		_data.database = thatDemo.getDB();
		_data.currency = thatDemo.getCurrency();

		// check for an mt4 server
		if (typeof _raw.server === 'object' && typeof _raw.server[_data.currency] === 'string') {
			_data.server = _raw.server[_data.currency];
		}

		// check for platform
		if (typeof _raw.platform === 'string') {
			_data.platform = _raw.platform;
		}
		// check for product
		if (typeof _raw.product === 'string') {
			_data.product = _raw.product;
		}
		// check for execution
		if (typeof _raw.execution === 'string') {
			_data.execution = _raw.execution;
		}

		return _settings.conversionData = _data;
	};

	this.getConversionData = function() {
		return _settings.conversionData;
	};

	this.setCountry = function(country) {
		if (typeof country !== 'string') { return false; }

		_settings.country = country;
		_settings.rb = _rbLookup();

		return _settings.country;
	};

	this.getCountry = function() {
		return _settings.country;
	};

	this.setAccountType = function(accountType) {
		if (typeof accountType !== 'string') { return false; }

		_settings.accountType = accountType;
		_settings.rb = _rbLookup();

		return _settings.accountType;
	};

	this.getAccountType = function() {
		return _settings.accountType;
	};

	this.setCountryAccountType = function(country, accountType) {
		if (typeof country !== 'string' || typeof accountType !== 'string') { return false; }

		_settings.country = country;
		_settings.accountType = accountType;
		_settings.rb = _rbLookup();

		return {country: _settings.country, accountType: _settings.accountType};
	};

	this.setCampaign = function(campaign) {
		if (typeof campaign !== 'string') { return false; }

		return _settings.campaign = campaign;
	};

	this.getCampaign = function() {
		return _settings.campaign;
	};

	this.setClientId = function( clientId ) {
		if (typeof clientId !== 'string') { return false; }

		return _settings.clientId = clientId ;
	};

	this.setFormName = function(name) {
		if (typeof name !== 'string') { return false; }

		return _settings.formName = name;
	};

	this.getFormName = function() {
		return _settings.formName;
	};

	/* Adds another submission target submitted with HTTP POST
	fieldMap is an object where the keys are the clientInfo field names to map and values are the submission target's expected field name
	additionalData is an object of key/value pairs that will be submitted along with the demo data
	valueMap is an object of field names, which each are objects containing key/value pairs mapping values to aliases
	If any Personally Identifiable Information (PII, e.g. name, address) is being passed, you should use a secure link (https) otherwise the data is passed as plain text */
	this.addPostSubmissionTarget = function(target, fieldMap, additionalData, callback, valueMap, extendOriginalFields) {
		return _addSubmissionTarget('post', target, fieldMap, additionalData, callback, valueMap, extendOriginalFields);
	};

	/* Adds another submission target submitted via a script tag
	fieldMap is an object where the keys are the clientInfo field names to map and values are the submission target's expected field names
	additionalData is an object of key/value pairs that will be submitted along with the demo data
	valueMap is an object of field names, which each are objects containing key/value pairs mapping values to aliases
	If any Personally Identifiable Information (PII, e.g. name, address) is being passed, you should use a secure link (https) otherwise the data is passed as plain text */
	this.addJSONPSubmissionTarget = function(target, fieldMap, additionalData, callback, valueMap, extendOriginalFields) {
		return _addSubmissionTarget('JSONP', target, fieldMap, additionalData, callback, valueMap, extendOriginalFields);
	};

	/* Adds another submission target submitted to Eloqua
	fieldMap is an object where the keys are the clientInfo field names to map and values are the submission target's expected field names
	additionalData is an object of key/value pairs that will be submitted along with the demo data */
	this.addEloquaSubmissionTarget = function(eloquaFormName, fieldMap, additionalData, callback, valueMap, extendOriginalFields) {
		return _addSubmissionTarget('eloqua', eloquaFormName, fieldMap, additionalData, callback, valueMap, extendOriginalFields);
	};

	this.getSubmissionTargets = function() {
		return _settings.submissionTargets;
	};

	this.setSuccessCallback = function(callback) {
		if (typeof callback !== 'function') { return false; }

		return _settings.successCallback = callback;
	};

	this.getSuccessCallback = function() {
		return _settings.successCallback;
	};

	this.setErrorCallback = function(callback) {
		if (typeof callback !== 'function') { return false; }

		return _settings.errorCallback = callback;
	};

	this.getErrorCallback = function() {
		return _settings.errorCallback;
	};

	this.checkFXTRStatus = function() {
		var callbackName = fxcm.lib.generateFunctionName(fxcm.lib.generateNumericID());

		window[callbackName] = _handleFXTRStatus;
		_timeoutID = setTimeout(_FXTRTimeout, 2000);	// Give FXTR Status 2 seconds to respond before defaulting to FXTR
		return fxcm.lib.getScript(thatDemo.FXTRStatusURL + '?callback=' + callbackName);
	};

	function _addSubmissionTarget(type, target, fieldMap, additionalData, callback, valueMap, extendOriginalFields) {
		var submissionTarget = {};

		if (typeof target === 'string') {
			submissionTarget[type === 'eloqua' ? 'formName' : 'target'] = target;
		} else {
			return false;
		}

		if (typeof fieldMap !== 'undefined') {
			if (typeof fieldMap === 'object') {
				submissionTarget.fieldMap = fieldMap;
			} else {
				return false;
			}
		}

		if (typeof additionalData !== 'undefined') {
			if (typeof additionalData === 'object') {
				submissionTarget.additionalData = additionalData;
			} else {
				return false;
			}
		}

		if (typeof callback !== 'undefined') {
			if (typeof callback === 'function') {
				submissionTarget.callback = callback;
			} else {
				return false;
			}
		}

		if (typeof valueMap !== 'undefined') {
			if (typeof valueMap === 'object') {
				submissionTarget.valueMap = valueMap;
			} else {
				return false;
			}
		}

		submissionTarget.extendOriginalFields = typeof extendOriginalFields !== 'boolean' ? true : extendOriginalFields;

		_settings.submissionTargets[type].push(submissionTarget);
		return submissionTarget;
	}

	function _getCampaign() {
		return fxcm.lib.readCookie( 'fxcmCampaign' );
	}

	function _getClientId() {
		return fxcm.lib.readCookie( 'fxcmGaClientId' );
	}

	function _getGaProperty() {
		return window.hasOwnProperty( 'gtmGaProperty' ) && typeof window.gtmGaProperty === 'string' && window.gtmGaProperty.length ?
		       window.gtmGaProperty : false;
	}

	function _FXTRTimeout() {
		_timeoutID = null;

		_settings.submissionTarget = 'fxtr';

		_submitRequests();
	}

	function _handleFXTRStatus(status) {
		if (_timeoutID !== null) {
			clearTimeout(_timeoutID);
		}

		if (status) {
			_settings.submissionTarget = 'fxtr';
		} else {
			_settings.submissionTarget = 'eloqua';
		}

		_submitRequests();
	}

	function _rbLookup(country, accountType) {
		if (typeof country === 'undefined') { country = _settings.country; }
		if (typeof accountType === 'undefined') { accountType = _settings.accountType || 'ts'; }

		if (typeof country !== 'string' || typeof accountType !== 'string') { return false; }

		switch(country) {
			case 'united_states':
			case 'american_samoa':
			case 'guam':
			case 'puerto_rico':
				switch(accountType) {
					case 'ts':
						return 'fxcm';

					case 'at':
						return 'active_trader';

					case 'tsg':
						return 'tsg_llc';

					case 'st':
						return 'strategy_trader_llc';

					default:
						return false;
				}

			case 'australia':
			case 'new_zealand':
				switch(accountType) {
					case 'ts':
						return 'fxcmau';

					default:
						return false;
				}

			case 'united_kingdom':
			default:
				switch(accountType) {
					case 'ts':
					default:
						return 'fxcmuk';
				}
		}
	}

	this.bindCountry = function(element) {
		// Dereference an id
		if (typeof element === 'undefined') {
			if (typeof _settings.bindTarget !== 'undefined') {
				element = _settings.bindTarget;
			} else {
				return false;
			}
		} else if (typeof element === 'string') {
			element = document.getElementById(element);
		}

		// Confirm that element is an element
		if (!fxcm.lib.isDOMElement(element)) { return false; }

		switch (element.tagName) {
			case 'SELECT':
				fxcm.lib.addEventHandler(element, 'change', _countryChangeHandler);
				return true;

			case 'FORM':
				for (var elementIndex = 0; elementIndex < element.elements.length; elementIndex++) {
					var formElement = element.elements[elementIndex];

					if (formElement.name.toLowerCase() === 'country' || formElement.name === 'demo.' + fxcm.Demo.prototype._demoFieldMap['country'].fxtrName || formElement.name === fxcm.Demo.prototype._demoFieldMap['country'].eloquaName) {
						fxcm.lib.addEventHandler(formElement, 'change', _countryChangeHandler);
						return true;
					}
				}
				return false;

			default:
				return false;
		}
	};

	function _countryChangeHandler(event) {
		return thatDemo.setCountry(fxcm.lib.inputValue(this));
	}

	this.bind = function(form) {
		// Dereference an id
		if (typeof form === 'string') {
			form = document.getElementById(form);
		}

		// Confirm that "form" is a form
		if (!(fxcm.lib.isDOMElement(form) && form.tagName === 'FORM')) {
			return false;
		}

		// Set the form name to the name attribute of the bind target if one hasn't been set already
		if (typeof _settings.formName === 'undefined') {
			thatDemo.setFormName(form.name);
		}

		// Attach submit handler
		_settings.bindTarget = form;
		return fxcm.lib.addEventHandler(form, 'submit', _submitHandler);
	};

	function _submitHandler(event) {
		// Set the form name to the name attribute of the bind target if one hasn't been set already
		if (typeof _settings.formName === 'undefined') {
			thatDemo.setFormName(this.name);
		}

		// Scrape data from the form
		var formData = fxcm.lib.serializeForm(this);

		// Map fxtr fields to their respective clientInfo name
		for (var field in fxcm.Demo.prototype._demoFieldMap) {
			if (typeof formData['demo.' + fxcm.Demo.prototype._demoFieldMap[field].fxtrName] !== 'undefined') {
				formData[field] = formData['demo.' + fxcm.Demo.prototype._demoFieldMap[field].fxtrName];
				delete formData['demo.' + fxcm.Demo.prototype._demoFieldMap[field].fxtrName];
			}
		}

		if (typeof event === 'object') {	// _submitHandler is handling a submit event
			thatDemo.submit(formData);	// Submit the request
			return fxcm.lib.cancelEvent(event);	// Cancel the form submission
		} else {	// _submitHandler was manually invoked by submit because a form was passed in
			return thatDemo.submit(formData, event);	// Submit the request, event is the callback in this case
		}
	}

	/* clientInfo can contain the following members:
	firstName (max of 50 characters)
	lastName (required): The client's last name (max of 50 characters)
	email (required): Must be a validly formatted email address (max of 50 characters)
	phone: May only use digits, letters, and the characters: +()_,.:-=* (max of 20 characters)
	phone2: May only use digits, letters, and the characters: +()_,.:-=* (max of 20 characters)
	imNetwork: Instant messaging network (aol, yahoo, icq, msn, other)
	imID: Instant messaging screen name (max of 255 characters)
	street (max of 50 characters)
	address2 (max of 255 characters)
	city (max of 50 characters)
	state: State or province (max of 50 characters)
	zip (max of 10 characters)
	country: Lower-case with underscores (white list)
	company (max of 255 characters)
	language: Preferred language (English, Traditional_Chinese, Simplified_Chinese, Bahasa_Malayu, Korean, Japanese, Vietnamese, Thai, Tagalog)
	accountType: Account type (individual, joint, corporate, partnership, trust)
	balance: Initial balance of the demo account (maximum of 13 digits before the decimal and 2 after)
	accounts: Number of accounts to create (1-9999)
	margin: Expected margin (0, less50000, 50000_100000, more100000)
	deposit: Intended funding amount for the future account (5000_24999, 25000_49999, 50000_99999, 100000_inf)
	traderType: Type of trader (individual_investor, high_volume_trader, manager, ib_regulated_introducing_broker, ib_service_provider)
	forexExperience: Years trading forex (0, 1, 2, 3, 4, 5+)
	equitiesExperience: Years trading equities (0, 1, 2, 3, 4, 5+)
	futuresExperience: Years trading futures (0, 1, 2, 3, 4, 5+)
	experienceLevel: Level of FX experience (Novice, Intermediate, Expert)
	tradingFrequency: How often the client will be trading FX (Never, Daily, Weekly, Occasionally)
	reference: Where the client heard about us (max of 255 characters)
	previousSignup: Whether or not the client has signed up before (yes, no)
	freeProduct: Whether or not the client wants to receive a free product (yes, no)
	emailSignup: Email opt-in (yes, no)
	*/
	this.submit = function(clientInfo, callback) {
		var errors = [];

		/**** BEGIN check for submit being called with a form as the first parameter ****/
		// Dereference an ID
		if (typeof clientInfo === 'string') {
			clientInfo = document.getElementById(clientInfo);
			if (clientInfo === null) {
				errors.push('Form ID does not exist in the DOM');
				return errors;
			}
		}

		// If clientInfo is a DOM element, confirm that it's a form then reinvoke submit with the scraped data
		if (fxcm.lib.isDOMElement(clientInfo)) {
			if (clientInfo.tagName === 'FORM') {
				return _submitHandler.call(clientInfo, callback);
			} else {
				errors.push('First parameter was a DOM element (or its id) that was not a form');
				return errors;
			}
		}
		/***** END check for submit being called with a form as the first parameter *****/

		// Check that client info was passed in
		if (typeof clientInfo !== 'object') {
			errors.push('No client info');
			return errors;
		}

		// Check for an rb being passed in with the clientInfo
		if (typeof clientInfo['rb'] === 'string') {
			thatDemo.setRB(clientInfo['rb']);
			delete clientInfo['rb'];
		}

		// Check for a currency being passed in with the clientInfo
		if (typeof clientInfo['demo.currency'] === 'string') {
			thatDemo.setCurrency(clientInfo['demo.currency']);
			delete clientInfo['demo.currency'];
		}

		// Check for a broken RB and set db
		if (!_settings.rb) {
			errors.push('No RB defined');
		} else {
			var db = thatDemo.setDB(_settings.rb, _settings.currency);
			if (!db) { errors.push('No DB set for this RB'); }
		}

		// Check for a hardcoded campaign
		if (typeof clientInfo['cmp'] !== 'undefined') {
			thatDemo.setCampaign(clientInfo['cmp']);
			delete clientInfo['cmp'];
		} else if (typeof clientInfo['CAMPAIGN_ID'] !== 'undefined') {
			thatDemo.setCampaign(clientInfo['CAMPAIGN_ID']);
			delete clientInfo['CAMPAIGN_ID'];
		} else if (typeof clientInfo['campaign'] !== 'undefined') {
			thatDemo.setCampaign(clientInfo['campaign']);
			delete clientInfo['campaign'];
		}

		// Check for a hardcoded elqFormName implying that the Eloqua form should be coregistered
		if (typeof clientInfo['elqFormName'] !== 'undefined') {
			thatDemo.addEloquaSubmissionTarget(clientInfo['elqFormName']);
			delete clientInfo['elqFormName'];
		}

		// Validate clientInfo
		for (var field in fxcm.Demo.prototype._demoFieldMap) {
			if (typeof clientInfo[field] !== 'undefined') {
				if (!fxcm.Demo.prototype._demoFieldMap[field].validation.call(this, clientInfo[field])) {
					errors.push('Invalid ' + fxcm.Demo.prototype._demoFieldMap[field].humanName);
				}
			} else if (fxcm.Demo.prototype._demoFieldMap[field].required) {
				errors.push('Missing ' + fxcm.Demo.prototype._demoFieldMap[field].humanName);
			}
		}

		if (errors.length > 0) { return errors; }

		// cache conversion data to be used
		thatDemo.setConversionData(_settings.rb);

		// launch trading station window if RB is for trading station
		if(
			fxcm.device.getBreakpoint() === 'desktop' &&
			typeof fxcm.registration.demoRBMap[ _settings.rb ] === 'object' &&
			fxcm.registration.demoRBMap[ _settings.rb ][ 'platform' ] === 'ts' &&
			typeof fxcmTsDemo === 'object'
		) {
			fxcmTsDemo.launchTsWebWindow();
		}

		return _submitRequests(clientInfo, callback);
	};

	function _dbLookup(rb, currency){
		if (typeof rb === 'undefined') { rb = _settings.rb; }
		if (typeof rb !== 'string' || typeof fxcm.registration.demoRBMap[rb] !== 'object') { return false; }

		var _item,
			_databases = fxcm.registration.demoRBMap[rb].db,
			_selectedDB = _databases[currency]; // select proper database according to requested currency

		if (!_selectedDB) { // No support for requested currency. Auto-select a supported currency/db pair instead
			if (typeof _databases === 'string') { // check for rbs coded in legacy format. In this case, return "unknown" for currency
				_selectedDB = _databases;
				currency = thatDemo.setCurrency('unknown');
			} else {
				for (_item in _databases) {
					_selectedDB = _databases[_item];
					currency = thatDemo.setCurrency(_item);
					break;
				}
			}
		}

		return _selectedDB;
	}

	function _submitRequests(clientInfo, callback) {
		var returnValue, submissionTarget,
		conversionData = thatDemo.getConversionData();

		if (typeof _settings.submissionTarget !== 'string') {	// The FXTR Status Check hasn't returned nor timed out, so queue requests
			_requestsQueue.push(function() { return _submitRequests(clientInfo, callback); });

			return true;
		} else {
			returnValue = false;

			while (_requestsQueue.length > 0) {	// Earlier requests were queued while waiting for the FXTR Status Check
				returnValue = _requestsQueue.shift().call(this);
			}

			if (typeof clientInfo === 'undefined') {	// This invocation was only intended to submit the requests in the queue
				return returnValue;
			}

			// Submit requests
			if (typeof fxcmdebug === 'object' && typeof fxcmdebug.demo === 'object' && typeof fxcmdebug.demo.submissionTarget === 'string') {	// We're in debug mode
				submissionTarget = fxcmdebug.demo.submissionTarget;
			} else {	// Production use case
				submissionTarget = _settings.submissionTarget;
			}

			if (submissionTarget === 'fxtr') {
				returnValue = _submitToFXTR(clientInfo, callback);
			} else {
				returnValue = _submitToEloqua(clientInfo, callback);
			}

			if (returnValue) {
				_submitToAdditionalTargets(clientInfo);

				// Fire off tracking requests
				if( typeof amplify === 'object' && typeof amplify.publish === 'function' ){
					
					amplify.publish('fxcm.form.onDemoComplete', {
						'formName' : _settings.formName,
						'rb' : _settings.rb,
						'db' : _settings.db,
						'platform' : conversionData.platform,
						'currency' : _settings.currency,
						'formCountry' : clientInfo.country,
						'product' : conversionData.product,
						'execution' : conversionData.execution,
					});
				}
			}

			return returnValue;
		}
	}

	function _submitToFXTR(clientInfo, callback) {
		// Build the request URL base
		var requestURL = [thatDemo.FXTRSubmissionURL, '&rb=', _settings.rb, '&DB=', _settings.db];
		
		// Add current page URL
		var currPageFullURL = document.location.toString().split('#')[0];
		var currPageBaseURL = currPageFullURL.split('?')[0];
		var currPageQuery = currPageFullURL.split('?')[1];

		// Get GA property
		var gaPropId = _getGaProperty();
		
		requestURL.push('&referrer_value=', currPageBaseURL);
		if( typeof currPageQuery === 'string' ){
			requestURL.push( '?' + encodeURIComponent(currPageQuery) );
		}
		
		// Add clientInfo parameters
		for (var field in fxcm.Demo.prototype._demoFieldMap) {
			if (typeof clientInfo[field] !== 'undefined' && typeof fxcm.Demo.prototype._demoFieldMap[field].fxtrName === 'string') {
				requestURL.push('&demo.', fxcm.Demo.prototype._demoFieldMap[field].fxtrName, '=', clientInfo[field]);
			}
		}

		// Add the campaign
		if (typeof _settings.campaign === 'string') {
			requestURL.push('&cmp=', _settings.campaign);
		}

		// Add the Client ID
		if (typeof _settings.clientId === 'string') {
			requestURL.push('&tid=', _settings.clientId);
		}

		// Add GA property ID
		/*if( gaPropId ) {
			requestURL.push('&GATRACKID=', gaPropId );
		}*/

		// Add the form name
		if (typeof _settings.formName === 'string' && _settings.formName !== '') {
			requestURL.push('&coReg=', _settings.formName);
		}

		// Setup the callback
		var callbackName = fxcm.lib.generateFunctionName(fxcm.lib.generateNumericID());
		window[callbackName] = callback || _FXTRCallback;
		requestURL.push('&callback=', callbackName);

		// Submit the request
		fxcm.lib.getScript(requestURL.join(''));

		return true;
	}

	function _FXTRCallback(data) {
		if (data.errors.length === 0) {
			if (typeof _settings.successCallback === 'function') {
				_settings.successCallback.call(this, data.username, data.password, data.webtsurl, thatDemo.getConversionData());
			}

			return true;
		} else {
			if (typeof _settings.errorCallback === 'function') {
				_settings.errorCallback.call(this, data.errors);
			}

			return false;
		}
	}

	function _submitToEloqua(clientInfo, callback) {

		if( typeof _settings.rb !== 'string' || typeof _settings.db !== 'string' ) return false;

		// Build the submitData object
		var submitData = {};
		for (var field in fxcm.Demo.prototype._demoFieldMap) {
			if (typeof clientInfo[field] !== 'undefined' && typeof fxcm.Demo.prototype._demoFieldMap[field].eloquaName === 'string') {
				switch(field) {
					case 'emailSignup':
						var fieldValue = clientInfo[field] === 'yes' ? 'Y' : 'N';
						break;

					case 'imID':
					case 'consentSMS':
						var fieldValue = clientInfo[field] === 'yes' ? 'Y' : 'N';
						break;

					default:
						var fieldValue = clientInfo[field];
						break;
				}
				submitData[fxcm.Demo.prototype._demoFieldMap[field].eloquaName] = fieldValue;
			} else if ( [ 'emailSignup', 'imID', 'consentSMS' ].indexOf( field ) > -1 ) {
				// Eloqua requires that we pass N if the box was unchecked, but unchecked boxes aren't passed at all by default, so we add it if it was missing
				submitData[fxcm.Demo.prototype._demoFieldMap[field].eloquaName] = 'N';
			}
		}

		// Add the elqFormName
		submitData['elqFormName'] = _settings.rb + _settings.db + 'Maintenance';

		// Add the RB
		submitData['rb'] = _settings.rb;

		// Add the DB
		submitData['DB'] = _settings.db;

		// Add the campaign  (formatted for eloqua)
		if (typeof _settings.campaign === 'string') {
			submitData['demo.campaign'] = _settings.campaign;
		}
		if (typeof _settings.clientId === 'string') {
			submitData['demo.tracking_id'] = _settings.clientId;
		}

		// Submit the request
		var eloquaRequest = new fxcm.Eloqua;
		return eloquaRequest.submit(submitData, callback || _eloquaCallback);
	}

	function _eloquaCallback() {
		if (typeof _settings.successCallback === 'function') {
			_settings.successCallback.call(this);
		}

		return true;
	}

	function _submitToAdditionalTargets(clientInfo) {
		var submissionFunctions = {
				get: fxcm.lib.getURL,
				JSONP: fxcm.lib.getScript
			};

		for (var targetType in _settings.submissionTargets) {
			for (var targetIndex = 0; targetIndex < _settings.submissionTargets[targetType].length; targetIndex++) {
				var submissionTarget = _settings.submissionTargets[targetType][targetIndex];

				var submissionData = {};
				for (var field in clientInfo) {
					// Map field values
					if (typeof submissionTarget.valueMap === 'object' && typeof submissionTarget.valueMap[field] === 'object' && typeof submissionTarget.valueMap[field][clientInfo[field]] !== 'undefined') {
						clientInfo[field] = submissionTarget.valueMap[field][clientInfo[field]];
					}

					// Map field names
					if (typeof submissionTarget.fieldMap === 'object' && typeof submissionTarget.fieldMap[field] === 'string') {
						submissionData[submissionTarget.fieldMap[field]] = clientInfo[field];
					} else if (submissionTarget.extendOriginalFields) {
					// if extendOriginalFields is true, try to find the proper mapping for the current value, otherwise, drop the current field from this submissionTarget's data
						if (targetType === 'eloqua' && typeof fxcm.Demo.prototype._demoFieldMap[field] === 'object' && typeof fxcm.Demo.prototype._demoFieldMap[field].eloquaName === 'string') {
							switch(field) {
								case 'address':
									var fieldValue = clientInfo[field] + ' ' + (typeof clientInfo['address2'] === 'string' ? clientInfo['address2'] : '');
									break;

								case 'emailSignup':
									var fieldValue = clientInfo[field] === 'yes' ? 'Y' : 'N';
									break;

								case 'imID':
								case 'consentSMS':
									var fieldValue = clientInfo[field] === 'yes' ? 'Y' : 'N';
									break;

								default:
									var fieldValue = clientInfo[field];
									break;
							}
							submissionData[fxcm.Demo.prototype._demoFieldMap[field].eloquaName] = fieldValue;

						}
						else if ( [ 'emailSignup', 'imID', 'consentSMS' ].indexOf( field ) > -1 ) {
							// Eloqua requires that we pass N if the box was unchecked, but unchecked boxes aren't passed at all by default, so we add it if it was missing
							submissionData[fxcm.Demo.prototype._demoFieldMap[field].eloquaName] = 'N';
						}
						else {
							submissionData[field] = clientInfo[field];
						}
					}
				}

				if (typeof submissionTarget.additionalData === 'object') {
					for (var field in submissionTarget.additionalData) {
						submissionData[field] = submissionTarget.additionalData[field];
					}
				}

				if (targetType === 'eloqua') {
					var eloquaSubmission = new fxcm.Eloqua();
					eloquaSubmission.setElqFormName(submissionTarget.formName);
					eloquaSubmission.submit(submissionData, submissionTarget.callback);
				} else if (targetType === 'get' || targetType === 'JSONP') {
					var submissionURL = [submissionTarget.target];
					if (submissionTarget.target.indexOf('?') === -1) {
						submissionURL.push('?');
					}

					for (var field in submissionData) {
						submissionURL.push('&', field, '=', submissionData[field]);
					}

					submissionFunctions[targetType].call(this, submissionURL.join(''), submissionTarget.callback);
				} else if (targetType === 'post') {
					fxcm.lib.ajaxPost(submissionTarget.target, submissionData, submissionTarget.callback);
				}
			}
		}

		return true;
	}

	function _defaultSuccessCallback(username, password) {
		/*
		if (typeof username === 'string' && typeof password === 'string') {
			console.log('user: ' + username + "\npass: " + password);
		} else {
			console.log('Successful non-FXTR submission!');
		}
		*/
	}

	function _defaultErrorCallback(errors) {
		//console.log(errors);
	}

	// Constructor logic
	thatDemo.checkFXTRStatus();
	thatDemo.setRB(rb) || thatDemo.setCountryAccountType('united_kingdom', 'ts');
	thatDemo.setDB(_settings.rb, currency);
	thatDemo.setConversionData();
	thatDemo.setSuccessCallback(successCallback || _defaultSuccessCallback);
	thatDemo.setErrorCallback(_defaultErrorCallback);
	thatDemo.setCampaign(_getCampaign());
	thatDemo.setClientId(_getClientId());
	thatDemo.bind(form);
};

fxcm.Demo.prototype.FXTRStatusURL = (document.location.protocol.substring(0,4) === 'http' ? '' : 'https:') + '//static.fxcm.co.uk/status/fxdr.php';
fxcm.Demo.prototype.FXTRSubmissionURL = 'https://secure4.fxcorporate.com/tr-demo/form/service/?format=jsonp';
fxcm.Demo.prototype.EloquaMaintenanceFormName = 'FXCMDEMOMaintenanceUniversal';

fxcm.Demo.prototype.isValidName = function(name) {
	return typeof name === 'string' && name.length <= 50;
};

fxcm.Demo.prototype.isValidEmail = function(email) {
	return fxcm.lib.isValidEmail(email) && email.length <= 50;
};

fxcm.Demo.prototype._demoPhoneRegEx = /^[+()_,.:a-zA-Z\-=0-9 *]{0,20}$/i;
fxcm.Demo.prototype.isValidPhone = function(phone) {
	return typeof phone === 'string' && (phone === '' || fxcm.Demo.prototype._demoPhoneRegEx.test(phone)) && phone.length <= 20;
};

fxcm.Demo.prototype._demoIMNetworks = ['', 'aol', 'yahoo', 'icq', 'msn', 'other'];
fxcm.Demo.prototype.isValidIMNetwork = function(imNetwork) {
	return typeof imNetwork === 'string' && fxcm.Demo.prototype._demoIMNetworks.indexOf(imNetwork) >= 0;
};

fxcm.Demo.prototype.isValidIMID = function(imID) {
	return typeof imID === 'string' && imID.length <= 255;
};

fxcm.Demo.prototype.isValidStreet = function(street) {
	return typeof street === 'string' && street.length <= 50;
};

fxcm.Demo.prototype.isValidAddress2 = function(address) {
	return typeof address === 'string' && address.length <= 255;
};

fxcm.Demo.prototype.isValidCity = function(city) {
	return typeof city === 'string' && city.length <= 50;
};

fxcm.Demo.prototype.isValidState = function(state) {
	return typeof state === 'string' && state.length <= 50;
};

fxcm.Demo.prototype.isValidZip = function(zip) {
	return (typeof zip === 'string' || typeof zip === 'number') && String(zip).length <= 10;
};

fxcm.Demo.prototype._demoCountryRegEx = /^[a-z_]*$/;
fxcm.Demo.prototype.isValidCountry = function(country) {
	// We don't include the white list here for forward-compatibility.  The only assumption is that all countries will continue to be lower case with _'s in place of spaces.
	return typeof country === 'string' && fxcm.Demo.prototype._demoCountryRegEx.test(country);
};

fxcm.Demo.prototype.isValidCompany = function(company) {
	return typeof company === 'string' && company.length <= 255;
};

fxcm.Demo.prototype._demoLanguages = ['', 'English', 'Traditional_Chinese', 'Simplified_Chinese', 'Bahasa_Malayu', 'Korean', 'Japanese', 'Vietnamese', 'Thai', 'Tagalog'];
fxcm.Demo.prototype.isValidLanguage = function(language) {
	return typeof language === 'string' && fxcm.Demo.prototype._demoLanguages.indexOf(language) >= 0;
};

fxcm.Demo.prototype._demoAccountTypes = ['', 'individual', 'joint', 'corporate', 'partnership', 'trust'];
fxcm.Demo.prototype.isValidAccountType = function(accountType) {
	return typeof accountType === 'string' && fxcm.Demo.prototype._demoAccountTypes.indexOf(accountType) >= 0;
};

fxcm.Demo.prototype._demoBalanceRegEx = /^\d{0,13}(\.\d{0,2})?$/;
fxcm.Demo.prototype.isValidBalance = function(balance) {
	return fxcm.Demo.prototype._demoBalanceRegEx.test(balance);
};

fxcm.Demo.prototype._demoAccountsRegEx = /^\d{1,4}$/;
fxcm.Demo.prototype.isValidAccounts = function(accounts) {
	return fxcm.Demo.prototype._demoAccountsRegEx.test(accounts) && accounts > 0;
};

fxcm.Demo.prototype._demoMargins = ['', '0', 'less50000', '50000_100000', 'more100000'];
fxcm.Demo.prototype.isValidMargin = function(margin) {
	return typeof margin === 'string' && fxcm.Demo.prototype._demoMargins.indexOf(margin) >= 0;
};

fxcm.Demo.prototype._demoDeposits = ['', '5000_24999', '25000_49999', '50000_99999', '100000_inf'];
fxcm.Demo.prototype.isValidDeposit = function(deposit) {
	return typeof deposit === 'string' && fxcm.Demo.prototype._demoDeposits.indexOf(deposit) >= 0;
};

fxcm.Demo.prototype._demoTraderTypes = ['', 'individual_investor', 'high_volume_trader', 'manager', 'ib_regulated_introducing_broker', 'ib_service_provider'];
fxcm.Demo.prototype.isValidTraderType = function(traderType) {
	return typeof traderType === 'string' && fxcm.Demo.prototype._demoTraderTypes.indexOf(traderType) >= 0;
};

fxcm.Demo.prototype._demoYearsForexExperience = ['0', '1', '2', '3', '4', '5+'];
fxcm.Demo.prototype.isValidForexExperience = function(forexExperience) {
	return typeof forexExperience === 'string' && (forexExperience === '' || fxcm.Demo.prototype._demoYearsForexExperience.indexOf(forexExperience) >=0);
};

fxcm.Demo.prototype._demoYearsEquitiesExperience = ['0', '1', '2', '3', '4', '5+'];
fxcm.Demo.prototype.isValidEquitiesExperience = function(equitiesExperience) {
	return typeof equitiesExperience === 'string' && (equitiesExperience === '' || fxcm.Demo.prototype._demoYearsEquitiesExperience.indexOf(equitiesExperience) >=0);
};

fxcm.Demo.prototype._demoYearsFuturesExperience = ['0', '1', '2', '3', '4', '5+'];
fxcm.Demo.prototype.isValidFuturesExperience = function(futuresExperience) {
	return typeof futuresExperience === 'string' && (futuresExperience === '' || fxcm.Demo.prototype._demoYearsFuturesExperience.indexOf(futuresExperience) >=0);
};

fxcm.Demo.prototype._demoExperienceLevels = ['', 'Novice', 'Intermediate', 'Expert'];
fxcm.Demo.prototype.isValidExperienceLevel = function(experienceLevel) {
	return typeof experienceLevel === 'string' && fxcm.Demo.prototype._demoExperienceLevels.indexOf(experienceLevel) >= 0;
};

fxcm.Demo.prototype._demoTradingFrequencies = ['', 'Never', 'Daily', 'Weekly', 'Occasionally'];
fxcm.Demo.prototype.isValidTradingFrequency = function(tradingFrequency) {
	return typeof tradingFrequency === 'string' && fxcm.Demo.prototype._demoTradingFrequencies.indexOf(tradingFrequency) >= 0;
};

fxcm.Demo.prototype.isValidReference = function(reference) {
	return typeof reference === 'string' && reference.length <= 255;
};

fxcm.Demo.prototype.isValidPreviousSignup = function(previousSignup) {
	return previousSignup === 'yes' || previousSignup === 'no';
};

fxcm.Demo.prototype.isValidFreeProduct = function(freeProduct) {
	return freeProduct === 'yes' || freeProduct === 'no';
};

fxcm.Demo.prototype.isValidEmailSignup = function(emailSignup) {
	return emailSignup === 'yes' || emailSignup === 'no';
};

fxcm.Demo.prototype.isValidConsentSMS = function(consentSms) {
	return consentSms === 'yes' || consentSms === 'no';
};

fxcm.Demo.prototype._demoFieldMap = {
	firstName: {
		fxtrName: 'firstname',
		eloquaName: 'FNAME',
		validation: fxcm.Demo.prototype.isValidName,
		humanName: 'first name',
		required: true
	},
	lastName: {
		fxtrName: 'lastname',
		eloquaName: 'LNAME',
		validation: fxcm.Demo.prototype.isValidName,
		humanName: 'last name',
		required: false
	},
	email: {
		fxtrName: 'email_address',
		eloquaName: 'EMAIL',
		validation: fxcm.Demo.prototype.isValidEmail,
		humanName: 'e-mail address',
		required: true
	},
	phone: {
		fxtrName: 'phone',
		eloquaName: 'PHONE',
		validation: fxcm.Demo.prototype.isValidPhone,
		humanName: 'phone number',
		required: false
	},
	phone2: {
		fxtrName: 'alternative_phone',
		validation: fxcm.Demo.prototype.isValidPhone,
		humanName: 'alternative phone number',
		required: false
	},
	imNetwork: {
		fxtrName: 'im_provider',
		validation: fxcm.Demo.prototype.isValidIMNetwork,
		humanName: 'IM network',
		required: false
	},
	imID: {
		fxtrName: 'im_id',
		eloquaName: 'PROD_INFO_SMS_CONSENT',
		validation: fxcm.Demo.prototype.isValidIMID,
		humanName: 'IM screen name',
		required: false
	},
	street: {
		fxtrName: 'residental_address',  // Misspelled within the web service
		eloquaName: 'address',
		validation: fxcm.Demo.prototype.isValidStreet,
		humanName: 'street',
		required: false
	},
	address2: {
		fxtrName: 'address_misc',
		validation: fxcm.Demo.prototype.isValidAddress2,
		humanName: 'address 2',
		required: false
	},
	city: {
		fxtrName: 'city',
		eloquaName: 'city',
		validation: fxcm.Demo.prototype.isValidCity,
		humanName: 'city',
		required: false
	},
	state: {
		fxtrName: 'state_province',
		eloquaName: 'state',
		validation: fxcm.Demo.prototype.isValidState,
		humanName: 'state/province',
		required: false
	},
	zip: {
		fxtrName: 'zip_postal_code',
		eloquaName: 'zip',
		validation: fxcm.Demo.prototype.isValidZip,
		humanName: 'zip code',
		required: false
	},
	country: {
		fxtrName: 'country',
		eloquaName: 'COUNTRY',
		validation: fxcm.Demo.prototype.isValidCountry,
		humanName: 'country',
		required: true
	},
	company: {
		fxtrName: 'company_name',
		validation: fxcm.Demo.prototype.isValidCompany,
		humanName: 'company',
		required: false
	},
	language: {
		fxtrName: 'preferred_language',
		validation: fxcm.Demo.prototype.isValidLanguage,
		humanName: 'language',
		required: false
	},
	accountType: {
		fxtrName: 'desired_account_type',
		validation: fxcm.Demo.prototype.isValidAccountType,
		humanName: 'account type',
		required: false
	},
	balance: {
		fxtrName: 'initial_balance',
		validation: fxcm.Demo.prototype.isValidBalance,
		humanName: 'account balance',
		required: false
	},
	accounts: {
		fxtrName: 'number_accounts',
		validation: fxcm.Demo.prototype.isValidAccounts,
		humanName: 'number of accounts',
		required: false
	},
	margin: {
		fxtrName: 'expect_margin',
		validation: fxcm.Demo.prototype.isValidMargin,
		humanName: 'margin',
		required: false
	},
	deposit: {
		fxtrName: 'intended_amount',
		validation: fxcm.Demo.prototype.isValidDeposit,
		humanName: 'initial deposit',
		required: false
	},
	traderType: {
		fxtrName: 'which_describes_you',
		validation: fxcm.Demo.prototype.isValidTraderType,
		humanName: 'trader type',
		required: false
	},
	forexExperience: {
		fxtrName: 'trading_experiance_forex',	// Misspelled within the web service
		validation: fxcm.Demo.prototype.isValidForexExperience,
		humanName: 'years of forex trading experience',
		required: false
	},
	equitiesExperience: {
		fxtrName: 'trading_experiance_equities',	// Misspelled within the web service
		validation: fxcm.Demo.prototype.isValidEquitiesExperience,
		humanName: 'years of equities trading experience',
		required: false
	},
	futuresExperience: {
		fxtrName: 'trading_experiance_futures',	// Misspelled within the web service
		validation: fxcm.Demo.prototype.isValidFuturesExperience,
		humanName: 'years of futures trading experience',
		required: false
	},
	experienceLevel: {
		fxtrName: 'trading_experiance',	// Misspelled within the web service
		validation: fxcm.Demo.prototype.isValidExperienceLevel,
		humanName: 'forex trading experience level',
		required: false
	},
	tradingFrequency: {
		fxtrName: 'trading_frequency',
		validation: fxcm.Demo.prototype.isValidTradingFrequency,
		humanName: 'trading frequency',
		required: false
	},
	reference: {
		fxtrName: 'where_did_you_hear',
		validation: fxcm.Demo.prototype.isValidReference,
		humanName: 'reference',
		required: false
	},
	previousSignup: {
		fxtrName: 'previously_signed_up',
		validation: fxcm.Demo.prototype.isValidPreviousSignup,
		humanName: 'status of previous signup',
		required: false
	},
	freeProduct: {
		fxtrName: 'send_me_free_product',
		validation: fxcm.Demo.prototype.isValidFreeProduct,
		humanName: 'free product opt-in',
		required: false
	},
	emailSignup: {
		fxtrName: 'email_me_training_material',
		eloquaName: 'PROD_INFO_MKT',
		validation: fxcm.Demo.prototype.isValidEmailSignup,
		humanName: 'email opt-in',
		required: false
	},
	consentSMS: {
		fxtrName: 'consent_sms',
		eloquaName: 'PROD_INFO_SMS_CONSENT',
		validation: fxcm.Demo.prototype.isValidConsentSMS,
		humanName: 'SMS Consent',
		required: false
	}
};
fxcm.device = (function () {

	var settings = {

		// detect WURFL support since we're loading externally
		hasWURFL: typeof WURFL === 'object',

		// CSS breakpoints
		currentBreakpoint: undefined,
        currentState: undefined,
		breakpointMap: {
			mobile: 'screen and (max-width: 599px)',
			tablet: 'screen and (min-width: 600px) and (max-width: 1099px)',
			desktop: 'screen and (min-width: 1100px)'
		},

		// Device detection
		currentDevice: undefined,
        currentOS: undefined,
		isTouch: undefined
	},

	// public container
	devicePublic = {};

	/* ------------------------------
		PRIVATE & HELPER METHODS
	------------------------------ */

	function setBodyDataAttr(attrName, attrVal){
		$('body').attr('data-' + attrName, attrVal);
	}

	/*
	*	Verifies that we're working with a supported breakpoint name
	*	Accepts a string. Returns a boolean
	*	Valid breakpoints: 'mobile', 'tablet', 'desktop'
	*/
	function isValidBreakpoint(bp) {
		if (!bp || typeof bp !== 'string') { return false; }
		bp = bp.toLowerCase();
		return bp === 'mobile' || bp === 'tablet' || bp === 'desktop';
	}

	/*
	* 	Fire amplify event for entering or exiting a breakpoint
	*	Accepts: a valid breakpoint name (string) and a boolean to specify enter or exit event
	*	Amplify will provide the current breakpoint and current state within the callback
	*	Possible events: onEnterDesktop, onExitDesktop, onEnterTablet, onExitTablet, onEnterMobile, onExitMobile
	*/
	function publishEvent(bp, state){
		bp = bp.toLowerCase().charAt(0).toUpperCase() + bp.slice(1); // convert breakpoint to correct capitalization
		if( typeof amplify === 'object' && typeof amplify.publish === 'function' ){
			amplify.publish('fxcm.device.on' + state + bp, {breakpoint: bp, state: state});
		}
		return true;
	}

    /**
     * Fires most current event
     * @returns {undefined}
     */
    function publishCurrentEvent() {
        publishEvent( settings.currentBreakpoint, settings.currentState );
    }

	// Sets the value of the current WURFL device.
	function setDevice(){
		var device;

		if (settings.hasWURFL) {
			switch( WURFL.form_factor ) {
				case 'Desktop':
					device = 'desktop';
					break;

				case 'Smartphone':
				case 'Feature Phone':
				case 'Other Mobile':
					device = 'phone';
					break;

				case 'Tablet':
					device = 'tablet';
					break;

				case 'Other non-Mobile':
				case 'App':
				case 'Smart-TV':
				case 'Robot':
					device = 'other';
					break;

				default:
					device = 'other';
			}
		}

		return settings.currentDevice = device;
	}

	/*
	*	Sets the WURFL is_mobile value
	*	Note - we're changing the terminology from WURFL's "is_mobile" to "isTouch" to avoid confusion with our enquire breakpoints of "mobile", "tablet", and "desktop"
	*/
	function setIsTouch(){
		if (settings.hasWURFL) {
			return settings.isTouch = WURFL.is_mobile;
		}
	}

    /*
     * Checks to see if the WURFL.complete_device_name contains "Apple" in the string and returns true or false.
     */
    function getIsApple() {
        if( settings.hasWURFL ) {
            var deviceName = WURFL.complete_device_name.toLowerCase();
            if( deviceName.indexOf( "apple" ) > -1 ) {
                return true;
            }
        }
        return false;
    }

    /*
     * Checks to see if the navigator.userAgent contains "android" in the string and returns true or false.
     */
    function getIsAndroid( ua ) {
        if( ua.indexOf( "android" ) > -1 ) {
            return true;
        }
        return false;
    }

    /*
     * Checks to see if the navigator.userAgent contains "silk" in the string and returns true or false.
     */
    function getIsKindle( ua ) {
        if( /\bsilk\b/.test(ua) ) {
            return true;
        }
        return false;
    }

    /*
     * Checks to see if the navigator.userAgent contains "windows" in the string and returns true or false.
     */
    function getIsWindows( ua ) {
        if( ua.indexOf( "windows" ) > -1 ) {
            return true;
        }
        return false;
    }

    /*
     * Checks to see if the navigator.userAgent contains "mac" in the string and returns true or false.
     */
    function getIsMacintosh( ua ) {
        if( ua.indexOf( "mac" ) > -1 ) {
            return true;
        }
        return false;
    }

    /**
     * Sets variable settings.currentOS and returns OS of device the user is viewing.
     * @returns {settings.currentOS|String}
     */
    function setOS() {
        // WURFL does a great job of simplifying touch and device names, but it doesn't return back specific cases that
        // navigator.userAgent can give us. So that's why, we are using WURFL for apple specific devices, and userAgent for everything else.
        var ua = navigator.userAgent.toLowerCase();
        var os = "unknown";

        // Check iOS
        if( getIsApple( ua ) ) {
            os = "ios";
        }
        // Check Android
        else if( getIsAndroid( ua ) ) {
            os = "android";
        }
        // Check Kindle
        else if ( getIsKindle( ua ) ) {
            os = "kindle";
        }
        // Check Windows
        else if( getIsWindows( ua ) ) {
            os = "windows";
        }
        // Check Mac
        else if( getIsMacintosh( ua ) ) {
            os = "macintosh";
        }

        return settings.currentOS = os;

    }

    /**
     * Device redirection for anchor links
     * Add the redirects you need directly onto the anchor tag by utilizing data attributes.
     * @param {object} element
     * @returns {undefined}
     */
    function registerDeviceRedirect( element ) {
        $( element ).click( function( e ) {
			$anchor = $( this );
			// First see which data parameters are passed. We need to get the object and convert it into a string to search through.
			var data = $anchor.data();
			data = JSON.stringify(data).toLowerCase();

            var url = "";
			var os = "";
			var hasRedirect = false;

			// Check if any of the parameters qualify, if so, we know we have a redirect
			if( data.indexOf( 'ios' ) > -1 && fxcm.device.getOS() === "ios" ) {
				hasRedirect = true;
				os = fxcm.device.getOS();
			}
			else if( data.indexOf( 'android' ) > -1 && fxcm.device.getOS() === "android" ) {
				hasRedirect = true;
				os = fxcm.device.getOS();
			}
			else if( data.indexOf( 'touch' ) > -1 &&  fxcm.device.isTouch() ) {
				hasRedirect = true;
				os = 'touch';
			}

			// If there is a redirect, then see if there are tablet or phone specific urls
			if( hasRedirect ) {
				if( $anchor.data( 'href-' + os + '-tablet' ) && fxcm.device.getDevice() === "tablet" ) {
					url = $anchor.data( 'href-' + os + '-tablet' );
				}
				else if( $anchor.data( 'href-' + os + '-phone' ) && fxcm.device.getDevice() === "phone" ) {
					url = $anchor.data( 'href-' + os + '-phone' );
				}
                // Check if there is a simple href-android type of redirect
				else if( typeof $anchor.data( 'href-' + os ) != "undefined" ) {
					url = $anchor.data( 'href-' + os );
				}
			}

            // If no url redirects are set, default back to href.
            if( url === "" ) {
                url = $anchor.prop( 'href' );
            }

			// If url is not empty, redirect the user
			if( url !== "" ) {
				e.preventDefault();
				// Tests whether they used ctrl+click to open in new tab or not
                // http://davidwalsh.name/window-open
                if( e.metaKey || e.ctrlKey || e.button === 1 ) {
                    window.open( url );
                }
                else {
                    window.location = url;
                }
				return false;
			}
		});
    }

	// initialize and cache WURFL values on page load
	function initialize() {
		var isTouch = setIsTouch();
		var device = setDevice();
        var os = setOS();

		$(document).ready(function(){
			setBodyDataAttr('isTouch', isTouch);
			setBodyDataAttr('device', device);
            setBodyDataAttr('os', os);
		});
	}

	/* -------------------------
		PUBLIC METHODS
	------------------------- */

	/*
	*	Sets or unset a breakpoint by passing in the string name and a boolean
	*	Usage:
	*		setBreakpoint('mobile', true) 	 ==> sets current breakpoint to mobile
	*		setBreakpoint('mobile', false) 	 ==> unsets mobile breakpoint
	*/
	devicePublic.setBreakpoint = function(bp, state){

		if ( !isValidBreakpoint(bp) ){ return false; }

		bp = bp.toLowerCase();

        state = state ?  'Enter' : 'Exit';

		publishEvent( bp, state ); // Fire amplify event

		if (state === "Enter") { // Set body attr upon entering (but not exiting) a breakpoint
			setBodyDataAttr('breakpoint', bp);
            amplify.publish( 'fxcm.device.onBreakpointChange', {breakpoint: bp, state: state} );

			return settings.currentBreakpoint = bp,
               settings.currentState = state;
		}

	};

	devicePublic.getBreakpoint = function(){
		return settings.currentBreakpoint;
	};

	/*
	*	Returns the condition attached to a particular breakpoint
	*	accepts a breakpoint name (string).
	*	returns breakpoint condition (string)
	*/
	devicePublic.getBreakpointSetting = function(bp) {
		if ( !bp || !isValidBreakpoint(bp) ) {
			return false;
		}

		return settings.breakpointMap[ bp.toLowerCase() ];
	};

	devicePublic.getDevice = function() {
		return settings.currentDevice;
	};

	// Returns a boolean value denoting whether current device is touch-enabled (mobile or tablet)
	devicePublic.isTouch = function() {
		return settings.isTouch;
	};

    devicePublic.getOS = function() {
        return settings.currentOS;
    };

    devicePublic.registerDeviceRedirect = function( element ) {
        registerDeviceRedirect( element );
    };

    devicePublic.publishCurrentEvent = function() {
        publishCurrentEvent();
    };

	// Call initialize method
	initialize();

	// Return public methods
	return devicePublic;

}());

fxcm.Eloqua = fxcm.lib.makeClass();
fxcm.Eloqua.prototype.init = function(elqFormName, form, callback) {
	var thatEloqua = this;
	var _settings = {};
	var _formName = '';
	var _requestBase = 'https://fe3f15707564067a771672.pub.s10.sfmc-content.com/';
	var _endpoint = 'aiyxv2uiay3';

	this.setCallback = function(callback) {
		if (typeof callback !== 'function') { return false; }

		return _settings.callback = callback;
	};

	this.getCampaign = function(){
		// Get reference to cmp value first from url  param and then from cookie
		var cmp = fxcm.lib.getURLParameter( 'CMP' ) || fxcm.lib.getURLParameter( 'cmp' ) || fxcm.lib.readCookie( 'fxcmCampaign' );

		// Update cmp field value
		cmp = typeof cmp === 'string' ? cmp.replace(/^SFS-/i, '') : false;

		return cmp;
	};

	this.bind = function(form) {
		// Dereference an id
		if (typeof form === 'string') {
			form = document.getElementById(form);
		}

		// Confirm that "form" is a form
		if (!(fxcm.lib.isDOMElement(form) && form.tagName.toLowerCase() === 'form')) {
			return false;
		}

		// Attach submit handler
		return fxcm.lib.addEventHandler(form, 'submit', _submitHandler);
	};

	function _submitHandler(event) {
		// Scrape the form
		var formData = fxcm.lib.serializeForm( this );

		var campaign = thatEloqua.getCampaign();

		var altEndpoint = this.getAttribute( 'data-form-mc-endpoint' );

		var clientId = fxcm.lib.readCookie( 'fxcmGaClientId' );

		var gaProp = window.hasOwnProperty( 'gtmGaProperty' ) && typeof window.gtmGaProperty === 'string' && window.gtmGaProperty.length ?
		             window.gtmGaProperty : false;
		
		// add formName (not elqFormName)
		_formName = fxcm.lib.getFormName( this );

		if( campaign ) {
			formData.campaign_id = campaign;
		}

		if( clientId ) {
			formData.GACLIENTID = clientId;
		}

		if( gaProp ) {
			formData.GATRACKID = gaProp;
		}

		for( var field in formData ) {
			if( typeof formData[ field ] === 'string' )
				formData[ field ].replace( /@test\.com$/i, '@fxcm.com' )
		}

		// use alternative endpoint if provided
		if( typeof altEndpoint === 'string' && altEndpoint.length ) {
			_endpoint = altEndpoint;
		}
		// use demo endpoint if form is demo maint form
		else if( formData.hasOwnProperty( 'elqFormName' ) && /Maintenance$/.test( formData.elqFormName ) ) {
			_endpoint = '1wqn1tedbyf';
		}

		if (typeof event === 'object') {	// _submitHandler is handling a submit event
			thatEloqua.submit(formData);	// Submit the request
			return fxcm.lib.cancelEvent(event);	// Cancel the form submission
		} else {	// _submitHandler was manually invoked by submit because a form was passed in
			return thatEloqua.submit(formData, event);	// Submit the request, event is the callback in this case
		}
	}

	// Submits submissionData, an object of key/value pairs, and invokes callback after
	this.submit = function(submissionData, callback) {
		//**** BEGIN check for submit being called with a form as the first parameter ****
		// Dereference an ID
		if (typeof submissionData === 'string') {
			submissionData = document.getElementById(submissionData);
			if (submissionData === null) { return false; }
		}

		// If submissionData is a DOM element, confirm that it's a form then reinvoke submit with the scraped data
		if (fxcm.lib.isDOMElement(submissionData)) {
			if (submissionData.tagName === 'FORM') {
				return _submitHandler.call(submissionData, callback);
			} else {
				return false;
			}
		}
		//***** END check for submit being called with a form as the first parameter *****

		// Confirm that elqFormName has been set and submissionData is either undefined or a non-null object
		if ( typeof submissionData !== 'object' || submissionData === null ) {
			return false;
		}

		// set request URL
		var requestURL = _requestBase + _endpoint;

		// Submit the request
		fxcm.lib.postURL(requestURL, submissionData, function( noXHRError, response ) {
			if( typeof callback === 'function' ) {
				callback.call( form, noXHRError, response );
			}
			else {
				_settings.callback.call( form, noXHRError, response );
			}
		});
		
		// Fire off tracking requests
		if( typeof amplify === 'object' && typeof amplify.publish === 'function' ){
			
			amplify.publish('fxcm.form.onEloquaComplete', {
				'formName' : _formName
			});
			
		}

		return true;
	};

	// Constructor logic
	thatEloqua.bind(form);
	thatEloqua.setCallback(callback);
};
"undefined"===typeof LimelightPlayerUtil&&("undefined"===typeof JSON&&(this.JSON={},function(){function A(d){return 10>d?"0"+d:d}function F(d){B.lastIndex=0;return B.test(d)?'"'+d.replace(B,function(d){var k=G[d];return"string"===typeof k?k:"\\u"+("0000"+d.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+d+'"'}function C(d,r){var k,n,t,D,q=p,m,g=r[d];g&&("object"===typeof g&&"function"===typeof g.toJSON)&&(g=g.toJSON(d));"function"===typeof w&&(g=w.call(r,d,g));switch(typeof g){case "string":return F(g);
	case "number":return isFinite(g)?String(g):"null";case "boolean":case "null":return String(g);case "object":if(!g)return"null";p+=x;m=[];if("[object Array]"===Object.prototype.toString.apply(g)){D=g.length;for(k=0;k<D;k+=1)m[k]=C(k,g)||"null";t=0===m.length?"[]":p?"[\n"+p+m.join(",\n"+p)+"\n"+q+"]":"["+m.join(",")+"]";p=q;return t}if(w&&"object"===typeof w)for(D=w.length,k=0;k<D;k+=1)n=w[k],"string"===typeof n&&(t=C(n,g))&&m.push(F(n)+(p?": ":":")+t);else for(n in g)Object.hasOwnProperty.call(g,n)&&
	(t=C(n,g))&&m.push(F(n)+(p?": ":":")+t);t=0===m.length?"{}":p?"{\n"+p+m.join(",\n"+p)+"\n"+q+"}":"{"+m.join(",")+"}";p=q;return t}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+A(this.getUTCMonth()+1)+"-"+A(this.getUTCDate())+"T"+A(this.getUTCHours())+":"+A(this.getUTCMinutes())+":"+A(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});
	var E=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,B=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,p,x,G={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},w;"function"!==typeof JSON.stringify&&(JSON.stringify=function(d,r,k){var n;x=p="";if("number"===typeof k)for(n=0;n<k;n+=1)x+=" ";else"string"===typeof k&&(x=k);if((w=r)&&"function"!==
		typeof r&&("object"!==typeof r||"number"!==typeof r.length))throw Error("JSON.stringify");return C("",{"":d})});"function"!==typeof JSON.parse&&(JSON.parse=function(d,p){function k(d,n){var q,m,g=d[n];if(g&&"object"===typeof g)for(q in g)Object.hasOwnProperty.call(g,q)&&(m=k(g,q),void 0!==m?g[q]=m:delete g[q]);return p.call(d,n,g)}var n;d=String(d);E.lastIndex=0;E.test(d)&&(d=d.replace(E,function(d){return"\\u"+("0000"+d.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(d.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
			"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return n=eval("("+d+")"),"function"===typeof p?k({"":n},""):n;throw new SyntaxError("JSON.parse");})}()),LimelightPlayerUtil=function(){function A(a,f,l,b,e){g(a,function(c){var u={service:{}};a.playlistService&&(u.service.playlistService=a.playlistService);a.metricsCollectionService&&(u.service.metricsCollectionService=a.metricsCollectionService);a.cuePointService&&(u.service.cuePointService=
	a.cuePointService);a.beaconingService&&(u.service.beaconingService=a.beaconingService);return LimelightPlayer=DelvePlayer=c=c.createPlayer(f,l,b,e,u)})}function F(a,f,l,b){l.postStartSessionEvent();x(b,a,f,D,l,function(a,c){var f=c.mediaList[0],H=document.createElement("TABLE");H.style="border-style:none";var s=H.appendChild(document.createElement("TR")).appendChild(document.createElement("TD")).appendChild(document.createElement("A"));s.href="#";s.appendChild(document.createElement("IMG")).src=encodeURI(f.thumbnailImageUrl);
	var h=H.appendChild(document.createElement("TR")).appendChild(document.createElement("TD"));h.style="text-align:center";h=h.appendChild(document.createElement("A"));h.href="#";h.appendChild(document.createTextNode("Click to play"));var v=function(){l.postPlayStateEvent(y.PLAY,0,function(){window.location=f.mobileUrls[0].mobileUrl});return!1};s.onclick=v;h.onclick=v;b(H)})}function C(a,f,l,b,e,c){x(c,a,b,m.htmlCodec,e,function(a,b){e.postStartSessionEvent();var s=b.mediaList[0],h=document.createElement("VIDEO");
	h.src=encodeURI(s.mobileUrls[0].mobileUrl);h.width=f;h.height=l;h.poster=encodeURI(s.previewImageUrl);h.controls=!0;h.addEventListener("click",h.play);h.addEventListener("play",function(){e.postPlayStateEvent(y.PLAY,Math.round(1E3*h.currentTime));e.startHeartbeat({quality:a,getPosition:function(){return Math.round(1E3*h.currentTime)},isPlaying:function(){return!h.paused}})});h.addEventListener("pause",function(){h.ended||e.postPlayStateEvent(y.PAUSE,Math.round(1E3*h.currentTime));e.stopHeartbeat()});
	h.addEventListener("ended",function(){e.postEvent(y.MEDIA_COMPLETE);e.stopHeartbeat()});var v=0;h.addEventListener("timeupdate",function(){var a=h.currentTime;if(h.seeking&&a!==v){var c=Math.round(1E3*v),f=Math.round(1E3*a);c!==f&&e.postEvent(y.SEEK,{offsetBefore:c,offsetAfter:f,heatmapDisplayed:!1,spectrumType:"",spectrumColor:0,relatedConcepts:""})}v=a});c(h)})}function E(a){a=a||{};a.wmode=a.wmode||"window";a.id=a.id||"limelight_player_"+Math.floor(1E9*Math.random());a.resources=a.resources||{};
	a.resources.beaconingService=a.resources.beaconingService||k;a.resources.cuePointService=a.resources.cuePointService||r;a.resources.metricsCollectionService=a.resources.metricsCollectionService||d;a.resources.playlistService=a.resources.playlistService||w;a.resources.htmlPlayerLocation=a.resources.htmlPlayerLocation||m.loadingProtocol+n;a.resources.playerIframeLocation=a.resources.playerIframeLocation||m.loadingProtocol+t;return a}function B(a,f,l,b,e,c,u,d,s){var h=y.create(f.metricsCollectionService,
	b,s);switch(s){case "iframe":return M(f,u,e,c,b,h,a);case "html":return A(f,u,e,c,null!==l?l:b);case "video":C(f,e,c,b,h,a);break;case "link":F(f,b,h,a);break;case "install-flash":m.Flash.canUpgrade?(f=!0===m.Flash.isActiveX?"ActiveX":"PlugIn",document.title=document.title.slice(0,47)+" - Flash Player Installation",p(a,"http://assets.delvenetworks.com/player/playerProductInstall.swf","MMredirectURL="+window.location+"&MMplayerType="+f+"&MMdoctitle="+document.title,e,c,u,d)):a('<table width="'+e+'" height="'+
	c+'" bgcolor="black" style="background-color:black; margin-left:auto; margin-right:auto"><tr><td align="center" style="text-align:center; vertical-align:middle"><a href="http://www.adobe.com/go/getflash/" style="text-decoration:underline; color:white"><span style="font-size:12px; color:white">You need to have the latest version of Adobe Flash Player to view this content.<br/>Please click here to continue.</span></a></td></tr></table>')}return null}function p(a,f,l,b,e,c,u){var d="",s;if("string"===
	typeof l)d=l;else if("object"===typeof l)for(s in l)d+=encodeURIComponent(s)+"="+encodeURIComponent(l[s])+"&";a('<object type="application/x-shockwave-flash" id="'+c+'" name="'+c+'" width="'+b+'" height="'+e+'" data="'+f+'"><param name="movie" value="'+f+'"/><param name="wmode" value="'+u+'"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="'+d+'"/></object>');return document.getElementById(c)}function x(a,f,l,b,e,c){function d(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              f){a('<table width="'+width+'" height="'+height+'" bgcolor="black" style="background-color:black; margin-left:auto; margin-right:auto"><tr><td align="center" style="text-align:center; vertical-align:middle">'+(f?'<a href="'+f+'" style="text-decoration:underline; color:white">':"")+'<span style="font-size:12px; color:white">'+c+"</span>"+(f?"</a>":"")+"</td></tr></table>")}var g;l.mediaId?g=f.playlistService+"/media/"+l.mediaId+"/getMobilePlaylistByMediaId?platform="+b:l.channelId?g=f.playlistService+
	"/channel/"+l.channelId+"/getFirstAvailableMobilePlaylistByChannelId?platform="+b:l.channelListId&&(g=f.playlistService+"/channel_list/"+l.channelListId+"/getFirstAvailableMobilePlaylistByChannelListId?platform="+b);N(g,function(a){a&&a.mediaList&&a.mediaList[0]?(a.id&&e.setChannelId(a.id),a.mediaList[0].mediaId&&e.setMediaId(a.mediaList[0].mediaId),0<a.mediaList[0].mobileUrls.length?c(b,a):d("Video Not Available For This Device")):d("Video Not Available")})}function G(a){function f(a){return("object"===
	typeof a||"function"===typeof a)&&a.nodeType}if("undefined"===typeof a)return function(a){f(a)?document.body.appendChild(a):document.write(a)};"string"===typeof a&&(a=document.getElementById(a));if(f(a)){if("OBJECT"===a.nodeName){var l=a.parentNode,b=a.nextSibling,e=!1;return function(c){var d=document.createElement("DIV");f(c)?d.appendChild(c):d.innerHTML=c;e||(l.replaceChild(d.firstChild,a),e=!0);for(;d.firstChild;)l.insertBefore(d.firstChild,b)}}return function(c){f(c)?a.appendChild(c):a.innerHTML+=
	c}}return null}var w="//production-ps.lvp.llnw.net/r/PlaylistService",d="//production-mcs.lvp.llnw.net/r/MetricsCollectionService",r="//cps.lvp.llnw.net/r/CuePointService",k="//production-eqbc.lvp.llnw.net",n="//videoplatform.limelight.com/player/html-player.js",t="//assets.delvenetworks.com/player/resources/iframe.html",D="Mobile3gp",q=navigator,m=function(){var a=q.userAgent.toLowerCase(),f=q.platform.toLowerCase(),l=/blackberry/.test(a);/playbook/.test(a);var b=/msie/.test(a),e=/msie\s\d\d/.test(a),
	c=/iemobile|wpdesktop/.test(a),d=/ipad/.test(a),g=/silk/.test(a),s=/linux/.test(f?f:a),f=/opera mobi|opera tablet/.test(a),h=/fennec/.test(a),v=/symbian|series60/.test(a),I=/nintendo wiiu/.test(a),m=/iphone|ipad|ipod/.test(a)&&!(b||c),k=/android \d+\x2E\d+/.test(a)&&!(b||c),n=/android [2-9]+\x2E\d+/.test(a)&&!(b||c),p=/mobile/.test(a)||k,l=k||m||g||l||v||f||h||I||c||p,c=[0,0,0];if(m&&(a=a.match(/os (.*) like mac os x/))&&1<a.length){var c=[],a=a[1].split("_"),z;for(z in a)c.push(parseInt(a[z]));for(;3>
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         c.length;)c.push(0)}z=function(){var a=document.createElement("VIDEO");return a.canPlayType?a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'):""}();n=(n||g||m)&&!h;g=function(){var a=document.createElement("VIDEO");return a.canPlayType?a.canPlayType("application/vnd.apple.mpegurl"):""}();h="probably"===g||m?"HttpLiveStreaming":"MobileH264";a=function(){var a=function(){var a=null;if("undefined"!==typeof q.plugins&&"object"==typeof q.plugins["Shockwave Flash"]){if((a=q.plugins["Shockwave Flash"].description)&&
		("undefined"===typeof q.mimeTypes||!q.mimeTypes["application/x-shockwave-flash"]||q.mimeTypes["application/x-shockwave-flash"].enabledPlugin))return a=a.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),[parseInt(a.replace(/^(.*)\..*$/,"$1"),10),parseInt(a.replace(/^.*\.(.*)\s.*$/,"$1"),10),/[a-zA-Z]/.test(a)?parseInt(a.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0]}else if("undefined"!==typeof window.ActiveXObject)try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(c&&(a=c.GetVariable("$version")))return a=
		a.split(" ")[1].split(","),[parseInt(a[0],10),parseInt(a[1],10),parseInt(a[2],10)]}catch(f){}return[0,0,0]}();return function(c,f,b){return a[0]>c||a[0]==c&&(a[1]>f||a[1]==f&&a[2]>=b)}}();b={canUpgrade:!s&&a(6,0,65),isActiveX:b,hasMinRequiredFlashVersion:a(10,2,0)};d=b.hasMinRequiredFlashVersion&&!k?"flash":l?"probably"===z||n?f||m&&!d&&5>c[0]?"video":"html":"link":"install-flash";"install-flash"===d&&(e&&"assets.delvenetworks.com"!==window.location.host)&&(d="iframe");return{Metrics:{H264:z,HLS:g},
		embedMode:d,htmlCodec:h,Flash:b,loadingProtocol:"https:"===document.location.protocol?"https:":"http:"}}(),g=function(){var a=[];return function(f,d){if(void 0!==LimelightPlayerUtil.Player)d(LimelightPlayerUtil.Player);else if(a.push(d),void 0===LimelightPlayerUtil.playerLoadedCallback){var b=document.getElementsByTagName("head")[0]||document.documentElement,e=document.createElement("SCRIPT");e.type="text/javascript";e.src=f.htmlPlayerLocation;e.charset="utf-8";LimelightPlayerUtil.playerLoadedCallback=
		function(c){LimelightPlayerUtil.Player=c;delete LimelightPlayerUtil.playerLoadedCallback;b&&b.removeChild(e);a.forEach(function(a){a(c)});a=[]};e.onerror=function(){a.forEach(function(a){a(null)});a=[]};b.insertBefore(e,b.firstChild)}}}(),M=function(){var a=[];return function(f,d,b,e,c,g,m){function k(a){var c={},f;for(f in a)c[f]="object"===typeof a[f]&&a[f]?k(a[f]):a[f];return c}var h=document.createElement("IFRAME");h.id=d;h.width=b;h.height=e;h.src=f.playerIframeLocation;h.style.border="none";
		m(h);var v=document.getElementById(d).contentWindow,I={},n={},p={},q=0,K={},z=0,t=1,r=null,J=null,L=void 0;window.addEventListener("message",function(d){var b,e=d.data.state;e&&(e.channelList&&(I=e.channelList),e.channel&&(n=e.channel),e.media&&(p=e.media),e.index&&(q=e.index),e.playState&&(K=e.playState),e.position&&(z=e.position),e.volume&&(t=e.volume),e.quality&&(r=e.quality),e.actualQuality&&(J=e.actualQuality),e.customEvents&&(L=e.customEvents));switch(d.data.type){case "event":"function"===
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        typeof limelightPlayerCallback?limelightPlayerCallback(d.data.id,d.data.eventName,d.data.data):"function"===typeof delvePlayerCallback&&delvePlayerCallback(d.data.id,d.data.eventName,d.data.data);break;case "init":v.postMessage({type:"init",embed:"../embed.js",flashVars:c,resourceLocations:f},"*");break;case "api":b={};for(var l in d.data.funcs){var e=d.data.funcs[l],g=function(a){return function(){v.postMessage({type:"func",name:a,args:Array.prototype.slice.call(arguments)},"*")}}(e);b[e]=g}b.registerPlayer=
			function(){};b.getPlayers=function(){return a};b.doGetActualQuality=function(){return J?J.name:null};b.doGetQuality=function(){return r?r.name:null};b.doGetQualityDetails=function(){return k({actual:J,selected:r})};b.doGetCurrentIndex=function(){return q};b.doGetCurrentMedia=function(){return k(p)};b.doGetCurrentChannel=function(){return k(n)};b.doGetCurrentChannelList=function(){return k(I)};b.doGetCurrentPlayState=function(){return k(K)};b.doGetCustomEvents=function(){return k(L)};b.doGetPlayheadPositionInMilliseconds=
			function(){return z};b.doSetVolume=function(){var a=b.doSetVolume;return function(b){b||(b=0);if("number"===typeof b)return 0>b&&(b=0),1<b&&(b=1),t=b,a(b)}}();b.doGetVolume=function(){return t};delete b.doGetChannels;delete b.doGetChannelMedia;b.getPlayer=function(){return b};b.getPlayerNodeByIdOrName=function(a){var b=document.getElementById(a);return b&&b.doPlay?b:(a=document.getElementsByName(a))&&null!=a.length?a[0]:null};LimelightPlayer=DelvePlayer=b;for(var m in b)h[m]=b[m];a.push(b)}})}}(),
	y=function(){function a(a){var b=document.cookie.indexOf(a+"="),c=b+a.length+1;if(!b&&a!=document.cookie.substring(0,a.length)||-1==b)return null;a=document.cookie.indexOf(";",c);-1==a&&(a=document.cookie.length);return unescape(document.cookie.substring(c,a))}function f(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)}).toUpperCase()}function d(a,b){if(void 0!==a){var c=!1;return function(){c||(c=!0,a.apply(b||
		this,arguments))}}}var b=f(),e={H264:m.Metrics.H264,HLS:m.Metrics.HLS},c=q.userAgent,g=q.platform,k=function(){var b=a("Limelight_Embed_Code_UserId");return function(){if(!b){var a=b=f(),c=365,e=new Date;e.setTime(e.getTime());c&&(c*=864E5);e=new Date(e.getTime()+c);document.cookie="Limelight_Embed_Code_UserId="+escape(a)+(c?";expires="+e.toGMTString():"")+""}return b}}(),n=function(){var a=+new Date;return function(){return new Date-a}}(),h=function(){var a=0;return function(b,c,e){var f="_limelight_embed_ajax_"+
		a++,d=document.createElement("IFRAME");d.id=f;d.name=f;d.style.cssText="display:none;width:0px;height:0px;";(document.getElementsByTagName("body")[0]||document.documentElement).appendChild(d);var h=document.createElement("FORM");h.setAttribute("target",f);h.setAttribute("method","POST");h.setAttribute("action",b);for(field in c)b=document.createElement("INPUT"),b.setAttribute("type","hidden"),b.setAttribute("name",field),b.setAttribute("value",JSON.stringify(c[field])),h.appendChild(b);d.appendChild(h);
		d.onload=function(){void 0!==e&&e();setTimeout(function(){d.parentNode.removeChild(d)},0)};h.submit()}}();return{HEARTBEAT:"Heartbeat",MEDIA_COMPLETE:"MediaComplete",PLAY:"Play",PAUSE:"Pause",SEEK:"Seek",START_SESSION:"StartSession",create:function(a,f,m){var p={},q=null;e.embedMode=m;var r={postEvent:function(c,e,d){var g={channelListId:p.channelListId||f.channelListId,channelId:p.channelId||f.channelId,mediaId:p.mediaId||f.mediaId,millisecondsElapsed:n()},l;for(l in g)void 0===g[l]&&(g[l]="");for(l in e)g[l]=
		void 0===e[l]?"":e[l];h(a+"/recordMetricsEvent",{sourceInstanceId:b,source:"Limelight Embed Code",sourceVersion:1,eventType:c,data:g},d)},postStartSessionEvent:function(){this.postEvent(y.START_SESSION,{adConfigurationChannelId:f.adConfigurationChannelId,htmlCapabilities:JSON.stringify(e),pageURL:window.location.href,platform:g,playerProviderId:"Delve Networks",userAgent:c,userId:k(),version:"1.6.1"})},postPlayStateEvent:function(a,b,c){var e=d(c);this.postEvent(a,{positionInMilliseconds:b},e);void 0!==
	c&&setTimeout(e,1E3)},setChannelListId:function(a){p.channelListId=a},setChannelId:function(a){p.channelId=a},setMediaId:function(a){p.mediaId=a},startHeartbeat:function(a){null!==q&&clearInterval(q);q=setInterval(function(){a.isPlaying()&&r.postEvent(y.HEARTBEAT,{droppedFrames:0,droppedFramesRatio:"",selectedMediaQuality:a.quality,positionInMilliseconds:a.getPosition(),maxBytesPerSecond:"",currentBitrate:""})},3E4)},stopHeartbeat:function(){null!==q&&clearInterval(q);q=null}};return r}}}(),N=function(){var a=
		0;return function(f,d){var b="_"+a++;f+="&jsonp=LimelightPlayerUtil.jsonpCallback."+b;var e=document.getElementsByTagName("head")[0]||document.documentElement,c=document.createElement("SCRIPT");c.type="text/javascript";c.src=f;c.charset="utf-8";LimelightPlayerUtil.jsonpCallback[b]=function(a){delete LimelightPlayerUtil.jsonpCallback[b];d(a);e&&e.removeChild(c)};c.onerror=function(){d(null)};e.insertBefore(c,e.firstChild)}}();return{jsonpCallback:[],initEmbed:function(a,f){f=f||{};var d=document.getElementById(a);
	if(null===d)return console&&(console.error&&"function"===typeof console.error)&&console.error("No such element: "+a),null;var b=d.width,e=d.height,c=d.firstChild;f.id=a;for(var g="",k={};null!==c;){if("PARAM"===c.nodeName)switch(c.name){case "flashVars":for(var g=c.value,k={},p=g.split("&"),h=0;h<p.length;h++){var n=p[h],q=n.indexOf("=");-1===q?k[decodeURIComponent(n)]="true":k[decodeURIComponent(n.substring(0,q))]=decodeURIComponent(n.substring(q+1))}break;case "wmode":f.wmode=c.value}c=c.nextSibling}f=
		E(f);c=f.embedMode||m.embedMode;return"flash"!==c?(d=G(d),B(d,f.resources,g,k,b,e,f.id,f.wmode,c)):d},embedPlayer:function(a,d,g,b,e){e=G(e);b=E(b);var c=b.embedMode||m.embedMode;return"flash"===c?p(e,m.loadingProtocol+"//assets.delvenetworks.com/player/fp10loader.swf",a,d,g,b.id,b.wmode):B(e,b.resources,null,a,d,g,b.id,b.wmode,c)}}}());

fxcm.limelight = new function() {
    var _settings = {
        organizationId: "5d0739a70aa04c01bc9f8355a446d088"
    };

    /**
     * Replaces the object passed in with a rendered limelight video player
     * @param {object} videoElement
     * @returns {string} id
     */
    this.renderLimelightVideo = function( videoElement ) {

        var $videoElement = videoElement;

        var id = _buildId( $videoElement );

        var video = _buildHTML( id, $videoElement.data( 'media-id' ) );

        $videoElement.replaceWith( video );

	    LimelightPlayerUtil.initEmbed( id, { embedMode: 'html' } );

        return id;

    };


    /**
     * Call to get Video Details from Limelight API
     * @param {string} mediaId
     * @param {function} callback function after details are returned
     */
    this.getVideoDetails = function( mediaId, callback ) {

        // Run AJAX request and get request back
        var request = _getLimelightVideoData( mediaId );

        // Run the success method which calls the callback function
        request.done( function( response ) {
            callback.call( this, _parseLimelightVideoXML( response, mediaId ) );
        });

        return;

    };

    /**
     * Adds a class size to the thumbnail depending on the current width
     * @param videoElement
     */
    this.setThumbnailSize = function( videoElement ) {
        var videoWidth = videoElement.outerWidth( true );

        videoElement.removeClass( 'large medium small');

        if( videoWidth >= 600 ) {
            videoElement.addClass( 'large' );
        } else if( videoWidth < 600 && videoWidth > 360 ) {
            videoElement.addClass( 'medium' );
        } else {
            videoElement.addClass( 'small' );
        }

        return;
    }

    /**
     * Renders the thumbnail element using the Limelight API Data
     * @param videoElement
     */
    this.renderLimelightThumbnail = function( videoElement ) {
        var mediaId = videoElement.data('media-id');

        this.getVideoDetails(mediaId, function (videoDetails) {

            // Add the splash image
            if( !videoElement.find('img')[0] ) {
                _addSplashImage(videoElement, videoDetails);
            } else {
                // If image already exists, simply trigger the rendered function
                _renderComplete( videoElement );
            }

            // Add the Title
            if( typeof videoElement.data('title') == 'undefined' || !videoElement.data('title') ) {
                _addTitle(videoElement, videoDetails);
            }

            // Add the Time element
            if( typeof videoElement.data('time') == 'undefined' || !videoElement.data('time') ) {
                _addTime(videoElement, videoDetails);
            }

        });
    }

    /**
     * AJAX call to the limelight API
     * @param mediaId
     * @returns {jqXHR} jqXHR Response
     * @private
     */
    function _getLimelightVideoData( mediaId ) {
       return $.ajax({
            url: '//api.video.limelight.com/rest/organizations/' + _settings.organizationId + '/media/' + mediaId + '/properties.xml',
            dataType: "xml",
            cache: true
        });
    }

    /**
     * Parses the XML response from the Limelight API
     * @param {XML} response
     * @param {string} mediaId
     * @returns {object} details
     * @private
     */
    function _parseLimelightVideoXML( response, mediaId ) {

        var details = {};

        details.mediaId = mediaId;
        details.title = $( response ).find( 'title').text();

        //Format the duration
        details.duration_orig = $(response).find( 'duration_in_milliseconds' ).text();
        var ms = details.duration_orig,
            min = ( ms/1000/60 ) << 0,
            sec = parseInt( ( ms/1000 ) % 60 );
        sec = ( sec < 10 ) ? "0" + sec : sec; // Format to have trailing zero if needed.
        details.duration_formatted = min + ':' + sec;

        // Format the thumbnails
        details.thumbnails = {} ;

        // Loop through each thumbnail and set url, width and height.
        $.each( $(response).find('thumbnail'), function( i, val ) {

            var thumbWidth = $( val ).attr( 'width'),
                thumbHeight = $( val ).attr( 'height'),
                thumbUrl = $( val ).text();

            // Set the appropriate key value for the thumbnail
            // Default sizes from limelight (in widths)
            var defaultSizes = [120, 540];

            // If the width is within one of these default sizes, set the key to it, otherwise set to custom (there is only one)
            var thumbKey = $.inArray( parseFloat( thumbWidth ), defaultSizes ) > -1 ? thumbWidth : 'custom';

            details.thumbnails['thumbnail_' + thumbKey] = {
                url : thumbUrl,
                width : thumbWidth,
                height : thumbHeight
            };

        } );

        return details;
    }

    /**
     * Adds a splash image to the thumbnail from the one supplied by Limelight API
     * @param {jQuery object} videoElement
     * @param {object} videoDetails
     */
    function _addSplashImage( videoElement, videoDetails ) {

        // First check if an image tag is current there, if not, add one.
        if( !videoElement.find( 'img' )[0] ) {
            videoElement.prepend( '<img src="" width="" height="" />' ); // legacy elm with width/height
            //videoElement.prepend( '<img src="" />' );
        }
        // Always get the biggest image possible (last key in object}
        var lastThumbnailKey = Object.keys( videoDetails.thumbnails )[Object.keys( videoDetails.thumbnails ).length-1];

        // Set the src, width, and height of image
        var $img = videoElement.find( 'img' );

        // Add load event for the image. If not, you get some flickering on page load. This adds the rendered class which has display block to show.
        //debugger;
        $img.one("load", function() {
	        _renderComplete( videoElement );
        });


        // Add all attributes to the image
        $img.closest('a').addClass( 'video' );
        $img.prop( 'src', videoDetails.thumbnails[lastThumbnailKey].url );
        $img.prop( 'width', videoDetails.thumbnails[lastThumbnailKey].width );
        $img.prop( 'height', videoDetails.thumbnails[lastThumbnailKey].height );
        $img.prop( 'title', videoDetails.title);
        $img.prop( 'alt', videoDetails.title+' video for FXCM');

        return;
    };

    /**
     * Add the title element to the thumbnail
     * @param {jQuery object} videoElement
     * @param {object} videoDetails
     */
    function _addTitle( videoElement, videoDetails ) {

        // First check if the title element exists, if not, add one.
        if( !videoElement.find( '.title' )[0] ) {
            videoElement.prepend( '<span class="title" />' );
        }

        // Populate the element with the title text.
        videoElement.find( '.title' ).text( videoDetails.title ).attr("title", videoDetails.title);

        return;
    };

    /**
     * Add the duration element to the thumbnail
     * @param {jQuery object} videoElement
     * @param {object} videoDetails
     */
    function _addTime( videoElement, videoDetails ) {
        // First check if the duration element is there, if not, add it
        if( !videoElement.find( '.time' )[0] ) {
            videoElement.find( 'img' ).after( '<span class="time" />' );
        }

        // Populate the element with the time text.
        videoElement.find( '.time' ).attr("title", videoDetails.title).html( '<span>'+videoDetails.duration_formatted+'</span>' );
        return;
    };

    /**
     * Generate ID for the video player
     * @param {object} videoElement
     * @returns {_L39._buildId.id|String} id
     */
    function _buildId( $videoElement ) {

        var id = 'limelight-player-' +  fxcm.lib.generateNumericID(7); // Limelight needs a unique id per video. Generate random ID based on date.

        if( $videoElement.data( 'autoplay' ) || $videoElement.hasClass( 'thumbnail' ) ) {
            id += '-limeautoplay';
        }

        return id;
    }

    /**
     * Run when the thumbnail is 100% rendered and loaded.
     * @param videoElement
     * @private
     */
    function _renderComplete( videoElement ) {
        videoElement.addClass( 'rendered' );
        fxcm.limelight.setThumbnailSize( videoElement );

        // description handler
        checkForCaption(videoElement);

    }

    /**
     * Checks video content for captions and wraps it
     * @param element
     */
    function checkForCaption( element ) {
        $(element).children().not('.description').not('.caption').wrapAll('<div class="thumbnail-inner"></div>');
        if ( element.find('.description').length || $(element).find('.caption').length ) {
            $(element).addClass('has-description');
        }
    }

    /**
     * Build the html for the embedded limelight video player
     * @param {string} id
     * @param {number} mediaId
     * @returns {String|_L39._buildHTML.video} video
     */
    function _buildHTML( id, mediaId ) {
        var video = "";
        video +=        '<span class="LimelightEmbeddedPlayer ' + id + '">';
        video +=            '<object type="application/x-shockwave-flash" id="' + id + '" name="' + id + '" class="LimelightEmbeddedPlayerFlash" width="480" height="270" data="//video.limelight.com/player/loader.swf">';
        video +=                '<param name="movie" value="//video.limelight.com/player/loader.swf"/>';
        video +=                '<param name="wmode" value="transparent"/>';
        video +=                '<param name="allowScriptAccess" value="always"/>';
        video +=                '<param name="allowFullScreen" value="true"/>';
        video +=                '<param name="autoplay" value="true"/>';
        video +=                '<param name="flashVars" value="mediaId=' + mediaId + '&amp;playerForm=0ab6003423ff4810ac7adbdc8db73be7"/>';
        video +=            '</object>';
        video +=        '</span>';

        return video;
    }

}();

/**
 * Limelight Callback for all videos. Each video runs through this function during many event states.
 * @param {Number} playerId
 * @param {String} eventName
 * @param {String} data
 * @returns null
 */
function limelightPlayerCallback (playerId, eventName, data) {
    switch(eventName) {
        case 'onPlayerLoad':
            break;
        case 'onMediaLoad':
            // Check if the id has limeautoplay and play the video on load
            if( playerId.indexOf("limeautoplay") > -1 && $(LimelightPlayer).data( 'limePlayerComplete' ) != "true" ) {
                LimelightPlayer.registerPlayer( playerId );
                LimelightPlayer.doPlay();
            }
            break;
        case 'onMediaComplete':
            // Once complete add a data property of limePlayerComplete so it won't autoplay
            $(LimelightPlayer).data( 'limePlayerComplete', 'true' );
            break;
        case 'onPlayStateChanged':
            break;
        case 'onPlayheadUpdate':
            break;
    }
}
fxcm.internal = new function() {
	var thatInternal = this;

	// Maps special characters to their non-special equivalents.
	this.specialCharMap = {
		'à': 'a',
		'â': 'a',
		'ä': 'ae',
		'æ': 'ae',
		'ç': 'c',
		'é': 'e',
		'è': 'e',
		'ê': 'e',
		'ë': 'e',
		'î': 'i',
		'ï': 'i',
		'ô': 'o',
		'ö': 'oe',
		'œ': 'oe',
		'ù': 'u',
		'û': 'u',
		'ü': 'ue',
		'ß': 'ss',
		'ÿ': 'y'
	};


	/* Concatenates all functions that are passed in and appends all strings as html within a div to the body
	Usage:

	var trackingFunction = fxcm.internal.trackingFactory(someFunction, '<img src="trackingPixel" />', trackingRelatedFunction);
	...
	trackingFunction();
	*/
	this.trackingFactory = function() {
		var outterArguments = arguments;

		return function() {
			for (var argumentIndex = 0; argumentIndex < outterArguments.length; argumentIndex++) {
				var outterArgument = outterArguments[argumentIndex];
				if (typeof outterArgument === 'string') {
					var trackingDiv = document.createElement('div');
					trackingDiv.innerHTML = outterArgument;
					trackingDiv.setAttribute('style', 'display: none');
					document.body.appendChild(trackingDiv);
				} else if (typeof outterArgument === 'function') {
					outterArgument.apply(this, arguments);
				}
			}
		};
	};

	// Generalized function for jQuery submitHandlers that redirect the user after form submission
	function _AJAXFormRedirectValidatorSubmitHandlerFactory(continuationFunction, redirectURL, id) {
		if (typeof redirectURL !== 'string') { return null; }

		var callback = function() { document.location.href = redirectURL; };

		var continuationArguments = fxcm.lib.shiftArray(arguments, 2);
		continuationArguments.unshift(callback);

		return continuationFunction.apply(this, continuationArguments);
	}

	/* Generalized function for creating jQuery Validator submitHandlers
	Class is the conversion type's class (fxcm.Eloqua or fxcm.Demo)
	callback is the callback function on success
	idSetter is the function for setting the conversion's id ('setFormName' or 'setRB')
	id is the conversion's id (the formName or the RB) */
	function _AJAXFormValidatorSubmitHandlerFactory(Class, successCallbackSetter, successCallback, idSetter, id, configFunction) {
		var outterArguments = arguments;


		return function(form) {

			var formButton = $(form).find('button.submit');

			formButton.addClass( 'loading' ).on( 'click', function ( e ) {
				e.preventDefault();
			});

			var conversion = new Class();

			// set the ID
			if (typeof id === 'string') {
				conversion[idSetter].apply(this, fxcm.lib.shiftArray(outterArguments, 4));	// Remove all arguments before id
			}


			if (typeof successCallback === 'string') {	// Generic Eloqua
				var internalCallback = function() {
						var confBox = $('<div class="confBox" style="display:block">' + successCallback + '</div>');
						_copyClasses(form, confBox, '_conf');
						$(form).closest('.formBox').replaceWith(confBox);
						amplify.publish( 'fxcm.form.onConfBoxShow', {
							'form' : form
						});
					};
			} else if (typeof successCallback === 'object') {	// Generic Demo
				var internalCallback = function(username, password) {
						if (typeof username === 'string' && typeof password === 'string')  {
							var confText = successCallback.fxtr;
							confText = confText.replace('%username%', username).replace('%password%', password);
						} else {
							var confText = successCallback.eloqua;
						}
						var confBox = $('<div class="confBox" style="display:block">' + confText + '</div>');
						_copyClasses(form, confBox, '_conf');
						$(form).closest('.formBox').replaceWith(confBox);
					};
			} else if (typeof successCallback === 'function') {	// Non-generic
				var internalCallback = function() {
						Array.prototype.unshift.call(arguments, form);
						successCallback.apply(this, arguments);
					};
			} else {
				var internalCallback = function() {};
			}

			// Run the configuration function
			if (typeof configFunction === 'function') {
				configFunction(conversion);
			}

			conversion[successCallbackSetter].call(this, internalCallback);

			/****** Begin demo-specific logic ******/

			if (idSetter === 'setRB') { // If current form is a demo

				// Create logic for swapping characters
				function replaceSpecialChars(value){
					// Break field value into separate words, then run each word through the replace function, swapping out special chars while keeping original capitalization
					// Returns a string
					return $.map(value.split(' '), function(arrayPart, arrayIndex){

						// Begin regex replace
						return arrayPart.replace(/./g, function (character, index, word){

							var cleanChar = character; // if character is not a special char, we will return it unmodified
							var isLowerCase = character === character.toLowerCase();
							var adjacent = word.charAt(index + 1);

							// Replace character and figure out correct capitalization
							if (fxcm.internal.specialCharMap[character.toLowerCase()]) {
								cleanChar = fxcm.internal.specialCharMap[character.toLowerCase()]; // Find replacement character
								cleanChar = isLowerCase ? cleanChar : function(char, adj){ // Set proper capitalization
									return (char.length === 2 && adj !== '' && adj === adj.toLowerCase() ) ? // Check if this is a two-letter replacement that needs mixed case
										char.charAt(0).toUpperCase() + char.charAt(1) : // If yes, capitalize only the first letter
										char.toUpperCase();								// Otherwise, capitalize both letters
								}(cleanChar, adjacent);
							}

							return cleanChar;
						}); // End regex replace

					}).join(' '); // End $.map
				}

				// Scrape values from submitted form
				var originalForm = fxcm.lib.serializeForm(form);
				var sanitizedForm = document.createElement('form');
				sanitizedForm.setAttribute('name', form.name);
				var newField;

				// Swap out special chars and generate sanitized form to submit to fxcm.Demo
				for (field in originalForm) {
					var val = originalForm[field];

					if(val !== '') { // only bring over populated fields
						if (field.indexOf('demo.') > -1) { // replace special chars only for "demo." fields
							val = replaceSpecialChars(val);
						}
						newField = document.createElement('input');
						newField.name = field;
						newField.type = 'hidden';
						newField.value = val;
						sanitizedForm.appendChild(newField);
					}
				}
			}
			/****** End special character logic ******/

			// Submit - submits "sanitizedForm" in the case of demos and "form" in the case of eloqua
			conversion.submit(sanitizedForm || form);

		};
	}
	// Copies the classes from source to destination, optionally adding suffix
	function _copyClasses(source, destination, suffix) {
		if (typeof suffix !== 'string') { suffix = ''; }

		var classes = $(source).attr('class').split(' ');
		destination = $(destination);
		for (var classIndex = 0; classIndex < classes.length; classIndex++) {
			destination.addClass(classes[classIndex] + suffix);
		}
	}

	/********************* BEGIN Demo submitHandlers ****************/
	/* How to setup the jQuery Validate submitHandler for Demo forms

	Show the on-page confBox:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.confBoxDemoValidatorSubmitHandler;

	Show the generic Thank You text:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.genericDemoValidatorSubmitHandler;

	Custom callback function:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoValidatorSubmitHandlerFactory(yourFunction, optionalRB);

	Custom confirmation text:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoValidatorSubmitHandlerFactory('confirmationText', optionalRB);

	Redirect:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoRedirectValidatorSubmitHandlerFactory('redirectURL', optionalRB);

	Do nothing after submission:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoValidatorSubmitHandlerFactory();

	Show the on-page confBox with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.confBoxCountryDemoValidatorSubmitHandler;

	Show the generic Thank You text with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.genericCountryDemoValidatorSubmitHandler;

	Custom callback function with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoCountryValidatorSubmitHandlerFactory(yourFunction);

	Custom confirmation text with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoCountryValidatorSubmitHandlerFactory('confirmationText');

	Redirect with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoCountryRedirectValidatorSubmitHandlerFactory('redirectURL');

	Do nothing after submission with the selected country determining the RB:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.demoCountryValidatorSubmitHandlerFactory();

	Custom tracking on form submission:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.trackingFactory(fxcm.internal.confBoxDemoValidatorSubmitHandler, '<img src="trackingPixel" />', otherTrackingFunction); */



	/* Produces a submitHandler function for jQuery Validator on Demo forms
	The rb field can be left off the form if desired and instead passed in as the second parameter to demoValidatorSubmitHandlerFactory
	Usage:
	callback is not passed in (undefined): The form submits and no UI changes are made
	callback is a function: Invokes the callback after the form submits
	callback is text: Replaces the form with a confBox containing the text after the form submits */
	this.demoCountryRedirectValidatorSubmitHandlerFactory = function(redirectURL) {
		return _AJAXFormRedirectValidatorSubmitHandlerFactory(thatInternal.demoCountryValidatorSubmitHandlerFactory, redirectURL);
	};

	this.demoCountryValidatorSubmitHandlerFactory = function(callback) {
		return function(form) {
			var handler = _AJAXFormValidatorSubmitHandlerFactory(fxcm.Demo, 'setSuccessCallback', callback, 'setCountry', $(form).find('select[name=demo.country]').val());

			return handler(form);
		};
	};

	this.demoRedirectValidatorSubmitHandlerFactory = function(redirectURL, rb) {
		return _AJAXFormRedirectValidatorSubmitHandlerFactory(thatInternal.demoValidatorSubmitHandlerFactory, redirectURL, rb);
	};

	this.demoValidatorSubmitHandlerFactory = function(callback, rb, configFunction) {

		if (typeof rb === 'function' && configFunction === undefined) { // Did not pass in id but passed in configFunction
			configFunction = rb;
			rb = undefined;
		}

		return _AJAXFormValidatorSubmitHandlerFactory(fxcm.Demo, 'setSuccessCallback', callback, 'setRB', rb, configFunction);
	};

    /**
     * Populate the confBox with username, password, and webtsurl if exists.
     * @param {jQuery} confParent
     * @param {string} username
     * @param {string} password
     * @param {string} webtsurl
     */
    this.populateConfBox = function( confParent, username, password, webtsurl, conversionData ) {

    	var els = {
    		$username : confParent.find( '.success span.demoUsername' ),
		    $password : confParent.find( '.success span.demoPassword' ),
		    $server : confParent.find( '.success span.demoServer' ),
		    $tsWebLink : confParent.find( '.success a.tsWebLink' ),
		    $countdown : confParent.find( '.success span.tsWebCountdown' ),
	    };

    	els.$username.text( username );
    	els.$password.text( password );

        // If webtsurl token is supplied, update the TS Web platform url with new one.
	    if( typeof webtsurl === 'string' && els.$tsWebLink.length ) {

		    var origHref = els.$tsWebLink.attr( 'href' );

	    	// convert to newer trading station link if old one is supplied
	    	webtsurl = webtsurl.replace( 'tsweb.fxcorporate.com/drlanding.jsp', 'tradingstation.fxcm.com' );
	    	webtsurl = webtsurl.replace( 'token=', 'token_id=' );
	    	webtsurl += /conn=demo/.test( webtsurl ) ? '' : '&conn=demo';
	    	webtsurl += /sb=true/.test( origHref ) ? '&sb=true' : '';

		    // decorate as needed
		    if( typeof gtmGenerateDecoratedUrl === 'function' )
			    webtsurl = gtmGenerateDecoratedUrl( webtsurl );

		    els.$tsWebLink.attr( 'href', webtsurl );

		    // after 60 seconds we need to revert the link to no longer have the token
		    setTimeout( function(){
		    	// if there is no original href value, remove the token from the returned tsweb url
		    	if( typeof origHref !== 'string' || !origHref.length ) {
				    origHref = webtsurl.replace( /&?token_id=[^&]+/, '' );
				    origHref = origHref.replace( /&?conn=demo/, '' );
				    origHref = origHref.replace( '?&', '?' );
			    }
			    // set href attribute to non-tokenized link
			    els.$tsWebLink.attr( 'href', origHref );
		    }, 60000 );
	    }

        // populate server text if element exists
        if( els.$server.length ) {
	        els.$server.text( function() {
		        return typeof conversionData === 'object' && typeof conversionData.server === 'string' ? conversionData.server : 'n/a';
            });
        }
    };

	// Hides the demo form and shows the confirmation div
	this.showDemoConfBox = function(form, username, password, webtsurl, conversionData) {

		if( typeof fxcmTsDemo === 'object' ) {
			fxcmTsDemo.updateTsWebWindow( fxcmTsDemo.validateTsWebUrl( webtsurl ) );
		}

		var formParent = $(form).closest('.formBox');
		var confParent = formParent.next('.confBox');

		// FXTR signup (username and password exist)
		if (typeof username === 'string' && typeof password === 'string') {

            // Populate the confbox with username, password, and webtsurl
            thatInternal.populateConfBox( confParent, username, password, webtsurl, conversionData );

			// show success content
			confParent.find('.success').show();

		} else {	// Maintenance signup (no username and password)
			confParent.find('.maint').show(); // show maint content
		}

		formParent.hide();
		confParent.fadeIn(100);

		if( typeof webtsurl !== 'string' && typeof fxcm.ui !== 'undefined' && typeof fxcm.ui.SmoothScroll !== "undefined"){
			var demoFormScroll = new fxcm.ui.SmoothScroll({
				target: confParent
			});
			demoFormScroll.scrollNow();
		}
	};



	// Shows the confBox that already exists on the page after the form submits
	this.confBoxDemoValidatorSubmitHandler = thatInternal.demoValidatorSubmitHandlerFactory(thatInternal.showDemoConfBox);
	this.confBoxCountryDemoValidatorSubmitHandler = thatInternal.demoCountryValidatorSubmitHandlerFactory(thatInternal.showDemoConfBox);

	// Replaces the form with generic Thank You text after the form submits
	var _genericFXTRConfText = {
									fxtr:'<h3>Congratulations</h3> <p>You have successfully signed up for a demo account. Your username and password are below:</p> <p><strong>Username:</strong> %username% <br /> <strong>Password:</strong> %password%</p>',
									eloqua:'<h3>Thank you</h3> <p>Our demo registration is currently unavailable due to routine weekend maintenance. When the system again becomes available, a representative will send your demo account login information to the e-mail address you provided.</p>'
								};
	this.genericDemoValidatorSubmitHandler = thatInternal.demoValidatorSubmitHandlerFactory(_genericFXTRConfText);
	this.genericCountryDemoValidatorSubmitHandler = thatInternal.demoCountryValidatorSubmitHandlerFactory(_genericFXTRConfText);
	/********************** END Demo submitHandlers *****************/


	/********************* BEGIN Eloqua submitHandlers ****************/
	/*How to setup the jQuery Validate submitHandler for Eloqua forms
	Show the on-page confBox:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.confBoxEloquaValidatorSubmitHandler;

	Show the generic Thank You text:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.genericEloquaValidatorSubmitHandler;

	Custom callback function:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.eloquaValidatorSubmitHandlerFactory(yourFunction);

	Custom confirmation text:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.eloquaValidatorSubmitHandlerFactory('confirmationText');

	Redirect:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.eloquaRedirectValidatorSubmitHandlerFactory('redirectURL');

	Do nothing after submission:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.eloquaValidatorSubmitHandlerFactory();

	Custom tracking on form submission:
	jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.trackingFactory(fxcm.internal.confBoxEloquaValidatorSubmitHandler, '<img src="trackingPixel" />', otherTrackingFunction); */



	/* Produces a submitHandler function for jQuery Validator on Eloqua forms
	The elqFormName field can be left off the form if desired and instead passed in as the second parameter to eloquaValidatorSubmitHandlerFactory
	Usage:
	callback is not passed in (undefined): The form submits and no UI changes are made
	callback is a function: Invokes the callback after the form submits
	callback is text: Replaces the form with a confBox containing the text after the form submits */
	this.eloquaRedirectValidatorSubmitHandlerFactory = function(redirectURL, elqFormName) {
		return _AJAXFormRedirectValidatorSubmitHandlerFactory(thatInternal.eloquaValidatorSubmitHandlerFactory, redirectURL, elqFormName);
	};

	this.eloquaValidatorSubmitHandlerFactory = function(callback, elqFormName) {
		return _AJAXFormValidatorSubmitHandlerFactory(fxcm.Eloqua, 'setCallback', callback, 'setElqFormName', elqFormName);
	};

	// Hides the form and shows the confirmation div
	this.showEloquaConfBox = function(form, noAjaxError, data) {
		var formParent = $(form).closest('.formBox');
		var confParent = formParent.next('.confBox');

		if( noAjaxError && ! /Error Status Code/.test( data ) ) {
			confParent = confParent.add( confParent.find( '.success' ) );
		}
		else {
			confParent = confParent.add( confParent.find( '.error' ) );
			console.warn( "Marketing Cloud Submission Error:")
			console.warn( data );
		}

		formParent.slideUp( 'fast', function() {
			confParent.show();

			amplify.publish( 'fxcm.form.onConfBoxShow', {
				'form' : form
			});

			if(typeof fxcm.ui !== 'undefined' && typeof fxcm.ui.SmoothScroll !== "undefined"){
				setTimeout( function() {
					var elqFormScroll = new fxcm.ui.SmoothScroll({
						target: confParent
					});
					elqFormScroll.scrollNow();
				}, 3000 );

			}
		});


	};

	// Shows the confBox that already exists on the page after the form submits
	this.confBoxEloquaValidatorSubmitHandler = thatInternal.eloquaValidatorSubmitHandlerFactory(thatInternal.showEloquaConfBox);

	// Replaces the form with generic Thank You text after the form submits
	this.genericEloquaValidatorSubmitHandler = thatInternal.eloquaValidatorSubmitHandlerFactory('<h3>Thank you</h3> <p>Your information has been received and will be processed shortly.</p>');
	/********************** END Eloqua submitHandlers *****************/

	/*
		Find and tranform demo country field; append new input element if it does not already exist
	*/
	this.setDemoCountryField = function(countryField) {
		var countryField = $(countryField);

		// demo format: lowercase, underscores for spaces and dashes, parenthesis and periods removed
		var countrySelected = countryField.val().toLowerCase().replace(/[ \-]/g,"_").replace(/[()\.]/g,"");
		if ($('input[name="demo.country"]').length > 0) {
			$('input[name="demo.country"]').val(countrySelected);
		}
		else {
			$('<input>').attr('type','hidden').attr('name','demo.country').val(countrySelected).appendTo(countryField.closest('form'));
		}
	};

	/*
		Show/hide demo requested spans within confBox
	*/
	this.toggleDemoConfText = function(demoRequested) {
		if (demoRequested) {
			$('.demo-not-requested').hide();
			$('.demo-requested').show();
		}
		else {
			$('.demo-not-requested').show();
			$('.demo-requested').hide();
		}
	};
	/********************* END Seminar Events Eloqua and Demo Functions ****************/

	/********************* BEGIN Create Globalize Instance ****************/
	/*
		If there is no Globalize object detected, create a prototype with base methods returning formatted values from the data object.
		IMPORTANT: Only spreads formatting values are supported. CFD Oil Tables are not supported.
	*/
	this.createTempGlobalize = function() {

		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var monthNamesAbr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var culture = {
			calendar: {
				patterns: {
					dmy: "MMMM d, yyyy", // Show month date, year (added)
					m: "MMMM", // Show just the name of the month (added)
					dm: "dd-MMM" // Show the date and abbrevaited month (added)
				}
			}
		};

		var Globalize = function Globalize() {};

		Globalize.culture = function() {
			return culture;
		};

		Globalize.localize = function(message) {
			return message;
		};

		Globalize.format = function(value, view) {
			switch (view) {
				case 'n1': // for spreads with 1 decimal place
					return value.toFixed(1);
				case 'p0': // for savings percentage 0 decimal places
					return ((value * 100).toFixed(0) + "%") ;
				case 'p2': // for savings percentage 2 decimal places
					return ((value * 100).toFixed(2) + "%") ;
				case 'Y': // for spreads date
					return (monthNames[value.getMonth()] + " " + value.getFullYear());
				case 'MMMM d, yyyy': // for spreads date
					return (monthNames[value.getMonth()] + " " + value.getDate() + ", " + value.getFullYear());
				case 'MMMM': // for oil month only date
					return (monthNames[value.getMonth()]);
				case 'dd-MMM': // for oil date-month date
					return (value.getDate() + "-" + monthNamesAbr[value.getMonth()]);
				default:
					return value.toString();
			}
		};

		window.Globalize = Globalize; // bring scope of this Globalize to the global window
	};

	this.globalizeExists = function() {
		var exists = (typeof Globalize === 'function');

		if(!exists) {
			thatInternal.createTempGlobalize();
		}

		return exists;
	};
	/********************* END Create Globalize Instance ****************/

	/******************** START Dynamic Form Names ****************/

	// generate a form name for a given form
	// this will not modify a form, only return a string for the form name
	this.generateDynamicFormName = function( form, opts ){
		if( typeof form === 'undefined' ){ return false; }

		var $formEl;
		var formNameArr = [];

		// find the form element first
		if( fxcm.lib.isJqueryElement( form ) && form.length ){
			$formEl = form;
		}
		else if( typeof form === 'string' && form.charAt(0) === '#' && document.getElementById(form.slice(1)) !== null ){
			$formEl = $(form);
		}
		else{
			return false;
		}

		// map of values needed to build form name
		var formNameObj = {
			rb : null,
			category : null,
			type : null,
			platform : null,
		};

		// var to hold mapping of form types to their respective categories
		var typeToCatMap = {
			'event' : ['seminar', 'webinar', 'major'],
			'demo' : ['lp', 'globalside', 'main', 'product'],
			'lead' : ['lead'],
			'newsletter' : ['newsletter'],
			'business' : ['business']
		};

		// function to determine category from passed type
		var getCategoryFromType = function( type ){
			if( typeof type !== 'string' ){ return false; }
			var found;
			for( var cat in typeToCatMap ){
				if( $.inArray( type, typeToCatMap[cat] ) > -1 ){
					found = cat;
				}
			}
			return typeof found === 'string' ? found : false;
		};

		// let's check the options argument first
		// only accept values for which the param is available and valid
		if( typeof opts === 'object' ){
			for( var option in opts ){
				var doAccept = false;
				if( typeof opts[option] === 'string' && opts[option].length ){
					if( doAccept ){
						formNameObj[option] = opts[option];
					}
				}
			}
		}

		// determine the service the form utilizes, demo or eloqua
		if( !formNameObj.type ){
			formNameObj.type = $formEl.data( 'form-type' );
		}
		if( !formNameObj.category ){
			if( formNameObj.type === 'live-account' ) {
				formNameObj.category = formNameObj.type;
				delete formNameObj.type;
			}
			else if( typeof formNameObj.rb === 'string' ){
				formNameObj.category = 'demo';
			}
			else if( typeof $formEl.find( '[name="rb"]' ).val() === 'string' ) {
				formNameObj.category = 'demo';
				formNameObj.rb = $formEl.find( '[name="rb"]' ).val();
			}
			else if( typeof $formEl.find( '[name="elqFormName"]' ).val() === 'string' ){
				var cacheCatFromType = getCategoryFromType( formNameObj.type );
				formNameObj.category = cacheCatFromType ? cacheCatFromType : 'other';
			}
			else if( typeof $formEl.attr( 'action' ) === 'string' && $formEl.attr( 'action' ).match( /.+\.salesforce\.com.+/ ) !== null ){
				formNameObj.category = getCategoryFromType( 'business' );
				delete formNameObj.type;
			}
			else{
				formNameObj.category = 'other';
			}
		}

		// add platform and account type if available
		if( formNameObj.category === 'demo' ){
			if( !formNameObj.platform ){
				formNameObj.platform = fxcm.registration.demoRBMap[formNameObj.rb]['platform'];
			}
		}
		else{
			delete formNameObj.platform;
		}

		// get siteId
		formNameObj.siteId = typeof fxcmcom === 'object' && fxcmcom.base_path ? 'fxcm' + fxcmcom.base_path.slice( 1, -1 ) : false;

		// do some extra tests for site Id if not initially found
		if( !formNameObj.siteId ) {
			if( /^[a-z0-9]+\.quantnews\.com/i.test( location.hostname ) ) {
				formNameObj.siteId = 'quantnews';
			}
		}

		// if we have at least a siteID and a category, we can build the form name
		if( formNameObj.siteId && formNameObj.category  ){

			// remove type if duplicate of category
			if( formNameObj.type === formNameObj.category ){
				delete formNameObj.type;
			}

			// push everything into the array in order
			formNameArr.push( formNameObj.siteId );
			formNameArr.push( formNameObj.category );
			if( typeof formNameObj.type === 'string' ){
				formNameArr.push( formNameObj.type );
			}
			if( typeof formNameObj.platform === 'string' ){
				formNameArr.push( formNameObj.platform );
			}

			formNameArr.push( document.location.pathname.substr( 1 ) );

			// return form name concatenated with pipes, limit to 150 characters
			return formNameArr.join( '|' ).substr( 0, 150 );
		}
		else{
			return false;
		}

	};

	// set a dynamic form name on a given form
	this.setDynamicFormName = function( form, opts ){

		var $formEl;

		// find the form
		if( fxcm.lib.isJqueryElement( form ) && form.length ){
			$formEl = form;
		}
		else if( typeof form === 'string' && form.charAt(0) === '#' && document.getElementById(form.slice(1)) !== null ){
			$formEl = $(form);
		}
		else{
			return false;
		}

		var newFormName = thatInternal.generateDynamicFormName( $formEl, opts );

		if( newFormName ){
			$formEl.attr( 'name', newFormName );
			return newFormName;
		}
		else{
			return false;
		}

	};
	/******************** END Dynamic Form Names ****************/

	/******************** START Auto Country Select ****************/
	this.setCountrySelectValue = function( countrySelect ){

		// first check the country, if we don't know it then don't go any further
		var redirectDataCountry = typeof redirectData === 'object' && typeof redirectData.country === 'string' ? redirectData.country : '';
		if( !redirectDataCountry.length ){
			return false;
		}

		/**
		 * Convert a string to a sanitized version (all characters to lowercase, and replace dashes, periods, commas and ampersands with an underscore)
		 * @param originalString
		 * @returns {*}
		 * @private
		 */
		function _sanitizeString(originalString){
			if( typeof originalString !== 'string' ){ return false; }
			return originalString.toLowerCase().replace(/[-_\s.,]+|(?:&[a-z]{3,6};)|&/gi,'_');
		};

		// sanitize the user's country
		var sanitizedUserCountry = _sanitizeString( redirectDataCountry );
		var matchingOptionInd = 0;
		var $selectEl;

		// verify if countrySelect is an element in the DOM
		if( fxcm.lib.isJqueryElement( countrySelect ) ){
			$selectEl = countrySelect;
		}
		else if( typeof countrySelect === 'string' && countrySelect.charAt(0) === '#' && document.getElementById(countrySelect.slice(1)) !== null  ){
			$selectEl = $(countrySelect);
		}
		else{
			return false;
		}

		//Check all options and try to find the one with a matching country
		$selectEl.find( 'option' ).each( function( i, v ){
			var thisSanitizedName = _sanitizeString( $(this).attr( 'value' ) );
			if( thisSanitizedName === sanitizedUserCountry && !$(this).prop( 'disabled' ) ) {
				matchingOptionInd = i;
				return false;
			}
		});

		// Update the selected country
		if( matchingOptionInd ) {
			$selectEl.prop( 'selectedIndex', matchingOptionInd ).trigger( 'change' );
		}

	};
	/******************** END Auto Country Select ****************/

	/**
	 * Generate a unique string
	 * @param {number|boolean} [strLen]
	 * @param {boolean} [incTimeStamp]
	 * @returns {string}
	 */
	this.generateUniqueString = function( strLen, incTimeStamp ) {
		var newChar = '';
		var newString = '';
		var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split( '' );

		// quick helper to generate a random number
		function getRandInt( min, max ) {
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		}

		// if length wasn't passed but boolean was, set for timestamp inclusion
		if( typeof strLen === 'boolean' ) {
			incTimeStamp = strLen;
		}
		// set length to default of 20 if invalid or not passed
		strLen = typeof strLen !== 'number' ? 20 : strLen;

		// start new string with time stamp if requested
		if( incTimeStamp ) {
			newString = Date.now().toString();
			// reduce remaining length by existing length
			strLen -= newString.length;
		}

		// add new random characters
		for( var j = 0; j < strLen; j++ ) {
			newChar = chars[ getRandInt( 1, chars.length ) - 1 ];
			newChar = getRandInt( 0, 1 ) ? newChar : newChar.toUpperCase();
			newString += newChar;
		}

		return newString;
	};

}();
/* --------- Simpletip abstraction class -----------*/
/* Parameters:
- element: required. Pass in valid DOM element
*/
fxcm.Tooltip = fxcm.lib.makeClass();
fxcm.Tooltip.prototype.init = function(element) {
	var thatTooltip = this;	
	
	function showTip(parentEl) {
		var tip = parentEl.find('.tooltip');
		var parentW = parentEl.width();
		var parentX = parentEl.offset().left;
		var tipW = tip.width();
		$('.tooltip').not($(tip)).stop(true, true).fadeOut(200);
		if(((parentX + (parentW / 2)) - (tipW / 2)) + tipW > $(window).width()){
			var tipX = parentW - tipW;
			tip.addClass('tooltip-align-right');
		}
		else{
			var tipX = (parentW - tipW) / 2;
			tip.removeClass('tooltip-align-right');
		}
		tip.css('left', tipX + "px");
		tip.css('top', '100%');
		tip.stop(true, true).fadeIn(200);
	}
	
	function hideTip(tipEl){
		tip.stop(true, true).fadeOut(200);
	}
	
	// Get parent element
	if($(element).length < 0){ 
		return false;
	}
	else{
		if($(element).find('.tooltip').length < 0){
			return false;
		}
	}
	
	var parentEl = $(element);
	var tip = parentEl.find('.tooltip');
	
	if(fxcm.device.isTouch()){
		parentEl.click(function(){
			if(!tip.is(':visible')){
				showTip(parentEl);
			}
			else{
				hideTip(parentEl);
			}
		});
	}
	else{
		parentEl.hover(
			function(){
				showTip(parentEl,tip);
			},
			function(){
				hideTip(parentEl);
			}
		);
	}
}
fxcm.TwitterStream = function() {
	if (typeof $.fn.linkUrl !== 'function') {
		$.fn.extend({
			linkUrl: function() {
				var returning = [];
				var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
				this.each(function() {
					returning.push(this.replace(regexp,'<a class=\"textlink\" target=\"_blank\" href=\"$1\">$1</a>'));
				});
				return $(returning);
			}
		});
	}
	
	if (typeof $.fn.linkUser !== 'function') {
		$.fn.extend({
			linkUser: function() {
				var returning = [];
				var regexp = /^[\@]+([A-Za-z0-9-_]+)/gi;
				this.each(function() {
					returning.push(this.replace(regexp,'<a class=\"textlink" target=\"_blank\" href=\"http://twitter.com/$1\">@$1</a>'));
				});
				return $(returning);
			}
		});
	}

	function dateString(str)
	{
		var values = str.split(' ');
		var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var d = new Date(values[1] + ' ' + values[2] + ' ' + values[5] + ' ' + values [3] + ' ' + values[4]);
		var day = d.getDate();
		var m = d.getMonth();
		var time = d.toLocaleTimeString();

		return day + ' ' + month[m] + ' ' + time;
	}
	
	var focus = true;

	var maxSize = 40; //default

	this.setMaxSize = function(maxSizeParam)
	{
		maxSize = maxSizeParam;
	};

	var size = 0;

	var textLimit = -1;

	this.setTextLimit = function(textLimitParam)
	{
		textLimit = textLimitParam;
	};

	this.getSize = function()
	{
		return size;
	};

	this.items = {};
	var oldestKey = -1;
	var target;
	var feedURL;
	var asyncTimeout = 30000;

	this.setAsyncTimeout = function(asyncTimeoutParam)
	{
		asyncTimeout = asyncTimeoutParam;
	};

	var firstRun = true;

	var avatarWidth = 48;
	var avatarHeight = 48;

	this.setAvatarSize = function(avatarWidthParam, avatarHeightParam)
	{
		avatarWidth = avatarWidthParam;
		avatarHeight = avatarHeightParam;
	};

	var containingList = $('<ul id="tweetListUL" class="items">')[0];

	var pauseImageDiv = $('<div id="pauseImageDiv"></div>');
	pauseImageDiv.hide();

	var that = this;
	var doRun = false;

	var pauseTimeout = 10800000; // default (copied from current dailfyx-twitter app)
	//var pauseTimeout = 10000;

	this.setPauseTimeout = function(paramPauseTimeout)
	{
		pauseTimeout = paramPauseTimeout;
	};

	this.setPauseImage = function(pauseImageUrl, pauseImageWidth, pauseImageHeight)
	{
		if(document.getElementById('pauseImage'))
			$(document.getElementById('pauseImage')).remove();

		var button = $('<img id="pauseImage" src="' + pauseImageUrl  +
							   '" alt="Launch Stream" width="' + pauseImageWidth +
							   '" height="' + pauseImageHeight + '" border="0" />').click(
																					function()
																					{
																						pauseImageDiv.hide();
																						that.stop();
																						that.start();
																					});

		pauseImageDiv.append(button);
	};

	var defaultPauseImageUrl = 'http://www.dailyfx.com/design/default/img/marketnews/launch-forex-stream.gif';
	var defaultPauseImageWidth = 514;
	var defaultPauseImageHeight = 86;

	this.setPauseImage(defaultPauseImageUrl, defaultPauseImageWidth, defaultPauseImageHeight);

	var newItems = 0;
	var title = document.title;
	var updateId = 0;

	var pollIntervalMillis = -1;

	var transformFunction = transformTweet;

	this.setTransformFunction = function(transformFunctionParam)
	{
		transformFunction = transformFunctionParam;
	};

	this.setLongPoll = function(pollIntervalMillisParam)
	{
		pollIntervalMillis = pollIntervalMillisParam;
	};

	var focusTimeout;

	if($.browser.msie)
	{
		document.onfocusin = onFocus;
		document.onfocusout = onBlur;
	}
	else
	{
		document.onfocus = onFocus;
		document.onblur = onBlur;
	}

	this.start = function()
	{
		if(doRun)
			return false; //Already running - must call stop() first

		if(this.isUndefined(target) || this.isUndefined(feedURL))
			return false;

		firstRun = true;
		doRun = true;

		getTweets();

		return true;
	};

	this.stop = function()
	{
		doRun = false;

		return true;
	};

	this.getTweetsOnce = function()
	{
		if(doRun)
			return false; //Already running - must call stop() first

		if(this.isUndefined(target) || this.isUndefined(feedURL))
			return false;

		var url = feedURL + '?since_timestamp=' + sinceTimestamp + '&async_timeout=' + asyncTimeout + '&callback=?';

		$.getJSON(url,  updateTweetList);
	};

	function onFocus()
	{
		if(!focus)
		{
			document.title = title;
			newItems = 0;

			focus = true;

			if(focusTimeout)
				clearTimeout(focusTimeout);
		}
	}

	function onBlur() {
		focus = false;
		focusTimeout = setTimeout(pause, pauseTimeout);
	}

	function pause()
	{
		that.stop();
		$(containingList).empty();
		pauseImageDiv.show();
		sinceTimestamp = -1;
		newItems = 0;
	}

	this.setFeedURL = function(feedURLParam)
	{
		if(typeof feedURLParam === 'string')
			feedURL = feedURLParam;

		else
			feedURL = 'http://realtimenews.dailyfx.com/news.json';
	};

	this.setTarget = function(targetParam)
	{
		if(typeof targetParam === 'string')
			target = document.getElementById(targetParam);

		else if((typeof targetParam === 'object') && (typeof targetParam.innerHTML !== 'undefined'))
			target = targetParam;

		$(target).append(pauseImageDiv);
		$(target).append(containingList);
	};

	function transformTweet(tweet)
	{
		var avatar_img = '<img src="' + tweet.user.profile_image_url + '" height="' + avatarHeight + '" width="' + avatarWidth + '" alt="' + tweet.user.screen_name + '\'s avatar" border="0"/>';
		var avatar = '<li class="avatar"><a target="_blank" href="http://twitter.com/' + tweet.user.screen_name + '">' + avatar_img + '</a></li>';
		var date = '<a class="date" target="_blank" href="http://twitter.com/' + tweet.user.screen_name + '/statuses/' + tweet.id_str + '" title="Follow us on Twitter">' + dateString(tweet.created_at) + '</a> ';

		var tweetText = textLimit == -1 ? tweet.text : tweet.text.substring(0, textLimit);

		var text = $([tweetText]).linkUrl().linkUser()[0];

		var tweetLiHtml =
				'<li class="real-time-news-box" id="' + tweet.id + '">' +
					'<div class="real-time-news-avatar">' + avatar_img + '<br />' +
						'<a target="_blank" href="http://twitter.com/' + tweet.user.screen_name + '">' +
							'<img src="http://www.dailyfx.com/design/fxcm/img/common/blank.gif" width="48" height="17" alt="" />' +
						'</a>' +
					'</div>' +
					'<div class="real-time-news-post">' + text + '</div>' +
					'<div class="real-time-news-post-date">'  + dateString(tweet.created_at) +  '</div>' +
				'</li>';

		return tweetLiHtml;
	}

	this.removeItem = function(key)
	{
		var previous = null;
		if(this.hasItem(key))
		{
			size--;
			previous = this.items[key];
			delete this.items[key];

			this.setOldest();
		}

		if(document.getElementById(key))
			$(document.getElementById(key)).remove();

		return previous;
	};

	this.getItem = function(key)
	{
		return this.items[key];
	};

	// returns value previously associated with this key if any. TODO: is this even necessary?
	this.putItem = function(key, value)
	{
		var tmp_previous;
		// if the map is full - only use new tweet if its timestamp is later than the current oldest
		var useTweet = size == maxSize ? key > oldestKey : true;

		if(useTweet && !this.isUndefined(value))
		{
			if(!this.hasItem(key))
			{
				// will add new key, value so must remove oldest key, value (by timestamp) - only if the new tweet is newer than the current oldest
				if(size == maxSize)
					this.removeItem(oldestKey);

				size++;
			}
			else
				// no need to remove one if its too big as this will replace existing key, value
				tmp_previous = this.items[key];


			this.items[key] = value;

			this.setOldest();

			//var tweetLi = $(transformTweet(value))[0];
			var tweetLi = $(transformFunction(value))[0];

			var newItem = $(tweetLi).prependTo(containingList);

			if(firstRun)
				newItem.slideDown('fast');
			else
				newItem.slideDown('slow');

			if(!firstRun)
				$(tweetLi).effect('pulsate', {times: 3}, 1000);

			//else
				//$(tweetLi).effect('slide', 100);
		}

		return tmp_previous;
	};

	this.setOldest = function()
	{
		oldestKey = -1;

		for(var key in this.items)
		{
			if(oldestKey == -1 || key < oldestKey)
				oldestKey = key;

		}
	};

	this.hasItem = function(key)
	{
		return !this.isUndefined(this.items[key]);
	};

	this.isUndefined = function(obj)
	{
		return !((typeof obj !== 'undefined') && (obj !== null));
	};

	this.notNull = function(obj)
	{
		return (!isUndefined(obj) && (obj !== null));
	};

	this.clear = function()
	{
		for(var i in this.items)
			delete this.items[i];

		size = 0;
	};

	// TODO: - performance?
	// adds all keys to a temp array, sorts the array, readds the keys in order to a temp map, and replaces the main map with the temp one
	this.sortByKey = function()
	{
		function sortDescending(a,b)
		{
			return b - a;
		}

		var tweetKeyArr = new Array();

		for(var key in this.items)
			tweetKeyArr.push(key);

		tweetKeyArr.sort(sortDescending);

		var tempItems = {};

		for(var i = 0; i < tweetKeyArr.length; i++)
			tempItems[tweetKeyArr[i]] = this.items[tweetKeyArr[i]];

		this.items = tempItems;
	};

	/*
	var favoriteTweet = new Object();
	favoriteTweet.id = -1;
	favoriteTweet.timestamp = -1;
	favoriteTweet.event_type = 'FAVORITE';
	*/

	var sinceTimestamp = -1;

	function updateTweetList(data)
	{
		$.each(data,
			function(i, newTweet)
			{
				//var favoriteTweetNotNull = typeof favoriteTweet != 'undefined';

				if(sinceTimestamp < newTweet.timestamp)
					sinceTimestamp = newTweet.timestamp;

				switch(newTweet.event_type)
				{
					case 'ADD':
						that.putItem(newTweet.id, newTweet);
						break;

					case 'FAVORITE':
						if(newTweet.show)
							that.putItem(newTweet.id, newTweet);

						/*
						if(!favoriteTweetNotNull || favoriteTweet.timestamp < newTweet.timestamp)
						{
							favoriteTweet = newTweet;
							document.getElementById("favoriteTweetBox").innerHTML = "tweetid: " + favoriteTweet.id + " timestamp: " + favoriteTweet.timestamp +
									" event type: " + favoriteTweet.event_type + " text: " + favoriteTweet.text + " favortie: " + favoriteTweet.favorited + "";

							favoriteTweetNotNull = true;
						}
						*/
						break;

					case 'UNFAVORITE':
						if(newTweet.show)
							that.putItem(newTweet.id, newTweet);

						/*
						if(typeof favoriteTweet != 'undefined' && favoriteTweet.id == newTweet.id)
						{
							favoriteTweet = null;
							document.getElementById("favoriteTweetBox").innerHTML = "<i>... no favorite</i>";
						}
						*/
						break;

					case 'DELETE':
						that.removeItem(newTweet.id);

						/*
						if(favoriteTweetNotNull  && favoriteTweet.id == newTweet.id)
						{
							favoriteTweet = null;
							document.getElementById("favoriteTweetBox").innerHTML = "<i>... no favorite</i>";
						}
						*/
						break;
				}

				if(!focus)
				{
					if(newItems < 20)
						newItems++;

					document.title = '(' + newItems + ' new) ' + title;
				}

				updateId++;
			}
		);

		//document.getElementById("tweetSize").innerHTML = "<b>map size: " + that.size + ", ul child length: " + containingList.children.length + "</b>";

		firstRun = false;

		getTweets();

	}

	function getTweets()
	{
		if(doRun)
		{
			var url = feedURL + '?since_timestamp=' + sinceTimestamp + '&async_timeout=' + asyncTimeout + '&callback=?';

			if(pollIntervalMillis > 0 && !firstRun)
				setTimeout(
						function()
						{
							//$.getJSON(feedURL + '?since_timestamp=' + sinceTimestamp + '&callback=?',  updateTweetList);
							$.getJSON(url,  updateTweetList);
						}, pollIntervalMillis);
			else
				//$.getJSON(feedURL + '?since_timestamp=' + sinceTimestamp + '&callback=?',  updateTweetList);
				$.getJSON(url,  updateTweetList);
		}
	}
};
fxcm.ui = new function () {
	this.ExpandableSet = fxcm.lib.makeClass();

	this.ExpandableSet.prototype.init = function ( trigger, options ) {

		var thatExpandableSet = this;

		// Default settings object
		var settings = {
			// classes
			activeClass : 'open',
			closeButtonClass : 'closeThis',

			// behavior and appearance
			hasCloseButton : false,
			hasControlLink : false,
			toggleVisibility : false,
			accordian : false,

			// internationalization
			controlLinkExpandText : 'Expand All',
			controlLinkCollapseText : 'Collapse All',
			closeButtonText : '',

			// callbacks
			onOpen : function () {
			},
			onClose : function () {
			},
			onToggle : function () {
			},

			// pub/sub events
			publishOnOpenEvent : false,
			publishOnCloseEvent : false,
			publishOnToggleEvent : false,

			// cached state values
			controlLinkState : undefined,
			currentTrigger : undefined,
			currentTarget : undefined,
			previousTrigger : undefined,
			previousTarget : undefined
		};

		var _isEnabled = false;

		// Cached jQuery Object variables
		var $triggers,	// element that is clicked on
			$contextEl,	// the wrapper element
			$closeButton = $( '<a class="closeThis"></a>' ),
			$controlLink;

		// Combine defaults and user options
		$.extend( settings, options || {} );

		// ****************
		// HELPER FUNCTIONS
		// ****************

		// Checks if passed in element exists
		function _isValidElement( element ) {
			var $element = fxcm.lib.isJqueryElement( element ) ? element : $( element );
			return $element && $element.length;
		}

		// Returns the elements that are not decendents of any other elements in the array
		function _removeDescendents( elements, ancestors ) {
			if ( typeof ancestors === 'undefined' ) {
				ancestors = elements;
			}

			var topLevelElements = [];
			for ( var elementIndex = 0; elementIndex < elements.length; elementIndex++ ) {
				var ancestorFound = false;
				for ( var ancestorIndex = 0; ancestorIndex < ancestors.length; ancestorIndex++ ) {
					if ( $.contains( ancestors[ ancestorIndex ], elements[ elementIndex ] ) ) {
						ancestorFound = true;
						break;
					}
				}

				if ( !ancestorFound ) {
					topLevelElements.push( elements[ elementIndex ] );
				}
			}

			return topLevelElements;
		}


		// Counts the number of expanded dt elements
		function _countTargets( expanded ) {
			if ( typeof expanded === 'undefined' ) {	// Count all target els
				return $triggers.length;
			} else {
				if ( expanded ) {	// Count expanded elements
					return $triggers.filter( '.' + settings.activeClass ).length;
				} else {	// Count collapsed elements
					return $triggers.length - _countTargets( true );
				}
			}
		}

		// ****************
		// PRIVATE METHODS
		// ****************

		function _setControlLink( controlLink ) {
			// Dereference is an ID
			if ( typeof controlLink === 'string' && controlLink ) {
				controlLink = $( document.getElementById( controlLink ) );
			}

			// Look for default if no control link was passed in
			if ( !controlLink ) {
				//controlLink = _removeDescendents( $contextEl.find('a.controlThisSection'), _dls )[0];
				return false;
			}

			settings.hasControlLink = true;

			// Set the control link if one has been found
			if ( fxcm.lib.isDOMElement( controlLink ) || fxcm.lib.isJqueryElement( controlLink ) ) {
				$controlLink = $( controlLink );
				$controlLink.click( _controlLinkClick );
				_updateControlLinkText();

				return $controlLink;
			} else {
				return false;
			}
		}

		function _setCloseButton() {
			settings.hasCloseButton = true;
			$closeButton = _isValidElement( settings.closeButton ) ? $( settings.closeButton ) : $( '<a class="' + settings.closeButtonClass + '">' + settings.closeButtonText + '</a>' );
			$triggers.append( $closeButton );

			return $closeButton;
		}

		function _controlLinkClick() {
			if ( settings.controlLinkState === 'true' ) {
				_setAllTriggerStates( true );
			} else if ( settings.controlLinkState === 'false' ) {
				_setAllTriggerStates( false );
			}
			_updateControlLinkText();
			return false;
		}

		function _setTarget() {
			var target;

			if ( settings.target && _isValidElement( settings.target ) ) {
				target = $contextEl ? $contextEl.find( settings.target ) : $( settings.target );
			} else if ( settings.target && settings.target === 'prev' ) {
				target = $( this ).prev();
			} else {
				target = $( this ).next();
			}

			$( this ).data( 'target', target );
		}

		function _getTriggerState( trigger ) {
			return $( trigger ).hasClass( settings.activeClass );
		}

		function _setAllTriggerStates( expanded ) {
			$triggers.each( function () {
				var that = this;
				_setTriggerState( $( that ), expanded );
			} );
		}

		// Sets the state of one or more trigger elements (pass in a jQuery object containing multiple trigger elements for multiple)
		function _setTriggerState( trigger, expanded ) {
			// reset cached settings values
			settings.previousTrigger = settings.currentTrigger;
			settings.previousTarget = settings.currentTarget;

			var trigger = settings.currentTrigger = $( trigger );
			var target = settings.currentTarget = $( trigger ).data( 'target' );

			if ( expanded ) {
				trigger.addClass( settings.activeClass );
				target.addClass( settings.activeClass );

				if ( settings.toggleVisibility ) {
					target.show();
				}

				if ( settings.accordian ) {
					$triggers.not( settings.currentTrigger ).each( function () {
						_setTriggerState( this, false );
					} );
				}

				// publish onOpen event  and fire callback function
				_publishEvent( 'onOpen', trigger, target, true );
				settings.onOpen( trigger, target, true );

			} else {

				trigger.removeClass( settings.activeClass );
				target.removeClass( settings.activeClass );

				if ( settings.toggleVisibility ) {
					target.hide();
				}

				// publish onOpen event and fire callback function
				_publishEvent( 'onClose', trigger, target, false );
				settings.onClose( trigger, target, false );
			}

			// publish onToggle event and fire callback function
			_publishEvent( 'onToggle', trigger, target, expanded );
			settings.onToggle( trigger, target, expanded );

			return true;
		}

		// Expands/collapses dt and dd elements
		function _toggleState( e ) {
			e.stopPropagation();
			e.cancelBubble = true;

			_setTriggerState( this, !_getTriggerState( this ) );

			if ( settings.hasControlLink && (_countTargets( true ) === _countTargets() || _countTargets( false ) === _countTargets()) ) {
				_updateControlLinkText();
			}

			return false;
		}

		function _updateControlLinkText() {
			if ( _countTargets( true ) === _countTargets() ) {	// All elements are expanded
				$controlLink.text( settings.controlLinkCollapseText );
				settings.controlLinkState = 'false';
			} else {	// Not all elements are expanded
				$controlLink.text( settings.controlLinkExpandText );
				settings.controlLinkState = 'true';
			}
		}

		function _publishEvent( eventType, trigger, target, state ) {

			var eventName,
				fireEvent = false,
				userSetting = settings[ 'publish' + eventType.charAt( 0 ).toUpperCase() + eventType.slice( 1 ) + 'Event' ]; // capitalize first letter of eventType for accessing settings object

			if ( userSetting ) {
				fireEvent = true;

				if ( typeof userSetting === 'string' ) {
					eventName = 'fxcm.expandable.' + userSetting;
				} else {
					eventName = 'fxcm.expandable.' + eventType;
				}
			}

			if ( fireEvent ) {
				if ( typeof amplify === 'object' && typeof amplify.publish === 'function' ) {
					amplify.publish( eventName, trigger, target, state );
				}
				return true;
			} else {
				return false;
			}

		}

		// **************
		// PUBLIC METHODS
		// **************

		this.handleAnchor = function ( anchor ) {
			if ( typeof anchor !== 'string' || !anchor.length ) {
				return false;
			}

			// check if a trigger is also the anchor, and open it
			var filteredTrigger = $triggers.filter( 'a[href="#' + anchor + '"]' );
			//if( filteredTrigger.length ) {
			//   _setAllTriggerStates( false );
			//   _setTriggerState( filteredTrigger[0], true );
			//   window.scroll(0, 0);
			//   return true;
			//}

			var filter = 'a[name="' + anchor + '"]';

			for ( var dtIndex = 0; dtIndex < $triggers.length; dtIndex++ ) {
				var dt = $( $triggers[ dtIndex ] );
				var dd = dt.next();

				if ( dt.find( filter ).length || dd.find( filter ).length ) {
					_setAllTriggerStates( false );
					_setTriggerState( dt, true );
					break;
				}
			}
		};

		this.toggle = function ( trigger, options ) {

			if ( typeof trigger === 'object' && !options ) { // passed in an options object but no trigger
				options = trigger;
				trigger = $triggers;
			} else if ( !trigger ) {
				trigger = $triggers; // use entire $trigger object as the trigger
			}

			if ( !_isValidElement( trigger ) ) {
				return false;
			}

			options = options || {};

			if ( typeof options.state === 'boolean' ) {

				if ( trigger.length > 1 ) {
					_setAllTriggerStates( options.state );
				} else if ( trigger.length === 1 ) {
					_setTriggerState( trigger, options.state );
				}

			} else {
				// console.log('todo');
				//trigger.length === 1 ? _setTriggerState(trigger, !_getTriggerState(trigger)) : trigger.length > 1 : _setAllTriggerStates(trigger, !_getTriggerState(trigger));
			}

			if ( options.callback && typeof options.callback === 'function' ) {
				options.callback.call( trigger || $triggers );
			}

			return true;
		};

		this.enable = function () {
			if ( !$triggers || _isEnabled ) {
				return false;
			}

			// Add expand/collapse click handler
			$triggers.on( 'click', _toggleState );
			_isEnabled = true;
		};

		this.disable = function () {
			if ( !$triggers || !_isEnabled ) {
				return false;
			}

			// remove click handlers
			$triggers.off( 'click', _toggleState );
			_isEnabled = false;
		};

		// ****************
		// CONSTRUCTOR LOGIC
		// ****************

		// Exit if no trigger provided
		if ( !_isValidElement( trigger ) ) {
			return false;
		}

		// Find the context element
		$contextEl = settings.context && _isValidElement( settings.context ) ? $( settings.context ) : false;

		// Construct list of trigger elements
		$triggers = $( _removeDescendents( $contextEl ? $contextEl.find( trigger ) : trigger ) );

		// Set the corresponding target for each trigger
		$triggers.each( _setTarget );

		// Initialize the control link
		if ( settings.hasControlLink || settings.controlLink ) {
			_setControlLink( settings.controlLink );
		}

		// Add close this links
		if ( settings.hasCloseButton || settings.closeButton ) {
			_setCloseButton( settings );
		}

		thatExpandableSet.enable();

		// enable linking between different sets on a single page
		if ( $triggers.data( 'target' ).find( 'a.internal-toggle' ).length ) {
			$triggers.data( 'target' ).find( 'a.internal-toggle' ).on( 'click', function ( e ) {
				e.stopPropagation();
				e.cancelBubble = true;

				thatExpandableSet.handleAnchor( $( this ).href.substr( 1 ) );

				return false;
			} );
		}

		// handle possible anchor links on the page which point to a named anchor within the current set
		$( 'a[href^="#"]' ).click( function () {
			// check if this still equals a hash
			var search = $( this ).attr( 'href' ).charAt( 0 ) === '#' ? $( this ).attr( 'href' ).substr( 1 ) : false;
			if ( search ) {
				thatExpandableSet.handleAnchor( search );
			}
		} );

		this.initTabOpen = thatExpandableSet.handleAnchor( document.location.hash.substr( 1 ) );
	};

	this.Teleport = fxcm.lib.makeClass();

	this.Teleport.prototype.init = function ( element, options ) {

		var thatTeleport = this;

		thatTeleport.element = element;

		var _settings = {
			availableMethods : [ "append", "prepend", "before", "after" ]
		};
		var defaults = {
			method : "append",
			beforeTeleportComplete : function ( element ) {
			},
			onTeleportComplete : function ( element ) {
			},
			beforeHomeComplete : function ( element ) {
			},
			onHomeComplete : function ( element ) {
			}
		};

        /* Start Private Functions
         ========================================================================== */

		// @TODO Create unregister function that kills all events.
        /*
         _unregister = function () {
         };
         */

		function _registerEvents() {

			if ( typeof amplify === 'object' && typeof amplify.subscribe === 'function' ) {
				amplify.subscribe( 'fxcm.device.onEnterDesktop', function () {
					_initiateTeleport( 'home' );
				} );

				amplify.subscribe( 'fxcm.device.onEnterTablet', function () {
					if ( _settings.rules.tablet && !$.isEmptyObject( _settings.rules.tablet ) ) {
						_initiateTeleport( 'tablet' );
					} else {
						_initiateTeleport( 'home' );
					}
				} );

				amplify.subscribe( 'fxcm.device.onEnterMobile', function () {
					if ( _settings.rules.mobile && !$.isEmptyObject( _settings.rules.mobile ) ) {
						_initiateTeleport( 'mobile' );
					} else {
						_initiateTeleport( 'home' );
					}
				} );
			}

			fxcm.device.publishCurrentEvent();

		}

		// Move the element by appending or prepending
		function _initiateTeleport( breakpoint ) {

			// Send the element back to it's wrapping pod container
			if ( breakpoint === "home" ) {

				thatTeleport.options.beforeHomeComplete.call( thatTeleport, thatTeleport.element );

				if ( _settings.pod.children().length === 0 ) {
					$( _settings.pod ).append( _settings.element ).show();
				}

				_setCurrentLocation( 'home' );

				thatTeleport.options.onHomeComplete.call( thatTeleport, thatTeleport.element );

			} else {

				// Get rule for that breakpoint
				var rule = _settings.rules[ breakpoint ];

				// Check if the new destination is not the current location
				if ( rule.destination != _settings.element.currentLocation ) {

					thatTeleport.options.beforeTeleportComplete.call( thatTeleport, thatTeleport.element );

					if ( rule[ "method" ] === "append" ) {
						$( rule.destination ).append( _settings.element );
					} else if ( rule[ "method" ] === "prepend" ) {
						$( rule.destination ).prepend( _settings.element );
					} else if ( rule[ "method" ] === "after" ) {
						$( rule.destination ).after( _settings.element );
					} else if ( rule[ "method" ] === "before" ) {
						$( rule.destination ).before( _settings.element );
					}

					_setCurrentLocation( rule.destination );

					_settings.element.show();

					thatTeleport.options.onTeleportComplete.call( thatTeleport, thatTeleport.element );
				}
			}

			_togglePodEmptyClass();
		}

		function _setCurrentLocation( destination ) {
			_settings.element.currentLocation = destination;
		}

		// Check if a rule exists for that breakpoint.
		function _doesRuleExist( breakpoint ) {
			return _getRulePositionByBreakpoint( breakpoint ) >= 0 && typeof _getRulePositionByBreakpoint( breakpoint ) === "number";
		}

		// Returns the index of the rule by looking for the corresponding breakpoint.
		function _getRulePositionByBreakpoint( rules, breakpoint ) {
			if ( typeof rules === "undefined" ) {
				rules = _settings.rules;
			}
			for ( var i = 0; i < rules.length; i++ ) {
				if ( rules[ i ].breakpoint === breakpoint || $.inArray( breakpoint, rules[ i ].breakpoint ) > -1 ) {
					return i;
				}
			}
			return false;
		}

		// If pod is empty, add class, else, remove
		function _togglePodEmptyClass() {
			if ( _settings.pod.children().length === 0 ) {
				$( _settings.pod ).addClass( 'empty' );
			} else {
				$( _settings.pod ).removeClass( 'empty' );
			}
		}

		function _parseInstructions( instructions ) {
			var $instructions = instructions;
			// Create new array to store our rules in based on the instructions
			var rules = [];

			// Loop through each instruction and break it out into rules.
			$.each( $instructions, function ( index ) {
				// Get breakpoints
				var breakpoints = $instructions[ index ].breakpoints;
				if ( typeof breakpoints === "undefined" || breakpoints === "" ) {
					throw new Error( "Breakpoint is not set." );
					return false;
				}

				// Destination
				var destination = $instructions[ index ].destination;
				if ( typeof destination === "undefined" || destination === "" ) {
					throw new Error( "Destination is not set." );
					return false;
				}

				// If breakpoints is a string, convert to array
				if ( typeof breakpoints === "string" ) {
					breakpoints = breakpoints.split();
				}

				// Method
				var method = $instructions[ index ].method;
				if ( typeof method !== "string" || method === "" || $.inArray( method, _settings.availableMethods ) === -1 ) {
					method = defaults.method;
				}

				// Create rule
				var rule = {};
				rule.breakpoint = breakpoints;
				rule.method = method;
				rule.destination = destination;

				rules.push( rule );

			} );

			_settings.rules = rules;

			// parse settings and cache rules specific to tablet and mobile
			_settings.rules.tablet = rules[ _getRulePositionByBreakpoint( rules, 'tablet' ) ];
			_settings.rules.mobile = rules[ _getRulePositionByBreakpoint( rules, 'mobile' ) ];
		}

		// Checks if passed in element exists
		function _isValidElement( element ) {
			var $element = fxcm.lib.isJqueryElement( element ) ? element : $( element );
			return $element && $element.length;
		}

		// Set's the parent pod (or home) of the element.
		function _setPod() {
			var pod = _settings.element.parent();

			// If parent does not contain class .teleport-pod, create one and wrap the element.
			if ( !pod.hasClass( 'teleport-pod' ) ) {
				_wrapElementInPod();
				pod = _settings.element.parent();
			}

			// set original location of pod
			_settings.pod = pod;
		}

		// Wrap tthe element in a .teleport-pod container
		// Returns pod
		function _wrapElementInPod() {
			var pod = $( "<div class='teleport-pod'></div>" );
			_settings.element.wrap( pod );
		}

		options = options || {};
		// merge options with defaults
		thatTeleport.options = $.extend( {}, defaults, options );

		if ( !_isValidElement( element ) ) {
			return false;
		}
		_settings.element = element;

		if ( typeof options.instructions === "object" && !$.isEmptyObject( options.instructions ) ) {
			_parseInstructions( options.instructions );
		} else {
			throw new Error( "No options given to Teleport" );
			return false;
		}

		_setPod();

		_setCurrentLocation( 'home' );

		_registerEvents();

	};

	this.PlaceholderLabel = fxcm.lib.makeClass();

    /* Sets a form's labels as placeholders for fields.
     form = required
     fields = optional. Pass in an array, string or an empty array/string
     placeholderClass = optional. Pass in a string. */
	this.PlaceholderLabel.prototype.init = function ( form, fields, placeholderClass ) {

		var thatPlaceholderLabel = this;
		var _settings = {};

		this.setFields = function ( fields ) {
			var _fieldList = $();

			// Parse passed-in fields
			if ( typeof fields === 'string' && _findField( fields ) ) {	// passed in a string
				_fieldList = _fieldList.add( _findField( fields ) );
			}
			else if ( fxcm.lib.isArray( fields ) && fields.length > 0 ) {	// passed in an array
				for ( var i = 0; i < fields.length; i++ ) {
					if ( _findField( fields[ i ] ) ) {
						_fieldList = _fieldList.add( _findField( fields[ i ] ) );
					}
				}
			}

			if ( _fieldList.length > 0 ) {
				return _settings.fields = _fieldList;
			}
			else {
				return false;
			}
		};

		this.getFields = function () {
			return _settings.fields;
		};

		this.setPlaceholderClass = function ( placeholderClass ) {
			if ( typeof placeholderClass === 'string' && placeholderClass !== '' ) {
				return _settings.placeholderClass = placeholderClass;
			} else {
				return false;
			}
		};

		this.getPlaceholderClass = function () {
			return _settings.placeholderClass;
		};

		function _findField( field ) {
			if ( $( _settings.form ).find( field ).length > 0 ) {
				return $( _settings.form ).find( field );
			} else {
				return false;
			}
		}

		function _getTag( field ) {
			return $( field ).prop( 'tagName' ).toLowerCase();
		}

		function _getLabel( field ) {
			var label = field.id ? $( 'label[for="' + field.id + '"]' ) : $();
			return label.length > 0 ? label : false;
		}

		function _hasValue( field ) {
			var val = $( field ).val();
			return val === '' ? false : true;
		}

		// Show/hide the label
		function _setLabelState( field, hide ) {
			if ( _getLabel( field ) === false ) {
				return false;
			}

			if ( hide ) {
				_getLabel( field ).hide();
			} else {
				_getLabel( field ).show();
			}
		}

		// Add/remove the "placeholder" label
		function _togglePlaceholderClass( field, addClass ) {
			if ( addClass ) {
				$( field ).addClass( _settings.placeholderClass );
			}
			else {
				$( field ).removeClass( _settings.placeholderClass );
			}
		}

		function _handleAllFields( field, event ) {
			if ( typeof event === 'undefined' ) {
				event = '';
				event.type = 'load'
			}

			if ( event.type === 'focus' || event.type === 'focusin' ) {
				_setLabelState( field, true );				//	on focus, hide label
			} else {
				_setLabelState( field, _hasValue( field ) );	// on change and blur, set label state based on value
			}
		}

		//----------- Constructor logic -----------//

		// Find the form
		if ( typeof form === 'string' && form ) {		// Dereference an ID
			form = document.getElementById( form );
		}
		if ( !fxcm.lib.isDOMElement( form ) ) {	// No form, bomb out
			return false;
		}

		_settings.form = form;

		// Set the placeholder class
		if ( !thatPlaceholderLabel.setPlaceholderClass( placeholderClass ) ) {
			thatPlaceholderLabel.setPlaceholderClass( 'placeholder' );
		}

		// Set the fields
		if ( !thatPlaceholderLabel.setFields( fields ) ) {
			thatPlaceholderLabel.setFields( [ 'input[type="text"]', 'input[type="password"]', 'input[type="email"]', 'input[type="tel"]', 'select', 'textarea' ] );
		}

		// Add event handlers to fields
		_settings.fields.each( function () {

			// Use focusin to fix IE bug on selects with focus eventhandler (where selects require two clicks to open the dropdown).
			var boundEvents = _getTag( this ) === 'select' ? 'focusin blur' : 'focus blur';

			// Handle fields on page load
			_togglePlaceholderClass( _getLabel( this ), true );	// Add placeholder class to labels
			_handleAllFields( this );								// Set initial placeholder state for all fields

			// Attach eventhandlers to fields
			$( this ).on( boundEvents, function ( e ) {
				_handleAllFields( this, e );
			} );
		} );
	};

    /* 	GeoBox gives us the ability to load different content depending on geographic location (country)

     Parameters:
     - wrapper [jquery object]: 	Required. A DOM element that contains one or more .geoTarget elements marked with a data-target="" attribute

     Optional config object may contain:
     - target [string]: 			this value sets the current geoTarget to display. Corresponds to the data-geoTarget attributes on content
     - targetLevel [string]: 	this values sets which level of targeting you are aiming for. Possible values are: 'country', 'city'

     Implementation examples:
     HTML :
     <div class="myGeoTargetedElement">
     <div data-geoTarget="australia">This is the Australian content</div>
     <div data-geoTarget="default">This is the default content</div>
     <div data-geoTarget="germany">This is the German content</div>
     </div>

     JS:
     --- Show australian content on page load ---
     var targetedContent = new fxcm.ui.GeoBox($('.myGeoTargetedElement'), {target: 'australia'});

     --- Show default content on page load ---
     var targetedContent = new fxcm.ui.GeoBox($('.myGeoTargetedElement'));
     */

	this.GeoBox = fxcm.lib.makeClass();
	this.GeoBox.prototype.init = function ( wrapper, config ) {
		var thatGeoBox = this;
		var _settings = config || {};

		this.getWrapper = function () {
			return _settings.wrapper;
		};

		this.getTargetLevel = function () {
			return _settings.targetLevel;
		};

		this.setTargetLevel = function ( targetLevel ) {
			_settings.targetLevel = targetLevel;
		};

		this.getTarget = function () {
			return _settings.target;
		};

		this.setTarget = function ( target ) {
			_settings.target = target;
		};


        /* --- Constructor logic -- */

		// Set wrapping parent element context (required) and ensure it's a jquery wrapped set
		if ( !wrapper || !wrapper.length ) {
			return false;
		}
		_settings.wrapper = fxcm.lib.isJqueryElement( wrapper ) ? wrapper : $( wrapper );

		thatGeoBox.setTarget( _settings.target || 'default' );

		// If we can locate a matching geo set, show it. Otherwise, do nothing.
		if ( thatGeoBox.getElements( thatGeoBox.getTarget() ) ) {
			thatGeoBox.show( thatGeoBox.getTarget() );
		}
	};

	this.GeoBox.prototype.getElements = function ( target ) {
		// Accepts a single parameter: target [string]. Returns all elements within the parent geoBox that have a matching data-geoTarget attritube.
		// Omit the target argument to return all target elements within parent geoBox

		if ( typeof target !== 'string' ) {
			return this.getWrapper().find( '[data-geoTarget]' );
		} else {
			return this.getWrapper().find( '[data-geoTarget=' + target + ']' );
		}
	};

	this.GeoBox.prototype.show = function ( target ) {
		// Show the content associated with a specific target.
		// If you call this method without passing in a target, reshow currently-set target

		if ( typeof target !== 'string' ) { // no target supplied. get current from _settings
			target = this.getTarget();
		} else if ( target !== this.getTarget() ) { // supplied new target - reset current target in _settings
			this.setTarget( target );
		}

		var targetContent = this.getElements( target );

		if ( targetContent.length ) {
			this.getElements().hide();
			targetContent.show();
		}
	};


    /*
     SmoothScroll

     Allows the window or a scrollable element to initiate an animated scroll
     When used on a link, it will scroll to the element with an ID that matches the link's href

     */
	this.SmoothScroll = fxcm.lib.makeClass();

	this.SmoothScroll.prototype.init = function ( options ) {
		var thatSmoothScroll = this;

		// determines if element exists
		// if so, returns it as a jQuery object
		function _getElement( elem ) {
			if ( !elem ) {
				return false;
			}

			var found;

			if ( fxcm.lib.isJqueryElement( elem ) && elem.length ) {
				found = elem;
			}
			else if ( typeof elem === 'string' && elem.charAt( 0 ) === '#' && document.getElementById( elem.slice( 1 ) ) !== null ) {
				found = $( elem );
			}
			else {
				found = false;
			}

			return found;
		}

		// verifies that a target is set to "top", "bottom" or a DOM element
		function _isValidTarget( testTarget ) {
			if ( [ '#top', '#bottom' ].indexOf( testTarget ) > -1 || _getElement( testTarget ) ) {
				return true;
			}

			return false;
		}

		// make sure wrapper has the proper css and has an inner container which makes calculations easier
		function _formatWrapper() {
			if ( _settings.wrapper && _settings.wrapper.children().length ) {
				if ( _settings.wrapper.css( 'overflow-y' ) !== 'scroll' ) {
					_settings.wrapper.css( 'overflow-y', 'scroll' );
				}
				if ( _settings.wrapper.css( 'overflow-x' ) !== 'hidden' ) {
					_settings.wrapper.css( 'overflow-x', 'hidden' );
				}
				if ( !_settings.wrapper.children().first().hasClass( 'smoothScrollContainer' ) ) {
					_settings.wrapper.children().wrapAll( '<div class="smoothScrollContainer" style="position:relative; overflow:hidden;" />' );
				}
			}
		}

		// attempts to set target from the trigger href
        /* it will not set the target if:
         1. a valid target is already set ( target can only be overwritten by setTarget() )
         2. the trigger is not a link with an href which matches an existing ID
         */
		function _setTargetFromHref() {
			if ( !_isValidTarget( _settings.target ) ) {
				if ( _settings.trigger && _settings.trigger.is( 'a' ) && _settings.trigger.attr( 'href' ).length ) {
					var triggerHref = _settings.trigger.attr( 'href' );
					if ( _isValidTarget( triggerHref ) ) {
						_settings.target = thatSmoothScroll.setTarget( _settings.trigger.attr( 'href' ) );
					}
				}
			}
		}

		// bind event to trigger which invokes a scroll
		function _bindTriggerEvent() {
			if ( _settings.trigger ) {
				var triggerEvent = ( typeof _settings.bindOn === 'string' && _settings.bindOn.length ) ? _settings.bindOn : 'click';
				_settings.trigger.on( triggerEvent, function ( e ) {
					e.preventDefault();
					thatSmoothScroll.scrollNow();
				} );
			}
		}

		// calculate the current y coordinates of window or wrapper
		function _calcCurrentPos() {
			return _settings.wrapper ? Math.ceil( _settings.wrapper.scrollTop() ) : Math.ceil( $( window ).scrollTop() );
		}

		// calculate the y coordinates to scroll to
		function _calcTargetPos() {
			var targetPos = 0;
			var contentHeight = 0;

			var contentHeight = _settings.wrapper ? _settings.wrapper.children( '.smoothScrollContainer' ).first().height() : $( document ).height();
			var wrapperHeight = _settings.wrapper ? _settings.wrapper.height() : $( window ).height();

			if ( _settings.target === '#bottom' ) {
				targetPos = contentHeight;
			}
			else if ( _settings.target && _settings.target !== '#top' ) {
				targetPos = _settings.wrapper ? _settings.target.position().top : _settings.target.offset().top;
			}

			if ( targetPos > (contentHeight - wrapperHeight) ) {
				targetPos = contentHeight - wrapperHeight;
			}

			targetPos = targetPos < 0 ? 0 : Math.ceil( targetPos );

			targetPos = typeof _settings.offset === 'number' ? targetPos + _settings.offset : targetPos;

			return targetPos;
		}

		// function called at end of animation
		function _scrollComplete() {
			if ( !_settings.wrapper && _settings.updateHash ) {
				var currentHash = window.location.hash;
				var targetHash = '';

				if ( [ '#top', '#bottom' ].indexOf( _settings.target ) > -1 ) {
					targetHash = '#';
				}
				else if ( _settings.target && typeof _settings.target.attr( 'id' ) === 'string' && _settings.target.attr( 'id' ).length ) {
					targetHash = '#' + _settings.target.attr( 'id' );
				}

				// update hash at end of animation
				if ( targetHash.length > 0 && targetHash != currentHash ) {
					// if HTML5 history pushState is not supported then window.location.hash is used to modify the history
					if ( typeof history.pushState === 'undefined' ) {
						window.location.hash = targetHash;
					}
					else {
						history.pushState( {}, '', targetHash );
					}
				}
			}

			// if a callback was supplied, fire it now
			if ( typeof _settings.callback === 'function' ) {
				_settings.callback.call( thatSmoothScroll );
			}
		}

		// animate the scroll, can be invoked after setup at any time
		this.scrollNow = function () {
			if ( !_settings.target ) {
				return false;
			}

			var wrapperEl = _settings.wrapper ? _settings.wrapper : $( 'html, body' );

			// run pre-scroll function
			if( _settings.hasOwnProperty( 'onBeforeScroll' ) && typeof _settings.onBeforeScroll === 'function' ) {
				_settings.onBeforeScroll( wrapperEl );
			}

			var callbackCount = 0;
			var currPos = _calcCurrentPos();
			var newPos = _calcTargetPos();
			var animateDelta = currPos - newPos;
			var animateDuration;

			if( animateDelta === 0 ) return false;

			// delta must be a positive number
			animateDelta = animateDelta < 0 ? ( animateDelta * -1 ) : animateDelta;
			// calculate time over which to animate
			animateDuration = (typeof _settings.animateSpeed === 'number' && _settings.animateSpeed > 0) ? (animateDelta / _settings.animateSpeed) * 250 : animateDelta;

			if(animateDuration > 2000){
				animateDuration = 2000;
			}

			// set animation arguments
			var animateArgs = {
				duration : animateDuration,
				easing : 'swing',
				complete : function () {
					if( _settings.hasOwnProperty( 'onBeforeScroll' ) && typeof _settings.onBeforeFinish === 'function' ){
						_settings.onBeforeFinish(wrapperEl);
					}
					var finalPos = _calcCurrentPos();
					var desiredPos = _calcTargetPos();

					if( finalPos - desiredPos < 5 && finalPos - desiredPos > -5 ) {
						wrapperEl.scrollTop( desiredPos );
					}
					else{
						thatSmoothScroll.scrollNow();
						return false;
					}

					// make sure callback is only called once if there is more than one wrapper
					callbackCount++;
					if ( callbackCount === wrapperEl.length ) {
						_scrollComplete();
					}
				}
			}

			wrapperEl.stop().animate(
				{ scrollTop : newPos },
				animateArgs
			);

			return newPos;
		};

		// function to retrieve the trigger
		this.getTrigger = function () {
			return typeof _settings.trigger !== 'undefined' ? _settings.trigger : false;
		};

		// function to set the trigger
		this.setTrigger = function ( newTrigger ) {
			_settings.trigger = _getElement( newTrigger );
			_setTargetFromHref();
			_bindTriggerEvent();
			return _settings.trigger;
		};

		// function to retrieve the target
		this.getTarget = function () {
			return typeof _settings.target !== 'undefined' ? _settings.target : false;
		};

		// function to set the target
		this.setTarget = function ( newTarget ) {
			_settings.target = ( [ '#top', '#bottom' ].indexOf( newTarget ) > -1 ) ? newTarget : _getElement( newTarget );
			return _settings.target;
		};

		// function to set the target offset
		this.setOffset = function ( newOffset ) {
			_settings.offset = typeof newOffset === 'number' ? newOffset : 0;
			return _settings.offset;
		};

		// function to retrieve the wrapper
		this.getWrapper = function () {
			return typeof _settings.wrapper !== 'undefined' ? _settings.wrapper : false;
		};

		// function to set the wrapper
		this.setWrapper = function ( newWrapper ) {
			_settings.wrapper = _getElement( newWrapper )
			_formatWrapper();
			return _settings.wrapper;
		};

		// function to unset the wrapper, so the window is scrolled
		this.unsetWrapper = function () {
			return delete _settings.wrapper;
		};

		var _settings = {
			updateHash : true
		};

        /* ----- optional user defined settings, passed as object
         trigger :
         jQuery object, or string representing element ID
         ! - required if a target is not set

         target :
         jQuery object, string set to "bottom" or "top", or string representing element ID
         ! - required if a trigger is not set

         animateSpeed :
         number of pixels scrolled in .1 seconds
         ! - defaults to 100

         bindOn :
         string representing event attached to trigger which invokes the scroll
         ! - defaults to 'click'

         wrapper :
         jQuery object, or string representing element ID
         ! - current window scrolled if not set

         callback :
         function to be called at the end of the scroll animation

         onBeforeScroll :
         function to be called before the scroll animation

         onBeforeFinish :
         function to be called before the scroll finishes

         onScrollComplete :
         function to be called at the end of the scroll animation

         updateHash :
         boolean whether to update the hash at the end of the URL with the target element ID
         ----- */


		// combine defaults and user options
		if ( typeof options === 'object' ) {
			$.extend( _settings, options || {} );

			if( _settings.hasOwnProperty( 'onScrollComplete' ) ) {
				_settings.callback = _settings.onScrollComplete;
			}

		}

		// finalize setup
		thatSmoothScroll.setTrigger( _settings.trigger );
		thatSmoothScroll.setTarget( _settings.target );
		thatSmoothScroll.setWrapper( _settings.wrapper );
	};


	/**
	 * @class fxcm.ui.Calendar
	 * @description creates a calendar and/or calendar-like navigation structure
	 * @param {(object|string)} wrapper             - wrapping element as jQuery object or string selector
	 * @param {(string|Array|Date|Object)} [date]   - string in "YYYY-MM-DD" format || array[ year, month, day ] || date or moment object if not using current date
	 * @param {object} [options]                    - options for setup
	 */
	this.Calendar = fxcm.lib.makeClass();
	this.Calendar.prototype.init = function ( wrapper, date, options ) {

		// if no wrapper is provided, GET OUT
		var $wrapper = fxcm.lib.isJqueryElement( wrapper ) ? wrapper : $( wrapper );
		if ( !$wrapper || !$wrapper.length ) {
			return false;
		}

		/** START CONSTANTS **/
		var thatCalendar = this;

		/**
		 * @type object
		 * @description merged options for calendar setup and callbacks
		 * @private
		 * @property {string} locale                                - localization ID, US english by default
		 * @property {string} navNextHtml                           - markup to put in the "next month" element in navigation structure
		 * @property {string} navPrevHtml                           - markup to put in the "previous month" element in the navigation structure
		 * @property {(string|boolean)} navType                     - type of navigation structure: "loop", "select", "list", or false to hide
		 * @property {(number|string|Array|Date|Object)} rangeMin   - earliest past date to show : int number of days || string in "YYYY-MM-DD" format || array[ year, month, day ] || date or moment
		 * @property {(number|string|Array|Date|Object)} rangeMax   - latest future date to show : int number of days || string in "YYYY-MM-DD" format || array[ year, month, day ] || date or moment
		 * @property {boolean} inverseChron                         - display navigation and calendars in reverse chronological order (tables remain correct order)
		 * @property {boolean} includeEmptyDays                     - include days that have no additional content
		 * @property {boolean} includeWeekends                      - include weekends
		 * @property {boolean} multiCal                             - render multiple calendars, one for each month in the requested range
		 * @property {boolean} verboseLabels                        - show long labels on days, i.e. "Thursday, October 30, 2016" vs just "30"
		 * @property {boolean} displayLeadingZeros                  - show leading zeros or not
		 * @property {boolean} alwaysSelectDay                      - always set the 'current' class on a day when navigating or initializing
		 * @property {object} addClasses                            - additional classes to apply to elements
		 * @property {function} calUpdateCallback                   - function to call when the calendar is finished drawing
		 * @property {(function|string)} dayInsertCallback          - function to populate content for each day, or string constant
		 * @property {function} daySelectCallback                   - function to call when a day is clicked/selected
		 */
		var _settings = {
			locale : 'en',
			navNextHTML : 'Next Month',
			navPrevHTML : 'Previous Month',
			navType : 'list',
			inverseChron : true,
			includeEmptyDays : true,
			includeWeekends : true,
			multiCal : false,
			verboseLabels : false,
			displayLeadingZeros : false,
			alwaysSelectDay : false,
			/**
			 * @name _settings.calUpdateCallback
			 * @type function
			 * @description function to call when a new month is selected
			 * @inner
			 * @param {string} [dateStr]    - formated as YYYY-MM-DD
			 * @param {Object} [element]    - html element of current calendar
			 */
			/**
			 * @name _settings.dayInsertCallback
			 * @type (string|function)
			 * @description function to populate content for each day, or string constant
			 * @inner
			 * @param {string} [dateStr]    - formated as YYYY-MM-DD
			 * @param {Object} [element]    - html element where content will be inserted
			 * @returns {string}            - markup to be included in day cell/item
			 */
			/**
			 * @name _settings.daySelectCallback
			 * @type function
			 * @description function to call when a day is clicked
			 * @inner
			 * @param {string} [dateStr]    - formated as YYYY-MM-DD
			 * @param {Object} [element]    - html element where content will be inserted
			 */
		};

		/**
		 * @type {object}
		 * @description data for current, selected, min, & max dates
		 * @private
		 * @property {Date} current
		 * @property {Date} selected
		 * @property {Date} min
		 * @property {Date} max
		 */
		var _moments = {};

		/**
		 * @type {object}
		 * @description classes to be applied to elements in calendar
		 * @private
		 * @param {string} navCurrent       - applied to currently selected month
		 * @param {string} navDisabled      - applied to prev/next links when at the end of range
		 * @param {string} calCurrent       - applied to calendar of currently selected month
		 * @param {string} calWrap          - applied to div that wraps calendars
		 * @param {string} calTitle         - applied to heading at top of calendar wrappers
		 * @param {string} dayCurrent       - applied to currently selected day
		 * @param {string} longname         - applied to span which wraps part of day and month names after 3 characters
		 * @param {string} outOfRange       - applied to items that are out of range
		 * @param {string} add-content      - applied to days with additional content
		 * @param {string} loading          - applied to calendar and nav when loading/rendering
		 */
		var _classes = {
			nav : '',
			navMonthList : '',
			navYearList : '',
			navCurrent : 'current',
			navDisabled : 'disabled',
			calCurrent : 'current',
			calWrap : 'cal-wrap',
			calTitle : 'cal-title',
			dayCurrent : 'current',
			longname : 'longname',
			shortname : 'shortname',
			outOfRange : 'oor',
			addContent : 'add-content',
			loading : 'loading'
		};

		/**
		 * @type object
		 * @description stores elements which are used to draw calendar
		 * @private
		 */
		var _elements = {};

		/**
		 * @type {boolean}
		 * @description status if full set of calendar has been rendered
		 * @private
		 */
		var _calSetExists = false;

		/** START PRIVATE FUNCTIONS **/

		/**
		 * @description verify string is in the valid date format YYYY-MM-DD
		 * @param {string} dateStr - date string to test
		 * @private
		 */
		var _stringIsValidDate = function( dateStr ){
			if( typeof dateStr !== 'string' ){ return false; }
			// format to match
			var dateReg = /^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/;
			// return result of test
			return dateReg.test( dateStr );
		};

		/**
		 * @function _getMoment
		 * @description attempts to parse a date from a supplied argument
		 * @param {(string|Array|Date|Object)} aDate
		 * @param {number} [offset]
		 * @private
		 */
		var _getMoment = function ( aDate, offset ) {

			var momentArg;
			var rMoment;

			// recurse if passed offset is not a number, and just return the result
			if ( typeof offset !== 'undefined' && typeof offset !== 'number' ) {
				return _getMoment( offset );
			}

			// if date is string and formatted correctly, make array and create Date instance
			if ( typeof aDate === 'string' && _stringIsValidDate( aDate ) ) {
				momentArg = aDate;
			}
			// if date is array and formatted correctly, create Date instance
			else if ( typeof aDate === 'object' && aDate.length === 3 ) {
				for( var i = 0; i < aDate.length; i++ ){
					aDate[i] = typeof aDate[i] === 'number' && aDate[i] < 10 ? '0' + aDate[i].toString() : aDate[i].toString();
				}
				if( _stringIsValidDate( aDate.join( '-' ) ) ){
					momentArg = aDate.join( '-' );
				}
			}
			// if is Date instance, use directly
			else if ( aDate instanceof Date || moment.isMoment( aDate ) ) {
					momentArg = aDate;
				}

			// set return moment, force to beginning of day (will make calculations easier)
			rMoment = momentArg ? moment( momentArg ) : moment();
			rMoment.startOf( 'day' );

			// apply offset
			if ( typeof offset === 'number' ) {
				rMoment.add( offset, 'days' );
			}

			return rMoment || false;
		}

		/**
		 * @function _drawNavigation
		 * @description draws the navigation structure
		 * @private
		 */
		var _drawNavigation = function () {

			// populate wrapper with nav elements
			$wrapper.append(
				_elements.$navigation.append(
					_elements.$monthTitle
				).append(
					_elements.$prevMonthLink.append(
						_settings.navPrevHTML
					)
				).append(
					_elements.$nextMonthLink.append(
						_settings.navNextHTML
					)
				)
			);

			// add supplied classes + loading
			_elements.$navigation.addClass( _classes.nav + ' ' + _classes.loading );

			// instantiate month and year arrays
			var monthArr = [],
				yearArr = [];

			switch ( _settings.navType ) {
				// list style navigation
				case 'list' :

					// add year list element to navigation
					_elements.$navigation.prepend( _elements.$yearList );
					// add classes
					_elements.$yearList.addClass( _classes.navYearList );
					_elements.$monthList.addClass( _classes.navMonthList );

					// instantiate vars relevant to list type nav
					var iMoment = moment( _moments.min ).startOf( 'month' ), // moment to count with
						maxMoment = moment( _moments.max ).startOf( 'month' ), // max range moment
						$yearLi = $(), // year list item el
						$monthUl = $(); // month list el

					// loop through months, increasing count by 1 month each loop until its reached max, populating arrays above
					while ( maxMoment.diff( iMoment, 'months' ) >= 0 ) {

						// push list item markup into month array, using a string so its easy to join later
						monthArr.push(
							'<li class="month month-' + ( iMoment.month() + 1 ) + '">' +
							'<a href="#' + iMoment.year() + '-' + ( iMoment.month() + 1 ) + '">' +
							'<span class="' + _classes.longname + '">' + iMoment.format( 'MMMM' ) + '</span>' +
							'<span class="' + _classes.shortname + '">' + iMoment.format( 'MMM' ) + '</span>' +
							'</a>' +
							'</li>'
						);

						// if we've reached the end of the year or the max, then push the month array values into a list inside the current year list item
						if ( iMoment.month() === 11 || maxMoment.diff( iMoment, 'months' ) === 0 ) {

							// reverse month array if needed
							if ( _settings.inverseChron ) {
								monthArr.reverse();
							}

							// create new ul for month list items to populate, and append them
							$monthUl = $( document.createElement( 'ul' ) )
							.addClass( _elements.$monthList.attr( 'class' ) )
							.append( monthArr.join( '' ) );
							// create new year list item and append month list
							$yearLi = $( document.createElement( 'li' ) )
							.addClass( 'year year-' + iMoment.year() )
							.append( '<span>' + iMoment.year() + '</span>' )
							.append( $monthUl );
							// push year list item into year array
							yearArr.push( $yearLi );
							// reset month array
							monthArr = [];
						}

						// increment counter moment by one month
						iMoment.add( 1, 'months' )

					} // end loop

					// reverse year array if needed
					if ( _settings.inverseChron ) {
						yearArr.reverse();
					}

					// append year items into year list
					$.each( yearArr, function ( i, v ) {
						_elements.$yearList.append( v );
					} );

					break;

				// form select style navigation
				case 'select' :

					// add year and month list elements to navigation
					_elements.$navigation.prepend( _elements.$yearList );
					_elements.$navigation.prepend( _elements.$monthList );
					// add classes
					_elements.$yearList.addClass( _classes.navYearList );
					_elements.$monthList.addClass( _classes.navMonthList );

					// loop through years from min to max and add option for each into year array, using string so its easy to join
					for ( var iY = _moments.min.year(); iY <= _moments.max.year(); iY++ ) {
						yearArr.push(
							'<option class="year year-' + iY + '" value="' + iY + '">' + iY + '</option>'
						);
					}
					// loop through all months and add option for each into month array, using string so its easy to join
					for ( var iM = 0; iM < 12; iM++ ) {
						monthArr.push(
							'<option class="month month-' + ( iM + 1 ) + '" value="' + ( iM + 1 ) + '">' + moment.months( iM ) + '</option>'
						);
					}

					// reverse arrays if needed
					if ( _settings.inverseChron ) {
						yearArr.reverse();
						monthArr.reverse();
					}

					// append options to each list
					_elements.$yearList.append( yearArr.join( '' ) );
					_elements.$monthList.append( monthArr.join( '' ) );

					break;

				// loop style navigation (if less than a year, full year is shown and months loop around, year delimiter is displayed at year breaks)
				case 'loop' :

					// add month list element to navigation
					_elements.$navigation.prepend( _elements.$monthList );
					// add classes
					_elements.$monthList.addClass( _classes.navMonthList );

					// instantiate vars relevant to this style
					var singleLoop = _moments.current.diff( _moments.min, 'years', true ) <= 1 ? true : false, // do a single loop (less than a year from min to max)
						iMoment = singleLoop ? iMoment = moment( _moments.max ).subtract( 11, 'months' ).startOf( 'month' ) : moment( _moments.min ).startOf( 'month' ), // counter moment, if single loop then set to 11 months before max date
						minMoment = moment( _moments.min ).startOf( 'month' ),
						maxMoment = moment( _moments.max ).startOf( 'month' );

					// loop through months as long as counter moment is before max
					while ( maxMoment.diff( iMoment, 'months' ) >= 0 ) {

						// if its a single loop and before the min date, push month list item without link and out-of-range class
						if ( singleLoop && minMoment.diff( iMoment, 'months' ) > 0 ) {
							monthArr.push(
								'<li class="month month-' + ( iMoment.month() + 1 ) + ' ' + _classes.outOfRange + '">' +
								'<span class="' + _classes.longname + '">' + iMoment.format( 'MMMM' ) + '</span>' +
								'<span class="' + _classes.shortname + '">' + iMoment.format( 'MMM' ) + '</span>' +
								'</li>'
							);
						}
						// otherwise push a list item with a link
						else {
							monthArr.push(
								'<li class="month month-' + ( iMoment.month() + 1 ) + '">' +
								'<a href="#' + iMoment.format( 'YYYY-MM' ) + '">' +
								'<span class="' + _classes.longname + '">' + iMoment.format( 'MMMM' ) + '</span>' +
								'<span class="' + _classes.shortname + '">' + iMoment.format( 'MMM' ) + '</span>' +
								'</a>' +
								'</li>'
							);
						}

						// if its the end of a year and not the end of the list, add year delimiter
						if ( iMoment.month() === 11 && Math.floor( maxMoment.diff( iMoment, 'months', true ) ) > 0 ) {
							monthArr.push(
								_elements.$yearDelimiter
								.clone()
								.append(
									'<span class="year-prev">' + ( iMoment.year() ) + '</span>' +
									'<span class="year-curr">' + ( iMoment.year() + 1 ) + '</span>'
								)
							);
						}

						// increment counter moment by one month
						iMoment.add( 1, 'months' );
					}

					// invert month array if needed
					if ( _settings.inverseChron ) {
						monthArr.reverse();
					}

					// append list items to month list
					$.each( monthArr, function ( i, v ) {
						_elements.$monthList.append( v );
					} );

					break;
			}

			// remove loading class
			_elements.$navigation.removeClass( _classes.loading );

			// attach link handlers
			_initNavHandlers();
		};

		/**
		 * @description attach click handlers on navigator links
		 * @private
		 */
		var _initNavHandlers = function () {

			// init vars
			var targetMonth;
			var targetYear;

			// if nav type is select dropdowns, handle changes
			if ( _settings.navType === 'select' ) {
				_elements.$navigation.find( 'select' ).on( 'change', function ( e ) {
					e.preventDefault();

					// set targets
					targetMonth = _elements.$monthList.val();
					targetYear = _elements.$yearList.val();

					// set new selected month
					thatCalendar.goToDate( [ parseInt( targetYear ), parseInt( targetMonth ), 1 ] );

				} );
			}

			// handle navigator link click events
			_elements.$navigation.find( 'a' ).on( 'click', function ( e ) {
				e.preventDefault();

				// if disabled link, ignore
				if ( $( this ).hasClass( _classes.navDisabled ) ) {
					return false;
				}

				// get href value
				var href = $( this ).attr( 'href' ).substr( 1 );

				switch ( href ) {
					case 'previous' :
						// target previous month
						targetMonth = _moments.selected.month() > 0 ? _moments.selected.month() : 12;
						targetYear = _moments.selected.month() > 0 ? _moments.selected.year() : _moments.selected.year() - 1;
						break;

					case 'next' :
						// target next month
						targetMonth = _moments.selected.month() + 1 < 12 ? _moments.selected.month() + 2 : 1;
						targetYear = _moments.selected.month() + 1 < 12 ? _moments.selected.year() : _moments.selected.year() + 1;
						break;

					default :
						// target selected month
						targetYear = href.split( '-' )[ 0 ];
						targetMonth = href.split( '-' )[ 1 ];
						break;
				}

				// set new selected month
				thatCalendar.goToDate( [ parseInt( targetYear ), parseInt( targetMonth ), 1 ], false );

			} );

		};

		/**
		 * @description draws the calendar
		 * @param aMoment
		 * @param [overwrite]
		 * @private
		 */
		var _drawCalendar = function ( aMoment, overwrite ) {
			// if moment isn't valid, GET OUT
			if ( !moment.isMoment( aMoment ) ) {
				return false;
			}

			var dayDisplayFormat = _settings.displayLeadingZeros ? 'DD' : 'D';
			// calendar wrapper
			var $calWrap = $( document.createElement( 'div' ) ).attr( 'id', aMoment.format( 'YYYY-MM' ) );

			// clear calendar if not showing all
			if ( overwrite ) {
				_elements.$weeklyCalendar.html( '' )
				_elements.$calDays = $();
			}
			// if showing all, add class and title to wrapper
			else {
				$calWrap
				.addClass( _classes.calWrap )
				.append(
					'<h5 class="' + _classes.calTitle + '">' +
					'<span class="' + _classes.longname + '">' + aMoment.format( 'MMMM' ) + '</span>' +
					'<span class="' + _classes.shortname + '">' + aMoment.format( 'MMM' ) + '</span>' +
					' ' + aMoment.year() +
					'</h5>'
				);
			}

			// max number of days on the calendar (7 days x 6 weeks)
			var maxCalDays = 7 * 6;
			// counter moment starting from first day of the last week of the previous month
			var iMoment = moment( aMoment ).subtract( 1, 'months' ).endOf( 'month' ).startOf( 'week' );

			// table elements
			var $table = $( document.createElement( 'table' ) ),
				$row = $( document.createElement( 'tr' ) ),
				$cell,
				firstDOW = moment.localeData()._week.dow,
				dayNamesLong = moment.weekdays(),
				dayNamesShort = moment.weekdaysShort(),
				dayIndOrder = [],
				weekInd = 0;

			for( var i = 0; dayIndOrder.length < 7; i++ ){
				dayIndOrder[ i ] = i + firstDOW < 7 ? i + firstDOW : ( i + firstDOW ) - 7;
			}

			// add table to wrapper
			$calWrap.append( $table );

			// add heading with day names
			$table.append( $row );
			$.each( dayIndOrder, function ( i, dayInd ) {
				$cell = $( document.createElement( 'th' ) )
				.addClass( 'weekday-' + i )
				.append(
					'<h5 class="' + _classes.longname + '">' + dayNamesLong[ dayInd ] + '</h5>' +
					'<h5 class="' + _classes.shortname + '">' + dayNamesShort[ dayInd ] + '</h5>'
				);
				if ( i < 1 || i > 5 ) {
					$cell.addClass( 'weekend' );
				}
				$row.append( $cell );
			} );

			// loop through all the days on the calendar and output a cell
			for ( var i = 0; i < maxCalDays; i++ ) {

				// if multiple of seven, start a new row
				if ( i % 7 == 0 ) {
					$row = $( document.createElement( 'tr' ) );
					$table.append( $row );
					weekInd = 0;
				}

				// create cell element, add title and date attr
				$cell = $( document.createElement( 'td' ) )
				.attr( {
					'title' : iMoment.format( 'dddd MMMM DD, YYYY' ),
					'data-date' : iMoment.format( 'YYYY-MM-DD' )
				} )
				.addClass( 'weekday-' + weekInd );

				// if its a weekend, add weekend class
				if ( iMoment.day() < 1 || iMoment.day() > 5 ) {
					$cell.addClass( 'weekend' );
				}

				// add a basic label containing just the day of month's number if not using verbose labels
				if ( !_settings.verboseLabels ) {
					$cell.prepend(
						'<label><span>' + iMoment.format( dayDisplayFormat ) + '</span></label>'
					);
				}
				// otherwise add label which outputs format: "Thursday, November 2 2016"
				else {
					$cell.prepend(
						'<label><span>' +
						'<span class="' + _classes.longname + '">' + iMoment.format( 'MMMM' ) + '</span>' +
						'<span class="' + _classes.shortname + '">' + iMoment.format( 'MMM' ) + '</span>' +
						', ' +
						'<span class="' + _classes.longname + '">' + iMoment.format( 'dddd' ) + '</span>' +
						'<span class="' + _classes.shortname + '">' + iMoment.format( 'ddd' ) + '</span>' +
						' ' +
						iMoment.format( dayDisplayFormat + ', YYYY' ) +
						'</span></label>'
					)
				}

				// if its not the selected month then add out-of-month-range cell
				if ( iMoment.month() !== aMoment.month() ) {
					$cell.addClass( _classes.outOfRange + ' ' + _classes.outOfRange + '-month' );
				}
				// otherwise if we're within the selected month...
				else {
					// if its before the min date or after the max date, or the weekend and they're not included, then add out-of-day-range cell
					if (
						iMoment.diff( _moments.min, 'days', true ) < 0 ||
						iMoment.diff( _moments.max, 'days', true ) > 0 ||
						( ( iMoment.day() < 1 || iMoment.day() > 5 ) && !_settings.includeWeekends )
					) {
						$cell.addClass( _classes.outOfRange + ' ' + _classes.outOfRange + '-day' );
					}
					// otherwise add a basic cell
					else {
						// get additional html content for day
						var addContent = typeof _settings.dayInsertCallback === 'function' ?
						                 _settings.dayInsertCallback( iMoment.format( 'YYYY-MM-DD' ), $cell[ 0 ] ) :
						                 _settings.dayInsertCallback;

						// append any additional content
						if ( typeof addContent !== 'undefined' ) {
							$cell
							.addClass( _classes.addContent )
							.append( addContent.toString() );
						}

						// add to element set
						if ( _settings.includeEmptyDays || typeof addContent !== 'undefined' ) {
							_elements.$calDays = _elements.$calDays.add( $cell );
						}
					}
				}

				// add cell to row
				$row.append( $cell );

				// increment counter moment by 1 day
				iMoment.add( 1, 'days' );
				weekInd++;
			}

			// append calendar wrap el
			_elements.$weeklyCalendar.append( $calWrap );

			// handle clicks in calendar
			_initCalendarHandlers();

			// return the wrapper element
			return $calWrap[ 0 ];

		};

		/**
		 * @description apply click handlers to calendar items
		 * @private
		 */
		var _initCalendarHandlers = function () {
			// unset handler so we don't bubble to many events if all days are shown
			_elements.$calDays.off( 'click.calday' );

			// add click handler to set of day elements
			_elements.$calDays.on( 'click.calday', function ( e ) {
				e.preventDefault();
				selectDay( $( this ).attr( 'data-date' ) );
			} );
		};

		/**
		 * @description select the cell of the given date
		 * @param {string} date
		 */
		var selectDay = function( aDate ) {

			// if date is not string or formatted incorrectly, get out
			if ( typeof aDate !== 'string'  || !_stringIsValidDate( aDate ) ) {
				return false;
			}

			// find cell jq obj
			var $cell = _elements.$calDays.filter( '[data-date="' + aDate + '"]' );

			// add current class and fire callback
			if ( $cell.length && !$cell.hasClass( _classes.dayCurrent ) ) {
				// remove class from other cells
				_elements.$calDays.filter( '.' + _classes.dayCurrent ).removeClass( _classes.dayCurrent );
				// add class
				$cell.addClass( _classes.dayCurrent );
				// fire day select callback
				if ( typeof _settings.daySelectCallback === 'function' ) {
					_settings.daySelectCallback( aDate, $cell[ 0 ] );
				}
			}
		};

		/**
		 * @description highlight/set month and year in navigator
		 * @param aMoment
		 * @param [toggleDay]
		 * @private
		 */
		var _updateLayout = function ( aMoment, doSelectDay ) {
			// if moment isn't valid, GET OUT
			if ( !moment.isMoment( aMoment ) ) {
				return false;
			}

			// add loading class to weekly calendar container
			_elements.$weeklyCalendar.addClass( _classes.loading );

			// current calendar el
			var $currCal;

			if ( _settings.navType ) {

				// populate month title
				_elements.$monthTitle.html( aMoment.format( 'MMMM YYYY' ) );

				// if select type nav, highlight selected month in list
				if ( _settings.navType === 'select' ) {
					_elements.$monthList.prop( 'selectedIndex', _elements.$monthList.find( 'option[value="' + ( aMoment.month() + 1 ) + '"]' ).index() );
					_elements.$yearList.prop( 'selectedIndex', _elements.$yearList.find( 'option[value="' + ( aMoment.year() ) + '"]' ).index() );

					// disbale months that are out of range
					_elements.$monthList.children().each( function () {
						if (
							( _moments.selected.year() === _moments.min.year() && parseInt( $( this ).attr( 'value' ) ) - 1 < _moments.min.month() ) ||
							( _moments.selected.year() === _moments.max.year() && parseInt( $( this ).attr( 'value' ) ) - 1 > _moments.max.month() )
						) {
							$( this ).prop( 'disabled', true );
						}
						else {
							$( this ).prop( 'disabled', false );
						}
					} );
				}
				// otherwise just change list item that has current class
				else {
					_elements.$monthList.children().removeClass( _classes.navCurrent );
					_elements.$monthList.find( 'a[href="#' + aMoment.format( 'YYYY-MM' ) + '"]' ).closest( 'li' ).addClass( _classes.navCurrent );
				}

				// enable/disable next link
				if ( aMoment.month() >= _moments.max.month() && aMoment.year() >= _moments.max.year() ) {
					// if its the current month then disable
					_elements.$nextMonthLink.addClass( _classes.navDisabled );
				}
				else {
					_elements.$nextMonthLink.removeClass( _classes.navDisabled );
				}

				// enable/disable previous link
				if ( aMoment.month() <= _moments.min.month() && aMoment.year() <= _moments.min.year() ) {
					// if its the current month then disable
					_elements.$prevMonthLink.addClass( _classes.navDisabled );
				}
				else {
					_elements.$prevMonthLink.removeClass( _classes.navDisabled );
				}
			}

			// if not showing all, draw new calendar and set $currCall to returned element
			if ( !_settings.multiCal ) {
				$currCal = $( _drawCalendar( aMoment, true ) );
			}
			// otherwise if not already rendered, draw set of calendars
			else {
				// counter moment
				var iMoment,
					minMoment,
					maxMoment;

				// if calendar set hasn't been drawn, do it now
				if ( !_calSetExists ) {
					// if chronology is inverse, draw calendars from future to past
					if ( _settings.inverseChron ) {
						iMoment = moment( _moments.max ).startOf( 'month' );
						minMoment = moment( _moments.min ).startOf( 'month' );
						while ( minMoment.diff( iMoment, 'months' ) <= 0 ) {
							_drawCalendar( iMoment );
							iMoment.subtract( 1, 'months' );
						}
					}
					// otherwise draw calendars from past to future
					else {
						iMoment = moment( _moments.min ).startOf( 'month' );
						maxMoment = moment( _moments.max ).startOf( 'month' );
						while ( maxMoment.diff( iMoment, 'months' ) >= 0 ) {
							_drawCalendar( iMoment );
							iMoment.add( 1, 'months' );
						}
					}

					// update status so we don't redraw all these
					_calSetExists = true;
				}

				// set current class on selected month
				_elements.$weeklyCalendar.children().removeClass( _classes.calCurrent );
				$currCal = _elements.$weeklyCalendar.children( '#' + _moments.selected.format( 'YYYY-MM' ) ).addClass( _classes.calCurrent );
			}

			// remove loading class to weekly calendar container
			_elements.$weeklyCalendar.removeClass( _classes.loading );

			// get calendar element to pass to callback
			var calEl = typeof $currCal === 'object' && $currCal.length ? $currCal[ 0 ] : false;

			// fire month select callback
			if ( typeof _settings.calUpdateCallback === 'function' ) {
				_settings.calUpdateCallback( aMoment.format( 'YYYY-MM-DD' ), calEl );
			}

			// highlight day function
			if( doSelectDay ) {
				selectDay( aMoment.format( 'YYYY-MM-DD' ) );
			}
		};

		/**
		 * @description jump to a specific date
		 * @param {(string|Array|Date|Object)} aDate
		 * @param {boolean} [doSelectDay]
		 */
		this.goToDate = function ( aDate, doSelectDay ) {

			// set selected date
			_moments.selected = _getMoment( aDate );

			// make sure passed date is note out of range, if so restrict to min or max
			if ( _moments.selected.diff( _moments.max ) > 0 ) {
				_moments.selected = _moments.max;
			}
			else if ( _moments.selected.diff( _moments.min ) < 0 ) {
				_moments.selected = _moments.min;
			}

			doSelectDay = doSelectDay || _settings.alwaysSelectDay ? true : false;

			// update layout
			if ( _moments.selected ) {
				_updateLayout( _moments.selected, doSelectDay );
			}
		};

		// if options param is actually the date, set args to appropriate values
		if ( typeof date === 'object' && !date.length && !(date instanceof Date) && !moment.isMoment( date ) ) {
			options = date;
			date = new Date();
		}

		// Combine defaults and user options
		$.extend( _settings, options || {} );

		// set locale
		moment.locale( _settings.locale );

		// add classes if passed in through settings
		if ( typeof _settings.addClasses === 'object' ) {
			for ( var className in _settings.addClasses ) {
				if ( typeof _classes[ className ] === 'string' && typeof _settings.addClasses[ className ] === 'string' ) {
					_classes[ className ] += ' ' + _settings.addClasses[ className ];
				}
			}
		}

		// elements for calendar navigator
		if ( typeof _settings.navType === 'string' ) {
			_elements = {
				$navigation : $( document.createElement( 'nav' ) )
				.attr( 'id', 'calendarNavigation' )
				.addClass( 'calendar-navigation' ),
				$monthTitle : $( document.createElement( 'h4' ) )
				.attr( 'id', 'currMonth' )
				.addClass( 'curr-month' ),
				$prevMonthLink : $( document.createElement( 'a' ) )
				.attr( { 'id' : 'prevMonth', 'href' : '#previous' } )
				.addClass( 'browse prev-month' ),
				$nextMonthLink : $( document.createElement( 'a' ) )
				.attr( { 'id' : 'nextMonth', 'href' : '#next' } )
				.addClass( 'browse next-month' )
			};
			switch ( _settings.navType ) {
				// 'loop' and 'list' use ul > li structure
				case 'list' :
					_elements.$yearList = $( document.createElement( 'ul' ) )
					.attr( 'id', 'yearList' )
					.addClass( 'year-list' );
				// no break, will cascade into 'loop' as well
				case 'loop' :
					_elements.$monthList = $( document.createElement( 'ul' ) )
					.attr( 'id', 'monthList' )
					.addClass( 'month-list' );
					_elements.$yearDelimiter = $( document.createElement( 'li' ) )
					.addClass( 'year-delimiter' );
					break;

				// 'dropdown' uses select > option structure
				case 'select' :
					_elements.$monthList = $( document.createElement( 'select' ) )
					.attr( 'id', 'monthList' )
					.addClass( 'month-list' );
					_elements.$yearList = $( document.createElement( 'select' ) )
					.attr( 'id', 'yearList' )
					.addClass( 'year-list' );
					break;
			}
		}

		// elements for calendar
		_elements.$weeklyCalendar = $( document.createElement( 'div' ) )
		.attr( 'id', 'weeklyCalendar' )
		.addClass( 'weekly-calendar' );
		_elements.$calDays = $();

		// set min and max range to defaults of 10 years if not passed
		_settings.rangeMin = typeof _settings.rangeMin === 'undefined' ? 3650 : _settings.rangeMin;
		_settings.rangeMax = typeof _settings.rangeMax === 'undefined' ? 3650 : _settings.rangeMax;

		// set _moments props
		_moments.current = _getMoment( date );
		_moments.min = typeof _settings.rangeMin === 'number' ? _getMoment( _moments.current, 0 - _settings.rangeMin ) : _getMoment( _moments.current, _settings.rangeMin );
		_moments.max = _settings.navType === 'loop' ? _moments.current : _getMoment( _moments.current, _settings.rangeMax );

		// create the navigator with current date
		if ( _settings.navType ) {
			_drawNavigation();
		}
		// create the calendar
		$wrapper.append( _elements.$weeklyCalendar );
		// go to the current month
		thatCalendar.goToDate( _moments.current );

	};

}();
/*global analyticsEvent */
/*global analyticsVPV */
/*global redirectData */

fxcm.gtm = new function(){
	
	var thatGtm = this;

	/**
	 * Time at which form interaction starts
	 * @type {Date}
	 * @private
	 */
	var _formStartTime = new Date();

	/**
	 * Reset the start time
	 */
	this.resetStartTime = function() {
		_formStartTime = new Date();
	};

	/**
	 * Calculates time spent on form
	 * @param startTime
	 * @returns {number} number of seconds on form
	 */
	this.getTimeSpent = function( startTime ) {
		startTime = startTime || _formStartTime;
		var endTime = new Date();
		
		// Get the time spent in seconds by getting the difference of endTime and startTime
		return ( endTime.getTime() - startTime.getTime() ) / 1000;
	};

	/**
	 * Get the type of form based on form name
	 * @param formName
	 * @returns {*}
	 */
	this.getFormType = function( formName ){
		var formType,
		formNameArr = typeof formName === 'string' ? formName.split( '|' ) : [];
		
		if( formNameArr.length < 2 ){
			// if form name isn't at least 2 tiers long, its no good
			formType = false;
		}
		else if( formNameArr[1] === 'live-account' ){
			// if 'open-account' is in the third column of name, set type to 'account'
			formType = 'account';
		}
		else if( formNameArr[1] === 'event' ){
			// if 'event' is in the second column of name, set type to third column value
			formType = formNameArr[2];
		}	
		else{
			// otherwise set type to second column value
			formType = formNameArr[1];
		}
		
		return formType;
	};

	/**
	 * Initiate the form start event based on passed form and field DOM elements (not jQuery objects)
	 * @param form
	 * @param field
	 */
	this.formStart = function( form, field ) {
		// init data object
		var data = {};
		
		// get field name, form name, and form type
		data.fieldName = fxcm.lib.getFieldName( field );
		data.formName = fxcm.lib.getFormName( form );
		data.formType = thatGtm.getFormType( data.formName );
		
		// if form type is "account" and field name is "apply", then reset field name to "submit"
		if( data.formType === 'account' && data.fieldName.indexOf( 'apply' ) > 0 ){
			data.fieldName = 'submit';
		}
	
		// publish event with data
		amplify.publish( 'fxcm.form.onStart', data );
	};

	/**
	 * Custom form submission trackin
	 * @param alias
	 * @param type
	 * @param map
	 * @returns {boolean}
	 */
	this.formCustomTrack = function( alias, type, map ) {
		if( !alias || !type || !map ) return false;

		// convert map to string
		var mapStr = typeof map === 'object' ? JSON.stringify( map ) : map.toString();
		var mapJson;

		// function to fire on form submit
		function submitCb( data ){
			var formId = typeof data.formName !== 'string' ? '' : $( 'form[name="' + data.formName + '"]' ).attr( 'id' );
			if( typeof gtmCustomTrack !== 'function' || formId !== alias ) return false;

			// values to replace in map string
			var replace = {
				'siteId' : typeof fxcmcom === 'object' && fxcmcom.base_path ? fxcmcom.base_path.replace( /\//g, '' ).toUpperCase() : '',
				'urlPath' : document.location.pathname,
				'formName' : data.formName
			};
			// do replacement
			var search;
			for( var q in replace ) {
				search = new RegExp( '%' + q + '%', 'g' );
				mapStr = mapStr.replace( search, replace[ q ] );
			}
			// fire tracking event
			try {
				mapJson = JSON.parse( mapStr );
			}
			catch( e ){
				console.log( 'Error in custom tracking JSON' );
				return false;
			}
			if( typeof mapJson === 'object' ) gtmCustomTrack( mapJson );
		}

		// if form is demo, subscribe to demo complete event
		if( type.toLowerCase() === 'demo' ) {
			amplify.subscribe( 'fxcm.form.onDemoComplete', submitCb );
		}
		// if form is eloqua, subscribe to eloqua complete event
		else if( type.toLowerCase() === 'eloqua' ) {
			amplify.subscribe( 'fxcm.form.onEloquaComplete', submitCb );
		}
	};
};

/********** Amplify handlers **********/
if( typeof amplify === 'object' && typeof amplify.subscribe === 'function' ){



	/**
	 * GTM: On Generic Demo Click
	 * - data object -
	 * rb
	 * db
	 * currency
	 * product
	 * platform
	 */
	amplify.subscribe( 'fxcm.form.onGenericDemoRequest', function( data ) {

		var suffix = ' - demo';

		// set some defaults if not passed
		var defaultValue = 'n/a' + suffix;
		data = data || {};
		data.rb = data.rb || defaultValue;
		data.db = data.db || defaultValue;
		data.currency = data.currency || defaultValue;

		// set country name to default then create the "clean" version of it, i.e. with spaces and capitalization
		var cleanCountryName = typeof redirectData === 'object' && redirectData.hasOwnProperty( 'country' ) && redirectData.country.length ? redirectData.country : 'n/a';

		// create object to pass to GTM
		var cleanDemoEventObj = {
			eventCategory : 'Generic Demo Click',
			eventAction : data.success ? 'Generic Demo Creation' : 'TS Web Demo Form',
			eventLabel : document.location.pathname,
			eventNonInt : 'false',
			rb : data.rb.toLowerCase() + suffix,
			db : data.db,
			currency : data.currency + suffix,
			product : ( data.isSb ? 'FX-SB' : 'FX' ) + suffix,
			platform : 'ts' + suffix,
			formCountry : cleanCountryName,
			userProfileLead : 'lead'
		};

		// send data to GTM
		if( typeof analyticsEvent === 'function' ) analyticsEvent( cleanDemoEventObj );
	} );
	
	/**
	 * GTM: On Demo Complete
	 * - data object -
	 * rb
	 * db
	 * formName
	 * currency
	 * product
	 * platform
	 * execution
	 * accountType
	 * formCountry
	 * tradingExperience
	 */
	amplify.subscribe( 'fxcm.form.onDemoComplete', function( data ) {
		
		// set country name to default then create the "clean" version of it, i.e. with spaces and capitalization
		var cleanCountryName = 'n/a';
		if( typeof data.formCountry === 'string' && data.formCountry.length ){
			var cleanCountryArr = data.formCountry.split('_');
			for( var i = 0; i < cleanCountryArr.length; i++ ){
				cleanCountryArr[i] = cleanCountryArr[i].charAt(0).toUpperCase() + cleanCountryArr[i].substr(1);
			}
			cleanCountryName = cleanCountryArr.join(' ') + ' - demo';
		}
		
		// create object to pass to GTM
		var cleanDemoEventObj = {
			eventCategory : 'Demo Conversion',
			eventAction : 'Demo Form Submit',
			eventLabel : data.formName,
			eventValue : fxcm.gtm.getTimeSpent(),
			eventNonInt : 'false',
			rb : data.rb.toLowerCase() + ' - demo',
			db : data.db,
			formName : data.formName,
			currency : ( typeof data.currency === 'string' && data.currency.length ) ? data.currency + ' - demo' : 'n/a',
			product : ( typeof data.product === 'string' && data.product.length ) ? data.product + ' - demo' : 'n/a',
			platform : ( typeof data.platform === 'string' && data.platform.length ) ? data.platform + ' - demo' : 'n/a',
			execution : ( typeof data.execution === 'string' && data.execution.length ) ? data.execution + ' - demo' : 'n/a',
			accountType : ( typeof data.accountType === 'string' && data.accountType.length ) ? data.accountType + ' - demo' : 'n/a',
			tradingExperience : ( typeof data.tradingExperience === 'string' && data.tradingExperience.length ) ? data.tradingExperience : 'n/a',
			formCountry : cleanCountryName,
			userProfileLead : 'lead'
		};
		
		// send data to GTM
		if( typeof analyticsEvent === 'function' ) analyticsEvent( cleanDemoEventObj );
		
		// create virtual pageview
		var virtualPath = window.location.pathname; // current path
		var re = /(.*)(\/|.jsp|.jspf|.html|.htm|.php|.asp|.gif|.jpg|.jpeg|.png|.svg)$/; // regex to check path structure
		
		// if current URL path doesn't have a trailing slash or file extension, add a trailing slash
		virtualPath = re.exec( virtualPath ) === null ? virtualPath + '/' : virtualPath;
		
		// send virtual pageview to GTM with type, URL, and page title
		if( typeof analyticsVPV === 'function' ) analyticsVPV( 'conversion', virtualPath, { 'vpvTitle' : 'Demo Conversion' } );
	} );
	
	/**
	 * GTM: On Eloqua Complete
	 * - data object -
	 * formName
	 */
	amplify.subscribe( 'fxcm.form.onEloquaComplete', function( data ) {
		
		var formType = fxcm.gtm.getFormType( data.formName );

		// if form type can't be determined, break out
		if( !formType ){ return false; }
		
		// create object to send to GTM
		var cleanDemoEventObj = {
			eventCategory : formType.charAt(0).toUpperCase() + formType.substr(1) + ' Conversion',
			eventAction : formType.charAt(0).toUpperCase() + formType.substr(1) + ' Form Submit',
			eventLabel : data.formName,
			eventValue : fxcm.gtm.getTimeSpent(),
			eventNonInt : 'false',
			formName : data.formName
		};
		
		// send data to GTM
		if( typeof analyticsEvent === 'function' ) analyticsEvent( cleanDemoEventObj );
		
		// create virtual pageview
		var virtualPath = window.location.pathname; // current path
		var re = /(.*)(\/|.jsp|.jspf|.html|.htm|.php|.asp|.gif|.jpg|.jpeg|.png|.svg)$/; // regex to check path structure
		
		// if current URL path doesn't have a trailing slash or file extension, add a trailing slash
		virtualPath = re.exec( virtualPath ) === null ? virtualPath + '/' : virtualPath;
		
		// send virtual pageview to GTM with type, URL, and page title
		if( typeof analyticsVPV === 'function' ) analyticsVPV( 'conversion', virtualPath, { 'vpvTitle' : 'formType Conversion' } );
			
	} );
	
	/**
	 * GTM: FXCM Account Complete
	 * - data object -
	 * rb
	 * formName
	 * product
	 * platform
	 * execution
	 * accountType
	 * formCountry
	 */
	amplify.subscribe( 'fxcm.form.onFxcmAccountComplete', function( data ) {
		
		// create object to send to GTM
		var cleanAcctEventObj = {
			eventCategory : 'Web Acct Form Conversion',
			eventAction : 'Web Acct Form Submit',
			eventLabel : ( typeof data.platform === 'string' && data.platform.length ) ? data.platform + ' - acct' : 'n/a',
			eventValue : fxcm.gtm.getTimeSpent(),
			eventNonInt : 'false',
			rb : data.rb.toLowerCase() + ' - acct',
			formName : data.formName,
			product : ( typeof data.product === 'string' && data.product.length ) ? data.product + ' - acct' : 'n/a',
			platform : ( typeof data.platform === 'string' && data.platform.length ) ? data.platform + ' - acct' : 'n/a',
			execution : ( typeof data.execution === 'string' && data.execution.length ) ? data.execution + ' - acct' : 'n/a',
			accountType : ( typeof data.accountType === 'string' && data.accountType.length ) ? data.accountType + ' - acct' : 'n/a',
			formCountry : ( typeof data.formCountry === 'string' && data.formCountry.length ) ? data.formCountry + ' - acct' : 'n/a'
		};
		
		// send data to GTM
		if( typeof analyticsEvent === 'function' ) analyticsEvent( cleanAcctEventObj );
	} );
	
	
	/**
	 * GTM: On Form Error
	 * - Required Data -
	 * formType
	 * formName
	 * errorFieldNames
	 */
	amplify.subscribe( 'fxcm.form.onError', function( data ) {
		var gaCategory = '',
		gaAction = '',
		formType = fxcm.gtm.getFormType( data.formName );

		// if form type can't be determined, break out
		if( !formType ){
			return false;
		}
		
		if( formType === 'account' ){
			// if account form, set specific category adn action
			gaCategory = 'Web Acct Form Interaction';
			gaAction = 'Web Acct Form Error';
		}
		else{
			// otherwise use type along with descriptors
			gaCategory = formType.charAt(0).toUpperCase() + formType.substr(1) + ' Form Interaction';
			gaAction = formType.charAt(0).toUpperCase() + formType.substr(1) + ' Form Error';
		}
	
		// send data to GTM
		if( typeof analyticsEvent === 'function' ) analyticsEvent( {
			eventCategory : gaCategory,
			eventAction : gaAction,
			eventLabel : data.formName,
			eventValue : fxcm.gtm.getTimeSpent(),
			eventNonInt : 'false',
			formName : data.formName,
			errorFieldNames : data.errorFieldNames || 'n/a'
		} );
	} );
	
	/**
	 * GTM: FXCM Form Start
	 * - Required Data -
	 * formName
	 * formField
	 */
	amplify.subscribe( 'fxcm.form.onStart', function( data ) {
		var category = '',
		action = '';

		// if form type can't be determined, break out
		if( !data.formType ){
			return false;
		}
		
		if( data.formType === 'account' ){
			category = 'Web Acct Form Interaction';
			action = 'Web Acct Form Start';
		}
		else{
			category = data.formType.charAt(0).toUpperCase() + data.formType.substr(1) + ' Form Interaction';
			action = data.formType.charAt(0).toUpperCase() + data.formType.substr(1) + ' Form Start';
		}

		if( typeof analyticsEvent === 'function' ) analyticsEvent( {
			eventCategory : category,
			eventAction : action,
			eventLabel : data.formName,
			eventValue : fxcm.gtm.getTimeSpent(),
			eventNonInt : false,
			formName : data.formName,
			fieldName: data.fieldName
		} );

		// reset the time so that when we calculate form complete, it's complete - start.
		fxcm.gtm.resetStartTime();
	} );
	
	/**
	 * GTM: FXCM Page Not Found
	 * - No Required Data -
	 * locationPath
	 * pageTitle
	 */
	amplify.subscribe( 'fxcm.page.notFound', function( data ) {
		
		var virtualPath = data.pagePath;
		var re = /(.*)(\/|.jsp|.jspf|.html|.htm|.php|.asp|.gif|.jpg|.jpeg|.png|.svg)$/;
		virtualPath = re.exec(virtualPath) === null ? virtualPath + '/' : virtualPath;
		
		var errorEventObj = {
			eventCategory : '404 (Not Found)',
			eventAction : virtualPath,
			eventLabel : ( typeof document.referrer === 'string' && document.referrer.length ) ? document.referrer : 'n/a',
			vpvTitle : data.pageTitle
		};

		if( typeof analyticsEvent === 'function' ) analyticsEvent( errorEventObj );
		if( typeof analyticsVPV === 'function' ) analyticsVPV( '404', virtualPath, { 'vpvTitle' : data.pageTitle } );
		
	} );
	
}
/* ========== MIFID FORM LOGIC MODULE ========== */
fxcm.mifid = function( $form, lang ) {

    window._selectedCountryDocs = [];

    function _getElement( elem ) {
        if ( !elem ) {
            return false;
        }

        var found;

        if ( fxcm.lib.isJqueryElement( elem ) && elem.length ) {
            found = elem;
        }
        else if ( typeof elem === 'string' && elem.charAt( 0 ) === '#' && document.getElementById( elem.slice( 1 ) ) !== null ) {
            found = $( elem );
        }
        else {
            found = false;
        }

        return found;
    }

    var $formEl = _getElement($form);

    if( !$formEl ) {
        return false;
    }

    /**
     * @param _elementsMap
     * @description mapping of jquery elements to modify in the form
     */
    var _elementsMap = {
        $countrySelect: $formEl.find("#country"),
        $defaultContent: $formEl.find(".default-content"),
        $documentMsg: $formEl.find(".document-msg"),
        $siteLang: typeof lang === 'string' ? lang : "en",
        documents: []
    };

    // loop through documents and get their elements
    $formEl.find('.document').each(function (i) {
        _elementsMap.documents[i] = {
            $parent: $(this),
            $label: $(this).find('label'),
            $input: $(this).find('input[type="text"]'),
            $instrReq: $(this).find('.instruction.req'),
            $instrOpt: $(this).find('.instruction.opt'),
        };
    });

    _elementsMap.$countrySelect.on("change", function () {

        window._selectedCountryDocs = [];

        _elementsMap.$defaultContent.hide();
        _elementsMap.$documentMsg.hide();

        $.each(_elementsMap.documents, function (i, doc) {
            doc.$parent.hide(); // hide field
            doc.$instrReq.hide(); // hide req instruction
            doc.$instrOpt.hide(); // hide opt instruction
            doc.$input.removeClass('required'); // remove .required from the input
        });

        /**
         * @param $option
         * @description Store the selected options in a variable
         */
        var $option = $(this).children().eq($(this).prop("selectedIndex"));

        /**
         * @param selectedCountry
         * @type object
         * @description Object that holds the options for the country selected in the country dropdown
         */
        var selectedCountry = {
            //If the option selected is not "-------------", assigns the ID, other wise sets attribute as blank ( fixes the console error when selecting "---------"
            id: typeof $option.attr('id') === 'string' ? $option.attr('id').toLowerCase() : false,
            value: $option.attr("value")
        };

        // If it's one of the pre options, remove the pre
        if (typeof selectedCountry.id === 'string' && selectedCountry.id.indexOf('pre_') > -1) {
            selectedCountry.id = selectedCountry.id.slice(4);
        }


        // If selected country id is in the country map sets the documents, if NOT it sets the documents to the default, leaves country id's in the country map WITHOUT documents as undefined
        selectedCountry.documents = typeof fxcm.registration.mifidCountryMap[selectedCountry.id] === 'object' ? fxcm.registration.mifidCountryMap[selectedCountry.id].documents : fxcm.registration.mifidCountryMap.default.documents;

        //selectedCountry.lang = _elementsMap.$siteLang;

        /**
         * @description Show/Hide Logic for .on() change of country list drop down
         */

        //If the county select is on "Please select"  or "------------"
        if (selectedCountry.id) {

            //Countries that are in fxcm.registration.mifidCountryMap but HAVE NO documents
            if (typeof selectedCountry.documents == "undefined") {

                //Then Show content
                _elementsMap.$defaultContent.show();

                //Countries in fxcm.registration.mifidCountryMap that HAVE documents
            } else {

                window._selectedCountryDocs = selectedCountry.documents;

                // loop through docs
                for (var i = 0; i < selectedCountry.documents.length; i++) {

                    if( typeof selectedCountry.documents[i].label.lang[_elementsMap.$siteLang] == "undefined" ) {
                        _elementsMap.documents[i].$label.html(selectedCountry.documents[i].label.lang['en']);

                    } else {
                        _elementsMap.documents[i].$label.html(selectedCountry.documents[i].label.lang[_elementsMap.$siteLang]);
                    }

                    // if document is required
                    if (selectedCountry.documents[i].required) {

                        // add .required to the input
                        _elementsMap.documents[i].$input.addClass('required');

                        //show input message
                        _elementsMap.documents[i].$instrReq.show();


                        // if document is not required
                    } else {

                        //show input message
                        _elementsMap.documents[i].$instrOpt.show();

                    }

                    //show document input
                    _elementsMap.documents[i].$parent.fadeIn();

                }

                _elementsMap.$defaultContent.show();
                _elementsMap.$documentMsg.show();

            }

        }

    });

}; // end fxcm.mifid
/* FXCM Notes:
 * If testing validation in ie8, you must be in REAL ie8, not compatibility mode.
 */
/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});

/********************* BEGIN Custom Validation Code *********************/

// Checks for any fields related to the requested field name and returns the value, e.g. searching for "name" would get the values for both First Name and Last Name
function getFieldValue(form, fieldName) {
	var fieldValue = '';
	var fields = $(form).serializeArray();
	for (var i = 0; i < fields.length; i++) {
		if ((fields[i].name.toLowerCase().indexOf(fieldName) >= 0) && (fields[i].value != '')) {
			if (fieldName.toLowerCase() !== 'name' || (fields[i].name.toLowerCase() !== 'ibname' && fields[i].name.toLowerCase() !== 'elqformname')) {
			    fieldValue+= (fieldValue ? ' ' : '') + fields[i].value;
			}
		}
	}
	return fieldValue;
}

// Initial error counter required for proper e-mail validation
jQuery.validator.submitStatus = true;

// Function called in showErorrs. Tracks field errors and sends the info to Omniture
function trackFormErrors(errorList, currentForm){
    var errorFieldNames = [];

    for (var i=0 ; i < errorList.length ; i++) {
        var error = errorList[i];
        errorFieldNames.push( fxcm.lib.getFieldName( error.element ) );
    }

    if (errorList.length > 0 && jQuery.validator.submitStatus === true) {

        // create data object to send with amplify event
		var data = {};

		// merge error field names, get form name
		data.errorFieldNames = errorFieldNames.join( ',' );
		data.formName = fxcm.lib.getFormName( currentForm );

		// publish amplify event
		if( typeof amplify === 'object' && typeof amplify.publish === 'function' ){
			amplify.publish( 'fxcm.form.onError', data );
		}

		// update submit status
		jQuery.validator.submitStatus = false;
	}
}

jQuery.validator._demoBalanceRegEx = /^\d{0,13}(\.\d{0,2})?$/;
jQuery.validator.demoBalanceValidate = function(value, element){
	var demoValidation = typeof fxcm === 'object' && typeof fxcm.Demo === 'function' && typeof fxcm.Demo.prototype.isValidBalance === 'function';

	if (demoValidation ? fxcm.Demo.prototype.isValidBalance(value) : jQuery.validator._demoBalanceRegEx.test(value)) {
		return true;
	} else {
		return this.optional(element);
	}
};

jQuery.validator._emailRegEx = /^[^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*@(\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,})$/i;
jQuery.validator.emailValidate = function(value, element) {
	var demoValidation = typeof fxcm === 'object' && typeof fxcm.Demo === 'function' && typeof fxcm.Demo.prototype.isValidEmail === 'function';

	if (demoValidation ? fxcm.Demo.prototype.isValidEmail(value) : jQuery.validator._emailRegEx.test(value)) {
		return true;
	} else {
		return this.optional(element);
	}
};

jQuery.validator._phoneRegEx = /^[+()_,.:a-zA-Z\-=0-9 *]{5,20}$/i;
jQuery.validator.phoneValidate = function(value, element){

	if ( jQuery.validator._phoneRegEx.test(value) ) {
		return true;
	} else {
		return this.optional(element);
	}
};

jQuery.validator._zipRegEx = function(value) { return (typeof value === 'string' || typeof value === 'number') && String(value).length <= 10 };
jQuery.validator.zipValidate = function(value, element){
	var demoValidation = typeof fxcm === 'object' && typeof fxcm.Demo === 'function' && typeof fxcm.Demo.prototype.isValidZip === 'function';

	if (demoValidation ? fxcm.Demo.prototype.isValidZip(value) : jQuery.validator._zipRegEx(value)) {
		return true;
	} else {
		return this.optional(element);
	}
};

// Use on sites that need stricter zip code validation. Does not employ fxcm.Demo validation rules.
jQuery.validator._zipRegExStrict = /^\d{5}$/;
jQuery.validator.zipValidateStrict = function(value, element){
	if (jQuery.validator._zipRegExStrict.test(value)) {
		return true;
	} else {
		return this.optional(element);
	}
};

// Use on sites that may require 4 or 5 digit zip codes.
jQuery.validator._zipRegEx4or5Digit = /^\d{4,5}$/;
jQuery.validator.zipValidate4or5Digit = function(value, element){
	if (jQuery.validator._zipRegEx4or5Digit.test(value)) {
		return true;
	} else {
		return this.optional(element);
	}
};

// Use on ZuluTrade LOD forms.
jQuery.validator._amountRegExUpTo9Digits = /^\d{1,9}(\.\d{1,2})?$/;
jQuery.validator.amountValidateUpTo9Digits = function(value, element){
	if (jQuery.validator._amountRegExUpTo9Digits.test(value)) {
		return true;
	}
	else {
		return this.optional(element);
	}

};

// Used to somewhat test for FXCM Live Account Usernames*
//  Usernames are different in that they do not follow a pattern.
//  They can't be emails or demo accounts. So we test for not those.
jQuery.validator._liveFXCMAccountRegEx = /^\d[0-9]{7,13}$/;
jQuery.validator._demoFXCMAccountRegEx =/^([d,D,u,U])[0-9]+$/;
jQuery.validator.liveFXCMAccountLoginValidate = function(value, element) {
    var anyWordNoNumbersRegEx = /^[a-z]*$/;
    if( !jQuery.validator._emailRegEx.test( value ) &&
        !anyWordNoNumbersRegEx.test( value ) &&
        !jQuery.validator._demoFXCMAccountRegEx.test( value ) ) {
        return true;
    } else {
        return this.optional(element);
    }
};

jQuery.validator.addMethod('demobalancecustom', jQuery.validator.demoBalanceValidate, 'Please enter a valid amount.');

jQuery.validator.addMethod('emailcustom', jQuery.validator.emailValidate, 'Please enter a valid email address.');

jQuery.validator.addMethod('phonecustom', jQuery.validator.phoneValidate, 'Please enter a valid phone number.');

jQuery.validator.addMethod('zipcustom', jQuery.validator.zipValidate, 'Please enter a valid zip code.');

jQuery.validator.addMethod('zipcustomstrict', jQuery.validator.zipValidateStrict, 'Please enter a valid 5 digit zip code.');

jQuery.validator.addMethod('zipcustom4or5Digit', jQuery.validator.zipValidate4or5Digit, 'Please enter a valid 4 or 5 digit zip code.');

jQuery.validator.addMethod('amountcustomUpTo9Digits', jQuery.validator.amountValidateUpTo9Digits, 'Please enter a valid transfer amount up to 9 digits.');

jQuery.validator.addMethod('DateGeneral', function(value, element) {
	return this.optional(element) || /^(0?[1-9]|1[012])[-\/.](0?[1-9]|[12][0-9]|3[01])[-\/.](19|20)\d\d$/.test(value);
}, 'Please enter a valid date.');

jQuery.validator.addMethod('DateOfBirth', function(value, element) {
	return this.optional(element) || /^(0?[1-9]|1[012])[-\/.](0?[1-9]|[12][0-9]|3[01])[-\/.](19|20)\d\d$/.test(value);
}, 'Please enter a valid date of birth.');

jQuery.validator.addMethod('DateOfBirthEurope', function(value, element) {
	return this.optional(element) || /^(0?[1-9]|[12][0-9]|3[01])[-\/.](0?[1-9]|1[012])[-\/.](19|20)\d\d$/.test(value);
}, 'Please enter a valid date of birth.');

jQuery.validator.addMethod('FavoriteColorHoneypot', function(value, element) {
	return ! value.length;
}, '');

jQuery.validator.addMethod('DateGeneralEurope', function(value, element) {
	return this.optional(element) || /^(0?[1-9]|[12][0-9]|3[01])[-\/.](0?[1-9]|1[012])[-\/.](19|20)\d\d$/.test(value);
}, 'Please enter a valid date.');

jQuery.validator.addMethod('DateOfBirthAsia', function(value, element) {
	return this.optional(element) || /^(19|20)\d\d[-\/.](0?[1-9]|1[012])[-\/.](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}, 'Please enter a valid date of birth.');

jQuery.validator.addMethod('numbersCommasPeriodsOnly', function(value, element) {
	return this.optional(element) || /^[0-9,.]+$/.test(value);
}, 'Please use numbers, commas, or periods only.');

jQuery.validator.addMethod('liveFXCMAccountLogin', jQuery.validator.liveFXCMAccountLoginValidate, 'Account number contains 8 to 12 numbers.')

jQuery.validator.addMethod('customRange', function (value, element) {
	var	elmLength = value.length,
		minVal = $(element).attr('data-charmin'),
		maxVal = $(element).attr('data-charmax');

	// if no data-attr return true.
	if ( !$(element).attr('data-charmin') || !$(element).attr('data-charmax') ) return true;
	// if within range return true.
	if ( elmLength >= minVal && elmLength <= maxVal ) return true;
	// allow blank fields to pass
	return this.optional(element);

}, function(params, element) {
	// return our error
	return 'Please enter between ' + $(element).attr('data-charmin') + ' and '+ $(element).attr('data-charmax') +' characters.'
});

jQuery.validator.addMethod('tinCustomValidationFormat', function (value, element) {
	var TINCharactersLengthRegEx = /^.{4,20}$/i;
	return TINCharactersLengthRegEx.test( value ) ? true : this.optional(element);
}, function(params, element) {
	// return our error
	//return 'Please enter a valid TIN number between ' + 4 + ' and '+ 20 +' characters.'
	return localizedStrings['invalid_tin']
});

jQuery.validator.addMethod('tinCustomValidationPattern', function (value, element) {
	var isValid = true;
	var TINAllowedCharactersRegEx = /^[ a-z0-9_—-]+$/i;

	var charSequences = [
		'abcdefghijklmnopqrstuvwxyz',
		'0123456789',
		'—-_—_-—'
	];
	var testLength = 6;
	var testRepeatStr = '';
	var testSequentialStr = '';

	// For each character sequence, test repeated characters and character sequences
	for( var i = 0; i < charSequences.length; i++ ) {
		for( var j = 0; j < charSequences[ i ].length; j++ ) {

			// reset test strings
			testRepeatStr = '';
			testSequentialStr = '';
			for( var k = 0; k < testLength; k++ ) {
				testRepeatStr += charSequences[ i ][ j ];
				if( j + k < charSequences[ i ].length )
					testSequentialStr += charSequences[ i ][ j + k ];
			}

			if( value.indexOf( testRepeatStr ) > -1 || // Single character is contiguous OR
				(
					testSequentialStr.length === testLength && // Sequence still has remaining characters AND
					value.indexOf( testSequentialStr ) > -1 // Sequential characters are present
				)
			) {
				isValid = false;
			}
		}
	}
	return isValid && TINAllowedCharactersRegEx.test( value ) ? true : this.optional( element );
}, function(params, element) {
	// return our error
	//return 'Invalid ID Number has been entered, please update your entry'
	return localizedStrings['invalid_tin_id']
});
jQuery.validator.addMethod('crsNameFormat', function (value, element) {
	var crsEntityAcceptableChars = /^[ a-z0-9,.()_—-]+$/i;
	return crsEntityAcceptableChars.test( value ) ? true : this.optional(element);
}, function(params, element) {
	// return our error
	return localizedStrings['invalid_name']
});

jQuery.validator.addMethod('documentCheck', function (value, element) {

	if ( typeof window._selectedCountryDocs !== 'object' ){
		return true;
	}

    var formattedValue = value.replace(/[^a-zA-Z0-9]+/, '');

    var docID = $(element).attr('id');
    var docNum = typeof docID === 'string' ? parseInt(docID.charAt(docID.length - 1)) - 1 : -1;

    var min = typeof window._selectedCountryDocs[docNum] === "object" && typeof window._selectedCountryDocs[docNum].min === "number" ? window._selectedCountryDocs[docNum].min : 0;
    var max = typeof window._selectedCountryDocs[docNum] === "object" && typeof window._selectedCountryDocs[docNum].max === "number" ? window._selectedCountryDocs[docNum].max : 9999;

    if (
        !value.length ||
        ( !window._selectedCountryDocs.length ) ||
        ( formattedValue.length >= min && formattedValue.length <= max )
    ) {

        return true;

    }

    return false;

}, 'Please format your ID correctly');

jQuery.validator.messages.required = "";

jQuery.validator.standardValidationOptions = {
	// showErrors is a function that sends form error information to Omniture for tracking
	showErrors: function(errorMap, errorList) {
		trackFormErrors(this.errorList, this.currentForm);
		//========BEGIN defaultShowErrors from jQuery.validator======
		for ( var i = 0; this.errorList[i]; i++ ) {
			var error = this.errorList[i];
			this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
			this.showLabel( error.element, error.message );

			// Highlight invalid field's <label>
			this.settings.highlightLabel( this.settings.findLabel(this.currentForm, error.element), this.settings.errorLabelClass, true );
		}

		if( this.errorList.length ) {
			this.toShow = this.toShow.add( this.containers );
		}
		if (this.settings.success) {
			for ( var i = 0; this.successList[i]; i++ ) {
				this.showLabel( this.successList[i] );
			}
		}
		if (this.settings.unhighlight) {
			for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
				this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );

			// Unhighlight invalid field's <label>
				this.settings.highlightLabel( this.settings.findLabel(this.currentForm, elements[i]), this.settings.errorLabelClass, false);
			}
		}
		this.toHide = this.toHide.not( this.toShow );
		this.hideErrors();
		this.addWrapper( this.toShow ).show();
		//=========END defaultShowErrors from jQuery.validator=======

	},
	// End of show Errors

	// Locates associated <label> of a form field
	findLabel: function (form, element){
		if ($(element).length < 1){ return false; }

		var _form = $(form),
			_element = $(element),
			_parentElement = _element.parent(),
			_labels = _parentElement.find('label');

		// if no label found, check if element is contained within its own label
		if (_labels.length < 1 && _parentElement.prop('tagName') === 'LABEL') {
			_labels = _parentElement;
		}

		// if no label found, loop upward through form to locate a label with proper "for" attribute
		while (_labels.length < 1) {
			if (_parentElement[0] === _form[0]) {break;} // reached the top of the form, break out of loop

			_parentElement = _parentElement.parent();
			_labels = _parentElement.find('label[for= '+ _element.attr('id') +']');
		}

		// collect appropriate labels for radio buttons
		if (_element.attr('type') === 'radio'){
			var _yesnoset = _element.closest('.radio-yesno-set').length ? _element.closest('.radio-yesno-set') : false;
			var _radioGroup = _element.closest('.radio-group').length ? _element.closest('.radio-group') : false;
			var _radioGroupLabel = _radioGroup && _radioGroup.find('label.radio-group-label').length ? _radioGroup.find('label.radio-group-label') : false;

			// radio-yesno-set
			if( _yesnoset ){
				_labels = _element.parent().find('label');
			}
			// radio-group labels
			else if( _radioGroupLabel ){
				_labels = _radioGroupLabel;
			}
			// radio group default
			else if( _radioGroup ){
				var _siblingElements = _radioGroup.find('input[name="' + _element.attr('name') + '"]');
				_siblingElements.each(function(){
					_labels = _labels.add( $(this).parent().find('label[for="' + $(this).attr('id') + '"]') );
				});
			}
			// default setting
			else{
				_labels = _element.parent().find('label[for="' + _element.attr('id') + '"]');
			}
		}

		return _labels;
	},

	// Sets highlighting for <label> elements
	highlightLabel: function (label, errorLabelClass, highlight) {
		if (typeof label === undefined || $(label).length < 1) {return false}

		if(highlight) {
			$(label).addClass(errorLabelClass);
		}
		else {
			$(label).removeClass(errorLabelClass);
		}
	},
	// End label highlighting

	errorElement: 'span',
	errorClass: 'invalid',
	errorLabelClass: 'validate',

	rules: {
		favorite_color: {
			FavoriteColorHoneypot: true
		},
		email: {
			required: true,
			emailcustom: true
		},
		JointEmail: {
			emailcustom: true
		},
		phone: {
			phonecustom: true
		},
		TransferAmount: {
			required: true,
			amountcustomUpTo9Digits: true
		},
		ExistingAccountNumber: {
			required: '#TransferFunds:checked'
		},
		'demo.phone': {
			phonecustom: true
		},
		'demo.initial_balance': {
			demobalancecustom: true
		},
		'demo.zip_postal_code': {
			zipcustom: true
		},
		customRange: {
			customRange: true
		},
		DateOfBirth: {
			DateOfBirthEurope: true
		},
		AmountDisputed: {
			numbersCommasPeriodsOnly: true
		},
		DateGeneral: {
			DateGeneral: true
		},
        liveFXCMAccountLogin: {
            liveFXCMAccountLogin: true
        },
        ID_Priority_1: {
            documentCheck: true
        },
        ID_Priority_2: {
            documentCheck: true
        },
		PART3_1_TIN: {
			tinCustomValidationFormat: true,
			tinCustomValidationPattern: true
		},
		PART3_2_TIN: {
			tinCustomValidationFormat: true,
			tinCustomValidationPattern: true
		},
		PART3_3_TIN: {
			tinCustomValidationFormat: true,
			tinCustomValidationPattern: true
		},
		Part1_A: {
			crsNameFormat: true
		},
		PART1_firstname: {
			crsNameFormat: true
		},
		PART1_middlename: {
			crsNameFormat: true
		},
		PART1_lastname: {
			crsNameFormat: true
		}
	},
	messages: {
		consent: {
			required: 'Please agree to the statement'
		}
	},
	onfocusout: function(element, event){
		// this function returns determines what to do on blur for each field
		// if there are rules set for the current field (element)
		if(typeof this.settings.rules[element.name] != 'undefined'){
			// if 'phonecustom' is the validation method for this field, and the field is valid
			if(this.settings.rules[element.name]['phonecustom'] && this.element(element)){
				// strip whitespaces from this field
				element.value = element.value.replace(/ /g, '');
			}
		}
		// required so all fields are validated on blur
		this.element(element);
	}

	/* The following options are also available:
	onkeyup:
	onsubmit:
	*/
};

// Field name aliases
var _jQueryValidatorRules = jQuery.validator.standardValidationOptions.rules;
// Aliases for required email rule
_jQueryValidatorRules['demo.email_address'] =
	_jQueryValidatorRules['C_EmailAddress'] =
	_jQueryValidatorRules.EMAIL =
	_jQueryValidatorRules.Email =
	_jQueryValidatorRules.email;

// Aliases for non-required email
_jQueryValidatorRules.JointAccountEmail =
	_jQueryValidatorRules.JointEmailAddress =
	_jQueryValidatorRules.JointEmail;

// Aliases for phone field
_jQueryValidatorRules['C_BusPhone'] =
	_jQueryValidatorRules.PHONE =
	_jQueryValidatorRules.Phone =
	_jQueryValidatorRules.phone;

// Aliases for DOB
_jQueryValidatorRules['DOB'] =
	_jQueryValidatorRules.DateofBirth =
	_jQueryValidatorRules.Dateofbirth =
	_jQueryValidatorRules.dateofbirth =
	_jQueryValidatorRules.date_of_birth =
	_jQueryValidatorRules.DateOfBirth;

var _jQueryValidatorMessages = jQuery.validator.standardValidationOptions.messages;
// Aliases for consent message
_jQueryValidatorMessages.youherbebyacknowledgethatyou =
	_jQueryValidatorMessages.Confirm =
	_jQueryValidatorMessages.consentTransfer =
	_jQueryValidatorMessages.transferConsent =
	_jQueryValidatorMessages.Consent =
	_jQueryValidatorMessages.Consent2 =
    _jQueryValidatorMessages.vpsconsent =
	_jQueryValidatorMessages.consent;

// Legacy object to support old code
jQuery.validator.customDemoFormValidationOptions = jQuery.validator.standardValidationOptions;
/* ----------- Create amplify functions just in case amplify doesn't exist ----------- */
if ( typeof amplify === 'undefined' ){
    amplify = {};
    amplify.subscribe = function(){};
    amplify.publish = function(){};
}

// set moment locale to US english
if ( typeof moment === 'function' ) {
    moment.locale( 'en' );
}

/********************* Outdated Browser Message *********************/
if ( typeof outdatedBrowser !== 'undefined' && document.getElementById( 'outdated' ) !== null ) {
    outdatedBrowser( {
        bgColor : '#f25648',
        color : '#ffffff',
        lowerThan : 'borderImage',
        languagePath : ''
    } );
}

/* ////////////////////////////////////////////////////////////////////////
 -----------/ BEGIN jQuery dependency + document ready function / -----------
 //////////////////////////////////////////////////////////////////////// */
if ( typeof jQuery !== 'undefined' ) {
    $( document ).ready( function () { // begin jQuery document ready function

        // prevent history update on link clicks that are only hashtags
        $( document ).on( 'click', 'a', function(e) {
            if( $( this ).attr( 'href' ) === '#' )
                e.preventDefault();
        } );

        // abstracted general search form focus and blurring
	    $( 'form.search-form' ).on( 'focus focusin', 'input[type="search"]', function(){
		    $( this ).closest( 'form' ).addClass( 'has-focus has-value' );
	    } );

	    $( 'form.search-form' ).on( 'blur', 'input[type="search"]', function(){
		    $( this ).closest( 'form' ).removeClass( 'has-focus' );
		    if( !$( this ).val() || !$( this ).val().length ) {
			    $( this ).closest( 'form' ).removeClass( 'has-value' );
		    }
	    } );

        /********************* BEGIN Tooltip Application *********************/
        if ( typeof fxcm.Tooltip !== 'undefined' ) {
            // Attach simpletip
            $( '.has-tooltip' ).each( function () {
                new fxcm.Tooltip( this );
            } );
        }
        /********************* END Tooltip Application *********************/


        /******************** BEGIN Dynamic Form Names ********************/
        if ( typeof fxcm.internal !== 'undefined' && typeof fxcm.gtm !== 'undefined' ) {

            function formSetGTMLogic( contentWrapper ) {

            	contentWrapper = contentWrapper ? contentWrapper : $( '#mc' );

	            $( contentWrapper ).find( 'form' ).each( function () {
		            var $form = $( this );
		            fxcm.internal.setDynamicFormName( $form );

		            $form.find( 'input, textarea, select' ).on( 'focus.gtmOnStart', function () {
			            var $field = $( this );
			            if ( $form.data( 'form-start' ) ) {
				            return false;
			            }

			            fxcm.gtm.formStart( $form[ 0 ], $field[ 0 ] );

			            // store data within the form element that stores form-start as true.
			            $form.attr( 'data-form-start', 'true' );

			            // remove the focus.gtmOnStart event from this form
			            $form.find( 'input, textarea, select' ).off( 'focus.gtmOnStart' );
		            } );
	            } );
            }

	        formSetGTMLogic( $( '#mc' ) );
        }
        /******************** END Dynamic Form Names ********************/


	    /******************** AUTO COUNTRY SELECT ********************/


	    function formSetCountrySelectValue( contentWrapper ) {

		    contentWrapper = contentWrapper ? contentWrapper : $( '#mc' );

		    // Loop through all potential country select fields in all forms on the page and set the country if possible
		    $( contentWrapper ).find( 'form select' ).filter( '[id*="country"], [class*="country"], [name*="country"]' ).each( function(){
			    if( $(this).find( 'option' ).length ){
				    fxcm.internal.setCountrySelectValue( $( this ) );
			    }
		    });
	    }

	    formSetCountrySelectValue( $( '#mc' ) );

	    // append body class and fire amplify event
	    $( 'body' ).addClass( 'global-country-selected' );
	    amplify.publish( 'fxcm.form.onGlobalCountrySelect' );


        /********************* BEGIN Custom Validation Application *********************/
        if ( typeof jQuery.validator !== 'undefined' ) {

	        // Required for proper firing of tracking requests
	        $( "form" ).on( 'submit', function () {
		        jQuery.validator.submitStatus = true;
	        } );

        	function formAttachValidation( contentWrapper ) {

		        contentWrapper = contentWrapper ? contentWrapper : $( '#mc' );

		        // The forms must be looped through because jQuery Validator's .validate() function will treat all the forms as one big form
		        $( contentWrapper ).find( 'form.std_validate, form.standard, form.custom' ).each( function () {
			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        // Attach Eloqua AJAX submission
		        jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.genericEloquaValidatorSubmitHandler;
		        $( contentWrapper ).find( 'form.genericEloqua' ).each( function () {
			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.confBoxEloquaValidatorSubmitHandler;
		        $( contentWrapper ).find( 'form.confBoxEloqua' ).each( function () {
			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        // Attach actions for Demo signup in conjunction with Seminar event signup
		        $( contentWrapper ).find( 'form.confBoxSeminarDemoCoreg' ).each( function () {

			        var $form = $( this );
			        var rb = $form.find( 'input[name="rb"]' ).val();

			        // populate demo.country hidden input field for generating demos
			        $( 'select[name="country"]' ).change( function () {
				        fxcm.internal.setDemoCountryField( this );
			        } );

			        // Set submitHandler
			        jQuery.validator.standardValidationOptions.submitHandler = fxcm.internal.trackingFactory( fxcm.internal.confBoxEloquaValidatorSubmitHandler, function () {
				        var demoField = $form.find( '#demo-signup' );
				        var demoFired = false; //default

				        // Determine if user requested a demo
				        if ( demoField.length ) {
					        demoFired = demoField.attr( 'type' ) === 'checkbox' ? demoField.is( ':checked' ) : $.inArray( demoField.val().toLowerCase(), [ "yes", "on" ] ) > -1; // support multiple formats (yes/on)
				        }

				        fxcm.internal.toggleDemoConfText( demoFired ); // set proper state of confirmation depending on whether user requested demo or not
			        } );

			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        // Attach Demo AJAX submission
		        $( contentWrapper ).find( 'form.genericDemo' ).each( function () {
			        jQuery.validator.standardValidationOptions.submitHandler = $( this ).hasClass( 'countryFilter' ) ?
			                                                                   fxcm.internal.genericCountryDemoValidatorSubmitHandler :
			                                                                   fxcm.internal.genericDemoValidatorSubmitHandler;
			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        $( contentWrapper ).find( 'form.confBoxDemo' ).each( function () {
			        jQuery.validator.standardValidationOptions.submitHandler = $( this ).hasClass( 'countryFilter' ) ?
			                                                                   fxcm.internal.confBoxCountryDemoValidatorSubmitHandler :
			                                                                   fxcm.internal.confBoxDemoValidatorSubmitHandler;
			        $( this ).validate( jQuery.validator.standardValidationOptions );
		        } );

		        delete jQuery.validator.standardValidationOptions.submitHandler;
	        }

	        formAttachValidation();
        }
        /********************* END Custom Validation Application *********************/

	    /******************** BEGIN Form Overlay Hooks ********************/

	    amplify.subscribe( 'fxcm.overlay.onOpen.form', function () {
	    	var $lightcaseWrapper = $( lightcase.get( 'content' ) );
		    formSetGTMLogic( $lightcaseWrapper );
		    formSetCountrySelectValue( $lightcaseWrapper );
		    formAttachValidation( $lightcaseWrapper  );
	    } );

	    /******************** END Form Overlay Hooks ********************/


        /********************* BEGIN UI Application *********************/
        if ( typeof fxcm.ui !== 'undefined' ) {

            // set up options for generic expandable set
            var genericExpOpts = {
                hasCloseButton : true,
                closeButtonText : '<i class="ico ico-complex ico-close-sm"></i>',
                publishOnOpenEvent : 'onOpenGeneric',
	            controlLinkExpandText : typeof fxcmcom == "object" ? fxcmcom.strings.expand_all : "Expand All",
	            controlLinkCollapseText : typeof fxcmcom == "object" ? fxcmcom.strings.collapse_all : "Collapse All"
            };

            // Invoke generic expandableSet functionality
            $( '.expandableSet' ).each( function () {
                genericExpOpts.context = $( this );
                genericExpOpts.controlLink = $( this ).find( 'a.controlThisSection' );
                new fxcm.ui.ExpandableSet( $( this ).find( 'dt' ), genericExpOpts );
            } );

            // Attach expandable set to expandable forms
            $( '.cta-expand-toggle' ).each( function () {
                new fxcm.ui.ExpandableSet( $( this ).find( 'a.btn-toggle' ), {
                    target : $( this )
                } );
            } );

            // Attach generic placeholderLabel functionality
            if( Modernizr && Modernizr.csspointerevents ) {
	            $( 'form.placeholderLabel' ).each( function () {
		            new fxcm.ui.PlaceholderLabel( this );
	            } );
            }

            // Attach generic Smooth Scroll functionality
            $( 'a.smoothScroll' ).each( function () {
            	var thisSmoothScroll = new fxcm.ui.SmoothScroll( {
	                trigger : $( this ),
	                onBeforeScroll : function( $wrapper ) {
	                	if( typeof fxcmGlobalHeader === 'object' && typeof fxcmGlobalHeader.getHeaderElement === 'function' ) {
	                		var headerEl = fxcmGlobalHeader.getHeaderElement();
	                		var headerHeight = headerEl ? Math.ceil( $( headerEl ).outerHeight() ) : 0;
			                thisSmoothScroll.setOffset( 0 - headerHeight );
		                }
	                }
                } );
            } );

            /*********************** Smart Tabs Application ***********************/
            $( '.smart-toggle-tabs' ).each( function () {
                // create array that represents group of expandable set instances
                var tabGroup = [],
                    triggers = $( this ).find( '.toggle' ),
                    triggerActiveClass = 'open';

                // loop through tabs
                triggers.each( function ( i ) {

                    // for each tab, push a new instance into the array
                    tabGroup.push(
                        // set up instance with onOpen callback that closes all instances in the array that are not this one
                        new fxcm.ui.ExpandableSet( $( this ), {
                            target : $( $( this ).attr( 'href' ) ),
                            onOpen : function ( $trigger ) {
                                // add current class to parent <li>
                                $trigger.parent().addClass( triggerActiveClass );

                                // toggle off all other instances
                                $.each( tabGroup, function ( j, instance ) {
                                    if ( i !== j ) {
                                        instance.toggle( { state : false } );
                                    }
                                } );
                            },
                            onClose : function ( $trigger ) {
                                // remove class from parent <li>
                                $trigger.parent().removeClass( triggerActiveClass );
                            }
                        } )
                    );
                } );
                // open first by default
                function defaultSmartTab( int, object ) {
                    // default var values
                    object = ( object ? object : tabGroup );
                    int = ( int != null ? int : 0 );

                    // kill function if either of the above is null for whatever reason
                    if ( object === null || tabGroup === null || int === null ) return false;

                    // set toggle
                    object[ int ].toggle( { state : true } );
                }

                // check if there is a hash associated with a toggle
	            var defaultIndex = 0;
                triggers.each( function( i, el ) {
                	if( $( el ).is( '[href="' + document.location.hash + '"]' ) ) {
                		defaultIndex = i;
                		return false;
	                }
                } );

				// set default tab
                defaultSmartTab( defaultIndex );

            } );// END .smart-toggle-tabs conditional

            /** -------------------------------------------------
             * BEGIN Instantiate 3.1 responsive nav & search expandables
             * --------------------------------------------------*/

            // trigger vars
            var $nav1Trigger = $( '[href="#mobilenav"]' );
            var $nav1Target = $( '.nav1' );
            var $nav2Trigger = $( '.nav1 > li > a' ).not( '.mobile-nav-item > a, [href="#search"]' );
            var $searchTrigger = $( '[href="#search"]' );
            var $searchTarget = $( '#fxcm-search' );
	        var $searchInput = $( '#fxcm-search input.search-field' );
            var $body = $( 'body' );
	        var $sticky = $( '#sticky' );
	        var bpMobileOrTablet = fxcm.device && fxcm.device.getBreakpoint() !== 'desktop' ? true : false;

            // add overlay style element
            var $contentCover = $( document.createElement( 'div' ) );
            $contentCover.addClass( 'content-cover' ).appendTo( $body );

            // cache nav and sticky states
            var navIsOpen = false;
            var searchIsOpen = false;
            var stickyIsStuck = false;

	        // invoke omnisearch if trigger exists (otherwise set toggle to an empty function)
	        var omniSearch = $searchTrigger.length ? new fxcm.ui.ExpandableSet( $searchTrigger, {
		        target : $searchTarget,
		        publishOnOpenEvent : 'onOpenOmniSearch',
		        publishOnCloseEvent : 'onCloseOmniSearch'
	        } ) : {
		        toggle : function (){},
		        enable: function(){},
		        disable : function(){}
	        };

	        // function to update position and styling of sticky nav
	        var updateSticky = function ( triggerEvent ) {

	        	if(!$sticky.length){
	        		return false;
		        }

		        // set triggerEvent to string, easier to test
		        triggerEvent = triggerEvent || '';

		        // additional vars
		        var stickyTop = $sticky[0].getBoundingClientRect().top,
			        contentTop = document.getElementById( 'mc' ).getBoundingClientRect().top;

	        	function _stickToTop( noAnimate ) {
	        		if( noAnimate ) {
				        $sticky.css( 'top', 0 );
				        $body.addClass( 'stickyStuck' );
				        stickyIsStuck = true;
			        }
			        else {
				        $sticky.css( 'top', Math.floor( contentTop ) + 'px' );
				        $sticky.animate( { top : 0 }, {
					        duration : 250, start : function () {
						        $body.addClass( 'stickyStuck' );
						        stickyIsStuck = true;
					        }
				        } );
			        }
		        }

	        	function _unstickFromTop( noAnimate ) {
			        if( noAnimate ) {
				        stickyIsStuck = false;
				        $body.removeClass( 'stickyStuck' );
				        $sticky.css( 'top', '' );
			        }
			        else {
				        $sticky.animate( { top : Math.floor( contentTop ) + 'px' }, {
					        duration : 250, done : function () {
						        stickyIsStuck = false;
						        $body.removeClass( 'stickyStuck' );
						        $sticky.css( 'top', '' );
					        }
				        } );
			        }
		        }

		        switch ( triggerEvent ) {
			        case 'open' :
				        // if event is nav open, set a top value on the sticky div and then set sticky to stuck
				        if ( !stickyIsStuck ) {
					        _stickToTop();
				        }
				        break;

			        case 'close' :
				        // if event is nav close and content is below the window top, set the sticky top to the content top then unstick it
				        if ( contentTop >= 0 && stickyIsStuck ) {
					        _unstickFromTop();
				        }
				        break;

			        default :
				        // if no event is passed, simply make sticky stuck when scrolling past the top of the header
				        // unstick when scrolling back up past the top of the content
				        if ( stickyTop < 0 && !stickyIsStuck ) {
					        _stickToTop( true );
				        }
				        else if ( !navIsOpen && !searchIsOpen && contentTop >= 0 && stickyIsStuck ) {
					        _unstickFromTop( true );
				        }
				        break;
		        }

	        };

	        var unsetSticky = function() {
		        $body.removeClass( 'stickyStuck navOpen searchOpen' );
		        $sticky.css( 'top', '' );
		        stickyIsStuck = false;
		        navIsOpen = false;
		        searchIsOpen = false;
	        };

	        // handle window events
	        $( window ).on( 'resize scroll orientationchange load', function () {
		        if ( bpMobileOrTablet ) {
			        updateSticky();
		        }
	        } );

            // invoke nav 1
            var nav1 = $nav1Trigger.length && $nav1Target.length ? new fxcm.ui.ExpandableSet( $nav1Trigger, {
	            target : $nav1Target,
	            publishOnOpenEvent : 'onOpenNav1',
	            publishOnCloseEvent : 'onCloseNav1'
            } ) : {
		        toggle : function (){},
		        enable: function(){},
		        disable : function(){}
	        };

            // close the ExpandableSet instance of the "nav1" whenever a link starting with "#" is clicked
	        $nav2Trigger.on( 'click', function() {
		        if( /^#/.test( $(this).attr('href') ) ) {
			        nav1.toggle( { state : false } );
		        }
	        });

            // remove any nav2 triggers that don't have a nav2 list
	        $nav2Trigger.each( function(i , el ) {
	        	if( ! $( el ).parent( 'li' ).find( 'ul.nav2' ).length ) {
	        		$nav2Trigger = $nav2Trigger.not( el );
		        }
	        });

            // invoke nav 2
            var nav2 = $nav2Trigger.length ? new fxcm.ui.ExpandableSet( $nav2Trigger, {
	            accordian : true
            } ) : {
	            toggle : function (){},
	            enable: function(){},
	            disable : function(){}
            };

            $( 'ul.nav2 > li ' ).filter( '.current-menu-item, .current-menu-ancestor, .current-page-ancestor:not(.nav2-overview)' ).each( function( i, el ){
	            nav2.toggle( $( el ).parent( 'ul' ).prev( 'a' ), { state: true } );
            } );

            /** ---------------------------------------------
             * Close nav, search and cover
             * ----------------------------------------------*/

            // close everything when clicking any element that is outside triggers or targets set above
            $body.on( 'click', function ( e ) {

	            var $clickedEl = $( e.target );
	            var $allNavEls = $nav1Trigger.add( $nav1Target );
	            var $allSearchEls = $searchTrigger.add( $searchTarget );

	            // if the target wasn't a nav 1 trigger or target then close the nav
	            if( navIsOpen && !$allNavEls.find( $clickedEl ).length && !$allSearchEls.find( $clickedEl ).length ) {
		            nav1.toggle( { state : false } );
	            }
	            // if the target wasn't a search trigger or target then close the close
	            else if( searchIsOpen && !bpMobileOrTablet && !$allSearchEls.find( $clickedEl ).length ) {
		            omniSearch.toggle( { state : false } );
	            }
            } );

            // close search when escape key is pressed
            $body.on( 'keyup', function ( e ) {
	            if( e.which === 27 && searchIsOpen ) {
		            omniSearch.toggle( { state : false } );
	            }
            } );

            /** ---------------------------------------------
             * Manage dependencies between nav and omnisearch
             * ----------------------------------------------*/

            // close search when expanding nav
            amplify.subscribe( 'fxcm.expandable.onOpenNav1', function () {
	            navIsOpen = true;
	            $body.addClass( 'navOpen' );
	            updateSticky( 'open' );
            } );

            // update sticky when nav is closed
            amplify.subscribe( 'fxcm.expandable.onCloseNav1', function () {
	            navIsOpen = false;
	            $body.removeClass( 'navOpen' );
	            if( !searchIsOpen ) {
		            updateSticky( 'close' );
	            }
            } );

            // close nav when expanding search, update state and give search box focus
            amplify.subscribe( 'fxcm.expandable.onOpenOmniSearch', function () {
	            searchIsOpen = true;
	            $body.addClass( 'searchOpen' );
	            $searchInput.trigger( 'focus' );
            } );

            // when search is closed, update state
            amplify.subscribe( 'fxcm.expandable.onCloseOmniSearch', function () {
	            searchIsOpen = false;
	            $body.removeClass( 'searchOpen' );
            } );

            // allow force close
            amplify.subscribe( 'fxcm.expandable.forceNavClose', function() {
	            // close nav1 and search
	            nav1.toggle( { state : false } );
	            omniSearch.toggle( { state : false } );
	            navIsOpen = false;
	            searchIsOpen = false;
	            $body.removeClass( 'navOpen' );
	            $body.removeClass( 'searchOpen' );
	            updateSticky( 'close' );
            } );

            /** ---------------------------------------------
             * Set nav behavior based on breakpoint
             * ----------------------------------------------*/
            // Set page load behavior - disable expandable on page load if in desktop breakpoint
            if ( !bpMobileOrTablet ) {
	            unsetSticky();
                nav1.disable();
                nav2.disable();
            }
            else {
	            updateSticky();
            }

            // post page-load, disable nav1 and nav2 on entering desktop
            amplify.subscribe( 'fxcm.device.onEnterDesktop', function () {
	            bpMobileOrTablet = false;
	            // close search and nav1
	            nav1.toggle( { state : false } );
	            omniSearch.toggle( { state : false } );
	            nav1.disable();
	            nav2.disable();
            } );

            // post page-load, reenable nav1 and nav2 expandable on leaving desktop
            amplify.subscribe( 'fxcm.device.onExitDesktop', function () {
	            omniSearch.toggle( { state : false } );
                nav1.enable();
                nav2.enable();
	            bpMobileOrTablet = true;
            } );

	        $searchInput.next( 'button' ).on( 'click', function ( e ) {
		        if( !$searchInput.val() || !$searchInput.val().length ) {
		        	e.preventDefault();
			        omniSearch.toggle( { state : false } );
		        }
	        } );


            /** -------------------------------------------------
             * END Instantiate 3.1 responsive nav & search expandables
             * --------------------------------------------------*/

            // Nav 3 expandable
            $( '.nav3 > ul' ).each( function () {
                var $this = $( this );

                var _settings = {
                    // DOM elements
                    $selector : $this.find( '.nav3-selector' ),
                    $links : $this.children( '.nav3-link' ),
	                $subTriggers : $()
                };

                var _isDisabled = false;

                // set a trigger to either the selector or the passed element if its subnav
                _settings.$trigger = _settings.$selector;

                // see if nav3 has any subnav
                if( $this.find( '.nav3-subnav' ).length ) {
	                _settings.$links.each( function( i, el ) {
	                	if( $( el ).children( '.nav3-subnav' ).length ) {
			                _settings.$subTriggers = _settings.$subTriggers.add( $( el ).children( 'a' ) );
		                }
	                } );
                }

	            var thisSubNav3 = _settings.$subTriggers.length ? new fxcm.ui.ExpandableSet( _settings.$subTriggers, {
		            context : $this,
		            accordian: true
	            } ) : false;

	            // Instantiate the nav3 expandable set
	            var currNav3 = new fxcm.ui.ExpandableSet( _settings.$trigger, {
		            context : $this,
		            target : _settings.$links,
		            onOpen: function() {
		            	var currSubNav = $this.find( '.nav3-subnav > .current-menu-item' ).parent();
			            if( thisSubNav3 && currSubNav.length ) {
				            thisSubNav3.toggle( currSubNav.prev( 'a' ), { state: true } );
			            }
		            },
		            onClose: function() {
			            if( thisSubNav3 ) {
				            thisSubNav3.toggle( { state: false });
			            }
		            }
	            } );

                // post page-load, disable nav1 and nav2 on entering desktop
                amplify.subscribe( 'fxcm.device.onEnterDesktop', function () {
                    if ( !_isDisabled ) {
                        currNav3.disable();
                        _isDisabled = true;
	                    if( thisSubNav3 ) {
		                    thisSubNav3.toggle( false );
		                    thisSubNav3.disable();
	                    }
                    }
                } );

                // post page-load, reenable nav1 and nav2 expandable on leaving desktop
                amplify.subscribe( 'fxcm.device.onExitDesktop', function () {
                    if ( _isDisabled ) {
                        currNav3.enable();
                        _isDisabled = false;
	                    if( thisSubNav3 ) {
		                    thisSubNav3.enable();
	                    }
                    }
                } );

            } );

            // Nav 4 More Resources Expandable for mobile / tablet
            $( '.nav4-resources' ).each( function( i, el ){
	            new fxcm.ui.ExpandableSet( $( el ).find( '.nav4-selector > a' ), {
		            target : $( el )
	            } );
            });


        }
        /********************* END UI Application *********************/


        /********************* BEGIN Lightcase (overlay) Application *********************/
        if ( typeof $().lightcase !== 'undefined' ) {

            $( "a.lightbox[data-lightbox-type='limelight']" ).each( function () {

                var $lightbox = $( this ),
                    mediaId = $lightbox.data( 'media-id' ),
                    classes = $lightbox.prop( 'class' ),
                    divId = 'limelight-video-' + fxcm.lib.generateNumericID( 7 ), // Limelight needs a unique id per video. Generate random ID.
                    innerHTML = $lightbox.html(),
                    //link = "<a href='#" + divId + "' class='" + classes + "' data-rel='lightcase' data-media-id='" + mediaId + "'>" + innerHTML + "</a>",
                    span = "";

                $lightbox.prop( 'href', '#' + divId );

                // If it's a thumbnail, then always autoplay on click.
                if ( $lightbox.hasClass( 'thumbnail' ) || $lightbox.data( 'autoplay' ) == true ) {
                    span = "<span class='limelight no-render' data-media-id='" + mediaId + "' data-autoplay='true'></span>";
                } else {
                    span = "<span class='limelight no-render' data-media-id='" + mediaId + "'></span>";
                }
                var hiddenDiv = "<div id='" + divId + "' style='display: none;'>";
                hiddenDiv += span;
                hiddenDiv += "</div>";

                //$lightbox.replaceWith( link );
                $( 'body' ).append( hiddenDiv );

                // Run it through the limelight thumbnail renderer
                if ( $lightbox.hasClass( 'thumbnail' ) ) {
                    //fxcm.limelight.renderLimelightThumbnail( $( 'a[href="#' + divId + '"]' ) );
                }

            } );

        }
        /********************* END Nivo Lightbox Application *********************/


        /********************* BEGIN Limelight Video Application *********************/
        if ( typeof fxcm.limelight !== 'undefined' ) {

            // On plage load, go through each limelight element and either render as thumbnail or show full render.
            $( ".limelight" ).not( ".no-render" ).each( function () {
                if ( $( this ).hasClass( 'thumbnail' ) || $( this ).children().length > 0 ) {
                    //fxcm.limelight.renderLimelightThumbnail( $( this ) );
                } else {
                    fxcm.limelight.renderLimelightVideo( $( this ) );
                }
            } );

            // Add the thumbnail from limelight as the splash image
            $( ".limelight.thumbnail" ).click( function () {

                var $videoElement = $( this );
                var href = $videoElement.prop( 'href' ).slice( -1 ) == "#" ? "#" : $videoElement.prop( 'href' );

                // If the href is a url rather than a non-linking url, then simply go to that page.
                if ( $.inArray( href, [ "#", "javascript:void(0);", window.location.href ] ) < 0 ) {
                    return true;
                }

                //var limelightWrapper = $( "<div class='limelight-wrapper'></div>" ).height( elementHeight + 48  );
                var limelightWrapper = $( "<div class='limelight-wrapper'></div>" );
                $videoElement.wrap( limelightWrapper );

                // Render limelight video
                var videoId = fxcm.limelight.renderLimelightVideo( $videoElement );

                // remove wrapping div based on the .LimelightEmbeddedPlayer span that wraps the object
                $( ".LimelightEmbeddedPlayer." + videoId ).unwrap();

                return false;
            } );

            // When there is a breakpoint change, set thumbnail size
           /* amplify.subscribe( 'fxcm.device.onBreakpointChange', function () {
                $( ".thumbnail[data-media-id]" ).each( function () {
                    fxcm.limelight.setThumbnailSize( $( this ) );
                } );
            } );*/

        }
        /********************* END Limelight Video Application *********************/


        /********************* BEGIN Device Specific Anchor URLs *****************/

        if ( typeof fxcm.device !== 'undefined' ) {

            if ( fxcm.device.isTouch() ) {

                $( 'a.device-redirect' ).each( function () {
                    fxcm.device.registerDeviceRedirect( $( this ) );
                } );

            }

        }

        /********************* END Device Specific Anchor URLs ********************/


        /********************* BEGIN Device Specific Download Mobile App Link *****************/

        if ( typeof fxcm.device !== 'undefined' ) {

            if ( fxcm.device.isTouch() ) {

                var $appBanner = $( '#download-mobile-app-banner' );
                $appBanner.find( '.exit' ).on( 'click', function ( e ) {
                	$appBanner.remove();

                    // Set to 30 days
                    var expireDate = new Date();
                    expireDate.setDate( expireDate.getDate() + 30 );

                    // Set the cookie
                    fxcm.lib.writeCookie( 'fxcm_tsmobile_app_decline', 'true', { expires : expireDate, path : "/" } ); // write cookie after message is shown, set for full domain
                } );

                // If cookie does not exists, then show the banner
                if ( fxcm.lib.readCookie( 'fxcm_tsmobile_app_decline' ) !== "true" ) {
                    $appBanner.removeClass( 'hidden' );
                }

            }

        }

        /********************* END Device Specific Download Mobile App Link ********************/

        /********************* BEGIN element-specific teleport logic *****************/
        // method options are ( "before", "after", "prepend", "append" )

        if ( typeof fxcm.ui.Teleport !== 'undefined' ) {

            /**
             * Aside Nav 3
             * On tablet and mobile, move navigation under the article h1
             */
            new fxcm.ui.Teleport( $( 'aside.S nav.nav3' ), {
                instructions : [
                    {
                        breakpoints : [ "tablet", "mobile" ],
                        method : "before",
                        destination : "article.C"
                    }
                ]
            } );

            if ( $( '#teleport-overview-banner' )[ 0 ] ) {

                new fxcm.ui.Teleport( $( '.overview-hero' ), {
                    instructions : [
                        {
                            breakpoints : [ "tablet", "mobile" ],
                            method : "append", // other options: "prepend", "after", and "before"
                            destination : "#teleport-overview-banner"
                        }
                    ]
                } );
            }

        }

        /********************* END element-specific teleport logic ********************/


        /********************* Additional Applications *********************/

        // Set autocomplete="off" for all submit buttons to prevent FF issue where submit stays disabled through refresh
        $( 'input[type=submit], input[type=image]' ).attr( 'autocomplete', 'off' );

        // align background heights
        matchHeights();

        /* ------- TABLE DATA CARDS ------- */
        inlineTableCardTitles( $( 'table[data-mobile-inline-titles]' ) );
    } );

}
/* ////////////////////////////////////////////////////////////////////////
 -----------/ END jQuery dependency + document ready function / -----------
 //////////////////////////////////////////////////////////////////////// */

/* ------- Enquire application ------- */
if ( typeof fxcm.device !== 'undefined' ) {

    // make sure enquire is available
    enquire = enquire || {};
    enquire.register = enquire.register || function () {};

    var mobileBreakpoint = fxcm.device.getBreakpointSetting( 'mobile' );
    var tabletBreakpoint = fxcm.device.getBreakpointSetting( 'tablet' );
    var desktopBreakpoint = fxcm.device.getBreakpointSetting( 'desktop' );

    /* Mobile Breakpoint */
    enquire.register( mobileBreakpoint, {
        match : function () {
            fxcm.device.setBreakpoint( 'mobile', true );
        },
        unmatch : function () {
            fxcm.device.setBreakpoint( 'mobile', false );
        },
        deferSetup : true
    } );

    /* Tablet Breakpoint */
    enquire.register( tabletBreakpoint, {
        match : function () {
            fxcm.device.setBreakpoint( 'tablet', true );
        },
        unmatch : function () {
            fxcm.device.setBreakpoint( 'tablet', false );
        },
        deferSetup : true
    } );

    /* Desktop Breakpoint */
    enquire.register( desktopBreakpoint, {
        match : function () {
            fxcm.device.setBreakpoint( 'desktop', true );
        },
        unmatch : function () {
            fxcm.device.setBreakpoint( 'desktop', false );
        },
        deferSetup : true
    }, true );
}

/* --------- Align background heights that are collected in .bg-align wrappers --------- */
function matchHeights() {
	var sets = {};

	function _unsetHeights() {
		for( var set in sets ) {
			sets[set].css( 'height', '' );
		}
	}

    function _setHeights() {
	    _unsetHeights();
	    var bgMaxHeight = 0;
	    for( var set in sets ) {
		    bgMaxHeight = 0;
		    sets[set].each( function( i, el ) {
			    var thisHeight = $( el ).outerHeight();
			    if ( thisHeight > bgMaxHeight ) {
				    bgMaxHeight = thisHeight;
			    }
		    } );
		    sets[set].css( 'height', bgMaxHeight + 'px' );
	    }
    }

	$( '[data-match-height]' ).each( function ( i, el ) {
		var setName = $( el ).data( 'match-height' );
		if( !sets[ setName ] ) {
			sets[ setName ] = $( el );
		}
		else {
			sets[ setName ] = sets[ setName ].add( el );
		}
	} );

	if( fxcm.device.getBreakpoint() !== 'mobile' ) {
		$( window ).on( 'resize.matchHeight', function(){
			_setHeights();
		} ).trigger( 'resize.matchHeight' );
	}

	amplify.subscribe( 'fxcm.device.onExitMobile', function(){
		_setHeights();
		$( window ).on( 'resize.matchHeight', function(){
			_setHeights();
		} );
	} );

    amplify.subscribe( 'fxcm.device.onEnterMobile', function(){
	    $( window ).off( 'resize.matchHeight' );
	    _unsetHeights();
    } );
};

/* --------- Launch TS Web Login links within a new window --------- */
function launchChromelessWindow( url ) {
    var h = screen.availHeight - 150;
    var w = screen.availWidth - 150;
    var newwindow = window.open( url, 'chromeless', 'height=' + h + ', width=' + w + ', top=75, left=75, scrolling=yes, toolbars=no, menubar=no, resizable=yes' );
    try {
        if ( window.focus ) {
            newwindow.focus();
        }
    }
    catch ( e ) {}
}

// Windows Phone 8 media queries fix
(function () {
    if ( "-ms-user-select" in document.documentElement.style && navigator.userAgent.match( /IEMobile\/10\.0/ ) ) {
        var msViewportStyle = document.createElement( "style" );
        msViewportStyle.appendChild(
            document.createTextNode( "@-ms-viewport{width:auto!important}" )
        );
        document.getElementsByTagName( "head" )[ 0 ].appendChild( msViewportStyle );
    }
})();

//=====[ MOBILE TABLE DATA CARDS || data-titles ] =====
var inlineTableCardTitles = function ( $tables ) {
	if( !$tables.length ) { return false; }

	$tables.each( function( i, table ) {
		var titles = [];
		$( table ).find( 'thead th' ).each( function( j, heading ) {
			titles.push( $( heading ).text() );
		} );

		$( table ).find( 'tbody tr:not(.section-title) td' ).each( function( j, cell ) {
			$( cell ).attr( 'data-title', titles[ $( cell ).index() ] + ':' )
		} );
	});
};
fxcm.registration = {};

// Demo RB Map
// The "product' parameter is not required, only add it if the product is not "FX"
// Most active trader and ninjatrader RBs have been removed. If they need to be added back check version #16 of this file
fxcm.registration.demoRBMap = {
	fxcm_testing : {
		platform : 'ts',
		db : {EUR : 'MT4EURDEMO', GBP : 'MT4GBPDEMO', USD : 'U100D1' },
		execution : 'NDD'
	},
	au_dd_ts_retail : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO', USD : 'U100D1'},
		execution : 'DD'
	},
	au_dd50_ts_retail : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO', USD : 'CFDDEMO01'},
		execution: 'DD'
	},
	fxcm_canada_friedberg : {
		platform : 'ts',
		db : {USD : 'U10D2'},
		execution : 'NDD'
	},
	canada_friedberg_mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'NDD'
	},
	fxcm : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'NDD'
	},
	llc_dd_ts_retail : {
		platform : 'ts',
		db : {USD : 'U100D2'},
		execution : 'DD'
	},
	'fxcm-french' : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcm_germany : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcm_italy : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmau : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO', USD : 'U100D1'},
		execution : 'NDD'
	},
	fxcmau_bt : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO02'},
		server : {AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'NDD'
	},
	au_dd_mt4_retail : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO02'},
		server : {AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	au_dd50_mt4_retail : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO02'},
		server : {AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	fxcmau_ar_ts_ndd : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO', USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	fxcmau_ar_ts_dd : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO', USD : 'CFDDEMO01'},
		execution : 'DD'
	},
	fxcmau_ar_mt4_ndd : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO02'},
		server : {AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'NDD'
	},
	fxcmau_ar_mt4_dd : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO02'},
		server : {AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	fxcmde_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server : {EUR : 'FXCM-EURDemo01'},
		execution : 'NDD'
	},
	fxcmfr_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server : {EUR : 'FXCM-EURDemo01'},
		execution : 'NDD'
	},
	fxcmuk : {
		platform : 'ts',
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	'fxcmuk-chinese' : {
		platform : 'ts',
		db : {USD : 'U100D5'},
		execution : 'NDD'
	},
	fxcmuk_active_trader : {
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'U100D1'},
		execution : 'NDD'
	},
	fxcmuk_bt : {
		platform : 'mt4',
		db : {GBP : 'MT4GBPDEMO', EUR : 'MT4EURDEMO', USD : 'MT4USDDEMO02'},
		server : {GBP : 'FXCM-GBPDemo01', EUR : 'FXCM-EURDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'NDD'
	},
	fxcmuk_es : {
		platform : 'ts',
		db : {EUR : 'EUDEMO', GBP : 'GBDEMO', USD : 'PremiumDemo'},
		execution : 'NDD'
	},
	fxcmuk_de_dd_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server: {EUR : 'FXCM-EURDemo01'},
		execution : 'DD'
	},
	fxcmuk_de_dd_ts : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'DD'
	},
	fxcmuk_de_at_ts_retail : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	ninja_trader_de : {
		platform : 'ninja',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmuk_fr_dd_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server: {EUR : 'FXCM-EURDemo01'},
		execution : 'DD'
	},
	fxcmuk_fr_dd_ts : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'DD'
	},
	fxcmuk_fr_at_ts_retail : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmuk_hellas_dd_tsii : {
		platform : 'ts',
		db : { EUR : 'EUDEMO', USD : 'MiniDemo' },
		execution : 'DD'
	},
	fxcmuk_hellas_dd_mt4 : {
		platform : 'mt4',
		db : { EUR : 'MT4EURDEMO', USD: 'MT4USDDEMO02' },
		server: { EUR : 'FXCM-EURDemo01', USD : 'FXCM-USDDemo02' },
		execution : 'DD'
	},
	fxcmuk_hellas_ninja : {
		platform : 'ninja',
		db : {USD : 'MiniDemo', EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmuk_it_dd_ts : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'DD'
	},
	fxcmuk_it_dd_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server: {EUR : 'FXCM-EURDemo01'},
		execution : 'DD'
	},
	fxcmuk_it_at_ts_retail : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmuk_spread_betting : {
		platform : 'ts',
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'U100D2'},
		execution : 'NDD',
		product : 'FX-SB'
	},
	fxcmuksb_mt4 : {
		platform : 'mt4',
		db : {GBP : 'MT4GBPDEMO'},
		server : { GBP : 'FXCM-GBPDemo01'},
		execution : 'NDD',
		product : 'FX-SB'
	},
	godmodetradercontest : {
		db : {EUR : 'EUDEMO'}
	},
	llc_dd_mt4_retail_usd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	llc_dd_ts_retail_usd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'DD'
	},
	llc_quantconnect : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'NDD'
	},
	ltd_dd_mt4_retail : {
		platform : 'mt4',
		db : {GBP : 'MT4GBPDEMO', EUR : 'MT4EURDEMO', USD : 'MT4USDDEMO02'},
		server : {GBP : 'FXCM-GBPDemo01', EUR : 'FXCM-EURDemo01', USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	ltd_dd_mt4_retail_gbp : {
		platform : 'mt4',
		db : {GBP : 'MT4GBPDEMO'},
		execution : 'DD'
	},
	ltd_dd_ts_retail : {
		platform : 'ts',
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'U100D2'},
		execution : 'DD'
	},
	ltd_sb_dd_ts_retail : {
		platform : 'ts',
		db : { GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'U100D2' },
		execution : 'DD',
		product : 'FX-SB'
	},
	ltd_sb_dd_mt4_retail : {
		platform : 'mt4',
		db : { GBP : 'MT4GBPDEMO', USD : 'MT4USDDEMO02', EUR : 'MT4EURDEMO' },
		server : { GBP : 'FXCM-GBPDemo01', USD : 'FXCM-USDDemo02', EUR : 'FXCM-EURDemo01' },
		execution : 'DD',
		product : 'FX-SB'
	},
	ltd_dd_ts_retail_usd : {
		platform : 'ts',
		db : {USD : 'U100D2'},
		execution : 'DD'
	},
	ltd_ninja : {
		platform : 'ninja',
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'MiniDemo'},
		execution : 'NDD'
	},
	ninja_trader_uk : {
		platform : 'ninja',
		db : {GBP : 'GBDEMO', EUR : 'EUDEMO', USD : 'MiniDemo'},
		execution : 'NDD'
	},
	fxcm_markets_usd_ts_dd : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'DD'
	},
	fxcm_markets_usd_ts_ndd : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	fxcm_markets_usd_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		server : {USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	fxcm_markets_usd_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'NDD'
	},
	fxcm_markets_ts_at_ndd : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	fxcm_markets_ninja : {
		platform : 'ninja',
		db : {USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	fxcmm_ar_ts_dd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'DD'
	},
	fxcmm_ar_ts_ndd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'NDD'
	},
	fxcmarabic_cfd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'NDD'
	},
	fxcmuk_ar_ts_dd : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'DD'
	},
	fxcmuk_ar_ts_ndd : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'NDD'
	},
	fxcmm_ar_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'DD'
	},
	fxcmm_ar_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'NDD'
	},
	fxcmuk_ar_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		server : {USD : 'FXCM-USDDemo02'},
		execution : 'NDD'
	},
	fxcmuk_ar_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'DD'
	},
	fxcmar_mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		server : {USD : 'FXCM-USDDemo01'},
		execution : 'NDD'
	},
	mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		server : {USD : 'FXCM-USDDemo02'},
		execution : 'NDD'
	},
	llc_dd_mt4_retail : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		server : {USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	ninja_trader_llc : {
		platform : 'ninja',
		db : {USD : 'MiniDemo'},
		execution : 'NDD'
	},
	strategy_trader_llc : {
		db : {USD: 'U100D1'}
	},
	tsg_llc : {
		db : {USD: 'XTPDEMO01'}
	},
	ninja_trader_au : {
		db : {AUD: 'AUDMINIDEMO', USD: 'U100D1'},
		execution : 'NDD'
	},
	ninja_trader_au_ar : {
		db : {USD: 'U100D1'},
		execution : 'NDD'
	},
	ninja_trader_fr : {
		platform : 'ninja',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmid_markets_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	fxcmid_markets_usd_mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'}
	},
	fxcmid_markets_ts_dd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'DD'
	},
	fxcmid_markets_ts_ndd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'NDD'
	},
	fxcmph_markets_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	fxcmph_markets_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'NDD'
	},
	fxcmph_markets_ts_dd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'DD'
	},
	fxcmph_markets_ts_ndd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'NDD'
	},
	fxcmmy_markets_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'NDD'
	},
	fxcmmy_markets_ts_dd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'DD'
	},
	fxcmmy_markets_ts_ndd : {
		platform : 'ts',
		db : {USD : 'U100D1'},
		execution : 'NDD'
	},
	ftlbullion_demo : {
		db : {USD : 'MT4USDDEMO'}
	},
	fxcmau_tc_mt4 : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO'},
		execution : 'NDD'
	},
	fxcmau_sc_mt4 : {
		platform : 'mt4',
		db : {AUD : 'MT4AUDDEMO'},
		execution : 'NDD'
	},
	fxcmau_chinese : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO'},
		execution : 'NDD'
	},
	fxcmmy_markets_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	fxcmth_markets_ts_dd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'DD'
	},
	fxcmth_markets_ts_ndd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'NDD'
	},
	fxcmth_markets_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	fxcmth_markets_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'NDD'
	},
	fxcmvn_markets_ts_dd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'DD'
	},
	fxcmvn_markets_ts_ndd : {
		platform : 'ts',
		db : {USD : 'MiniDemo'},
		execution : 'NDD'
	},
	fxcmvn_markets_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'DD'
	},
	fxcmvn_markets_mt4_ndd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'},
		execution : 'NDD'
	},
	fxcmbullion_en_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		execution : 'DD'
	},
	fxcmbullion_tc_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		execution : 'DD'
	},
	fxcmbullion_sc_mt4_dd : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO02'},
		execution : 'DD'
	},
	fxcm_italian : {
		platform : 'ts',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcmit_mt4 : {
		platform : 'mt4',
		db : {EUR : 'MT4EURDEMO'},
		server: {EUR : 'FXCM-EURDemo01'},
		execution : 'NDD'
	},
	fxcm_italian_ninja : {
		platform : 'ninja',
		db : {EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	/* the following may not be in use but are associated with affiliates
	 will verify before removing */
	dailyfx_au : {
		platform : 'ts',
		db : {AUD : 'AUDMINIDEMO'}
	},
	dailyfx_uk : {
		platform : 'ts',
		db : {USD : 'U100D1'}
	},
	dailyfx_us : {
		platform : 'ts',
		db : {USD : 'PremiumDemo'}
	},
	etradefx : {
		db : {USD : 'MINIDEMO7'}
	},
	fmcm_sp : {
		db : {EUR : 'EUDEMO'}
	},
	fx_greece : {
		platform : 'ts',
		db : {USD : 'MiniDemo', EUR : 'EUDEMO'},
		execution : 'NDD'
	},
	fxcm_university_contest : {
		platform : 'ts',
		db : {USD : 'PremiumDemo'}
	},
	fxcmasia : {
		db : {USD : 'HKDEMO2', HKD : 'HONGKONGDEMO'}
	},
	fxcmasiaen : {
		db : {USD : 'HKDEMO2', HKD : 'HONGKONGDEMO'}
	},
	fxcmbullion_tc_ts2_dd : {
		db : {USD: 'HKDEMO2', HKD : 'HONGKONGDEMO'}
	},
	fxcmbullion_en_ts2_dd : {
		db : {USD : 'HKDEMO2', HKD : 'HONGKONGDEMO'}
	},
	fxcmbullion_sc_ts2_dd :{
		db : {USD : 'HKDEMO2', HKD : 'HONGKONGDEMO'}
	},
	fxcmgr_mt4 : {
		platform : 'mt4',
		db : {GBP : 'MT4GBPDEMO', USD : 'MT4USDDEMO02', EUR : 'MT4EURDEMO' },
		execution : 'NDD'
	},
	fxcmsc_mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'}
	},
	fxcmtc_mt4 : {
		platform : 'mt4',
		db : {USD : 'MT4USDDEMO'}
	},
	fxcm_south_africa_dd_ts2 : {
		platform : 'ts',
		db : {USD : 'CFDDEMO01'},
		execution : 'DD'
	},
	fxcm_south_africa_dd_mt4 : {
		platform : 'mt4',
		db : {USD: 'MT4USDDEMO02'},
		server : { USD : 'FXCM-USDDemo02'},
		execution : 'DD'
	},
	fxcm_south_africa_ninja : {
		platform : 'ninja',
		db : {USD : 'MiniDemo'},
		execution : 'DD'
	},
	fxcmuk_es_dd_ts : {
		platform : 'ts',
		db : { EUR : 'EUDEMO', USD : 'PremiumDemo' },
		execution : 'DD'
	},
	fxcmuk_es_dd_mt4 : {
		platform : 'mt4',
		db : { EUR : 'MT4EURDEMO', USD : 'MT4USDDEMO' },
		server : { EUR : 'FXCM-EURDemo01', USD : 'FXCM-USDDemo01' },
		execution : 'DD'
	},
	fxcmau_es_dd_ts : {
		platform : 'ts',
		db : { AUD : 'AUDMINIDEMO', USD : 'PremiumDemo' },
		execution : 'DD'
	},
	fxcmau_es_dd_mt4 : {
		platform : 'mt4',
		db : { AUD : 'MT4AUDDEMO', USD : 'MT4USDDEMO' },
		server : { AUD : 'FXCM-AUDDemo01', USD : 'FXCM-USDDemo01' },
		execution : 'DD'
	},
	fxcmau_es_dd_ninja : {
		platform : 'ninja',
		db : { AUD : 'AUDMINIDEMO', USD : 'PremiumDemo' },
		execution : 'DD'
	},
	eu_en_ts : {
		platform: 'ts',
		db: { EUR : 'EUDEMO' },
		execution : 'DD'
	},
	eu_en_mt4 : {
		platform : 'mt4',
		db : { EUR : 'MT4EURDEMO' },
		server : { EUR : 'FXCM-EURDemo01' },
		execution : 'DD'
	},
	eu_en_ninja : {
		platform: 'ninja',
		db: { EUR: 'EUDEMO' },
		execution: 'DD'
	},
	eu_en_zulu : {
		platform : 'zulu',
		db: { EUR : 'EUDEMO' },
		execution : 'DD'
	},
	fxcmm_br_ts : {
		platform : 'ts',
		db : { USD : 'MiniDemo' },
		execution : 'DD'
	},
	fxcmm_br_mt4 : {
		platform : 'mt4',
		db : { USD : 'MT4USDDEMO02' },
		server : { USD : 'FXCM-USDDemo02' },
		execution : 'DD'
	},
	fxcmm_es_ts_dd : {
		platform : 'ts',
		db : { USD : 'MiniDemo' },
		execution : 'DD'
	},
	fxcmm_es_mt4_dd : {
		platform : 'mt4',
		db : { USD : 'MT4USDDEMO02' },
		server : { USD : 'FXCM-USDDemo02' },
		execution : 'DD'
	},
	fxcmm_es_ninja : {
		platform : 'ninja',
		db : { USD : 'CFDDEMO01' },
		execution : 'NDD'
	},
	eu_fr_mt4 : {
		platform : 'mt4',
		db : { EUR : 'MT4EURDEMO' },
		server : { EUR : 'FXCM-EURDemo01' },
		execution : 'DD'
	},
	eu_fr_ts : {
		platform : 'ts',
		db : { EUR : 'EUDEMO' },
		execution : 'DD'
	},
	eu_de_ts : {
		platform : 'ts',
		db : { EUR : 'EUDEMO' },
		execution : 'DD'
	},
	eu_de_mt4 : {
		platform : 'mt4',
		db : { EUR : 'MT4EURDEMO' },
		server : { EUR : 'FXCM-EURDemo01' },
		execution : 'DD'
	}

};
fxcm.registration.demoRBMap['fxcm-italy'] = fxcm.registration.demoRBMap.fxcm_italy;
fxcm.registration.demoRBMap.fxcmuk_french = fxcm.registration.demoRBMap['fxcm-french'];

// default all RB products to FX if not set
for( rb in fxcm.registration.demoRBMap ){
	if( typeof fxcm.registration.demoRBMap[rb].product !== 'string' || !fxcm.registration.demoRBMap[rb].product.length ){
		fxcm.registration.demoRBMap[rb].product = "FX";
	}
}


// Rates Widget angular html markup templates
// store markup for different widget layouts
fxcm.registration.widgetTemplates = [

	{
		url : 'basicText.html',
		markup :
			'<div ng-show="liveState">' +
			'<p class="txt-15 txt-Opensans-semibold">' +
			'<span class="rw-symbol">{{labels.Pair}}</span> | ' +
			'<span class="rw-bid">{{labels.Bid}}</span> | ' +
			'<span class="rw-ask">{{labels.Ask}}</span> | ' +
			'<span class="rw-spread">{{labels.Spread}}</span>' +
			'</p>' +
			'<p ng-repeat="rate in rates | rateFilter : symbols:products:exclude">' +
			'<span class="rw-symbol">{{rate.Symbol}}</span> | ' +
			'<span ng-class="{ \'rw-rate-up\' : rate.BidChange > 0, \'rw-rate-down\' : rate.BidChange < 0 }" class="rw-bid">{{rate.Bid}}</span> | ' +
			'<span ng-class="{ \'rw-rate-up\' : rate.AskChange > 0, \'rw-rate-down\' : rate.AskChange < 0 }" class="rw-ask">{{rate.Ask}}</span> | ' +
			'<span ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-spread"><strong>{{rate.Spread}}</strong></span>' +
			'</p>' +
			'<p>{{labels.LastUpdated}}: {{timestamp}}</p>' +
			'</div>' +
			'<div ng-hide="liveState">' +
			'<p class="txt-15 txt-Opensans-semibold">' +
			'<span class="rw-symbol">{{labels.Pair}}</span> | ' +
			'<span class="rw-spread">{{labels.Spread}}</span>' +
			'</p>' +
			'<p ng-repeat="rate in rates | rateFilter : symbols:products:exclude">' +
			'<span class="rw-symbol">{{rate.Symbol}}</span> | ' +
			'<span class="rw-spread">{{rate.Spread}}</span>' +
			'</p>' +
			'</div>' +
			'<p class="margin-0"><a href="#" ng-hide="autoRefresh" ng-click="updateRates($event)">{{labels.Refresh}}</a></p>' +
			'<div class="rw-loading" ng-hide="rates.length">{{labels.Loading}}</div>'
	},
	{
		url : 'rates-spreads.html',
		markup :
			'<div id="hp-view-spreads" class="margin-top-20">' +
			// active spread changes
			'<div ng-show="liveState" class="spreads-widget-wrap">' +
			'<table class="spreadWidgetTable widget-rates-live" id="spreadWidgetTable">' +
			'<tbody>' +
			'<tr class="spreadWidgetHeadRow">' +
			'<td class="spreadWidgetCell rw-spread">{{labels.Pair}}</td>' +
			'<td class="spreadWidgetCell rw-ask">{{labels.Bid}}</td>' +
			'<td class="spreadWidgetCell rw-bid">{{labels.Ask}}</td>' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Spread}}</td>' +
			'</tr>' +
			'<tr ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<td ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-spread rw-symbol">{{rate.Symbol}}</td>' +
			'<td ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask"><span>{{rate.Bid}}</span></td>' +
			'<td ng-class="{ \'spreadWidgetCellPriceUp\' : rate.AskChange > 0, \'spreadWidgetCellPriceDown\' : rate.AskChange < 0 }" class="rw-bid"><span>{{rate.Ask}}</span></td>' +
			'<td>{{rate.Spread}}</td>' +
			'</tr>' +
			'<tr>' +
			'<td colspan="4">' +
			'<div class="spreadWidgetUpdateTimestamp" id="spreadWidgetUpdateTimestamp">{{labels.LastUpdated}}: {{timestamp}}</div>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>' +
			// weekend spreads for only pair/spread
			'<div ng-hide="liveState" class="spreads-widget-wrap">' +
			'<table class="spreadWidgetTable widget-rates-static" id="spreadWidgetTable">' +
			'<tbody>' +
			'<tr class="spreadWidgetHeadRow widget-static-header">' +
			'<th class="spreadWidgetCell rw-spread">{{labels.Pair}}</th>' +
			'<th class="spreadWidgetCell widget-spread-cell rw-pair">{{labels.Spread}}</th>' +
			'</tr>' +
			'<tr ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<td ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-spread rw-symbol alt-spread">{{rate.Symbol}}</td>' +
			'<td class="widget-spread-cell">{{rate.Spread}}</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>' +
			'<p class="margin-bottom-10"><a class="btn txt-align-center" href="#" ng-hide="autoRefresh" ng-click="updateRates($event)">{{labels.Refresh}}</a></p>' +
			'</div>'
	},
	{
		url : 'rates-spreads-clean.html',
		markup :
			'<div id="hp-view-spreads" class="rates-layout-clean margin-top-20">' +
			// active spread changes
			'<div class="spreads-widget-wrap"  ng-class="{ \'static\' : !liveState }">' +
			'<h3 class="widget-title margin-bottom-10 margin-top-0 ng-binding">{{labels.Title}}</h3>' +
			'<table class="spreadWidgetTable widget-rates-live" id="spreadWidgetTable">' +
			'<tbody>' +
			'<tr class="spreadWidgetHeadRow">' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Pair}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-ask">{{labels.Bid}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-bid">{{labels.Ask}}</td>' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Spread}}</td>' +
			'</tr>' +
			'<tr ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<td ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-pair rw-symbol">{{rate.Symbol}}</td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask"><span>{{rate.Bid}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.AskChange > 0, \'spreadWidgetCellPriceDown\' : rate.AskChange < 0 }" class="rw-bid"><span>{{rate.Ask}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.SpreadChange > 0, \'spreadWidgetCellPriceDown\' : rate.SpreadChange < 0 }" class="rw-spread"><span>{{rate.Spread}}</span></td>' +
			'<td ng-hide="liveState" >{{rate.Spread}}</td>' +
			'</tr>' +
			'<tr>' +
			'<td colspan="4">' +
			'<div ng-show="liveState" class="spreadWidgetUpdateTimestamp" id="spreadWidgetUpdateTimestamp">{{labels.LastUpdated}}: {{timestamp}}</div>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>' +

			'<ul class="spreads-widget-disclaimer margin-bottom-15">' +
			'<li ng-show="liveState" class="spreads-refresh">' +
			'<p ng-hide="autoRefresh" class="margin-bottom-0"><a class="btn txt-align-center" href="#" ng-click="updateRates($event)">{{labels.Refresh}}</a></p>' +
			'</li>' +
			'<li>' +
			'<a data-lightbox-type="inline" href="#rates-disclaimer" class="lightbox txt-12">{{labels.About}}</a>' +
			'</li>' +
			'</ul>' +

			'</div>'
	},
	{
		url : 'rates-spreads-clean-no-disclaimer.html',
		markup :
			'<div id="hp-view-spreads" class="rates-layout-clean margin-top-20">' +
			// active spread changes
			'<div class="spreads-widget-wrap"  ng-class="{ \'static\' : !liveState }">' +
			'<table class="spreadWidgetTable widget-rates-live" id="spreadWidgetTable">' +
			'<tbody>' +
			'<tr class="spreadWidgetHeadRow">' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Pair}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-ask">{{labels.Bid}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-bid">{{labels.Ask}}</td>' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Spread}}</td>' +
			'</tr>' +
			'<tr ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<td ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-pair rw-symbol">{{rate.Symbol}}</td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask"><span>{{rate.Bid}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.AskChange > 0, \'spreadWidgetCellPriceDown\' : rate.AskChange < 0 }" class="rw-bid"><span>{{rate.Ask}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.SpreadChange > 0, \'spreadWidgetCellPriceDown\' : rate.SpreadChange < 0 }" class="rw-spread"><span>{{rate.Spread}}</span></td>' +
			'<td ng-hide="liveState" >{{rate.Spread}}</td>' +
			'</tr>' +
			'<tr>' +
			'<td colspan="4">' +
			'<div ng-show="liveState" class="spreadWidgetUpdateTimestamp" id="spreadWidgetUpdateTimestamp">{{labels.LastUpdated}}: {{timestamp}}</div>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>'+
			'</div>'
	},
	{
		url : 'rates-spreads-clean-with-bg.html',
		markup :
			'<div id="hp-view-spreads" class="rates-layout-clean rates-layout-clean-with-bg margin-top-20">' +
			// active spread changes
			'<div class="spreads-widget-wrap"  ng-class="{ \'static\' : !liveState }">' +
			'<table class="spreadWidgetTable widget-rates-live" id="spreadWidgetTable">' +
			'<tbody>' +
			'<tr class="spreadWidgetHeadRow">' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Pair}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-ask">{{labels.Bid}}</td>' +
			'<td ng-show="liveState" class="spreadWidgetCell rw-bid">{{labels.Ask}}</td>' +
			'<td class="spreadWidgetCell rw-pair">{{labels.Spread}}</td>' +
			'</tr>' +
			'<tr ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<td ng-class="{ \'rw-rate-change\' : rate.SpreadChange != 0 }" class="rw-pair rw-symbol">{{rate.Symbol}}</td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask"><span>{{rate.Bid}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.AskChange > 0, \'spreadWidgetCellPriceDown\' : rate.AskChange < 0 }" class="rw-bid"><span>{{rate.Ask}}</span></td>' +
			'<td ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.SpreadChange > 0, \'spreadWidgetCellPriceDown\' : rate.SpreadChange < 0 }" class="rw-spread"><span>{{rate.Spread}}</span></td>' +
			'<td ng-hide="liveState" >{{rate.Spread}}</td>' +
			'</tr>' +
			'<tr ng-class="{hidden : !liveState}">' +
			'<td colspan="4">' +
			'<div ng-show="liveState" class="spreadWidgetUpdateTimestamp grid-60 margin-bottom-10" id="spreadWidgetUpdateTimestamp">{{labels.LastUpdated}}: {{timestamp}}</div>' +
			'<a ng-show="liveState" data-lightbox-type="inline" href="#rates-disclaimer" class="grid-40 padding-left-0 lightbox txt-12">{{labels.About}}</a>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>' +

			// live disclaimer + refresh
			'<ul class="spreads-widget-disclaimer margin-bottom-0">' +
			'<li ng-class="{hidden : !liveState, hidden : autoRefresh}" ng-show="liveState" class="spreads-refresh">' +
			'<p ng-hide="autoRefresh" class="margin-bottom-15"><a class="btn txt-align-center" href="#" ng-click="updateRates($event)">{{labels.Refresh}}</a></p>' +
			'</li>' +
			'<li ng-hide="liveState" class="spreads-refresh">' +
			'<a data-lightbox-type="inline" href="#rates-disclaimer" class="grid-100 grid-flush lightbox txt-12">{{labels.About}}</a>' +
			'</li>' +
			'</ul>' +
			'</div>'
	},
	/*
	 / Widget Modules
	 / Intended to be small chunks that can be added on to the rates widget
	 */
	{
		url : 'rates-featured.html',
		markup :
			'<div ng-show="liveState" id="hp-view-spreads-top" class="rates-layout-clean rates-layout-clean-with-bg margin-top-20">' +
			// active spread change
			'<div class="spreads-widget-wrap"  ng-class="{ \'static\' : !liveState }">' +
			'<div class="spreadWidgetFeatured widget-rates-live" id="spreadWidgetFeatured">' +
			'<div ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<p ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask grid-45 grid-flush txt-align-center"><span>{{labels.Bid}}</span><span>{{rate.Bid}}</span></p>' +
			'<p ng-class="{ \'spreadWidgetCellPriceUp\' : rate.AskChange > 0, \'spreadWidgetCellPriceDown\' : rate.AskChange < 0 }" class="rw-bid grid-45 grid-flush push-10 mobile-push-0 txt-align-center"><span>{{labels.Ask}}</span><span>{{rate.Ask}}</span></p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
	},
	{
		url: 'rates-market-scanner.html',
		markup:
			'<div class="spreadWidgetTable  widget-rates-live rates-market-scanner"  ng-class="{ \'static\' : !liveState }">' +
			'<div ng-repeat="rate in rates | rateFilter : symbols:products:exclude" class="spreadWidgetRow">' +
			'<p ng-show="liveState" ng-class="{ \'spreadWidgetCellPriceUp\' : rate.BidChange > 0, \'spreadWidgetCellPriceDown\' : rate.BidChange < 0 }" class="rw-ask margin-0 txt-align-center"><span>{{rate.Bid}}</span></p>' +
			'</div>' +
			'</div>'
	},
];

// function to get static rates from array below
fxcm.registration.getStaticRates = function( reqExec ){

	reqExec = reqExec || "ndd"; //if reqExec doesn't exist then set it to "ndd"
	var newRatesArray = [];
	var product;

	// loop through staticRates and build new array of forex products with execution that matches reqExec, plus all non-forex products
	for(var i = 0; i <  fxcm.registration.staticRates.length; i++ ) {
		product = fxcm.registration.staticRates[ i ];
		if(product.ProductType !== 1 || reqExec == product.execution ) {

			newRatesArray.push(product);
		}

	}
	return {Rates: newRatesArray};

};

// list of static rates
fxcm.registration.staticRates = [

	//NDD static forex values
	{
		Symbol : 'AUDCAD',
		Spread : 1.0,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'AUDCHF',
		Spread : 0.8,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'AUDJPY',
		Spread : 0.7,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'AUDNZD',
		Spread : 1.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'AUDUSD',
		Spread : 0.4,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'CADCHF',
		Spread : 0.8,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'CADJPY',
		Spread : 0.7,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'CHFJPY',
		Spread : 1.0,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURAUD',
		Spread : 1.4,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURCAD',
		Spread : 1.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURCHF',
		Spread : 0.8,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURGBP',
		Spread : 0.9,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURJPY',
		Spread : 0.6,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURNOK',
		Spread : 52.5,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURNZD',
		Spread : 2.0,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURSEK',
		Spread : 41.0,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURTRY',
		Spread : 29.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'EURUSD',
		Spread : 0.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPAUD',
		Spread : 2.5,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPCAD',
		Spread : 2.1,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPCHF',
		Spread : 1.6,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPJPY',
		Spread : 1.4,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPNZD',
		Spread : 3.5,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'GBPUSD',
		Spread : 0.9,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'NZDCAD',
		Spread : 1.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'NZDCHF',
		Spread : 0.9,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'NZDJPY',
		Spread : 0.8,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'NZDUSD',
		Spread : 0.6,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'TRYJPY',
		Spread : 0.9,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDCAD',
		Spread : 0.6,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDCHF',
		Spread : 0.6,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDCNH',
		Spread : 5.8,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDJPY',
		Spread : 0.3,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDMXN',
		Spread : 44.3,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDNOK',
		Spread : 44.5,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDSEK',
		Spread : 34.3,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDTRY',
		Spread : 23.9,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'USDZAR',
		Spread : 82.2,
		ProductType : 1,
		execution : 'ndd'
	},
	{
		Symbol : 'ZARJPY',
		Spread : 0.4,
		ProductType : 1,
		execution : 'ndd'
	},
	// DD static forex values
	{
		Symbol : 'AUDCAD',
		Spread : 2.9,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'AUDCHF',
		Spread : 3.4,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'AUDJPY',
		Spread : 2.3,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'AUDNZD',
		Spread : 3.8,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'AUDUSD',
		Spread : 1.9,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'CADCHF',
		Spread : 3.4,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'CADJPY',
		Spread : 2.6,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'CHFJPY',
		Spread : 2.9,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURAUD',
		Spread : 3.0,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURCAD',
		Spread : 3.1,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURCHF',
		Spread : 2.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURGBP',
		Spread : 2.6,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURJPY',
		Spread : 2.2,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURNOK',
		Spread : 68.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURNZD',
		Spread : 4.6,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURSEK',
		Spread : 57.0,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURTRY',
		Spread : 32.8,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'EURUSD',
		Spread : 1.3,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPAUD',
		Spread : 5.1,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPCAD',
		Spread : 4.7,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPCHF',
		Spread : 3.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPJPY',
		Spread : 3.1,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPNZD',
		Spread : 7.1,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'GBPUSD',
		Spread : 2.0,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'NZDCAD',
		Spread : 4.8,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'NZDCHF',
		Spread : 4.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'NZDJPY',
		Spread : 2.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'NZDUSD',
		Spread : 2.1,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'TRYJPY',
		Spread : 4.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDCAD',
		Spread : 2.3,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDCHF',
		Spread : 1.7,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDCNH',
		Spread : 9.4,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDJPY',
		Spread : 1.4,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDMXN',
		Spread : 60.3,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDNOK',
		Spread : 60.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDSEK',
		Spread : 50.3,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDTRY',
		Spread : 27.5,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'USDZAR',
		Spread : 98.2,
		ProductType : 1,
		execution : 'dd'
	},
	{
		Symbol : 'ZARJPY',
		Spread : 4.0,
		ProductType : 1,
		execution : 'dd'
	},
	// ProductType 2, stock indices
	{
		Symbol : 'AUS200',
		Spread : 1.68,
		ProductType : 2
	},
	{
		Symbol : 'CHN50',
		Spread : 9.35,
		ProductType : 2
	},
	{
		Symbol : 'ESP35',
		Spread : 7.43,
		ProductType : 2
	},
	{
		Symbol : 'EUSTX50',
		Spread : 1.40,
		ProductType : 2
	},
	{
		Symbol : 'FRA40',
		Spread : 1.25,
		ProductType : 2
	},
	{
		Symbol : 'GER30',
		Spread : 1.28,
		ProductType : 2
	},
	{
		Symbol : 'HKG33',
		Spread : 9.81,
		ProductType : 2
	},
	{
		Symbol : 'JPN225',
		Spread : 11.41,
		ProductType : 2
	},
	{
		Symbol : 'NAS100',
		Spread : 1.05,
		ProductType : 2
	},
	{
		Symbol : 'SPX500',
		Spread : 0.47,
		ProductType : 2
	},
	{
		Symbol : 'UK100',
		Spread : 1.10,
		ProductType : 2
	},
	{
		Symbol : 'US2000',
		Spread : 0.40,
		ProductType : 2
	},
	{
		Symbol : 'US30',
		Spread : 1.83,
		ProductType : 2
	},
	// ProductType 3, Oil & Gas & Agriculture
	{
		Symbol : 'NGAS',
		Spread : 0.01,
		ProductType : 3
	},
	{
		Symbol : 'UKOil',
		Spread : 0.05,
		ProductType : 3
	},
	{
		Symbol : 'USOil',
		Spread : 0.05,
		ProductType : 3
	},
	{
		Symbol : 'CORNF',
		Spread : 0.75,
		ProductType : 3
	},
	{
		Symbol : 'SOYF',
		Spread : 0.75,
		ProductType : 3
	},
	{
		Symbol : 'WHEATF',
		Spread : 0.75,
		ProductType : 3
	},

	// ProductType 4, Treasury
	{
		Symbol : 'Bund',
		Spread : 0.03,
		ProductType : 4
	},
	// ProductType 5, Metals
	{
		Symbol : 'Copper',
		Spread : 0.003,
		ProductType : 5
	}, {
		Symbol : 'XAGUSD',
		Spread : 0.04,
		ProductType : 5
	}, {
		Symbol : 'XAUUSD',
		Spread : 0.35,
		ProductType : 5
	},

	// ProductType 7, Forex Baskets
	{
		Symbol : 'USDOLLAR',
		Spread : 1.83,
		ProductType : 7
	}, 	{
		Symbol : 'EMBasket',
		Spread : 3.26,
		ProductType : 7
	}, 	{
		Symbol : 'JPYBasket',
		Spread : 3.09,
		ProductType : 7
	},


	// ProductType 8, Stock Baskets
	{
		Symbol : 'BIOTECH',
		Spread : 1.01,
		ProductType : 8
	}, 	{
		Symbol : 'CANNABIS',
		Spread : 2.46,
		ProductType : 8
	}, 	{
		Symbol : 'CHN.ECOMM',
		Spread : 2.07,
		ProductType : 8
	}, 	{
		Symbol : 'CHN.TECH',
		Spread : 2.63,
		ProductType : 8
	},	{
		Symbol : 'ESPORTS',
		Spread : 0.58,
		ProductType : 8
	},	{
		Symbol : 'FAANG',
		Spread : 0.74,
		ProductType : 8
	},

	// ProductType 9, Crypto
	{
		Symbol : 'BCHUSD',
		Spread : 4.16,
		ProductType : 9
	},

	{
		Symbol : 'BTCUSD',
		Spread : 26.14,
		ProductType : 9
	},

	{
		Symbol : 'CryptoMajor',
		Spread : 2.0,
		ProductType : 9
	},

	{
		Symbol : 'ETHUSD',
		Spread : 2.08,
		ProductType : 9
	},

	{
		Symbol : 'LTCUSD',
		Spread : 0.73,
		ProductType : 9
	},

	{
		Symbol : 'XRPUSD',
		Spread : 0.01,
		ProductType : 9
	},

	{
		Symbol : 'EOSUSD',
		Spread : 0.03,
		ProductType : 9
	},

	{
		Symbol : 'XLMUSD',
		Spread : 0.0015,
		ProductType : 9
	}



];
// end static spreads


/***** BEGIN GLOBAL SITEMAP ******/
// site for maps
fxcm.registration.siteMap = {
	fxcmcom : {
		domains : {
			dev : 'fxcm3.dev.fxcorp.prv',
			devPub : 'fxcm3-dev.fxcorporate.com',
			qa : 'fxcm3.qa.fxcorp.prv',
			prod : 'www.fxcm.com',
			landing : 'landing.fxcm.com',
			nano : 'help.fxcm.com/us',
			news : 'www.fxcm.news'
		},
		countryID : 'US',
		chatButton : '5733200000000eY',
		entityFor : ['AS','GU','MP','VI','US']
	},
	fxcmuk : {
		domains : {
			dev : 'fxcm31.dev.fxcorp.prv/uk',
			devPub : 'fxcm31-dev.fxcorporate.com/uk',
			qa : 'fxcm31.qa.fxcorp.prv/uk',
			prod : 'www.fxcm.com/uk',
			landing : 'landing.fxcm.com/uk',
			nano : 'help.fxcm.com/uk',
			news : 'www.fxcm.news/uk'
		},
		countryID : 'UK',
		chatButton : '57332000000Cazq',
		entityFor : ['AG','AZ','BE','VG','BG','HR','CY','CZ','DK','DM','EE','FJ','FI','GI','HU','IS','IQ','IE','LV','LI','LT','LU','MT','MC','MS','NL','AN','NO','PL','PT','RO','SM','SK','SI','SE','CH','UK']
	},
	fxcmau : {
		domains : {
			dev : 'fxcm31.dev.fxcorp.prv/au',
			devPub : 'fxcm31-dev.fxcorporate.com/au',
			qa : 'fxcmau3.qa.fxcorp.prv',
			prod : 'www.fxcm.com/au',
			landing : 'landing.fxcm.com/au',
			nano : 'help.fxcm.com/au',
			news : 'www.fxcm.news/au'
		},
		countryID : 'AU',
		chatButton : '57332000000Cazg',
		entityFor : ['AU','NZ']
	},
	fxcmmarkets : {
		domains : {
			dev : 'fxcm31.dev.fxcorp.prv/markets',
			devPub : 'fxcm31-dev.fxcorporate.com/markets',
			qa : 'fxcm31.qa.fxcorp.prv/markets',
			prod : 'www.fxcm.com/markets',
			landing : 'landing.fxcm.com/markets',
			nano : 'help.fxcm.com/markets',
			news : 'www.fxcm.news/markets'
		},
		countryID : 'MARKETS',
		chatButton : '57332000000Cazl',
		entityFor : ['PH','IN']
	},
	fxcmde : {
		domains : {
			dev : 'fxcm3.dev.fxcorp.prv/de',
			devPub : 'fxcm3-dev.fxcorporate.com/de',
			qa : 'fxcm3.qa.fxcorp.prv/de',
			prod : 'www.fxcm.com/de',
			landing : 'landing.fxcm.com/de',
			news : 'www.fxcm.news/de'
		},
		countryID : 'DE',
		chatButton : '57332000000Cazv',
		entityFor : ['DE','AST']
	},
	fxcmfr : {
		domains : {
			dev : 'fxcm3.dev.fxcorp.prv/fr',
			devPub : 'fxcm3-dev.fxcorporate.com/fr',
			qa : 'fxcm3.qa.fxcorp.prv/fr',
			prod : 'www.fxcm.com/fr',
			landing : 'landing.fxcm.com/fr',
			news : 'www.fxcm.news/fr'
		},
		countryID : 'FR',
		chatButton : '57332000000Cb00',
		entityFor : ['FR']
	},
	fxcmit : {
		domains : {
			dev : 'fxcmit3.dev.fxcorp.prv',
			devPub : 'fxcmit3-dev.fxcorporate.com',
			qa : 'fxcmit3.qa.fxcorp.prv',
			prod : 'www.fxcm.it',
			landing : 'landing.fxcm.com/it',
			news : 'www.fxcm.news/it'
		},
		countryID : 'IT',
		chatButton : '57332000000Cb05',
		entityFor : ['IT']
	},
	fxcmca : {
		domains : {
			dev : 'fxcm3.dev.fxcorp.prv/ca',
			devPub : 'fxcm3-dev.fxcorporate.com/ca',
			qa : 'fxcm3.qa.fxcorp.prv/ca',
			prod : 'www.fxcm.com/ca',
			landing : 'landing.fxcm.com/ca'
		},
		countryID : 'CA',
		chatButton : '57332000000Cb2p',
		entityFor : ['CA']
	},
	fxcmar : {
		domains : {
			dev : 'fxcmar31.dev.fxcorp.prv',
			devPub : 'fxcmar31-dev.fxcorporate.com',
			qa : 'fxcmar31.qa.fxcorp.prv',
			prod : 'www.fxcm-arabic.com',
			landing : 'landing.fxcm.com/ar',
			news : 'www.fxcm.news/ar'
		},
		countryID : 'AR',
		chatButton : '57332000000Cb0A',
		entityFor : ['BH','EG','KW','OM','SA','AE','QA']
	},
	fxcmchinese : {
		domains : {
			prod : 'www.fxcmapac.com',
			news : 'www.fxcm.news/zh-hans'
		},
		countryID : 'CN',
		entityFor : ['CN','TW']
	},
	fxcmid : {
		domains : {
			prod : 'www.fxcm.com/id'
		},
		countryID : 'ID',
		entityFor : ['ID']
	},
	fxcmph : {
		domains : {
			prod : 'www.fxcm.com/ph'
		},
		countryID : 'PH',
		entityFor : ['PH']
	},
	fxcmmy : {
		domains : {
			prod : 'www.fxcm.com/my'
		},
		countryID : 'MY',
		entityFor : ['MY']
	},
	fxcmvn : {
		domains : {
			prod : 'www.fxcm.com/vn'
		},
		countryID : 'VN',
		entityFor : ['VN']
	},
	fxcmespanol : {
		domains : {
			prod : 'www.fxcmespanol.com'
		},
		countryID : 'ES',
		entityFor : ['AR','BO','CO','CR','DO','EC','SV','GT','HN','MX','NI','PA','PY','PE','PR','ES','UY','VE']
	},
	fxcmchile : {
		domains : {
			prod : 'www.fxcmchile.cl'
		},
		countryID : 'CL',
		entityFor : ['CL']
	},
	fxcmgr : {
		domains : {
			prod : 'www.fxcm.gr'
		},
		countryID : 'GR',
		entityFor : ['GR']
	}
};
/***** END GLOBAL SITEMAP ******/

// function to get Site ID for a url (argument is expected to be a string)
fxcm.registration.getSiteId = function( url ){
	// trim URL, if not passed set to current location
	var urlTrimmed = typeof url === 'string' && url.length ? url.match(/[^\s\t\n\r]+/)[0] : null;
	if( urlTrimmed === null ){
		return false;
	}

	// split the URL into protocol, hostname, path, params and hash
	var urlSplit = urlTrimmed.match(/^([a-z\:]*\/\/)?(?:([a-z0-9\-\_]+)\.)?([a-z0-9\-\_]+\.[a-z\.]{2,})([^\?\&\#]*)\??([^\#]*)\#?(.*)$/i);
	if( urlSplit === null ){ return false; }
	for( var i = 0; i < urlSplit.length; i++ ){
		if( typeof urlSplit[i] === 'undefined' ){
			urlSplit[i] = '';
		}
	}

	// vars to test against the button map
	// basically constructing 2 urls, one with just the host and one with the first directory
	var host = typeof urlSplit[2] === 'string' && urlSplit[2].length ? urlSplit[2] + '.' + urlSplit[3] : urlSplit[3];

	// if urlSplit[2] is IT then returns 'it' otherwise returns 'fr' or whatever site its on
	var firstDir = urlSplit[2] === 'fxcmit3' ? 'it' : urlSplit[4].split('/')[1];
	//var dirUrl = typeof firstDir === 'string' && firstDir.length ? host + '/' + firstDir : false;

	var dirUrl = '';
	if( typeof firstDir === 'string' && firstDir.length ){
		if( firstDir === 'it' ) {
			dirUrl = host;
		} else {
			dirUrl = host + '/' + firstDir;
		}
	} else {
		dirUrl = false;
	}

	var found = {};
	var siteMap = fxcm.registration.siteMap;

	// search object for matching entries for both just the hostname and the hostname + first directory
	for( site in siteMap ){
		if( typeof siteMap[site]['domains'] === 'object' ){
			var domains = siteMap[site]['domains'];
			for( url in domains ){
				var testUrl = domains[url];
				if( dirUrl === testUrl ){
					found.withDir = site;
				}
				else if( host === testUrl ){
					found.withoutDir = site;
				}
			}
		}
	}

	// if result with directory is found, use that result
	if( typeof found.withDir === 'string' ){
		return found.withDir;
	}
	// otherwise if results without the directory is found, set as final returned object
	else if( typeof found.withoutDir === 'string' ){
		return found.withoutDir;
	}
	else{
		return false;
	}
};

// function to retrieve button ID from liveAgentButtonMap
fxcm.registration.getLiveAgentButtonIdFromUrl = function( url ){

	var siteMap = fxcm.registration.siteMap;
	var currSite = fxcm.registration.getSiteId( url );
	var buttonId;

	if( currSite && typeof siteMap[currSite]['chatButton'] === 'string' && siteMap[currSite]['chatButton'].length ){
		buttonId = siteMap[currSite]['chatButton'];
	}

	return typeof buttonId === 'string' ? buttonId : false;

};

fxcm.registration.mifidCountryMap = {
	"be": {
		//name: "Belgium",
		documents: [
			{
				label: {

					lang: {
						de: "Belgische Nationalnummer",
						fr: "Numéro national belge",
						it: "Numero nazionale belga",
						en:	"Belgian National Number  <br>( Numéro de registre national – Rijksregisternummer )",
						ar: "الرقم الوطني البلجيكي"
					}

				},
				required: false,
				min: 11,
				max: 11
			}
		]
	},
	"bg": {
		//name: "Bulgaria",
		documents: [
			{
				label: {

					lang: {
						de: "BULGARISCHE PERSÖNLICHE NUMMER",
						fr: "Numéro personnel Bulgare",
						it: "NUMERO PERSONALE BULGARO",
						en:	"Bulgarian Personal Number",
						ar: "الرقم البلغاري الشخصي"
					}

				},
				required: false,
				min: 10,
				max: 10
			}
		]
	},
	"cy": {
		//name: "Cyprus",
		documents: [
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 7,
				max: 9
			}
		]
	},
	"cz": {
		//name: "Czech Republic",
		documents: [
			{
				label: {

					lang: {
						de: "NATIONALE IDENTIFIKATIONSNUMMER",
						fr: "Numéro d'identité national",
						it: "NUMERO DI IDENTIFICAZIONE NAZIONALE",
						en:	"National identification number ( Rodnéčíslo )",
						ar: "رقم الهوية الوطنية"
					}

				},
				required: false,
				min: 9,
				max: 10
			},
			{
				label: {

					lang: {
						de: "Reisepassnummer",
						fr: "Numéro de passeport",
						it: "NUMERO DI PASSAPORTO",
						en:	"Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 8
			}
		]
	},
	"dk": {
		//name: "Denmark",
		documents: [
			{
				label: {

					lang: {
						de: "Persönlicher Identitätscode (10 Zeichen alphanumerisch: DMMYYXXXX)",
						fr: "Numéro d'identification personnel",
						it: "Codice alfanumerico di identificazione nazionale di 10 cifre: DMMYYXXXX",
						en:	"Personal identity code 10 digits alphanumerical: DMMYYXXXX",
						ar: "رمز الهوية الشخصية المكون من 10 خانات أبجدية رقمية: "
					}

				},
				required: false,
				min: 10,
				max: 10
			}
		]
	},
	"ee": {
		//name: "Estonia",
		documents: [
			{
				label: {

					lang: {
						de: "ESTNISCHE PERSÖNLICHE IDENTIFIKATIONSNUMMER",
						fr: "Veuillez fournir votre numéro d'identité ci-dessous",
						it: "CODICE DI IDENTIFICAZIONE PERSONALE ESTONE",
						en:	"Estonian Personal Identification Code  <br>( Isikukood )",
						ar: "رقم الهوية الشخصي الإستوني "
					}

				},
				required: true,
				min: 11,
				max: 11
			}
		]
	},
	"es": {
		//name: "Spain",
		documents: [
			{
				label: {

					lang: {
						de: "Steueridentifikationsnummer",
						fr: "Numéro d'identification fiscale",
						it: "Numero di identificazione fiscale",
						en:	"Número de Identificación Fiscal",
						ar: "رقم التعريف الضريبي"
					}

				},
				required: true,
				min: 9,
				max: 9
			}
		]
	},
	"fi": {
		//name: "Finland",
		documents: [
			{
				label: {

					lang: {
						de: "Persönlicher Identitätscode",
						fr: "Code d'identité personnel",
						it: "Codice personale di identificazione",
						en:	"Personal identity code",
						ar: "رمز الهوية الشخصية"
					}

				},
				required: false,
				min: 11,
				max: 11
			}
		]
	},
	"gr": {
		//name: "Greece",
		documents: [
			{
				label: {

					lang: {
						de: "10 DSS digit investor share",
						fr: "10 parts d'investisseurs numériques DSS",
						it: "DSS investor share di 10 cifre",
						en: "10 DSS digit investor share",
						ar: "الـ 10 أرقام من نظام الأوراق المالية الغير مادي (DSS) التابعة للمستثمر "
					}

				},
			}
		]
	},
	"hr": {
		//name: "Croatia",
		documents: [
			{
				label: {

					lang: {
						de: "NATIONALE IDENTIFIKATIONSNUMMER",
						fr: "Numéro d'identité national",
						it: "NUMERO DI IDENTIFICAZIONE NAZIONALE",
						en:	"Personal Identification Number  <br>( OIB – Osobni identifikacijski broj )",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 11,
				max: 11
			}
		]
	},
	"is": {
		//name: "Iceland",
		documents: [
			{
				label: {

					lang: {
						de: "Persönlicher Identitätscode",
						fr: "Code d'identité personnelle",
						it: "Codice personale di identificazione",
						en:	"Personal Identity Code (Kennitala)",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: true,
				min: 10,
				max: 10
			}
		]
	},
	"it": {
		//name: "Italy",
		documents: [
			{
				label: {

					lang: {
						de: "Steuernummer",
						fr: "Code fiscal",
						it: "Codice fiscale",
						en:	"Fiscal code  <br>( Codice fiscal )",
						ar: "الرمز المالي"
					}

				},
				required: true,
				min: 16,
				max: 16
			}
		]
	},
	"li": {
		//name: "Liechtenstein",
		documents: [
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 6,
				max: 6
			},
			{
				label: {

					lang: {
						de: "Personalausweisnummer",
						fr: "Numéro de carte d'identité nationale",
						it: "Numero della carta di identità nazionale",
						en:	"National Identity Card Number",
						ar: "رقم بطاقة الهوية الوطنية"
					}

				},
				required: false,
				min: 10,
				max: 10
			}
		]
	},
	"lt": {
		//name: "Lithuania",
		documents: [
			{
				label: {

					lang: {
						de: "Persönlicher Code",
						fr: "Code personnel",
						it: "Codice personale",
						en:	"Personal code ( Asmens kodas )",
						ar: "الرمز الشخصي"
					}

				},
				required: false,
				min: 11,
				max: 11
			},
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 8,
				max: 8
			}
		]
	},
	"lv": {
		//name: "Latvia",
		documents: [
			{
				label: {

					lang: {
						de: "Persönlicher Code",
						fr: "Code personnel",
						it: "Codice personale",
						en:	"Personal code  <br>( Personas kods )",
						ar: "الرمز الشخصي"
					}

				},
				required: false,
				min: 11,
				max: 11
			}
		]
	},
	"mt": {
		//name: "Malta",
		documents: [
			{
				label: {

					lang: {
						de: "NATIONALE IDENTIFIKATIONSNUMMER<br>- oder -  <br>REISEPASSNUMMER",
						fr: "Numéro d'identité national<br>- or -  <br> Carte d'identité nationale",
						it: "NUMERO DI IDENTIFICAZIONE NAZIONALE<br>- or -  <br>NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Identification Number  <br>- or -  <br>National Passport Number",
						ar: "رقم الهوية الوطنية<br> أو<br>رقم جواز السفر"
					}

				},
				required: true,
				min: 7,
				max: 8
			}
		]
	},
	"nl": {
		//name: "Netherlands",
		documents: [
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 9,
				max: 9
			},
			{
				label: {

					lang: {
						de: "Persönlicher Code",
						fr: "Code personnel",
						it: "Numero della carta di identità nazionale",
						en:	"National identity card number",
						ar: "رقم بطاقة الهوية الوطنية"
					}

				},
				required: false,
				min: 9,
				max: 9
			}
		]
	},
	"no": {
		//name: "Norway",
		documents: [
			{
				label: {

					lang: {
						de: "11-stellige persönliche ID",
						fr: "Identifiant personnel à 11 chiffres",
						it: "ID personale di 11 cifre",
						en:	"11 digit personal id  <br>( Foedselsnummer )",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 11,
				max: 11
			}
		]
	},
	"pl": {
		//name: "Poland",
		documents: [
			{
				label: {

					lang: {
						de: "NATIONALE IDENTIFIKATIONSNUMMER<br>- oder -  <br>STEUERNUMMER",
						fr: "Numéro d'identité national<br>- oder -  <br>Numéro fiscal",
						it: "NUMERO DI IDENTIFICAZIONE NAZIONALE<br>- ou -  <br>NUMERO FISCALE",
						en:	"National Identification Number ( PESEL )  <br>- or -  <br>Tax Number (Numer identyfikacji podatkowej)",
						ar: "الرقم الضريبي<br> أو<br>رقم الهوية الوطنية"
					}

				},
				required: true,
				min: 10,
				max: 11
			}
		]
	},
	"pt": {
		//name: "Portugal",
		documents: [
			{
				label: {

					lang: {
						de: "STEUERNUMMER",
						fr: "Numéro fiscal",
						it: "NUMERO FISCALE",
						en:	"Tax number (Número de Identificação Fiscal)",
						ar: "الرقم الضريبي"
					}

				},
				required: false,
				min: 9,
				max: 9
			},
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 7,
				max: 7
			}
		]
	},
	"ro": {
		//name: "Romania",
		documents: [
			{
				label: {

					lang: {
						de: "NATIONALE IDENTIFIKATIONSNUMMER",
						fr: "Numéro d'identité national",
						it: "NUMERO DI IDENTIFICAZIONE NAZIONALE",
						en:	"National Identification Number <br>( Cod Numeric Personal )",
						ar: "رقم الهوية الوطنية"
					}

				},
				required: false,
				min: 13,
				max: 13
			},
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number<br class='tablet-hide mobile-hide'><br class='tablet-hide mobile-hide'>",
						ar: "رقم جواز السفر"
					}

				},
				required: false,
				min: 8,
				max: 8
			}
		]
	},

	"se": {
		//name: "Sweden",
		documents: [
			{
				label: {

					lang: {
						de: "Persönliche Identitätsnummer",
						fr: "Numéro d'identité personnel",
						it: "Numero di identità personale",
						en:	"Personal identity number",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 12,
				max: 12
			}
		]
	},
	"si": {
		//name: "Slovenia",
		documents: [
			{
				label: {

					lang: {
						de: "Persönliche Identitätsnummer",
						fr: "Numéro d'identification personnel",
						it: "Numero di identità personale",
						en:	"Personal Identification Number <br>( EMŠO: Enotna Matična Številka Občana )",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 13,
				max: 13
			}
		]
	},
	"sk": {
		//name: "Slovakia or Slovak Republic",
		documents: [
			{
				label: {

					lang: {
						de: "Personennummer (Rodné číslo)",
						fr: "Numéro personnel",
						it: "Numero personale",
						en:	"Personal number (Rodné číslo)",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 10,
				max: 10
			},
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en: "National Passport Number",
						ar: "رقم جواز السفر"
					}
				},
				required: false,
				min: 9,
				max: 9
			}
		]
	},
	"uk": {
		//name: "United Kingdom",
		documents: [
			{
				label: {

					lang: {
						de: "Britische National Insurance Number",
						fr: "Numéro de sécurité sociale",
						it: "Numero Previdenza Sociale UK",
						en:	"UK National Insurance number",
						ar: "رقم الهوية الشخصية"
					}

				},
				required: false,
				min: 9,
				max: 9
			}
		]
	},
	"default": {
		documents: [
			{
				label: {

					lang: {
						de: "REISEPASSNUMMER",
						fr: "Carte d'identité nationale",
						it: "NUMERO DEL PASSAPORTO NAZIONALE",
						en:	"National Passport Number",
						ar: "رقم جواز السفر"
					}

				},
				required: false
			}
		]
	}
};



fxcm.summary = fxcm.summary || {};
fxcm.summary.instances = !fxcm.summary.instances ? 1 : fxcm.summary.instances + 1;
fxcm.summary[ fxcm.summary.instances ] = {};
fxcm.summary[ fxcm.summary.instances ].package = 'fxpress';
fxcm.summary[ fxcm.summary.instances ].fileCount = 19;
fxcm.summary[ fxcm.summary.instances ].polyfills = [ 'matchmedia' ];
fxcm.summary[ fxcm.summary.instances ].libraries = [ 'amplify', 'enquire', 'moment', 'outdatedbrowser' ];
fxcm.summary[ fxcm.summary.instances ].modules = [ 'support', 'lib', 'calendar', 'demo', 'device', 'eloqua', 'limelight', 'internal', 'tooltip', 'twitterstream', 'ui', 'gtm', 'mifid' ];
fxcm.summary[ fxcm.summary.instances ].plugins = [ 'validation' ];
fxcm.summary[ fxcm.summary.instances ].warnings = [];
fxcm.summary[ fxcm.summary.instances ].warnings.push( "no separator character found, use '!' to delimit components of the same type if necessary" );

// add function to log clearer details in the console
fxcm.summary.log = fxcm.summary.log || function(){
	
	// start console output string
	var cOutput = '---------- Summary of fxcm_lib.js requests ( ' + fxcm.summary.instances + ' instances ) ----------\r\n\r\n';
	
	// function to properly format output of a object property or array key
	// takes key, value, and level of nesting
	function genPropOutput( key, val, level ){
		
		// set level to 0 if not found
		level = level || 0;
		
		// indent 4 spaces per level of nesting
		for( var i = 0; i < level; i++ ){
			cOutput += '    ';
		}
		
		// check value type, only accept strings, numbers, objects and arrays
		switch( typeof val ){
			// if its a string or number, just output directly
			case 'string' :
			case 'number' :
				cOutput += key + ' : ' + val + '\r\n';
				break;
			// if its an array or object, start a new level by recursing into this function
			case 'object' :
				cOutput += key + ' ¬ ' + '\r\n';
				if( val.length ){
					for( var j = 0; j < val.length; j++ ){
						genPropOutput( j + 1, val[j], level + 1 );
					}
				}
				else{
					for( k in val ){
						genPropOutput( k, val[k], level + 1 );
					}
				}
				break;
			
		}
	}
	
	// loop through properties of package, and log details that are not the "instances" property
	for( prop in fxcm.summary ){
		if( prop !== 'instances' ){
			genPropOutput( prop, fxcm.summary[prop] )
			cOutput += '\r\n';
		}
	}
	
	// print it
	if( navigator.userAgent.indexOf( 'MSIE' ) > -1 ){
		console.log( cOutput );
	}
	else {
		console.log( '%c' + cOutput, 'color:#0c51a3; font-size:13px;' );
	}
};