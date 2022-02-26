(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"297762474_13","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!************************************************!*\
  !*** H:/work/aiDaChu_uni/polyfill/polyfill.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/*
 * @Author: zhang peng
 * @Date: 2021-08-03 10:57:51
 * @LastEditTime: 2021-10-15 20:24:24
 * @LastEditors: zhang peng
 * @Description:
 * @FilePath: \miniprogram-to-uniapp2\src\project\template\polyfill\polyfill.js
 *
 * Api polyfill
 * 2021-03-06
 * 因小程序转换到uniapp，再运行到各平台时，总有这样那样的api，没法支持，
 * 现根据uniapp文档对各平台的支持度，或实现，或调用success来抹平各平台的差异，
 * 让代码能正常运行，下一步再解决这些api的兼容问题。
 *
 * Author: 375890534@qq.com
 */
var base64Binary = __webpack_require__(/*! ./base64Binary */ 13);

/**
                                               * 获取guid
                                               */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
    v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/**
   * 检查api是否未实现，没实现返回true
   * @param {Object} api
   */
function isApiNotImplemented(api) {
  return uni[api] === undefined ||  true && uni[api].toString().indexOf("is not yet implemented") > -1;
}

/**
   * 条件编译
   */
function platformPolyfill() {





}


/**
   * 登录相关api polyfill
   */
function loginPolyfill() {
  if (isApiNotImplemented("login")) {
    uni.login = function (options) {
      console.warn("api: uni.login 登录 在当前平台不支持，【关键流程函数】 回调成功");
      options.success && options.success({
        code: guid(),
        errMsg: "login:ok" });

    };
  }

  if (isApiNotImplemented("checkSession")) {
    uni.checkSession = function (options) {
      console.warn("api: uni.checkSession 检查登录状态是否过期 在当前平台不支持，【关键流程函数】 回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("getUserInfo")) {
    uni.getUserInfo = function (options) {
      console.warn("api: uni.getUserInfo 获取用户信息 在当前平台不支持，【关键流程函数】回调成功");
      options.success && options.success({
        userInfo: "" });

    };
  }
  if (isApiNotImplemented("getUserProfile")) {
    uni.getUserProfile = function (options) {
      console.warn("api: uni.getUserProfile 获取用户授权信息 在当前平台不支持，【关键流程函数】回调成功");
      options.success && options.success({
        userInfo: "" });

    };
  }
}

/**
   * 地图相关
   */
function mapPolyfill() {
  if (isApiNotImplemented("chooseLocation")) {
    uni.chooseLocation = function (options) {
      console.warn("api: uni.chooseLocation 打开地图选择位置 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("openLocation")) {
    uni.openLocation = function (object) {
      console.warn("api: uni.openLocation 使用应用内置地图查看位置 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("createMapContext")) {
    uni.createMapContext = function (mapId) {
      console.warn("api: uni.createMapContext 创建并返回 map 上下文 mapContext 对象 在当前平台不支持，返回空");
      return {
        $getAppMap: null,
        getCenterLocation: function getCenterLocation(options) {
          options.fail && options.fail();
        },
        moveToLocation: function moveToLocation(options) {
          options.fail && options.fail();
        },
        translateMarker: function translateMarker(options) {
          options.fail && options.fail();
        },
        includePoints: function includePoints(options) {},
        getRegion: function getRegion(options) {
          options.fail && options.fail();
        },
        getScale: function getScale(options) {
          options.fail && options.fail();
        } };

    };
  }
}

/**
   * 字符编码
   */
function base64Polyfill() {
  //将 Base64 字符串转成 ArrayBuffer 对象
  if (isApiNotImplemented("base64ToArrayBuffer")) {
    uni.base64ToArrayBuffer = function (base64) {
      return base64Binary.base64ToArrayBuffer(base64);
    };
  }

  //将 ArrayBuffer 对象转成 Base64 字符串
  if (isApiNotImplemented("arrayBufferToBase64")) {
    uni.arrayBufferToBase64 = function (buffer) {
      return base64Binary.arrayBufferToBase64(buffer);
    };
  }
}


/**
   * 媒体相关
   */
function mediaPolyfill() {
  if (isApiNotImplemented("saveImageToPhotosAlbum")) {
    uni.saveImageToPhotosAlbum = function (options) {
      console.warn("api: uni.saveImageToPhotosAlbum 保存图片到系统相册 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("compressImage")) {
    uni.compressImage = function (object) {
      console.warn("api: uni.compressImage 压缩图片接口 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("chooseMessageFile")) {
    //从微信聊天会话中选择文件。
    uni.chooseMessageFile = function (object) {
      console.warn("api: uni.chooseMessageFile 从微信聊天会话中选择文件。 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getRecorderManager")) {
    //获取全局唯一的录音管理器 recorderManager
    uni.getRecorderManager = function (object) {
      console.warn("api: uni.getRecorderManager 获取全局唯一的录音管理器 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("getBackgroundAudioManager")) {
    //获取全局唯一的背景音频管理器 backgroundAudioManager
    uni.getBackgroundAudioManager = function (object) {
      console.warn("api: uni.getBackgroundAudioManager 获取全局唯一的背景音频管理器 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("chooseMedia")) {
    // 拍摄或从手机相册中选择图片或视频
    uni.chooseMedia = function (object) {
      console.warn("api: uni.chooseMedia 拍摄或从手机相册中选择图片或视频 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("saveVideoToPhotosAlbum")) {
    // 保存视频到系统相册
    uni.saveVideoToPhotosAlbum = function (object) {
      console.warn("api: uni.saveVideoToPhotosAlbum 保存视频到系统相册 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getVideoInfo")) {
    // 获取视频详细信息
    uni.getVideoInfo = function (object) {
      console.warn("api: uni.getVideoInfo 获取视频详细信息 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("compressVideo")) {
    // 压缩视频接口
    uni.compressVideo = function (object) {
      console.warn("api: uni.compressVideo 压缩视频接口 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }


  if (isApiNotImplemented("openVideoEditor")) {
    // 打开视频编辑器
    uni.openVideoEditor = function (object) {
      console.warn("api: uni.openVideoEditor 打开视频编辑器 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }
}

/**
   * 设备
   */
function devicePolyfill() {
  if (isApiNotImplemented("canIUse")) {
    // 判断应用的 API，回调，参数，组件等是否在当前版本可用。
    // h5时，恒返回true
    uni.canIUse = function (object) {
      console.warn("api: uni.canIUse 判断API在当前平台是否可用 返回true");
      return true;
    };
  }

  //微信小程序
  if (isApiNotImplemented("startDeviceMotionListening")) {
    // 开始监听设备方向的变化
    uni.startDeviceMotionListening = function (options) {
      console.warn("api: uni.startDeviceMotionListening 开始监听设备方向的变化 在当前平台不支持");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("onMemoryWarning")) {
    // 监听内存不足告警事件。
    uni.onMemoryWarning = function (callback) {
      console.warn("监听内存不足告警事件，仅支持微信小程序、支付宝小程序、百度小程序、QQ小程序，当前平台不支持，已注释");
    };
  }

  if (isApiNotImplemented("offNetworkStatusChange")) {
    // 取消监听网络状态变化
    uni.offNetworkStatusChange = function (callback) {};
  }
  if (isApiNotImplemented("offAccelerometerChange")) {
    // 取消监听加速度数据。
    uni.offAccelerometerChange = function (callback) {};
  }
  if (isApiNotImplemented("startAccelerometer")) {
    // 开始监听加速度数据。
    uni.startAccelerometer = function (callback) {
      console.warn("api: uni.startAccelerometer 开始监听加速度数据 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("offCompassChange")) {
    // 取消监听罗盘数据
    uni.offCompassChange = function (callback) {
      console.warn("api: uni.offCompassChange 取消监听罗盘数据 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("startCompass")) {
    // 开始监听罗盘数据
    uni.startCompass = function (callback) {
      console.warn("api: uni.startCompass 开始监听罗盘数据 在当前平台不支持");
    };
  }


  if (isApiNotImplemented("onGyroscopeChange")) {
    // 监听陀螺仪数据变化事件
    uni.onGyroscopeChange = function (callback) {
      console.warn("api: uni.onGyroscopeChange 监听陀螺仪数据变化事件 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("startGyroscope")) {
    // 开始监听陀螺仪数据
    uni.startGyroscope = function (callback) {
      console.warn("api: uni.startGyroscope 监听陀螺仪数据变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopGyroscope")) {
    // 停止监听陀螺仪数据
    uni.stopGyroscope = function (callback) {
      console.warn("api: uni.stopGyroscope 停止监听陀螺仪数据 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("scanCode")) {
    // 调起客户端扫码界面，扫码成功后返回对应的结果
    uni.scanCode = function (callback) {
      console.warn("api: uni.scanCode 扫描二维码 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("setClipboardData")) {
    // 设置系统剪贴板的内容
    uni.setClipboardData = function (callback) {
      console.warn("api: uni.setClipboardData 设置系统剪贴板的内容 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getClipboardData")) {
    // 获取系统剪贴板内容
    uni.getClipboardData = function (callback) {
      console.warn("api: uni.getClipboardData 获取系统剪贴板内容 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("setScreenBrightness")) {
    // 设置屏幕亮度
    uni.setScreenBrightness = function (callback) {
      console.warn("api: uni.setScreenBrightness 设置屏幕亮度 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getScreenBrightness")) {
    // 获取屏幕亮度
    uni.getScreenBrightness = function (callback) {
      console.warn("api: uni.getScreenBrightness 获取屏幕亮度 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("setKeepScreenOn")) {
    // 设置是否保持常亮状态
    uni.setKeepScreenOn = function (callback) {
      console.warn("api: uni.setKeepScreenOn 设置是否保持常亮状态 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onUserCaptureScreen")) {
    // 监听用户主动截屏事件
    uni.onUserCaptureScreen = function (callback) {
      console.warn("api: uni.onUserCaptureScreen 监听用户主动截屏事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("addPhoneContact")) {
    // 添加联系人
    uni.addPhoneContact = function (callback) {
      console.warn("api: uni.addPhoneContact 添加联系人 在当前平台不支持");
    };
  }
}

/**
   * 界面相关
   */
function uiPolyfill() {
  if (isApiNotImplemented("hideNavigationBarLoading")) {
    // 在当前页面隐藏导航条加载动画
    uni.hideNavigationBarLoading = function (options) {
      console.warn("api: uni.hideNavigationBarLoading 在当前页面隐藏导航条加载动画 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("hideHomeButton")) {
    // 隐藏返回首页按钮
    uni.hideHomeButton = function (options) {
      console.warn("api: uni.hideHomeButton 隐藏返回首页按钮 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("setTabBarItem")) {
    // 动态设置 tabBar 某一项的内容
    uni.setTabBarItem = function (options) {
      console.warn("api: uni.setTabBarItem 动态设置 tabBar 某一项的内容 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("setTabBarStyle")) {
    // 动态设置 tabBar 的整体样式
    uni.setTabBarStyle = function (options) {
      console.warn("api: uni.setTabBarStyle 动态设置 tabBar 的整体样式 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("hideTabBar")) {
    // 隐藏 tabBar
    uni.hideTabBar = function (options) {
      console.warn("api: uni.hideTabBar 隐藏 tabBar 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }


  if (isApiNotImplemented("showTabBar")) {
    // 显示 tabBar
    uni.showTabBar = function (options) {
      console.warn("api: uni.showTabBar 显示 tabBar 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("setTabBarBadge")) {
    // 为 tabBar 某一项的右上角添加文本
    uni.setTabBarBadge = function (options) {
      console.warn("api: uni.setTabBarBadge 为 tabBar 某一项的右上角添加文本 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("removeTabBarBadge")) {
    // 移除 tabBar 某一项右上角的文本
    uni.removeTabBarBadge = function (options) {
      console.warn("api: uni.removeTabBarBadge 移除 tabBar 某一项右上角的文本 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("showTabBarRedDot")) {
    // 显示 tabBar 某一项的右上角的红点
    uni.showTabBarRedDot = function (options) {
      console.warn("api: uni.showTabBarRedDot 显示 tabBar 某一项的右上角的红点 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("hideTabBarRedDot")) {
    // 隐藏 tabBar 某一项的右上角的红点
    uni.hideTabBarRedDot = function (options) {
      console.warn("api: uni.hideTabBarRedDot 隐藏 tabBar 某一项的右上角的红点 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  ///////////////////////////////
  if (isApiNotImplemented("setBackgroundColor")) {
    // 动态设置窗口的背景色
    uni.setBackgroundColor = function (options) {
      console.warn("api: uni.setBackgroundColor 动态设置窗口的背景色 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("setBackgroundTextStyle")) {
    // 动态设置下拉背景字体、loading 图的样式
    uni.setBackgroundTextStyle = function (options) {
      console.warn("api: uni.setBackgroundTextStyle 动态设置下拉背景字体、loading 图的样式 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("onWindowResize")) {
    // 监听窗口尺寸变化事件
    uni.onWindowResize = function (callback) {
      console.warn("api: uni.onWindowResize 监听窗口尺寸变化事件 在当前平台不支持，执行失败");
      callback && callback();
    };
  }
  if (isApiNotImplemented("offWindowResize")) {
    // 取消监听窗口尺寸变化事件
    uni.offWindowResize = function (callback) {
      console.warn("api: uni.offWindowResize 取消监听窗口尺寸变化事件 在当前平台不支持，执行失败");
      callback && callback();
    };
  }
  if (isApiNotImplemented("loadFontFace")) {
    // 动态加载网络字体
    uni.loadFontFace = function (options) {
      console.warn("api: uni.loadFontFace 动态加载网络字体 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getMenuButtonBoundingClientRect")) {
    // 微信胶囊按钮布局信息
    uni.getMenuButtonBoundingClientRect = function () {
      console.warn("api: uni.getMenuButtonBoundingClientRect 微信胶囊按钮布局信息 在当前平台不支持，执行失败");
    };
  }
}
/**
   * file
   */
function filePolyfill() {
  if (isApiNotImplemented("saveFile")) {
    // 保存文件到本地
    uni.saveFile = function (options) {
      console.warn("api: uni.saveFile 保存文件到本地 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getSavedFileList")) {
    // 获取本地已保存的文件列表
    uni.getSavedFileList = function (options) {
      console.warn("api: uni.getSavedFileList 获取本地已保存的文件列表 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getSavedFileInfo")) {
    // 获取本地文件的文件信息
    uni.getSavedFileInfo = function (options) {
      console.warn("api: uni.getSavedFileInfo 获取本地文件的文件信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("removeSavedFile")) {
    // 删除本地存储的文件
    uni.removeSavedFile = function (options) {
      console.warn("api: uni.removeSavedFile 删除本地存储的文件 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getFileInfo")) {
    // 获取文件信息
    uni.getFileInfo = function (options) {
      console.warn("api: uni.getFileInfo 获取文件信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("openDocument")) {
    // 新开页面打开文档
    uni.openDocument = function (options) {
      console.warn("api: uni.openDocument 新开页面打开文档 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getFileSystemManager")) {
    // 获取全局唯一的文件管理器
    uni.getFileSystemManager = function () {
      console.warn("api: uni.getFileSystemManager 获取全局唯一的文件管理器 在当前平台不支持，执行失败");
    };
  }
}

/**
   * canvas
   */
function canvasPolyfill() {
  if (isApiNotImplemented("createOffscreenCanvas")) {
    // 创建离屏 canvas 实例
    uni.createOffscreenCanvas = function () {
      console.warn("api: uni.createOffscreenCanvas 创建离屏 canvas 实例 在当前平台不支持，执行失败");
    };
  }

  if (isApiNotImplemented("canvasToTempFilePath")) {
    // 把当前画布指定区域的内容导出生成指定大小的图片
    uni.canvasToTempFilePath = function () {
      console.warn("api: uni.canvasToTempFilePath 把当前画布指定区域的内容导出生成指定大小的图片 在当前平台不支持，执行失败");
    };
  }
}

/**
   * Ad广告
   */
function adPolyfill() {
  if (isApiNotImplemented("createRewardedVideoAd")) {
    // 激励视频广告
    uni.createRewardedVideoAd = function () {
      console.warn("api: uni.createRewardedVideoAd 激励视频广告 在当前平台不支持，执行失败");
      return {
        show: function show() {},
        onLoad: function onLoad() {},
        offLoad: function offLoad() {},
        load: function load() {},
        onError: function onError() {},
        offError: function offError() {},
        onClose: function onClose() {},
        offClose: function offClose() {} };

    };
  }
  if (isApiNotImplemented("createInterstitialAd")) {
    // 插屏广告组件
    uni.createInterstitialAd = function () {
      console.warn("api: uni.createInterstitialAd 插屏广告组件 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 第三方
   */
function pluginsPolyfill() {
  if (isApiNotImplemented("getProvider")) {
    // 获取服务供应商
    uni.getProvider = function (options) {
      console.warn("api: uni.getProvider 获取服务供应商 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("showShareMenu")) {
    // 小程序的原生菜单中显示分享按钮
    uni.showShareMenu = function (options) {
      console.warn("api: uni.showShareMenu 小程序的原生菜单中显示分享按钮 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("hideShareMenu")) {
    // 小程序的原生菜单中显示分享按钮
    uni.hideShareMenu = function (options) {
      console.warn("api: uni.hideShareMenu 小程序的原生菜单中隐藏分享按钮 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("requestPayment")) {
    // 支付
    uni.requestPayment = function (options) {
      console.error("api: uni.requestPayment 支付 在当前平台不支持(需自行参考文档封装)，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("createWorker")) {
    // 创建一个 Worker 线程
    uni.createWorker = function () {
      console.error("api: uni.createWorker 创建一个 Worker 线程 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 其他
   */
function otherPolyfill() {
  if (isApiNotImplemented("authorize")) {
    // 提前向用户发起授权请求
    uni.authorize = function (options) {
      console.warn("api: uni.authorize 提前向用户发起授权请求 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("openSetting")) {
    // 调起客户端小程序设置界面
    uni.openSetting = function (options) {
      console.warn("api: uni.openSetting 调起客户端小程序设置界面 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getSetting")) {
    // 获取用户的当前设置
    uni.getSetting = function (options) {
      console.warn("api: uni.getSetting 获取用户的当前设置 在当前平台不支持，【关键流程函数】回调成功");
      options.success && options.success({
        authSetting: {
          scope: {
            userInfo: false } } });



    };
  }

  if (isApiNotImplemented("chooseAddress")) {
    // 获取用户收货地址
    uni.chooseAddress = function (options) {
      console.warn("api: uni.chooseAddress 获取用户收货地址 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("chooseInvoiceTitle")) {
    // 选择用户的发票抬头
    uni.chooseInvoiceTitle = function (options) {
      console.warn("api: uni.chooseInvoiceTitle 选择用户的发票抬头 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("navigateToMiniProgram")) {
    // 打开另一个小程序
    uni.navigateToMiniProgram = function (options) {
      console.warn("api: uni.navigateToMiniProgram 打开另一个小程序 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("navigateBackMiniProgram")) {
    // 跳转回上一个小程序
    uni.navigateBackMiniProgram = function (options) {
      console.warn("api: uni.navigateBackMiniProgram 跳转回上一个小程序 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getAccountInfoSync")) {
    // 获取当前帐号信息
    uni.getAccountInfoSync = function (options) {
      console.warn("api: uni.getAccountInfoSync 获取当前帐号信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("requestSubscribeMessage")) {
    // 订阅消息
    uni.requestSubscribeMessage = function (options) {
      console.warn("api: uni.requestSubscribeMessage 订阅消息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getUpdateManager")) {
    // 管理小程序更新
    uni.getUpdateManager = function (options) {
      console.error("api: uni.getUpdateManager 管理小程序更新 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("setEnableDebug")) {
    // 设置是否打开调试开关
    uni.setEnableDebug = function (options) {
      console.error("api: uni.setEnableDebug 设置是否打开调试开关 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("getExtConfig")) {
    // 获取第三方平台自定义的数据字段
    uni.getExtConfig = function (options) {
      console.error("api: uni.getExtConfig 获取第三方平台自定义的数据字段 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("getExtConfigSync")) {
    // uni.getExtConfig 的同步版本
    uni.getExtConfigSync = function (options) {
      console.error("api: uni.getExtConfigSync uni.getExtConfig 的同步版本 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 认证
   */
function soterAuthPolyfill() {
  if (isApiNotImplemented("startSoterAuthentication")) {
    // 开始 SOTER 生物认证
    uni.startSoterAuthentication = function (options) {
      console.warn("api: uni.startSoterAuthentication 开始 SOTER 生物认证 在当前平台不支持");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("checkIsSupportSoterAuthentication")) {
    // 获取本机支持的 SOTER 生物认证方式
    uni.checkIsSupportSoterAuthentication = function (options) {
      console.warn("api: uni.checkIsSupportSoterAuthentication 开获取本机支持的 SOTER 生物认证方式 在当前平台不支持");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("checkIsSoterEnrolledInDevice")) {
    // 获取设备内是否录入如指纹等生物信息的接口
    uni.checkIsSoterEnrolledInDevice = function (options) {
      console.warn("api: uni.checkIsSoterEnrolledInDevice 获取设备内是否录入如指纹等生物信息的接口 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * nfc
   */
function nfcPolyfill() {
  //微信小程序
  if (isApiNotImplemented("startHCE")) {
    // 初始化 NFC 模块
    uni.startHCE = function (options) {
      console.warn("api: uni.startHCE 初始化 NFC 模块 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * 电量
   */
function batteryPolyfill() {
  //微信小程序
  if (isApiNotImplemented("getBatteryInfo")) {
    // 获取设备电量
    uni.getBatteryInfo = function (options) {
      console.warn("api: uni.getBatteryInfo 获取设备电量 在当前平台不支持");
      options.success && options.success();
    };
  }
  //微信小程序
  if (isApiNotImplemented("getBatteryInfoSync")) {
    // 同步获取设备电量
    uni.getBatteryInfoSync = function (options) {
      console.warn("api: uni.getBatteryInfoSync 同步获取设备电量 在当前平台不支持");
    };
  }
}

/**
   * wifi
   */
function wifiPolyfill() {
  //微信小程序
  if (isApiNotImplemented("startWifi")) {
    // 初始化 Wi-Fi 模块
    uni.startWifi = function (options) {
      console.warn("api: uni.startWifi 初始化 Wi-Fi 模块 在当前平台不支持");
      options.success && options.success();
    };
  }
  //字节跳动
  if (isApiNotImplemented("getConnectedWifi")) {
    // 获取设备当前所连的 WiFi 信息
    uni.getConnectedWifi = function (options) {
      console.warn("api: uni.getConnectedWifi 初获取设备当前所连的 WiFi 信息 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * 蓝牙
   */
function bluetoothPolyfill() {
  //蓝牙
  if (isApiNotImplemented("openBluetoothAdapter")) {
    // 初始化蓝牙模块
    uni.openBluetoothAdapter = function (object) {
      console.warn("api: uni.openBluetoothAdapter 初始化蓝牙模块 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("startBluetoothDevicesDiscovery")) {
    // 开始搜寻附近的蓝牙外围设备
    uni.startBluetoothDevicesDiscovery = function (callback) {
      console.warn("api: uni.startBluetoothDevicesDiscovery 开始搜寻附近的蓝牙外围设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBluetoothDeviceFound")) {
    // 监听寻找到新设备的事件
    uni.onBluetoothDeviceFound = function (callback) {
      console.warn("api: uni.onBluetoothDeviceFound 监听寻找到新设备的事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopBluetoothDevicesDiscovery")) {
    // 停止搜寻附近的蓝牙外围设备
    uni.stopBluetoothDevicesDiscovery = function (callback) {
      console.warn("api: uni.stopBluetoothDevicesDiscovery 停止搜寻附近的蓝牙外围设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBluetoothAdapterStateChange")) {
    // 监听蓝牙适配器状态变化事件
    uni.onBluetoothAdapterStateChange = function (callback) {
      console.warn("api: uni.onBluetoothAdapterStateChange 监听蓝牙适配器状态变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getConnectedBluetoothDevices")) {
    // 根据 uuid 获取处于已连接状态的设备
    uni.getConnectedBluetoothDevices = function (callback) {
      console.warn("api: uni.getConnectedBluetoothDevices 根据 uuid 获取处于已连接状态的设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBluetoothDevices")) {
    // 获取在蓝牙模块生效期间所有已发现的蓝牙设备
    uni.getBluetoothDevices = function (callback) {
      console.warn("api: uni.getBluetoothDevices 获取在蓝牙模块生效期间所有已发现的蓝牙设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBluetoothAdapterState")) {
    // 获取本机蓝牙适配器状态
    uni.getBluetoothAdapterState = function (callback) {
      console.warn("api: uni.getBluetoothAdapterState 获取本机蓝牙适配器状态 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("closeBluetoothAdapter")) {
    // 关闭蓝牙模块
    uni.closeBluetoothAdapter = function (callback) {
      console.warn("api: uni.closeBluetoothAdapter 关闭蓝牙模块 在当前平台不支持");
    };
  }
}

/**
   * 低功耗蓝牙
   */
function blePolyfill() {
  if (isApiNotImplemented("setBLEMTU")) {
    // 设置蓝牙最大传输单元
    uni.setBLEMTU = function (callback) {
      console.warn("api: uni.setBLEMTU 设置蓝牙最大传输单元 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("readBLECharacteristicValue")) {
    // 读取低功耗蓝牙设备的特征值的二进制数据值
    uni.readBLECharacteristicValue = function (callback) {
      console.warn("api: uni.readBLECharacteristicValue 读取低功耗蓝牙设备的特征值的二进制数据值 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBLEConnectionStateChange")) {
    // 关闭蓝牙模块
    uni.onBLEConnectionStateChange = function (callback) {
      console.warn("api: uni.onBLEConnectionStateChange 监听低功耗蓝牙连接状态的改变事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("notifyBLECharacteristicValueChange")) {
    // 启用低功耗蓝牙设备特征值变化时的 notify 功能
    uni.notifyBLECharacteristicValueChange = function (callback) {
      console.warn("api: uni.notifyBLECharacteristicValueChange 启用低功耗蓝牙设备特征值变化时的 notify 功能 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBLEDeviceServices")) {
    // 获取蓝牙设备所有服务
    uni.getBLEDeviceServices = function (callback) {
      console.warn("api: uni.getBLEDeviceServices 获取蓝牙设备所有服务 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBLEDeviceRSSI")) {
    // 获取蓝牙设备的信号强度
    uni.getBLEDeviceRSSI = function (callback) {
      console.warn("api: uni.getBLEDeviceRSSI 获取蓝牙设备的信号强度 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("createBLEConnection")) {
    // 连接低功耗蓝牙设备
    uni.createBLEConnection = function (callback) {
      console.warn("api: uni.createBLEConnection 连接低功耗蓝牙设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("closeBLEConnection")) {
    // 断开与低功耗蓝牙设备的连接
    uni.closeBLEConnection = function (callback) {
      console.warn("api: uni.closeBLEConnection 断开与低功耗蓝牙设备的连接 在当前平台不支持");
    };
  }
}

/**
   * iBeacon
   */
function iBeaconPolyfill() {
  if (isApiNotImplemented("onBeaconServiceChange")) {
    // 监听 iBeacon 服务状态变化事件
    uni.onBeaconServiceChange = function (callback) {
      console.warn("api: uni.onBeaconServiceChange 监听 iBeacon 服务状态变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBeaconUpdate")) {
    // 监听 iBeacon 设备更新事件
    uni.onBeaconUpdate = function (callback) {
      console.warn("api: uni.onBeaconUpdate 监听 iBeacon 设备更新事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBeacons")) {
    // 获取所有已搜索到的 iBeacon 设备
    uni.getBeacons = function (callback) {
      console.warn("api: uni.getBeacons 获取所有已搜索到的 iBeacon 设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("startBeaconDiscovery")) {
    // 开始搜索附近的 iBeacon 设备
    uni.startBeaconDiscovery = function (callback) {
      console.warn("api: uni.startBeaconDiscovery 开始搜索附近的 iBeacon 设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopBeaconDiscovery")) {
    // 停止搜索附近的 iBeacon 设备
    uni.stopBeaconDiscovery = function (callback) {
      console.warn("api: uni.stopBeaconDiscovery 停止搜索附近的 iBeacon 设备 在当前平台不支持");
    };
  }
}

/**
  * uni.navigateTo 和 uni.redirectTo 不能直接跳转tabbar里面的页面，拦截fail，并当它为tabbar页面时，直接调用uni.switchTab()
  */
function routerPolyfill() {
  var routerApiFailEventHandle = function routerApiFailEventHandle(res, options) {
    if (res.errMsg.indexOf('tabbar page') > -1) {
      console.error('res.errMsg: ' + res.errMsg);
      var apiName = res.errMsg.match(/not\s(\w+)\sa/)[1];
      console.log(apiName);
      var url = options.url;
      if (url) {
        var queryString = url.split('?')[1];
        if (queryString) {
          console.error(apiName + " 的参数将被忽略：" + queryString);
        }
        uni.switchTab({
          url: url });

      }
    }
  };

  var routerApiHandle = function routerApiHandle(oriLogFunc) {
    return function (options) {
      try {
        if (options.fail) {
          options.fail = function fail(failFun) {
            return function (res) {
              routerApiFailEventHandle(res, options);
              failFun(res);
            };
          }(options.fail);
        } else {
          options.fail = function (res) {
            routerApiFailEventHandle(res, options);
          };
        }
        oriLogFunc.call(oriLogFunc, options);
      } catch (e) {
        console.error('uni.navigateTo or uni.redirectTo error', e);
      }
    };
  };

  uni.navigateTo = routerApiHandle(uni.navigateTo);
  uni.redirectTo = routerApiHandle(uni.redirectTo);
}

var isInit = false;
/**
                     * polyfill 入口
                     */
function init() {
  if (isInit) return;
  isInit = true;

  console.log("Api polyfill start");
  //条件编译
  platformPolyfill();
  //登录
  loginPolyfill();
  //base64
  base64Polyfill();
  //地图
  mapPolyfill();
  //设备
  devicePolyfill();

  //媒体相关
  mediaPolyfill();

  //蓝牙
  bluetoothPolyfill();
  //低功耗蓝牙
  blePolyfill();
  //iBeacon
  iBeaconPolyfill();
  //wifi
  wifiPolyfill();
  //电量信息
  batteryPolyfill();
  //nfc
  nfcPolyfill();
  //auth
  soterAuthPolyfill();

  //ui
  uiPolyfill();
  //file
  filePolyfill();
  //canvas
  canvasPolyfill();
  //ad
  adPolyfill();
  //plugins
  pluginsPolyfill();
  //other
  otherPolyfill();

  //router
  routerPolyfill();
}


module.exports = {
  init: init,
  guid: guid };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 123:
/*!************************************************!*\
  !*** H:/work/aiDaChu_uni/libs/graceChecker.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**数据验证（表单验证）来自 grace.hcoder.net作者 hcoder 深海*/
//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html

module.exports = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {
        return true;
      }
      if (!rule[i].name) {
        return true;
      }
      if (!rule[i].errorMsg) {
        return true;
      }
      if (!data[rule[i].name]) {
        this.error = rule[i].errorMsg;
        return false;
      }
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  } };

/***/ }),

/***/ 13:
/*!****************************************************!*\
  !*** H:/work/aiDaChu_uni/polyfill/base64Binary.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @Author: zhang peng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @Date: 2021-08-03 10:57:51
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @LastEditTime: 2021-08-16 17:25:43
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @LastEditors: zhang peng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @Description:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @FilePath: \miniprogram-to-uniapp2\src\project\template\polyfill\base64Binary.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 借鉴自：https://github.com/dankogai/js-base64/blob/main/base64.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 因uniapp没有window，也无法使用Buffer，因此直接使用polyfill
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64chs = _toConsumableArray(b64ch);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var b64tab = function (a) {
  var tab = {};
  a.forEach(function (c, i) {return tab[c] = i;});
  return tab;
}(b64chs);
var _fromCC = String.fromCharCode.bind(String);

/**
                                                 * polyfill version of `btoa`
                                                 */
var btoaPolyfill = function btoaPolyfill(bin) {
  // console.log('polyfilled');
  var u32,c0,c1,c2,asc = '';
  var pad = bin.length % 3;
  for (var i = 0; i < bin.length;) {
    if ((c0 = bin.charCodeAt(i++)) > 255 ||
    (c1 = bin.charCodeAt(i++)) > 255 ||
    (c2 = bin.charCodeAt(i++)) > 255)
    throw new TypeError('invalid character found');
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] +
    b64chs[u32 >> 12 & 63] +
    b64chs[u32 >> 6 & 63] +
    b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};

/**
    * polyfill version of `atob`
    */
var atobPolyfill = function atobPolyfill(asc) {
  // console.log('polyfilled');
  asc = asc.replace(/\s+/g, '');
  if (!b64re.test(asc))
  throw new TypeError('malformed base64.');
  asc += '=='.slice(2 - (asc.length & 3));
  var u24,bin = '',r1,r2;
  for (var i = 0; i < asc.length;) {
    u24 = b64tab[asc.charAt(i++)] << 18 |
    b64tab[asc.charAt(i++)] << 12 |
    (r1 = b64tab[asc.charAt(i++)]) << 6 | (
    r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) :
    r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) :
    _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};

/**
    * base64转ArrayBuffer
    */
function base64ToArrayBuffer(base64) {
  var binaryStr = atobPolyfill(base64);
  var byteLength = binaryStr.length;
  var bytes = new Uint8Array(byteLength);
  for (var i = 0; i < byteLength; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
   * ArrayBuffer转base64
   */
function arrayBufferToBase64(buffer) {
  var binaryStr = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binaryStr += String.fromCharCode(bytes[i]);
  }
  return btoaPolyfill(binaryStr);
}

module.exports = {
  base64ToArrayBuffer: base64ToArrayBuffer,
  arrayBufferToBase64: arrayBufferToBase64 };

/***/ }),

/***/ 14:
/*!**********************************************!*\
  !*** H:/work/aiDaChu_uni/polyfill/mixins.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author: zhang peng
                                                                                                      * @Date: 2021-08-03 10:57:51
                                                                                                      * @LastEditTime: 2021-10-15 20:27:53
                                                                                                      * @LastEditors: zhang peng
                                                                                                      * @Description:
                                                                                                      * @FilePath: \miniprogram-to-uniapp2\src\project\template\polyfill\mixins.js
                                                                                                      *
                                                                                                      * 如果你想删除本文件，请先确认它使用的范围，感谢合作~
                                                                                                      * 如有疑问，请直接联系: 375890534@qq.com
                                                                                                      */var _default =
{
  methods: {
    /**
              * 转义符换成普通字符
              * @param {*} str
              * @returns
              */
    escape2Html: function escape2Html(str) {
      if (!str) return str;
      var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"' };

      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
      });
    },
    /**
        * 普通字符转换成转义符
        * @param {*} sHtml
        * @returns
        */
    html2Escape: function html2Escape(sHtml) {
      if (!sHtml) return sHtml;
      return sHtml.replace(/[<>&"]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;' }[
        c];
      });
    },
    /**
        * setData polyfill 勿删!!!
        * 用于转换后的uniapp的项目能直接使用this.setData()函数
        * @param {*} obj
        * @param {*} callback
        */
    setData: function setData(obj, callback) {
      var that = this;
      var handleData = function handleData(tepData, tepKey, afterKey) {
        var tepData2 = tepData;
        tepKey = tepKey.split('.');
        tepKey.forEach(function (item) {
          if (tepData[item] === null || tepData[item] === undefined) {
            var reg = /^[0-9]+$/;
            tepData[item] = reg.test(afterKey) ? [] : {};
            tepData2 = tepData[item];
          } else {
            tepData2 = tepData[item];
          }
        });
        return tepData2;
      };
      var isFn = function isFn(value) {
        return typeof value == 'function' || false;
      };
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        key = key.replace(/\]/g, '').replace(/\[/g, '.');
        var front, after;
        var index_after = key.lastIndexOf('.');
        if (index_after != -1) {
          after = key.slice(index_after + 1);
          front = handleData(that, key.slice(0, index_after), after);
        } else {
          after = key;
          front = that;
        }
        if (front.$data && front.$data[after] === undefined) {
          Object.defineProperty(front, after, {
            get: function get() {
              return front.$data[after];
            },
            set: function set(newValue) {
              front.$data[after] = newValue;
              that.hasOwnProperty("$forceUpdate") && that.$forceUpdate();
            },
            enumerable: true,
            configurable: true });

          front[after] = val;
        } else {
          that.$set(front, after, val);
        }
      });
      // this.$forceUpdate();
      isFn(callback) && this.$nextTick(callback);
    },
    /**
        * 解析事件里的动态函数名，这种没有()的函数名，在uniapp不被执行
        * 比如：<view bindtap="{{openId==undefined?'denglu':'hy_to'}}">立即</view>
        * @param {*} exp
        */
    parseEventDynamicCode: function parseEventDynamicCode(exp) {
      if (typeof eval("this." + exp) === 'function') {
        eval("this." + exp + '()');
      }
    },
    /**
        * 用于处理对props进行赋值的情况
        * //简单处理一下就行了
        *
        * @param {*} target
        * @returns
        */
    deepClone: function deepClone(target) {
      //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
      // const toString = Object.prototype.toString
      // toString.call(obj) === '[object Array]' ? clone = clone || [] : clone = clone || {}
      // for (const i in obj) {
      //   if (typeof obj[i] === 'object' && obj[i]!==null) {
      //     // 要考虑深复制问题了
      //     if (Array.isArray(obj[i])) {
      //       // 这是数组
      //       clone[i] = []
      //     } else {
      //       // 这是对象
      //       clone[i] = {}
      //     }
      //     deepClone(obj[i], clone[i])
      //   } else {
      //     clone[i] = obj[i]
      //   }
      // }
      // return clone
      return JSON.parse(JSON.stringify(obj));
    } } };exports.default = _default;

/***/ }),

/***/ 148:
/*!******************************************!*\
  !*** H:/work/aiDaChu_uni/utils/cache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var e = getApp();
module.exports = {
  set: function set(t, a, n) {
    e.globalData._cache[t] = {
      data: a,
      expired_at: new Date().getTime() + 1e3 * n };

  },
  get: function get(t) {
    var a = e.globalData._cache[t];
    return a && a.expired_at > new Date().getTime() ? a.data : null;
  } };

/***/ }),

/***/ 15:
/*!****************************************!*\
  !*** H:/work/aiDaChu_uni/api/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";














































var _requestServe = _interopRequireDefault(__webpack_require__(/*! ./requestServe.js */ 16));
var _hostConst = _interopRequireDefault(__webpack_require__(/*! ../config/hostConst.js */ 47));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /***************************************************************
                                                                                                                                                                          * 接口参数介绍
                                                                                                                                                                          * name 接口名称 以XX:XX格式取,主要用在输出日志
                                                                                                                                                                          * api  接口名称与const定义需要一样（必须强制一样），主要用在输出日志
                                                                                                                                                                          * url  访问链接地址
                                                                                                                                                                          * data 请求数据
                                                                                                                                                                          * dataFormat 请求数据检测与格式化
                                                                                                                                                                          * clickDelay 点击延迟，一个接口只能1秒钟只能调用一次，true开启 false关闭,默认开启
                                                                                                                                                                          * -->true 开启(默认)
                                                                                                                                                                          * -->false 关闭
                                                                                                                                                                          * showLoading 显示加载loading,请求时弹出窗口
                                                                                                                                                                          * -->true 显示(默认)
                                                                                                                                                                          * -->false 不显示
                                                                                                                                                                          * showLoadingMessage 显示加载loading文本
                                                                                                                                                                          * -->false 只显示loading，不显示文本
                                                                                                                                                                          * -->'正在请求...' 显示loading,显示配置文本(默认)
                                                                                                                                                                          * showSuccessLoading 显示加载/请求返回正确信息时显示的loading
                                                                                                                                                                          * -->true  显示loading
                                                                                                                                                                          * -->false 不显示loading(默认)
                                                                                                                                                                          * showSuccessLoadingMessage 示加载/请求返回正确信息时显示的loading消息
                                                                                                                                                                          * -->false 不显示文本
                                                                                                                                                                          * -->'加载成功' 显示文本,为空时显示后台文本，有内容时显示设置内容(默认值为空)
                                                                                                                                                                          * showErrorLoading 显示加载/请求返回错误信息时显示的loading
                                                                                                                                                                          * -->true  显示(默认)
                                                                                                                                                                          * -->false 不显示
                                                                                                                                                                          * showErrorLoadingMessage 显示加载/请求返回错误信息时显示的loading文本
                                                                                                                                                                          * -->false 不显示文本
                                                                                                                                                                          * -->'加载失败' 显示文本,为空时显示后台文本，有内容则优先显示内容(默认值为空)
                                                                                                                                                                          * apiType 请求默认类型,会根据参数增加一些额外的设置
                                                                                                                                                                          * -->default 普通模式，不强制用户登录(默认,如果用户已经登录，接口中会带有用户token过去)
                                                                                                                                                                          * -->user 使用用户信息，强制判断是否登录,如果没有登录跳转登录页
                                                                                                                                                                          * -->notUser 不传用户信息过去
                                                                                                                                                                          * method 微信小程序的传参模式，一般就是GET/POST
                                                                                                                                                                          * -->GET
                                                                                                                                                                          * -->POST
                                                                                                                                                                          * dataConfig 传参配置
                                                                                                                                                                          * isProcessReturnData 是否处理返回数据
                                                                                                                                                                          * returnConfig 返回参数进行格式转换,一些特殊的类型直接进行排错(TODO 该系统未实现,主要参数格式化，补充参数等操作)
                                                                                                                                                                          * -->type类型:普通类型转换int/string/array/object基本类型转换，特殊类型转换jsonString/date/time等
                                                                                                                                                                          * -->-->jsonString会进字符串尝试型进行转换，如果转换失败转换为{},防止程序报错
                                                                                                                                                                          * -->-->date 会将时间戳转换成时间格式
                                                                                                                                                                          * -->isComplementing:是否补足,如果在没有检查到会补充一个空的参数,
                                                                                                                                                                          * request 接口快捷模式
                                                                                                                                                                          **************************************************************/ //服务器配置
//接口配置
var api = { home: { name: '[首页]首页', api: 'index', url: _hostConst.default.apiHost + '/index', data: {}, apiType: 'default', method: 'GET', openMock: true, request: function request(data) {return promise(this, data);} }, applet: { slideshow: { name: '[配置]轮播图', api: 'applet/slideshow', url: _hostConst.default.apiHost + '/applet/slideshow', data: {}, apiType: 'default', method: 'GET', openMock: true, request: function request(data) {return promise(this, data);} } }, login: { wxcode: { name: '[登录][微信]微信code', api: 'login/wxcode', url: _hostConst.default.apiHost + '/login/wxcode', data: {}, method: 'POST', openMock: true, request: function request(data) {return promise(this, data);} }, sendCode: { name: '[登录][短信]发送短信验证码', api: 'login/sendCode', url: _hostConst.default.apiHost + '/login/sendCode',
      data: {},
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    checkCode: {
      name: '[登录][短信]检查code',
      api: 'login/checkCode',
      url: _hostConst.default.apiHost + '/login/checkCode',
      data: {},
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  goods: {
    bespeakInfo: {
      name: '[商品][预约信息]商品预约信息',
      api: 'goods/bespeakInfo',
      url: _hostConst.default.apiHost + '/goods/bespeakInfo',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    partyList: {
      name: '[商品]聚会列表',
      api: 'goods/partyList',
      url: _hostConst.default.apiHost + '/goods/partyList',
      data: {
        cateId: '' // 分类id，不传就是所有分类
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    partyInfo: {
      name: '[商品]聚会详情',
      api: 'goods/partyInfo',
      url: _hostConst.default.apiHost + '/goods/partyInfo',
      data: {
        partyId: '' // 聚会id
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  chefInfo: {
    list: {
      name: '[厨师]初始列表',
      api: 'chefInfo/list',
      url: _hostConst.default.apiHost + '/chefInfo/list',
      data: {
        searchKey: '',
        city: '',
        latitude: 0,
        longitude: 0,
        pageNum: 1,
        pageSize: 10,
        chefSort: '',
        startBasicFee: '',
        endBasicFee: '',
        minNum: '',
        maxNum: '',
        cookAge: 0,
        dishStyleIdList: '',
        distance: '',
        userKey: '',
        token: '' },

      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    findDishStyle: {
      name: '[厨师]菜类型',
      api: 'chefInfo/findDishStyle',
      url: _hostConst.default.apiHost + '/chefInfo/findDishStyle',
      data: {},
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  user: {
    info: {
      name: '[用户]用户信息',
      api: 'user/info',
      url: _hostConst.default.apiHost + '/user/info',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    balance: {
      name: '[用户]余额信息',
      api: 'user/balance',
      url: _hostConst.default.apiHost + '/user/balance',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    balanceLog: {
      name: '[用户]余额日志',
      api: 'user/balanceLog',
      url: _hostConst.default.apiHost + '/user/balanceLog',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    coupon: {
      name: '[用户]优惠卷列表',
      api: 'user/coupon',
      url: _hostConst.default.apiHost + '/user/coupon',
      data: {
        type: '' // valid 未使用 used 已使用 expired 已过期
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    couponAdd: {
      name: '[用户]添加优惠卷',
      api: 'user/couponAdd',
      url: _hostConst.default.apiHost + '/user/couponAdd',
      data: {
        code: '' // 兑换码 
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    addressInfo: {
      name: '[用户][地址]地址详细信息',
      api: 'user/addressInfo',
      url: _hostConst.default.apiHost + '/user/addressInfo',
      data: {
        id: '' // 地址id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    addressDefault: {
      name: '[用户][地址]设置默认地址',
      api: 'user/addressDefault',
      url: _hostConst.default.apiHost + '/user/addressDefault',
      data: {
        id: '' // 地址id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    addressCreate: {
      name: '[用户][地址]新创建地址',
      api: 'user/addressCreate',
      url: _hostConst.default.apiHost + '/user/addressCreate',
      data: {
        id: '' // 地址id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    addressSave: {
      name: '[用户][地址]编辑/保存地址',
      api: 'user/addressSave',
      url: _hostConst.default.apiHost + '/user/addressSave',
      data: {
        id: '' // 地址id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    addressDelete: {
      name: '[用户][地址]设置默认地址',
      api: 'user/addressDelete',
      url: _hostConst.default.apiHost + '/user/addressDelete',
      data: {
        id: '' // 地址id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    orderList: {
      name: '[用户][订单列表]订单列表',
      api: 'user/orderList',
      url: _hostConst.default.apiHost + '/user/orderList',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    orderDetail: {
      name: '[用户][订单列表]订单详情',
      api: 'user/orderDetail',
      url: _hostConst.default.apiHost + '/user/orderDetail',
      data: {
        orderId: '' // 订单id
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  order: {
    save: {
      name: '[订单]下单', // 改为create order
      api: 'order/save',
      url: _hostConst.default.apiHost + '/order/save',
      data: {},
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    payDetail: {
      name: '[订单]下单详情',
      api: 'order/payDetail',
      url: _hostConst.default.apiHost + '/order/payDetail',
      data: {},
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    payConfirm: {
      name: '[订单]支付确认',
      api: 'order/payDetail',
      url: _hostConst.default.apiHost + '/order/payDetail',
      data: {},
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    pay: {
      name: '[订单]支付',
      api: 'order/pay',
      url: _hostConst.default.apiHost + '/order/pay',
      data: {},
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    cancel: {
      name: '[订单]取消列表',
      api: 'order/cancel',
      url: _hostConst.default.apiHost + '/order/cancel',
      data: {
        orderId: '' // 订单id
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    statusList: {
      name: '[订单]状态列表',
      api: 'order/statusList',
      url: _hostConst.default.apiHost + '/order/statusList',
      data: {
        orderId: '' // 订单id
      },
      apiType: 'user',
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } },

    balanceRechargePay: {
      name: '[订单]余额充值支付',
      api: 'order/balanceRechargePay',
      url: _hostConst.default.apiHost + '/order/balanceRechargePay',
      data: {
        type: '' // 卡类型
      },
      apiType: 'user',
      method: 'POST',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  memberCard: {
    list: {
      name: '[会员卡]会员卡列表',
      api: 'memberCard/list',
      url: _hostConst.default.apiHost + '/memberCard/list',
      data: {},
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } },


  system: {
    set: {
      name: '[系统]配置信息',
      api: 'system/set',
      url: _hostConst.default.apiHost + '/system/set',
      data: {},
      method: 'GET',
      openMock: true,
      request: function request(data) {
        return promise(this, data);
      } } } };





/**
                * 设置
                * @param data
                * @returns {Promise}
                */
var promise = function promise(config) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return function (config) {

    var config = Object.assign({}, config, data);

    console.log('请求参数', config, data);

    return new Promise(function (r, a) {
      config.success = function (data) {
        console.log('回调数据', data);
        r(data);
      };

      config.codeError = function (res) {
        a(res);
      };

      var abc = new _requestServe.default();
      abc.request(config);
    });
  }(config);};

module.exports = api;

/***/ }),

/***/ 157:
/*!************************************************!*\
  !*** H:/work/aiDaChu_uni/utils/bmap-wx.min.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function t(t, a) {
  if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function () {
  function t(t, a) {
    for (var e = 0; e < a.length; e++) {
      var i = a[e];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  return function (a, e, i) {
    return e && t(a.prototype, e), i && t(a, i), a;
  };
}(),
e = function () {
  function e(a) {
    t(this, e), this.ak = a.ak;
  }

  return a(e, [{
    key: "getWXLocation",
    value: function value(t, a, e, i) {
      t = t || "gcj02", a = a || function () {}, e = e || function () {}, i = i || function () {}, uni.getLocation({
        type: t,
        success: a,
        fail: e,
        complete: i });

    } },
  {
    key: "search",
    value: function value(t) {
      var a = this,
      e = {
        query: (t = t || {}).query || "生活服务$美食&酒店",
        scope: t.scope || 1,
        filter: t.filter || "",
        coord_type: t.coord_type || 2,
        page_size: t.page_size || 10,
        page_num: t.page_num || 0,
        output: t.output || "json",
        ak: a.ak,
        sn: t.sn || "",
        timestamp: t.timestamp || "",
        radius: t.radius || 2e3,
        ret_coordtype: "gcj02ll" },

      i = {
        iconPath: t.iconPath,
        iconTapPath: t.iconTapPath,
        width: t.width,
        height: t.height,
        alpha: t.alpha || 1,
        success: t.success || function () {},
        fail: t.fail || function () {} },

      n = function n(t) {
        e.location = t.latitude + "," + t.longitude, uni.request({
          url: "https://api.map.baidu.com/place/v2/search",
          data: e,
          header: {
            "content-type": "application/json" },

          method: "GET",
          success: function success(t) {
            var a = t.data;

            if (0 === a.status) {
              var e = a.results,
              n = {};
              n.originalData = a, n.wxMarkerData = [];

              for (var o = 0; o < e.length; o++) {n.wxMarkerData[o] = {
                  id: o,
                  latitude: e[o].location.lat,
                  longitude: e[o].location.lng,
                  title: e[o].name,
                  iconPath: i.iconPath,
                  iconTapPath: i.iconTapPath,
                  address: e[o].address,
                  telephone: e[o].telephone,
                  alpha: i.alpha,
                  width: i.width,
                  height: i.height };}


              i.success(n);
            } else i.fail({
              errMsg: a.message,
              statusCode: a.status });

          },
          fail: function fail(t) {
            i.fail(t);
          } });

      };

      if (t.location) {
        var o = t.location.split(",")[1];
        n({
          errMsg: "input location",
          latitude: t.location.split(",")[0],
          longitude: o });

      } else a.getWXLocation("gcj02", n, function (t) {
        i.fail(t);
      }, function () {});
    } },
  {
    key: "suggestion",
    value: function value(t) {
      var a = this,
      e = {
        query: (t = t || {}).query || "",
        region: t.region || "全国",
        city_limit: t.city_limit || !1,
        output: t.output || "json",
        ak: a.ak,
        sn: t.sn || "",
        timestamp: t.timestamp || "",
        ret_coordtype: "gcj02ll" },

      i = {
        success: t.success || function () {},
        fail: t.fail || function () {} };

      uni.request({
        url: "https://api.map.baidu.com/place/v2/suggestion",
        data: e,
        header: {
          "content-type": "application/json" },

        method: "GET",
        success: function success(t) {
          var a = t.data;
          0 === a.status ? i.success(a) : i.fail({
            errMsg: a.message,
            statusCode: a.status });

        },
        fail: function fail(t) {
          i.fail(t);
        } });

    } },
  {
    key: "regeocoding",
    value: function value(t) {
      var a = this,
      e = {
        coordtype: (t = t || {}).coordtype || "gcj02ll",
        pois: t.pois || 0,
        output: t.output || "json",
        ak: a.ak,
        sn: t.sn || "",
        timestamp: t.timestamp || "",
        ret_coordtype: "gcj02ll" },

      i = {
        iconPath: t.iconPath,
        iconTapPath: t.iconTapPath,
        width: t.width,
        height: t.height,
        alpha: t.alpha || 1,
        success: t.success || function () {},
        fail: t.fail || function () {} },

      n = function n(t) {
        e.location = t.latitude + "," + t.longitude, uni.request({
          url: "https://api.map.baidu.com/geocoder/v2/",
          data: e,
          header: {
            "content-type": "application/json" },

          method: "GET",
          success: function success(a) {
            var e = a.data;

            if (0 === e.status) {
              var n = e.result,
              o = {};
              o.originalData = e, o.wxMarkerData = [], o.wxMarkerData[0] = {
                id: 0,
                latitude: t.latitude,
                longitude: t.longitude,
                address: n.formatted_address,
                iconPath: i.iconPath,
                iconTapPath: i.iconTapPath,
                desc: n.sematic_description,
                business: n.business,
                alpha: i.alpha,
                width: i.width,
                height: i.height },
              i.success(o);
            } else i.fail({
              errMsg: e.message,
              statusCode: e.status });

          },
          fail: function fail(t) {
            i.fail(t);
          } });

      };

      if (t.location) {
        var o = t.location.split(",")[1];
        n({
          errMsg: "input location",
          latitude: t.location.split(",")[0],
          longitude: o });

      } else a.getWXLocation("gcj02", n, function (t) {
        i.fail(t);
      }, function () {});
    } },
  {
    key: "weather",
    value: function value(t) {
      var a = this,
      e = {
        coord_type: (t = t || {}).coord_type || "gcj02",
        output: t.output || "json",
        ak: a.ak,
        sn: t.sn || "",
        timestamp: t.timestamp || "" },

      i = {
        success: t.success || function () {},
        fail: t.fail || function () {} },

      n = function n(t) {
        e.location = t.longitude + "," + t.latitude, uni.request({
          url: "https://api.map.baidu.com/telematics/v3/weather",
          data: e,
          header: {
            "content-type": "application/json" },

          method: "GET",
          success: function success(t) {
            var a = t.data;

            if (0 === a.error && "success" === a.status) {
              var e = a.results,
              n = {};
              n.originalData = a, n.currentWeather = [], n.currentWeather[0] = {
                currentCity: e[0].currentCity,
                pm25: e[0].pm25,
                date: e[0].weather_data[0].date,
                temperature: e[0].weather_data[0].temperature,
                weatherDesc: e[0].weather_data[0].weather,
                wind: e[0].weather_data[0].wind },
              i.success(n);
            } else i.fail({
              errMsg: a.message,
              statusCode: a.status });

          },
          fail: function fail(t) {
            i.fail(t);
          } });

      };

      if (t.location) {
        var o = t.location.split(",")[0];
        n({
          errMsg: "input location",
          latitude: t.location.split(",")[1],
          longitude: o });

      } else a.getWXLocation("gcj02", n, function (t) {
        i.fail(t);
      }, function () {});
    } }]),
  e;
}();

module.exports.BMapWX = e;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!***********************************************!*\
  !*** H:/work/aiDaChu_uni/api/requestServe.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _indexMock = _interopRequireDefault(__webpack_require__(/*! ./indexMock.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 在wx.request封装的配置层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 本接口处于半封装状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * TODO 未将wx.request功能未全部重写，所有特殊对应原时候再继续加
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * TODO 增加上传文件类型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @returns {*}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
requestServe = /*#__PURE__*/function () {

  /**
                                          * 初始化配置
                                          * @param {*} data 
                                          */
  function requestServe(data) {_classCallCheck(this, requestServe);
    this.defaultConfig = {
      apiType: 'default', //默认参数类型
      method: 'GET', //默认请求类型
      data: {}, //数据为空
      header: {}, // 请求头配置
      isProcessReturnData: false, // 不做任何处理的接口配置
      clickDelay: true, //开启点击延迟
      showLoading: true, //发送请求是否显示loading true/false
      showLoadingMessage: '正在请求...', //发送请求时显示的文本框
      showSuccessLoading: false, // 显示完成消息
      showSuccessLoadingMessage: '', // 
      showErrorLoading: true, //开启
      showErrorLoadingMessage: '' };


    this.config = {};

    // TODO 这项没有完成
    this.errorUrl = ''; // 接口出现错误用来报警的api,正常来说后台应该自己有的，主要用来前期测试交流开发减少沟通

    // 模拟数据api配置
    this.openMock = true; // 开启模拟数据,统一判断

    /**
     * 返回数据处理配置
     */
    this.returnCofig = {
      codeField: 'code', //code的字段,code只支付数字,非数字报错
      dataField: 'data', //数据的字段
      msgField: 'msg' //消息的字段
    };
    this.codeSuccess = 200; // 正确判断条件
    this.codeFunList = {};
    this.codeFunListSet();

    // 防抖内存
    this.shakeCache = {};

    // 外部库
    this.app = getApp();
  }

  // 检查用户是否登录
  _createClass(requestServe, [{ key: "loginCheck", value: function loginCheck() {
      return true;
    }

    // 去登录页面
  }, { key: "toLogin", value: function toLogin() {
      return false;
    }

    /**
       * [封装方法] 配置token
       */ }, { key: "tokenCheck", value: function tokenCheck(
    config) {
      if (config.apiType == 'user') {//需要用户登录
        this.log(config.log + '[执行用户强制登录检测]');

        if (!this.loginCheck()) return this.toLogin();
      } else if (config.apiType == 'notUser') {// 强制不使用token
        return true;
      } else if (config.apiType == 'default') {

      } else {
        this.errorAlert(config.log + 'apiType类型,暂不支持');
        return false;
      }

      config.header['token'] = '';
      return true;
    }

    /**
       * [封装方法] 通用异常code判断
       */ }, { key: "codeFunListSet", value: function codeFunListSet(
    code, fun) {
      var codeList = {
        "301": this.toLogin };


      this.codeFunList = codeList;
    }

    // 请求后拦截
  }, { key: "success", value: function success(config) {
      var _this = this;
      return function (res) {
        if (config.isProcessReturnData === true) return true;

        if (config.showLoading == true) _this.hideLoading();

        _this.log(config.log + '[success数据]:', res);

        // html异常错误,不等于200走不到该程序内
        if (res.statusCode !== 200) {
          _this.alert('网络延迟,请稍后重试');
          _this.errorLog(res);
          return false;
        }

        //接口参数判断
        var content = res.data;
        var code = content[_this.returnCofig.codeField]; // 标识code
        var data = content[_this.returnCofig.dataField] ? content[_this.returnCofig.dataField] : {}; // 核心数据
        var msg = content[_this.returnCofig.msgField] ? content[_this.returnCofig.msgField] : ''; // 返回消息

        // 没有正常的标识
        if (code === '' || isNaN(code)) {
          //TODO 后期写接口访问日志
          console.log(log + '[success][code]', code);
          _this.errorLog(res);
          _this.alert('接口异常,请联系我们');
          return false;
        }

        // 通用判断逻辑
        if (_this.codeFunList[code] && typeof _this.codeFunList[code] ===
        'function') {// 通用处理,无通用处理数据下会走下面的逻辑
          return _this.codeFunList[code](content);
        }

        if (code == _this.codeSuccess) {//获取正常数据
          if (config.showSuccessLoading == true) _this.alert(msg === null || msg === void 0 ? void 0 : msg.config.showSuccessLoadingMessage);
          if (typeof config.success === 'function') config.success(data, res);
        } else if (code || code === 0 || code === '0') {// 其他类型,进入codeError
          if (config.showErrorLoading) alert(msg === null || msg === void 0 ? void 0 : msg.config.showErrorLoadingMessage);
          if (typeof config.codeError === 'function') config.codeError(content, res); // 进入codeError函数
        } else {
          _this.errorLog('request->success', res);
          _this.alert('接口错误,未返回正确的标识,请联系我们');
        }
      };
    }

    // 接口异常使用
  }, { key: "fail", value: function fail(config) {
      return function (res) {
        wx.showModal({
          title: '消息',
          content: '服务器未返回正确数据,请尝试重新请求~',
          showCancel: false });


        if (config.showLoading == true) this.hideLoading();
        if (typeof config.fail === 'function') config.fail(res);
      };
    }

    /**
       * 请求
       */ }, { key: "request", value: function request(
    setConfig) {
      setConfig['log'] = '【' + new Date().getDate() + '】-【api接口url】【' + setConfig.api + '】-->'; // log日志输出

      //默认配置合并,最终api配置: 默认配置 -> api列表配置 -> 独立配置
      var config = Object.assign({}, this.defaultConfig, setConfig);
      this.log('[api配置]', config);

      if (this.shakeCheck(config) === false) return false; // 防抖限制
      if (this.tokenCheck(config) === false) return false; // 配置token
      this.requestParamsFiltering(config); // 请求参数过滤

      // [parameter传参]: 配置请求来源
      if (config.source) data['source'] = config.source;

      // [请求loading] 显示请求loading
      if (config.showLoading == true) {
        wx.showLoading({
          title: config.showLoadingMessage,
          mask: true });

      }

      var success = this.success(config);

      // [虚拟返回数据]开启虚拟数据,直接返回结果
      if (this.openMock == true && config.openMock === true) return success(this.mockDataGet(config));

      // 请示数据
      var cache = wx.request({
        url: config.url,
        method: config.method,
        data: config.data,
        dataType: 'json',
        header: config.header,
        success: success,
        fail: this.fail(config)
        // complete: completeFunction
      });

      // 用于数据请求中断
      return cache;
    }

    /**
       * 隐藏loading
       */ }, { key: "hideLoading", value: function hideLoading()
    {
      uni.hideLoading();
      this.app.globalData.isShowLoading == false;
    }

    /**
       * 防抖处理
       * 通用防抖处理，任何事件都不准许多次点击提交, 一个接口1秒只能提交一次
       */ }, { key: "shakeCheck", value: function shakeCheck(
    config) {
      if (config.clickDelay == true) {
        var apiName = config['api'];
        var newTime = new Date().getTime();
        if (this.shakeCache[apiName] && this.shakeCache[apiName].time - newTime > 1000) {
          this.log(config.log + apiName + ':接口延迟点击中..........拒绝本次请求');
          return false;
        } else {
          this.log(config.log + apiName + ':请求通过,更新延迟时间');
          this.shakeCache[apiName] = newTime;
          return true;
        }
      } else {
        return true;
      }
    }

    // 请求参数过滤
    // [parameter传参]参数剔空,去空格 TODO 无法检测多维数组,需要重构,这里应该与上面进行合并
  }, { key: "requestParamsFiltering", value: function requestParamsFiltering(config) {
      // [apiType检测]某种类型下携带某些参数
      var params = config.data;

      this.log(config.log + '[參數过滤前]', params);
      for (var i in params) {
        // 如果是字符串,两边去空
        if (typeof params[i] == 'string') params[i] = params[i].trim();

        // 值为null时 TODO 没有增加类型判断
        if (params[i] === null) params[i] = '';

        // 防止异常提交，后台会认为 undefined 是字符串,TODO 没有增加类型判断
        if (typeof params[i] === undefined || params[i] === undefined) params[i] = '';
      }

      this.log(config.log + '[參數过滤后]', params);
      return params;
    }

    /**
       * 模拟数据
       * @param {Object} api 请求url
       * @param {Object} params 请求参数
       */ }, { key: "mockDataGet", value: function mockDataGet(
    config) {
      var api = config.api;
      var params = config.data;
      var apiPath = api.split('/'); //拆解数组
      var virtualData = {}; // 返回数据
      var virtualReturn;

      if (apiPath.length == 1) {
        virtualReturn = _indexMock.default[apiPath[0]];
      } else if (apiPath.length == 2) {
        virtualReturn = _indexMock.default[apiPath[0]][apiPath[1]];
      } else if (apiPath.length == 3) {
        virtualReturn = _indexMock.default[apiPath[0]][apiPath[1]][apiPath[2]];
      }

      // TODO 如果data是字符串,并且是https，则发送请求
      console.log('怕減肥的', virtualReturn);
      if (typeof virtualReturn === 'function') {
        console.log('函數');
        virtualData = virtualReturn(params);
      } else {
        virtualData = virtualReturn;
      }

      // alert('请注意,正在使用虚拟数据');
      this.log(config.log + '[虚拟返回数据]:', virtualData);
      return virtualData;
    }

    /**
       * 输出错误信息
       * @param {Object} content
       */ }, { key: "errorAlert", value: function errorAlert(
    content) {
      wx.showModal({
        title: '提示',
        content: content,
        showCancel: false });


      return true;
    }

    // 错误提交
  }, { key: "errorLog", value: function errorLog(content) {
      if (this.errorUrl) {
        // TODO 后期写接口访问日志
      }
    }

    // 错误提示
  }, { key: "alert", value: function alert(content) {
      if (!content) return false;

      var time = content.length / 4 * 1000;
      if (time < 2000) time = 2000;
      wx.showToast({
        title: content,
        icon: 'none',
        duration: time });

    }


    // 普通日志输出
  }, { key: "consoleLog", value: function consoleLog(msg) {
      var time = new Date().getDate(); //获取时间参数
      var log = '【' + time + '】-【api接口url】【' + this.api + '】-->';

      console.log(log + msg);
    }

    // 输出logo模式
  }, { key: "log", value: function log(title, content) {
      console.log(title, content);
    } }]);return requestServe;}();var _default =


requestServe;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** H:/work/aiDaChu_uni/api/indexMock.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _modein = _interopRequireDefault(__webpack_require__(/*! ./modein.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 导入模块
var files = __webpack_require__(19);
var apiAll = (0, _modein.default)(files, 'object');

// 创建api请求函数
var api = {};
Object.keys(apiAll).forEach(function (mItem) {
  var keyArray = [];
  if (mItem.indexOf('/') > -1) {
    keyArray = mItem.split('/');
  } else {
    keyArray = [mItem];
  }

  var data;
  keyArray.forEach(function (item, index) {
    if (keyArray.length === index + 1) {
      if (data) {
        data[item] = apiAll[mItem];
      } else {
        api[item] = apiAll[mItem];
      }
    } else {
      if (typeof api[item] === 'undefined') api[item] = {};
      data = api[item];
    }
  });
});

module.exports = api;

/***/ }),

/***/ 18:
/*!*****************************************!*\
  !*** H:/work/aiDaChu_uni/api/modein.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/**
                                                                                                      * describe: 文件模块批量快速导入
                                                                                                      * @param {Object} files 导入文件对象
                                                                                                      * @param {RegExp, String} reg 可选，自定义过滤正则或默认提供正则名，用于根据文件名进行正则过滤后生成模块名，默认'underlineHead'
                                                                                                      *  => reg {RegExp} 自定义过滤正则
                                                                                                      *  => reg {String} 默认提供正则名,可选['underlineHead'文件名格式为'_XXX.js'],['letterHead'文件名格式为'XXX.js']
                                                                                                      * @param {String} mode 可选，导入模式，默认'object'
                                                                                                      *  => 'object' 将模块名作为对象名，模块内容作为对象值，分离式成对导入
                                                                                                      *  => 'array' 将所有模块导入为一个数组
                                                                                                      *  => 'single' 将所有模块导入合并为一个对象
                                                                                                      */

function moduleIn(files, mode, reg) {
  if (!files) return;
  mode = mode || 'object';
  var dJsReg = {
    underlineHead: /(\_|^\.\/|\.js$)/g,
    letterHead: /(^\.\/|\.js$)/g };

  reg = dJsReg[reg] || reg || dJsReg.underlineHead;

  var modules = mode === 'array' ? [] : {};
  var objModules = {};

  files.keys().forEach(function (key) {
    var mk = key.replace(reg, '');
    var m = files(key);

    objModules[mk] = Object.keys(m).reduce(function (s, e) {
      if (e !== 'default') s[e] = m[e];
      if (mode === 'array') modules = modules.concat(s);
      return s;
    }, m.default || {});

    if (mode === 'single') modules = Object.assign({}, modules, objModules[mk]);
  });

  if (mode === 'object') {
    modules = objModules;
  } else {
    objModules = null;
  }

  return modules;
}var _default =

moduleIn;exports.default = _default;

/***/ }),

/***/ 19:
/*!*************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock sync \S*\.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./applet/slideshow.js": 20,
	"./chefInfo/findDishStyle.js": 21,
	"./chefInfo/list.js": 22,
	"./goods/bespeakInfo.js": 23,
	"./goods/partyInfo.js": 24,
	"./goods/partyList.js": 25,
	"./index.js": 26,
	"./login/sendCode.js": 27,
	"./memberCard/list.js": 28,
	"./order/balanceRechargePay.js": 29,
	"./order/cancel.js": 30,
	"./order/pay.js": 31,
	"./order/payDetail.js": 32,
	"./order/save.js": 33,
	"./order/statusList.js": 34,
	"./system/set.js": 35,
	"./user/addressCreate.js": 36,
	"./user/addressDefault.js": 37,
	"./user/addressDelete.js": 38,
	"./user/addressSave.js": 39,
	"./user/balance.js": 40,
	"./user/balanceLog.js": 41,
	"./user/coupon.js": 42,
	"./user/couponAdd.js": 43,
	"./user/info.js": 44,
	"./user/orderDetail.js": 45,
	"./user/orderList.js": 46
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 19;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/applet/slideshow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "list": [{
        "picUrl": "https://imgck.5156dujia.com/Fsbq7YoEx5l53V7iKbeWxFxJLew4",
        "clickUrl": "cookDetails/cookDetails?code=C2020100000092",
        "isTableBar": "N",
        "picIntroduce": "找厨师列表页banner",
        "islogin": "N" },
      {
        "picUrl": "https://imgck.5156dujia.com/FmjPYNilSbTzvC9JKmRuuWFjt_wt",
        "clickUrl": "cookDetails/cookDetails?code=C2021024100157",
        "isTableBar": "N",
        "picIntroduce": null,
        "islogin": "N" },
      {
        "picUrl": "https://imgck.5156dujia.com/Fq0DV9IvKEk8WTUbj1OFwpNHF_wQ",
        "clickUrl": "cookDetails/cookDetails?code=C2020104400093",
        "isTableBar": "N",
        "picIntroduce": "找厨师列表页banner",
        "islogin": "N" }] } } };exports.default = _default;

/***/ }),

/***/ 21:
/*!**************************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/chefInfo/findDishStyle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;function _default() {
  return {
    statusCode: 200,
    data: {
      "code": 200,
      "data": [{
        "id": 58,
        "createTime": 1618304356000,
        "deleted": "F",
        "name": "闽南菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FpUBHMT2_MWgAOBnqdsg7A4DMueg",
        "orderNum": 47 },
      {
        "id": 57,
        "createTime": 1618302589000,
        "deleted": "F",
        "name": "俄罗斯餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fr7p-0Lz3VGLApgwEl6PNQ6qJoBT",
        "orderNum": 46 },
      {
        "id": 56,
        "createTime": 1618302536000,
        "deleted": "F",
        "name": "德餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FonjteuiKo1N5X_q6A2XfDQrwWMY",
        "orderNum": 45 },
      {
        "id": 55,
        "createTime": 1618214872000,
        "deleted": "F",
        "name": "京鲁菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FvHm8h6RsSoZKnI2yhdGFu6oQlxJ",
        "orderNum": 44 },
      {
        "id": 54,
        "createTime": 1618213485000,
        "deleted": "F",
        "name": "西式简餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FlxWDXXw-LCumvWDpd5BTUnDcm0a",
        "orderNum": 43 },
      {
        "id": 53,
        "createTime": 1618212434000,
        "deleted": "F",
        "name": "韩国料理",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FmOBNLqIvzZjuSSAClrrWwb4pxKQ",
        "orderNum": 42 },
      {
        "id": 52,
        "createTime": 1617958825000,
        "deleted": "F",
        "name": "养生菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FoCoZRVvE7A2y00AiOWU7VVjWlFa",
        "orderNum": 41 },
      {
        "id": 51,
        "createTime": 1617958792000,
        "deleted": "F",
        "name": "斋菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Ft6y0Wq772eDSHkP1UBs5IXa0e5m",
        "orderNum": 40 },
      {
        "id": 50,
        "createTime": 1617265264000,
        "deleted": "F",
        "name": "厨师招牌",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FttUF2lXNoZmYNr7WlDWTguhAj61",
        "orderNum": 37 },
      {
        "id": 49,
        "createTime": 1617180431000,
        "deleted": "F",
        "name": "德国菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fh3gNdJ4wnqBRHNc8sSskweRQVuG",
        "orderNum": 37 },
      {
        "id": 48,
        "createTime": 1617180409000,
        "deleted": "F",
        "name": "墨西哥菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fre6pRAsHJY554_5C9M3o3XnKzok",
        "orderNum": 36 },
      {
        "id": 47,
        "createTime": 1616745379000,
        "deleted": "F",
        "name": "本帮菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FgmzKAC3z9ezZtvRficZMNAxrm6h",
        "orderNum": 35 },
      {
        "id": 46,
        "createTime": 1616657529000,
        "deleted": "F",
        "name": "淮扬菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/lgjOP7hBeZVy0eM4HDu1BntknZhj",
        "orderNum": 35 },
      {
        "id": 45,
        "createTime": 1616657422000,
        "deleted": "F",
        "name": "海鲜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/loqgYwItqfVngRRrE8Uu2aFmej9D",
        "orderNum": 34 },
      {
        "id": 44,
        "createTime": 1616569262000,
        "deleted": "F",
        "name": "东南亚菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FhAWHCHTYdM9duSmee9vVVzvHkbl",
        "orderNum": 33 },
      {
        "id": 43,
        "createTime": 1614844579000,
        "deleted": "F",
        "name": "淮阳菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/lgjOP7hBeZVy0eM4HDu1BntknZhj",
        "orderNum": 31 },
      {
        "id": 42,
        "createTime": 1611730188000,
        "deleted": "F",
        "name": "西北菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/lmnPGt4gKjkBrwgGyqp3vKAG2Lhb",
        "orderNum": 32 },
      {
        "id": 41,
        "createTime": 1608541022000,
        "deleted": "F",
        "name": "特殊人群套餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/ljppfhvScl28ITxVmLb-Am4Fa8yG",
        "orderNum": 30 },
      {
        "id": 40,
        "createTime": 1608539774000,
        "deleted": "F",
        "name": "下午茶",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FneOofwJ1UYENMgxvlP4JMRcpEHn",
        "orderNum": 28 },
      {
        "id": 39,
        "createTime": 1608539556000,
        "deleted": "F",
        "name": "甜品台",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FpsAARdujKgoYs9g8jrG97fq6Ipt",
        "orderNum": 29 },
      {
        "id": 38,
        "createTime": 1608275871000,
        "deleted": "F",
        "name": "甜品",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FmOm9EczPj4vizFTM3xM5buFzeZl",
        "orderNum": 27 },
      {
        "id": 37,
        "createTime": 1604478662000,
        "deleted": "F",
        "name": "欧陆菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FhD3LFz9W-7VpqYZR1ua7JcFcuGP",
        "orderNum": 26 },
      {
        "id": 36,
        "createTime": 1601261351000,
        "deleted": "F",
        "name": "苏菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FhFHSdiH5gzchjg8gHqHIAabFlWR",
        "orderNum": 25 },
      {
        "id": 35,
        "createTime": 1600845748000,
        "deleted": "F",
        "name": "烧烤",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FsdOH9vKzkHsiPhp86ibUGSxrSNQ",
        "orderNum": 24 },
      {
        "id": 34,
        "createTime": 1600421971000,
        "deleted": "F",
        "name": "京菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FtY0EN2MUhjpIT8KZY_IGpCgpx9g",
        "orderNum": 23 },
      {
        "id": 33,
        "createTime": 1600420967000,
        "deleted": "F",
        "name": "汤",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Ft03OKK1MX70oqf-68uU6lmit7-w",
        "orderNum": 22 },
      {
        "id": 32,
        "createTime": 1600326477000,
        "deleted": "F",
        "name": "新疆菜",
        "enable": "Y",
        "picUrl": null,
        "orderNum": 21 },
      {
        "id": 31,
        "createTime": 1597632680000,
        "deleted": "F",
        "name": "主食",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FrJWYLktdpJIlrNaWcSQ9tnfjXjp",
        "orderNum": 20 },
      {
        "id": 30,
        "createTime": 1597110341000,
        "deleted": "F",
        "name": "点心",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FucAU-VWriJoc16DTuplHd5nPlsp",
        "orderNum": 16 },
      {
        "id": 29,
        "createTime": 1597110250000,
        "deleted": "F",
        "name": "冷菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fk-JtOwtpB-WR-UYL3f9w8f6ZXIh",
        "orderNum": 14 },
      {
        "id": 28,
        "createTime": 1597030559000,
        "deleted": "F",
        "name": "创意融合菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FutnmLkkW8s62133tttqoSfFjSEv",
        "orderNum": 11 },
      {
        "id": 25,
        "createTime": 1597021988000,
        "deleted": "F",
        "name": "自定义",
        "enable": "Y",
        "picUrl": null,
        "orderNum": 20 },
      {
        "id": 24,
        "createTime": 1596521833000,
        "deleted": "F",
        "name": "东北菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FoP1TCkAJUaDdgPQWqcEIJCacYw9",
        "orderNum": 19 },
      {
        "id": 23,
        "createTime": 1596508826000,
        "deleted": "F",
        "name": "素菜宴",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FhkECFYUf_rYxrsN9w9TFew6bPTl",
        "orderNum": 18 },
      {
        "id": 21,
        "createTime": 1596101039000,
        "deleted": "F",
        "name": "豫菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FtS1qTti4XtN-XhjsjCCGDV7eagg",
        "orderNum": 11 },
      {
        "id": 20,
        "createTime": 1595668339000,
        "deleted": "F",
        "name": "日料",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FgR4VzNPY_p-l3kU32-xCgv7z2Rr",
        "orderNum": 13 },
      {
        "id": 19,
        "createTime": 1595667348000,
        "deleted": "F",
        "name": "西餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FjOLfGdf-fqMZxWRXJBDL2OkZXw_",
        "orderNum": 11 },
      {
        "id": 18,
        "createTime": 1595665724000,
        "deleted": "F",
        "name": "意大利菜",
        "enable": "Y",
        "picUrl": null,
        "orderNum": 9 },
      {
        "id": 16,
        "createTime": 1595322718000,
        "deleted": "F",
        "name": "法餐",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FqVmQqxv2zPgBMWLO2PD5Cis-ei4",
        "orderNum": 12 },
      {
        "id": 14,
        "createTime": 1594978452000,
        "deleted": "F",
        "name": "粤菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fl_Vt_p9NzdfS37Ys1pKYFXolmVG",
        "orderNum": 6 },
      {
        "id": 13,
        "createTime": 1594783441000,
        "deleted": "F",
        "name": "徽菜",
        "enable": "Y",
        "picUrl": null,
        "orderNum": 7 },
      {
        "id": 12,
        "createTime": 1594281088000,
        "deleted": "F",
        "name": "家常菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FnyeRBRyGFCnGGO6FWj7_ypBxOUC",
        "orderNum": 3 },
      {
        "id": 11,
        "createTime": 1594263209000,
        "deleted": "F",
        "name": "川菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/Fu-jZuc8mfPPt0iDmOC4PbotrHyy",
        "orderNum": 5 },
      {
        "id": 10,
        "createTime": 1594200649000,
        "deleted": "F",
        "name": "浙菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FvrD0lEJT8w9Zvm8EThWYJRQPZSp",
        "orderNum": 4 },
      {
        "id": 9,
        "createTime": 1594135089000,
        "deleted": "F",
        "name": "闽菜",
        "enable": "Y",
        "picUrl": null,
        "orderNum": 8 },
      {
        "id": 8,
        "createTime": 1594134860000,
        "deleted": "F",
        "name": "鲁菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FgAbmG_H3Kcf02q4mpuO812V2PIc",
        "orderNum": 10 },
      {
        "id": 7,
        "createTime": 1594125366000,
        "deleted": "F",
        "name": "湘菜",
        "enable": "Y",
        "picUrl": "https://imgck.5156dujia.com/FgoVS_JAvM2q6Vc1dqq2nPt2J9VA",
        "orderNum": 2 }] } };



}

/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/chefInfo/list.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;function _default() {
  return {
    statusCode: 200,
    data: {
      "code": 200,
      "data": {
        "total": 780,
        "list": [{
          "id": 118,
          "code": "C2020126500118",
          "name": "沈勇",
          "flowerName": "无敌",
          "telephone": "15267175586",
          "mainPic": "https://imgck.5156dujia.com/FkIhSzn1afo3O8DAdwtaX3mbTP4h",
          "jobStatus": "workStatus",
          "cookAge": 22,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 531,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "114.299034",
          "latitude": "30.553762",
          "province": null,
          "city": "武汉市",
          "district": "武昌区",
          "street": "临江大道",
          "place": "红巷博物馆群",
          "addressDetail": "湖北省武汉市碑口区区汉正街云尚大厦",
          "basicFee": 688.0,
          "advanceTime": "24",
          "advanceUnit": "小时",
          "serviceCount": 11,
          "highPraiseRate": 4.8,
          "evaluatorNum": 2,
          "grade": "金牌",
          "distance": 13589.6,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 261,
            "createTime": 1608706876000,
            "deleted": null,
            "dishCode": "DS2020120600261",
            "cookCode": "C2020126500118",
            "dishStyleId": 10,
            "dishStyleName": "浙菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 263,
            "createTime": 1608707810000,
            "deleted": null,
            "dishCode": "DS2020120500263",
            "cookCode": "C2020126500118",
            "dishStyleId": 14,
            "dishStyleName": "粤菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 264,
            "createTime": 1608707819000,
            "deleted": null,
            "dishCode": "DS2020125800264",
            "cookCode": "C2020126500118",
            "dishStyleId": 25,
            "dishStyleName": "自定义",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "浙菜,粤菜",
          "chefPicList": [{
            "picKey": "/FlIrR1_QP8E-B6nhAXV_gR-ds9ge",
            "url": "https://imgck.5156dujia.com//FlIrR1_QP8E-B6nhAXV_gR-ds9ge",
            "picName": null },
          {
            "picKey": "/FoFap-HrtsFvGhaz9UsGLZTSPs9E",
            "url": "https://imgck.5156dujia.com//FoFap-HrtsFvGhaz9UsGLZTSPs9E",
            "picName": null },
          {
            "picKey": "/FsykKu7uHFZqFFJOp51ApGMA3Qdl",
            "url": "https://imgck.5156dujia.com//FsykKu7uHFZqFFJOp51ApGMA3Qdl",
            "picName": null },
          {
            "picKey": "/Fvm28T6_haDJp4Ulf9spt9PhxRsh",
            "url": "https://imgck.5156dujia.com//Fvm28T6_haDJp4Ulf9spt9PhxRsh",
            "picName": null },
          {
            "picKey": "/FkGt4kzq0YckGusSYEXqU3bJLiMs",
            "url": "https://imgck.5156dujia.com//FkGt4kzq0YckGusSYEXqU3bJLiMs",
            "picName": null },
          {
            "picKey": "/Fqifzjy7shloj07ZMQewHmNAG69V",
            "url": "https://imgck.5156dujia.com//Fqifzjy7shloj07ZMQewHmNAG69V",
            "picName": null },
          {
            "picKey": "/FixvP2L9Th2XIK0OZbzh58NpLOQr",
            "url": "https://imgck.5156dujia.com//FixvP2L9Th2XIK0OZbzh58NpLOQr",
            "picName": null },
          {
            "picKey": "/FkS_RUXQ4DECw6lvrughAgAMNw8t",
            "url": "https://imgck.5156dujia.com//FkS_RUXQ4DECw6lvrughAgAMNw8t",
            "picName": null },
          {
            "picKey": "/FjOXVFbin17stZxgUtsUHLqXRgMP",
            "url": "https://imgck.5156dujia.com//FjOXVFbin17stZxgUtsUHLqXRgMP",
            "picName": null },
          {
            "picKey": "/Fil7i-c_HDSn_ZmR0YYEyXVWkA84",
            "url": "https://imgck.5156dujia.com//Fil7i-c_HDSn_ZmR0YYEyXVWkA84",
            "picName": null }],

          "fictitiousHNum": 480.0,
          "fictitiousSNum": null,
          "fictitiousENum": 2,
          "resume": "杭州阿里未来酒店中餐厅厨师长\n杭州新开元大酒店厨师长             \n    复星集团武汉公司私宴主厨         ",
          "basicDishesNum": 10,
          "hotSortNum": 2 },
        {
          "id": 165,
          "code": "C2021036200165",
          "name": "任财",
          "flowerName": "任易",
          "telephone": "13541182870",
          "mainPic": "https://imgck.5156dujia.com/FoZY0phV_POLdmNUl6Owu9Kb6Dfv",
          "jobStatus": "workStatus",
          "cookAge": 23,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 835,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "104.1506576538086",
          "latitude": "30.65711784362793",
          "province": null,
          "city": "成都市",
          "district": "成华区",
          "street": "长融东三路",
          "place": "东方·惠城B区",
          "addressDetail": "长融东三路",
          "basicFee": 400.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 2,
          "highPraiseRate": 4.9,
          "evaluatorNum": 1,
          "grade": "金牌",
          "distance": 12399.8,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 337,
            "createTime": 1615445522000,
            "deleted": null,
            "dishCode": "DS2021030300337",
            "cookCode": "C2021036200165",
            "dishStyleId": 11,
            "dishStyleName": "川菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 338,
            "createTime": 1615445586000,
            "deleted": null,
            "dishCode": "DS2021035200338",
            "cookCode": "C2021036200165",
            "dishStyleId": 7,
            "dishStyleName": "湘菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 339,
            "createTime": 1615445641000,
            "deleted": null,
            "dishCode": "DS2021037400339",
            "cookCode": "C2021036200165",
            "dishStyleId": 14,
            "dishStyleName": "粤菜",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "川菜,湘菜,粤菜",
          "chefPicList": [{
            "picKey": "/Fv6megdkXfb3Fz3vBPYJiDVA6AtY",
            "url": "https://imgck.5156dujia.com//Fv6megdkXfb3Fz3vBPYJiDVA6AtY",
            "picName": null },
          {
            "picKey": "/Fum52nJ96tuuM-COg4t9QkDNOt4Z",
            "url": "https://imgck.5156dujia.com//Fum52nJ96tuuM-COg4t9QkDNOt4Z",
            "picName": null },
          {
            "picKey": "/FhctZ7Gwgtg1qGeP6KDkmAxnsWa1",
            "url": "https://imgck.5156dujia.com//FhctZ7Gwgtg1qGeP6KDkmAxnsWa1",
            "picName": null },
          {
            "picKey": "/Fhv1_PUWurSeecUAHnt7rjtCe2rK",
            "url": "https://imgck.5156dujia.com//Fhv1_PUWurSeecUAHnt7rjtCe2rK",
            "picName": null },
          {
            "picKey": "/Fn_6lEn-y8iNXUJGZyk2W_vaJJv9",
            "url": "https://imgck.5156dujia.com//Fn_6lEn-y8iNXUJGZyk2W_vaJJv9",
            "picName": null },
          {
            "picKey": "/llxGlgintj4a1iaL5J6RiFf3D0OA",
            "url": "https://imgck.5156dujia.com//llxGlgintj4a1iaL5J6RiFf3D0OA",
            "picName": null },
          {
            "picKey": "/ltnIZ7KdqbORLyI9xdmbP4YRhxlp",
            "url": "https://imgck.5156dujia.com//ltnIZ7KdqbORLyI9xdmbP4YRhxlp",
            "picName": null },
          {
            "picKey": "/Fv4W_mkxysYXA1LWxUA9QcsOiLl6",
            "url": "https://imgck.5156dujia.com//Fv4W_mkxysYXA1LWxUA9QcsOiLl6",
            "picName": null },
          {
            "picKey": "/FhTZP89WDtMeYrU6LVlOkbZhDY_J",
            "url": "https://imgck.5156dujia.com//FhTZP89WDtMeYrU6LVlOkbZhDY_J",
            "picName": null },
          {
            "picKey": "/FtS0nemgvt57T-0mdYBgJ3p1qHHk",
            "url": "https://imgck.5156dujia.com//FtS0nemgvt57T-0mdYBgJ3p1qHHk",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "千禧大酒店、京川宾馆、虹昇国际酒店",
          "basicDishesNum": 8,
          "hotSortNum": 3 },
        {
          "id": 174,
          "code": "C2021035900174",
          "name": "裘甬申",
          "flowerName": "裘厨厨师团队",
          "telephone": "13615744662",
          "mainPic": "https://imgck.5156dujia.com/FucK9YXkZpZySFRS_KQiI9kE3BDH",
          "jobStatus": "workStatus",
          "cookAge": 26,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 882,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "121.51145",
          "latitude": "29.893147",
          "province": null,
          "city": "宁波市",
          "district": "海曙区",
          "street": "范江岸路",
          "place": "五江湾小区北区",
          "addressDetail": "2幢4号",
          "basicFee": 600.0,
          "advanceTime": "24",
          "advanceUnit": "小时",
          "serviceCount": 36,
          "highPraiseRate": 5.0,
          "evaluatorNum": 5,
          "grade": "金牌",
          "distance": 14431.9,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 333,
            "createTime": 1615365418000,
            "deleted": null,
            "dishCode": "DS2021033800333",
            "cookCode": "C2021035900174",
            "dishStyleId": 10,
            "dishStyleName": "浙菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 334,
            "createTime": 1615365481000,
            "deleted": null,
            "dishCode": "DS2021035800334",
            "cookCode": "C2021035900174",
            "dishStyleId": 11,
            "dishStyleName": "川菜",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "浙菜,川菜",
          "chefPicList": [{
            "picKey": "/Fq1l33ihZ21KU_s80TUChynfU6Nh",
            "url": "https://imgck.5156dujia.com//Fq1l33ihZ21KU_s80TUChynfU6Nh",
            "picName": null },
          {
            "picKey": "/Fi7TxufH7UdIz1nIzV_VvkAkLwFo",
            "url": "https://imgck.5156dujia.com//Fi7TxufH7UdIz1nIzV_VvkAkLwFo",
            "picName": null },
          {
            "picKey": "/FgPjbTjUJWYOcHZjWEg_opLuqyhu",
            "url": "https://imgck.5156dujia.com//FgPjbTjUJWYOcHZjWEg_opLuqyhu",
            "picName": null },
          {
            "picKey": "/FrLd6PomAWC_D5Puhr9-qustOpVm",
            "url": "https://imgck.5156dujia.com//FrLd6PomAWC_D5Puhr9-qustOpVm",
            "picName": null },
          {
            "picKey": "/FlMvBqSaMVUwBpXcZ1GLCUf8d_E8",
            "url": "https://imgck.5156dujia.com//FlMvBqSaMVUwBpXcZ1GLCUf8d_E8",
            "picName": null },
          {
            "picKey": "/FsV8UPq9H4swQD0S3uW4EC5ACwzT",
            "url": "https://imgck.5156dujia.com//FsV8UPq9H4swQD0S3uW4EC5ACwzT",
            "picName": null },
          {
            "picKey": "/FgBBmlkez3HBixKw_-Oaj1YlalE-",
            "url": "https://imgck.5156dujia.com//FgBBmlkez3HBixKw_-Oaj1YlalE-",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 2,
          "resume": "开元酒店、花园宾馆、荆州宾馆",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 212,
          "code": "C2021039800212",
          "name": "邓杰辉",
          "flowerName": "邓厨",
          "telephone": "13676249922",
          "mainPic": "https://imgck.5156dujia.com/Fq8kI8byCC3mROWC9yoIJOBETLvx",
          "jobStatus": "workStatus",
          "cookAge": 19,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1096,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "113.26282",
          "latitude": "23.126297",
          "province": null,
          "city": "广州市",
          "district": "越秀区",
          "street": "雨帽街",
          "place": "公园前地铁站",
          "addressDetail": "广州市文桂里34号地下",
          "basicFee": 800.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 42,
          "highPraiseRate": 5.0,
          "evaluatorNum": 8,
          "grade": "金牌",
          "distance": 13131.2,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 398,
            "createTime": 1616570626000,
            "deleted": null,
            "dishCode": "DS2021033300398",
            "cookCode": "C2021039800212",
            "dishStyleId": 14,
            "dishStyleName": "粤菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 399,
            "createTime": 1616570635000,
            "deleted": null,
            "dishCode": "DS2021035200399",
            "cookCode": "C2021039800212",
            "dishStyleId": 25,
            "dishStyleName": "自定义",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "粤菜",
          "chefPicList": [{
            "picKey": "/FueCzi1b9I8OMZxh6QqJ-pSfHg6q",
            "url": "https://imgck.5156dujia.com//FueCzi1b9I8OMZxh6QqJ-pSfHg6q",
            "picName": null },
          {
            "picKey": "/FhdWOH903rAb_c7jEoQUBOLXXQpf",
            "url": "https://imgck.5156dujia.com//FhdWOH903rAb_c7jEoQUBOLXXQpf",
            "picName": null },
          {
            "picKey": "/FhG3ag-4dsIfpKABB5OpCX3NNCLQ",
            "url": "https://imgck.5156dujia.com//FhG3ag-4dsIfpKABB5OpCX3NNCLQ",
            "picName": null },
          {
            "picKey": "/FnzmhgPX2HuUoAzwlGXK3BgQrVZE",
            "url": "https://imgck.5156dujia.com//FnzmhgPX2HuUoAzwlGXK3BgQrVZE",
            "picName": null },
          {
            "picKey": "/Fh1Yiy7PdCYsyowKV8Kf51EknbR-",
            "url": "https://imgck.5156dujia.com//Fh1Yiy7PdCYsyowKV8Kf51EknbR-",
            "picName": null },
          {
            "picKey": "/FvoMOQrpuaPPKI21bMhFL2eZ7h0v",
            "url": "https://imgck.5156dujia.com//FvoMOQrpuaPPKI21bMhFL2eZ7h0v",
            "picName": null },
          {
            "picKey": "/Ftjt69URO0NeVM-LvjIYWY_FT6Sr",
            "url": "https://imgck.5156dujia.com//Ftjt69URO0NeVM-LvjIYWY_FT6Sr",
            "picName": null },
          {
            "picKey": "/FiW_tun-bSUbulMoQIjjb7HabedZ",
            "url": "https://imgck.5156dujia.com//FiW_tun-bSUbulMoQIjjb7HabedZ",
            "picName": null },
          {
            "picKey": "/FhrFRHiyXnfVWMboS1lsGAe8BN-b",
            "url": "https://imgck.5156dujia.com//FhrFRHiyXnfVWMboS1lsGAe8BN-b",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "广州市政府行政总厨、中国大酒店头锅、东方宾馆头锅、稻香集团总厨",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 245,
          "code": "C2021031800245",
          "name": "张占宝",
          "flowerName": "张师傅",
          "telephone": "18769051899",
          "mainPic": "https://imgck.5156dujia.com/Fit1BH-9eZUPdhQNH-B8CWdKss5L",
          "jobStatus": "quitStatus",
          "cookAge": 20,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1143,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "120.07221",
          "latitude": "30.322092",
          "province": null,
          "city": "杭州市",
          "district": "西湖区",
          "street": "紫萱路",
          "place": "汇禾领府(杭州市西湖区)",
          "addressDetail": "汇禾领府7幢1215",
          "basicFee": 600.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 64,
          "highPraiseRate": 5.0,
          "evaluatorNum": 3,
          "grade": "金牌",
          "distance": 14277.4,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 451,
            "createTime": 1617175880000,
            "deleted": null,
            "dishCode": "DS2021035600451",
            "cookCode": "C2021031800245",
            "dishStyleId": 10,
            "dishStyleName": "浙菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 452,
            "createTime": 1617175899000,
            "deleted": null,
            "dishCode": "DS2021033300452",
            "cookCode": "C2021031800245",
            "dishStyleId": 11,
            "dishStyleName": "川菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 453,
            "createTime": 1617175907000,
            "deleted": null,
            "dishCode": "DS2021038100453",
            "cookCode": "C2021031800245",
            "dishStyleId": 25,
            "dishStyleName": "自定义",
            "enable": "N",
            "orderNum": null },
          {
            "id": 454,
            "createTime": 1617175955000,
            "deleted": null,
            "dishCode": "DS2021037300454",
            "cookCode": "C2021031800245",
            "dishStyleId": 14,
            "dishStyleName": "粤菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 455,
            "createTime": 1617175997000,
            "deleted": null,
            "dishCode": "DS2021034600455",
            "cookCode": "C2021031800245",
            "dishStyleId": 7,
            "dishStyleName": "湘菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 456,
            "createTime": 1617176022000,
            "deleted": null,
            "dishCode": "DS2021033600456",
            "cookCode": "C2021031800245",
            "dishStyleId": 24,
            "dishStyleName": "东北菜",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "浙菜,川菜,粤菜,湘菜,东北菜",
          "chefPicList": [{
            "picKey": "/FlK5-3l46zAUDCroTschgqs1R_Jd",
            "url": "https://imgck.5156dujia.com//FlK5-3l46zAUDCroTschgqs1R_Jd",
            "picName": null },
          {
            "picKey": "/Fv_XImg4GjBoAKGrgX4uJ6ukXffy",
            "url": "https://imgck.5156dujia.com//Fv_XImg4GjBoAKGrgX4uJ6ukXffy",
            "picName": null },
          {
            "picKey": "/FnMt06AhcUc7BJR9blUghAXhURqN",
            "url": "https://imgck.5156dujia.com//FnMt06AhcUc7BJR9blUghAXhURqN",
            "picName": null },
          {
            "picKey": "/FgI71c6npHFzwhyJ2OWwmRq1yQn4",
            "url": "https://imgck.5156dujia.com//FgI71c6npHFzwhyJ2OWwmRq1yQn4",
            "picName": null },
          {
            "picKey": "/Fq8FZwZ-hAsqrcqTnzbRkmXgHK4n",
            "url": "https://imgck.5156dujia.com//Fq8FZwZ-hAsqrcqTnzbRkmXgHK4n",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "杭州知味观、北京东来顺、外婆家",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 304,
          "code": "C2021040700304",
          "name": "张文利",
          "flowerName": "张厨厨师团队",
          "telephone": "13718636067",
          "mainPic": "https://imgck.5156dujia.com/Fr3kgk7AP0JGNIT5iCbOY13MoV88",
          "jobStatus": "quitStatus",
          "cookAge": 22,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1497,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "116.24011",
          "latitude": "39.929897",
          "province": null,
          "city": "北京市",
          "district": "海淀区",
          "street": "田村路",
          "place": "田村后街",
          "addressDetail": "田村后街143号",
          "basicFee": 800.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 61,
          "highPraiseRate": 5.0,
          "evaluatorNum": 4,
          "grade": "金牌",
          "distance": 14291.7,
          "appointmentNum": 0,
          "chefDishTypeList": [{
            "id": 613,
            "createTime": 1618364348000,
            "deleted": null,
            "dishCode": "DS2021044700613",
            "cookCode": "C2021040700304",
            "dishStyleId": 11,
            "dishStyleName": "川菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 614,
            "createTime": 1618364365000,
            "deleted": null,
            "dishCode": "DS2021048300614",
            "cookCode": "C2021040700304",
            "dishStyleId": 46,
            "dishStyleName": "淮扬菜",
            "enable": "N",
            "orderNum": null },
          {
            "id": 615,
            "createTime": 1618364380000,
            "deleted": null,
            "dishCode": "DS2021047600615",
            "cookCode": "C2021040700304",
            "dishStyleId": 25,
            "dishStyleName": "自定义",
            "enable": "N",
            "orderNum": null }],

          "cuisine": "国宴菜,淮扬菜,川菜,粤菜,海鲜,融合菜",
          "chefPicList": [{
            "picKey": "/FkvdswY071wQ8W97DdcYFJLSmz40",
            "url": "https://imgck.5156dujia.com//FkvdswY071wQ8W97DdcYFJLSmz40",
            "picName": null },
          {
            "picKey": "/FscJEID-jttC3Nmmyh43G4jHeB_P",
            "url": "https://imgck.5156dujia.com//FscJEID-jttC3Nmmyh43G4jHeB_P",
            "picName": null },
          {
            "picKey": "/Fg3oZ5BbPUPwXfB5lPhx9IRbgq5F",
            "url": "https://imgck.5156dujia.com//Fg3oZ5BbPUPwXfB5lPhx9IRbgq5F",
            "picName": null },
          {
            "picKey": "/FsUgj0buHZkfqZTFxZnS9_qTSPfO",
            "url": "https://imgck.5156dujia.com//FsUgj0buHZkfqZTFxZnS9_qTSPfO",
            "picName": null },
          {
            "picKey": "/Fj0M3b4nf6qdZjtnhP4Wl_0fC-lX",
            "url": "https://imgck.5156dujia.com//Fj0M3b4nf6qdZjtnhP4Wl_0fC-lX",
            "picName": null },
          {
            "picKey": "/Fnx2pAOov1nsMbpQfHqLe0RwEsCR",
            "url": "https://imgck.5156dujia.com//Fnx2pAOov1nsMbpQfHqLe0RwEsCR",
            "picName": null },
          {
            "picKey": "/FpGRAT1YdpT_2rEfEh401OY6zFA5",
            "url": "https://imgck.5156dujia.com//FpGRAT1YdpT_2rEfEh401OY6zFA5",
            "picName": null },
          {
            "picKey": "/Fux-nCgMdsuA70Cd0BndPv2uWDZu",
            "url": "https://imgck.5156dujia.com//Fux-nCgMdsuA70Cd0BndPv2uWDZu",
            "picName": null },
          {
            "picKey": "/FloTAu6fi7yLrqrtq3-kv5FiDF7H",
            "url": "https://imgck.5156dujia.com//FloTAu6fi7yLrqrtq3-kv5FiDF7H",
            "picName": null },
          {
            "picKey": "/Fl82OPlOsHkRejBN5MvUgCPosLYQ",
            "url": "https://imgck.5156dujia.com//Fl82OPlOsHkRejBN5MvUgCPosLYQ",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "中央组织部招待所、国际饭店，高端私人会所、",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 317,
          "code": "C2021043600317",
          "name": "徐成松",
          "flowerName": "徐厨",
          "telephone": "15201858762",
          "mainPic": "https://imgck.5156dujia.com/FjslW8C5AWvXIqg8tjyjR2CKmfj8",
          "jobStatus": "workStatus",
          "cookAge": 14,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1553,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "121.3172700157517",
          "latitude": "31.154775689722285",
          "province": null,
          "city": "上海市",
          "district": "松江区",
          "street": "涞坊路",
          "place": "杜巷小区(上海市松江区涞坊路288弄)",
          "addressDetail": "288弄175号104室",
          "basicFee": 800.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 111,
          "highPraiseRate": 5.0,
          "evaluatorNum": 11,
          "grade": "金牌",
          "distance": 14475.0,
          "appointmentNum": 0,
          "chefDishTypeList": null,
          "cuisine": "本帮菜,湘菜,苏浙菜,徽菜,粤菜",
          "chefPicList": [{
            "picKey": "/FkYOSNxvYqpsDKmQtxAeeMh63C6Z",
            "url": "https://imgck.5156dujia.com//FkYOSNxvYqpsDKmQtxAeeMh63C6Z",
            "picName": null },
          {
            "picKey": "/FpDqdDH95w2dH9e06-OE8Ix07heE",
            "url": "https://imgck.5156dujia.com//FpDqdDH95w2dH9e06-OE8Ix07heE",
            "picName": null },
          {
            "picKey": "/Fv2BKWgvhxqZTuKamMaO3VlRf3JL",
            "url": "https://imgck.5156dujia.com//Fv2BKWgvhxqZTuKamMaO3VlRf3JL",
            "picName": null },
          {
            "picKey": "/FmouuN6L77gqwDQ3MkHxIw6k3nVh",
            "url": "https://imgck.5156dujia.com//FmouuN6L77gqwDQ3MkHxIw6k3nVh",
            "picName": null },
          {
            "picKey": "/FhSec8Tp4VtplCfYFNzvE2cNugKH",
            "url": "https://imgck.5156dujia.com//FhSec8Tp4VtplCfYFNzvE2cNugKH",
            "picName": null },
          {
            "picKey": "/FguCZL-tHg8EmATUN3FktYmETluv",
            "url": "https://imgck.5156dujia.com//FguCZL-tHg8EmATUN3FktYmETluv",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "松鹤楼、苏浙汇、小南国",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 356,
          "code": "C2021040500356",
          "name": "杨麒麟",
          "flowerName": "杨厨",
          "telephone": "13272018810",
          "mainPic": "https://imgck.5156dujia.com/FiZXyWEg6shM_JTpIah0l_gdotbW",
          "jobStatus": "quitStatus",
          "cookAge": 13,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1710,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "113.02662",
          "latitude": "28.16778",
          "province": null,
          "city": "长沙市",
          "district": "雨花区",
          "street": "西湖路",
          "place": "闽湘茶馆(长沙市雨花区)",
          "addressDetail": "高桥国际 老二号小区13栋",
          "basicFee": 500.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 21,
          "highPraiseRate": 4.9,
          "evaluatorNum": 1,
          "grade": "金牌",
          "distance": 13325.7,
          "appointmentNum": 0,
          "chefDishTypeList": null,
          "cuisine": "粤菜,湘菜,杭帮菜,海鲜,家常菜",
          "chefPicList": [{
            "picKey": "/Fp7IdANUGQ9PZd7nPGS1_5cnRNg6",
            "url": "https://imgck.5156dujia.com//Fp7IdANUGQ9PZd7nPGS1_5cnRNg6",
            "picName": null },
          {
            "picKey": "/Fp1vtm6aEkiPtfM6KM6y46aeHwuG",
            "url": "https://imgck.5156dujia.com//Fp1vtm6aEkiPtfM6KM6y46aeHwuG",
            "picName": null },
          {
            "picKey": "/Fg90n0CuLHxG2eTjBTc307AWVWfD",
            "url": "https://imgck.5156dujia.com//Fg90n0CuLHxG2eTjBTc307AWVWfD",
            "picName": null },
          {
            "picKey": "/Fo4PHzt5TXEVNj0sO2NNlHCJDBHW",
            "url": "https://imgck.5156dujia.com//Fo4PHzt5TXEVNj0sO2NNlHCJDBHW",
            "picName": null },
          {
            "picKey": "/FjRVycy2NfJUBxwfHAVmqZsKic-t",
            "url": "https://imgck.5156dujia.com//FjRVycy2NfJUBxwfHAVmqZsKic-t",
            "picName": null },
          {
            "picKey": "/FnYSr3QAXcb9Q38joiWSbWRe-JYb",
            "url": "https://imgck.5156dujia.com//FnYSr3QAXcb9Q38joiWSbWRe-JYb",
            "picName": null },
          {
            "picKey": "/FtdIATnlkLRZB35BemGvJwNLHIk-",
            "url": "https://imgck.5156dujia.com//FtdIATnlkLRZB35BemGvJwNLHIk-",
            "picName": null },
          {
            "picKey": "/Ftq67JBdpkhtt3b0Q8xlsr_BaY2s",
            "url": "https://imgck.5156dujia.com//Ftq67JBdpkhtt3b0Q8xlsr_BaY2s",
            "picName": null },
          {
            "picKey": "/FiwGd8nFyvPadqG30uJTsBdGTm3-",
            "url": "https://imgck.5156dujia.com//FiwGd8nFyvPadqG30uJTsBdGTm3-",
            "picName": null },
          {
            "picKey": "/FhmPkLusPaslx-M1gLtNhHIeoosP",
            "url": "https://imgck.5156dujia.com//FhmPkLusPaslx-M1gLtNhHIeoosP",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "太子酒店、杭州私人会所",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 358,
          "code": "C2021042700358",
          "name": "刘忠林",
          "flowerName": "宁静致远(刘厨)",
          "telephone": "18602705068",
          "mainPic": "https://imgck.5156dujia.com/Fig3LoL_Y4ygti9yjSbAS6dWyj6i",
          "jobStatus": "workStatus",
          "cookAge": 25,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1712,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "114.2863",
          "latitude": "30.632675",
          "province": null,
          "city": "武汉市",
          "district": "江岸区",
          "street": "金桥大道",
          "place": "东方恒星园(武汉市江岸区金桥大道18号)",
          "addressDetail": "紫御公馆二栋1802",
          "basicFee": 500.0,
          "advanceTime": "48",
          "advanceUnit": "小时",
          "serviceCount": 12,
          "highPraiseRate": 4.9,
          "evaluatorNum": 1,
          "grade": "金牌",
          "distance": 13591.9,
          "appointmentNum": 0,
          "chefDishTypeList": null,
          "cuisine": "粤菜,湖北菜,川湘菜",
          "chefPicList": [{
            "picKey": "/Fu11fWxDCq-sMg6I7UuJ6nHPEJGB",
            "url": "https://imgck.5156dujia.com//Fu11fWxDCq-sMg6I7UuJ6nHPEJGB",
            "picName": null },
          {
            "picKey": "/FhBSCzYFye7WJJCM-__DGd59VwpS",
            "url": "https://imgck.5156dujia.com//FhBSCzYFye7WJJCM-__DGd59VwpS",
            "picName": null },
          {
            "picKey": "/FsDZG7o0Q5kh0vhuhQmNmVeUoQeP",
            "url": "https://imgck.5156dujia.com//FsDZG7o0Q5kh0vhuhQmNmVeUoQeP",
            "picName": null },
          {
            "picKey": "/Fnj10rQCTpRUy5rT4odrPQxeHoGQ",
            "url": "https://imgck.5156dujia.com//Fnj10rQCTpRUy5rT4odrPQxeHoGQ",
            "picName": null },
          {
            "picKey": "/FuceW-KVBYFD7-cnqPDDmfUzwFj3",
            "url": "https://imgck.5156dujia.com//FuceW-KVBYFD7-cnqPDDmfUzwFj3",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "武汉丽华园酒店、武汉长青滕会所、武汉鼎续资本会所",
          "basicDishesNum": 10,
          "hotSortNum": 1 },
        {
          "id": 418,
          "code": "C2021041100418",
          "name": "汪学兵",
          "flowerName": "信阳私房养生菜",
          "telephone": "15188330820",
          "mainPic": "https://imgck.5156dujia.com/Fm1yGkPnBGNT863H6DmcCvOSeKcO",
          "jobStatus": "quitStatus",
          "cookAge": 30,
          "currentRestaurant": null,
          "formerRestaurant": null,
          "authentication": "Y",
          "userId": 1910,
          "remarks": null,
          "hidden": "N",
          "hotRecommend": "Y",
          "addressType": null,
          "longitude": "113.8173",
          "latitude": "35.457794",
          "province": null,
          "city": "新乡市",
          "district": "辉县市",
          "street": "共城大道",
          "place": "哈佛宝贝月子会所(辉县店)",
          "addressDetail": "4号楼二单元2003室",
          "basicFee": 380.0,
          "advanceTime": "24",
          "advanceUnit": "小时",
          "serviceCount": 6,
          "highPraiseRate": 4.9,
          "evaluatorNum": 1,
          "grade": "金牌",
          "distance": 13770.5,
          "appointmentNum": 0,
          "chefDishTypeList": null,
          "cuisine": "信阳菜,融合菜,海鲜野味",
          "chefPicList": [{
            "picKey": "FtYBAKLIk6o2dzWEI8ykiuliJShL",
            "url": "https://imgck.5156dujia.com/FtYBAKLIk6o2dzWEI8ykiuliJShL",
            "picName": null },
          {
            "picKey": "Fik8_qtSJJzE6-0hwqgOKy3BUO9G",
            "url": "https://imgck.5156dujia.com/Fik8_qtSJJzE6-0hwqgOKy3BUO9G",
            "picName": null },
          {
            "picKey": "FnqReenewOfYbWVR8zuXLQM3yAjX",
            "url": "https://imgck.5156dujia.com/FnqReenewOfYbWVR8zuXLQM3yAjX",
            "picName": null },
          {
            "picKey": "Fh5xLPvafyYMCsN_OuDh9IEKYzSk",
            "url": "https://imgck.5156dujia.com/Fh5xLPvafyYMCsN_OuDh9IEKYzSk",
            "picName": null },
          {
            "picKey": "FkeiefEsHA9WEu2B7JFxtjwR9iQo",
            "url": "https://imgck.5156dujia.com/FkeiefEsHA9WEu2B7JFxtjwR9iQo",
            "picName": null },
          {
            "picKey": "Fmt_3Y9J-NwBWIwSb1tDEy9B7cR2",
            "url": "https://imgck.5156dujia.com/Fmt_3Y9J-NwBWIwSb1tDEy9B7cR2",
            "picName": null }],

          "fictitiousHNum": 490.0,
          "fictitiousSNum": null,
          "fictitiousENum": 1,
          "resume": "信阳甲鱼村、传说茶馆、贵九疆会所",
          "basicDishesNum": 6,
          "hotSortNum": 1 }] } } };




}

/***/ }),

/***/ 23:
/*!*********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/goods/bespeakInfo.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 预约信息
                                                                                                      * kitchener 厨师(预约初始功能，百家宴隐藏了)
                                                                                                      * quick 送餐服务
                                                                                                      * party 聚会/套餐
                                                                                                      */var _default =
{
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "kitchener": {
        "before_hours": 6,
        "days": 8,
        "description": "只可以预约五天之内的时间",
        "bespeak_begin_date": "2022-02-04",
        "valid_time": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

        "packages": {
          "2022-02-04": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-05": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-06": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-07": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-08": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-09": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-10": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-11": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }] } },



      "quick": {
        "before_hours": 6,
        "days": 8,
        "description": "只可以预约五天之内的时间",
        "bespeak_begin_date": "2022-02-04",
        "work_days": {
          "2022-02-04": ["18:00", "18:30", "19:00", "19:30", "20:00"],
          "2022-02-05": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-06": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-07": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-08": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-09": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-10": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

          "2022-02-11": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"] },


        "valid_time": ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "15:00", "16:00", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],

        "packages": {
          "2022-02-04": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-05": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-06": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-07": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-08": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-09": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-10": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }],

          "2022-02-11": [{
            "id": "10",
            "name": "12个菜",
            "price": 1200,
            "recipe_num": 9 }] },


        "package_prices": {
          "2022-02-04": {
            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-05": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-06": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-07": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-08": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-09": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-10": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } },


          "2022-02-11": {
            "10:00": {
              "10": 1200 },

            "11:00": {
              "10": 1200 },

            "11:30": {
              "10": 1200 },

            "12:00": {
              "10": 1200 },

            "12:30": {
              "10": 1200 },

            "13:00": {
              "10": 1200 },

            "14:00": {
              "10": 1200 },

            "15:00": {
              "10": 1200 },

            "16:00": {
              "10": 1200 },

            "17:00": {
              "10": 1200 },

            "17:30": {
              "10": 1200 },

            "18:00": {
              "10": 1200 },

            "18:30": {
              "10": 1200 },

            "19:00": {
              "10": 1200 },

            "19:30": {
              "10": 1200 },

            "20:00": {
              "10": 1200 } } } },




      "party": {
        "single_discount": 0 } } } };exports.default = _default;

/***/ }),

/***/ 24:
/*!*******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/goods/partyInfo.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 预约信息
                                                                                                      * kitchener 厨师(预约初始功能，百家宴隐藏了)
                                                                                                      * quick 送餐服务
                                                                                                      * party 聚会/套餐
                                                                                                      */var _default =
{
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "id": "10237",
      "name": "家常套餐 A",
      "slogan": "家常套餐 A",
      "price": 999,
      "title": "含食材，适宜4-6人享用",
      "price_info": "RMB 999/套",
      "bespeak_info": "费用含食材及厨师服务费。请至少提前一天预订。",
      "description": ["本套餐不包含餐具", "如需餐具，请在附加服务中下单", "家常套餐请提前一天预定", "费用含食材及厨师服务费", "成品以实物为准，图片仅供参考"],
      "people_num": "适用于4-6人",
      "bespeak_num": 6666,
      "head": "https://cdn.idachu.com/uimgs/202007/941d5ba073b6c70f9446bf042e494b6c.jpg",
      "first_img": "https://cdn.idachu.com/uimgs/201609/358132582c4c60f7a184cabc876ccef6.jpg!300",
      "list_img": "https://cdn.idachu.com/uimgs/202007/d04905ca43a41bdcdb402527e0269ad0.jpg",
      "top_img": "https://cdn.idachu.com/uimgs/202007/21d50531fe175315480622a14fd9d448.jpg",
      "flow": ["用户线上下单预订，支付全款", "大客户专员联系和确认", "厨师团队上门服务"],
      "imgs": [{
        "name": "深海老醋蛰头",
        "img_small": "https://cdn.idachu.com/uimgs/201609/358132582c4c60f7a184cabc876ccef6.jpg!300",
        "img": "https://cdn.idachu.com/uimgs/201609/358132582c4c60f7a184cabc876ccef6.jpg" },
      {
        "name": "浓汤酸菜鱼",
        "img_small": "https://cdn.idachu.com/uimgs/201609/1a1eb92b408ed2431bff2b9cd9e3b088.jpg!300",
        "img": "https://cdn.idachu.com/uimgs/201609/1a1eb92b408ed2431bff2b9cd9e3b088.jpg" },
      {
        "name": "荔枝宫爆鸡丁",
        "img_small": "https://cdn.idachu.com/uimgs/201609/004a99b1333daaa8d29ac9f619e6ed68.jpg!300",
        "img": "https://cdn.idachu.com/uimgs/201609/004a99b1333daaa8d29ac9f619e6ed68.jpg" },
      {
        "name": "南非有机冰草",
        "img_small": "https://cdn.idachu.com/uimgs/201811/283c3e19f69be3e89bc7d0699ccbf5ba.jpg!300",
        "img": "https://cdn.idachu.com/uimgs/201811/283c3e19f69be3e89bc7d0699ccbf5ba.jpg" },
      {
        "name": "辣炒蛏子",
        "img_small": "https://cdn.idachu.com/uimgs/201603/2081b36e1e1b52b0db787679dedeb75d.jpg!300",
        "img": "https://cdn.idachu.com/uimgs/201603/2081b36e1e1b52b0db787679dedeb75d.jpg" }],

      "recipes": [{
        "id": "10892",
        "name": "清蒸海鲈鱼" },
      {
        "id": "10893",
        "name": "川汁凤尾虾" },
      {
        "id": "10894",
        "name": "雀巢咕噜鸡球" },
      {
        "id": "10895",
        "name": "双椒炒脆耳" },
      {
        "id": "934",
        "name": "辣炒蛏子" },
      {
        "id": "10896",
        "name": "酸汤金针灼肥羊" },
      {
        "id": "10707",
        "name": "蒜蓉红苋菜" },
      {
        "id": "603",
        "name": "清炒荷兰豆" },
      {
        "id": "10048",
        "name": "米饭" }],

      "menu": [{
        "tag_name": "热菜",
        "items": ["川汁凤尾虾", "蒜蓉红苋菜", "辣炒蛏子", "酸汤金针灼肥羊", "雀巢咕噜鸡球", "清蒸海鲈鱼", "清炒荷兰豆", "双椒炒脆耳"] },
      {
        "tag_name": "主食",
        "items": ["米饭"] }],

      "titles": ["宴会菜单", "菜品展示", "服务须知"],
      "share_img": "https://cdn.idachu.com/uimgs/201906/e18b1ad0cd47a9d03462c6166c924cac.jpg!100",
      "share_title": "11111111111111111111111",
      "share_description": "1111111111111111111111111",
      "valid": 1,
      "warning": "" } } };exports.default = _default;

/***/ }),

/***/ 242:
/*!******************************************!*\
  !*** H:/work/aiDaChu_uni/mixin/order.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 订单模块复用
 */

module.exports = {
  data: function data() {
    return {};
  },
  methods: {
    /**
              * 订单取消
              * @desc 触发成功之后会调用orderCancel
              * @param {Object} config
              */
    orderCancel: function orderCancel(orderId, callbackFun) {
      var that = this;
      uni.showModal({
        title: '确定要取消该订单吗？',
        content: '',
        success: function success(e) {
          if (e.confirm) {
            that.$api.order.cancel.request({
              orderId: orderId }).
            then(function (data) {
              typeof callbackFun === 'function' && callbackFun(data);
            });
          }
        } });

    } } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 25:
/*!*******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/goods/partyList.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 预约信息
                                                                                                      * kitchener 厨师(预约初始功能，百家宴隐藏了)
                                                                                                      * quick 送餐服务
                                                                                                      * party 聚会/套餐
                                                                                                      */var _default =
{
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "id": "1047",
      "name": "家常套餐",
      "slogan": "家常套餐",
      "head": "https://cdn.idachu.com/uimgs/202007/10f0afcbf6dbad0cdc63e213292ed8c8.jpg",
      "description": "家常套餐家常套餐 A家常套餐 A家常套餐 A家常套餐 A家常套餐 A",
      "from": "1970-07-01",
      "to": "2099-12-31",
      "dates": {
        "2022-02-09": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-10": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-11": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-12": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-13": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-14": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-15": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-16": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-17": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-18": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-19": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-20": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-21": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-22": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-23": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-24": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-25": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-26": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-27": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        "2022-02-28": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },

      "items": [{
        "id": "10237",
        "name": "家常套餐",
        "slogan": "家常套餐",
        "title": "含食材，适宜4-6人享用",
        "price_info": "RMB 999/套",
        "people_num": "适用于4-6人",
        "price": 999,
        "bespeak_num": 6666,
        "head": "202007/941d5ba073b6c70f9446bf042e494b6c.jpg",
        "head2": "",
        "description": "本套餐不包含餐具\r\n如需餐具，请在附加服务中下单\r\n家常套餐请提前一天预定\r\n费用含食材及厨师服务费\r\n成品以实物为准，图片仅供参考",
        "first_img": "https://cdn.idachu.com/uimgs/201609/358132582c4c60f7a184cabc876ccef6.jpg!300",
        "list_img": "/static/image/4.jpg", // https://cdn.idachu.com/uimgs/202007/d04905ca43a41bdcdb402527e0269ad0.jpg",
        "top_img": "https://cdn.idachu.com/uimgs/202007/21d50531fe175315480622a14fd9d448.jpg" },
      {
        "id": "10238",
        "name": "家常套餐B",
        "slogan": "家常套餐B",
        "title": "含食材，适宜4-6人享用",
        "price_info": "RMB 1299/套",
        "people_num": "适用于4-6人",
        "price": 1299,
        "bespeak_num": 6666,
        "head": "202007/70e058eaa0bc180465a6244cc67d8d0f.jpg",
        "head2": "",
        "description": "本套餐不包含餐具\r\n如需餐具，请在附加服务中下单\r\n家常套餐请提前一天预定\r\n费用含食材及厨师服务费\r\n成品以实物为准，图片仅供参考",
        "first_img": "https://cdn.idachu.com/uimgs/201504/e2758d8ad4933a92f1d436436618a296.jpg!300",
        "list_img": "/static/image/4.jpg",
        // "list_img": "https://cdn.idachu.com/uimgs/202007/fb4edd640a4dbeae20692c28c4d48000.jpg",
        "top_img": "https://cdn.idachu.com/uimgs/202007/f85629392bc8ebd47182a50edc653a69.jpg" }],

      "selected": "2016-02-07",
      "hotline": {
        "tel": "18513256892",
        "worktime": "9:00-18:00" },

      "share_img": "https://cdn.idachu.com/uimgs/201906/41b4806abdf2fb801fdd4366b4a1d976.jpg!100",
      "share_title": "11111111",
      "share_description": "111111111",
      "reserve": "" } } };exports.default = _default;

/***/ }),

/***/ 26:
/*!*********************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "banners": [{
        "title": "订制家宴",
        "img": "/static/image/3.jpg",
        "uri": {
          "url": "party/info",
          "params": {
            "id": "1009" } } },


      {
        "title": "会员充值",
        "img": "/static/image/3.jpg",
        "uri": {
          "url": "member/list",
          "params": {
            "id": "10092" } } }],



      "hot": [{
        "title": "家常套餐",
        "description": "",
        "img": "/static/image/1.jpg",
        "uri": {
          "url": "party/info",
          "params": {
            "id": "1047" } },


        "price": "",
        "slogan": "" },
      {
        "title": "百家宴烧烤",
        "description": "",
        "img": "/static/image/2.jpg",
        "uri": {
          "url": "party/info",
          "params": {
            "id": "1040" } },


        "price": "",
        "slogan": "" },
      {
        "title": "海鲜小火锅",
        "description": "",
        "img": "https://cdn.idachu.com/uimgs/201906/b5b76a95cbf961e724ffe3373e4f97b6.jpg",
        "uri": {
          "url": "party/info",
          "params": {
            "id": "1046" } },


        "price": "",
        "slogan": "" }],

      "buttons": [{
        "title": "单订厨师",
        "icon": "https://cdn.idachu.com/uimgs/201711/07a2509bc10ec4af1f2b4bf8e690d851.png",
        "uri": {
          "url": "bespeak" } },

      {
        "title": "宴会套餐",
        "icon": "https://cdn.idachu.com/uimgs/201605/08251d37acb2640729a061fff45d50a6.png",
        "uri": {
          "url": "party/info",
          "params": {
            "id": "1009" } } }],



      "share": {
        "url": "https://www.idachu.cn/",
        "title": "推荐一个厨师上门服务应用",
        "content": "刚刚使用了百家宴，大厨上门服务很给力，快来预约吧，大厨即刻到您家！",
        "img": "https://www.idachu.cn/icon/images/share.png?ver=a27226a0" },

      "city_id": 1,
      "party_id": 1009,
      "events": [{
        "title": "百家宴APP：在线支付与家宴预约上线",
        "url": "https://www.idachu.cn/api/document/view/10",
        "ext_url": "",
        "description": "四菜与六菜套餐可实现在线支付，一键支付，厨师速达。家宴可在线预约，人多不怕，天天开趴！\n【活动期间：2014年12月18日--2015年1月30日 新注册用户，立送50元现金券】选择百家宴，享受厨师上门烹饪星级大餐；选择百家宴，彻底告别地沟油！",
        "is_multi_media": "1",
        "head": "https://cdn.idachu.com/uimgs/201412/004706939e9adce683bd57233b36ec93.png",
        "head_small": "https://cdn.idachu.com/uimgs/201412/004706939e9adce683bd57233b36ec93.png" }],

      "weixin10": 1,
      "flash": "",
      "weixin": 5,
      "expands": [],
      "first": {
        "title": "预订",
        "description": "专业厨师上门服务",
        "icon": "lucai",
        "price": "300元起" },

      "tags": [],
      "version": {
        "version": "3.2.6",
        "min": "3.2.2",
        "upgrade": {
          "iOS": [""] },

        "title": "",
        "align": 1,
        "download": {
          "iOS": "https://itunes.apple.com/cn/app/ai-da-chu-guo-nei-shou-jia/id905870526?mt=8" } },


      "packages": [{
        "id": "7",
        "name": "八菜",
        "description": "",
        "recipe_num": 8,
        "price": 300 },
      {
        "id": "10",
        "name": "十二菜",
        "description": "",
        "recipe_num": 9,
        "price": 600 }],

      "second_button": {
        "text": "服务",
        "uri": "https://www.idachu.cn/about/intro",
        "icon": ["https://cdn.idachu.com/uimgs/201704/b9ce9ad3492119e1fd8d647d799caf37@2x.png",
        "https://cdn.idachu.com/uimgs/201704/a6a21a2dcc2f373b8ac62f898faea7cd@2x.png"] },


      "open_mini": 1 } } };exports.default = _default;

/***/ }),

/***/ 27:
/*!******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/login/sendCode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": '' } };exports.default = _default;

/***/ }),

/***/ 28:
/*!*******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/memberCard/list.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": [{
      "degree": 3,
      "name": "VIP银卡",
      "price": 2000,
      "present": 0,
      "img": "http://www.idachu.cn/icon/images/member/3.png?ver=46",
      "img2": "http://www.idachu.cn/icon/images/member/03.png?ver=46",
      "img3": "http://www.idachu.cn/icon/images/member/23.png?ver=46",
      "label": "",
      "color": "#08b8ba",
      "privilege": [],
      "member_description": "会员余额建议您定期消费",
      "disabled": 0 },
    {
      "degree": 4,
      "name": "VIP金卡",
      "price": 5000,
      "present": 0,
      "img": "http://www.idachu.cn/icon/images/member/4.png?ver=46",
      "img2": "http://www.idachu.cn/icon/images/member/04.png?ver=46",
      "img3": "http://www.idachu.cn/icon/images/member/24.png?ver=46",
      "label": "",
      "color": "#ffae00",
      "privilege": [],
      "disabled": 0 }] } };exports.default = _default;

/***/ }),

/***/ 29:
/*!****************************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/balanceRechargePay.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "timeStamp": '',
      "nonceStr": '',
      "package": '',
      "signType": '',
      "paySign": '' } } };exports.default = _default;

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"297762474_13","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"297762474_13","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"297762474_13","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"297762474_13","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 30:
/*!****************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/cancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 10000,
    "data": [{
      "degree": 3,
      "name": "VIP银卡",
      "price": 2000,
      "present": 0,
      "img": "http://www.idachu.cn/icon/images/member/3.png?ver=46",
      "img2": "http://www.idachu.cn/icon/images/member/03.png?ver=46",
      "img3": "http://www.idachu.cn/icon/images/member/23.png?ver=46",
      "label": "",
      "color": "#08b8ba",
      "privilege": [],
      "member_description": "会员余额建议您定期消费",
      "disabled": 0 },
    {
      "degree": 4,
      "name": "VIP金卡",
      "price": 5000,
      "present": 0,
      "img": "http://www.idachu.cn/icon/images/member/4.png?ver=46",
      "img2": "http://www.idachu.cn/icon/images/member/04.png?ver=46",
      "img3": "http://www.idachu.cn/icon/images/member/24.png?ver=46",
      "label": "",
      "color": "#ffae00",
      "privilege": [],
      "disabled": 0 }] } };exports.default = _default;

/***/ }),

/***/ 31:
/*!*************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/pay.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "timeStamp": '',
      "nonceStr": '',
      "package": '',
      "signType": '',
      "paySign": '' } } };exports.default = _default;

/***/ }),

/***/ 32:
/*!*******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/payDetail.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "id": "76600492",
      "name": "王大锤",
      "phone": "13821106286",
      "uid": "25777506",
      "area": "",
      "community": "名都园-1111号楼",
      "door_number": "111",
      "lng": "116.53757130807",
      "lat": "40.07023412934",
      "package_type": "1",
      "package_id": "10",
      "package_name": "12个菜",
      "package_price": "1200",
      "date": "2022-02-05 10:00:00",
      "memo": "",
      "pay_type": 0,
      "pay_price": 1200,
      "pay_status": 0,
      "pay_method": "",
      "refund_status": 0,
      "status": "5",
      "state": "5",
      "dateline": "2022-02-04 14:56:56",
      "price_item": [],
      "award": {},
      "downtime": 1799,
      "kitchener": null,
      "recipe": "",
      "is_reciped": 0,
      "coupon": null,
      "recipes": [],
      "is_commented": 0,
      "ingredient": 0,
      "package_recipe_num": "9",
      "usage": {
        "coupon": 1,
        "offline": 0,
        "cancel": 1,
        "is_ingredient": 0,
        "ingredient_detail": 0 },

      "ext_status": 0,
      "ext_price": 0,
      "status_text": {
        "name": "订单提交成功",
        "title": "请及时支付订单",
        "state": "待支付" } } } };exports.default = _default;

/***/ }),

/***/ 33:
/*!**************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/save.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      'orderId': '0123123132' // 订单id
    } } };exports.default = _default;

/***/ }),

/***/ 34:
/*!********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/order/statusList.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 需要增加不同的状态
var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": [{
      "operation": "cancel",
      "title": "订单已取消",
      "memo": "退款处理中",
      "dateline": "2022-02-03 13:13:30" },
    {
      "operation": "create",
      "title": "订单提交成功",
      "memo": "请及时支付订单",
      "dateline": "2022-02-03 13:11:56" }] } };exports.default = _default;

/***/ }),

/***/ 35:
/*!**************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/system/set.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "tag": null,
      "city": [{
        "id": 1,
        "name": "天津",
        "tel": "18513256892" },
      {
        "id": 2,
        "name": "深圳",
        "tel": "18513256892" },
      {
        "id": 3,
        "name": "上海",
        "tel": "18513256892" },
      {
        "id": 4,
        "name": "广州",
        "tel": "18513256892" },
      {
        "id": 5,
        "name": "太原",
        "tel": "18513256892" }],

      "area": [{
        "id": "1",
        "name": "朝阳区" },
      {
        "id": "2",
        "name": "海淀区" },
      {
        "id": "3",
        "name": "东城区" },
      {
        "id": "4",
        "name": "西城区" },
      {
        "id": "5",
        "name": "丰台区" },
      {
        "id": "6",
        "name": "石景山区" },
      {
        "id": "7",
        "name": "房山区" },
      {
        "id": "8",
        "name": "通州区" },
      {
        "id": "9",
        "name": "昌平区" },
      {
        "id": "10",
        "name": "大兴区" },
      {
        "id": "11",
        "name": "顺义区" },
      {
        "id": "12",
        "name": "密云县" },
      {
        "id": "15",
        "name": "平谷区" },
      {
        "id": "16",
        "name": "门头沟区" }],

      "order": [{
        "id": 3,
        "name": "评价最好" },
      {
        "id": 4,
        "name": "预订人数" }] } } };exports.default = _default;

/***/ }),

/***/ 36:
/*!**********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/addressCreate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {} } };exports.default = _default;

/***/ }),

/***/ 37:
/*!***********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/addressDefault.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {} } };exports.default = _default;

/***/ }),

/***/ 38:
/*!**********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/addressDelete.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {} } };exports.default = _default;

/***/ }),

/***/ 39:
/*!********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/addressSave.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {} } };exports.default = _default;

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 40:
/*!****************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/balance.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "total": 10000 } } };exports.default = _default;

/***/ }),

/***/ 41:
/*!*******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/balanceLog.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "uid": "25777506",
      "name": "王大锤",
      "phone": "13821106286",
      "regtime": "2022-01-29 12:14:12",
      "degree": "0",
      "has_degree_1": 0,
      "addresses": [{
        "id": "1686424",
        "sex": "0",
        "is_default": "1",
        "name": "王大锤",
        "phone": "13821106286",
        "area": "　",
        "community": "名都园-1111号楼",
        "door_number": "111",
        "lat": "40.07023412934",
        "lng": "116.53757130807" }] } } };exports.default = _default;

/***/ }),

/***/ 42:
/*!***************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/coupon.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "total": 0,
      "page_size": 10,
      "page": 1,
      "results": [] } } };exports.default = _default;

/***/ }),

/***/ 43:
/*!******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/couponAdd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {} } };exports.default = _default;

/***/ }),

/***/ 44:
/*!*************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/info.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "uid": "25777506",
      "name": "王大锤",
      "phone": "13821106286",
      "regtime": "2022-01-29 12:14:12",
      "degree": "0",
      "has_degree_1": 0,
      "addresses": [{
        "id": "1686424",
        "sex": "0",
        "is_default": "1",
        "name": "王大锤",
        "phone": "13821106286",
        "area": "　",
        "community": "名都园-1111号楼",
        "door_number": "111",
        "lat": "40.07023412934",
        "lng": "116.53757130807" }] } } };exports.default = _default;

/***/ }),

/***/ 45:
/*!********************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/orderDetail.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "id": "76599068",
      "name": "王大锤",
      "phone": "13821106286",
      "uid": "25777506",
      "area": "",
      "community": "名都园-1111号楼",
      "door_number": "111",
      "lng": "116.53757130807",
      "lat": "40.07023412934",
      "package_type": "1",
      "package_id": "10",
      "package_name": "12个菜",
      "package_price": "1200",
      "date": "2022-02-03 19:00:00",
      "memo": "111",
      "pay_type": 2,
      "pay_price": 1200,
      "pay_status": 0,
      "pay_method": "",
      "refund_status": 0,
      "status": "5",
      "state": "5",
      "dateline": "2022-02-03 13:11:56",
      "price_item": [],
      "award": {
        "comment": {
          "text": "晒图评论",
          "price": 0 },

        "friend": {
          "text": "分享朋友圈",
          "price": 0 },

        "weixin": {
          "text": "推荐安装有微信的用户使用",
          "price": 0,
          "color": "#cccccc",
          "order": 1 },

        "alipay": {
          "text": "推荐安装有支付宝的用户使用",
          "price": 0,
          "color": "#cccccc",
          "order": 2 },

        "baidu": {
          "text": "推荐安装有百度钱包的用户使用",
          "price": 0,
          "color": "#cccccc",
          "order": 5,
          "hidden": 1 },

        "apple": {
          "text": "推荐安装有Apple Pay的用户使用",
          "price": 0,
          "color": "#cccccc",
          "order": 4,
          "hidden": 1 },

        "cmb": {
          "text": "首次支付随机立减最高99元",
          "price": 0,
          "color": "#cccccc",
          "order": 3,
          "hidden": 1 },

        "offline": {
          "text": "推荐有当面交易需求的用户使用",
          "price": 0,
          "color": "#cccccc",
          "hidden": 1 },

        "balance": {
          "text": "推荐会员用户使用",
          "price": 0,
          "color": "#cccccc",
          "order": 0 },

        "balance_no": {
          "text": "充值会员尊享更多超值优惠",
          "price": 0,
          "color": "#cccccc" } },


      "downtime": 1752,
      "kitchener": null,
      "recipe": "",
      "is_reciped": 0,
      "coupon": null,
      "recipes": [],
      "is_commented": 0,
      "ingredient": 0,
      "package_recipe_num": "9",
      "usage": {
        "coupon": 1,
        "offline": 0,
        "cancel": 1,
        "is_ingredient": 0,
        "ingredient_detail": 0 },

      "ext_status": 0,
      "ext_price": 0,
      "status_text": {
        "name": "订单提交成功",
        "title": "请及时支付订单",
        "state": "待支付" } } } };exports.default = _default;

/***/ }),

/***/ 46:
/*!******************************************************!*\
  !*** H:/work/aiDaChu_uni/api/mock/user/orderList.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  statusCode: 200,
  data: {
    "code": 200,
    "data": {
      "total": 1,
      "page_size": 10,
      "page": 1,
      "result": [
      // {
      // 	"kitchener": {
      // 		"name": "",
      // 		"head_small": ""
      // 	},
      // 	"status": "5",
      // 	"status_text": {
      // 		"name": "订单提交成功",
      // 		"title": "请及时支付订单",
      // 		"state": "待支付"
      // 	},
      // 	"goods_images": '',
      // 	"pay_type": 0,
      // 	"pay_price": 1200,
      // 	"pay_status": 0,
      // 	"pay_method": "",
      // 	"date": "2022-02-01 10:00:00",
      // },
      {
        "kitchener": {
          "name": "",
          "head_small": "" },

        "status": "6",
        "status_text": {
          "name": "订单支付成功",
          "title": "支付成功",
          "state": "待接单" },

        "goods_name": '共呜春报晓(鸳鸯鸡)',
        "goods_images": '/static/mock/yuangyangji.jpg',
        "pay_type": 0,
        "pay_price": '199.00',
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-10 10:00:00" },

      {
        "kitchener": {
          "name": "王磊厨师",
          "head_small": "/static/mock/wangdachu.jpg" },

        "status": "7",
        "status_text": {
          "name": "订单已接单",
          "title": "厨师出单中",
          "state": "已接单" },

        "goods_name": '沉鱼落雁美(水鱼鸡汤)',
        "goods_images": '/static/mock/jitang.jpg',
        "pay_type": 0,
        "pay_price": '299.00',
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-10 10:00:00" },

      {
        "kitchener": {
          "name": "刘佳宇厨师",
          "head_small": "/static/mock/liujiayu.jpg" },

        "status": "7",
        "status_text": {
          "name": "订单已接单",
          "title": "厨师出单中",
          "state": "已接单" },

        "goods_name": '龙皇献彩卷(炸榴连卷)',
        "goods_images": '/static/mock/juang.jpg',
        "pay_type": 0,
        "pay_price": '199.00',
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-10 10:00:00" },

      {
        "kitchener": {
          "name": "王磊厨师",
          "head_small": "/static/mock/wangdachu.jpg" },

        "status": "7",
        "status_text": {
          "name": "订单已接单",
          "title": "厨师出单中",
          "state": "已接单" },

        "goods_name": '糖醋大鲤鱼',
        "goods_images": '/static/mock/tangCuDaLiYu.jpeg',
        "pay_type": 0,
        "pay_price": '59.00',
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-05 10:00:00" },

      {
        "kitchener": {
          "name": "刘佳宇厨师",
          "head_small": "/static/mock/liujiayu.jpg" },

        "status": "7",
        "status_text": {
          "name": "订单已接单",
          "title": "厨师出单中",
          "state": "已接单" },

        "goods_name": '鱼香茄子',
        "goods_images": '/static/mock/yuxiangqiezi.jpeg',
        "pay_type": 0,
        "pay_price": '29.00',
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-02 10:00:00" },

      {
        "kitchener": {
          "name": "王大厨",
          "head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg" },

        "status": "7",
        "status_text": {
          "name": "订单已接单",
          "title": "厨师出单中",
          "state": "已接单" },

        "goods_name": '商品名称',
        "goods_images": '',
        "pay_type": 0,
        "pay_price": 1200,
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-01 10:00:00" },

      {
        "kitchener": { // 厨师信息
          "name": "", // 名称
          "head_small": "" // 头像
        },
        "status": "4",
        "status_text": {
          "name": "订单已取消",
          "title": "退款处理中",
          "state": "取消订单" },

        "goods_name": '商品名称',
        "goods_images": '',
        "pay_type": 0, // 支付类型
        "pay_price": 1200, // 支付价格
        "pay_status": 0, // 支付状态
        "pay_method": "", // 支付类型
        "date": "2022-02-01 10:00:00" // 支付时间
      },
      {
        "kitchener": {
          "name": "王大厨",
          "head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg" },

        "status": "8",
        "status_text": {
          "name": "订单已出单",
          "title": "订单派送中",
          "state": "已出单" },

        "goods_name": '商品名称',
        "goods_images": '',
        "pay_type": 0,
        "pay_price": 1200,
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-01 10:00:00" },

      {
        "kitchener": {
          "name": "王大厨",
          "head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg" },

        "status": "8",
        "status_text": {
          "name": "订单已完成",
          "title": "用户已接收订单",
          "state": "已完成" },

        "goods_name": '商品名称',
        "goods_images": '',
        "pay_type": 0,
        "pay_price": 1200,
        "pay_status": 0,
        "pay_method": "",
        "date": "2022-02-01 10:00:00" }] } } };exports.default = _default;

/***/ }),

/***/ 47:
/*!***********************************************!*\
  !*** H:/work/aiDaChu_uni/config/hostConst.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 域名配置相关参数,一般用来配置线上线下切换的域名配置
 * @desc 所有程序的域名相关的都要在这里设置，不要使用其他的
 * @desc hostType中的formal类型为固定，其他的都是非正式版
 * @desc 暂时无法达到检测是正式版强制使用formal类型,因为小程序不提供是否是正式版的检测，如果用迂回的方法就是让后台检测然后返回小程序版本
 */

/**
     * 正式服务器配置
     */
var formal = {
  // 配置标识,会根据标识弹窗
  hostType: 'formal',

  // 服务器主域名(非api,可能某些特殊情况下会用到)
  host: 'https://www.baidu.com',

  // 服务器api域名(api域名,接口一般使用这个)
  apiHost: 'https://www.baidu.com/api',

  // 文件服务器主域名(相对图片添加路径)
  fileHost: 'https://www.baidu.com',

  // 上传文件服务器主域名
  upFileHost: 'https://www.baidu.com',

  // 前端出现错误时进行提交的url,全域名
  errorUrl: '',

  // 用户行为日志上传url
  userBehaviorLog: '',

  // webSoer服务器
  webSocketHost: 'wss://www.baidu.com/wss/' };


/**
                                                * 测试服务器
                                                */
var test = {
  // 配置标识,会根据标识弹窗
  hostType: 'test',

  // 服务器主域名(非api,可能某些特殊情况下会用到)
  host: 'http://shopv6.admin.com',

  // 服务器api域名(api域名,接口一般使用这个)
  apiHost: 'http://shopv6.admin.com/api',

  // 文件服务器主域名(相对图片添加路径)
  fileHost: 'http://shopv6.admin.com',

  // 上传文件服务器主域名
  upFileHost: 'http://shopv6.admin.com',

  // 前端出现错误时进行提交的url,全域名
  errorUrl: '',

  // 用户行为日志上传url
  userBehaviorLog: '',

  // webSoer服务器
  webSocketHost: 'wss://www.baidu.com/wss/' };


module.exports = formal;

/***/ }),

/***/ 5:
/*!**************************************!*\
  !*** H:/work/aiDaChu_uni/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 54:
/*!******************************************!*\
  !*** H:/work/aiDaChu_uni/mixin/share.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _shareConfig = __webpack_require__(/*! ../common/shareConfig.js */ 55);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 分享
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @desc 目前兼容小程序，后期增加app
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */

module.exports = {
  data: function data() {
    return {
      share: {
        title: '', // 默认为小程序名称
        path: '', // 默认为当前页面路径
        imageUrl: '' // 默认为当前页面的截图
      } };

  },
  onLoad: function onLoad() {

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'] });









    // TODO 获取页面配置不同的分享内容,修改成策略模式配置模式
    this.shareSet(_shareConfig.shareConfig);
  },

  onShareAppMessage: function onShareAppMessage() {
    return this.mpShare;
  },


  onShareTimeline: function onShareTimeline() {
    return this.mpShare;
  },


  methods: {
    // 外部调用,分享设置
    shareSet: function shareSet(config) {
      this.share = _objectSpread(_objectSpread({},
      this.share),
      config);

    } } };

/***/ }),

/***/ 55:
/*!*************************************************!*\
  !*** H:/work/aiDaChu_uni/common/shareConfig.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.shareConfig = void 0;var shareConfig = {
  title: "\u6211\u559C\u6B22\u7684\u53A8\u5E08\u4E0A\u95E8\u670D\u52A1\uFF0C\u63A8\u8350\u4F60\u4E5F\u7528\u7528",
  path: "/pages/index/index",
  imageUrl: "/static/images/share.png" };exports.shareConfig = shareConfig;

/***/ }),

/***/ 88:
/*!*****************************************!*\
  !*** H:/work/aiDaChu_uni/utils/city.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  city: [{
    code: "0100",
    name: "北京市",
    cityList: [{
      code: "0101",
      name: "北京",
      districtList: [{
        code: "0003",
        name: "朝阳区" },
      {
        code: "0011",
        name: "海淀区" },
      {
        code: "0024",
        name: "密云区" },
      {
        code: "0028",
        name: "昌平区" },
      {
        code: "0029",
        name: "怀柔区" },
      {
        code: "0006",
        name: "丰台区" },
      {
        code: "0002",
        name: "东城区" },
      {
        code: "0001",
        name: "西城区" },
      {
        code: "0026",
        name: "延庆区" },
      {
        code: "0027",
        name: "通州区" },
      {
        code: "0032",
        name: "房山区" },
      {
        code: "0030",
        name: "平谷区" },
      {
        code: "0033",
        name: "大兴区" },
      {
        code: "0031",
        name: "门头沟区" },
      {
        code: "0025",
        name: "顺义区" },
      {
        code: "0009",
        name: "石景山区" }] }] },


  {
    code: "0200",
    name: "上海市",
    cityList: [{
      code: "0201",
      name: "上海",
      districtList: [{
        code: "0001",
        name: "浦东新区" },
      {
        code: "0028",
        name: "闵行区" },
      {
        code: "0025",
        name: "松江区" },
      {
        code: "0002",
        name: "徐汇区" },
      {
        code: "0007",
        name: "黄浦区" },
      {
        code: "0022",
        name: "宝山区" },
      {
        code: "0026",
        name: "嘉定区" },
      {
        code: "0020",
        name: "普陀区" },
      {
        code: "0029",
        name: "青浦区" },
      {
        code: "0030",
        name: "崇明区" },
      {
        code: "0023",
        name: "虹口区" },
      {
        code: "0004",
        name: "长宁区" },
      {
        code: "0005",
        name: "静安区" },
      {
        code: "0021",
        name: "杨浦区" },
      {
        code: "0027",
        name: "奉贤区" },
      {
        code: "0031",
        name: "金山区" }] }] },


  {
    code: "0300",
    name: "天津市",
    cityList: [{
      code: "0301",
      name: "天津",
      districtList: [{
        code: "0021",
        name: "蓟州区" },
      {
        code: "0006",
        name: "滨海新区" },
      {
        code: "0008",
        name: "和平区" },
      {
        code: "0004",
        name: "南开区" },
      {
        code: "0002",
        name: "河东区" },
      {
        code: "0010",
        name: "西青区" },
      {
        code: "0003",
        name: "河西区" },
      {
        code: "0007",
        name: "河北区" },
      {
        code: "0009",
        name: "东丽区" },
      {
        code: "0011",
        name: "北辰区" },
      {
        code: "0012",
        name: "武清区" },
      {
        code: "0013",
        name: "津南区" },
      {
        code: "0019",
        name: "红桥区" },
      {
        code: "0015",
        name: "宝坻区" },
      {
        code: "0018",
        name: "静海区" },
      {
        code: "0023",
        name: "宁河区" }] }] },


  {
    code: "0400",
    name: "重庆市",
    cityList: [{
      code: "0401",
      name: "重庆",
      districtList: [{
        code: "0001",
        name: "渝中区" },
      {
        code: "0007",
        name: "渝北区" },
      {
        code: "0008",
        name: "江北区" },
      {
        code: "0006",
        name: "沙坪坝区" },
      {
        code: "0002",
        name: "九龙坡区" },
      {
        code: "0003",
        name: "南岸区" },
      {
        code: "0014",
        name: "巴南区" },
      {
        code: "0009",
        name: "万州区" },
      {
        code: "0020",
        name: "武隆区" },
      {
        code: "0010",
        name: "北碚区" },
      {
        code: "0018",
        name: "涪陵区" },
      {
        code: "0031",
        name: "黔江区" },
      {
        code: "0029",
        name: "綦江区" },
      {
        code: "0019",
        name: "永川区" },
      {
        code: "0035",
        name: "酉阳土家族苗族自治县" },
      {
        code: "0015",
        name: "江津区" },
      {
        code: "0044",
        name: "开州区" },
      {
        code: "0022",
        name: "长寿区" },
      {
        code: "0043",
        name: "奉节县" },
      {
        code: "0016",
        name: "南川区" },
      {
        code: "0030",
        name: "彭水苗族土家族自治县" },
      {
        code: "0034",
        name: "云阳县" },
      {
        code: "0023",
        name: "合川区" },
      {
        code: "0040",
        name: "石柱土家族自治县" },
      {
        code: "0041",
        name: "巫山县" },
      {
        code: "0045",
        name: "城口县" },
      {
        code: "0021",
        name: "丰都县" },
      {
        code: "0024",
        name: "垫江县" },
      {
        code: "0042",
        name: "巫溪县" },
      {
        code: "0032",
        name: "秀山土家族苗族自治县" },
      {
        code: "0025",
        name: "大足区" },
      {
        code: "0038",
        name: "璧山区" },
      {
        code: "0046",
        name: "梁平区" },
      {
        code: "0027",
        name: "荣昌区" },
      {
        code: "0037",
        name: "忠县" },
      {
        code: "0039",
        name: "潼南区" },
      {
        code: "0026",
        name: "铜梁区" },
      {
        code: "0011",
        name: "大渡口区" }] },

    {
      code: "4010020",
      name: "武隆县",
      districtList: [{
        code: "100759435",
        name: "仙女山镇" }] },

    {
      code: "4010009",
      name: "万州区",
      districtList: [] },
    {
      code: "4010015",
      name: "江津区",
      districtList: [] },
    {
      code: "4010016",
      name: "南川区",
      districtList: [] },
    {
      code: "4010018",
      name: "涪陵区",
      districtList: [] },
    {
      code: "4010019",
      name: "永川区",
      districtList: [] },
    {
      code: "4010021",
      name: "丰都县",
      districtList: [] },
    {
      code: "4010022",
      name: "长寿区",
      districtList: [] },
    {
      code: "4010023",
      name: "合川区",
      districtList: [] },
    {
      code: "4010024",
      name: "垫江县",
      districtList: [] },
    {
      code: "4010025",
      name: "大足区",
      districtList: [] },
    {
      code: "4010026",
      name: "铜梁县",
      districtList: [] },
    {
      code: "4010027",
      name: "荣昌县",
      districtList: [] },
    {
      code: "4010029",
      name: "綦江区",
      districtList: [] },
    {
      code: "4010030",
      name: "彭水苗族土家族自治县",
      districtList: [] },
    {
      code: "4010031",
      name: "黔江区",
      districtList: [] },
    {
      code: "4010032",
      name: "秀山土家族苗族自治县",
      districtList: [] },
    {
      code: "4010034",
      name: "云阳县",
      districtList: [] },
    {
      code: "4010035",
      name: "酉阳土家族苗族自治县",
      districtList: [] },
    {
      code: "4010037",
      name: "忠县",
      districtList: [] },
    {
      code: "4010038",
      name: "璧山县",
      districtList: [] },
    {
      code: "4010039",
      name: "潼南县",
      districtList: [] },
    {
      code: "4010040",
      name: "石柱土家族自治县",
      districtList: [] },
    {
      code: "4010041",
      name: "巫山县",
      districtList: [] },
    {
      code: "4010042",
      name: "巫溪县",
      districtList: [] },
    {
      code: "4010043",
      name: "奉节县",
      districtList: [] },
    {
      code: "4010044",
      name: "开县",
      districtList: [] },
    {
      code: "4010045",
      name: "城口县",
      districtList: [] },
    {
      code: "4010046",
      name: "梁平县",
      districtList: [] },
    {
      code: "5389",
      name: "测试",
      districtList: [] }] },

  {
    code: "0500",
    name: "河北省",
    cityList: [{
      code: "0501",
      name: "石家庄",
      districtList: [{
        code: "0009",
        name: "桥西区" },
      {
        code: "0011",
        name: "裕华区" },
      {
        code: "0005",
        name: "长安区" },
      {
        code: "0006",
        name: "新华区" },
      {
        code: "0036",
        name: "平山县" },
      {
        code: "0034",
        name: "正定县" },
      {
        code: "0035",
        name: "藁城区" },
      {
        code: "0038",
        name: "辛集市" },
      {
        code: "0048",
        name: "赞皇县" },
      {
        code: "0037",
        name: "鹿泉区" },
      {
        code: "0046",
        name: "灵寿县" },
      {
        code: "0047",
        name: "高邑县" },
      {
        code: "0044",
        name: "栾城区" },
      {
        code: "0040",
        name: "新乐市" },
      {
        code: "0039",
        name: "晋州市" },
      {
        code: "0045",
        name: "行唐县" },
      {
        code: "0042",
        name: "无极县" },
      {
        code: "0043",
        name: "元氏县" },
      {
        code: "0019",
        name: "井陉县" },
      {
        code: "0041",
        name: "赵县" },
      {
        code: "0049",
        name: "深泽县" },
      {
        code: "0033",
        name: "井陉矿区" }] },

    {
      code: "0502",
      name: "承德",
      districtList: [{
        code: "0001",
        name: "双桥区" },
      {
        code: "0019",
        name: "丰宁满族自治县" },
      {
        code: "0017",
        name: "围场满族蒙古族自治县" },
      {
        code: "0002",
        name: "双滦区" },
      {
        code: "0018",
        name: "兴隆县" },
      {
        code: "0023",
        name: "隆化县" },
      {
        code: "0022",
        name: "承德县" },
      {
        code: "0016",
        name: "宽城满族自治县" },
      {
        code: "0020",
        name: "平泉市" },
      {
        code: "0021",
        name: "滦平县" },
      {
        code: "0003",
        name: "鹰手营子矿区" }] },

    {
      code: "0503",
      name: "秦皇岛",
      districtList: [{
        code: "0011",
        name: "北戴河区" },
      {
        code: "0008",
        name: "抚宁区" },
      {
        code: "0001",
        name: "海港区" },
      {
        code: "0002",
        name: "山海关区" },
      {
        code: "0013",
        name: "昌黎县" },
      {
        code: "0007",
        name: "卢龙县" },
      {
        code: "0014",
        name: "青龙满族自治县" }] },

    {
      code: "0505",
      name: "邢台",
      districtList: [{
        code: "0005",
        name: "桥东区" },
      {
        code: "0006",
        name: "桥西区" },
      {
        code: "0025",
        name: "沙河市" },
      {
        code: "0028",
        name: "宁晋县" },
      {
        code: "0029",
        name: "威县" },
      {
        code: "0024",
        name: "邢台县" },
      {
        code: "0030",
        name: "南宫市" },
      {
        code: "0026",
        name: "清河县" },
      {
        code: "0027",
        name: "隆尧县" },
      {
        code: "0033",
        name: "临城县" },
      {
        code: "0037",
        name: "巨鹿县" },
      {
        code: "0038",
        name: "南和县" },
      {
        code: "0036",
        name: "平乡县" },
      {
        code: "0031",
        name: "柏乡县" },
      {
        code: "0035",
        name: "内丘县" },
      {
        code: "0032",
        name: "任县" },
      {
        code: "0034",
        name: "临西县" },
      {
        code: "0039",
        name: "广宗县" },
      {
        code: "0040",
        name: "新河县" }] },

    {
      code: "0506",
      name: "唐山",
      districtList: [{
        code: "0004",
        name: "路北区" },
      {
        code: "0026",
        name: "乐亭县" },
      {
        code: "0007",
        name: "丰南区" },
      {
        code: "0012",
        name: "曹妃甸区" },
      {
        code: "0011",
        name: "丰润区" },
      {
        code: "0003",
        name: "路南区" },
      {
        code: "0023",
        name: "迁安市" },
      {
        code: "0025",
        name: "遵化市" },
      {
        code: "0030",
        name: "滦南县" },
      {
        code: "0013",
        name: "古冶区" },
      {
        code: "0027",
        name: "迁西县" },
      {
        code: "0029",
        name: "玉田县" },
      {
        code: "0028",
        name: "滦县" },
      {
        code: "0008",
        name: "开平区" }] },

    {
      code: "0511",
      name: "廊坊",
      districtList: [{
        code: "0005",
        name: "广阳区" },
      {
        code: "0014",
        name: "三河市" },
      {
        code: "0013",
        name: "霸州市" },
      {
        code: "0018",
        name: "香河县" },
      {
        code: "0006",
        name: "安次区" },
      {
        code: "0017",
        name: "固安县" },
      {
        code: "0021",
        name: "大城县" },
      {
        code: "0022",
        name: "文安县" },
      {
        code: "0019",
        name: "永清县" },
      {
        code: "0020",
        name: "大厂回族自治县" }] },

    {
      code: "0512",
      name: "保定",
      districtList: [{
        code: "0045",
        name: "徐水区" },
      {
        code: "0039",
        name: "竞秀区" },
      {
        code: "0038",
        name: "莲池区" },
      {
        code: "0046",
        name: "满城区" },
      {
        code: "0050",
        name: "清苑区" },
      {
        code: "0037",
        name: "高碑店市" },
      {
        code: "0036",
        name: "涿州市" },
      {
        code: "0044",
        name: "定州市" },
      {
        code: "0040",
        name: "涞源县" },
      {
        code: "0047",
        name: "安新县" },
      {
        code: "0051",
        name: "易县" },
      {
        code: "0049",
        name: "雄县" },
      {
        code: "0048",
        name: "曲阳县" },
      {
        code: "0053",
        name: "容城县" },
      {
        code: "0041",
        name: "安国市" },
      {
        code: "0035",
        name: "涞水县" },
      {
        code: "0052",
        name: "定兴县" },
      {
        code: "0043",
        name: "唐县" },
      {
        code: "0034",
        name: "阜平县" },
      {
        code: "0054",
        name: "望都县" },
      {
        code: "0056",
        name: "顺平县" },
      {
        code: "0042",
        name: "高阳县" },
      {
        code: "0057",
        name: "蠡县" },
      {
        code: "0055",
        name: "博野县" }] },

    {
      code: "0513",
      name: "张家口",
      districtList: [{
        code: "0009",
        name: "桥东区" },
      {
        code: "0022",
        name: "张北县" },
      {
        code: "0008",
        name: "桥西区" },
      {
        code: "0004",
        name: "宣化区" },
      {
        code: "0021",
        name: "崇礼区" },
      {
        code: "0014",
        name: "沽源县" },
      {
        code: "0002",
        name: "怀来县" },
      {
        code: "0020",
        name: "蔚县" },
      {
        code: "0018",
        name: "赤城县" },
      {
        code: "0017",
        name: "万全区" },
      {
        code: "0006",
        name: "涿鹿县" },
      {
        code: "0013",
        name: "康保县" },
      {
        code: "0016",
        name: "怀安县" },
      {
        code: "0011",
        name: "下花园区" },
      {
        code: "0015",
        name: "阳原县" },
      {
        code: "0019",
        name: "尚义县" }] },

    {
      code: "0514",
      name: "衡水",
      districtList: [{
        code: "0003",
        name: "桃城区" },
      {
        code: "0009",
        name: "安平县" },
      {
        code: "0010",
        name: "故城县" },
      {
        code: "0004",
        name: "枣强县" },
      {
        code: "0011",
        name: "景县" },
      {
        code: "0002",
        name: "冀州区" },
      {
        code: "0008",
        name: "深州市" },
      {
        code: "0005",
        name: "武邑县" },
      {
        code: "0007",
        name: "饶阳县" },
      {
        code: "0006",
        name: "武强县" },
      {
        code: "0012",
        name: "阜城县" }] },

    {
      code: "0515",
      name: "邯郸",
      districtList: [{
        code: "0006",
        name: "邯山区" },
      {
        code: "0007",
        name: "丛台区" },
      {
        code: "0024",
        name: "武安市" },
      {
        code: "0022",
        name: "永年区" },
      {
        code: "0021",
        name: "涉县" },
      {
        code: "0008",
        name: "复兴区" },
      {
        code: "0013",
        name: "磁县" },
      {
        code: "0018",
        name: "馆陶县" },
      {
        code: "0019",
        name: "魏县" },
      {
        code: "0020",
        name: "大名县" },
      {
        code: "0023",
        name: "曲周县" },
      {
        code: "0015",
        name: "邱县" },
      {
        code: "0010",
        name: "峰峰矿区" },
      {
        code: "0011",
        name: "临漳县" },
      {
        code: "0016",
        name: "鸡泽县" },
      {
        code: "0014",
        name: "肥乡区" },
      {
        code: "0012",
        name: "成安县" },
      {
        code: "0017",
        name: "广平县" }] },

    {
      code: "0516",
      name: "沧州",
      districtList: [{
        code: "0009",
        name: "运河区" },
      {
        code: "0019",
        name: "黄骅市" },
      {
        code: "0008",
        name: "新华区" },
      {
        code: "0018",
        name: "任丘市" },
      {
        code: "0004",
        name: "肃宁县" },
      {
        code: "0005",
        name: "河间市" },
      {
        code: "0017",
        name: "泊头市" },
      {
        code: "0016",
        name: "盐山县" },
      {
        code: "0011",
        name: "东光县" },
      {
        code: "0006",
        name: "献县" },
      {
        code: "0007",
        name: "青县" },
      {
        code: "0013",
        name: "南皮县" },
      {
        code: "0015",
        name: "孟村回族自治县" },
      {
        code: "0014",
        name: "吴桥县" },
      {
        code: "0012",
        name: "海兴县" },
      {
        code: "0010",
        name: "沧县" }] },

    {
      code: "0504",
      name: "南戴河",
      districtList: [] },
    {
      code: "0507",
      name: "丰宁坝上",
      districtList: [] },
    {
      code: "0535",
      name: "野三坡",
      districtList: [] },
    {
      code: "0537",
      name: "玉泉山",
      districtList: [] },
    {
      code: "0541",
      name: "白洋淀",
      districtList: [] },
    {
      code: "0559",
      name: "白沟镇",
      districtList: [] },
    {
      code: "5010019",
      name: "井陉县",
      districtList: [] },
    {
      code: "5010034",
      name: "正定县",
      districtList: [] },
    {
      code: "5010035",
      name: "藁城",
      districtList: [] },
    {
      code: "5010036",
      name: "平山县",
      districtList: [] },
    {
      code: "5010037",
      name: "鹿泉",
      districtList: [] },
    {
      code: "5010038",
      name: "辛集",
      districtList: [] },
    {
      code: "5010039",
      name: "晋州",
      districtList: [] },
    {
      code: "5010040",
      name: "新乐",
      districtList: [] },
    {
      code: "5010041",
      name: "赵县",
      districtList: [] },
    {
      code: "5010042",
      name: "无极县",
      districtList: [] },
    {
      code: "5010043",
      name: "元氏县",
      districtList: [] },
    {
      code: "5010044",
      name: "栾城县",
      districtList: [] },
    {
      code: "5010045",
      name: "行唐县",
      districtList: [] },
    {
      code: "5010046",
      name: "灵寿县",
      districtList: [] },
    {
      code: "5010047",
      name: "高邑县",
      districtList: [] },
    {
      code: "5010048",
      name: "赞皇县",
      districtList: [] },
    {
      code: "5010049",
      name: "深泽县",
      districtList: [] },
    {
      code: "5020016",
      name: "宽城满族自治县",
      districtList: [] },
    {
      code: "5020017",
      name: "围场满族蒙古族自治县",
      districtList: [] },
    {
      code: "5020019",
      name: "丰宁满族自治县",
      districtList: [] },
    {
      code: "5020020",
      name: "平泉县",
      districtList: [] },
    {
      code: "5020021",
      name: "滦平县",
      districtList: [] },
    {
      code: "5020022",
      name: "承德县",
      districtList: [] },
    {
      code: "5020023",
      name: "隆化县",
      districtList: [] },
    {
      code: "5030011",
      name: "北戴河区",
      districtList: [] },
    {
      code: "5030013",
      name: "昌黎县",
      districtList: [] },
    {
      code: "5030014",
      name: "青龙满族自治县",
      districtList: [] },
    {
      code: "5050025",
      name: "沙河",
      districtList: [] },
    {
      code: "5050026",
      name: "清河县",
      districtList: [] },
    {
      code: "5050027",
      name: "隆尧县",
      districtList: [] },
    {
      code: "5050028",
      name: "宁晋县",
      districtList: [] },
    {
      code: "5050029",
      name: "威县",
      districtList: [] },
    {
      code: "5050030",
      name: "南宫",
      districtList: [] },
    {
      code: "5050031",
      name: "柏乡县",
      districtList: [] },
    {
      code: "5050032",
      name: "任县",
      districtList: [] },
    {
      code: "5050033",
      name: "临城县",
      districtList: [] },
    {
      code: "5050034",
      name: "临西县",
      districtList: [] },
    {
      code: "5050035",
      name: "内丘县",
      districtList: [] },
    {
      code: "5050036",
      name: "平乡县",
      districtList: [] },
    {
      code: "5050037",
      name: "巨鹿县",
      districtList: [] },
    {
      code: "5050038",
      name: "南和县",
      districtList: [] },
    {
      code: "5050039",
      name: "广宗县",
      districtList: [] },
    {
      code: "5050040",
      name: "新河县",
      districtList: [] },
    {
      code: "5060012",
      name: "曹妃甸区",
      districtList: [] },
    {
      code: "5060023",
      name: "迁安",
      districtList: [] },
    {
      code: "5060025",
      name: "遵化",
      districtList: [] },
    {
      code: "5060026",
      name: "乐亭县",
      districtList: [] },
    {
      code: "5060027",
      name: "迁西县",
      districtList: [] },
    {
      code: "5060028",
      name: "滦县",
      districtList: [] },
    {
      code: "5060029",
      name: "玉田县",
      districtList: [] },
    {
      code: "5060030",
      name: "滦南县",
      districtList: [] },
    {
      code: "5110013",
      name: "霸州",
      districtList: [] },
    {
      code: "5110014",
      name: "三河",
      districtList: [] },
    {
      code: "5110017",
      name: "固安县",
      districtList: [] },
    {
      code: "5110018",
      name: "香河县",
      districtList: [] },
    {
      code: "5110019",
      name: "永清县",
      districtList: [] },
    {
      code: "5110020",
      name: "大厂回族自治县",
      districtList: [] },
    {
      code: "5110021",
      name: "大城县",
      districtList: [] },
    {
      code: "5110022",
      name: "文安县",
      districtList: [] },
    {
      code: "5120034",
      name: "阜平县",
      districtList: [] },
    {
      code: "5120035",
      name: "涞水县",
      districtList: [] },
    {
      code: "5120036",
      name: "涿州",
      districtList: [] },
    {
      code: "5120037",
      name: "高碑店",
      districtList: [] },
    {
      code: "5120040",
      name: "涞源县",
      districtList: [] },
    {
      code: "5120041",
      name: "安国",
      districtList: [] },
    {
      code: "5120042",
      name: "高阳县",
      districtList: [] },
    {
      code: "5120043",
      name: "唐县",
      districtList: [] },
    {
      code: "5120044",
      name: "定州",
      districtList: [] },
    {
      code: "5120045",
      name: "徐水县",
      districtList: [] },
    {
      code: "5120046",
      name: "满城县",
      districtList: [] },
    {
      code: "5120047",
      name: "安新县",
      districtList: [] },
    {
      code: "5120048",
      name: "曲阳县",
      districtList: [] },
    {
      code: "5120049",
      name: "雄县",
      districtList: [] },
    {
      code: "5120050",
      name: "清苑县",
      districtList: [] },
    {
      code: "5120051",
      name: "易县",
      districtList: [] },
    {
      code: "5120052",
      name: "定兴县",
      districtList: [] },
    {
      code: "5120053",
      name: "容城县",
      districtList: [] },
    {
      code: "5120054",
      name: "望都县",
      districtList: [] },
    {
      code: "5120055",
      name: "博野县",
      districtList: [] },
    {
      code: "5120056",
      name: "顺平县",
      districtList: [] },
    {
      code: "5120057",
      name: "蠡县",
      districtList: [] },
    {
      code: "5130002",
      name: "怀来县",
      districtList: [] },
    {
      code: "5130006",
      name: "涿鹿县",
      districtList: [] },
    {
      code: "5130013",
      name: "康保县",
      districtList: [] },
    {
      code: "5130014",
      name: "沽源县",
      districtList: [] },
    {
      code: "5130015",
      name: "阳原县",
      districtList: [] },
    {
      code: "5130016",
      name: "怀安县",
      districtList: [] },
    {
      code: "5130017",
      name: "万全县",
      districtList: [] },
    {
      code: "5130018",
      name: "赤城县",
      districtList: [] },
    {
      code: "5130019",
      name: "尚义县",
      districtList: [] },
    {
      code: "5130020",
      name: "蔚县",
      districtList: [] },
    {
      code: "5130021",
      name: "崇礼县",
      districtList: [] },
    {
      code: "5130022",
      name: "张北县",
      districtList: [] },
    {
      code: "5140002",
      name: "冀州",
      districtList: [] },
    {
      code: "5140004",
      name: "枣强县",
      districtList: [] },
    {
      code: "5140005",
      name: "武邑县",
      districtList: [] },
    {
      code: "5140006",
      name: "武强县",
      districtList: [] },
    {
      code: "5140007",
      name: "饶阳县",
      districtList: [] },
    {
      code: "5140008",
      name: "深州",
      districtList: [] },
    {
      code: "5140009",
      name: "安平县",
      districtList: [] },
    {
      code: "5140010",
      name: "故城县",
      districtList: [] },
    {
      code: "5140011",
      name: "景县",
      districtList: [] },
    {
      code: "5140012",
      name: "阜城县",
      districtList: [] },
    {
      code: "5150011",
      name: "临漳县",
      districtList: [] },
    {
      code: "5150012",
      name: "成安县",
      districtList: [] },
    {
      code: "5150013",
      name: "磁县",
      districtList: [] },
    {
      code: "5150014",
      name: "肥乡县",
      districtList: [] },
    {
      code: "5150015",
      name: "邱县",
      districtList: [] },
    {
      code: "5150016",
      name: "鸡泽县",
      districtList: [] },
    {
      code: "5150017",
      name: "广平县",
      districtList: [] },
    {
      code: "5150018",
      name: "馆陶县",
      districtList: [] },
    {
      code: "5150019",
      name: "魏县",
      districtList: [] },
    {
      code: "5150020",
      name: "大名县",
      districtList: [] },
    {
      code: "5150021",
      name: "涉县",
      districtList: [] },
    {
      code: "5150022",
      name: "永年县",
      districtList: [] },
    {
      code: "5150023",
      name: "曲周县",
      districtList: [] },
    {
      code: "5150024",
      name: "武安",
      districtList: [] },
    {
      code: "5160004",
      name: "肃宁县",
      districtList: [] },
    {
      code: "5160005",
      name: "河间",
      districtList: [] },
    {
      code: "5160006",
      name: "献县",
      districtList: [] },
    {
      code: "5160007",
      name: "青县",
      districtList: [] },
    {
      code: "5160011",
      name: "东光县",
      districtList: [] },
    {
      code: "5160012",
      name: "海兴县",
      districtList: [] },
    {
      code: "5160013",
      name: "南皮县",
      districtList: [] },
    {
      code: "5160014",
      name: "吴桥县",
      districtList: [] },
    {
      code: "5160015",
      name: "孟村回族自治县",
      districtList: [] },
    {
      code: "5160016",
      name: "盐山县",
      districtList: [] },
    {
      code: "5160017",
      name: "泊头",
      districtList: [] },
    {
      code: "5160018",
      name: "任丘",
      districtList: [] },
    {
      code: "5160019",
      name: "黄骅",
      districtList: [] }] },

  {
    code: "0600",
    name: "山西省",
    cityList: [{
      code: "0601",
      name: "太原",
      districtList: [{
        code: "0008",
        name: "小店区" },
      {
        code: "0005",
        name: "迎泽区" },
      {
        code: "0007",
        name: "杏花岭区" },
      {
        code: "0006",
        name: "万柏林区" },
      {
        code: "0010",
        name: "尖草坪区" },
      {
        code: "0009",
        name: "晋源区" },
      {
        code: "0016",
        name: "古交市" },
      {
        code: "0013",
        name: "清徐县" },
      {
        code: "0015",
        name: "娄烦县" },
      {
        code: "0014",
        name: "阳曲县" }] },

    {
      code: "0602",
      name: "大同",
      districtList: [{
        code: "0003",
        name: "浑源县" },
      {
        code: "0009",
        name: "灵丘县" },
      {
        code: "0006",
        name: "阳高县" },
      {
        code: "0008",
        name: "广灵县" },
      {
        code: "0007",
        name: "天镇县" },
      {
        code: "0010",
        name: "左云县" },
      {
        code: "0011",
        name: "云州区" },
      {
        code: "0005",
        name: "新荣区" },
      {
        code: "0012",
        name: "云冈区" },
      {
        code: "0013",
        name: "平城区" }] },

    {
      code: "0603",
      name: "临汾",
      districtList: [{
        code: "0003",
        name: "尧都区" },
      {
        code: "0033",
        name: "洪洞县" },
      {
        code: "0042",
        name: "吉县" },
      {
        code: "0034",
        name: "侯马市" },
      {
        code: "0030",
        name: "霍州市" },
      {
        code: "0022",
        name: "翼城县" },
      {
        code: "0023",
        name: "襄汾县" },
      {
        code: "0028",
        name: "曲沃县" },
      {
        code: "0027",
        name: "乡宁县" },
      {
        code: "0032",
        name: "古县" },
      {
        code: "0037",
        name: "隰县" },
      {
        code: "0036",
        name: "蒲县" },
      {
        code: "0024",
        name: "安泽县" },
      {
        code: "0029",
        name: "大宁县" },
      {
        code: "0026",
        name: "汾西县" },
      {
        code: "0031",
        name: "浮山县" },
      {
        code: "0025",
        name: "永和县" }] },

    {
      code: "0605",
      name: "运城",
      districtList: [{
        code: "0005",
        name: "盐湖区" },
      {
        code: "0015",
        name: "河津市" },
      {
        code: "0017",
        name: "永济市" },
      {
        code: "0011",
        name: "垣曲县" },
      {
        code: "0006",
        name: "临猗县" },
      {
        code: "0016",
        name: "闻喜县" },
      {
        code: "0014",
        name: "芮城县" },
      {
        code: "0013",
        name: "平陆县" },
      {
        code: "0012",
        name: "夏县" },
      {
        code: "0009",
        name: "新绛县" },
      {
        code: "0007",
        name: "万荣县" },
      {
        code: "0010",
        name: "绛县" },
      {
        code: "0008",
        name: "稷山县" }] },

    {
      code: "0606",
      name: "忻州",
      districtList: [{
        code: "0017",
        name: "五台县" },
      {
        code: "0001",
        name: "忻府区" },
      {
        code: "0018",
        name: "原平市" },
      {
        code: "0016",
        name: "繁峙县" },
      {
        code: "0019",
        name: "代县" },
      {
        code: "0023",
        name: "宁武县" },
      {
        code: "0022",
        name: "偏关县" },
      {
        code: "0021",
        name: "五寨县" },
      {
        code: "0020",
        name: "神池县" },
      {
        code: "0027",
        name: "定襄县" },
      {
        code: "0025",
        name: "河曲县" },
      {
        code: "0028",
        name: "岢岚县" },
      {
        code: "0024",
        name: "静乐县" },
      {
        code: "0026",
        name: "保德县" }] },

    {
      code: "0607",
      name: "晋中",
      districtList: [{
        code: "0012",
        name: "平遥县" },
      {
        code: "0001",
        name: "榆次区" },
      {
        code: "0014",
        name: "介休市" },
      {
        code: "0018",
        name: "太谷县" },
      {
        code: "0015",
        name: "祁县" },
      {
        code: "0013",
        name: "灵石县" },
      {
        code: "0019",
        name: "寿阳县" },
      {
        code: "0016",
        name: "左权县" },
      {
        code: "0020",
        name: "和顺县" },
      {
        code: "0017",
        name: "昔阳县" },
      {
        code: "0021",
        name: "榆社县" }] },

    {
      code: "0609",
      name: "晋城",
      districtList: [{
        code: "0001",
        name: "城区" },
      {
        code: "0012",
        name: "阳城县" },
      {
        code: "0009",
        name: "高平市" },
      {
        code: "0013",
        name: "陵川县" },
      {
        code: "0010",
        name: "沁水县" },
      {
        code: "0011",
        name: "泽州县" }] },

    {
      code: "0611",
      name: "阳泉",
      districtList: [{
        code: "0005",
        name: "城区" },
      {
        code: "0003",
        name: "盂县" },
      {
        code: "0004",
        name: "郊区" },
      {
        code: "0001",
        name: "平定县" },
      {
        code: "0006",
        name: "矿区" }] },

    {
      code: "0617",
      name: "长治",
      districtList: [{
        code: "0003",
        name: "城区" },
      {
        code: "0017",
        name: "壶关县" },
      {
        code: "0004",
        name: "郊区" },
      {
        code: "0024",
        name: "襄垣县" },
      {
        code: "0022",
        name: "沁源县" },
      {
        code: "0023",
        name: "潞城市" },
      {
        code: "0025",
        name: "屯留县" },
      {
        code: "0021",
        name: "武乡县" },
      {
        code: "0020",
        name: "长子县" },
      {
        code: "0030",
        name: "沁县" },
      {
        code: "0026",
        name: "长治县" },
      {
        code: "0019",
        name: "平顺县" },
      {
        code: "0018",
        name: "黎城县" }] },

    {
      code: "0618",
      name: "朔州",
      districtList: [{
        code: "0002",
        name: "朔城区" },
      {
        code: "0008",
        name: "怀仁县" },
      {
        code: "0005",
        name: "应县" },
      {
        code: "0004",
        name: "山阴县" },
      {
        code: "0009",
        name: "右玉县" },
      {
        code: "0003",
        name: "平鲁区" }] },

    {
      code: "0619",
      name: "吕梁",
      districtList: [{
        code: "0001",
        name: "离石区" },
      {
        code: "0013",
        name: "汾阳市" },
      {
        code: "0006",
        name: "柳林县" },
      {
        code: "0012",
        name: "孝义市" },
      {
        code: "0002",
        name: "文水县" },
      {
        code: "0004",
        name: "兴县" },
      {
        code: "0005",
        name: "临县" },
      {
        code: "0003",
        name: "交城县" },
      {
        code: "0020",
        name: "交口县" },
      {
        code: "0019",
        name: "岚县" },
      {
        code: "0016",
        name: "中阳县" },
      {
        code: "0017",
        name: "方山县" },
      {
        code: "0018",
        name: "石楼县" }] },

    {
      code: "0604",
      name: "五台山",
      districtList: [] },
    {
      code: "6010013",
      name: "清徐县",
      districtList: [] },
    {
      code: "6010016",
      name: "古交",
      districtList: [] },
    {
      code: "6020003",
      name: "浑源县",
      districtList: [] },
    {
      code: "6030022",
      name: "翼城县",
      districtList: [] },
    {
      code: "6030023",
      name: "襄汾县",
      districtList: [] },
    {
      code: "6030024",
      name: "安泽县",
      districtList: [] },
    {
      code: "6030025",
      name: "永和县",
      districtList: [] },
    {
      code: "6030027",
      name: "乡宁县",
      districtList: [] },
    {
      code: "6030028",
      name: "曲沃县",
      districtList: [] },
    {
      code: "6030029",
      name: "大宁县",
      districtList: [] },
    {
      code: "6030030",
      name: "霍州",
      districtList: [] },
    {
      code: "6030031",
      name: "浮山县",
      districtList: [] },
    {
      code: "6030032",
      name: "古县",
      districtList: [] },
    {
      code: "6030033",
      name: "洪洞县",
      districtList: [] },
    {
      code: "6030034",
      name: "侯马",
      districtList: [] },
    {
      code: "6030036",
      name: "蒲县",
      districtList: [] },
    {
      code: "6030037",
      name: "隰县",
      districtList: [] },
    {
      code: "6030042",
      name: "吉县",
      districtList: [] },
    {
      code: "6050006",
      name: "临猗县",
      districtList: [] },
    {
      code: "6050007",
      name: "万荣县",
      districtList: [] },
    {
      code: "6050008",
      name: "稷山县",
      districtList: [] },
    {
      code: "6050009",
      name: "新绛县",
      districtList: [] },
    {
      code: "6050010",
      name: "绛县",
      districtList: [] },
    {
      code: "6050011",
      name: "垣曲县",
      districtList: [] },
    {
      code: "6050012",
      name: "夏县",
      districtList: [] },
    {
      code: "6050013",
      name: "平陆县",
      districtList: [] },
    {
      code: "6050014",
      name: "芮城县",
      districtList: [] },
    {
      code: "6050015",
      name: "河津",
      districtList: [] },
    {
      code: "6050016",
      name: "闻喜县",
      districtList: [] },
    {
      code: "6050017",
      name: "永济",
      districtList: [] },
    {
      code: "6060016",
      name: "繁峙县",
      districtList: [] },
    {
      code: "6060018",
      name: "原平",
      districtList: [] },
    {
      code: "6060019",
      name: "代县",
      districtList: [] },
    {
      code: "6060020",
      name: "神池县",
      districtList: [] },
    {
      code: "6060021",
      name: "五寨县",
      districtList: [] },
    {
      code: "6060022",
      name: "偏关县",
      districtList: [] },
    {
      code: "6060023",
      name: "宁武县",
      districtList: [] },
    {
      code: "6060024",
      name: "静乐县",
      districtList: [] },
    {
      code: "6060025",
      name: "河曲县",
      districtList: [] },
    {
      code: "6060026",
      name: "保德县",
      districtList: [] },
    {
      code: "6060027",
      name: "定襄县",
      districtList: [] },
    {
      code: "6060028",
      name: "岢岚县",
      districtList: [] },
    {
      code: "6070012",
      name: "平遥县",
      districtList: [] },
    {
      code: "6070013",
      name: "灵石县",
      districtList: [] },
    {
      code: "6070014",
      name: "介休",
      districtList: [] },
    {
      code: "6070015",
      name: "祁县",
      districtList: [] },
    {
      code: "6070016",
      name: "左权县",
      districtList: [] },
    {
      code: "6070017",
      name: "昔阳县",
      districtList: [] },
    {
      code: "6070018",
      name: "太谷县",
      districtList: [] },
    {
      code: "6070019",
      name: "寿阳县",
      districtList: [] },
    {
      code: "6070020",
      name: "和顺县",
      districtList: [] },
    {
      code: "6090009",
      name: "高平",
      districtList: [] },
    {
      code: "6090012",
      name: "阳城县",
      districtList: [] },
    {
      code: "6090013",
      name: "陵川县",
      districtList: [] },
    {
      code: "6170017",
      name: "壶关县",
      districtList: [] },
    {
      code: "6170018",
      name: "黎城县",
      districtList: [] },
    {
      code: "6170019",
      name: "平顺县",
      districtList: [] },
    {
      code: "6170020",
      name: "长子县",
      districtList: [] },
    {
      code: "6170021",
      name: "武乡县",
      districtList: [] },
    {
      code: "6170022",
      name: "沁源县",
      districtList: [] },
    {
      code: "6170023",
      name: "潞城",
      districtList: [] },
    {
      code: "6170024",
      name: "襄垣县",
      districtList: [] },
    {
      code: "6170025",
      name: "屯留县",
      districtList: [] },
    {
      code: "6170026",
      name: "长治县",
      districtList: [] },
    {
      code: "6170030",
      name: "沁县",
      districtList: [] },
    {
      code: "6180004",
      name: "山阴县",
      districtList: [] },
    {
      code: "6180005",
      name: "应县",
      districtList: [] },
    {
      code: "6180008",
      name: "怀仁县",
      districtList: [] },
    {
      code: "6180009",
      name: "右玉县",
      districtList: [] },
    {
      code: "6190002",
      name: "文水县",
      districtList: [] },
    {
      code: "6190003",
      name: "交城县",
      districtList: [] },
    {
      code: "6190004",
      name: "兴县",
      districtList: [] },
    {
      code: "6190005",
      name: "临县",
      districtList: [] },
    {
      code: "6190006",
      name: "柳林县",
      districtList: [] },
    {
      code: "6190012",
      name: "孝义",
      districtList: [] },
    {
      code: "6190013",
      name: "汾阳",
      districtList: [] },
    {
      code: "6190017",
      name: "方山县",
      districtList: [] },
    {
      code: "6190018",
      name: "石楼县",
      districtList: [] },
    {
      code: "6190019",
      name: "岚县",
      districtList: [] },
    {
      code: "6190020",
      name: "交口县",
      districtList: [] }] },

  {
    code: "0700",
    name: "内蒙古自治区",
    cityList: [{
      code: "0701",
      name: "呼和浩特",
      districtList: [{
        code: "0001",
        name: "新城区" },
      {
        code: "0005",
        name: "赛罕区" },
      {
        code: "0003",
        name: "回民区" },
      {
        code: "0004",
        name: "玉泉区" },
      {
        code: "0009",
        name: "和林格尔县" },
      {
        code: "0010",
        name: "土默特左旗" },
      {
        code: "0008",
        name: "武川县" },
      {
        code: "0006",
        name: "托克托县" },
      {
        code: "0007",
        name: "清水河县" }] },

    {
      code: "0702",
      name: "包头",
      districtList: [{
        code: "0001",
        name: "昆都仑区" },
      {
        code: "0002",
        name: "青山区" },
      {
        code: "0003",
        name: "东河区" },
      {
        code: "0005",
        name: "九原区" },
      {
        code: "0006",
        name: "土默特右旗" },
      {
        code: "0009",
        name: "固阳县" },
      {
        code: "0010",
        name: "达尔罕茂明安联合旗" },
      {
        code: "0008",
        name: "白云鄂博矿区" },
      {
        code: "0007",
        name: "石拐区" }] },

    {
      code: "0705",
      name: "鄂尔多斯",
      districtList: [{
        code: "0001",
        name: "东胜区" },
      {
        code: "0010",
        name: "伊金霍洛旗" },
      {
        code: "0005",
        name: "达拉特旗" },
      {
        code: "0003",
        name: "准格尔旗" },
      {
        code: "0007",
        name: "鄂托克旗" },
      {
        code: "0011",
        name: "乌审旗" },
      {
        code: "0002",
        name: "杭锦旗" },
      {
        code: "0012",
        name: "鄂托克前旗" }] },

    {
      code: "0706",
      name: "通辽",
      districtList: [{
        code: "0001",
        name: "科尔沁区" },
      {
        code: "0008",
        name: "霍林郭勒市" },
      {
        code: "0002",
        name: "扎鲁特旗" },
      {
        code: "0004",
        name: "科尔沁左翼后旗" },
      {
        code: "0007",
        name: "奈曼旗" },
      {
        code: "0005",
        name: "开鲁县" },
      {
        code: "0003",
        name: "科尔沁左翼中旗" },
      {
        code: "0006",
        name: "库伦旗" }] },

    {
      code: "0707",
      name: "赤峰",
      districtList: [{
        code: "0001",
        name: "红山区" },
      {
        code: "0007",
        name: "松山区" },
      {
        code: "0003",
        name: "克什克腾旗" },
      {
        code: "0011",
        name: "林西县" },
      {
        code: "0008",
        name: "阿鲁科尔沁旗" },
      {
        code: "0006",
        name: "元宝山区" },
      {
        code: "0013",
        name: "敖汉旗" },
      {
        code: "0004",
        name: "宁城县" },
      {
        code: "0009",
        name: "巴林左旗" },
      {
        code: "0005",
        name: "翁牛特旗" },
      {
        code: "0012",
        name: "喀喇沁旗" },
      {
        code: "0010",
        name: "巴林右旗" }] },

    {
      code: "0710",
      name: "巴彦淖尔",
      districtList: [{
        code: "0001",
        name: "临河区" },
      {
        code: "0005",
        name: "乌拉特前旗" },
      {
        code: "0007",
        name: "乌拉特中旗" },
      {
        code: "0008",
        name: "杭锦后旗" },
      {
        code: "0003",
        name: "五原县" },
      {
        code: "0004",
        name: "磴口县" },
      {
        code: "0006",
        name: "乌拉特后旗" }] },

    {
      code: "0712",
      name: "呼伦贝尔",
      districtList: [{
        code: "0001",
        name: "海拉尔区" },
      {
        code: "0002",
        name: "额尔古纳市" },
      {
        code: "0013",
        name: "满洲里市" },
      {
        code: "0004",
        name: "加格达奇" },
      {
        code: "0012",
        name: "扎兰屯市" },
      {
        code: "0003",
        name: "根河市" },
      {
        code: "0008",
        name: "鄂温克族自治旗" },
      {
        code: "0005",
        name: "阿荣旗" },
      {
        code: "0007",
        name: "鄂伦春自治旗" },
      {
        code: "0010",
        name: "新巴尔虎左旗" },
      {
        code: "0009",
        name: "陈巴尔虎旗" },
      {
        code: "0011",
        name: "新巴尔虎右旗" },
      {
        code: "0006",
        name: "莫力达瓦达斡尔族自治旗" }] },

    {
      code: "0713",
      name: "乌兰察布",
      districtList: [{
        code: "0005",
        name: "集宁区" },
      {
        code: "0002",
        name: "兴和县" },
      {
        code: "0007",
        name: "卓资县" },
      {
        code: "0011",
        name: "丰镇市" },
      {
        code: "0006",
        name: "察哈尔右翼前旗" },
      {
        code: "0008",
        name: "化德县" },
      {
        code: "0001",
        name: "商都县" },
      {
        code: "0004",
        name: "四子王旗" },
      {
        code: "0009",
        name: "察哈尔右翼中旗" },
      {
        code: "0010",
        name: "察哈尔右翼后旗" },
      {
        code: "0003",
        name: "凉城县" }] },

    {
      code: "0714",
      name: "乌海",
      districtList: [{
        code: "0001",
        name: "海勃湾区" },
      {
        code: "0004",
        name: "海南区" },
      {
        code: "0003",
        name: "乌达区" }] },

    {
      code: "0716",
      name: "阿拉善盟",
      districtList: [{
        code: "0003",
        name: "额济纳旗" },
      {
        code: "0004",
        name: "阿拉善左旗" },
      {
        code: "0005",
        name: "阿拉善右旗" },
      {
        code: "100759041",
        name: "巴彦浩特" }] },

    {
      code: "0732",
      name: "兴安盟",
      districtList: [{
        code: "0006",
        name: "阿尔山市" },
      {
        code: "0005",
        name: "乌兰浩特市" },
      {
        code: "0004",
        name: "扎赉特旗" },
      {
        code: "0002",
        name: "科尔沁右翼前旗" },
      {
        code: "0003",
        name: "科尔沁右翼中旗" },
      {
        code: "0001",
        name: "突泉县" }] },

    {
      code: "0733",
      name: "锡林郭勒盟",
      districtList: [{
        code: "0002",
        name: "锡林浩特市" },
      {
        code: "0012",
        name: "多伦县" },
      {
        code: "0001",
        name: "二连浩特市" },
      {
        code: "0011",
        name: "正蓝旗" },
      {
        code: "0008",
        name: "太仆寺旗" },
      {
        code: "0006",
        name: "东乌珠穆沁旗" },
      {
        code: "0005",
        name: "苏尼特右旗" },
      {
        code: "0007",
        name: "西乌珠穆沁旗" },
      {
        code: "0010",
        name: "正镶白旗" },
      {
        code: "0004",
        name: "苏尼特左旗" },
      {
        code: "0003",
        name: "阿巴嘎旗" },
      {
        code: "0009",
        name: "镶黄旗" }] },

    {
      code: "7010009",
      name: "和林格尔县",
      districtList: [] },
    {
      code: "7060002",
      name: "扎鲁特旗",
      districtList: [] },
    {
      code: "7070004",
      name: "宁城县",
      districtList: [] },
    {
      code: "7100008",
      name: "杭锦后旗",
      districtList: [] },
    {
      code: "7120002",
      name: "额尔古纳",
      districtList: [] },
    {
      code: "7120003",
      name: "根河",
      districtList: [] },
    {
      code: "7120004",
      name: "牙克石",
      districtList: [] },
    {
      code: "7120012",
      name: "扎兰屯",
      districtList: [] },
    {
      code: "7120013",
      name: "满洲里",
      districtList: [] },
    {
      code: "7160003",
      name: "额济纳旗",
      districtList: [] },
    {
      code: "7320005",
      name: "乌兰浩特",
      districtList: [] },
    {
      code: "7320006",
      name: "阿尔山",
      districtList: [] },
    {
      code: "7330001",
      name: "二连浩特",
      districtList: [] },
    {
      code: "7330002",
      name: "锡林浩特",
      districtList: [] }] },

  {
    code: "0800",
    name: "辽宁省",
    cityList: [{
      code: "0801",
      name: "大连",
      districtList: [{
        code: "0003",
        name: "沙河口区" },
      {
        code: "0011",
        name: "金州区" },
      {
        code: "0009",
        name: "甘井子区" },
      {
        code: "0001",
        name: "中山区" },
      {
        code: "0002",
        name: "西岗区" },
      {
        code: "0014",
        name: "瓦房店市" },
      {
        code: "0010",
        name: "旅顺口区" },
      {
        code: "0016",
        name: "庄河市" },
      {
        code: "0015",
        name: "普兰店区" },
      {
        code: "0018",
        name: "长海县" }] },

    {
      code: "0802",
      name: "沈阳",
      districtList: [{
        code: "0003",
        name: "沈河区" },
      {
        code: "0001",
        name: "和平区" },
      {
        code: "0006",
        name: "铁西区" },
      {
        code: "0005",
        name: "大东区" },
      {
        code: "0004",
        name: "皇姑区" },
      {
        code: "0011",
        name: "沈北新区" },
      {
        code: "0013",
        name: "浑南区" },
      {
        code: "0007",
        name: "于洪区" },
      {
        code: "0010",
        name: "苏家屯区" },
      {
        code: "0012",
        name: "新民市" },
      {
        code: "0016",
        name: "法库县" },
      {
        code: "0015",
        name: "康平县" },
      {
        code: "0014",
        name: "辽中区" }] },

    {
      code: "0803",
      name: "鞍山",
      districtList: [{
        code: "0001",
        name: "铁东区" },
      {
        code: "0007",
        name: "海城市" },
      {
        code: "0002",
        name: "铁西区" },
      {
        code: "0003",
        name: "千山区" },
      {
        code: "0006",
        name: "台安县" },
      {
        code: "0004",
        name: "立山区" },
      {
        code: "0005",
        name: "岫岩满族自治县" }] },

    {
      code: "0804",
      name: "抚顺",
      districtList: [{
        code: "0001",
        name: "新抚区" },
      {
        code: "0005",
        name: "望花区" },
      {
        code: "0002",
        name: "顺城区" },
      {
        code: "100761303",
        name: "李石经济开发区" },
      {
        code: "0007",
        name: "新宾满族自治县" },
      {
        code: "0008",
        name: "清原满族自治县" },
      {
        code: "0003",
        name: "东洲区" },
      {
        code: "0006",
        name: "抚顺县" }] },

    {
      code: "0805",
      name: "本溪",
      districtList: [{
        code: "0007",
        name: "本溪满族自治县" },
      {
        code: "0002",
        name: "明山区" },
      {
        code: "0001",
        name: "平山区" },
      {
        code: "0004",
        name: "桓仁满族自治县" },
      {
        code: "0005",
        name: "溪湖区" },
      {
        code: "0006",
        name: "南芬区" }] },

    {
      code: "0806",
      name: "丹东",
      districtList: [{
        code: "0001",
        name: "振兴区" },
      {
        code: "0006",
        name: "东港市" },
      {
        code: "0007",
        name: "宽甸满族自治县" },
      {
        code: "0005",
        name: "凤城市" },
      {
        code: "0002",
        name: "元宝区" },
      {
        code: "0004",
        name: "振安区" }] },

    {
      code: "0809",
      name: "盘锦",
      districtList: [{
        code: "0001",
        name: "兴隆台区" },
      {
        code: "0002",
        name: "双台子区" },
      {
        code: "0004",
        name: "大洼区" },
      {
        code: "0005",
        name: "盘山县" }] },

    {
      code: "0810",
      name: "锦州",
      districtList: [{
        code: "0004",
        name: "古塔区" },
      {
        code: "0006",
        name: "太和区" },
      {
        code: "0003",
        name: "凌河区" },
      {
        code: "0005",
        name: "北镇市" },
      {
        code: "0009",
        name: "凌海市" },
      {
        code: "0007",
        name: "黑山县" },
      {
        code: "0008",
        name: "义县" }] },

    {
      code: "0813",
      name: "铁岭",
      districtList: [{
        code: "0002",
        name: "银州区" },
      {
        code: "0009",
        name: "开原市" },
      {
        code: "0006",
        name: "昌图县" },
      {
        code: "0007",
        name: "调兵山市" },
      {
        code: "0008",
        name: "清河区" },
      {
        code: "0005",
        name: "西丰县" },
      {
        code: "0004",
        name: "铁岭县" }] },

    {
      code: "0815",
      name: "营口",
      districtList: [{
        code: "0003",
        name: "鲅鱼圈区" },
      {
        code: "0007",
        name: "站前区" },
      {
        code: "0006",
        name: "盖州市" },
      {
        code: "0004",
        name: "大石桥市" },
      {
        code: "0005",
        name: "老边区" },
      {
        code: "0008",
        name: "西市区" },
      {
        code: "100759443",
        name: "熊岳镇" }] },

    {
      code: "0816",
      name: "朝阳",
      districtList: [{
        code: "0002",
        name: "双塔区" },
      {
        code: "0003",
        name: "建平县" },
      {
        code: "0007",
        name: "凌源市" },
      {
        code: "0006",
        name: "北票市" },
      {
        code: "0004",
        name: "龙城区" },
      {
        code: "0005",
        name: "喀喇沁左翼蒙古族自治县" },
      {
        code: "0001",
        name: "朝阳县" }] },

    {
      code: "0818",
      name: "辽阳",
      districtList: [{
        code: "0003",
        name: "白塔区" },
      {
        code: "0004",
        name: "文圣区" },
      {
        code: "0002",
        name: "弓长岭区" },
      {
        code: "0001",
        name: "辽阳县" },
      {
        code: "0007",
        name: "灯塔市" },
      {
        code: "0005",
        name: "宏伟区" },
      {
        code: "0006",
        name: "太子河区" }] },

    {
      code: "0820",
      name: "葫芦岛",
      districtList: [{
        code: "0006",
        name: "兴城市" },
      {
        code: "0003",
        name: "绥中县" },
      {
        code: "0001",
        name: "龙港区" },
      {
        code: "0002",
        name: "连山区" },
      {
        code: "0005",
        name: "建昌县" },
      {
        code: "0004",
        name: "南票区" }] },

    {
      code: "0823",
      name: "阜新",
      districtList: [{
        code: "0001",
        name: "海州区" },
      {
        code: "0003",
        name: "细河区" },
      {
        code: "0008",
        name: "彰武县" },
      {
        code: "0002",
        name: "太平区" },
      {
        code: "0007",
        name: "阜新蒙古族自治县" },
      {
        code: "0004",
        name: "新邱区" },
      {
        code: "0005",
        name: "清河门区" }] },

    {
      code: "0829",
      name: "长兴岛",
      districtList: [] },
    {
      code: "8010014",
      name: "瓦房店",
      districtList: [] },
    {
      code: "8010016",
      name: "庄河",
      districtList: [] },
    {
      code: "8020016",
      name: "法库县",
      districtList: [] },
    {
      code: "8030007",
      name: "海城",
      districtList: [] },
    {
      code: "8060005",
      name: "凤城",
      districtList: [] },
    {
      code: "8060006",
      name: "东港",
      districtList: [] },
    {
      code: "8130009",
      name: "开原",
      districtList: [] },
    {
      code: "8150004",
      name: "大石桥",
      districtList: [] },
    {
      code: "8150006",
      name: "盖州",
      districtList: [] },
    {
      code: "8200003",
      name: "绥中县",
      districtList: [] },
    {
      code: "8200006",
      name: "兴城",
      districtList: [] }] },

  {
    code: "0900",
    name: "吉林省",
    cityList: [{
      code: "0901",
      name: "长春",
      districtList: [{
        code: "0001",
        name: "朝阳区" },
      {
        code: "0005",
        name: "南关区" },
      {
        code: "0003",
        name: "宽城区" },
      {
        code: "0004",
        name: "二道区" },
      {
        code: "0006",
        name: "绿园区" },
      {
        code: "0008",
        name: "双阳区" },
      {
        code: "0015",
        name: "农安县" },
      {
        code: "0018",
        name: "榆树市" },
      {
        code: "0016",
        name: "德惠市" },
      {
        code: "0017",
        name: "九台区" }] },

    {
      code: "0902",
      name: "吉林",
      districtList: [{
        code: "0002",
        name: "昌邑区" },
      {
        code: "0003",
        name: "船营区" },
      {
        code: "0004",
        name: "丰满区" },
      {
        code: "0001",
        name: "龙潭区" },
      {
        code: "0006",
        name: "桦甸市" },
      {
        code: "0008",
        name: "蛟河市" },
      {
        code: "0009",
        name: "磐石市" },
      {
        code: "0007",
        name: "舒兰市" },
      {
        code: "0005",
        name: "永吉县" }] },

    {
      code: "0903",
      name: "通化",
      districtList: [{
        code: "0002",
        name: "东昌区" },
      {
        code: "0008",
        name: "集安市" },
      {
        code: "0009",
        name: "梅河口市" },
      {
        code: "0005",
        name: "辉南县" },
      {
        code: "0007",
        name: "柳河县" },
      {
        code: "0003",
        name: "二道江区" },
      {
        code: "0006",
        name: "通化县" }] },

    {
      code: "0905",
      name: "延边朝鲜族自治州",
      districtList: [{
        code: "0002",
        name: "安图县" },
      {
        code: "0001",
        name: "延吉市" },
      {
        code: "0003",
        name: "敦化市" },
      {
        code: "0005",
        name: "珲春市" },
      {
        code: "0004",
        name: "图们市" },
      {
        code: "0007",
        name: "和龙市" },
      {
        code: "0006",
        name: "龙井市" },
      {
        code: "0008",
        name: "汪清县" }] },

    {
      code: "0910",
      name: "松原",
      districtList: [{
        code: "0002",
        name: "宁江区" },
      {
        code: "0005",
        name: "前郭尔罗斯蒙古族自治县" },
      {
        code: "0008",
        name: "扶余县" },
      {
        code: "0006",
        name: "长岭县" },
      {
        code: "0007",
        name: "乾安县" }] },

    {
      code: "0913",
      name: "辽源",
      districtList: [{
        code: "0002",
        name: "龙山区" },
      {
        code: "0003",
        name: "东丰县" },
      {
        code: "0005",
        name: "西安区" },
      {
        code: "0004",
        name: "东辽县" }] },

    {
      code: "0918",
      name: "白山",
      districtList: [{
        code: "0008",
        name: "抚松县" },
      {
        code: "0003",
        name: "浑江区" },
      {
        code: "0004",
        name: "江源区" },
      {
        code: "0007",
        name: "临江市" },
      {
        code: "0005",
        name: "靖宇县" },
      {
        code: "0006",
        name: "长白朝鲜族自治县" }] },

    {
      code: "0919",
      name: "四平",
      districtList: [{
        code: "0001",
        name: "铁西区" },
      {
        code: "0002",
        name: "铁东区" },
      {
        code: "0008",
        name: "公主岭市" },
      {
        code: "0007",
        name: "双辽市" },
      {
        code: "0006",
        name: "伊通满族自治县" },
      {
        code: "0005",
        name: "梨树县" }] },

    {
      code: "0920",
      name: "白城",
      districtList: [{
        code: "0001",
        name: "洮北区" },
      {
        code: "0005",
        name: "洮南市" },
      {
        code: "0004",
        name: "通榆县" },
      {
        code: "0006",
        name: "大安市" },
      {
        code: "0003",
        name: "镇赉县" }] },

    {
      code: "0907",
      name: "长白山池北",
      districtList: [] },
    {
      code: "0909",
      name: "长白山池西",
      districtList: [] },
    {
      code: "0912",
      name: "长白山池南",
      districtList: [] },
    {
      code: "9010015",
      name: "农安县",
      districtList: [] },
    {
      code: "9010016",
      name: "德惠",
      districtList: [] },
    {
      code: "9010017",
      name: "九台",
      districtList: [] },
    {
      code: "9010018",
      name: "榆树",
      districtList: [] },
    {
      code: "9020008",
      name: "蛟河",
      districtList: [] },
    {
      code: "9020009",
      name: "磐石",
      districtList: [] },
    {
      code: "9030005",
      name: "辉南县",
      districtList: [] },
    {
      code: "9030007",
      name: "柳河县",
      districtList: [] },
    {
      code: "9030008",
      name: "集安",
      districtList: [] },
    {
      code: "9030009",
      name: "梅河口",
      districtList: [] },
    {
      code: "9050001",
      name: "延吉",
      districtList: [] },
    {
      code: "9050002",
      name: "安图县",
      districtList: [] },
    {
      code: "9050003",
      name: "敦化",
      districtList: [] },
    {
      code: "9050004",
      name: "图们",
      districtList: [] },
    {
      code: "9050005",
      name: "珲春",
      districtList: [] },
    {
      code: "9050006",
      name: "龙井",
      districtList: [] },
    {
      code: "9050007",
      name: "和龙",
      districtList: [] },
    {
      code: "9100007",
      name: "乾安县",
      districtList: [] },
    {
      code: "9100008",
      name: "扶余县",
      districtList: [] },
    {
      code: "9180007",
      name: "临江",
      districtList: [] },
    {
      code: "9190007",
      name: "双辽",
      districtList: [] },
    {
      code: "9190008",
      name: "公主岭",
      districtList: [] }] },

  {
    code: "1000",
    name: "黑龙江省",
    cityList: [{
      code: "1001",
      name: "哈尔滨",
      districtList: [{
        code: "0003",
        name: "南岗区" },
      {
        code: "0001",
        name: "道里区" },
      {
        code: "0004",
        name: "香坊区" },
      {
        code: "0005",
        name: "道外区" },
      {
        code: "0017",
        name: "五常市" },
      {
        code: "0018",
        name: "尚志市" },
      {
        code: "0007",
        name: "呼兰区" },
      {
        code: "0006",
        name: "松北区" },
      {
        code: "0008",
        name: "阿城区" },
      {
        code: "0002",
        name: "平房区" },
      {
        code: "0012",
        name: "宾县" },
      {
        code: "0016",
        name: "双城区" },
      {
        code: "0014",
        name: "通河县" },
      {
        code: "0015",
        name: "延寿县" },
      {
        code: "0013",
        name: "巴彦县" },
      {
        code: "0011",
        name: "方正县" },
      {
        code: "0010",
        name: "依兰县" },
      {
        code: "0019",
        name: "木兰县" }] },

    {
      code: "1002",
      name: "牡丹江",
      districtList: [{
        code: "0005",
        name: "海林市" },
      {
        code: "0002",
        name: "东安区" },
      {
        code: "0003",
        name: "爱民区" },
      {
        code: "0011",
        name: "绥芬河市" },
      {
        code: "0001",
        name: "西安区" },
      {
        code: "0008",
        name: "东宁市" },
      {
        code: "0007",
        name: "宁安市" },
      {
        code: "0010",
        name: "穆棱市" },
      {
        code: "0004",
        name: "阳明区" },
      {
        code: "0009",
        name: "林口县" }] },

    {
      code: "1004",
      name: "大庆",
      districtList: [{
        code: "0003",
        name: "萨尔图区" },
      {
        code: "0004",
        name: "让胡路区" },
      {
        code: "0005",
        name: "龙凤区" },
      {
        code: "0011",
        name: "林甸县" },
      {
        code: "0007",
        name: "大同区" },
      {
        code: "0008",
        name: "杜尔伯特蒙古族自治县" },
      {
        code: "0010",
        name: "肇源县" },
      {
        code: "0009",
        name: "肇州县" },
      {
        code: "0006",
        name: "红岗区" }] },

    {
      code: "1005",
      name: "齐齐哈尔",
      districtList: [{
        code: "0001",
        name: "龙沙区" },
      {
        code: "0003",
        name: "建华区" },
      {
        code: "0002",
        name: "铁锋区" },
      {
        code: "0018",
        name: "讷河市" },
      {
        code: "0005",
        name: "富拉尔基区" },
      {
        code: "0010",
        name: "龙江县" },
      {
        code: "0013",
        name: "甘南县" },
      {
        code: "0014",
        name: "富裕县" },
      {
        code: "0017",
        name: "拜泉县" },
      {
        code: "0011",
        name: "依安县" },
      {
        code: "0012",
        name: "泰来县" },
      {
        code: "0015",
        name: "克山县" },
      {
        code: "0016",
        name: "克东县" },
      {
        code: "0006",
        name: "昂昂溪区" },
      {
        code: "0008",
        name: "碾子山区" },
      {
        code: "0009",
        name: "梅里斯达斡尔族区" }] },

    {
      code: "1009",
      name: "鹤岗",
      districtList: [{
        code: "0001",
        name: "工农区" },
      {
        code: "0005",
        name: "南山区" },
      {
        code: "0006",
        name: "向阳区" },
      {
        code: "0007",
        name: "萝北县" },
      {
        code: "0003",
        name: "东山区" },
      {
        code: "0008",
        name: "绥滨县" },
      {
        code: "0004",
        name: "兴安区" }] },

    {
      code: "1010",
      name: "绥化",
      districtList: [{
        code: "0002",
        name: "北林区" },
      {
        code: "0010",
        name: "海伦市" },
      {
        code: "0008",
        name: "绥棱县" },
      {
        code: "0011",
        name: "肇东市" },
      {
        code: "0009",
        name: "安达市" },
      {
        code: "0003",
        name: "望奎县" },
      {
        code: "0006",
        name: "庆安县" },
      {
        code: "0004",
        name: "兰西县" },
      {
        code: "0005",
        name: "青冈县" },
      {
        code: "0007",
        name: "明水县" }] },

    {
      code: "1012",
      name: "佳木斯",
      districtList: [{
        code: "0002",
        name: "前进区" },
      {
        code: "0001",
        name: "向阳区" },
      {
        code: "0010",
        name: "富锦市" },
      {
        code: "0003",
        name: "桦南县" },
      {
        code: "0008",
        name: "抚远市" },
      {
        code: "0007",
        name: "汤原县" },
      {
        code: "0009",
        name: "同江市" },
      {
        code: "0006",
        name: "桦川县" },
      {
        code: "0005",
        name: "郊区" },
      {
        code: "0004",
        name: "东风区" }] },

    {
      code: "1014",
      name: "黑河",
      districtList: [{
        code: "0002",
        name: "五大连池市" },
      {
        code: "0004",
        name: "爱辉区" },
      {
        code: "0008",
        name: "北安市" },
      {
        code: "0005",
        name: "嫩江县" },
      {
        code: "0007",
        name: "孙吴县" },
      {
        code: "0006",
        name: "逊克县" }] },

    {
      code: "1015",
      name: "鸡西",
      districtList: [{
        code: "0001",
        name: "鸡冠区" },
      {
        code: "0009",
        name: "密山市" },
      {
        code: "0008",
        name: "虎林市" },
      {
        code: "0007",
        name: "鸡东县" },
      {
        code: "0003",
        name: "滴道区" },
      {
        code: "0005",
        name: "城子河区" },
      {
        code: "0002",
        name: "恒山区" }] },

    {
      code: "1019",
      name: "伊春",
      districtList: [{
        code: "0001",
        name: "伊春区" },
      {
        code: "0017",
        name: "铁力市" },
      {
        code: "0002",
        name: "南岔区" },
      {
        code: "0016",
        name: "嘉荫县" },
      {
        code: "0004",
        name: "西林区" },
      {
        code: "0012",
        name: "带岭区" },
      {
        code: "0009",
        name: "五营区" },
      {
        code: "0011",
        name: "汤旺河区" },
      {
        code: "0007",
        name: "美溪区" },
      {
        code: "0005",
        name: "翠峦区" },
      {
        code: "0003",
        name: "友好区" },
      {
        code: "0006",
        name: "新青区" },
      {
        code: "0008",
        name: "金山屯区" },
      {
        code: "0013",
        name: "乌伊岭区" },
      {
        code: "0015",
        name: "上甘岭区" },
      {
        code: "0014",
        name: "红星区" },
      {
        code: "0010",
        name: "乌马河区" }] },

    {
      code: "1020",
      name: "双鸭山",
      districtList: [{
        code: "0001",
        name: "尖山区" },
      {
        code: "0005",
        name: "集贤县" },
      {
        code: "0007",
        name: "宝清县" },
      {
        code: "0006",
        name: "友谊县" },
      {
        code: "0008",
        name: "饶河县" },
      {
        code: "0003",
        name: "四方台区" },
      {
        code: "0004",
        name: "宝山区" },
      {
        code: "0002",
        name: "岭东区" }] },

    {
      code: "1025",
      name: "七台河",
      districtList: [{
        code: "0003",
        name: "桃山区" },
      {
        code: "0005",
        name: "勃利县" },
      {
        code: "0004",
        name: "茄子河区" },
      {
        code: "0002",
        name: "新兴区" }] },

    {
      code: "1028",
      name: "大兴安岭地区",
      districtList: [{
        code: "0001",
        name: "漠河县" },
      {
        code: "0003",
        name: "塔河县" },
      {
        code: "0002",
        name: "呼玛县" },
      {
        code: "0004",
        name: "加格达奇" },
      {
        code: "0007",
        name: "呼中区" }] },

    {
      code: "1003",
      name: "亚布力",
      districtList: [] },
    {
      code: "1031",
      name: "镜泊湖",
      districtList: [] },
    {
      code: "10010017",
      name: "五常",
      districtList: [] },
    {
      code: "10010018",
      name: "尚志",
      districtList: [] },
    {
      code: "10020005",
      name: "海林",
      districtList: [] },
    {
      code: "10020008",
      name: "东宁县",
      districtList: [] },
    {
      code: "10020011",
      name: "绥芬河",
      districtList: [] },
    {
      code: "10090008",
      name: "绥滨县",
      districtList: [] },
    {
      code: "10100010",
      name: "海伦",
      districtList: [] },
    {
      code: "10100011",
      name: "肇东",
      districtList: [] },
    {
      code: "10140002",
      name: "五大连池",
      districtList: [] },
    {
      code: "10150009",
      name: "密山",
      districtList: [] },
    {
      code: "10280001",
      name: "漠河县",
      districtList: [] }] },

  {
    code: "1100",
    name: "江苏省",
    cityList: [{
      code: "1101",
      name: "南京",
      districtList: [{
        code: "0009",
        name: "浦口区" },
      {
        code: "0008",
        name: "江宁区" },
      {
        code: "0001",
        name: "鼓楼区" },
      {
        code: "0005",
        name: "栖霞区" },
      {
        code: "0007",
        name: "秦淮区" },
      {
        code: "0002",
        name: "玄武区" },
      {
        code: "0004",
        name: "建邺区" },
      {
        code: "0011",
        name: "雨花台区" },
      {
        code: "0010",
        name: "六合区" },
      {
        code: "0012",
        name: "高淳区" },
      {
        code: "0013",
        name: "溧水区" }] },

    {
      code: "1102",
      name: "苏州",
      districtList: [{
        code: "0001",
        name: "吴中区" },
      {
        code: "100762562",
        name: "苏州工业园区" },
      {
        code: "0010",
        name: "姑苏区" },
      {
        code: "0012",
        name: "吴江区" },
      {
        code: "0017",
        name: "昆山市" },
      {
        code: "0006",
        name: "相城区" },
      {
        code: "0016",
        name: "虎丘区" },
      {
        code: "0015",
        name: "张家港市" },
      {
        code: "0013",
        name: "常熟市" },
      {
        code: "0014",
        name: "太仓市" }] },

    {
      code: "1103",
      name: "常州",
      districtList: [{
        code: "0001",
        name: "武进区" },
      {
        code: "0004",
        name: "新北区" },
      {
        code: "0003",
        name: "天宁区" },
      {
        code: "0002",
        name: "钟楼区" },
      {
        code: "0007",
        name: "金坛区" }] },

    {
      code: "1104",
      name: "扬州",
      districtList: [{
        code: "0001",
        name: "邗江区" },
      {
        code: "100376734",
        name: "邗江" },
      {
        code: "0003",
        name: "广陵区" },
      {
        code: "0007",
        name: "高邮市" },
      {
        code: "0006",
        name: "江都区" },
      {
        code: "0008",
        name: "仪征市" },
      {
        code: "0009",
        name: "宝应县" }] },

    {
      code: "1105",
      name: "无锡",
      districtList: [{
        code: "0013",
        name: "滨湖区" },
      {
        code: "0004",
        name: "锡山区" },
      {
        code: "0018",
        name: "宜兴市" },
      {
        code: "0017",
        name: "江阴市" },
      {
        code: "0014",
        name: "惠山区" },
      {
        code: "0019",
        name: "梁溪区" }] },

    {
      code: "1106",
      name: "徐州",
      districtList: [{
        code: "0005",
        name: "云龙区" },
      {
        code: "0003",
        name: "泉山区" },
      {
        code: "0019",
        name: "邳州市" },
      {
        code: "0018",
        name: "沛县" },
      {
        code: "0004",
        name: "鼓楼区" },
      {
        code: "0020",
        name: "睢宁县" },
      {
        code: "0021",
        name: "新沂市" },
      {
        code: "0017",
        name: "丰县" },
      {
        code: "0009",
        name: "铜山区" },
      {
        code: "0011",
        name: "贾汪区" }] },

    {
      code: "1107",
      name: "南通",
      districtList: [{
        code: "0004",
        name: "崇川区" },
      {
        code: "0005",
        name: "通州区" },
      {
        code: "0013",
        name: "如皋市" },
      {
        code: "0011",
        name: "如东县" },
      {
        code: "0010",
        name: "启东市" },
      {
        code: "0014",
        name: "海门市" },
      {
        code: "0012",
        name: "海安县" },
      {
        code: "0003",
        name: "港闸区" }] },

    {
      code: "1108",
      name: "镇江",
      districtList: [{
        code: "0007",
        name: "京口区" },
      {
        code: "0010",
        name: "丹阳市" },
      {
        code: "0008",
        name: "润州区" },
      {
        code: "0011",
        name: "句容市" },
      {
        code: "0012",
        name: "扬中市" },
      {
        code: "0009",
        name: "丹徒区" }] },

    {
      code: "1110",
      name: "连云港",
      districtList: [{
        code: "0004",
        name: "连云区" },
      {
        code: "0008",
        name: "赣榆区" },
      {
        code: "0005",
        name: "东海县" },
      {
        code: "0007",
        name: "灌云县" },
      {
        code: "0010",
        name: "灌南县" },
      {
        code: "0009",
        name: "海州区" },
      {
        code: "100757057",
        name: "连岛" }] },

    {
      code: "1115",
      name: "泰州",
      districtList: [{
        code: "0001",
        name: "海陵区" },
      {
        code: "0009",
        name: "兴化市" },
      {
        code: "0008",
        name: "泰兴市" },
      {
        code: "0007",
        name: "靖江市" },
      {
        code: "0006",
        name: "姜堰市" },
      {
        code: "0002",
        name: "高港区" },
      {
        code: "100759512",
        name: "口岸镇" }] },

    {
      code: "1116",
      name: "盐城",
      districtList: [{
        code: "0001",
        name: "亭湖区" },
      {
        code: "0003",
        name: "大丰区" },
      {
        code: "0002",
        name: "盐都区" },
      {
        code: "0005",
        name: "阜宁县" },
      {
        code: "0010",
        name: "射阳县" },
      {
        code: "0007",
        name: "滨海县" },
      {
        code: "0009",
        name: "建湖县" },
      {
        code: "0008",
        name: "东台市" },
      {
        code: "0006",
        name: "响水县" }] },

    {
      code: "1123",
      name: "淮安",
      districtList: [{
        code: "0007",
        name: "淮阴区" },
      {
        code: "0006",
        name: "盱眙县" },
      {
        code: "0005",
        name: "洪泽区" },
      {
        code: "0010",
        name: "涟水县" },
      {
        code: "0008",
        name: "金湖县" },
      {
        code: "0009",
        name: "淮安区" }] },

    {
      code: "1131",
      name: "宿迁",
      districtList: [{
        code: "0002",
        name: "宿城区" },
      {
        code: "0006",
        name: "沭阳县" },
      {
        code: "0007",
        name: "泗阳县" },
      {
        code: "0008",
        name: "泗洪县" },
      {
        code: "0001",
        name: "宿豫区" }] },

    {
      code: "1121",
      name: "同里",
      districtList: [] },
    {
      code: "1122",
      name: "溧阳",
      districtList: [] },
    {
      code: "1126",
      name: "周庄",
      districtList: [] },
    {
      code: "11020012",
      name: "吴江区",
      districtList: [] },
    {
      code: "11020013",
      name: "常熟",
      districtList: [] },
    {
      code: "11020014",
      name: "太仓",
      districtList: [] },
    {
      code: "11020015",
      name: "张家港",
      districtList: [] },
    {
      code: "11020017",
      name: "昆山",
      districtList: [] },
    {
      code: "11030007",
      name: "金坛",
      districtList: [] },
    {
      code: "11040007",
      name: "高邮",
      districtList: [] },
    {
      code: "11040008",
      name: "仪征",
      districtList: [] },
    {
      code: "11040009",
      name: "宝应县",
      districtList: [] },
    {
      code: "11050017",
      name: "江阴",
      districtList: [] },
    {
      code: "11050018",
      name: "宜兴",
      districtList: [] },
    {
      code: "11060017",
      name: "丰县",
      districtList: [] },
    {
      code: "11060018",
      name: "沛县",
      districtList: [] },
    {
      code: "11060019",
      name: "邳州",
      districtList: [] },
    {
      code: "11060020",
      name: "睢宁县",
      districtList: [] },
    {
      code: "11060021",
      name: "新沂",
      districtList: [] },
    {
      code: "11070010",
      name: "启东",
      districtList: [] },
    {
      code: "11070011",
      name: "如东县",
      districtList: [] },
    {
      code: "11070012",
      name: "海安县",
      districtList: [] },
    {
      code: "11070013",
      name: "如皋",
      districtList: [] },
    {
      code: "11070014",
      name: "海门",
      districtList: [] },
    {
      code: "11080010",
      name: "丹阳",
      districtList: [] },
    {
      code: "11080011",
      name: "句容",
      districtList: [] },
    {
      code: "11080012",
      name: "扬中",
      districtList: [] },
    {
      code: "11100005",
      name: "东海县",
      districtList: [] },
    {
      code: "11100007",
      name: "灌云县",
      districtList: [] },
    {
      code: "11100008",
      name: "赣榆县",
      districtList: [] },
    {
      code: "11100010",
      name: "灌南县",
      districtList: [] },
    {
      code: "11150006",
      name: "姜堰",
      districtList: [] },
    {
      code: "11150007",
      name: "靖江",
      districtList: [] },
    {
      code: "11150008",
      name: "泰兴",
      districtList: [] },
    {
      code: "11150009",
      name: "兴化",
      districtList: [] },
    {
      code: "11160003",
      name: "大丰",
      districtList: [] },
    {
      code: "11160005",
      name: "阜宁县",
      districtList: [] },
    {
      code: "11160006",
      name: "响水县",
      districtList: [] },
    {
      code: "11160007",
      name: "滨海县",
      districtList: [] },
    {
      code: "11160008",
      name: "东台",
      districtList: [] },
    {
      code: "11160009",
      name: "建湖县",
      districtList: [] },
    {
      code: "11160010",
      name: "射阳县",
      districtList: [] },
    {
      code: "11230005",
      name: "洪泽县",
      districtList: [] },
    {
      code: "11230006",
      name: "盱眙县",
      districtList: [] },
    {
      code: "11230008",
      name: "金湖县",
      districtList: [] },
    {
      code: "11230010",
      name: "涟水县",
      districtList: [] },
    {
      code: "11310006",
      name: "沭阳县",
      districtList: [] },
    {
      code: "11310007",
      name: "泗阳县",
      districtList: [] },
    {
      code: "11310008",
      name: "泗洪县",
      districtList: [] }] },

  {
    code: "1200",
    name: "浙江省",
    cityList: [{
      code: "1201",
      name: "杭州",
      districtList: [{
        code: "0003",
        name: "西湖区" },
      {
        code: "0005",
        name: "江干区" },
      {
        code: "0014",
        name: "临安区" },
      {
        code: "0009",
        name: "余杭区" },
      {
        code: "0008",
        name: "萧山区" },
      {
        code: "0002",
        name: "下城区" },
      {
        code: "0001",
        name: "上城区" },
      {
        code: "0004",
        name: "拱墅区" },
      {
        code: "0010",
        name: "淳安县" },
      {
        code: "0011",
        name: "富阳区" },
      {
        code: "0006",
        name: "滨江区" },
      {
        code: "0013",
        name: "桐庐县" },
      {
        code: "0012",
        name: "建德市" }] },

    {
      code: "1202",
      name: "宁波",
      districtList: [{
        code: "0008",
        name: "鄞州区" },
      {
        code: "0018",
        name: "象山县" },
      {
        code: "0007",
        name: "海曙区" },
      {
        code: "0010",
        name: "北仑区" },
      {
        code: "0019",
        name: "宁海县" },
      {
        code: "0016",
        name: "慈溪市" },
      {
        code: "0009",
        name: "镇海区" },
      {
        code: "0015",
        name: "余姚市" },
      {
        code: "0017",
        name: "奉化区" },
      {
        code: "0005",
        name: "江北区" }] },

    {
      code: "1203",
      name: "温州",
      districtList: [{
        code: "0001",
        name: "鹿城区" },
      {
        code: "0006",
        name: "苍南县" },
      {
        code: "0010",
        name: "乐清市" },
      {
        code: "0002",
        name: "瓯海区" },
      {
        code: "0008",
        name: "永嘉县" },
      {
        code: "0005",
        name: "平阳县" },
      {
        code: "0003",
        name: "龙湾区" },
      {
        code: "0012",
        name: "瑞安市" },
      {
        code: "0007",
        name: "洞头区" },
      {
        code: "0009",
        name: "文成县" },
      {
        code: "0013",
        name: "泰顺县" }] },

    {
      code: "1204",
      name: "金华",
      districtList: [{
        code: "0003",
        name: "婺城区" },
      {
        code: "0006",
        name: "义乌市" },
      {
        code: "0007",
        name: "东阳市" },
      {
        code: "0005",
        name: "永康市" },
      {
        code: "0009",
        name: "武义县" },
      {
        code: "0010",
        name: "浦江县" },
      {
        code: "0008",
        name: "兰溪市" },
      {
        code: "0011",
        name: "磐安县" },
      {
        code: "0004",
        name: "金东区" }] },

    {
      code: "1205",
      name: "绍兴",
      districtList: [{
        code: "0008",
        name: "上虞区" },
      {
        code: "0007",
        name: "越城区" },
      {
        code: "0006",
        name: "柯桥区" },
      {
        code: "0012",
        name: "诸暨市" },
      {
        code: "0011",
        name: "嵊州市" },
      {
        code: "0010",
        name: "新昌县" }] },

    {
      code: "1209",
      name: "嘉兴",
      districtList: [{
        code: "0006",
        name: "嘉善县" },
      {
        code: "0005",
        name: "桐乡市" },
      {
        code: "0001",
        name: "南湖区" },
      {
        code: "0002",
        name: "海宁市" },
      {
        code: "0003",
        name: "平湖市" },
      {
        code: "0004",
        name: "秀洲区" },
      {
        code: "0007",
        name: "海盐县" }] },

    {
      code: "1224",
      name: "台州",
      districtList: [{
        code: "0002",
        name: "椒江区" },
      {
        code: "0004",
        name: "临海市" },
      {
        code: "0001",
        name: "路桥区" },
      {
        code: "0008",
        name: "温岭市" },
      {
        code: "0005",
        name: "黄岩区" },
      {
        code: "0003",
        name: "天台县" },
      {
        code: "0009",
        name: "仙居县" },
      {
        code: "0010",
        name: "三门县" },
      {
        code: "0007",
        name: "玉环市" }] },

    {
      code: "1230",
      name: "丽水",
      districtList: [{
        code: "0003",
        name: "莲都区" },
      {
        code: "0002",
        name: "龙泉市" },
      {
        code: "0008",
        name: "缙云县" },
      {
        code: "0006",
        name: "遂昌县" },
      {
        code: "0005",
        name: "云和县" },
      {
        code: "0010",
        name: "景宁畲族自治县" },
      {
        code: "0001",
        name: "青田县" },
      {
        code: "0009",
        name: "松阳县" },
      {
        code: "0007",
        name: "庆元县" }] },

    {
      code: "1235",
      name: "衢州",
      districtList: [{
        code: "0003",
        name: "柯城区" },
      {
        code: "0005",
        name: "江山市" },
      {
        code: "0007",
        name: "龙游县" },
      {
        code: "0001",
        name: "开化县" },
      {
        code: "0006",
        name: "常山县" },
      {
        code: "0004",
        name: "衢江区" }] },

    {
      code: "1239",
      name: "湖州",
      districtList: [{
        code: "0004",
        name: "长兴县" },
      {
        code: "0007",
        name: "安吉县" },
      {
        code: "0008",
        name: "德清县" },
      {
        code: "0003",
        name: "吴兴区" },
      {
        code: "0001",
        name: "南浔区" }] },

    {
      code: "1245",
      name: "舟山",
      districtList: [{
        code: "0013",
        name: "普陀区" },
      {
        code: "0008",
        name: "嵊泗县" },
      {
        code: "0005",
        name: "定海区" },
      {
        code: "0012",
        name: "岱山县" }] },

    {
      code: "1233",
      name: "千岛湖风景区",
      districtList: [] },
    {
      code: "1261",
      name: "楠溪江",
      districtList: [] },
    {
      code: "1266",
      name: "雁荡山",
      districtList: [] },
    {
      code: "1270",
      name: "西塘古镇",
      districtList: [] },
    {
      code: "1288",
      name: "横店影视城",
      districtList: [] },
    {
      code: "1293",
      name: "乌镇",
      districtList: [] },
    {
      code: "12010011",
      name: "富阳",
      districtList: [] },
    {
      code: "12010012",
      name: "建德",
      districtList: [] },
    {
      code: "12010013",
      name: "桐庐县",
      districtList: [] },
    {
      code: "12010014",
      name: "临安",
      districtList: [] },
    {
      code: "12020015",
      name: "余姚",
      districtList: [] },
    {
      code: "12020016",
      name: "慈溪",
      districtList: [] },
    {
      code: "12020017",
      name: "奉化",
      districtList: [] },
    {
      code: "12020018",
      name: "象山县",
      districtList: [] },
    {
      code: "12020019",
      name: "宁海县",
      districtList: [] },
    {
      code: "12030005",
      name: "平阳县",
      districtList: [] },
    {
      code: "12030006",
      name: "苍南县",
      districtList: [] },
    {
      code: "12030007",
      name: "洞头县",
      districtList: [] },
    {
      code: "12030008",
      name: "永嘉县",
      districtList: [] },
    {
      code: "12030009",
      name: "文成县",
      districtList: [] },
    {
      code: "12030010",
      name: "乐清",
      districtList: [] },
    {
      code: "12030012",
      name: "瑞安",
      districtList: [] },
    {
      code: "12030013",
      name: "泰顺县",
      districtList: [] },
    {
      code: "12040005",
      name: "永康",
      districtList: [] },
    {
      code: "12040006",
      name: "义乌",
      districtList: [] },
    {
      code: "12040007",
      name: "东阳",
      districtList: [] },
    {
      code: "12040008",
      name: "兰溪",
      districtList: [] },
    {
      code: "12040009",
      name: "武义县",
      districtList: [] },
    {
      code: "12040010",
      name: "浦江县",
      districtList: [] },
    {
      code: "12040011",
      name: "磐安县",
      districtList: [] },
    {
      code: "12050008",
      name: "上虞",
      districtList: [] },
    {
      code: "12050010",
      name: "新昌县",
      districtList: [] },
    {
      code: "12050011",
      name: "嵊州",
      districtList: [] },
    {
      code: "12050012",
      name: "诸暨",
      districtList: [] },
    {
      code: "12090002",
      name: "海宁",
      districtList: [] },
    {
      code: "12090003",
      name: "平湖",
      districtList: [] },
    {
      code: "12090005",
      name: "桐乡",
      districtList: [] },
    {
      code: "12090006",
      name: "嘉善县",
      districtList: [] },
    {
      code: "12090007",
      name: "海盐县",
      districtList: [] },
    {
      code: "12240003",
      name: "天台县",
      districtList: [] },
    {
      code: "12240004",
      name: "临海",
      districtList: [] },
    {
      code: "12240007",
      name: "玉环县",
      districtList: [] },
    {
      code: "12240008",
      name: "温岭",
      districtList: [] },
    {
      code: "12240009",
      name: "仙居县",
      districtList: [] },
    {
      code: "12240010",
      name: "三门县",
      districtList: [] },
    {
      code: "12300001",
      name: "青田县",
      districtList: [] },
    {
      code: "12300002",
      name: "龙泉",
      districtList: [] },
    {
      code: "12300005",
      name: "云和县",
      districtList: [] },
    {
      code: "12300006",
      name: "遂昌县",
      districtList: [] },
    {
      code: "12300007",
      name: "庆元县",
      districtList: [] },
    {
      code: "12300008",
      name: "缙云县",
      districtList: [] },
    {
      code: "12300009",
      name: "松阳县",
      districtList: [] },
    {
      code: "12300010",
      name: "景宁畲族自治县",
      districtList: [] },
    {
      code: "12350001",
      name: "开化县",
      districtList: [] },
    {
      code: "12350005",
      name: "江山",
      districtList: [] },
    {
      code: "12350006",
      name: "常山县",
      districtList: [] },
    {
      code: "12350007",
      name: "龙游县",
      districtList: [] },
    {
      code: "12390001",
      name: "南浔区",
      districtList: [] },
    {
      code: "12390004",
      name: "长兴县",
      districtList: [] },
    {
      code: "12390007",
      name: "安吉县",
      districtList: [] },
    {
      code: "12390008",
      name: "德清县",
      districtList: [] }] },

  {
    code: "1300",
    name: "安徽省",
    cityList: [{
      code: "1301",
      name: "合肥",
      districtList: [{
        code: "0004",
        name: "蜀山区" },
      {
        code: "0007",
        name: "瑶海区" },
      {
        code: "0006",
        name: "包河区" },
      {
        code: "0005",
        name: "庐阳区" },
      {
        code: "0011",
        name: "肥西县" },
      {
        code: "0021",
        name: "巢湖市" },
      {
        code: "0014",
        name: "肥东县" },
      {
        code: "0015",
        name: "长丰县" },
      {
        code: "0016",
        name: "庐江县" }] },

    {
      code: "1302",
      name: "黄山",
      districtList: [{
        code: "0008",
        name: "黄山区" },
      {
        code: "0006",
        name: "黟县" },
      {
        code: "0001",
        name: "屯溪区" },
      {
        code: "0007",
        name: "歙县" },
      {
        code: "0005",
        name: "徽州区" },
      {
        code: "0002",
        name: "休宁县" },
      {
        code: "0010",
        name: "祁门县" },
      {
        code: "100759580",
        name: "汤口" }] },

    {
      code: "1303",
      name: "安庆",
      districtList: [{
        code: "0006",
        name: "潜山县" },
      {
        code: "0007",
        name: "宜秀区" },
      {
        code: "0001",
        name: "迎江区" },
      {
        code: "0008",
        name: "宿松县" },
      {
        code: "0013",
        name: "桐城市" },
      {
        code: "0011",
        name: "太湖县" },
      {
        code: "0004",
        name: "怀宁县" },
      {
        code: "0002",
        name: "大观区" },
      {
        code: "0005",
        name: "岳西县" },
      {
        code: "0010",
        name: "望江县" }] },

    {
      code: "1304",
      name: "芜湖",
      districtList: [{
        code: "0003",
        name: "镜湖区" },
      {
        code: "0007",
        name: "弋江区" },
      {
        code: "0008",
        name: "鸠江区" },
      {
        code: "0001",
        name: "南陵县" },
      {
        code: "0010",
        name: "无为县" },
      {
        code: "0006",
        name: "繁昌县" },
      {
        code: "0005",
        name: "芜湖县" },
      {
        code: "0009",
        name: "三山区" }] },

    {
      code: "1305",
      name: "蚌埠",
      districtList: [{
        code: "0003",
        name: "龙子湖区" },
      {
        code: "0002",
        name: "蚌山区" },
      {
        code: "0007",
        name: "五河县" },
      {
        code: "0001",
        name: "禹会区" },
      {
        code: "0004",
        name: "怀远县" },
      {
        code: "0006",
        name: "固镇县" },
      {
        code: "0005",
        name: "淮上区" }] },

    {
      code: "1306",
      name: "淮南",
      districtList: [{
        code: "0001",
        name: "田家庵区" },
      {
        code: "0002",
        name: "凤台县" },
      {
        code: "0006",
        name: "潘集区" },
      {
        code: "0004",
        name: "谢家集区" },
      {
        code: "0005",
        name: "八公山区" },
      {
        code: "0003",
        name: "大通区" },
      {
        code: "0007",
        name: "寿县" }] },

    {
      code: "1307",
      name: "阜阳",
      districtList: [{
        code: "0001",
        name: "颍州区" },
      {
        code: "0002",
        name: "颍泉区" },
      {
        code: "0004",
        name: "太和县" },
      {
        code: "0005",
        name: "阜南县" },
      {
        code: "0006",
        name: "颍上县" },
      {
        code: "0008",
        name: "临泉县" },
      {
        code: "0007",
        name: "界首市" },
      {
        code: "0003",
        name: "颍东区" }] },

    {
      code: "1311",
      name: "马鞍山",
      districtList: [{
        code: "0001",
        name: "花山区" },
      {
        code: "0002",
        name: "雨山区" },
      {
        code: "0004",
        name: "当涂县" },
      {
        code: "0006",
        name: "含山县" },
      {
        code: "0005",
        name: "和县" },
      {
        code: "0007",
        name: "博望区" }] },

    {
      code: "1312",
      name: "亳州",
      districtList: [{
        code: "0001",
        name: "谯城区" },
      {
        code: "0002",
        name: "蒙城县" },
      {
        code: "0004",
        name: "涡阳县" },
      {
        code: "0003",
        name: "利辛县" }] },

    {
      code: "1314",
      name: "宿州",
      districtList: [{
        code: "0002",
        name: "埇桥区" },
      {
        code: "0005",
        name: "泗县" },
      {
        code: "0004",
        name: "灵璧县" },
      {
        code: "0006",
        name: "砀山县" },
      {
        code: "0003",
        name: "萧县" }] },

    {
      code: "1315",
      name: "铜陵",
      districtList: [{
        code: "0001",
        name: "铜官区" },
      {
        code: "0005",
        name: "义安区" },
      {
        code: "0008",
        name: "郊区" },
      {
        code: "100759531",
        name: "大通镇" },
      {
        code: "100759581",
        name: "五松镇" },
      {
        code: "0009",
        name: "枞阳县" }] },

    {
      code: "1318",
      name: "滁州",
      districtList: [{
        code: "0001",
        name: "琅琊区" },
      {
        code: "0004",
        name: "定远县" },
      {
        code: "0003",
        name: "天长市" },
      {
        code: "0006",
        name: "全椒县" },
      {
        code: "0008",
        name: "凤阳县" },
      {
        code: "0009",
        name: "明光市" },
      {
        code: "0007",
        name: "来安县" },
      {
        code: "0005",
        name: "南谯区" }] },

    {
      code: "1319",
      name: "六安",
      districtList: [{
        code: "0001",
        name: "裕安区" },
      {
        code: "0002",
        name: "金安区" },
      {
        code: "0006",
        name: "金寨县" },
      {
        code: "0005",
        name: "霍邱县" },
      {
        code: "0009",
        name: "舒城县" },
      {
        code: "0004",
        name: "霍山县" },
      {
        code: "0008",
        name: "叶集区" }] },

    {
      code: "1320",
      name: "池州",
      districtList: [{
        code: "0005",
        name: "青阳县" },
      {
        code: "0002",
        name: "贵池区" },
      {
        code: "0004",
        name: "石台县" },
      {
        code: "0003",
        name: "东至县" }] },

    {
      code: "1322",
      name: "淮北",
      districtList: [{
        code: "0003",
        name: "相山区" },
      {
        code: "0005",
        name: "濉溪县" },
      {
        code: "0004",
        name: "杜集区" },
      {
        code: "0002",
        name: "烈山区" }] },

    {
      code: "1328",
      name: "宣城",
      districtList: [{
        code: "0002",
        name: "泾县" },
      {
        code: "0005",
        name: "宣州区" },
      {
        code: "0008",
        name: "宁国市" },
      {
        code: "0003",
        name: "绩溪县" },
      {
        code: "0007",
        name: "广德县" },
      {
        code: "0004",
        name: "郎溪县" },
      {
        code: "0006",
        name: "旌德县" }] },

    {
      code: "1309",
      name: "九华山",
      districtList: [] },
    {
      code: "1313",
      name: "天柱山景区",
      districtList: [] },
    {
      code: "1331",
      name: "查济",
      districtList: [] },
    {
      code: "1332",
      name: "西递",
      districtList: [] },
    {
      code: "1338",
      name: "霍山县",
      districtList: [] },
    {
      code: "1340",
      name: "宏村景区",
      districtList: [] },
    {
      code: "1362",
      name: "天堂寨镇",
      districtList: [] },
    {
      code: "13010021",
      name: "巢湖",
      districtList: [] },
    {
      code: "13020006",
      name: "黟县",
      districtList: [] },
    {
      code: "13020007",
      name: "歙县",
      districtList: [] },
    {
      code: "13020010",
      name: "祁门县",
      districtList: [] },
    {
      code: "13030006",
      name: "潜山县",
      districtList: [] },
    {
      code: "13030013",
      name: "桐城",
      districtList: [] },
    {
      code: "13040001",
      name: "南陵县",
      districtList: [] },
    {
      code: "13040005",
      name: "芜湖县",
      districtList: [] },
    {
      code: "13040006",
      name: "繁昌县",
      districtList: [] },
    {
      code: "13040010",
      name: "无为县",
      districtList: [] },
    {
      code: "13050004",
      name: "怀远县",
      districtList: [] },
    {
      code: "13050006",
      name: "固镇县",
      districtList: [] },
    {
      code: "13050007",
      name: "五河县",
      districtList: [] },
    {
      code: "13070004",
      name: "太和县",
      districtList: [] },
    {
      code: "13070005",
      name: "阜南县",
      districtList: [] },
    {
      code: "13070006",
      name: "颍上县",
      districtList: [] },
    {
      code: "13070007",
      name: "界首",
      districtList: [] },
    {
      code: "13070008",
      name: "临泉县",
      districtList: [] },
    {
      code: "13110004",
      name: "当涂县",
      districtList: [] },
    {
      code: "13110005",
      name: "和县",
      districtList: [] },
    {
      code: "13110006",
      name: "含山县",
      districtList: [] },
    {
      code: "13120004",
      name: "涡阳县",
      districtList: [] },
    {
      code: "13140005",
      name: "泗县",
      districtList: [] },
    {
      code: "13140006",
      name: "砀山县",
      districtList: [] },
    {
      code: "13180003",
      name: "天长",
      districtList: [] },
    {
      code: "13180004",
      name: "定远县",
      districtList: [] },
    {
      code: "13180006",
      name: "全椒县",
      districtList: [] },
    {
      code: "13180007",
      name: "来安县",
      districtList: [] },
    {
      code: "13180008",
      name: "凤阳县",
      districtList: [] },
    {
      code: "13180009",
      name: "明光",
      districtList: [] },
    {
      code: "13190009",
      name: "舒城县",
      districtList: [] },
    {
      code: "13280002",
      name: "泾县",
      districtList: [] },
    {
      code: "13280003",
      name: "绩溪县",
      districtList: [] },
    {
      code: "13280004",
      name: "郎溪县",
      districtList: [] },
    {
      code: "13280006",
      name: "旌德县",
      districtList: [] },
    {
      code: "13280007",
      name: "广德县",
      districtList: [] },
    {
      code: "13280008",
      name: "宁国",
      districtList: [] }] },

  {
    code: "1400",
    name: "福建省",
    cityList: [{
      code: "1401",
      name: "厦门",
      districtList: [{
        code: "0001",
        name: "思明区" },
      {
        code: "0002",
        name: "集美区" },
      {
        code: "0006",
        name: "湖里区" },
      {
        code: "0007",
        name: "翔安区" },
      {
        code: "0004",
        name: "海沧区" },
      {
        code: "0003",
        name: "同安区" }] },

    {
      code: "1402",
      name: "福州",
      districtList: [{
        code: "0001",
        name: "鼓楼区" },
      {
        code: "0005",
        name: "仓山区" },
      {
        code: "0003",
        name: "晋安区" },
      {
        code: "0002",
        name: "台江区" },
      {
        code: "0007",
        name: "闽侯县" },
      {
        code: "0012",
        name: "福清市" },
      {
        code: "0006",
        name: "连江县" },
      {
        code: "0014",
        name: "平潭县" },
      {
        code: "0011",
        name: "长乐区" },
      {
        code: "0009",
        name: "罗源县" },
      {
        code: "0004",
        name: "马尾区" },
      {
        code: "0010",
        name: "闽清县" },
      {
        code: "0013",
        name: "永泰县" }] },

    {
      code: "1403",
      name: "泉州",
      districtList: [{
        code: "0011",
        name: "晋江市" },
      {
        code: "0001",
        name: "丰泽区" },
      {
        code: "0002",
        name: "鲤城区" },
      {
        code: "0010",
        name: "石狮市" },
      {
        code: "0014",
        name: "南安市" },
      {
        code: "0007",
        name: "惠安县" },
      {
        code: "0008",
        name: "安溪县" },
      {
        code: "0003",
        name: "泉港区" },
      {
        code: "0012",
        name: "德化县" },
      {
        code: "0013",
        name: "永春县" },
      {
        code: "0005",
        name: "洛江区" },
      {
        code: "0009",
        name: "金门县" }] },

    {
      code: "1406",
      name: "莆田",
      districtList: [{
        code: "0001",
        name: "城厢区" },
      {
        code: "0005",
        name: "仙游县" },
      {
        code: "0004",
        name: "秀屿区" },
      {
        code: "0003",
        name: "荔城区" },
      {
        code: "0002",
        name: "涵江区" }] },

    {
      code: "1408",
      name: "漳州",
      districtList: [{
        code: "0006",
        name: "南靖县" },
      {
        code: "0001",
        name: "芗城区" },
      {
        code: "0002",
        name: "东山县" },
      {
        code: "0010",
        name: "漳浦县" },
      {
        code: "0007",
        name: "龙文区" },
      {
        code: "0009",
        name: "龙海市" },
      {
        code: "0013",
        name: "长泰县" },
      {
        code: "0012",
        name: "平和县" },
      {
        code: "0004",
        name: "云霄县" },
      {
        code: "0008",
        name: "华安县" },
      {
        code: "0011",
        name: "诏安县" }] },

    {
      code: "1409",
      name: "龙岩",
      districtList: [{
        code: "0001",
        name: "新罗区" },
      {
        code: "0004",
        name: "永定区" },
      {
        code: "0003",
        name: "连城县" },
      {
        code: "0002",
        name: "长汀县" },
      {
        code: "0005",
        name: "武平县" },
      {
        code: "0006",
        name: "上杭县" },
      {
        code: "0007",
        name: "漳平市" }] },

    {
      code: "1410",
      name: "三明",
      districtList: [{
        code: "0003",
        name: "泰宁县" },
      {
        code: "0001",
        name: "永安市" },
      {
        code: "0004",
        name: "沙县" },
      {
        code: "0002",
        name: "梅列区" },
      {
        code: "0005",
        name: "三元区" },
      {
        code: "0008",
        name: "将乐县" },
      {
        code: "0010",
        name: "宁化县" },
      {
        code: "0009",
        name: "尤溪县" },
      {
        code: "0012",
        name: "大田县" },
      {
        code: "0007",
        name: "建宁县" },
      {
        code: "0011",
        name: "清流县" },
      {
        code: "0006",
        name: "明溪县" }] },

    {
      code: "1411",
      name: "南平",
      districtList: [{
        code: "0005",
        name: "武夷山市" },
      {
        code: "0001",
        name: "延平区" },
      {
        code: "0007",
        name: "建瓯市" },
      {
        code: "0009",
        name: "建阳区" },
      {
        code: "0006",
        name: "邵武市" },
      {
        code: "0004",
        name: "政和县" },
      {
        code: "0002",
        name: "浦城县" },
      {
        code: "0008",
        name: "松溪县" },
      {
        code: "0003",
        name: "光泽县" },
      {
        code: "0010",
        name: "顺昌县" }] },

    {
      code: "1414",
      name: "宁德",
      districtList: [{
        code: "0008",
        name: "福鼎市" },
      {
        code: "0003",
        name: "霞浦县" },
      {
        code: "0010",
        name: "福安市" },
      {
        code: "0001",
        name: "蕉城区" },
      {
        code: "0009",
        name: "屏南县" },
      {
        code: "0005",
        name: "寿宁县" },
      {
        code: "0006",
        name: "周宁县" },
      {
        code: "0007",
        name: "柘荣县" },
      {
        code: "0004",
        name: "古田县" }] },

    {
      code: "14020006",
      name: "连江县",
      districtList: [] },
    {
      code: "14020007",
      name: "闽侯县",
      districtList: [] },
    {
      code: "14020009",
      name: "罗源县",
      districtList: [] },
    {
      code: "14020010",
      name: "闽清县",
      districtList: [] },
    {
      code: "14020011",
      name: "长乐",
      districtList: [] },
    {
      code: "14020012",
      name: "福清",
      districtList: [] },
    {
      code: "14020013",
      name: "永泰县",
      districtList: [] },
    {
      code: "14020014",
      name: "平潭县",
      districtList: [] },
    {
      code: "14030007",
      name: "惠安县",
      districtList: [] },
    {
      code: "14030008",
      name: "安溪县",
      districtList: [] },
    {
      code: "14030010",
      name: "石狮",
      districtList: [] },
    {
      code: "14030011",
      name: "晋江",
      districtList: [] },
    {
      code: "14030012",
      name: "德化县",
      districtList: [] },
    {
      code: "14030013",
      name: "永春县",
      districtList: [] },
    {
      code: "14030014",
      name: "南安",
      districtList: [] },
    {
      code: "14060005",
      name: "仙游县",
      districtList: [] },
    {
      code: "14080002",
      name: "东山县",
      districtList: [] },
    {
      code: "14080004",
      name: "云霄县",
      districtList: [] },
    {
      code: "14080006",
      name: "南靖县",
      districtList: [] },
    {
      code: "14080009",
      name: "龙海",
      districtList: [] },
    {
      code: "14080010",
      name: "漳浦县",
      districtList: [] },
    {
      code: "14080011",
      name: "诏安县",
      districtList: [] },
    {
      code: "14080012",
      name: "平和县",
      districtList: [] },
    {
      code: "14080013",
      name: "长泰县",
      districtList: [] },
    {
      code: "14090002",
      name: "长汀县",
      districtList: [] },
    {
      code: "14090003",
      name: "连城县",
      districtList: [] },
    {
      code: "14090004",
      name: "永定县",
      districtList: [] },
    {
      code: "14090005",
      name: "武平县",
      districtList: [] },
    {
      code: "14090006",
      name: "上杭县",
      districtList: [] },
    {
      code: "14090007",
      name: "漳平",
      districtList: [] },
    {
      code: "14100001",
      name: "永安",
      districtList: [] },
    {
      code: "14100003",
      name: "泰宁县",
      districtList: [] },
    {
      code: "14100004",
      name: "沙县",
      districtList: [] },
    {
      code: "14100006",
      name: "明溪县",
      districtList: [] },
    {
      code: "14100007",
      name: "建宁县",
      districtList: [] },
    {
      code: "14100008",
      name: "将乐县",
      districtList: [] },
    {
      code: "14100009",
      name: "尤溪县",
      districtList: [] },
    {
      code: "14100010",
      name: "宁化县",
      districtList: [] },
    {
      code: "14100011",
      name: "清流县",
      districtList: [] },
    {
      code: "14100012",
      name: "大田县",
      districtList: [] },
    {
      code: "14110002",
      name: "浦城县",
      districtList: [] },
    {
      code: "14110003",
      name: "光泽县",
      districtList: [] },
    {
      code: "14110004",
      name: "政和县",
      districtList: [] },
    {
      code: "14110005",
      name: "武夷山",
      districtList: [] },
    {
      code: "14110006",
      name: "邵武",
      districtList: [] },
    {
      code: "14110007",
      name: "建瓯",
      districtList: [] },
    {
      code: "14110008",
      name: "松溪县",
      districtList: [] },
    {
      code: "14110009",
      name: "建阳",
      districtList: [] },
    {
      code: "14110010",
      name: "顺昌县",
      districtList: [] },
    {
      code: "14140003",
      name: "霞浦县",
      districtList: [] },
    {
      code: "14140004",
      name: "古田县",
      districtList: [] },
    {
      code: "14140005",
      name: "寿宁县",
      districtList: [] },
    {
      code: "14140006",
      name: "周宁县",
      districtList: [] },
    {
      code: "14140007",
      name: "柘荣县",
      districtList: [] },
    {
      code: "14140008",
      name: "福鼎",
      districtList: [] },
    {
      code: "14140009",
      name: "屏南县",
      districtList: [] },
    {
      code: "14140010",
      name: "福安",
      districtList: [] }] },

  {
    code: "1500",
    name: "江西省",
    cityList: [{
      code: "1501",
      name: "南昌",
      districtList: [{
        code: "0004",
        name: "青山湖区" },
      {
        code: "0003",
        name: "西湖区" },
      {
        code: "0001",
        name: "东湖区" },
      {
        code: "0008",
        name: "新建区" },
      {
        code: "0007",
        name: "南昌县" },
      {
        code: "0002",
        name: "青云谱区" },
      {
        code: "0009",
        name: "进贤县" },
      {
        code: "0006",
        name: "湾里区" },
      {
        code: "0010",
        name: "安义县" }] },

    {
      code: "1502",
      name: "九江",
      districtList: [{
        code: "0018",
        name: "濂溪区" },
      {
        code: "0003",
        name: "浔阳区" },
      {
        code: "0008",
        name: "瑞昌市" },
      {
        code: "0011",
        name: "修水县" },
      {
        code: "0005",
        name: "庐山市" },
      {
        code: "0014",
        name: "武宁县" },
      {
        code: "0013",
        name: "德安县" },
      {
        code: "0004",
        name: "永修县" },
      {
        code: "0015",
        name: "都昌县" },
      {
        code: "0009",
        name: "柴桑区" },
      {
        code: "0010",
        name: "湖口县" },
      {
        code: "0017",
        name: "共青城市" },
      {
        code: "0016",
        name: "彭泽县" }] },

    {
      code: "1503",
      name: "吉安",
      districtList: [{
        code: "0014",
        name: "井冈山市" },
      {
        code: "0002",
        name: "吉州区" },
      {
        code: "0006",
        name: "遂川县" },
      {
        code: "0007",
        name: "新干县" },
      {
        code: "0005",
        name: "吉水县" },
      {
        code: "0008",
        name: "青原区" },
      {
        code: "0004",
        name: "泰和县" },
      {
        code: "0011",
        name: "永丰县" },
      {
        code: "0003",
        name: "安福县" },
      {
        code: "0009",
        name: "吉安县" },
      {
        code: "0013",
        name: "永新县" },
      {
        code: "0012",
        name: "万安县" },
      {
        code: "0010",
        name: "峡江县" }] },

    {
      code: "1507",
      name: "景德镇",
      districtList: [{
        code: "0002",
        name: "珠山区" },
      {
        code: "0003",
        name: "昌江区" },
      {
        code: "0004",
        name: "浮梁县" },
      {
        code: "0005",
        name: "乐平市" }] },

    {
      code: "1508",
      name: "上饶",
      districtList: [{
        code: "0017",
        name: "婺源县" },
      {
        code: "0011",
        name: "玉山县" },
      {
        code: "0002",
        name: "信州区" },
      {
        code: "0003",
        name: "上饶县" },
      {
        code: "0009",
        name: "德兴市" },
      {
        code: "0010",
        name: "鄱阳县" },
      {
        code: "0006",
        name: "广丰区" },
      {
        code: "0013",
        name: "铅山县" },
      {
        code: "0012",
        name: "余干县" },
      {
        code: "0015",
        name: "弋阳县" },
      {
        code: "0016",
        name: "万年县" },
      {
        code: "0014",
        name: "横峰县" }] },

    {
      code: "1509",
      name: "宜春",
      districtList: [{
        code: "0001",
        name: "袁州区" },
      {
        code: "0005",
        name: "丰城市" },
      {
        code: "0007",
        name: "高安市" },
      {
        code: "0008",
        name: "上高市" },
      {
        code: "0004",
        name: "樟树市" },
      {
        code: "0010",
        name: "宜丰县" },
      {
        code: "0006",
        name: "万载县" },
      {
        code: "0009",
        name: "奉新县" },
      {
        code: "0012",
        name: "铜鼓县" },
      {
        code: "0011",
        name: "靖安县" }] },

    {
      code: "1512",
      name: "萍乡",
      districtList: [{
        code: "0001",
        name: "安源区" },
      {
        code: "0005",
        name: "芦溪县" },
      {
        code: "0007",
        name: "上栗县" },
      {
        code: "0006",
        name: "莲花县" },
      {
        code: "0002",
        name: "湘东区" }] },

    {
      code: "1514",
      name: "新余",
      districtList: [{
        code: "0001",
        name: "渝水区" },
      {
        code: "0002",
        name: "分宜县" }] },

    {
      code: "1515",
      name: "抚州",
      districtList: [{
        code: "0003",
        name: "临川区" },
      {
        code: "0010",
        name: "东乡区" },
      {
        code: "0011",
        name: "广昌县" },
      {
        code: "0012",
        name: "南城县" },
      {
        code: "0006",
        name: "乐安县" },
      {
        code: "0002",
        name: "黎川县" },
      {
        code: "0004",
        name: "南丰县" },
      {
        code: "0008",
        name: "金溪县" },
      {
        code: "0009",
        name: "资溪县" },
      {
        code: "0005",
        name: "崇仁县" },
      {
        code: "0007",
        name: "宜黄县" }] },

    {
      code: "1516",
      name: "赣州",
      districtList: [{
        code: "0002",
        name: "章贡区" },
      {
        code: "0019",
        name: "南康区" },
      {
        code: "0001",
        name: "龙南县" },
      {
        code: "0009",
        name: "于都县" },
      {
        code: "0018",
        name: "瑞金市" },
      {
        code: "0007",
        name: "兴国县" },
      {
        code: "0005",
        name: "定南县" },
      {
        code: "0014",
        name: "宁都县" },
      {
        code: "0016",
        name: "信丰县" },
      {
        code: "0008",
        name: "寻乌县" },
      {
        code: "0012",
        name: "大余县" },
      {
        code: "0013",
        name: "安远县" },
      {
        code: "0010",
        name: "石城县" },
      {
        code: "0020",
        name: "赣县区" },
      {
        code: "0006",
        name: "上犹县" },
      {
        code: "0017",
        name: "崇义县" },
      {
        code: "0015",
        name: "会昌县" },
      {
        code: "0011",
        name: "全南县" }] },

    {
      code: "1517",
      name: "鹰潭",
      districtList: [{
        code: "0001",
        name: "月湖区" },
      {
        code: "0002",
        name: "贵溪市" },
      {
        code: "0003",
        name: "余江县" }] },

    {
      code: "1523",
      name: "三清山",
      districtList: [] },
    {
      code: "1533",
      name: "龙虎山",
      districtList: [] },
    {
      code: "1536",
      name: "武功山风景区",
      districtList: [] },
    {
      code: "15020004",
      name: "永修县",
      districtList: [] },
    {
      code: "15030014",
      name: "井冈山",
      districtList: [] },
    {
      code: "15070005",
      name: "乐平",
      districtList: [] },
    {
      code: "15080009",
      name: "德兴",
      districtList: [] },
    {
      code: "15080010",
      name: "鄱阳县",
      districtList: [] },
    {
      code: "15080011",
      name: "玉山县",
      districtList: [] },
    {
      code: "15080012",
      name: "余干县",
      districtList: [] },
    {
      code: "15080017",
      name: "婺源县",
      districtList: [] },
    {
      code: "15090004",
      name: "樟树",
      districtList: [] },
    {
      code: "15090005",
      name: "丰城",
      districtList: [] },
    {
      code: "15090007",
      name: "高安",
      districtList: [] },
    {
      code: "15150012",
      name: "南城县",
      districtList: [] },
    {
      code: "15160001",
      name: "龙南县",
      districtList: [] },
    {
      code: "15160005",
      name: "定南县",
      districtList: [] },
    {
      code: "15160006",
      name: "上犹县",
      districtList: [] },
    {
      code: "15160008",
      name: "寻乌县",
      districtList: [] },
    {
      code: "15160009",
      name: "于都县",
      districtList: [] },
    {
      code: "15160010",
      name: "石城县",
      districtList: [] },
    {
      code: "15160011",
      name: "全南县",
      districtList: [] },
    {
      code: "15160012",
      name: "大余县",
      districtList: [] },
    {
      code: "15160013",
      name: "安远县",
      districtList: [] },
    {
      code: "15160014",
      name: "宁都县",
      districtList: [] },
    {
      code: "15160015",
      name: "会昌县",
      districtList: [] },
    {
      code: "15160016",
      name: "信丰县",
      districtList: [] },
    {
      code: "15160017",
      name: "崇义县",
      districtList: [] },
    {
      code: "15160018",
      name: "瑞金",
      districtList: [] },
    {
      code: "15160019",
      name: "南康",
      districtList: [] },
    {
      code: "15160020",
      name: "赣县",
      districtList: [] },
    {
      code: "15170002",
      name: "贵溪",
      districtList: [] }] },

  {
    code: "1600",
    name: "山东省",
    cityList: [{
      code: "1601",
      name: "青岛",
      districtList: [{
        code: "0006",
        name: "市南区" },
      {
        code: "0007",
        name: "市北区" },
      {
        code: "0013",
        name: "黄岛区" },
      {
        code: "0010",
        name: "崂山区" },
      {
        code: "0011",
        name: "城阳区" },
      {
        code: "0009",
        name: "李沧区" },
      {
        code: "0014",
        name: "即墨区" },
      {
        code: "0017",
        name: "平度市" },
      {
        code: "0016",
        name: "胶州市" },
      {
        code: "0001",
        name: "胶南市" },
      {
        code: "0015",
        name: "莱西市" }] },

    {
      code: "1602",
      name: "济南",
      districtList: [{
        code: "0002",
        name: "历下区" },
      {
        code: "0004",
        name: "天桥区" },
      {
        code: "0005",
        name: "历城区" },
      {
        code: "0001",
        name: "济南市中区" },
      {
        code: "0003",
        name: "槐荫区" },
      {
        code: "0010",
        name: "章丘区" },
      {
        code: "0007",
        name: "长清区" },
      {
        code: "0013",
        name: "济阳县" },
      {
        code: "0012",
        name: "平阴县" },
      {
        code: "0011",
        name: "商河县" },
      {
        code: "100473964",
        name: "莱芜市" }] },

    {
      code: "1603",
      name: "潍坊",
      districtList: [{
        code: "0003",
        name: "奎文区" },
      {
        code: "0004",
        name: "潍城区" },
      {
        code: "0006",
        name: "寒亭区" },
      {
        code: "0005",
        name: "坊子区" },
      {
        code: "0010",
        name: "青州市" },
      {
        code: "0009",
        name: "寿光市" },
      {
        code: "0012",
        name: "诸城市" },
      {
        code: "0013",
        name: "安丘市" },
      {
        code: "0011",
        name: "高密市" },
      {
        code: "0015",
        name: "昌邑市" },
      {
        code: "0014",
        name: "昌乐县" },
      {
        code: "0016",
        name: "临朐县" }] },

    {
      code: "1604",
      name: "烟台",
      districtList: [{
        code: "0002",
        name: "芝罘区" },
      {
        code: "0009",
        name: "蓬莱市" },
      {
        code: "0007",
        name: "长岛县" },
      {
        code: "0003",
        name: "莱山区" },
      {
        code: "0004",
        name: "福山区" },
      {
        code: "0011",
        name: "龙口市" },
      {
        code: "0012",
        name: "海阳市" },
      {
        code: "0013",
        name: "莱州市" },
      {
        code: "0005",
        name: "牟平区" },
      {
        code: "0006",
        name: "栖霞市" },
      {
        code: "0010",
        name: "莱阳市" },
      {
        code: "0008",
        name: "招远市" }] },

    {
      code: "1605",
      name: "威海",
      districtList: [{
        code: "0001",
        name: "环翠区" },
      {
        code: "0006",
        name: "荣成市" },
      {
        code: "0005",
        name: "文登区" },
      {
        code: "0004",
        name: "乳山市" }] },

    {
      code: "1606",
      name: "淄博",
      districtList: [{
        code: "0001",
        name: "张店区" },
      {
        code: "0004",
        name: "周村区" },
      {
        code: "0005",
        name: "淄川区" },
      {
        code: "0003",
        name: "临淄区" },
      {
        code: "0002",
        name: "博山区" },
      {
        code: "0009",
        name: "桓台县" },
      {
        code: "0008",
        name: "沂源县" },
      {
        code: "0010",
        name: "高青县" }] },

    {
      code: "1607",
      name: "东营",
      districtList: [{
        code: "0001",
        name: "东营区" },
      {
        code: "0003",
        name: "广饶县" },
      {
        code: "0002",
        name: "河口区" },
      {
        code: "0005",
        name: "垦利区" },
      {
        code: "0004",
        name: "利津县" }] },

    {
      code: "1608",
      name: "枣庄",
      districtList: [{
        code: "0008",
        name: "滕州市" },
      {
        code: "0001",
        name: "枣庄市中区" },
      {
        code: "0002",
        name: "薛城区" },
      {
        code: "0003",
        name: "台儿庄区" },
      {
        code: "0004",
        name: "峄城区" },
      {
        code: "0007",
        name: "山亭区" }] },

    {
      code: "1611",
      name: "临沂",
      districtList: [{
        code: "0001",
        name: "兰山区" },
      {
        code: "0006",
        name: "沂水县" },
      {
        code: "0004",
        name: "平邑县" },
      {
        code: "0002",
        name: "罗庄区" },
      {
        code: "0007",
        name: "沂南县" },
      {
        code: "0008",
        name: "蒙阴县" },
      {
        code: "0013",
        name: "兰陵县" },
      {
        code: "0003",
        name: "河东区" },
      {
        code: "0010",
        name: "莒南" },
      {
        code: "0012",
        name: "临沭县" },
      {
        code: "0005",
        name: "费县" },
      {
        code: "0011",
        name: "郯城县" }] },

    {
      code: "1612",
      name: "德州",
      districtList: [{
        code: "0001",
        name: "德城区" },
      {
        code: "0002",
        name: "齐河县" },
      {
        code: "0004",
        name: "陵县" },
      {
        code: "0007",
        name: "禹城市" },
      {
        code: "0005",
        name: "武城县" },
      {
        code: "0003",
        name: "庆云县" },
      {
        code: "0006",
        name: "临邑县" },
      {
        code: "0008",
        name: "平原县" },
      {
        code: "0010",
        name: "夏津县" },
      {
        code: "0009",
        name: "乐陵市" },
      {
        code: "0011",
        name: "宁津县" }] },

    {
      code: "1614",
      name: "泰安",
      districtList: [{
        code: "0001",
        name: "泰山区" },
      {
        code: "0002",
        name: "岱岳区" },
      {
        code: "0012",
        name: "新泰市" },
      {
        code: "0010",
        name: "东平县" },
      {
        code: "0009",
        name: "肥城市" },
      {
        code: "0011",
        name: "宁阳县" }] },

    {
      code: "1615",
      name: "日照",
      districtList: [{
        code: "0001",
        name: "东港区" },
      {
        code: "0003",
        name: "岚山区" },
      {
        code: "0007",
        name: "五莲县" },
      {
        code: "0008",
        name: "莒县" }] },

    {
      code: "1616",
      name: "菏泽",
      districtList: [{
        code: "0002",
        name: "牡丹区" },
      {
        code: "0008",
        name: "单县" },
      {
        code: "0011",
        name: "曹县" },
      {
        code: "0003",
        name: "郓城县" },
      {
        code: "0012",
        name: "巨野县" },
      {
        code: "0006",
        name: "鄄城县" },
      {
        code: "0004",
        name: "成武县" },
      {
        code: "0005",
        name: "东明县" },
      {
        code: "0007",
        name: "定陶区" }] },

    {
      code: "1618",
      name: "滨州",
      districtList: [{
        code: "0001",
        name: "滨城区" },
      {
        code: "0006",
        name: "邹平县" },
      {
        code: "0005",
        name: "博兴县" },
      {
        code: "0003",
        name: "无棣县" },
      {
        code: "0002",
        name: "沾化区" },
      {
        code: "0007",
        name: "惠民县" },
      {
        code: "0004",
        name: "阳信县" }] },

    {
      code: "1619",
      name: "济宁",
      districtList: [{
        code: "0013",
        name: "曲阜市" },
      {
        code: "0008",
        name: "邹城市" },
      {
        code: "0019",
        name: "梁山县" },
      {
        code: "0007",
        name: "兖州区" },
      {
        code: "0003",
        name: "任城区" },
      {
        code: "0017",
        name: "微山县" },
      {
        code: "0018",
        name: "汶上县" },
      {
        code: "0014",
        name: "嘉祥县" },
      {
        code: "0016",
        name: "金乡县" },
      {
        code: "0015",
        name: "泗水县" },
      {
        code: "0020",
        name: "鱼台县" }] },

    {
      code: "1622",
      name: "聊城",
      districtList: [{
        code: "0001",
        name: "东昌府区" },
      {
        code: "0004",
        name: "茌平县" },
      {
        code: "0007",
        name: "莘县" },
      {
        code: "0005",
        name: "临清市" },
      {
        code: "0009",
        name: "高唐县" },
      {
        code: "0008",
        name: "阳谷县" },
      {
        code: "0006",
        name: "冠县" },
      {
        code: "0003",
        name: "东阿县" }] },

    {
      code: "1634",
      name: "莱芜",
      districtList: [{
        code: "0001",
        name: "莱城区" },
      {
        code: "0002",
        name: "钢城区" }] },

    {
      code: "16010014",
      name: "即墨",
      districtList: [] },
    {
      code: "16010015",
      name: "莱西",
      districtList: [] },
    {
      code: "16010016",
      name: "胶州",
      districtList: [] },
    {
      code: "16010017",
      name: "平度",
      districtList: [] },
    {
      code: "16020010",
      name: "章丘",
      districtList: [] },
    {
      code: "16020013",
      name: "济阳县",
      districtList: [] },
    {
      code: "16030009",
      name: "寿光",
      districtList: [] },
    {
      code: "16030010",
      name: "青州",
      districtList: [] },
    {
      code: "16030011",
      name: "高密",
      districtList: [] },
    {
      code: "16030012",
      name: "诸城",
      districtList: [] },
    {
      code: "16030013",
      name: "安丘",
      districtList: [] },
    {
      code: "16030014",
      name: "昌乐县",
      districtList: [] },
    {
      code: "16040006",
      name: "栖霞",
      districtList: [] },
    {
      code: "16040007",
      name: "长岛县",
      districtList: [] },
    {
      code: "16040008",
      name: "招远",
      districtList: [] },
    {
      code: "16040009",
      name: "蓬莱",
      districtList: [] },
    {
      code: "16040010",
      name: "莱阳",
      districtList: [] },
    {
      code: "16040011",
      name: "龙口",
      districtList: [] },
    {
      code: "16040012",
      name: "海阳",
      districtList: [] },
    {
      code: "16040013",
      name: "莱州",
      districtList: [] },
    {
      code: "16050004",
      name: "乳山",
      districtList: [] },
    {
      code: "16050005",
      name: "文登",
      districtList: [] },
    {
      code: "16050006",
      name: "荣成",
      districtList: [] },
    {
      code: "16060008",
      name: "沂源县",
      districtList: [] },
    {
      code: "16070003",
      name: "广饶县",
      districtList: [] },
    {
      code: "16070004",
      name: "利津县",
      districtList: [] },
    {
      code: "16070005",
      name: "垦利县",
      districtList: [] },
    {
      code: "16080008",
      name: "滕州",
      districtList: [] },
    {
      code: "16110004",
      name: "平邑县",
      districtList: [] },
    {
      code: "16110006",
      name: "沂水县",
      districtList: [] },
    {
      code: "16110007",
      name: "沂南县",
      districtList: [] },
    {
      code: "16110008",
      name: "蒙阴县",
      districtList: [] },
    {
      code: "16110010",
      name: "莒南",
      districtList: [] },
    {
      code: "16110011",
      name: "郯城县",
      districtList: [] },
    {
      code: "16110012",
      name: "临沭县",
      districtList: [] },
    {
      code: "16110013",
      name: "苍山县",
      districtList: [] },
    {
      code: "16120002",
      name: "齐河县",
      districtList: [] },
    {
      code: "16120003",
      name: "庆云县",
      districtList: [] },
    {
      code: "16120006",
      name: "临邑县",
      districtList: [] },
    {
      code: "16120007",
      name: "禹城",
      districtList: [] },
    {
      code: "16120008",
      name: "平原县",
      districtList: [] },
    {
      code: "16120009",
      name: "乐陵",
      districtList: [] },
    {
      code: "16120010",
      name: "夏津县",
      districtList: [] },
    {
      code: "16120011",
      name: "宁津县",
      districtList: [] },
    {
      code: "16140009",
      name: "肥城",
      districtList: [] },
    {
      code: "16140010",
      name: "东平县",
      districtList: [] },
    {
      code: "16140011",
      name: "宁阳县",
      districtList: [] },
    {
      code: "16140012",
      name: "新泰",
      districtList: [] },
    {
      code: "16150007",
      name: "五莲县",
      districtList: [] },
    {
      code: "16160003",
      name: "郓城县",
      districtList: [] },
    {
      code: "16160005",
      name: "东明县",
      districtList: [] },
    {
      code: "16160011",
      name: "曹县",
      districtList: [] },
    {
      code: "16160012",
      name: "巨野县",
      districtList: [] },
    {
      code: "16180003",
      name: "无棣县",
      districtList: [] },
    {
      code: "16180004",
      name: "阳信县",
      districtList: [] },
    {
      code: "16180005",
      name: "博兴县",
      districtList: [] },
    {
      code: "16180006",
      name: "邹平县",
      districtList: [] },
    {
      code: "16180007",
      name: "惠民县",
      districtList: [] },
    {
      code: "16190007",
      name: "兖州",
      districtList: [] },
    {
      code: "16190008",
      name: "邹城",
      districtList: [] },
    {
      code: "16190013",
      name: "曲阜",
      districtList: [] },
    {
      code: "16190015",
      name: "泗水县",
      districtList: [] },
    {
      code: "16190016",
      name: "金乡县",
      districtList: [] },
    {
      code: "16190017",
      name: "微山县",
      districtList: [] },
    {
      code: "16190018",
      name: "汶上县",
      districtList: [] },
    {
      code: "16190019",
      name: "梁山县",
      districtList: [] },
    {
      code: "16220003",
      name: "东阿县",
      districtList: [] },
    {
      code: "16220004",
      name: "茌平县",
      districtList: [] },
    {
      code: "16220005",
      name: "临清",
      districtList: [] },
    {
      code: "16220006",
      name: "冠县",
      districtList: [] },
    {
      code: "16220007",
      name: "莘县",
      districtList: [] },
    {
      code: "16220008",
      name: "阳谷县",
      districtList: [] },
    {
      code: "16220009",
      name: "高唐县",
      districtList: [] }] },

  {
    code: "1700",
    name: "河南省",
    cityList: [{
      code: "1701",
      name: "郑州",
      districtList: [{
        code: "0001",
        name: "金水区" },
      {
        code: "0002",
        name: "二七区" },
      {
        code: "0004",
        name: "管城区" },
      {
        code: "0003",
        name: "中原区" },
      {
        code: "0021",
        name: "登封市" },
      {
        code: "0011",
        name: "新郑市" },
      {
        code: "0013",
        name: "惠济区" },
      {
        code: "0020",
        name: "新密市" },
      {
        code: "0015",
        name: "中牟县" },
      {
        code: "0012",
        name: "巩义市" },
      {
        code: "0019",
        name: "荥阳市" },
      {
        code: "0014",
        name: "上街区" }] },

    {
      code: "1702",
      name: "洛阳",
      districtList: [{
        code: "0013",
        name: "吉利区" },
      {
        code: "0002",
        name: "西工区" },
      {
        code: "0005",
        name: "洛龙区" },
      {
        code: "0001",
        name: "涧西区" },
      {
        code: "0003",
        name: "老城区" },
      {
        code: "0010",
        name: "瀍河区" },
      {
        code: "0012",
        name: "嵩县" },
      {
        code: "0008",
        name: "偃师市" },
      {
        code: "0011",
        name: "伊川县" },
      {
        code: "0019",
        name: "新安县" },
      {
        code: "0018",
        name: "栾川县" },
      {
        code: "0014",
        name: "宜阳县" },
      {
        code: "0016",
        name: "汝阳县" },
      {
        code: "0015",
        name: "孟津县" },
      {
        code: "0009",
        name: "洛宁县" }] },

    {
      code: "1703",
      name: "开封",
      districtList: [{
        code: "0001",
        name: "鼓楼区" },
      {
        code: "0004",
        name: "顺河回族区" },
      {
        code: "0005",
        name: "禹王台区" },
      {
        code: "0002",
        name: "龙亭区" },
      {
        code: "0012",
        name: "祥符区" },
      {
        code: "0007",
        name: "尉氏县" },
      {
        code: "0009",
        name: "兰考县" },
      {
        code: "0011",
        name: "通许县" },
      {
        code: "0010",
        name: "杞县" }] },

    {
      code: "1704",
      name: "新乡",
      districtList: [{
        code: "0009",
        name: "辉县市" },
      {
        code: "0002",
        name: "牧野区" },
      {
        code: "0003",
        name: "红旗区" },
      {
        code: "0007",
        name: "长垣县" },
      {
        code: "0001",
        name: "卫滨区" },
      {
        code: "0006",
        name: "封丘县" },
      {
        code: "0008",
        name: "原阳县" },
      {
        code: "0012",
        name: "卫辉市" },
      {
        code: "0005",
        name: "获嘉县" },
      {
        code: "0011",
        name: "延津县" },
      {
        code: "0010",
        name: "新乡县" },
      {
        code: "0004",
        name: "凤泉区" }] },

    {
      code: "1705",
      name: "平顶山",
      districtList: [{
        code: "0001",
        name: "新华区" },
      {
        code: "0006",
        name: "鲁山县" },
      {
        code: "0005",
        name: "汝州市" },
      {
        code: "0002",
        name: "卫东区" },
      {
        code: "0008",
        name: "宝丰县" },
      {
        code: "0003",
        name: "湛河区" },
      {
        code: "0010",
        name: "舞钢市" },
      {
        code: "0009",
        name: "叶县" },
      {
        code: "0007",
        name: "郏县" }] },

    {
      code: "1706",
      name: "濮阳",
      districtList: [{
        code: "0002",
        name: "华龙区" },
      {
        code: "0007",
        name: "范县" },
      {
        code: "0003",
        name: "濮阳县" },
      {
        code: "0004",
        name: "台前县" },
      {
        code: "0006",
        name: "南乐县" },
      {
        code: "0005",
        name: "清丰县" }] },

    {
      code: "1707",
      name: "南阳",
      districtList: [{
        code: "0001",
        name: "卧龙区" },
      {
        code: "0002",
        name: "宛城区" },
      {
        code: "0004",
        name: "内乡县" },
      {
        code: "0003",
        name: "西峡县" },
      {
        code: "0005",
        name: "方城县" },
      {
        code: "0013",
        name: "南召县" },
      {
        code: "0007",
        name: "镇平县" },
      {
        code: "0014",
        name: "邓州市" },
      {
        code: "0010",
        name: "桐柏县" },
      {
        code: "0012",
        name: "唐河县" },
      {
        code: "0008",
        name: "淅川县" },
      {
        code: "0006",
        name: "新野县" },
      {
        code: "0009",
        name: "社旗县" }] },

    {
      code: "1708",
      name: "三门峡",
      districtList: [{
        code: "0001",
        name: "湖滨区" },
      {
        code: "0007",
        name: "灵宝市" },
      {
        code: "0002",
        name: "陕州区" },
      {
        code: "0003",
        name: "渑池县" },
      {
        code: "0006",
        name: "卢氏县" },
      {
        code: "0004",
        name: "义马市" }] },

    {
      code: "1709",
      name: "济源",
      districtList: [{
        code: "100222501",
        name: "济源市" },
      {
        code: "0016",
        name: "王屋镇" },
      {
        code: "0008",
        name: "五龙口镇" },
      {
        code: "0011",
        name: "承留镇" },
      {
        code: "0015",
        name: "思礼镇" },
      {
        code: "0007",
        name: "克井镇" },
      {
        code: "0010",
        name: "轵城镇" },
      {
        code: "0012",
        name: "坡头镇" },
      {
        code: "0014",
        name: "邵原镇" },
      {
        code: "0017",
        name: "下冶镇" },
      {
        code: "0003",
        name: "济水街道" },
      {
        code: "0004",
        name: "沁园街道" },
      {
        code: "0005",
        name: "北海街道" },
      {
        code: "0006",
        name: "天坛街道" },
      {
        code: "0013",
        name: "大峪镇" },
      {
        code: "0018",
        name: "玉泉街道" }] },

    {
      code: "1710",
      name: "焦作",
      districtList: [{
        code: "0005",
        name: "修武县" },
      {
        code: "0001",
        name: "山阳区" },
      {
        code: "0002",
        name: "解放区" },
      {
        code: "0008",
        name: "博爱县" },
      {
        code: "0010",
        name: "沁阳市" },
      {
        code: "0009",
        name: "温县" },
      {
        code: "0007",
        name: "武陟县" },
      {
        code: "0012",
        name: "孟州市" },
      {
        code: "0006",
        name: "马村区" },
      {
        code: "0003",
        name: "中站区" }] },

    {
      code: "1712",
      name: "鹤壁",
      districtList: [{
        code: "0001",
        name: "淇滨区" },
      {
        code: "0002",
        name: "山城区" },
      {
        code: "0005",
        name: "浚县" },
      {
        code: "0006",
        name: "淇县" },
      {
        code: "0003",
        name: "鹤山区" }] },

    {
      code: "1713",
      name: "许昌",
      districtList: [{
        code: "0001",
        name: "魏都区" },
      {
        code: "0002",
        name: "长葛市" },
      {
        code: "0004",
        name: "禹州市" },
      {
        code: "0005",
        name: "鄢陵县" },
      {
        code: "0007",
        name: "襄城县" },
      {
        code: "0008",
        name: "建安区" }] },

    {
      code: "1714",
      name: "周口",
      districtList: [{
        code: "0001",
        name: "川汇区" },
      {
        code: "0003",
        name: "淮阳县" },
      {
        code: "0010",
        name: "项城市" },
      {
        code: "0007",
        name: "沈丘县" },
      {
        code: "0005",
        name: "扶沟县" },
      {
        code: "0006",
        name: "商水县" },
      {
        code: "0008",
        name: "郸城县" },
      {
        code: "0002",
        name: "西华县" },
      {
        code: "0004",
        name: "鹿邑县" },
      {
        code: "0009",
        name: "太康县" }] },

    {
      code: "1716",
      name: "安阳",
      districtList: [{
        code: "0003",
        name: "文峰区" },
      {
        code: "0010",
        name: "林州市" },
      {
        code: "0009",
        name: "内黄县" },
      {
        code: "0011",
        name: "滑县" },
      {
        code: "0001",
        name: "殷都区" },
      {
        code: "0005",
        name: "汤阴县" },
      {
        code: "0002",
        name: "北关区" },
      {
        code: "0007",
        name: "安阳县" },
      {
        code: "0008",
        name: "龙安区" }] },

    {
      code: "1717",
      name: "漯河",
      districtList: [{
        code: "0001",
        name: "源汇区" },
      {
        code: "0006",
        name: "临颍县" },
      {
        code: "0002",
        name: "郾城区" },
      {
        code: "0004",
        name: "舞阳县" },
      {
        code: "0003",
        name: "召陵区" }] },

    {
      code: "1718",
      name: "驻马店",
      districtList: [{
        code: "0001",
        name: "驿城区" },
      {
        code: "0008",
        name: "泌阳县" },
      {
        code: "0002",
        name: "平舆县" },
      {
        code: "0006",
        name: "上蔡县" },
      {
        code: "0010",
        name: "遂平县" },
      {
        code: "0005",
        name: "西平县" },
      {
        code: "0004",
        name: "新蔡县" },
      {
        code: "0009",
        name: "汝南县" },
      {
        code: "0003",
        name: "正阳县" },
      {
        code: "0007",
        name: "确山县" }] },

    {
      code: "1720",
      name: "信阳",
      districtList: [{
        code: "0001",
        name: "浉河区" },
      {
        code: "0004",
        name: "光山县" },
      {
        code: "0002",
        name: "平桥区" },
      {
        code: "0008",
        name: "固始县" },
      {
        code: "0006",
        name: "罗山县" },
      {
        code: "0011",
        name: "潢川县" },
      {
        code: "0009",
        name: "商城县" },
      {
        code: "0013",
        name: "息县" },
      {
        code: "0003",
        name: "新县" },
      {
        code: "0012",
        name: "淮滨县" }] },

    {
      code: "1721",
      name: "商丘",
      districtList: [{
        code: "0001",
        name: "梁园区" },
      {
        code: "0002",
        name: "睢阳区" },
      {
        code: "0009",
        name: "永城市" },
      {
        code: "0004",
        name: "民权县" },
      {
        code: "0007",
        name: "柘城县" },
      {
        code: "0008",
        name: "夏邑县" },
      {
        code: "0005",
        name: "睢县" },
      {
        code: "0003",
        name: "虞城县" },
      {
        code: "0006",
        name: "宁陵县" }] },

    {
      code: "1791",
      name: "云台山",
      districtList: [] },
    {
      code: "17010011",
      name: "新郑",
      districtList: [] },
    {
      code: "17010012",
      name: "巩义",
      districtList: [] },
    {
      code: "17010015",
      name: "中牟县",
      districtList: [] },
    {
      code: "17010019",
      name: "荥阳",
      districtList: [] },
    {
      code: "17010020",
      name: "新密",
      districtList: [] },
    {
      code: "17010021",
      name: "登封",
      districtList: [] },
    {
      code: "17020008",
      name: "偃师",
      districtList: [] },
    {
      code: "17020009",
      name: "洛宁县",
      districtList: [] },
    {
      code: "17020011",
      name: "伊川县",
      districtList: [] },
    {
      code: "17020012",
      name: "嵩县",
      districtList: [] },
    {
      code: "17020014",
      name: "宜阳县",
      districtList: [] },
    {
      code: "17020015",
      name: "孟津县",
      districtList: [] },
    {
      code: "17020016",
      name: "汝阳县",
      districtList: [] },
    {
      code: "17020018",
      name: "栾川县",
      districtList: [] },
    {
      code: "17020019",
      name: "新安县",
      districtList: [] },
    {
      code: "17040005",
      name: "获嘉县",
      districtList: [] },
    {
      code: "17040006",
      name: "封丘县",
      districtList: [] },
    {
      code: "17040007",
      name: "长垣县",
      districtList: [] },
    {
      code: "17040008",
      name: "原阳县",
      districtList: [] },
    {
      code: "17040009",
      name: "辉县",
      districtList: [] },
    {
      code: "17040011",
      name: "延津县",
      districtList: [] },
    {
      code: "17040012",
      name: "卫辉",
      districtList: [] },
    {
      code: "17050005",
      name: "汝州",
      districtList: [] },
    {
      code: "17050006",
      name: "鲁山县",
      districtList: [] },
    {
      code: "17050007",
      name: "郏县",
      districtList: [] },
    {
      code: "17050008",
      name: "宝丰县",
      districtList: [] },
    {
      code: "17050009",
      name: "叶县",
      districtList: [] },
    {
      code: "17050010",
      name: "舞钢",
      districtList: [] },
    {
      code: "17060004",
      name: "台前县",
      districtList: [] },
    {
      code: "17060005",
      name: "清丰县",
      districtList: [] },
    {
      code: "17060006",
      name: "南乐县",
      districtList: [] },
    {
      code: "17060007",
      name: "范县",
      districtList: [] },
    {
      code: "17070003",
      name: "西峡县",
      districtList: [] },
    {
      code: "17070004",
      name: "内乡县",
      districtList: [] },
    {
      code: "17070005",
      name: "方城县",
      districtList: [] },
    {
      code: "17070006",
      name: "新野县",
      districtList: [] },
    {
      code: "17070007",
      name: "镇平县",
      districtList: [] },
    {
      code: "17070008",
      name: "淅川县",
      districtList: [] },
    {
      code: "17070009",
      name: "社旗县",
      districtList: [] },
    {
      code: "17070010",
      name: "桐柏县",
      districtList: [] },
    {
      code: "17070012",
      name: "唐河县",
      districtList: [] },
    {
      code: "17070013",
      name: "南召县",
      districtList: [] },
    {
      code: "17070014",
      name: "邓州",
      districtList: [] },
    {
      code: "17080002",
      name: "陕县",
      districtList: [] },
    {
      code: "17080003",
      name: "渑池县",
      districtList: [] },
    {
      code: "17080004",
      name: "义马",
      districtList: [] },
    {
      code: "17080006",
      name: "卢氏县",
      districtList: [] },
    {
      code: "17080007",
      name: "灵宝",
      districtList: [] },
    {
      code: "17100007",
      name: "武陟县",
      districtList: [] },
    {
      code: "17100008",
      name: "博爱县",
      districtList: [] },
    {
      code: "17100009",
      name: "温县",
      districtList: [] },
    {
      code: "17100010",
      name: "沁阳",
      districtList: [] },
    {
      code: "17100012",
      name: "孟州",
      districtList: [] },
    {
      code: "17120005",
      name: "浚县",
      districtList: [] },
    {
      code: "17120006",
      name: "淇县",
      districtList: [] },
    {
      code: "17130002",
      name: "长葛",
      districtList: [] },
    {
      code: "17130004",
      name: "禹州",
      districtList: [] },
    {
      code: "17130005",
      name: "鄢陵县",
      districtList: [] },
    {
      code: "17130007",
      name: "襄城县",
      districtList: [] },
    {
      code: "17140002",
      name: "西华县",
      districtList: [] },
    {
      code: "17140003",
      name: "淮阳县",
      districtList: [] },
    {
      code: "17140004",
      name: "鹿邑县",
      districtList: [] },
    {
      code: "17140005",
      name: "扶沟县",
      districtList: [] },
    {
      code: "17140006",
      name: "商水县",
      districtList: [] },
    {
      code: "17140007",
      name: "沈丘县",
      districtList: [] },
    {
      code: "17140008",
      name: "郸城县",
      districtList: [] },
    {
      code: "17140009",
      name: "太康县",
      districtList: [] },
    {
      code: "17140010",
      name: "项城",
      districtList: [] },
    {
      code: "17160005",
      name: "汤阴县",
      districtList: [] },
    {
      code: "17160009",
      name: "内黄县",
      districtList: [] },
    {
      code: "17160010",
      name: "林州",
      districtList: [] },
    {
      code: "17160011",
      name: "滑县",
      districtList: [] },
    {
      code: "17170004",
      name: "舞阳县",
      districtList: [] },
    {
      code: "17170006",
      name: "临颍县",
      districtList: [] },
    {
      code: "17180002",
      name: "平舆县",
      districtList: [] },
    {
      code: "17180003",
      name: "正阳县",
      districtList: [] },
    {
      code: "17180004",
      name: "新蔡县",
      districtList: [] },
    {
      code: "17180005",
      name: "西平县",
      districtList: [] },
    {
      code: "17180006",
      name: "上蔡县",
      districtList: [] },
    {
      code: "17180007",
      name: "确山县",
      districtList: [] },
    {
      code: "17180008",
      name: "泌阳县",
      districtList: [] },
    {
      code: "17180009",
      name: "汝南县",
      districtList: [] },
    {
      code: "17180010",
      name: "遂平县",
      districtList: [] },
    {
      code: "17200003",
      name: "新县",
      districtList: [] },
    {
      code: "17200004",
      name: "光山县",
      districtList: [] },
    {
      code: "17200006",
      name: "罗山县",
      districtList: [] },
    {
      code: "17200008",
      name: "固始县",
      districtList: [] },
    {
      code: "17200009",
      name: "商城县",
      districtList: [] },
    {
      code: "17200011",
      name: "潢川县",
      districtList: [] },
    {
      code: "17200013",
      name: "息县",
      districtList: [] },
    {
      code: "17210003",
      name: "虞城县",
      districtList: [] },
    {
      code: "17210004",
      name: "民权县",
      districtList: [] },
    {
      code: "17210005",
      name: "睢县",
      districtList: [] },
    {
      code: "17210006",
      name: "宁陵县",
      districtList: [] },
    {
      code: "17210007",
      name: "柘城县",
      districtList: [] },
    {
      code: "17210008",
      name: "夏邑县",
      districtList: [] },
    {
      code: "17210009",
      name: "永城",
      districtList: [] }] },

  {
    code: "1800",
    name: "湖北省",
    cityList: [{
      code: "1801",
      name: "武汉",
      districtList: [{
        code: "0016",
        name: "洪山区" },
      {
        code: "0003",
        name: "武昌区" },
      {
        code: "0008",
        name: "江汉区" },
      {
        code: "0015",
        name: "江岸区" },
      {
        code: "0019",
        name: "硚口区" },
      {
        code: "0001",
        name: "汉阳区" },
      {
        code: "0006",
        name: "黄陂区" },
      {
        code: "0014",
        name: "江夏区" },
      {
        code: "0020",
        name: "东西湖区" },
      {
        code: "0005",
        name: "蔡甸区" },
      {
        code: "0004",
        name: "青山区" },
      {
        code: "0018",
        name: "新洲区" },
      {
        code: "0013",
        name: "汉南区" }] },

    {
      code: "1802",
      name: "荆州",
      districtList: [{
        code: "0001",
        name: "沙市区" },
      {
        code: "0002",
        name: "荆州区" },
      {
        code: "0008",
        name: "洪湖市" },
      {
        code: "0003",
        name: "公安县" },
      {
        code: "0004",
        name: "监利县" },
      {
        code: "0007",
        name: "松滋市" },
      {
        code: "0005",
        name: "江陵县" },
      {
        code: "0006",
        name: "石首市" }] },

    {
      code: "1803",
      name: "宜昌",
      districtList: [{
        code: "0007",
        name: "西陵区" },
      {
        code: "0006",
        name: "伍家岗区" },
      {
        code: "0008",
        name: "夷陵区" },
      {
        code: "0009",
        name: "枝江市" },
      {
        code: "0015",
        name: "宜都市" },
      {
        code: "0013",
        name: "长阳土家族自治县" },
      {
        code: "0016",
        name: "秭归县" },
      {
        code: "0019",
        name: "当阳市" },
      {
        code: "0017",
        name: "五峰土家族自治县" },
      {
        code: "0014",
        name: "猇亭区" },
      {
        code: "0011",
        name: "兴山县" },
      {
        code: "0018",
        name: "远安县" },
      {
        code: "0020",
        name: "点军区" }] },

    {
      code: "1807",
      name: "十堰",
      districtList: [{
        code: "0004",
        name: "茅箭区" },
      {
        code: "0003",
        name: "丹江口市" },
      {
        code: "0005",
        name: "张湾区" },
      {
        code: "0010",
        name: "房县" },
      {
        code: "0009",
        name: "竹溪县" },
      {
        code: "0007",
        name: "郧西县" },
      {
        code: "0008",
        name: "竹山县" },
      {
        code: "0006",
        name: "郧阳区" }] },

    {
      code: "1810",
      name: "荆门",
      districtList: [{
        code: "0004",
        name: "东宝区" },
      {
        code: "0003",
        name: "掇刀区" },
      {
        code: "0010",
        name: "钟祥市" },
      {
        code: "0011",
        name: "京山县" },
      {
        code: "0008",
        name: "沙洋县" },
      {
        code: "100759649",
        name: "漳河镇" }] },

    {
      code: "1811",
      name: "恩施土家族苗族自治州",
      districtList: [{
        code: "0002",
        name: "恩施市" },
      {
        code: "0008",
        name: "利川市" },
      {
        code: "0004",
        name: "建始县" },
      {
        code: "0005",
        name: "巴东县" },
      {
        code: "0003",
        name: "来凤县" },
      {
        code: "0001",
        name: "咸丰县" },
      {
        code: "0006",
        name: "宣恩县" },
      {
        code: "0007",
        name: "鹤峰县" }] },

    {
      code: "1814",
      name: "黄石",
      districtList: [{
        code: "0001",
        name: "黄石港区" },
      {
        code: "0002",
        name: "大冶市" },
      {
        code: "0003",
        name: "阳新县" },
      {
        code: "0005",
        name: "下陆区" },
      {
        code: "0004",
        name: "西塞山区" },
      {
        code: "0006",
        name: "铁山区" }] },

    {
      code: "1818",
      name: "鄂州",
      districtList: [{
        code: "0002",
        name: "鄂城区" },
      {
        code: "0001",
        name: "梁子湖区" },
      {
        code: "0003",
        name: "华容区" }] },

    {
      code: "1820",
      name: "咸宁",
      districtList: [{
        code: "0001",
        name: "咸安区" },
      {
        code: "0005",
        name: "赤壁市" },
      {
        code: "0004",
        name: "通山县" },
      {
        code: "0002",
        name: "嘉鱼县" },
      {
        code: "0003",
        name: "崇阳县" },
      {
        code: "0007",
        name: "通城县" }] },

    {
      code: "1822",
      name: "孝感",
      districtList: [{
        code: "0001",
        name: "孝南区" },
      {
        code: "0003",
        name: "汉川市" },
      {
        code: "0002",
        name: "应城市" },
      {
        code: "0006",
        name: "孝昌县" },
      {
        code: "0004",
        name: "大悟县" },
      {
        code: "0005",
        name: "安陆市" },
      {
        code: "0007",
        name: "云梦县" }] },

    {
      code: "1823",
      name: "随州",
      districtList: [{
        code: "0001",
        name: "曾都区" },
      {
        code: "0002",
        name: "广水市" },
      {
        code: "0003",
        name: "随县" }] },

    {
      code: "1830",
      name: "黄冈",
      districtList: [{
        code: "0002",
        name: "黄州区" },
      {
        code: "0001",
        name: "麻城市" },
      {
        code: "0003",
        name: "罗田县" },
      {
        code: "0007",
        name: "黄梅县" },
      {
        code: "0009",
        name: "红安县" },
      {
        code: "0006",
        name: "浠水县" },
      {
        code: "0004",
        name: "武穴市" },
      {
        code: "0005",
        name: "蕲春县" },
      {
        code: "0010",
        name: "英山县" },
      {
        code: "0008",
        name: "团风县" }] },

    {
      code: "1834",
      name: "襄阳",
      districtList: [{
        code: "0001",
        name: "襄城区" },
      {
        code: "0002",
        name: "樊城区" },
      {
        code: "0003",
        name: "襄州区" },
      {
        code: "0005",
        name: "枣阳市" },
      {
        code: "0006",
        name: "谷城县" },
      {
        code: "0004",
        name: "宜城市" },
      {
        code: "0009",
        name: "南漳县" },
      {
        code: "0007",
        name: "老河口市" },
      {
        code: "0010",
        name: "保康县" }] },

    {
      code: "18150001",
      name: "仙桃",
      districtList: [{
        code: "0001",
        name: "仙桃市" }] },

    {
      code: "18290001",
      name: "潜江",
      districtList: [{
        code: "0001",
        name: "潜江市" }] },

    {
      code: "18400001",
      name: "天门",
      districtList: [{
        code: "0001",
        name: "天门市" }] },

    {
      code: "1813",
      name: "神农架",
      districtList: [] },
    {
      code: "1831",
      name: "武当山",
      districtList: [] },
    {
      code: "18020003",
      name: "公安县",
      districtList: [] },
    {
      code: "18020004",
      name: "监利县",
      districtList: [] },
    {
      code: "18020005",
      name: "江陵县",
      districtList: [] },
    {
      code: "18020007",
      name: "松滋",
      districtList: [] },
    {
      code: "18020008",
      name: "洪湖",
      districtList: [] },
    {
      code: "18030009",
      name: "枝江",
      districtList: [] },
    {
      code: "18030011",
      name: "兴山县",
      districtList: [] },
    {
      code: "18030013",
      name: "长阳土家族自治县",
      districtList: [] },
    {
      code: "18030015",
      name: "宜都",
      districtList: [] },
    {
      code: "18030016",
      name: "秭归县",
      districtList: [] },
    {
      code: "18030017",
      name: "五峰土家族自治县",
      districtList: [] },
    {
      code: "18030018",
      name: "远安县",
      districtList: [] },
    {
      code: "18030019",
      name: "当阳",
      districtList: [] },
    {
      code: "18070003",
      name: "丹江口",
      districtList: [] },
    {
      code: "18100008",
      name: "沙洋县",
      districtList: [] },
    {
      code: "18100010",
      name: "钟祥",
      districtList: [] },
    {
      code: "18100011",
      name: "京山县",
      districtList: [] },
    {
      code: "18110004",
      name: "建始县",
      districtList: [] },
    {
      code: "18110005",
      name: "巴东县",
      districtList: [] },
    {
      code: "18110006",
      name: "宣恩县",
      districtList: [] },
    {
      code: "18110007",
      name: "鹤峰县",
      districtList: [] },
    {
      code: "18110008",
      name: "利川",
      districtList: [] },
    {
      code: "18140002",
      name: "大冶",
      districtList: [] },
    {
      code: "18140003",
      name: "阳新县",
      districtList: [] },
    {
      code: "18200002",
      name: "嘉鱼县",
      districtList: [] },
    {
      code: "18200004",
      name: "通山县",
      districtList: [] },
    {
      code: "18200005",
      name: "赤壁",
      districtList: [] },
    {
      code: "18220002",
      name: "应城",
      districtList: [] },
    {
      code: "18220003",
      name: "汉川",
      districtList: [] },
    {
      code: "18220004",
      name: "大悟县",
      districtList: [] },
    {
      code: "18220005",
      name: "安陆",
      districtList: [] },
    {
      code: "18220006",
      name: "孝昌县",
      districtList: [] },
    {
      code: "18220007",
      name: "云梦县",
      districtList: [] },
    {
      code: "18230002",
      name: "广水",
      districtList: [] },
    {
      code: "18300001",
      name: "麻城",
      districtList: [] },
    {
      code: "18300003",
      name: "罗田县",
      districtList: [] },
    {
      code: "18300004",
      name: "武穴",
      districtList: [] },
    {
      code: "18300005",
      name: "蕲春县",
      districtList: [] },
    {
      code: "18300006",
      name: "浠水县",
      districtList: [] },
    {
      code: "18300007",
      name: "黄梅县",
      districtList: [] },
    {
      code: "18300008",
      name: "团风县",
      districtList: [] },
    {
      code: "18300010",
      name: "英山县",
      districtList: [] },
    {
      code: "18340004",
      name: "宜城",
      districtList: [] },
    {
      code: "18340005",
      name: "枣阳",
      districtList: [] },
    {
      code: "18340006",
      name: "谷城县",
      districtList: [] },
    {
      code: "18340007",
      name: "老河口",
      districtList: [] },
    {
      code: "18340009",
      name: "南漳县",
      districtList: [] },
    {
      code: "18340010",
      name: "保康县",
      districtList: [] }] },

  {
    code: "1900",
    name: "湖南省",
    cityList: [{
      code: "1901",
      name: "长沙",
      districtList: [{
        code: "0010",
        name: "芙蓉区" },
      {
        code: "0011",
        name: "天心区" },
      {
        code: "0005",
        name: "雨花区" },
      {
        code: "0012",
        name: "开福区" },
      {
        code: "0006",
        name: "岳麓区" },
      {
        code: "0009",
        name: "望城区" },
      {
        code: "0013",
        name: "长沙县" },
      {
        code: "0008",
        name: "宁乡市" },
      {
        code: "0014",
        name: "浏阳市" }] },

    {
      code: "1902",
      name: "株洲",
      districtList: [{
        code: "0003",
        name: "荷塘区" },
      {
        code: "0004",
        name: "芦淞区" },
      {
        code: "0005",
        name: "天元区" },
      {
        code: "0006",
        name: "醴陵市" },
      {
        code: "0008",
        name: "攸县" },
      {
        code: "0002",
        name: "石峰区" },
      {
        code: "0009",
        name: "茶陵县" },
      {
        code: "0010",
        name: "炎陵县" },
      {
        code: "0007",
        name: "株洲县" }] },

    {
      code: "1903",
      name: "张家界",
      districtList: [{
        code: "0010",
        name: "武陵源区" },
      {
        code: "0011",
        name: "永定区" },
      {
        code: "0008",
        name: "慈利县" },
      {
        code: "0009",
        name: "桑植县" }] },

    {
      code: "1904",
      name: "岳阳",
      districtList: [{
        code: "0003",
        name: "岳阳楼区" },
      {
        code: "0006",
        name: "汨罗市" },
      {
        code: "0010",
        name: "华容县" },
      {
        code: "0009",
        name: "平江县" },
      {
        code: "0011",
        name: "湘阴县" },
      {
        code: "0007",
        name: "临湘市" },
      {
        code: "0008",
        name: "岳阳县" },
      {
        code: "0004",
        name: "云溪区" },
      {
        code: "0005",
        name: "君山区" }] },

    {
      code: "1906",
      name: "湘潭",
      districtList: [{
        code: "0005",
        name: "雨湖区" },
      {
        code: "0004",
        name: "岳塘区" },
      {
        code: "0006",
        name: "湘潭县" },
      {
        code: "0007",
        name: "湘乡市" },
      {
        code: "0009",
        name: "韶山市" }] },

    {
      code: "1907",
      name: "郴州",
      districtList: [{
        code: "0004",
        name: "北湖区" },
      {
        code: "0008",
        name: "宜章县" },
      {
        code: "0003",
        name: "资兴市" },
      {
        code: "0005",
        name: "苏仙区" },
      {
        code: "0007",
        name: "桂阳县" },
      {
        code: "0011",
        name: "汝城县" },
      {
        code: "0006",
        name: "永兴县" },
      {
        code: "0013",
        name: "安仁县" },
      {
        code: "0012",
        name: "桂东县" },
      {
        code: "0009",
        name: "嘉禾县" },
      {
        code: "0010",
        name: "临武县" }] },

    {
      code: "1910",
      name: "常德",
      districtList: [{
        code: "0003",
        name: "武陵区" },
      {
        code: "0004",
        name: "鼎城区" },
      {
        code: "0006",
        name: "澧县" },
      {
        code: "0002",
        name: "汉寿县" },
      {
        code: "0009",
        name: "石门县" },
      {
        code: "0008",
        name: "桃源县" },
      {
        code: "0005",
        name: "安乡县" },
      {
        code: "0007",
        name: "临澧县" },
      {
        code: "0010",
        name: "津市市" }] },

    {
      code: "1918",
      name: "衡阳",
      districtList: [{
        code: "0002",
        name: "南岳区" },
      {
        code: "0008",
        name: "蒸湘区" },
      {
        code: "0014",
        name: "耒阳市" },
      {
        code: "0007",
        name: "石鼓区" },
      {
        code: "0003",
        name: "衡山县" },
      {
        code: "0006",
        name: "雁峰区" },
      {
        code: "0005",
        name: "珠晖区" },
      {
        code: "0004",
        name: "衡阳县" },
      {
        code: "0011",
        name: "祁东县" },
      {
        code: "0012",
        name: "常宁市" },
      {
        code: "0010",
        name: "衡东县" },
      {
        code: "0009",
        name: "衡南县" }] },

    {
      code: "1920",
      name: "益阳",
      districtList: [{
        code: "0002",
        name: "赫山区" },
      {
        code: "0005",
        name: "沅江市" },
      {
        code: "0004",
        name: "桃江县" },
      {
        code: "0003",
        name: "南县" },
      {
        code: "0008",
        name: "安化县" },
      {
        code: "0006",
        name: "资阳区" }] },

    {
      code: "1921",
      name: "怀化",
      districtList: [{
        code: "0002",
        name: "鹤城区" },
      {
        code: "0004",
        name: "沅陵县" },
      {
        code: "0013",
        name: "洪江市" },
      {
        code: "0006",
        name: "溆浦县" },
      {
        code: "0011",
        name: "靖州苗族侗族自治县" },
      {
        code: "0010",
        name: "芷江侗族自治县" },
      {
        code: "0012",
        name: "通道侗族自治县" },
      {
        code: "0008",
        name: "麻阳苗族自治县" },
      {
        code: "0005",
        name: "辰溪县" },
      {
        code: "0007",
        name: "会同县" },
      {
        code: "0009",
        name: "新晃侗族自治县" },
      {
        code: "0003",
        name: "中方县" }] },

    {
      code: "1923",
      name: "永州",
      districtList: [{
        code: "0012",
        name: "冷水滩区" },
      {
        code: "0006",
        name: "道县" },
      {
        code: "0008",
        name: "宁远县" },
      {
        code: "0002",
        name: "零陵区" },
      {
        code: "0004",
        name: "东安县" },
      {
        code: "0003",
        name: "祁阳县" },
      {
        code: "0011",
        name: "江华瑶族自治县" },
      {
        code: "0010",
        name: "新田县" },
      {
        code: "0005",
        name: "双牌县" },
      {
        code: "0009",
        name: "蓝山县" },
      {
        code: "0007",
        name: "江永县" }] },

    {
      code: "1924",
      name: "邵阳",
      districtList: [{
        code: "0005",
        name: "邵东县" },
      {
        code: "0003",
        name: "大祥区" },
      {
        code: "0008",
        name: "隆回县" },
      {
        code: "0011",
        name: "新宁县" },
      {
        code: "0009",
        name: "洞口县" },
      {
        code: "0002",
        name: "双清区" },
      {
        code: "0010",
        name: "绥宁县" },
      {
        code: "0013",
        name: "武冈市" },
      {
        code: "0004",
        name: "北塔区" },
      {
        code: "0012",
        name: "城步苗族自治县" },
      {
        code: "0007",
        name: "邵阳县" },
      {
        code: "0006",
        name: "新邵县" }] },

    {
      code: "1928",
      name: "娄底",
      districtList: [{
        code: "0002",
        name: "娄星区" },
      {
        code: "0004",
        name: "新化县" },
      {
        code: "0006",
        name: "涟源市" },
      {
        code: "0003",
        name: "双峰县" },
      {
        code: "0005",
        name: "冷水江市" }] },

    {
      code: "1937",
      name: "湘西土家族苗族自治州",
      districtList: [{
        code: "0008",
        name: "凤凰县" },
      {
        code: "0007",
        name: "吉首市" },
      {
        code: "0005",
        name: "永顺县" },
      {
        code: "0002",
        name: "花垣县" },
      {
        code: "0006",
        name: "龙山县" },
      {
        code: "0001",
        name: "泸溪县" },
      {
        code: "0004",
        name: "古丈县" },
      {
        code: "0003",
        name: "保靖县" }] },

    {
      code: "19010008",
      name: "宁乡县",
      districtList: [] },
    {
      code: "19010013",
      name: "长沙县",
      districtList: [] },
    {
      code: "19010014",
      name: "浏阳",
      districtList: [] },
    {
      code: "19020006",
      name: "醴陵",
      districtList: [] },
    {
      code: "19020008",
      name: "攸县",
      districtList: [] },
    {
      code: "19020009",
      name: "茶陵县",
      districtList: [] },
    {
      code: "19020010",
      name: "炎陵县",
      districtList: [] },
    {
      code: "19040006",
      name: "汨罗",
      districtList: [] },
    {
      code: "19040007",
      name: "临湘",
      districtList: [] },
    {
      code: "19040009",
      name: "平江县",
      districtList: [] },
    {
      code: "19040010",
      name: "华容县",
      districtList: [] },
    {
      code: "19040011",
      name: "湘阴县",
      districtList: [] },
    {
      code: "19060007",
      name: "湘乡",
      districtList: [] },
    {
      code: "19060009",
      name: "韶山",
      districtList: [] },
    {
      code: "19070003",
      name: "资兴",
      districtList: [] },
    {
      code: "19070006",
      name: "永兴县",
      districtList: [] },
    {
      code: "19070007",
      name: "桂阳县",
      districtList: [] },
    {
      code: "19070008",
      name: "宜章县",
      districtList: [] },
    {
      code: "19070013",
      name: "安仁县",
      districtList: [] },
    {
      code: "19180003",
      name: "衡山县",
      districtList: [] },
    {
      code: "19180014",
      name: "耒阳",
      districtList: [] },
    {
      code: "19210003",
      name: "中方县",
      districtList: [] },
    {
      code: "19210004",
      name: "沅陵县",
      districtList: [] },
    {
      code: "19210005",
      name: "辰溪县",
      districtList: [] },
    {
      code: "19210006",
      name: "溆浦县",
      districtList: [] },
    {
      code: "19210007",
      name: "会同县",
      districtList: [] },
    {
      code: "19210008",
      name: "麻阳苗族自治县",
      districtList: [] },
    {
      code: "19210009",
      name: "新晃侗族自治县",
      districtList: [] },
    {
      code: "19210010",
      name: "芷江侗族自治县",
      districtList: [] },
    {
      code: "19210011",
      name: "靖州苗族侗族自治县",
      districtList: [] },
    {
      code: "19210012",
      name: "通道侗族自治县",
      districtList: [] },
    {
      code: "19210013",
      name: "洪江",
      districtList: [] },
    {
      code: "19240005",
      name: "邵东县",
      districtList: [] },
    {
      code: "19240006",
      name: "新邵县",
      districtList: [] },
    {
      code: "19240007",
      name: "邵阳县",
      districtList: [] },
    {
      code: "19240008",
      name: "隆回县",
      districtList: [] },
    {
      code: "19240009",
      name: "洞口县",
      districtList: [] },
    {
      code: "19240010",
      name: "绥宁县",
      districtList: [] },
    {
      code: "19240011",
      name: "新宁县",
      districtList: [] },
    {
      code: "19240012",
      name: "城步苗族自治县",
      districtList: [] },
    {
      code: "19240013",
      name: "武冈",
      districtList: [] },
    {
      code: "19280003",
      name: "双峰县",
      districtList: [] },
    {
      code: "19280004",
      name: "新化县",
      districtList: [] },
    {
      code: "19280005",
      name: "冷水江",
      districtList: [] },
    {
      code: "19280006",
      name: "涟源",
      districtList: [] },
    {
      code: "19370002",
      name: "花垣县",
      districtList: [] },
    {
      code: "19370004",
      name: "古丈县",
      districtList: [] },
    {
      code: "19370005",
      name: "永顺县",
      districtList: [] },
    {
      code: "19370006",
      name: "龙山县",
      districtList: [] },
    {
      code: "19370007",
      name: "吉首",
      districtList: [] },
    {
      code: "19370008",
      name: "凤凰县",
      districtList: [] }] },

  {
    code: "2000",
    name: "广东省",
    cityList: [{
      code: "2001",
      name: "广州",
      districtList: [{
        code: "0009",
        name: "番禺区" },
      {
        code: "0001",
        name: "天河区" },
      {
        code: "0008",
        name: "白云区" },
      {
        code: "0003",
        name: "越秀区" },
      {
        code: "0017",
        name: "从化区" },
      {
        code: "0005",
        name: "海珠区" },
      {
        code: "0010",
        name: "花都区" },
      {
        code: "0002",
        name: "荔湾区" },
      {
        code: "0012",
        name: "增城区" },
      {
        code: "0014",
        name: "黄埔区" },
      {
        code: "0015",
        name: "南沙区" }] },

    {
      code: "2002",
      name: "汕头",
      districtList: [{
        code: "0001",
        name: "龙湖区" },
      {
        code: "0002",
        name: "金平区" },
      {
        code: "0004",
        name: "潮南区" },
      {
        code: "0006",
        name: "澄海区" },
      {
        code: "0007",
        name: "南澳县" },
      {
        code: "0003",
        name: "潮阳区" },
      {
        code: "0005",
        name: "濠江区" }] },

    {
      code: "2003",
      name: "深圳",
      districtList: [{
        code: "0001",
        name: "福田区" },
      {
        code: "0002",
        name: "罗湖区" },
      {
        code: "0004",
        name: "南山区" },
      {
        code: "0006",
        name: "宝安区" },
      {
        code: "0011",
        name: "龙华区" },
      {
        code: "0007",
        name: "龙岗区" },
      {
        code: "0010",
        name: "大鹏新区" },
      {
        code: "0005",
        name: "盐田区" },
      {
        code: "0008",
        name: "光明新区" },
      {
        code: "0009",
        name: "坪山区" }] },

    {
      code: "2004",
      name: "珠海",
      districtList: [{
        code: "0003",
        name: "香洲区" },
      {
        code: "0007",
        name: "金湾区" },
      {
        code: "0006",
        name: "斗门区" }] },

    {
      code: "2005",
      name: "佛山",
      districtList: [{
        code: "0003",
        name: "南海区" },
      {
        code: "0004",
        name: "顺德区" },
      {
        code: "0001",
        name: "禅城区" },
      {
        code: "0005",
        name: "三水区" },
      {
        code: "0002",
        name: "高明区" }] },

    {
      code: "2006",
      name: "揭阳",
      districtList: [{
        code: "0002",
        name: "普宁市" },
      {
        code: "0004",
        name: "榕城区" },
      {
        code: "0003",
        name: "揭东县" },
      {
        code: "0005",
        name: "揭西县" },
      {
        code: "0006",
        name: "惠来县" }] },

    {
      code: "2007",
      name: "东莞",
      districtList: [{
        code: "0008",
        name: "常平镇" },
      {
        code: "0005",
        name: "长安镇" },
      {
        code: "0001",
        name: "厚街镇" },
      {
        code: "0021",
        name: "大朗镇" },
      {
        code: "0009",
        name: "塘厦镇" },
      {
        code: "0003",
        name: "虎门镇" },
      {
        code: "0024",
        name: "清溪镇" },
      {
        code: "0013",
        name: "东城" },
      {
        code: "0010",
        name: "寮步镇" },
      {
        code: "0012",
        name: "凤岗镇" },
      {
        code: "0022",
        name: "石碣镇" },
      {
        code: "0029",
        name: "高埗镇" },
      {
        code: "0019",
        name: "大岭山镇" },
      {
        code: "0006",
        name: "黄江镇" },
      {
        code: "0018",
        name: "万江镇" },
      {
        code: "0032",
        name: "横沥镇" },
      {
        code: "0023",
        name: "桥头镇" },
      {
        code: "0014",
        name: "南城街道" },
      {
        code: "0004",
        name: "樟木头镇" },
      {
        code: "0030",
        name: "中堂镇" },
      {
        code: "0016",
        name: "茶山镇" },
      {
        code: "0026",
        name: "东坑镇" },
      {
        code: "0035",
        name: "道滘镇" },
      {
        code: "0002",
        name: "莞城" },
      {
        code: "0011",
        name: "石龙镇" },
      {
        code: "0034",
        name: "麻涌镇" },
      {
        code: "0017",
        name: "石排镇" },
      {
        code: "0033",
        name: "谢岗镇" },
      {
        code: "0025",
        name: "企石镇" },
      {
        code: "0031",
        name: "沙田镇" },
      {
        code: "0027",
        name: "洪梅镇" },
      {
        code: "0028",
        name: "望牛墩镇" }] },

    {
      code: "2009",
      name: "茂名",
      districtList: [{
        code: "0001",
        name: "茂南区" },
      {
        code: "0005",
        name: "化州市" },
      {
        code: "0004",
        name: "高州市" },
      {
        code: "0003",
        name: "电白区" },
      {
        code: "0006",
        name: "信宜市" }] },

    {
      code: "2010",
      name: "惠州",
      districtList: [{
        code: "0001",
        name: "惠城区" },
      {
        code: "0003",
        name: "惠东县" },
      {
        code: "0002",
        name: "惠阳区" },
      {
        code: "0004",
        name: "博罗县" },
      {
        code: "0005",
        name: "龙门县" }] },

    {
      code: "2011",
      name: "中山",
      districtList: [{
        code: "0023",
        name: "坦洲镇" },
      {
        code: "0007",
        name: "小榄镇" },
      {
        code: "0005",
        name: "石岐街道" },
      {
        code: "0014",
        name: "沙溪镇" },
      {
        code: "0008",
        name: "三乡镇" },
      {
        code: "0006",
        name: "中山火炬高技术产业开发区" },
      {
        code: "0018",
        name: "东凤镇" },
      {
        code: "0001",
        name: "东区街道" },
      {
        code: "0011",
        name: "横栏镇" },
      {
        code: "0017",
        name: "南头镇" },
      {
        code: "0012",
        name: "东升镇" },
      {
        code: "0015",
        name: "大涌镇" },
      {
        code: "0020",
        name: "三角镇" },
      {
        code: "0002",
        name: "西区街道" },
      {
        code: "0021",
        name: "民众镇" },
      {
        code: "0019",
        name: "阜沙镇" },
      {
        code: "0022",
        name: "南朗镇" },
      {
        code: "0016",
        name: "黄圃镇" },
      {
        code: "0024",
        name: "板芙镇" },
      {
        code: "0003",
        name: "南区街道" },
      {
        code: "0013",
        name: "港口镇" },
      {
        code: "0010",
        name: "五桂山" },
      {
        code: "0025",
        name: "神湾镇" },
      {
        code: "0009",
        name: "古镇镇" }] },

    {
      code: "2013",
      name: "肇庆",
      districtList: [{
        code: "0001",
        name: "端州区" },
      {
        code: "0003",
        name: "四会市" },
      {
        code: "0004",
        name: "高要区" },
      {
        code: "0006",
        name: "怀集县" },
      {
        code: "0002",
        name: "鼎湖区" },
      {
        code: "0007",
        name: "封开县" },
      {
        code: "0008",
        name: "德庆县" },
      {
        code: "0005",
        name: "广宁县" }] },

    {
      code: "2014",
      name: "湛江",
      districtList: [{
        code: "0002",
        name: "霞山区" },
      {
        code: "0006",
        name: "雷州市" },
      {
        code: "0001",
        name: "赤坎区" },
      {
        code: "0005",
        name: "廉江市" },
      {
        code: "0009",
        name: "徐闻县" },
      {
        code: "0007",
        name: "吴川市" },
      {
        code: "0008",
        name: "遂溪县" },
      {
        code: "0004",
        name: "麻章区" },
      {
        code: "0003",
        name: "坡头区" }] },

    {
      code: "2016",
      name: "潮州",
      districtList: [{
        code: "0005",
        name: "湘桥区" },
      {
        code: "0002",
        name: "潮安县" },
      {
        code: "0003",
        name: "饶平县" }] },

    {
      code: "2020",
      name: "阳江",
      districtList: [{
        code: "0004",
        name: "阳江城区" },
      {
        code: "0005",
        name: "阳西县" },
      {
        code: "0006",
        name: "阳春市" },
      {
        code: "0003",
        name: "阳东区" }] },

    {
      code: "2021",
      name: "江门",
      districtList: [{
        code: "0008",
        name: "蓬江区" },
      {
        code: "0005",
        name: "台山市" },
      {
        code: "0007",
        name: "开平市" },
      {
        code: "0006",
        name: "鹤山市" },
      {
        code: "0002",
        name: "新会区" },
      {
        code: "0003",
        name: "恩平市" },
      {
        code: "0010",
        name: "江海区" }] },

    {
      code: "2026",
      name: "河源",
      districtList: [{
        code: "0001",
        name: "源城区" },
      {
        code: "0002",
        name: "紫金县" },
      {
        code: "0003",
        name: "龙川县" },
      {
        code: "0005",
        name: "和平县" },
      {
        code: "0006",
        name: "东源县" },
      {
        code: "0004",
        name: "连平县" }] },

    {
      code: "2027",
      name: "清远",
      districtList: [{
        code: "0001",
        name: "清城区" },
      {
        code: "0002",
        name: "英德市" },
      {
        code: "0003",
        name: "连州市" },
      {
        code: "0004",
        name: "佛冈县" },
      {
        code: "0005",
        name: "阳山县" },
      {
        code: "0009",
        name: "连南瑶族自治县" },
      {
        code: "0010",
        name: "连山壮族瑶族自治县" },
      {
        code: "0006",
        name: "清新区" }] },

    {
      code: "2028",
      name: "梅州",
      districtList: [{
        code: "0001",
        name: "梅江区" },
      {
        code: "0009",
        name: "梅县区" },
      {
        code: "0006",
        name: "五华县" },
      {
        code: "0005",
        name: "兴宁市" },
      {
        code: "0008",
        name: "丰顺县" },
      {
        code: "0003",
        name: "大埔县" },
      {
        code: "0004",
        name: "平远县" },
      {
        code: "0007",
        name: "蕉岭县" }] },

    {
      code: "2030",
      name: "韶关",
      districtList: [{
        code: "0008",
        name: "仁化县" },
      {
        code: "0004",
        name: "浈江区" },
      {
        code: "0001",
        name: "武江区" },
      {
        code: "0010",
        name: "新丰县" },
      {
        code: "0003",
        name: "曲江区" },
      {
        code: "0009",
        name: "翁源县" },
      {
        code: "0005",
        name: "乐昌市" },
      {
        code: "0006",
        name: "南雄市" },
      {
        code: "0011",
        name: "乳源瑶族自治县" },
      {
        code: "0007",
        name: "始兴县" }] },

    {
      code: "2040",
      name: "汕尾",
      districtList: [{
        code: "0002",
        name: "海丰县" },
      {
        code: "0001",
        name: "城区" },
      {
        code: "0004",
        name: "陆丰市" },
      {
        code: "0003",
        name: "陆河县" }] },

    {
      code: "2041",
      name: "云浮",
      districtList: [{
        code: "0001",
        name: "云城区" },
      {
        code: "0004",
        name: "罗定市" },
      {
        code: "0002",
        name: "新兴县" },
      {
        code: "0003",
        name: "郁南县" },
      {
        code: "0005",
        name: "云安区" }] },

    {
      code: "20060002",
      name: "普宁",
      districtList: [] },
    {
      code: "20210003",
      name: "恩平",
      districtList: [] },
    {
      code: "20210005",
      name: "台山",
      districtList: [] },
    {
      code: "20210006",
      name: "鹤山",
      districtList: [] },
    {
      code: "20210007",
      name: "开平",
      districtList: [] }] },

  {
    code: "2100",
    name: "广西壮族自治区",
    cityList: [{
      code: "2101",
      name: "桂林",
      districtList: [{
        code: "0024",
        name: "阳朔县" },
      {
        code: "0010",
        name: "象山区" },
      {
        code: "0007",
        name: "七星区" },
      {
        code: "0005",
        name: "龙胜各族自治县" },
      {
        code: "0013",
        name: "叠彩区" },
      {
        code: "0009",
        name: "秀峰区" },
      {
        code: "0015",
        name: "灵川县" },
      {
        code: "0018",
        name: "临桂县" },
      {
        code: "0003",
        name: "兴安县" },
      {
        code: "0017",
        name: "恭城瑶族自治县" },
      {
        code: "0023",
        name: "全州县" },
      {
        code: "0012",
        name: "荔浦县" },
      {
        code: "0006",
        name: "雁山区" },
      {
        code: "0008",
        name: "资源县" },
      {
        code: "0016",
        name: "永福县" },
      {
        code: "0022",
        name: "平乐县" },
      {
        code: "0021",
        name: "灌阳县" }] },

    {
      code: "2102",
      name: "南宁",
      districtList: [{
        code: "0010",
        name: "青秀区" },
      {
        code: "0008",
        name: "西乡塘区" },
      {
        code: "0006",
        name: "兴宁区" },
      {
        code: "0005",
        name: "江南区" },
      {
        code: "0007",
        name: "良庆区" },
      {
        code: "0013",
        name: "武鸣区" },
      {
        code: "0011",
        name: "宾阳县" },
      {
        code: "0012",
        name: "上林县" },
      {
        code: "0017",
        name: "横县" },
      {
        code: "0015",
        name: "隆安县" },
      {
        code: "0016",
        name: "马山县" },
      {
        code: "0014",
        name: "邕宁区" }] },

    {
      code: "2103",
      name: "北海",
      districtList: [{
        code: "0008",
        name: "海城区" },
      {
        code: "0009",
        name: "银海区" },
      {
        code: "0010",
        name: "合浦县" },
      {
        code: "0011",
        name: "铁山港区" }] },

    {
      code: "2104",
      name: "玉林",
      districtList: [{
        code: "0006",
        name: "玉州区" },
      {
        code: "0004",
        name: "北流市" },
      {
        code: "0005",
        name: "博白县" },
      {
        code: "0010",
        name: "容县" },
      {
        code: "0011",
        name: "陆川县" },
      {
        code: "0009",
        name: "兴业县" }] },

    {
      code: "2105",
      name: "柳州",
      districtList: [{
        code: "0005",
        name: "柳南区" },
      {
        code: "0004",
        name: "鱼峰区" },
      {
        code: "0008",
        name: "三江侗族自治县" },
      {
        code: "0003",
        name: "柳北区" },
      {
        code: "0006",
        name: "城中区" },
      {
        code: "0013",
        name: "融水苗族自治县" },
      {
        code: "0012",
        name: "鹿寨县" },
      {
        code: "0011",
        name: "柳城县" },
      {
        code: "0009",
        name: "融安县" },
      {
        code: "0010",
        name: "柳江区" }] },

    {
      code: "2107",
      name: "贺州",
      districtList: [{
        code: "0002",
        name: "八步区" },
      {
        code: "0003",
        name: "昭平县" },
      {
        code: "0005",
        name: "富川瑶族自治县" },
      {
        code: "0004",
        name: "钟山县" }] },

    {
      code: "2108",
      name: "梧州",
      districtList: [{
        code: "0002",
        name: "藤县" },
      {
        code: "0003",
        name: "岑溪市" },
      {
        code: "0004",
        name: "长洲区" },
      {
        code: "0009",
        name: "苍梧县" },
      {
        code: "0005",
        name: "万秀区" },
      {
        code: "0007",
        name: "蒙山县" }] },

    {
      code: "2109",
      name: "钦州",
      districtList: [{
        code: "0006",
        name: "灵山县" },
      {
        code: "0003",
        name: "浦北县" },
      {
        code: "100107107",
        name: "钦州" },
      {
        code: "0004",
        name: "钦南区" },
      {
        code: "0005",
        name: "钦北区" }] },

    {
      code: "2111",
      name: "贵港",
      districtList: [{
        code: "0004",
        name: "港北区" },
      {
        code: "0002",
        name: "桂平市" },
      {
        code: "0003",
        name: "平南县" },
      {
        code: "0006",
        name: "覃塘区" },
      {
        code: "0005",
        name: "港南区" }] },

    {
      code: "2112",
      name: "百色",
      districtList: [{
        code: "0006",
        name: "右江区" },
      {
        code: "0001",
        name: "靖西市" },
      {
        code: "0005",
        name: "平果县" },
      {
        code: "0011",
        name: "田东县" },
      {
        code: "0003",
        name: "德保县" },
      {
        code: "0009",
        name: "田林县" },
      {
        code: "0010",
        name: "田阳县" },
      {
        code: "0004",
        name: "乐业县" },
      {
        code: "0012",
        name: "那坡县" },
      {
        code: "0007",
        name: "凌云县" },
      {
        code: "0013",
        name: "隆林各族自治县" },
      {
        code: "0008",
        name: "西林县" }] },

    {
      code: "2113",
      name: "防城港",
      districtList: [{
        code: "0002",
        name: "东兴市" },
      {
        code: "0004",
        name: "港口区" },
      {
        code: "0003",
        name: "防城区" },
      {
        code: "0005",
        name: "上思县" }] },

    {
      code: "2118",
      name: "来宾",
      districtList: [{
        code: "0005",
        name: "兴宾区" },
      {
        code: "0004",
        name: "武宣县" },
      {
        code: "0002",
        name: "金秀瑶族自治县" },
      {
        code: "0003",
        name: "象州县" },
      {
        code: "0007",
        name: "合山市" },
      {
        code: "0006",
        name: "忻城县" }] },

    {
      code: "2119",
      name: "河池",
      districtList: [{
        code: "0003",
        name: "巴马瑶族自治县" },
      {
        code: "0006",
        name: "金城江区" },
      {
        code: "0004",
        name: "宜州区" },
      {
        code: "0012",
        name: "大化瑶族自治县" },
      {
        code: "0008",
        name: "南丹县" },
      {
        code: "0002",
        name: "凤山县" },
      {
        code: "0009",
        name: "都安瑶族自治县" },
      {
        code: "0010",
        name: "罗城仫佬族自治县" },
      {
        code: "0007",
        name: "天峨县" },
      {
        code: "0011",
        name: "环江毛南族自治县" },
      {
        code: "0005",
        name: "东兰县" }] },

    {
      code: "2130",
      name: "崇左",
      districtList: [{
        code: "0001",
        name: "大新县" },
      {
        code: "0002",
        name: "凭祥市" },
      {
        code: "0005",
        name: "扶绥县" },
      {
        code: "0006",
        name: "龙州县" },
      {
        code: "0004",
        name: "宁明县" },
      {
        code: "0007",
        name: "天等县" },
      {
        code: "0003",
        name: "江州区" }] },

    {
      code: "2129",
      name: "涠洲岛",
      districtList: [] },
    {
      code: "21010003",
      name: "兴安县",
      districtList: [] },
    {
      code: "21010005",
      name: "龙胜各族自治县",
      districtList: [] },
    {
      code: "21010008",
      name: "资源县",
      districtList: [] },
    {
      code: "21010017",
      name: "恭城瑶族自治县",
      districtList: [] },
    {
      code: "21010024",
      name: "阳朔县",
      districtList: [] },
    {
      code: "21110002",
      name: "桂平",
      districtList: [] },
    {
      code: "21120003",
      name: "德保县",
      districtList: [] },
    {
      code: "21130002",
      name: "东兴",
      districtList: [] },
    {
      code: "21190002",
      name: "凤山县",
      districtList: [] },
    {
      code: "21190003",
      name: "巴马瑶族自治县",
      districtList: [] },
    {
      code: "21190004",
      name: "宜州",
      districtList: [] },
    {
      code: "21300001",
      name: "大新县",
      districtList: [] },
    {
      code: "21300002",
      name: "凭祥",
      districtList: [] }] },

  {
    code: "2200",
    name: "海南省",
    cityList: [{
      code: "2201",
      name: "三亚",
      districtList: [{
        code: "0024",
        name: "吉阳区" },
      {
        code: "0025",
        name: "海棠区" },
      {
        code: "0023",
        name: "天涯区" },
      {
        code: "0022",
        name: "崖州区" }] },

    {
      code: "2202",
      name: "海口",
      districtList: [{
        code: "0004",
        name: "龙华区" },
      {
        code: "0002",
        name: "美兰区" },
      {
        code: "0003",
        name: "琼山区" },
      {
        code: "0005",
        name: "秀英区" }] },

    {
      code: "22030011",
      name: "万宁",
      districtList: [{
        code: "0011",
        name: "万宁市" },
      {
        code: "100759602",
        name: "东澳镇" },
      {
        code: "100759655",
        name: "龙滚镇" },
      {
        code: "100759672",
        name: "礼纪镇" },
      {
        code: "100759784",
        name: "万城镇" }] },

    {
      code: "22060005",
      name: "琼海",
      districtList: [{
        code: "0005",
        name: "琼海市" }] },

    {
      code: "22070001",
      name: "陵水黎族自治县",
      districtList: [{
        code: "0001",
        name: "陵水黎族自治县" }] },

    {
      code: "22120007",
      name: "文昌",
      districtList: [{
        code: "0007",
        name: "文昌市" }] },

    {
      code: "22130001",
      name: "五指山",
      districtList: [{
        code: "0001",
        name: "五指山市" }] },

    {
      code: "22140004",
      name: "保亭黎族苗族自治县",
      districtList: [{
        code: "0004",
        name: "保亭黎族苗族自治县" }] },

    {
      code: "22150003",
      name: "定安县",
      districtList: [{
        code: "0003",
        name: "定安县" }] },

    {
      code: "22180003",
      name: "东方",
      districtList: [{
        code: "0003",
        name: "东方市" }] },

    {
      code: "22190006",
      name: "乐东黎族自治县",
      districtList: [{
        code: "0006",
        name: "乐东黎族自治县" },
      {
        code: "100757055",
        name: "尖峰岭" },
      {
        code: "100759552",
        name: "抱由镇" },
      {
        code: "100759603",
        name: "黄流镇" },
      {
        code: "100759631",
        name: "佛罗镇" }] },

    {
      code: "22230002",
      name: "琼中黎族苗族自治县",
      districtList: [{
        code: "0002",
        name: "琼中黎族苗族自治县" }] },

    {
      code: "22240012",
      name: "澄迈县",
      districtList: [{
        code: "0012",
        name: "澄迈县" }] },

    {
      code: "22260002",
      name: "屯昌县",
      districtList: [{
        code: "0002",
        name: "屯昌县" }] },

    {
      code: "22270002",
      name: "临高县",
      districtList: [{
        code: "0002",
        name: "临高县" }] },

    {
      code: "22280002",
      name: "白沙黎族自治县",
      districtList: [{
        code: "0002",
        name: "白沙黎族自治县" }] },

    {
      code: "2216",
      name: "儋州",
      districtList: [] },
    {
      code: "2220",
      name: "博鳌",
      districtList: [] },
    {
      code: "2222",
      name: "七仙岭",
      districtList: [] },
    {
      code: "2229",
      name: "三沙",
      districtList: [] }] },

  {
    code: "2300",
    name: "四川省",
    cityList: [{
      code: "2301",
      name: "成都",
      districtList: [{
        code: "0003",
        name: "武侯区" },
      {
        code: "0001",
        name: "锦江区" },
      {
        code: "0002",
        name: "青羊区" },
      {
        code: "0005",
        name: "成华区" },
      {
        code: "0004",
        name: "金牛区" },
      {
        code: "0008",
        name: "双流区" },
      {
        code: "0014",
        name: "都江堰市" },
      {
        code: "0017",
        name: "郫都区" },
      {
        code: "0007",
        name: "龙泉驿区" },
      {
        code: "0011",
        name: "新都区" },
      {
        code: "0009",
        name: "温江区" },
      {
        code: "0018",
        name: "崇州市" },
      {
        code: "0015",
        name: "大邑县" },
      {
        code: "0016",
        name: "邛崃市" },
      {
        code: "0019",
        name: "彭州市" },
      {
        code: "0022",
        name: "金堂县" },
      {
        code: "0013",
        name: "青白江区" },
      {
        code: "0012",
        name: "新津县" },
      {
        code: "0010",
        name: "蒲江县" },
      {
        code: "0025",
        name: "简阳市" }] },

    {
      code: "2302",
      name: "绵阳",
      districtList: [{
        code: "0001",
        name: "涪城区" },
      {
        code: "0010",
        name: "江油市" },
      {
        code: "0011",
        name: "三台县" },
      {
        code: "0003",
        name: "游仙区" },
      {
        code: "0006",
        name: "安州区" },
      {
        code: "0012",
        name: "盐亭县" },
      {
        code: "0005",
        name: "梓潼县" },
      {
        code: "0007",
        name: "北川羌族自治县" },
      {
        code: "0009",
        name: "平武县" }] },

    {
      code: "2303",
      name: "乐山",
      districtList: [{
        code: "0001",
        name: "乐山市中区" },
      {
        code: "0012",
        name: "峨眉山市" },
      {
        code: "0002",
        name: "沙湾区" },
      {
        code: "0003",
        name: "五通桥区" },
      {
        code: "0008",
        name: "犍为县" },
      {
        code: "0006",
        name: "夹江县" },
      {
        code: "0009",
        name: "井研县" },
      {
        code: "0010",
        name: "沐川县" },
      {
        code: "0005",
        name: "峨边彝族自治县" },
      {
        code: "0011",
        name: "马边彝族自治县" },
      {
        code: "0007",
        name: "金口河区" }] },

    {
      code: "2304",
      name: "眉山",
      districtList: [{
        code: "0001",
        name: "东坡区" },
      {
        code: "0004",
        name: "洪雅县" },
      {
        code: "0003",
        name: "仁寿县" },
      {
        code: "0002",
        name: "彭山区" },
      {
        code: "0007",
        name: "丹棱县" },
      {
        code: "0006",
        name: "青神县" }] },

    {
      code: "2305",
      name: "自贡",
      districtList: [{
        code: "0002",
        name: "自流井区" },
      {
        code: "0005",
        name: "富顺县" },
      {
        code: "0003",
        name: "大安区" },
      {
        code: "0007",
        name: "荣县" },
      {
        code: "0004",
        name: "贡井区" },
      {
        code: "0006",
        name: "沿滩区" }] },

    {
      code: "2306",
      name: "雅安",
      districtList: [{
        code: "0001",
        name: "雨城区" },
      {
        code: "0006",
        name: "名山区" },
      {
        code: "0007",
        name: "汉源县" },
      {
        code: "0005",
        name: "宝兴县" },
      {
        code: "0009",
        name: "石棉县" },
      {
        code: "0003",
        name: "天全县" },
      {
        code: "0010",
        name: "芦山县" },
      {
        code: "0008",
        name: "荥经县" },
      {
        code: "100759490",
        name: "孔坪乡" }] },

    {
      code: "2308",
      name: "宜宾",
      districtList: [{
        code: "0001",
        name: "翠屏区" },
      {
        code: "0003",
        name: "长宁县" },
      {
        code: "0012",
        name: "宜宾县" },
      {
        code: "0007",
        name: "兴文县" },
      {
        code: "0008",
        name: "南溪区" },
      {
        code: "0014",
        name: "珙县" },
      {
        code: "0010",
        name: "江安县" },
      {
        code: "0006",
        name: "高县" },
      {
        code: "0016",
        name: "屏山县" },
      {
        code: "0015",
        name: "筠连县" }] },

    {
      code: "2309",
      name: "南充",
      districtList: [{
        code: "0001",
        name: "顺庆区" },
      {
        code: "0005",
        name: "南部县" },
      {
        code: "0004",
        name: "阆中市" },
      {
        code: "0009",
        name: "仪陇县" },
      {
        code: "0007",
        name: "营山县" },
      {
        code: "0008",
        name: "蓬安县" },
      {
        code: "0002",
        name: "高坪区" },
      {
        code: "0003",
        name: "嘉陵区" },
      {
        code: "0006",
        name: "西充县" }] },

    {
      code: "2312",
      name: "德阳",
      districtList: [{
        code: "0002",
        name: "旌阳区" },
      {
        code: "0004",
        name: "绵竹市" },
      {
        code: "0003",
        name: "广汉市" },
      {
        code: "0005",
        name: "中江县" },
      {
        code: "0001",
        name: "什邡市" },
      {
        code: "0006",
        name: "罗江区" }] },

    {
      code: "2313",
      name: "广安",
      districtList: [{
        code: "0003",
        name: "广安区" },
      {
        code: "0001",
        name: "岳池县" },
      {
        code: "0002",
        name: "邻水县" },
      {
        code: "0004",
        name: "华蓥市" },
      {
        code: "0006",
        name: "武胜县" }] },

    {
      code: "2314",
      name: "泸州",
      districtList: [{
        code: "0001",
        name: "江阳区" },
      {
        code: "0003",
        name: "龙马潭区" },
      {
        code: "0006",
        name: "合江县" },
      {
        code: "0004",
        name: "古蔺县" },
      {
        code: "0008",
        name: "叙永县" },
      {
        code: "0007",
        name: "纳溪区" },
      {
        code: "0005",
        name: "泸县" }] },

    {
      code: "2315",
      name: "遂宁",
      districtList: [{
        code: "0001",
        name: "船山区" },
      {
        code: "0002",
        name: "大英县" },
      {
        code: "0003",
        name: "射洪县" },
      {
        code: "0005",
        name: "蓬溪县" },
      {
        code: "0004",
        name: "安居区" }] },

    {
      code: "2319",
      name: "内江",
      districtList: [{
        code: "0001",
        name: "内江市中区" },
      {
        code: "0002",
        name: "东兴区" },
      {
        code: "0004",
        name: "威远县" },
      {
        code: "0003",
        name: "隆昌市" },
      {
        code: "0005",
        name: "资中县" }] },

    {
      code: "2320",
      name: "广元",
      districtList: [{
        code: "0005",
        name: "利州区" },
      {
        code: "0003",
        name: "剑阁县" },
      {
        code: "0004",
        name: "苍溪县" },
      {
        code: "0009",
        name: "青川县" },
      {
        code: "0006",
        name: "旺苍县" },
      {
        code: "0010",
        name: "昭化区" },
      {
        code: "0008",
        name: "朝天区" },
      {
        code: "100759492",
        name: "剑门关镇" }] },

    {
      code: "2321",
      name: "攀枝花",
      districtList: [{
        code: "0001",
        name: "东区" },
      {
        code: "0005",
        name: "仁和区" },
      {
        code: "0004",
        name: "西区" },
      {
        code: "0002",
        name: "盐边县" },
      {
        code: "0003",
        name: "米易县" }] },

    {
      code: "2333",
      name: "巴中",
      districtList: [{
        code: "0004",
        name: "巴州区" },
      {
        code: "0002",
        name: "南江县" },
      {
        code: "0005",
        name: "通江县" },
      {
        code: "0003",
        name: "平昌县" },
      {
        code: "0006",
        name: "恩阳区" }] },

    {
      code: "2340",
      name: "达州",
      districtList: [{
        code: "0002",
        name: "通川区" },
      {
        code: "0001",
        name: "大竹县" },
      {
        code: "0006",
        name: "宣汉县" },
      {
        code: "0005",
        name: "万源市" },
      {
        code: "0003",
        name: "渠县" },
      {
        code: "0007",
        name: "开江县" },
      {
        code: "0004",
        name: "达川区" }] },

    {
      code: "2341",
      name: "凉山彝族自治州",
      districtList: [{
        code: "0017",
        name: "西昌市" },
      {
        code: "0002",
        name: "会理县" },
      {
        code: "0005",
        name: "会东县" },
      {
        code: "0011",
        name: "冕宁县" },
      {
        code: "0001",
        name: "盐源县" },
      {
        code: "0004",
        name: "德昌县" },
      {
        code: "0015",
        name: "雷波县" },
      {
        code: "0003",
        name: "宁南县" },
      {
        code: "0012",
        name: "越西县" },
      {
        code: "0006",
        name: "木里藏族自治县" },
      {
        code: "0009",
        name: "金阳县" },
      {
        code: "0010",
        name: "昭觉县" },
      {
        code: "0013",
        name: "甘洛县" },
      {
        code: "0008",
        name: "布拖县" },
      {
        code: "0007",
        name: "普格县" },
      {
        code: "0014",
        name: "美姑县" },
      {
        code: "1006",
        name: "喜德县" }] },

    {
      code: "2382",
      name: "资阳",
      districtList: [{
        code: "0003",
        name: "雁江区" },
      {
        code: "0002",
        name: "安岳县" },
      {
        code: "0004",
        name: "乐至县" }] },

    {
      code: "2392",
      name: "甘孜藏族自治州",
      districtList: [{
        code: "0001",
        name: "康定市" },
      {
        code: "0004",
        name: "泸定县" },
      {
        code: "0003",
        name: "丹巴县" },
      {
        code: "0008",
        name: "九龙县" },
      {
        code: "0009",
        name: "雅江县" },
      {
        code: "0002",
        name: "稻城县" },
      {
        code: "0010",
        name: "道孚县" },
      {
        code: "0011",
        name: "炉霍县" },
      {
        code: "0007",
        name: "甘孜县" },
      {
        code: "0012",
        name: "新龙县" },
      {
        code: "0013",
        name: "德格县" },
      {
        code: "0014",
        name: "白玉县" },
      {
        code: "0015",
        name: "石渠县" },
      {
        code: "0016",
        name: "色达县" },
      {
        code: "0017",
        name: "理塘县" },
      {
        code: "0005",
        name: "巴塘县" },
      {
        code: "0006",
        name: "乡城县" },
      {
        code: "0018",
        name: "得荣县" }] },

    {
      code: "2395",
      name: "阿坝藏族羌族自治州",
      districtList: [{
        code: "0010",
        name: "九寨沟县" },
      {
        code: "0005",
        name: "松潘县" },
      {
        code: "0014",
        name: "理县" },
      {
        code: "0012",
        name: "若尔盖县" },
      {
        code: "0013",
        name: "茂县" },
      {
        code: "0009",
        name: "汶川县" },
      {
        code: "0007",
        name: "小金县" },
      {
        code: "0006",
        name: "黑水县" },
      {
        code: "0008",
        name: "红原县" },
      {
        code: "0002",
        name: "金川县" },
      {
        code: "0011",
        name: "马尔康市" },
      {
        code: "0001",
        name: "阿坝县" },
      {
        code: "0003",
        name: "壤塘县" }] },

    {
      code: "2323",
      name: "卧龙景区",
      districtList: [] },
    {
      code: "2328",
      name: "海螺沟",
      districtList: [] },
    {
      code: "2361",
      name: "康定新都桥",
      districtList: [] },
    {
      code: "2384",
      name: "黄龙溪古镇",
      districtList: [] },
    {
      code: "23010008",
      name: "双流县",
      districtList: [] },
    {
      code: "23010010",
      name: "蒲江县",
      districtList: [] },
    {
      code: "23010014",
      name: "都江堰",
      districtList: [] },
    {
      code: "23010015",
      name: "大邑县",
      districtList: [] },
    {
      code: "23010016",
      name: "邛崃市",
      districtList: [] },
    {
      code: "23010019",
      name: "彭州",
      districtList: [] },
    {
      code: "23010025",
      name: "简阳",
      districtList: [] },
    {
      code: "23020007",
      name: "北川羌族自治县",
      districtList: [] },
    {
      code: "23020010",
      name: "江油",
      districtList: [] },
    {
      code: "23030012",
      name: "峨眉山",
      districtList: [] },
    {
      code: "23040003",
      name: "仁寿县",
      districtList: [] },
    {
      code: "23060005",
      name: "宝兴县",
      districtList: [] },
    {
      code: "23090004",
      name: "阆中",
      districtList: [] },
    {
      code: "23120001",
      name: "什邡",
      districtList: [] },
    {
      code: "23120003",
      name: "广汉",
      districtList: [] },
    {
      code: "23120005",
      name: "中江县",
      districtList: [] },
    {
      code: "23150003",
      name: "射洪县",
      districtList: [] },
    {
      code: "23410017",
      name: "西昌",
      districtList: [] },
    {
      code: "23920001",
      name: "康定县",
      districtList: [] },
    {
      code: "23920002",
      name: "稻城县",
      districtList: [] },
    {
      code: "23920003",
      name: "丹巴县",
      districtList: [] },
    {
      code: "23920004",
      name: "泸定县",
      districtList: [] },
    {
      code: "23950006",
      name: "黑水县",
      districtList: [] },
    {
      code: "23950007",
      name: "小金县",
      districtList: [] },
    {
      code: "23950008",
      name: "红原县",
      districtList: [] },
    {
      code: "23950009",
      name: "汶川县",
      districtList: [] },
    {
      code: "23950010",
      name: "九寨沟县",
      districtList: [] },
    {
      code: "23950011",
      name: "马尔康县",
      districtList: [] },
    {
      code: "23950012",
      name: "若尔盖县",
      districtList: [] },
    {
      code: "23950013",
      name: "茂县",
      districtList: [] },
    {
      code: "23950014",
      name: "理县",
      districtList: [] }] },

  {
    code: "2400",
    name: "贵州省",
    cityList: [{
      code: "2401",
      name: "贵阳",
      districtList: [{
        code: "0002",
        name: "云岩区" },
      {
        code: "0003",
        name: "南明区" },
      {
        code: "0015",
        name: "观山湖区" },
      {
        code: "0004",
        name: "白云区" },
      {
        code: "0007",
        name: "花溪区" },
      {
        code: "0006",
        name: "乌当区" },
      {
        code: "0013",
        name: "清镇市" },
      {
        code: "0011",
        name: "修文县" },
      {
        code: "0009",
        name: "开阳县" },
      {
        code: "0010",
        name: "息烽县" }] },

    {
      code: "2402",
      name: "遵义",
      districtList: [{
        code: "0001",
        name: "红花岗区" },
      {
        code: "0002",
        name: "汇川区" },
      {
        code: "0016",
        name: "播州区" },
      {
        code: "0004",
        name: "赤水市" },
      {
        code: "0003",
        name: "仁怀市" },
      {
        code: "0007",
        name: "习水县" },
      {
        code: "0006",
        name: "桐梓县" },
      {
        code: "0013",
        name: "凤冈县" },
      {
        code: "0014",
        name: "湄潭县" },
      {
        code: "0010",
        name: "绥阳县" },
      {
        code: "0015",
        name: "余庆县" },
      {
        code: "0008",
        name: "正安县" },
      {
        code: "0011",
        name: "道真仡佬族苗族自治县" },
      {
        code: "0012",
        name: "务川仡佬族苗族自治县" }] },

    {
      code: "2405",
      name: "安顺",
      districtList: [{
        code: "0003",
        name: "西秀区" },
      {
        code: "0005",
        name: "镇宁布依族苗族自治县" },
      {
        code: "0008",
        name: "关岭布依族苗族自治县" },
      {
        code: "0006",
        name: "平坝区" },
      {
        code: "0007",
        name: "普定县" },
      {
        code: "0002",
        name: "紫云苗族布依族自治县" }] },

    {
      code: "2412",
      name: "六盘水",
      districtList: [{
        code: "0005",
        name: "钟山区" },
      {
        code: "0004",
        name: "盘州市" },
      {
        code: "0006",
        name: "六枝特区" },
      {
        code: "0003",
        name: "水城县" }] },

    {
      code: "2413",
      name: "铜仁",
      districtList: [{
        code: "0002",
        name: "碧江区" },
      {
        code: "0003",
        name: "江口县" },
      {
        code: "0006",
        name: "思南县" },
      {
        code: "0005",
        name: "石阡县" },
      {
        code: "0010",
        name: "松桃苗族自治县" },
      {
        code: "0008",
        name: "德江县" },
      {
        code: "0009",
        name: "沿河土家族自治县" },
      {
        code: "0004",
        name: "玉屏侗族自治县" },
      {
        code: "0007",
        name: "印江土家族苗族自治县" },
      {
        code: "0012",
        name: "万山区" }] },

    {
      code: "2414",
      name: "毕节",
      districtList: [{
        code: "0003",
        name: "七星关区" },
      {
        code: "0005",
        name: "黔西县" },
      {
        code: "0007",
        name: "威宁彝族回族苗族自治县" },
      {
        code: "0009",
        name: "织金县" },
      {
        code: "0002",
        name: "金沙县" },
      {
        code: "0004",
        name: "大方县" },
      {
        code: "0008",
        name: "赫章县" },
      {
        code: "0006",
        name: "纳雍县" }] },

    {
      code: "2430",
      name: "黔南布依族苗族自治州",
      districtList: [{
        code: "0009",
        name: "荔波县" },
      {
        code: "0008",
        name: "都匀市" },
      {
        code: "0010",
        name: "独山县" },
      {
        code: "0006",
        name: "惠水县" },
      {
        code: "0012",
        name: "福泉市" },
      {
        code: "0007",
        name: "三都水族自治县" },
      {
        code: "0001",
        name: "贵定县" },
      {
        code: "0004",
        name: "罗甸县" },
      {
        code: "0002",
        name: "瓮安县" },
      {
        code: "0003",
        name: "平塘县" },
      {
        code: "0011",
        name: "长顺县" },
      {
        code: "0005",
        name: "龙里县" }] },

    {
      code: "2431",
      name: "黔西南布依族苗族自治州",
      districtList: [{
        code: "0009",
        name: "兴义市" },
      {
        code: "0008",
        name: "安龙县" },
      {
        code: "0001",
        name: "兴仁县" },
      {
        code: "0004",
        name: "贞丰县" },
      {
        code: "0002",
        name: "普安县" },
      {
        code: "0006",
        name: "册亨县" },
      {
        code: "0005",
        name: "望谟县" },
      {
        code: "0003",
        name: "晴隆县" }] },

    {
      code: "2432",
      name: "黔东南苗族侗族自治州",
      districtList: [{
        code: "0014",
        name: "镇远县" },
      {
        code: "0013",
        name: "凯里市" },
      {
        code: "0011",
        name: "雷山县" },
      {
        code: "0015",
        name: "黎平县" },
      {
        code: "0005",
        name: "天柱县" },
      {
        code: "0009",
        name: "榕江县" },
      {
        code: "0010",
        name: "从江县" },
      {
        code: "0006",
        name: "锦屏县" },
      {
        code: "0016",
        name: "麻江县" },
      {
        code: "0002",
        name: "施秉县" },
      {
        code: "0012",
        name: "丹寨县" },
      {
        code: "0003",
        name: "三穗县" },
      {
        code: "0007",
        name: "剑河县" },
      {
        code: "0001",
        name: "黄平县" },
      {
        code: "0004",
        name: "岑巩县" },
      {
        code: "0008",
        name: "台江县" }] },

    {
      code: "2427",
      name: "西江苗寨",
      districtList: [] },
    {
      code: "24020003",
      name: "仁怀",
      districtList: [] },
    {
      code: "24020004",
      name: "赤水",
      districtList: [] },
    {
      code: "24300008",
      name: "都匀",
      districtList: [] },
    {
      code: "24300009",
      name: "荔波县",
      districtList: [] },
    {
      code: "24310008",
      name: "安龙县",
      districtList: [] },
    {
      code: "24320013",
      name: "凯里",
      districtList: [] },
    {
      code: "24320014",
      name: "镇远县",
      districtList: [] },
    {
      code: "24320015",
      name: "黎平县",
      districtList: [] },
    {
      code: "24320016",
      name: "麻江县",
      districtList: [] }] },

  {
    code: "2500",
    name: "云南省",
    cityList: [{
      code: "2501",
      name: "昆明",
      districtList: [{
        code: "0003",
        name: "官渡区" },
      {
        code: "0004",
        name: "西山区" },
      {
        code: "0002",
        name: "五华区" },
      {
        code: "0001",
        name: "盘龙区" },
      {
        code: "0009",
        name: "呈贡区" },
      {
        code: "0012",
        name: "石林彝族自治县" },
      {
        code: "0019",
        name: "晋宁区" },
      {
        code: "0006",
        name: "安宁市" },
      {
        code: "0005",
        name: "宜良县" },
      {
        code: "0014",
        name: "东川区" },
      {
        code: "0011",
        name: "嵩明县" },
      {
        code: "0013",
        name: "寻甸回族彝族自治县" },
      {
        code: "0015",
        name: "富民县" },
      {
        code: "0016",
        name: "禄劝彝族苗族自治县" }] },

    {
      code: "2503",
      name: "丽江",
      districtList: [{
        code: "0001",
        name: "丽江古城" },
      {
        code: "0005",
        name: "玉龙纳西族自治县" },
      {
        code: "0004",
        name: "宁蒗彝族自治县" },
      {
        code: "0003",
        name: "永胜县" },
      {
        code: "0002",
        name: "华坪县" }] },

    {
      code: "2505",
      name: "大理白族自治州",
      districtList: [{
        code: "0001",
        name: "大理市" },
      {
        code: "100761294",
        name: "双廊镇" },
      {
        code: "0013",
        name: "洱源县" },
      {
        code: "0006",
        name: "漾濞彝族自治县" },
      {
        code: "0005",
        name: "宾川县" },
      {
        code: "0014",
        name: "剑川县" },
      {
        code: "0010",
        name: "巍山彝族回族自治县" },
      {
        code: "0007",
        name: "祥云县" },
      {
        code: "0008",
        name: "弥渡县" },
      {
        code: "0004",
        name: "鹤庆县" },
      {
        code: "0011",
        name: "永平县" },
      {
        code: "0009",
        name: "南涧彝族自治县" },
      {
        code: "0012",
        name: "云龙县" },
      {
        code: "100759556",
        name: "喜洲" }] },

    {
      code: "2507",
      name: "西双版纳傣族自治州",
      districtList: [{
        code: "0001",
        name: "景洪市" },
      {
        code: "0002",
        name: "勐腊县" },
      {
        code: "0003",
        name: "勐海县" }] },

    {
      code: "2510",
      name: "保山",
      districtList: [{
        code: "0006",
        name: "腾冲市" },
      {
        code: "0002",
        name: "隆阳区" },
      {
        code: "0004",
        name: "龙陵县" },
      {
        code: "0005",
        name: "昌宁县" },
      {
        code: "0003",
        name: "施甸县" }] },

    {
      code: "2511",
      name: "临沧",
      districtList: [{
        code: "0002",
        name: "临翔区" },
      {
        code: "0008",
        name: "耿马傣族佤族自治县" },
      {
        code: "0003",
        name: "凤庆县" },
      {
        code: "0004",
        name: "云县" },
      {
        code: "0005",
        name: "永德县" },
      {
        code: "0009",
        name: "沧源佤族自治县" },
      {
        code: "0006",
        name: "镇康县" },
      {
        code: "0007",
        name: "双江拉祜族佤族布朗族傣族自治县" }] },

    {
      code: "2513",
      name: "文山壮族苗族自治州",
      districtList: [{
        code: "0001",
        name: "文山市" },
      {
        code: "0007",
        name: "丘北县" },
      {
        code: "0008",
        name: "广南县" },
      {
        code: "0003",
        name: "砚山县" },
      {
        code: "0002",
        name: "富宁县" },
      {
        code: "0005",
        name: "麻栗坡县" },
      {
        code: "0006",
        name: "马关县" },
      {
        code: "0004",
        name: "西畴县" }] },

    {
      code: "2516",
      name: "德宏傣族景颇族自治州",
      districtList: [{
        code: "0005",
        name: "瑞丽市" },
      {
        code: "0001",
        name: "芒市" },
      {
        code: "0003",
        name: "盈江县" },
      {
        code: "0002",
        name: "梁河县" },
      {
        code: "0004",
        name: "陇川县" }] },

    {
      code: "2517",
      name: "红河哈尼族彝族自治州",
      districtList: [{
        code: "0003",
        name: "元阳县" },
      {
        code: "0004",
        name: "建水县" },
      {
        code: "0001",
        name: "蒙自市" },
      {
        code: "0011",
        name: "个旧市" },
      {
        code: "0005",
        name: "石屏县" },
      {
        code: "0009",
        name: "开远市" },
      {
        code: "0008",
        name: "河口瑶族自治县" },
      {
        code: "0007",
        name: "红河县" },
      {
        code: "0006",
        name: "金平苗族瑶族傣族自治县" },
      {
        code: "0014",
        name: "屏边苗族自治县" },
      {
        code: "0010",
        name: "泸西县" },
      {
        code: "0012",
        name: "绿春县" },
      {
        code: "0013",
        name: "弥勒市" }] },

    {
      code: "2518",
      name: "楚雄彝族自治州",
      districtList: [{
        code: "0001",
        name: "楚雄市" },
      {
        code: "0010",
        name: "武定县" },
      {
        code: "0002",
        name: "禄丰县" },
      {
        code: "0003",
        name: "元谋县" },
      {
        code: "0008",
        name: "大姚县" },
      {
        code: "0009",
        name: "永仁县" },
      {
        code: "0005",
        name: "牟定县" },
      {
        code: "0007",
        name: "姚安县" },
      {
        code: "0006",
        name: "南华县" },
      {
        code: "0004",
        name: "双柏县" }] },

    {
      code: "2522",
      name: "曲靖",
      districtList: [{
        code: "0001",
        name: "麒麟区" },
      {
        code: "0003",
        name: "罗平县" },
      {
        code: "0002",
        name: "陆良县" },
      {
        code: "0005",
        name: "宣威市" },
      {
        code: "0006",
        name: "会泽县" },
      {
        code: "0008",
        name: "师宗县" },
      {
        code: "0009",
        name: "富源县" },
      {
        code: "0007",
        name: "沾益区" },
      {
        code: "0004",
        name: "马龙区" }] },

    {
      code: "2523",
      name: "玉溪",
      districtList: [{
        code: "0001",
        name: "红塔区" },
      {
        code: "0002",
        name: "澄江县" },
      {
        code: "0008",
        name: "新平彝族傣族自治县" },
      {
        code: "0003",
        name: "江川区" },
      {
        code: "0004",
        name: "通海县" },
      {
        code: "0006",
        name: "易门县" },
      {
        code: "0007",
        name: "峨山彝族自治县" },
      {
        code: "0005",
        name: "华宁县" },
      {
        code: "0009",
        name: "元江哈尼族彝族傣族自治县" }] },

    {
      code: "2527",
      name: "怒江傈僳族自治州",
      districtList: [{
        code: "0001",
        name: "泸水市" },
      {
        code: "0003",
        name: "贡山独龙族怒族自治县" },
      {
        code: "0004",
        name: "兰坪白族普米族自治县" },
      {
        code: "0002",
        name: "福贡县" }] },

    {
      code: "2529",
      name: "普洱",
      districtList: [{
        code: "0001",
        name: "思茅区" },
      {
        code: "0002",
        name: "景谷傣族彝族自治县" },
      {
        code: "0010",
        name: "澜沧拉祜族自治县" },
      {
        code: "0006",
        name: "景东彝族自治县" },
      {
        code: "0005",
        name: "墨江哈尼族自治县" },
      {
        code: "0003",
        name: "西盟佤族自治县" },
      {
        code: "0008",
        name: "江城哈尼族彝族自治县" },
      {
        code: "0004",
        name: "宁洱哈尼族彝族自治县" },
      {
        code: "0007",
        name: "镇沅彝族哈尼族拉祜族自治县" },
      {
        code: "0009",
        name: "孟连傣族拉祜族佤族自治县" }] },

    {
      code: "2530",
      name: "昭通",
      districtList: [{
        code: "0003",
        name: "昭阳区" },
      {
        code: "0001",
        name: "水富县" },
      {
        code: "0007",
        name: "大关县" },
      {
        code: "0008",
        name: "永善县" },
      {
        code: "0009",
        name: "绥江县" },
      {
        code: "0006",
        name: "盐津县" },
      {
        code: "0005",
        name: "巧家县" },
      {
        code: "0010",
        name: "镇雄县" },
      {
        code: "0012",
        name: "威信县" },
      {
        code: "0011",
        name: "彝良县" },
      {
        code: "0004",
        name: "鲁甸县" }] },

    {
      code: "2560",
      name: "迪庆藏族自治州",
      districtList: [{
        code: "0001",
        name: "香格里拉市" },
      {
        code: "0003",
        name: "德钦县" },
      {
        code: "0002",
        name: "维西傈僳族自治县" }] },

    {
      code: "2574",
      name: "双廊古镇",
      districtList: [] },
    {
      code: "2582",
      name: "普者黑景区",
      districtList: [] },
    {
      code: "25010005",
      name: "宜良县",
      districtList: [] },
    {
      code: "25010006",
      name: "安宁",
      districtList: [] },
    {
      code: "25010011",
      name: "嵩明县",
      districtList: [] },
    {
      code: "25010012",
      name: "石林彝族自治县",
      districtList: [] },
    {
      code: "25010013",
      name: "寻甸回族彝族自治县",
      districtList: [] },
    {
      code: "25010014",
      name: "东川区",
      districtList: [] },
    {
      code: "25010015",
      name: "富民县",
      districtList: [] },
    {
      code: "25010016",
      name: "禄劝彝族苗族自治县",
      districtList: [] },
    {
      code: "25010019",
      name: "晋宁县",
      districtList: [] },
    {
      code: "25100006",
      name: "腾冲县",
      districtList: [] },
    {
      code: "25130002",
      name: "富宁县",
      districtList: [] },
    {
      code: "25130007",
      name: "丘北县",
      districtList: [] },
    {
      code: "25130008",
      name: "广南县",
      districtList: [] },
    {
      code: "25160001",
      name: "芒市",
      districtList: [] },
    {
      code: "25160005",
      name: "瑞丽",
      districtList: [] },
    {
      code: "25170001",
      name: "蒙自",
      districtList: [] },
    {
      code: "25170003",
      name: "元阳县",
      districtList: [] },
    {
      code: "25170004",
      name: "建水县",
      districtList: [] },
    {
      code: "25170005",
      name: "石屏县",
      districtList: [] },
    {
      code: "25170008",
      name: "河口瑶族自治县",
      districtList: [] },
    {
      code: "25170009",
      name: "开远",
      districtList: [] },
    {
      code: "25170010",
      name: "泸西县",
      districtList: [] },
    {
      code: "25170011",
      name: "个旧",
      districtList: [] },
    {
      code: "25170013",
      name: "弥勒县",
      districtList: [] },
    {
      code: "25170014",
      name: "屏边苗族自治县",
      districtList: [] },
    {
      code: "25180010",
      name: "武定县",
      districtList: [] },
    {
      code: "25220002",
      name: "陆良县",
      districtList: [] },
    {
      code: "25220003",
      name: "罗平县",
      districtList: [] },
    {
      code: "25220004",
      name: "马龙县",
      districtList: [] },
    {
      code: "25220005",
      name: "宣威",
      districtList: [] },
    {
      code: "25220006",
      name: "会泽县",
      districtList: [] },
    {
      code: "25220007",
      name: "沾益县",
      districtList: [] },
    {
      code: "25220008",
      name: "师宗县",
      districtList: [] },
    {
      code: "25220009",
      name: "富源县",
      districtList: [] },
    {
      code: "25230002",
      name: "澄江县",
      districtList: [] },
    {
      code: "25230003",
      name: "江川县",
      districtList: [] },
    {
      code: "25230004",
      name: "通海县",
      districtList: [] },
    {
      code: "25230008",
      name: "新平彝族傣族自治县",
      districtList: [] },
    {
      code: "25230009",
      name: "元江哈尼族彝族傣族自治县",
      districtList: [] },
    {
      code: "25300001",
      name: "水富县",
      districtList: [] },
    {
      code: "25300005",
      name: "巧家县",
      districtList: [] },
    {
      code: "25300008",
      name: "永善县",
      districtList: [] },
    {
      code: "25600001",
      name: "香格里拉县",
      districtList: [] },
    {
      code: "25600002",
      name: "维西傈僳族自治县",
      districtList: [] },
    {
      code: "25600003",
      name: "德钦县",
      districtList: [] }] },

  {
    code: "2600",
    name: "西藏自治区",
    cityList: [{
      code: "2601",
      name: "拉萨",
      districtList: [{
        code: "0003",
        name: "城关区" },
      {
        code: "0009",
        name: "堆龙德庆区" },
      {
        code: "0006",
        name: "当雄县" },
      {
        code: "0007",
        name: "尼木县" },
      {
        code: "0010",
        name: "达孜区" },
      {
        code: "0005",
        name: "林周县" },
      {
        code: "0008",
        name: "曲水县" },
      {
        code: "0011",
        name: "墨竹工卡县" }] },

    {
      code: "2603",
      name: "林芝地区",
      districtList: [{
        code: "0001",
        name: "林芝县" },
      {
        code: "0002",
        name: "波密县" },
      {
        code: "0004",
        name: "米林县" },
      {
        code: "0006",
        name: "察隅县" },
      {
        code: "0005",
        name: "墨脱县" },
      {
        code: "0003",
        name: "工布江达县" },
      {
        code: "0007",
        name: "朗县" }] },

    {
      code: "2604",
      name: "日喀则地区",
      districtList: [{
        code: "0001",
        name: "日喀则市" },
      {
        code: "0016",
        name: "聂拉木县" },
      {
        code: "0004",
        name: "定日县" },
      {
        code: "0003",
        name: "江孜县" },
      {
        code: "0014",
        name: "亚东县" },
      {
        code: "0017",
        name: "萨嘎县" },
      {
        code: "0015",
        name: "吉隆县" },
      {
        code: "0006",
        name: "拉孜县" },
      {
        code: "0007",
        name: "昂仁县" },
      {
        code: "0005",
        name: "萨迦县" },
      {
        code: "0013",
        name: "仲巴县" },
      {
        code: "0018",
        name: "岗巴县" },
      {
        code: "0002",
        name: "南木林县" },
      {
        code: "0010",
        name: "仁布县" },
      {
        code: "0011",
        name: "康马县" },
      {
        code: "0009",
        name: "白朗县" },
      {
        code: "0012",
        name: "定结县" },
      {
        code: "0008",
        name: "谢通门县" }] },

    {
      code: "2606",
      name: "昌都地区",
      districtList: [{
        code: "0009",
        name: "芒康县" },
      {
        code: "0007",
        name: "八宿县" },
      {
        code: "0001",
        name: "昌都县" },
      {
        code: "0008",
        name: "左贡县" },
      {
        code: "0005",
        name: "丁青县" },
      {
        code: "0004",
        name: "类乌齐县" },
      {
        code: "0002",
        name: "江达县" },
      {
        code: "0010",
        name: "洛隆县" },
      {
        code: "0011",
        name: "边坝县" },
      {
        code: "0006",
        name: "察雅县" },
      {
        code: "0003",
        name: "贡觉县" }] },

    {
      code: "2607",
      name: "山南地区",
      districtList: [{
        code: "0001",
        name: "乃东区" },
      {
        code: "0002",
        name: "扎囊县" },
      {
        code: "0009",
        name: "加查县" },
      {
        code: "0003",
        name: "贡嘎县" },
      {
        code: "0010",
        name: "隆子县" },
      {
        code: "0007",
        name: "措美县" },
      {
        code: "0011",
        name: "错那县" },
      {
        code: "0012",
        name: "浪卡子县" },
      {
        code: "0008",
        name: "洛扎县" },
      {
        code: "0006",
        name: "曲松县" },
      {
        code: "0004",
        name: "桑日县" }] },

    {
      code: "2609",
      name: "那曲地区",
      districtList: [{
        code: "0002",
        name: "安多县" },
      {
        code: "0010",
        name: "尼玛县" },
      {
        code: "0007",
        name: "索县" },
      {
        code: "0009",
        name: "巴青县" },
      {
        code: "0008",
        name: "班戈县" },
      {
        code: "0003",
        name: "嘉黎县" },
      {
        code: "0005",
        name: "聂荣县" },
      {
        code: "0004",
        name: "比如县" },
      {
        code: "0001",
        name: "色尼区" },
      {
        code: "0006",
        name: "申扎县" }] },

    {
      code: "2611",
      name: "阿里地区",
      districtList: [{
        code: "0004",
        name: "噶尔县" },
      {
        code: "0002",
        name: "普兰县" },
      {
        code: "0003",
        name: "札达县" },
      {
        code: "0008",
        name: "措勤县" },
      {
        code: "0005",
        name: "日土县" },
      {
        code: "0007",
        name: "改则县" },
      {
        code: "0006",
        name: "革吉县" }] },

    {
      code: "26030002",
      name: "波密县",
      districtList: [] },
    {
      code: "26060007",
      name: "八宿县",
      districtList: [] },
    {
      code: "26060009",
      name: "芒康县",
      districtList: [] }] },

  {
    code: "2700",
    name: "陕西省",
    cityList: [{
      code: "2701",
      name: "西安",
      districtList: [{
        code: "0021",
        name: "雁塔区" },
      {
        code: "0023",
        name: "未央区" },
      {
        code: "0026",
        name: "长安区" },
      {
        code: "0025",
        name: "碑林区" },
      {
        code: "0020",
        name: "莲湖区" },
      {
        code: "0022",
        name: "新城区" },
      {
        code: "0031",
        name: "灞桥区" },
      {
        code: "0035",
        name: "鄠邑区" },
      {
        code: "0030",
        name: "临潼区" },
      {
        code: "0038",
        name: "蓝田县" },
      {
        code: "0037",
        name: "周至县" },
      {
        code: "0015",
        name: "阎良区" },
      {
        code: "0039",
        name: "高陵区" }] },

    {
      code: "2702",
      name: "宝鸡",
      districtList: [{
        code: "0001",
        name: "渭滨区" },
      {
        code: "0009",
        name: "眉县" },
      {
        code: "0002",
        name: "金台区" },
      {
        code: "0008",
        name: "岐山县" },
      {
        code: "0005",
        name: "扶风县" },
      {
        code: "0013",
        name: "陇县" },
      {
        code: "0010",
        name: "凤翔县" },
      {
        code: "0007",
        name: "凤县" },
      {
        code: "0003",
        name: "陈仓区" },
      {
        code: "0014",
        name: "太白县" },
      {
        code: "0011",
        name: "千阳县" },
      {
        code: "0012",
        name: "麟游县" }] },

    {
      code: "2703",
      name: "咸阳",
      districtList: [{
        code: "0002",
        name: "渭城区" },
      {
        code: "0001",
        name: "秦都区" },
      {
        code: "0003",
        name: "兴平市" },
      {
        code: "0009",
        name: "礼泉县" },
      {
        code: "0004",
        name: "彬县" },
      {
        code: "0005",
        name: "乾县" },
      {
        code: "0008",
        name: "泾阳县" },
      {
        code: "0007",
        name: "三原县" },
      {
        code: "0010",
        name: "永寿县" },
      {
        code: "0014",
        name: "武功县" },
      {
        code: "0012",
        name: "旬邑县" },
      {
        code: "0006",
        name: "杨凌区" },
      {
        code: "0013",
        name: "淳化县" },
      {
        code: "0011",
        name: "长武县" }] },

    {
      code: "2705",
      name: "延安",
      districtList: [{
        code: "0001",
        name: "宝塔区" },
      {
        code: "0007",
        name: "志丹县" },
      {
        code: "0002",
        name: "吴起县" },
      {
        code: "0005",
        name: "子长县" },
      {
        code: "0011",
        name: "宜川县" },
      {
        code: "0010",
        name: "洛川县" },
      {
        code: "0006",
        name: "安塞区" },
      {
        code: "0009",
        name: "富县" },
      {
        code: "0013",
        name: "黄陵县" },
      {
        code: "0004",
        name: "延川县" },
      {
        code: "0003",
        name: "延长县" },
      {
        code: "0008",
        name: "甘泉县" },
      {
        code: "0012",
        name: "黄龙县" }] },

    {
      code: "2707",
      name: "汉中",
      districtList: [{
        code: "0001",
        name: "汉台区" },
      {
        code: "0004",
        name: "洋县" },
      {
        code: "0007",
        name: "宁强县" },
      {
        code: "0006",
        name: "勉县" },
      {
        code: "0003",
        name: "城固县" },
      {
        code: "0002",
        name: "南郑区" },
      {
        code: "0005",
        name: "西乡县" },
      {
        code: "0009",
        name: "镇巴县" },
      {
        code: "0008",
        name: "略阳县" },
      {
        code: "0010",
        name: "留坝县" },
      {
        code: "0011",
        name: "佛坪县" }] },

    {
      code: "2708",
      name: "渭南",
      districtList: [{
        code: "0003",
        name: "临渭区" },
      {
        code: "0011",
        name: "富平县" },
      {
        code: "0001",
        name: "华阴市" },
      {
        code: "0009",
        name: "蒲城县" },
      {
        code: "0002",
        name: "韩城市" },
      {
        code: "0006",
        name: "大荔县" },
      {
        code: "0007",
        name: "合阳县" },
      {
        code: "0008",
        name: "澄城县" },
      {
        code: "0004",
        name: "华州区" },
      {
        code: "0010",
        name: "白水县" },
      {
        code: "0005",
        name: "潼关县" }] },

    {
      code: "2709",
      name: "榆林",
      districtList: [{
        code: "0001",
        name: "榆阳区" },
      {
        code: "0004",
        name: "神木市" },
      {
        code: "0003",
        name: "靖边县" },
      {
        code: "0007",
        name: "定边县" },
      {
        code: "0008",
        name: "绥德县" },
      {
        code: "0011",
        name: "清涧县" },
      {
        code: "0006",
        name: "横山区" },
      {
        code: "0005",
        name: "府谷县" },
      {
        code: "0002",
        name: "米脂县" },
      {
        code: "0012",
        name: "子洲县" },
      {
        code: "0010",
        name: "吴堡县" },
      {
        code: "0009",
        name: "佳县" }] },

    {
      code: "2712",
      name: "商洛",
      districtList: [{
        code: "0002",
        name: "商州区" },
      {
        code: "0005",
        name: "商南县" },
      {
        code: "0001",
        name: "柞水县" },
      {
        code: "0004",
        name: "丹凤县" },
      {
        code: "0006",
        name: "洛南县" },
      {
        code: "0007",
        name: "山阳县" },
      {
        code: "0003",
        name: "镇安县" }] },

    {
      code: "2713",
      name: "铜川",
      districtList: [{
        code: "0001",
        name: "耀州区" },
      {
        code: "0002",
        name: "王益区" },
      {
        code: "0003",
        name: "印台区" },
      {
        code: "0005",
        name: "宜君县" }] },

    {
      code: "2714",
      name: "安康",
      districtList: [{
        code: "0001",
        name: "汉滨区" },
      {
        code: "0002",
        name: "汉阴县" },
      {
        code: "0009",
        name: "旬阳县" },
      {
        code: "0005",
        name: "紫阳县" },
      {
        code: "0003",
        name: "石泉县" },
      {
        code: "0010",
        name: "白河县" },
      {
        code: "0006",
        name: "岚皋县" },
      {
        code: "0007",
        name: "平利县" },
      {
        code: "0004",
        name: "宁陕县" },
      {
        code: "0008",
        name: "镇坪县" }] },

    {
      code: "2710",
      name: "华山",
      districtList: [] },
    {
      code: "27030003",
      name: "兴平",
      districtList: [] },
    {
      code: "27030006",
      name: "杨凌区",
      districtList: [] },
    {
      code: "27050002",
      name: "吴起县",
      districtList: [] },
    {
      code: "27050010",
      name: "洛川县",
      districtList: [] },
    {
      code: "27050011",
      name: "宜川县",
      districtList: [] },
    {
      code: "27080002",
      name: "韩城",
      districtList: [] },
    {
      code: "27080007",
      name: "合阳县",
      districtList: [] },
    {
      code: "27080009",
      name: "蒲城县",
      districtList: [] },
    {
      code: "27080011",
      name: "富平县",
      districtList: [] },
    {
      code: "27090002",
      name: "米脂县",
      districtList: [] },
    {
      code: "27090003",
      name: "靖边县",
      districtList: [] },
    {
      code: "27090004",
      name: "神木县",
      districtList: [] },
    {
      code: "27090005",
      name: "府谷县",
      districtList: [] },
    {
      code: "27090006",
      name: "横山县",
      districtList: [] },
    {
      code: "27090007",
      name: "定边县",
      districtList: [] },
    {
      code: "27090008",
      name: "绥德县",
      districtList: [] },
    {
      code: "27090009",
      name: "佳县",
      districtList: [] },
    {
      code: "27090012",
      name: "子洲县",
      districtList: [] },
    {
      code: "27120006",
      name: "洛南县",
      districtList: [] }] },

  {
    code: "2800",
    name: "甘肃省",
    cityList: [{
      code: "2801",
      name: "兰州",
      districtList: [{
        code: "0001",
        name: "城关区" },
      {
        code: "0002",
        name: "七里河区" },
      {
        code: "0004",
        name: "安宁区" },
      {
        code: "0006",
        name: "永登县" },
      {
        code: "0008",
        name: "榆中县" },
      {
        code: "0003",
        name: "西固区" },
      {
        code: "0005",
        name: "红古区" },
      {
        code: "0007",
        name: "皋兰县" }] },

    {
      code: "2802",
      name: "嘉峪关",
      districtList: [{
        code: "0001",
        name: "嘉峪关市区" },
      {
        code: "0002",
        name: "长城区" },
      {
        code: "0003",
        name: "镜铁区" },
      {
        code: "0004",
        name: "雄关区" }] },

    {
      code: "2804",
      name: "张掖",
      districtList: [{
        code: "0007",
        name: "甘州区" },
      {
        code: "0002",
        name: "临泽县" },
      {
        code: "0003",
        name: "山丹县" },
      {
        code: "0005",
        name: "民乐县" },
      {
        code: "0004",
        name: "高台县" },
      {
        code: "0006",
        name: "肃南裕固族自治县" }] },

    {
      code: "2805",
      name: "天水",
      districtList: [{
        code: "0002",
        name: "麦积区" },
      {
        code: "0001",
        name: "秦州区" },
      {
        code: "0006",
        name: "甘谷县" },
      {
        code: "0004",
        name: "清水县" },
      {
        code: "0005",
        name: "秦安县" },
      {
        code: "0009",
        name: "武山县" },
      {
        code: "0008",
        name: "张家川回族自治县" }] },

    {
      code: "2806",
      name: "酒泉",
      districtList: [{
        code: "0008",
        name: "敦煌市" },
      {
        code: "0004",
        name: "肃州区" },
      {
        code: "0002",
        name: "瓜州县" },
      {
        code: "0003",
        name: "玉门市" },
      {
        code: "0005",
        name: "金塔县" },
      {
        code: "0006",
        name: "肃北蒙古族自治县" },
      {
        code: "0007",
        name: "阿克塞哈萨克族自治县" }] },

    {
      code: "2807",
      name: "白银",
      districtList: [{
        code: "0004",
        name: "白银区" },
      {
        code: "0002",
        name: "景泰县" },
      {
        code: "0005",
        name: "平川区" },
      {
        code: "0006",
        name: "靖远县" },
      {
        code: "0003",
        name: "会宁县" }] },

    {
      code: "2808",
      name: "武威",
      districtList: [{
        code: "0005",
        name: "凉州区" },
      {
        code: "0004",
        name: "天祝藏族自治县" },
      {
        code: "0002",
        name: "民勤县" },
      {
        code: "0003",
        name: "古浪县" }] },

    {
      code: "2809",
      name: "平凉",
      districtList: [{
        code: "0009",
        name: "崆峒区" },
      {
        code: "0008",
        name: "静宁县" },
      {
        code: "0003",
        name: "泾川县" },
      {
        code: "0006",
        name: "华亭县" },
      {
        code: "0007",
        name: "庄浪县" },
      {
        code: "0004",
        name: "灵台县" },
      {
        code: "0005",
        name: "崇信县" }] },

    {
      code: "2810",
      name: "金昌",
      districtList: [{
        code: "0003",
        name: "金川区" },
      {
        code: "0002",
        name: "永昌县" }] },

    {
      code: "2812",
      name: "甘南藏族自治州",
      districtList: [{
        code: "0002",
        name: "碌曲县" },
      {
        code: "0004",
        name: "临潭县" },
      {
        code: "0003",
        name: "合作市" },
      {
        code: "0008",
        name: "夏河县" },
      {
        code: "0007",
        name: "迭部县" },
      {
        code: "0009",
        name: "玛曲县" },
      {
        code: "0005",
        name: "卓尼县" },
      {
        code: "0006",
        name: "舟曲县" }] },

    {
      code: "2813",
      name: "庆阳",
      districtList: [{
        code: "0001",
        name: "西峰区" },
      {
        code: "0004",
        name: "庆城县" },
      {
        code: "0005",
        name: "环县" },
      {
        code: "0006",
        name: "华池县" },
      {
        code: "0010",
        name: "镇原县" },
      {
        code: "0008",
        name: "正宁县" },
      {
        code: "0009",
        name: "宁县" },
      {
        code: "0007",
        name: "合水县" }] },

    {
      code: "2817",
      name: "陇南",
      districtList: [{
        code: "0001",
        name: "武都区" },
      {
        code: "0007",
        name: "礼县" },
      {
        code: "0005",
        name: "康县" },
      {
        code: "0002",
        name: "成县" },
      {
        code: "0004",
        name: "宕昌县" },
      {
        code: "0006",
        name: "西和县" },
      {
        code: "0003",
        name: "文县" },
      {
        code: "0008",
        name: "徽县" },
      {
        code: "0009",
        name: "盘锦辽河口红海滩旅游区" }] },

    {
      code: "2819",
      name: "临夏回族自治州",
      districtList: [{
        code: "0002",
        name: "临夏市" },
      {
        code: "0004",
        name: "永靖县" },
      {
        code: "0005",
        name: "广河县" },
      {
        code: "0009",
        name: "康乐县" },
      {
        code: "0003",
        name: "临夏县" },
      {
        code: "0007",
        name: "东乡族自治县" },
      {
        code: "0006",
        name: "和政县" },
      {
        code: "0008",
        name: "积石山保安族东乡族撒拉族自治县" }] },

    {
      code: "2821",
      name: "定西",
      districtList: [{
        code: "0001",
        name: "安定区" },
      {
        code: "0004",
        name: "临洮县" },
      {
        code: "0003",
        name: "陇西县" },
      {
        code: "0005",
        name: "通渭县" },
      {
        code: "0006",
        name: "渭源县" },
      {
        code: "0008",
        name: "岷县" },
      {
        code: "0007",
        name: "漳县" }] },

    {
      code: "28060002",
      name: "瓜州县",
      districtList: [] },
    {
      code: "28060003",
      name: "玉门",
      districtList: [] },
    {
      code: "28060008",
      name: "敦煌",
      districtList: [] },
    {
      code: "28120003",
      name: "合作",
      districtList: [] },
    {
      code: "28120007",
      name: "迭部县",
      districtList: [] },
    {
      code: "28120008",
      name: "夏河县",
      districtList: [] },
    {
      code: "28190009",
      name: "康乐县",
      districtList: [] }] },

  {
    code: "2900",
    name: "宁夏回族自治区",
    cityList: [{
      code: "2901",
      name: "银川",
      districtList: [{
        code: "0001",
        name: "兴庆区" },
      {
        code: "0002",
        name: "金凤区" },
      {
        code: "0003",
        name: "西夏区" },
      {
        code: "0004",
        name: "灵武市" },
      {
        code: "0006",
        name: "贺兰县" },
      {
        code: "0005",
        name: "永宁县" }] },

    {
      code: "2902",
      name: "石嘴山",
      districtList: [{
        code: "0002",
        name: "大武口区" },
      {
        code: "0004",
        name: "平罗县" },
      {
        code: "0003",
        name: "惠农区" }] },

    {
      code: "2903",
      name: "吴忠",
      districtList: [{
        code: "0002",
        name: "利通区" },
      {
        code: "0004",
        name: "盐池县" },
      {
        code: "0006",
        name: "青铜峡市" },
      {
        code: "0003",
        name: "红寺堡区" },
      {
        code: "0005",
        name: "同心县" }] },

    {
      code: "2904",
      name: "中卫",
      districtList: [{
        code: "0002",
        name: "沙坡头区" },
      {
        code: "0003",
        name: "中宁县" },
      {
        code: "0004",
        name: "海原县" }] },

    {
      code: "2905",
      name: "固原",
      districtList: [{
        code: "0001",
        name: "原州区" },
      {
        code: "0004",
        name: "泾源县" },
      {
        code: "0002",
        name: "西吉县" },
      {
        code: "0005",
        name: "彭阳县" },
      {
        code: "0003",
        name: "隆德县" }] },

    {
      code: "29010004",
      name: "灵武",
      districtList: [] },
    {
      code: "29010006",
      name: "贺兰县",
      districtList: [] },
    {
      code: "29040003",
      name: "中宁县",
      districtList: [] }] },

  {
    code: "3000",
    name: "青海省",
    cityList: [{
      code: "3001",
      name: "西宁",
      districtList: [{
        code: "0003",
        name: "城东区" },
      {
        code: "0001",
        name: "城西区" },
      {
        code: "0002",
        name: "城中区" },
      {
        code: "0004",
        name: "城北区" },
      {
        code: "0005",
        name: "大通回族土族自治县" },
      {
        code: "0006",
        name: "湟中县" },
      {
        code: "0007",
        name: "湟源县" }] },

    {
      code: "3005",
      name: "玉树藏族自治州",
      districtList: [{
        code: "0007",
        name: "玉树市" },
      {
        code: "0005",
        name: "囊谦县" },
      {
        code: "0006",
        name: "曲麻莱县" },
      {
        code: "0003",
        name: "称多县" }] },

    {
      code: "3010",
      name: "黄南藏族自治州",
      districtList: [{
        code: "0001",
        name: "同仁县" },
      {
        code: "0002",
        name: "尖扎县" },
      {
        code: "0004",
        name: "河南蒙古族自治县" },
      {
        code: "0003",
        name: "泽库县" }] },

    {
      code: "3012",
      name: "海北藏族自治州",
      districtList: [{
        code: "0002",
        name: "祁连县" },
      {
        code: "0001",
        name: "海晏县" },
      {
        code: "0004",
        name: "刚察县" },
      {
        code: "0003",
        name: "门源回族自治县" }] },

    {
      code: "3014",
      name: "海西蒙古族藏族自治州",
      districtList: [{
        code: "0001",
        name: "格尔木市" },
      {
        code: "0002",
        name: "德令哈市" },
      {
        code: "0003",
        name: "乌兰县" },
      {
        code: "0004",
        name: "都兰县" },
      {
        code: "0005",
        name: "天峻县" }] },

    {
      code: "3015",
      name: "海南藏族自治州",
      districtList: [{
        code: "0001",
        name: "共和县" },
      {
        code: "0002",
        name: "贵德县" },
      {
        code: "0005",
        name: "兴海县" },
      {
        code: "0006",
        name: "贵南县" },
      {
        code: "0004",
        name: "同德县" },
      {
        code: "0007",
        name: "茫崖行政区" },
      {
        code: "0008",
        name: "冷湖行政区" }] },

    {
      code: "3016",
      name: "海东",
      districtList: [{
        code: "0002",
        name: "互助土族自治县" },
      {
        code: "0003",
        name: "乐都区" },
      {
        code: "0001",
        name: "平安区" },
      {
        code: "0006",
        name: "循化撒拉族自治县" },
      {
        code: "0004",
        name: "民和回族土族自治县" },
      {
        code: "0005",
        name: "化隆回族自治县" }] },

    {
      code: "3018",
      name: "果洛藏族自治州",
      districtList: [{
        code: "0001",
        name: "玛沁县" },
      {
        code: "0002",
        name: "班玛县" },
      {
        code: "0003",
        name: "甘德县" },
      {
        code: "0006",
        name: "玛多县" },
      {
        code: "0004",
        name: "达日县" },
      {
        code: "0005",
        name: "久治县" }] },

    {
      code: "3002",
      name: "青海湖",
      districtList: [] },
    {
      code: "30010006",
      name: "湟中县",
      districtList: [] },
    {
      code: "30120001",
      name: "海晏县",
      districtList: [] },
    {
      code: "30120002",
      name: "祁连县",
      districtList: [] },
    {
      code: "30140001",
      name: "格尔木",
      districtList: [] },
    {
      code: "30140002",
      name: "德令哈",
      districtList: [] },
    {
      code: "30150001",
      name: "共和县",
      districtList: [] },
    {
      code: "30150002",
      name: "贵德县",
      districtList: [] },
    {
      code: "30160001",
      name: "平安县",
      districtList: [] },
    {
      code: "30160002",
      name: "互助土族自治县",
      districtList: [] }] },

  {
    code: "3100",
    name: "新疆维吾尔自治区",
    cityList: [{
      code: "3101",
      name: "乌鲁木齐",
      districtList: [{
        code: "0010",
        name: "新市区" },
      {
        code: "0002",
        name: "沙依巴克区" },
      {
        code: "0001",
        name: "天山区" },
      {
        code: "0009",
        name: "水磨沟区" },
      {
        code: "0013",
        name: "乌鲁木齐县" },
      {
        code: "0011",
        name: "米东区" },
      {
        code: "0012",
        name: "头屯河区" },
      {
        code: "0006",
        name: "达坂城区" }] },

    {
      code: "3102",
      name: "克拉玛依",
      districtList: [{
        code: "0002",
        name: "克拉玛依区" },
      {
        code: "0001",
        name: "独山子区" },
      {
        code: "0004",
        name: "白碱滩区" },
      {
        code: "0003",
        name: "乌尔禾区" }] },

    {
      code: "3103",
      name: "伊犁哈萨克自治州",
      districtList: [{
        code: "0011",
        name: "伊宁市" },
      {
        code: "0002",
        name: "伊宁县" },
      {
        code: "0006",
        name: "新源县" },
      {
        code: "0012",
        name: "奎屯市" },
      {
        code: "0004",
        name: "霍城县" },
      {
        code: "0008",
        name: "特克斯县" },
      {
        code: "0007",
        name: "昭苏县" },
      {
        code: "0009",
        name: "尼勒克县" },
      {
        code: "0005",
        name: "巩留县" },
      {
        code: "0003",
        name: "察布查尔锡伯自治县" },
      {
        code: "100759299",
        name: "那拉提镇" },
      {
        code: "0010",
        name: "霍尔果斯" }] },

    {
      code: "3108",
      name: "吐鲁番地区",
      districtList: [{
        code: "0007",
        name: "吐鲁番市高昌区" },
      {
        code: "0004",
        name: "鄯善县" },
      {
        code: "0003",
        name: "托克逊县" }] },

    {
      code: "3109",
      name: "阿克苏地区",
      districtList: [{
        code: "0004",
        name: "阿克苏市" },
      {
        code: "0002",
        name: "库车县" },
      {
        code: "0007",
        name: "拜城县" },
      {
        code: "0006",
        name: "新和县" },
      {
        code: "0008",
        name: "乌什县" },
      {
        code: "0005",
        name: "沙雅县" },
      {
        code: "0003",
        name: "温宿县" },
      {
        code: "0009",
        name: "阿瓦提县" },
      {
        code: "0010",
        name: "柯坪县" }] },

    {
      code: "3111",
      name: "喀什地区",
      districtList: [{
        code: "0002",
        name: "喀什市" },
      {
        code: "0012",
        name: "巴楚县" },
      {
        code: "0007",
        name: "莎车县" },
      {
        code: "0008",
        name: "叶城县" },
      {
        code: "0009",
        name: "麦盖提县" },
      {
        code: "0013",
        name: "塔什库尔干塔吉克自治县" },
      {
        code: "0011",
        name: "伽师县" },
      {
        code: "0004",
        name: "疏勒县" },
      {
        code: "0010",
        name: "岳普湖县" },
      {
        code: "0006",
        name: "泽普县" },
      {
        code: "0003",
        name: "疏附县" },
      {
        code: "0005",
        name: "英吉沙县" }] },

    {
      code: "3113",
      name: "哈密地区",
      districtList: [{
        code: "0005",
        name: "哈密市伊州区" },
      {
        code: "0003",
        name: "巴里坤哈萨克自治县" },
      {
        code: "0004",
        name: "伊吾县" }] },

    {
      code: "3115",
      name: "昌吉回族自治州",
      districtList: [{
        code: "0003",
        name: "昌吉市" },
      {
        code: "0005",
        name: "奇台县" },
      {
        code: "0002",
        name: "阜康市" },
      {
        code: "0006",
        name: "吉木萨尔县" },
      {
        code: "0004",
        name: "玛纳斯县" },
      {
        code: "0008",
        name: "木垒哈萨克自治县" },
      {
        code: "0007",
        name: "呼图壁县" }] },

    {
      code: "3116",
      name: "博尔塔拉蒙古自治州",
      districtList: [{
        code: "0004",
        name: "博乐市" },
      {
        code: "0002",
        name: "精河县" },
      {
        code: "0003",
        name: "温泉县" },
      {
        code: "0005",
        name: "阿拉山口市" }] },

    {
      code: "3118",
      name: "阿勒泰地区",
      districtList: [{
        code: "0009",
        name: "布尔津县" },
      {
        code: "0003",
        name: "阿勒泰市" },
      {
        code: "0004",
        name: "富蕴县" },
      {
        code: "0001",
        name: "北屯市" },
      {
        code: "0005",
        name: "福海县" },
      {
        code: "0006",
        name: "哈巴河县" },
      {
        code: "0007",
        name: "青河县" },
      {
        code: "0002",
        name: "吉木乃县" }] },

    {
      code: "3121",
      name: "和田地区",
      districtList: [{
        code: "0002",
        name: "和田市" },
      {
        code: "0009",
        name: "民丰县" },
      {
        code: "0004",
        name: "墨玉县" },
      {
        code: "0008",
        name: "于田县" },
      {
        code: "0006",
        name: "洛浦县" },
      {
        code: "0005",
        name: "皮山县" },
      {
        code: "0007",
        name: "策勒县" }] },

    {
      code: "3128",
      name: "塔城地区",
      districtList: [{
        code: "0002",
        name: "乌苏市" },
      {
        code: "0003",
        name: "额敏县" },
      {
        code: "0004",
        name: "沙湾县" },
      {
        code: "0005",
        name: "托里县" },
      {
        code: "0006",
        name: "裕民县" },
      {
        code: "0007",
        name: "和布克赛尔蒙古自治县" },
      {
        code: "0001",
        name: "塔城市" }] },

    {
      code: "3131",
      name: "巴音郭楞蒙古自治州",
      districtList: [{
        code: "0009",
        name: "库尔勒市" },
      {
        code: "0006",
        name: "和静县" },
      {
        code: "0001",
        name: "轮台县" },
      {
        code: "0007",
        name: "和硕县" },
      {
        code: "0005",
        name: "焉耆回族自治县" },
      {
        code: "0003",
        name: "若羌县" },
      {
        code: "0008",
        name: "博湖县" },
      {
        code: "0004",
        name: "且末县" },
      {
        code: "0002",
        name: "尉犁县" }] },

    {
      code: "3132",
      name: "克孜勒苏柯尔克孜自治州",
      districtList: [{
        code: "0003",
        name: "阿图什市" },
      {
        code: "0001",
        name: "阿合奇县" },
      {
        code: "0004",
        name: "阿克陶县" },
      {
        code: "0002",
        name: "乌恰县" }] },

    {
      code: "31070001",
      name: "石河子",
      districtList: [{
        code: "0001",
        name: "石河子市" }] },

    {
      code: "31290001",
      name: "五家渠",
      districtList: [{
        code: "0001",
        name: "五家渠市" }] },

    {
      code: "31300000",
      name: "阿拉尔",
      districtList: [{
        code: "100679623",
        name: "阿拉尔市" }] },

    {
      code: "53940001",
      name: "图木舒克",
      districtList: [{
        code: "0001",
        name: "图木舒克市" }] },

    {
      code: "3110",
      name: "喀纳斯",
      districtList: [] },
    {
      code: "31010011",
      name: "米泉",
      districtList: [] },
    {
      code: "31030004",
      name: "霍城县",
      districtList: [] },
    {
      code: "31030006",
      name: "新源县",
      districtList: [] },
    {
      code: "31030007",
      name: "昭苏县",
      districtList: [] },
    {
      code: "31030008",
      name: "特克斯县",
      districtList: [] },
    {
      code: "31030009",
      name: "尼勒克县",
      districtList: [] },
    {
      code: "31030010",
      name: "霍尔果斯",
      districtList: [] },
    {
      code: "31030011",
      name: "伊宁",
      districtList: [] },
    {
      code: "31030012",
      name: "奎屯",
      districtList: [] },
    {
      code: "31080003",
      name: "托克逊县",
      districtList: [] },
    {
      code: "31080004",
      name: "鄯善县",
      districtList: [] },
    {
      code: "31090002",
      name: "库车县",
      districtList: [] },
    {
      code: "31090003",
      name: "温宿县",
      districtList: [] },
    {
      code: "31090006",
      name: "新和县",
      districtList: [] },
    {
      code: "31090007",
      name: "拜城县",
      districtList: [] },
    {
      code: "31110007",
      name: "莎车县",
      districtList: [] },
    {
      code: "31110008",
      name: "叶城县",
      districtList: [] },
    {
      code: "31110009",
      name: "麦盖提县",
      districtList: [] },
    {
      code: "31110012",
      name: "巴楚县",
      districtList: [] },
    {
      code: "31110013",
      name: "塔什库尔干塔吉克自治县",
      districtList: [] },
    {
      code: "31130003",
      name: "巴里坤哈萨克自治县",
      districtList: [] },
    {
      code: "31130004",
      name: "伊吾县",
      districtList: [] },
    {
      code: "31150002",
      name: "阜康",
      districtList: [] },
    {
      code: "31150004",
      name: "玛纳斯县",
      districtList: [] },
    {
      code: "31150005",
      name: "奇台县",
      districtList: [] },
    {
      code: "31150006",
      name: "吉木萨尔县",
      districtList: [] },
    {
      code: "31150007",
      name: "呼图壁县",
      districtList: [] },
    {
      code: "31150008",
      name: "木垒哈萨克自治县",
      districtList: [] },
    {
      code: "31160004",
      name: "博乐",
      districtList: [] },
    {
      code: "31180002",
      name: "吉木乃县",
      districtList: [] },
    {
      code: "31180004",
      name: "富蕴县",
      districtList: [] },
    {
      code: "31180005",
      name: "福海县",
      districtList: [] },
    {
      code: "31180006",
      name: "哈巴河县",
      districtList: [] },
    {
      code: "31180007",
      name: "青河县",
      districtList: [] },
    {
      code: "31180009",
      name: "布尔津县",
      districtList: [] },
    {
      code: "31280002",
      name: "乌苏",
      districtList: [] },
    {
      code: "31280004",
      name: "沙湾县",
      districtList: [] },
    {
      code: "31310001",
      name: "轮台县",
      districtList: [] },
    {
      code: "31310003",
      name: "若羌县",
      districtList: [] },
    {
      code: "31310004",
      name: "且末县",
      districtList: [] },
    {
      code: "31310005",
      name: "焉耆回族自治县",
      districtList: [] },
    {
      code: "31310006",
      name: "和静县",
      districtList: [] },
    {
      code: "31310007",
      name: "和硕县",
      districtList: [] },
    {
      code: "31310008",
      name: "博湖县",
      districtList: [] },
    {
      code: "31310009",
      name: "库尔勒",
      districtList: [] },
    {
      code: "31360001",
      name: "北屯",
      districtList: [] },
    {
      code: "55020001",
      name: "阿合奇县",
      districtList: [] }] },

  {
    code: "3200",
    name: "香港特别行政区",
    cityList: [{
      code: "3201",
      name: "香港特别行政区",
      districtList: [{
        code: "0017",
        name: "油尖旺区" },
      {
        code: "0012",
        name: "湾仔区" },
      {
        code: "0009",
        name: "中西区" },
      {
        code: "0013",
        name: "九龙城区" },
      {
        code: "0024",
        name: "荃湾区" },
      {
        code: "0014",
        name: "观塘区" },
      {
        code: "0023",
        name: "大埔区" },
      {
        code: "100761824",
        name: "葵青" }] }] },


  {
    code: "3300",
    name: "澳门特别行政区",
    cityList: [{
      code: "3301",
      name: "澳门特别行政区",
      districtList: [{
        code: "0014",
        name: "澳门半岛" },
      {
        code: "0015",
        name: "氹仔和路氹" },
      {
        code: "0012",
        name: "路环" }] }] },


  {
    code: "3400",
    name: "台湾省",
    cityList: [{
      code: "3401",
      name: "台北",
      districtList: [{
        code: "0002",
        name: "万华区" }] },

    {
      code: "3419",
      name: "金门",
      districtList: [{
        code: "0009",
        name: "金门" }] },

    {
      code: "3402",
      name: "高雄",
      districtList: [] },
    {
      code: "3403",
      name: "台中",
      districtList: [] },
    {
      code: "3404",
      name: "屏东",
      districtList: [] },
    {
      code: "3406",
      name: "基隆",
      districtList: [] },
    {
      code: "3407",
      name: "桃园",
      districtList: [] },
    {
      code: "3408",
      name: "新竹",
      districtList: [] },
    {
      code: "3409",
      name: "苗栗",
      districtList: [] },
    {
      code: "3410",
      name: "彰化",
      districtList: [] },
    {
      code: "3411",
      name: "南投",
      districtList: [] },
    {
      code: "3412",
      name: "云林",
      districtList: [] },
    {
      code: "3413",
      name: "嘉义",
      districtList: [] },
    {
      code: "3414",
      name: "台南",
      districtList: [] },
    {
      code: "3415",
      name: "宜兰",
      districtList: [] },
    {
      code: "3416",
      name: "花莲",
      districtList: [] },
    {
      code: "3417",
      name: "台东",
      districtList: [] },
    {
      code: "3418",
      name: "澎湖",
      districtList: [] },
    {
      code: "3420",
      name: "马祖",
      districtList: [] }] }] };

/***/ }),

/***/ 89:
/*!*********************************************!*\
  !*** H:/work/aiDaChu_uni/utils/thorttle.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  throttle: function throttle(t, l) {
    null != l && null != l || (l = 2500);
    var n = null;
    return function () {
      var u = +new Date();
      (u - n > l || !n) && (t.apply(this, arguments), n = u);
    };
  } };

/***/ }),

/***/ 98:
/*!**********************************************!*\
  !*** H:/work/aiDaChu_uni/utils/imgUpload.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  uploadimg: function o(a) {
    console.log(a),
    uni.showLoading({
      title: '正在上传...',
      mask: !0 });

    var e = a.that,
    t = a.i ? a.i : 0,
    s = a.success ? a.success : 0,
    l = a.fail ? a.fail : 0;
    console.log(e),
    uni.uploadFile({
      url: a.url,
      filePath: a.path[t],
      name: 'file',
      formData: {
        token: a.token },

      success: function success(o) {
        console.log(t + ' ====== ' + JSON.stringify(o)), 200 == o.statusCode && s++;
        var l = JSON.parse(o.data);
        console.log(l.key), console.log(a);
        var i = 'https://imgck.5156dujia.com/' + l.key;

        if (null != l.key) {
          var c;
          if (console.log(i), 'cookList' == a.arrName)
          (c = a.arr).push(i),
          e.setData({
            cookList: c });

          if ('photo' == a.arrName)
          (c = a.arr).push(i),
          e.setData({
            photo: c }),

          console.log(e.data.photo);
          if ('healthy' == a.arrName)
          (c = a.arr).push(i),
          e.setData({
            healthy: c }),

          console.log(e.data.healthy);

          if ('"certificates"' == a.arrName) {
            var n = a.arr,
            r = a.index;
            console.log(n, r),
            n[r].url = i,
            e.setData({
              certificatesList: n }),

            console.log(e.data.certificatesList);
          }

          console.log(t);
        }
      },
      fail: function fail(o) {
        l++, console.log('fail:' + t + 'fail:' + l);
      },
      complete: function complete() {
        console.log(t),
        ++t == a.path.length ? (
        uni.hideLoading(),
        console.log('执行完毕'),
        uni.showLoading({
          title: '正在上传处理...',
          mask: !0 }),

        setTimeout(function () {
          e.setData({
            isNext: !0 }),

          uni.hideLoading();
        }, 2e3),
        console.log('成功：' + s + ' 失败：' + l)) : (
        console.log(t), a.i = t, a.success = s, a.fail = l, o(a));
      } });

  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map