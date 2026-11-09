import { r as reactExports, j as jsxRuntimeExports, R as React } from "./react.mjs";
import { C as Clock, V as Vector3, a as Vector2, W as WebGLRenderer, R as Raycaster, O as OrthographicCamera, P as PerspectiveCamera, S as Scene, b as PCFSoftShadowMap, c as VSMShadowMap, d as PCFShadowMap, B as BasicShadowMap, e as ColorManagement, L as LinearSRGBColorSpace, f as SRGBColorSpace, N as NoToneMapping, A as ACESFilmicToneMapping, g as Layers, h as Color, i as ShaderMaterial, j as RGBAFormat, U as UnsignedByteType, T as THREE } from "./three.mjs";
import { c as createWithEqualityFn } from "./zustand.mjs";
import { m, M, l, N, h } from "./its-fine.mjs";
import { s as schedulerExports, w as w1 } from "./scheduler.mjs";
import { j } from "./react-use-measure.mjs";
const useIsomorphicLayoutEffect = /* @__PURE__ */ ((_window$document, _window$navigator) => typeof window !== "undefined" && (((_window$document = window.document) == null ? void 0 : _window$document.createElement) || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative"))() ? reactExports.useLayoutEffect : reactExports.useEffect;
function useMutableCallback(fn) {
  const ref = reactExports.useRef(fn);
  useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn]);
  return ref;
}
function Gate({
  promise,
  onSettled
}) {
  reactExports.use(promise);
  useIsomorphicLayoutEffect(onSettled, [onSettled]);
  return null;
}
function useGate() {
  const [promise, setPromise] = reactExports.useState(null);
  const onSettled = reactExports.useCallback(() => setPromise(null), []);
  const waitFor = reactExports.useCallback((next) => setPromise((current) => current != null ? current : Promise.resolve(next).then(() => {
  }, () => {
  })), []);
  const gate = promise ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, {
    fallback: null,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gate, {
      promise,
      onSettled
    })
  }) : null;
  return [gate, waitFor];
}
const useActivityBridge = reactExports.Activity ? N : () => reactExports.Fragment;
function useBridge() {
  const fiber = m();
  const ContextBridge = M();
  const ActivityBridge = useActivityBridge();
  return reactExports.useMemo(() => ({
    children
  }) => {
    const strict = !!l(fiber, true, (node) => node.type === reactExports.StrictMode);
    const Root = strict ? reactExports.StrictMode : reactExports.Fragment;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityBridge, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextBridge, {
          children
        })
      })
    });
  }, [fiber, ContextBridge, ActivityBridge]);
}
function Block({
  set
}) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null));
    return () => set(false);
  }, [set]);
  return null;
}
const ErrorBoundary = /* @__PURE__ */ ((_ErrorBoundary) => (_ErrorBoundary = class ErrorBoundary extends reactExports.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: false
    };
  }
  componentDidCatch(err) {
    this.props.set(err);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}, _ErrorBoundary.getDerivedStateFromError = () => ({
  error: true
}), _ErrorBoundary))();
function findInitialRoot(instance) {
  let root = instance.root;
  while (root.getState().previousRoot) root = root.getState().previousRoot;
  return root;
}
const isOrthographicCamera = (def) => def && def.isOrthographicCamera;
const isRef = (obj) => obj && obj.hasOwnProperty("current");
const isColorRepresentation = (value) => value != null && (typeof value === "string" || typeof value === "number" || value.isColor);
const noop = () => {
};
function calculateDpr(dpr) {
  var _window$devicePixelRa;
  const target = typeof window !== "undefined" ? (_window$devicePixelRa = window.devicePixelRatio) != null ? _window$devicePixelRa : 2 : 1;
  return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], target), dpr[1]) : dpr;
}
function watchDpr(onChange) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function" || !window.devicePixelRatio) {
    return () => {
    };
  }
  let query;
  const listen = () => {
    try {
      var _query, _query2;
      query = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      if (typeof ((_query = query) == null ? void 0 : _query.addEventListener) === "function") query.addEventListener("change", handleChange);
      else (_query2 = query) == null ? void 0 : _query2.addListener == null ? void 0 : _query2.addListener(handleChange);
    } catch {
      query = void 0;
    }
  };
  const unlisten = () => {
    var _query3, _query4;
    if (typeof ((_query3 = query) == null ? void 0 : _query3.removeEventListener) === "function") query.removeEventListener("change", handleChange);
    else (_query4 = query) == null ? void 0 : _query4.removeListener == null ? void 0 : _query4.removeListener(handleChange);
    query = void 0;
  };
  const handleChange = () => {
    unlisten();
    listen();
    onChange();
  };
  listen();
  return unlisten;
}
function getRootState(obj) {
  var _r3f;
  return (_r3f = obj.__r3f) == null ? void 0 : _r3f.root.getState();
}
const is = {
  obj: (a) => a === Object(a) && !is.arr(a) && typeof a !== "function",
  fun: (a) => typeof a === "function",
  str: (a) => typeof a === "string",
  num: (a) => typeof a === "number",
  boo: (a) => typeof a === "boolean",
  und: (a) => a === void 0,
  nul: (a) => a === null,
  arr: (a) => Array.isArray(a),
  equ(a, b, {
    arrays = "shallow",
    objects = "reference",
    strict = true
  } = {}) {
    if (typeof a !== typeof b || !!a !== !!b) return false;
    if (is.str(a) || is.num(a) || is.boo(a)) return a === b;
    const isObj = is.obj(a);
    if (isObj && objects === "reference") return a === b;
    const isArr = is.arr(a);
    if (isArr && arrays === "reference") return a === b;
    if ((isArr || isObj) && a === b) return true;
    let i2;
    for (i2 in a) if (!(i2 in b)) return false;
    if (isObj && arrays === "shallow" && objects === "shallow") {
      for (i2 in strict ? b : a) if (!is.equ(a[i2], b[i2], {
        strict,
        objects: "reference"
      })) return false;
    } else {
      for (i2 in strict ? b : a) if (a[i2] !== b[i2]) return false;
    }
    if (is.und(i2)) {
      if (isArr && a.length === 0 && b.length === 0) return true;
      if (isObj && Object.keys(a).length === 0 && Object.keys(b).length === 0) return true;
      if (a !== b) return false;
    }
    return true;
  }
};
function dispose(obj) {
  if (obj.type !== "Scene") obj.dispose == null ? void 0 : obj.dispose();
  for (const p in obj) {
    const prop = obj[p];
    if ((prop == null ? void 0 : prop.type) !== "Scene") prop == null ? void 0 : prop.dispose == null ? void 0 : prop.dispose();
  }
}
const REACT_INTERNAL_PROPS = ["children", "key", "ref"];
function getInstanceProps(pendingProps) {
  const props = {};
  for (const key in pendingProps) {
    if (!REACT_INTERNAL_PROPS.includes(key)) props[key] = pendingProps[key];
  }
  return props;
}
function prepare(target, root, type, props) {
  const object = target;
  let instance = object == null ? void 0 : object.__r3f;
  if (!instance) {
    instance = {
      root,
      type,
      parent: null,
      children: [],
      props: getInstanceProps(props),
      object,
      eventCount: 0,
      handlers: {},
      previousVisible: void 0,
      isHidden: false
    };
    if (object) object.__r3f = instance;
  }
  return instance;
}
function resolve(root, key) {
  if (!key.includes("-")) return {
    root,
    key,
    target: root[key]
  };
  if (key in root) {
    return {
      root,
      key,
      target: root[key]
    };
  }
  let target = root;
  const parts = key.split("-");
  for (const part of parts) {
    if (typeof target !== "object" || target === null) {
      if (target !== void 0) {
        const remaining = parts.slice(parts.indexOf(part)).join("-");
        return {
          root: target,
          key: remaining,
          target: void 0
        };
      }
      return {
        root,
        key,
        target: void 0
      };
    }
    key = part;
    root = target;
    target = target[key];
  }
  return {
    root,
    key,
    target
  };
}
const INDEX_REGEX = /-\d+$/;
function attach(parent, child) {
  if (is.str(child.props.attach)) {
    if (INDEX_REGEX.test(child.props.attach)) {
      const index = child.props.attach.replace(INDEX_REGEX, "");
      const {
        root: root2,
        key: key2
      } = resolve(parent.object, index);
      if (!Array.isArray(root2[key2])) root2[key2] = [];
    }
    const {
      root,
      key
    } = resolve(parent.object, child.props.attach);
    child.previousAttach = root[key];
    root[key] = child.object;
  } else if (is.fun(child.props.attach)) {
    child.previousAttach = child.props.attach(parent.object, child.object);
  }
}
function detach(parent, child) {
  if (is.str(child.props.attach)) {
    const {
      root,
      key
    } = resolve(parent.object, child.props.attach);
    const previous = child.previousAttach;
    if (previous === void 0) delete root[key];
    else root[key] = previous;
  } else {
    child.previousAttach == null ? void 0 : child.previousAttach(parent.object, child.object);
  }
  delete child.previousAttach;
}
const RESERVED_PROPS = [
  ...REACT_INTERNAL_PROPS,
  // Instance props
  "args",
  "dispose",
  "attach",
  "object",
  "onUpdate",
  // Behavior flags
  "dispose"
];
const MEMOIZED_PROTOTYPES = /* @__PURE__ */ new Map();
function getMemoizedPrototype(root) {
  let ctor = MEMOIZED_PROTOTYPES.get(root.constructor);
  try {
    if (!ctor) {
      ctor = new root.constructor();
      MEMOIZED_PROTOTYPES.set(root.constructor, ctor);
    }
  } catch (e2) {
  }
  return ctor;
}
function diffProps(instance, newProps) {
  const changedProps = {};
  for (const prop in newProps) {
    if (RESERVED_PROPS.includes(prop)) continue;
    if (is.equ(newProps[prop], instance.props[prop])) continue;
    changedProps[prop] = newProps[prop];
    for (const other in newProps) {
      if (other.startsWith(`${prop}-`)) changedProps[other] = newProps[other];
    }
  }
  for (const prop in instance.props) {
    if (RESERVED_PROPS.includes(prop) || newProps.hasOwnProperty(prop)) continue;
    const {
      root,
      key
    } = resolve(instance.object, prop);
    if (root.constructor && root.constructor.length === 0) {
      const ctor = getMemoizedPrototype(root);
      if (!is.und(ctor)) changedProps[prop] = ctor[key];
    } else {
      changedProps[prop] = 0;
    }
  }
  return changedProps;
}
const colorMaps = ["map", "emissiveMap", "sheenColorMap", "specularColorMap", "envMap"];
const EVENT_REGEX = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
function applyProps(object, props) {
  var _instance$object;
  const instance = object.__r3f;
  const rootState = instance && findInitialRoot(instance).getState();
  const prevHandlers = instance == null ? void 0 : instance.eventCount;
  for (const prop in props) {
    let value = props[prop];
    if (RESERVED_PROPS.includes(prop)) continue;
    if (instance && EVENT_REGEX.test(prop)) {
      if (typeof value === "function") instance.handlers[prop] = value;
      else delete instance.handlers[prop];
      instance.eventCount = Object.keys(instance.handlers).length;
      continue;
    }
    if (value === void 0) continue;
    if (prop === "visible" && instance != null && instance.isHidden && instance.previousVisible !== void 0) {
      instance.previousVisible = value;
      continue;
    }
    let {
      root,
      key,
      target
    } = resolve(object, prop);
    if (target === void 0 && (typeof root !== "object" || root === null)) {
      throw Error(`R3F: Cannot set "${prop}". Ensure it is an object before setting "${key}".`);
    }
    if (target instanceof Layers && value instanceof Layers) {
      target.mask = value.mask;
    } else if (target instanceof Color && isColorRepresentation(value)) {
      target.set(value);
    } else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof target.copy === "function" && value != null && value.constructor && target.constructor === value.constructor) {
      target.copy(value);
    } else if (target !== null && typeof target === "object" && typeof target.set === "function" && Array.isArray(value)) {
      if (typeof target.fromArray === "function") target.fromArray(value);
      else target.set(...value);
    } else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof value === "number") {
      if (typeof target.setScalar === "function") target.setScalar(value);
      else target.set(value);
    } else if (root instanceof ShaderMaterial && key === "uniforms" && is.obj(value)) {
      if (!is.obj(root.uniforms)) root.uniforms = {};
      const uniforms = root.uniforms;
      const nextUniforms = value;
      for (const name in nextUniforms) {
        const uniform = nextUniforms[name];
        const targetUniform = uniforms[name];
        if (targetUniform) Object.assign(targetUniform, uniform);
        else uniforms[name] = {
          ...uniform
        };
      }
    } else {
      var _root$key;
      root[key] = value;
      if (rootState && !rootState.linear && colorMaps.includes(key) && (_root$key = root[key]) != null && _root$key.isTexture && // sRGB textures must be RGBA8 since r137 https://github.com/mrdoob/three.js/pull/23129
      root[key].format === RGBAFormat && root[key].type === UnsignedByteType) {
        root[key].colorSpace = SRGBColorSpace;
      }
    }
  }
  if (instance != null && instance.parent && rootState != null && rootState.internal && (_instance$object = instance.object) != null && _instance$object.isObject3D && prevHandlers !== instance.eventCount) {
    const object2 = instance.object;
    const index = rootState.internal.interaction.indexOf(object2);
    if (index > -1) rootState.internal.interaction.splice(index, 1);
    if (instance.eventCount && object2.raycast !== null) {
      rootState.internal.interaction.push(object2);
    }
  }
  if (instance && instance.props.attach === void 0) {
    if (instance.object.isBufferGeometry) instance.props.attach = "geometry";
    else if (instance.object.isMaterial) instance.props.attach = "material";
  }
  if (instance) invalidateInstance(instance);
  return object;
}
function invalidateInstance(instance) {
  var _instance$root;
  if (!instance.parent) return;
  instance.props.onUpdate == null ? void 0 : instance.props.onUpdate(instance.object);
  const state2 = (_instance$root = instance.root) == null ? void 0 : _instance$root.getState == null ? void 0 : _instance$root.getState();
  if (state2 && state2.internal.frames === 0) state2.invalidate();
}
function updateCamera(camera, size) {
  if (camera.manual) return;
  if (isOrthographicCamera(camera)) {
    camera.left = size.width / -2;
    camera.right = size.width / 2;
    camera.top = size.height / 2;
    camera.bottom = size.height / -2;
  } else {
    camera.aspect = size.width / size.height;
  }
  camera.updateProjectionMatrix();
}
const isObject3D = (object) => object == null ? void 0 : object.isObject3D;
function makeId(event) {
  return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
function releaseInternalPointerCapture(capturedMap, obj, captures, pointerId) {
  const captureData = captures.get(obj);
  if (captureData) {
    captures.delete(obj);
    if (captures.size === 0) {
      capturedMap.delete(pointerId);
      captureData.target.releasePointerCapture(pointerId);
    }
  }
}
function swapInteractivity(store, object, newObject) {
  const {
    internal
  } = store.getState();
  for (let i2 = 0; i2 < internal.interaction.length; i2++) {
    if (internal.interaction[i2] === object) internal.interaction[i2] = newObject;
  }
  for (let i2 = 0; i2 < internal.initialHits.length; i2++) {
    if (internal.initialHits[i2] === object) internal.initialHits[i2] = newObject;
  }
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
      const next = {
        ...value,
        eventObject: value.eventObject === object ? newObject : value.eventObject,
        object: value.object === object ? newObject : value.object
      };
      internal.hovered.set(makeId(next), next);
    }
  });
  internal.capturedMap.forEach((captures) => {
    for (const [key, captureData] of Array.from(captures)) {
      const {
        intersection
      } = captureData;
      if (key !== object && intersection.object !== object && intersection.eventObject !== object) continue;
      if (key === object) captures.delete(key);
      captures.set(key === object ? newObject : key, {
        ...captureData,
        intersection: {
          ...intersection,
          object: intersection.object === object ? newObject : intersection.object,
          eventObject: intersection.eventObject === object ? newObject : intersection.eventObject
        }
      });
    }
  });
}
function removeInteractivity(store, object) {
  const {
    internal
  } = store.getState();
  internal.interaction = internal.interaction.filter((o2) => o2 !== object);
  internal.initialHits = internal.initialHits.filter((o2) => o2 !== object);
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
    }
  });
  internal.capturedMap.forEach((captures, pointerId) => {
    releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
  });
}
function createEvents(store) {
  function calculateDistance(event) {
    const {
      internal
    } = store.getState();
    const dx = event.offsetX - internal.initialClick[0];
    const dy = event.offsetY - internal.initialClick[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  function filterPointerEvents(objects) {
    return objects.filter((obj) => ["Move", "Over", "Enter", "Out", "Leave"].some((name) => {
      var _r3f;
      return (_r3f = obj.__r3f) == null ? void 0 : _r3f.handlers["onPointer" + name];
    }));
  }
  function intersect(event, filter) {
    const state2 = store.getState();
    const duplicates = /* @__PURE__ */ new Set();
    const intersections = [];
    const eventsObjects = filter ? filter(state2.internal.interaction) : state2.internal.interaction;
    for (let i2 = 0; i2 < eventsObjects.length; i2++) {
      const state3 = getRootState(eventsObjects[i2]);
      if (state3) {
        state3.raycaster.camera = void 0;
      }
    }
    if (!state2.previousRoot) {
      state2.events.compute == null ? void 0 : state2.events.compute(event, state2);
    }
    function handleRaycast(obj) {
      const state3 = getRootState(obj);
      if (!state3 || !state3.events.enabled || state3.raycaster.camera === null) return [];
      if (state3.raycaster.camera === void 0) {
        var _state$previousRoot;
        state3.events.compute == null ? void 0 : state3.events.compute(event, state3, (_state$previousRoot = state3.previousRoot) == null ? void 0 : _state$previousRoot.getState());
        if (state3.raycaster.camera === void 0) state3.raycaster.camera = null;
      }
      return state3.raycaster.camera ? state3.raycaster.intersectObject(obj, true) : [];
    }
    let hits = eventsObjects.flatMap(handleRaycast).sort((a, b) => {
      const aState = getRootState(a.object);
      const bState = getRootState(b.object);
      if (!aState || !bState) return a.distance - b.distance;
      return bState.events.priority - aState.events.priority || a.distance - b.distance;
    }).filter((item) => {
      const id = makeId(item);
      if (duplicates.has(id)) return false;
      duplicates.add(id);
      return true;
    });
    if (state2.events.filter) hits = state2.events.filter(hits, state2);
    for (const hit of hits) {
      let eventObject = hit.object;
      while (eventObject) {
        var _r3f2;
        if ((_r3f2 = eventObject.__r3f) != null && _r3f2.eventCount) intersections.push({
          ...hit,
          eventObject
        });
        eventObject = eventObject.parent;
      }
    }
    if ("pointerId" in event && state2.internal.capturedMap.has(event.pointerId)) {
      for (let captureData of state2.internal.capturedMap.get(event.pointerId).values()) {
        if (!duplicates.has(makeId(captureData.intersection))) intersections.push(captureData.intersection);
      }
    }
    return intersections;
  }
  function handleIntersects(intersections, event, delta, callback) {
    if (intersections.length) {
      const localState = {
        stopped: false
      };
      for (const hit of intersections) {
        let state2 = getRootState(hit.object);
        if (!state2) {
          hit.object.traverseAncestors((obj) => {
            const parentState = getRootState(obj);
            if (parentState) {
              state2 = parentState;
              return false;
            }
          });
        }
        if (state2) {
          const {
            raycaster,
            pointer,
            camera,
            internal
          } = state2;
          const unprojectedPoint = new Vector3(pointer.x, pointer.y, 0).unproject(camera);
          const hasPointerCapture = (id) => {
            var _internal$capturedMap, _internal$capturedMap2;
            return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
          };
          const setPointerCapture = (id) => {
            const captureData = {
              intersection: hit,
              target: event.target
            };
            if (internal.capturedMap.has(id)) {
              internal.capturedMap.get(id).set(hit.eventObject, captureData);
            } else {
              internal.capturedMap.set(id, /* @__PURE__ */ new Map([[hit.eventObject, captureData]]));
            }
            event.target.setPointerCapture(id);
          };
          const releasePointerCapture = (id) => {
            const captures = internal.capturedMap.get(id);
            if (captures) {
              releaseInternalPointerCapture(internal.capturedMap, hit.eventObject, captures, id);
            }
          };
          let extractEventProps = {};
          for (let prop in event) {
            let property = event[prop];
            if (typeof property !== "function") extractEventProps[prop] = property;
          }
          let raycastEvent = {
            ...hit,
            ...extractEventProps,
            pointer,
            intersections,
            stopped: localState.stopped,
            delta,
            unprojectedPoint,
            ray: raycaster.ray,
            camera,
            // Hijack stopPropagation, which just sets a flag
            stopPropagation() {
              const capturesForPointer = "pointerId" in event && internal.capturedMap.get(event.pointerId);
              if (
                // ...if this pointer hasn't been captured
                !capturesForPointer || // ... or if the hit object is capturing the pointer
                capturesForPointer.has(hit.eventObject)
              ) {
                raycastEvent.stopped = localState.stopped = true;
                if (internal.hovered.size && Array.from(internal.hovered.values()).find((i2) => i2.eventObject === hit.eventObject)) {
                  const higher = intersections.slice(0, intersections.indexOf(hit));
                  cancelPointer([...higher, hit]);
                }
              }
            },
            // there should be a distinction between target and currentTarget
            target: {
              hasPointerCapture,
              setPointerCapture,
              releasePointerCapture
            },
            currentTarget: {
              hasPointerCapture,
              setPointerCapture,
              releasePointerCapture
            },
            nativeEvent: event
          };
          callback(raycastEvent);
          if (localState.stopped === true) break;
        }
      }
    }
    return intersections;
  }
  function cancelPointer(intersections) {
    const {
      internal
    } = store.getState();
    for (const hoveredObj of internal.hovered.values()) {
      if (!intersections.length || !intersections.find((hit) => hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId)) {
        const eventObject = hoveredObj.eventObject;
        const instance = eventObject.__r3f;
        internal.hovered.delete(makeId(hoveredObj));
        if (instance != null && instance.eventCount) {
          const handlers = instance.handlers;
          const data = {
            ...hoveredObj,
            intersections
          };
          handlers.onPointerOut == null ? void 0 : handlers.onPointerOut(data);
          handlers.onPointerLeave == null ? void 0 : handlers.onPointerLeave(data);
        }
      }
    }
  }
  function pointerMissed(event, objects) {
    for (let i2 = 0; i2 < objects.length; i2++) {
      const instance = objects[i2].__r3f;
      instance == null ? void 0 : instance.handlers.onPointerMissed == null ? void 0 : instance.handlers.onPointerMissed(event);
    }
  }
  function handlePointer(name) {
    switch (name) {
      case "onPointerLeave":
      case "onPointerCancel":
        return () => cancelPointer([]);
      case "onLostPointerCapture":
        return (event) => {
          const {
            internal
          } = store.getState();
          if ("pointerId" in event && internal.capturedMap.has(event.pointerId)) {
            requestAnimationFrame(() => {
              if (internal.capturedMap.has(event.pointerId)) {
                internal.capturedMap.delete(event.pointerId);
                cancelPointer([]);
              }
            });
          }
        };
    }
    return function handleEvent(event) {
      const {
        onPointerMissed,
        internal
      } = store.getState();
      internal.lastEvent.current = event;
      const isPointerMove = name === "onPointerMove";
      const isClickEvent = name === "onClick" || name === "onContextMenu" || name === "onDoubleClick";
      const filter = isPointerMove ? filterPointerEvents : void 0;
      const hits = intersect(event, filter);
      const delta = isClickEvent ? calculateDistance(event) : 0;
      if (name === "onPointerDown") {
        internal.initialClick = [event.offsetX, event.offsetY];
        internal.initialHits = hits.map((hit) => hit.eventObject);
      }
      if (isClickEvent && !hits.length) {
        if (delta <= 2) {
          pointerMissed(event, internal.interaction);
          if (onPointerMissed) onPointerMissed(event);
        }
      }
      if (isPointerMove) cancelPointer(hits);
      function onIntersect(data) {
        const eventObject = data.eventObject;
        const instance = eventObject.__r3f;
        if (!(instance != null && instance.eventCount)) return;
        const handlers = instance.handlers;
        if (isPointerMove) {
          if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
            const id = makeId(data);
            const hoveredItem = internal.hovered.get(id);
            if (!hoveredItem) {
              internal.hovered.set(id, data);
              handlers.onPointerOver == null ? void 0 : handlers.onPointerOver(data);
              handlers.onPointerEnter == null ? void 0 : handlers.onPointerEnter(data);
            } else if (hoveredItem.stopped) {
              data.stopPropagation();
            }
          }
          handlers.onPointerMove == null ? void 0 : handlers.onPointerMove(data);
        } else {
          const handler = handlers[name];
          if (handler) {
            if (!isClickEvent || internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
              handler(data);
            }
          } else {
            if (isClickEvent && internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
            }
          }
        }
      }
      handleIntersects(hits, event, delta, onIntersect);
    };
  }
  return {
    handlePointer
  };
}
const isPromiseLike = (value) => typeof (value == null ? void 0 : value.then) === "function";
const fulfilled = (value) => Object.assign(Promise.resolve(value), {
  status: "fulfilled",
  value
});
const rejected = (reason) => {
  const promise = Promise.reject(reason);
  promise.catch(() => {
  });
  return Object.assign(promise, {
    status: "rejected",
    reason
  });
};
const deferred = () => {
  let resolve2;
  let reject;
  const promise = new Promise((yes, no) => {
    resolve2 = (value) => {
      Object.assign(promise, {
        status: "fulfilled",
        value
      });
      yes(value);
    };
    reject = (reason) => {
      Object.assign(promise, {
        status: "rejected",
        reason
      });
      no(reason);
    };
  });
  promise.status = "pending";
  promise.catch(() => {
  });
  return {
    promise,
    resolve: resolve2,
    reject
  };
};
const isRenderer = (def) => !!(def != null && def.render);
function createRenderer(canvas, gl) {
  const defaults = {
    canvas,
    powerPreference: "high-performance",
    antialias: true,
    alpha: true
  };
  if (typeof gl === "function") return gl(defaults);
  if (isRenderer(gl)) return gl;
  return new WebGLRenderer({
    ...defaults,
    ...gl
  });
}
function disposeRenderer(gl) {
  if ((gl.hasInitialized == null ? void 0 : gl.hasInitialized()) === false) return;
  const disposed = attempt$1(() => {
    var _gl$renderLists;
    return gl.dispose ? gl.dispose() : (_gl$renderLists = gl.renderLists) == null ? void 0 : _gl$renderLists.dispose == null ? void 0 : _gl$renderLists.dispose();
  });
  if (isPromiseLike(disposed)) {
    return Promise.resolve(disposed).catch((error) => console.warn("[R3F] Error disposing renderer", error)).then(() => attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss()));
  }
  attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss());
}
function releaseRenderer(gl, owned) {
  if (!gl) return;
  if (owned) return disposeRenderer(gl);
  attempt$1(() => {
    var _gl$renderLists2;
    return (_gl$renderLists2 = gl.renderLists) == null ? void 0 : _gl$renderLists2.dispose == null ? void 0 : _gl$renderLists2.dispose();
  });
  attempt$1(() => gl.forceContextLoss == null ? void 0 : gl.forceContextLoss());
}
function attempt$1(step) {
  try {
    return step();
  } catch (error) {
    console.warn("[R3F] Error while unmounting root; teardown may be incomplete:", error);
  }
}
const context = /* @__PURE__ */ reactExports.createContext(null);
const createStore = (invalidate2, advance2) => {
  const rootStore = createWithEqualityFn((set, get) => {
    const position = new Vector3();
    const defaultTarget = new Vector3();
    const tempTarget = new Vector3();
    function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
      const {
        width,
        height,
        top,
        left
      } = size;
      const aspect = width / height;
      if (target.isVector3) tempTarget.copy(target);
      else tempTarget.set(...target);
      const distance = camera.getWorldPosition(position).distanceTo(tempTarget);
      if (isOrthographicCamera(camera)) {
        return {
          width: width / camera.zoom,
          height: height / camera.zoom,
          top,
          left,
          factor: 1,
          distance,
          aspect
        };
      } else {
        const fov = camera.fov * Math.PI / 180;
        const h2 = 2 * Math.tan(fov / 2) * distance;
        const w = h2 * (width / height);
        return {
          width: w,
          height: h2,
          top,
          left,
          factor: width / w,
          distance,
          aspect
        };
      }
    }
    let performanceTimeout = void 0;
    const setPerformanceCurrent = (current) => set((state3) => ({
      performance: {
        ...state3.performance,
        current
      }
    }));
    const pointer = new Vector2();
    const rootState = {
      set,
      get,
      // Mock objects that have to be configured
      gl: null,
      camera: null,
      raycaster: null,
      events: {
        priority: 1,
        enabled: true,
        connected: false
      },
      scene: null,
      xr: null,
      invalidate: (frames = 1) => invalidate2(get(), frames),
      advance: (timestamp, runGlobalEffects) => advance2(timestamp, runGlobalEffects, get()),
      legacy: false,
      linear: false,
      flat: false,
      controls: null,
      clock: new Clock(),
      pointer,
      mouse: pointer,
      frameloop: "always",
      onPointerMissed: void 0,
      performance: {
        current: 1,
        min: 0.5,
        max: 1,
        debounce: 200,
        regress: () => {
          const state3 = get();
          if (performanceTimeout) clearTimeout(performanceTimeout);
          if (state3.performance.current !== state3.performance.min) setPerformanceCurrent(state3.performance.min);
          performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state3.performance.debounce);
        }
      },
      size: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      },
      viewport: {
        initialDpr: 0,
        dpr: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        aspect: 0,
        distance: 0,
        factor: 0,
        getCurrentViewport
      },
      setEvents: (events) => set((state3) => ({
        ...state3,
        events: {
          ...state3.events,
          ...events
        }
      })),
      setSize: (width, height, top = 0, left = 0) => {
        const camera = get().camera;
        const size = {
          width,
          height,
          top,
          left
        };
        set((state3) => ({
          size,
          viewport: {
            ...state3.viewport,
            ...getCurrentViewport(camera, defaultTarget, size)
          }
        }));
      },
      setDpr: (dpr) => set((state3) => {
        const resolved = calculateDpr(dpr);
        return {
          viewport: {
            ...state3.viewport,
            dpr: resolved,
            initialDpr: state3.viewport.initialDpr || resolved
          }
        };
      }),
      setFrameloop: (frameloop = "always") => {
        const clock = get().clock;
        clock.stop();
        clock.elapsedTime = 0;
        if (frameloop !== "never") {
          clock.start();
          clock.elapsedTime = 0;
        }
        set(() => ({
          frameloop
        }));
      },
      previousRoot: void 0,
      internal: {
        // Events
        interaction: [],
        hovered: /* @__PURE__ */ new Map(),
        subscribers: [],
        initialClick: [0, 0],
        initialHits: [],
        capturedMap: /* @__PURE__ */ new Map(),
        lastEvent: /* @__PURE__ */ reactExports.createRef(),
        // Updates
        active: false,
        frames: 0,
        priority: 0,
        subscribe: (ref, priority, store) => {
          const internal = get().internal;
          internal.priority = internal.priority + (priority > 0 ? 1 : 0);
          internal.subscribers.push({
            ref,
            priority,
            store
          });
          internal.subscribers = internal.subscribers.sort((a, b) => a.priority - b.priority);
          return () => {
            const internal2 = get().internal;
            if (internal2 != null && internal2.subscribers) {
              internal2.priority = internal2.priority - (priority > 0 ? 1 : 0);
              internal2.subscribers = internal2.subscribers.filter((s) => s.ref !== ref);
            }
          };
        }
      }
    };
    return rootState;
  });
  const state2 = rootStore.getState();
  let oldSize = state2.size;
  let oldDpr = state2.viewport.dpr;
  let oldCamera = state2.camera;
  rootStore.subscribe(() => {
    const {
      camera,
      size,
      viewport,
      gl,
      set
    } = rootStore.getState();
    if (size.width !== oldSize.width || size.height !== oldSize.height || viewport.dpr !== oldDpr) {
      oldSize = size;
      oldDpr = viewport.dpr;
      updateCamera(camera, size);
      if (viewport.dpr > 0) gl.setPixelRatio(viewport.dpr);
      const updateStyle = typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
      gl.setSize(size.width, size.height, updateStyle);
    }
    if (camera !== oldCamera) {
      oldCamera = camera;
      set((state3) => ({
        viewport: {
          ...state3.viewport,
          ...state3.viewport.getCurrentViewport(camera)
        }
      }));
    }
  });
  rootStore.subscribe((state3) => invalidate2(state3));
  return rootStore;
};
function useStore() {
  const store = reactExports.useContext(context);
  if (!store) throw new Error("R3F: Hooks can only be used within the Canvas component!");
  return store;
}
function useThree(selector = (state2) => state2, equalityFn) {
  return useStore()(selector, equalityFn);
}
function useFrame(callback, renderPriority = 0) {
  const store = useStore();
  const subscribe = store.getState().internal.subscribe;
  const ref = useMutableCallback(callback);
  useIsomorphicLayoutEffect(() => subscribe(ref, renderPriority, store), [renderPriority, subscribe, store]);
  return null;
}
const t = 1, o = 8, r = 32, e = 2, i$1 = 268435456;
const shallow = {
  objects: "shallow"
};
function computeInitialSize(canvas, size) {
  if (!size && typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement && canvas.parentElement) {
    const {
      width,
      height,
      top,
      left
    } = canvas.parentElement.getBoundingClientRect();
    return {
      width,
      height,
      top,
      left
    };
  } else if (!size && typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return {
      width: canvas.width,
      height: canvas.height,
      top: 0,
      left: 0
    };
  }
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    ...size
  };
}
function applyRootConfiguration({
  store,
  configuration
}, canvas, props) {
  const {
    gl: glConfig,
    scene: sceneOptions,
    camera: cameraOptions,
    shadows = false,
    linear = false,
    flat = false,
    legacy = false,
    frameloop = "always",
    dpr = [1, 2],
    performance: performance2,
    onPointerMissed
  } = props;
  const size = computeInitialSize(canvas, props.size);
  const next = {
    ...props,
    shadows,
    linear,
    flat,
    legacy,
    frameloop,
    size
  };
  const state2 = store.getState();
  const gl = state2.gl;
  const last = configuration.previous;
  const changed = (key) => !last || !is.equ(next[key], last[key], shallow);
  configuration.previous = void 0;
  let raycaster = state2.raycaster;
  if (!raycaster) state2.set({
    raycaster: raycaster = new Raycaster()
  });
  if (changed("raycaster")) {
    var _props$raycaster;
    const {
      params,
      ...options
    } = (_props$raycaster = props.raycaster) != null ? _props$raycaster : {};
    applyProps(raycaster, {
      ...options,
      params: {
        ...raycaster.params,
        ...params
      }
    });
  }
  if (!state2.camera || state2.camera === configuration.camera && changed("camera")) {
    configuration.camera = cameraOptions;
    const isCamera = cameraOptions == null ? void 0 : cameraOptions.isCamera;
    const camera = isCamera ? cameraOptions : props.orthographic ? new OrthographicCamera(0, 0, 0, 0, 0.1, 1e3) : new PerspectiveCamera(75, 0, 0.1, 1e3);
    if (!isCamera) {
      camera.position.z = 5;
      if (cameraOptions) {
        applyProps(camera, cameraOptions);
        if (!camera.manual) {
          if ("aspect" in cameraOptions || "left" in cameraOptions || "right" in cameraOptions || "bottom" in cameraOptions || "top" in cameraOptions) {
            camera.manual = true;
            camera.updateProjectionMatrix();
          }
        }
      }
      if (!state2.camera && !(cameraOptions != null && cameraOptions.rotation)) camera.lookAt(0, 0, 0);
    }
    state2.set({
      camera
    });
    raycaster.camera = camera;
  }
  if (!state2.scene) {
    let scene;
    if (sceneOptions != null && sceneOptions.isScene) {
      scene = sceneOptions;
      prepare(scene, store, "", {});
    } else {
      scene = new Scene();
      prepare(scene, store, "", {});
      if (sceneOptions) applyProps(scene, sceneOptions);
    }
    state2.set({
      scene
    });
  }
  if (props.events && !state2.events.handlers) state2.set({
    events: props.events(store)
  });
  if (changed("size")) state2.setSize(size.width, size.height, size.top, size.left);
  if (state2.viewport.dpr !== calculateDpr(dpr)) state2.setDpr(dpr);
  if (changed("frameloop")) state2.setFrameloop(frameloop);
  if (changed("onPointerMissed")) state2.set({
    onPointerMissed
  });
  if (performance2 && changed("performance")) {
    state2.set((state3) => ({
      performance: {
        ...state3.performance,
        ...performance2
      }
    }));
  }
  if (!state2.xr) {
    var _gl$xr;
    const handleXRFrame = (timestamp, frame2) => {
      const state3 = store.getState();
      if (state3.frameloop === "never") return;
      advance(timestamp, true, state3, frame2);
    };
    const handleSessionChange = () => {
      const state3 = store.getState();
      state3.gl.xr.enabled = state3.gl.xr.isPresenting;
      state3.gl.xr.setAnimationLoop(state3.gl.xr.isPresenting ? handleXRFrame : null);
      if (!state3.gl.xr.isPresenting) invalidate(state3);
    };
    const xr = {
      connect() {
        const gl2 = store.getState().gl;
        gl2.xr.addEventListener("sessionstart", handleSessionChange);
        gl2.xr.addEventListener("sessionend", handleSessionChange);
      },
      disconnect() {
        const gl2 = store.getState().gl;
        gl2.xr.removeEventListener("sessionstart", handleSessionChange);
        gl2.xr.removeEventListener("sessionend", handleSessionChange);
      }
    };
    if (typeof ((_gl$xr = gl.xr) == null ? void 0 : _gl$xr.addEventListener) === "function") xr.connect();
    state2.set({
      xr
    });
  }
  if (gl.shadowMap && changed("shadows")) {
    const oldEnabled = gl.shadowMap.enabled;
    const oldType = gl.shadowMap.type;
    gl.shadowMap.enabled = !!shadows;
    if (is.boo(shadows)) {
      gl.shadowMap.type = PCFSoftShadowMap;
    } else if (is.str(shadows)) {
      var _types$shadows;
      const types = {
        basic: BasicShadowMap,
        percentage: PCFShadowMap,
        soft: PCFSoftShadowMap,
        variance: VSMShadowMap
      };
      gl.shadowMap.type = (_types$shadows = types[shadows]) != null ? _types$shadows : PCFSoftShadowMap;
    } else if (is.obj(shadows)) {
      Object.assign(gl.shadowMap, shadows);
    }
    if (oldEnabled !== gl.shadowMap.enabled || oldType !== gl.shadowMap.type) gl.shadowMap.needsUpdate = true;
  }
  const glProps = glConfig && !is.fun(glConfig) && !isRenderer(glConfig) ? glConfig : void 0;
  if (changed("legacy")) {
    ColorManagement.enabled = !legacy;
    state2.set({
      legacy
    });
  }
  if (changed("linear")) {
    if ((glProps == null ? void 0 : glProps.outputColorSpace) === void 0) {
      gl.outputColorSpace = linear ? LinearSRGBColorSpace : SRGBColorSpace;
    }
    state2.set({
      linear
    });
  }
  if (changed("flat")) {
    if ((glProps == null ? void 0 : glProps.toneMapping) === void 0) gl.toneMapping = flat ? NoToneMapping : ACESFilmicToneMapping;
    state2.set({
      flat
    });
  }
  if (glProps && changed("gl")) applyProps(gl, glProps);
  configuration.previous = next;
}
function followDpr(root) {
  const xr = () => {
    var _root$store$getState$;
    return (_root$store$getState$ = root.store.getState().gl) == null ? void 0 : _root$store$getState$.xr;
  };
  const follow = () => {
    var _xr, _xr2, _xr3, _last$dpr;
    const state2 = root.store.getState();
    if ((_xr = xr()) != null && _xr.isPresenting || (_xr2 = xr()) != null && _xr2.getSession != null && _xr2.getSession()) {
      xr().addEventListener("sessionend", follow);
      return;
    }
    (_xr3 = xr()) == null ? void 0 : _xr3.removeEventListener == null ? void 0 : _xr3.removeEventListener("sessionend", follow);
    const last = root.configuration.previous;
    if (!last) return;
    const dpr = (_last$dpr = last.dpr) != null ? _last$dpr : [1, 2];
    if (state2.viewport.dpr !== calculateDpr(dpr)) state2.setDpr(dpr);
  };
  const unwatch = watchDpr(follow);
  return () => {
    var _xr4;
    unwatch();
    (_xr4 = xr()) == null ? void 0 : _xr4.removeEventListener == null ? void 0 : _xr4.removeEventListener("sessionend", follow);
  };
}
var packageData = {
  version: "9.8.2"
};
function $1(Ut) {
  return Ut && Ut.__esModule && Object.prototype.hasOwnProperty.call(Ut, "default") ? Ut.default : Ut;
}
var S0 = {
  exports: {}
}, Ob = {
  exports: {}
};
var P1;
function Q1() {
  return P1 || (P1 = 1, (function(Ut) {
    Ut.exports = function(m2) {
      function et(t2, r2, a, l2) {
        return new Fe(t2, r2, a, l2);
      }
      function zf() {
      }
      function F(t2) {
        var r2 = "https://react.dev/errors/" + t2;
        if (1 < arguments.length) {
          r2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var a = 2; a < arguments.length; a++) r2 += "&args[]=" + encodeURIComponent(arguments[a]);
        }
        return "Minified React error #" + t2 + "; visit " + r2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function Ef(t2) {
        for (var r2 = t2, a = r2; a && !a.alternate; ) r2 = a, (r2.flags & 4098) !== 0 && (t2 = r2.return), a = r2.return;
        for (; r2.return; ) r2 = r2.return;
        return r2.tag === 3 ? t2 : null;
      }
      function pc(t2) {
        if (Ef(t2) !== t2) throw Error(F(188));
      }
      function hc(t2) {
        var r2 = t2.alternate;
        if (!r2) {
          if (r2 = Ef(t2), r2 === null) throw Error(F(188));
          return r2 !== t2 ? null : t2;
        }
        for (var a = t2, l2 = r2; ; ) {
          var c = a.return;
          if (c === null) break;
          var d = c.alternate;
          if (d === null) {
            if (l2 = c.return, l2 !== null) {
              a = l2;
              continue;
            }
            break;
          }
          if (c.child === d.child) {
            for (d = c.child; d; ) {
              if (d === a) return pc(c), t2;
              if (d === l2) return pc(c), r2;
              d = d.sibling;
            }
            throw Error(F(188));
          }
          if (a.return !== l2.return) a = c, l2 = d;
          else {
            for (var h2 = false, y = c.child; y; ) {
              if (y === a) {
                h2 = true, a = c, l2 = d;
                break;
              }
              if (y === l2) {
                h2 = true, l2 = c, a = d;
                break;
              }
              y = y.sibling;
            }
            if (!h2) {
              for (y = d.child; y; ) {
                if (y === a) {
                  h2 = true, a = d, l2 = c;
                  break;
                }
                if (y === l2) {
                  h2 = true, l2 = d, a = c;
                  break;
                }
                y = y.sibling;
              }
              if (!h2) throw Error(F(189));
            }
          }
          if (a.alternate !== l2) throw Error(F(190));
        }
        if (a.tag !== 3) throw Error(F(188));
        return a.stateNode.current === a ? t2 : r2;
      }
      function mc(t2) {
        var r2 = t2.tag;
        if (r2 === 5 || r2 === 26 || r2 === 27 || r2 === 6) return t2;
        for (t2 = t2.child; t2 !== null; ) {
          if (r2 = mc(t2), r2 !== null) return r2;
          t2 = t2.sibling;
        }
        return null;
      }
      function ht(t2) {
        var r2 = t2.tag;
        if (r2 === 5 || r2 === 26 || r2 === 27 || r2 === 6) return t2;
        for (t2 = t2.child; t2 !== null; ) {
          if (t2.tag !== 4 && (r2 = ht(t2), r2 !== null)) return r2;
          t2 = t2.sibling;
        }
        return null;
      }
      function Ss(t2) {
        return t2 === null || typeof t2 != "object" ? null : (t2 = ki && t2[ki] || t2["@@iterator"], typeof t2 == "function" ? t2 : null);
      }
      function gc(t2) {
        if (t2 == null) return null;
        if (typeof t2 == "function") return t2.$$typeof === Po ? null : t2.displayName || t2.name || null;
        if (typeof t2 == "string") return t2;
        switch (t2) {
          case wo:
            return "Fragment";
          case Pu:
            return "Profiler";
          case md:
            return "StrictMode";
          case xu:
            return "Suspense";
          case Cu:
            return "SuspenseList";
          case zu:
            return "Activity";
          case yd:
            return "ViewTransition";
        }
        if (typeof t2 == "object") switch (t2.$$typeof) {
          case Si:
            return "Portal";
          case Vr:
            return t2.displayName || "Context";
          case gd:
            return (t2._context.displayName || "Context") + ".Consumer";
          case bd:
            var r2 = t2.render;
            return t2 = t2.displayName, t2 || (t2 = r2.displayName || r2.name || "", t2 = t2 !== "" ? "ForwardRef(" + t2 + ")" : "ForwardRef"), t2;
          case Fl:
            return r2 = t2.displayName || null, r2 !== null ? r2 : gc(t2.type) || "Memo";
          case Ra:
            r2 = t2._payload, t2 = t2._init;
            try {
              return gc(t2(r2));
            } catch {
            }
        }
        return null;
      }
      function oo(t2) {
        return {
          current: t2
        };
      }
      function W(t2) {
        0 > Wa || (t2.current = Ml[Wa], Ml[Wa] = null, Wa--);
      }
      function Te(t2, r2) {
        Wa++, Ml[Wa] = t2.current, t2.current = r2;
      }
      function k0(t2) {
        return t2 >>>= 0, t2 === 0 ? 32 : 31 - (Fd(t2) / lh | 0) | 0;
      }
      function ma(t2) {
        var r2 = t2 & 42;
        if (r2 !== 0) return r2;
        switch (t2 & -t2) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
            return t2 & -t2;
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return t2 & 3932160;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return t2 & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return t2;
        }
      }
      function ao(t2, r2, a) {
        var l2 = t2.pendingLanes;
        if (l2 === 0) return 0;
        var c = 0, d = t2.suspendedLanes, h2 = t2.pingedLanes;
        t2 = t2.warmLanes;
        var y = l2 & 134217727;
        return y !== 0 ? (l2 = y & ~d, l2 !== 0 ? c = ma(l2) : (h2 &= y, h2 !== 0 ? c = ma(h2) : a || (a = y & ~t2, a !== 0 && (c = ma(a))))) : (y = l2 & ~d, y !== 0 ? c = ma(y) : h2 !== 0 ? c = ma(h2) : a || (a = l2 & ~t2, a !== 0 && (c = ma(a)))), c === 0 ? 0 : r2 !== 0 && r2 !== c && (r2 & d) === 0 && (d = c & -c, a = r2 & -r2, d >= a || d === 32 && (a & 4194048) !== 0) ? r2 : c;
      }
      function Yi(t2, r2) {
        return (t2.pendingLanes & ~(t2.suspendedLanes & ~t2.pingedLanes) & r2) === 0;
      }
      function _f(t2, r2) {
        (r2 & 8) !== 0 && (r2 |= r2 & 32);
        var a = t2.entangledLanes;
        if (a !== 0) for (t2 = t2.entanglements, a &= r2; 0 < a; ) {
          var l2 = 31 - sn(a), c = 1 << l2;
          r2 |= t2[l2], a &= ~c;
        }
        return r2;
      }
      function am(t2, r2) {
        switch (t2) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return r2 + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return r2 + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function Nf() {
        var t2 = qn;
        return qn <<= 1, (qn & 62914560) === 0 && (qn = 4194304), t2;
      }
      function bc(t2) {
        for (var r2 = [], a = 0; 31 > a; a++) r2.push(t2);
        return r2;
      }
      function Ki(t2, r2) {
        t2.pendingLanes |= r2, r2 !== 268435456 && (t2.suspendedLanes = 0, t2.pingedLanes = 0, t2.warmLanes = 0);
      }
      function ti(t2, r2, a, l2, c, d) {
        var h2 = t2.pendingLanes;
        t2.pendingLanes = a, t2.suspendedLanes = 0, t2.pingedLanes = 0, t2.warmLanes = 0, t2.expiredLanes &= a, t2.entangledLanes &= a, t2.errorRecoveryDisabledLanes &= a, t2.shellSuspendCounter = 0;
        var y = t2.entanglements, C = t2.expirationTimes, R = t2.hiddenUpdates;
        for (a = h2 & ~a; 0 < a; ) {
          var D = 31 - sn(a), U = 1 << D;
          y[D] = 0, C[D] = -1;
          var A = R[D];
          if (A !== null) for (R[D] = null, D = 0; D < A.length; D++) {
            var fe = A[D];
            fe !== null && (fe.lane &= -536870913);
          }
          a &= ~U;
        }
        l2 !== 0 && en(t2, l2, 0), d !== 0 && c === 0 && t2.tag !== 0 && (t2.suspendedLanes |= d & ~(h2 & ~r2));
      }
      function en(t2, r2, a) {
        t2.pendingLanes |= r2, t2.suspendedLanes &= ~r2;
        var l2 = 31 - sn(r2);
        t2.entangledLanes |= r2, t2.entanglements[l2] = t2.entanglements[l2] | 1073741824 | a & 261930;
      }
      function G(t2, r2) {
        var a = t2.entangledLanes |= r2;
        for (t2 = t2.entanglements; a; ) {
          var l2 = 31 - sn(a), c = 1 << l2;
          c & r2 | t2[l2] & r2 && (t2[l2] |= r2), a &= ~c;
        }
      }
      function Wt(t2, r2) {
        var a = r2 & -r2;
        return a = (a & 42) !== 0 ? 1 : mn(a), (a & (t2.suspendedLanes | r2)) !== 0 ? 0 : a;
      }
      function mn(t2) {
        switch (t2) {
          case 2:
            t2 = 1;
            break;
          case 8:
            t2 = 4;
            break;
          case 32:
            t2 = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            t2 = 128;
            break;
          case 268435456:
            t2 = 134217728;
            break;
          default:
            t2 = 0;
        }
        return t2;
      }
      function ze(t2) {
        return t2 &= -t2, 2 < t2 ? 8 < t2 ? (t2 & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
      }
      function ga(t2) {
        if (typeof N2 == "function" && U0(t2), It && typeof It.setStrictMode == "function") try {
          It.setStrictMode(Lu, t2);
        } catch {
        }
      }
      function mt(t2, r2) {
        if (t2.name != null && t2.name !== "auto") return t2.name;
        if (r2.autoName !== null) return r2.autoName;
        t2 = qt.identifierPrefix;
        var a = Ql++;
        return t2 = "_" + t2 + "t_" + a.toString(32) + "_", r2.autoName = t2;
      }
      function ks(t2) {
        var _r2;
        if (t2 == null || typeof t2 == "string") return t2;
        var r2 = null, a = ts;
        if (a !== null) for (var l2 = 0; l2 < a.length; l2++) {
          var c = t2[a[l2]];
          if (c != null) {
            if (c === "none") return "none";
            r2 = r2 == null ? c : r2 + (" " + c);
          }
        }
        return (_r2 = r2) != null ? _r2 : t2.default;
      }
      function At(t2, r2) {
        return t2 = ks(t2), r2 = ks(r2), r2 == null ? t2 === "auto" ? null : t2 : r2 === "auto" ? null : r2;
      }
      function im(t2, r2) {
        return t2 === r2 && (t2 !== 0 || 1 / t2 === 1 / r2) || t2 !== t2 && r2 !== r2;
      }
      function ba(t2) {
        if (fh === void 0) try {
          throw Error();
        } catch (a) {
          var r2 = a.stack.trim().match(/\n( *(at )?)/);
          fh = r2 && r2[1] || "", wg = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
        return `
` + fh + t2 + wg;
      }
      function ws(t2, r2) {
        if (!t2 || Fu) return "";
        Fu = true;
        var a = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var l2 = {
            DetermineComponentFrameRoot: function() {
              try {
                if (r2) {
                  var U = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(U.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(U, []);
                    } catch (Ne) {
                      var A = Ne;
                    }
                    Reflect.construct(t2, [], U);
                  } else {
                    try {
                      U.call();
                    } catch (Ne) {
                      A = Ne;
                    }
                    U = false;
                    try {
                      var fe = Object.getOwnPropertyDescriptor(t2.prototype, "props");
                      Object.defineProperty(t2.prototype, "props", {
                        configurable: true,
                        set: function() {
                          throw Error();
                        }
                      }), U = true, new t2();
                    } finally {
                      U && (fe !== void 0 ? Object.defineProperty(t2.prototype, "props", fe) : delete t2.prototype.props);
                    }
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ne) {
                    A = Ne;
                  }
                  (U = t2()) && typeof U.catch == "function" && U.catch(function() {
                  });
                }
              } catch (Ne) {
                if (Ne && A && typeof Ne.stack == "string") return [Ne.stack, A.stack];
              }
              return [null, null];
            }
          };
          l2.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var c = Object.getOwnPropertyDescriptor(l2.DetermineComponentFrameRoot, "name");
          c && c.configurable && Object.defineProperty(l2.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot"
          });
          var d = l2.DetermineComponentFrameRoot(), h2 = d[0], y = d[1];
          if (h2 && y) {
            var C = h2.split(`
`), R = y.split(`
`);
            for (c = l2 = 0; l2 < C.length && !C[l2].includes("DetermineComponentFrameRoot"); ) l2++;
            for (; c < R.length && !R[c].includes("DetermineComponentFrameRoot"); ) c++;
            if (l2 === C.length || c === R.length) for (l2 = C.length - 1, c = R.length - 1; 1 <= l2 && 0 <= c && C[l2] !== R[c]; ) c--;
            for (; 1 <= l2 && 0 <= c; l2--, c--) if (C[l2] !== R[c]) {
              if (l2 !== 1 || c !== 1) do
                if (l2--, c--, 0 > c || C[l2] !== R[c]) {
                  var D = `
` + C[l2].replace(" at new ", " at ");
                  return t2.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t2.displayName)), D;
                }
              while (1 <= l2 && 0 <= c);
              break;
            }
          }
        } finally {
          Fu = false, Error.prepareStackTrace = a;
        }
        return (a = t2 ? t2.displayName || t2.name : "") ? ba(a) : "";
      }
      function Tf(t2, r2) {
        switch (t2.tag) {
          case 26:
          case 27:
          case 5:
            return ba(t2.type);
          case 16:
            return ba("Lazy");
          case 13:
            return t2.child !== r2 && r2 !== null ? ba("Suspense Fallback") : ba("Suspense");
          case 19:
            return ba("SuspenseList");
          case 0:
          case 15:
            return ws(t2.type, false);
          case 11:
            return ws(t2.type.render, false);
          case 1:
            return ws(t2.type, true);
          case 31:
            return ba("Activity");
          case 30:
            return ba("ViewTransition");
          default:
            return "";
        }
      }
      function el(t2) {
        try {
          var r2 = "", a = null;
          do
            r2 += Tf(t2, a), a = t2, t2 = t2.return;
          while (t2);
          return r2;
        } catch (l2) {
          return `
Error generating stack: ` + l2.message + `
` + l2.stack;
        }
      }
      function Kt(t2, r2) {
        if (typeof t2 == "object" && t2 !== null) {
          var a = ph.get(t2);
          return a !== void 0 ? a : (r2 = {
            value: t2,
            source: r2,
            stack: el(r2)
          }, ph.set(t2, r2), r2);
        }
        return {
          value: t2,
          source: r2,
          stack: el(r2)
        };
      }
      function io(t2, r2) {
        ea[_i++] = Du, ea[_i++] = Dd, Dd = t2, Du = r2;
      }
      function If(t2, r2, a) {
        Wn[yn++] = _n, Wn[yn++] = $e, Wn[yn++] = _e, _e = t2;
        var l2 = _n;
        t2 = $e;
        var c = 32 - sn(l2) - 1;
        l2 &= ~(1 << c), a += 1;
        var d = 32 - sn(r2) + c;
        if (30 < d) {
          var h2 = c - c % 5;
          d = (l2 & (1 << h2) - 1).toString(32), l2 >>= h2, c -= h2, _n = 1 << 32 - sn(r2) + c | a << c | l2, $e = d + t2;
        } else _n = 1 << d | a << c | l2, $e = t2;
      }
      function Ps(t2) {
        t2.return !== null && (io(t2, 1), If(t2, 1, 0));
      }
      function xs(t2) {
        for (; t2 === Dd; ) Dd = ea[--_i], ea[_i] = null, Du = ea[--_i], ea[_i] = null;
        for (; t2 === _e; ) _e = Wn[--yn], Wn[yn] = null, $e = Wn[--yn], Wn[yn] = null, _n = Wn[--yn], Wn[yn] = null;
      }
      function Rf(t2, r2) {
        Wn[yn++] = _n, Wn[yn++] = $e, Wn[yn++] = _e, _n = r2.id, $e = r2.overflow, _e = t2;
      }
      function Cs(t2, r2) {
        Te(Je, r2), Te(ju, t2), Te(Jn, null), t2 = vd(r2), W(Jn), Te(Jn, t2);
      }
      function ya() {
        W(Jn), W(ju), W(Je);
      }
      function Lf(t2) {
        var r2 = t2.memoizedState;
        r2 !== null && (r2 = r2.memoizedState, lr ? $r._currentValue = r2 : $r._currentValue2 = r2, Te(fr, t2)), r2 = Jn.current;
        var a = Rm(r2, t2.type);
        r2 !== a && (Te(ju, t2), Te(Jn, a));
      }
      function Oe(t2) {
        ju.current === t2 && (W(Jn), W(ju)), fr.current === t2 && (W(fr), lr ? $r._currentValue = Fa : $r._currentValue2 = Fa);
      }
      function Mn(t2) {
        var r2 = Error(F(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw va(Kt(r2, t2)), hh;
      }
      function Ff(t2, r2) {
        if (!En) throw Error(F(175));
        N0(t2.stateNode, t2.type, t2.memoizedProps, r2, t2) || Mn(t2, true);
      }
      function er(t2) {
        for (Nn = t2.return; Nn; ) switch (Nn.tag) {
          case 5:
          case 31:
          case 13:
            hr = false;
            return;
          case 27:
          case 3:
            hr = true;
            return;
          default:
            Nn = Nn.return;
        }
      }
      function nl(t2) {
        if (!En || t2 !== Nn) return false;
        if (!ne) return er(t2), ne = true, false;
        var r2 = t2.tag;
        if (be ? r2 !== 3 && r2 !== 27 && (r2 !== 5 || Td(t2.type) && !kd(t2.type, t2.memoizedProps)) && Qe && Mn(t2) : r2 !== 3 && (r2 !== 5 || Td(t2.type) && !kd(t2.type, t2.memoizedProps)) && Qe && Mn(t2), er(t2), r2 === 13) {
          if (!En) throw Error(F(316));
          if (t2 = t2.memoizedState, t2 = t2 !== null ? t2.dehydrated : null, !t2) throw Error(F(317));
          Qe = Ru(t2);
        } else if (r2 === 31) {
          if (t2 = t2.memoizedState, t2 = t2 !== null ? t2.dehydrated : null, !t2) throw Error(F(317));
          Qe = pg(t2);
        } else Qe = be && r2 === 27 ? lg(t2.type, Qe) : Nn ? Nd(t2.stateNode) : null;
        return true;
      }
      function ri() {
        En && (Qe = Nn = null, ne = false);
      }
      function zs() {
        var t2 = pr;
        return t2 !== null && (Ze === null ? Ze = t2 : Ze.push.apply(Ze, t2), pr = null), t2;
      }
      function va(t2) {
        pr === null ? pr = [t2] : pr.push(t2);
      }
      function Rn(t2, r2, a) {
        lr ? (Te(jd, r2._currentValue), r2._currentValue = a) : (Te(jd, r2._currentValue2), r2._currentValue2 = a);
      }
      function lo(t2) {
        var r2 = jd.current;
        lr ? t2._currentValue = r2 : t2._currentValue2 = r2, W(jd);
      }
      function zn(t2, r2, a) {
        for (; t2 !== null; ) {
          var l2 = t2.alternate;
          if ((t2.childLanes & r2) !== r2 ? (t2.childLanes |= r2, l2 !== null && (l2.childLanes |= r2)) : l2 !== null && (l2.childLanes & r2) !== r2 && (l2.childLanes |= r2), t2 === a) break;
          t2 = t2.return;
        }
      }
      function nr(t2, r2, a, l2) {
        var c = t2.child;
        for (c !== null && (c.return = t2); c !== null; ) {
          var d = c.dependencies;
          if (d !== null) {
            var h2 = c.child;
            d = d.firstContext;
            e: for (; d !== null; ) {
              var y = d;
              d = c;
              for (var C = 0; C < r2.length; C++) if (y.context === r2[C]) {
                d.lanes |= a, y = d.alternate, y !== null && (y.lanes |= a), zn(d.return, a, t2), l2 || (h2 = null);
                break e;
              }
              d = y.next;
            }
          } else if (c.tag === 18) {
            if (h2 = c.return, h2 === null) throw Error(F(341));
            h2.lanes |= a, d = h2.alternate, d !== null && (d.lanes |= a), zn(h2, a, t2), h2 = null;
          } else c.tag === 13 && c.memoizedState !== null && c.memoizedState.dehydrated === null ? (c.lanes |= a, h2 = c.alternate, h2 !== null && (h2.lanes |= a), zn(c.return, a, t2), h2 = c.child, h2 = h2 !== null ? h2.sibling : null) : h2 = c.child;
          if (h2 !== null) h2.return = c;
          else for (h2 = c; h2 !== null; ) {
            if (h2 === t2) {
              h2 = null;
              break;
            }
            if (c = h2.sibling, c !== null) {
              c.return = h2.return, h2 = c;
              break;
            }
            h2 = h2.return;
          }
          c = h2;
        }
      }
      function so(t2, r2, a, l2) {
        t2 = null;
        for (var c = r2, d = false; c !== null; ) {
          if (!d) {
            if ((c.flags & 524288) !== 0) d = true;
            else if ((c.flags & 262144) !== 0) break;
          }
          if (c.tag === 10) {
            var h2 = c.alternate;
            if (h2 === null) throw Error(F(387));
            if (h2 = h2.memoizedProps, h2 !== null) {
              var y = c.type;
              $t(c.pendingProps.value, h2.value) || (t2 !== null ? t2.push(y) : t2 = [y]);
            }
          } else if (c === fr.current) {
            if (h2 = c.alternate, h2 === null) throw Error(F(387));
            h2.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t2 !== null ? t2.push($r) : t2 = [$r]);
          }
          c = c.return;
        }
        return t2 !== null && nr(r2, t2, a, l2), r2.flags |= 262144, t2 !== null;
      }
      function oi(t2) {
        for (t2 = t2.firstContext; t2 !== null; ) {
          var r2 = t2.context;
          if (!$t(lr ? r2._currentValue : r2._currentValue2, t2.memoizedValue)) return true;
          t2 = t2.next;
        }
        return false;
      }
      function Do(t2) {
        Ni = t2, qr = null, t2 = t2.dependencies, t2 !== null && (t2.firstContext = null);
      }
      function Me(t2) {
        return Df(Ni, t2);
      }
      function Es(t2, r2) {
        return Ni === null && Do(t2), Df(t2, r2);
      }
      function Df(t2, r2) {
        var a = lr ? r2._currentValue : r2._currentValue2;
        if (r2 = {
          context: r2,
          memoizedValue: a,
          next: null
        }, qr === null) {
          if (t2 === null) throw Error(F(308));
          qr = r2, t2.dependencies = {
            lanes: 0,
            firstContext: r2
          }, t2.flags |= 524288;
        } else qr = qr.next = r2;
        return a;
      }
      function _s() {
        return {
          controller: new Pg(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function Ns(t2) {
        t2.refCount--, t2.refCount === 0 && A0(xg, function() {
          t2.controller.abort();
        });
      }
      function jf(t2, r2) {
        if ((t2.pendingLanes & 4194048) !== 0) {
          var a = t2.transitionTypes;
          for (a === null && (a = t2.transitionTypes = []), t2 = 0; t2 < r2.length; t2++) {
            var l2 = r2[t2];
            a.indexOf(l2) === -1 && a.push(l2);
          }
        }
      }
      function lm(t2) {
        var r2 = t2.transitionTypes;
        return t2.transitionTypes = null, r2;
      }
      function Pr() {
      }
      function xr(t2) {
        t2 !== Gr && t2.next === null && (Gr === null ? ql = Gr = t2 : Gr = Gr.next = t2), Ud = true, Jr || (Jr = true, cm());
      }
      function tl(t2, r2) {
        if (!mh && Ud) {
          mh = true;
          do
            for (var a = false, l2 = ql; l2 !== null; ) {
              if (t2 !== 0) {
                var c = l2.pendingLanes;
                if (c === 0) var d = 0;
                else {
                  var h2 = l2.suspendedLanes, y = l2.pingedLanes;
                  d = (1 << 31 - sn(42 | t2) + 1) - 1, d &= c & ~(h2 & ~y), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
                }
                d !== 0 && (a = true, um(l2, d));
              } else d = ye, d = ao(l2, l2 === Be ? d : 0, l2.cancelPendingCommit !== null || l2.timeoutHandle !== La), (d & 3) === 0 || Yi(l2, d) || (a = true, um(l2, d));
              l2 = l2.next;
            }
          while (a);
          mh = false;
        }
      }
      function sm() {
        yc();
      }
      function yc() {
        Ud = Jr = false;
        var t2 = 0;
        Ti !== 0 && Wm() && (t2 = Ti);
        for (var r2 = Tt(), a = null, l2 = ql; l2 !== null; ) {
          var c = l2.next, d = nt(l2, r2);
          d === 0 ? (l2.next = null, a === null ? ql = c : a.next = c, c === null && (Gr = a)) : (a = l2, (t2 !== 0 || (d & 3) !== 0) && (Ud = true)), l2 = c;
        }
        Xe !== 0 && Xe !== 5 || tl(t2), Ti !== 0 && (Ti = 0);
      }
      function nt(t2, r2) {
        for (var a = t2.suspendedLanes, l2 = t2.pingedLanes, c = t2.expirationTimes, d = t2.pendingLanes & -62914561; 0 < d; ) {
          var h2 = 31 - sn(d), y = 1 << h2, C = c[h2];
          C === -1 ? ((y & a) === 0 || (y & l2) !== 0) && (c[h2] = am(y, r2)) : C <= r2 && (t2.expiredLanes |= y), d &= ~y;
        }
        if (r2 = Be, a = ye, a = ao(t2, t2 === r2 ? a : 0, t2.cancelPendingCommit !== null || t2.timeoutHandle !== La), l2 = t2.callbackNode, a === 0 || t2 === r2 && (Ie === 2 || Ie === 9) || t2.cancelPendingCommit !== null) return l2 !== null && l2 !== null && sh(l2), t2.callbackNode = null, t2.callbackPriority = 0;
        if ((a & 3) === 0 || Yi(t2, a)) {
          if (r2 = a & -a, r2 === t2.callbackPriority) return r2;
          switch (l2 !== null && sh(l2), ze(a)) {
            case 2:
            case 8:
              a = Sg;
              break;
            case 32:
              a = dh;
              break;
            case 268435456:
              a = Gn;
              break;
            default:
              a = dh;
          }
          return l2 = vc.bind(null, t2), a = $l(a, l2), t2.callbackPriority = r2, t2.callbackNode = a, r2;
        }
        return l2 !== null && l2 !== null && sh(l2), t2.callbackPriority = 2, t2.callbackNode = null, 2;
      }
      function vc(t2, r2) {
        if (Xe !== 0 && Xe !== 5) return t2.callbackNode = null, t2.callbackPriority = 0, null;
        var a = t2.callbackNode;
        if (_a() && t2.callbackNode !== a) return null;
        var l2 = ye;
        return l2 = ao(t2, t2 === Be ? l2 : 0, t2.cancelPendingCommit !== null || t2.timeoutHandle !== La), l2 === 0 ? null : (Il(t2, l2, r2), nt(t2, Tt()), t2.callbackNode != null && t2.callbackNode === a ? vc.bind(null, t2) : null);
      }
      function um(t2, r2) {
        if (_a()) return null;
        Il(t2, r2, true);
      }
      function cm() {
        Hm ? jl(function() {
          (de & 6) !== 0 ? $l(ch, sm) : yc();
        }) : $l(ch, sm);
      }
      function Sc() {
        if (Ti === 0) {
          var t2 = Ii;
          t2 === 0 && (t2 = Vl, Vl <<= 1, (Vl & 261888) === 0 && (Vl = 256)), Ti = t2;
        }
        return Ti;
      }
      function Ot(t2, r2) {
        if (Wu === null) {
          var a = Wu = [];
          Oa = 0, Ii = Sc(), Gl = {
            status: "pending",
            value: void 0,
            then: function(l2) {
              a.push(l2);
            }
          };
        }
        return Oa++, r2.then(uo, uo), r2;
      }
      function uo() {
        if (--Oa === 0 && (Uu = null, Wu !== null)) {
          Gl !== null && (Gl.status = "fulfilled");
          var t2 = Wu;
          Wu = null, Ii = 0, Gl = null;
          for (var r2 = 0; r2 < t2.length; r2++) (0, t2[r2])();
        }
      }
      function dm(t2, r2) {
        var a = [], l2 = {
          status: "pending",
          value: null,
          reason: null,
          then: function(c) {
            a.push(c);
          }
        };
        return t2.then(function() {
          l2.status = "fulfilled", l2.value = r2;
          for (var c = 0; c < a.length; c++) (0, a[c])(r2);
        }, function(c) {
          for (l2.status = "rejected", l2.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
        }), l2;
      }
      function rl() {
        var t2 = Zr.current;
        return t2 !== null ? t2 : Be.pooledCache;
      }
      function ol(t2, r2) {
        r2 === null ? Te(Zr, Zr.current) : Te(Zr, r2.pool);
      }
      function Uf() {
        var t2 = rl();
        return t2 === null ? null : {
          parent: lr ? tn._currentValue : tn._currentValue2,
          pool: t2
        };
      }
      function Ts(t2, r2) {
        if ($t(t2, r2)) return true;
        if (typeof t2 != "object" || t2 === null || typeof r2 != "object" || r2 === null) return false;
        var a = Object.keys(t2), l2 = Object.keys(r2);
        if (a.length !== l2.length) return false;
        for (l2 = 0; l2 < a.length; l2++) {
          var c = a[l2];
          if (!W0.call(r2, c) || !$t(t2[c], r2[c])) return false;
        }
        return true;
      }
      function jo(t2) {
        return t2 = t2.status, t2 === "fulfilled" || t2 === "rejected";
      }
      function Uo(t2, r2, a) {
        switch (a = t2[a], a === void 0 ? t2.push(r2) : a !== r2 && (r2.then(Pr, Pr), r2 = a), r2.status) {
          case "fulfilled":
            return r2.value;
          case "rejected":
            throw t2 = r2.reason, Cr(t2), t2 === void 0 && !("reason" in r2) ? Error(F(600)) : t2;
          default:
            if (typeof r2.status == "string") r2.then(Pr, Pr);
            else {
              if (t2 = Be, t2 !== null && 100 < t2.shellSuspendCounter) throw Error(F(482));
              t2 = r2, t2.status = "pending", t2.then(function(l2) {
                if (r2.status === "pending") {
                  var c = r2;
                  c.status = "fulfilled", c.value = l2;
                }
              }, function(l2) {
                if (r2.status === "pending") {
                  var c = r2;
                  c.status = "rejected", c.reason = l2;
                }
              });
            }
            switch (r2.status) {
              case "fulfilled":
                return r2.value;
              case "rejected":
                throw t2 = r2.reason, Cr(t2), t2;
            }
            throw Ri = r2, Jl;
        }
      }
      function co(t2) {
        try {
          var r2 = t2._init;
          return r2(t2._payload);
        } catch (a) {
          throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ri = a, Jl) : a;
        }
      }
      function ai() {
        if (Ri === null) throw Error(F(459));
        var t2 = Ri;
        return Ri = null, t2;
      }
      function Cr(t2) {
        if (t2 === Jl || t2 === Wd) throw Error(F(483));
      }
      function al(t2) {
        var r2 = Au;
        return Au += 1, Zl === null && (Zl = []), Uo(Zl, t2, r2);
      }
      function zr(t2, r2) {
        r2 = r2.props.ref, t2.ref = r2 !== void 0 ? r2 : null;
      }
      function Is(t2, r2) {
        throw r2.$$typeof === _m ? Error(F(525)) : (t2 = Object.prototype.toString.call(r2), Error(F(31, t2 === "[object Object]" ? "object with keys {" + Object.keys(r2).join(", ") + "}" : t2)));
      }
      function wt(t2) {
        function r2(x, P) {
          if (t2) {
            var E = x.deletions;
            E === null ? (x.deletions = [P], x.flags |= 16) : E.push(P);
          }
        }
        function a(x, P) {
          if (!t2) return null;
          for (; P !== null; ) r2(x, P), P = P.sibling;
          return null;
        }
        function l2(x) {
          for (var P = /* @__PURE__ */ new Map(); x !== null; ) x.key === null ? P.set(x.index, x) : P.set(x.key, x), x = x.sibling;
          return P;
        }
        function c(x, P) {
          return x = Zo(x, P), x.index = 0, x.sibling = null, x;
        }
        function d(x, P, E) {
          return x.index = E, t2 ? (E = x.alternate, E !== null ? (E = E.index, E < P ? (x.flags |= 2, P) : E) : (x.flags |= 134217730, P)) : (x.flags |= 1048576, P);
        }
        function h2(x) {
          return t2 && x.alternate === null && (x.flags |= 134217730), x;
        }
        function y(x, P, E, j2) {
          return P === null || P.tag !== 6 ? (P = wu(E, x.mode, j2), P.return = x, P) : (P = c(P, E), P.return = x, P);
        }
        function C(x, P, E, j2) {
          var q = E.type;
          return q === wo ? (x = D(x, P, E.props.children, j2, E.key), zr(x, E), x) : P !== null && (P.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ra && co(q) === P.type) ? (P = c(P, E.props), zr(P, E), P.return = x, P) : (P = Vt(E.type, E.key, E.props, null, x.mode, j2), zr(P, E), P.return = x, P);
        }
        function R(x, P, E, j2) {
          return P === null || P.tag !== 4 || P.stateNode.containerInfo !== E.containerInfo || P.stateNode.implementation !== E.implementation ? (P = Ta(E, x.mode, j2), P.return = x, P) : (P = c(P, E.children || []), P.return = x, P);
        }
        function D(x, P, E, j2, q) {
          return P === null || P.tag !== 7 ? (P = Na(E, x.mode, j2, q), P.return = x, P) : (P = c(P, E), P.return = x, P);
        }
        function U(x, P, E) {
          if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint") return P = wu("" + P, x.mode, E), P.return = x, P;
          if (typeof P == "object" && P !== null) {
            switch (P.$$typeof) {
              case Ia:
                return E = Vt(P.type, P.key, P.props, null, x.mode, E), zr(E, P), E.return = x, E;
              case Si:
                return P = Ta(P, x.mode, E), P.return = x, P;
              case Ra:
                return P = co(P), U(x, P, E);
            }
            if (wi(P) || Ss(P)) return P = Na(P, x.mode, E, null), P.return = x, P;
            if (typeof P.then == "function") return U(x, al(P), E);
            if (P.$$typeof === Vr) return U(x, Es(x, P), E);
            Is(x, P);
          }
          return null;
        }
        function A(x, P, E, j2) {
          var q = P !== null ? P.key : null;
          if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return q !== null ? null : y(x, P, "" + E, j2);
          if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
              case Ia:
                return E.key === q ? C(x, P, E, j2) : null;
              case Si:
                return E.key === q ? R(x, P, E, j2) : null;
              case Ra:
                return E = co(E), A(x, P, E, j2);
            }
            if (wi(E) || Ss(E)) return q !== null ? null : D(x, P, E, j2, null);
            if (typeof E.then == "function") return A(x, P, al(E), j2);
            if (E.$$typeof === Vr) return A(x, P, Es(x, E), j2);
            Is(x, E);
          }
          return null;
        }
        function fe(x, P, E, j2, q) {
          if (typeof j2 == "string" && j2 !== "" || typeof j2 == "number" || typeof j2 == "bigint") return x = x.get(E) || null, y(P, x, "" + j2, q);
          if (typeof j2 == "object" && j2 !== null) {
            switch (j2.$$typeof) {
              case Ia:
                return x = x.get(j2.key === null ? E : j2.key) || null, C(P, x, j2, q);
              case Si:
                return x = x.get(j2.key === null ? E : j2.key) || null, R(P, x, j2, q);
              case Ra:
                return j2 = co(j2), fe(x, P, E, j2, q);
            }
            if (wi(j2) || Ss(j2)) return x = x.get(E) || null, D(P, x, j2, q, null);
            if (typeof j2.then == "function") return fe(x, P, E, al(j2), q);
            if (j2.$$typeof === Vr) return fe(x, P, E, Es(P, j2), q);
            Is(P, j2);
          }
          return null;
        }
        function Ne(x, P, E, j2) {
          for (var q = null, Ue = null, M2 = P, ie = P = 0, Le = null; M2 !== null && ie < E.length; ie++) {
            M2.index > ie ? (Le = M2, M2 = null) : Le = M2.sibling;
            var Se = A(x, M2, E[ie], j2);
            if (Se === null) {
              M2 === null && (M2 = Le);
              break;
            }
            t2 && M2 && Se.alternate === null && r2(x, M2), P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se, M2 = Le;
          }
          if (ie === E.length) return a(x, M2), ne && io(x, ie), q;
          if (M2 === null) {
            for (; ie < E.length; ie++) M2 = U(x, E[ie], j2), M2 !== null && (P = d(M2, P, ie), Ue === null ? q = M2 : Ue.sibling = M2, Ue = M2);
            return ne && io(x, ie), q;
          }
          for (M2 = l2(M2); ie < E.length; ie++) Le = fe(M2, x, ie, E[ie], j2), Le !== null && (t2 && (Se = Le.alternate, Se !== null && M2.delete(Se.key === null ? ie : Se.key)), P = d(Le, P, ie), Ue === null ? q = Le : Ue.sibling = Le, Ue = Le);
          return t2 && M2.forEach(function(la) {
            return r2(x, la);
          }), ne && io(x, ie), q;
        }
        function Re(x, P, E, j2) {
          if (E == null) throw Error(F(151));
          for (var q = null, Ue = null, M2 = P, ie = P = 0, Le = null, Se = E.next(); M2 !== null && !Se.done; ie++, Se = E.next()) {
            M2.index > ie ? (Le = M2, M2 = null) : Le = M2.sibling;
            var la = A(x, M2, Se.value, j2);
            if (la === null) {
              M2 === null && (M2 = Le);
              break;
            }
            t2 && M2 && la.alternate === null && r2(x, M2), P = d(la, P, ie), Ue === null ? q = la : Ue.sibling = la, Ue = la, M2 = Le;
          }
          if (Se.done) return a(x, M2), ne && io(x, ie), q;
          if (M2 === null) {
            for (; !Se.done; ie++, Se = E.next()) Se = U(x, Se.value, j2), Se !== null && (P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se);
            return ne && io(x, ie), q;
          }
          for (M2 = l2(M2); !Se.done; ie++, Se = E.next()) Se = fe(M2, x, ie, Se.value, j2), Se !== null && (t2 && (Le = Se.alternate, Le !== null && M2.delete(Le.key === null ? ie : Le.key)), P = d(Se, P, ie), Ue === null ? q = Se : Ue.sibling = Se, Ue = Se);
          return t2 && M2.forEach(function(V0) {
            return r2(x, V0);
          }), ne && io(x, ie), q;
        }
        function ia(x, P, E, j2) {
          if (typeof E == "object" && E !== null && E.type === wo && E.key === null && E.props.ref === void 0 && (E = E.props.children), typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
              case Ia:
                e: {
                  for (var q = E.key; P !== null; ) {
                    if (P.key === q) {
                      if (q = E.type, q === wo) {
                        if (P.tag === 7) {
                          a(x, P.sibling), j2 = c(P, E.props.children), zr(j2, E), j2.return = x, x = j2;
                          break e;
                        }
                      } else if (P.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Ra && co(q) === P.type) {
                        a(x, P.sibling), j2 = c(P, E.props), zr(j2, E), j2.return = x, x = j2;
                        break e;
                      }
                      a(x, P);
                      break;
                    } else r2(x, P);
                    P = P.sibling;
                  }
                  E.type === wo ? (j2 = Na(E.props.children, x.mode, j2, E.key), zr(j2, E), j2.return = x, x = j2) : (j2 = Vt(E.type, E.key, E.props, null, x.mode, j2), zr(j2, E), j2.return = x, x = j2);
                }
                return h2(x);
              case Si:
                e: {
                  for (q = E.key; P !== null; ) {
                    if (P.key === q) {
                      if (P.tag === 4 && P.stateNode.containerInfo === E.containerInfo && P.stateNode.implementation === E.implementation) {
                        a(x, P.sibling), j2 = c(P, E.children || []), j2.return = x, x = j2;
                        break e;
                      } else {
                        a(x, P);
                        break;
                      }
                    } else r2(x, P);
                    P = P.sibling;
                  }
                  j2 = Ta(E, x.mode, j2), j2.return = x, x = j2;
                }
                return h2(x);
              case Ra:
                return E = co(E), ia(x, P, E, j2);
            }
            if (wi(E)) return Ne(x, P, E, j2);
            if (Ss(E)) {
              if (q = Ss(E), typeof q != "function") throw Error(F(150));
              return E = q.call(E), Re(x, P, E, j2);
            }
            if (typeof E.then == "function") return ia(x, P, al(E), j2);
            if (E.$$typeof === Vr) return ia(x, P, Es(x, E), j2);
            Is(x, E);
          }
          return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, P !== null && P.tag === 6 ? (a(x, P.sibling), j2 = c(P, E), j2.return = x, x = j2) : (a(x, P), j2 = wu(E, x.mode, j2), j2.return = x, x = j2), h2(x)) : a(x, P);
        }
        return function(x, P, E, j2) {
          try {
            Au = 0;
            var q = ia(x, P, E, j2);
            return Zl = null, q;
          } catch (M2) {
            if (M2 === Jl || M2 === Wd) throw M2;
            var Ue = et(29, M2, null, x.mode);
            return Ue.lanes = j2, Ue.return = x, Ue;
          } finally {
          }
        };
      }
      function Wo() {
        for (var t2 = Xl, r2 = bh = Xl = 0; r2 < t2; ) {
          var a = mr[r2];
          mr[r2++] = null;
          var l2 = mr[r2];
          mr[r2++] = null;
          var c = mr[r2];
          mr[r2++] = null;
          var d = mr[r2];
          if (mr[r2++] = null, l2 !== null && c !== null) {
            var h2 = l2.pending;
            h2 === null ? c.next = c : (c.next = h2.next, h2.next = c), l2.pending = c;
          }
          d !== 0 && Rs(a, c, d);
        }
      }
      function fo(t2, r2, a, l2) {
        mr[Xl++] = t2, mr[Xl++] = r2, mr[Xl++] = a, mr[Xl++] = l2, bh |= l2, t2.lanes |= l2, t2 = t2.alternate, t2 !== null && (t2.lanes |= l2);
      }
      function kc(t2, r2, a, l2) {
        return fo(t2, r2, a, l2), il(t2);
      }
      function Er(t2, r2) {
        return fo(t2, null, null, r2), il(t2);
      }
      function Rs(t2, r2, a) {
        t2.lanes |= a;
        var l2 = t2.alternate;
        l2 !== null && (l2.lanes |= a);
        for (var c = false, d = t2.return; d !== null; ) d.childLanes |= a, l2 = d.alternate, l2 !== null && (l2.childLanes |= a), d.tag === 22 && (t2 = d.stateNode, t2 === null || t2._visibility & 1 || (c = true)), t2 = d, d = d.return;
        return t2.tag === 3 ? (d = t2.stateNode, c && r2 !== null && (c = 31 - sn(a), t2 = d.hiddenUpdates, l2 = t2[c], l2 === null ? t2[c] = [r2] : l2.push(r2), r2.lane = a | 536870912), d) : null;
      }
      function il(t2) {
        if (50 < rs) throw rs = 0, Qu = null, Error(F(185));
        for (var r2 = t2.return; r2 !== null; ) t2 = r2, r2 = t2.return;
        return t2.tag === 3 ? t2.stateNode : null;
      }
      function ii(t2) {
        t2.updateQueue = {
          baseState: t2.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: {
            pending: null,
            lanes: 0,
            hiddenCallbacks: null
          },
          callbacks: null
        };
      }
      function Sa(t2, r2) {
        t2 = t2.updateQueue, r2.updateQueue === t2 && (r2.updateQueue = {
          baseState: t2.baseState,
          firstBaseUpdate: t2.firstBaseUpdate,
          lastBaseUpdate: t2.lastBaseUpdate,
          shared: t2.shared,
          callbacks: null
        });
      }
      function po(t2) {
        return {
          lane: t2,
          tag: 0,
          payload: null,
          callback: null,
          next: null
        };
      }
      function ka(t2, r2, a) {
        var l2 = t2.updateQueue;
        if (l2 === null) return null;
        if (l2 = l2.shared, (de & 2) !== 0) {
          var c = l2.pending;
          return c === null ? r2.next = r2 : (r2.next = c.next, c.next = r2), l2.pending = r2, r2 = il(t2), Rs(t2, null, a), r2;
        }
        return fo(t2, l2, r2, a), il(t2);
      }
      function Ls(t2, r2, a) {
        if (r2 = r2.updateQueue, r2 !== null && (r2 = r2.shared, (a & 4194048) !== 0)) {
          var l2 = r2.lanes;
          l2 &= t2.pendingLanes, a |= l2, r2.lanes = a, G(t2, a);
        }
      }
      function wc(t2, r2) {
        var a = t2.updateQueue, l2 = t2.alternate;
        if (l2 !== null && (l2 = l2.updateQueue, a === l2)) {
          var c = null, d = null;
          if (a = a.firstBaseUpdate, a !== null) {
            do {
              var h2 = {
                lane: a.lane,
                tag: a.tag,
                payload: a.payload,
                callback: null,
                next: null
              };
              d === null ? c = d = h2 : d = d.next = h2, a = a.next;
            } while (a !== null);
            d === null ? c = d = r2 : d = d.next = r2;
          } else c = d = r2;
          a = {
            baseState: l2.baseState,
            firstBaseUpdate: c,
            lastBaseUpdate: d,
            shared: l2.shared,
            callbacks: l2.callbacks
          }, t2.updateQueue = a;
          return;
        }
        t2 = a.lastBaseUpdate, t2 === null ? a.firstBaseUpdate = r2 : t2.next = r2, a.lastBaseUpdate = r2;
      }
      function li() {
        if (yh) {
          var t2 = Gl;
          if (t2 !== null) throw t2;
        }
      }
      function ll(t2, r2, a, l2) {
        yh = false;
        var c = t2.updateQueue;
        na = false;
        var d = c.firstBaseUpdate, h2 = c.lastBaseUpdate, y = c.shared.pending;
        if (y !== null) {
          c.shared.pending = null;
          var C = y, R = C.next;
          C.next = null, h2 === null ? d = R : h2.next = R, h2 = C;
          var D = t2.alternate;
          D !== null && (D = D.updateQueue, y = D.lastBaseUpdate, y !== h2 && (y === null ? D.firstBaseUpdate = R : y.next = R, D.lastBaseUpdate = C));
        }
        if (d !== null) {
          var U = c.baseState;
          h2 = 0, D = R = C = null, y = d;
          do {
            var A = y.lane & -536870913, fe = A !== y.lane;
            if (fe ? (ye & A) === A : (l2 & A) === A) {
              A !== 0 && A === Ii && (yh = true), D !== null && (D = D.next = {
                lane: 0,
                tag: y.tag,
                payload: y.payload,
                callback: null,
                next: null
              });
              e: {
                var Ne = t2, Re = y;
                A = r2;
                var ia = a;
                switch (Re.tag) {
                  case 1:
                    if (Ne = Re.payload, typeof Ne == "function") {
                      U = Ne.call(ia, U, A);
                      break e;
                    }
                    U = Ne;
                    break e;
                  case 3:
                    Ne.flags = Ne.flags & -65537 | 128;
                  case 0:
                    if (Ne = Re.payload, A = typeof Ne == "function" ? Ne.call(ia, U, A) : Ne, A == null) break e;
                    U = Lp({}, U, A);
                    break e;
                  case 2:
                    na = true;
                }
              }
              A = y.callback, A !== null && (t2.flags |= 64, fe && (t2.flags |= 8192), fe = c.callbacks, fe === null ? c.callbacks = [A] : fe.push(A));
            } else fe = {
              lane: A,
              tag: y.tag,
              payload: y.payload,
              callback: y.callback,
              next: null
            }, D === null ? (R = D = fe, C = U) : D = D.next = fe, h2 |= A;
            if (y = y.next, y === null) {
              if (y = c.shared.pending, y === null) break;
              fe = y, y = fe.next, fe.next = null, c.lastBaseUpdate = fe, c.shared.pending = null;
            }
          } while (true);
          D === null && (C = U), c.baseState = C, c.firstBaseUpdate = R, c.lastBaseUpdate = D, d === null && (c.shared.lanes = 0), aa |= h2, t2.lanes = h2, t2.memoizedState = U;
        }
      }
      function fm(t2, r2) {
        if (typeof t2 != "function") throw Error(F(191, t2));
        t2.call(r2);
      }
      function B(t2, r2) {
        var a = t2.callbacks;
        if (a !== null) for (t2.callbacks = null, t2 = 0; t2 < a.length; t2++) fm(a[t2], r2);
      }
      function Pc(t2, r2) {
        t2 = oa, Te(Od, t2), Te(Ba, r2), oa = t2 | r2.baseLanes;
      }
      function Ao() {
        Te(Od, oa), Te(Ba, Ba.current);
      }
      function xc() {
        oa = Od.current, W(Ba), W(Od);
      }
      function _r(t2) {
        var r2 = t2.alternate;
        Te(Xn, Xn.current & 1), Te(Zn, t2), lt === null && (r2 === null || Ba.current !== null || r2.memoizedState !== null) && (lt = t2);
      }
      function Nr(t2) {
        Te(Xn, Xn.current), Te(Zn, t2), lt === null && (lt = t2);
      }
      function Wf(t2) {
        t2.tag === 22 ? (Te(Xn, Xn.current), Te(Zn, t2), lt === null && (lt = t2)) : Tr();
      }
      function Tr() {
        Te(Xn, Xn.current), Te(Zn, Zn.current);
      }
      function Ln(t2) {
        W(Zn), lt === t2 && (lt = null), W(Xn);
      }
      function sl(t2, r2) {
        Te(Zn, Zn.current), Te(Xn, r2);
      }
      function Oo(t2) {
        W(Xn), W(Zn), lt === t2 && (lt = null);
      }
      function ul(t2) {
        for (var r2 = t2; r2 !== null; ) {
          if (r2.tag === 13) {
            var a = r2.memoizedState;
            if (a !== null && (a = a.dehydrated, a === null || Gp(a) || Jp(a))) return r2;
          } else if (r2.tag === 19 && r2.memoizedProps.revealOrder !== "independent") {
            if ((r2.flags & 128) !== 0) return r2;
          } else if (r2.child !== null) {
            r2.child.return = r2, r2 = r2.child;
            continue;
          }
          if (r2 === t2) break;
          for (; r2.sibling === null; ) {
            if (r2.return === null || r2.return === t2) return null;
            r2 = r2.return;
          }
          r2.sibling.return = r2.return, r2 = r2.sibling;
        }
        return null;
      }
      function Ve() {
        throw Error(F(321));
      }
      function Fs(t2, r2) {
        if (r2 === null) return false;
        for (var a = 0; a < r2.length && a < t2.length; a++) if (!$t(t2[a], r2[a])) return false;
        return true;
      }
      function cl(t2, r2, a, l2, c, d) {
        return ta = d, re = r2, r2.memoizedState = null, r2.updateQueue = null, r2.lanes = 0, Q.H = t2 === null || t2.memoizedState === null ? Eg : _g, Fi = false, d = a(l2, c), Fi = false, ra && (d = ho(r2, a, l2, c)), Bo(t2), d;
      }
      function Bo(t2) {
        Q.H = Bu;
        var r2 = De !== null && De.next !== null;
        if (ta = 0, un = De = re = null, Bd = false, Ou = 0, Yl = null, r2) throw Error(F(300));
        t2 === null || Pn || (t2 = t2.dependencies, t2 !== null && oi(t2) && (Pn = true));
      }
      function ho(t2, r2, a, l2) {
        re = t2;
        var c = 0;
        do {
          if (ra && (Yl = null), Ou = 0, ra = false, 25 <= c) throw Error(F(301));
          if (c += 1, un = De = null, t2.updateQueue != null) {
            var d = t2.updateQueue;
            d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
          }
          Q.H = B0, d = r2(a, l2);
        } while (ra);
        return d;
      }
      function Cc() {
        var t2 = Q.H, r2 = t2.useState()[0];
        return r2 = typeof r2.then == "function" ? fl(r2) : r2, t2 = t2.useState()[0], (De !== null ? De.memoizedState : null) !== t2 && (re.flags |= 1024), r2;
      }
      function Ds() {
        var t2 = Hd !== 0;
        return Hd = 0, t2;
      }
      function Ho(t2, r2, a) {
        r2.updateQueue = t2.updateQueue, r2.flags &= -2053, t2.lanes &= ~a;
      }
      function dl(t2) {
        if (Bd) {
          for (t2 = t2.memoizedState; t2 !== null; ) {
            var r2 = t2.queue;
            r2 !== null && (r2.pending = null), t2 = t2.next;
          }
          Bd = false;
        }
        ta = 0, un = De = re = null, ra = false, Ou = Hd = 0, Yl = null;
      }
      function gn() {
        var t2 = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        return un === null ? re.memoizedState = un = t2 : un = un.next = t2, un;
      }
      function K() {
        if (De === null) {
          var t2 = re.alternate;
          t2 = t2 !== null ? t2.memoizedState : null;
        } else t2 = De.next;
        var r2 = un === null ? re.memoizedState : un.next;
        if (r2 !== null) un = r2, De = t2;
        else {
          if (t2 === null) throw re.alternate === null ? Error(F(467)) : Error(F(310));
          De = t2, t2 = {
            memoizedState: De.memoizedState,
            baseState: De.baseState,
            baseQueue: De.baseQueue,
            queue: De.queue,
            next: null
          }, un === null ? re.memoizedState = un = t2 : un = un.next = t2;
        }
        return un;
      }
      function si() {
        return {
          lastEffect: null,
          events: null,
          stores: null,
          memoCache: null
        };
      }
      function fl(t2) {
        var r2 = Ou;
        return Ou += 1, Yl === null && (Yl = []), t2 = Uo(Yl, t2, r2), r2 = re, (un === null ? r2.memoizedState : un.next) === null && (r2 = r2.alternate, Q.H = r2 === null || r2.memoizedState === null ? Eg : _g), t2;
      }
      function pl(t2) {
        if (t2 !== null && typeof t2 == "object") {
          if (typeof t2.then == "function") return fl(t2);
          if (t2.$$typeof === Im) return;
          if (t2.$$typeof === Vr) return Me(t2);
        }
        throw Error(F(438, String(t2)));
      }
      function Mo(t2) {
        var r2 = null, a = re.updateQueue;
        if (a !== null && (r2 = a.memoCache), r2 == null) {
          var l2 = re.alternate;
          l2 !== null && (l2 = l2.updateQueue, l2 !== null && (l2 = l2.memoCache, l2 != null && (r2 = {
            data: l2.data.map(function(c) {
              return c.slice();
            }),
            index: 0
          })));
        }
        if (r2 == null && (r2 = {
          data: [],
          index: 0
        }), a === null && (a = si(), re.updateQueue = a), a.memoCache = r2, a = r2.data[r2.index], a === void 0) for (a = r2.data[r2.index] = Array(t2), l2 = 0; l2 < t2; l2++) a[l2] = Tm;
        return r2.index++, a;
      }
      function Bt(t2, r2) {
        return typeof r2 == "function" ? r2(t2) : r2;
      }
      function js(t2) {
        var r2 = K();
        return Af(r2, De, t2);
      }
      function Af(t2, r2, a) {
        var l2 = t2.queue;
        if (l2 === null) throw Error(F(311));
        l2.lastRenderedReducer = a;
        var c = t2.baseQueue, d = l2.pending;
        if (d !== null) {
          if (c !== null) {
            var h2 = c.next;
            c.next = d.next, d.next = h2;
          }
          r2.baseQueue = c = d, l2.pending = null;
        }
        if (d = t2.baseState, c === null) t2.memoizedState = d;
        else {
          r2 = c.next;
          var y = h2 = null, C = null, R = r2, D = false;
          do {
            var U = R.lane & -536870913;
            if (U !== R.lane ? (ye & U) === U : (ta & U) === U) {
              var A = R.revertLane;
              if (A === 0) C !== null && (C = C.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: R.action,
                hasEagerState: R.hasEagerState,
                eagerState: R.eagerState,
                next: null
              }), U === Ii && (D = true);
              else if ((ta & A) === A) {
                R = R.next, A === Ii && (D = true);
                continue;
              } else U = {
                lane: 0,
                revertLane: R.revertLane,
                gesture: null,
                action: R.action,
                hasEagerState: R.hasEagerState,
                eagerState: R.eagerState,
                next: null
              }, C === null ? (y = C = U, h2 = d) : C = C.next = U, re.lanes |= A, aa |= A;
              U = R.action, Fi && a(d, U), d = R.hasEagerState ? R.eagerState : a(d, U);
            } else A = {
              lane: U,
              revertLane: R.revertLane,
              gesture: R.gesture,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }, C === null ? (y = C = A, h2 = d) : C = C.next = A, re.lanes |= U, aa |= U;
            R = R.next;
          } while (R !== null && R !== r2);
          if (C === null ? h2 = d : C.next = y, !$t(d, t2.memoizedState) && (Pn = true, D && (a = Gl, a !== null))) throw a;
          t2.memoizedState = d, t2.baseState = h2, t2.baseQueue = C, l2.lastRenderedState = d;
        }
        return c === null && (l2.lanes = 0), [t2.memoizedState, l2.dispatch];
      }
      function tr(t2) {
        var r2 = K(), a = r2.queue;
        if (a === null) throw Error(F(311));
        a.lastRenderedReducer = t2;
        var l2 = a.dispatch, c = a.pending, d = r2.memoizedState;
        if (c !== null) {
          a.pending = null;
          var h2 = c = c.next;
          do
            d = t2(d, h2.action), h2 = h2.next;
          while (h2 !== c);
          $t(d, r2.memoizedState) || (Pn = true), r2.memoizedState = d, r2.baseQueue === null && (r2.baseState = d), a.lastRenderedState = d;
        }
        return [d, l2];
      }
      function pm(t2, r2, a) {
        var l2 = re, c = K(), d = ne;
        if (d) {
          if (a === void 0) throw Error(F(407));
          a = a();
        } else a = r2();
        var h2 = !$t((De || c).memoizedState, a);
        if (h2 && (c.memoizedState = a, Pn = true), c = c.queue, _c(hl.bind(null, l2, c, t2), [t2]), t2 = c.getSnapshot !== r2 || h2 || un !== null && (un.memoizedState.tag & 1) !== 0, Ur(t2 ? 9 : 8, {
          destroy: void 0
        }, Us.bind(null, l2, c, a, r2), null), t2) {
          if (l2.flags |= 2048, Be === null) throw Error(F(349));
          d || (ta & 127) !== 0 || mo(l2, r2, a);
        }
        return a;
      }
      function mo(t2, r2, a) {
        t2.flags |= 16384, t2 = {
          getSnapshot: r2,
          value: a
        }, r2 = re.updateQueue, r2 === null ? (r2 = si(), re.updateQueue = r2, r2.stores = [t2]) : (a = r2.stores, a === null ? r2.stores = [t2] : a.push(t2));
      }
      function Us(t2, r2, a, l2) {
        r2.value = a, r2.getSnapshot = l2, Ws(r2) && Pt(t2);
      }
      function hl(t2, r2, a) {
        return a(function() {
          Ws(r2) && Pt(t2);
        });
      }
      function Ws(t2) {
        var r2 = t2.getSnapshot;
        t2 = t2.value;
        try {
          var a = r2();
          return !$t(t2, a);
        } catch {
          return true;
        }
      }
      function Pt(t2) {
        var r2 = Er(t2, 2);
        r2 !== null && yt(r2, t2, 2);
      }
      function gt(t2) {
        var r2 = gn();
        if (typeof t2 == "function") {
          var a = t2;
          if (t2 = a(), Fi) {
            ga(true);
            try {
              a();
            } finally {
              ga(false);
            }
          }
        }
        return r2.memoizedState = r2.baseState = t2, r2.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Bt,
          lastRenderedState: t2
        }, r2;
      }
      function Ir(t2, r2, a, l2) {
        return t2.baseState = a, Af(t2, De, typeof l2 == "function" ? l2 : Bt);
      }
      function go(t2, r2, a, l2, c) {
        if (Wr(t2)) throw Error(F(485));
        if (t2 = r2.action, t2 !== null) {
          var d = {
            payload: c,
            action: t2,
            next: null,
            isTransition: true,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(h2) {
              d.listeners.push(h2);
            }
          };
          Q.T !== null ? a(true) : d.isTransition = false, l2(d), a = r2.pending, a === null ? (d.next = r2.pending = d, Rr(r2, d)) : (d.next = a.next, r2.pending = a.next = d);
        }
      }
      function Rr(t2, r2) {
        var a = r2.action, l2 = r2.payload, c = t2.state;
        if (r2.isTransition) {
          var d = Q.T, h2 = {};
          h2.types = d !== null ? d.types : null, Q.T = h2;
          try {
            var y = a(c, l2), C = Q.S;
            C !== null && C(h2, y), Lr(t2, r2, y);
          } catch (R) {
            As(t2, r2, R);
          } finally {
            d !== null && h2.types !== null && (d.types = h2.types), Q.T = d;
          }
        } else try {
          d = a(c, l2), Lr(t2, r2, d);
        } catch (R) {
          As(t2, r2, R);
        }
      }
      function Lr(t2, r2, a) {
        a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(l2) {
          zc(t2, r2, l2);
        }, function(l2) {
          return As(t2, r2, l2);
        }) : zc(t2, r2, a);
      }
      function zc(t2, r2, a) {
        r2.status = "fulfilled", r2.value = a, Of(r2), t2.state = a, r2 = t2.pending, r2 !== null && (a = r2.next, a === r2 ? t2.pending = null : (a = a.next, r2.next = a, Rr(t2, a)));
      }
      function As(t2, r2, a) {
        var l2 = t2.pending;
        if (t2.pending = null, l2 !== null) {
          l2 = l2.next;
          do
            r2.status = "rejected", r2.reason = a, Of(r2), r2 = r2.next;
          while (r2 !== l2);
        }
        t2.action = null;
      }
      function Of(t2) {
        t2 = t2.listeners;
        for (var r2 = 0; r2 < t2.length; r2++) (0, t2[r2])();
      }
      function Fr(t2, r2) {
        return r2;
      }
      function Bf(t2, r2) {
        if (ne) {
          var a = Be.formState;
          if (a !== null) {
            e: {
              var l2 = re;
              if (ne) {
                if (Qe) {
                  var c = Zp(Qe, hr);
                  if (c) {
                    Qe = Nd(c), l2 = Xp(c);
                    break e;
                  }
                }
                Mn(l2);
              }
              l2 = false;
            }
            l2 && (r2 = a[0]);
          }
        }
        a = gn(), a.memoizedState = a.baseState = r2, l2 = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Fr,
          lastRenderedState: r2
        }, a.queue = l2, a = Tc.bind(null, re, l2), l2.dispatch = a, l2 = gt(false);
        var d = yl.bind(null, re, false, l2.queue);
        return l2 = gn(), c = {
          state: r2,
          dispatch: null,
          action: t2,
          pending: null
        }, l2.queue = c, a = go.bind(null, re, c, d, a), c.dispatch = a, l2.memoizedState = t2, [r2, a, false];
      }
      function Dr(t2) {
        var r2 = K();
        return ml(r2, De, t2);
      }
      function ml(t2, r2, a) {
        if (r2 = Af(t2, r2, Fr)[0], t2 = js(Bt)[0], typeof r2 == "object" && r2 !== null && typeof r2.then == "function") try {
          var l2 = fl(r2);
        } catch (h2) {
          throw h2 === Jl ? Wd : h2;
        }
        else l2 = r2;
        r2 = K();
        var c = r2.queue, d = c.dispatch;
        return a !== r2.memoizedState && (re.flags |= 2048, Ur(9, {
          destroy: void 0
        }, Ec.bind(null, c, a), null)), [l2, d, t2];
      }
      function Ec(t2, r2) {
        t2.action = r2;
      }
      function jr(t2) {
        var r2 = K(), a = De;
        if (a !== null) return ml(r2, a, t2);
        K(), r2 = r2.memoizedState, a = K();
        var l2 = a.queue.dispatch;
        return a.memoizedState = t2, [r2, l2, false];
      }
      function Ur(t2, r2, a, l2) {
        return t2 = {
          tag: t2,
          create: a,
          deps: l2,
          inst: r2,
          next: null
        }, r2 = re.updateQueue, r2 === null && (r2 = si(), re.updateQueue = r2), a = r2.lastEffect, a === null ? r2.lastEffect = t2.next = t2 : (l2 = a.next, a.next = t2, t2.next = l2, r2.lastEffect = t2), t2;
      }
      function Hf() {
        return K().memoizedState;
      }
      function gl(t2, r2, a, l2) {
        var c = gn();
        re.flags |= t2, c.memoizedState = Ur(1 | r2, {
          destroy: void 0
        }, a, l2 === void 0 ? null : l2);
      }
      function Os(t2, r2, a, l2) {
        var c = K();
        l2 = l2 === void 0 ? null : l2;
        var d = c.memoizedState.inst;
        De !== null && l2 !== null && Fs(l2, De.memoizedState.deps) ? c.memoizedState = Ur(r2, d, a, l2) : (re.flags |= t2, c.memoizedState = Ur(1 | r2, d, a, l2));
      }
      function Mf(t2, r2) {
        gl(8390656, 8, t2, r2);
      }
      function _c(t2, r2) {
        Os(2048, 8, t2, r2);
      }
      function Vf(t2) {
        re.flags |= 4;
        var r2 = re.updateQueue;
        if (r2 === null) r2 = si(), re.updateQueue = r2, r2.events = [t2];
        else {
          var a = r2.events;
          a === null ? r2.events = [t2] : a.push(t2);
        }
      }
      function $f(t2) {
        var r2 = K().memoizedState;
        return Vf({
          ref: r2,
          nextImpl: t2
        }), function() {
          if ((de & 2) !== 0) throw Error(F(440));
          return r2.impl.apply(void 0, arguments);
        };
      }
      function Nc(t2, r2) {
        return Os(4, 2, t2, r2);
      }
      function hm(t2, r2) {
        return Os(4, 4, t2, r2);
      }
      function Qf(t2, r2) {
        if (typeof r2 == "function") {
          t2 = t2();
          var a = r2(t2);
          return function() {
            typeof a == "function" ? a() : r2(null);
          };
        }
        if (r2 != null) return t2 = t2(), r2.current = t2, function() {
          r2.current = null;
        };
      }
      function mm(t2, r2, a) {
        a = a != null ? a.concat([t2]) : null, Os(4, 4, Qf.bind(null, r2, t2), a);
      }
      function Bs() {
      }
      function Hs(t2, r2) {
        var a = K();
        r2 = r2 === void 0 ? null : r2;
        var l2 = a.memoizedState;
        return r2 !== null && Fs(r2, l2[1]) ? l2[0] : (a.memoizedState = [t2, r2], t2);
      }
      function qf(t2, r2) {
        var a = K();
        r2 = r2 === void 0 ? null : r2;
        var l2 = a.memoizedState;
        if (r2 !== null && Fs(r2, l2[1])) return l2[0];
        if (l2 = t2(), Fi) {
          ga(true);
          try {
            t2();
          } finally {
            ga(false);
          }
        }
        return a.memoizedState = [l2, r2], l2;
      }
      function bl(t2, r2, a) {
        return a === void 0 || (ta & 1073741824) !== 0 && (ye & 261930) === 0 ? t2.memoizedState = r2 : (t2.memoizedState = a, t2 = vp(), re.lanes |= t2, aa |= t2, a);
      }
      function Gf(t2, r2, a, l2) {
        return $t(a, r2) ? a : Ba.current !== null ? (t2 = bl(t2, a, l2), $t(t2, r2) || (Pn = true), t2) : (ta & 106) === 0 || (ta & 1073741824) !== 0 && (ye & 261930) === 0 ? (Pn = true, t2.memoizedState = a) : (t2 = vp(), re.lanes |= t2, aa |= t2, r2);
      }
      function Jf(t2, r2, a, l2, c) {
        var d = sr();
        jn(d !== 0 && 8 > d ? d : 8);
        var h2 = Q.T, y = {};
        y.types = h2 !== null ? h2.types : null, Q.T = y, yl(t2, false, r2, a);
        try {
          var C = c(), R = Q.S;
          if (R !== null && R(y, C), C !== null && typeof C == "object" && typeof C.then == "function") {
            var D = dm(C, l2);
            wa(t2, r2, D, zt(t2));
          } else wa(t2, r2, l2, zt(t2));
        } catch (U) {
          wa(t2, r2, {
            then: function() {
            },
            status: "rejected",
            reason: U
          }, zt());
        } finally {
          jn(d), h2 !== null && y.types !== null && (h2.types = y.types), Q.T = h2;
        }
      }
      function Zf(t2) {
        var r2 = t2.memoizedState;
        if (r2 !== null) return r2;
        r2 = {
          memoizedState: Fa,
          baseState: Fa,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Bt,
            lastRenderedState: Fa
          },
          next: null
        };
        var a = {};
        return r2.next = {
          memoizedState: a,
          baseState: a,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Bt,
            lastRenderedState: a
          },
          next: null
        }, t2.memoizedState = r2, t2 = t2.alternate, t2 !== null && (t2.memoizedState = r2), r2;
      }
      function bo() {
        return Me($r);
      }
      function Xf() {
        return K().memoizedState;
      }
      function Yf() {
        return K().memoizedState;
      }
      function gm(t2) {
        for (var r2 = t2.return; r2 !== null; ) {
          switch (r2.tag) {
            case 24:
            case 3:
              var a = zt();
              t2 = po(a);
              var l2 = ka(r2, t2, a);
              l2 !== null && (yt(l2, r2, a), Ls(l2, r2, a)), r2 = {
                cache: _s()
              }, t2.payload = r2;
              return;
          }
          r2 = r2.return;
        }
      }
      function bt(t2, r2, a) {
        var l2 = zt();
        a = {
          lane: l2,
          revertLane: 0,
          gesture: null,
          action: a,
          hasEagerState: false,
          eagerState: null,
          next: null
        }, Wr(t2) ? Kf(r2, a) : (a = kc(t2, r2, a, l2), a !== null && (yt(a, t2, l2), Ms(a, r2, l2)));
      }
      function Tc(t2, r2, a) {
        var l2 = zt();
        wa(t2, r2, a, l2);
      }
      function wa(t2, r2, a, l2) {
        var c = {
          lane: l2,
          revertLane: 0,
          gesture: null,
          action: a,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (Wr(t2)) Kf(r2, c);
        else {
          var d = t2.alternate;
          if (t2.lanes === 0 && (d === null || d.lanes === 0) && (d = r2.lastRenderedReducer, d !== null)) try {
            var h2 = r2.lastRenderedState, y = d(h2, a);
            if (c.hasEagerState = true, c.eagerState = y, $t(y, h2)) return fo(t2, r2, c, 0), Be === null && Wo(), false;
          } catch {
          } finally {
          }
          if (a = kc(t2, r2, c, l2), a !== null) return yt(a, t2, l2), Ms(a, r2, l2), true;
        }
        return false;
      }
      function yl(t2, r2, a, l2) {
        if (l2 = {
          lane: 2,
          revertLane: Sc(),
          gesture: null,
          action: l2,
          hasEagerState: false,
          eagerState: null,
          next: null
        }, Wr(t2)) {
          if (r2) throw Error(F(479));
        } else r2 = kc(t2, a, l2, 2), r2 !== null && yt(r2, t2, 2);
      }
      function Wr(t2) {
        var r2 = t2.alternate;
        return t2 === re || r2 !== null && r2 === re;
      }
      function Kf(t2, r2) {
        ra = Bd = true;
        var a = t2.pending;
        a === null ? r2.next = r2 : (r2.next = a.next, a.next = r2), t2.pending = r2;
      }
      function Ms(t2, r2, a) {
        if ((a & 4194048) !== 0) {
          var l2 = r2.lanes;
          l2 &= t2.pendingLanes, a |= l2, r2.lanes = a, G(t2, a);
        }
      }
      function Ic(t2, r2, a, l2) {
        r2 = t2.memoizedState, a = a(l2, r2), a = a == null ? r2 : Lp({}, r2, a), t2.memoizedState = a, t2.lanes === 0 && (t2.updateQueue.baseState = a);
      }
      function Vs(t2, r2, a, l2, c, d, h2) {
        return t2 = t2.stateNode, typeof t2.shouldComponentUpdate == "function" ? t2.shouldComponentUpdate(l2, d, h2) : r2.prototype && r2.prototype.isPureReactComponent ? !Ts(a, l2) || !Ts(c, d) : true;
      }
      function ep(t2, r2, a, l2) {
        t2 = r2.state, typeof r2.componentWillReceiveProps == "function" && r2.componentWillReceiveProps(a, l2), typeof r2.UNSAFE_componentWillReceiveProps == "function" && r2.UNSAFE_componentWillReceiveProps(a, l2), r2.state !== t2 && Md.enqueueReplaceState(r2, r2.state, null);
      }
      function yo(t2, r2) {
        var a = r2;
        if ("ref" in r2) {
          a = {};
          for (var l2 in r2) l2 !== "ref" && (a[l2] = r2[l2]);
        }
        if (t2 = t2.defaultProps) {
          a === r2 && (a = Lp({}, a));
          for (var c in t2) a[c] === void 0 && (a[c] = t2[c]);
        }
        return a;
      }
      function $s(t2, r2) {
        try {
          var a = t2.onUncaughtError;
          a(r2.value, {
            componentStack: r2.stack
          });
        } catch (l2) {
          setTimeout(function() {
            throw l2;
          });
        }
      }
      function np(t2, r2, a) {
        try {
          var l2 = t2.onCaughtError;
          l2(a.value, {
            componentStack: a.stack,
            errorBoundary: r2.tag === 1 ? r2.stateNode : null
          });
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      function vl(t2, r2, a) {
        return a = po(a), a.tag = 3, a.payload = {
          element: null
        }, a.callback = function() {
          $s(t2, r2);
        }, a;
      }
      function Qs(t2) {
        return t2 = po(t2), t2.tag = 3, t2;
      }
      function Rc(t2, r2, a, l2) {
        var c = a.type.getDerivedStateFromError;
        if (typeof c == "function") {
          var d = l2.value;
          t2.payload = function() {
            return c(d);
          }, t2.callback = function() {
            np(r2, a, l2);
          };
        }
        var h2 = a.stateNode;
        h2 !== null && typeof h2.componentDidCatch == "function" && (t2.callback = function() {
          np(r2, a, l2), typeof c != "function" && (Va === null ? Va = /* @__PURE__ */ new Set([this]) : Va.add(this));
          var y = l2.stack;
          this.componentDidCatch(l2.value, {
            componentStack: y !== null ? y : ""
          });
        });
      }
      function tt(t2, r2, a, l2, c) {
        if (a.flags |= 32768, l2 !== null && typeof l2 == "object" && typeof l2.then == "function") {
          if (r2 = a.alternate, r2 !== null && so(r2, a, c, true), a = Zn.current, a !== null) {
            switch (a.tag) {
              case 31:
              case 13:
              case 19:
                return lt === null ? Rl() : a.alternate === null && cn === 0 && (cn = 3), a.flags &= -257, a.flags |= 65536, a.lanes = c, l2 === Ad ? a.flags |= 16384 : (r2 = a.updateQueue, r2 === null ? a.updateQueue = /* @__PURE__ */ new Set([l2]) : r2.add(l2), dd(t2, l2, c)), false;
              case 22:
                return a.flags |= 65536, l2 === Ad ? a.flags |= 16384 : (r2 = a.updateQueue, r2 === null ? (r2 = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([l2])
                }, a.updateQueue = r2) : (a = r2.retryQueue, a === null ? r2.retryQueue = /* @__PURE__ */ new Set([l2]) : a.add(l2)), dd(t2, l2, c)), false;
            }
            throw Error(F(435, a.tag));
          }
          return dd(t2, l2, c), Rl(), false;
        }
        if (ne) return r2 = Zn.current, r2 !== null ? ((r2.flags & 65536) === 0 && (r2.flags |= 256), r2.flags |= 65536, r2.lanes = c, l2 !== hh && (t2 = Error(F(422), {
          cause: l2
        }), va(Kt(t2, a)))) : (l2 !== hh && (r2 = Error(F(423), {
          cause: l2
        }), va(Kt(r2, a))), t2 = t2.current.alternate, t2.flags |= 65536, c &= -c, t2.lanes |= c, l2 = Kt(l2, a), c = vl(t2.stateNode, l2, c), wc(t2, c), cn !== 4 && (cn = 2)), false;
        var d = Error(F(520), {
          cause: l2
        });
        if (d = Kt(d, a), Vu === null ? Vu = [d] : Vu.push(d), cn !== 4 && (cn = 2), r2 === null) return true;
        l2 = Kt(l2, a), a = r2;
        do {
          switch (a.tag) {
            case 3:
              return a.flags |= 65536, t2 = c & -c, a.lanes |= t2, t2 = vl(a.stateNode, l2, t2), wc(a, t2), false;
            case 1:
              if (r2 = a.type, d = a.stateNode, (a.flags & 128) === 0 && (typeof r2.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Va === null || !Va.has(d)))) return a.flags |= 65536, c &= -c, a.lanes |= c, c = Qs(c), Rc(c, t2, a, l2), wc(a, c), false;
              break;
            case 22:
              if (a.memoizedState !== null) return a.flags |= 65536, false;
          }
          a = a.return;
        } while (a !== null);
        return false;
      }
      function wn(t2, r2, a, l2) {
        r2.child = t2 === null ? zg(r2, null, a, l2) : Li(r2, t2.child, a, l2);
      }
      function qs(t2, r2, a, l2, c) {
        a = a.render;
        var d = r2.ref;
        if ("ref" in l2) {
          var h2 = {};
          for (var y in l2) y !== "ref" && (h2[y] = l2[y]);
        } else h2 = l2;
        return Do(r2), l2 = cl(t2, r2, a, h2, d, c), y = Ds(), t2 !== null && !Pn ? (Ho(t2, r2, c), Ee(t2, r2, c)) : (ne && y && Ps(r2), r2.flags |= 1, wn(t2, r2, l2, c), r2.child);
      }
      function Lc(t2, r2, a, l2, c) {
        if (t2 === null) {
          var d = a.type;
          return typeof d == "function" && !_p(d) && d.defaultProps === void 0 && a.compare === null ? (r2.tag = 15, r2.type = d, Fc(t2, r2, d, l2, c)) : (t2 = Vt(a.type, null, l2, r2, r2.mode, c), t2.ref = r2.ref, t2.return = r2, r2.child = t2);
        }
        if (d = t2.child, !Ks(t2, c)) {
          var h2 = d.memoizedProps;
          if (a = a.compare, a = a !== null ? a : Ts, a(h2, l2) && t2.ref === r2.ref) return Ee(t2, r2, c);
        }
        return r2.flags |= 1, t2 = Zo(d, l2), t2.ref = r2.ref, t2.return = r2, r2.child = t2;
      }
      function Fc(t2, r2, a, l2, c) {
        if (t2 !== null) {
          var d = t2.memoizedProps;
          if (Ts(d, l2) && t2.ref === r2.ref) if (Pn = false, r2.pendingProps = l2 = d, Ks(t2, c)) (t2.flags & 131072) !== 0 && (Pn = true);
          else return r2.lanes = t2.lanes, Ee(t2, r2, c);
        }
        return tp(t2, r2, a, l2, c);
      }
      function Vo(t2, r2, a, l2) {
        var c = l2.children, d = t2 !== null ? t2.memoizedState : null;
        if (t2 === null && r2.stateNode === null && (r2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }), l2.mode === "hidden") {
          if ((r2.flags & 128) !== 0) {
            if (d = d !== null ? d.baseLanes | a : a, t2 !== null) {
              for (l2 = r2.child = t2.child, c = 0; l2 !== null; ) c = c | l2.lanes | l2.childLanes, l2 = l2.sibling;
              l2 = c & ~d;
            } else l2 = 0, r2.child = null;
            return Sl(t2, r2, d, a, l2);
          }
          if ((a & 536870912) !== 0) r2.memoizedState = {
            baseLanes: 0,
            cachePool: null
          }, t2 !== null && ol(r2, d !== null ? d.cachePool : null), d !== null ? Pc(r2, d) : Ao(), Wf(r2);
          else return l2 = r2.lanes = 536870912, Sl(t2, r2, d !== null ? d.baseLanes | a : a, a, l2);
        } else d !== null ? (ol(r2, d.cachePool), Pc(r2, d), Tr(), r2.memoizedState = null) : (t2 !== null && ol(r2, null), Ao(), Tr());
        return wn(t2, r2, c, a), r2.child;
      }
      function rr(t2, r2) {
        return t2 !== null && t2.tag === 22 || r2.stateNode !== null || (r2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }), r2.sibling;
      }
      function Sl(t2, r2, a, l2, c) {
        var d = rl();
        return d = d === null ? null : {
          parent: lr ? tn._currentValue : tn._currentValue2,
          pool: d
        }, r2.memoizedState = {
          baseLanes: a,
          cachePool: d
        }, t2 !== null && ol(r2, null), Ao(), Wf(r2), t2 !== null && so(t2, r2, l2, true), r2.childLanes = c, null;
      }
      function ui(t2, r2) {
        return r2 = Ar({
          mode: r2.mode,
          children: r2.children
        }, t2.mode), r2.ref = t2.ref, t2.child = r2, r2.return = t2, r2;
      }
      function kl(t2, r2, a) {
        return Li(r2, t2.child, null, a), t2 = ui(r2, r2.pendingProps), t2.flags |= 2, Ln(r2), r2.memoizedState = null, t2;
      }
      function Gs(t2, r2, a) {
        var l2 = r2.pendingProps, c = (r2.flags & 128) !== 0;
        if (r2.flags &= -129, t2 === null) {
          if (ne) {
            if (l2.mode === "hidden") return t2 = ui(r2, l2), r2.lanes = 536870912, t2.memoizedState = {
              baseLanes: 0,
              cachePool: null
            }, rr(null, t2);
            if (Nr(r2), (t2 = Qe) ? (t2 = cg(t2, hr), t2 !== null && (r2.memoizedState = {
              dehydrated: t2,
              treeContext: _e !== null ? {
                id: _n,
                overflow: $e
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, a = Ll(t2), a.return = r2, r2.child = a, Nn = r2, Qe = null)) : t2 = null, t2 === null) throw Mn(r2);
            return r2.lanes = 536870912, null;
          }
          return ui(r2, l2);
        }
        var d = t2.memoizedState;
        if (d !== null) {
          var h2 = d.dehydrated;
          if (Nr(r2), c) {
            if (r2.flags & 256) r2.flags &= -257, r2 = kl(t2, r2, a);
            else if (r2.memoizedState !== null) r2.child = t2.child, r2.flags |= 128, r2 = null;
            else throw Error(F(558));
          } else if (Pn || so(t2, r2, a, false), c = (a & t2.childLanes) !== 0, Pn || c) {
            if (Ba.current === null) {
              if (l2 = Be, l2 !== null && (h2 = Wt(l2, a), h2 !== 0 && h2 !== d.retryLane)) throw d.retryLane = h2, Er(t2, h2), yt(l2, t2, h2), vh;
              Rl();
            }
            r2 = kl(t2, r2, a);
          } else t2 = d.treeContext, En && (Qe = Yp(h2), Nn = r2, ne = true, pr = null, hr = false, t2 !== null && Rf(r2, t2)), r2 = ui(r2, l2), r2.flags |= 134221824;
          return r2;
        }
        return t2 = Zo(t2.child, {
          mode: l2.mode,
          children: l2.children
        }), t2.ref = r2.ref, r2.child = t2, t2.return = r2, t2;
      }
      function ci(t2, r2) {
        var a = r2.ref;
        if (a === null) t2 !== null && t2.ref !== null && (r2.flags |= 4194816);
        else {
          if (typeof a != "function" && typeof a != "object") throw Error(F(284));
          (t2 === null || t2.ref !== a) && (r2.flags |= 4194816);
        }
      }
      function tp(t2, r2, a, l2, c) {
        return Do(r2), a = cl(t2, r2, a, l2, void 0, c), l2 = Ds(), t2 !== null && !Pn ? (Ho(t2, r2, c), Ee(t2, r2, c)) : (ne && l2 && Ps(r2), r2.flags |= 1, wn(t2, r2, a, c), r2.child);
      }
      function rp(t2, r2, a, l2, c, d) {
        return Do(r2), r2.updateQueue = null, a = ho(r2, l2, a, c), Bo(t2), l2 = Ds(), t2 !== null && !Pn ? (Ho(t2, r2, d), Ee(t2, r2, d)) : (ne && l2 && Ps(r2), r2.flags |= 1, wn(t2, r2, a, d), r2.child);
      }
      function op(t2, r2, a, l2, c) {
        if (Do(r2), r2.stateNode === null) {
          var d = Aa, h2 = a.contextType;
          typeof h2 == "object" && h2 !== null && (d = Me(h2)), d = new a(l2, d), r2.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Md, r2.stateNode = d, d._reactInternals = r2, d = r2.stateNode, d.props = l2, d.state = r2.memoizedState, d.refs = {}, ii(r2), h2 = a.contextType, d.context = typeof h2 == "object" && h2 !== null ? Me(h2) : Aa, d.state = r2.memoizedState, h2 = a.getDerivedStateFromProps, typeof h2 == "function" && (Ic(r2, a, h2, l2), d.state = r2.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (h2 = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), h2 !== d.state && Md.enqueueReplaceState(d, d.state, null), ll(r2, l2, d, c), li(), d.state = r2.memoizedState), typeof d.componentDidMount == "function" && (r2.flags |= 4194308), l2 = true;
        } else if (t2 === null) {
          d = r2.stateNode;
          var y = r2.memoizedProps, C = yo(a, y);
          d.props = C;
          var R = d.context, D = a.contextType;
          h2 = Aa, typeof D == "object" && D !== null && (h2 = Me(D));
          var U = a.getDerivedStateFromProps;
          D = typeof U == "function" || typeof d.getSnapshotBeforeUpdate == "function", y = r2.pendingProps !== y, D || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y || R !== h2) && ep(r2, d, l2, h2), na = false;
          var A = r2.memoizedState;
          d.state = A, ll(r2, l2, d, c), li(), R = r2.memoizedState, y || A !== R || na ? (typeof U == "function" && (Ic(r2, a, U, l2), R = r2.memoizedState), (C = na || Vs(r2, a, C, l2, A, R, h2)) ? (D || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (r2.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (r2.flags |= 4194308), r2.memoizedProps = l2, r2.memoizedState = R), d.props = l2, d.state = R, d.context = h2, l2 = C) : (typeof d.componentDidMount == "function" && (r2.flags |= 4194308), l2 = false);
        } else {
          d = r2.stateNode, Sa(t2, r2), h2 = r2.memoizedProps, D = yo(a, h2), d.props = D, U = r2.pendingProps, A = d.context, R = a.contextType, C = Aa, typeof R == "object" && R !== null && (C = Me(R)), y = a.getDerivedStateFromProps, (R = typeof y == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h2 !== U || A !== C) && ep(r2, d, l2, C), na = false, A = r2.memoizedState, d.state = A, ll(r2, l2, d, c), li();
          var fe = r2.memoizedState;
          h2 !== U || A !== fe || na || t2 !== null && t2.dependencies !== null && oi(t2.dependencies) ? (typeof y == "function" && (Ic(r2, a, y, l2), fe = r2.memoizedState), (D = na || Vs(r2, a, D, l2, A, fe, C) || t2 !== null && t2.dependencies !== null && oi(t2.dependencies)) ? (R || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l2, fe, C), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l2, fe, C)), typeof d.componentDidUpdate == "function" && (r2.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (r2.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || h2 === t2.memoizedProps && A === t2.memoizedState || (r2.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h2 === t2.memoizedProps && A === t2.memoizedState || (r2.flags |= 1024), r2.memoizedProps = l2, r2.memoizedState = fe), d.props = l2, d.state = fe, d.context = C, l2 = D) : (typeof d.componentDidUpdate != "function" || h2 === t2.memoizedProps && A === t2.memoizedState || (r2.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h2 === t2.memoizedProps && A === t2.memoizedState || (r2.flags |= 1024), l2 = false);
        }
        return d = l2, ci(t2, r2), l2 = (r2.flags & 128) !== 0, d || l2 ? (d = r2.stateNode, a = l2 && typeof a.getDerivedStateFromError != "function" ? null : d.render(), r2.flags |= 1, t2 !== null && l2 ? (r2.child = Li(r2, t2.child, null, c), r2.child = Li(r2, null, a, c)) : wn(t2, r2, a, c), r2.memoizedState = d.state, t2 = r2.child) : t2 = Ee(t2, r2, c), t2;
      }
      function Dc(t2, r2, a, l2) {
        return ri(), r2.flags |= 256, wn(t2, r2, a, l2), r2.child;
      }
      function Js(t2) {
        return {
          baseLanes: t2,
          cachePool: Uf()
        };
      }
      function vo(t2, r2, a) {
        return t2 = t2 !== null ? t2.childLanes & ~a : 0, r2 && (t2 |= Ft), t2;
      }
      function jc(t2, r2, a) {
        var l2 = r2.pendingProps, c = false, d = (r2.flags & 128) !== 0, h2;
        if ((h2 = d) || (h2 = t2 !== null && t2.memoizedState === null ? false : (Xn.current & 2) !== 0), h2 && (c = true, r2.flags &= -129), h2 = (r2.flags & 32) !== 0, r2.flags &= -33, t2 === null) {
          if (ne) {
            if (c ? _r(r2) : Tr(), (t2 = Qe) ? (t2 = _0(t2, hr), t2 !== null && (r2.memoizedState = {
              dehydrated: t2,
              treeContext: _e !== null ? {
                id: _n,
                overflow: $e
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, a = Ll(t2), a.return = r2, r2.child = a, Nn = r2, Qe = null)) : t2 = null, t2 === null) throw Mn(r2);
            return Jp(t2) ? r2.lanes = 32 : r2.lanes = 536870912, null;
          }
          return d = l2.children, l2 = l2.fallback, c ? (Tr(), c = r2.mode, d = Ar({
            mode: "hidden",
            children: d
          }, c), l2 = Na(l2, c, a, null), d.return = r2, l2.return = r2, d.sibling = l2, r2.child = d, l2 = r2.child, l2.memoizedState = Js(a), l2.childLanes = vo(t2, h2, a), r2.memoizedState = Vd, rr(null, l2)) : (_r(r2), Uc(r2, d));
        }
        var y = t2.memoizedState;
        if (y !== null) {
          var C = y.dehydrated;
          if (C !== null) return Zs(t2, r2, d, h2, l2, C, y, a);
        }
        return c ? (Tr(), c = l2.fallback, d = r2.mode, y = t2.child, C = y.sibling, l2 = Zo(y, {
          mode: "hidden",
          children: l2.children
        }), l2.subtreeFlags = y.subtreeFlags & 1206910976, C !== null ? c = Zo(C, c) : (c = Na(c, d, a, null), c.flags |= 2), c.return = r2, l2.return = r2, l2.sibling = c, r2.child = l2, rr(null, l2), l2 = r2.child, c = t2.child.memoizedState, c === null ? c = Js(a) : (d = c.cachePool, d !== null ? (y = lr ? tn._currentValue : tn._currentValue2, d = d.parent !== y ? {
          parent: y,
          pool: y
        } : d) : d = Uf(), c = {
          baseLanes: c.baseLanes | a,
          cachePool: d
        }), l2.memoizedState = c, l2.childLanes = vo(t2, h2, a), r2.memoizedState = Vd, rr(t2.child, l2)) : (_r(r2), a = t2.child, t2 = a.sibling, a = Zo(a, {
          mode: "visible",
          children: l2.children
        }), a.return = r2, a.sibling = null, t2 !== null && (h2 = r2.deletions, h2 === null ? (r2.deletions = [t2], r2.flags |= 16) : h2.push(t2)), r2.child = a, r2.memoizedState = null, a);
      }
      function Uc(t2, r2) {
        return r2 = Ar({
          mode: "visible",
          children: r2
        }, t2.mode), r2.return = t2, t2.child = r2;
      }
      function Ar(t2, r2) {
        return t2 = et(22, t2, null, r2), t2.lanes = 0, t2;
      }
      function rt(t2, r2, a) {
        return Li(r2, t2.child, null, a), t2 = Uc(r2, r2.pendingProps.children), t2.flags |= 2, r2.memoizedState = null, t2;
      }
      function Zs(t2, r2, a, l2, c, d, h2, y) {
        if (a) return r2.flags & 256 ? (_r(r2), r2.flags &= -257, rt(t2, r2, y)) : r2.memoizedState !== null ? (Tr(), r2.child = t2.child, r2.flags |= 128, null) : (Tr(), d = c.fallback, h2 = r2.mode, c = Ar({
          mode: "visible",
          children: c.children
        }, h2), d = Na(d, h2, y, null), d.flags |= 2, c.return = r2, d.return = r2, c.sibling = d, r2.child = c, Li(r2, t2.child, null, y), c = r2.child, c.memoizedState = Js(y), c.childLanes = vo(t2, l2, y), r2.memoizedState = Vd, rr(null, c));
        if (_r(r2), Jp(d)) return l2 = C0(d).digest, l2 !== "" && (c = Error(F(419)), c.stack = "", c.digest = l2, va({
          value: c,
          source: null,
          stack: null
        })), rt(t2, r2, y);
        if (Pn || so(t2, r2, y, false), l2 = (y & t2.childLanes) !== 0, Pn || l2) {
          if (Ba.current !== null) return rt(t2, r2, y);
          if (l2 = Be, l2 !== null && (c = Wt(l2, y), c !== 0 && c !== h2.retryLane)) throw h2.retryLane = c, Er(t2, c), yt(l2, t2, c), vh;
          return Gp(d) || Rl(), rt(t2, r2, y);
        }
        return Gp(d) ? (r2.flags |= 192, r2.child = t2.child, null) : (t2 = h2.treeContext, En && (Qe = ug(d), Nn = r2, ne = true, pr = null, hr = false, t2 !== null && Rf(r2, t2)), r2 = Uc(r2, c.children), r2.flags |= 134221824, r2);
      }
      function Wc(t2, r2, a) {
        t2.lanes |= r2;
        var l2 = t2.alternate;
        l2 !== null && (l2.lanes |= r2), zn(t2.return, r2, a);
      }
      function Xs(t2) {
        for (var r2 = null; t2 !== null; ) {
          var a = t2.alternate;
          a !== null && ul(a) === null && (r2 = t2), t2 = t2.sibling;
        }
        return r2;
      }
      function ee(t2, r2, a, l2, c, d) {
        var h2 = t2.memoizedState;
        h2 === null ? t2.memoizedState = {
          isBackwards: r2,
          rendering: null,
          renderingStartTime: 0,
          last: l2,
          tail: a,
          tailMode: c,
          treeForkCount: d
        } : (h2.isBackwards = r2, h2.rendering = null, h2.renderingStartTime = 0, h2.last = l2, h2.tail = a, h2.tailMode = c, h2.treeForkCount = d);
      }
      function L(t2) {
        var r2 = t2.child;
        for (t2.child = null; r2 !== null; ) {
          var a = r2.sibling;
          r2.sibling = t2.child, t2.child = r2, r2 = a;
        }
      }
      function Pa(t2, r2, a) {
        var l2 = r2.pendingProps, c = l2.revealOrder, d = l2.tail;
        l2 = l2.children;
        var h2 = Xn.current;
        if (r2.flags & 128) return sl(r2, h2), null;
        var y = (h2 & 2) !== 0;
        if (y ? (h2 = h2 & 1 | 2, r2.flags |= 128) : h2 &= 1, sl(r2, h2), c === "backwards" && t2 !== null ? (L(t2), wn(t2, r2, l2, a), L(t2)) : wn(t2, r2, l2, a), l2 = ne ? Du : 0, !y && t2 !== null && (t2.flags & 128) !== 0) e: for (t2 = r2.child; t2 !== null; ) {
          if (t2.tag === 13) t2.memoizedState !== null && Wc(t2, a, r2);
          else if (t2.tag === 19) Wc(t2, a, r2);
          else if (t2.child !== null) {
            t2.child.return = t2, t2 = t2.child;
            continue;
          }
          if (t2 === r2) break e;
          for (; t2.sibling === null; ) {
            if (t2.return === null || t2.return === r2) break e;
            t2 = t2.return;
          }
          t2.sibling.return = t2.return, t2 = t2.sibling;
        }
        switch (c) {
          case "backwards":
            a = Xs(r2.child), a === null ? (c = r2.child, r2.child = null) : (c = a.sibling, a.sibling = null, L(r2)), ee(r2, true, c, null, d, l2);
            break;
          case "unstable_legacy-backwards":
            for (a = null, c = r2.child, r2.child = null; c !== null; ) {
              if (t2 = c.alternate, t2 !== null && ul(t2) === null) {
                r2.child = c;
                break;
              }
              t2 = c.sibling, c.sibling = a, a = c, c = t2;
            }
            ee(r2, true, a, null, d, l2);
            break;
          case "together":
            ee(r2, false, null, null, void 0, l2);
            break;
          case "independent":
            r2.memoizedState = null;
            break;
          default:
            a = Xs(r2.child), a === null ? (c = r2.child, r2.child = null) : (c = a.sibling, a.sibling = null), ee(r2, false, c, a, d, l2);
        }
        return r2.child;
      }
      function Ys(t2, r2, a) {
        var l2 = r2.pendingProps;
        return Rn(r2, r2.type, l2.value), wn(t2, r2, l2.children, a), r2.child;
      }
      function Ee(t2, r2, a) {
        if (t2 !== null && (r2.dependencies = t2.dependencies), aa |= r2.lanes, (a & r2.childLanes) === 0) if (t2 !== null) {
          if (so(t2, r2, a, false), (a & r2.childLanes) === 0) return null;
        } else return null;
        if (t2 !== null && r2.child !== t2.child) throw Error(F(153));
        if (r2.child !== null) {
          for (t2 = r2.child, a = Zo(t2, t2.pendingProps), r2.child = a, a.return = r2; t2.sibling !== null; ) t2 = t2.sibling, a = a.sibling = Zo(t2, t2.pendingProps), a.return = r2;
          a.sibling = null;
        }
        return r2.child;
      }
      function Ks(t2, r2) {
        return (t2.lanes & r2) !== 0 ? true : (t2 = t2.dependencies, !!(t2 !== null && oi(t2)));
      }
      function ap(t2, r2, a) {
        switch (r2.tag) {
          case 3:
            Cs(r2, r2.stateNode.containerInfo), Rn(r2, tn, t2.memoizedState.cache), ri();
            break;
          case 27:
          case 5:
            Lf(r2);
            break;
          case 4:
            Cs(r2, r2.stateNode.containerInfo);
            break;
          case 10:
            Rn(r2, r2.type, r2.memoizedProps.value);
            break;
          case 31:
            if (r2.memoizedState !== null) return r2.flags |= 128, Nr(r2), null;
            break;
          case 13:
            var l2 = r2.memoizedState;
            if (l2 !== null) {
              if (l2.dehydrated !== null) return _r(r2), r2.flags |= 128, null;
              l2 = so(t2, r2, a, false);
              var c = r2.child.childLanes;
              return l2 || (a & c) !== 0 ? jc(t2, r2, a) : (_r(r2), t2 = Ee(t2, r2, a), t2 !== null ? t2.sibling : null);
            }
            _r(r2);
            break;
          case 19:
            if (r2.flags & 128) return Pa(t2, r2, a);
            if (c = (t2.flags & 128) !== 0, l2 = (a & r2.childLanes) !== 0, l2 || (so(t2, r2, a, false), l2 = (a & r2.childLanes) !== 0), c) {
              if (l2) return Pa(t2, r2, a);
              r2.flags |= 128;
            }
            if (c = r2.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), sl(r2, Xn.current), l2) break;
            return null;
          case 22:
            return r2.lanes = 0, Vo(t2, r2, a, r2.pendingProps);
          case 24:
            Rn(r2, tn, t2.memoizedState.cache);
        }
        return Ee(t2, r2, a);
      }
      function ip(t2, r2, a) {
        if (t2 !== null) {
          if (t2.memoizedProps !== r2.pendingProps) Pn = true;
          else {
            if (!Ks(t2, a) && (r2.flags & 128) === 0) return Pn = false, ap(t2, r2, a);
            Pn = (t2.flags & 131072) !== 0;
          }
        } else Pn = false, ne && (r2.flags & 1048576) !== 0 && If(r2, Du, r2.index);
        switch (r2.lanes = 0, r2.tag) {
          case 16:
            e: {
              var l2 = r2.pendingProps;
              if (t2 = co(r2.elementType), r2.type = t2, typeof t2 == "function") _p(t2) ? (l2 = yo(t2, l2), r2.tag = 1, r2 = op(null, r2, t2, l2, a)) : (r2.tag = 0, r2 = tp(null, r2, t2, l2, a));
              else {
                if (t2 != null) {
                  var c = t2.$$typeof;
                  if (c === bd) {
                    r2.tag = 11, r2 = qs(null, r2, t2, l2, a);
                    break e;
                  } else if (c === Fl) {
                    r2.tag = 14, r2 = Lc(null, r2, t2, l2, a);
                    break e;
                  } else if (c === Vr) {
                    r2.tag = 10, r2.type = t2, r2 = Ys(null, r2, a);
                    break e;
                  }
                }
                throw r2 = gc(t2) || t2, Error(F(306, r2, ""));
              }
            }
            return r2;
          case 0:
            return tp(t2, r2, r2.type, r2.pendingProps, a);
          case 1:
            return l2 = r2.type, c = yo(l2, r2.pendingProps), op(t2, r2, l2, c, a);
          case 3:
            e: {
              if (Cs(r2, r2.stateNode.containerInfo), t2 === null) throw Error(F(387));
              var d = r2.pendingProps;
              c = r2.memoizedState, l2 = c.element, Sa(t2, r2), ll(r2, d, null, a);
              var h2 = r2.memoizedState;
              if (d = h2.cache, Rn(r2, tn, d), d !== c.cache && nr(r2, [tn], a, true), li(), d = h2.element, En && c.isDehydrated) {
                if (c = {
                  element: d,
                  isDehydrated: false,
                  cache: h2.cache
                }, r2.updateQueue.baseState = c, r2.memoizedState = c, r2.flags & 256) {
                  r2 = Dc(t2, r2, d, a);
                  break e;
                } else if (d !== l2) {
                  l2 = Kt(Error(F(424)), r2), va(l2), r2 = Dc(t2, r2, d, a);
                  break e;
                } else for (En && (Qe = Ol(r2.stateNode.containerInfo), Nn = r2, ne = true, pr = null, hr = true), a = zg(r2, null, d, a), r2.child = a; a; ) a.flags = a.flags & -3 | 134221824, a = a.sibling;
              } else {
                if (ri(), d === l2) {
                  r2 = Ee(t2, r2, a);
                  break e;
                }
                wn(t2, r2, d, a);
              }
              r2 = r2.child;
            }
            return r2;
          case 26:
            if (Nt) return ci(t2, r2), t2 === null ? (a = yg(r2.type, null, r2.pendingProps, null)) ? r2.memoizedState = a : ne || (r2.stateNode = ah(r2.type, r2.pendingProps, Je.current, r2)) : r2.memoizedState = yg(r2.type, t2.memoizedProps, r2.pendingProps, t2.memoizedState), null;
          case 27:
            if (be) return Lf(r2), t2 === null && be && ne && (l2 = r2.stateNode = Un(r2.type, r2.pendingProps, Je.current, Jn.current, false), Nn = r2, hr = true, Qe = we(r2.type, l2, Qe)), wn(t2, r2, r2.pendingProps.children, a), ci(t2, r2), t2 === null && (r2.flags |= 4194304), r2.child;
          case 5:
            return t2 === null && ne && (Id(r2.type, r2.pendingProps, Jn.current), (c = l2 = Qe) && (l2 = Kp(l2, r2.type, r2.pendingProps, hr), l2 !== null ? (r2.stateNode = l2, Nn = r2, Qe = sg(l2), hr = false, c = true) : c = false), c || Mn(r2)), Lf(r2), c = r2.type, d = r2.pendingProps, h2 = t2 !== null ? t2.memoizedProps : null, l2 = d.children, kd(c, d) ? l2 = null : h2 !== null && kd(c, h2) && (r2.flags |= 32), r2.memoizedState !== null && (c = cl(t2, r2, Cc, null, null, a), lr ? $r._currentValue = c : $r._currentValue2 = c), ci(t2, r2), wn(t2, r2, l2, a), r2.child;
          case 6:
            return t2 === null && ne && (zi(r2.pendingProps, Jn.current), (t2 = a = Qe) && (a = E0(a, r2.pendingProps, hr), a !== null ? (r2.stateNode = a, Nn = r2, Qe = null, t2 = true) : t2 = false), t2 || Mn(r2)), null;
          case 13:
            return jc(t2, r2, a);
          case 4:
            return Cs(r2, r2.stateNode.containerInfo), l2 = r2.pendingProps, t2 === null ? r2.child = Li(r2, null, l2, a) : wn(t2, r2, l2, a), r2.child;
          case 11:
            return qs(t2, r2, r2.type, r2.pendingProps, a);
          case 7:
            return l2 = r2.pendingProps, ci(t2, r2), wn(t2, r2, l2, a), r2.child;
          case 8:
            return wn(t2, r2, r2.pendingProps.children, a), r2.child;
          case 12:
            return wn(t2, r2, r2.pendingProps.children, a), r2.child;
          case 10:
            return Ys(t2, r2, a);
          case 9:
            return c = r2.type._context, l2 = r2.pendingProps.children, Do(r2), c = Me(c), l2 = l2(c), r2.flags |= 1, wn(t2, r2, l2, a), r2.child;
          case 14:
            return Lc(t2, r2, r2.type, r2.pendingProps, a);
          case 15:
            return Fc(t2, r2, r2.type, r2.pendingProps, a);
          case 19:
            return Pa(t2, r2, a);
          case 31:
            return Gs(t2, r2, a);
          case 22:
            return Vo(t2, r2, a, r2.pendingProps);
          case 24:
            return Do(r2), l2 = Me(tn), t2 === null ? (c = rl(), c === null && (c = Be, d = _s(), c.pooledCache = d, d.refCount++, d !== null && (c.pooledCacheLanes |= a), c = d), r2.memoizedState = {
              parent: l2,
              cache: c
            }, ii(r2), Rn(r2, tn, c)) : ((t2.lanes & a) !== 0 && (Sa(t2, r2), ll(r2, null, null, a), li()), c = t2.memoizedState, d = r2.memoizedState, c.parent !== l2 ? (c = {
              parent: l2,
              cache: l2
            }, r2.memoizedState = c, r2.lanes === 0 && (r2.memoizedState = r2.updateQueue.baseState = c), Rn(r2, tn, l2)) : (l2 = d.cache, Rn(r2, tn, l2), l2 !== c.cache && nr(r2, [tn], a, true))), wn(t2, r2, r2.pendingProps.children, a), r2.child;
          case 30:
            return r2.stateNode === null && (r2.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }), l2 = r2.pendingProps, l2.name != null && l2.name !== "auto" ? r2.flags |= t2 === null ? 18882560 : 18874368 : ne && Ps(r2), t2 !== null && t2.memoizedProps.name !== l2.name ? r2.flags |= 4194816 : ci(t2, r2), wn(t2, r2, l2.children, a), r2.child;
          case 29:
            throw r2.pendingProps;
        }
        throw Error(F(156, r2.tag));
      }
      function Ht(t2) {
        t2.flags |= 4;
      }
      function Ac(t2) {
        ln && (t2.flags |= 8);
      }
      function Oc(t2, r2) {
        if (t2 !== null && t2.child === r2.child) return false;
        if ((r2.flags & 16) !== 0) return true;
        for (t2 = r2.child; t2 !== null; ) {
          if ((t2.flags & 8218) !== 0 || (t2.subtreeFlags & 8218) !== 0) return true;
          t2 = t2.sibling;
        }
        return false;
      }
      function eu(t2, r2, a, l2) {
        if (Ye) for (a = r2.child; a !== null; ) {
          if (a.tag === 5 || a.tag === 6) Sd(t2, a.stateNode);
          else if (!(a.tag === 4 || be && a.tag === 27) && a.child !== null) {
            a.child.return = a, a = a.child;
            continue;
          }
          if (a === r2) break;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === r2) return;
            a = a.return;
          }
          a.sibling.return = a.return, a = a.sibling;
        }
        else if (ln) for (var c = r2.child; c !== null; ) {
          if (c.tag === 5) {
            var d = c.stateNode;
            a && l2 && (d = _d(d, c.type, c.memoizedProps)), Sd(t2, d);
          } else if (c.tag === 6) d = c.stateNode, a && l2 && (d = ig(d, c.memoizedProps)), Sd(t2, d);
          else if (c.tag !== 4) {
            if (c.tag === 22 && c.memoizedState !== null) d = c.child, d !== null && (d.return = c), eu(t2, c, true, true);
            else if (c.child !== null) {
              c.child.return = c, c = c.child;
              continue;
            }
          }
          if (c === r2) break;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === r2) return;
            c = c.return;
          }
          c.sibling.return = c.return, c = c.sibling;
        }
      }
      function Bc(t2, r2, a, l2) {
        var c = false;
        if (ln) for (var d = r2.child; d !== null; ) {
          if (d.tag === 5) {
            var h2 = d.stateNode;
            a && l2 && (h2 = _d(h2, d.type, d.memoizedProps)), Ci(t2, h2);
          } else if (d.tag === 6) h2 = d.stateNode, a && l2 && (h2 = ig(h2, d.memoizedProps)), Ci(t2, h2);
          else if (d.tag !== 4) {
            if (d.tag === 22 && d.memoizedState !== null) c = d.child, c !== null && (c.return = d), Bc(t2, d, true, true), c = true;
            else if (d.child !== null) {
              d.child.return = d, d = d.child;
              continue;
            }
          }
          if (d === r2) break;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === r2) return c;
            d = d.return;
          }
          d.sibling.return = d.return, d = d.sibling;
        }
        return c;
      }
      function ot(t2, r2) {
        if (ln && Oc(t2, r2)) {
          t2 = r2.stateNode;
          var a = t2.containerInfo, l2 = ag();
          Bc(l2, r2, false, false), t2.pendingChildren = l2, Ht(r2), Ed(a, l2);
        }
      }
      function xe(t2, r2, a, l2) {
        if (Ye) t2.memoizedProps !== l2 && Ht(r2);
        else if (ln) {
          var c = t2.stateNode, d = t2.memoizedProps;
          if ((t2 = Oc(t2, r2)) || d !== l2) {
            var h2 = Jn.current;
            d = og(c, a, d, l2, !t2, null), d === c ? r2.stateNode = c : (Ac(r2), Ap(d, a, l2, h2) && Ht(r2), r2.stateNode = d, t2 && eu(d, r2, false, false));
          } else r2.stateNode = c;
        }
      }
      function wl(t2, r2, a, l2, c) {
        if ((t2.mode & 32) !== 0 && (a === null ? Am(r2, l2) : Dl(r2, a, l2))) {
          if (t2.flags |= 16777216, (c & 335544128) === c || wd(r2, l2)) if (ur(t2.stateNode, r2, l2)) t2.flags |= 8192;
          else if (wp()) t2.flags |= 8192;
          else throw Ri = Ad, gh;
        } else t2.flags &= -16777217;
      }
      function Pl(t2, r2) {
        if (L0(r2)) {
          if (t2.flags |= 16777216, !ce(r2)) if (wp()) t2.flags |= 8192;
          else throw Ri = Ad, gh;
        } else t2.flags &= -16777217;
      }
      function Or(t2, r2) {
        r2 !== null && (t2.flags |= 4), t2.flags & 16384 && (r2 = t2.tag !== 22 ? Nf() : 536870912, t2.lanes |= r2, es |= r2);
      }
      function Br(t2, r2) {
        if (!ne) switch (t2.tailMode) {
          case "visible":
            break;
          case "collapsed":
            for (var a = t2.tail, l2 = null; a !== null; ) a.alternate !== null && (l2 = a), a = a.sibling;
            l2 === null ? r2 || t2.tail === null ? t2.tail = null : t2.tail.sibling = null : l2.sibling = null;
            break;
          default:
            for (r2 = t2.tail, a = null; r2 !== null; ) r2.alternate !== null && (a = r2), r2 = r2.sibling;
            a === null ? t2.tail = null : a.sibling = null;
        }
      }
      function ge(t2) {
        var r2 = t2.alternate !== null && t2.alternate.child === t2.child, a = 0, l2 = 0;
        if (r2) for (var c = t2.child; c !== null; ) a |= c.lanes | c.childLanes, l2 |= c.subtreeFlags & 1206910976, l2 |= c.flags & 1206910976, c.return = t2, c = c.sibling;
        else for (c = t2.child; c !== null; ) a |= c.lanes | c.childLanes, l2 |= c.subtreeFlags, l2 |= c.flags, c.return = t2, c = c.sibling;
        return t2.subtreeFlags |= l2, t2.childLanes = a, r2;
      }
      function lp(t2, r2, a) {
        var l2 = r2.pendingProps;
        switch (xs(r2), r2.tag) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return ge(r2), null;
          case 1:
            return ge(r2), null;
          case 3:
            return a = r2.stateNode, l2 = null, t2 !== null && (l2 = t2.memoizedState.cache), r2.memoizedState.cache !== l2 && (r2.flags |= 2048), lo(tn), ya(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t2 === null || t2.child === null) && (nl(r2) ? Ht(r2) : t2 === null || t2.memoizedState.isDehydrated && (r2.flags & 256) === 0 || (r2.flags |= 1024, zs())), ot(t2, r2), ge(r2), null;
          case 26:
            if (Nt) {
              var c = r2.type, d = r2.memoizedState;
              return t2 === null ? (Ht(r2), d !== null ? (ge(r2), Pl(r2, d)) : (ge(r2), wl(r2, c, null, l2, a))) : d ? d !== t2.memoizedState ? (Ht(r2), ge(r2), Pl(r2, d)) : (ge(r2), r2.flags &= -16777217) : (d = t2.memoizedProps, Ye ? d !== l2 && Ht(r2) : xe(t2, r2, c, l2), ge(r2), wl(r2, c, d, l2, a)), null;
            }
          case 27:
            if (be) {
              if (Oe(r2), a = Je.current, c = r2.type, t2 !== null && r2.stateNode != null) Ye ? t2.memoizedProps !== l2 && Ht(r2) : xe(t2, r2, c, l2);
              else {
                if (!l2) {
                  if (r2.stateNode === null) throw Error(F(166));
                  return ge(r2), r2.subtreeFlags &= -33554433, null;
                }
                t2 = Jn.current, nl(r2) ? Ff(r2, t2) : (t2 = Un(c, l2, a, t2, true), r2.stateNode = t2, Ht(r2));
              }
              return ge(r2), r2.subtreeFlags &= -33554433, null;
            }
          case 5:
            if (Oe(r2), c = r2.type, t2 !== null && r2.stateNode != null) xe(t2, r2, c, l2);
            else {
              if (!l2) {
                if (r2.stateNode === null) throw Error(F(166));
                return ge(r2), r2.subtreeFlags &= -33554433, null;
              }
              if (d = Jn.current, nl(r2)) Ff(r2, d), mg(r2.stateNode, c, l2, d) && (r2.flags |= 64);
              else {
                var h2 = Fm(c, l2, Je.current, d, r2);
                Ac(r2), eu(h2, r2, false, false), r2.stateNode = h2, Ap(h2, c, l2, d) && Ht(r2);
              }
            }
            return ge(r2), r2.subtreeFlags &= -33554433, wl(r2, r2.type, t2 === null ? null : t2.memoizedProps, r2.pendingProps, a), null;
          case 6:
            if (t2 && r2.stateNode != null) a = t2.memoizedProps, Ye ? a !== l2 && Ht(r2) : ln && (a !== l2 ? (t2 = Je.current, a = Jn.current, Ac(r2), r2.stateNode = Eu(l2, t2, a, r2)) : r2.stateNode = t2.stateNode);
            else {
              if (typeof l2 != "string" && r2.stateNode === null) throw Error(F(166));
              if (t2 = Je.current, a = Jn.current, nl(r2)) {
                if (!En) throw Error(F(176));
                if (t2 = r2.stateNode, a = r2.memoizedProps, l2 = null, c = Nn, c !== null) switch (c.tag) {
                  case 27:
                  case 5:
                    l2 = c.memoizedProps;
                }
                eh(t2, a, r2, l2) || Mn(r2, true);
              } else Ac(r2), r2.stateNode = Eu(l2, t2, a, r2);
            }
            return ge(r2), null;
          case 31:
            if (a = r2.memoizedState, t2 === null || t2.memoizedState !== null) {
              if (l2 = nl(r2), a !== null) {
                if (t2 === null) {
                  if (!l2) throw Error(F(318));
                  if (!En) throw Error(F(556));
                  if (t2 = r2.memoizedState, t2 = t2 !== null ? t2.dehydrated : null, !t2) throw Error(F(557));
                  dg(t2, r2);
                } else ri(), (r2.flags & 128) === 0 && (r2.memoizedState = null), r2.flags |= 4;
                ge(r2), t2 = false;
              } else a = zs(), t2 !== null && t2.memoizedState !== null && (t2.memoizedState.hydrationErrors = a), t2 = true;
              if (!t2) return r2.flags & 256 ? (Ln(r2), r2) : (Ln(r2), null);
              if ((r2.flags & 128) !== 0) throw Error(F(558));
            }
            return ge(r2), null;
          case 13:
            if (l2 = r2.memoizedState, t2 === null || t2.memoizedState !== null && t2.memoizedState.dehydrated !== null) {
              if (c = nl(r2), l2 !== null && l2.dehydrated !== null) {
                if (t2 === null) {
                  if (!c) throw Error(F(318));
                  if (!En) throw Error(F(344));
                  if (c = r2.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(F(317));
                  fg(c, r2);
                } else ri(), (r2.flags & 128) === 0 && (r2.memoizedState = null), r2.flags |= 4;
                ge(r2), c = false;
              } else c = zs(), t2 !== null && t2.memoizedState !== null && (t2.memoizedState.hydrationErrors = c), c = true;
              if (!c) return r2.flags & 256 ? (Ln(r2), r2) : (Ln(r2), null);
            }
            return Ln(r2), (r2.flags & 128) !== 0 ? (r2.lanes = a, r2) : (a = l2 !== null, t2 = t2 !== null && t2.memoizedState !== null, a && (l2 = r2.child, c = null, l2.alternate !== null && l2.alternate.memoizedState !== null && l2.alternate.memoizedState.cachePool !== null && (c = l2.alternate.memoizedState.cachePool.pool), d = null, l2.memoizedState !== null && l2.memoizedState.cachePool !== null && (d = l2.memoizedState.cachePool.pool), d !== c && (l2.flags |= 2048)), a !== t2 && a && (r2.child.flags |= 8192), Or(r2, r2.updateQueue), ge(r2), null);
          case 4:
            return ya(), ot(t2, r2), t2 === null && Um(r2.stateNode.containerInfo), r2.flags |= 67108864, ge(r2), null;
          case 10:
            return lo(r2.type), ge(r2), null;
          case 19:
            if (Oo(r2), l2 = r2.memoizedState, l2 === null) return ge(r2), null;
            if (c = (r2.flags & 128) !== 0, d = l2.rendering, d === null) {
              if (c) Br(l2, false);
              else {
                if (cn !== 0 || t2 !== null && (t2.flags & 128) !== 0) for (t2 = r2.child; t2 !== null; ) {
                  if (d = ul(t2), d !== null) {
                    for (r2.flags |= 128, Br(l2, false), t2 = d.updateQueue, r2.updateQueue = t2, Or(r2, t2), r2.subtreeFlags = 0, t2 = a, a = r2.child; a !== null; ) Np(a, t2), a = a.sibling;
                    return sl(r2, Xn.current & 1 | 2), ne && io(r2, l2.treeForkCount), r2.child;
                  }
                  t2 = t2.sibling;
                }
                l2.tail !== null && Tt() > ns && (r2.flags |= 128, c = true, Br(l2, false), r2.lanes = 4194304);
              }
            } else {
              if (!c) if (t2 = ul(d), t2 !== null) {
                if (r2.flags |= 128, c = true, t2 = t2.updateQueue, r2.updateQueue = t2, Or(r2, t2), Br(l2, true), l2.tail === null && l2.tailMode !== "collapsed" && l2.tailMode !== "visible" && !d.alternate && !ne) return ge(r2), null;
              } else 2 * Tt() - l2.renderingStartTime > ns && a !== 536870912 && (r2.flags |= 128, c = true, Br(l2, false), r2.lanes = 4194304);
              l2.isBackwards ? (d.sibling = r2.child, r2.child = d) : (t2 = l2.last, t2 !== null ? t2.sibling = d : r2.child = d, l2.last = d);
            }
            if (l2.tail !== null) {
              t2 = l2.tail;
              e: {
                for (a = t2; a !== null; ) {
                  if (a.alternate !== null) {
                    a = false;
                    break e;
                  }
                  a = a.sibling;
                }
                a = true;
              }
              return l2.rendering = t2, l2.tail = t2.sibling, l2.renderingStartTime = Tt(), t2.sibling = null, d = Xn.current, d = c ? d & 1 | 2 : d & 1, l2.tailMode === "visible" || l2.tailMode === "collapsed" || !a || ne ? sl(r2, d) : (a = d, Te(Zn, r2), Te(Xn, a), lt === null && (lt = r2)), ne && io(r2, l2.treeForkCount), t2;
            }
            return ge(r2), null;
          case 22:
          case 23:
            return Ln(r2), xc(), l2 = r2.memoizedState !== null, t2 !== null ? t2.memoizedState !== null !== l2 && (r2.flags |= 8192) : l2 && (r2.flags |= 8192), l2 ? (a & 536870912) !== 0 && (r2.flags & 128) === 0 && (ge(r2), r2.subtreeFlags & 6 && (r2.flags |= 8192)) : ge(r2), a = r2.updateQueue, a !== null && Or(r2, a.retryQueue), a = null, t2 !== null && t2.memoizedState !== null && t2.memoizedState.cachePool !== null && (a = t2.memoizedState.cachePool.pool), l2 = null, r2.memoizedState !== null && r2.memoizedState.cachePool !== null && (l2 = r2.memoizedState.cachePool.pool), l2 !== a && (r2.flags |= 2048), t2 !== null && W(Zr), null;
          case 24:
            return a = null, t2 !== null && (a = t2.memoizedState.cache), r2.memoizedState.cache !== a && (r2.flags |= 2048), lo(tn), ge(r2), null;
          case 25:
            return null;
          case 30:
            return r2.flags |= 33554432, ge(r2), null;
        }
        throw Error(F(156, r2.tag));
      }
      function xl(t2, r2) {
        switch (xs(r2), r2.tag) {
          case 1:
            return t2 = r2.flags, t2 & 65536 ? (r2.flags = t2 & -65537 | 128, r2) : null;
          case 3:
            return lo(tn), ya(), t2 = r2.flags, (t2 & 65536) !== 0 && (t2 & 128) === 0 ? (r2.flags = t2 & -65537 | 128, r2) : null;
          case 26:
          case 27:
          case 5:
            return Oe(r2), null;
          case 31:
            if (r2.memoizedState !== null) {
              if (Ln(r2), r2.alternate === null) throw Error(F(340));
              ri();
            }
            return t2 = r2.flags, t2 & 65536 ? (r2.flags = t2 & -65537 | 128, r2) : null;
          case 13:
            if (Ln(r2), t2 = r2.memoizedState, t2 !== null && t2.dehydrated !== null) {
              if (r2.alternate === null) throw Error(F(340));
              ri();
            }
            return t2 = r2.flags, t2 & 65536 ? (r2.flags = t2 & -65537 | 128, r2) : null;
          case 19:
            return Oo(r2), t2 = r2.flags, t2 & 65536 ? (r2.flags = t2 & -65537 | 128, t2 = r2.memoizedState, t2 !== null && (t2.rendering = null, t2.tail = null), r2.flags |= 4, r2) : null;
          case 4:
            return ya(), null;
          case 10:
            return lo(r2.type), null;
          case 22:
          case 23:
            return Ln(r2), xc(), t2 !== null && W(Zr), t2 = r2.flags, t2 & 65536 ? (r2.flags = t2 & -65537 | 128, r2) : null;
          case 24:
            return lo(tn), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function Hc(t2, r2) {
        switch (xs(r2), r2.tag) {
          case 3:
            lo(tn), ya();
            break;
          case 26:
          case 27:
          case 5:
            Oe(r2);
            break;
          case 4:
            ya();
            break;
          case 31:
            r2.memoizedState !== null && Ln(r2);
            break;
          case 13:
            Ln(r2);
            break;
          case 19:
            Oo(r2);
            break;
          case 10:
            lo(r2.type);
            break;
          case 22:
          case 23:
            Ln(r2), xc(), t2 !== null && W(Zr);
            break;
          case 24:
            lo(tn);
        }
      }
      function $o(t2, r2) {
        try {
          var a = r2.updateQueue, l2 = a !== null ? a.lastEffect : null;
          if (l2 !== null) {
            var c = l2.next;
            a = c;
            do {
              if ((a.tag & t2) === t2) {
                l2 = void 0;
                var d = a.create, h2 = a.inst;
                l2 = d(), h2.destroy = l2;
              }
              a = a.next;
            } while (a !== c);
          }
        } catch (y) {
          ke(r2, r2.return, y);
        }
      }
      function So(t2, r2, a) {
        try {
          var l2 = r2.updateQueue, c = l2 !== null ? l2.lastEffect : null;
          if (c !== null) {
            var d = c.next;
            l2 = d;
            do {
              if ((l2.tag & t2) === t2) {
                var h2 = l2.inst, y = h2.destroy;
                if (y !== void 0) {
                  h2.destroy = void 0, c = r2;
                  var C = a, R = y;
                  try {
                    R();
                  } catch (D) {
                    ke(c, C, D);
                  }
                }
              }
              l2 = l2.next;
            } while (l2 !== d);
          }
        } catch (D) {
          ke(r2, r2.return, D);
        }
      }
      function nu(t2) {
        var r2 = t2.updateQueue;
        if (r2 !== null) {
          var a = t2.stateNode;
          try {
            B(r2, a);
          } catch (l2) {
            ke(t2, t2.return, l2);
          }
        }
      }
      function sp(t2, r2, a) {
        a.props = yo(t2.type, t2.memoizedProps), a.state = t2.memoizedState;
        try {
          a.componentWillUnmount();
        } catch (l2) {
          ke(t2, r2, l2);
        }
      }
      function Hr(t2, r2) {
        try {
          var a = t2.ref;
          if (a !== null) {
            switch (t2.tag) {
              case 26:
              case 27:
              case 5:
                var l2 = Pi(t2.stateNode);
                break;
              case 30:
                var c = t2.stateNode, d = mt(t2.memoizedProps, c);
                (c.ref === null || c.ref.name !== d) && (c.ref = Iu(d)), l2 = c.ref;
                break;
              case 7:
                t2.stateNode === null && (t2.stateNode = ng(t2)), l2 = t2.stateNode;
                break;
              default:
                l2 = t2.stateNode;
            }
            typeof a == "function" ? t2.refCleanup = a(l2) : a.current = l2;
          }
        } catch (h2) {
          ke(t2, r2, h2);
        }
      }
      function Fn(t2, r2) {
        var a = t2.ref, l2 = t2.refCleanup;
        if (a !== null) if (typeof l2 == "function") try {
          l2();
        } catch (c) {
          ke(t2, r2, c);
        } finally {
          t2.refCleanup = null, t2 = t2.alternate, t2 != null && (t2.refCleanup = null);
        }
        else if (typeof a == "function") try {
          a(null);
        } catch (c) {
          ke(t2, r2, c);
        }
        else a.current = null;
      }
      function up() {
        var t2 = Yn;
        return Yn = false, t2;
      }
      function Cl(t2, r2) {
        if ((t2.tag === 5 || t2.tag === 27 || t2.tag === 6) && t2.alternate === null && r2 !== null) for (var a = 0; a < r2.length; a++) tg(t2.stateNode, r2[a]);
      }
      function Mc(t2) {
        for (var r2 = t2.return; r2 !== null && (Vc(r2) && tg(t2.stateNode, r2.stateNode), !tu(r2)); ) r2 = r2.return;
      }
      function di(t2) {
        for (var r2 = t2.return; r2 !== null && (Vc(r2) && rg(t2.stateNode, r2.stateNode), !tu(r2)); ) r2 = r2.return;
      }
      function tu(t2) {
        return t2.tag === 5 || t2.tag === 3 || (be ? t2.tag === 27 : false);
      }
      function Vc(t2) {
        return t2 && t2.tag === 7 && t2.stateNode !== null;
      }
      function $c(t2) {
        var r2 = t2.type, a = t2.memoizedProps, l2 = t2.stateNode;
        try {
          Hp(l2, r2, a, t2);
        } catch (c) {
          ke(t2, t2.return, c);
        }
      }
      function Qc(t2, r2, a) {
        try {
          Mp(t2.stateNode, t2.type, a, r2, t2);
        } catch (l2) {
          ke(t2, t2.return, l2);
        }
      }
      function bm(t2) {
        return t2.tag === 5 || t2.tag === 3 || (Nt ? t2.tag === 26 : false) || (be ? t2.tag === 27 && Qr(t2.type) : false) || t2.tag === 4;
      }
      function qc(t2) {
        e: for (; ; ) {
          for (; t2.sibling === null; ) {
            if (t2.return === null || bm(t2.return)) return null;
            t2 = t2.return;
          }
          for (t2.sibling.return = t2.return, t2 = t2.sibling; t2.tag !== 5 && t2.tag !== 6 && t2.tag !== 18; ) {
            if (be && t2.tag === 27 && Qr(t2.type) || t2.flags & 2 || t2.child === null || t2.tag === 4) continue e;
            t2.child.return = t2, t2 = t2.child;
          }
          if (!(t2.flags & 2)) return t2.stateNode;
        }
      }
      function Gc(t2, r2, a, l2) {
        var c = t2.tag;
        if (c === 5 || c === 6) c = t2.stateNode, r2 ? xd(a, c, r2) : Qm(a, c), Cl(t2, l2), Yn = true;
        else if (c !== 4 && (be && c === 27 && (Cl(t2, l2), l2 = null, Qr(t2.type) && (a = t2.stateNode, r2 = null)), t2 = t2.child, t2 !== null)) for (Gc(t2, r2, a, l2), t2 = t2.sibling; t2 !== null; ) Gc(t2, r2, a, l2), t2 = t2.sibling;
      }
      function ru(t2, r2, a, l2) {
        var c = t2.tag;
        if (c === 5 || c === 6) c = t2.stateNode, r2 ? qm(a, c, r2) : $m(a, c), Cl(t2, l2), Yn = true;
        else if (c !== 4 && (be && c === 27 && (Cl(t2, l2), l2 = null, Qr(t2.type) && (a = t2.stateNode)), t2 = t2.child, t2 !== null)) for (ru(t2, r2, a, l2), t2 = t2.sibling; t2 !== null; ) ru(t2, r2, a, l2), t2 = t2.sibling;
      }
      function ou(t2, r2) {
        if (t2.tag === 5 || be && t2.tag === 27) Cl(t2, r2);
        else if (t2.tag !== 4 && (t2 = t2.child, t2 !== null)) for (ou(t2, r2), t2 = t2.sibling; t2 !== null; ) ou(t2, r2), t2 = t2.sibling;
      }
      function cp(t2, r2, a) {
        t2 = t2.containerInfo;
        try {
          qp(t2, a);
        } catch (l2) {
          ke(r2, r2.return, l2);
        }
      }
      function dp(t2) {
        var r2 = t2.stateNode, a = t2.memoizedProps;
        try {
          D0(t2.type, a, r2, t2);
        } catch (l2) {
          ke(t2, t2.return, l2);
        }
      }
      function fi(t2) {
        (t2.tag === 30 || (t2.subtreeFlags & 33554432) !== 0) && ($d = true);
      }
      function au() {
        var t2 = Xr;
        return Xr = null, t2;
      }
      function pi(t2, r2, a, l2, c) {
        return vt = 0, ym(t2.child, r2, a, l2, c);
      }
      function ym(t2, r2, a, l2, c) {
        if (!Ye) return false;
        for (var d = false; t2 !== null; ) {
          if (t2.tag === 5) {
            var h2 = t2.stateNode;
            if (l2 !== null) {
              var y = Tu(h2);
              l2.push(y), Yo(y) && (d = true);
            } else d || Yo(Tu(h2)) && (d = true);
            $d = true, Vp(h2, vt === 0 ? r2 : r2 + "_" + vt, a), vt++;
          } else (t2.tag !== 22 || t2.memoizedState === null) && (t2.tag === 30 && c || ym(t2.child, r2, a, l2, c) && (d = true));
          t2 = t2.sibling;
        }
        return d;
      }
      function Mt(t2, r2) {
        if (Ye) for (; t2 !== null; ) t2.tag === 5 ? P0(t2.stateNode, t2.memoizedProps) : (t2.tag !== 22 || t2.memoizedState === null) && (t2.tag === 30 && r2 || Mt(t2.child, r2)), t2 = t2.sibling;
      }
      function Qo(t2) {
        if ((t2.subtreeFlags & 18874368) !== 0) for (t2 = t2.child; t2 !== null; ) {
          if ((t2.tag !== 22 || t2.memoizedState === null) && (Qo(t2), t2.tag === 30 && (t2.flags & 18874368) !== 0 && t2.stateNode.paired)) {
            var r2 = t2.memoizedProps;
            if (r2.name == null || r2.name === "auto") throw Error(F(544));
            var a = r2.name;
            r2 = At(r2.default, r2.share), r2 !== "none" && (pi(t2, a, r2, null, false) || Mt(t2.child, false));
          }
          t2 = t2.sibling;
        }
      }
      function iu(t2, r2) {
        if (t2.tag === 30) {
          var a = t2.stateNode, l2 = t2.memoizedProps, c = mt(l2, a), d = At(l2.default, a.paired ? l2.share : l2.enter);
          d !== "none" ? pi(t2, c, d, null, false) ? (Qo(t2), a.paired || r2 || yi(t2, l2.onEnter)) : Mt(t2.child, false) : Qo(t2);
        } else if ((t2.subtreeFlags & 33554432) !== 0) for (t2 = t2.child; t2 !== null; ) iu(t2, r2), t2 = t2.sibling;
        else Qo(t2);
      }
      function qo(t2) {
        if (Rt !== null && Rt.size !== 0) {
          var r2 = Rt;
          if ((t2.subtreeFlags & 18874368) !== 0) for (t2 = t2.child; t2 !== null; ) {
            if (t2.tag !== 22 || t2.memoizedState === null) {
              if (t2.tag === 30 && (t2.flags & 18874368) !== 0) {
                var a = t2.memoizedProps, l2 = a.name;
                if (l2 != null && l2 !== "auto") {
                  var c = r2.get(l2);
                  if (c !== void 0) {
                    var d = At(a.default, a.share);
                    if (d !== "none" && (pi(t2, l2, d, null, false) ? (d = t2.stateNode, c.paired = d, d.paired = c, yi(t2, a.onShare)) : Mt(t2.child, false)), r2.delete(l2), r2.size === 0) break;
                  }
                }
              }
              qo(t2);
            }
            t2 = t2.sibling;
          }
        }
      }
      function at(t2) {
        if (t2.tag === 30) {
          var r2 = t2.memoizedProps, a = mt(r2, t2.stateNode), l2 = Rt !== null ? Rt.get(a) : void 0, c = At(r2.default, l2 !== void 0 ? r2.share : r2.exit);
          c !== "none" && (pi(t2, a, c, null, false) ? l2 !== void 0 ? (c = t2.stateNode, l2.paired = c, c.paired = l2, Rt.delete(a), yi(t2, r2.onShare)) : yi(t2, r2.onExit) : Mt(t2.child, false)), Rt !== null && qo(t2);
        } else if ((t2.subtreeFlags & 33554432) !== 0) for (t2 = t2.child; t2 !== null; ) at(t2), t2 = t2.sibling;
        else Rt !== null && qo(t2);
      }
      function lu(t2) {
        for (t2 = t2.child; t2 !== null; ) {
          if (t2.tag === 30) {
            var r2 = t2.memoizedProps, a = mt(r2, t2.stateNode);
            r2 = At(r2.default, r2.update), t2.flags &= -5, r2 !== "none" && pi(t2, a, r2, t2.memoizedState = [], false);
          } else (t2.subtreeFlags & 33554432) !== 0 && lu(t2);
          t2 = t2.sibling;
        }
      }
      function fp(t2) {
        if ((t2.subtreeFlags & 18874368) !== 0) for (t2 = t2.child; t2 !== null; ) {
          if (t2.tag !== 22 || t2.memoizedState === null) {
            if (t2.tag === 30 && (t2.flags & 18874368) !== 0) {
              var r2 = t2.stateNode;
              r2.paired !== null && (r2.paired = null, Mt(t2.child, false));
            }
            fp(t2);
          }
          t2 = t2.sibling;
        }
      }
      function zl(t2) {
        if (t2.tag === 30) t2.stateNode.paired = null, Mt(t2.child, false), fp(t2);
        else if ((t2.subtreeFlags & 33554432) !== 0) for (t2 = t2.child; t2 !== null; ) zl(t2), t2 = t2.sibling;
        else fp(t2);
      }
      function su(t2) {
        for (t2 = t2.child; t2 !== null; ) t2.tag === 30 ? Mt(t2.child, false) : (t2.subtreeFlags & 33554432) !== 0 && su(t2), t2 = t2.sibling;
      }
      function uu(t2, r2, a, l2, c, d, h2) {
        if (!Ye) return false;
        for (var y = false; r2 !== null; ) {
          if (r2.tag === 5) {
            var C = r2.stateNode;
            if (d !== null && vt < d.length) {
              var R = d[vt], D = Tu(C);
              (Yo(R) || Yo(D)) && (y = true), (t2.flags & 4) === 0 && Xm(R, D) && (t2.flags |= 4), Ym(R, D) && (t2.flags |= 32);
            } else t2.flags |= 32;
            (t2.flags & 4) !== 0 && Vp(C, vt === 0 ? a : a + "_" + vt, c), y && (t2.flags & 4) !== 0 || (Xr === null && (Xr = []), Xr.push(C, vt === 0 ? l2 : l2 + "_" + vt, r2.memoizedProps)), vt++;
          } else (r2.tag !== 22 || r2.memoizedState === null) && (r2.tag === 30 && h2 ? t2.flags |= r2.flags & 32 : uu(t2, r2.child, a, l2, c, d, h2) && (y = true));
          r2 = r2.sibling;
        }
        return y;
      }
      function pp(t2, r2) {
        for (t2 = t2.child; t2 !== null; ) {
          if (t2.tag === 30) {
            var a = t2.memoizedProps, l2 = t2.stateNode, c = mt(a, l2), d = At(a.default, a.update);
            var h2;
            h2 = t2.memoizedState, t2.memoizedState = null;
            l2 = t2;
            var y = t2.child;
            vt = 0, c = uu(l2, y, c, c, d, h2, false), (t2.flags & 4) !== 0 && c && yi(t2, a.onUpdate);
          } else (t2.subtreeFlags & 33554432) !== 0 && pp(t2);
          t2 = t2.sibling;
        }
      }
      function hp(t2, r2, a) {
        for (Wp(t2.containerInfo), t2 = (a & 335544064) === a, An = r2, r2 = t2 ? 9270 : 1024; An !== null; ) {
          if (a = An, t2) {
            var l2 = a.deletions;
            if (l2 !== null) for (var c = 0; c < l2.length; c++) t2 && at(l2[c]);
          }
          if (a.alternate === null && (a.flags & 2) !== 0) t2 && fi(a), hi(t2);
          else {
            if (a.tag === 22) {
              if (l2 = a.alternate, a.memoizedState !== null) {
                l2 !== null && l2.memoizedState === null && t2 && at(l2), hi(t2);
                continue;
              } else if (l2 !== null && l2.memoizedState !== null) {
                t2 && fi(a), hi(t2);
                continue;
              }
            }
            l2 = a.child, (a.subtreeFlags & r2) !== 0 && l2 !== null ? (l2.return = a, An = l2) : (t2 && lu(a), hi(t2));
          }
        }
        Rt = null;
      }
      function hi(t2) {
        for (; An !== null; ) {
          var r2 = An, a = t2, l2 = r2.alternate, c = r2.flags;
          switch (r2.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if ((c & 1024) !== 0 && l2 !== null) {
                a = void 0, c = l2.memoizedProps, l2 = l2.memoizedState;
                var d = r2.stateNode;
                try {
                  var h2 = yo(r2.type, c);
                  a = d.getSnapshotBeforeUpdate(h2, l2), d.__reactInternalSnapshotBeforeUpdate = a;
                } catch (y) {
                  ke(r2, r2.return, y);
                }
              }
              break;
            case 3:
              (c & 1024) !== 0 && Ye && Qp(r2.stateNode.containerInfo);
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            case 30:
              a && l2 !== null && (a = mt(l2.memoizedProps, l2.stateNode), c = r2.memoizedProps, c = At(c.default, c.update), c !== "none" && pi(l2, a, c, l2.memoizedState = [], true));
              break;
            default:
              if ((c & 1024) !== 0) throw Error(F(163));
          }
          if (l2 = r2.sibling, l2 !== null) {
            l2.return = r2.return, An = l2;
            break;
          }
          An = r2.return;
        }
      }
      function Jc(t2, r2, a) {
        var l2 = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            ar(t2, a), l2 & 4 && $o(5, a);
            break;
          case 1:
            if (ar(t2, a), l2 & 4) if (t2 = a.stateNode, r2 === null) try {
              t2.componentDidMount();
            } catch (h2) {
              ke(a, a.return, h2);
            }
            else {
              var c = yo(a.type, r2.memoizedProps);
              r2 = r2.memoizedState;
              try {
                t2.componentDidUpdate(c, r2, t2.__reactInternalSnapshotBeforeUpdate);
              } catch (h2) {
                ke(a, a.return, h2);
              }
            }
            l2 & 64 && nu(a), l2 & 512 && Hr(a, a.return);
            break;
          case 3:
            if (ar(t2, a), l2 & 64 && (l2 = a.updateQueue, l2 !== null)) {
              if (t2 = null, a.child !== null) switch (a.child.tag) {
                case 27:
                case 5:
                  t2 = Pi(a.child.stateNode);
                  break;
                case 1:
                  t2 = a.child.stateNode;
              }
              try {
                B(l2, t2);
              } catch (h2) {
                ke(a, a.return, h2);
              }
            }
            break;
          case 27:
            be && r2 === null && l2 & 4 && dp(a);
          case 26:
          case 5:
            if (ar(t2, a), r2 === null) {
              if (l2 & 4) $c(a);
              else if (l2 & 64) {
                t2 = a.type, r2 = a.memoizedProps, c = a.stateNode;
                try {
                  T0(c, t2, r2, a);
                } catch (h2) {
                  ke(a, a.return, h2);
                }
              }
            }
            l2 & 512 && Hr(a, a.return);
            break;
          case 12:
            ar(t2, a);
            break;
          case 31:
            ar(t2, a), l2 & 4 && Kc(t2, a);
            break;
          case 13:
            ar(t2, a), l2 & 4 && mp(t2, a), l2 & 64 && (l2 = a.memoizedState, l2 !== null && (l2 = l2.dehydrated, l2 !== null && (a = xm.bind(null, a), z0(l2, a))));
            break;
          case 22:
            if (l2 = a.memoizedState !== null || xn, !l2) {
              var d = r2 !== null && r2.memoizedState !== null || Ce;
              r2 = xn, c = Ce, xn = l2, (Ce = d) && !c ? (l2 = be ? 2 : 0, (a.subtreeFlags & 8772) !== 0 && (l2 |= 1), Mr(t2, a, l2)) : ar(t2, a), xn = r2, Ce = c;
            }
            break;
          case 30:
            ar(t2, a), l2 & 512 && Hr(a, a.return);
            break;
          case 7:
            l2 & 512 && Hr(a, a.return);
          default:
            ar(t2, a);
        }
      }
      function El(t2, r2) {
        if (Ye) for (t2 = t2.child; t2 !== null; ) Zc(t2, r2), t2 = t2.sibling;
      }
      function Zc(t2, r2) {
        if (Ye) switch (t2.tag) {
          case 5:
          case 26:
            try {
              var a = t2.stateNode;
              r2 ? Jm(a) : nn(t2.stateNode, t2.memoizedProps);
            } catch (d) {
              ke(t2, t2.return, d);
            }
            _l(t2, r2);
            break;
          case 6:
            try {
              var l2 = t2.stateNode;
              r2 ? Al(l2) : Zm(l2, t2.memoizedProps), Yn = true;
            } catch (d) {
              ke(t2, t2.return, d);
            }
            break;
          case 18:
            try {
              var c = t2.stateNode;
              r2 ? Ko(c) : bg(t2.stateNode);
            } catch (d) {
              ke(t2, t2.return, d);
            }
            break;
          case 22:
          case 23:
            t2.memoizedState === null && El(t2, r2);
            break;
          default:
            El(t2, r2);
        }
      }
      function _l(t2, r2) {
        if (Ye && t2.subtreeFlags & 67108864) for (t2 = t2.child; t2 !== null; ) {
          var a = t2, l2 = r2;
          if (Ye) switch (a.tag) {
            case 4:
              Zc(a, l2);
              break;
            case 22:
              a.memoizedState === null && _l(a, l2);
              break;
            default:
              _l(a, l2);
          }
          t2 = t2.sibling;
        }
      }
      function Xc(t2) {
        var r2 = t2.alternate;
        r2 !== null && (t2.alternate = null, Xc(r2)), t2.child = null, t2.deletions = null, t2.sibling = null, t2.tag === 5 && (r2 = t2.stateNode, r2 !== null && it(r2)), t2.stateNode = null, t2.return = null, t2.dependencies = null, t2.memoizedProps = null, t2.memoizedState = null, t2.pendingProps = null, t2.stateNode = null, t2.updateQueue = null;
      }
      function xt(t2, r2, a) {
        for (a = a.child; a !== null; ) Yc(t2, r2, a), a = a.sibling;
      }
      function Yc(t2, r2, a) {
        if (It && typeof It.onCommitFiberUnmount == "function") try {
          It.onCommitFiberUnmount(Lu, a);
        } catch {
        }
        switch (a.tag) {
          case 26:
            if (Nt) {
              Ce || Fn(a, r2), xt(t2, r2, a), a.memoizedState ? oh(a.memoizedState) : a.stateNode && (Ce || Ld(a.stateNode));
              break;
            }
          case 27:
            if (be) {
              Ce || Fn(a, r2), di(a);
              var l2 = Cn, c = Lt;
              Qr(a.type) && (Cn = a.stateNode, Lt = false), xt(t2, r2, a), xo(a.stateNode, a.type, a.memoizedProps), Cn = l2, Lt = c;
              break;
            }
          case 5:
            Ce || Fn(a, r2), di(a);
          case 6:
            if (a.tag === 6 && di(a), Ye) {
              if (l2 = Cn, c = Lt, Cn = null, xt(t2, r2, a), Cn = l2, Lt = c, Cn !== null) if (Lt) try {
                Gm(Cn, a.stateNode), Yn = true;
              } catch (d) {
                ke(a, r2, d);
              }
              else try {
                w0(Cn, a.stateNode), Yn = true;
              } catch (d) {
                ke(a, r2, d);
              }
            } else xt(t2, r2, a);
            break;
          case 18:
            Ye && Cn !== null && (Lt ? nh(Cn, a.stateNode) : R0(Cn, a.stateNode));
            break;
          case 4:
            Ye ? (l2 = Cn, c = Lt, Cn = a.stateNode.containerInfo, Lt = true, xt(t2, r2, a), Cn = l2, Lt = c) : (ln && cp(a.stateNode, a, ag()), xt(t2, r2, a));
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            So(2, a, r2), Ce || So(4, a, r2), xt(t2, r2, a);
            break;
          case 1:
            Ce || (Fn(a, r2), l2 = a.stateNode, typeof l2.componentWillUnmount == "function" && sp(a, r2, l2)), xt(t2, r2, a);
            break;
          case 21:
            xt(t2, r2, a);
            break;
          case 22:
            Ce = (l2 = Ce) || a.memoizedState !== null, xt(t2, r2, a), Ce = l2;
            break;
          case 30:
            Fn(a, r2), xt(t2, r2, a);
            break;
          case 7:
            Ce || Fn(a, r2), xt(t2, r2, a);
            break;
          default:
            xt(t2, r2, a);
        }
      }
      function Kc(t2, r2) {
        if (En && r2.memoizedState === null && (t2 = r2.alternate, t2 !== null && (t2 = t2.memoizedState, t2 !== null))) {
          t2 = t2.dehydrated;
          try {
            Bl(t2);
          } catch (a) {
            ke(r2, r2.return, a);
          }
        }
      }
      function mp(t2, r2) {
        if (En && r2.memoizedState === null && (t2 = r2.alternate, t2 !== null && (t2 = t2.memoizedState, t2 !== null && (t2 = t2.dehydrated, t2 !== null)))) try {
          hg(t2);
        } catch (a) {
          ke(r2, r2.return, a);
        }
      }
      function ed(t2) {
        switch (t2.tag) {
          case 31:
          case 13:
          case 19:
            var r2 = t2.stateNode;
            return r2 === null && (r2 = t2.stateNode = new Ng()), r2;
          case 22:
            return t2 = t2.stateNode, r2 = t2._retryCache, r2 === null && (r2 = t2._retryCache = new Ng()), r2;
          default:
            throw Error(F(435, t2.tag));
        }
      }
      function cu(t2, r2) {
        var a = ed(t2);
        r2.forEach(function(l2) {
          if (!a.has(l2)) {
            a.add(l2);
            var c = pd.bind(null, t2, l2);
            l2.then(c, c);
          }
        });
      }
      function Dn(t2, r2, a) {
        var l2 = r2.deletions;
        if (l2 !== null) for (var c = 0; c < l2.length; c++) {
          var d = l2[c], h2 = t2, y = r2;
          if (Ye) {
            var C = y;
            e: for (; C !== null; ) {
              switch (C.tag) {
                case 27:
                  if (be) {
                    if (Qr(C.type)) {
                      Cn = C.stateNode, Lt = false;
                      break e;
                    }
                    break;
                  }
                case 5:
                  Cn = C.stateNode, Lt = false;
                  break e;
                case 3:
                case 4:
                  Cn = C.stateNode.containerInfo, Lt = true;
                  break e;
              }
              C = C.return;
            }
            if (Cn === null) throw Error(F(160));
            Yc(h2, y, d), Cn = null, Lt = false;
          } else Yc(h2, y, d);
          h2 = d.alternate, h2 !== null && (h2.return = null), d.return = null;
        }
        if (r2.subtreeFlags & 13886) for (r2 = r2.child; r2 !== null; ) nd(r2, t2, a), r2 = r2.sibling;
      }
      function nd(t2, r2, a) {
        var l2 = t2.alternate, c = t2.flags;
        switch (t2.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            if (c & 4 && (l2 = t2.updateQueue, l2 = l2 !== null ? l2.events : null, l2 !== null)) for (var d = 0; d < l2.length; d++) {
              var h2 = l2[d];
              h2.ref.impl = h2.nextImpl;
            }
            Dn(r2, t2, a), Vn(t2), c & 4 && (So(3, t2, t2.return), $o(3, t2), So(5, t2, t2.return));
            break;
          case 1:
            Dn(r2, t2, a), Vn(t2), c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), c & 64 && xn && (t2 = t2.updateQueue, t2 !== null && (r2 = t2.callbacks, r2 !== null && (c = t2.shared.hiddenCallbacks, t2.shared.hiddenCallbacks = c === null ? r2 : c.concat(r2))));
            break;
          case 26:
            if (Nt) {
              d = Yr, Dn(r2, t2, a), Vn(t2), c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), c & 4 && (a = l2 !== null ? l2.memoizedState : null, c = t2.memoizedState, l2 === null ? c === null ? t2.stateNode === null ? t2.stateNode = xn ? ah(t2.type, t2.memoizedProps, r2.containerInfo, t2) : vg(d, t2.type, t2.memoizedProps, t2) : xn || Rd(d, t2.type, t2.stateNode) : t2.stateNode = rh(d, c, t2.memoizedProps) : a !== c ? (a === null ? (r2 = l2.stateNode, r2 === null || Ce || Ld(r2)) : oh(a), c === null ? xn || Rd(d, t2.type, t2.stateNode) : rh(d, c, t2.memoizedProps)) : c === null && t2.stateNode !== null && Qc(t2, t2.memoizedProps, l2.memoizedProps));
              break;
            }
          case 27:
            if (be) {
              Dn(r2, t2, a), Vn(t2), c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), l2 !== null && c & 4 && Qc(t2, t2.memoizedProps, l2.memoizedProps);
              break;
            }
          case 5:
            if (d = Co, Co = false, Dn(r2, t2, a), Co = d, Vn(t2), c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), Ye) {
              if (t2.flags & 32) {
                r2 = t2.stateNode;
                try {
                  _t(r2), Yn = true;
                } catch (D) {
                  ke(t2, t2.return, D);
                }
              }
              c & 4 && t2.stateNode != null && (r2 = t2.memoizedProps, Qc(t2, r2, l2 !== null ? l2.memoizedProps : r2)), c & 1024 && (Sh = true);
            } else ln && t2.alternate !== null && (t2.alternate.stateNode = t2.stateNode);
            break;
          case 6:
            if (Dn(r2, t2, a), Vn(t2), c & 4 && Ye) {
              if (t2.stateNode === null) throw Error(F(162));
              r2 = t2.memoizedProps, c = l2 !== null ? l2.memoizedProps : r2, a = t2.stateNode;
              try {
                Bp(a, c, r2), Yn = true;
              } catch (D) {
                ke(t2, t2.return, D);
              }
            }
            break;
          case 3:
            if (Yn = false, Nt ? (ih(), d = Yr, Yr = Hl(r2.containerInfo), Dn(r2, t2, a), Yr = d) : Dn(r2, t2, a), Vn(t2), c & 4) {
              if (Ye && En && l2 !== null && l2.memoizedState.isDehydrated) try {
                I0(r2.containerInfo);
              } catch (D) {
                ke(t2, t2.return, D);
              }
              if (ln) {
                c = r2.containerInfo, r2 = r2.pendingChildren;
                try {
                  qp(c, r2), Yn = true;
                } catch (D) {
                  ke(t2, t2.return, D);
                }
              }
            }
            Sh && (Sh = false, gp(t2)), Yn = false;
            break;
          case 4:
            l2 = Co, Co = xn, d = up(), Nt ? (h2 = Yr, Yr = Hl(t2.stateNode.containerInfo), Dn(r2, t2, a), Vn(t2), Yr = h2) : (Dn(r2, t2, a), Vn(t2)), Yn && Hu && (Qd = true), Yn = d, Co = l2, c & 4 && ln && cp(t2.stateNode, t2, t2.stateNode.pendingChildren);
            break;
          case 12:
            Dn(r2, t2, a), Vn(t2);
            break;
          case 31:
            Dn(r2, t2, a), Vn(t2), c & 4 && (r2 = t2.updateQueue, r2 !== null && (t2.updateQueue = null, cu(t2, r2)));
            break;
          case 13:
            Dn(r2, t2, a), Vn(t2), t2.child.flags & 8192 && t2.memoizedState !== null != (l2 !== null && l2.memoizedState !== null) && (ji = Tt()), c & 4 && (r2 = t2.updateQueue, r2 !== null && (t2.updateQueue = null, cu(t2, r2)));
            break;
          case 22:
            d = t2.memoizedState !== null, h2 = l2 !== null && l2.memoizedState !== null;
            var y = xn, C = Ce, R = Co;
            xn = y || d, Co = R || d, Ce = C || h2, Dn(r2, t2, a), Ce = C, Co = R, xn = y, Vn(t2), c & 8192 && (r2 = t2.stateNode, r2._visibility = d ? r2._visibility & -2 : r2._visibility | 1, !d || l2 === null || h2 || xn || Ce || (r2 = be ? 2 : 0, a = h2 || Ce, l2 = xn, h2 = Ce, xn = d || xn, Ce = a, xa(t2, r2), xn = l2, Ce = h2), Ye && (d || !Co) && El(t2, d)), c & 4 && (r2 = t2.updateQueue, r2 !== null && (c = r2.retryQueue, c !== null && (r2.retryQueue = null, cu(t2, c))));
            break;
          case 19:
            Dn(r2, t2, a), Vn(t2), c & 4 && (r2 = t2.updateQueue, r2 !== null && (t2.updateQueue = null, cu(t2, r2)));
            break;
          case 30:
            c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), c = up(), d = Hu, h2 = (a & 335544064) === a, y = t2.memoizedProps, Hu = h2 && At(y.default, y.update) !== "none", Dn(r2, t2, a), Vn(t2), h2 && l2 !== null && Yn && (t2.flags |= 4), Hu = d, Yn = c;
            break;
          case 21:
            break;
          case 7:
            c & 512 && (Ce || l2 === null || Fn(l2, l2.return)), l2 && l2.stateNode !== null && x0(t2, l2.stateNode);
          default:
            Dn(r2, t2, a), Vn(t2);
        }
      }
      function Vn(t2) {
        var r2 = t2.flags;
        if (r2 & 2) {
          try {
            for (var a, l2 = t2.return; l2 !== null; ) {
              if (bm(l2)) {
                a = l2;
                break;
              }
              l2 = l2.return;
            }
            l2 = null;
            for (var c = t2.return; c !== null; ) {
              if (Vc(c)) {
                var d = c.stateNode;
                l2 === null ? l2 = [d] : l2.push(d);
              }
              if (tu(c)) break;
              c = c.return;
            }
            var h2 = l2;
            if (Ye) {
              if (a == null) throw Error(F(160));
              switch (a.tag) {
                case 27:
                  if (be) {
                    var y = a.stateNode, C = qc(t2);
                    ru(t2, C, y, h2);
                    break;
                  }
                case 5:
                  var R = a.stateNode;
                  a.flags & 32 && (_t(R), a.flags &= -33);
                  var D = qc(t2);
                  ru(t2, D, R, h2);
                  break;
                case 3:
                case 4:
                  var U = a.stateNode.containerInfo, A = qc(t2);
                  Gc(t2, A, U, h2);
                  break;
                default:
                  throw Error(F(161));
              }
            } else ou(t2, h2);
          } catch (fe) {
            ke(t2, t2.return, fe);
          }
          t2.flags &= -3;
        }
        r2 & 4096 && (t2.flags &= -4097);
      }
      function gp(t2) {
        if (t2.subtreeFlags & 1024) for (t2 = t2.child; t2 !== null; ) {
          var r2 = t2;
          gp(r2), r2.tag === 5 && r2.flags & 1024 && dr(r2.stateNode), t2 = t2.sibling;
        }
      }
      function or(t2, r2) {
        if (r2.subtreeFlags & 9270) for (r2 = r2.child; r2 !== null; ) td(r2, t2), r2 = r2.sibling;
        else pp(r2);
      }
      function td(t2, r2) {
        var a = t2.alternate;
        if (a === null) iu(t2, false);
        else switch (t2.tag) {
          case 3:
            if (kh = gr = false, au(), or(r2, t2), !gr && !Qd) {
              if (t2 = Xr, t2 !== null) for (var l2 = 0; l2 < t2.length; l2 += 3) ja(t2[l2], t2[l2 + 1], t2[l2 + 2]);
              Cd(r2.containerInfo), kh = true;
            }
            Xr = null;
            break;
          case 5:
            or(r2, t2);
            break;
          case 4:
            l2 = gr, gr = false, or(r2, t2), gr && (Qd = true), gr = l2;
            break;
          case 22:
            t2.memoizedState === null && (a.memoizedState !== null ? iu(t2, false) : or(r2, t2));
            break;
          case 30:
            l2 = gr;
            var c = au();
            gr = false, or(r2, t2), gr && (t2.flags |= 4);
            var d = t2.memoizedProps, h2 = t2.stateNode;
            r2 = mt(d, h2), h2 = mt(a.memoizedProps, h2);
            var y = At(d.default, d.update);
            y === "none" ? a = false : (d = a.memoizedState, a.memoizedState = null, a = t2.child, vt = 0, a = uu(t2, a, r2, h2, y, d, true), vt !== (d === null ? 0 : d.length) && (t2.flags |= 32)), (t2.flags & 4) !== 0 && a ? (yi(t2, t2.memoizedProps.onUpdate), Xr = c) : c !== null && (c.push.apply(c, Xr), Xr = c), gr = (t2.flags & 32) !== 0 ? true : l2;
            break;
          default:
            or(r2, t2);
        }
      }
      function ar(t2, r2) {
        if (r2.subtreeFlags & 8772) for (r2 = r2.child; r2 !== null; ) Jc(t2, r2.alternate, r2), r2 = r2.sibling;
      }
      function xa(t2, r2) {
        for (t2 = t2.child; t2 !== null; ) {
          var a = t2, l2 = r2;
          switch (a.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              So(4, a, a.return), xa(a, l2);
              break;
            case 1:
              Fn(a, a.return);
              var c = a.stateNode;
              typeof c.componentWillUnmount == "function" && sp(a, a.return, c), xa(a, l2);
              break;
            case 27:
              be && (l2 & 2) !== 0 && xo(a.stateNode, a.type, a.memoizedProps);
            case 5:
              Fn(a, a.return), a.tag !== 5 && a.tag !== 27 || di(a), xa(a, l2);
              break;
            case 6:
              di(a);
              break;
            case 26:
              Fn(a, a.return), Nt && (c = a.stateNode, a.memoizedState !== null || c === null || Ce || Ld(c)), xa(a, l2);
              break;
            case 22:
              a.memoizedState === null && xa(a, l2);
              break;
            case 30:
              Fn(a, a.return), xa(a, l2);
              break;
            case 7:
              Fn(a, a.return);
            default:
              xa(a, l2);
          }
          t2 = t2.sibling;
        }
      }
      function Mr(t2, r2, a) {
        for (a = (r2.subtreeFlags & 8772) !== 0 ? a : a & -2, r2 = r2.child; r2 !== null; ) {
          var l2 = r2.alternate, c = t2, d = r2, h2 = d.flags, y = (a & 1) !== 0;
          switch (d.tag) {
            case 0:
            case 11:
            case 15:
              Mr(c, d, a), $o(4, d);
              break;
            case 1:
              if (Mr(c, d, a), l2 = d, c = l2.stateNode, typeof c.componentDidMount == "function") try {
                c.componentDidMount();
              } catch (D) {
                ke(l2, l2.return, D);
              }
              if (l2 = d, c = l2.updateQueue, c !== null) {
                var C = l2.stateNode;
                try {
                  var R = c.shared.hiddenCallbacks;
                  if (R !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < R.length; c++) fm(R[c], C);
                } catch (D) {
                  ke(l2, l2.return, D);
                }
              }
              y && h2 & 64 && nu(d), Hr(d, d.return);
              break;
            case 27:
              be && (a & 2) !== 0 && dp(d);
            case 5:
              d.tag !== 5 && d.tag !== 27 || Mc(d), Mr(c, d, a), y && l2 === null && h2 & 4 && $c(d), Hr(d, d.return);
              break;
            case 6:
              Mc(d);
              break;
            case 26:
              Nt && (C = d.stateNode, d.memoizedState !== null || C === null || xn || Rd(Hl(C.ownerDocument), d.type, C)), Mr(c, d, a), y && l2 === null && h2 & 4 && $c(d), Hr(d, d.return);
              break;
            case 12:
              Mr(c, d, a);
              break;
            case 31:
              Mr(c, d, a), y && h2 & 4 && Kc(c, d);
              break;
            case 13:
              Mr(c, d, a), y && h2 & 4 && mp(c, d);
              break;
            case 22:
              d.memoizedState === null && Mr(c, d, a), Hr(d, d.return);
              break;
            case 30:
              Mr(c, d, a), Hr(d, d.return);
              break;
            case 7:
              Hr(d, d.return);
            default:
              Mr(c, d, a);
          }
          r2 = r2.sibling;
        }
      }
      function rd(t2, r2) {
        var a = null;
        t2 !== null && t2.memoizedState !== null && t2.memoizedState.cachePool !== null && (a = t2.memoizedState.cachePool.pool), t2 = null, r2.memoizedState !== null && r2.memoizedState.cachePool !== null && (t2 = r2.memoizedState.cachePool.pool), t2 !== a && (t2 != null && t2.refCount++, a != null && Ns(a));
      }
      function mi(t2, r2) {
        t2 = null, r2.alternate !== null && (t2 = r2.alternate.memoizedState.cache), r2 = r2.memoizedState.cache, r2 !== t2 && (r2.refCount++, t2 != null && Ns(t2));
      }
      function Ct(t2, r2, a, l2) {
        var c = (a & 335544064) === a;
        if (r2.subtreeFlags & (c ? 10262 : 10256)) for (r2 = r2.child; r2 !== null; ) du(t2, r2, a, l2), r2 = r2.sibling;
        else c && su(r2);
      }
      function du(t2, r2, a, l2) {
        var c = (a & 335544064) === a;
        c && r2.alternate === null && r2.return !== null && r2.return.alternate !== null && zl(r2);
        var d = r2.flags;
        switch (r2.tag) {
          case 0:
          case 11:
          case 15:
            Ct(t2, r2, a, l2), d & 2048 && $o(9, r2);
            break;
          case 1:
            Ct(t2, r2, a, l2);
            break;
          case 3:
            Ct(t2, r2, a, l2), c && Ye && kh && $p(t2.containerInfo), d & 2048 && (t2 = null, r2.alternate !== null && (t2 = r2.alternate.memoizedState.cache), r2 = r2.memoizedState.cache, r2 !== t2 && (r2.refCount++, t2 != null && Ns(t2)));
            break;
          case 12:
            if (d & 2048) {
              Ct(t2, r2, a, l2), t2 = r2.stateNode;
              try {
                var h2 = r2.memoizedProps, y = h2.id, C = h2.onPostCommit;
                typeof C == "function" && C(y, r2.alternate === null ? "mount" : "update", t2.passiveEffectDuration, -0);
              } catch (R) {
                ke(r2, r2.return, R);
              }
            } else Ct(t2, r2, a, l2);
            break;
          case 31:
            Ct(t2, r2, a, l2);
            break;
          case 13:
            Ct(t2, r2, a, l2);
            break;
          case 23:
            break;
          case 22:
            h2 = r2.stateNode, y = r2.alternate, r2.memoizedState !== null ? (c && y !== null && y.memoizedState === null && zl(y), h2._visibility & 2 ? Ct(t2, r2, a, l2) : Nl(t2, r2)) : (c && y !== null && y.memoizedState !== null && zl(r2), h2._visibility & 2 ? Ct(t2, r2, a, l2) : (h2._visibility |= 2, gi(t2, r2, a, l2, (r2.subtreeFlags & 10256) !== 0 || false))), d & 2048 && rd(y, r2);
            break;
          case 24:
            Ct(t2, r2, a, l2), d & 2048 && mi(r2.alternate, r2);
            break;
          case 30:
            c && (c = r2.alternate, c !== null && (Mt(c.child, true), Mt(r2.child, true))), Ct(t2, r2, a, l2);
            break;
          default:
            Ct(t2, r2, a, l2);
        }
      }
      function gi(t2, r2, a, l2, c) {
        for (c = c && ((r2.subtreeFlags & 10256) !== 0 || false), r2 = r2.child; r2 !== null; ) {
          var d = t2, h2 = r2, y = a, C = l2, R = h2.flags;
          switch (h2.tag) {
            case 0:
            case 11:
            case 15:
              gi(d, h2, y, C, c), $o(8, h2);
              break;
            case 23:
              break;
            case 22:
              var D = h2.stateNode;
              h2.memoizedState !== null ? D._visibility & 2 ? gi(d, h2, y, C, c) : Nl(d, h2) : (D._visibility |= 2, gi(d, h2, y, C, c)), c && R & 2048 && rd(h2.alternate, h2);
              break;
            case 24:
              gi(d, h2, y, C, c), c && R & 2048 && mi(h2.alternate, h2);
              break;
            default:
              gi(d, h2, y, C, c);
          }
          r2 = r2.sibling;
        }
      }
      function Nl(t2, r2) {
        if (r2.subtreeFlags & 10256) for (r2 = r2.child; r2 !== null; ) {
          var a = t2, l2 = r2, c = l2.flags;
          switch (l2.tag) {
            case 22:
              Nl(a, l2), c & 2048 && rd(l2.alternate, l2);
              break;
            case 24:
              Nl(a, l2), c & 2048 && mi(l2.alternate, l2);
              break;
            default:
              Nl(a, l2);
          }
          r2 = r2.sibling;
        }
      }
      function ko(t2, r2, a) {
        if (t2.subtreeFlags & Di) for (t2 = t2.child; t2 !== null; ) od(t2, r2, a), t2 = t2.sibling;
      }
      function od(t2, r2, a) {
        switch (t2.tag) {
          case 26:
            if (ko(t2, r2, a), t2.flags & Di) if (t2.memoizedState !== null) F0(a, Yr, t2.memoizedState, t2.memoizedProps);
            else {
              var l2 = t2.stateNode, c = t2.type;
              t2 = t2.memoizedProps, ((r2 & 335544128) === r2 || wd(c, t2)) && Xo(a, l2, c, t2);
            }
            break;
          case 5:
            ko(t2, r2, a), t2.flags & Di && (l2 = t2.stateNode, c = t2.type, t2 = t2.memoizedProps, ((r2 & 335544128) === r2 || wd(c, t2)) && Xo(a, l2, c, t2));
            break;
          case 3:
          case 4:
            Nt ? (l2 = Yr, Yr = Hl(t2.stateNode.containerInfo), ko(t2, r2, a), Yr = l2) : ko(t2, r2, a);
            break;
          case 22:
            t2.memoizedState === null && (l2 = t2.alternate, l2 !== null && l2.memoizedState !== null ? (l2 = Di, Di = 16777216, ko(t2, r2, a), Di = l2) : ko(t2, r2, a));
            break;
          case 30:
            (t2.flags & Di) !== 0 && (l2 = t2.memoizedProps.name, l2 != null && l2 !== "auto" && (c = t2.stateNode, c.paired = null, Rt === null && (Rt = /* @__PURE__ */ new Map()), Rt.set(l2, c))), ko(t2, r2, a);
            break;
          default:
            ko(t2, r2, a);
        }
      }
      function bp(t2) {
        var r2 = t2.alternate;
        if (r2 !== null && (t2 = r2.child, t2 !== null)) {
          r2.child = null;
          do
            r2 = t2.sibling, t2.sibling = null, t2 = r2;
          while (t2 !== null);
        }
      }
      function Tl(t2) {
        var r2 = t2.deletions;
        if ((t2.flags & 16) !== 0) {
          if (r2 !== null) for (var a = 0; a < r2.length; a++) {
            var l2 = r2[a];
            An = l2, yp(l2, t2);
          }
          bp(t2);
        }
        if (t2.subtreeFlags & 10256) for (t2 = t2.child; t2 !== null; ) Ca(t2), t2 = t2.sibling;
      }
      function Ca(t2) {
        switch (t2.tag) {
          case 0:
          case 11:
          case 15:
            Tl(t2), t2.flags & 2048 && So(9, t2, t2.return);
            break;
          case 3:
            Tl(t2);
            break;
          case 12:
            Tl(t2);
            break;
          case 22:
            var r2 = t2.stateNode;
            t2.memoizedState !== null && r2._visibility & 2 && (t2.return === null || t2.return.tag !== 13) ? (r2._visibility &= -3, bi(t2)) : Tl(t2);
            break;
          default:
            Tl(t2);
        }
      }
      function bi(t2) {
        var r2 = t2.deletions;
        if ((t2.flags & 16) !== 0) {
          if (r2 !== null) for (var a = 0; a < r2.length; a++) {
            var l2 = r2[a];
            An = l2, yp(l2, t2);
          }
          bp(t2);
        }
        for (t2 = t2.child; t2 !== null; ) {
          switch (r2 = t2, r2.tag) {
            case 0:
            case 11:
            case 15:
              So(8, r2, r2.return), bi(r2);
              break;
            case 22:
              a = r2.stateNode, a._visibility & 2 && (a._visibility &= -3, bi(r2));
              break;
            default:
              bi(r2);
          }
          t2 = t2.sibling;
        }
      }
      function yp(t2, r2) {
        for (; An !== null; ) {
          var a = An;
          switch (a.tag) {
            case 0:
            case 11:
            case 15:
              So(8, a, r2);
              break;
            case 23:
            case 22:
              if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
                var l2 = a.memoizedState.cachePool.pool;
                l2 != null && l2.refCount++;
              }
              break;
            case 24:
              Ns(a.memoizedState.cache);
          }
          if (l2 = a.child, l2 !== null) l2.return = a, An = l2;
          else e: for (a = t2; An !== null; ) {
            l2 = An;
            var c = l2.sibling, d = l2.return;
            if (Xc(l2), l2 === a) {
              An = null;
              break e;
            }
            if (c !== null) {
              c.return = d, An = c;
              break e;
            }
            An = d;
          }
        }
      }
      function fu(t2) {
        var r2 = jm(t2);
        if (r2 != null) {
          if (typeof r2.memoizedProps["data-testname"] != "string") throw Error(F(364));
          return r2;
        }
        if (t2 = _u(t2), t2 === null) throw Error(F(362));
        return t2.stateNode.current;
      }
      function pu(t2, r2) {
        var a = t2.tag;
        switch (r2.$$typeof) {
          case qd:
            if (t2.type === r2.value) return true;
            break;
          case Gd:
            e: {
              for (r2 = r2.value, t2 = [t2, 0], a = 0; a < t2.length; ) {
                var l2 = t2[a++], c = l2.tag, d = t2[a++], h2 = r2[d];
                if (c !== 5 && c !== 26 && c !== 27 || !Wl(l2)) {
                  for (; h2 != null && pu(l2, h2); ) d++, h2 = r2[d];
                  if (d === r2.length) {
                    r2 = true;
                    break e;
                  } else for (l2 = l2.child; l2 !== null; ) t2.push(l2, d), l2 = l2.sibling;
                }
              }
              r2 = false;
            }
            return r2;
          case Jd:
            if ((a === 5 || a === 26 || a === 27) && Nu(t2.stateNode, r2.value)) return true;
            break;
          case Xd:
            if ((a === 5 || a === 6 || a === 26 || a === 27) && (t2 = Mm(t2), t2 !== null && 0 <= t2.indexOf(r2.value))) return true;
            break;
          case Zd:
            if ((a === 5 || a === 26 || a === 27) && (t2 = t2.memoizedProps["data-testname"], typeof t2 == "string" && t2.toLowerCase() === r2.value.toLowerCase())) return true;
            break;
          default:
            throw Error(F(365));
        }
        return false;
      }
      function hu(t2) {
        switch (t2.$$typeof) {
          case qd:
            return "<" + (gc(t2.value) || "Unknown") + ">";
          case Gd:
            return ":has(" + (hu(t2) || "") + ")";
          case Jd:
            return '[role="' + t2.value + '"]';
          case Xd:
            return '"' + t2.value + '"';
          case Zd:
            return '[data-testname="' + t2.value + '"]';
          default:
            throw Error(F(365));
        }
      }
      function vm(t2, r2) {
        var a = [];
        t2 = [t2, 0];
        for (var l2 = 0; l2 < t2.length; ) {
          var c = t2[l2++], d = c.tag, h2 = t2[l2++], y = r2[h2];
          if (d !== 5 && d !== 26 && d !== 27 || !Wl(c)) {
            for (; y != null && pu(c, y); ) h2++, y = r2[h2];
            if (h2 === r2.length) a.push(c);
            else for (c = c.child; c !== null; ) t2.push(c, h2), c = c.sibling;
          }
        }
        return a;
      }
      function bn(t2, r2) {
        if (!Ul) throw Error(F(363));
        t2 = fu(t2), t2 = vm(t2, r2), r2 = [], t2 = Array.from(t2);
        for (var a = 0; a < t2.length; ) {
          var l2 = t2[a++], c = l2.tag;
          if (c === 5 || c === 26 || c === 27) Wl(l2) || r2.push(l2.stateNode);
          else for (l2 = l2.child; l2 !== null; ) t2.push(l2), l2 = l2.sibling;
        }
        return r2;
      }
      function zt() {
        return (de & 2) !== 0 && ye !== 0 ? ye & -ye : Q.T !== null ? Sc() : Qn();
      }
      function vp() {
        if (Ft === 0) if ((ye & 536870912) === 0 || ne) {
          var t2 = Ei;
          Ei <<= 1, (Ei & 3932160) === 0 && (Ei = 262144), Ft = t2;
        } else Ft = 536870912;
        return t2 = Zn.current, t2 !== null && (t2.flags |= 32), Ft;
      }
      function yi(t2, r2) {
        if (r2 != null) {
          var a = t2.stateNode, l2 = a.ref;
          l2 === null && (l2 = a.ref = Iu(mt(t2.memoizedProps, a))), Ui === null && (Ui = []), Ui.push(r2.bind(null, l2));
        }
      }
      function yt(t2, r2, a) {
        (t2 === Be && (Ie === 2 || Ie === 9) || t2.cancelPendingCommit !== null) && (Ea(t2, 0), Go(t2, ye, Ft, false)), Ki(t2, a), ((de & 2) === 0 || t2 !== Be) && (t2 === Be && ((de & 2) === 0 && (Ma |= a), cn === 4 && Go(t2, ye, Ft, false)), xr(t2));
      }
      function Il(t2, r2, a) {
        if ((de & 6) !== 0) throw Error(F(327));
        var l2 = !a && (r2 & 127) === 0 && (r2 & t2.expiredLanes) === 0 || Yi(t2, r2), c = l2 ? xp(t2, r2) : mu(t2, r2, true), d = l2;
        do {
          if (c === 0) {
            Kl && !l2 && Go(t2, r2, 0, false);
            break;
          } else {
            if (a = t2.current.alternate, d && !ad(a)) {
              c = mu(t2, r2, false), d = false;
              continue;
            }
            if (c === 2) {
              if (d = r2, t2.errorRecoveryDisabledLanes & d) var h2 = 0;
              else h2 = t2.pendingLanes & -536870913, h2 = h2 !== 0 ? h2 : h2 & 536870912 ? 536870912 : 0;
              if (h2 !== 0) {
                r2 = h2;
                e: {
                  var y = t2;
                  c = Vu;
                  var C = En && y.current.memoizedState.isDehydrated;
                  if (C && (Ea(y, h2).flags |= 256), h2 = mu(y, h2, false), h2 !== 2 && h2 !== 6) {
                    if (wh && !C) {
                      y.errorRecoveryDisabledLanes |= d, Ma |= d, c = 4;
                      break e;
                    }
                    d = Ze, Ze = c, d !== null && (Ze === null ? Ze = d : Ze.push.apply(Ze, d));
                  }
                  c = h2;
                }
                if (d = false, c !== 2) continue;
              }
            }
            if (c === 1) {
              Ea(t2, 0), Go(t2, r2, 0, true);
              break;
            }
            e: {
              switch (l2 = t2, d = c, d) {
                case 0:
                case 1:
                  throw Error(F(345));
                case 4:
                  if ((r2 & 4194048) !== r2 && (r2 & 62914560) !== r2) break;
                case 6:
                  Go(l2, r2, Ft, !Ha);
                  break e;
                case 2:
                  Ze = null;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(F(329));
              }
              if ((r2 & 62914560) === r2 && (c = ji + 300 - Tt(), 10 < c)) {
                if (Go(l2, r2, Ft, !Ha), ao(l2, 0, true) !== 0) break e;
                zo = r2, l2.timeoutHandle = Dm(Sp.bind(null, l2, a, Ze, $u, Kd, r2, Ft, Ma, es, Ha, d, "Throttled", -0, 0), c);
                break e;
              }
              Sp(l2, a, Ze, $u, Kd, r2, Ft, Ma, es, Ha, d, null, -0, 0);
            }
          }
          break;
        } while (true);
        xr(t2);
      }
      function Sp(t2, r2, a, l2, c, d, h2, y, C, R, D, U, A, fe) {
        t2.timeoutHandle = La;
        var Ne = r2.subtreeFlags, Re = (d & 335544064) === d;
        if (U = null, (Re || Ne & 8192 || (Ne & 16785408) === 16785408) && (U = Om(), Rt = null, od(r2, d, U), Re && Bm(U, t2.containerInfo), Ne = (d & 62914560) === d ? ji - Tt() : (d & 4194048) === d ? Ph - Tt() : 0, Ne = cr(U, Ne), Ne !== null)) {
          zo = d, t2.cancelPendingCommit = Ne(sd.bind(null, t2, r2, d, a, l2, c, h2, y, C, R, D, U, null, A, fe)), Go(t2, d, h2, !R);
          return;
        }
        sd(t2, r2, d, a, l2, c, h2, y, C, R, D, U);
      }
      function ad(t2) {
        for (var r2 = t2; ; ) {
          var a = r2.tag;
          if ((a === 0 || a === 11 || a === 15) && r2.flags & 16384 && (a = r2.updateQueue, a !== null && (a = a.stores, a !== null))) for (var l2 = 0; l2 < a.length; l2++) {
            var c = a[l2], d = c.getSnapshot;
            c = c.value;
            try {
              if (!$t(d(), c)) return false;
            } catch {
              return false;
            }
          }
          if (a = r2.child, r2.subtreeFlags & 16384 && a !== null) a.return = r2, r2 = a;
          else {
            if (r2 === t2) break;
            for (; r2.sibling === null; ) {
              if (r2.return === null || r2.return === t2) return true;
              r2 = r2.return;
            }
            r2.sibling.return = r2.return, r2 = r2.sibling;
          }
        }
        return true;
      }
      function Go(t2, r2, a, l2) {
        r2 = _f(t2, r2), r2 &= ~Yd, r2 &= ~Ma, t2.suspendedLanes |= r2, t2.pingedLanes &= ~r2, l2 && (t2.warmLanes |= r2), l2 = t2.expirationTimes;
        for (var c = r2; 0 < c; ) {
          var d = 31 - sn(c), h2 = 1 << d;
          l2[d] = -1, c &= ~h2;
        }
        a !== 0 && en(t2, a, r2);
      }
      function Sm() {
        return (de & 6) === 0 ? (tl(0), false) : true;
      }
      function za() {
        if (he !== null) {
          if (Ie === 0) var t2 = he.return;
          else t2 = he, qr = Ni = null, dl(t2), Zl = null, Au = 0, t2 = he;
          for (; t2 !== null; ) Hc(t2.alternate, t2), t2 = t2.return;
          he = null;
        }
      }
      function Ea(t2, r2) {
        var a = t2.timeoutHandle;
        return a !== La && (t2.timeoutHandle = La, Op(a)), a = t2.cancelPendingCommit, a !== null && (t2.cancelPendingCommit = null, a()), zo = 0, za(), Be = t2, he = a = Zo(t2.current, null), ye = r2, Ie = 0, Qt = null, Ha = false, Kl = Yi(t2, r2), wh = false, es = Ft = Yd = Ma = aa = cn = 0, Ze = Vu = null, Kd = false, oa = _f(t2, r2), Wo(), a;
      }
      function kp(t2, r2) {
        re = null, Q.H = Bu, r2 === Jl || r2 === Wd ? (r2 = ai(), Ie = 3) : r2 === gh ? (r2 = ai(), Ie = 4) : Ie = r2 === vh ? 8 : r2 !== null && typeof r2 == "object" && typeof r2.then == "function" ? 6 : 1, Qt = r2, he === null && (cn = 1, $s(t2, Kt(r2, t2.current)));
      }
      function wp() {
        var t2 = Zn.current;
        return t2 === null ? true : (ye & 4194048) === ye ? lt === null : (ye & 62914560) === ye || (ye & 536870912) !== 0 ? t2 === lt : false;
      }
      function Pp() {
        var t2 = Q.H;
        return Q.H = Bu, t2 === null ? Bu : t2;
      }
      function id() {
        var t2 = Q.A;
        return Q.A = H0, t2;
      }
      function Rl() {
        cn = 4, Ha || (ye & 4194048) !== ye && Zn.current !== null || (Kl = true), (aa & 134217727) === 0 && (Ma & 134217727) === 0 || Be === null || Go(Be, ye, Ft, false);
      }
      function mu(t2, r2, a) {
        var l2 = de;
        de |= 2;
        var c = Pp(), d = id();
        (Be !== t2 || ye !== r2) && ($u = null, Ea(t2, r2)), r2 = false;
        var h2 = cn;
        e: do
          try {
            if (Ie !== 0 && he !== null) {
              var y = he, C = Qt;
              switch (Ie) {
                case 8:
                  za(), h2 = 6;
                  break e;
                case 3:
                case 2:
                case 9:
                case 6:
                  Zn.current === null && (r2 = true);
                  var R = Ie;
                  if (Ie = 0, Qt = null, vi(t2, y, C, R), a && Kl) {
                    h2 = 0;
                    break e;
                  }
                  break;
                default:
                  R = Ie, Ie = 0, Qt = null, vi(t2, y, C, R);
              }
            }
            km(), h2 = cn;
            break;
          } catch (D) {
            kp(t2, D);
          }
        while (true);
        return r2 && t2.shellSuspendCounter++, qr = Ni = null, de = l2, Q.H = c, Q.A = d, he === null && (Be = null, ye = 0, Wo()), h2;
      }
      function km() {
        for (; he !== null; ) gu(he);
      }
      function xp(t2, r2) {
        var a = de;
        de |= 2;
        var l2 = Pp(), c = id();
        Be !== t2 || ye !== r2 ? ($u = null, ns = Tt() + 500, Ea(t2, r2)) : Kl = Yi(t2, r2);
        e: do
          try {
            if (Ie !== 0 && he !== null) {
              r2 = he;
              var d = Qt;
              n: switch (Ie) {
                case 1:
                  Ie = 0, Qt = null, vi(t2, r2, d, 1);
                  break;
                case 2:
                case 9:
                  if (jo(d)) {
                    Ie = 0, Qt = null, wm(r2);
                    break;
                  }
                  r2 = function() {
                    Ie !== 2 && Ie !== 9 || Be !== t2 || (Ie = 7), xr(t2);
                  }, d.then(r2, r2);
                  break e;
                case 3:
                  Ie = 7;
                  break e;
                case 4:
                  Ie = 5;
                  break e;
                case 7:
                  jo(d) ? (Ie = 0, Qt = null, wm(r2)) : (Ie = 0, Qt = null, vi(t2, r2, d, 7));
                  break;
                case 5:
                  var h2 = null;
                  switch (he.tag) {
                    case 26:
                      h2 = he.memoizedState;
                    case 5:
                    case 27:
                      var y = he, C = y.type, R = y.pendingProps;
                      if (h2 ? ce(h2) : ur(y.stateNode, C, R)) {
                        Ie = 0, Qt = null;
                        var D = y.sibling;
                        if (D !== null) he = D;
                        else {
                          var U = y.return;
                          U !== null ? (he = U, bu(U)) : he = null;
                        }
                        break n;
                      }
                  }
                  Ie = 0, Qt = null, vi(t2, r2, d, 5);
                  break;
                case 6:
                  Ie = 0, Qt = null, vi(t2, r2, d, 6);
                  break;
                case 8:
                  za(), cn = 6;
                  break e;
                default:
                  throw Error(F(462));
              }
            }
            ld();
            break;
          } catch (A) {
            kp(t2, A);
          }
        while (true);
        return qr = Ni = null, Q.H = l2, Q.A = c, de = a, he !== null ? 0 : (Be = null, ye = 0, Wo(), cn);
      }
      function ld() {
        for (; he !== null && !j0(); ) gu(he);
      }
      function gu(t2) {
        var r2 = ip(t2.alternate, t2, oa);
        t2.memoizedProps = t2.pendingProps, r2 === null ? bu(t2) : he = r2;
      }
      function wm(t2) {
        var r2 = t2, a = r2.alternate;
        switch (r2.tag) {
          case 15:
          case 0:
            r2 = rp(a, r2, r2.pendingProps, r2.type, void 0, ye);
            break;
          case 11:
            r2 = rp(a, r2, r2.pendingProps, r2.type.render, r2.ref, ye);
            break;
          case 5:
            dl(r2);
            var l2 = r2;
            En && l2 === Nn && (ne ? (er(l2), l2.tag === 5 && l2.stateNode != null && (Qe = l2.stateNode)) : (er(l2), ne = true));
          default:
            Hc(a, r2), r2 = he = Np(r2, oa), r2 = ip(a, r2, oa);
        }
        t2.memoizedProps = t2.pendingProps, r2 === null ? bu(t2) : he = r2;
      }
      function vi(t2, r2, a, l2) {
        qr = Ni = null, dl(r2), Zl = null, Au = 0;
        var c = r2.return;
        try {
          if (tt(t2, c, r2, a, ye)) {
            cn = 1, $s(t2, Kt(a, t2.current)), he = null;
            return;
          }
        } catch (d) {
          if (c !== null) throw he = c, d;
          cn = 1, $s(t2, Kt(a, t2.current)), he = null;
          return;
        }
        r2.flags & 32768 ? (ne || l2 === 1 ? t2 = true : Kl || (ye & 536870912) !== 0 ? t2 = false : (Ha = t2 = true, (l2 === 2 || l2 === 9 || l2 === 3 || l2 === 6) && (l2 = Zn.current, l2 !== null && l2.tag === 13 && (l2.flags |= 16384))), yu(r2, t2)) : bu(r2);
      }
      function bu(t2) {
        var r2 = t2;
        do {
          if ((r2.flags & 32768) !== 0) {
            yu(r2, Ha);
            return;
          }
          t2 = r2.return;
          var a = lp(r2.alternate, r2, oa);
          if (a !== null) {
            he = a;
            return;
          }
          if (r2 = r2.sibling, r2 !== null) {
            he = r2;
            return;
          }
          he = r2 = t2;
        } while (r2 !== null);
        cn === 0 && (cn = 5);
      }
      function yu(t2, r2) {
        do {
          var a = xl(t2.alternate, t2);
          if (a !== null) {
            a.flags &= 32767, he = a;
            return;
          }
          if (a = t2.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !r2 && (t2 = t2.sibling, t2 !== null)) {
            he = t2;
            return;
          }
          he = t2 = a;
        } while (t2 !== null);
        cn = 6, he = null;
      }
      function sd(t2, r2, a, l2, c, d, h2, y, C, R, D, U) {
        t2.cancelPendingCommit = null;
        do
          _a();
        while (Xe !== 0);
        if ((de & 6) !== 0) throw Error(F(327));
        if (r2 !== null) {
          if (r2 === t2.current) throw Error(F(177));
          t2 === Be && (he = Be = null, ye = 0), $a = r2, qt = t2, zo = a, ef = c, Tg = l2, Cp(t2, r2, a, h2, y, C, U);
        }
      }
      function Cp(t2, r2, a, l2, c, d, h2) {
        var y = r2.lanes | r2.childLanes;
        if (xh = y, y |= bh, ti(t2, a, y, l2, c, d), Ui = null, (a & 335544064) === a ? (ts = lm(t2), l2 = 10262) : (ts = null, l2 = 10256), (r2.subtreeFlags & l2) !== 0 || (r2.flags & l2) !== 0 ? (t2.callbackNode = null, t2.callbackPriority = 0, ku(dh, function() {
          return ud(), null;
        })) : (t2.callbackNode = null, t2.callbackPriority = 0), $d = false, l2 = (r2.flags & 13878) !== 0, (r2.subtreeFlags & 13878) !== 0 || l2) {
          l2 = Q.T, Q.T = null, c = sr(), jn(2), d = de, de |= 4;
          try {
            hp(t2, r2, a);
          } finally {
            de = d, jn(c), Q.T = l2;
          }
        }
        Xe = 1, $d ? je = Km(h2, t2.containerInfo, ts, vu, zp, Jo, Su, ud, Pm, null, null) : (vu(), zp(), Su());
      }
      function Pm(t2) {
        if (Xe !== 0) {
          var r2 = qt.onRecoverableError;
          r2(t2, {
            componentStack: null
          });
        }
      }
      function Jo() {
        Xe === 3 && (Xe = 0, td($a, qt), Xe = 4);
      }
      function vu() {
        if (Xe === 1) {
          Xe = 0;
          var t2 = qt, r2 = $a, a = zo, l2 = (r2.flags & 13878) !== 0;
          if ((r2.subtreeFlags & 13878) !== 0 || l2) {
            l2 = Q.T, Q.T = null;
            var c = sr();
            jn(2);
            var d = de;
            de |= 4;
            try {
              Hu = Qd = false, nd(r2, t2, a), Lm(t2.containerInfo);
            } finally {
              de = d, jn(c), Q.T = l2;
            }
          }
          t2.current = r2, Xe = 2;
        }
      }
      function zp() {
        if (Xe === 2) {
          Xe = 0;
          var t2 = qt, r2 = $a, a = (r2.flags & 8772) !== 0;
          if ((r2.subtreeFlags & 8772) !== 0 || a) {
            a = Q.T, Q.T = null;
            var l2 = sr();
            jn(2);
            var c = de;
            de |= 4;
            try {
              Jc(t2, r2.alternate, r2);
            } finally {
              de = c, jn(l2), Q.T = a;
            }
          }
          Xe = 3;
        }
      }
      function Su() {
        if (Xe === 4 || Xe === 3) {
          Xe = 0;
          var t2 = je;
          je = null, uh();
          var r2 = qt, a = $a, l2 = zo, c = Tg, d = (l2 & 335544064) === l2 ? 10262 : 10256;
          if ((a.subtreeFlags & d) !== 0 || (a.flags & d) !== 0 ? Xe = 5 : (Xe = 0, $a = qt = null, ir(r2, r2.pendingLanes)), d = r2.pendingLanes, d === 0 && (Va = null), ze(l2), a = a.stateNode, It && typeof It.onCommitFiberRoot == "function") try {
            It.onCommitFiberRoot(Lu, a, void 0, (a.current.flags & 128) === 128);
          } catch {
          }
          if (c !== null) {
            a = Q.T, d = sr(), jn(2), Q.T = null;
            try {
              for (var h2 = r2.onRecoverableError, y = 0; y < c.length; y++) {
                var C = c[y];
                h2(C.value, {
                  componentStack: C.stack
                });
              }
            } finally {
              Q.T = a, jn(d);
            }
          }
          if (c = Ui, h2 = ts, ts = null, c !== null && (Ui = null, h2 === null && (h2 = []), t2 !== null)) for (C = 0; C < c.length; C++) a = (0, c[C])(h2), a !== void 0 && zd(t2, a);
          (zo & 3) !== 0 && _a(), xr(r2), d = r2.pendingLanes, (l2 & 261930) !== 0 && (d & 42) !== 0 ? r2 === Qu ? rs++ : (rs = 0, Qu = r2) : (rs = 0, Qu = null), En && gg(), tl(0);
        }
      }
      function ir(t2, r2) {
        (t2.pooledCacheLanes &= r2) === 0 && (r2 = t2.pooledCache, r2 != null && (t2.pooledCache = null, Ns(r2)));
      }
      function _a() {
        return je !== null && (eg(je), je = null), vu(), zp(), Su(), ud();
      }
      function ud() {
        if (Xe !== 5) return false;
        var t2 = qt, r2 = xh;
        xh = 0;
        var a = ze(zo), l2 = 32 > a ? 32 : a;
        a = Q.T;
        var c = sr();
        try {
          jn(l2), Q.T = null, l2 = ef, ef = null;
          var d = qt, h2 = zo;
          if (Xe = 0, $a = qt = null, zo = 0, (de & 6) !== 0) throw Error(F(331));
          var y = de;
          if (de |= 4, Ca(d.current), du(d, d.current, h2, l2), de = y, tl(0, false), It && typeof It.onPostCommitFiberRoot == "function") try {
            It.onPostCommitFiberRoot(Lu, d);
          } catch {
          }
          return true;
        } finally {
          jn(c), Q.T = a, ir(t2, r2);
        }
      }
      function cd(t2, r2, a) {
        r2 = Kt(a, r2), r2 = vl(t2.stateNode, r2, 2), t2 = ka(t2, r2, 2), t2 !== null && (Ki(t2, 2), xr(t2));
      }
      function ke(t2, r2, a) {
        if (t2.tag === 3) cd(t2, t2, a);
        else for (; r2 !== null; ) {
          if (r2.tag === 3) {
            cd(r2, t2, a);
            break;
          } else if (r2.tag === 1) {
            var l2 = r2.stateNode;
            if (typeof r2.type.getDerivedStateFromError == "function" || typeof l2.componentDidCatch == "function" && (Va === null || !Va.has(l2))) {
              t2 = Kt(a, t2), a = Qs(2), l2 = ka(r2, a, 2), l2 !== null && (Rc(a, l2, r2, t2), Ki(l2, 2), xr(l2));
              break;
            }
          }
          r2 = r2.return;
        }
      }
      function dd(t2, r2, a) {
        var l2 = t2.pingCache;
        if (l2 === null) {
          l2 = t2.pingCache = new M0();
          var c = /* @__PURE__ */ new Set();
          l2.set(r2, c);
        } else c = l2.get(r2), c === void 0 && (c = /* @__PURE__ */ new Set(), l2.set(r2, c));
        c.has(a) || (wh = true, c.add(a), t2 = Ep.bind(null, t2, r2, a), r2.then(t2, t2));
      }
      function Ep(t2, r2, a) {
        var l2 = t2.pingCache;
        l2 !== null && l2.delete(r2), t2.pingedLanes |= t2.suspendedLanes & a, t2.warmLanes &= ~a, Be === t2 && (ye & a) === a && ((cn === 4 || cn === 3 && (ye & 62914560) === ye && 300 > Tt() - ji) && (de & 2) === 0 ? Ea(t2, 0) : Yd |= a, es === ye && (es = 0)), xr(t2);
      }
      function fd(t2, r2) {
        r2 === 0 && (r2 = Nf()), t2 = Er(t2, r2), t2 !== null && (Ki(t2, r2), xr(t2));
      }
      function xm(t2) {
        var r2 = t2.memoizedState, a = 0;
        r2 !== null && (a = r2.retryLane), fd(t2, a);
      }
      function pd(t2, r2) {
        var a = 0;
        switch (t2.tag) {
          case 31:
          case 13:
            var l2 = t2.stateNode, c = t2.memoizedState;
            c !== null && (a = c.retryLane);
            break;
          case 19:
            l2 = t2.stateNode;
            break;
          case 22:
            l2 = t2.stateNode._retryCache;
            break;
          default:
            throw Error(F(314));
        }
        l2 !== null && l2.delete(r2), fd(t2, a);
      }
      function ku(t2, r2) {
        return $l(t2, r2);
      }
      function Fe(t2, r2, a, l2) {
        this.tag = t2, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = r2, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l2, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
      }
      function _p(t2) {
        return t2 = t2.prototype, !(!t2 || !t2.isReactComponent);
      }
      function Zo(t2, r2) {
        var a = t2.alternate;
        return a === null ? (a = et(t2.tag, r2, t2.key, t2.mode), a.elementType = t2.elementType, a.type = t2.type, a.stateNode = t2.stateNode, a.alternate = t2, t2.alternate = a) : (a.pendingProps = r2, a.type = t2.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t2.flags & 1206910976, a.childLanes = t2.childLanes, a.lanes = t2.lanes, a.child = t2.child, a.memoizedProps = t2.memoizedProps, a.memoizedState = t2.memoizedState, a.updateQueue = t2.updateQueue, r2 = t2.dependencies, a.dependencies = r2 === null ? null : {
          lanes: r2.lanes,
          firstContext: r2.firstContext
        }, a.sibling = t2.sibling, a.index = t2.index, a.ref = t2.ref, a.refCleanup = t2.refCleanup, a;
      }
      function Np(t2, r2) {
        t2.flags &= 1206910978;
        var a = t2.alternate;
        return a === null ? (t2.childLanes = 0, t2.lanes = r2, t2.child = null, t2.subtreeFlags = 0, t2.memoizedProps = null, t2.memoizedState = null, t2.updateQueue = null, t2.dependencies = null, t2.stateNode = null) : (t2.childLanes = a.childLanes, t2.lanes = a.lanes, t2.child = a.child, t2.subtreeFlags = 0, t2.deletions = null, t2.memoizedProps = a.memoizedProps, t2.memoizedState = a.memoizedState, t2.updateQueue = a.updateQueue, t2.type = a.type, r2 = a.dependencies, t2.dependencies = r2 === null ? null : {
          lanes: r2.lanes,
          firstContext: r2.firstContext
        }), t2;
      }
      function Vt(t2, r2, a, l2, c, d) {
        var h2 = 0;
        if (l2 = t2, typeof l2 == "function") _p(l2) && (h2 = 1);
        else if (typeof l2 == "string") h2 = Nt && be ? th(t2, a, Jn.current) ? 26 : Ua(t2) ? 27 : 5 : Nt ? th(t2, a, Jn.current) ? 26 : 5 : be && Ua(t2) ? 27 : 5;
        else e: switch (l2) {
          case zu:
            return t2 = et(31, a, r2, c), t2.elementType = zu, t2.lanes = d, t2;
          case wo:
            return Na(a.children, c, d, r2);
          case md:
            h2 = 8, c |= 24;
            break;
          case Pu:
            return t2 = et(12, a, r2, c | 2), t2.elementType = Pu, t2.lanes = d, t2;
          case xu:
            return t2 = et(13, a, r2, c), t2.elementType = xu, t2.lanes = d, t2;
          case Cu:
            return t2 = et(19, a, r2, c), t2.elementType = Cu, t2.lanes = d, t2;
          case Nm:
          case yd:
            return t2 = c | 32, t2 = et(30, a, r2, t2), t2.elementType = yd, t2.lanes = d, t2.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }, t2;
          default:
            if (typeof l2 == "object" && l2 !== null) switch (l2.$$typeof) {
              case Vr:
                h2 = 10;
                break e;
              case gd:
                h2 = 9;
                break e;
              case bd:
                h2 = 11;
                break e;
              case Fl:
                h2 = 14;
                break e;
              case Ra:
                h2 = 16, l2 = null;
                break e;
            }
            h2 = 29, a = Error(F(130, t2 === null ? "null" : typeof t2, "")), l2 = null;
        }
        return r2 = et(h2, a, r2, c), r2.elementType = t2, r2.type = l2, r2.lanes = d, r2;
      }
      function Na(t2, r2, a, l2) {
        return t2 = et(7, t2, l2, r2), t2.lanes = a, t2;
      }
      function wu(t2, r2, a) {
        return t2 = et(6, t2, null, r2), t2.lanes = a, t2;
      }
      function Ll(t2) {
        var r2 = et(18, null, null, 0);
        return r2.stateNode = t2, r2;
      }
      function Ta(t2, r2, a) {
        return r2 = et(4, t2.children !== null ? t2.children : [], t2.key, r2), r2.lanes = a, r2.stateNode = {
          containerInfo: t2.containerInfo,
          pendingChildren: null,
          implementation: t2.implementation
        }, r2;
      }
      function Cm(t2, r2, a, l2, c, d, h2, y, C) {
        this.tag = 1, this.containerInfo = t2, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = La, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = bc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = bc(0), this.hiddenUpdates = bc(null), this.identifierPrefix = l2, this.onUncaughtError = c, this.onCaughtError = d, this.onRecoverableError = h2, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
      }
      function hd(t2, r2, a, l2, c, d, h2, y, C, R, D, U) {
        return t2 = new Cm(t2, r2, a, h2, C, R, D, U, y), r2 = 1, d === true && (r2 |= 24), d = et(3, null, null, r2), t2.current = d, d.stateNode = t2, r2 = _s(), r2.refCount++, t2.pooledCache = r2, r2.refCount++, d.memoizedState = {
          element: l2,
          isDehydrated: a,
          cache: r2
        }, ii(d), t2;
      }
      function Tp(t2) {
        return t2 ? (t2 = Aa, t2) : Aa;
      }
      function zm(t2) {
        var r2 = t2._reactInternals;
        if (r2 === void 0) throw typeof t2.render == "function" ? Error(F(188)) : (t2 = Object.keys(t2).join(","), Error(F(268, t2)));
        return t2 = hc(r2), t2 = t2 !== null ? mc(t2) : null, t2 === null ? null : Pi(t2.stateNode);
      }
      function Em(t2, r2, a, l2, c, d) {
        c = Tp(c), l2.context === null ? l2.context = c : l2.pendingContext = c, l2 = po(r2), l2.payload = {
          element: a
        }, d = d === void 0 ? null : d, d !== null && (l2.callback = d), a = ka(t2, l2, r2), a !== null && (yt(a, t2, r2), Ls(a, t2, r2));
      }
      function Ip(t2, r2) {
        if (t2 = t2.memoizedState, t2 !== null && t2.dehydrated !== null) {
          var a = t2.retryLane;
          t2.retryLane = a !== 0 && a < r2 ? a : r2;
        }
      }
      function Rp(t2, r2) {
        Ip(t2, r2), (t2 = t2.alternate) && Ip(t2, r2);
      }
      var Y = {}, $n = React, Et = w1, Lp = Object.assign, _m = /* @__PURE__ */ Symbol.for("react.element"), Ia = /* @__PURE__ */ Symbol.for("react.transitional.element"), Si = /* @__PURE__ */ Symbol.for("react.portal"), wo = /* @__PURE__ */ Symbol.for("react.fragment"), md = /* @__PURE__ */ Symbol.for("react.strict_mode"), Pu = /* @__PURE__ */ Symbol.for("react.profiler"), gd = /* @__PURE__ */ Symbol.for("react.consumer"), Vr = /* @__PURE__ */ Symbol.for("react.context"), bd = /* @__PURE__ */ Symbol.for("react.forward_ref"), xu = /* @__PURE__ */ Symbol.for("react.suspense"), Cu = /* @__PURE__ */ Symbol.for("react.suspense_list"), Fl = /* @__PURE__ */ Symbol.for("react.memo"), Ra = /* @__PURE__ */ Symbol.for("react.lazy");
      var zu = /* @__PURE__ */ Symbol.for("react.activity"), Nm = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
      var Tm = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), yd = /* @__PURE__ */ Symbol.for("react.view_transition"), Im = /* @__PURE__ */ Symbol.for("react.recoverable"), ki = Symbol.iterator, Fp = /* @__PURE__ */ Symbol.for("react.optimistic_key"), Po = /* @__PURE__ */ Symbol.for("react.client.reference"), wi = Array.isArray, Q = $n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dp = m2.rendererVersion, jp = m2.rendererPackageName, Up = m2.extraDevToolsConfig, Pi = m2.getPublicInstance, vd = m2.getRootHostContext, Rm = m2.getChildHostContext, Wp = m2.prepareForCommit, Lm = m2.resetAfterCommit, Fm = m2.createInstance;
      m2.cloneMutableInstance;
      var Sd = m2.appendInitialChild, Ap = m2.finalizeInitialChildren, kd = m2.shouldSetTextContent, Eu = m2.createTextInstance;
      m2.cloneMutableTextInstance;
      var Dm = m2.scheduleTimeout, Op = m2.cancelTimeout, La = m2.noTimeout, lr = m2.isPrimaryRenderer;
      m2.warnsIfNotActing;
      var Ye = m2.supportsMutation, ln = m2.supportsPersistence, En = m2.supportsHydration, jm = m2.getInstanceFromNode;
      m2.beforeActiveInstanceBlur;
      var Um = m2.preparePortalMount;
      m2.prepareScopeUpdate, m2.getInstanceFromScope;
      var jn = m2.setCurrentUpdatePriority, sr = m2.getCurrentUpdatePriority, Qn = m2.resolveUpdatePriority;
      m2.trackSchedulerEvent, m2.resolveEventType, m2.resolveEventTimeStamp;
      var Wm = m2.shouldAttemptEagerTransition, it = m2.detachDeletedInstance;
      m2.requestPostPaintCallback;
      var Am = m2.maySuspendCommit, Dl = m2.maySuspendCommitOnUpdate, wd = m2.maySuspendCommitInSyncRender, ur = m2.preloadInstance, Om = m2.startSuspendingCommit, Xo = m2.suspendInstance, Bm = m2.suspendOnActiveViewTransition, cr = m2.waitForCommitToBeReady;
      m2.getSuspendedCommitReason;
      var Fa = m2.NotPendingTransition, $r = m2.HostTransitionContext, dr = m2.resetFormInstance;
      m2.bindToConsole;
      var Hm = m2.supportsMicrotasks, jl = m2.scheduleMicrotask, Ul = m2.supportsTestSelectors, _u = m2.findFiberRoot, Da = m2.getBoundingRect, Mm = m2.getTextContent, Wl = m2.isHiddenSubtree, Nu = m2.matchAccessibilityRole, Vm = m2.setFocusIfFocusable, Pd = m2.setupIntersectionObserver, $m = m2.appendChild, Qm = m2.appendChildToContainer, Bp = m2.commitTextUpdate, Hp = m2.commitMount, Mp = m2.commitUpdate, qm = m2.insertBefore, xd = m2.insertInContainerBefore, w0 = m2.removeChild, Gm = m2.removeChildFromContainer, _t = m2.resetTextContent, Jm = m2.hideInstance, Al = m2.hideTextInstance, nn = m2.unhideInstance, Zm = m2.unhideTextInstance, Vp = m2.applyViewTransitionName, P0 = m2.restoreViewTransitionName, ja = m2.cancelViewTransitionName, Cd = m2.cancelRootViewTransitionName, $p = m2.restoreRootViewTransitionName;
      m2.cloneRootViewTransitionContainer, m2.removeRootViewTransitionClone;
      var Tu = m2.measureInstance;
      m2.measureClonedInstance;
      var Yo = m2.wasInstanceInViewport, Xm = m2.hasInstanceChanged, Ym = m2.hasInstanceAffectedParent, Km = m2.startViewTransition;
      m2.startGestureTransition;
      var eg = m2.stopViewTransition, zd = m2.addViewTransitionFinishedListener;
      m2.getCurrentGestureOffset;
      var Iu = m2.createViewTransitionInstance, Qp = m2.clearContainer, ng = m2.createFragmentInstance, x0 = m2.updateFragmentInstanceFiber, tg = m2.commitNewChildToFragmentInstance, rg = m2.deleteChildFromFragmentInstance, og = m2.cloneInstance, ag = m2.createContainerChildSet, Ci = m2.appendChildToContainerChildSet, Ed = m2.finalizeContainerChildren, qp = m2.replaceContainerChildren, _d = m2.cloneHiddenInstance, ig = m2.cloneHiddenTextInstance, Gp = m2.isSuspenseInstancePending, Jp = m2.isSuspenseInstanceFallback, C0 = m2.getSuspenseInstanceFallbackErrorDetails, z0 = m2.registerSuspenseInstanceRetry, Zp = m2.canHydrateFormStateMarker, Xp = m2.isFormStateMarkerMatching, Nd = m2.getNextHydratableSibling, lg = m2.getNextHydratableSiblingAfterSingleton, sg = m2.getFirstHydratableChild, Ol = m2.getFirstHydratableChildWithinContainer, Yp = m2.getFirstHydratableChildWithinActivityInstance, ug = m2.getFirstHydratableChildWithinSuspenseInstance, we = m2.getFirstHydratableChildWithinSingleton, Kp = m2.canHydrateInstance, E0 = m2.canHydrateTextInstance, cg = m2.canHydrateActivityInstance, _0 = m2.canHydrateSuspenseInstance, N0 = m2.hydrateInstance, eh = m2.hydrateTextInstance, dg = m2.hydrateActivityInstance, fg = m2.hydrateSuspenseInstance, pg = m2.getNextHydratableInstanceAfterActivityInstance, Ru = m2.getNextHydratableInstanceAfterSuspenseInstance, T0 = m2.commitHydratedInstance, I0 = m2.commitHydratedContainer, Bl = m2.commitHydratedActivityInstance, hg = m2.commitHydratedSuspenseInstance, mg = m2.finalizeHydratedChildren, gg = m2.flushHydrationEvents;
      m2.clearActivityBoundary;
      var R0 = m2.clearSuspenseBoundary;
      m2.clearActivityBoundaryFromContainer;
      var nh = m2.clearSuspenseBoundaryFromContainer, Ko = m2.hideDehydratedBoundary, bg = m2.unhideDehydratedBoundary, Td = m2.shouldDeleteUnhydratedTailInstances;
      m2.diffHydratedPropsForDevWarnings, m2.diffHydratedTextForDevWarnings, m2.describeHydratableInstanceForDevWarnings;
      var Id = m2.validateHydratableInstance, zi = m2.validateHydratableTextInstance, Nt = m2.supportsResources, th = m2.isHostHoistableType, Hl = m2.getHoistableRoot, yg = m2.getResource, rh = m2.acquireResource, oh = m2.releaseResource, vg = m2.hydrateHoistable, Rd = m2.mountHoistable, Ld = m2.unmountHoistable, ah = m2.createHoistableInstance, ih = m2.prepareToCommitHoistables, L0 = m2.mayResourceSuspendCommit, ce = m2.preloadResource, F0 = m2.suspendResource, be = m2.supportsSingletons, Un = m2.resolveSingletonInstance, D0 = m2.acquireSingletonInstance, xo = m2.releaseSingletonInstance, Ua = m2.isHostSingletonType, Qr = m2.isSingletonScope, Ml = [], Wa = -1, Aa = {}, sn = Math.clz32 ? Math.clz32 : k0, Fd = Math.log, lh = Math.LN2, Vl = 256, Ei = 262144, qn = 4194304, $l = Et.unstable_scheduleCallback, sh = Et.unstable_cancelCallback, j0 = Et.unstable_shouldYield, uh = Et.unstable_requestPaint, Tt = Et.unstable_now, ch = Et.unstable_ImmediatePriority, Sg = Et.unstable_UserBlockingPriority, dh = Et.unstable_NormalPriority, Gn = Et.unstable_IdlePriority, N2 = Et.log, U0 = Et.unstable_setDisableYieldValue, Lu = null, It = null, Ql = 0, $t = typeof Object.is == "function" ? Object.is : im, kg = typeof reportError == "function" ? reportError : function(t2) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var r2 = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: typeof t2 == "object" && t2 !== null && typeof t2.message == "string" ? String(t2.message) : String(t2),
            error: t2
          });
          if (!window.dispatchEvent(r2)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", t2);
          return;
        }
        console.error(t2);
      }, W0 = Object.prototype.hasOwnProperty, fh, wg, Fu = false, ph = /* @__PURE__ */ new WeakMap(), ea = [], _i = 0, Dd = null, Du = 0, Wn = [], yn = 0, _e = null, _n = 1, $e = "", Jn = oo(null), ju = oo(null), Je = oo(null), fr = oo(null), Nn = null, Qe = null, ne = false, pr = null, hr = false, hh = Error(F(519)), jd = oo(null), Ni = null, qr = null, Pg = typeof AbortController < "u" ? AbortController : function() {
        var t2 = [], r2 = this.signal = {
          aborted: false,
          addEventListener: function(a, l2) {
            t2.push(l2);
          }
        };
        this.abort = function() {
          r2.aborted = true, t2.forEach(function(a) {
            return a();
          });
        };
      }, A0 = Et.unstable_scheduleCallback, xg = Et.unstable_NormalPriority, tn = {
        $$typeof: Vr,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      }, Uu = null, ql = null, Gr = null, Jr = false, Ud = false, mh = false, Ti = 0, Wu = null, Oa = 0, Ii = 0, Gl = null, Cg = Q.S;
      Q.S = function(t2, r2) {
        if (Ph = Tt(), typeof r2 == "object" && r2 !== null && typeof r2.then == "function" && Ot(t2, r2), Uu !== null) for (var a = ql; a !== null; ) jf(a, Uu), a = a.next;
        if (a = t2.types, a != null) {
          for (var l2 = ql; l2 !== null; ) jf(l2, a), l2 = l2.next;
          if (Ii !== 0) {
            l2 = Uu, l2 === null && (l2 = Uu = []);
            for (var c = 0; c < a.length; c++) {
              var d = a[c];
              l2.indexOf(d) === -1 && l2.push(d);
            }
          }
        }
        Cg !== null && Cg(t2, r2);
      };
      var Zr = oo(null), Jl = Error(F(460)), gh = Error(F(474)), Wd = Error(F(542)), Ad = {
        then: function() {
        }
      }, Ri = null, Zl = null, Au = 0, Li = wt(true), zg = wt(false), mr = [], Xl = 0, bh = 0, na = false, yh = false, Ba = oo(null), Od = oo(0), Zn = oo(null), lt = null, Xn = oo(0), ta = 0, re = null, De = null, un = null, Bd = false, ra = false, Fi = false, Hd = 0, Ou = 0, Yl = null, O0 = 0, Bu = {
        readContext: Me,
        use: pl,
        useCallback: Ve,
        useContext: Ve,
        useEffect: Ve,
        useImperativeHandle: Ve,
        useLayoutEffect: Ve,
        useInsertionEffect: Ve,
        useMemo: Ve,
        useReducer: Ve,
        useRef: Ve,
        useState: Ve,
        useDebugValue: Ve,
        useDeferredValue: Ve,
        useTransition: Ve,
        useSyncExternalStore: Ve,
        useId: Ve,
        useHostTransitionStatus: Ve,
        useFormState: Ve,
        useActionState: Ve,
        useOptimistic: Ve,
        useMemoCache: Ve,
        useCacheRefresh: Ve,
        useEffectEvent: Ve
      }, Eg = {
        readContext: Me,
        use: pl,
        useCallback: function(t2, r2) {
          return gn().memoizedState = [t2, r2 === void 0 ? null : r2], t2;
        },
        useContext: Me,
        useEffect: Mf,
        useImperativeHandle: function(t2, r2, a) {
          a = a != null ? a.concat([t2]) : null, gl(4194308, 4, Qf.bind(null, r2, t2), a);
        },
        useLayoutEffect: function(t2, r2) {
          return gl(4194308, 4, t2, r2);
        },
        useInsertionEffect: function(t2, r2) {
          gl(4, 2, t2, r2);
        },
        useMemo: function(t2, r2) {
          var a = gn();
          r2 = r2 === void 0 ? null : r2;
          var l2 = t2();
          if (Fi) {
            ga(true);
            try {
              t2();
            } finally {
              ga(false);
            }
          }
          return a.memoizedState = [l2, r2], l2;
        },
        useReducer: function(t2, r2, a) {
          var l2 = gn();
          if (a !== void 0) {
            var c = a(r2);
            if (Fi) {
              ga(true);
              try {
                a(r2);
              } finally {
                ga(false);
              }
            }
          } else c = r2;
          return l2.memoizedState = l2.baseState = c, t2 = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t2,
            lastRenderedState: c
          }, l2.queue = t2, t2 = t2.dispatch = bt.bind(null, re, t2), [l2.memoizedState, t2];
        },
        useRef: function(t2) {
          var r2 = gn();
          return t2 = {
            current: t2
          }, r2.memoizedState = t2;
        },
        useState: function(t2) {
          t2 = gt(t2);
          var r2 = t2.queue, a = Tc.bind(null, re, r2);
          return r2.dispatch = a, [t2.memoizedState, a];
        },
        useDebugValue: Bs,
        useDeferredValue: function(t2, r2) {
          var a = gn();
          return bl(a, t2, r2);
        },
        useTransition: function() {
          var t2 = gt(false);
          return t2 = Jf.bind(null, re, t2.queue, true, false), gn().memoizedState = t2, [false, t2];
        },
        useSyncExternalStore: function(t2, r2, a) {
          var l2 = re, c = gn();
          if (ne) {
            if (a === void 0) throw Error(F(407));
            a = a();
          } else {
            if (a = r2(), Be === null) throw Error(F(349));
            (ye & 127) !== 0 || mo(l2, r2, a);
          }
          c.memoizedState = a;
          var d = {
            value: a,
            getSnapshot: r2
          };
          return c.queue = d, Mf(hl.bind(null, l2, d, t2), [t2]), l2.flags |= 2048, Ur(9, {
            destroy: void 0
          }, Us.bind(null, l2, d, a, r2), null), a;
        },
        useId: function() {
          var t2 = gn(), r2 = Be.identifierPrefix;
          if (ne) {
            var a = $e, l2 = _n;
            a = (l2 & ~(1 << 32 - sn(l2) - 1)).toString(32) + a, r2 = "_" + r2 + "R_" + a, a = Hd++, 0 < a && (r2 += "H" + a.toString(32)), r2 += "_";
          } else a = O0++, r2 = "_" + r2 + "r_" + a.toString(32) + "_";
          return t2.memoizedState = r2;
        },
        useHostTransitionStatus: bo,
        useFormState: Bf,
        useActionState: Bf,
        useOptimistic: function(t2) {
          var r2 = gn();
          r2.memoizedState = r2.baseState = t2;
          var a = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          return r2.queue = a, r2 = yl.bind(null, re, true, a), a.dispatch = r2, [t2, r2];
        },
        useMemoCache: Mo,
        useCacheRefresh: function() {
          return gn().memoizedState = gm.bind(null, re);
        },
        useEffectEvent: function(t2) {
          var r2 = gn(), a = {
            impl: t2
          };
          return r2.memoizedState = a, function() {
            if ((de & 2) !== 0) throw Error(F(440));
            return a.impl.apply(void 0, arguments);
          };
        }
      }, _g = {
        readContext: Me,
        use: pl,
        useCallback: Hs,
        useContext: Me,
        useEffect: _c,
        useImperativeHandle: mm,
        useInsertionEffect: Nc,
        useLayoutEffect: hm,
        useMemo: qf,
        useReducer: js,
        useRef: Hf,
        useState: function() {
          return js(Bt);
        },
        useDebugValue: Bs,
        useDeferredValue: function(t2, r2) {
          var a = K();
          return Gf(a, De.memoizedState, t2, r2);
        },
        useTransition: function() {
          var t2 = js(Bt)[0], r2 = K().memoizedState;
          return [typeof t2 == "boolean" ? t2 : fl(t2), r2];
        },
        useSyncExternalStore: pm,
        useId: Xf,
        useHostTransitionStatus: bo,
        useFormState: Dr,
        useActionState: Dr,
        useOptimistic: function(t2, r2) {
          var a = K();
          return Ir(a, De, t2, r2);
        },
        useMemoCache: Mo,
        useCacheRefresh: Yf,
        useEffectEvent: $f
      }, B0 = {
        readContext: Me,
        use: pl,
        useCallback: Hs,
        useContext: Me,
        useEffect: _c,
        useImperativeHandle: mm,
        useInsertionEffect: Nc,
        useLayoutEffect: hm,
        useMemo: qf,
        useReducer: tr,
        useRef: Hf,
        useState: function() {
          return tr(Bt);
        },
        useDebugValue: Bs,
        useDeferredValue: function(t2, r2) {
          var a = K();
          return De === null ? bl(a, t2, r2) : Gf(a, De.memoizedState, t2, r2);
        },
        useTransition: function() {
          var t2 = tr(Bt)[0], r2 = K().memoizedState;
          return [typeof t2 == "boolean" ? t2 : fl(t2), r2];
        },
        useSyncExternalStore: pm,
        useId: Xf,
        useHostTransitionStatus: bo,
        useFormState: jr,
        useActionState: jr,
        useOptimistic: function(t2, r2) {
          var a = K();
          return De !== null ? Ir(a, De, t2, r2) : (a.baseState = t2, [t2, a.queue.dispatch]);
        },
        useMemoCache: Mo,
        useCacheRefresh: Yf,
        useEffectEvent: $f
      }, Md = {
        enqueueSetState: function(t2, r2, a) {
          t2 = t2._reactInternals;
          var l2 = zt(), c = po(l2);
          c.payload = r2, a != null && (c.callback = a), r2 = ka(t2, c, l2), r2 !== null && (yt(r2, t2, l2), Ls(r2, t2, l2));
        },
        enqueueReplaceState: function(t2, r2, a) {
          t2 = t2._reactInternals;
          var l2 = zt(), c = po(l2);
          c.tag = 1, c.payload = r2, a != null && (c.callback = a), r2 = ka(t2, c, l2), r2 !== null && (yt(r2, t2, l2), Ls(r2, t2, l2));
        },
        enqueueForceUpdate: function(t2, r2) {
          t2 = t2._reactInternals;
          var a = zt(), l2 = po(a);
          l2.tag = 2, r2 != null && (l2.callback = r2), r2 = ka(t2, l2, a), r2 !== null && (yt(r2, t2, a), Ls(r2, t2, a));
        }
      }, vh = Error(F(461)), Pn = false, Vd = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      }, Yn = false, $d = false, Rt = null, Xr = null, vt = 0, xn = false, Ce = false, Co = false, Sh = false, Ng = typeof WeakSet == "function" ? WeakSet : Set, An = null, gr = false, Hu = false, Qd = false, kh = false, Cn = null, Lt = false, Yr = null, Di = 8192, H0 = {
        getCacheForType: function(t2) {
          var r2 = Me(tn), a = r2.data.get(t2);
          return a === void 0 && (a = t2(), r2.data.set(t2, a)), a;
        },
        cacheSignal: function() {
          return Me(tn).controller.signal;
        }
      }, qd = 0, Gd = 1, Jd = 2, Zd = 3, Xd = 4;
      if (typeof Symbol == "function" && Symbol.for) {
        var Mu = Symbol.for;
        qd = Mu("selector.component"), Gd = Mu("selector.has_pseudo_class"), Jd = Mu("selector.role"), Zd = Mu("selector.test_id"), Xd = Mu("selector.text");
      }
      var M0 = typeof WeakMap == "function" ? WeakMap : Map, de = 0, Be = null, he = null, ye = 0, Ie = 0, Qt = null, Ha = false, Kl = false, wh = false, oa = 0, cn = 0, aa = 0, Ma = 0, Yd = 0, Ft = 0, es = 0, Vu = null, Ze = null, Kd = false, ji = 0, Ph = 0, ns = 1 / 0, $u = null, Va = null, Xe = 0, qt = null, $a = null, zo = 0, xh = 0, ef = null, Tg = null, je = null, Ui = null, ts = null, rs = 0, Qu = null;
      return Y.attemptContinuousHydration = function(t2) {
        if (t2.tag === 13 || t2.tag === 31) {
          var r2 = Er(t2, 67108864);
          r2 !== null && yt(r2, t2, 67108864), Rp(t2, 67108864);
        }
      }, Y.attemptHydrationAtCurrentPriority = function(t2) {
        if (t2.tag === 13 || t2.tag === 31) {
          var r2 = zt();
          r2 = mn(r2);
          var a = Er(t2, r2);
          a !== null && yt(a, t2, r2), Rp(t2, r2);
        }
      }, Y.attemptSynchronousHydration = function(t2) {
        switch (t2.tag) {
          case 3:
            if (t2 = t2.stateNode, t2.current.memoizedState.isDehydrated) {
              var r2 = ma(t2.pendingLanes);
              if (r2 !== 0) {
                for (t2.pendingLanes |= 2, t2.entangledLanes |= 2; r2; ) {
                  var a = 1 << 31 - sn(r2);
                  t2.entanglements[1] |= a, r2 &= ~a;
                }
                xr(t2), (de & 6) === 0 && (ns = Tt() + 500, tl(0));
              }
            }
            break;
          case 31:
          case 13:
            r2 = Er(t2, 2), r2 !== null && yt(r2, t2, 2), Sm(), Rp(t2, 2);
        }
      }, Y.batchedUpdates = function(t2, r2) {
        return t2(r2);
      }, Y.createComponentSelector = function(t2) {
        return {
          $$typeof: qd,
          value: t2
        };
      }, Y.createContainer = function(t2, r2, a, l2, c, d, h2, y, C, R) {
        return hd(t2, r2, false, null, a, l2, d, null, h2, y, C, R);
      }, Y.createHasPseudoClassSelector = function(t2) {
        return {
          $$typeof: Gd,
          value: t2
        };
      }, Y.createHydrationContainer = function(t2, r2, a, l2, c, d, h2, y, C, R, D, U, A, fe) {
        var _r3;
        return t2 = hd(a, l2, true, t2, c, d, y, fe, C, R, D, U), t2.context = Tp(null), a = t2.current, l2 = zt(), l2 = mn(l2), c = po(l2), c.callback = (_r3 = r2) != null ? _r3 : null, ka(a, c, l2), r2 = l2, t2.current.lanes = r2, Ki(t2, r2), xr(t2), t2;
      }, Y.createPortal = function(t2, r2, a) {
        var l2 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
          $$typeof: Si,
          key: l2 == null ? null : l2 === Fp ? Fp : "" + l2,
          children: t2,
          containerInfo: r2,
          implementation: a
        };
      }, Y.createRoleSelector = function(t2) {
        return {
          $$typeof: Jd,
          value: t2
        };
      }, Y.createTestNameSelector = function(t2) {
        return {
          $$typeof: Zd,
          value: t2
        };
      }, Y.createTextSelector = function(t2) {
        return {
          $$typeof: Xd,
          value: t2
        };
      }, Y.defaultOnCaughtError = function(t2) {
        console.error(t2);
      }, Y.defaultOnRecoverableError = function(t2) {
        kg(t2);
      }, Y.defaultOnUncaughtError = function(t2) {
        kg(t2);
      }, Y.deferredUpdates = function(t2) {
        var r2 = Q.T, a = sr();
        try {
          return jn(32), Q.T = null, t2();
        } finally {
          jn(a), Q.T = r2;
        }
      }, Y.discreteUpdates = function(t2, r2, a, l2, c) {
        var d = Q.T, h2 = sr();
        try {
          return jn(2), Q.T = null, t2(r2, a, l2, c);
        } finally {
          jn(h2), Q.T = d, de === 0 && (ns = Tt() + 500);
        }
      }, Y.findAllNodes = bn, Y.findBoundingRects = function(t2, r2) {
        if (!Ul) throw Error(F(363));
        r2 = bn(t2, r2), t2 = [];
        for (var a = 0; a < r2.length; a++) t2.push(Da(r2[a]));
        for (r2 = t2.length - 1; 0 < r2; r2--) {
          a = t2[r2];
          for (var l2 = a.x, c = l2 + a.width, d = a.y, h2 = d + a.height, y = r2 - 1; 0 <= y; y--) if (r2 !== y) {
            var C = t2[y], R = C.x, D = R + C.width, U = C.y, A = U + C.height;
            if (l2 >= R && d >= U && c <= D && h2 <= A) {
              t2.splice(r2, 1);
              break;
            } else if (l2 !== R || a.width !== C.width || A < d || U > h2) {
              if (!(d !== U || a.height !== C.height || D < l2 || R > c)) {
                R > l2 && (C.width += R - l2, C.x = l2), D < c && (C.width = c - R), t2.splice(r2, 1);
                break;
              }
            } else {
              U > d && (C.height += U - d, C.y = d), A < h2 && (C.height = h2 - U), t2.splice(r2, 1);
              break;
            }
          }
        }
        return t2;
      }, Y.findHostInstance = zm, Y.findHostInstanceWithNoPortals = function(t2) {
        return t2 = hc(t2), t2 = t2 !== null ? ht(t2) : null, t2 === null ? null : Pi(t2.stateNode);
      }, Y.findHostInstanceWithWarning = function(t2) {
        return zm(t2);
      }, Y.flushPassiveEffects = _a, Y.flushSyncFromReconciler = function(t2) {
        var r2 = de;
        de |= 1;
        var a = Q.T, l2 = sr();
        try {
          if (jn(2), Q.T = null, t2) return t2();
        } finally {
          jn(l2), Q.T = a, de = r2, (de & 6) === 0 && tl(0);
        }
      }, Y.flushSyncWork = Sm, Y.focusWithin = function(t2, r2) {
        if (!Ul) throw Error(F(363));
        for (t2 = fu(t2), r2 = vm(t2, r2), r2 = Array.from(r2), t2 = 0; t2 < r2.length; ) {
          var a = r2[t2++], l2 = a.tag;
          if (!Wl(a)) {
            if ((l2 === 5 || l2 === 26 || l2 === 27) && Vm(a.stateNode)) return true;
            for (a = a.child; a !== null; ) r2.push(a), a = a.sibling;
          }
        }
        return false;
      }, Y.getFindAllNodesFailureDescription = function(t2, r2) {
        if (!Ul) throw Error(F(363));
        var a = 0, l2 = [];
        t2 = [fu(t2), 0];
        for (var c = 0; c < t2.length; ) {
          var d = t2[c++], h2 = d.tag, y = t2[c++], C = r2[y];
          if ((h2 !== 5 && h2 !== 26 && h2 !== 27 || !Wl(d)) && (pu(d, C) && (l2.push(hu(C)), y++, y > a && (a = y)), y < r2.length)) for (d = d.child; d !== null; ) t2.push(d, y), d = d.sibling;
        }
        if (a < r2.length) {
          for (t2 = []; a < r2.length; a++) t2.push(hu(r2[a]));
          return `findAllNodes was able to match part of the selector:
  ` + (l2.join(" > ") + `

No matching component was found for:
  `) + t2.join(" > ");
        }
        return null;
      }, Y.getPublicRootInstance = function(t2) {
        if (t2 = t2.current, !t2.child) return null;
        switch (t2.child.tag) {
          case 27:
          case 5:
            return Pi(t2.child.stateNode);
          default:
            return t2.child.stateNode;
        }
      }, Y.injectIntoDevTools = function() {
        var t2 = {
          bundleType: 0,
          version: Dp,
          rendererPackageName: jp,
          currentDispatcherRef: Q,
          reconcilerVersion: "19.3.0"
        };
        if (Up !== null && (t2.rendererConfig = Up), typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") t2 = false;
        else {
          var r2 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (r2.isDisabled || !r2.supportsFiber) t2 = true;
          else {
            try {
              Lu = r2.inject(t2), It = r2;
            } catch {
            }
            t2 = !!r2.checkDCE;
          }
        }
        return t2;
      }, Y.isAlreadyRendering = function() {
        return (de & 6) !== 0;
      }, Y.observeVisibleRects = function(t2, r2, a, l2) {
        if (!Ul) throw Error(F(363));
        t2 = bn(t2, r2);
        var c = Pd(t2, a, l2).disconnect;
        return {
          disconnect: function() {
            c();
          }
        };
      }, Y.shouldError = function() {
        return null;
      }, Y.shouldSuspend = function() {
        return false;
      }, Y.startHostTransition = function(t2, r2, a, l2) {
        if (t2.tag !== 5) throw Error(F(476));
        var c = Zf(t2).queue;
        Jf(t2, c, r2, Fa, a === null ? zf : function() {
          var d = Zf(t2);
          return d.next === null && (d = t2.alternate.memoizedState), wa(t2, d.next.queue, {}, zt()), a(l2);
        });
      }, Y.updateContainer = function(t2, r2, a, l2) {
        var c = r2.current, d = zt();
        return Em(c, d, t2, r2, a, l2), d;
      }, Y.updateContainerSync = function(t2, r2, a, l2) {
        return Em(r2.current, 2, t2, r2, a, l2), 2;
      }, Y;
    }, Ut.exports.default = Ut.exports, Object.defineProperty(Ut.exports, "__esModule", {
      value: true
    });
  })(Ob)), Ob.exports;
}
var C1;
function G1() {
  return C1 || (C1 = 1, S0.exports = Q1()), S0.exports;
}
var J1 = G1();
const Z1 = $1(J1);
const catalogue = {};
let i = 0;
const toPascalCase = (type) => `${type[0].toUpperCase()}${type.slice(1)}`;
function hasConstructor(name) {
  return name in catalogue;
}
function resolveConstructor(name) {
  return catalogue[name];
}
function extend(objects) {
  if (typeof objects === "function") {
    const Component = `${i++}`;
    catalogue[Component] = objects;
    return Component;
  } else {
    Object.assign(catalogue, objects);
  }
}
function createReconciler(config) {
  const reconciler2 = Z1(config);
  reconciler2.injectIntoDevTools();
  return reconciler2;
}
const NoEventPriority = 0;
const PREFIX_REGEX = /^three(?=[A-Z])/;
function validateInstance(type, props) {
  const name = toPascalCase(type);
  const target = resolveConstructor(name);
  if (type !== "primitive" && !target) throw new Error(`R3F: ${name} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
  if (type === "primitive" && !props.object) throw new Error(`R3F: Primitives without 'object' are invalid!`);
  if (props.args !== void 0 && !Array.isArray(props.args)) throw new Error("R3F: The args prop must be an array!");
}
function createInstance(type, props, root) {
  var _props$object;
  type = hasConstructor(toPascalCase(type)) ? type : type.replace(PREFIX_REGEX, "");
  validateInstance(type, props);
  if (type === "primitive" && (_props$object = props.object) != null && _props$object.__r3f) delete props.object.__r3f;
  return prepare(props.object, root, type, props);
}
function hideInstance(instance) {
  if (!instance.isHidden) {
    var _instance$parent;
    if (instance.props.attach && (_instance$parent = instance.parent) != null && _instance$parent.object) {
      detach(instance.parent, instance);
    } else if (isObject3D(instance.object)) {
      instance.previousVisible = instance.object.visible;
      instance.object.visible = false;
    }
    instance.isHidden = true;
    invalidateInstance(instance);
  }
}
function unhideInstance(instance) {
  if (instance.isHidden) {
    var _instance$parent2;
    if (instance.props.attach && (_instance$parent2 = instance.parent) != null && _instance$parent2.object) {
      attach(instance.parent, instance);
    } else if (isObject3D(instance.object)) {
      var _instance$previousVis;
      instance.object.visible = (_instance$previousVis = instance.previousVisible) != null ? _instance$previousVis : true;
    }
    instance.previousVisible = void 0;
    instance.isHidden = false;
    invalidateInstance(instance);
  }
}
function handleContainerEffects(parent, child, beforeChild) {
  const state2 = child.root.getState();
  if (!parent.parent && parent.object !== state2.scene) return;
  if (!child.object) {
    var _child$props$object, _child$props$args;
    const target = resolveConstructor(toPascalCase(child.type));
    child.object = (_child$props$object = child.props.object) != null ? _child$props$object : new target(...(_child$props$args = child.props.args) != null ? _child$props$args : []);
    child.object.__r3f = child;
  }
  applyProps(child.object, child.props);
  if (child.props.attach) {
    attach(parent, child);
  } else if (isObject3D(child.object) && isObject3D(parent.object)) {
    const childIndex = parent.object.children.indexOf(beforeChild == null ? void 0 : beforeChild.object);
    if (beforeChild && childIndex !== -1) {
      const existingIndex = parent.object.children.indexOf(child.object);
      if (existingIndex !== -1) {
        parent.object.children.splice(existingIndex, 1);
        const adjustedIndex = existingIndex < childIndex ? childIndex - 1 : childIndex;
        parent.object.children.splice(adjustedIndex, 0, child.object);
      } else {
        child.object.parent = parent.object;
        parent.object.children.splice(childIndex, 0, child.object);
        child.object.dispatchEvent({
          type: "added"
        });
        parent.object.dispatchEvent({
          type: "childadded",
          child: child.object
        });
      }
    } else {
      parent.object.add(child.object);
    }
  }
  for (const childInstance of child.children) handleContainerEffects(child, childInstance);
  invalidateInstance(child);
}
function appendChild(parent, child) {
  if (!child) return;
  if (child.parent === parent) {
    const childIndex = parent.children.indexOf(child);
    if (childIndex !== -1) parent.children.splice(childIndex, 1);
  }
  child.parent = parent;
  parent.children.push(child);
  handleContainerEffects(parent, child);
}
function insertBefore(parent, child, beforeChild) {
  if (!child || !beforeChild) return;
  if (child.parent === parent) {
    const childIndex2 = parent.children.indexOf(child);
    if (childIndex2 !== -1) parent.children.splice(childIndex2, 1);
  }
  child.parent = parent;
  const childIndex = parent.children.indexOf(beforeChild);
  if (childIndex !== -1) parent.children.splice(childIndex, 0, child);
  else parent.children.push(child);
  handleContainerEffects(parent, child, beforeChild);
}
function disposeOnIdle(object) {
  if (typeof object.dispose === "function") {
    const handleDispose = () => {
      try {
        object.dispose();
      } catch {
      }
    };
    if (typeof IS_REACT_ACT_ENVIRONMENT !== "undefined") handleDispose();
    else schedulerExports.unstable_scheduleCallback(schedulerExports.unstable_IdlePriority, handleDispose);
  }
}
function removeChild(parent, child, dispose2) {
  if (!child) return;
  const wasLinked = !!child.parent;
  child.parent = null;
  const childIndex = parent.children.indexOf(child);
  if (childIndex !== -1) parent.children.splice(childIndex, 1);
  if (child.props.attach) {
    detach(parent, child);
  } else if (isObject3D(child.object) && isObject3D(parent.object)) {
    parent.object.remove(child.object);
    removeInteractivity(findInitialRoot(child), child.object);
  }
  const shouldDispose = child.props.dispose !== null && dispose2 !== false;
  for (let i2 = child.children.length - 1; i2 >= 0; i2--) {
    const node = child.children[i2];
    removeChild(child, node, shouldDispose);
  }
  child.children.length = 0;
  delete child.object.__r3f;
  if (shouldDispose && child.type !== "primitive" && child.object.type !== "Scene") {
    disposeOnIdle(child.object);
  }
  if (dispose2 === void 0 && wasLinked) {
    var _child$root;
    const state2 = (_child$root = child.root) == null ? void 0 : _child$root.getState == null ? void 0 : _child$root.getState();
    if (state2 && state2.internal.frames === 0) state2.invalidate();
  }
}
function setFiberRef(fiber, publicInstance) {
  for (const _fiber of [fiber, fiber.alternate]) {
    if (_fiber !== null) {
      if (typeof _fiber.ref === "function") {
        _fiber.refCleanup == null ? void 0 : _fiber.refCleanup();
        const cleanup = _fiber.ref(publicInstance);
        if (typeof cleanup === "function") _fiber.refCleanup = cleanup;
      } else if (_fiber.ref) {
        _fiber.ref.current = publicInstance;
      }
    }
  }
}
const reconstructed = [];
function flushReconstructedInstances() {
  if (reconstructed.length === 0) return;
  try {
    swapReconstructedInstances();
  } finally {
    reconstructed.length = 0;
  }
}
function swapReconstructedInstances() {
  for (const [instance] of reconstructed) {
    const parent = instance.parent;
    if (parent) {
      if (instance.props.attach) {
        detach(parent, instance);
      } else if (isObject3D(instance.object) && isObject3D(parent.object)) {
        parent.object.remove(instance.object);
      }
      for (const child of instance.children) {
        if (child.props.attach) {
          detach(instance, child);
        } else if (isObject3D(child.object) && isObject3D(instance.object)) {
          instance.object.remove(child.object);
        }
      }
    }
    if (instance.isHidden) unhideInstance(instance);
    if (instance.object.__r3f) delete instance.object.__r3f;
    if (instance.type !== "primitive") disposeOnIdle(instance.object);
  }
  for (const [instance, props, fiber] of reconstructed) {
    instance.props = props;
    const parent = instance.parent;
    if (parent) {
      var _instance$props$objec, _instance$props$args;
      const target = resolveConstructor(toPascalCase(instance.type));
      const prevObject = instance.object;
      instance.object = (_instance$props$objec = instance.props.object) != null ? _instance$props$objec : new target(...(_instance$props$args = instance.props.args) != null ? _instance$props$args : []);
      instance.object.__r3f = instance;
      setFiberRef(fiber, instance.object);
      swapInteractivity(findInitialRoot(instance), prevObject, instance.object);
      applyProps(instance.object, instance.props);
      if (instance.props.attach) {
        attach(parent, instance);
      } else if (isObject3D(instance.object) && isObject3D(parent.object)) {
        parent.object.add(instance.object);
      }
      for (const child of instance.children) {
        if (child.props.attach) {
          attach(instance, child);
        } else if (isObject3D(child.object) && isObject3D(instance.object)) {
          instance.object.add(child.object);
        }
      }
      invalidateInstance(instance);
    }
  }
}
const handleTextInstance = () => {
};
const NO_CONTEXT = {};
let currentUpdatePriority = NoEventPriority;
function getEventPriority(type) {
  switch (type) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return e;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return o;
    case "message": {
      switch (schedulerExports.unstable_getCurrentPriorityLevel()) {
        case schedulerExports.unstable_ImmediatePriority:
          return e;
        case schedulerExports.unstable_UserBlockingPriority:
          return o;
        case schedulerExports.unstable_NormalPriority:
        case schedulerExports.unstable_LowPriority:
          return r;
        case schedulerExports.unstable_IdlePriority:
          return i$1;
        default:
          return r;
      }
    }
    default:
      return r;
  }
}
function scheduleMicrotask(callback) {
  if (typeof queueMicrotask === "function") {
    queueMicrotask(callback);
  } else if (typeof Promise !== "undefined") {
    Promise.resolve().then(callback).catch((error) => {
      setTimeout(() => {
        throw error;
      });
    });
  } else {
    setTimeout(callback);
  }
}
const reconciler = /* @__PURE__ */ createReconciler({
  isPrimaryRenderer: false,
  warnsIfNotActing: false,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  createInstance,
  removeChild,
  appendChild,
  appendInitialChild: appendChild,
  insertBefore,
  appendChildToContainer(container, child) {
    const scene = container.getState().scene.__r3f;
    if (!child || !scene) return;
    appendChild(scene, child);
  },
  removeChildFromContainer(container, child) {
    const scene = container.getState().scene.__r3f;
    if (!child || !scene) return;
    removeChild(scene, child);
  },
  insertInContainerBefore(container, child, beforeChild) {
    const scene = container.getState().scene.__r3f;
    if (!child || !beforeChild || !scene) return;
    insertBefore(scene, child, beforeChild);
  },
  getRootHostContext: () => NO_CONTEXT,
  getChildHostContext: () => NO_CONTEXT,
  commitUpdate(instance, type, oldProps, newProps, fiber) {
    var _newProps$args, _oldProps$args, _newProps$args2;
    validateInstance(type, newProps);
    let reconstruct = false;
    if (instance.type === "primitive" && oldProps.object !== newProps.object) reconstruct = true;
    else if (((_newProps$args = newProps.args) == null ? void 0 : _newProps$args.length) !== ((_oldProps$args = oldProps.args) == null ? void 0 : _oldProps$args.length)) reconstruct = true;
    else if ((_newProps$args2 = newProps.args) != null && _newProps$args2.some((value, index) => {
      var _oldProps$args2;
      return value !== ((_oldProps$args2 = oldProps.args) == null ? void 0 : _oldProps$args2[index]);
    })) reconstruct = true;
    if (reconstruct) {
      reconstructed.push([instance, getInstanceProps(newProps), fiber]);
    } else {
      const changedProps = diffProps(instance, newProps);
      const attach2 = instance.props.attach;
      instance.props = getInstanceProps(newProps);
      if (attach2 !== void 0) instance.props.attach = attach2;
      else delete instance.props.attach;
      if (Object.keys(changedProps).length) applyProps(instance.object, changedProps);
    }
  },
  finalizeInitialChildren: () => false,
  commitMount() {
  },
  getPublicInstance: (instance) => instance == null ? void 0 : instance.object,
  prepareForCommit: () => null,
  preparePortalMount: (container) => prepare(container.getState().scene, container, "", {}),
  // Reconstructed instances are swapped once all mutations are committed,
  // before layout effects run so refs point to the new objects
  resetAfterCommit: flushReconstructedInstances,
  shouldSetTextContent: () => false,
  clearContainer: () => false,
  hideInstance,
  unhideInstance,
  createTextInstance: handleTextInstance,
  hideTextInstance: handleTextInstance,
  unhideTextInstance: handleTextInstance,
  // Mirrors react-dom, which flushes discrete work in microtasks
  supportsMicrotasks: true,
  scheduleMicrotask,
  scheduleTimeout: typeof setTimeout === "function" ? setTimeout : void 0,
  cancelTimeout: typeof clearTimeout === "function" ? clearTimeout : void 0,
  noTimeout: -1,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur() {
  },
  afterActiveInstanceBlur() {
  },
  detachDeletedInstance() {
  },
  prepareScopeUpdate() {
  },
  getInstanceFromScope: () => null,
  shouldAttemptEagerTransition: () => false,
  trackSchedulerEvent: () => {
  },
  resolveEventType: () => null,
  resolveEventTimeStamp: () => -1.1,
  requestPostPaintCallback() {
  },
  maySuspendCommit: () => false,
  preloadInstance: () => true,
  // true indicates already loaded
  suspendInstance() {
  },
  waitForCommitToBeReady: () => null,
  NotPendingTransition: null,
  // The reconciler types use the internal ReactContext with all the hidden properties
  // so we have to cast from the public React.Context type
  HostTransitionContext: /* @__PURE__ */ reactExports.createContext(null),
  setCurrentUpdatePriority(newPriority) {
    currentUpdatePriority = newPriority;
  },
  getCurrentUpdatePriority() {
    return currentUpdatePriority;
  },
  resolveUpdatePriority() {
    var _window$event;
    if (currentUpdatePriority !== NoEventPriority) return currentUpdatePriority;
    const eventType = typeof window !== "undefined" ? (_window$event = window.event) == null ? void 0 : _window$event.type : void 0;
    if (eventType === void 0) return r;
    return getEventPriority(eventType);
  },
  resetFormInstance() {
  },
  // @ts-ignore DefinitelyTyped is not up to date
  rendererPackageName: "@react-three/fiber",
  rendererVersion: packageData.version,
  // https://github.com/facebook/react/pull/31975
  // https://github.com/facebook/react/pull/31999
  applyViewTransitionName(_instance, _name, _className) {
  },
  restoreViewTransitionName(_instance, _props) {
  },
  cancelViewTransitionName(_instance, _name, _props) {
  },
  cancelRootViewTransitionName(_rootContainer) {
  },
  restoreRootViewTransitionName(_rootContainer) {
  },
  InstanceMeasurement: null,
  measureInstance: (_instance) => null,
  wasInstanceInViewport: (_measurement) => true,
  hasInstanceChanged: (_oldMeasurement, _newMeasurement) => false,
  hasInstanceAffectedParent: (_oldMeasurement, _newMeasurement) => false,
  // https://github.com/facebook/react/pull/32002
  // https://github.com/facebook/react/pull/34486
  suspendOnActiveViewTransition(_state, _container) {
  },
  // https://github.com/facebook/react/pull/32451
  // https://github.com/facebook/react/pull/32760
  // React hands the whole commit to the host when a transition touches a <ViewTransition> subtree.
  // three.js has nothing to animate between commits, so this mirrors the react-dom fallback for
  // browsers without document.startViewTransition and flushes the commit synchronously.
  startViewTransition(_suspendedState, _rootContainer, _transitionTypes, mutationCallback, layoutCallback, _afterMutationCallback, spawnedWorkCallback, _passiveCallback, _errorCallback, _blockedCallback, finishedAnimation) {
    mutationCallback();
    layoutCallback();
    finishedAnimation == null ? void 0 : finishedAnimation();
    spawnedWorkCallback();
    return null;
  },
  startGestureTransition(_suspendedState, _rootContainer, _timeline, _rangeStart, _rangeEnd, _transitionTypes, mutationCallback, animateCallback, _errorCallback, finishedAnimation) {
    mutationCallback();
    animateCallback();
    finishedAnimation == null ? void 0 : finishedAnimation();
    return null;
  },
  stopViewTransition(_transition) {
  },
  // https://github.com/facebook/react/pull/35564
  addViewTransitionFinishedListener(_transition, callback) {
    callback();
  },
  // https://github.com/facebook/react/pull/32038
  createViewTransitionInstance: (_name) => null,
  // https://github.com/facebook/react/pull/32379
  // https://github.com/facebook/react/pull/32786
  getCurrentGestureOffset(_provider) {
    throw new Error("startGestureTransition is not yet supported in react-three-fiber.");
  },
  // https://github.com/facebook/react/pull/32500
  cloneMutableInstance(instance, _keepChildren) {
    return instance;
  },
  cloneMutableTextInstance(textInstance) {
    return textInstance;
  },
  cloneRootViewTransitionContainer(_rootContainer) {
    throw new Error("Not implemented.");
  },
  removeRootViewTransitionClone(_rootContainer, _clone) {
    throw new Error("Not implemented.");
  },
  // https://github.com/facebook/react/pull/32465
  createFragmentInstance: (_fiber) => null,
  updateFragmentInstanceFiber(_fiber, _instance) {
  },
  commitNewChildToFragmentInstance(_child, _fragmentInstance) {
  },
  deleteChildFromFragmentInstance(_child, _fragmentInstance) {
  },
  // https://github.com/facebook/react/pull/32653
  measureClonedInstance: (_instance) => null,
  // https://github.com/facebook/react/pull/32819
  maySuspendCommitOnUpdate: (_type, _oldProps, _newProps) => false,
  maySuspendCommitInSyncRender: (_type, _props) => false,
  // https://github.com/facebook/react/pull/34486
  startSuspendingCommit: () => null,
  // https://github.com/facebook/react/pull/34522
  getSuspendedCommitReason: (_state, _rootContainer) => null
});
const _roots = /* @__PURE__ */ new Map();
function transitionRoot(root, event) {
  const state2 = root.state;
  switch (event.type) {
    case "use":
      if (state2.status === "disposed") return false;
      root.state = {
        status: "open"
      };
      return true;
    case "unmount":
      if (state2.status === "disposed") return false;
      root.state = {
        status: "closing",
        token: event.token
      };
      return true;
    case "dispose":
      if (state2.status !== "closing" || state2.token !== event.token) return false;
      root.state = {
        status: "disposed"
      };
      return true;
  }
}
function createRoot(canvas) {
  const prevRoot = _roots.get(canvas);
  const prevFiber = prevRoot == null ? void 0 : prevRoot.fiber;
  const prevStore = prevRoot == null ? void 0 : prevRoot.store;
  if (prevRoot) console.warn("R3F.createRoot should only be called once!");
  const logRecoverableError = typeof reportError === "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : (
    // In older browsers and test environments, fallback to console.error.
    console.error
  );
  const store = prevStore || createStore(invalidate, advance);
  const fiber = prevFiber || reconciler.createContainer(
    store,
    // container
    t,
    // tag
    null,
    // hydration callbacks
    false,
    // isStrictMode
    null,
    // concurrentUpdatesByDefaultOverride
    "",
    // identifierPrefix
    logRecoverableError,
    // onUncaughtError
    logRecoverableError,
    // onCaughtError
    logRecoverableError,
    // onRecoverableError
    null
    // transitionCallbacks
  );
  const root = prevRoot || {
    fiber,
    store,
    state: {
      status: "open"
    },
    ready: fulfilled(void 0),
    configuration: {},
    ownsRenderer: false
  };
  if (!prevRoot) _roots.set(canvas, root);
  let mounted = false;
  return {
    get ready() {
      return root.ready;
    },
    configure(props = {}) {
      if (!transitionRoot(root, {
        type: "use"
      })) {
        return rejected(new Error("R3F: Cannot configure a root after disposal has started."));
      }
      const previous = root.ready;
      const {
        promise,
        resolve: resolve2,
        reject
      } = deferred();
      root.ready = promise;
      const apply = (gl) => {
        const state2 = store.getState();
        if (!state2.gl) {
          root.ownsRenderer = !isRenderer(props.gl);
          state2.set({
            gl
          });
        }
        applyRootConfiguration(root, canvas, props);
        if (!root.unwatchDpr && (props.dpr === void 0 || Array.isArray(props.dpr))) root.unwatchDpr = followDpr(root);
        resolve2(this);
      };
      const run2 = () => {
        try {
          var _store$getState$gl;
          const gl = (_store$getState$gl = store.getState().gl) != null ? _store$getState$gl : createRenderer(canvas, props.gl);
          if (isPromiseLike(gl)) Promise.resolve(gl).then(apply).catch(reject);
          else apply(gl);
        } catch (error) {
          reject(error);
        }
      };
      if (previous.status === "pending") previous.then(run2, reject);
      else run2();
      return promise;
    },
    render(children) {
      if (!transitionRoot(root, {
        type: "use"
      })) return store;
      if (!store.getState().gl && root.ready.status === "fulfilled") this.configure();
      if (root.ready.status === "rejected") throw root.ready.reason;
      const commit = () => {
        var _root$configuration$p;
        if (root.state.status !== "open" || root.ready.status === "rejected") return;
        if (root.ready.status === "pending") {
          root.ready.then(commit, logRecoverableError);
          return;
        }
        const onCreated = (_root$configuration$p = root.configuration.previous) == null ? void 0 : _root$configuration$p.onCreated;
        const element = /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, {
          store,
          children,
          onCreated,
          rootElement: canvas
        });
        if (mounted) {
          reconciler.updateContainer(element, fiber, null, noop);
          return;
        }
        mounted = true;
        reconciler.updateContainerSync(element, fiber, null, noop);
        reconciler.flushSyncWork();
      };
      commit();
      return store;
    },
    unmount() {
      if (_roots.get(canvas) === root) unmountComponentAtNode(canvas);
    }
  };
}
function Provider({
  store,
  children,
  onCreated,
  rootElement
}) {
  useIsomorphicLayoutEffect(() => {
    const state2 = store.getState();
    state2.set((state3) => ({
      internal: {
        ...state3.internal,
        active: true
      }
    }));
    if (onCreated) onCreated(state2);
    if (!store.getState().events.connected) state2.events.connect == null ? void 0 : state2.events.connect(rootElement);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(context.Provider, {
    value: store,
    children
  });
}
function attempt(step) {
  try {
    return step();
  } catch (error) {
    console.warn("[R3F] Error while unmounting root; teardown may be incomplete:", error);
  }
}
function unmountComponentAtNode(canvas, callback) {
  const root = _roots.get(canvas);
  const token = /* @__PURE__ */ Symbol("unmount");
  if (!root || !transitionRoot(root, {
    type: "unmount",
    token
  })) return;
  const teardown = () => {
    var _state$gl;
    if (root.ready.status === "pending") {
      root.ready.then(teardown, teardown);
      return;
    }
    if (!transitionRoot(root, {
      type: "dispose",
      token
    })) return;
    _roots.delete(canvas);
    const state2 = root.store.getState();
    state2.internal.active = false;
    attempt(() => root.unwatchDpr == null ? void 0 : root.unwatchDpr());
    attempt(() => state2.events.disconnect == null ? void 0 : state2.events.disconnect());
    if ((_state$gl = state2.gl) != null && _state$gl.xr) attempt(() => state2.xr.disconnect());
    if (state2.scene) attempt(() => dispose(state2.scene));
    const disposal = attempt(() => releaseRenderer(state2.gl, root.ownsRenderer));
    if (isPromiseLike(disposal)) disposal.then(() => void 0);
  };
  reconciler.updateContainer(null, root.fiber, null, () => {
    if (root.state.status !== "closing" || root.state.token !== token) return;
    reconciler.updateContainer(null, root.fiber, null, teardown);
  });
}
const globalEffects = /* @__PURE__ */ new Set();
const globalAfterEffects = /* @__PURE__ */ new Set();
const globalTailEffects = /* @__PURE__ */ new Set();
function run(effects, timestamp) {
  if (!effects.size) return;
  for (const {
    callback
  } of effects.values()) {
    callback(timestamp);
  }
}
function flushGlobalEffects(type, timestamp) {
  switch (type) {
    case "before":
      return run(globalEffects, timestamp);
    case "after":
      return run(globalAfterEffects, timestamp);
    case "tail":
      return run(globalTailEffects, timestamp);
  }
}
let subscribers;
let subscription;
function update(timestamp, state2, frame2) {
  let delta = state2.clock.getDelta();
  if (state2.frameloop === "never" && typeof timestamp === "number") {
    delta = timestamp - state2.clock.elapsedTime;
    state2.clock.oldTime = state2.clock.elapsedTime;
    state2.clock.elapsedTime = timestamp;
  }
  subscribers = state2.internal.subscribers;
  for (let i2 = 0; i2 < subscribers.length; i2++) {
    subscription = subscribers[i2];
    subscription.ref.current(subscription.store.getState(), delta, frame2);
  }
  if (!state2.internal.priority && state2.gl.render) state2.gl.render(state2.scene, state2.camera);
  state2.internal.frames = Math.max(0, state2.internal.frames - 1);
  return state2.frameloop === "always" ? 1 : state2.internal.frames;
}
let running = false;
let useFrameInProgress = false;
let repeat;
let frame;
let state;
function loop(timestamp) {
  frame = requestAnimationFrame(loop);
  running = true;
  repeat = 0;
  flushGlobalEffects("before", timestamp);
  useFrameInProgress = true;
  for (const root of _roots.values()) {
    var _state$gl$xr;
    state = root.store.getState();
    if (state.internal.active && (state.frameloop === "always" || state.internal.frames > 0) && !((_state$gl$xr = state.gl.xr) != null && _state$gl$xr.isPresenting)) {
      repeat += update(timestamp, state);
    }
  }
  useFrameInProgress = false;
  flushGlobalEffects("after", timestamp);
  if (repeat === 0) {
    flushGlobalEffects("tail", timestamp);
    running = false;
    return cancelAnimationFrame(frame);
  }
}
function invalidate(state2, frames = 1) {
  var _state$gl$xr2;
  if (!state2) return _roots.forEach((root) => invalidate(root.store.getState(), frames));
  if ((_state$gl$xr2 = state2.gl.xr) != null && _state$gl$xr2.isPresenting || !state2.internal.active || state2.frameloop === "never") return;
  if (frames > 1) {
    state2.internal.frames = Math.min(60, state2.internal.frames + frames);
  } else {
    if (useFrameInProgress) {
      state2.internal.frames = 2;
    } else {
      state2.internal.frames = 1;
    }
  }
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
}
function advance(timestamp, runGlobalEffects = true, state2, frame2) {
  if (runGlobalEffects) flushGlobalEffects("before", timestamp);
  if (!state2) for (const root of _roots.values()) update(timestamp, root.store.getState());
  else update(timestamp, state2, frame2);
  if (runGlobalEffects) flushGlobalEffects("after", timestamp);
}
const DOM_EVENTS = {
  onClick: ["click", false],
  onContextMenu: ["contextmenu", false],
  onDoubleClick: ["dblclick", false],
  onWheel: ["wheel", true],
  onPointerDown: ["pointerdown", true],
  onPointerUp: ["pointerup", true],
  onPointerLeave: ["pointerleave", true],
  onPointerMove: ["pointermove", true],
  onPointerCancel: ["pointercancel", true],
  onLostPointerCapture: ["lostpointercapture", true]
};
function createPointerEvents(store) {
  const {
    handlePointer
  } = createEvents(store);
  return {
    priority: 1,
    enabled: true,
    compute(event, state2, previous) {
      state2.pointer.set(event.offsetX / state2.size.width * 2 - 1, -(event.offsetY / state2.size.height) * 2 + 1);
      state2.raycaster.setFromCamera(state2.pointer, state2.camera);
    },
    connected: void 0,
    handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
      ...acc,
      [key]: handlePointer(key)
    }), {}),
    update: () => {
      var _internal$lastEvent;
      const {
        events,
        internal
      } = store.getState();
      if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
    },
    connect: (target) => {
      const {
        set,
        events
      } = store.getState();
      events.disconnect == null ? void 0 : events.disconnect();
      set((state2) => ({
        events: {
          ...state2.events,
          connected: target
        }
      }));
      if (events.handlers) {
        for (const name in events.handlers) {
          const event = events.handlers[name];
          const [eventName, passive] = DOM_EVENTS[name];
          target.addEventListener(eventName, event, {
            passive
          });
        }
      }
    },
    disconnect: () => {
      const {
        set,
        events
      } = store.getState();
      if (events.connected) {
        if (events.handlers) {
          for (const name in events.handlers) {
            const event = events.handlers[name];
            const [eventName] = DOM_EVENTS[name];
            events.connected.removeEventListener(eventName, event);
          }
        }
        set((state2) => ({
          events: {
            ...state2.events,
            connected: void 0
          }
        }));
      }
    }
  };
}
function CanvasImpl({
  ref,
  children,
  fallback,
  resize,
  style,
  gl,
  events = createPointerEvents,
  eventSource,
  eventPrefix,
  shadows,
  linear,
  flat,
  legacy,
  orthographic,
  frameloop,
  dpr,
  performance,
  raycaster,
  camera,
  scene,
  onPointerMissed,
  onCreated,
  ...props
}) {
  reactExports.useMemo(() => extend(THREE), []);
  const Bridge = useBridge();
  const [containerRef, containerRect] = j({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = reactExports.useRef(null);
  const divRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => canvasRef.current);
  const handlePointerMissed = useMutableCallback(onPointerMissed);
  const pointerMissed = reactExports.useCallback((event) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(event), [handlePointerMissed]);
  const [block, setBlock] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  if (block) throw block;
  if (error) throw error;
  const root = reactExports.useRef(null);
  const [gate, waitFor] = useGate();
  const rootState = reactExports.useRef(null);
  const eventTarget = () => eventSource ? isRef(eventSource) ? eventSource.current : eventSource : divRef.current;
  reactExports.useInsertionEffect(() => {
    return () => {
      const current = root.current;
      root.current = null;
      current == null ? void 0 : current.unmount();
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
      if (!root.current) root.current = createRoot(canvas);
      root.current.configure({
        gl,
        scene,
        events,
        shadows,
        linear,
        flat,
        legacy,
        orthographic,
        frameloop,
        dpr,
        performance,
        raycaster,
        camera,
        size: containerRect,
        // Forwards to the latest onPointerMissed, so a new callback does not update the store
        onPointerMissed: pointerMissed,
        onCreated: (state2) => {
          var _eventTarget;
          rootState.current = state2;
          state2.events.connect == null ? void 0 : state2.events.connect((_eventTarget = eventTarget()) != null ? _eventTarget : divRef.current);
          if (eventPrefix) {
            state2.setEvents({
              compute: (event, state3) => {
                const x = event[eventPrefix + "X"];
                const y = event[eventPrefix + "Y"];
                state3.pointer.set(x / state3.size.width * 2 - 1, -(y / state3.size.height) * 2 + 1);
                state3.raycaster.setFromCamera(state3.pointer, state3.camera);
              }
            });
          }
          onCreated == null ? void 0 : onCreated(state2);
        }
      }).catch(setError);
      if (root.current.ready.status === "fulfilled") {
        root.current.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Bridge, {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, {
            set: setError,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Block, {
                set: setBlock
              }),
              children: children != null ? children : null
            })
          })
        }));
      } else if (root.current.ready.status === "pending") {
        waitFor(root.current.ready);
      }
    }
  });
  reactExports.useEffect(() => {
    var _rootState$current;
    const state2 = (_rootState$current = rootState.current) == null ? void 0 : _rootState$current.get();
    const target = eventTarget();
    if (state2 && target && state2.events.connected !== target) state2.events.connect == null ? void 0 : state2.events.connect(target);
  });
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      var _root$current;
      if (!canvas.isConnected) (_root$current = root.current) == null ? void 0 : _root$current.unmount();
    };
  }, []);
  const pointerEvents = eventSource ? "none" : "auto";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    ref: divRef,
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents,
      ...style
    },
    ...props,
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      ref: containerRef,
      style: {
        width: "100%",
        height: "100%"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", {
        ref: canvasRef,
        style: {
          display: "block"
        },
        children: fallback
      })
    }), gate]
  });
}
function Canvas(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(h, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CanvasImpl, {
      ...props
    })
  });
}
export {
  Canvas as C,
  useThree as a,
  useFrame as u
};
