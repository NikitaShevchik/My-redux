// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"redux/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreCounter = createStoreCounter;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// export function cretStor(reducer, initialState) {
//     let state = initialState;
//     return {
//         if(reducer = 'GET_STATE') {
//             return state;
//         },
//         if(reducer = 'ADD_ONE') {
//             state = state + 1;
//         },
//         if(reducer = 'DEL_ONE') {
//             state = state - 1;
//         },
//         if(reducer = 'CLEAR_STATE') {
//             state = 0;
//         }

//         // {
//         //     reducer: 'GET_STATE',
//         //     getState: () => state
//         // },
//         // {
//         //     reducer: 'ADD_ONE',
//         //     addOne: () => state = state + 1,
//         // },
//         // {
//         //     reducer: 'DEL_ONE',
//         //     delOne: () => state = state - 1,
//         // },
//         // {
//         //     reducer: 'CLEAR_STATE',
//         //     clearState: () => state = 0
//         // }

//         // getState: () => state,
//         // addOne: () => state = state + 1,
//         // delOne: () => state = state - 1,
//         // clearState: () => state = 0
//     }
// }

// let store = cretStor('ADD_ONE', 0)

// console.log(store.('GET_STATE'))

// export function cretStor(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         addOne: () => state = state + 1,
//         delOne: () => state = state - 1,
//         clearState: () => state = 0
//     }
// }

// const store = cretStor('red', 0)

// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())

// export function createStore(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch: { reducer: () => console.log(reducer) }
//     }
// }

// export function createStoree(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch(action) {
//             reducer === 'sayHello' && console.log('Hello world yo ' + action),
//                 reducer === 'sayHow' && csonsole.log('How How How ' + action)
//         }
//     }
// }

// export function createStoreNext(reducer, initialState) {
//     let state = initialState
//     return {
//         dispatch: action => { state = reducer(state, action) },
//         getState: () => state,
//     }
// }

var init = {
  value: 0
};
function callback() {
  console.log('+');
}
function createStoreCounter(reducer, initialState) {
  var state = initialState;
  var subscribers = [];
  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(function (b) {
        return console.log(b);
      });
      // return action
    },
    subscribe: function subscribe(renderCallback) {
      subscribers.push(renderCallback());
    },
    getSubscribers: function getSubscribers() {
      return subscribers;
    }
  };
}
var store = createStoreCounter(reducerCounter, init);
function reducerCounter(state, action) {
  switch (action.type) {
    case 'inc':
      return state = _objectSpread(_objectSpread({}, state), {}, {
        value: state.value + 1
      });
    case 'dec':
      return state = _objectSpread(_objectSpread({}, state), {}, {
        value: state.value - 1
      });
    default:
      return state;
  }
}
var render = function render() {
  var root = document.getElementById('root');
  var state = store.getState();
  root.innerHTML = state.value;
};
console.log(store.getState());
store.subscribe(render);
store.dispatch({
  type: 'inc'
});
// console.log(store.getState())
// store.dispatch({
//     type: 'inc'
// })
// render()
// console.log(store.getState().value)
// console.log(store.getSubscribers())

// store.dispatch({
//     type: 'inc'
// })
// store.dispatch({
//     type: 'inc'
// })
// render()
// render()
// store.dispatch({
//     type: 'dec'
// })

// store.dispatch({
//     type: 'addOne'
// })
// store.subscribe(render);
// console.log(store.getState())
// store.dispatch({
//     type: 'addOne'
// })
// console.log(store.getState())
// store.dispatch({
//     type: 'addOne'
// })
// console.log(store.getState())

// export function switchCounter(reducer, initialState) {
//     let state = initialState;
//     let subscribing;
//     return {
//         getState: () => state,
//         dispath(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib();
//         }
//     }
// }

// export function switchCounter(reducer, initialState) {
//     let state = initialState;
//     let subscribing = () => { };
//     return {
//         getState: () => state,
//         dispath(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib;
//         }
//     }
// }
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64776" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","redux/store.js"], null)
//# sourceMappingURL=/store.df322c04.js.map