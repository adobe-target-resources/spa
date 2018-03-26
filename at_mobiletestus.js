/**
 * @license
 * at.js 1.3.0 | (c) Adobe Systems Incorporated | All rights reserved
 * zepto.js | (c) 2010-2016 Thomas Fuchs | zeptojs.com/license
*/
(function (exports) {
'use strict';

var _win = window;
var _doc = document;
var _isIE10OrModernBrowser = _doc.documentMode ? _doc.documentMode >= 10 : true;
var _isStandardMode = _doc.compatMode && _doc.compatMode === 'CSS1Compat';
var _isEnabled = _isStandardMode && _isIE10OrModernBrowser;
var _globalSettings = _win.targetGlobalSettings;

function empty() {}

if (!_isEnabled || (_globalSettings && _globalSettings.enabled === false)) {
  _win.adobe = _win.adobe || {};
  _win.adobe.target = {
    VERSION: '',
    event: {},
    getOffer: empty,
    applyOffer: empty,
    trackEvent: empty,
    registerExtension: empty,
    ___bootstrap: empty,
  };
  _win.mboxCreate = empty;
  _win.mboxDefine = empty;
  _win.mboxUpdate = empty;

  if ('console' in _win && 'warn' in _win.console) {
    _win.console.warn('AT: Adobe Target content delivery is disabled. Update your DOCTYPE to support Standards mode.');
  }

  return;
}


/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}
	return Object(val);
}
function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}
		var test1 = new String('abc');
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}
		return true;
	} catch (err) {
		return false;
	}
}
var index$2 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;
	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}
		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}
	return to;
};

var index$1 = index$2;

var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
function baseGetTag(value) {
  return objectToString(value);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function isObject(value) {
  var type = typeof value === "undefined" ? "undefined" : _typeof(value);
  var notNull = value != null;
  return notNull && (type === "object" || type === "function");
}

var funcTag = "[object Function]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  return baseGetTag(value) === funcTag;
}

function delay(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!isFunction(func)) {
    return;
  }
  setTimeout(func, Number(wait) || 0);
}

function isNil(value) {
  return value == null;
}

var isArray = Array.isArray;

function identity(value) {
  return value;
}

function castFunction(value) {
  return isFunction(value) ? value : identity;
}

function keys(object) {
  if (isNil(object)) {
    return [];
  }
  return Object.keys(object);
}

var arrayEach = function arrayEach(iteratee, collection) {
  return collection.forEach(iteratee);
};

var baseEach = function baseEach(iteratee, collection) {
  arrayEach(function (key) {
    return iteratee(collection[key], key);
  }, keys(collection));
};

var arrayFilter = function arrayFilter(predicate, collection) {
  return collection.filter(predicate);
};
var baseFilter = function baseFilter(predicate, collection) {
  var result = {};
  baseEach(function (value, key) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  }, collection);
  return result;
};
function filter(predicate, collection) {
  if (isNil(collection)) {
    return [];
  }
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(castFunction(predicate), collection);
}

function first(array) {
  return array && array.length ? array[0] : undefined;
}

function flatten(array) {
  if (isNil(array)) {
    return [];
  }
  return [].concat.apply([], array);
}

function forEach(iteratee, collection) {
  if (isNil(collection)) {
    return;
  }
  var func = isArray(collection) ? arrayEach : baseEach;
  func(castFunction(iteratee), collection);
}

function isObjectLike(value) {
  var notNull = value != null;
  return notNull && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
}

var stringTag = "[object String]";
function isString(value) {
  return typeof value === "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) === stringTag;
}

function hash(string) {
  if (!isString(string)) {
    return -1;
  }
  var result = 0;
  var length = string.length;
  for (var i = 0; i < length; i += 1) {
    result = (result << 5) - result + string.charCodeAt(i) & 0xffffffff;
  }
  return result;
}

var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

var arrayMap = function arrayMap(iteratee, collection) {
  return collection.map(iteratee);
};

function baseValues(props, object) {
  return arrayMap(function (key) {
    return object[key];
  }, props);
}
function copyArray(source) {
  var index = 0;
  var length = source.length;
  var array = Array(length);
  while (index < length) {
    array[index] = source[index];
    index += 1;
  }
  return array;
}
function stringToArray(str) {
  return str.split("");
}
function toArray$1(value) {
  if (isNil(value)) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  return baseValues(keys(value), value);
}

var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice))) {
    return !value.length;
  }
  for (var key in value) {
    if (hasOwnProperty$1.call(value, key)) {
      return false;
    }
  }
  return true;
}

var stringProto = String.prototype;
var nativeStringTrim = stringProto.trim;
function trim(string) {
  return isNil(string) ? "" : nativeStringTrim.call(string);
}

function isBlank(value) {
  return isString(value) ? !trim(value) : isEmpty(value);
}

var objectTag = "[object Object]";
var funcProto = Function.prototype;
var objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function getPrototype(value) {
  return Object.getPrototypeOf(Object(value));
}
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}

function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

var isNotBlank = function isNotBlank(value) {
  return !isBlank(value);
};

var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value === "number" || isObjectLike(value) && baseGetTag(value) === numberTag;
}

var baseMap = function baseMap(iteratee, collection) {
  var result = {};
  baseEach(function (value, key) {
    result[key] = iteratee(value, key);
  }, collection);
  return result;
};
function map(iteratee, collection) {
  if (isNil(collection)) {
    return [];
  }
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(castFunction(iteratee), collection);
}

function noop() {
}

var arrayReduce = function arrayReduce(iteratee, accumulator, collection) {
  return collection.reduce(iteratee, accumulator);
};
var baseReduce = function baseReduce(iteratee, accumulator, collection) {
  var localAcc = accumulator;
  baseEach(function (value, key) {
    localAcc = iteratee(localAcc, value, key);
  }, collection);
  return localAcc;
};
function reduce(iteratee, accumulator, collection) {
  if (isNil(collection)) {
    return accumulator;
  }
  var func = isArray(collection) ? arrayReduce : baseReduce;
  return func(castFunction(iteratee), accumulator, collection);
}

var arrayProto = Array.prototype;
var nativeReverse = arrayProto.reverse;
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}

function split(separator, string) {
  if (isBlank(string)) {
    return [];
  }
  return string.split(separator);
}

function random(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
function uuid() {
  var d = Date.now();
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + random(0, 16)) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  });
}

var index$4 = window;

var index$5 = document;

var ACTION = "action";
var ATTRIBUTE = "attribute";
var VALUE = "value";

var CLICK_TRACK_ID = "clickTrackId";
var CONTENT = "content";
var CONTENT_TYPE = "contentType";
var FINAL_HEIGHT = "finalHeight";
var FINAL_WIDTH = "finalWidth";
var HEIGHT = "height";
var WIDTH = "width";
var FINAL_LEFT_POSITION = "finalLeftPosition";
var FINAL_TOP_POSITION = "finalTopPosition";
var LEFT = "left";
var TOP = "top";
var POSITION = "position";
var FROM = "from";
var TO = "to";
var URL = "url";
var INCLUDE_ALL_URL_PARAMETERS = "includeAllUrlParameters";
var PASS_MBOX_SESSION = "passMboxSession";
var PROPERTY = "property";
var PRIORITY = "priority";
var SELECTOR = "selector";
var CSS_SELECTOR = "cssSelector";
var STYLE = "style";
var SET_CONTENT = "setContent";
var SET_TEXT = "setText";
var SET_JSON = "setJson";
var SET_ATTRIBUTE = "setAttribute";
var SET_STYLE = "setStyle";
var REARRANGE = "rearrange";
var RESIZE = "resize";
var MOVE = "move";
var REMOVE = "remove";
var CUSTOM_CODE = "customCode";
var APPEND_CONTENT = "appendContent";
var REDIRECT = "redirect";
var TRACK_CLICK = "trackClick";
var SIGNAL_CLICK = "signalClick";
var INSERT_BEFORE = "insertBefore";
var INSERT_AFTER = "insertAfter";
var PREPEND_CONTENT = "prependContent";
var REPLACE_CONTENT = "replaceContent";
var DEBUG = "mboxDebug";
var DISABLE = "mboxDisable";
var AUTHORING = "mboxEdit";
var CHECK = "check";
var TRUE = "true";
var MBOX_LENGTH = 250;
var LETTERS_ONLY_PATTERN = /^[a-zA-Z]+$/;
var DATA_SRC = "data-at-src";
var DATA_MBOX_NAME = "data-at-mbox-name";
var CLICKED_SUFFIX = "-clicked";
var MBOX_NAME_CLASS_PREFIX = "mbox-name-";
var JSON$1 = "json";
var HTML = "html";
var SCRIPT = "script";
var TEXT = "text";
var SRC = "src";
var ID = "id";
var CLASS = "class";
var TYPE = "type";
var CLICK = "click";
var SUBMIT = "submit";
var HEAD_TAG = "head";
var SCRIPT_TAG = "script";
var STYLE_TAG = "style";
var LINK_TAG = "link";
var IMAGE_TAG = "img";
var DIV_TAG = "div";
var ANCHOR_TAG = "a";
var FORM_TAG = "form";
var BUTTON_TAG = "button";
var INPUT_TAG = "input";
var DELIVERY_DISABLED = 'Adobe Target content delivery is disabled. Ensure that you can save cookies to your current domain, there is no "mboxDisable" cookie and there is no "mboxDisable" parameter in query string.';
var ALREADY_INITIALIZED = "Adobe Target has already been initialized.";
var OPTIONS_REQUIRED = "options argument is required";
var MBOX_REQUIRED = "mbox option is required";
var MBOX_TOO_LONG = "mbox option is too long";
var SUCCESS_REQUIRED = "success option is required";
var ERROR_REQUIRED = "error option is required";
var OFFER_REQUIRED = "offer option is required";
var NAME_REQUIRED = "name option is required";
var NAME_INVALID = "name is invalid";
var MODULES_REQUIRED = "modules option is required";
var REGISTER_REQUIRED = "register option is required";
var MODULES_INVALID = "modules do not exists";
var MISSING_SELECTORS = "Actions with missing selectors";
var UNEXPECTED_ERROR = "Unexpected error";
var ACTIONS_TO_BE_RENDERED = "actions to be rendered";
var REQUEST_FAILED = "request failed";
var ACTIONS_RENDERED = "All actions rendered successfully";
var ACTION_RENDERED = "Action rendered successfully";
var ACTION_RENDERING = "Rendering action";
var EMPTY_CONTENT = "Action has no content";
var EMPTY_ATTRIBUTE = "Action has no attribute or value";
var EMPTY_PROPERTY = "Action has no property or value";
var EMPTY_SIZES = "Action has no height or width";
var EMPTY_COORDINATES = "Action has no left, top or position";
var EMPTY_REARRANGE = "Action has no from or to";
var EMPTY_URL = "Action has no url";
var EMPTY_CLICK_TRACK_ID = "Action has no click track ID";
var REARRANGE_MISSING = "Rearrange elements are missing";
var LOADING_IMAGE = "Loading image";
var TRACK_EVENT_SUCCESS = "Track event request succeeded";
var TRACK_EVENT_ERROR = "Track event request failed";
var MBOX_CONTAINER_NOT_FOUND = "Mbox container not found";
var RENDERING_MBOX = "Rendering mbox";
var RENDERING_MBOX_FAILED = "Rendering mbox failed";
var MBOX_DEFINE_ID_MISSING = "ID is missing";
var NO_ACTIONS = "No actions to be rendered";
var REDIRECT_ACTION = "Redirect action";
var FORCE_HEAD = "default to HEAD";
var CURRENT_SCRIPT_MISSING = "document.currentScript is missing or not supported";
var HTML_HEAD_EXECUTION = "executing from HTML HEAD";
var REMOTE_SCRIPT = "Script load";
var ERROR_UNKNOWN = "unknown error";
var ERROR = "error";

var UNKNOWN = "unknown";
var VALID = "valid";
var SUCCESS = "success";
var MBOX = "mbox";
var OFFER = "offer";
var NAME = "name";
var MODULES = "modules";
var REGISTER = "register";
var STATUS = "status";
var PARAMS = "params";
var ACTIONS = "actions";
var RESPONSE_TOKENS = "responseTokens";
var MESSAGE = "message";

var RESPONSE = "response";
var REQUEST = "request";
var DYNAMIC = "dynamic";
var PLUGINS = "plugins";
var CLICK_TOKEN = "clickToken";
var OFFERS = "offers";
var SELECTORS = "selectors";
var PROVIDER = "provider";
var MBOX_CSS_CLASS = "mboxDefault";
var FLICKER_CONTROL_CLASS = "at-flicker-control";
var MARKER_CSS_CLASS = "at-element-marker";
var CLICK_TRACKING_CSS_CLASS = "at-element-click-tracking";
var MBOX_COOKIE = MBOX;
var ENABLED = "enabled";
var CLIENT_CODE = "clientCode";
var IMS_ORG_ID = "imsOrgId";
var SERVER_DOMAIN = "serverDomain";
var CROSS_DOMAIN = "crossDomain";
var TIMEOUT = "timeout";
var GLOBAL_MBOX_NAME = "globalMboxName";
var GLOBAL_MBOX_AUTO_CREATE = "globalMboxAutoCreate";
var VERSION = "version";
var DEFAULT_CONTENT_HIDDEN_STYLE = "defaultContentHiddenStyle";
var DEFAULT_CONTENT_VISIBLE_STYLE = "defaultContentVisibleStyle";
var BODY_HIDDEN_STYLE = "bodyHiddenStyle";
var BODY_HIDING_ENABLED = "bodyHidingEnabled";
var DEVICE_ID_LIFETIME = "deviceIdLifetime";
var SESSION_ID_LIFETIME = "sessionIdLifetime";
var SELECTORS_POLLING_TIMEOUT = "selectorsPollingTimeout";
var VISITOR_API_TIMEOUT = "visitorApiTimeout";
var OVERRIDE_MBOX_EDGE_SERVER = "overrideMboxEdgeServer";
var OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT = "overrideMboxEdgeServerTimeout";
var OPTOUT_ENABLED = "optoutEnabled";
var SECURE_ONLY = "secureOnly";
var SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT = "supplementalDataIdParamTimeout";
var AUTHORING_SCRIPT_URL = "authoringScriptUrl";
var CROSS_DOMAIN_ONLY = "crossDomainOnly";
var CROSS_DOMAIN_ENABLED = "crossDomainEnabled";
var SCHEME = "scheme";
var COOKIE_DOMAIN = "cookieDomain";
var MBOX_PARAMS = "mboxParams";
var GLOBAL_MBOX_PARAMS = "globalMboxParams";
var REQUEST_METHOD = "requestMethod";
var BROWSER_HEIGHT = "browserHeight";
var BROWSER_WIDTH = "browserWidth";
var BROWSER_TIME_OFFSET = "browserTimeOffset";
var SCREEN_HEIGHT = "screenHeight";
var SCREEN_WIDTH = "screenWidth";
var COLOR_DEPTH = "colorDepth";
var MBOX_PARAM = MBOX;
var SESSION_ID_PARAM = "mboxSession";
var DEVICE_ID_PARAM = "mboxPC";
var PAGE_ID_PARAM = "mboxPage";
var REQUEST_ID_PARAM = "mboxRid";
var VERSION_PARAM = "mboxVersion";
var COUNT_PARAM = "mboxCount";
var TIME_PARAM = "mboxTime";
var HOST_PARAM = "mboxHost";
var URL_PARAM = "mboxURL";
var REFERRER_PARAM = "mboxReferrer";
var CROSS_DOMAIN_PARAM = "mboxXDomain";
var DEVICE_ID_COOKIE = "PC";
var EDGE_CLUSTER_COOKIE = "mboxEdgeCluster";
var SESSION_ID_COOKIE = "session";


var TICK_EVENT = "at-tick";
var RENDER_COMPLETE_EVENT = "at-render-complete";
var TIMEOUT_EVENT = "at-timeout";
var NO_OFFERS_EVENT = "at-no-offers";
var SELECTORS_HIDDEN_EVENT = "at-selectors-hidden";
var LIBRARY_LOADED_EVENT = "at-library-loaded";
var GLOBAL_MBOX_FAILED_EVENT = "at-global-mbox-failed";
var TRACES_SUFFIX = "Traces";
var SETTINGS = "settings";
var CLIENT_TRACES = "client" + TRACES_SUFFIX;
var SERVER_TRACES = "server" + TRACES_SUFFIX;
var TRACES = "___target_traces";
var GLOBAL_SETTINGS = "targetGlobalSettings";
var DATA_PROVIDER = "dataProvider";
var DATA_PROVIDERS = DATA_PROVIDER + "s";
var TIMESTAMP = "timestamp";
var ENDPOINT = "endpoint";

var IP_V4_REGEX = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
var STANDARD_DOMAIN_REGEX = /^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i;
function isIPv4(domain) {
  return IP_V4_REGEX.test(domain);
}
function getCookieDomain(domain) {
  if (isIPv4(domain)) {
    return domain;
  }
  var parts = reverse(split(".", domain));
  var len = parts.length;
  if (len >= 3) {
    if (STANDARD_DOMAIN_REGEX.test(parts[1])) {
      return parts[2] + "." + parts[1] + "." + parts[0];
    }
  }
  if (len === 1) {
    return parts[0];
  }
  return parts[1] + "." + parts[0];
}

var config = {};
var overrides = [ENABLED, CLIENT_CODE, IMS_ORG_ID, SERVER_DOMAIN, COOKIE_DOMAIN, CROSS_DOMAIN, TIMEOUT, GLOBAL_MBOX_AUTO_CREATE, MBOX_PARAMS, GLOBAL_MBOX_PARAMS, DEFAULT_CONTENT_HIDDEN_STYLE, DEFAULT_CONTENT_VISIBLE_STYLE, BODY_HIDDEN_STYLE, BODY_HIDING_ENABLED, SELECTORS_POLLING_TIMEOUT, VISITOR_API_TIMEOUT, OVERRIDE_MBOX_EDGE_SERVER, OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT, OPTOUT_ENABLED, SECURE_ONLY, SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT, AUTHORING_SCRIPT_URL, REQUEST_METHOD, ENDPOINT];
function overrideSettingsIfRequired(settings, globalSettings) {
  if (!settings.enabled) {
    return;
  }
  forEach(function (field) {
    if (!isNil(globalSettings[field])) {
      settings[field] = globalSettings[field];
    }
  }, overrides);
}
function isIE10OrModernBrowser(doc) {
  var documentMode = doc.documentMode;
  return documentMode ? documentMode >= 10 : true;
}
function isStandardMode(doc) {
  var compatMode = doc.compatMode;
  return compatMode && compatMode === "CSS1Compat";
}
function overrideFromGlobalSettings(win, doc, settings) {
  settings[COOKIE_DOMAIN] = getCookieDomain(win.location.hostname);
  settings[ENABLED] = isStandardMode(doc) && isIE10OrModernBrowser(doc);
  overrideSettingsIfRequired(settings, win[GLOBAL_SETTINGS] || {});
}
function initConfig(settings) {
  overrideFromGlobalSettings(index$4, index$5, settings);
  config = index$1({}, settings);
  config[DEVICE_ID_LIFETIME] = settings[DEVICE_ID_LIFETIME] / 1000;
  config[SESSION_ID_LIFETIME] = settings[SESSION_ID_LIFETIME] / 1000;
  config[CROSS_DOMAIN_ONLY] = config[CROSS_DOMAIN] === "x-only";
  config[CROSS_DOMAIN_ENABLED] = config[CROSS_DOMAIN] !== "disabled";
  config[SCHEME] = config[SECURE_ONLY] ? "https:" : "";
}
function getConfig() {
  return config;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
	(function (factory) {
		var registeredInModuleLoader = false;
		if (typeof define === 'function' && define.amd) {
			define(factory);
			registeredInModuleLoader = true;
		}
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	})(function () {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
		function init(converter) {
			function api(key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
					if (!converter.write) {
						value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
					var stringifiedAttributes = '';
					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return document.cookie = key + '=' + value + stringifiedAttributes;
				}
				if (!key) {
					result = {};
				}
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
						if (key === name) {
							result = cookie;
							break;
						}
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
				return result;
			}
			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
			api.withConverter = init;
			return api;
		}
		return init(function () {});
	});
});

var cookie = js_cookie;
var index$6 = {
  get: cookie.get,
  set: cookie.set,
  remove: cookie.remove
};

var getCookie = index$6.get;

var setCookie = index$6.set;

var removeCookie = index$6.remove;

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
}

function encode(value) {
  try {
    return encodeURIComponent(value);
  } catch (e) {
    return value;
  }
}

var index$7 = function parseURI(str, opts) {
  opts = opts || {};
  var o = {
    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };
  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
  var uri = {};
  var i = 14;
  while (i--) {
    uri[o.key[i]] = m[i] || '';
  }uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
};

var ANCHOR = index$5.createElement(ANCHOR_TAG);
var CACHE = {};
function parseUri(url) {
  if (CACHE[url]) {
    return CACHE[url];
  }
  ANCHOR.href = url;
  CACHE[url] = index$7(ANCHOR.href);
  return CACHE[url];
}

function hasOwnProperty$3(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var decode$3 = function decode(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};
  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }
    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);
    if (!hasOwnProperty$3(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }
  return obj;
};

var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
    case 'string':
      return v;
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      return isFinite(v) ? v : '';
    default:
      return '';
  }
};
var encode$3 = function encode(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    return Object.keys(obj).map(function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }
  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var index$9 = createCommonjsModule(function (module, exports) {
  'use strict';
  exports.decode = exports.parse = decode$3;
  exports.encode = exports.stringify = encode$3;
});

var querystring = index$9;
var index$8 = {
  parse: function parse(string) {
    if (typeof string === 'string') {
      string = string.trim().replace(/^[?#&]/, '');
    }
    return querystring.parse(string);
  },
  stringify: function stringify(object) {
    return querystring.stringify(object);
  }
};

var parseQueryString = index$8.parse;

var stringifyQueryString = index$8.stringify;

function createCookie(name, value, expires) {
  return { name: name, value: value, expires: expires };
}
function deserialize(str) {
  var parts = split("#", str);
  if (isEmpty(parts) || parts.length < 3) {
    return null;
  }
  if (isNaN(parseInt(parts[2], 10))) {
    return null;
  }
  return createCookie(decode(parts[0]), decode(parts[1]), Number(parts[2]));
}
function getInternalCookies(cookieValue) {
  if (isBlank(cookieValue)) {
    return [];
  }
  return split("|", cookieValue);
}
function readCookies() {
  var cookies = map(deserialize, getInternalCookies(getCookie(MBOX_COOKIE)));
  var nowInSeconds = Math.ceil(Date.now() / 1000);
  var isExpired = function isExpired(cookie) {
    return isObject(cookie) && nowInSeconds <= cookie.expires;
  };
  return reduce(function (acc, cookie) {
    acc[cookie.name] = cookie;
    return acc;
  }, {}, filter(isExpired, cookies));
}

function getTargetCookie(name) {
  var cookiesMap = readCookies();
  var cookie = cookiesMap[name];
  return isObject(cookie) ? cookie.value : "";
}

function now() {
  return Date.now();
}
function serialize(cookie) {
  return [encode(cookie.name), encode(cookie.value), cookie.expires].join("#");
}
function getExpires(cookie) {
  return cookie.expires;
}
function getMaxExpires(cookies) {
  var expires = map(getExpires, cookies);
  return Math.max.apply(null, expires);
}
function saveCookies(cookiesMap, domain) {
  var cookies = toArray$1(cookiesMap);
  var maxExpires = Math.abs(getMaxExpires(cookies) * 1000 - now());
  var serializedCookies = map(serialize, cookies).join("|");
  var expires = new Date(now() + maxExpires);
  setCookie(MBOX_COOKIE, serializedCookies, { domain: domain, expires: expires });
}
function setTargetCookie(options) {
  var name = options.name,
      value = options.value,
      expires = options.expires,
      domain = options.domain;
  var cookiesMap = readCookies();
  cookiesMap[name] = createCookie(name, value, Math.ceil(expires + now() / 1000));
  saveCookies(cookiesMap, domain);
}

function isCookiePresent(name) {
  return isNotBlank(getCookie(name));
}
function isParamPresent(win, name) {
  var location = win.location;
  var search = location.search;
  var params = parseQueryString(search);
  return isNotBlank(params[name]);
}
function isRefParamPresent(doc, name) {
  var referrer = doc.referrer;
  var refParams = parseUri(referrer).queryKey;
  return isNil(refParams) ? false : isNotBlank(refParams[name]);
}
function exists$1(win, doc, name) {
  return isCookiePresent(name) || isParamPresent(win, name) || isRefParamPresent(doc, name);
}

function isCookieEnabled() {
  var _getConfig = getConfig(),
      cookieDomain = _getConfig.cookieDomain;
  setCookie(CHECK, TRUE, { domain: cookieDomain });
  var result = getCookie(CHECK) === TRUE;
  removeCookie(CHECK);
  return result;
}
function isDeliveryDisabled() {
  return exists$1(index$4, index$5, DISABLE);
}
function isDeliveryEnabled() {
  var _getConfig2 = getConfig(),
      enabled = _getConfig2.enabled;
  return enabled && isCookieEnabled() && !isDeliveryDisabled();
}
function isDebugEnabled() {
  return exists$1(index$4, index$5, DEBUG);
}
function isAuthoringEnabled() {
  return exists$1(index$4, index$5, AUTHORING);
}

var ADOBE_TARGET_PREFIX = "AT:";
function exists(win, method) {
  var console = win.console;
  return !isNil(console) && isFunction(console[method]);
}
function warn(win, args) {
  var console = win.console;
  if (!exists(win, "warn")) {
    return;
  }
  console.warn.apply(console, [ADOBE_TARGET_PREFIX].concat(args));
}
function debug(win, args) {
  var console = win.console;
  if (!exists(win, "debug")) {
    return;
  }
  if (isDebugEnabled()) {
    console.debug.apply(console, [ADOBE_TARGET_PREFIX].concat(args));
  }
}

function logWarn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  warn(index$4, args);
}
function logDebug() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  debug(index$4, args);
}

var TRACES_FORMAT_VERSION = "1";
var EXPORTED_SETTINGS = [ENABLED, CLIENT_CODE, IMS_ORG_ID, SERVER_DOMAIN, COOKIE_DOMAIN, CROSS_DOMAIN, TIMEOUT, GLOBAL_MBOX_AUTO_CREATE, MBOX_PARAMS, GLOBAL_MBOX_PARAMS, DEFAULT_CONTENT_HIDDEN_STYLE, DEFAULT_CONTENT_VISIBLE_STYLE, BODY_HIDDEN_STYLE, BODY_HIDING_ENABLED, SELECTORS_POLLING_TIMEOUT, VISITOR_API_TIMEOUT, OVERRIDE_MBOX_EDGE_SERVER, OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT, OPTOUT_ENABLED, SECURE_ONLY, SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT, AUTHORING_SCRIPT_URL];
function getSettings(config) {
  return reduce(function (acc, key) {
    acc[key] = config[key];
    return acc;
  }, {}, EXPORTED_SETTINGS);
}
function initialize(win, config, debugEnabled) {
  var result = win[TRACES] || [];
  if (debugEnabled) {
    var oldPush = result.push;
    result[VERSION] = TRACES_FORMAT_VERSION;
    result[SETTINGS] = getSettings(config);
    result[CLIENT_TRACES] = [];
    result[SERVER_TRACES] = [];
    result.push = function push(trace) {
      result[SERVER_TRACES].push(trace);
      oldPush.call(this, trace);
    };
  }
  win[TRACES] = result;
}
function saveTrace(win, debugEnabled, namespace, trace) {
  if (!debugEnabled) {
    return;
  }
  var entry = {};
  entry[TIMESTAMP] = Date.now();
  win[TRACES][namespace].push(index$1(entry, trace));
}

function initTraces() {
  initialize(index$4, getConfig(), isDebugEnabled());
}
function addTrace(namespace, trace) {
  saveTrace(index$4, isDebugEnabled(), namespace, trace);
}

function createValid() {
  var result = {};
  result[VALID] = true;
  return result;
}
function createInvalid(error) {
  var result = {};
  result[VALID] = false;
  result[ERROR] = error;
  return result;
}
function validateMbox(mbox) {
  if (isBlank(mbox)) {
    return createInvalid(MBOX_REQUIRED);
  }
  if (mbox.length > MBOX_LENGTH) {
    return createInvalid(MBOX_TOO_LONG);
  }
  return createValid();
}
function validateGetOfferOptions(options) {
  if (!isObject(options)) {
    return createInvalid(OPTIONS_REQUIRED);
  }
  var mbox = options[MBOX];
  var mboxValidation = validateMbox(mbox);
  if (!mboxValidation[VALID]) {
    return mboxValidation;
  }
  if (!isFunction(options[SUCCESS])) {
    return createInvalid(SUCCESS_REQUIRED);
  }
  if (!isFunction(options[ERROR])) {
    return createInvalid(ERROR_REQUIRED);
  }
  return createValid();
}
function validateApplyOfferOptions(options) {
  if (!isObject(options)) {
    return createInvalid(OPTIONS_REQUIRED);
  }
  var mbox = options[MBOX];
  var mboxValidation = validateMbox(mbox);
  if (!mboxValidation[VALID]) {
    return mboxValidation;
  }
  var offer = options[OFFER];
  if (!isArray(offer)) {
    return createInvalid(OFFER_REQUIRED);
  }
  return createValid();
}
function validateTrackEventOptions(options) {
  if (!isObject(options)) {
    return createInvalid(OPTIONS_REQUIRED);
  }
  var mbox = options[MBOX];
  var mboxValidation = validateMbox(mbox);
  if (!mboxValidation[VALID]) {
    return mboxValidation;
  }
  return createValid();
}
function validateRegisterExtensionOptions(options, exposedModules) {
  if (!isObject(options)) {
    return createInvalid(OPTIONS_REQUIRED);
  }
  var name = options[NAME];
  if (isBlank(name)) {
    return createInvalid(NAME_REQUIRED);
  }
  var parts = split(".", name);
  var isInvalid = function isInvalid(part) {
    return !LETTERS_ONLY_PATTERN.test(part);
  };
  if (!isEmpty(filter(isInvalid, parts))) {
    return createInvalid(NAME_INVALID);
  }
  var modules = options[MODULES];
  if (!isArray(modules) || isEmpty(modules)) {
    return createInvalid(MODULES_REQUIRED);
  }
  var isMissing = function isMissing(n) {
    return isNil(exposedModules[n]);
  };
  if (!isEmpty(filter(isMissing, modules))) {
    return createInvalid(MODULES_INVALID);
  }
  var registerFunc = options[REGISTER];
  if (!isFunction(registerFunc)) {
    return createInvalid(REGISTER_REQUIRED);
  }
  return createValid();
}

var SESSION_ID = uuid();
function saveSessionId(value, config) {
  setTargetCookie({
    name: SESSION_ID_COOKIE,
    value: value,
    expires: config[SESSION_ID_LIFETIME],
    domain: config[COOKIE_DOMAIN]
  });
}
function setSessionId(value) {
  var config = getConfig();
  if (config[CROSS_DOMAIN_ONLY]) {
    return;
  }
  saveSessionId(value, config);
}
function getSessionId() {
  var config = getConfig();
  if (config[CROSS_DOMAIN_ONLY]) {
    return SESSION_ID;
  }
  var sessionId = getTargetCookie(SESSION_ID_COOKIE);
  if (isBlank(sessionId)) {
    saveSessionId(SESSION_ID, config);
  }
  return getTargetCookie(SESSION_ID_COOKIE);
}

function setDeviceId(value) {
  var config = getConfig();
  if (config[CROSS_DOMAIN_ONLY]) {
    return;
  }
  setTargetCookie({
    name: DEVICE_ID_COOKIE,
    value: value,
    expires: config[DEVICE_ID_LIFETIME],
    domain: config[COOKIE_DOMAIN]
  });
}
function getDeviceId() {
  var config = getConfig();
  if (config[CROSS_DOMAIN_ONLY]) {
    return "";
  }
  return getTargetCookie(DEVICE_ID_COOKIE);
}

var CLUSTER_ID_REGEX = /.*\.(\d+)_\d+/;
function extractCluster(id) {
  var result = CLUSTER_ID_REGEX.exec(id);
  if (isEmpty(result) || result.length !== 2) {
    return "";
  }
  return result[1];
}
function getEdgeCluster() {
  var config = getConfig();
  if (!config[OVERRIDE_MBOX_EDGE_SERVER]) {
    return "";
  }
  var result = getCookie(EDGE_CLUSTER_COOKIE);
  return isBlank(result) ? "" : result;
}
function setEdgeCluster(id) {
  var config = getConfig();
  if (!config[OVERRIDE_MBOX_EDGE_SERVER]) {
    return;
  }
  var cluster = extractCluster(id);
  if (isBlank(cluster)) {
    return;
  }
  var expires = new Date(Date.now() + config[OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT]);
  setCookie(EDGE_CLUSTER_COOKIE, cluster, {
    domain: config[COOKIE_DOMAIN],
    expires: expires
  });
}

function bootstrapNotify(win, doc) {
  if (isFunction(win.CustomEvent)) {
    return;
  }
  function CustomEvent(event, params) {
    var evt = doc.createEvent("CustomEvent");
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = win.Event.prototype;
  win.CustomEvent = CustomEvent;
}
function createTracking(getSessionId, getDeviceId) {
  var sessionId = getSessionId();
  var deviceId = getDeviceId();
  var result = {};
  result.sessionId = sessionId;
  if (isNotBlank(deviceId)) {
    result.deviceId = deviceId;
    return result;
  }
  return result;
}
function notify(win, doc, eventName, detail) {
  var event = new win.CustomEvent(eventName, { detail: detail });
  doc.dispatchEvent(event);
}

bootstrapNotify(index$4, index$5);
var LIBRARY_LOADED = "at-library-loaded";
var REQUEST_START = "at-request-start";
var REQUEST_SUCCEEDED = "at-request-succeeded";
var REQUEST_FAILED$1 = "at-request-failed";
var CONTENT_RENDERING_START = "at-content-rendering-start";
var CONTENT_RENDERING_SUCCEEDED = "at-content-rendering-succeeded";
var CONTENT_RENDERING_FAILED = "at-content-rendering-failed";
var CONTENT_RENDERING_NO_OFFERS = "at-content-rendering-no-offers";
var CONTENT_RENDERING_REDIRECT = "at-content-rendering-redirect";
function notifyLibraryLoaded() {
  var payload = {
    type: LIBRARY_LOADED
  };
  notify(index$4, index$5, LIBRARY_LOADED, payload);
}
function notifyRequestStart(detail) {
  var payload = {
    type: REQUEST_START,
    mbox: detail.mbox,
    tracking: createTracking(getSessionId, getDeviceId)
  };
  notify(index$4, index$5, REQUEST_START, payload);
}
function notifyRequestSucceeded(detail) {
  var responseTokens = detail.responseTokens;
  var payload = {
    type: REQUEST_SUCCEEDED,
    mbox: detail.mbox,
    tracking: createTracking(getSessionId, getDeviceId)
  };
  if (!isEmpty(responseTokens)) {
    payload.responseTokens = responseTokens;
  }
  notify(index$4, index$5, REQUEST_SUCCEEDED, payload);
}
function notifyRequestFailed(detail) {
  notify(index$4, index$5, REQUEST_FAILED$1, {
    type: REQUEST_FAILED$1,
    mbox: detail.mbox,
    message: detail.message,
    tracking: createTracking(getSessionId, getDeviceId)
  });
}
function notifyRenderingStart(detail) {
  var payload = {
    type: CONTENT_RENDERING_START,
    mbox: detail.mbox,
    tracking: createTracking(getSessionId, getDeviceId)
  };
  notify(index$4, index$5, CONTENT_RENDERING_START, payload);
}
function notifyRenderingSucceeded(detail) {
  notify(index$4, index$5, CONTENT_RENDERING_SUCCEEDED, {
    type: CONTENT_RENDERING_SUCCEEDED,
    mbox: detail.mbox,
    tracking: createTracking(getSessionId, getDeviceId)
  });
}
function notifyRenderingFailed(detail) {
  notify(index$4, index$5, CONTENT_RENDERING_FAILED, {
    type: CONTENT_RENDERING_FAILED,
    mbox: detail.mbox,
    message: detail.message,
    selectors: detail.selectors,
    tracking: createTracking(getSessionId, getDeviceId)
  });
}
function notifyRenderingNoOffers(detail) {
  var payload = {
    type: CONTENT_RENDERING_NO_OFFERS,
    mbox: detail.mbox,
    tracking: createTracking(getSessionId, getDeviceId)
  };
  notify(index$4, index$5, CONTENT_RENDERING_NO_OFFERS, payload);
}
function notifyRenderingRedirect(detail) {
  var payload = {
    type: CONTENT_RENDERING_REDIRECT,
    mbox: detail.mbox,
    url: detail.url,
    tracking: createTracking(getSessionId, getDeviceId)
  };
  notify(index$4, index$5, CONTENT_RENDERING_REDIRECT, payload);
}

var promise = createCommonjsModule(function (module) {
  (function (root) {
    var setTimeoutFunc = setTimeout;
    function noop() {}
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }
    function Promise(fn) {
      if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      this._state = 0;
      this._handled = false;
      this._value = undefined;
      this._deferreds = [];
      doResolve(fn, this);
    }
    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise._immediateFn(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }
    function resolve(self, newValue) {
      try {
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }
    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }
    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function () {
          if (!self._handled) {
            Promise._unhandledRejectionFn(self._value);
          }
        });
      }
      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          resolve(self, value);
        }, function (reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      var prom = new this.constructor(noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };
    Promise.all = function (arr) {
      var args = Array.prototype.slice.call(arr);
      return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.resolve = function (value) {
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };
    Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
      setImmediate(fn);
    } || function (fn) {
      setTimeoutFunc(fn, 0);
    };
    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err);
      }
    };
    Promise._setImmediateFn = function _setImmediateFn(fn) {
      Promise._immediateFn = fn;
    };
    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
      Promise._unhandledRejectionFn = fn;
    };
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Promise;
    } else if (!root.Promise) {
      root.Promise = Promise;
    }
  })(commonjsGlobal);
});

var index$11 = window.Promise || promise;

var ARRAY_EXPECTED = "Expected an array of promises";
function create(func) {
  return new index$11(func);
}
function resolve(value) {
  return index$11.resolve(value);
}
function reject(value) {
  return index$11.reject(value);
}
function race(arr) {
  if (!isArray(arr)) {
    return reject(new TypeError(ARRAY_EXPECTED));
  }
  return index$11.race(arr);
}
function all(arr) {
  if (!isArray(arr)) {
    return reject(new TypeError(ARRAY_EXPECTED));
  }
  return index$11.all(arr);
}
function delayPromise(time) {
  var func = function func(res) {
    return delay(res, time);
  };
  return create(func);
}
function timeout(promise, time, message) {
  var delayedPromise = delayPromise(time).then(function () {
    throw new Error(message);
  });
  return race([promise, delayedPromise]);
}

var NETWORK_ERROR = "Network request failed";
var REQUEST_TIMEOUT = "Request timed out";
var URL_REQUIRED = "URL is required";
var GET = "GET";
var POST = "POST";
var METHOD = "method";
var URL$1 = "url";
var HEADERS = "headers";
var DATA$1 = "data";
var CREDENTIALS = "credentials";
var TIMEOUT$1 = "timeout";
function throwError(message) {
  throw new Error(message);
}
function processOptions(options) {
  var method = options[METHOD] || GET;
  var url = options[URL$1] || throwError(URL_REQUIRED);
  var headers = options[HEADERS] || {};
  var data = options[DATA$1] || null;
  var credentials = options[CREDENTIALS] || false;
  var timeout$$1 = options[TIMEOUT$1] || 3000;
  var result = {};
  result[METHOD] = method;
  result[URL$1] = url;
  result[HEADERS] = headers;
  result[DATA$1] = data;
  result[CREDENTIALS] = credentials;
  result[TIMEOUT$1] = timeout$$1;
  return result;
}
function addOnload(xhr, resolve$$1, reject$$1) {
  xhr.onload = function () {
    var status = xhr.status === 1223 ? 204 : xhr.status;
    if (status < 100 || status > 599) {
      reject$$1(new Error(NETWORK_ERROR));
      return;
    }
    var response = xhr.responseText;
    var headers = xhr.getAllResponseHeaders();
    resolve$$1({ status: status, headers: headers, response: response });
  };
  return xhr;
}
function addOnerror(xhr, reject$$1) {
  xhr.onerror = function () {
    reject$$1(new Error(NETWORK_ERROR));
  };
  return xhr;
}
function addOntimeout(xhr, timeout$$1, reject$$1) {
  xhr.timeout = timeout$$1;
  xhr.ontimeout = function () {
    reject$$1(new Error(REQUEST_TIMEOUT));
  };
  return xhr;
}
function addCredentials(xhr, credentials) {
  if (credentials === true) {
    xhr.withCredentials = credentials;
  }
  return xhr;
}
function addHeaders(xhr, headers) {
  forEach(function (value, key) {
    forEach(function (v) {
      return xhr.setRequestHeader(key, v);
    }, value);
  }, headers);
  return xhr;
}
function createXhrPromise(win, opts) {
  var options = processOptions(opts);
  var method = options[METHOD];
  var url = options[URL$1];
  var headers = options[HEADERS];
  var data = options[DATA$1];
  var credentials = options[CREDENTIALS];
  var timeout$$1 = options[TIMEOUT$1];
  return create(function (resolve$$1, reject$$1) {
    var xhr = new win.XMLHttpRequest();
    xhr = addOnload(xhr, resolve$$1, reject$$1);
    xhr = addOnerror(xhr, reject$$1);
    xhr.open(method, url, true);
    xhr = addCredentials(xhr, credentials);
    xhr = addHeaders(xhr, headers);
    xhr = addOntimeout(xhr, timeout$$1, reject$$1);
    xhr.send(data);
  });
}

function xhr(options) {
  return createXhrPromise(index$4, options);
}

function getErrorMessage(err) {
  if (isObject(err) && isNotBlank(err[ERROR])) {
    return err[ERROR];
  }
  if (!isNil(err) && isNotBlank(err[MESSAGE])) {
    return err[MESSAGE];
  }
  if (isNotBlank(err)) {
    return err;
  }
  return ERROR_UNKNOWN;
}
function createTrace(key, value) {
  var trace = {};
  trace[key] = value;
  return trace;
}
function createHttp(xhr, saveTrace) {
  return function (request) {
    saveTrace(CLIENT_TRACES, createTrace(REQUEST, request));
    return xhr(request).then(function (response) {
      saveTrace(CLIENT_TRACES, createTrace(RESPONSE, response));
      return response;
    })['catch'](function (error) {
      var err = {};
      err[MESSAGE] = getErrorMessage(error);
      saveTrace(CLIENT_TRACES, createTrace(ERROR, err));
      throw error;
    });
  };
}

var VISITOR = "Visitor";
var GET_INSTANCE_METHOD = "getInstance";
var IS_ALLOWED_METHOD = "isAllowed";
function getInstance(win, imsOrgId, sdidParamExpiry) {
  if (isBlank(imsOrgId)) {
    return null;
  }
  if (isNil(win[VISITOR])) {
    return null;
  }
  if (!isFunction(win[VISITOR][GET_INSTANCE_METHOD])) {
    return null;
  }
  var visitor = win[VISITOR][GET_INSTANCE_METHOD](imsOrgId, {
    sdidParamExpiry: sdidParamExpiry
  });
  if (isObject(visitor) && isFunction(visitor[IS_ALLOWED_METHOD]) && visitor[IS_ALLOWED_METHOD]()) {
    return visitor;
  }
  return null;
}

var TIMEOUT_MESSAGE = "Visitor API requests timed out";
var ERROR_MESSAGE = "Visitor API requests error";
var MID_METHOD = "getMarketingCloudVisitorID";
var AAMB_METHOD = "getAudienceManagerBlob";
var AID_METHOD = "getAnalyticsVisitorID";
var AAMLH_METHOD = "getAudienceManagerLocationHint";
var OPTOUT_METHOD = "isOptedOut";
var OPTOUT_PROP = "OptOut";
var MCAAMB = "MCAAMB";
var MCAAMLH = "MCAAMLH";
var MCAID = "MCAID";
var MCMID = "MCMID";
var MCOPTOUT = "MCOPTOUT";
function collectParams(arr) {
  return reduce(function (acc, value) {
    return index$1(acc, value);
  }, {}, arr);
}
function shouldUseOptout(win, visitor, optoutEnabled) {
  return optoutEnabled && isFunction(visitor[OPTOUT_METHOD]) && !isNil(win[VISITOR][OPTOUT_PROP]);
}
function createPair(key, value) {
  var result = {};
  result[key] = value;
  return result;
}
function getVisitorOptout(win, visitor, optoutEnabled) {
  if (!shouldUseOptout(win, visitor, optoutEnabled)) {
    return resolve(createPair(MCOPTOUT, false));
  }
  return create(function (res) {
    visitor[OPTOUT_METHOD](function (optout) {
      return res(createPair(MCOPTOUT, optout));
    }, win[VISITOR][OPTOUT_PROP].GLOBAL, true);
  });
}
function executeRequest(visitor, method, key) {
  if (!isFunction(visitor[method])) {
    return resolve({});
  }
  return create(function (res) {
    visitor[method](function (value) {
      return res(createPair(key, value));
    }, true);
  });
}
function executeRequests(win, visitor, optoutEnabled) {
  var requests = [executeRequest(visitor, MID_METHOD, MCMID), executeRequest(visitor, AAMB_METHOD, MCAAMB), executeRequest(visitor, AID_METHOD, MCAID), executeRequest(visitor, AAMLH_METHOD, MCAAMLH), getVisitorOptout(win, visitor, optoutEnabled)];
  return all(requests).then(collectParams);
}
function handleError(error) {
  logDebug(ERROR_MESSAGE, error);
  return {};
}
function getValues(win, visitor, visitorApiTimeout, optoutEnabled) {
  if (isNil(visitor)) {
    return resolve({});
  }
  var requests = executeRequests(win, visitor, optoutEnabled);
  return timeout(requests, visitorApiTimeout, TIMEOUT_MESSAGE)['catch'](handleError);
}

function isPair(pair) {
  return !isEmpty(pair) && pair.length === 2 && isNotBlank(pair[0]);
}
function createPair$1(param) {
  var index = param.indexOf("=");
  if (index === -1) {
    return [];
  }
  return [param.substr(0, index), param.substr(index + 1)];
}
function objectToParamsInternal(obj, ks, result, keyFunc) {
  forEach(function (value, key) {
    if (isObject(value)) {
      ks.push(key);
      objectToParamsInternal(value, ks, result, keyFunc);
      ks.pop();
    } else if (isEmpty(ks)) {
      result[keyFunc(key)] = value;
    } else {
      result[keyFunc(ks.concat(key).join("."))] = value;
    }
  }, obj);
}
function queryStringToParams(queryString) {
  return filter(function (value, key) {
    return isNotBlank(key);
  }, parseQueryString(queryString));
}
function arrayToParams(array) {
  var pairs = reduce(function (acc, param) {
    acc.push(createPair$1(param));
    return acc;
  }, [], filter(isNotBlank, array));
  return reduce(function (acc, pair) {
    acc[decode(trim(pair[0]))] = decode(trim(pair[1]));
    return acc;
  }, {}, filter(isPair, pairs));
}
function objectToParams(object, keyFunc) {
  var result = {};
  if (isNil(keyFunc)) {
    objectToParamsInternal(object, [], result, identity);
  } else {
    objectToParamsInternal(object, [], result, keyFunc);
  }
  return result;
}
function functionToParams(func) {
  if (!isFunction(func)) {
    return {};
  }
  var params = null;
  try {
    params = func();
  } catch (_ignore) {
    return {};
  }
  if (isNil(params)) {
    return {};
  }
  if (isArray(params)) {
    return arrayToParams(params);
  }
  if (isString(params) && isNotBlank(params)) {
    return queryStringToParams(params);
  }
  if (isObject(params)) {
    return objectToParams(params);
  }
  return {};
}

var PAGE_ID = uuid();
var COUNTER = 1;
function getPageId() {
  return PAGE_ID;
}
function getTime() {
  var now = new Date();
  return now.getTime() - now.getTimezoneOffset() * 60000;
}
function getPageParameters() {
  var config = getConfig();
  var location = index$4.location;
  var params = {};
  params[SESSION_ID_PARAM] = getSessionId();
  if (!config[CROSS_DOMAIN_ONLY]) {
    params[DEVICE_ID_PARAM] = getDeviceId();
  }
  params[PAGE_ID_PARAM] = getPageId();
  params[REQUEST_ID_PARAM] = uuid();
  params[VERSION_PARAM] = config[VERSION];
  params[COUNT_PARAM] = COUNTER;
  params[TIME_PARAM] = getTime();
  params[HOST_PARAM] = location.hostname;
  params[URL_PARAM] = location.href;
  params[REFERRER_PARAM] = index$5.referrer;
  if (config[CROSS_DOMAIN_ENABLED]) {
    params[CROSS_DOMAIN_PARAM] = config[CROSS_DOMAIN];
  }
  COUNTER += 1;
  return params;
}

function getBrowserParameters() {
  var screen = index$4.screen;
  var documentElement = index$5.documentElement;
  var result = {};
  result[BROWSER_HEIGHT] = documentElement.clientHeight;
  result[BROWSER_WIDTH] = documentElement.clientWidth;
  result[BROWSER_TIME_OFFSET] = -new Date().getTimezoneOffset();
  result[SCREEN_HEIGHT] = screen.height;
  result[SCREEN_WIDTH] = screen.width;
  result[COLOR_DEPTH] = screen.colorDepth;
  return result;
}

function getTargetPageParamsAll(mboxParams) {
  return index$1({}, mboxParams, functionToParams(index$4.targetPageParamsAll));
}
function getTargetPageParams(globalMboxParams) {
  return index$1({}, globalMboxParams, functionToParams(index$4.targetPageParams));
}
function getTargetPageParamsParameters(mboxName) {
  var config = getConfig();
  var globalMboxName = config[GLOBAL_MBOX_NAME];
  var mboxParams = config[MBOX_PARAMS];
  var globalMboxParams = config[GLOBAL_MBOX_PARAMS];
  if (globalMboxName !== mboxName) {
    return getTargetPageParamsAll(mboxParams || {});
  }
  return index$1(getTargetPageParamsAll(mboxParams || {}), getTargetPageParams(globalMboxParams || {}));
}

function getMboxParameters(mboxName, args) {
  var mboxParam = {};
  mboxParam[MBOX_PARAM] = mboxName;
  var argsParams = arrayToParams(args);
  var pageParams = getPageParameters();
  var browserParams = getBrowserParameters();
  var targetPageParams = getTargetPageParamsParameters(mboxName);
  return index$1({}, mboxParam, argsParams, pageParams, browserParams, targetPageParams);
}

function getGlobalMboxParameters() {
  var config = getConfig();
  var globalMboxName = config[GLOBAL_MBOX_NAME];
  var mboxParam = {};
  mboxParam[MBOX_PARAM] = globalMboxName;
  var pageParams = getPageParameters();
  var browserParams = getBrowserParameters();
  var targetPageParams = getTargetPageParamsParameters(globalMboxName);
  return index$1({}, mboxParam, pageParams, browserParams, targetPageParams);
}

var OPTOUT_MESSAGE = "Disabled due to optout";
var MCAID_PARAM = "mboxMCAVID";
var MCAAMB_PARAM = "mboxAAMB";
var MCAAMLH_PARAM = "mboxMCGLH";
var MCMID_PARAM = "mboxMCGVID";
var SDID_PARAM = "mboxMCSDID";
var SDID_METHOD = "getSupplementalDataID";
var CIDS_METHOD = "getCustomerIDs";
var TRCK_SERVER_PROP = "trackingServer";
var TRCK_SERVER_SECURE_PROP = TRCK_SERVER_PROP + "Secure";
var MBOX_PREFIX = "mbox";
var MC_PREFIX = "vst.";
var MC_TRCK_SERVER = MC_PREFIX + "trk";
var MC_TRCK_SERVER_SECURE = MC_PREFIX + "trks";
function buildKey(key) {
  return "" + MC_PREFIX + key;
}
function getCustomerIdsParams(visitor) {
  if (!isFunction(visitor[CIDS_METHOD])) {
    return {};
  }
  var customerIds = visitor[CIDS_METHOD]();
  if (!isObject(customerIds)) {
    return {};
  }
  return objectToParams(customerIds, buildKey);
}
function getTrackingServersParams(visitor) {
  var result = {};
  if (isNotBlank(visitor[TRCK_SERVER_PROP])) {
    result[MC_TRCK_SERVER] = visitor[TRCK_SERVER_PROP];
  }
  if (isNotBlank(visitor[TRCK_SERVER_SECURE_PROP])) {
    result[MC_TRCK_SERVER_SECURE] = visitor[TRCK_SERVER_SECURE_PROP];
  }
  return result;
}
function getSdidParams(visitor, mbox) {
  var result = {};
  if (!isFunction(visitor[SDID_METHOD])) {
    return {};
  }
  result[SDID_PARAM] = visitor[SDID_METHOD](MBOX_PREFIX + ":" + mbox);
  return result;
}
function createError$1() {
  return { status: ERROR, error: OPTOUT_MESSAGE };
}
function convertToParams(visitorValues) {
  var result = {};
  var mid = visitorValues[MCMID];
  var aid = visitorValues[MCAID];
  var aamb = visitorValues[MCAAMB];
  var aamlh = visitorValues[MCAAMLH];
  if (isNotBlank(mid)) {
    result[MCMID_PARAM] = visitorValues[MCMID];
  }
  if (isNotBlank(aid)) {
    result[MCAID_PARAM] = visitorValues[MCAID];
  }
  if (isNotBlank(aamb)) {
    result[MCAAMB_PARAM] = visitorValues[MCAAMB];
  }
  if (isNotBlank(aamlh)) {
    result[MCAAMLH_PARAM] = visitorValues[MCAAMLH];
  }
  return result;
}
function getSyncParameters(visitor, mbox) {
  if (isNil(visitor)) {
    return {};
  }
  var cidsParams = getCustomerIdsParams(visitor);
  var trckParams = getTrackingServersParams(visitor);
  var sdidParams = getSdidParams(visitor, mbox);
  return index$1({}, sdidParams, trckParams, cidsParams);
}
function getParameters(visitor, syncParams, values) {
  if (isNil(visitor)) {
    return resolve({});
  }
  if (values[MCOPTOUT] === true) {
    return reject(createError$1());
  }
  return resolve(index$1({}, syncParams, convertToParams(values)));
}

function getVisitorInstance() {
  var config = getConfig();
  var imsOrgId = config[IMS_ORG_ID];
  var sdidParamExpiry = config[SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT];
  return getInstance(index$4, imsOrgId, sdidParamExpiry);
}
function getVisitorValues() {
  var visitor = getVisitorInstance();
  var config = getConfig();
  var visitorApiTimeout = config[VISITOR_API_TIMEOUT];
  var optoutEnabled = config[OPTOUT_ENABLED];
  return getValues(index$4, visitor, visitorApiTimeout, optoutEnabled);
}
function getVisitorParameters(mbox) {
  var visitor = getVisitorInstance();
  var syncParams = getSyncParameters(visitor, mbox);
  var handleValues = function handleValues(values) {
    return getParameters(visitor, syncParams, values);
  };
  return getVisitorValues().then(handleValues);
}

var LOG_PREFIX = "Data provider";
var TIMED_OUT = "timed out";
var MAX_TIMEOUT = 2000;
function areDataProvidersPresent(win) {
  var globalSettings = win[GLOBAL_SETTINGS];
  if (isNil(globalSettings)) {
    return false;
  }
  var dataProviders = globalSettings[DATA_PROVIDERS];
  if (!isArray(dataProviders) || isEmpty(dataProviders)) {
    return false;
  }
  return true;
}
function isValidDataProvider(dataProvider) {
  var name = dataProvider[NAME];
  if (!isString(name) || isEmpty(name)) {
    return false;
  }
  var version = dataProvider[VERSION];
  if (!isString(version) || isEmpty(version)) {
    return false;
  }
  var wait = dataProvider[TIMEOUT];
  if (!isNil(wait) && !isNumber(wait)) {
    return false;
  }
  var provider = dataProvider[PROVIDER];
  if (!isFunction(provider)) {
    return false;
  }
  return true;
}
function createPromise(provider) {
  return create(function (success, error) {
    provider(function (err, params) {
      if (!isNil(err)) {
        error(err);
        return;
      }
      success(params);
    });
  });
}
function createTrace$1(nameKey, name, versionKey, version, resKey, res) {
  var dataProviderTrace = {};
  dataProviderTrace[nameKey] = name;
  dataProviderTrace[versionKey] = version;
  dataProviderTrace[resKey] = res;
  var result = {};
  result[DATA_PROVIDER] = dataProviderTrace;
  return result;
}
function convertToPromise(dataProvider) {
  var name = dataProvider[NAME];
  var version = dataProvider[VERSION];
  var wait = dataProvider[TIMEOUT] || MAX_TIMEOUT;
  var provider = dataProvider[PROVIDER];
  var promise = createPromise(provider);
  return timeout(promise, wait, TIMED_OUT).then(function (params) {
    var trace = createTrace$1(NAME, name, VERSION, version, PARAMS, params);
    logDebug(LOG_PREFIX, SUCCESS, trace);
    addTrace(CLIENT_TRACES, trace);
    return params;
  })['catch'](function (error) {
    var trace = createTrace$1(NAME, name, VERSION, version, ERROR, error);
    logDebug(LOG_PREFIX, ERROR, trace);
    addTrace(CLIENT_TRACES, trace);
    return {};
  });
}
function collectParams$1(arr) {
  return reduce(function (acc, value) {
    return index$1(acc, value);
  }, {}, arr);
}
function executeDataProviders(win) {
  if (!areDataProvidersPresent(win)) {
    return resolve({});
  }
  var dataProviders = win[GLOBAL_SETTINGS][DATA_PROVIDERS];
  var validProviders = filter(isValidDataProvider, dataProviders);
  return all(map(convertToPromise, validProviders)).then(collectParams$1);
}

function getDataProvidersParameters() {
  return executeDataProviders(index$4);
}

function saveSessionId$1(setSessionId, response) {
  var id = response.sessionId;
  if (isNotBlank(id)) {
    setSessionId(id);
  }
  return response;
}

function saveDeviceId(setDeviceId, response) {
  var id = response.tntId;
  if (isNotBlank(id)) {
    setDeviceId(id);
  }
  return response;
}

function saveEdgeCluster(setEdgeCluster, response) {
  var id = response.tntId;
  if (isNotBlank(id)) {
    setEdgeCluster(id);
  }
  return response;
}

function addTrace$1(win, trace) {
  win[TRACES].push(trace);
}
function saveTrace$1(win, response) {
  var trace = response.trace;
  if (isObject(trace)) {
    addTrace$1(win, trace);
  }
  return response;
}

function handleError$1(response) {
  var error = response[ERROR];
  if (isNotBlank(error)) {
    var exception = {};
    exception[STATUS] = ERROR;
    exception[ERROR] = error;
    throw exception;
  }
  return response;
}

var DISABLE_COOKIE = "mboxDisable";
var DISABLED = "disabled";
var DISABLED_DURATION = 86400000;
var DISABLED_MESSAGE = "3rd party cookies disabled";
function getDisabledMessage(disabled) {
  var message = disabled.message;
  return isBlank(message) ? DISABLED_MESSAGE : message;
}
function getDisabledDuration(disabled) {
  var duration = disabled.duration;
  return isNumber(duration) ? duration : DISABLED_DURATION;
}
function saveDisabledData(config, setCookie, disabled) {
  var cookieDomain = config[COOKIE_DOMAIN];
  var message = getDisabledMessage(disabled);
  var expires = new Date(Date.now() + getDisabledDuration(disabled));
  setCookie(DISABLE_COOKIE, message, { domain: cookieDomain, expires: expires });
}
function saveDisabled(config, setCookie, response) {
  var disabled = response.disabled;
  if (isObject(disabled)) {
    var exception = {};
    exception[STATUS] = DISABLED;
    exception[ERROR] = getDisabledMessage(disabled);
    saveDisabledData(config, setCookie, disabled);
    throw exception;
  }
  return response;
}

function isHtml(offer) {
  return isNotBlank(offer[HTML]);
}
function isJson(offer) {
  return isObject(offer[JSON$1]) || isArray(offer[JSON$1]);
}
function isRedirect(offer) {
  return isNotBlank(offer[REDIRECT]);
}
function isActions(offer) {
  return isArray(offer[ACTIONS]) && !isEmpty(offer[ACTIONS]);
}
function isDynamic(offer) {
  return isObject(offer[DYNAMIC]) && isNotBlank(offer[DYNAMIC][URL]);
}
function isDefault(offer) {
  return isNil(offer[HTML]) && isNil(offer[REDIRECT]) && isNil(offer[ACTIONS]) && isNil(offer[DYNAMIC]);
}
function hasClickToken(value) {
  return isNotBlank(value[CLICK_TOKEN]);
}
function hasPlugins(offer) {
  return isArray(offer[PLUGINS]) && !isEmpty(offer[PLUGINS]);
}

function createClickToken(offer) {
  if (hasClickToken(offer)) {
    var action = {};
    action[ACTION] = SIGNAL_CLICK;
    action[CLICK_TRACK_ID] = offer[CLICK_TOKEN];
    return [action];
  }
  return [];
}

function getHtml(offer) {
  if (hasPlugins(offer)) {
    return [offer.html].concat(offer.plugins);
  }
  return [offer.html];
}
function createHtml(offers) {
  var contents = filter(isHtml, offers);
  if (isEmpty(contents)) {
    return resolve([]);
  }
  var clickTrackActions = flatten(map(createClickToken, offers));
  var action = {};
  action[ACTION] = SET_CONTENT;
  action[CONTENT] = flatten(map(getHtml, contents)).join("");
  return resolve([action].concat(clickTrackActions));
}

function getJson(offer) {
  return offer[JSON$1];
}
function getContents(offers) {
  return reduce(function (acc, offer) {
    acc.push(getJson(offer));
    return acc;
  }, [], offers);
}
function createJson(offers) {
  var jsonOffers = filter(isJson, offers);
  if (isEmpty(jsonOffers)) {
    return resolve([]);
  }
  var action = {};
  action[ACTION] = SET_JSON;
  action[CONTENT] = getContents(jsonOffers);
  return resolve([action]);
}

function createRedirect(processRedirect, offer) {
  var action = { action: REDIRECT, url: offer[REDIRECT] };
  return resolve([processRedirect(action)]);
}

function createCustomCode(pluginCode) {
  return { action: CUSTOM_CODE, content: pluginCode };
}
function createPlugins(offer) {
  if (hasPlugins(offer)) {
    return map(createCustomCode, offer.plugins);
  }
  return [];
}

var CLICK_TRACK_PATTERN = /CLKTRK#(\S+)/;
var CLICK_TRACK_REPLACE_PATTERN = /CLKTRK#(\S+)\s/;
function getClickTrackNodeId(action) {
  var selector = action[SELECTOR];
  if (isBlank(selector)) {
    return "";
  }
  var result = CLICK_TRACK_PATTERN.exec(selector);
  if (isEmpty(result) || result.length !== 2) {
    return "";
  }
  return result[1];
}
function getContent(id, content) {
  var div = document.createElement(DIV_TAG);
  div.innerHTML = content;
  var firstElement = div.firstElementChild;
  if (isNil(firstElement)) {
    return content;
  }
  firstElement.id = id;
  return firstElement.outerHTML;
}
function processClickTrackId(action) {
  var content = action[CONTENT];
  var nodeId = getClickTrackNodeId(action);
  if (isBlank(nodeId) || isBlank(content)) {
    return action;
  }
  var selector = action[SELECTOR];
  action[SELECTOR] = selector.replace(CLICK_TRACK_REPLACE_PATTERN, "");
  action[CONTENT] = getContent(nodeId, content);
  return action;
}
function processAsset(action) {
  var value = action[VALUE];
  if (isBlank(value)) {
    return action;
  }
  action[CONTENT] = "<" + IMAGE_TAG + " " + SRC + "=\"" + value + "\" />";
  return action;
}

function setContent(action) {
  var result = processClickTrackId(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  var contentType = action[CONTENT_TYPE];
  if (TEXT === contentType) {
    action[ACTION] = SET_TEXT;
  }
  return action;
}

function appendContent(action) {
  var result = processClickTrackId(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function prependContent(action) {
  var result = processClickTrackId(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function replaceContent(action) {
  var result = processClickTrackId(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function insertBefore(action) {
  var result = processClickTrackId(processAsset(action));
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function insertAfter(action) {
  var result = processClickTrackId(processAsset(action));
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function customCode(action) {
  var content = action[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, action);
    return null;
  }
  return action;
}

function setAttribute(action) {
  var attribute = action[ATTRIBUTE];
  var value = action[VALUE];
  if (isBlank(attribute) || isBlank(value)) {
    logDebug(EMPTY_ATTRIBUTE, action);
    return null;
  }
  return action;
}

function setStyle(action) {
  var property = action[PROPERTY];
  var value = action[VALUE];
  if (isBlank(property) || isBlank(value)) {
    logDebug(EMPTY_PROPERTY, action);
    return null;
  }
  var style = {};
  style[property] = value;
  action[STYLE] = style;
  return action;
}

function resize(action) {
  var height = action[FINAL_HEIGHT];
  var width = action[FINAL_WIDTH];
  if (isBlank(height) || isBlank(width)) {
    logDebug(EMPTY_SIZES, action);
    return null;
  }
  var style = {};
  style[HEIGHT] = height;
  style[WIDTH] = width;
  action[ACTION] = SET_STYLE;
  action[STYLE] = style;
  return action;
}

function move(action) {
  var left = Number(action[FINAL_LEFT_POSITION]);
  var top = Number(action[FINAL_TOP_POSITION]);
  if (isNaN(left) || isNaN(top)) {
    logDebug(EMPTY_COORDINATES, action);
    return null;
  }
  var position = action[POSITION];
  var style = {};
  style[LEFT] = left;
  style[TOP] = top;
  if (isNotBlank(position)) {
    style[POSITION] = position;
  }
  action[ACTION] = SET_STYLE;
  action[STYLE] = style;
  return action;
}

function rearrange(action) {
  var from = Number(action[FROM]);
  var to = Number(action[TO]);
  if (isNaN(from) || isNaN(to)) {
    logDebug(EMPTY_REARRANGE, action);
    return null;
  }
  return action;
}

function redirect(processRedirect, action) {
  return processRedirect(action);
}

function trackClick(action) {
  var clickTrackId = action[CLICK_TRACK_ID];
  if (isBlank(clickTrackId)) {
    logDebug(EMPTY_CLICK_TRACK_ID, action);
    return null;
  }
  return action;
}

function transformAction(processRedirect, action) {
  var type = action[ACTION];
  switch (type) {
    case SET_CONTENT:
      return setContent(action);
    case APPEND_CONTENT:
      return appendContent(action);
    case PREPEND_CONTENT:
      return prependContent(action);
    case REPLACE_CONTENT:
      return replaceContent(action);
    case INSERT_BEFORE:
      return insertBefore(action);
    case INSERT_AFTER:
      return insertAfter(action);
    case CUSTOM_CODE:
      return customCode(action);
    case SET_ATTRIBUTE:
      return setAttribute(action);
    case SET_STYLE:
      return setStyle(action);
    case RESIZE:
      return resize(action);
    case MOVE:
      return move(action);
    case REMOVE:
      return action;
    case REARRANGE:
      return rearrange(action);
    case REDIRECT:
      return redirect(processRedirect, action);
    case TRACK_CLICK:
      return trackClick(action);
    default:
      return null;
  }
}
function processActions(processRedirect, actions) {
  var notNull = function notNull(action) {
    return !isNil(action);
  };
  return filter(notNull, map(function (action) {
    return transformAction(processRedirect, action);
  }, actions));
}
function createActions(processRedirect, offer) {
  return resolve([].concat(processActions(processRedirect, offer.actions), createPlugins(offer)));
}

function createUrl(url, params) {
  var parsedUri = parseUri(url);
  var protocol = parsedUri.protocol;
  var host = parsedUri.host;
  var path = parsedUri.path;
  var port = parsedUri.port === "" ? "" : ":" + parsedUri.port;
  var anchor = isBlank(parsedUri.anchor) ? "" : "#" + parsedUri.anchor;
  var uriParams = parsedUri.queryKey;
  var queryString = stringifyQueryString(index$1({}, uriParams, params));
  var query = isBlank(queryString) ? "" : "?" + queryString;
  return protocol + "://" + host + port + path + query + anchor;
}

function getDynamicParams(dynamic) {
  var result = {};
  forEach(function (param) {
    if (isNil(result[param.type])) {
      result[param.type] = {};
    }
    result[param.type][param.name] = param.defaultValue;
  }, dynamic[PARAMS]);
  return result;
}
function getRequestParams(dynamicParams) {
  if (isNil(dynamicParams[REQUEST])) {
    return {};
  }
  return dynamicParams[REQUEST];
}
function isMboxParam(name) {
  return name.indexOf(MBOX) !== -1;
}
function getMboxParams(dynamicParams) {
  var mboxParams = {};
  if (isNil(dynamicParams[MBOX])) {
    return mboxParams;
  }
  forEach(function (value, key) {
    if (isMboxParam(key)) {
      return;
    }
    mboxParams[key] = value;
  }, dynamicParams[MBOX]);
  return mboxParams;
}
function modifyParams(first$$1, second) {
  forEach(function (_, key) {
    var value = second[key];
    if (isNil(value)) {
      return;
    }
    first$$1[key] = value;
  }, first$$1);
}
function processParams(dynamicRequestParams, requestParams, dynamicMboxParams, mboxParams) {
  modifyParams(dynamicRequestParams, requestParams);
  modifyParams(dynamicMboxParams, mboxParams);
  return index$1({}, dynamicRequestParams, dynamicMboxParams);
}
function createOptions(url, params, timeout) {
  var result = {};
  result[METHOD] = GET;
  result[URL$1] = createUrl(url, params);
  result[TIMEOUT$1] = timeout;
  return result;
}
function isSuccess$1(status) {
  return status >= 200 && status < 300 || status === 304;
}
function createAction(resObj, offer) {
  var status = resObj[STATUS];
  if (!isSuccess$1(status)) {
    return [];
  }
  var content = resObj[RESPONSE];
  if (isBlank(content)) {
    return [];
  }
  var action = {};
  action[ACTION] = SET_CONTENT;
  action[CONTENT] = content;
  return [action].concat(createClickToken(offer), createPlugins(offer));
}
function createDynamic(win, xhr$$1, request, offer) {
  var dynamic = offer[DYNAMIC];
  var dynamicParams = getDynamicParams(dynamic);
  var dynamicRequestParams = getRequestParams(dynamicParams);
  var dynamicMboxParams = getMboxParams(dynamicParams);
  var requestParams = parseQueryString(win.location.search);
  var mboxParams = request[PARAMS];
  var url = dynamic[URL$1];
  var params = processParams(dynamicRequestParams, requestParams, dynamicMboxParams, mboxParams);
  var timeout = request[TIMEOUT$1];
  var processResponse = function processResponse(resObj) {
    return createAction(resObj, offer);
  };
  return xhr$$1(createOptions(url, params, timeout)).then(processResponse)['catch'](function () {
    return [];
  });
}

function createDefault(offer) {
  return resolve([].concat(createClickToken(offer), createPlugins(offer)));
}

function getActions(win, xhr, processRedirect, request, offers) {
  var result = [];
  forEach(function (offer) {
    if (isRedirect(offer)) {
      result.push(createRedirect(processRedirect, offer));
      return;
    }
    if (isActions(offer)) {
      result.push(createActions(processRedirect, offer));
      return;
    }
    if (isDynamic(offer)) {
      result.push(createDynamic(win, xhr, request, offer));
      return;
    }
    if (isDefault(offer)) {
      result.push(createDefault(offer));
      return;
    }
  }, offers);
  return result.concat(createHtml(offers), createJson(offers));
}
function getResponseTokens(offers) {
  var result = [];
  forEach(function (offer) {
    var tokens = offer[RESPONSE_TOKENS];
    if (!isObject(tokens)) {
      return;
    }
    result.push(tokens);
  }, offers);
  return result;
}
function createResult(actions, responseTokens) {
  var result = {};
  result[ACTIONS] = actions;
  result[RESPONSE_TOKENS] = responseTokens;
  return result;
}
function processOffers(win, xhr, processRedirect, request, response) {
  var offers = response[OFFERS];
  if (!isArray(offers)) {
    return resolve(createResult([], []));
  }
  var actions = getActions(win, xhr, processRedirect, request, offers);
  var responseTokens = getResponseTokens(offers);
  var createResponse = function createResponse(actions) {
    return createResult(actions, responseTokens);
  };
  return all(actions).then(flatten).then(createResponse);
}

var SESSION_ID_PARAM$1 = "mboxSession";
var ADOBE_MC_REF_PARAM = "adobe_mc_ref";
var SUPPLEMENTAL_DATA_ID_URL_FUNC = "appendSupplementalDataIDTo";
var TRUE$1 = "true";
function addRedirectParams(visitor, url) {
  if (isNil(visitor)) {
    return url;
  }
  if (!isFunction(visitor[SUPPLEMENTAL_DATA_ID_URL_FUNC])) {
    return url;
  }
  return visitor[SUPPLEMENTAL_DATA_ID_URL_FUNC](url);
}
function handleRedirect(win, doc, getSessionId, getVisitorInstance, action) {
  var url = action[URL];
  if (isBlank(url)) {
    logDebug(EMPTY_URL, action);
    return null;
  }
  var includeParams = String(action[INCLUDE_ALL_URL_PARAMETERS]) === TRUE$1;
  var includeSession = String(action[PASS_MBOX_SESSION]) === TRUE$1;
  var params = {};
  params[ADOBE_MC_REF_PARAM] = doc.referrer;
  if (includeParams) {
    params = index$1(params, parseQueryString(win.location.search));
  }
  if (includeSession) {
    params[SESSION_ID_PARAM$1] = getSessionId();
  }
  action[URL] = addRedirectParams(getVisitorInstance(), createUrl(url, params));
  return action;
}

var CONTENT_TYPE$1 = "Content-Type";
var FORM_URL_ENCODED$1 = "application/x-www-form-urlencoded";
var JSON_ERROR = "JSON parser error";
var EDGE_SERVER_PREFIX = "mboxedge";
var CLIENT_CODE_VAR = "<clientCode>";
var JSON_ENDPOINT_PATTERN = "/m2/" + CLIENT_CODE_VAR + "/mbox/json";
var SCHEME_SEPARATOR = "//";
function getServerDomain(getCluster, clientCode, serverDomain, overrideMboxEdgeServer) {
  if (!overrideMboxEdgeServer) {
    return serverDomain;
  }
  var cluster = getCluster();
  if (isBlank(cluster)) {
    return serverDomain;
  }
  return serverDomain.replace(clientCode, "" + EDGE_SERVER_PREFIX + cluster);
}
function getPath(clientCode) {
  return JSON_ENDPOINT_PATTERN.replace(CLIENT_CODE_VAR, clientCode);
}
function getUrl(config, getCluster) {
  var clientCode = config[CLIENT_CODE];
  var serverDomain = config[SERVER_DOMAIN];
  var overrideMboxEdgeServer = config[OVERRIDE_MBOX_EDGE_SERVER];
  var scheme = config[SCHEME];
  return [scheme, SCHEME_SEPARATOR, getServerDomain(getCluster, clientCode, serverDomain, overrideMboxEdgeServer), getPath(clientCode)].join("");
}
function isSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}
function createError(message) {
  var result = {};
  result[STATUS] = ERROR;
  result[ERROR] = message;
  return result;
}
function transform(config, win, http, processRedirect, request, response) {
  var handleSessionId = function handleSessionId(res) {
    return saveSessionId$1(setSessionId, res);
  };
  var handleDeviceId = function handleDeviceId(res) {
    return saveDeviceId(setDeviceId, res);
  };
  var handleEdgeCluster = function handleEdgeCluster(res) {
    return saveEdgeCluster(setEdgeCluster, res);
  };
  var handleTrace = function handleTrace(res) {
    return saveTrace$1(win, res);
  };
  var handleDisabled = function handleDisabled(res) {
    return saveDisabled(config, setCookie, res);
  };
  var handleOffers = function handleOffers(res) {
    return processOffers(win, http, processRedirect, request, res);
  };
  return resolve(response).then(handleSessionId).then(handleDeviceId).then(handleEdgeCluster).then(handleTrace).then(handleError$1).then(handleDisabled).then(handleOffers);
}
function createHeaders() {
  var result = {};
  result[CONTENT_TYPE$1] = [FORM_URL_ENCODED$1];
  return result;
}
function createAjaxOptions(config, getCluster, marketingCloudData, request) {
  var requestMethod = config[REQUEST_METHOD];
  var crossDomainOnly = config[CROSS_DOMAIN_ONLY];
  var url = getUrl(config, getCluster);
  var params = index$1({}, request[PARAMS], marketingCloudData);
  var result = {};
  result[CREDENTIALS] = true;
  result[TIMEOUT$1] = request[TIMEOUT$1];
  if (crossDomainOnly || requestMethod === GET) {
    result[METHOD] = GET;
    result[URL$1] = url + "?" + stringifyQueryString(params);
    return result;
  }
  result[METHOD] = POST;
  result[URL$1] = url;
  result[HEADERS] = createHeaders();
  result[DATA$1] = stringifyQueryString(params);
  return result;
}
function processAjaxResponse(resObj) {
  var status = resObj[STATUS];
  if (!isSuccess(status)) {
    return createError(ERROR_UNKNOWN);
  }
  try {
    return JSON.parse(resObj[RESPONSE]);
  } catch (e) {
    return createError(e.message || JSON_ERROR);
  }
}
function mergeParameters(arr) {
  return index$1({}, arr[0], arr[1]);
}
function executeAjax(win, doc, config, http, request) {
  var mbox = request[MBOX];
  var buildOptions = function buildOptions(marketingCloudData) {
    return createAjaxOptions(config, getEdgeCluster, marketingCloudData, request);
  };
  var processRedirect = function processRedirect(action) {
    return handleRedirect(win, doc, getSessionId, getVisitorInstance, action);
  };
  var transformResponse = function transformResponse(response) {
    return transform(config, win, http, processRedirect, request, response);
  };
  return all([getVisitorParameters(mbox), getDataProvidersParameters()]).then(mergeParameters).then(buildOptions).then(http).then(processAjaxResponse).then(transformResponse);
}

function ajax(request) {
  var config = getConfig();
  var http = createHttp(xhr, addTrace);
  return executeAjax(index$4, index$5, config, http, request);
}

var GET_OFFER = "[getOffer()]";
function getErrorMessage$1(err) {
  if (isObject(err) && isNotBlank(err[ERROR])) {
    return err[ERROR];
  }
  if (isObject(err) && isNotBlank(err[MESSAGE])) {
    return err[MESSAGE];
  }
  if (isNotBlank(err)) {
    return err;
  }
  return ERROR_UNKNOWN;
}
function createRequest(config, options) {
  var mbox = options[MBOX];
  var params = isObject(options[PARAMS]) ? options[PARAMS] : {};
  var timeout = options[TIMEOUT];
  var request = {};
  request[MBOX] = mbox;
  request[PARAMS] = index$1({}, getMboxParameters(mbox), params);
  request[TIMEOUT] = isNumber(timeout) && timeout >= 0 ? timeout : config[TIMEOUT];
  return request;
}
function handleRequestSuccess(requestSucceeded, options, response) {
  var actions = response[ACTIONS];
  var payload = {};
  payload[MBOX] = options[MBOX];
  payload[RESPONSE_TOKENS] = response[RESPONSE_TOKENS];
  logDebug(GET_OFFER, ACTIONS_TO_BE_RENDERED, actions);
  options[SUCCESS](actions);
  requestSucceeded(payload);
}
function handleRequestError(requestFailed, options, error) {
  var status = error[STATUS] || UNKNOWN;
  var message = getErrorMessage$1(error);
  var payload = {};
  payload[MBOX] = options[MBOX];
  payload[MESSAGE] = message;
  logWarn(GET_OFFER, REQUEST_FAILED, error);
  options[ERROR](status, message);
  requestFailed(payload);
}
function executeGeOffer(isDeliveryEnabled, validateGetOfferOptions, ajax, requestStart, requestSucceeded, requestFailed, config, options) {
  if (!isDeliveryEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  var validationResult = validateGetOfferOptions(options);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(GET_OFFER, validationError);
    return;
  }
  var payload = {};
  payload[MBOX] = options[MBOX];
  var successFunc = function successFunc(response) {
    return handleRequestSuccess(requestSucceeded, options, response);
  };
  var errorFunc = function errorFunc(error) {
    return handleRequestError(requestFailed, options, error);
  };
  requestStart(payload);
  ajax(createRequest(config, options)).then(successFunc)['catch'](errorFunc);
}

function getOffer(options) {
  executeGeOffer(isDeliveryEnabled, validateGetOfferOptions, ajax, notifyRequestStart, notifyRequestSucceeded, notifyRequestFailed, getConfig(), options);
}

var $ = ((function (window) {
  var Zepto = function () {
    var undefined,
        key,
        $,
        classList,
        emptyArray = [],
        _concat = emptyArray.concat,
        _filter = emptyArray.filter,
        _slice = emptyArray.slice,
        document = window.document,
        elementDisplay = {},
        classCache = {},
        cssNumber = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1
    },
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rootNodeRE = /^(?:body|html)$/i,
        capitalRE = /([A-Z])/g,
    methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        adjacencyOperators = ["after", "prepend", "before", "append"],
        table = document.createElement("table"),
        tableRow = document.createElement("tr"),
        containers = {
      tr: document.createElement("tbody"),
      tbody: table,
      thead: table,
      tfoot: table,
      td: tableRow,
      th: tableRow,
      "*": document.createElement("div")
    },
        readyRE = /complete|loaded|interactive/,
        simpleSelectorRE = /^[\w-]*$/,
        class2type = {},
        toString = class2type.toString,
        zepto = {},
        camelize,
        uniq,
        tempParent = document.createElement("div"),
        propMap = {
      tabindex: "tabIndex",
      readonly: "readOnly",
      'for': "htmlFor",
      'class': "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
        isArray = Array.isArray || function (object) {
      return object instanceof Array;
    };
    zepto.matches = function (element, selector) {
      if (!selector || !element || element.nodeType !== 1) return false;
      var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
      if (matchesSelector) return matchesSelector.call(element, selector);
      var match,
          parent = element.parentNode,
          temp = !parent;
      if (temp) (parent = tempParent).appendChild(element);
      match = ~zepto.qsa(parent, selector).indexOf(element);
      temp && tempParent.removeChild(element);
      return match;
    };
    function type(obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    }
    function isFunction(value) {
      return type(value) == "function";
    }
    function isWindow(obj) {
      return obj != null && obj == obj.window;
    }
    function isDocument(obj) {
      return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    }
    function isObject(obj) {
      return type(obj) == "object";
    }
    function isPlainObject(obj) {
      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    function likeArray(obj) {
      var length = !!obj && "length" in obj && obj.length,
          type = $.type(obj);
      return "function" != type && !isWindow(obj) && ("array" == type || length === 0 || typeof length == "number" && length > 0 && length - 1 in obj);
    }
    function compact(array) {
      return _filter.call(array, function (item) {
        return item != null;
      });
    }
    function flatten(array) {
      return array.length > 0 ? $.fn.concat.apply([], array) : array;
    }
    camelize = function camelize(str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : "";
      });
    };
    function dasherize(str) {
      return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }
    uniq = function uniq(array) {
      return _filter.call(array, function (item, idx) {
        return array.indexOf(item) == idx;
      });
    };
    function classRE(name) {
      return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
    }
    function maybeAddPx(name, value) {
      return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
    }
    function defaultDisplay(nodeName) {
      var element, display;
      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, "").getPropertyValue("display");
        element.parentNode.removeChild(element);
        display == "none" && (display = "block");
        elementDisplay[nodeName] = display;
      }
      return elementDisplay[nodeName];
    }
    function _children(element) {
      return "children" in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
        if (node.nodeType == 1) return node;
      });
    }
    function Z(dom, selector) {
      var i,
          len = dom ? dom.length : 0;
      for (i = 0; i < len; i++) {
        this[i] = dom[i];
      }this.length = len;
      this.selector = selector || "";
    }
    zepto.fragment = function (html, name, properties) {
      var dom, nodes, container;
      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
      if (!dom) {
        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
        if (!(name in containers)) name = "*";
        container = containers[name];
        container.innerHTML = "" + html;
        dom = $.each(_slice.call(container.childNodes), function () {
          container.removeChild(this);
        });
      }
      if (isPlainObject(properties)) {
        nodes = $(dom);
        $.each(properties, function (key, value) {
          if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
        });
      }
      return dom;
    };
    zepto.Z = function (dom, selector) {
      return new Z(dom, selector);
    };
    zepto.isZ = function (object) {
      return object instanceof zepto.Z;
    };
    zepto.init = function (selector, context) {
      var dom;
      if (!selector) return zepto.Z();else if (typeof selector == "string") {
        selector = selector.trim();
        if (selector[0] == "<" && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;else if (context !== undefined)
          return $(context).find(selector);else
          dom = zepto.qsa(document, selector);
      } else if (isFunction(selector))
        return $(document).ready(selector);else if (zepto.isZ(selector))
        return selector;else {
        if (isArray(selector)) dom = compact(selector);else if (isObject(selector))
          dom = [selector], selector = null;else if (fragmentRE.test(selector))
          dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;else if (context !== undefined)
          return $(context).find(selector);else
          dom = zepto.qsa(document, selector);
      }
      return zepto.Z(dom, selector);
    };
    $ = function $(selector, context) {
      return zepto.init(selector, context);
    };
    function extend(target, source, deep) {
      for (key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
          extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) target[key] = source[key];
      }
    }
    $.extend = function (target) {
      var deep,
          args = _slice.call(arguments, 1);
      if (typeof target == "boolean") {
        deep = target;
        target = args.shift();
      }
      args.forEach(function (arg) {
        extend(target, arg, deep);
      });
      return target;
    };
    zepto.qsa = function (element, selector) {
      var found,
          maybeID = selector[0] == "#",
          maybeClass = !maybeID && selector[0] == ".",
          nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly);
      return element.getElementById && isSimple && maybeID
      ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11 ? [] : _slice.call(isSimple && !maybeID && element.getElementsByClassName
      ? maybeClass ? element.getElementsByClassName(nameOnly)
      : element.getElementsByTagName(selector)
      : element.querySelectorAll(selector)
      );
    };
    function filtered(nodes, selector) {
      return selector == null ? $(nodes) : $(nodes).filter(selector);
    }
    $.contains = document.documentElement.contains ? function (parent, node) {
      return parent !== node && parent.contains(node);
    } : function (parent, node) {
      while (node && (node = node.parentNode)) {
        if (node === parent) return true;
      }return false;
    };
    function funcArg(context, arg, idx, payload) {
      return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }
    function setAttribute(node, name, value) {
      value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
    }
    function className(node, value) {
      var klass = node.className || "",
          svg = klass && klass.baseVal !== undefined;
      if (value === undefined) return svg ? klass.baseVal : klass;
      svg ? klass.baseVal = value : node.className = value;
    }
    function deserializeValue(value) {
      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
      } catch (e) {
        return value;
      }
    }
    $.type = type;
    $.isFunction = isFunction;
    $.isWindow = isWindow;
    $.isArray = isArray;
    $.isPlainObject = isPlainObject;
    $.isEmptyObject = function (obj) {
      var name;
      for (name in obj) {
        return false;
      }return true;
    };
    $.isNumeric = function (val) {
      var num = Number(val),
          type = typeof val === "undefined" ? "undefined" : _typeof(val);
      return val != null && type != "boolean" && (type != "string" || val.length) && !isNaN(num) && isFinite(num) || false;
    };
    $.inArray = function (elem, array, i) {
      return emptyArray.indexOf.call(array, elem, i);
    };
    $.camelCase = camelize;
    $.trim = function (str) {
      return str == null ? "" : String.prototype.trim.call(str);
    };
    $.uuid = 0;
    $.support = {};
    $.expr = {};
    $.noop = function () {};
    $.map = function (elements, callback) {
      var value,
          values = [],
          i,
          key;
      if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) values.push(value);
      } else for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) values.push(value);
      }
      return flatten(values);
    };
    $.each = function (elements, callback) {
      var i, key;
      if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++) {
          if (callback.call(elements[i], i, elements[i]) === false) return elements;
        }
      } else {
        for (key in elements) {
          if (callback.call(elements[key], key, elements[key]) === false) return elements;
        }
      }
      return elements;
    };
    $.grep = function (elements, callback) {
      return _filter.call(elements, callback);
    };
    if (window.JSON) $.parseJSON = JSON.parse;
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    });
    $.fn = {
      constructor: zepto.Z,
      length: 0,
      forEach: emptyArray.forEach,
      reduce: emptyArray.reduce,
      push: emptyArray.push,
      sort: emptyArray.sort,
      splice: emptyArray.splice,
      indexOf: emptyArray.indexOf,
      concat: function concat() {
        var i,
            value,
            args = [];
        for (i = 0; i < arguments.length; i++) {
          value = arguments[i];
          args[i] = zepto.isZ(value) ? value.toArray() : value;
        }
        return _concat.apply(zepto.isZ(this) ? this.toArray() : this, args);
      },
      map: function map(fn) {
        return $($.map(this, function (el, i) {
          return fn.call(el, i, el);
        }));
      },
      slice: function slice() {
        return $(_slice.apply(this, arguments));
      },
      ready: function ready(callback) {
        if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener("DOMContentLoaded", function () {
          callback($);
        }, false);
        return this;
      },
      get: function get$$1(idx) {
        return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
      },
      toArray: function toArray$$1() {
        return this.get();
      },
      size: function size() {
        return this.length;
      },
      remove: function remove() {
        return this.each(function () {
          if (this.parentNode != null) this.parentNode.removeChild(this);
        });
      },
      each: function each(callback) {
        var len = this.length,
            idx = 0,
            el;
        while (idx < len) {
          el = this[idx];
          if (callback.call(el, idx, el) === false) {
            break;
          }
          idx++;
        }
        return this;
      },
      filter: function filter(selector) {
        if (isFunction(selector)) return this.not(this.not(selector));
        return $(_filter.call(this, function (element) {
          return zepto.matches(element, selector);
        }));
      },
      add: function add(selector, context) {
        return $(uniq(this.concat($(selector, context))));
      },
      is: function is(selector) {
        return this.length > 0 && zepto.matches(this[0], selector);
      },
      not: function not(selector) {
        var nodes = [];
        if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
          if (!selector.call(this, idx)) nodes.push(this);
        });else {
          var excludes = typeof selector == "string" ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
          this.forEach(function (el) {
            if (excludes.indexOf(el) < 0) nodes.push(el);
          });
        }
        return $(nodes);
      },
      has: function has(selector) {
        return this.filter(function () {
          return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
        });
      },
      eq: function eq(idx) {
        return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
      },
      first: function first() {
        var el = this[0];
        return el && !isObject(el) ? el : $(el);
      },
      last: function last() {
        var el = this[this.length - 1];
        return el && !isObject(el) ? el : $(el);
      },
      find: function find(selector) {
        var result,
            $this = this;
        if (!selector) result = $();else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) == "object") result = $(selector).filter(function () {
          var node = this;
          return emptyArray.some.call($this, function (parent) {
            return $.contains(parent, node);
          });
        });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
          return zepto.qsa(this, selector);
        });
        return result;
      },
      closest: function closest(selector, context) {
        var nodes = [],
            collection = (typeof selector === "undefined" ? "undefined" : _typeof(selector)) == "object" && $(selector);
        this.each(function (_, node) {
          while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
            node = node !== context && !isDocument(node) && node.parentNode;
          }if (node && nodes.indexOf(node) < 0) nodes.push(node);
        });
        return $(nodes);
      },
      parents: function parents(selector) {
        var ancestors = [],
            nodes = this;
        while (nodes.length > 0) {
          nodes = $.map(nodes, function (node) {
            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
              ancestors.push(node);
              return node;
            }
          });
        }return filtered(ancestors, selector);
      },
      parent: function parent(selector) {
        return filtered(uniq(this.pluck("parentNode")), selector);
      },
      children: function children(selector) {
        return filtered(this.map(function () {
          return _children(this);
        }), selector);
      },
      contents: function contents() {
        return this.map(function () {
          return this.contentDocument || _slice.call(this.childNodes);
        });
      },
      siblings: function siblings(selector) {
        return filtered(this.map(function (i, el) {
          return _filter.call(_children(el.parentNode), function (child) {
            return child !== el;
          });
        }), selector);
      },
      empty: function empty() {
        return this.each(function () {
          this.innerHTML = "";
        });
      },
      pluck: function pluck(property) {
        return $.map(this, function (el) {
          return el[property];
        });
      },
      show: function show() {
        return this.each(function () {
          this.style.display == "none" && (this.style.display = "");
          if (getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
        });
      },
      replaceWith: function replaceWith(newContent) {
        return this.before(newContent).remove();
      },
      wrap: function wrap(structure) {
        var func = isFunction(structure);
        if (this[0] && !func) var dom = $(structure).get(0),
            clone = dom.parentNode || this.length > 1;
        return this.each(function (index) {
          $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
        });
      },
      wrapAll: function wrapAll(structure) {
        if (this[0]) {
          $(this[0]).before(structure = $(structure));
          var children;
          while ((children = structure.children()).length) {
            structure = children.first();
          }$(structure).append(this);
        }
        return this;
      },
      wrapInner: function wrapInner(structure) {
        var func = isFunction(structure);
        return this.each(function (index) {
          var self = $(this),
              contents = self.contents(),
              dom = func ? structure.call(this, index) : structure;
          contents.length ? contents.wrapAll(dom) : self.append(dom);
        });
      },
      unwrap: function unwrap() {
        this.parent().each(function () {
          $(this).replaceWith($(this).children());
        });
        return this;
      },
      clone: function clone() {
        return this.map(function () {
          return this.cloneNode(true);
        });
      },
      hide: function hide() {
        return this.css("display", "none");
      },
      toggle: function toggle(setting) {
        return this.each(function () {
          var el = $(this);
          (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
        });
      },
      prev: function prev(selector) {
        return $(this.pluck("previousElementSibling")).filter(selector || "*");
      },
      next: function next(selector) {
        return $(this.pluck("nextElementSibling")).filter(selector || "*");
      },
      html: function html(_html) {
        return 0 in arguments ? this.each(function (idx) {
          var originHtml = this.innerHTML;
          $(this).empty().append(funcArg(this, _html, idx, originHtml));
        }) : 0 in this ? this[0].innerHTML : null;
      },
      text: function text(_text) {
        return 0 in arguments ? this.each(function (idx) {
          var newText = funcArg(this, _text, idx, this.textContent);
          this.textContent = newText == null ? "" : "" + newText;
        }) : 0 in this ? this.pluck("textContent").join("") : null;
      },
      attr: function attr(name, value) {
        var result;
        return typeof name == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined : this.each(function (idx) {
          if (this.nodeType !== 1) return;
          if (isObject(name)) for (key in name) {
            setAttribute(this, key, name[key]);
          } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
        });
      },
      removeAttr: function removeAttr(name) {
        return this.each(function () {
          this.nodeType === 1 && name.split(" ").forEach(function (attribute) {
            setAttribute(this, attribute);
          }, this);
        });
      },
      prop: function prop(name, value) {
        name = propMap[name] || name;
        return 1 in arguments ? this.each(function (idx) {
          this[name] = funcArg(this, value, idx, this[name]);
        }) : this[0] && this[0][name];
      },
      removeProp: function removeProp(name) {
        name = propMap[name] || name;
        return this.each(function () {
          delete this[name];
        });
      },
      data: function data(name, value) {
        var attrName = "data-" + name.replace(capitalRE, "-$1").toLowerCase();
        var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
        return data !== null ? deserializeValue(data) : undefined;
      },
      val: function val(value) {
        if (0 in arguments) {
          if (value == null) value = "";
          return this.each(function (idx) {
            this.value = funcArg(this, value, idx, this.value);
          });
        } else {
          return this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function () {
            return this.selected;
          }).pluck("value") : this[0].value);
        }
      },
      offset: function offset(coordinates) {
        if (coordinates) return this.each(function (index) {
          var $this = $(this),
              coords = funcArg(this, coordinates, index, $this.offset()),
              parentOffset = $this.offsetParent().offset(),
              props = {
            top: coords.top - parentOffset.top,
            left: coords.left - parentOffset.left
          };
          if ($this.css("position") == "static") props["position"] = "relative";
          $this.css(props);
        });
        if (!this.length) return null;
        if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0])) return { top: 0, left: 0 };
        var obj = this[0].getBoundingClientRect();
        return {
          left: obj.left + window.pageXOffset,
          top: obj.top + window.pageYOffset,
          width: Math.round(obj.width),
          height: Math.round(obj.height)
        };
      },
      css: function css(property, value) {
        if (arguments.length < 2) {
          var element = this[0];
          if (typeof property == "string") {
            if (!element) return;
            return element.style[camelize(property)] || getComputedStyle(element, "").getPropertyValue(property);
          } else if (isArray(property)) {
            if (!element) return;
            var props = {};
            var computedStyle = getComputedStyle(element, "");
            $.each(property, function (_, prop) {
              props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
            });
            return props;
          }
        }
        var css = "";
        if (type(property) == "string") {
          if (!value && value !== 0) this.each(function () {
            this.style.removeProperty(dasherize(property));
          });else css = dasherize(property) + ":" + maybeAddPx(property, value);
        } else {
          for (key in property) {
            if (!property[key] && property[key] !== 0) this.each(function () {
              this.style.removeProperty(dasherize(key));
            });else css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";";
          }
        }
        return this.each(function () {
          this.style.cssText += ";" + css;
        });
      },
      index: function index(element) {
        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
      },
      hasClass: function hasClass(name) {
        if (!name) return false;
        return emptyArray.some.call(this, function (el) {
          return this.test(className(el));
        }, classRE(name));
      },
      addClass: function addClass(name) {
        if (!name) return this;
        return this.each(function (idx) {
          if (!("className" in this)) return;
          classList = [];
          var cls = className(this),
              newName = funcArg(this, name, idx, cls);
          newName.split(/\s+/g).forEach(function (klass) {
            if (!$(this).hasClass(klass)) classList.push(klass);
          }, this);
          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
        });
      },
      removeClass: function removeClass(name) {
        return this.each(function (idx) {
          if (!("className" in this)) return;
          if (name === undefined) return className(this, "");
          classList = className(this);
          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
            classList = classList.replace(classRE(klass), " ");
          });
          className(this, classList.trim());
        });
      },
      toggleClass: function toggleClass(name, when) {
        if (!name) return this;
        return this.each(function (idx) {
          var $this = $(this),
              names = funcArg(this, name, idx, className(this));
          names.split(/\s+/g).forEach(function (klass) {
            (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
          });
        });
      },
      scrollTop: function scrollTop(value) {
        if (!this.length) return;
        var hasScrollTop = "scrollTop" in this[0];
        if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
        return this.each(hasScrollTop ? function () {
          this.scrollTop = value;
        } : function () {
          this.scrollTo(this.scrollX, value);
        });
      },
      scrollLeft: function scrollLeft(value) {
        if (!this.length) return;
        var hasScrollLeft = "scrollLeft" in this[0];
        if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
        return this.each(hasScrollLeft ? function () {
          this.scrollLeft = value;
        } : function () {
          this.scrollTo(value, this.scrollY);
        });
      },
      position: function position() {
        if (!this.length) return;
        var elem = this[0],
        offsetParent = this.offsetParent(),
        offset = this.offset(),
            parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
        offset.top -= parseFloat($(elem).css("margin-top")) || 0;
        offset.left -= parseFloat($(elem).css("margin-left")) || 0;
        parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
        parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0;
        return {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        };
      },
      offsetParent: function offsetParent() {
        return this.map(function () {
          var parent = this.offsetParent || document.body;
          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
            parent = parent.offsetParent;
          }return parent;
        });
      }
    };
    $.fn.detach = $.fn.remove;
    ["width", "height"].forEach(function (dimension) {
      var dimensionProperty = dimension.replace(/./, function (m) {
        return m[0].toUpperCase();
      });
      $.fn[dimension] = function (value) {
        var offset,
            el = this[0];
        if (value === undefined) return isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
          el = $(this);
          el.css(dimension, funcArg(this, value, idx, el[dimension]()));
        });
      };
    });
    function traverseNode(node, fun) {
      fun(node);
      for (var i = 0, len = node.childNodes.length; i < len; i++) {
        traverseNode(node.childNodes[i], fun);
      }
    }
    adjacencyOperators.forEach(function (operator, operatorIndex) {
      var inside = operatorIndex % 2;
      $.fn[operator] = function () {
        var argType,
            nodes = $.map(arguments, function (arg) {
          var arr = [];
          argType = type(arg);
          if (argType == "array") {
            arg.forEach(function (el) {
              if (el.nodeType !== undefined) return arr.push(el);else if ($.zepto.isZ(el)) return arr = arr.concat(el.get());
              arr = arr.concat(zepto.fragment(el));
            });
            return arr;
          }
          return argType == "object" || arg == null ? arg : zepto.fragment(arg);
        }),
            parent,
            copyByClone = this.length > 1;
        if (nodes.length < 1) return this;
        return this.each(function (_, target) {
          parent = inside ? target : target.parentNode;
          target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
          var parentInDocument = $.contains(document.documentElement, parent);
          var SCRIPT_TYPES = /^(text|application)\/(javascript|ecmascript)$/;
          nodes.forEach(function (node) {
            if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();
            parent.insertBefore(node, target);
            if (parentInDocument) traverseNode(node, function (el) {
              if (el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || SCRIPT_TYPES.test(el.type.toLowerCase())) && !el.src) {
                var target = el.ownerDocument ? el.ownerDocument.defaultView : window;
                target["eval"].call(target, el.innerHTML);
              }
            });
          });
        });
      };
      $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function (html) {
        $(html)[operator](this);
        return this;
      };
    });
    zepto.Z.prototype = Z.prototype = $.fn;
    zepto.uniq = uniq;
    zepto.deserializeValue = deserializeValue;
    $.zepto = zepto;
    return $;
  }();
  (function ($) {
    var _zid = 1,
        undefined,
        slice = Array.prototype.slice,
        isFunction = $.isFunction,
        isString = function isString(obj) {
      return typeof obj == "string";
    },
        handlers = {},
        specialEvents = {},
        focusinSupported = "onfocusin" in window,
        focus = { focus: "focusin", blur: "focusout" },
        hover = { mouseenter: "mouseover", mouseleave: "mouseout" };
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";
    function zid(element) {
      return element._zid || (element._zid = _zid++);
    }
    function findHandlers(element, event, fn, selector) {
      event = parse(event);
      if (event.ns) var matcher = matcherFor(event.ns);
      return (handlers[zid(element)] || []).filter(function (handler) {
        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
      });
    }
    function parse(event) {
      var parts = ("" + event).split(".");
      return {
        e: parts[0],
        ns: parts.slice(1).sort().join(" ")
      };
    }
    function matcherFor(ns) {
      return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
    }
    function eventCapture(handler, captureSetting) {
      return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
    }
    function realEvent(type) {
      return hover[type] || focusinSupported && focus[type] || type;
    }
    function add(element, events, fn, data, selector, delegator, capture) {
      var id = zid(element),
          set$$1 = handlers[id] || (handlers[id] = []);
      events.split(/\s/).forEach(function (event) {
        if (event == "ready") return $(document).ready(fn);
        var handler = parse(event);
        handler.fn = fn;
        handler.sel = selector;
        if (handler.e in hover) fn = function fn(e) {
          var related = e.relatedTarget;
          if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
        };
        handler.del = delegator;
        var callback = delegator || fn;
        handler.proxy = function (e) {
          e = compatible(e);
          if (e.isImmediatePropagationStopped()) return;
          e.data = data;
          var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
          if (result === false) e.preventDefault(), e.stopPropagation();
          return result;
        };
        handler.i = set$$1.length;
        set$$1.push(handler);
        if ("addEventListener" in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
      });
    }
    function remove(element, events, fn, selector, capture) {
      var id = zid(element);
      (events || "").split(/\s/).forEach(function (event) {
        findHandlers(element, event, fn, selector).forEach(function (handler) {
          delete handlers[id][handler.i];
          if ("removeEventListener" in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
        });
      });
    }
    $.event = { add: add, remove: remove };
    $.proxy = function (fn, context) {
      var args = 2 in arguments && slice.call(arguments, 2);
      if (isFunction(fn)) {
        var proxyFn = function proxyFn() {
          return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
        };
        proxyFn._zid = zid(fn);
        return proxyFn;
      } else if (isString(context)) {
        if (args) {
          args.unshift(fn[context], fn);
          return $.proxy.apply(null, args);
        } else {
          return $.proxy(fn[context], fn);
        }
      } else {
        throw new TypeError("expected function");
      }
    };
    $.fn.bind = function (event, data, callback) {
      return this.on(event, data, callback);
    };
    $.fn.unbind = function (event, callback) {
      return this.off(event, callback);
    };
    $.fn.one = function (event, selector, data, callback) {
      return this.on(event, selector, data, callback, 1);
    };
    var returnTrue = function returnTrue() {
      return true;
    },
        returnFalse = function returnFalse() {
      return false;
    },
        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
        eventMethods = {
      preventDefault: "isDefaultPrevented",
      stopImmediatePropagation: "isImmediatePropagationStopped",
      stopPropagation: "isPropagationStopped"
    };
    function compatible(event, source) {
      if (source || !event.isDefaultPrevented) {
        source || (source = event);
        $.each(eventMethods, function (name, predicate) {
          var sourceMethod = source[name];
          event[name] = function () {
            this[predicate] = returnTrue;
            return sourceMethod && sourceMethod.apply(source, arguments);
          };
          event[predicate] = returnFalse;
        });
        try {
          event.timeStamp || (event.timeStamp = Date.now());
        } catch (ignored) {}
        if (source.defaultPrevented !== undefined ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
      }
      return event;
    }
    function createProxy(event) {
      var key,
          proxy = { originalEvent: event };
      for (key in event) {
        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
      }return compatible(proxy, event);
    }
    $.fn.delegate = function (selector, event, callback) {
      return this.on(event, selector, callback);
    };
    $.fn.undelegate = function (selector, event, callback) {
      return this.off(event, selector, callback);
    };
    $.fn.live = function (event, callback) {
      $(document.body).delegate(this.selector, event, callback);
      return this;
    };
    $.fn.die = function (event, callback) {
      $(document.body).undelegate(this.selector, event, callback);
      return this;
    };
    $.fn.on = function (event, selector, data, callback, one) {
      var autoRemove,
          delegator,
          $this = this;
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.on(type, selector, data, fn, one);
        });
        return $this;
      }
      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
      if (callback === undefined || data === false) callback = data, data = undefined;
      if (callback === false) callback = returnFalse;
      return $this.each(function (_, element) {
        if (one) autoRemove = function autoRemove(e) {
          remove(element, e.type, callback);
          return callback.apply(this, arguments);
        };
        if (selector) delegator = function delegator(e) {
          var evt,
              match = $(e.target).closest(selector, element).get(0);
          if (match && match !== element) {
            evt = $.extend(createProxy(e), {
              currentTarget: match,
              liveFired: element
            });
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
          }
        };
        add(element, event, callback, data, selector, delegator || autoRemove);
      });
    };
    $.fn.off = function (event, selector, callback) {
      var $this = this;
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.off(type, selector, fn);
        });
        return $this;
      }
      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;
      if (callback === false) callback = returnFalse;
      return $this.each(function () {
        remove(this, event, callback, selector);
      });
    };
    $.fn.trigger = function (event, args) {
      event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
      event._args = args;
      return this.each(function () {
        if (event.type in focus && typeof this[event.type] == "function") this[event.type]();else if ("dispatchEvent" in this)
          this.dispatchEvent(event);else $(this).triggerHandler(event, args);
      });
    };
    $.fn.triggerHandler = function (event, args) {
      var e, result;
      this.each(function (i, element) {
        e = createProxy(isString(event) ? $.Event(event) : event);
        e._args = args;
        e.target = element;
        $.each(findHandlers(element, event.type || event), function (i, handler) {
          result = handler.proxy(e);
          if (e.isImmediatePropagationStopped()) return false;
        });
      });
      return result;
    };
    ("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function (event) {
      $.fn[event] = function (callback) {
        return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
      };
    });
    $.Event = function (type, props) {
      if (!isString(type)) props = type, type = props.type;
      var event = document.createEvent(specialEvents[type] || "Events"),
          bubbles = true;
      if (props) for (var name in props) {
        name == "bubbles" ? bubbles = !!props[name] : event[name] = props[name];
      }event.initEvent(type, bubbles, true);
      return compatible(event);
    };
  })(Zepto);
  (function () {
    try {
      getComputedStyle(undefined);
    } catch (e) {
      var nativeGetComputedStyle = getComputedStyle;
      window.getComputedStyle = function (element, pseudoElement) {
        try {
          return nativeGetComputedStyle(element, pseudoElement);
        } catch (e) {
          return null;
        }
      };
    }
  })();
  (function ($) {
    var zepto = $.zepto,
        oldQsa = zepto.qsa,
        childRe = /^\s*>/,
        classTag = "Zepto" + +new Date();
    zepto.qsa = function (node, selector) {
      var sel = selector,
          nodes,
          taggedParent;
      try {
        if (!sel) sel = "*";else if (childRe.test(sel))
          taggedParent = $(node).addClass(classTag), sel = "." + classTag + " " + sel;
        nodes = oldQsa(node, sel);
      } catch (e) {
        throw e;
      } finally {
        if (taggedParent) taggedParent.removeClass(classTag);
      }
      return nodes;
    };
  })(Zepto);
  return Zepto;
}))(window);

var EQ_START = ":eq(";
var EQ_END = ")";
var EQ_LENGTH = EQ_START.length;
var DIGIT_IN_SELECTOR_PATTERN = /((\.|#)\d{1})/g;
function createPair$2(match) {
  return {
    key: match,
    val: match.charAt(0) + "\\3" + match.charAt(1) + " "
  };
}
function escapeDigitsInSelector(selector) {
  var matches = selector.match(DIGIT_IN_SELECTOR_PATTERN);
  if (isEmpty(matches)) {
    return selector;
  }
  var pairs = map(createPair$2, matches);
  return reduce(function (acc, pair) {
    return acc.replace(pair.key, pair.val);
  }, selector, pairs);
}
function parseSelector(selector) {
  var result = [];
  var sel = trim(selector);
  var currentIndex = sel.indexOf(EQ_START);
  var head = void 0;
  var tail = void 0;
  var eq = void 0;
  var index = void 0;
  while (currentIndex !== -1) {
    head = trim(sel.substring(0, currentIndex));
    tail = trim(sel.substring(currentIndex));
    index = tail.indexOf(EQ_END);
    eq = trim(tail.substring(EQ_LENGTH, index));
    sel = trim(tail.substring(index + 1));
    currentIndex = sel.indexOf(EQ_START);
    if (head && eq) {
      result.push({ sel: head, eq: Number(eq) });
    }
  }
  if (sel) {
    result.push({ sel: sel });
  }
  return result;
}
function select(selector) {
  if (isElement(selector)) {
    return $(selector);
  }
  if (!isString(selector)) {
    return $(selector);
  }
  var selectorAsString = escapeDigitsInSelector(selector);
  if (selectorAsString.indexOf(EQ_START) === -1) {
    return $(selectorAsString);
  }
  var parts = parseSelector(selectorAsString);
  return reduce(function (acc, part) {
    var sel = part.sel,
        eq = part.eq;
    acc = acc.find(sel);
    if (isNumber(eq)) {
      acc = acc.eq(eq);
    }
    return acc;
  }, $(index$5), parts);
}
function exists$2(selector) {
  return select(selector).length > 0;
}
function fragment(content) {
  return $("<" + DIV_TAG + "/>").append(content);
}
function wrap(content) {
  return $(content);
}
function prev(selector) {
  return select(selector).prev();
}
function next(selector) {
  return select(selector).next();
}
function parent(selector) {
  return select(selector).parent();
}
function is(query, selector) {
  return select(selector).is(query);
}
function find(query, selector) {
  return select(selector).find(query);
}
function children(selector) {
  return select(selector).children();
}

function trigger(type, selector) {
  return select(selector).trigger(type);
}
function listen(type, func, selector) {
  return select(selector).on(type, func);
}

function getAttr(name, selector) {
  return select(selector).attr(name);
}
function setAttr(name, value, selector) {
  return select(selector).attr(name, value);
}
function removeAttr(name, selector) {
  return select(selector).removeAttr(name);
}
function copyAttr(from, to, selector) {
  var value = getAttr(from, selector);
  if (isNotBlank(value)) {
    removeAttr(from, selector);
    setAttr(to, value, selector);
  }
}
function hasAttr(name, selector) {
  return isNotBlank(getAttr(name, selector));
}

var TARGET_BLANK = "_blank";
var CURRENT_TARGET = "currentTarget";
var TARGET = "target";
var HAS_META_KEY = "hasMetaKey";
var HREF = "href";
function isInPageNavigation(win, url) {
  var uri = parseUri(url);
  return (url === "#" || isNotBlank(uri.anchor)) && uri.host === win.location.hostname && uri.port === win.location.port && uri.protocol.slice(0, 4) === "http";
}
function isSubmitElement(target) {
  var type = getAttr(TYPE, target);
  if (is(INPUT_TAG, target) && isNotBlank(type) && type.toLowerCase() === SUBMIT) {
    return true;
  }
  if (is(BUTTON_TAG, target) && isNotBlank(type) && type.toLowerCase() === SUBMIT) {
    return true;
  }
  if (is(BUTTON_TAG, target) && isBlank(type)) {
    return true;
  }
  return false;
}
function hasTargetBlank(element) {
  return element[TARGET] === TARGET_BLANK;
}
function isLinkClick(eventDetails) {
  return eventDetails[TYPE] === CLICK && is(ANCHOR_TAG, eventDetails[CURRENT_TARGET]);
}
function isFormSubmit(eventDetails) {
  return eventDetails[TYPE] === SUBMIT && is(FORM_TAG, eventDetails[CURRENT_TARGET]);
}
function isFormSubmitViaClick(eventDetails) {
  var target = eventDetails[TARGET];
  var currentTarget = eventDetails[CURRENT_TARGET];
  var type = eventDetails[TYPE];
  return type === CLICK && target !== currentTarget && isSubmitElement(target);
}
function willUnloadCurrentPage(win, eventDetails) {
  var currentTarget = eventDetails[CURRENT_TARGET];
  var type = eventDetails[TYPE];
  var hasMetaKey = eventDetails[HAS_META_KEY];
  var href = getAttr(HREF, currentTarget);
  if (isBlank(href)) {
    return false;
  }
  return type === CLICK && !isInPageNavigation(win, href) && !hasTargetBlank(currentTarget) && !hasMetaKey;
}
function shouldTrackBySelector(options) {
  return isNotBlank(options[TYPE]) && (isNotBlank(options[SELECTOR]) || isElement(options[SELECTOR]));
}
function containsMetaKey(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.which > 1;
}
function shouldPreventDefault(win, eventDetails) {
  var currentTarget = eventDetails[CURRENT_TARGET];
  if (isLinkClick(eventDetails) && willUnloadCurrentPage(win, eventDetails)) {
    return true;
  }
  if (isFormSubmitViaClick(eventDetails) && !hasTargetBlank(currentTarget)) {
    return true;
  }
  if (isFormSubmit(eventDetails) && !hasTargetBlank(currentTarget)) {
    return true;
  }
  return false;
}

function getErrorMessage$2(err) {
  if (isObject(err) && isNotBlank(err[ERROR])) {
    return err[ERROR];
  }
  if (isObject(err) && isNotBlank(err[MESSAGE])) {
    return err[MESSAGE];
  }
  if (isNotBlank(err)) {
    return err;
  }
  return ERROR_UNKNOWN;
}
function createSuccessCallback(options) {
  return function () {
    logDebug(TRACK_EVENT_SUCCESS, options);
    options[SUCCESS]();
  };
}
function createErrorCallback(options) {
  return function (data) {
    var status = data[STATUS] || UNKNOWN;
    var message = getErrorMessage$2(data);
    logWarn(TRACK_EVENT_ERROR, options, data);
    options[ERROR](status, message);
  };
}
function normalizeOptions(config, options) {
  var mbox = options[MBOX];
  var result = index$1({}, options);
  var params = isObject(options[PARAMS]) ? options[PARAMS] : {};
  var configTimeout = config[TIMEOUT];
  var timeout = options[TIMEOUT];
  result[PARAMS] = index$1({}, getMboxParameters(mbox), params);
  result[TIMEOUT] = isNumber(timeout) && timeout >= 0 ? timeout : configTimeout;
  result[SUCCESS] = isFunction(options[SUCCESS]) ? options[SUCCESS] : noop;
  result[ERROR] = isFunction(options[ERROR]) ? options[ERROR] : noop;
  return result;
}
function fireRequest(http, options, success, error) {
  var request = {};
  request[MBOX] = options[MBOX];
  request[PARAMS] = options[PARAMS];
  request[TIMEOUT] = options[TIMEOUT];
  http(request, success, error);
}

function createAnchorPostProcessing(win, trigger, eventDetails) {
  var link = eventDetails[CURRENT_TARGET];
  return function () {
    trigger(CLICK, parent(link));
    win.location[HREF] = link[HREF];
  };
}
function createFormPostProcessing(trigger, eventDetails) {
  var form = eventDetails[CURRENT_TARGET];
  return function () {
    trigger(SUBMIT, parent(form));
    form.submit();
  };
}
function createFormClickPostProcessing(trigger, eventDetails) {
  var form = eventDetails[CURRENT_TARGET];
  return function () {
    trigger(CLICK, parent(form));
    form.submit();
  };
}
function createPostProcessing(win, trigger, eventDetails) {
  if (isLinkClick(eventDetails) && willUnloadCurrentPage(win, eventDetails)) {
    return createAnchorPostProcessing(win, trigger, eventDetails);
  }
  if (isFormSubmitViaClick(eventDetails) && !hasTargetBlank(eventDetails[CURRENT_TARGET])) {
    return createFormClickPostProcessing(trigger, eventDetails);
  }
  if (isFormSubmit(eventDetails) && !hasTargetBlank(eventDetails[CURRENT_TARGET])) {
    return createFormPostProcessing(trigger, eventDetails);
  }
  return noop;
}

function handleEventSuccess(win, trigger, options, eventDetails) {
  var handleSuccess = createSuccessCallback(options);
  handleSuccess();
  var handleEventPostProcessing = createPostProcessing(win, trigger, eventDetails);
  handleEventPostProcessing();
}
function handleEventError(win, trigger, options, eventDetails, data) {
  var handleError = createErrorCallback(options);
  handleError(data);
  var handleEventPostProcessing = createPostProcessing(win, trigger, eventDetails);
  handleEventPostProcessing();
}
function fireEventRequest(win, http, trigger, options, event) {
  var currentTarget = event[CURRENT_TARGET];
  var eventDetails = {};
  eventDetails[TARGET] = event[TARGET];
  eventDetails[CURRENT_TARGET] = currentTarget;
  eventDetails[TYPE] = event[TYPE];
  eventDetails[HAS_META_KEY] = containsMetaKey(event);
  var success = function success() {
    return handleEventSuccess(win, trigger, options, eventDetails);
  };
  var error = function error(data) {
    return handleEventError(win, trigger, options, eventDetails, data);
  };
  fireRequest(http, options, success, error);
  if (shouldPreventDefault(win, eventDetails)) {
    return false;
  }
  return !options.preventDefault;
}
function trackBySelector(win, http, trigger, listen, options) {
  var selector = options[SELECTOR];
  var type = options[TYPE];
  forEach(function (element) {
    listen(type, function (event) {
      return fireEventRequest(win, http, trigger, options, event);
    }, element);
  }, toArray$1(select(selector)));
}

function trackImmediate(http, options) {
  fireRequest(http, options, createSuccessCallback(options), createErrorCallback(options));
}

var TRACK_EVENT = "[trackEvent()]";
function executeTrackEvent(win, config, http, trigger, listen, isDeliveryEnabled, trackBySelector, trackImmediate, options) {
  if (!isDeliveryEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  var validationResult = validateTrackEventOptions(options);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(TRACK_EVENT, validationError);
    return;
  }
  var trackEventOptions = normalizeOptions(config, options);
  if (shouldTrackBySelector(trackEventOptions)) {
    trackBySelector(win, http, trigger, listen, trackEventOptions);
    return;
  }
  trackImmediate(http, trackEventOptions);
}
function createHttp$2(ajax, requestStart, requestSucceeded, requestFailed) {
  return function (request, success, error) {
    var payload = {};
    payload[MBOX] = request[MBOX];
    requestStart(payload);
    ajax(request).then(function (res) {
      payload[RESPONSE_TOKENS] = res[RESPONSE_TOKENS] || [];
      requestSucceeded(payload);
      success();
    })['catch'](function (err) {
      payload[MESSAGE] = getErrorMessage$2(err);
      requestFailed(payload);
      error(err);
    });
  };
}

function trackEvent(options) {
  executeTrackEvent(index$4, getConfig(), createHttp$2(ajax, notifyRequestStart, notifyRequestSucceeded, notifyRequestFailed), trigger, listen, isDeliveryEnabled, trackBySelector, trackImmediate, options);
}

function remove(selector) {
  return select(selector).empty().remove();
}
function after(content, selector) {
  return select(selector).after(content);
}
function before(content, selector) {
  return select(selector).before(content);
}
function append(content, selector) {
  return select(selector).append(content);
}
function prepend(content, selector) {
  return select(selector).prepend(content);
}
function setHtml(content, selector) {
  return select(selector).html(content);
}
function getHtml$1(selector) {
  return select(selector).html();
}
function setText(content, selector) {
  return select(selector).text(content);
}

var Promise$2 = index$11;
var getPromise = function getPromise(url, script) {
  return new Promise$2(function (resolve, reject) {
    if ('onload' in script) {
      script.onload = function () {
        resolve(script);
      };
      script.onerror = function () {
        reject(new Error('Failed to load script ' + url));
      };
    } else if ('readyState' in script) {
      script.onreadystatechange = function () {
        var rs = script.readyState;
        if (rs === 'loaded' || rs === 'complete') {
          script.onreadystatechange = null;
          resolve(script);
        }
      };
    }
  });
};
var index$12 = function index(url) {
  var script = document.createElement('script');
  script.src = url;
  script.async = true;
  var promise = getPromise(url, script);
  document.getElementsByTagName('head')[0].appendChild(script);
  return promise;
};

function saveTrace$2(action) {
  var trace = {};
  trace[ACTION] = action;
  addTrace(CLIENT_TRACES, trace);
}
function saveErrorTrace(action, error) {
  var trace = {};
  trace[ACTION] = action;
  trace[ERROR] = error;
  addTrace(CLIENT_TRACES, trace);
}

function getDataSrc(item) {
  return getAttr(DATA_SRC, item);
}
function hasDataSrc(item) {
  return hasAttr(DATA_SRC, item);
}
function disableImages(html) {
  forEach(function (item) {
    return copyAttr(SRC, DATA_SRC, item);
  }, toArray$1(find(IMAGE_TAG, html)));
  return html;
}
function enableImages(html) {
  forEach(function (item) {
    return copyAttr(DATA_SRC, SRC, item);
  }, toArray$1(find(IMAGE_TAG, html)));
  return html;
}
function loadImages(html) {
  var elements = filter(hasDataSrc, toArray$1(find(IMAGE_TAG, html)));
  if (isEmpty(elements)) {
    return html;
  }
  forEach(loadImage, map(getDataSrc, elements));
  return html;
}
function loadImage(src) {
  logDebug(LOADING_IMAGE, src);
  return getAttr(SRC, setAttr(SRC, src, wrap("<" + IMAGE_TAG + "/>")));
}
function renderImages(html) {
  return resolve(html).then(disableImages).then(loadImages).then(enableImages);
}

function getUrl$1(item) {
  var src = getAttr(SRC, item);
  return isNotBlank(src) ? src : null;
}
function getScriptsUrls(html) {
  return filter(isNotBlank, map(getUrl$1, toArray$1(find(SCRIPT, html))));
}
function loadScripts(urls) {
  return reduce(function (acc, url) {
    return acc.then(function () {
      logDebug(REMOTE_SCRIPT, url);
      return index$12(url);
    });
  }, resolve(), urls);
}
function executeRemoteScripts(renderFunc, container, html) {
  var urls = getScriptsUrls(html);
  var render = function render(html) {
    return renderFunc(container, html);
  };
  var result = resolve(html);
  if (isEmpty(urls)) {
    return result.then(render);
  }
  return result.then(render).then(function () {
    return loadScripts(urls);
  });
}
function handleRenderingSuccess(action) {
  saveTrace$2(action);
  return action;
}
function handleRenderingError(action) {
  return function (error) {
    logDebug(UNEXPECTED_ERROR, error);
    saveErrorTrace(action, error);
    return action;
  };
}
function renderHtml(renderFunc, action) {
  var container = select(action[SELECTOR]);
  var html = fragment(action[CONTENT]);
  var renderContent = function renderContent(html) {
    return executeRemoteScripts(renderFunc, container, html);
  };
  return renderImages(html).then(renderContent).then(function () {
    return handleRenderingSuccess(action);
  })['catch'](handleRenderingError(action));
}

function renderFunc(container, html) {
  return setHtml(getHtml$1(html), container);
}
function setContent$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc, action);
}

function setText$1(action) {
  var container = select(action[SELECTOR]);
  var content = action[CONTENT];
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  setText(content, container);
  return resolve(action);
}

function renderFunc$1(container, html) {
  return append(getHtml$1(html), container);
}
function appendContent$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$1, action);
}

function renderFunc$2(container, html) {
  return prepend(getHtml$1(html), container);
}
function prependContent$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$2, action);
}

function renderFunc$3(container, html) {
  var parentContainer = parent(container);
  remove(before(getHtml$1(html), container));
  return parentContainer;
}
function replaceContent$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$3, action);
}

function renderFunc$4(container, html) {
  return prev(before(getHtml$1(html), container));
}
function insertBefore$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$4, action);
}

function renderFunc$5(container, html) {
  return next(after(getHtml$1(html), container));
}
function insertAfter$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$5, action);
}

function renderFunc$6(container, html) {
  return parent(before(getHtml$1(html), container));
}
function customCode$1(action) {
  logDebug(ACTION_RENDERING, action);
  return renderHtml(renderFunc$6, action);
}

function shouldHandleImageSrc(container, attribute) {
  return SRC === attribute && is(IMAGE_TAG, container);
}
function setImageSrc(container, src) {
  removeAttr(SRC, container);
  setAttr(SRC, loadImage(src), container);
}
function setAttribute$1(action) {
  var attribute = action[ATTRIBUTE];
  var value = action[VALUE];
  var container = select(action[SELECTOR]);
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  if (shouldHandleImageSrc(container, attribute)) {
    setImageSrc(container, value);
  } else {
    setAttr(attribute, value, container);
  }
  return resolve(action);
}

function addClass(cssClass, selector) {
  return select(selector).addClass(cssClass);
}
function removeClass(cssClass, selector) {
  return select(selector).removeClass(cssClass);
}
function hasClass(cssClass, selector) {
  return select(selector).hasClass(cssClass);
}
function setCss(style, selector) {
  return select(selector).css(style);
}

function setCssWithPriority(container, style, priority) {
  forEach(function (elem) {
    forEach(function (value, key) {
      return elem.style.setProperty(key, value, priority);
    }, style);
  }, toArray$1(container));
}
function setStyle$1(action) {
  var container = select(action[SELECTOR]);
  var priority = action[PRIORITY];
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  if (isBlank(priority)) {
    setCss(action[STYLE], container);
  } else {
    setCssWithPriority(container, action[STYLE], priority);
  }
  return resolve(action);
}

function remove$1(action) {
  var container = select(action[SELECTOR]);
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  remove(container);
  return resolve(action);
}

function rearrange$1(action) {
  var from = action[FROM];
  var to = action[TO];
  var container = select(action[SELECTOR]);
  var elements = toArray$1(children(container));
  var elemFrom = elements[from];
  var elemTo = elements[to];
  if (!exists$2(elemFrom) || !exists$2(elemTo)) {
    logDebug(REARRANGE_MISSING, action);
    saveErrorTrace(action, REARRANGE_MISSING);
    return resolve(action);
  }
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  if (from < to) {
    after(elemFrom, elemTo);
  } else {
    before(elemFrom, elemTo);
  }
  return resolve(action);
}

var CLICK_TRACK_ID_PARAM = "clickTrackId";
function trackClick$1(handleClick, action) {
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  handleClick(CLICK_TRACK_ID_PARAM, action);
  return resolve(action);
}

var CLICK_THROUGH_PARAM = "mboxTarget";
function signalClick(handleClick, action) {
  logDebug(ACTION_RENDERING, action);
  saveTrace$2(action);
  handleClick(CLICK_THROUGH_PARAM, action);
  return resolve(action);
}

var HEAD_TAGS_SELECTOR = SCRIPT_TAG + "," + LINK_TAG + "," + STYLE_TAG;
function createHandleClickOptions(mbox, param, action) {
  var params = {};
  params[param] = action[CLICK_TRACK_ID];
  var options = {};
  options[MBOX] = mbox + CLICKED_SUFFIX;
  options[TYPE] = CLICK;
  options[SELECTOR] = action[SELECTOR];
  options[PARAMS] = params;
  return options;
}
function getHeadContent(content) {
  var container = fragment(content);
  var result = reduce(function (acc, elem) {
    acc.push(getHtml$1(fragment(elem)));
    return acc;
  }, [], toArray$1(find(HEAD_TAGS_SELECTOR, container)));
  return result.join("");
}
function preprocessAction(action) {
  var content = action[CONTENT];
  if (isBlank(content)) {
    return action;
  }
  var container = select(action[SELECTOR]);
  if (!is(HEAD_TAG, container)) {
    return action;
  }
  action[ACTION] = APPEND_CONTENT;
  action[CONTENT] = getHeadContent(content);
  return action;
}
function executeRedirect(win, action) {
  var url = action[URL];
  logDebug(ACTION_RENDERING, action);
  win.location.replace(url);
}
function executeRender(handleClick, action) {
  var processedAction = preprocessAction(action);
  var type = processedAction[ACTION];
  switch (type) {
    case SET_CONTENT:
      return setContent$1(processedAction);
    case SET_TEXT:
      return setText$1(processedAction);
    case APPEND_CONTENT:
      return appendContent$1(processedAction);
    case PREPEND_CONTENT:
      return prependContent$1(processedAction);
    case REPLACE_CONTENT:
      return replaceContent$1(processedAction);
    case INSERT_BEFORE:
      return insertBefore$1(processedAction);
    case INSERT_AFTER:
      return insertAfter$1(processedAction);
    case CUSTOM_CODE:
      return customCode$1(processedAction);
    case SET_ATTRIBUTE:
      return setAttribute$1(processedAction);
    case SET_STYLE:
      return setStyle$1(processedAction);
    case REMOVE:
      return remove$1(processedAction);
    case REARRANGE:
      return rearrange$1(processedAction);
    case TRACK_CLICK:
      return trackClick$1(handleClick, processedAction);
    case SIGNAL_CLICK:
      return signalClick(handleClick, processedAction);
    default:
      return resolve(processedAction);
  }
}

function redirect$1(action) {
  executeRedirect(index$4, action);
}
function render(trackEvent, mbox, action) {
  var handleClick = function handleClick(param, a) {
    return trackEvent(createHandleClickOptions(mbox, param, a));
  };
  return executeRender(handleClick, action);
}

function E() {
}
E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    return this;
  },
  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
var index$13 = E;

function create$1() {
  return new index$13();
}
function publishOn(eventBus, name, args) {
  eventBus.emit(name, args);
}
function subscribeTo(eventBus, name, func) {
  eventBus.on(name, func);
}
function subscribeOnceTo(eventBus, name, func) {
  eventBus.once(name, func);
}
function unsubscribeFrom(eventBus, name) {
  eventBus.off(name);
}

var EVENT_BUS = create$1();
function publish(name, args) {
  publishOn(EVENT_BUS, name, args);
}
function subscribe(name, func) {
  subscribeTo(EVENT_BUS, name, func);
}
function subscribeOnce(name, func) {
  subscribeOnceTo(EVENT_BUS, name, func);
}
function unsubscribe(name) {
  unsubscribeFrom(EVENT_BUS, name);
}

var STYLE_PREFIX = "at-";
var BODY_STYLE_ID = "at-body-style";
var BODY_STYLE_ID_SELECTOR = "#" + BODY_STYLE_ID;
var MARKERS_STYLE_ID = "at-makers-style";
function createStyleMarkup(id, content) {
  return "<" + STYLE_TAG + " " + ID + "=\"" + id + "\" " + CLASS + "=\"" + FLICKER_CONTROL_CLASS + "\">" + content + "</" + STYLE_TAG + ">";
}
function createActionStyle(styleDef, selector) {
  var id = STYLE_PREFIX + hash(selector);
  var style = selector + " {" + styleDef + "}";
  return createStyleMarkup(id, style);
}
function addHidingSnippet(config) {
  var bodyHidingEnabled = config[BODY_HIDING_ENABLED];
  if (bodyHidingEnabled !== true) {
    return;
  }
  if (exists$2(BODY_STYLE_ID_SELECTOR)) {
    return;
  }
  var bodyHiddenStyle = config[BODY_HIDDEN_STYLE];
  append(createStyleMarkup(BODY_STYLE_ID, bodyHiddenStyle), HEAD_TAG);
}
function removeHidingSnippet(config) {
  var bodyHidingEnabled = config[BODY_HIDING_ENABLED];
  if (bodyHidingEnabled !== true) {
    return;
  }
  if (!exists$2(BODY_STYLE_ID_SELECTOR)) {
    return;
  }
  remove(BODY_STYLE_ID_SELECTOR);
}
function addActionHidings(config, selectors) {
  if (isEmpty(selectors)) {
    return;
  }
  var styleDef = config[DEFAULT_CONTENT_HIDDEN_STYLE];
  var buildStyle = function buildStyle(selector) {
    return createActionStyle(styleDef, selector);
  };
  var content = map(buildStyle, selectors).join("\n");
  append(content, HEAD_TAG);
}
function addStyles(config) {
  var mboxDefaultStyle = "\n." + MBOX_CSS_CLASS + " {" + config[DEFAULT_CONTENT_HIDDEN_STYLE] + "}";
  var elementMarkerStyle = "." + MARKER_CSS_CLASS + " {" + config[DEFAULT_CONTENT_VISIBLE_STYLE] + "}\n";
  var content = createStyleMarkup(MARKERS_STYLE_ID, [mboxDefaultStyle, elementMarkerStyle].join("\n"));
  append(content, HEAD_TAG);
}

function injectHidingSnippetStyle() {
  addHidingSnippet(getConfig());
}
function removeHidingSnippetStyle() {
  removeHidingSnippet(getConfig());
}
function injectActionHidingStyles(selectors) {
  addActionHidings(getConfig(), selectors);
}
function removeActionHidingStyle(selector) {
  var id = STYLE_PREFIX + hash(selector);
  remove("#" + id);
}
function injectStyles() {
  addStyles(getConfig());
}

var DELAY = 1000;
var VISIBILITY_STATE = "visibilityState";
var VISIBLE = "visible";
var STARTED = [];
function runner(callback) {
  if (index$5[VISIBILITY_STATE] === VISIBLE) {
    index$4.requestAnimationFrame(callback);
    return;
  }
  delay(callback, DELAY);
}
function tick() {
  publish(TICK_EVENT);
  if (!isEmpty(STARTED)) {
    runner(tick);
  }
}
function startTicker() {
  STARTED.push(1);
  tick();
}
function stopTicker() {
  STARTED.pop();
}

var APPLY_OFFER = "[applyOffer()]";
var notFound = function notFound(action) {
  return isNil(action.found);
};
var isRedirectAction = function isRedirectAction(action) {
  return !isNil(action[URL]);
};
var isClickTracking = function isClickTracking(action) {
  return action[ACTION] === TRACK_CLICK || action[ACTION] === SIGNAL_CLICK;
};
function retrieveSelector(selector) {
  if (isNotBlank(selector)) {
    return selector;
  }
  if (isElement(selector)) {
    return selector;
  }
  return HEAD_TAG;
}
function showElement(selector) {
  addClass(MARKER_CSS_CLASS, removeClass(MBOX_CSS_CLASS, selector));
}
function setSelector(selector, action) {
  if (isNil(action[SELECTOR])) {
    action[SELECTOR] = selector;
  }
}
function setActionsSelectors(selector, actions) {
  var addSelector = function addSelector(action) {
    return setSelector(selector, action);
  };
  forEach(addSelector, actions);
}
function hideActions(actions) {
  var getCssSelector = function getCssSelector(action) {
    return action[CSS_SELECTOR];
  };
  var cssSelectors = filter(isNotBlank, map(getCssSelector, actions));
  injectActionHidingStyles(cssSelectors);
}
function displayAction(action) {
  var selector = action[SELECTOR];
  var cssSelector = action[CSS_SELECTOR];
  if (isNotBlank(selector) || isElement(selector)) {
    if (isClickTracking(action)) {
      addClass(CLICK_TRACKING_CSS_CLASS, removeClass(MBOX_CSS_CLASS, selector));
    } else {
      showElement(selector);
    }
  }
  if (isNotBlank(cssSelector)) {
    removeActionHidingStyle(cssSelector);
  }
}
function displayActions(actions) {
  forEach(displayAction, actions);
}
function createEventDetails(mbox, selectors) {
  var details = {};
  details[MBOX] = mbox;
  details[MESSAGE] = MISSING_SELECTORS;
  details[SELECTORS] = selectors;
  return details;
}
function createTrace$2(details) {
  var trace = {};
  trace[ERROR] = details;
  return trace;
}
function handleError$2(mbox, actions) {
  var getSelector = function getSelector(action) {
    return action[SELECTOR];
  };
  var isSelector = function isSelector(selector) {
    return isNotBlank(selector) || isElement(selector);
  };
  var selectors = filter(isSelector, map(getSelector, actions));
  var details = createEventDetails(mbox, selectors);
  var trace = createTrace$2(details);
  displayActions(actions);
  logWarn(MISSING_SELECTORS, actions);
  addTrace(CLIENT_TRACES, trace);
  notifyRenderingFailed(details);
}
function handleComplete(mbox, actions) {
  var notFoundActions = filter(notFound, actions);
  if (!isEmpty(notFoundActions)) {
    handleError$2(mbox, notFoundActions);
    return;
  }
  var payload = {};
  payload[MBOX] = mbox;
  logDebug(ACTIONS_RENDERED);
  notifyRenderingSucceeded(payload);
}
function renderAndDisplayAction(mbox, action) {
  render(trackEvent, mbox, action).then(function () {
    logDebug(ACTION_RENDERED, action);
    displayAction(action);
  })['catch'](function (error) {
    logDebug(UNEXPECTED_ERROR, error);
    displayAction(action);
  });
}
function renderActions(mbox, actions) {
  forEach(function (action) {
    if (!exists$2(action[SELECTOR])) {
      return;
    }
    renderAndDisplayAction(mbox, action);
    action.found = true;
  }, actions);
}
function startTimer(eventBus, selectorsPollingTimeout) {
  delay(function () {
    return publishOn(eventBus, TIMEOUT_EVENT);
  }, selectorsPollingTimeout);
}
function applyActions(eventBus, mbox, actions) {
  subscribe(TICK_EVENT, function () {
    var arr = filter(notFound, actions);
    if (isEmpty(arr)) {
      publishOn(eventBus, RENDER_COMPLETE_EVENT);
      return;
    }
    renderActions(mbox, arr);
  });
  subscribeOnceTo(eventBus, RENDER_COMPLETE_EVENT, function () {
    unsubscribeFrom(eventBus, TIMEOUT_EVENT);
    stopTicker();
    handleComplete(mbox, actions);
  });
  subscribeOnceTo(eventBus, TIMEOUT_EVENT, function () {
    unsubscribeFrom(eventBus, RENDER_COMPLETE_EVENT);
    stopTicker();
    handleComplete(mbox, actions);
  });
}
function applyOffer(options) {
  var config = getConfig();
  var selectorsPollingTimeout = config[SELECTORS_POLLING_TIMEOUT];
  var mbox = options[MBOX];
  var selector = retrieveSelector(options[SELECTOR]);
  var validationResult = validateApplyOfferOptions(options);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(APPLY_OFFER, validationError);
    showElement(selector);
    return;
  }
  if (!isDeliveryEnabled()) {
    logWarn(DELIVERY_DISABLED);
    showElement(selector);
    return;
  }
  var actions = options[OFFER];
  var payload = {};
  payload[MBOX] = mbox;
  if (isEmpty(actions)) {
    logDebug(APPLY_OFFER, NO_ACTIONS);
    showElement(selector);
    publish(NO_OFFERS_EVENT, mbox);
    notifyRenderingNoOffers(payload);
    return;
  }
  var redirectAction = first(filter(isRedirectAction, actions));
  if (!isNil(redirectAction)) {
    payload[URL] = redirectAction[URL];
    logDebug(APPLY_OFFER, REDIRECT_ACTION);
    notifyRenderingRedirect(payload);
    redirect$1(redirectAction);
    return;
  }
  var eventBus = create$1();
  setActionsSelectors(selector, actions);
  hideActions(actions);
  startTicker();
  startTimer(eventBus, selectorsPollingTimeout);
  publish(SELECTORS_HIDDEN_EVENT, mbox);
  notifyRenderingStart(payload);
  applyActions(eventBus, mbox, actions);
}

var ADOBE_NAMESPACE = "adobe";
var TARGET_NAMESPACE = "target";
var EXTENSION_NAMESPACE = "ext";
function buildLogger() {
  return { log: logDebug, error: logWarn };
}
function buildSettings(config) {
  var result = {};
  result[CLIENT_CODE] = config[CLIENT_CODE];
  result[SERVER_DOMAIN] = config[SERVER_DOMAIN];
  result[TIMEOUT] = config[TIMEOUT];
  result[GLOBAL_MBOX_NAME] = config[GLOBAL_MBOX_NAME];
  result[GLOBAL_MBOX_AUTO_CREATE] = config[GLOBAL_MBOX_AUTO_CREATE];
  return result;
}
function buildNamespace(base, name, value) {
  var parts = split(".", name);
  var length = parts.length;
  for (var i = 0; i < length - 1; i += 1) {
    var part = parts[i];
    base[part] = base[part] || {};
    base = base[part];
  }
  base[parts[length - 1]] = value;
}
function register(win, config, validate, options) {
  var exposeModules = {
    logger: buildLogger(),
    settings: buildSettings(config)
  };
  var validationResult = validate(options, exposeModules);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    throw new Error(validationError);
  }
  var scope = win[ADOBE_NAMESPACE][TARGET_NAMESPACE];
  scope[EXTENSION_NAMESPACE] = scope[EXTENSION_NAMESPACE] || {};
  var name = options[NAME];
  var modules = options[MODULES];
  var registerModule = options[REGISTER];
  var args = reduce(function (acc, elem) {
    acc.push(exposeModules[elem]);
    return acc;
  }, [], modules);
  buildNamespace(scope[EXTENSION_NAMESPACE], name, registerModule.apply(undefined, args));
}

function registerExtension(options) {
  register(index$4, getConfig(), validateRegisterExtensionOptions, options);
}

var currentExecutingScript = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
      module.exports = factory();
    } else {
      root.currentExecutingScript = factory();
    }
  })(
  commonjsGlobal || window,
  function () {
    var scriptReadyRegex = /^(interactive|loaded|complete)$/;
    var fullPageUrl = !!window.location ? window.location.href : null;
    var pageUrl = fullPageUrl ? fullPageUrl.replace(/#.*$/, "").replace(/\?.*$/, "") || null : null;
    var scripts = document.getElementsByTagName("script");
    var supportsScriptReadyState = "readyState" in (scripts[0] || document.createElement("script"));
    var isNotOpera = !window.opera || window.opera.toString() !== "[object Opera]";
    var hasNativeCurrentScriptAccessor = "currentScript" in document;
    var originalStackDepthConfig;
    if ("stackTraceLimit" in Error && Error.stackTraceLimit !== Infinity) {
      originalStackDepthConfig = Error.stackTraceLimit;
      Error.stackTraceLimit = Infinity;
    }
    var hasStackBeforeThrowing = false,
        hasStackAfterThrowing = false;
    (function () {
      try {
        var err = new Error();
        hasStackBeforeThrowing = typeof err.stack === "string" && !!err.stack;
        throw err;
      } catch (thrownErr) {
        hasStackAfterThrowing = typeof thrownErr.stack === "string" && !!thrownErr.stack;
      }
    })();
    function normalizeWhitespace(str) {
      return str ? str.replace(/^\s+$|\s+$/g, "").replace(/\s\s+/g, " ") : "";
    }
    function getScriptFromUrl(url, eligibleScripts) {
      var i,
          script = null;
      eligibleScripts = eligibleScripts || scripts;
      if (typeof url === "string" && url) {
        for (i = eligibleScripts.length; i--;) {
          if (eligibleScripts[i].src === url) {
            script = eligibleScripts[i];
            break;
          }
        }
      }
      return script;
    }
    function getInlineScriptFromCallerSource(callerFnSource, eligibleScripts) {
      var i,
          inlineScriptText,
          script = null,
          callerSourceText = normalizeWhitespace(callerFnSource);
      eligibleScripts = eligibleScripts || scripts;
      if (callerFnSource && callerSourceText) {
        for (i = eligibleScripts.length; i--;) {
          if (!eligibleScripts[i].hasAttribute("src")) {
            inlineScriptText = normalizeWhitespace(eligibleScripts[i].text);
            if (inlineScriptText.indexOf(callerSourceText) !== -1) {
              if (script) {
                script = null;
                break;
              }
              script = eligibleScripts[i];
            }
          }
        }
      }
      return script;
    }
    function getSoleInlineScript(eligibleScripts) {
      var i,
          len,
          script = null;
      eligibleScripts = eligibleScripts || scripts;
      for (i = 0, len = eligibleScripts.length; i < len; i++) {
        if (!eligibleScripts[i].hasAttribute("src")) {
          if (script) {
            script = null;
            break;
          }
          script = eligibleScripts[i];
        }
      }
      return script;
    }
    function getScriptUrlFromStack(stack, skipStackDepth) {
      var matches,
          remainingStack,
          url = null,
          ignoreMessage = typeof skipStackDepth === "number";
      skipStackDepth = ignoreMessage ? Math.round(skipStackDepth) : 0;
      if (typeof stack === "string" && stack) {
        if (ignoreMessage) {
          matches = stack.match(/(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
        } else {
          matches = stack.match(/^(?:|[^:@]*@|.+\)@(?=data:text\/javascript|blob|http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
          if (!(matches && matches[1])) {
            matches = stack.match(/\)@(data:text\/javascript(?:;[^,]+)?,.+?|(?:|blob:)(?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
          }
        }
        if (matches && matches[1]) {
          if (skipStackDepth > 0) {
            remainingStack = stack.slice(stack.indexOf(matches[0]) + matches[0].length);
            url = getScriptUrlFromStack(remainingStack, skipStackDepth - 1);
          } else {
            url = matches[1];
          }
        }
      }
      return url;
    }
    function _farthestExecutingScript() {
      return null;
    }
    function _originatingExecutingScript() {
      return null;
    }
    function _nearestExecutingScript() {
      if (scripts.length === 0) {
        return null;
      }
      var i,
          e,
          stack,
          url,
          script,
          eligibleScripts = [],
          skipStackDepth = _nearestExecutingScript.skipStackDepth || 1,
      callerFnSource = null;
      for (i = 0; i < scripts.length; i++) {
        if (isNotOpera && supportsScriptReadyState) {
          if (scriptReadyRegex.test(scripts[i].readyState)) {
            eligibleScripts.push(scripts[i]);
          }
        } else {
          eligibleScripts.push(scripts[i]);
        }
      }
      e = new Error();
      if (hasStackBeforeThrowing) {
        stack = e.stack;
      }
      if (!stack && hasStackAfterThrowing) {
        try {
          throw e;
        } catch (err) {
          stack = err.stack;
        }
      }
      if (stack) {
        url = getScriptUrlFromStack(stack, skipStackDepth);
        script = getScriptFromUrl(url, eligibleScripts);
        if (!script && pageUrl && url === pageUrl) {
          if (callerFnSource) {
            script = getInlineScriptFromCallerSource(callerFnSource, eligibleScripts);
          }
          else {
              script = getSoleInlineScript(eligibleScripts);
            }
        }
      }
      if (!script) {
        if (eligibleScripts.length === 1) {
          script = eligibleScripts[0];
        }
      }
      if (!script) {
        if (hasNativeCurrentScriptAccessor) {
          script = document.currentScript;
        }
      }
      if (!script) {
        if (isNotOpera && supportsScriptReadyState) {
          for (i = eligibleScripts.length; i--;) {
            if (eligibleScripts[i].readyState === "interactive") {
              script = eligibleScripts[i];
              break;
            }
          }
        }
      }
      if (!script) {
        script = eligibleScripts[eligibleScripts.length - 1] || null;
      }
      return script;
    }
    _nearestExecutingScript.skipStackDepth = 1;
    var currentExecutingScript = _nearestExecutingScript;
    currentExecutingScript.near = _nearestExecutingScript;
    currentExecutingScript.far = _farthestExecutingScript;
    currentExecutingScript.origin = _originatingExecutingScript;
    return currentExecutingScript;
  });
});

var storage = {};
function setItem(key, value) {
  storage[key] = value;
}
function getItem(key) {
  return storage[key];
}

function getErrorMessage$3(err) {
  if (isObject(err) && isNotBlank(err[ERROR])) {
    return err[ERROR];
  }
  if (!isNil(err) && isNotBlank(err[MESSAGE])) {
    return err[MESSAGE];
  }
  if (isNotBlank(err)) {
    return err;
  }
  return ERROR_UNKNOWN;
}
function markMboxContainer(selector, mbox) {
  return addClass("" + MBOX_NAME_CLASS_PREFIX + mbox, setAttr(DATA_MBOX_NAME, mbox, selector));
}
function handleSuccess(mbox, selector, response) {
  var payload = {};
  payload[MBOX] = mbox;
  payload[RESPONSE_TOKENS] = response[RESPONSE_TOKENS];
  var options = {};
  options[MBOX] = mbox;
  options[SELECTOR] = selector;
  options[OFFER] = response[ACTIONS];
  logDebug(RENDERING_MBOX, mbox);
  notifyRequestSucceeded(payload);
  applyOffer(options);
}
function handleError$3(mbox, selector, error) {
  var message = getErrorMessage$3(error);
  var payload = {};
  payload[MBOX] = mbox;
  payload[MESSAGE] = message;
  logWarn(RENDERING_MBOX_FAILED, mbox, error);
  notifyRequestFailed(payload);
  addClass(MARKER_CSS_CLASS, removeClass(MBOX_CSS_CLASS, selector));
}
function slice(args, by) {
  return [].slice.call(args, by);
}
function saveMbox(mbox, item) {
  var currentMboxes = getItem(mbox);
  if (isNil(currentMboxes)) {
    setItem(mbox, [item]);
  } else {
    currentMboxes.push(item);
    setItem(mbox, currentMboxes);
  }
}
function getMboxes(mbox) {
  return getItem(mbox);
}
function renderMbox(mbox, params, selector) {
  var config = getConfig();
  var request = {};
  request[MBOX] = mbox;
  request[PARAMS] = params;
  request[TIMEOUT] = config[TIMEOUT];
  var payload = {};
  payload[MBOX] = mbox;
  var success = function success(response) {
    return handleSuccess(mbox, selector, response);
  };
  var error = function error(err) {
    return handleError$3(mbox, selector, err);
  };
  notifyRequestStart(payload);
  ajax(request).then(success)['catch'](error);
}

var MBOX_CREATE = "[mboxCreate()]";
function getMboxSelector(currentScript, mbox) {
  if (!isElement(currentScript)) {
    logWarn(MBOX_CREATE, CURRENT_SCRIPT_MISSING, FORCE_HEAD, mbox);
    return select(HEAD_TAG);
  }
  if (is(HEAD_TAG, parent(currentScript))) {
    logDebug(MBOX_CREATE, HTML_HEAD_EXECUTION, mbox);
    return select(HEAD_TAG);
  }
  var node = prev(currentScript);
  var isContainer = is(DIV_TAG, node) && hasClass(MBOX_CSS_CLASS, node);
  if (isContainer) {
    return node;
  }
  logDebug(MBOX_CREATE, MBOX_CONTAINER_NOT_FOUND, FORCE_HEAD, mbox);
  return select(HEAD_TAG);
}
function executeMboxCreate(currentScript, mbox, args) {
  if (!isDeliveryEnabled() && !isAuthoringEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  var validationResult = validateMbox(mbox);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(MBOX_CREATE, validationError);
    return;
  }
  var selector = getMboxSelector(currentScript, mbox);
  var params = getMboxParameters(mbox, args);
  var item = {};
  item[MBOX] = mbox;
  item[PARAMS] = params;
  item[SELECTOR] = markMboxContainer(selector, mbox);
  logDebug(MBOX_CREATE, mbox, params, selector);
  saveMbox(mbox, item);
  if (isDeliveryEnabled()) {
    renderMbox(mbox, params, selector);
  }
}

var MBOX_DEFINE = "[mboxDefine()]";
function getMboxSelector$1(id, mbox) {
  var mboxNode = select("#" + id);
  if (exists$2(mboxNode)) {
    return mboxNode;
  }
  logDebug(MBOX_DEFINE, MBOX_CONTAINER_NOT_FOUND, FORCE_HEAD, mbox);
  return select(HEAD_TAG);
}
function executeMboxDefine(id, mbox, args) {
  if (!isDeliveryEnabled() && !isAuthoringEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  if (isBlank(id)) {
    logWarn(MBOX_DEFINE, MBOX_DEFINE_ID_MISSING);
    return;
  }
  var validationResult = validateMbox(mbox);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(MBOX_DEFINE, validationError);
    return;
  }
  var selector = getMboxSelector$1(id, mbox);
  var params = getMboxParameters(mbox, args);
  var item = {};
  item[MBOX] = mbox;
  item[PARAMS] = params;
  item[SELECTOR] = markMboxContainer(selector, mbox);
  logDebug(MBOX_DEFINE, mbox, params, selector);
  saveMbox(mbox, item);
}

var MBOX_UPDATE = "[mboxUpdate()]";
function executeMboxUpdate(mbox, args) {
  if (!isDeliveryEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  var validationResult = validateMbox(mbox);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(MBOX_UPDATE, validationError);
    return;
  }
  var argsParams = arrayToParams(args);
  argsParams[PAGE_ID_PARAM] = uuid();
  var mboxes = getMboxes(mbox);
  logDebug(MBOX_UPDATE, mboxes);
  forEach(function (item) {
    var name = item[MBOX];
    var params = item[PARAMS];
    var selector = item[SELECTOR];
    renderMbox(name, index$1({}, params, argsParams), selector);
  }, mboxes);
}

function mboxCreate(mbox) {
  var args = slice(arguments, 1);
  currentExecutingScript.skipStackDepth = 2;
  executeMboxCreate(currentExecutingScript(), mbox, args);
}
function mboxDefine(id, mbox) {
  var args = slice(arguments, 2);
  executeMboxDefine(id, mbox, args);
}
function mboxUpdate(mbox) {
  var args = slice(arguments, 1);
  executeMboxUpdate(mbox, args);
}

var NOTIFICATION_ID = "notificationId";
var CLIENT = "client";
var ID$1 = "id";
var DEVICE_ID = "tntId";
var PREFETCH = "prefetch";
var VIEWS = "views";

var OPTIONS = "options";

var EVENT_TOKEN = "eventToken";
var VIEW_START = "at-view-start";
var VIEW_NAME = "viewName";
var OPTION_RENDER_COMPLETE_EVENT = "at-option-render-complete";
var EVENTS = "events";
var DISPLAY_EVENT = "display";
var NOTIFICATIONS = "notifications";
var PARAMETERS = "parameters";

var LOAD_ERROR = "Unable to load target-vec.js";
var LOADING = "Loading target-vec.js";
var NAMESPACE = "_AT";
var EDITOR = "clickHandlerForExperienceEditor";
var CURRENT_VIEW = "currentView";
function initNamespace(win) {
  win[NAMESPACE] = win[NAMESPACE] || {};
  win[NAMESPACE].querySelectorAll = select;
}
function handleViewStart(win, viewName) {
  win[NAMESPACE][CURRENT_VIEW] = viewName;
}
function setupClickHandler(win, doc) {
  doc.addEventListener(CLICK, function (event) {
    if (isFunction(win[NAMESPACE][EDITOR])) {
      win[NAMESPACE][EDITOR](event);
    }
  }, true);
}
function initAuthoringCode(win, doc, config) {
  if (!isAuthoringEnabled()) {
    return;
  }
  initNamespace(win);
  subscribe(VIEW_START, function (viewName) {
    return handleViewStart(win, viewName);
  });
  var authoringScriptUrl = config[AUTHORING_SCRIPT_URL];
  var success = function success() {
    return setupClickHandler(win, doc);
  };
  var error = function error() {
    return logWarn(LOAD_ERROR);
  };
  logDebug(LOADING);
  index$12(authoringScriptUrl).then(success)['catch'](error);
}

function getErrorMessage$4(err) {
  if (isObject(err) && isNotBlank(err[ERROR])) {
    return err[ERROR];
  }
  if (!isNil(err) && isNotBlank(err[MESSAGE])) {
    return err[MESSAGE];
  }
  if (isNotBlank(err)) {
    return err;
  }
  return ERROR_UNKNOWN;
}

function handleSuccess$1(mbox, selector, response) {
  var payload = {};
  payload[MBOX] = mbox;
  payload[RESPONSE_TOKENS] = response[RESPONSE_TOKENS];
  var options = {};
  options[MBOX] = mbox;
  options[SELECTOR] = selector;
  options[OFFER] = response[ACTIONS];
  logDebug(RENDERING_MBOX, mbox);
  notifyRequestSucceeded(payload);
  applyOffer(options);
}
function handleError$4(mbox, error) {
  var payload = {};
  payload[MBOX] = mbox;
  payload[MESSAGE] = getErrorMessage$4(error);
  logWarn(RENDERING_MBOX_FAILED, mbox, error);
  notifyRequestFailed(payload);
  publish(GLOBAL_MBOX_FAILED_EVENT, mbox);
}
function createGlobalMbox() {
  var config = getConfig();
  var globalMboxName = config[GLOBAL_MBOX_NAME];
  var request = {};
  request[MBOX] = globalMboxName;
  request[PARAMS] = getGlobalMboxParameters();
  request[TIMEOUT] = config[TIMEOUT];
  var success = function success(response) {
    return handleSuccess$1(globalMboxName, HEAD_TAG, response);
  };
  var error = function error(err) {
    return handleError$4(globalMboxName, err);
  };
  logDebug(RENDERING_MBOX, globalMboxName);
  var payload = {};
  payload[MBOX] = globalMboxName;
  notifyRequestStart(payload);
  ajax(request).then(success)['catch'](error);
}

var GLOBAL_MBOX = "[global mbox]";
var NO_AUTO_CREATE = "auto-create disabled";
function handleLibraryLoaded() {
  subscribeOnce(LIBRARY_LOADED_EVENT, injectHidingSnippetStyle);
}
function handleHidingSnippetRemoval(evt, globalMboxName) {
  subscribe(evt, function (mbox) {
    if (mbox === globalMboxName) {
      removeHidingSnippetStyle();
      unsubscribe(evt);
    }
  });
}
function initGlobalMbox(config) {
  var globalMboxAutoCreate = config[GLOBAL_MBOX_AUTO_CREATE];
  if (!globalMboxAutoCreate) {
    logDebug(GLOBAL_MBOX, NO_AUTO_CREATE);
    return;
  }
  var globalMboxName = config[GLOBAL_MBOX_NAME];
  var validationResult = validateMbox(globalMboxName);
  var validationError = validationResult[ERROR];
  if (!validationResult[VALID]) {
    logWarn(GLOBAL_MBOX, validationError);
    return;
  }
  handleLibraryLoaded();
  handleHidingSnippetRemoval(GLOBAL_MBOX_FAILED_EVENT, globalMboxName);
  handleHidingSnippetRemoval(NO_OFFERS_EVENT, globalMboxName);
  handleHidingSnippetRemoval(SELECTORS_HIDDEN_EVENT, globalMboxName);
  createGlobalMbox();
}

function hasPrefetch(res) {
  return isObject(res[PREFETCH]);
}
function hasActions(option) {
  return !isEmpty(option[ACTIONS]);
}
function hasDeviceId(res) {
  var id = res[ID$1];
  return isObject(id) && isNotBlank(id[DEVICE_ID]);
}
function hasError(res) {
  var status = res[STATUS];
  var message = res[MESSAGE];
  return isNotBlank(status) && isNotBlank(message);
}
function hasViews(res) {
  if (!hasPrefetch(res)) {
    return false;
  }
  return !isEmpty(res[PREFETCH][VIEWS]);
}

function hasOptions(view) {
  return !isEmpty(view[OPTIONS]);
}
function isValidOption(option) {
  return isNotBlank(option[EVENT_TOKEN]) && hasActions(option);
}

function saveDeviceId$1(setDeviceId, response) {
  if (hasDeviceId(response)) {
    setDeviceId(response[ID$1][DEVICE_ID]);
  }
  return response;
}

function saveEdgeCluster$1(setEdgeCluster, response) {
  if (hasDeviceId(response)) {
    setEdgeCluster(response[ID$1][DEVICE_ID]);
  }
  return response;
}

function handleError$6(response) {
  if (hasError(response)) {
    var exception = {};
    exception[STATUS] = response[STATUS];
    exception[ERROR] = response[MESSAGE];
    throw exception;
  }
  return response;
}

var CLICK_TRACK_PATTERN$1 = /CLKTRK#(\S+)/;
var CLICK_TRACK_REPLACE_PATTERN$1 = /CLKTRK#(\S+)\s/;
function getClickTrackNodeId$1(action) {
  var selector = action[SELECTOR];
  if (isBlank(selector)) {
    return "";
  }
  var result = CLICK_TRACK_PATTERN$1.exec(selector);
  if (isEmpty(result) || result.length !== 2) {
    return "";
  }
  return result[1];
}
function getContent$1(id, content) {
  var div = document.createElement(DIV_TAG);
  div.innerHTML = content;
  var firstElement = div.firstElementChild;
  if (isNil(firstElement)) {
    return content;
  }
  firstElement.id = id;
  return firstElement.outerHTML;
}
function processClickTrackId$1(action) {
  var content = action[CONTENT];
  var nodeId = getClickTrackNodeId$1(action);
  if (isBlank(nodeId) || isBlank(content)) {
    return action;
  }
  var selector = action[SELECTOR];
  action[SELECTOR] = selector.replace(CLICK_TRACK_REPLACE_PATTERN$1, "");
  action[CONTENT] = getContent$1(nodeId, content);
  return action;
}
function processAsset$1(action) {
  var value = action[VALUE];
  if (isBlank(value)) {
    return action;
  }
  action[CONTENT] = "<" + IMAGE_TAG + " " + SRC + "=\"" + value + "\" />";
  return action;
}

function setContent$2(action) {
  var result = processClickTrackId$1(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  var contentType = action[CONTENT_TYPE];
  if (TEXT === contentType) {
    action[ACTION] = SET_TEXT;
  }
  return action;
}

function appendContent$2(action) {
  var result = processClickTrackId$1(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function prependContent$2(action) {
  var result = processClickTrackId$1(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function replaceContent$2(action) {
  var result = processClickTrackId$1(action);
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function insertBefore$2(action) {
  var result = processClickTrackId$1(processAsset$1(action));
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function insertAfter$2(action) {
  var result = processClickTrackId$1(processAsset$1(action));
  var content = result[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, result);
    return null;
  }
  return result;
}

function customCode$2(action) {
  var content = action[CONTENT];
  if (!isString(content)) {
    logDebug(EMPTY_CONTENT, action);
    return null;
  }
  return action;
}

function setAttribute$2(action) {
  var attribute = action[ATTRIBUTE];
  var value = action[VALUE];
  if (isBlank(attribute) || isBlank(value)) {
    logDebug(EMPTY_ATTRIBUTE, action);
    return null;
  }
  return action;
}

function setStyle$2(action) {
  var property = action[PROPERTY];
  var value = action[VALUE];
  if (isBlank(property) || isBlank(value)) {
    logDebug(EMPTY_PROPERTY, action);
    return null;
  }
  var style = {};
  style[property] = value;
  action[STYLE] = style;
  return action;
}

function resize$1(action) {
  var height = action[FINAL_HEIGHT];
  var width = action[FINAL_WIDTH];
  if (isBlank(height) || isBlank(width)) {
    logDebug(EMPTY_SIZES, action);
    return null;
  }
  var style = {};
  style[HEIGHT] = height;
  style[WIDTH] = width;
  action[ACTION] = SET_STYLE;
  action[STYLE] = style;
  return action;
}

function move$1(action) {
  var left = Number(action[FINAL_LEFT_POSITION]);
  var top = Number(action[FINAL_TOP_POSITION]);
  if (isNaN(left) || isNaN(top)) {
    logDebug(EMPTY_COORDINATES, action);
    return null;
  }
  var position = action[POSITION];
  var style = {};
  style[LEFT] = left;
  style[TOP] = top;
  if (isNotBlank(position)) {
    style[POSITION] = position;
  }
  action[ACTION] = SET_STYLE;
  action[STYLE] = style;
  return action;
}

function rearrange$2(action) {
  var from = Number(action[FROM]);
  var to = Number(action[TO]);
  if (isNaN(from) || isNaN(to)) {
    logDebug(EMPTY_REARRANGE, action);
    return null;
  }
  return action;
}

function transformAction$1(action) {
  var type = action[ACTION];
  switch (type) {
    case SET_CONTENT:
      return setContent$2(action);
    case APPEND_CONTENT:
      return appendContent$2(action);
    case PREPEND_CONTENT:
      return prependContent$2(action);
    case REPLACE_CONTENT:
      return replaceContent$2(action);
    case INSERT_BEFORE:
      return insertBefore$2(action);
    case INSERT_AFTER:
      return insertAfter$2(action);
    case CUSTOM_CODE:
      return customCode$2(action);
    case SET_ATTRIBUTE:
      return setAttribute$2(action);
    case SET_STYLE:
      return setStyle$2(action);
    case RESIZE:
      return resize$1(action);
    case MOVE:
      return move$1(action);
    case REMOVE:
      return action;
    case REARRANGE:
      return rearrange$2(action);
    case REDIRECT:
      return action;
    default:
      return null;
  }
}
function processActions$1(actions) {
  var notNull = function notNull(action) {
    return !isNil(action);
  };
  return filter(notNull, map(transformAction$1, actions));
}

var storage$1 = {};
function setItem$1(key, value) {
  storage$1[key] = value;
}
function getItem$1(key) {
  return storage$1[key];
}

function processOptions$1(viewName, options) {
  var optionsWithActions = filter(isValidOption, options);
  return map(function (option) {
    var actions = option[ACTIONS];
    option[VIEW_NAME] = viewName;
    option[ACTIONS] = processActions$1(actions);
    return option;
  }, optionsWithActions);
}
function preprocessViews(views) {
  var viewsWithOptions = filter(hasOptions, views);
  return map(function (view) {
    var options = view[OPTIONS];
    view[OPTIONS] = processOptions$1(view[NAME], options);
    return view;
  }, viewsWithOptions);
}
function saveView(view, params) {
  view[EVENTS] = [];
  view[PARAMETERS] = params;
  setItem$1(view[NAME], view);
}
function persistViews(views, params) {
  var persist = function persist(view) {
    return saveView(view, params);
  };
  forEach(persist, views);
}
function processViews(params, response) {
  if (!hasViews(response)) {
    return [];
  }
  var views = preprocessViews(response[PREFETCH][VIEWS]);
  persistViews(views, params);
  return views;
}

var CONTENT_TYPE$2 = "Content-Type";
var TEXT_PLAIN = "text/plain";
var JSON_ERROR$1 = "JSON parser error";
var EDGE_SERVER_PREFIX$1 = "mboxedge";
function getServerDomain$1(clientCode, serverDomain, overrideMboxEdgeServer) {
  if (!overrideMboxEdgeServer) {
    return serverDomain;
  }
  var cluster = getEdgeCluster();
  if (isBlank(cluster)) {
    return serverDomain;
  }
  return serverDomain.replace(clientCode, "" + EDGE_SERVER_PREFIX$1 + cluster);
}
function getUrl$2(scheme, serverDomain, endpoint) {
  return scheme + "//" + serverDomain + endpoint;
}
function createQueryString(clientCode, sessionId) {
  return stringifyQueryString({ client: clientCode, sessionId: sessionId });
}
function createHeaders$1() {
  var result = {};
  result[CONTENT_TYPE$2] = [TEXT_PLAIN];
  return result;
}
function createPayload(clientCode, deviceId, params) {
  var client = {};
  client[CLIENT] = clientCode;
  if (isBlank(deviceId)) {
    return index$1(client, params);
  }
  var ids = {};
  ids[DEVICE_ID] = deviceId;
  var id = {};
  id[ID$1] = ids;
  return index$1(client, id, params);
}
function createRequest$1(config, params) {
  var scheme = config[SCHEME];
  var endpoint = config[ENDPOINT];
  var clientCode = config[CLIENT_CODE];
  var overrideMboxEdgeServer = config[OVERRIDE_MBOX_EDGE_SERVER];
  var sessionId = getSessionId();
  var deviceId = getDeviceId();
  var serverDomain = getServerDomain$1(clientCode, config[SERVER_DOMAIN], overrideMboxEdgeServer);
  var url = getUrl$2(scheme, serverDomain, endpoint);
  var queryString = createQueryString(clientCode, sessionId);
  var payload = createPayload(clientCode, deviceId, params);
  var request = {};
  request[METHOD] = POST;
  request[URL$1] = url + "?" + queryString;
  request[HEADERS] = createHeaders$1();
  request[DATA$1] = JSON.stringify(payload);
  request[CREDENTIALS] = true;
  return request;
}
function isSuccess$2(status) {
  return status >= 200 && status < 300 || status === 304;
}
function createError$2(message) {
  var result = {};
  result[STATUS] = ERROR;
  result[ERROR] = message;
  return result;
}
function transformAjaxResponse(params, response) {
  var handleDeviceId = function handleDeviceId(res) {
    return saveDeviceId$1(setDeviceId, res);
  };
  var handleEdgeCluster = function handleEdgeCluster(res) {
    return saveEdgeCluster$1(setEdgeCluster, res);
  };
  var handleViews = function handleViews(res) {
    return processViews(params, res);
  };
  return resolve(response).then(handleDeviceId).then(handleEdgeCluster).then(handleError$6).then(handleViews);
}
function processAjaxResponse$1(resObj) {
  var status = resObj[STATUS];
  if (!isSuccess$2(status)) {
    return createError$2(ERROR_UNKNOWN);
  }
  try {
    return JSON.parse(resObj[RESPONSE]);
  } catch (e) {
    return createError$2(e.message || JSON_ERROR$1);
  }
}
function executeAjax$1(config, params) {
  var request = createRequest$1(config, params);
  return xhr(request).then(processAjaxResponse$1);
}

var DELAY$1 = 1000;
var VISIBILITY_STATE$1 = "visibilityState";
var VISIBLE$1 = "visible";
var STARTED$1 = [];
function runner$1(callback) {
  if (index$5[VISIBILITY_STATE$1] === VISIBLE$1) {
    index$4.requestAnimationFrame(callback);
    return;
  }
  delay(callback, DELAY$1);
}
function tick$1() {
  publish(TICK_EVENT);
  if (!isEmpty(STARTED$1)) {
    runner$1(tick$1);
  }
}
function startTicker$1() {
  STARTED$1.push(1);
  tick$1();
}
function stopTicker$1() {
  STARTED$1.pop();
}

var APPLY_OFFER$1 = "[applyOffer()]";
var notFound$1 = function notFound(action) {
  return isNil(action.found);
};
var isRedirectAction$1 = function isRedirectAction(action) {
  return !isNil(action[URL]);
};
var isClickTracking$1 = function isClickTracking(action) {
  return action[ACTION] === TRACK_CLICK || action[ACTION] === SIGNAL_CLICK;
};
function showElement$1(selector) {
  addClass(MARKER_CSS_CLASS, removeClass(MBOX_CSS_CLASS, selector));
}
function hideActions$1(actions) {
  var getCssSelector = function getCssSelector(action) {
    return action[CSS_SELECTOR];
  };
  var cssSelectors = filter(isNotBlank, map(getCssSelector, actions));
  injectActionHidingStyles(cssSelectors);
}
function displayAction$1(action) {
  var selector = action[SELECTOR];
  var cssSelector = action[CSS_SELECTOR];
  if (isNotBlank(selector) || isElement(selector)) {
    if (isClickTracking$1(action)) {
      addClass(CLICK_TRACKING_CSS_CLASS, removeClass(MBOX_CSS_CLASS, selector));
    } else {
      showElement$1(selector);
    }
  }
  if (isNotBlank(cssSelector)) {
    removeActionHidingStyle(cssSelector);
  }
}
function displayActions$1(actions) {
  forEach(displayAction$1, actions);
}
function createEventDetails$1(mbox, selectors) {
  var details = {};
  details[MBOX] = mbox;
  details[MESSAGE] = MISSING_SELECTORS;
  details[SELECTORS] = selectors;
  return details;
}
function createTrace$3(details) {
  var trace = {};
  trace[ERROR] = details;
  return trace;
}
function handleError$8(mbox, actions) {
  var getSelector = function getSelector(action) {
    return action[SELECTOR];
  };
  var isSelector = function isSelector(selector) {
    return isNotBlank(selector) || isElement(selector);
  };
  var selectors = filter(isSelector, map(getSelector, actions));
  var details = createEventDetails$1(mbox, selectors);
  var trace = createTrace$3(details);
  displayActions$1(actions);
  logWarn(MISSING_SELECTORS, actions);
  addTrace(CLIENT_TRACES, trace);
  notifyRenderingFailed(details);
}
function handleComplete$1(mbox, viewName, actions, eventToken) {
  var notFoundActions = filter(notFound$1, actions);
  if (!isEmpty(notFoundActions)) {
    handleError$8(mbox, notFoundActions);
    return;
  }
  var payload = {};
  payload[MBOX] = mbox;
  var details = {};
  details[VIEW_NAME] = viewName;
  details[EVENT_TOKEN] = eventToken;
  logDebug(ACTIONS_RENDERED);
  publish(OPTION_RENDER_COMPLETE_EVENT, details);
  notifyRenderingSucceeded(payload);
}
function renderAndDisplayAction$1(mbox, action) {
  render(trackEvent, mbox, action).then(function () {
    logDebug(ACTION_RENDERED, action);
    displayAction$1(action);
  })['catch'](function (error) {
    logDebug(UNEXPECTED_ERROR, error);
    displayAction$1(action);
  });
}
function renderActions$1(mbox, actions) {
  forEach(function (action) {
    if (!exists$2(action[SELECTOR])) {
      return;
    }
    renderAndDisplayAction$1(mbox, action);
    action.found = true;
  }, actions);
}
function startTimer$1(eventBus, selectorsPollingTimeout) {
  delay(function () {
    return publishOn(eventBus, TIMEOUT_EVENT);
  }, selectorsPollingTimeout);
}
function applyActions$1(eventBus, mbox, viewName, actions, eventToken) {
  subscribe(TICK_EVENT, function () {
    var arr = filter(notFound$1, actions);
    if (isEmpty(arr)) {
      publishOn(eventBus, RENDER_COMPLETE_EVENT);
      return;
    }
    renderActions$1(mbox, arr);
  });
  subscribeOnceTo(eventBus, RENDER_COMPLETE_EVENT, function () {
    unsubscribeFrom(eventBus, TIMEOUT_EVENT);
    stopTicker$1();
    handleComplete$1(mbox, viewName, actions, eventToken);
  });
  subscribeOnceTo(eventBus, TIMEOUT_EVENT, function () {
    unsubscribeFrom(eventBus, RENDER_COMPLETE_EVENT);
    stopTicker$1();
    handleComplete$1(mbox, viewName, actions, eventToken);
  });
}
function cloneActions(actions) {
  return reduce(function (acc, action) {
    acc.push(index$1({}, action));
    return acc;
  }, [], actions);
}
function executeRendering(option) {
  var config = getConfig();
  var selectorsPollingTimeout = config[SELECTORS_POLLING_TIMEOUT];
  var viewName = option[VIEW_NAME];
  var actions = cloneActions(option[ACTIONS]);
  var eventToken = option[EVENT_TOKEN];
  if (!isDeliveryEnabled()) {
    logWarn(DELIVERY_DISABLED);
    return;
  }
  var payload = {};
  var mbox = config[GLOBAL_MBOX_NAME];
  payload[MBOX] = mbox;
  if (isEmpty(actions)) {
    logDebug(APPLY_OFFER$1, NO_ACTIONS);
    publish(NO_OFFERS_EVENT, mbox);
    notifyRenderingNoOffers(payload);
    return;
  }
  var redirectAction = first(filter(isRedirectAction$1, actions));
  if (!isNil(redirectAction)) {
    payload[URL] = redirectAction[URL];
    logDebug(APPLY_OFFER$1, REDIRECT_ACTION);
    notifyRenderingRedirect(payload);
    redirect$1(redirectAction);
    return;
  }
  var eventBus = create$1();
  hideActions$1(actions);
  startTicker$1();
  startTimer$1(eventBus, selectorsPollingTimeout);
  publish(SELECTORS_HIDDEN_EVENT, mbox);
  notifyRenderingStart(payload);
  applyActions$1(eventBus, mbox, viewName, actions, eventToken);
}

var NOTIFICATION = "Sending notification";
function executeNotificationAjax(config, view) {
  var notifications = {};
  notifications[NOTIFICATION_ID] = uuid();
  notifications[EVENTS] = [].concat(view[EVENTS]);
  notifications[PARAMETERS] = view[PARAMETERS];
  var params = {};
  params[NOTIFICATIONS] = notifications;
  logDebug(NOTIFICATION, view[NAME], params);
  executeAjax$1(config, params).then(logDebug)['catch'](logWarn);
}

var RENDERING_VIEW = "Rendering view";
var RENDERING_OPTION = "Rendering option";
var VIEW_DELIVERY_SUCCESS = "View delivery success";
var VIEW_DELIVERY_ERROR = "View delivery error";
var VIEW_DELIVERY_EMPTY = "View delivery, no views";
var VIEW_NAME_ERROR = "View name is empty";
var currentView = null;
function sendViewNotification(config, view) {
  executeNotificationAjax(config, view);
}
function resetViewEvents(view) {
  view[EVENTS].length = 0;
}
function renderView(viewName) {
  var view = getItem$1(viewName);
  if (!isObject(view)) {
    return;
  }
  logDebug(RENDERING_VIEW, viewName);
  forEach(function (option) {
    logDebug(RENDERING_OPTION, option);
    executeRendering(option);
  }, view[OPTIONS]);
}
function handleSuccess$2(views) {
  if (isEmpty(views)) {
    logWarn(VIEW_DELIVERY_EMPTY);
    return;
  }
  logDebug(VIEW_DELIVERY_SUCCESS, views);
  renderView(currentView);
}
function handleError$5(error) {
  logWarn(VIEW_DELIVERY_ERROR, error);
}
function handleViewStart$1(viewName) {
  currentView = viewName;
  renderView(currentView);
}
function subscribeToViewStart() {
  subscribe(VIEW_START, handleViewStart$1);
}
function areAllOptionsRendered(view) {
  return view[OPTIONS].length === view[EVENTS].length;
}
function createEvent(eventToken) {
  var result = {};
  result[TYPE] = DISPLAY_EVENT;
  result[EVENT_TOKEN] = eventToken;
  result[TIMESTAMP] = Date.now();
  return result;
}
function handleOptionRender(config, details) {
  var viewName = details[VIEW_NAME];
  var eventToken = details[EVENT_TOKEN];
  var view = getItem$1(viewName);
  if (areAllOptionsRendered(view)) {
    return;
  }
  view[EVENTS].push(createEvent(eventToken));
  if (!areAllOptionsRendered(view)) {
    return;
  }
  sendViewNotification(config, view);
  resetViewEvents(view);
}
function subscribeToOptionRender(config) {
  subscribe(OPTION_RENDER_COMPLETE_EVENT, function (details) {
    return handleOptionRender(config, details);
  });
}
function initDelivery(win, config) {
  subscribeToViewStart();
  subscribeToOptionRender(config);
  var mboxName = config[GLOBAL_MBOX_NAME];
  var params = index$1({ pageURL: win.location.href }, getTargetPageParamsParameters(mboxName));
  var prefetch = {};
  prefetch[PARAMETERS] = params;
  var request = {};
  request[PREFETCH] = prefetch;
  var transform = function transform(res) {
    return transformAjaxResponse(params, res);
  };
  executeAjax$1(config, request).then(transform).then(handleSuccess$2)['catch'](handleError$5);
}
function triggerView(viewName) {
  if (isBlank(viewName)) {
    logWarn(VIEW_NAME_ERROR);
    return;
  }
  publish(VIEW_START, viewName);
}

function overridePublicApi(win) {
  var noop = function noop() {};
  win.adobe = win.adobe || {};
  win.adobe.target = {
    VERSION: "",
    event: {},
    getOffer: noop,
    applyOffer: noop,
    trackEvent: noop,
    registerExtension: noop,
    ___bootstrap: noop
  };
  win.mboxCreate = noop;
  win.mboxDefine = noop;
  win.mboxUpdate = noop;
}
function bootstrap(win, doc, settings) {
  if (win.adobe && win.adobe.target && typeof win.adobe.target.getOffer !== "undefined") {
    logWarn(ALREADY_INITIALIZED);
    return;
  }
  initConfig(settings);
  var config = getConfig();
  var version = config[VERSION];
  win.adobe.target.VERSION = version;
  win.adobe.target.event = {
    LIBRARY_LOADED: LIBRARY_LOADED,
    REQUEST_START: REQUEST_START,
    REQUEST_SUCCEEDED: REQUEST_SUCCEEDED,
    REQUEST_FAILED: REQUEST_FAILED$1,
    CONTENT_RENDERING_START: CONTENT_RENDERING_START,
    CONTENT_RENDERING_SUCCEEDED: CONTENT_RENDERING_SUCCEEDED,
    CONTENT_RENDERING_FAILED: CONTENT_RENDERING_FAILED,
    CONTENT_RENDERING_NO_OFFERS: CONTENT_RENDERING_NO_OFFERS,
    CONTENT_RENDERING_REDIRECT: CONTENT_RENDERING_REDIRECT
  };
  if (!config[ENABLED]) {
    overridePublicApi(win);
    logWarn(DELIVERY_DISABLED);
    return;
  }
  initAuthoringCode(win, doc, config);
  if (isDeliveryEnabled()) {
    injectStyles();
    initTraces();
    initGlobalMbox(config);
    initDelivery(win, config);
  }
  win.adobe.target.getOffer = getOffer;
  win.adobe.target.trackEvent = trackEvent;
  win.adobe.target.applyOffer = applyOffer;
  win.adobe.target.registerExtension = registerExtension;
  win.adobe.target.triggerView = triggerView;
  win.mboxCreate = mboxCreate;
  win.mboxDefine = mboxDefine;
  win.mboxUpdate = mboxUpdate;
  publish(LIBRARY_LOADED_EVENT);
  notifyLibraryLoaded();
}
var target = {
  ___bootstrap: bootstrap
};

exports.target = target;

}((window.adobe = window.adobe || {})));
window.adobe.target.___bootstrap(window, document, {
  "clientCode": "mobiletestus",
  "imsOrgId": "03DD36275AAFA0FF0A495D29@AdobeOrg",
  "serverDomain": "mobiletestus.tt.omtrdc.net",
  "crossDomain": "disabled",
  "timeout": 20000,
  "globalMboxName": "target-global-mbox",
  "globalMboxAutoCreate": false,
  "version": "1.0.0",
  "defaultContentHiddenStyle": "visibility: hidden;",
  "defaultContentVisibleStyle": "visibility: visible;",
  "bodyHiddenStyle": "body {opacity: 0 !important}",
  "bodyHidingEnabled": true,
  "deviceIdLifetime": 63244800000,
  "sessionIdLifetime": 1860000,
  "selectorsPollingTimeout": 5000,
  "visitorApiTimeout": 2000,
  "overrideMboxEdgeServer": false,
  "overrideMboxEdgeServerTimeout": 1860000,
  "optoutEnabled": false,
  "secureOnly": false,
  "supplementalDataIdParamTimeout": 30,
  "authoringScriptUrl": "//cdn.tt.omtrdc.net/cdn/target-vec.js",
  "requestMethod": "POST",
  "endpoint": "/rest/v1alpha1/delivery"
}
);
