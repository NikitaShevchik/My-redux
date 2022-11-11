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

var store = createStoreCounter('re', 0);
var renderCallbackEx = function renderCallbackEx() {
  var root = document.getElementById('root');
  var state = store.getState();
  root.innerHTML = state.user.name;
};
store.subscribe(renderCallbackEx);
function createStoreCounter(reducer, initialState) {
  var state = initialState;
  var subscribers = [];
  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(callback);
    },
    subscribe: function subscribe(renderCallback) {
      subscribers.push(renderCallback);
    }
  };
}

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
},{}],"index/index.js":[function(require,module,exports) {
"use strict";

var _store = require("../redux/store.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var store = (0, _store.cretStor)('reducer', 0);
var store2 = (0, _store.createStore)('Test message', '');
store2.dispatch.reducer();
var store3 = (0, _store.createStoree)('sayHello', '');
store3.dispatch('reducer');

// console.log(store);

// setTimeout(() =>
//     console.log(store.getState()), 1000
// )

var counter = document.querySelector('.display');
var addButton = document.querySelector('.add');
var delButton = document.querySelector('.del');
var clearButton = document.querySelector('.clear');
var consoleButton = document.querySelector('.console');
function actualState(element, state) {
  element.innerHTML = store.getState();
}
actualState(counter, store.getState());
addButton.addEventListener('click', function () {
  store.addOne();
  actualState(counter, store.getState());
});
delButton.addEventListener('click', function () {
  store.delOne();
  actualState(counter, store.getState());
});
clearButton.addEventListener('click', function () {
  store.clearState();
  actualState(counter, store.getState());
});
consoleButton.addEventListener('click', function () {
  console.log(store.getState());
});
var switcherCounter = (0, _store.switchCounter)(counterSwitcher, true);
var counterStore = (0, _store.createStoreCounter)(counterLogic, 0);
function counterLogic(state, action) {
  switch (action.type) {
    case 'addNumber':
      return state = state + action.number;
    case 'minNumber':
      return state = state - action.number;
    default:
      return state;
  }
}
function counterSwitcher(state, action) {
  switch (action.type) {
    case 'switch':
      return state = !state;
    default:
      return state;
  }
}
var addToState = document.querySelector('.addToState');
addToState.addEventListener('click', function () {
  addToState.classList.toggle('minusFromState');
  if (addToState.classList.contains('minusFromState')) {
    switcherCounter.dispath({
      type: 'switch'
    });
    addToState.innerHTML = 'Minus from state';
    addToState.style.color = 'red';
  } else {
    switcherCounter.dispath({
      type: 'switch'
    });
    addToState.innerHTML = 'Add to state';
    addToState.style.color = 'black';
  }
});
var addNumber = document.querySelectorAll('.addNumber');

// function displayCounter() {
//     document.querySelector('.displayStateCounter').innerHTML = counterStore.getState()
// }
// displayCounter()
var _iterator = _createForOfIteratorHelper(addNumber),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var button = _step.value;
    button.addEventListener('click', function (e) {
      if (switcherCounter.getState()) {
        counterStore.dispatch({
          type: 'addNumber',
          number: Number(e.target.innerHTML)
        });
      } else {
        counterStore.dispatch({
          type: 'minNumber',
          number: Number(e.target.innerHTML)
        });
      }
      // displayCounter()
      console.log(counterStore.getState());
    });
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
switcherCounter.subscribe(function () {
  return console.log('Switcher set to', switcherCounter.getState());
});
counterStore.subscribe(function () {
  return document.querySelector('.displayStateCounter').innerHTML = counterStore.getState();
});

// addSix.map(button => {
//     button.addEventListener('click', (e) => {
//         counterStore.dispatch({
//             type: 'addOne',
//             number: Number(e.target.innerHTML)
//         })
//         displayCounter()
//         console.log(counterStore.getState())
//     })
// })

// console.log(counterStore.getState())
},{"../redux/store.js":"redux/store.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57821" + '/');
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
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index/index.js"], null)
//# sourceMappingURL=/index.488f737b.js.map