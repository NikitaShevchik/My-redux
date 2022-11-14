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
})({"redux/store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;
function createStore(reducer, initialState) {
  var state = initialState;
  var subscribing;
  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action) {
      state = reducer(state, action);
      subscribing();
      return action;
    },
    subscribe: function subscribe(subscrib) {
      subscribing = subscrib;
    }
  };
}
exports.createStore = createStore;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var store_1 = require("./redux/store");
var todoState = [{
  text: 'Do homework',
  done: true,
  id: 0
}, {
  text: 'Make coffee',
  done: false,
  id: 1
}, {
  text: 'Make popop',
  done: true,
  id: 2
}];
// console.log(todoState.find(todo => todo.id === 0).done)
var todoActionTypes;
(function (todoActionTypes) {
  todoActionTypes["ADD_TODO"] = "ADD_TODO";
  todoActionTypes["REMOVE_TODO"] = "REMOVE_TODO";
  todoActionTypes["SET_TODO"] = "SET_TODO";
})(todoActionTypes || (todoActionTypes = {}));
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      state.push(action.payload);
      return state;
    case 'REMOVE_TODO':
      return state = state.filter(function (todo) {
        return action.payload !== todo.id;
      });
    case 'SET_TODO':
      // let idState = state.find(todo => todo.id === action.payload).id
      // return state.find((todo => todo.id === action.payload).text)
      state[action.payload].done = !state[action.payload].done;
      // let newState = state;
      // let doneif = newState.find(todo => todo.id === action.payload).text
      // let doneif = newState.find(todo => todo.id === action.payload).done
      // state[action.payload].done = false
      // console.log(doneif)
      return state;
    default:
      return action;
  }
}
var store = (0, store_1.createStore)(todoReducer, todoState);
// console.log(todoState)
// console.log(store.getState())
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })
var todo = document.querySelector('.todo');
// console.log(todo?.children)
function updateTodo() {
  var storage = store.getState();
  todo === null || todo === void 0 ? void 0 : todo.innerHTML = '';
  storage.map(function (y) {
    return todo === null || todo === void 0 ? void 0 : todo.innerHTML += "<div class=\"todo__element\" id=\"".concat(y.id, "\"><p id=\"").concat(y.id, "\" data-done=\"").concat(y.done, "\" class=\"todo__item\">").concat(y.text, "</p><i id=\"").concat(y.id, "\" class='bx bx-trash'></i></div>");
  });
  for (var _i = 0, _a = todo === null || todo === void 0 ? void 0 : todo.children; _i < _a.length; _i++) {
    var k = _a[_i];
    k.addEventListener('click', function (e) {
      store.dispatch({
        type: 'SET_TODO',
        payload: Number(e.target.id)
      });
    });
  }
  var todoDelete = document.querySelectorAll('.bx-trash');
  var _loop_1 = function _loop_1(k) {
    k.addEventListener('click', function (e) {
      store.dispatch({
        type: 'REMOVE_TODO',
        payload: Number(k.id)
      });
    });
  };
  for (var _b = 0, todoDelete_1 = todoDelete; _b < todoDelete_1.length; _b++) {
    var k = todoDelete_1[_b];
    _loop_1(k);
  }
}
updateTodo();
store.subscribe(updateTodo);
// store.dispatch({
//     type: 'REMOVE_TODO',
//     payload: 0
// })
var storage = store.getState();
// console.log(storage.find(todo => todo.id === 0).done = false )
console.log(store.getState());
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nibakita',
//         done: false,
//         id: 4
//     }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nissta',
//         done: false,
//         id: 5
//     }
// })
var buttonAddTodo = document.querySelector('.add');
buttonAddTodo === null || buttonAddTodo === void 0 ? void 0 : buttonAddTodo.addEventListener('click', function () {
  var input = document.querySelector('.input');
  if ((input === null || input === void 0 ? void 0 : input.value) !== '') {
    store.dispatch({
      type: "ADD_TODO",
      payload: {
        text: input === null || input === void 0 ? void 0 : input.value,
        done: false,
        id: store.getState().length
      }
    });
    input.value = "";
  }
});
// console.log(store.getState())
// store.dispatch({
//     type: 'SET_TODO',
//     payload: '0'
// })
// store.dispatch({
//     type: 'REMOVE_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Aleryt',
//         done: false,
//         id: 3
//     }
// })
// function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch(action: {
//             type: string;
//             payload?: Partial<T>
//         }) {
//             state = reducer(state, action);
//             return action;
//         },
//     }
// }
// const initialState = 10;
// enum actionsType {
//     ADD_ONE = 'ADD_ONE',
//     MIN_ONE = 'MIN_ONE'
// }
// function reducerStore(state, action) {
//     switch (action.type) {
//         case actionsType.ADD_ONE:
//             return state = state + 1;
//         case actionsType.MIN_ONE:
//             return state = state - 1;
//         default:
//             return state
//     }
// }
// const store = createStore(reducerStore, initialState);
// console.log(store.getState())
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.getState())
//----------------------------------------------------------------------------------------------------------------------------------
// type FunctionalComponent<T extends object = object> = (props: T & { children: any }) => any;
// const component: FunctionalComponent<{ name: string, age: number }> = (
//     {
//         children
//     }
// ) => {
// }
// function createStore<T>(reducer: (state: T, action: { type: string, payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     // let subscribing;
//     // function dispatch(action) {
//     //     reducer(state, action);
//     //     return action;
//     // }
//     return {
//         getState: () => state,
//         dispatch(action) {
//             state = reducer(state, action);
//             // subscribing()
//             return action;
//         },
//         // subscribe(subscrib) {
//         //     subscribing = subscrib;
//         // }
//     }
// }
// function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     let subscribing;
//     function dispatch(action: {
//         type: string;
//         payload?: Partial<T>
//     }) {
//         reducer(state, action);
//     }
//     return {
//         getState: () => state,
//         dispatch(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib;
//         }
//     }
// }
// interface Action<T> {
//     type: string;
//     payload?: Partial<T>
// }
// interface Reducer<T> {
//     state: T;
//     action: Action<T>;
// }
// interface CreateStoreInterface<T> {
//     reducer: Reducer<T>;
//     initialState: T;
// }
},{"./redux/store":"redux/store.ts"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59741" + '/');
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/My%20redux.77de5100.js.map