import { R as React } from "./react.mjs";
/* @__PURE__ */ (() => {
  var e, t;
  return typeof window != "undefined" && (((e = window.document) == null ? void 0 : e.createElement) || ((t = window.navigator) == null ? void 0 : t.product) === "ReactNative");
})() ? React.useLayoutEffect : React.useEffect;
function l(e, t, i) {
  if (!e) return;
  if (i(e) === true) return e;
  let n = t ? e.return : e.child;
  for (; n; ) {
    const o = l(n, t, i);
    if (o) return o;
    n = t ? null : n.sibling;
  }
}
function b(e) {
  try {
    return Object.defineProperties(e, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch (t) {
    return e;
  }
}
const p = /* @__PURE__ */ b(/* @__PURE__ */ React.createContext(null));
class h extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement(p.Provider, { value: this._reactInternals }, this.props.children);
  }
}
function m() {
  const e = React.useContext(p);
  if (e === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const t = React.useId();
  return React.useMemo(() => {
    for (const n of [e, e == null ? void 0 : e.alternate]) {
      if (!n) continue;
      const o = l(n, false, (d) => {
        let s = d.memoizedState;
        for (; s; ) {
          if (s.memoizedState === t) return true;
          s = s.next;
        }
      });
      if (o) return o;
    }
  }, [e, t]);
}
const w = /* @__PURE__ */ Symbol.for("react.context"), E = (e) => e !== null && typeof e == "object" && "$$typeof" in e && e.$$typeof === w;
function g() {
  const e = m(), [t] = React.useState(() => /* @__PURE__ */ new Map());
  t.clear();
  let i = e;
  for (; i; ) {
    const n = i.type;
    E(n) && n !== p && !t.has(n) && t.set(n, React.use(b(n))), i = i.return;
  }
  return t;
}
function M() {
  const e = g();
  return React.useMemo(
    () => Array.from(e.keys()).reduce(
      (t, i) => (n) => /* @__PURE__ */ React.createElement(t, null, /* @__PURE__ */ React.createElement(i.Provider, { ...n, value: e.get(i) })),
      (t) => /* @__PURE__ */ React.createElement(h, { ...t })
    ),
    [e]
  );
}
function x(e) {
  if (typeof requestAnimationFrame == "function") {
    const i = requestAnimationFrame(e);
    return () => cancelAnimationFrame(i);
  }
  const t = setTimeout(e, 16);
  return () => clearTimeout(t);
}
function N() {
  if (!React.Activity) throw new Error("its-fine: useActivityBridge requires React 19.2 or later!");
  const e = m(), [t] = React.useState(() => {
    const i = [];
    let n = false;
    l(e, true, (u) => {
      var c, a;
      if (u.elementType === React.Activity) {
        const y = ((c = u.child) == null ? void 0 : c.tag) === 22 ? u.child.stateNode : null;
        if (typeof (y == null ? void 0 : y._visibility) != "number")
          throw new Error("its-fine: unsupported React Activity internals!");
        i.push(y);
      } else u.tag === 22 && ((a = u.return) == null ? void 0 : a.elementType) !== React.Activity && (n = true);
    });
    let o = "hidden";
    const d = /* @__PURE__ */ new Set();
    let s;
    const f = {
      mounted: false,
      connected: false,
      subscribe(u) {
        return d.add(u), () => {
          d.delete(u);
        };
      },
      sync(u) {
        f.mounted && !f.connected && n && i.length > 0 ? s || (s = x(() => {
          s = void 0, f.sync(true);
        })) : (s == null || s(), s = void 0);
        let c = o;
        if (f.mounted ? f.connected ? c = "visible" : u && (c = i.every((a) => (a._visibility & 1) !== 0) ? "visible" : "hidden") : c = "hidden", o !== c) {
          o = c;
          for (const a of d) a();
        }
      },
      Bridge({ children: u }) {
        return /* @__PURE__ */ React.createElement(
          React.Activity,
          {
            mode: React.useSyncExternalStore(
              f.subscribe,
              () => o,
              () => "hidden"
            )
          },
          u
        );
      }
    };
    return f;
  });
  return React.useInsertionEffect(() => (t.mounted = true, queueMicrotask(() => t.sync(false)), () => {
    t.mounted = false, queueMicrotask(() => t.sync(false));
  }), [t]), React.useLayoutEffect(() => (t.connected = true, t.sync(false), () => {
    t.connected = false, t.sync(true);
  }), [t]), t.Bridge;
}
export {
  M,
  N,
  h,
  l,
  m
};
