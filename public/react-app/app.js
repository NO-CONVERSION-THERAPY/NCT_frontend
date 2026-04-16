//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function te(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ne(e, t) {
		return te(e.type, t, e.props);
	}
	function T(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function E(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var re = /\/+/g;
	function ie(e, t) {
		return typeof e == "object" && e && e.key != null ? E("" + e.key) : t.toString(36);
	}
	function D(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ae(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ae(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ie(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(re, "$&/") + "/"), ae(o, r, i, "", function(e) {
			return e;
		})) : o != null && (T(o) && (o = ne(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(re, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ie(a, u), c += ae(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ie(a, u++), c += ae(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ae(D(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function O(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ae(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function k(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var A = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, j = {
		map: O,
		forEach: function(e, t, n) {
			O(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return O(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return O(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!T(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = j, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return te(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return te(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = T, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: k
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, A);
		} catch (e) {
			A(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.5";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, T());
		else {
			var t = n(l);
			t !== null && ie(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ie(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? T() : S = !1;
			}
		}
	}
	var T;
	if (typeof y == "function") T = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var E = new MessageChannel(), re = E.port2;
		E.port1.onmessage = ne, T = function() {
			re.postMessage(null);
		};
	} else T = function() {
		_(ne, 0);
	};
	function ie(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ie(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, T()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.5";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), re = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
	function D(e) {
		return typeof e != "object" || !e ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ae = Symbol.for("react.client.reference");
	function O(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case te: return "SuspenseList";
			case E: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ne: return t = e.displayName || null, t === null ? O(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return O(e(t));
				} catch {}
		}
		return null;
	}
	var k = Array.isArray, A = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, M = [], N = -1;
	function se(e) {
		return { current: e };
	}
	function ce(e) {
		0 > N || (e.current = M[N], M[N] = null, N--);
	}
	function P(e, t) {
		N++, M[N] = e.current, e.current = t;
	}
	var le = se(null), ue = se(null), de = se(null), fe = se(null);
	function pe(e, t) {
		switch (P(de, t), P(ue, e), P(le, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Hd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Hd(t), e = Ud(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		ce(le), P(le, e);
	}
	function me() {
		ce(le), ce(ue), ce(de);
	}
	function he(e) {
		e.memoizedState !== null && P(fe, e);
		var t = le.current, n = Ud(t, e.type);
		t !== n && (P(ue, e), P(le, n));
	}
	function F(e) {
		ue.current === e && (ce(le), ce(ue)), fe.current === e && (ce(fe), $f._currentValue = oe);
	}
	var ge, _e;
	function ve(e) {
		if (ge === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ge = t && t[1] || "", _e = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ge + e + _e;
	}
	var ye = !1;
	function be(e, t) {
		if (!e || ye) return "";
		ye = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ye = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? ve(n) : "";
	}
	function xe(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return ve(e.type);
			case 16: return ve("Lazy");
			case 13: return e.child !== t && t !== null ? ve("Suspense Fallback") : ve("Suspense");
			case 19: return ve("SuspenseList");
			case 0:
			case 15: return be(e.type, !1);
			case 11: return be(e.type.render, !1);
			case 1: return be(e.type, !0);
			case 31: return ve("Activity");
			default: return "";
		}
	}
	function Se(e) {
		try {
			var t = "", n = null;
			do
				t += xe(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ce = Object.prototype.hasOwnProperty, we = t.unstable_scheduleCallback, Te = t.unstable_cancelCallback, Ee = t.unstable_shouldYield, De = t.unstable_requestPaint, Oe = t.unstable_now, ke = t.unstable_getCurrentPriorityLevel, Ae = t.unstable_ImmediatePriority, je = t.unstable_UserBlockingPriority, Me = t.unstable_NormalPriority, Ne = t.unstable_LowPriority, Pe = t.unstable_IdlePriority, Fe = t.log, Ie = t.unstable_setDisableYieldValue, Le = null, Re = null;
	function ze(e) {
		if (typeof Fe == "function" && Ie(e), Re && typeof Re.setStrictMode == "function") try {
			Re.setStrictMode(Le, e);
		} catch {}
	}
	var Be = Math.clz32 ? Math.clz32 : Ue, Ve = Math.log, He = Math.LN2;
	function Ue(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ve(e) / He | 0) | 0;
	}
	var We = 256, Ge = 262144, Ke = 4194304;
	function qe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Je(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = qe(n))) : i = qe(o) : i = qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = qe(n))) : i = qe(o)) : i = qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ye(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Xe(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function I() {
		var e = Ke;
		return Ke <<= 1, !(Ke & 62914560) && (Ke = 4194304), e;
	}
	function Ze(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function R(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Qe(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Be(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && $e(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function $e(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Be(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function et(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Be(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function tt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : nt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function nt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
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
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function rt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function it() {
		var e = j.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e;
	}
	function at(e, t) {
		var n = j.p;
		try {
			return j.p = e, t();
		} finally {
			j.p = n;
		}
	}
	var ot = Math.random().toString(36).slice(2), st = "__reactFiber$" + ot, ct = "__reactProps$" + ot, lt = "__reactContainer$" + ot, ut = "__reactEvents$" + ot, dt = "__reactListeners$" + ot, ft = "__reactHandles$" + ot, pt = "__reactResources$" + ot, mt = "__reactMarker$" + ot;
	function ht(e) {
		delete e[st], delete e[ct], delete e[ut], delete e[dt], delete e[ft];
	}
	function gt(e) {
		var t = e[st];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[lt] || n[st]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ff(e); e !== null;) {
					if (n = e[st]) return n;
					e = ff(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function _t(e) {
		if (e = e[st] || e[lt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function vt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function yt(e) {
		var t = e[pt];
		return t ||= e[pt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function bt(e) {
		e[mt] = !0;
	}
	var xt = /* @__PURE__ */ new Set(), St = {};
	function z(e, t) {
		B(e, t), B(e + "Capture", t);
	}
	function B(e, t) {
		for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e]);
	}
	var Ct = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), wt = {}, Tt = {};
	function Et(e) {
		return Ce.call(Tt, e) ? !0 : Ce.call(wt, e) ? !1 : Ct.test(e) ? Tt[e] = !0 : (wt[e] = !0, !1);
	}
	function V(e, t, n) {
		if (Et(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Dt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Ot(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function kt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function At(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function jt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Mt(e) {
		if (!e._valueTracker) {
			var t = At(e) ? "checked" : "value";
			e._valueTracker = jt(e, t, "" + e[t]);
		}
	}
	function Nt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = At(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Pt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ft = /[\n"\\]/g;
	function It(e) {
		return e.replace(Ft, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Lt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + kt(t)) : e.value !== "" + kt(t) && (e.value = "" + kt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : zt(e, o, kt(n)) : zt(e, o, kt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + kt(s) : e.removeAttribute("name");
	}
	function Rt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Mt(e);
				return;
			}
			n = n == null ? "" : "" + kt(n), t = t == null ? n : "" + kt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Mt(e);
	}
	function zt(e, t, n) {
		t === "number" && Pt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Bt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + kt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Vt(e, t, n) {
		if (t != null && (t = "" + kt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + kt(n);
	}
	function Ht(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (k(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = kt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Mt(e);
	}
	function Ut(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Wt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Gt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Wt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Kt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Gt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Gt(e, o, t[o]);
	}
	function qt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Jt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), H = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Yt(e) {
		return H.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function U() {}
	var Xt = null;
	function Zt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Qt = null, $t = null;
	function en(e) {
		var t = _t(e);
		if (t && (e = t.stateNode)) {
			var n = e[ct] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Lt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + It("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ct] || null;
								if (!a) throw Error(i(90));
								Lt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Nt(r);
					}
					break a;
				case "textarea":
					Vt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Bt(e, !!n.multiple, t, !1);
			}
		}
	}
	var tn = !1;
	function nn(e, t, n) {
		if (tn) return e(t, n);
		tn = !0;
		try {
			return e(t);
		} finally {
			if (tn = !1, (Qt !== null || $t !== null) && (xu(), Qt && (t = Qt, e = $t, $t = Qt = null, en(t), e))) for (t = 0; t < e.length; t++) en(e[t]);
		}
	}
	function rn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ct] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var an = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), on = !1;
	if (an) try {
		var sn = {};
		Object.defineProperty(sn, "passive", { get: function() {
			on = !0;
		} }), window.addEventListener("test", sn, sn), window.removeEventListener("test", sn, sn);
	} catch {
		on = !1;
	}
	var cn = null, ln = null, un = null;
	function dn() {
		if (un) return un;
		var e, t = ln, n = t.length, r, i = "value" in cn ? cn.value : cn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return un = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function fn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function W() {
		return !0;
	}
	function pn() {
		return !1;
	}
	function mn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? W : pn, this.isPropagationStopped = pn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = W);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = W);
			},
			persist: function() {},
			isPersistent: W
		}), t;
	}
	var hn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, gn = mn(hn), _n = h({}, hn, {
		view: 0,
		detail: 0
	}), vn = mn(_n), yn, bn, xn, Sn = h({}, _n, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Nn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (yn = e.screenX - xn.screenX, bn = e.screenY - xn.screenY) : bn = yn = 0, xn = e), yn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : bn;
		}
	}), Cn = mn(Sn), wn = mn(h({}, Sn, { dataTransfer: 0 })), Tn = mn(h({}, _n, { relatedTarget: 0 })), En = mn(h({}, hn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Dn = mn(h({}, hn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), On = mn(h({}, hn, { data: 0 })), kn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, An = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, jn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Mn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = jn[e]) ? !!t[e] : !1;
	}
	function Nn() {
		return Mn;
	}
	var Pn = mn(h({}, _n, {
		key: function(e) {
			if (e.key) {
				var t = kn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = fn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? An[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Nn,
		charCode: function(e) {
			return e.type === "keypress" ? fn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? fn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Fn = mn(h({}, Sn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), In = mn(h({}, _n, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Nn
	})), Ln = mn(h({}, hn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = mn(h({}, Sn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), zn = mn(h({}, hn, {
		newState: 0,
		oldState: 0
	})), Bn = [
		9,
		13,
		27,
		32
	], Vn = an && "CompositionEvent" in window, Hn = null;
	an && "documentMode" in document && (Hn = document.documentMode);
	var Un = an && "TextEvent" in window && !Hn, Wn = an && (!Vn || Hn && 8 < Hn && 11 >= Hn), Gn = " ", Kn = !1;
	function qn(e, t) {
		switch (e) {
			case "keyup": return Bn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Jn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Yn = !1;
	function Xn(e, t) {
		switch (e) {
			case "compositionend": return Jn(t);
			case "keypress": return t.which === 32 ? (Kn = !0, Gn) : null;
			case "textInput": return e = t.data, e === Gn && Kn ? null : e;
			default: return null;
		}
	}
	function Zn(e, t) {
		if (Yn) return e === "compositionend" || !Vn && qn(e, t) ? (e = dn(), un = ln = cn = null, Yn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Wn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Qn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function $n(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Qn[e.type] : t === "textarea";
	}
	function er(e, t, n, r) {
		Qt ? $t ? $t.push(r) : $t = [r] : Qt = r, t = Dd(t, "onChange"), 0 < t.length && (n = new gn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var tr = null, nr = null;
	function rr(e) {
		bd(e, 0);
	}
	function ir(e) {
		if (Nt(vt(e))) return e;
	}
	function ar(e, t) {
		if (e === "change") return t;
	}
	var or = !1;
	if (an) {
		var sr;
		if (an) {
			var cr = "oninput" in document;
			if (!cr) {
				var lr = document.createElement("div");
				lr.setAttribute("oninput", "return;"), cr = typeof lr.oninput == "function";
			}
			sr = cr;
		} else sr = !1;
		or = sr && (!document.documentMode || 9 < document.documentMode);
	}
	function ur() {
		tr && (tr.detachEvent("onpropertychange", dr), nr = tr = null);
	}
	function dr(e) {
		if (e.propertyName === "value" && ir(nr)) {
			var t = [];
			er(t, nr, e, Zt(e)), nn(rr, t);
		}
	}
	function fr(e, t, n) {
		e === "focusin" ? (ur(), tr = t, nr = n, tr.attachEvent("onpropertychange", dr)) : e === "focusout" && ur();
	}
	function pr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ir(nr);
	}
	function mr(e, t) {
		if (e === "click") return ir(t);
	}
	function hr(e, t) {
		if (e === "input" || e === "change") return ir(t);
	}
	function gr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var _r = typeof Object.is == "function" ? Object.is : gr;
	function vr(e, t) {
		if (_r(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ce.call(t, i) || !_r(e[i], t[i])) return !1;
		}
		return !0;
	}
	function yr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function br(e, t) {
		var n = yr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = yr(n);
		}
	}
	function xr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Sr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Pt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Pt(e.document);
		}
		return t;
	}
	function Cr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var wr = an && "documentMode" in document && 11 >= document.documentMode, Tr = null, Er = null, Dr = null, Or = !1;
	function kr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Or || Tr == null || Tr !== Pt(r) || (r = Tr, "selectionStart" in r && Cr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Dr && vr(Dr, r) || (Dr = r, r = Dd(Er, "onSelect"), 0 < r.length && (t = new gn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Tr)));
	}
	function Ar(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var jr = {
		animationend: Ar("Animation", "AnimationEnd"),
		animationiteration: Ar("Animation", "AnimationIteration"),
		animationstart: Ar("Animation", "AnimationStart"),
		transitionrun: Ar("Transition", "TransitionRun"),
		transitionstart: Ar("Transition", "TransitionStart"),
		transitioncancel: Ar("Transition", "TransitionCancel"),
		transitionend: Ar("Transition", "TransitionEnd")
	}, Mr = {}, Nr = {};
	an && (Nr = document.createElement("div").style, "AnimationEvent" in window || (delete jr.animationend.animation, delete jr.animationiteration.animation, delete jr.animationstart.animation), "TransitionEvent" in window || delete jr.transitionend.transition);
	function Pr(e) {
		if (Mr[e]) return Mr[e];
		if (!jr[e]) return e;
		var t = jr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Nr) return Mr[e] = t[n];
		return e;
	}
	var Fr = Pr("animationend"), Ir = Pr("animationiteration"), Lr = Pr("animationstart"), Rr = Pr("transitionrun"), zr = Pr("transitionstart"), Br = Pr("transitioncancel"), Vr = Pr("transitionend"), Hr = /* @__PURE__ */ new Map(), Ur = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Ur.push("scrollEnd");
	function Wr(e, t) {
		Hr.set(e, t), z(t, [e]);
	}
	var Gr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Kr = [], qr = 0, Jr = 0;
	function Yr() {
		for (var e = qr, t = Jr = qr = 0; t < e;) {
			var n = Kr[t];
			Kr[t++] = null;
			var r = Kr[t];
			Kr[t++] = null;
			var i = Kr[t];
			Kr[t++] = null;
			var a = Kr[t];
			if (Kr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && $r(n, i, a);
		}
	}
	function Xr(e, t, n, r) {
		Kr[qr++] = e, Kr[qr++] = t, Kr[qr++] = n, Kr[qr++] = r, Jr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Zr(e, t, n, r) {
		return Xr(e, t, n, r), ei(e);
	}
	function Qr(e, t) {
		return Xr(e, null, null, t), ei(e);
	}
	function $r(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Be(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ei(e) {
		if (50 < fu) throw fu = 0, pu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ti = {};
	function ni(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ri(e, t, n, r) {
		return new ni(e, t, n, r);
	}
	function ii(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ai(e, t) {
		var n = e.alternate;
		return n === null ? (n = ri(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function oi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function si(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ii(e) && (s = 1);
		else if (typeof e == "string") s = Wf(e, n, le.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case E: return e = ri(31, n, t, a), e.elementType = E, e.lanes = o, e;
			case y: return ci(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ri(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ee: return e = ri(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case te: return e = ri(19, n, t, a), e.elementType = te, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case ne:
						s = 14;
						break a;
					case T:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ri(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ci(e, t, n, r) {
		return e = ri(7, e, r, t), e.lanes = n, e;
	}
	function li(e, t, n) {
		return e = ri(6, e, null, t), e.lanes = n, e;
	}
	function ui(e) {
		var t = ri(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function di(e, t, n) {
		return t = ri(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var fi = /* @__PURE__ */ new WeakMap();
	function pi(e, t) {
		if (typeof e == "object" && e) {
			var n = fi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Se(t)
			}, fi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Se(t)
		};
	}
	var mi = [], hi = 0, gi = null, _i = 0, vi = [], yi = 0, bi = null, xi = 1, Si = "";
	function Ci(e, t) {
		mi[hi++] = _i, mi[hi++] = gi, gi = e, _i = t;
	}
	function wi(e, t, n) {
		vi[yi++] = xi, vi[yi++] = Si, vi[yi++] = bi, bi = e;
		var r = xi;
		e = Si;
		var i = 32 - Be(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Be(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, xi = 1 << 32 - Be(t) + i | n << i | r, Si = a + e;
		} else xi = 1 << a | n << i | r, Si = e;
	}
	function Ti(e) {
		e.return !== null && (Ci(e, 1), wi(e, 1, 0));
	}
	function Ei(e) {
		for (; e === gi;) gi = mi[--hi], mi[hi] = null, _i = mi[--hi], mi[hi] = null;
		for (; e === bi;) bi = vi[--yi], vi[yi] = null, Si = vi[--yi], vi[yi] = null, xi = vi[--yi], vi[yi] = null;
	}
	function Di(e, t) {
		vi[yi++] = xi, vi[yi++] = Si, vi[yi++] = bi, xi = t.id, Si = t.overflow, bi = e;
	}
	var Oi = null, ki = null, G = !1, Ai = null, ji = !1, Mi = Error(i(519));
	function Ni(e) {
		throw zi(pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Mi;
	}
	function Pi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[st] = e, t[ct] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < vd.length; n++) Q(vd[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Rt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Ht(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Nd(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = U), t = !0) : t = !1, t || Ni(e, !0);
	}
	function Fi(e) {
		for (Oi = e.return; Oi;) switch (Oi.tag) {
			case 5:
			case 31:
			case 13:
				ji = !1;
				return;
			case 27:
			case 3:
				ji = !0;
				return;
			default: Oi = Oi.return;
		}
	}
	function Ii(e) {
		if (e !== Oi) return !1;
		if (!G) return Fi(e), G = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Wd(e.type, e.memoizedProps)), n = !n), n && ki && Ni(e), Fi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ki = df(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ki = df(e);
		} else t === 27 ? (t = ki, Qd(e.type) ? (e = uf, uf = null, ki = e) : ki = t) : ki = Oi ? lf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Li() {
		ki = Oi = null, G = !1;
	}
	function Ri() {
		var e = Ai;
		return e !== null && (Ql === null ? Ql = e : Ql.push.apply(Ql, e), Ai = null), e;
	}
	function zi(e) {
		Ai === null ? Ai = [e] : Ai.push(e);
	}
	var Bi = se(null), Vi = null, Hi = null;
	function Ui(e, t, n) {
		P(Bi, t._currentValue), t._currentValue = n;
	}
	function Wi(e) {
		e._currentValue = Bi.current, ce(Bi);
	}
	function Gi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ki(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Gi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Gi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function qi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					_r(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === fe.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [$f] : e.push($f));
			}
			a = a.return;
		}
		e !== null && Ki(t, e, n, r), t.flags |= 262144;
	}
	function Ji(e) {
		for (e = e.firstContext; e !== null;) {
			if (!_r(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Yi(e) {
		Vi = e, Hi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Xi(e) {
		return Qi(Vi, e);
	}
	function Zi(e, t) {
		return Vi === null && Yi(e), Qi(e, t);
	}
	function Qi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Hi === null) {
			if (e === null) throw Error(i(308));
			Hi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Hi = Hi.next = t;
		return n;
	}
	var $i = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ea = t.unstable_scheduleCallback, ta = t.unstable_NormalPriority, na = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ra() {
		return {
			controller: new $i(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ia(e) {
		e.refCount--, e.refCount === 0 && ea(ta, function() {
			e.controller.abort();
		});
	}
	var aa = null, oa = 0, sa = 0, ca = null;
	function la(e, t) {
		if (aa === null) {
			var n = aa = [];
			oa = 0, sa = fd(), ca = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return oa++, t.then(ua, ua), t;
	}
	function ua() {
		if (--oa === 0 && aa !== null) {
			ca !== null && (ca.status = "fulfilled");
			var e = aa;
			aa = null, sa = 0, ca = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function da(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var fa = A.S;
	A.S = function(e, t) {
		tu = Oe(), typeof t == "object" && t && typeof t.then == "function" && la(e, t), fa !== null && fa(e, t);
	};
	var pa = se(null);
	function ma() {
		var e = pa.current;
		return e === null ? zl.pooledCache : e;
	}
	function ha(e, t) {
		t === null ? P(pa, pa.current) : P(pa, t.pool);
	}
	function ga() {
		var e = ma();
		return e === null ? null : {
			parent: na._currentValue,
			pool: e
		};
	}
	var _a = Error(i(460)), va = Error(i(474)), ya = Error(i(542)), ba = { then: function() {} };
	function xa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Sa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(U, U), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ea(e), e;
			default:
				if (typeof t.status == "string") t.then(U, U);
				else {
					if (e = zl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ea(e), e;
				}
				throw wa = t, _a;
		}
	}
	function Ca(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (wa = e, _a) : e;
		}
	}
	var wa = null;
	function Ta() {
		if (wa === null) throw Error(i(459));
		var e = wa;
		return wa = null, e;
	}
	function Ea(e) {
		if (e === _a || e === ya) throw Error(i(483));
	}
	var Da = null, Oa = 0;
	function ka(e) {
		var t = Oa;
		return Oa += 1, Da === null && (Da = []), Sa(Da, e, t);
	}
	function Aa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function ja(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ma(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ai(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = li(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && Ca(i) === t.type) ? (t = a(t, n.props), Aa(t, n), t.return = e, t) : (t = si(n.type, n.key, n.props, null, e.mode, r), Aa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = di(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ci(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = li("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = si(t.type, t.key, t.props, null, e.mode, n), Aa(n, t), n.return = e, n;
					case v: return t = di(t, e.mode, n), t.return = e, t;
					case T: return t = Ca(t), f(e, t, n);
				}
				if (k(t) || D(t)) return t = ci(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, ka(t), n);
				if (t.$$typeof === C) return f(e, Zi(e, t), n);
				ja(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = Ca(n), p(e, t, n, r);
				}
				if (k(n) || D(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, ka(n), r);
				if (n.$$typeof === C) return p(e, t, Zi(e, n), r);
				ja(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Ca(r), m(e, t, n, r, i);
				}
				if (k(r) || D(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, ka(r), i);
				if (r.$$typeof === C) return m(e, t, n, Zi(t, r), i);
				ja(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), G && Ci(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return G && Ci(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), G && Ci(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), G && Ci(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return G && Ci(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), G && Ci(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Ca(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Aa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ci(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = si(o.type, o.key, o.props, null, e.mode, c), Aa(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = di(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = Ca(o), b(e, r, o, c);
				}
				if (k(o)) return h(e, r, o, c);
				if (D(o)) {
					if (l = D(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, ka(o), c);
				if (o.$$typeof === C) return b(e, r, Zi(e, o), c);
				ja(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = li(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Oa = 0;
				var i = b(e, t, n, r);
				return Da = null, i;
			} catch (t) {
				if (t === _a || t === ya) throw t;
				var a = ri(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Na = Ma(!0), Pa = Ma(!1), Fa = !1;
	function Ia(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
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
	function La(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ra(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function za(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, q & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ei(e), $r(e, null, n), t;
		}
		return Xr(e, r, t, n), ei(e);
	}
	function Ba(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	function Va(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ha = !1;
	function Ua() {
		if (Ha) {
			var e = ca;
			if (e !== null) throw e;
		}
	}
	function Wa(e, t, n, r) {
		Ha = !1;
		var i = e.updateQueue;
		Fa = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === sa && (Ha = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Fa = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Kl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ga(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ka(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ga(n[e], t);
	}
	var qa = se(null), Ja = se(0);
	function Ya(e, t) {
		e = Wl, P(Ja, e), P(qa, t), Wl = e | t.baseLanes;
	}
	function Xa() {
		P(Ja, Wl), P(qa, qa.current);
	}
	function Za() {
		Wl = Ja.current, ce(qa), ce(Ja);
	}
	var Qa = se(null), $a = null;
	function eo(e) {
		var t = e.alternate;
		P(ao, ao.current & 1), P(Qa, e), $a === null && (t === null || qa.current !== null || t.memoizedState !== null) && ($a = e);
	}
	function to(e) {
		P(ao, ao.current), P(Qa, e), $a === null && ($a = e);
	}
	function no(e) {
		e.tag === 22 ? (P(ao, ao.current), P(Qa, e), $a === null && ($a = e)) : ro(e);
	}
	function ro() {
		P(ao, ao.current), P(Qa, Qa.current);
	}
	function io(e) {
		ce(Qa), $a === e && ($a = null), ce(ao);
	}
	var ao = se(0);
	function oo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || of(n) || sf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var so = 0, K = null, co = null, lo = null, uo = !1, fo = !1, po = !1, mo = 0, ho = 0, go = null, _o = 0;
	function vo() {
		throw Error(i(321));
	}
	function yo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!_r(e[n], t[n])) return !1;
		return !0;
	}
	function bo(e, t, n, r, i, a) {
		return so = a, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? Ls : Rs, po = !1, a = n(r, i), po = !1, fo && (a = So(t, n, r, i)), xo(e), a;
	}
	function xo(e) {
		A.H = Is;
		var t = co !== null && co.next !== null;
		if (so = 0, lo = co = K = null, uo = !1, ho = 0, go = null, t) throw Error(i(300));
		e === null || tc || (e = e.dependencies, e !== null && Ji(e) && (tc = !0));
	}
	function So(e, t, n, r) {
		K = e;
		var a = 0;
		do {
			if (fo && (go = null), ho = 0, fo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, lo = co = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			A.H = zs, o = t(n, r);
		} while (fo);
		return o;
	}
	function Co() {
		var e = A.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ao(t) : t, e = e.useState()[0], (co === null ? null : co.memoizedState) !== e && (K.flags |= 1024), t;
	}
	function wo() {
		var e = mo !== 0;
		return mo = 0, e;
	}
	function To(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Eo(e) {
		if (uo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			uo = !1;
		}
		so = 0, lo = co = K = null, fo = !1, ho = mo = 0, go = null;
	}
	function Do() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return lo === null ? K.memoizedState = lo = e : lo = lo.next = e, lo;
	}
	function Oo() {
		if (co === null) {
			var e = K.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = co.next;
		var t = lo === null ? K.memoizedState : lo.next;
		if (t !== null) lo = t, co = e;
		else {
			if (e === null) throw K.alternate === null ? Error(i(467)) : Error(i(310));
			co = e, e = {
				memoizedState: co.memoizedState,
				baseState: co.baseState,
				baseQueue: co.baseQueue,
				queue: co.queue,
				next: null
			}, lo === null ? K.memoizedState = lo = e : lo = lo.next = e;
		}
		return lo;
	}
	function ko() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ao(e) {
		var t = ho;
		return ho += 1, go === null && (go = []), e = Sa(go, e, t), t = K, (lo === null ? t.memoizedState : lo.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? Ls : Rs), e;
	}
	function jo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ao(e);
			if (e.$$typeof === C) return Xi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Mo(e) {
		var t = null, n = K.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = K.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ko(), K.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = re;
		return t.index++, n;
	}
	function No(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Po(e) {
		return Fo(Oo(), co, e);
	}
	function Fo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (so & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === sa && (d = !0);
					else if ((so & p) === p) {
						u = u.next, p === sa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, K.lanes |= p, Kl |= p;
					f = u.action, po && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, K.lanes |= f, Kl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !_r(o, e.memoizedState) && (tc = !0, d && (n = ca, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Io(e) {
		var t = Oo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			_r(o, t.memoizedState) || (tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Lo(e, t, n) {
		var r = K, a = Oo(), o = G;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !_r((co || a).memoizedState, n);
		if (s && (a.memoizedState = n, tc = !0), a = a.queue, cs(Bo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || lo !== null && lo.memoizedState.tag & 1) {
			if (r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null), zl === null) throw Error(i(349));
			o || so & 127 || Ro(r, t, n);
		}
		return n;
	}
	function Ro(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = K.updateQueue, t === null ? (t = ko(), K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Vo(t) && Ho(e);
	}
	function Bo(e, t, n) {
		return n(function() {
			Vo(t) && Ho(e);
		});
	}
	function Vo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !_r(e, n);
		} catch {
			return !0;
		}
	}
	function Ho(e) {
		var t = Qr(e, 2);
		t !== null && gu(t, e, 2);
	}
	function Uo(e) {
		var t = Do();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), po) {
				ze(!0);
				try {
					n();
				} finally {
					ze(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: No,
			lastRenderedState: e
		}, t;
	}
	function Wo(e, t, n, r) {
		return e.baseState = n, Fo(e, co, typeof r == "function" ? r : No);
	}
	function Go(e, t, n, r, a) {
		if (Ns(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			A.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ko(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ko(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = A.T, o = {};
			A.T = o;
			try {
				var s = n(i, r), c = A.S;
				c !== null && c(o, s), qo(e, t, s);
			} catch (n) {
				Yo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), A.T = a;
			}
		} else try {
			a = n(i, r), qo(e, t, a);
		} catch (n) {
			Yo(e, t, n);
		}
	}
	function qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Jo(e, t, n);
		}, function(n) {
			return Yo(e, t, n);
		}) : Jo(e, t, n);
	}
	function Jo(e, t, n) {
		t.status = "fulfilled", t.value = n, Xo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ko(e, n)));
	}
	function Yo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Xo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Xo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Zo(e, t) {
		return t;
	}
	function Qo(e, t) {
		if (G) {
			var n = zl.formState;
			if (n !== null) {
				a: {
					var r = K;
					if (G) {
						if (ki) {
							b: {
								for (var i = ki, a = ji; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = lf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								ki = lf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ni(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Do(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Zo,
			lastRenderedState: t
		}, n.queue = r, n = As.bind(null, K, r), r.dispatch = n, r = Uo(!1), a = Ms.bind(null, K, !1, r.queue), r = Do(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Go.bind(null, K, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function $o(e) {
		return es(Oo(), co, e);
	}
	function es(e, t, n) {
		if (t = Fo(e, t, Zo)[0], e = Po(No)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ao(t);
		} catch (e) {
			throw e === _a ? ya : e;
		}
		else r = t;
		t = Oo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (K.flags |= 2048, rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ts(e, t) {
		e.action = t;
	}
	function ns(e) {
		var t = Oo(), n = co;
		if (n !== null) return es(t, n, e);
		Oo(), t = t.memoizedState, n = Oo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = K.updateQueue, t === null && (t = ko(), K.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function is() {
		return Oo().memoizedState;
	}
	function as(e, t, n, r) {
		var i = Do();
		K.flags |= e, i.memoizedState = rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function os(e, t, n, r) {
		var i = Oo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		co !== null && r !== null && yo(r, co.memoizedState.deps) ? i.memoizedState = rs(t, a, n, r) : (K.flags |= e, i.memoizedState = rs(1 | t, a, n, r));
	}
	function ss(e, t) {
		as(8390656, 8, e, t);
	}
	function cs(e, t) {
		os(2048, 8, e, t);
	}
	function ls(e) {
		K.flags |= 4;
		var t = K.updateQueue;
		if (t === null) t = ko(), K.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function us(e) {
		var t = Oo().memoizedState;
		return ls({
			ref: t,
			nextImpl: e
		}), function() {
			if (q & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ds(e, t) {
		return os(4, 2, e, t);
	}
	function fs(e, t) {
		return os(4, 4, e, t);
	}
	function ps(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ms(e, t, n) {
		n = n == null ? null : n.concat([e]), os(4, 4, ps.bind(null, t, e), n);
	}
	function hs() {}
	function gs(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && yo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function _s(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && yo(t, r[1])) return r[0];
		if (r = e(), po) {
			ze(!0);
			try {
				e();
			} finally {
				ze(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function vs(e, t, n) {
		return n === void 0 || so & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = hu(), K.lanes |= e, Kl |= e, n);
	}
	function ys(e, t, n, r) {
		return _r(n, t) ? n : qa.current === null ? !(so & 42) || so & 1073741824 && !(Y & 261930) ? (tc = !0, e.memoizedState = n) : (e = hu(), K.lanes |= e, Kl |= e, t) : (e = vs(e, n, r), _r(e, t) || (tc = !0), e);
	}
	function bs(e, t, n, r, i) {
		var a = j.p;
		j.p = a !== 0 && 8 > a ? a : 8;
		var o = A.T, s = {};
		A.T = s, Ms(e, !1, t, n);
		try {
			var c = i(), l = A.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? js(e, t, da(c, r), mu(e)) : js(e, t, r, mu(e));
		} catch (n) {
			js(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, mu());
		} finally {
			j.p = a, o !== null && s.types !== null && (o.types = s.types), A.T = o;
		}
	}
	function xs() {}
	function Ss(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Cs(e).queue;
		bs(e, a, t, oe, n === null ? xs : function() {
			return ws(e), n(r);
		});
	}
	function Cs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: oe,
			baseState: oe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: oe
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ws(e) {
		var t = Cs(e);
		t.next === null && (t = e.alternate.memoizedState), js(e, t.next.queue, {}, mu());
	}
	function Ts() {
		return Xi($f);
	}
	function Es() {
		return Oo().memoizedState;
	}
	function Ds() {
		return Oo().memoizedState;
	}
	function Os(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = mu();
					e = Ra(n);
					var r = za(t, e, n);
					r !== null && (gu(r, t, n), Ba(r, t, n)), t = { cache: ra() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ks(e, t, n) {
		var r = mu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e) ? Ps(t, n) : (n = Zr(e, t, n, r), n !== null && (gu(n, e, r), Fs(n, t, r)));
	}
	function As(e, t, n) {
		js(e, t, n, mu());
	}
	function js(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ns(e)) Ps(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, _r(s, o)) return Xr(e, t, i, 0), zl === null && Yr(), !1;
			} catch {}
			if (n = Zr(e, t, i, r), n !== null) return gu(n, e, r), Fs(n, t, r), !0;
		}
		return !1;
	}
	function Ms(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: fd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e)) {
			if (t) throw Error(i(479));
		} else t = Zr(e, n, r, 2), t !== null && gu(t, e, 2);
	}
	function Ns(e) {
		var t = e.alternate;
		return e === K || t !== null && t === K;
	}
	function Ps(e, t) {
		fo = uo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Fs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	var Is = {
		readContext: Xi,
		use: jo,
		useCallback: vo,
		useContext: vo,
		useEffect: vo,
		useImperativeHandle: vo,
		useLayoutEffect: vo,
		useInsertionEffect: vo,
		useMemo: vo,
		useReducer: vo,
		useRef: vo,
		useState: vo,
		useDebugValue: vo,
		useDeferredValue: vo,
		useTransition: vo,
		useSyncExternalStore: vo,
		useId: vo,
		useHostTransitionStatus: vo,
		useFormState: vo,
		useActionState: vo,
		useOptimistic: vo,
		useMemoCache: vo,
		useCacheRefresh: vo
	};
	Is.useEffectEvent = vo;
	var Ls = {
		readContext: Xi,
		use: jo,
		useCallback: function(e, t) {
			return Do().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Xi,
		useEffect: ss,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), as(4194308, 4, ps.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return as(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			as(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Do();
			t = t === void 0 ? null : t;
			var r = e();
			if (po) {
				ze(!0);
				try {
					e();
				} finally {
					ze(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Do();
			if (n !== void 0) {
				var i = n(t);
				if (po) {
					ze(!0);
					try {
						n(t);
					} finally {
						ze(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ks.bind(null, K, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Do();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Uo(e);
			var t = e.queue, n = As.bind(null, K, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return vs(Do(), e, t);
		},
		useTransition: function() {
			var e = Uo(!1);
			return e = bs.bind(null, K, e.queue, !0, !1), Do().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = K, a = Do();
			if (G) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), zl === null) throw Error(i(349));
				Y & 127 || Ro(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ss(Bo.bind(null, r, o, e), [e]), r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Do(), t = zl.identifierPrefix;
			if (G) {
				var n = Si, r = xi;
				n = (r & ~(1 << 32 - Be(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = mo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = _o++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ts,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e) {
			var t = Do();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ms.bind(null, K, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Mo,
		useCacheRefresh: function() {
			return Do().memoizedState = Os.bind(null, K);
		},
		useEffectEvent: function(e) {
			var t = Do(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (q & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Rs = {
		readContext: Xi,
		use: jo,
		useCallback: gs,
		useContext: Xi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Po,
		useRef: is,
		useState: function() {
			return Po(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return ys(Oo(), co.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Po(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: function(e, t) {
			return Wo(Oo(), co, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	Rs.useEffectEvent = us;
	var zs = {
		readContext: Xi,
		use: jo,
		useCallback: gs,
		useContext: Xi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Io,
		useRef: is,
		useState: function() {
			return Io(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			var n = Oo();
			return co === null ? vs(n, e, t) : ys(n, co.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			var n = Oo();
			return co === null ? (n.baseState = e, [e, n.queue.dispatch]) : Wo(n, co, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	zs.useEffectEvent = us;
	function Bs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Vs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ra(r);
			i.payload = t, n != null && (i.callback = n), t = za(e, i, r), t !== null && (gu(t, e, r), Ba(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ra(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = za(e, i, r), t !== null && (gu(t, e, r), Ba(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = mu(), r = Ra(n);
			r.tag = 2, t != null && (r.callback = t), t = za(e, r, n), t !== null && (gu(t, e, n), Ba(t, e, n));
		}
	};
	function Hs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !vr(n, r) || !vr(i, a) : !0;
	}
	function Us(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
	}
	function Ws(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Gs(e) {
		Gr(e);
	}
	function Ks(e) {
		console.error(e);
	}
	function qs(e) {
		Gr(e);
	}
	function Js(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ys(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Xs(e, t, n) {
		return n = Ra(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Js(e, t);
		}, n;
	}
	function Zs(e) {
		return e = Ra(e), e.tag = 3, e;
	}
	function Qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ys(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ys(t, n, r), typeof i != "function" && (iu === null ? iu = new Set([this]) : iu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function $s(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && qi(t, n, a, !0), n = Qa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return $a === null ? Ou() : n.alternate === null && Gl === 0 && (Gl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ba ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Ku(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ba ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Ku(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Ku(e, r, a), Ou(), !1;
		}
		if (G) return t = Qa.current, t === null ? (r !== Mi && (t = Error(i(423), { cause: r }), zi(pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = pi(r, n), a = Xs(e.stateNode, r, a), Va(e, a), Gl !== 4 && (Gl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Mi && (e = Error(i(422), { cause: r }), zi(pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = pi(o, n), Zl === null ? Zl = [o] : Zl.push(o), Gl !== 4 && (Gl = 2), t === null) return !0;
		r = pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Xs(n.stateNode, r, e), Va(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (iu === null || !iu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Zs(a), Qs(a, e, n, r), Va(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ec = Error(i(461)), tc = !1;
	function nc(e, t, n, r) {
		t.child = e === null ? Pa(t, null, n, r) : Na(t, e.child, n, r);
	}
	function rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Yi(t), r = bo(e, t, n, o, a, i), s = wo(), e !== null && !tc ? (To(e, t, i), Dc(e, t, i)) : (G && s && Ti(t), t.flags |= 1, nc(e, t, r, i), t.child);
	}
	function ic(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ii(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ac(e, t, a, r, i)) : (e = si(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Oc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? vr : n, n(o, r) && e.ref === t.ref) return Dc(e, t, i);
		}
		return t.flags |= 1, e = ai(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ac(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (vr(a, r) && e.ref === t.ref) if (tc = !1, t.pendingProps = r = a, Oc(e, i)) e.flags & 131072 && (tc = !0);
			else return t.lanes = e.lanes, Dc(e, t, i);
		}
		return pc(e, t, n, r, i);
	}
	function oc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return cc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ha(t, a === null ? null : a.cachePool), a === null ? Xa() : Ya(t, a), no(t);
			else return r = t.lanes = 536870912, cc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ha(t, null), Xa(), ro(t)) : (ha(t, a.cachePool), Ya(t, a), ro(t), t.memoizedState = null);
		return nc(e, t, i, n), t.child;
	}
	function sc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function cc(e, t, n, r, i) {
		var a = ma();
		return a = a === null ? null : {
			parent: na._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ha(t, null), Xa(), no(t), e !== null && qi(e, t, r, !0), t.childLanes = i, null;
	}
	function lc(e, t) {
		return t = Sc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function uc(e, t, n) {
		return Na(t, e.child, null, n), e = lc(t, t.pendingProps), e.flags |= 2, io(t), t.memoizedState = null, e;
	}
	function dc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (G) {
				if (r.mode === "hidden") return e = lc(t, r), t.lanes = 536870912, sc(null, e);
				if (to(t), (e = ki) ? (e = af(e, ji), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: bi === null ? null : {
						id: xi,
						overflow: Si
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ui(e), n.return = t, t.child = n, Oi = t, ki = null)) : e = null, e === null) throw Ni(t);
				return t.lanes = 536870912, null;
			}
			return lc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (to(t), a) if (t.flags & 256) t.flags &= -257, t = uc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (tc || qi(e, t, n, !1), a = (n & e.childLanes) !== 0, tc || a) {
				if (r = zl, r !== null && (s = tt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Qr(e, s), gu(r, e, s), ec;
				Ou(), t = uc(e, t, n);
			} else e = o.treeContext, ki = lf(s.nextSibling), Oi = t, G = !0, Ai = null, ji = !1, e !== null && Di(t, e), t = lc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ai(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function fc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function pc(e, t, n, r, i) {
		return Yi(t), n = bo(e, t, n, r, void 0, i), r = wo(), e !== null && !tc ? (To(e, t, i), Dc(e, t, i)) : (G && r && Ti(t), t.flags |= 1, nc(e, t, n, i), t.child);
	}
	function mc(e, t, n, r, i, a) {
		return Yi(t), t.updateQueue = null, n = So(t, r, n, i), xo(e), r = wo(), e !== null && !tc ? (To(e, t, a), Dc(e, t, a)) : (G && r && Ti(t), t.flags |= 1, nc(e, t, n, a), t.child);
	}
	function hc(e, t, n, r, i) {
		if (Yi(t), t.stateNode === null) {
			var a = ti, o = n.contextType;
			typeof o == "object" && o && (a = Xi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Vs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ia(t), o = n.contextType, a.context = typeof o == "object" && o ? Xi(o) : ti, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Bs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Vs.enqueueReplaceState(a, a.state, null), Wa(t, r, a, i), Ua(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ws(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ti, typeof u == "object" && u && (o = Xi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Us(t, a, r, o), Fa = !1;
			var f = t.memoizedState;
			a.state = f, Wa(t, r, a, i), Ua(), l = t.memoizedState, s || f !== l || Fa ? (typeof d == "function" && (Bs(t, n, d, r), l = t.memoizedState), (c = Fa || Hs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, La(e, t), o = t.memoizedProps, u = Ws(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ti, typeof l == "object" && l && (c = Xi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Us(t, a, r, c), Fa = !1, f = t.memoizedState, a.state = f, Wa(t, r, a, i), Ua();
			var p = t.memoizedState;
			o !== d || f !== p || Fa || e !== null && e.dependencies !== null && Ji(e.dependencies) ? (typeof s == "function" && (Bs(t, n, s, r), p = t.memoizedState), (u = Fa || Hs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ji(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, fc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Na(t, e.child, null, i), t.child = Na(t, null, n, i)) : nc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Dc(e, t, i), e;
	}
	function gc(e, t, n, r) {
		return Li(), t.flags |= 256, nc(e, t, n, r), t.child;
	}
	var _c = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function vc(e) {
		return {
			baseLanes: e,
			cachePool: ga()
		};
	}
	function yc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Yl), e;
	}
	function bc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (ao.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (G) {
				if (a ? eo(t) : ro(t), (e = ki) ? (e = af(e, ji), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: bi === null ? null : {
						id: xi,
						overflow: Si
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ui(e), n.return = t, t.child = n, Oi = t, ki = null)) : e = null, e === null) throw Ni(t);
				return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (ro(t), a = t.mode, c = Sc({
				mode: "hidden",
				children: c
			}, a), r = ci(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(null, r)) : (eo(t), xc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (eo(t), t.flags &= -257, t = Cc(e, t, n)) : t.memoizedState === null ? (ro(t), c = r.fallback, a = t.mode, r = Sc({
				mode: "visible",
				children: r.children
			}, a), c = ci(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Na(t, e.child, null, n), r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, t = sc(null, r)) : (ro(t), t.child = e.child, t.flags |= 128, t = null);
			else if (eo(t), sf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, zi({
					value: r,
					source: null,
					stack: null
				}), t = Cc(e, t, n);
			} else if (tc || qi(e, t, n, !1), s = (n & e.childLanes) !== 0, tc || s) {
				if (s = zl, s !== null && (r = tt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Qr(e, r), gu(s, e, r), ec;
				of(c) || Ou(), t = Cc(e, t, n);
			} else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, ki = lf(c.nextSibling), Oi = t, G = !0, Ai = null, ji = !1, e !== null && Di(t, e), t = xc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (ro(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ai(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ci(c, a, n, null), c.flags |= 2) : c = ai(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, sc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = vc(n) : (a = c.cachePool, a === null ? a = ga() : (l = na._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(e.child, r)) : (eo(t), n = e.child, e = n.sibling, n = ai(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function xc(e, t) {
		return t = Sc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Sc(e, t) {
		return e = ri(22, e, null, t), e.lanes = 0, e;
	}
	function Cc(e, t, n) {
		return Na(t, e.child, null, n), e = xc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function wc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Gi(e.return, t, n);
	}
	function Tc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Ec(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ao.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, P(ao, o), nc(e, t, r, n), r = G ? _i : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
			else if (e.tag === 19) wc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && oo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Tc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && oo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Tc(t, !0, n, null, a, r);
				break;
			case "together":
				Tc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Dc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Kl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (qi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ai(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ai(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Oc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ji(e))) : !0;
	}
	function kc(e, t, n) {
		switch (t.tag) {
			case 3:
				pe(t, t.stateNode.containerInfo), Ui(t, na, e.memoizedState.cache), Li();
				break;
			case 27:
			case 5:
				he(t);
				break;
			case 4:
				pe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ui(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, to(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (eo(t), e = Dc(e, t, n), e === null ? null : e.sibling) : bc(e, t, n) : (eo(t), t.flags |= 128, null);
				eo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (qi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ec(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), P(ao, ao.current), r) break;
				return null;
			case 22: return t.lanes = 0, oc(e, t, n, t.pendingProps);
			case 24: Ui(t, na, e.memoizedState.cache);
		}
		return Dc(e, t, n);
	}
	function Ac(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) tc = !0;
		else {
			if (!Oc(e, n) && !(t.flags & 128)) return tc = !1, kc(e, t, n);
			tc = !!(e.flags & 131072);
		}
		else tc = !1, G && t.flags & 1048576 && wi(t, _i, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ca(t.elementType), t.type = e, typeof e == "function") ii(e) ? (r = Ws(e, r), t.tag = 1, t = hc(null, t, e, r, n)) : (t.tag = 0, t = pc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = rc(null, t, e, r, n);
								break a;
							} else if (a === ne) {
								t.tag = 14, t = ic(null, t, e, r, n);
								break a;
							}
						}
						throw t = O(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return pc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ws(r, t.pendingProps), hc(e, t, r, a, n);
			case 3:
				a: {
					if (pe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, La(e, t), Wa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ui(t, na, r), r !== o.cache && Ki(t, [na], n, !0), Ua(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = gc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = pi(Error(i(424)), t), zi(a), t = gc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (ki = lf(e.firstChild), Oi = t, G = !0, Ai = null, ji = !0, n = Pa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Li(), r === a) {
							t = Dc(e, t, n);
							break a;
						}
						nc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return fc(e, t), e === null ? (n = Af(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : G || (n = t.type, e = t.pendingProps, r = Vd(de.current).createElement(n), r[st] = t, r[ct] = e, Fd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = Af(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return he(t), e === null && G && (r = t.stateNode = pf(t.type, t.pendingProps, de.current), Oi = t, ji = !0, a = ki, Qd(t.type) ? (uf = a, ki = lf(r.firstChild)) : ki = a), nc(e, t, t.pendingProps.children, n), fc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && G && ((a = r = ki) && (r = nf(r, t.type, t.pendingProps, ji), r === null ? a = !1 : (t.stateNode = r, Oi = t, ki = lf(r.firstChild), ji = !1, a = !0)), a || Ni(t)), he(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(a, o) ? r = null : s !== null && Wd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = bo(e, t, Co, null, null, n), $f._currentValue = a), fc(e, t), nc(e, t, r, n), t.child;
			case 6: return e === null && G && ((e = n = ki) && (n = rf(n, t.pendingProps, ji), n === null ? e = !1 : (t.stateNode = n, Oi = t, ki = null, e = !0)), e || Ni(t)), null;
			case 13: return bc(e, t, n);
			case 4: return pe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Na(t, null, r, n) : nc(e, t, r, n), t.child;
			case 11: return rc(e, t, t.type, t.pendingProps, n);
			case 7: return nc(e, t, t.pendingProps, n), t.child;
			case 8: return nc(e, t, t.pendingProps.children, n), t.child;
			case 12: return nc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ui(t, t.type, r.value), nc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Yi(t), a = Xi(a), r = r(a), t.flags |= 1, nc(e, t, r, n), t.child;
			case 14: return ic(e, t, t.type, t.pendingProps, n);
			case 15: return ac(e, t, t.type, t.pendingProps, n);
			case 19: return Ec(e, t, n);
			case 31: return dc(e, t, n);
			case 22: return oc(e, t, n, t.pendingProps);
			case 24: return Yi(t), r = Xi(na), e === null ? (a = ma(), a === null && (a = zl, o = ra(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ia(t), Ui(t, na, a)) : ((e.lanes & n) !== 0 && (La(e, t), Wa(t, null, null, n), Ua()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ui(t, na, r), r !== a.cache && Ki(t, [na], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ui(t, na, r))), nc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function jc(e) {
		e.flags |= 4;
	}
	function Mc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Tu()) e.flags |= 8192;
			else throw wa = ba, va;
		} else e.flags &= -16777217;
	}
	function Nc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Gf(t)) if (Tu()) e.flags |= 8192;
		else throw wa = ba, va;
	}
	function Pc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : I(), e.lanes |= t, Xl |= t);
	}
	function Fc(e, t) {
		if (!G) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Ic(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Lc(e, t, n) {
		var r = t.pendingProps;
		switch (Ei(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Ic(t), null;
			case 1: return Ic(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Wi(na), me(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ii(t) ? jc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ri())), Ic(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (jc(t), o === null ? (Ic(t), Mc(t, a, null, r, n)) : (Ic(t), Nc(t, o))) : o ? o === e.memoizedState ? (Ic(t), t.flags &= -16777217) : (jc(t), Ic(t), Nc(t, o)) : (e = e.memoizedProps, e !== r && jc(t), Ic(t), Mc(t, a, e, r, n)), null;
			case 27:
				if (F(t), n = de.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					e = le.current, Ii(t) ? Pi(t, e) : (e = pf(a, r, n), t.stateNode = e, jc(t));
				}
				return Ic(t), null;
			case 5:
				if (F(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					if (o = le.current, Ii(t)) Pi(t, o);
					else {
						var s = Vd(de.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[st] = t, o[ct] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Fd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && jc(t);
					}
				}
				return Ic(t), Mc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = de.current, Ii(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Oi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[st] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Nd(e.nodeValue, n)), e || Ni(t, !0);
					} else e = Vd(e).createTextNode(r), e[st] = t, t.stateNode = e;
				}
				return Ic(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ii(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[st] = t;
						} else Li(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), e = !1;
					} else n = Ri(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (io(t), t) : (io(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ic(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ii(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[st] = t;
						} else Li(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), a = !1;
					} else a = Ri(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (io(t), t) : (io(t), null);
				}
				return io(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Pc(t, t.updateQueue), Ic(t), null);
			case 4: return me(), e === null && Cd(t.stateNode.containerInfo), Ic(t), null;
			case 10: return Wi(t.type), Ic(t), null;
			case 19:
				if (ce(ao), r = t.memoizedState, r === null) return Ic(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Fc(r, !1);
				else {
					if (Gl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = oo(e), o !== null) {
							for (t.flags |= 128, Fc(r, !1), e = o.updateQueue, t.updateQueue = e, Pc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) oi(n, e), n = n.sibling;
							return P(ao, ao.current & 1 | 2), G && Ci(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Oe() > nu && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = oo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Pc(t, e), Fc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !G) return Ic(t), null;
					} else 2 * Oe() - r.renderingStartTime > nu && n !== 536870912 && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ic(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Oe(), e.sibling = null, n = ao.current, P(ao, a ? n & 1 | 2 : n & 1), G && Ci(t, r.treeForkCount), e);
			case 22:
			case 23: return io(t), Za(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ic(t), n = t.updateQueue, n !== null && Pc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ce(pa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Wi(na), Ic(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Rc(e, t) {
		switch (Ei(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Wi(na), me(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return F(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (io(t), t.alternate === null) throw Error(i(340));
					Li();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (io(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Li();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ce(ao), null;
			case 4: return me(), null;
			case 10: return Wi(t.type), null;
			case 22:
			case 23: return io(t), Za(), e !== null && ce(pa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Wi(na), null;
			case 25: return null;
			default: return null;
		}
	}
	function zc(e, t) {
		switch (Ei(t), t.tag) {
			case 3:
				Wi(na), me();
				break;
			case 26:
			case 27:
			case 5:
				F(t);
				break;
			case 4:
				me();
				break;
			case 31:
				t.memoizedState !== null && io(t);
				break;
			case 13:
				io(t);
				break;
			case 19:
				ce(ao);
				break;
			case 10:
				Wi(t.type);
				break;
			case 22:
			case 23:
				io(t), Za(), e !== null && ce(pa);
				break;
			case 24: Wi(na);
		}
	}
	function Bc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Vc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Hc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ka(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Uc(e, t, n) {
		n.props = Ws(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Wc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function Kc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function qc(e, t, n) {
		try {
			var r = e.stateNode;
			Id(r, e.type, n, t), r[ct] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qd(e.type) || e.tag === 4;
	}
	function Yc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Jc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Qd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = U));
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[st] = e, t[ct] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var $c = !1, el = !1, tl = !1, nl = typeof WeakSet == "function" ? WeakSet : Set, rl = null;
	function il(e, t) {
		if (e = e.containerInfo, zd = cp, e = Sr(e), Cr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Bd = {
			focusedElem: e,
			selectionRange: n
		}, cp = !1, rl = t; rl !== null;) if (t = rl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, rl = e;
		else for (; rl !== null;) {
			switch (t = rl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ws(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) tf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								tf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, rl = e;
				break;
			}
			rl = t.return;
		}
	}
	function al(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Bc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ws(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Hc(n), r & 512 && Wc(n, n.return);
				break;
			case 3:
				if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ka(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Qc(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return);
				break;
			case 12:
				bl(e, n);
				break;
			case 31:
				bl(e, n), r & 4 && dl(e, n);
				break;
			case 13:
				bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Yu.bind(null, n), cf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || $c, !r) {
					t = t !== null && t.memoizedState !== null || el, i = $c;
					var a = el;
					$c = r, (el = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), $c = i, el = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function ol(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, ol(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var sl = null, cl = !1;
	function ll(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (Re && typeof Re.onCommitFiberUnmount == "function") try {
			Re.onCommitFiberUnmount(Le, n);
		} catch {}
		switch (n.tag) {
			case 26:
				el || Gc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				el || Gc(n, t);
				var r = sl, i = cl;
				Qd(n.type) && (sl = n.stateNode, cl = !1), ll(e, t, n), mf(n.stateNode), sl = r, cl = i;
				break;
			case 5: el || Gc(n, t);
			case 6:
				if (r = sl, i = cl, sl = null, ll(e, t, n), sl = r, cl = i, sl !== null) if (cl) try {
					(sl.nodeType === 9 ? sl.body : sl.nodeName === "HTML" ? sl.ownerDocument.body : sl).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					sl.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				sl !== null && (cl ? (e = sl, $d(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Pp(e)) : $d(sl, n.stateNode));
				break;
			case 4:
				r = sl, i = cl, sl = n.stateNode.containerInfo, cl = !0, ll(e, t, n), sl = r, cl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Vc(2, n, t), el || Vc(4, n, t), ll(e, t, n);
				break;
			case 1:
				el || (Gc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Uc(n, t, r)), ll(e, t, n);
				break;
			case 21:
				ll(e, t, n);
				break;
			case 22:
				el = (r = el) || n.memoizedState !== null, ll(e, t, n), el = r;
				break;
			default: ll(e, t, n);
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Pp(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Pp(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function pl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new nl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ml(e, t) {
		var n = pl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Xu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function hl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Qd(c.type)) {
							sl = c.stateNode, cl = !1;
							break a;
						}
						break;
					case 5:
						sl = c.stateNode, cl = !1;
						break a;
					case 3:
					case 4:
						sl = c.stateNode.containerInfo, cl = !0;
						break a;
				}
				c = c.return;
			}
			if (sl === null) throw Error(i(160));
			ul(o, s, a), sl = null, cl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) _l(t, e), t = t.sibling;
	}
	var gl = null;
	function _l(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				hl(t, e), vl(e), r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 64 && $c && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[mt] || o[st] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Fd(o, r, n), o[st] = e, bt(o), r = o;
									break a;
								case "link":
									var s = Hf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Hf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[st] = e, bt(o), r = o;
						}
						e.stateNode = r;
					} else Uf(a, e.type, e.stateNode);
					else e.stateNode = Lf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && qc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Uf(a, e.type, e.stateNode) : Lf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ut(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, qc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (tl = !0);
				break;
			case 6:
				if (hl(t, e), vl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Vf = null, a = gl, gl = _f(t.containerInfo), hl(t, e), gl = a, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Pp(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				tl && (tl = !1, yl(e));
				break;
			case 4:
				r = gl, gl = _f(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
				break;
			case 12:
				hl(t, e), vl(e);
				break;
			case 31:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 13:
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (eu = Oe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = $c, d = el;
				if ($c = u || a, el = d || l, hl(t, e), el = d, $c = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || $c || el || xl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? ef(m, !0) : ef(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
				break;
			case 19:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: hl(t, e), vl(e);
		}
	}
	function vl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Jc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Zc(e, Yc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ut(o, ""), n.flags &= -33), Zc(e, Yc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Xc(e, Yc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function yl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) al(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Vc(4, t, t.return), xl(t);
					break;
				case 1:
					Gc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Uc(t, t.return, n), xl(t);
					break;
				case 27: mf(t.stateNode);
				case 26:
				case 5:
					Gc(t, t.return), xl(t);
					break;
				case 22:
					t.memoizedState === null && xl(t);
					break;
				case 30:
					xl(t);
					break;
				default: xl(t);
			}
			e = e.sibling;
		}
	}
	function Sl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Sl(i, a, n), Bc(4, a);
					break;
				case 1:
					if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ga(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Hc(a), Wc(a, a.return);
					break;
				case 27: Qc(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return);
					break;
				case 12:
					Sl(i, a, n);
					break;
				case 31:
					Sl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 13:
					Sl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 22:
					a.memoizedState === null && Sl(i, a, n), Wc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ia(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ia(e));
	}
	function Tl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling;
	}
	function El(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e, t, n, r), i & 2048 && Bc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ia(e)));
				break;
			case 12:
				if (i & 2048) {
					Tl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Tl(e, t, n, r);
				break;
			case 31:
				Tl(e, t, n, r);
				break;
			case 13:
				Tl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
				break;
			case 24:
				Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
				break;
			default: Tl(e, t, n, r);
		}
	}
	function Dl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Dl(a, o, s, c, i), Bc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
					break;
				case 24:
					Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
					break;
				default: Dl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ol(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				case 24:
					Ol(n, r), i & 2048 && wl(r.alternate, r);
					break;
				default: Ol(n, r);
			}
			t = t.sibling;
		}
	}
	var kl = 8192;
	function Al(e, t, n) {
		if (e.subtreeFlags & kl) for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling;
	}
	function jl(e, t, n) {
		switch (e.tag) {
			case 26:
				Al(e, t, n), e.flags & kl && e.memoizedState !== null && Kf(n, gl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Al(e, t, n);
				break;
			case 3:
			case 4:
				var r = gl;
				gl = _f(e.stateNode.containerInfo), Al(e, t, n), gl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
				break;
			default: Al(e, t, n);
		}
	}
	function Ml(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				rl = r, Il(r, e);
			}
			Ml(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Pl(e), e = e.sibling;
	}
	function Pl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e), e.flags & 2048 && Vc(9, e, e.return);
				break;
			case 3:
				Nl(e);
				break;
			case 12:
				Nl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
				break;
			default: Nl(e);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				rl = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, t, t.return), Fl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
					break;
				default: Fl(t);
			}
			e = e.sibling;
		}
	}
	function Il(e, t) {
		for (; rl !== null;) {
			var n = rl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ia(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, rl = r;
			else a: for (n = e; rl !== null;) {
				r = rl;
				var i = r.sibling, a = r.return;
				if (ol(r), r === n) {
					rl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, rl = i;
					break a;
				}
				rl = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = Xi(na), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Xi(na).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, q = 0, zl = null, J = null, Y = 0, X = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = null, Ql = null, $l = !1, eu = 0, tu = 0, nu = Infinity, ru = null, iu = null, au = 0, ou = null, su = null, cu = 0, lu = 0, uu = null, du = null, fu = 0, pu = null;
	function mu() {
		return q & 2 && Y !== 0 ? Y & -Y : A.T === null ? it() : fd();
	}
	function hu() {
		if (Yl === 0) if (!(Y & 536870912) || G) {
			var e = Ge;
			Ge <<= 1, !(Ge & 3932160) && (Ge = 262144), Yl = e;
		} else Yl = 536870912;
		return e = Qa.current, e !== null && (e.flags |= 32), Yl;
	}
	function gu(e, t, n) {
		(e === zl && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Cu(e, 0), bu(e, Y, Yl, !1)), R(e, n), (!(q & 2) || e !== zl) && (e === zl && (!(q & 2) && (ql |= n), Gl === 4 && bu(e, Y, Yl, !1)), id(e));
	}
	function _u(e, t, n) {
		if (q & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ye(e, t), a = r ? ju(e, t) : ku(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && bu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !yu(n)) {
					a = ku(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Zl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Cu(c, s).flags |= 256), s = ku(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, ql |= o, a = 4;
									break a;
								}
								o = Ql, Ql = a, o !== null && (Ql === null ? Ql = o : Ql.push.apply(Ql, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Cu(e, 0), bu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							bu(r, t, Yl, !Vl);
							break a;
						case 2:
							Ql = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = eu + 300 - Oe(), 10 < a)) {
						if (bu(r, t, Yl, !Vl), Je(r, 0, !0) !== 0) break a;
						cu = t, r.timeoutHandle = qd(vu.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, "Throttled", -0, 0), a);
						break a;
					}
					vu(r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		id(e);
	}
	function vu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: U
			}, jl(t, a, d);
			var m = (a & 62914560) === a ? eu - Oe() : (a & 4194048) === a ? tu - Oe() : 0;
			if (m = Jf(d, m), m !== null) {
				cu = a, e.cancelPendingCommit = m(Ru.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), bu(e, a, o, !l);
				return;
			}
		}
		Ru(e, t, a, n, r, i, o, s, c);
	}
	function yu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!_r(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function bu(e, t, n, r) {
		t &= ~Jl, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Be(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && $e(e, n, t);
	}
	function xu() {
		return q & 6 ? !0 : (ad(0, !1), !1);
	}
	function Su() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Hi = Vi = null, Eo(e), Da = null, Oa = 0, e = J;
			for (; e !== null;) zc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Cu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cu = 0, Su(), zl = e, J = n = ai(e.current, null), Y = t, X = 0, Bl = null, Vl = !1, Hl = Ye(e, t), Ul = !1, Xl = Yl = Jl = ql = Kl = Gl = 0, Ql = Zl = null, $l = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Be(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, Yr(), n;
	}
	function wu(e, t) {
		K = null, A.H = Is, t === _a || t === ya ? (t = Ta(), X = 3) : t === va ? (t = Ta(), X = 4) : X = t === ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, J === null && (Gl = 1, Js(e, pi(t, e.current)));
	}
	function Tu() {
		var e = Qa.current;
		return e === null ? !0 : (Y & 4194048) === Y ? $a === null : (Y & 62914560) === Y || Y & 536870912 ? e === $a : !1;
	}
	function Eu() {
		var e = A.H;
		return A.H = Is, e === null ? Is : e;
	}
	function Du() {
		var e = A.A;
		return A.A = Ll, e;
	}
	function Ou() {
		Gl = 4, Vl || (Y & 4194048) !== Y && Qa.current !== null || (Hl = !0), !(Kl & 134217727) && !(ql & 134217727) || zl === null || bu(zl, Y, Yl, !1);
	}
	function ku(e, t, n) {
		var r = q;
		q |= 2;
		var i = Eu(), a = Du();
		(zl !== e || Y !== t) && (ru = null, Cu(e, t)), t = !1;
		var o = Gl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = Bl;
					switch (X) {
						case 8:
							Su(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Qa.current === null && (t = !0);
							var l = X;
							if (X = 0, Bl = null, Fu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, Bl = null, Fu(e, s, c, l);
					}
				}
				Au(), o = Gl;
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Hi = Vi = null, q = r, A.H = i, A.A = a, J === null && (zl = null, Y = 0, Yr()), o;
	}
	function Au() {
		for (; J !== null;) Nu(J);
	}
	function ju(e, t) {
		var n = q;
		q |= 2;
		var r = Eu(), a = Du();
		zl !== e || Y !== t ? (ru = null, nu = Oe() + 500, Cu(e, t)) : Hl = Ye(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = Bl;
					b: switch (X) {
						case 1:
							X = 0, Bl = null, Fu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (xa(o)) {
								X = 0, Bl = null, Pu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || zl !== e || (X = 7), id(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							xa(o) ? (X = 0, Bl = null, Pu(t)) : (X = 0, Bl = null, Fu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Gf(s) : c.stateNode.complete) {
										X = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Iu(u));
										}
										break b;
									}
							}
							X = 0, Bl = null, Fu(e, t, o, 5);
							break;
						case 6:
							X = 0, Bl = null, Fu(e, t, o, 6);
							break;
						case 8:
							Su(), Gl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Mu();
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return Hi = Vi = null, A.H = r, A.A = a, q = n, J === null ? (zl = null, Y = 0, Yr(), Gl) : 0;
	}
	function Mu() {
		for (; J !== null && !Ee();) Nu(J);
	}
	function Nu(e) {
		var t = Ac(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Pu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = mc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Eo(t);
			default: zc(n, t), t = J = oi(t, Wl), t = Ac(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Fu(e, t, n, r) {
		Hi = Vi = null, Eo(t), Da = null, Oa = 0;
		var i = t.return;
		try {
			if ($s(e, i, t, n, Y)) {
				Gl = 1, Js(e, pi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Gl = 1, Js(e, pi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (G || r === 1 ? e = !0 : Hl || Y & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Qa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Lu(t, e)) : Iu(t);
	}
	function Iu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Lu(t, Vl);
				return;
			}
			e = t.return;
			var n = Lc(t.alternate, t, Wl);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Gl === 0 && (Gl = 5);
	}
	function Lu(e, t) {
		do {
			var n = Rc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Gl = 6, J = null;
	}
	function Ru(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Uu();
		while (au !== 0);
		if (q & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Jr, Qe(e, n, o, s, c, l), e === zl && (J = zl = null, Y = 0), su = t, ou = e, cu = n, lu = o, uu = a, du = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Zu(Me, function() {
				return Wu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = A.T, A.T = null, a = j.p, j.p = 2, s = q, q |= 4;
				try {
					il(e, t, n);
				} finally {
					q = s, j.p = a, A.T = r;
				}
			}
			au = 1, zu(), Bu(), Vu();
		}
	}
	function zu() {
		if (au === 1) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = q;
				q |= 4;
				try {
					_l(t, e);
					var a = Bd, o = Sr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && xr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Cr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = br(s, h), v = br(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					cp = !!zd, Bd = zd = null;
				} finally {
					q = i, j.p = r, A.T = n;
				}
			}
			e.current = t, au = 2;
		}
	}
	function Bu() {
		if (au === 2) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = q;
				q |= 4;
				try {
					al(e, t.alternate, t);
				} finally {
					q = i, j.p = r, A.T = n;
				}
			}
			au = 3;
		}
	}
	function Vu() {
		if (au === 4 || au === 3) {
			au = 0, De();
			var e = ou, t = su, n = cu, r = du;
			t.subtreeFlags & 10256 || t.flags & 10256 ? au = 5 : (au = 0, su = ou = null, Hu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (iu = null), rt(n), t = t.stateNode, Re && typeof Re.onCommitFiberRoot == "function") try {
				Re.onCommitFiberRoot(Le, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = A.T, i = j.p, j.p = 2, A.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					A.T = t, j.p = i;
				}
			}
			cu & 3 && Uu(), id(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === pu ? fu++ : (fu = 0, pu = e) : fu = 0, ad(0, !1);
		}
	}
	function Hu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ia(t)));
	}
	function Uu() {
		return zu(), Bu(), Vu(), Wu();
	}
	function Wu() {
		if (au !== 5) return !1;
		var e = ou, t = lu;
		lu = 0;
		var n = rt(cu), r = A.T, a = j.p;
		try {
			j.p = 32 > n ? 32 : n, A.T = null, n = uu, uu = null;
			var o = ou, s = cu;
			if (au = 0, su = ou = null, cu = 0, q & 6) throw Error(i(331));
			var c = q;
			if (q |= 4, Pl(o.current), El(o, o.current, s, n), q = c, ad(0, !1), Re && typeof Re.onPostCommitFiberRoot == "function") try {
				Re.onPostCommitFiberRoot(Le, o);
			} catch {}
			return !0;
		} finally {
			j.p = a, A.T = r, Hu(e, t);
		}
	}
	function Gu(e, t, n) {
		t = pi(n, t), t = Xs(e.stateNode, t, 2), e = za(e, t, 2), e !== null && (R(e, 2), id(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Gu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Gu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (iu === null || !iu.has(r))) {
					e = pi(n, e), n = Zs(2), r = za(t, n, 2), r !== null && (Qs(n, r, t, e), R(r, 2), id(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Rl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = qu.bind(null, e, t, n), t.then(e, e));
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, zl === e && (Y & n) === n && (Gl === 4 || Gl === 3 && (Y & 62914560) === Y && 300 > Oe() - eu ? !(q & 2) && Cu(e, 0) : Jl |= n, Xl === Y && (Xl = 0)), id(e);
	}
	function Ju(e, t) {
		t === 0 && (t = I()), e = Qr(e, t), e !== null && (R(e, t), id(e));
	}
	function Yu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ju(e, n);
	}
	function Xu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ju(e, n);
	}
	function Zu(e, t) {
		return we(e, t);
	}
	var Qu = null, $u = null, ed = !1, td = !1, nd = !1, rd = 0;
	function id(e) {
		e !== $u && e.next === null && ($u === null ? Qu = $u = e : $u = $u.next = e), td = !0, ed || (ed = !0, dd());
	}
	function ad(e, t) {
		if (!nd && td) {
			nd = !0;
			do
				for (var n = !1, r = Qu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Be(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ud(r, a));
					} else a = Y, a = Je(r, r === zl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ye(r, a) || (n = !0, ud(r, a));
					r = r.next;
				}
			while (n);
			nd = !1;
		}
	}
	function od() {
		sd();
	}
	function sd() {
		td = ed = !1;
		var e = 0;
		rd !== 0 && Kd() && (e = rd);
		for (var t = Oe(), n = null, r = Qu; r !== null;) {
			var i = r.next, a = cd(r, t);
			a === 0 ? (r.next = null, n === null ? Qu = i : n.next = i, i === null && ($u = n)) : (n = r, (e !== 0 || a & 3) && (td = !0)), r = i;
		}
		au !== 0 && au !== 5 || ad(e, !1), rd !== 0 && (rd = 0);
	}
	function cd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Be(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Xe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = zl, n = Y, n = Je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Te(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ye(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Te(r), rt(n)) {
				case 2:
				case 8:
					n = je;
					break;
				case 32:
					n = Me;
					break;
				case 268435456:
					n = Pe;
					break;
				default: n = Me;
			}
			return r = ld.bind(null, e), n = we(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Te(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ld(e, t) {
		if (au !== 0 && au !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Uu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Je(e, e === zl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (_u(e, r, t), cd(e, Oe()), e.callbackNode != null && e.callbackNode === n ? ld.bind(null, e) : null);
	}
	function ud(e, t) {
		if (Uu()) return null;
		_u(e, t, !0);
	}
	function dd() {
		Xd(function() {
			q & 6 ? we(Ae, od) : sd();
		});
	}
	function fd() {
		if (rd === 0) {
			var e = sa;
			e === 0 && (e = We, We <<= 1, !(We & 261888) && (We = 256)), rd = e;
		}
		return rd;
	}
	function pd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yt("" + e);
	}
	function md(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function hd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = pd((i[ct] || null).action), o = r.submitter;
			o && (t = (t = o[ct] || null) ? pd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new gn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (rd !== 0) {
								var e = o ? md(i, o) : new FormData(i);
								Ss(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? md(i, o) : new FormData(i), Ss(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var gd = 0; gd < Ur.length; gd++) {
		var _d = Ur[gd];
		Wr(_d.toLowerCase(), "on" + (_d[0].toUpperCase() + _d.slice(1)));
	}
	Wr(Fr, "onAnimationEnd"), Wr(Ir, "onAnimationIteration"), Wr(Lr, "onAnimationStart"), Wr("dblclick", "onDoubleClick"), Wr("focusin", "onFocus"), Wr("focusout", "onBlur"), Wr(Rr, "onTransitionRun"), Wr(zr, "onTransitionStart"), Wr(Br, "onTransitionCancel"), Wr(Vr, "onTransitionEnd"), B("onMouseEnter", ["mouseout", "mouseover"]), B("onMouseLeave", ["mouseout", "mouseover"]), B("onPointerEnter", ["pointerout", "pointerover"]), B("onPointerLeave", ["pointerout", "pointerover"]), z("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), z("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), z("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), z("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), z("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), z("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var vd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vd));
	function bd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Gr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Gr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[ut];
		n === void 0 && (n = t[ut] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (wd(t, e, 2, !1), n.add(r));
	}
	function xd(e, t, n) {
		var r = 0;
		t && (r |= 4), wd(n, e, r, t);
	}
	var Sd = "_reactListening" + Math.random().toString(36).slice(2);
	function Cd(e) {
		if (!e[Sd]) {
			e[Sd] = !0, xt.forEach(function(t) {
				t !== "selectionchange" && (yd.has(t) || xd(t, !1, e), xd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Sd] || (t[Sd] = !0, xd("selectionchange", !1, t));
		}
	}
	function wd(e, t, n, r) {
		switch (hp(t)) {
			case 2:
				var i = lp;
				break;
			case 8:
				i = up;
				break;
			default: i = dp;
		}
		n = i.bind(null, t, n, e), i = void 0, !on || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Td(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = gt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		nn(function() {
			var r = a, i = Zt(n), s = [];
			a: {
				var c = Hr.get(e);
				if (c !== void 0) {
					var l = gn, u = e;
					switch (e) {
						case "keypress": if (fn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Pn;
							break;
						case "focusin":
							u = "focus", l = Tn;
							break;
						case "focusout":
							u = "blur", l = Tn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Tn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Cn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = wn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = In;
							break;
						case Fr:
						case Ir:
						case Lr:
							l = En;
							break;
						case Vr:
							l = Ln;
							break;
						case "scroll":
						case "scrollend":
							l = vn;
							break;
						case "wheel":
							l = Rn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Dn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Fn;
							break;
						case "toggle":
						case "beforetoggle": l = zn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = rn(m, p), g != null && d.push(Ed(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Xt && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[lt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Cn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Fn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Od, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && kd(s, c, l, d, !1), u !== null && f !== null && kd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = ar;
					else if ($n(c)) if (or) v = hr;
					else {
						v = pr;
						var y = fr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && qt(r.elementType) && (v = ar) : v = mr;
					if (v &&= v(e, r)) {
						er(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && zt(c, "number", c.value);
				}
				switch (y = r ? vt(r) : window, e) {
					case "focusin":
						($n(y) || y.contentEditable === "true") && (Tr = y, Er = r, Dr = null);
						break;
					case "focusout":
						Dr = Er = Tr = null;
						break;
					case "mousedown":
						Or = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Or = !1, kr(s, n, i);
						break;
					case "selectionchange": if (wr) break;
					case "keydown":
					case "keyup": kr(s, n, i);
				}
				var b;
				if (Vn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Yn ? qn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Wn && n.locale !== "ko" && (Yn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Yn && (b = dn()) : (cn = i, ln = "value" in cn ? cn.value : cn.textContent, Yn = !0)), y = Dd(r, x), 0 < y.length && (x = new On(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Jn(n), b !== null && (x.data = b)))), (b = Un ? Xn(e, n) : Zn(e, n)) && (x = Dd(r, "onBeforeInput"), 0 < x.length && (y = new On("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), hd(s, e, r, n, i);
			}
			bd(s, t);
		});
	}
	function Ed(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Dd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = rn(e, n), i != null && r.unshift(Ed(e, i, a)), i = rn(e, t), i != null && r.push(Ed(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Od(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function kd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = rn(n, a), l != null && o.unshift(Ed(n, l, c))) : i || (l = rn(n, a), l != null && o.push(Ed(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Ad = /\r\n?/g, jd = /\u0000|\uFFFD/g;
	function Md(e) {
		return (typeof e == "string" ? e : "" + e).replace(Ad, "\n").replace(jd, "");
	}
	function Nd(e, t) {
		return t = Md(t), Md(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ut(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ut(e, "" + r);
				break;
			case "className":
				Dt(e, "class", r);
				break;
			case "tabIndex":
				Dt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Dt(e, n, r);
				break;
			case "style":
				Kt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Dt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = U);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Yt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), V(e, "popover", r);
				break;
			case "xlinkActuate":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				V(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Jt.get(n) || n, V(e, n, r));
		}
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Kt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Ut(e, r) : (typeof r == "number" || typeof r == "bigint") && Ut(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = U);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!St.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[ct] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : V(e, n, r);
			}
		}
	}
	function Fd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Rt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Bt(e, !!r, n, !0) : Bt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Ht(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < vd.length; r++) Q(vd[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (qt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Pd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Id(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Lt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Bt(e, !!n, n ? [] : "", !1) : Bt(e, !!n, t, !0)) : Bt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Vt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (qt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Pd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Pd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Ld(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Rd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Ld(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Ld(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var zd = null, Bd = null;
	function Vd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Hd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Ud(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Wd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Gd = null;
	function Kd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Gd ? !1 : (Gd = e, !0) : (Gd = null, !1);
	}
	var qd = typeof setTimeout == "function" ? setTimeout : void 0, Jd = typeof clearTimeout == "function" ? clearTimeout : void 0, Yd = typeof Promise == "function" ? Promise : void 0, Xd = typeof queueMicrotask == "function" ? queueMicrotask : Yd === void 0 ? qd : function(e) {
		return Yd.resolve(null).then(e).catch(Zd);
	};
	function Zd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Qd(e) {
		return e === "head";
	}
	function $d(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Pp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") mf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, mf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[mt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && mf(e.ownerDocument.body);
			n = i;
		} while (n);
		Pp(t);
	}
	function ef(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function tf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					tf(n), ht(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function nf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[mt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function rf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function of(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var uf = null;
	function df(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function ff(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pf(e, t, n) {
		switch (t = Vd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function mf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		ht(e);
	}
	var hf = /* @__PURE__ */ new Map(), gf = /* @__PURE__ */ new Set();
	function _f(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var vf = j.d;
	j.d = {
		f: yf,
		r: bf,
		D: Cf,
		C: wf,
		L: Tf,
		m: Ef,
		X: Of,
		S: Df,
		M: kf
	};
	function yf() {
		var e = vf.f(), t = xu();
		return e || t;
	}
	function bf(e) {
		var t = _t(e);
		t !== null && t.tag === 5 && t.type === "form" ? ws(t) : vf.r(e);
	}
	var xf = typeof document > "u" ? null : document;
	function Sf(e, t, n) {
		var r = xf;
		if (r && typeof t == "string" && t) {
			var i = It(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), gf.has(i) || (gf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Cf(e) {
		vf.D(e), Sf("dns-prefetch", e, null);
	}
	function wf(e, t) {
		vf.C(e, t), Sf("preconnect", e, t);
	}
	function Tf(e, t, n) {
		vf.L(e, t, n);
		var r = xf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + It(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + It(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + It(n.imageSizes) + "\"]")) : i += "[href=\"" + It(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = jf(e);
					break;
				case "script": a = Ff(e);
			}
			hf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), hf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Mf(a)) || t === "script" && r.querySelector(If(a)) || (t = r.createElement("link"), Fd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Ef(e, t) {
		vf.m(e, t);
		var n = xf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + It(r) + "\"][href=\"" + It(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Ff(e);
			}
			if (!hf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), hf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(If(a))) return;
				}
				r = n.createElement("link"), Fd(r, "link", e), bt(r), n.head.appendChild(r);
			}
		}
	}
	function Df(e, t, n) {
		vf.S(e, t, n);
		var r = xf;
		if (r && e) {
			var i = yt(r).hoistableStyles, a = jf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Mf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = hf.get(a)) && zf(e, n);
					var c = o = r.createElement("link");
					bt(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Rf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Of(e, t) {
		vf.X(e, t);
		var n = xf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), bt(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t) {
		vf.M(e, t);
		var n = xf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), bt(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Af(e, t, n, r) {
		var a = (a = de.current) ? _f(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = jf(n.href), n = yt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = jf(n.href);
					var o = yt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Mf(e))) && !o._p && (s.instance = o, s.state.loading = 5), hf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, hf.set(e, n), o || Pf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ff(n), n = yt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function jf(e) {
		return "href=\"" + It(e) + "\"";
	}
	function Mf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Nf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Pf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), bt(t), e.head.appendChild(t));
	}
	function Ff(e) {
		return "[src=\"" + It(e) + "\"]";
	}
	function If(e) {
		return "script[async]" + e;
	}
	function Lf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + It(n.href) + "\"]");
				if (r) return t.instance = r, bt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), bt(r), Fd(r, "style", a), Rf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = jf(n.href);
				var o = e.querySelector(Mf(a));
				if (o) return t.state.loading |= 4, t.instance = o, bt(o), o;
				r = Nf(n), (a = hf.get(a)) && zf(r, a), o = (e.ownerDocument || e).createElement("link"), bt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Rf(o, n.precedence, e), t.instance = o;
			case "script": return o = Ff(n.src), (a = e.querySelector(If(o))) ? (t.instance = a, bt(a), a) : (r = n, (a = hf.get(o)) && (r = h({}, n), Bf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), bt(a), Fd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Rf(r, n.precedence, e));
		return t.instance;
	}
	function Rf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Bf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Vf = null;
	function Hf(e, t, n) {
		if (Vf === null) {
			var r = /* @__PURE__ */ new Map(), i = Vf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Vf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[mt] || a[st] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Uf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Wf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Gf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Kf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = jf(r.href), a = t.querySelector(Mf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Yf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, bt(a);
					return;
				}
				a = t.ownerDocument || t, r = Nf(r), (i = hf.get(i)) && zf(r, i), a = a.createElement("link"), bt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Fd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Yf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var qf = 0;
	function Jf(e, t) {
		return e.stylesheets && e.count === 0 && Zf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && qf === 0 && (qf = 62500 * Rd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > qf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Yf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Zf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Xf = null;
	function Zf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Xf = /* @__PURE__ */ new Map(), t.forEach(Qf, e), Xf = null, Yf.call(e));
	}
	function Qf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Xf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Xf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Yf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var $f = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: oe,
		_currentValue2: oe,
		_threadCount: 0
	};
	function ep(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function tp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ep(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ri(3, null, null, t), e.current = a, a.stateNode = e, t = ra(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ia(a), e;
	}
	function np(e) {
		return e ? (e = ti, e) : ti;
	}
	function rp(e, t, n, r, i, a) {
		i = np(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ra(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = za(e, r, t), n !== null && (gu(n, e, t), Ba(n, e, t));
	}
	function ip(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ap(e, t) {
		ip(e, t), (e = e.alternate) && ip(e, t);
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Qr(e, 67108864);
			t !== null && gu(t, e, 67108864), ap(e, 67108864);
		}
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mu();
			t = nt(t);
			var n = Qr(e, t);
			n !== null && gu(n, e, t), ap(e, t);
		}
	}
	var cp = !0;
	function lp(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 2, dp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function up(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 8, dp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function dp(e, t, n, r) {
		if (cp) {
			var i = fp(r);
			if (i === null) Td(e, t, r, pp, n), wp(e, r);
			else if (Ep(i, e, t, n, r)) r.stopPropagation();
			else if (wp(e, r), t & 4 && -1 < Cp.indexOf(e)) {
				for (; i !== null;) {
					var a = _t(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Be(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									id(a), !(q & 6) && (nu = Oe() + 500, ad(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Qr(a, 2), s !== null && gu(s, a, 2), xu(), ap(a, 2);
					}
					if (a = fp(r), a === null && Td(e, t, r, pp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Td(e, t, r, null, n);
		}
	}
	function fp(e) {
		return e = Zt(e), mp(e);
	}
	var pp = null;
	function mp(e) {
		if (pp = null, e = gt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return pp = e, null;
	}
	function hp(e) {
		switch (e) {
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
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
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
			case "pointerleave": return 8;
			case "message": switch (ke()) {
				case Ae: return 2;
				case je: return 8;
				case Me:
				case Ne: return 32;
				case Pe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var gp = !1, _p = null, vp = null, yp = null, bp = /* @__PURE__ */ new Map(), xp = /* @__PURE__ */ new Map(), Sp = [], Cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function wp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				_p = null;
				break;
			case "dragenter":
			case "dragleave":
				vp = null;
				break;
			case "mouseover":
			case "mouseout":
				yp = null;
				break;
			case "pointerover":
			case "pointerout":
				bp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": xp.delete(t.pointerId);
		}
	}
	function Tp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = _t(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ep(e, t, n, r, i) {
		switch (t) {
			case "focusin": return _p = Tp(_p, e, t, n, r, i), !0;
			case "dragenter": return vp = Tp(vp, e, t, n, r, i), !0;
			case "mouseover": return yp = Tp(yp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return bp.set(a, Tp(bp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, xp.set(a, Tp(xp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Dp(e) {
		var t = gt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, at(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, at(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Op(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = fp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Xt = r, n.target.dispatchEvent(r), Xt = null;
			} else return t = _t(n), t !== null && op(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function kp(e, t, n) {
		Op(e) && n.delete(t);
	}
	function Ap() {
		gp = !1, _p !== null && Op(_p) && (_p = null), vp !== null && Op(vp) && (vp = null), yp !== null && Op(yp) && (yp = null), bp.forEach(kp), xp.forEach(kp);
	}
	function jp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, gp || (gp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Ap)));
	}
	var Mp = null;
	function Np(e) {
		Mp !== e && (Mp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Mp === e && (Mp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (mp(r || n) === null) continue;
					break;
				}
				var a = _t(n);
				a !== null && (e.splice(t, 3), t -= 3, Ss(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Pp(e) {
		function t(t) {
			return jp(t, e);
		}
		_p !== null && jp(_p, e), vp !== null && jp(vp, e), yp !== null && jp(yp, e), bp.forEach(t), xp.forEach(t);
		for (var n = 0; n < Sp.length; n++) {
			var r = Sp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Sp.length && (n = Sp[0], n.blockedOn === null);) Dp(n), n.blockedOn === null && Sp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ct] || null;
			if (typeof a == "function") o || Np(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ct] || null) s = o.formAction;
					else if (mp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Np(n);
			}
		}
	}
	function Fp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Ip(e) {
		this._internalRoot = e;
	}
	Lp.prototype.render = Ip.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		rp(n, mu(), e, t, null, null);
	}, Lp.prototype.unmount = Ip.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			rp(e.current, 2, null, e, null, null), xu(), t[lt] = null;
		}
	};
	function Lp(e) {
		this._internalRoot = e;
	}
	Lp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = it();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Sp.length && t !== 0 && t < Sp[n].priority; n++);
			Sp.splice(n, 0, e), n === 0 && Dp(e);
		}
	};
	var Rp = n.version;
	if (Rp !== "19.2.5") throw Error(i(527, Rp, "19.2.5"));
	j.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var zp = {
		bundleType: 0,
		version: "19.2.5",
		rendererPackageName: "react-dom",
		currentDispatcherRef: A,
		reconcilerVersion: "19.2.5"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Bp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Bp.isDisabled && Bp.supportsFiber) try {
			Le = Bp.inject(zp), Re = Bp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Gs, s = Ks, c = qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tp(e, 1, !1, null, null, n, r, null, o, s, c, Fp), e[lt] = t.current, Cd(e), new Ip(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ c(u()), v = /* @__PURE__ */ c(g()), y = /* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.leaflet = {}));
	})(e, (function(e) {
		var t = "1.9.4";
		function n(e) {
			var t, n, r, i;
			for (n = 1, r = arguments.length; n < r; n++) for (t in i = arguments[n], i) e[t] = i[t];
			return e;
		}
		var r = Object.create || (function() {
			function e() {}
			return function(t) {
				return e.prototype = t, new e();
			};
		})();
		function i(e, t) {
			var n = Array.prototype.slice;
			if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
			var r = n.call(arguments, 2);
			return function() {
				return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments);
			};
		}
		var a = 0;
		function o(e) {
			return "_leaflet_id" in e || (e._leaflet_id = ++a), e._leaflet_id;
		}
		function s(e, t, n) {
			var r, i, a, o = function() {
				r = !1, i &&= (a.apply(n, i), !1);
			};
			return a = function() {
				r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0);
			}, a;
		}
		function c(e, t, n) {
			var r = t[1], i = t[0], a = r - i;
			return e === r && n ? e : ((e - i) % a + a) % a + i;
		}
		function l() {
			return !1;
		}
		function u(e, t) {
			if (t === !1) return e;
			var n = 10 ** (t === void 0 ? 6 : t);
			return Math.round(e * n) / n;
		}
		function d(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
		}
		function f(e) {
			return d(e).split(/\s+/);
		}
		function p(e, t) {
			for (var n in Object.prototype.hasOwnProperty.call(e, "options") || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
			return e.options;
		}
		function m(e, t, n) {
			var r = [];
			for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + "=" + encodeURIComponent(e[i]));
			return (!t || t.indexOf("?") === -1 ? "?" : "&") + r.join("&");
		}
		var h = /\{ *([\w_ -]+) *\}/g;
		function g(e, t) {
			return e.replace(h, function(e, n) {
				var r = t[n];
				if (r === void 0) throw Error("No value provided for variable " + e);
				return typeof r == "function" && (r = r(t)), r;
			});
		}
		var _ = Array.isArray || function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		};
		function v(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
			return -1;
		}
		var y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function b(e) {
			return window["webkit" + e] || window["moz" + e] || window["ms" + e];
		}
		var x = 0;
		function S(e) {
			var t = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (t - x));
			return x = t + n, window.setTimeout(e, n);
		}
		var C = window.requestAnimationFrame || b("RequestAnimationFrame") || S, w = window.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(e) {
			window.clearTimeout(e);
		};
		function ee(e, t, n) {
			if (n && C === S) e.call(t);
			else return C.call(window, i(e, t));
		}
		function te(e) {
			e && w.call(window, e);
		}
		var ne = {
			__proto__: null,
			extend: n,
			create: r,
			bind: i,
			get lastId() {
				return a;
			},
			stamp: o,
			throttle: s,
			wrapNum: c,
			falseFn: l,
			formatNum: u,
			trim: d,
			splitWords: f,
			setOptions: p,
			getParamString: m,
			template: g,
			isArray: _,
			indexOf: v,
			emptyImageUrl: y,
			requestFn: C,
			cancelFn: w,
			requestAnimFrame: ee,
			cancelAnimFrame: te
		};
		function T() {}
		T.extend = function(e) {
			var t = function() {
				p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
			}, i = t.__super__ = this.prototype, a = r(i);
			for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (t[o] = this[o]);
			return e.statics && n(t, e.statics), e.includes && (E(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
				if (!this._initHooksCalled) {
					i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this);
				}
			}, t;
		}, T.include = function(e) {
			var t = this.prototype.options;
			return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this;
		}, T.mergeOptions = function(e) {
			return n(this.prototype.options, e), this;
		}, T.addInitHook = function(e) {
			var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
				this[e].apply(this, t);
			};
			return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
		};
		function E(e) {
			if (!(typeof L > "u" || !L || !L.Mixin)) {
				e = _(e) ? e : [e];
				for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ Error()).stack);
			}
		}
		var re = {
			on: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n);
				}
				return this;
			},
			off: function(e, t, n) {
				if (!arguments.length) delete this._events;
				else if (typeof e == "object") for (var r in e) this._off(r, e[r], t);
				else {
					e = f(e);
					for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n);
				}
				return this;
			},
			_on: function(e, t, n, r) {
				if (typeof t != "function") {
					console.warn("wrong listener type: " + typeof t);
					return;
				}
				if (this._listens(e, t, n) === !1) {
					n === this && (n = void 0);
					var i = {
						fn: t,
						ctx: n
					};
					r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i);
				}
			},
			_off: function(e, t, n) {
				var r, i, a;
				if (this._events && (r = this._events[e], r)) {
					if (arguments.length === 1) {
						if (this._firingCount) for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
						delete this._events[e];
						return;
					}
					if (typeof t != "function") {
						console.warn("wrong listener type: " + typeof t);
						return;
					}
					var o = this._listens(e, t, n);
					if (o !== !1) {
						var s = r[o];
						this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1);
					}
				}
			},
			fire: function(e, t, r) {
				if (!this.listens(e, r)) return this;
				var i = n({}, t, {
					type: e,
					target: this,
					sourceTarget: t && t.sourceTarget || this
				});
				if (this._events) {
					var a = this._events[e];
					if (a) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var o = 0, s = a.length; o < s; o++) {
							var c = a[o], l = c.fn;
							c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i);
						}
						this._firingCount--;
					}
				}
				return r && this._propagateEvent(i), this;
			},
			listens: function(e, t, n, r) {
				typeof e != "string" && console.warn("\"string\" type argument expected");
				var i = t;
				typeof t != "function" && (r = !!t, i = void 0, n = void 0);
				var a = this._events && this._events[e];
				if (a && a.length && this._listens(e, i, n) !== !1) return !0;
				if (r) {
					for (var o in this._eventParents) if (this._eventParents[o].listens(e, t, n, r)) return !0;
				}
				return !1;
			},
			_listens: function(e, t, n) {
				if (!this._events) return !1;
				var r = this._events[e] || [];
				if (!t) return !!r.length;
				n === this && (n = void 0);
				for (var i = 0, a = r.length; i < a; i++) if (r[i].fn === t && r[i].ctx === n) return i;
				return !1;
			},
			once: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t, !0);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0);
				}
				return this;
			},
			addEventParent: function(e) {
				return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this;
			},
			removeEventParent: function(e) {
				return this._eventParents && delete this._eventParents[o(e)], this;
			},
			_propagateEvent: function(e) {
				for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
					layer: e.target,
					propagatedFrom: e.target
				}, e), !0);
			}
		};
		re.addEventListener = re.on, re.removeEventListener = re.clearAllEventListeners = re.off, re.addOneTimeEventListener = re.once, re.fireEvent = re.fire, re.hasEventListeners = re.listens;
		var ie = T.extend(re);
		function D(e, t, n) {
			this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
		}
		var ae = Math.trunc || function(e) {
			return e > 0 ? Math.floor(e) : Math.ceil(e);
		};
		D.prototype = {
			clone: function() {
				return new D(this.x, this.y);
			},
			add: function(e) {
				return this.clone()._add(O(e));
			},
			_add: function(e) {
				return this.x += e.x, this.y += e.y, this;
			},
			subtract: function(e) {
				return this.clone()._subtract(O(e));
			},
			_subtract: function(e) {
				return this.x -= e.x, this.y -= e.y, this;
			},
			divideBy: function(e) {
				return this.clone()._divideBy(e);
			},
			_divideBy: function(e) {
				return this.x /= e, this.y /= e, this;
			},
			multiplyBy: function(e) {
				return this.clone()._multiplyBy(e);
			},
			_multiplyBy: function(e) {
				return this.x *= e, this.y *= e, this;
			},
			scaleBy: function(e) {
				return new D(this.x * e.x, this.y * e.y);
			},
			unscaleBy: function(e) {
				return new D(this.x / e.x, this.y / e.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				return this.x = ae(this.x), this.y = ae(this.y), this;
			},
			distanceTo: function(e) {
				e = O(e);
				var t = e.x - this.x, n = e.y - this.y;
				return Math.sqrt(t * t + n * n);
			},
			equals: function(e) {
				return e = O(e), e.x === this.x && e.y === this.y;
			},
			contains: function(e) {
				return e = O(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + u(this.x) + ", " + u(this.y) + ")";
			}
		};
		function O(e, t, n) {
			return e instanceof D ? e : _(e) ? new D(e[0], e[1]) : e == null ? e : typeof e == "object" && "x" in e && "y" in e ? new D(e.x, e.y) : new D(e, t, n);
		}
		function k(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		k.prototype = {
			extend: function(e) {
				var t, n;
				if (!e) return this;
				if (e instanceof D || typeof e[0] == "number" || "x" in e) t = n = O(e);
				else if (e = A(e), t = e.min, n = e.max, !t || !n) return this;
				return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
			},
			getCenter: function(e) {
				return O((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
			},
			getBottomLeft: function() {
				return O(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return O(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(e) {
				var t, n;
				return e = typeof e[0] == "number" || e instanceof D ? O(e) : A(e), e instanceof k ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y;
			},
			intersects: function(e) {
				e = A(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x >= t.x && r.x <= n.x, o = i.y >= t.y && r.y <= n.y;
				return a && o;
			},
			overlaps: function(e) {
				e = A(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x > t.x && r.x < n.x, o = i.y > t.y && r.y < n.y;
				return a && o;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(e) {
				var t = this.min, n = this.max, r = Math.abs(t.x - n.x) * e, i = Math.abs(t.y - n.y) * e;
				return A(O(t.x - r, t.y - i), O(n.x + r, n.y + i));
			},
			equals: function(e) {
				return e ? (e = A(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1;
			}
		};
		function A(e, t) {
			return !e || e instanceof k ? e : new k(e, t);
		}
		function j(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		j.prototype = {
			extend: function(e) {
				var t = this._southWest, n = this._northEast, r, i;
				if (e instanceof M) r = e, i = e;
				else if (e instanceof j) {
					if (r = e._southWest, i = e._northEast, !r || !i) return this;
				} else return e ? this.extend(N(e) || oe(e)) : this;
				return !t && !n ? (this._southWest = new M(r.lat, r.lng), this._northEast = new M(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this;
			},
			pad: function(e) {
				var t = this._southWest, n = this._northEast, r = Math.abs(t.lat - n.lat) * e, i = Math.abs(t.lng - n.lng) * e;
				return new j(new M(t.lat - r, t.lng - i), new M(n.lat + r, n.lng + i));
			},
			getCenter: function() {
				return new M((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new M(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new M(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(e) {
				e = typeof e[0] == "number" || e instanceof M || "lat" in e ? N(e) : oe(e);
				var t = this._southWest, n = this._northEast, r, i;
				return e instanceof j ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng;
			},
			intersects: function(e) {
				e = oe(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat >= t.lat && r.lat <= n.lat, o = i.lng >= t.lng && r.lng <= n.lng;
				return a && o;
			},
			overlaps: function(e) {
				e = oe(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat > t.lat && r.lat < n.lat, o = i.lng > t.lng && r.lng < n.lng;
				return a && o;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(e, t) {
				return e ? (e = oe(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1;
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function oe(e, t) {
			return e instanceof j ? e : new j(e, t);
		}
		function M(e, t, n) {
			if (isNaN(e) || isNaN(t)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
			this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n);
		}
		M.prototype = {
			equals: function(e, t) {
				return e ? (e = N(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1;
			},
			toString: function(e) {
				return "LatLng(" + u(this.lat, e) + ", " + u(this.lng, e) + ")";
			},
			distanceTo: function(e) {
				return ce.distance(this, N(e));
			},
			wrap: function() {
				return ce.wrapLatLng(this);
			},
			toBounds: function(e) {
				var t = 180 * e / 40075017, n = t / Math.cos(Math.PI / 180 * this.lat);
				return oe([this.lat - t, this.lng - n], [this.lat + t, this.lng + n]);
			},
			clone: function() {
				return new M(this.lat, this.lng, this.alt);
			}
		};
		function N(e, t, n) {
			return e instanceof M ? e : _(e) && typeof e[0] != "object" ? e.length === 3 ? new M(e[0], e[1], e[2]) : e.length === 2 ? new M(e[0], e[1]) : null : e == null ? e : typeof e == "object" && "lat" in e ? new M(e.lat, "lng" in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new M(e, t, n);
		}
		var se = {
			latLngToPoint: function(e, t) {
				var n = this.projection.project(e), r = this.scale(t);
				return this.transformation._transform(n, r);
			},
			pointToLatLng: function(e, t) {
				var n = this.scale(t), r = this.transformation.untransform(e, n);
				return this.projection.unproject(r);
			},
			project: function(e) {
				return this.projection.project(e);
			},
			unproject: function(e) {
				return this.projection.unproject(e);
			},
			scale: function(e) {
				return 256 * 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e / 256) / Math.LN2;
			},
			getProjectedBounds: function(e) {
				if (this.infinite) return null;
				var t = this.projection.bounds, n = this.scale(e);
				return new k(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n));
			},
			infinite: !1,
			wrapLatLng: function(e) {
				var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng, n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat, r = e.alt;
				return new M(n, t, r);
			},
			wrapLatLngBounds: function(e) {
				var t = e.getCenter(), n = this.wrapLatLng(t), r = t.lat - n.lat, i = t.lng - n.lng;
				if (r === 0 && i === 0) return e;
				var a = e.getSouthWest(), o = e.getNorthEast();
				return new j(new M(a.lat - r, a.lng - i), new M(o.lat - r, o.lng - i));
			}
		}, ce = n({}, se, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(e, t) {
				var n = Math.PI / 180, r = e.lat * n, i = t.lat * n, a = Math.sin((t.lat - e.lat) * n / 2), o = Math.sin((t.lng - e.lng) * n / 2), s = a * a + Math.cos(r) * Math.cos(i) * o * o, c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
				return this.R * c;
			}
		}), P = 6378137, le = {
			R: P,
			MAX_LATITUDE: 85.0511287798,
			project: function(e) {
				var t = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, e.lat), -n), i = Math.sin(r * t);
				return new D(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2);
			},
			unproject: function(e) {
				var t = 180 / Math.PI;
				return new M((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R);
			},
			bounds: (function() {
				var e = P * Math.PI;
				return new k([-e, -e], [e, e]);
			})()
		};
		function ue(e, t, n, r) {
			if (_(e)) {
				this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3];
				return;
			}
			this._a = e, this._b = t, this._c = n, this._d = r;
		}
		ue.prototype = {
			transform: function(e, t) {
				return this._transform(e.clone(), t);
			},
			_transform: function(e, t) {
				return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
			},
			untransform: function(e, t) {
				return t ||= 1, new D((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
			}
		};
		function de(e, t, n, r) {
			return new ue(e, t, n, r);
		}
		var fe = n({}, ce, {
			code: "EPSG:3857",
			projection: le,
			transformation: function() {
				var e = .5 / (Math.PI * le.R);
				return de(e, .5, -e, .5);
			}()
		}), pe = n({}, fe, { code: "EPSG:900913" });
		function me(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function he(e, t) {
			var n = "", r, i, a, o, s, c;
			for (r = 0, a = e.length; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? R.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var F = document.documentElement.style, ge = "ActiveXObject" in window, _e = ge && !document.addEventListener, ve = "msLaunchUri" in navigator && !("documentMode" in document), ye = Ze("webkit"), be = Ze("android"), xe = Ze("android 2") || Ze("android 3"), Se = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ce = be && Ze("Google") && Se < 537 && !("AudioNode" in window), we = !!window.opera, Te = !ve && Ze("chrome"), Ee = Ze("gecko") && !ye && !we && !ge, De = !Te && Ze("safari"), Oe = Ze("phantom"), ke = "OTransition" in F, Ae = navigator.platform.indexOf("Win") === 0, je = ge && "transition" in F, Me = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !xe, Ne = "MozPerspective" in F, Pe = !window.L_DISABLE_3D && (je || Me || Ne) && !ke && !Oe, Fe = typeof orientation < "u" || Ze("mobile"), Ie = Fe && ye, Le = Fe && Me, Re = !window.PointerEvent && window.MSPointerEvent, ze = !!(window.PointerEvent || Re), Be = "ontouchstart" in window || !!window.TouchEvent, Ve = !window.L_NO_TOUCH && (Be || ze), He = Fe && we, Ue = Fe && Ee, We = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Ge = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), Ke = function() {
			return !!document.createElement("canvas").getContext;
		}(), qe = !!(document.createElementNS && me("svg").createSVGRect), Je = !!qe && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), Ye = !qe && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), Xe = navigator.platform.indexOf("Mac") === 0, I = navigator.platform.indexOf("Linux") === 0;
		function Ze(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var R = {
			ie: ge,
			ielt9: _e,
			edge: ve,
			webkit: ye,
			android: be,
			android23: xe,
			androidStock: Ce,
			opera: we,
			chrome: Te,
			gecko: Ee,
			safari: De,
			phantom: Oe,
			opera12: ke,
			win: Ae,
			ie3d: je,
			webkit3d: Me,
			gecko3d: Ne,
			any3d: Pe,
			mobile: Fe,
			mobileWebkit: Ie,
			mobileWebkit3d: Le,
			msPointer: Re,
			pointer: ze,
			touch: Ve,
			touchNative: Be,
			mobileOpera: He,
			mobileGecko: Ue,
			retina: We,
			passiveEvents: Ge,
			canvas: Ke,
			svg: qe,
			vml: Ye,
			inlineSvg: Je,
			mac: Xe,
			linux: I
		}, Qe = R.msPointer ? "MSPointerDown" : "pointerdown", $e = R.msPointer ? "MSPointerMove" : "pointermove", et = R.msPointer ? "MSPointerUp" : "pointerup", tt = R.msPointer ? "MSPointerCancel" : "pointercancel", nt = {
			touchstart: Qe,
			touchmove: $e,
			touchend: et,
			touchcancel: tt
		}, rt = {
			touchstart: pt,
			touchmove: ft,
			touchend: ft,
			touchcancel: ft
		}, it = {}, at = !1;
		function ot(e, t, n) {
			return t === "touchstart" && dt(), rt[t] ? (n = rt[t].bind(this, n), e.addEventListener(nt[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function st(e, t, n) {
			if (!nt[t]) {
				console.warn("wrong event specified:", t);
				return;
			}
			e.removeEventListener(nt[t], n, !1);
		}
		function ct(e) {
			it[e.pointerId] = e;
		}
		function lt(e) {
			it[e.pointerId] && (it[e.pointerId] = e);
		}
		function ut(e) {
			delete it[e.pointerId];
		}
		function dt() {
			at ||= (document.addEventListener(Qe, ct, !0), document.addEventListener($e, lt, !0), document.addEventListener(et, ut, !0), document.addEventListener(tt, ut, !0), !0);
		}
		function ft(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], it) t.touches.push(it[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function pt(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && rn(t), ft(e, t);
		}
		function mt(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var ht = 200;
		function gt(e, t) {
			e.addEventListener("dblclick", t);
			var n = 0, r;
			function i(e) {
				if (e.detail !== 1) {
					r = e.detail;
					return;
				}
				if (!(e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
					var i = on(e);
					if (!(i.some(function(e) {
						return e instanceof HTMLLabelElement && e.attributes.for;
					}) && !i.some(function(e) {
						return e instanceof HTMLInputElement || e instanceof HTMLSelectElement;
					}))) {
						var a = Date.now();
						a - n <= ht ? (r++, r === 2 && t(mt(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function _t(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var vt = Mt([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), yt = Mt([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), bt = yt === "webkitTransition" || yt === "OTransition" ? yt + "End" : "transitionend";
		function xt(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function St(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function z(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function B(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function Ct(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function wt(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function Tt(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function Et(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = kt(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function V(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!Et(e, t)) {
				var a = kt(e);
				Ot(e, (a ? a + " " : "") + t);
			}
		}
		function Dt(e, t) {
			e.classList === void 0 ? Ot(e, d((" " + kt(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function Ot(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function kt(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function At(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && jt(e, t);
		}
		function jt(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function Mt(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function Nt(e, t, n) {
			var r = t || new D(0, 0);
			e.style[vt] = (R.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function Pt(e, t) {
			e._leaflet_pos = t, R.any3d ? Nt(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function Ft(e) {
			return e._leaflet_pos || new D(0, 0);
		}
		var It, Lt, Rt;
		if ("onselectstart" in document) It = function() {
			H(window, "selectstart", rn);
		}, Lt = function() {
			U(window, "selectstart", rn);
		};
		else {
			var zt = Mt([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			It = function() {
				if (zt) {
					var e = document.documentElement.style;
					Rt = e[zt], e[zt] = "none";
				}
			}, Lt = function() {
				zt && (document.documentElement.style[zt] = Rt, Rt = void 0);
			};
		}
		function Bt() {
			H(window, "dragstart", rn);
		}
		function Vt() {
			U(window, "dragstart", rn);
		}
		var Ht, Ut;
		function Wt(e) {
			for (; e.tabIndex === -1;) e = e.parentNode;
			e.style && (Gt(), Ht = e, Ut = e.style.outlineStyle, e.style.outlineStyle = "none", H(window, "keydown", Gt));
		}
		function Gt() {
			Ht && (Ht.style.outlineStyle = Ut, Ht = void 0, Ut = void 0, U(window, "keydown", Gt));
		}
		function Kt(e) {
			do
				e = e.parentNode;
			while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
			return e;
		}
		function qt(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.width / e.offsetWidth || 1,
				y: t.height / e.offsetHeight || 1,
				boundingClientRect: t
			};
		}
		var Jt = {
			__proto__: null,
			TRANSFORM: vt,
			TRANSITION: yt,
			TRANSITION_END: bt,
			get: xt,
			getStyle: St,
			create: z,
			remove: B,
			empty: Ct,
			toFront: wt,
			toBack: Tt,
			hasClass: Et,
			addClass: V,
			removeClass: Dt,
			setClass: Ot,
			getClass: kt,
			setOpacity: At,
			testProp: Mt,
			setTransform: Nt,
			setPosition: Pt,
			getPosition: Ft,
			get disableTextSelection() {
				return It;
			},
			get enableTextSelection() {
				return Lt;
			},
			disableImageDrag: Bt,
			enableImageDrag: Vt,
			preventOutline: Wt,
			restoreOutline: Gt,
			getSizedParentNode: Kt,
			getScale: qt
		};
		function H(e, t, n, r) {
			if (t && typeof t == "object") for (var i in t) Qt(e, i, t[i], n);
			else {
				t = f(t);
				for (var a = 0, o = t.length; a < o; a++) Qt(e, t[a], n, r);
			}
			return this;
		}
		var Yt = "_leaflet_events";
		function U(e, t, n, r) {
			if (arguments.length === 1) Xt(e), delete e[Yt];
			else if (t && typeof t == "object") for (var i in t) $t(e, i, t[i], n);
			else if (t = f(t), arguments.length === 2) Xt(e, function(e) {
				return v(t, e) !== -1;
			});
			else for (var a = 0, o = t.length; a < o; a++) $t(e, t[a], n, r);
			return this;
		}
		function Xt(e, t) {
			for (var n in e[Yt]) {
				var r = n.split(/\d/)[0];
				(!t || t(r)) && $t(e, r, null, null, n);
			}
		}
		var Zt = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function Qt(e, t, n, r) {
			var i = t + o(n) + (r ? "_" + o(r) : "");
			if (e[Yt] && e[Yt][i]) return this;
			var a = function(t) {
				return n.call(r || e, t || window.event);
			}, s = a;
			!R.touchNative && R.pointer && t.indexOf("touch") === 0 ? a = ot(e, t, a) : R.touch && t === "dblclick" ? a = gt(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Zt[t] || t, a, R.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, un(e, t) && s(t);
			}, e.addEventListener(Zt[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Yt] = e[Yt] || {}, e[Yt][i] = a;
		}
		function $t(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Yt] && e[Yt][i];
			if (!a) return this;
			!R.touchNative && R.pointer && t.indexOf("touch") === 0 ? st(e, t, a) : R.touch && t === "dblclick" ? _t(e, a) : "removeEventListener" in e ? e.removeEventListener(Zt[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Yt][i] = null;
		}
		function en(e) {
			return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this;
		}
		function tn(e) {
			return Qt(e, "wheel", en), this;
		}
		function nn(e) {
			return H(e, "mousedown touchstart dblclick contextmenu", en), e._leaflet_disable_click = !0, this;
		}
		function rn(e) {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
		}
		function an(e) {
			return rn(e), en(e), this;
		}
		function on(e) {
			if (e.composedPath) return e.composedPath();
			for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
			return t;
		}
		function sn(e, t) {
			if (!t) return new D(e.clientX, e.clientY);
			var n = qt(t), r = n.boundingClientRect;
			return new D((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop);
		}
		var cn = R.linux && R.chrome ? window.devicePixelRatio : R.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function ln(e) {
			return R.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / cn : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function un(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var dn = {
			__proto__: null,
			on: H,
			off: U,
			stopPropagation: en,
			disableScrollPropagation: tn,
			disableClickPropagation: nn,
			preventDefault: rn,
			stop: an,
			getPropagationPath: on,
			getMousePosition: sn,
			getWheelDelta: ln,
			isExternalTarget: un,
			addListener: H,
			removeListener: U
		}, fn = ie.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = Ft(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete());
			},
			_animate: function() {
				this._animId = ee(this._animate, this), this._step();
			},
			_step: function(e) {
				var t = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
				t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete());
			},
			_runFrame: function(e, t) {
				var n = this._startPos.add(this._offset.multiplyBy(e));
				t && n._round(), Pt(this._el, n), this.fire("step");
			},
			_complete: function() {
				te(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), W = ie.extend({
			options: {
				crs: fe,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: !0,
				zoomAnimationThreshold: 4,
				fadeAnimation: !0,
				markerZoomAnimation: !0,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: !0
			},
			initialize: function(e, t) {
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(N(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = yt && R.any3d && !R.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), H(this._proxy, bt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
			},
			setView: function(e, t, r) {
				return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(N(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({ animate: r.animate }, r.zoom), r.pan = n({
					animate: r.animate,
					duration: r.duration
				}, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this);
			},
			setZoom: function(e, t) {
				return this._loaded ? this.setView(this.getCenter(), e, { zoom: t }) : (this._zoom = e, this);
			},
			zoomIn: function(e, t) {
				return e ||= R.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= R.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
			},
			setZoomAround: function(e, t, n) {
				var r = this.getZoomScale(t), i = this.getSize().divideBy(2), a = (e instanceof D ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r), o = this.containerPointToLatLng(i.add(a));
				return this.setView(o, t, { zoom: n });
			},
			_getBoundsCenterZoom: function(e, t) {
				t ||= {}, e = e.getBounds ? e.getBounds() : oe(e);
				var n = O(t.paddingTopLeft || t.padding || [0, 0]), r = O(t.paddingBottomRight || t.padding || [0, 0]), i = this.getBoundsZoom(e, !1, n.add(r));
				if (i = typeof t.maxZoom == "number" ? Math.min(t.maxZoom, i) : i, i === Infinity) return {
					center: e.getCenter(),
					zoom: i
				};
				var a = r.subtract(n).divideBy(2), o = this.project(e.getSouthWest(), i), s = this.project(e.getNorthEast(), i);
				return {
					center: this.unproject(o.add(s).divideBy(2).add(a), i),
					zoom: i
				};
			},
			fitBounds: function(e, t) {
				if (e = oe(e), !e.isValid()) throw Error("Bounds are not valid.");
				var n = this._getBoundsCenterZoom(e, t);
				return this.setView(n.center, n.zoom, t);
			},
			fitWorld: function(e) {
				return this.fitBounds([[-90, -180], [90, 180]], e);
			},
			panTo: function(e, t) {
				return this.setView(e, this._zoom, { pan: t });
			},
			panBy: function(e, t) {
				if (e = O(e).round(), t ||= {}, !e.x && !e.y) return this.fire("moveend");
				if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
				if (this._panAnim || (this._panAnim = new fn(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					V(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !R.any3d) return this.setView(e, t, n);
				this._stop();
				var r = this.project(this.getCenter()), i = this.project(e), a = this.getSize(), o = this._zoom;
				e = N(e), t = t === void 0 ? o : t;
				var s = Math.max(a.x, a.y), c = s * this.getZoomScale(o, t), l = i.distanceTo(r) || 1, u = 1.42, d = u * u;
				function f(e) {
					var t = e ? -1 : 1, n = e ? c : s, r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l), i = Math.sqrt(r * r + 1) - r;
					return i < 1e-9 ? -18 : Math.log(i);
				}
				function p(e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				}
				function m(e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				}
				function h(e) {
					return p(e) / m(e);
				}
				var g = f(0);
				function _(e) {
					return s * (m(g) / m(g + u * e));
				}
				function v(e) {
					return s * (m(g) * h(g + u * e) - p(g)) / d;
				}
				function y(e) {
					return 1 - (1 - e) ** 1.5;
				}
				var b = Date.now(), x = (f(1) - g) / u, S = n.duration ? 1e3 * n.duration : 1e3 * x * .8;
				function C() {
					var n = (Date.now() - b) / S, a = y(n) * x;
					n <= 1 ? (this._flyToFrame = ee(C, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a) / l)), o), this.getScaleZoom(s / _(a), o), { flyTo: !0 })) : this._move(e, t)._moveEnd(!0);
				}
				return this._moveStart(!0, n.noMoveStart), C.call(this), this;
			},
			flyToBounds: function(e, t) {
				var n = this._getBoundsCenterZoom(e, t);
				return this.flyTo(n.center, n.zoom, t);
			},
			setMaxBounds: function(e) {
				return e = oe(e), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
			},
			setMinZoom: function(e) {
				var t = this.options.minZoom;
				return this.options.minZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this;
			},
			setMaxZoom: function(e) {
				var t = this.options.maxZoom;
				return this.options.maxZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this;
			},
			panInsideBounds: function(e, t) {
				this._enforcingBounds = !0;
				var n = this.getCenter(), r = this._limitCenter(n, this._zoom, oe(e));
				return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this;
			},
			panInside: function(e, t) {
				t ||= {};
				var n = O(t.paddingTopLeft || t.padding || [0, 0]), r = O(t.paddingBottomRight || t.padding || [0, 0]), i = this.project(this.getCenter()), a = this.project(e), o = this.getPixelBounds(), s = A([o.min.add(n), o.max.subtract(r)]), c = s.getSize();
				if (!s.contains(a)) {
					this._enforcingBounds = !0;
					var l = a.subtract(s.getCenter()), u = s.extend(a).getSize().subtract(c);
					i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1;
				}
				return this;
			},
			invalidateSize: function(e) {
				if (!this._loaded) return this;
				e = n({
					animate: !1,
					pan: !0
				}, e === !0 ? { animate: !0 } : e);
				var t = this.getSize();
				this._sizeChanged = !0, this._lastCenter = null;
				var r = this.getSize(), a = t.divideBy(2).round(), o = r.divideBy(2).round(), s = a.subtract(o);
				return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire("move"), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: t,
					newSize: r
				}));
			},
			stop: function() {
				return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
			},
			locate: function(e) {
				if (e = this._locateOptions = n({
					timeout: 1e4,
					watch: !1
				}, e), !("geolocation" in navigator)) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var t = i(this._handleGeolocationResponse, this), r = i(this._handleGeolocationError, this);
				return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
			},
			_handleGeolocationError: function(e) {
				if (this._container._leaflet_id) {
					var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
					this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
						code: t,
						message: "Geolocation error: " + n + "."
					});
				}
			},
			_handleGeolocationResponse: function(e) {
				if (this._container._leaflet_id) {
					var t = e.coords.latitude, n = e.coords.longitude, r = new M(t, n), i = r.toBounds(e.coords.accuracy * 2), a = this._locateOptions;
					if (a.setView) {
						var o = this.getBoundsZoom(i);
						this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o);
					}
					var s = {
						latlng: r,
						bounds: i,
						timestamp: e.timestamp
					};
					for (var c in e.coords) typeof e.coords[c] == "number" && (s[c] = e.coords[c]);
					this.fire("locationfound", s);
				}
			},
			addHandler: function(e, t) {
				if (!t) return this;
				var n = this[e] = new t(this);
				return this._handlers.push(n), this.options[e] && n.enable(), this;
			},
			remove: function() {
				if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id, delete this._containerId;
				} catch {
					this._container._leaflet_id = void 0, this._containerId = void 0;
				}
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), B(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (te(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) B(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = z("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
				return e && (this._panes[e] = n), n;
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var e = this.getPixelBounds();
				return new j(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(e, t, n) {
				e = oe(e), n = O(n || [0, 0]);
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = A(this.project(s, r), this.project(o, r)).getSize(), u = R.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
				return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r));
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new D(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
			},
			getPixelBounds: function(e, t) {
				var n = this._getTopLeftPoint(e, t);
				return new k(n, n.add(this.getSize()));
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._pixelOrigin;
			},
			getPixelWorldBounds: function(e) {
				return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e);
			},
			getPane: function(e) {
				return typeof e == "string" ? this._panes[e] : e;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(e, t) {
				var n = this.options.crs;
				return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t);
			},
			getScaleZoom: function(e, t) {
				var n = this.options.crs;
				t = t === void 0 ? this._zoom : t;
				var r = n.zoom(e * n.scale(t));
				return isNaN(r) ? Infinity : r;
			},
			project: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(N(e), t);
			},
			unproject: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(O(e), t);
			},
			layerPointToLatLng: function(e) {
				var t = O(e).add(this.getPixelOrigin());
				return this.unproject(t);
			},
			latLngToLayerPoint: function(e) {
				return this.project(N(e))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(e) {
				return this.options.crs.wrapLatLng(N(e));
			},
			wrapLatLngBounds: function(e) {
				return this.options.crs.wrapLatLngBounds(oe(e));
			},
			distance: function(e, t) {
				return this.options.crs.distance(N(e), N(t));
			},
			containerPointToLayerPoint: function(e) {
				return O(e).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(e) {
				return O(e).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(e) {
				var t = this.containerPointToLayerPoint(O(e));
				return this.layerPointToLatLng(t);
			},
			latLngToContainerPoint: function(e) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(N(e)));
			},
			mouseEventToContainerPoint: function(e) {
				return sn(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(e) {
				var t = this._container = xt(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				H(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && R.any3d, V(e, "leaflet-container" + (R.touch ? " leaflet-touch" : "") + (R.retina ? " leaflet-retina" : "") + (R.ielt9 ? " leaflet-oldie" : "") + (R.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = St(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Pt(this._mapPane, new D(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (V(e.markerPane, "leaflet-zoom-hide"), V(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				Pt(this._mapPane, new D(0, 0));
				var r = !this._loaded;
				this._loaded = !0, t = this._limitZoom(t), this.fire("viewprereset");
				var i = this._zoom !== t;
				this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire("viewreset"), r && this.fire("load");
			},
			_moveStart: function(e, t) {
				return e && this.fire("zoomstart"), t || this.fire("movestart"), this;
			},
			_move: function(e, t, n, r) {
				t === void 0 && (t = this._zoom);
				var i = this._zoom !== t;
				return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire("zoom", n) : ((i || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
			},
			_moveEnd: function(e) {
				return e && this.fire("zoomend"), this.fire("moveend");
			},
			_stop: function() {
				return te(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
			},
			_rawPanBy: function(e) {
				Pt(this._mapPane, this._getMapPanePos().subtract(e));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw Error("Set map center and zoom first.");
			},
			_initEvents: function(e) {
				this._targets = {}, this._targets[o(this._container)] = this;
				var t = e ? U : H;
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), R.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				te(this._resizeRequest), this._resizeRequest = ee(function() {
					this.invalidateSize({ debounceMoveend: !0 });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0, this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var e = this._getMapPanePos();
				Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, t) {
				for (var n = [], r, i = t === "mouseout" || t === "mouseover", a = e.target || e.srcElement, s = !1; a;) {
					if (r = this._targets[o(a)], r && (t === "click" || t === "preclick") && this._draggableMoved(r)) {
						s = !0;
						break;
					}
					if (r && r.listens(t, !0) && (i && !un(a, e) || (n.push(r), i)) || a === this._container) break;
					a = a.parentNode;
				}
				return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n;
			},
			_isClickDisabled: function(e) {
				for (; e && e !== this._container;) {
					if (e._leaflet_disable_click) return !0;
					e = e.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var t = e.target || e.srcElement;
				if (!(!this._loaded || t._leaflet_disable_events || e.type === "click" && this._isClickDisabled(t))) {
					var n = e.type;
					n === "mousedown" && Wt(t), this._fireDOMEvent(e, n);
				}
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, t, r) {
				if (e.type === "click") {
					var i = n({}, e);
					i.type = "preclick", this._fireDOMEvent(i, i.type, r);
				}
				var a = this._findEventTargets(e, t);
				if (r) {
					for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
					a = o.concat(a);
				}
				if (a.length) {
					t === "contextmenu" && rn(e);
					var c = a[0], l = { originalEvent: e };
					if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
						var u = c.getLatLng && (!c._radius || c._radius <= 10);
						l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint);
					}
					for (s = 0; s < a.length; s++) if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && v(this._mouseEvents, t) !== -1) return;
				}
			},
			_draggableMoved: function(e) {
				return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable();
			},
			whenReady: function(e, t) {
				return this._loaded ? e.call(t || this, { target: this }) : this.on("load", e, t), this;
			},
			_getMapPanePos: function() {
				return Ft(this._mapPane) || new D(0, 0);
			},
			_moved: function() {
				var e = this._getMapPanePos();
				return e && !e.equals([0, 0]);
			},
			_getTopLeftPoint: function(e, t) {
				return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(e, t) {
				var n = this.getSize()._divideBy(2);
				return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return this.project(e, t)._subtract(r);
			},
			_latLngBoundsToNewLayerBounds: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return A([
					this.project(e.getSouthWest(), t)._subtract(r),
					this.project(e.getNorthWest(), t)._subtract(r),
					this.project(e.getSouthEast(), t)._subtract(r),
					this.project(e.getNorthEast(), t)._subtract(r)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(e) {
				return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(e, t, n) {
				if (!n) return e;
				var r = this.project(e, t), i = this.getSize().divideBy(2), a = new k(r.subtract(i), r.add(i)), o = this._getBoundsOffset(a, n, t);
				return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t);
			},
			_limitOffset: function(e, t) {
				if (!t) return e;
				var n = this.getPixelBounds(), r = new k(n.min.add(e), n.max.add(e));
				return e.add(this._getBoundsOffset(r, t));
			},
			_getBoundsOffset: function(e, t, n) {
				var r = A(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)), i = r.min.subtract(e.min), a = r.max.subtract(e.max);
				return new D(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y));
			},
			_rebound: function(e, t) {
				return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t));
			},
			_limitZoom: function(e) {
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = R.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				Dt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = z("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = vt, n = this._proxy.style[t];
					Nt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				B(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				Nt(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
			},
			_catchTransitionEnd: function(e) {
				this._animatingZoom && e.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(e, t, n) {
				if (this._animatingZoom) return !0;
				if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var r = this.getZoomScale(t), i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
				return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (ee(function() {
					this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0);
				}, this), !0);
			},
			_animateZoom: function(e, t, n, r) {
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, V(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && Dt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function pn(e, t) {
			return new W(e, t);
		}
		var mn = T.extend({
			options: { position: "topright" },
			initialize: function(e) {
				p(this, e);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(e) {
				var t = this._map;
				return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(e) {
				this.remove(), this._map = e;
				var t = this._container = this.onAdd(e), n = this.getPosition(), r = e._controlCorners[n];
				return V(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map ? (B(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), hn = function(e) {
			return new mn(e);
		};
		W.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = z("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = z("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) B(this._controlCorners[e]);
				B(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var gn = mn.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0,
				hideSingleBase: !1,
				sortLayers: !1,
				sortFunction: function(e, t, n, r) {
					return n < r ? -1 : +(r < n);
				}
			},
			initialize: function(e, t, n) {
				for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
				for (r in t) this._addLayer(t[r], r, !0);
			},
			onAdd: function(e) {
				this._initLayout(), this._update(), this._map = e, e.on("zoomend", this._checkDisabledLayers, this);
				for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(e) {
				return mn.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(e, t) {
				return this._addLayer(e, t), this._map ? this._update() : this;
			},
			addOverlay: function(e, t) {
				return this._addLayer(e, t, !0), this._map ? this._update() : this;
			},
			removeLayer: function(e) {
				e.off("add remove", this._onLayerChange, this);
				var t = this._getLayer(o(e));
				return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this;
			},
			expand: function() {
				V(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (V(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : Dt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return Dt(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = z("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), nn(t), tn(t);
				var r = this._section = z("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), H(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = z("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), H(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						rn(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = z("div", e + "-base", r), this._separator = z("div", e + "-separator", r), this._overlaysList = z("div", e + "-overlays", r), t.appendChild(r);
			},
			_getLayer: function(e) {
				for (var t = 0; t < this._layers.length; t++) if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t];
			},
			_addLayer: function(e, t, n) {
				this._map && e.on("add remove", this._onLayerChange, this), this._layers.push({
					layer: e,
					name: t,
					overlay: n
				}), this.options.sortLayers && this._layers.sort(i(function(e, t) {
					return this.options.sortFunction(e.layer, t.layer, e.name, t.name);
				}, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				Ct(this._baseLayersList), Ct(this._overlaysList), this._layerControlInputs = [];
				var e, t, n, r, i = 0;
				for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
				return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? "" : "none"), this._separator.style.display = t && e ? "" : "none", this;
			},
			_onLayerChange: function(e) {
				this._handlingClick || this._update();
				var t = this._getLayer(o(e.target)), n = t.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				n && this._map.fire(n, t);
			},
			_createRadioElement: function(e, t) {
				var n = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + e + "\"" + (t ? " checked=\"checked\"" : "") + "/>", r = document.createElement("div");
				return r.innerHTML = n, r.firstChild;
			},
			_addItem: function(e) {
				var t = document.createElement("label"), n = this._map.hasLayer(e.layer), r;
				e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), H(r, "click", this._onInputClick, this);
				var i = document.createElement("span");
				i.innerHTML = " " + e.name;
				var a = document.createElement("span");
				return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t;
			},
			_onInputClick: function() {
				if (!this._preventClick) {
					var e = this._layerControlInputs, t, n, r = [], i = [];
					this._handlingClick = !0;
					for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
					for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
					for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
					this._handlingClick = !1, this._refocusOnMap();
				}
			},
			_checkDisabledLayers: function() {
				for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
			},
			_expandIfNotCollapsed: function() {
				return this._map && !this.options.collapsed && this.expand(), this;
			},
			_expandSafely: function() {
				var e = this._section;
				this._preventClick = !0, H(e, "click", rn), this.expand();
				var t = this;
				setTimeout(function() {
					U(e, "click", rn), t._preventClick = !1;
				});
			}
		}), _n = function(e, t, n) {
			return new gn(e, t, n);
		}, vn = mn.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = z("div", t + " leaflet-bar"), r = this.options;
				return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + "-in", n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + "-out", n, this._zoomOut), this._updateDisabled(), e.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
			},
			onRemove: function(e) {
				e.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				return this._disabled = !0, this._updateDisabled(), this;
			},
			enable: function() {
				return this._disabled = !1, this._updateDisabled(), this;
			},
			_zoomIn: function(e) {
				!this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				!this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(e, t, n, r, i) {
				var a = z("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), nn(a), H(a, "click", an), H(a, "click", i, this), H(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				Dt(this._zoomInButton, t), Dt(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (V(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (V(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		W.mergeOptions({ zoomControl: !0 }), W.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new vn(), this.addControl(this.zoomControl));
		});
		var yn = function(e) {
			return new vn(e);
		}, bn = mn.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = z("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = z("div", t, n)), e.imperial && (this._iScale = z("div", t, n));
			},
			_update: function() {
				var e = this._map, t = e.getSize().y / 2, n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
				this._updateScales(n);
			},
			_updateScales: function(e) {
				this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e);
			},
			_updateMetric: function(e) {
				var t = this._getRoundNum(e), n = t < 1e3 ? t + " m" : t / 1e3 + " km";
				this._updateScale(this._mScale, n, t / e);
			},
			_updateImperial: function(e) {
				var t = e * 3.2808399, n, r, i;
				t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + " ft", i / t));
			},
			_updateScale: function(e, t, n) {
				e.style.width = Math.round(this.options.maxWidth * n) + "px", e.innerHTML = t;
			},
			_getRoundNum: function(e) {
				var t = 10 ** ((Math.floor(e) + "").length - 1), n = e / t;
				return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
			}
		}), xn = function(e) {
			return new bn(e);
		}, Sn = mn.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (R.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = z("div", "leaflet-control-attribution"), nn(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
				return this._update(), e.on("layeradd", this._addAttribution, this), this._container;
			},
			onRemove: function(e) {
				e.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(e) {
				e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once("remove", function() {
					this.removeAttribution(e.layer.getAttribution());
				}, this));
			},
			setPrefix: function(e) {
				return this.options.prefix = e, this._update(), this;
			},
			addAttribution: function(e) {
				return e ? (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update(), this) : this;
			},
			removeAttribution: function(e) {
				return e && this._attributions[e] && (this._attributions[e]--, this._update()), this;
			},
			_update: function() {
				if (this._map) {
					var e = [];
					for (var t in this._attributions) this._attributions[t] && e.push(t);
					var n = [];
					this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" <span aria-hidden=\"true\">|</span> ");
				}
			}
		});
		W.mergeOptions({ attributionControl: !0 }), W.addInitHook(function() {
			this.options.attributionControl && new Sn().addTo(this);
		}), mn.Layers = gn, mn.Zoom = vn, mn.Scale = bn, mn.Attribution = Sn, hn.layers = _n, hn.zoom = yn, hn.scale = xn, hn.attribution = function(e) {
			return new Sn(e);
		};
		var Cn = T.extend({
			initialize: function(e) {
				this._map = e;
			},
			enable: function() {
				return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
			},
			disable: function() {
				return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		Cn.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var wn = { Events: re }, Tn = R.touch ? "touchstart mousedown" : "mousedown", En = ie.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (H(this._dragStartTarget, Tn, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (En._dragging === this && this.finishDrag(!0), U(this._dragStartTarget, Tn, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !Et(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) {
						En._dragging === this && this.finishDrag();
						return;
					}
					if (!(En._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (En._dragging = this, this._preventOutline && Wt(this._element), Bt(), It(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = Kt(this._element);
						this._startPoint = new D(t.clientX, t.clientY), this._startPos = Ft(this._element), this._parentScale = qt(n);
						var r = e.type === "mousedown";
						H(document, r ? "mousemove" : "touchmove", this._onMove, this), H(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
					}
				}
			},
			_onMove: function(e) {
				if (this._enabled) {
					if (e.touches && e.touches.length > 1) {
						this._moved = !0;
						return;
					}
					var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, n = new D(t.clientX, t.clientY)._subtract(this._startPoint);
					!n.x && !n.y || Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, rn(e), this._moved || (this.fire("dragstart"), this._moved = !0, V(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), V(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition());
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), Pt(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				Dt(document.body, "leaflet-dragging"), this._lastTarget &&= (Dt(this._lastTarget, "leaflet-drag-target"), null), U(document, "mousemove touchmove", this._onMove, this), U(document, "mouseup touchend touchcancel", this._onUp, this), Vt(), Lt();
				var t = this._moved && this._moving;
				this._moving = !1, En._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function Dn(e, t, n) {
			var r, i = [
				1,
				4,
				2,
				8
			], a, o, s, c, l, u, d, f;
			for (a = 0, u = e.length; a < u; a++) e[a]._code = Bn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = zn(l, c, d, t, n), f._code = Bn(f, t), r.push(f)) : (l._code & d && (f = zn(l, c, d, t, n), f._code = Bn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function On(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Un(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = N([0, 0]), f = oe(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = kn(e));
			var p = e.length, m = [];
			for (n = 0; n < p; n++) {
				var h = N(e[n]);
				m.push(t.project(N([h.lat - d.lat, h.lng - d.lng])));
			}
			for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
			u = s === 0 ? m[0] : [c / s, l / s];
			var g = t.unproject(O(u));
			return N([g.lat + d.lat, g.lng + d.lng]);
		}
		function kn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = N(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return N([t / r, n / r]);
		}
		var An = {
			__proto__: null,
			clipPolygon: Dn,
			polygonCenter: On,
			centroid: kn
		};
		function jn(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = In(e, n), e = Pn(e, n), e;
		}
		function Mn(e, t, n) {
			return Math.sqrt(Hn(e, t, n, !0));
		}
		function Nn(e, t, n) {
			return Hn(e, t, n);
		}
		function Pn(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, Fn(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function Fn(e, t, n, r, i) {
			var a = 0, o, s, c;
			for (s = r + 1; s <= i - 1; s++) c = Hn(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, Fn(e, t, n, r, o), Fn(e, t, n, o, i));
		}
		function In(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Vn(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var Ln;
		function Rn(e, t, n, r, i) {
			var a = r ? Ln : Bn(e, n), o = Bn(t, n), s, c, l;
			for (Ln = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = zn(e, t, s, n, i), l = Bn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function zn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new D(l, u, i);
		}
		function Bn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function Vn(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function Hn(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new D(i, a);
		}
		function Un(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function Wn(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Un(e);
		}
		function Gn(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Un(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = N([0, 0]), d = oe(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = kn(e));
			var f = e.length, p = [];
			for (n = 0; n < f; n++) {
				var m = N(e[n]);
				p.push(t.project(N([m.lat - u.lat, m.lng - u.lng])));
			}
			for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
			if (r === 0) l = p[0];
			else for (n = 0, a = 0; n < f - 1; n++) if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
				c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
				break;
			}
			var h = t.unproject(O(l));
			return N([h.lat + u.lat, h.lng + u.lng]);
		}
		var Kn = {
			__proto__: null,
			simplify: jn,
			pointToSegmentDistance: Mn,
			closestPointOnSegment: Nn,
			clipSegment: Rn,
			_getEdgeIntersection: zn,
			_getBitCode: Bn,
			_sqClosestPointOnSegment: Hn,
			isFlat: Un,
			_flat: Wn,
			polylineCenter: Gn
		}, qn = {
			project: function(e) {
				return new D(e.lng, e.lat);
			},
			unproject: function(e) {
				return new M(e.y, e.x);
			},
			bounds: new k([-180, -90], [180, 90])
		}, Jn = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new k([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(e) {
				var t = Math.PI / 180, n = this.R, r = e.lat * t, i = this.R_MINOR / n, a = Math.sqrt(1 - i * i), o = a * Math.sin(r), s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
				return r = -n * Math.log(Math.max(s, 1e-10)), new D(e.lng * t * n, r);
			},
			unproject: function(e) {
				for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
				return new M(o * t, e.x * t / n);
			}
		}, Yn = {
			__proto__: null,
			LonLat: qn,
			Mercator: Jn,
			SphericalMercator: le
		}, Xn = n({}, ce, {
			code: "EPSG:3395",
			projection: Jn,
			transformation: function() {
				var e = .5 / (Math.PI * Jn.R);
				return de(e, .5, -e, .5);
			}()
		}), Zn = n({}, ce, {
			code: "EPSG:4326",
			projection: qn,
			transformation: de(1 / 180, 1, -1 / 180, .5)
		}), Qn = n({}, se, {
			projection: qn,
			transformation: de(1, 0, -1, 0),
			scale: function(e) {
				return 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e) / Math.LN2;
			},
			distance: function(e, t) {
				var n = t.lng - e.lng, r = t.lat - e.lat;
				return Math.sqrt(n * n + r * r);
			},
			infinite: !0
		});
		se.Earth = ce, se.EPSG3395 = Xn, se.EPSG3857 = fe, se.EPSG900913 = pe, se.EPSG4326 = Zn, se.Simple = Qn;
		var $n = ie.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: !0
			},
			addTo: function(e) {
				return e.addLayer(this), this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(e) {
				return e && e.removeLayer(this), this;
			},
			getPane: function(e) {
				return this._map.getPane(e ? this.options[e] || e : this.options.pane);
			},
			addInteractiveTarget: function(e) {
				return this._map._targets[o(e)] = this, this;
			},
			removeInteractiveTarget: function(e) {
				return delete this._map._targets[o(e)], this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var t = e.target;
				if (t.hasLayer(this)) {
					if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
						var n = this.getEvents();
						t.on(n, this), this.once("remove", function() {
							t.off(n, this);
						}, this);
					}
					this.onAdd(t), this.fire("add"), t.fire("layeradd", { layer: this });
				}
			}
		});
		W.include({
			addLayer: function(e) {
				if (!e._layerAdd) throw Error("The provided object is not a Layer.");
				var t = o(e);
				return this._layers[t] ? this : (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e), this);
			},
			removeLayer: function(e) {
				var t = o(e);
				return this._layers[t] ? (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire("layerremove", { layer: e }), e.fire("remove")), e._map = e._mapToAdd = null, this) : this;
			},
			hasLayer: function(e) {
				return o(e) in this._layers;
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			_addLayers: function(e) {
				e = e ? _(e) ? e : [e] : [];
				for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
			},
			_addZoomLimit: function(e) {
				(!isNaN(e.options.maxZoom) || !isNaN(e.options.minZoom)) && (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels());
			},
			_removeZoomLimit: function(e) {
				var t = o(e);
				this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels());
			},
			_updateZoomLevels: function() {
				var e = Infinity, t = -Infinity, n = this._getZoomSpan();
				for (var r in this._zoomBoundLayers) {
					var i = this._zoomBoundLayers[r].options;
					e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom);
				}
				this._layersMaxZoom = t === -Infinity ? void 0 : t, this._layersMinZoom = e === Infinity ? void 0 : e, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
			}
		});
		var er = $n.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {};
				var n, r;
				if (e) for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n]);
			},
			addLayer: function(e) {
				var t = this.getLayerId(e);
				return this._layers[t] = e, this._map && this._map.addLayer(e), this;
			},
			removeLayer: function(e) {
				var t = e in this._layers ? e : this.getLayerId(e);
				return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this;
			},
			hasLayer: function(e) {
				return (typeof e == "number" ? e : this.getLayerId(e)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(e) {
				var t = Array.prototype.slice.call(arguments, 1), n, r;
				for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
				return this;
			},
			onAdd: function(e) {
				this.eachLayer(e.addLayer, e);
			},
			onRemove: function(e) {
				this.eachLayer(e.removeLayer, e);
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			getLayer: function(e) {
				return this._layers[e];
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(e.push, e), e;
			},
			setZIndex: function(e) {
				return this.invoke("setZIndex", e);
			},
			getLayerId: function(e) {
				return o(e);
			}
		}), tr = function(e, t) {
			return new er(e, t);
		}, nr = er.extend({
			addLayer: function(e) {
				return this.hasLayer(e) ? this : (e.addEventParent(this), er.prototype.addLayer.call(this, e), this.fire("layeradd", { layer: e }));
			},
			removeLayer: function(e) {
				return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), er.prototype.removeLayer.call(this, e), this.fire("layerremove", { layer: e })) : this;
			},
			setStyle: function(e) {
				return this.invoke("setStyle", e);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var e = new j();
				for (var t in this._layers) {
					var n = this._layers[t];
					e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
				}
				return e;
			}
		}), rr = function(e, t) {
			return new nr(e, t);
		}, ir = T.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: !1
			},
			initialize: function(e) {
				p(this, e);
			},
			createIcon: function(e) {
				return this._createIcon("icon", e);
			},
			createShadow: function(e) {
				return this._createIcon("shadow", e);
			},
			_createIcon: function(e, t) {
				var n = this._getIconUrl(e);
				if (!n) {
					if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var r = this._createImg(n, t && t.tagName === "IMG" ? t : null);
				return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
			},
			_setIconStyles: function(e, t) {
				var n = this.options, r = n[t + "Size"];
				typeof r == "number" && (r = [r, r]);
				var i = O(r), a = O(t === "shadow" && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
				e.className = "leaflet-marker-" + t + " " + (n.className || ""), a && (e.style.marginLeft = -a.x + "px", e.style.marginTop = -a.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
			},
			_createImg: function(e, t) {
				return t ||= document.createElement("img"), t.src = e, t;
			},
			_getIconUrl: function(e) {
				return R.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
			}
		});
		function ar(e) {
			return new ir(e);
		}
		var or = ir.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(e) {
				return typeof or.imagePath != "string" && (or.imagePath = this._detectIconPath()), (this.options.imagePath || or.imagePath) + ir.prototype._getIconUrl.call(this, e);
			},
			_stripUrl: function(e) {
				var t = function(e, t, n) {
					var r = t.exec(e);
					return r && r[n];
				};
				return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var e = z("div", "leaflet-default-icon-path", document.body), t = St(e, "background-image") || St(e, "backgroundImage");
				if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
				var n = document.querySelector("link[href$=\"leaflet.css\"]");
				return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
			}
		}), sr = Cn.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new En(e, e, !0), this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable(), V(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && Dt(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = Ft(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = A(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = O((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), Pt(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = ee(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (te(this._panRequest), this._panRequest = ee(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = Ft(t._icon), i = t._map.layerPointToLatLng(r);
				n && Pt(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				te(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", e);
			}
		}), cr = $n.extend({
			options: {
				icon: new or(),
				interactive: !0,
				keyboard: !0,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: !1,
				autoPanOnFocus: !0,
				draggable: !1,
				autoPan: !1,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = N(e);
			},
			onAdd: function(e) {
				this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
			},
			onRemove: function(e) {
				this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = N(e), this.update(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(e) {
				return this.options.zIndexOffset = e, this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(e) {
				return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(e);
				}
				return this;
			},
			_initIcon: function() {
				var e = this.options, t = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = e.icon.createIcon(this._icon), r = !1;
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), V(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && H(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (V(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && U(this._icon, "focus", this._panOnFocus, this), B(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && B(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && Pt(this._icon, e), this._shadow && Pt(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (V(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), sr)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new sr(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && At(this._icon, e), this._shadow && At(this._shadow, e);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var e = this._map;
				if (e) {
					var t = this.options.icon.options, n = t.iconSize ? O(t.iconSize) : O(0, 0), r = t.iconAnchor ? O(t.iconAnchor) : O(0, 0);
					e.panInside(this._latlng, {
						paddingTopLeft: r,
						paddingBottomRight: n.subtract(r)
					});
				}
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function lr(e, t) {
			return new cr(e, t);
		}
		var ur = $n.extend({
			options: {
				stroke: !0,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: !0,
				bubblingMouseEvents: !0
			},
			beforeAdd: function(e) {
				this._renderer = e.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				return this._map && this._renderer._updatePath(this), this;
			},
			setStyle: function(e) {
				return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, "weight") && this._updateBounds()), this;
			},
			bringToFront: function() {
				return this._renderer && this._renderer._bringToFront(this), this;
			},
			bringToBack: function() {
				return this._renderer && this._renderer._bringToBack(this), this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project(), this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		}), dr = ur.extend({
			options: {
				fill: !0,
				radius: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = N(e), this._radius = this.options.radius;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = N(e), this.redraw(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(e) {
				return this.options.radius = this._radius = e, this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(e) {
				var t = e && e.radius || this._radius;
				return ur.prototype.setStyle.call(this, e), this.setRadius(t), this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
			},
			_updateBounds: function() {
				var e = this._radius, t = this._radiusY || e, n = this._clickTolerance(), r = [e + n, t + n];
				this._pxBounds = new k(this._point.subtract(r), this._point.add(r));
			},
			_update: function() {
				this._map && this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(e) {
				return e.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function fr(e, t) {
			return new dr(e, t);
		}
		var pr = dr.extend({
			initialize: function(e, t, r) {
				if (typeof t == "number" && (t = n({}, r, { radius: t })), p(this, t), this._latlng = N(e), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(e) {
				return this._mRadius = e, this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var e = [this._radius, this._radiusY || this._radius];
				return new j(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)));
			},
			setStyle: ur.prototype.setStyle,
			_project: function() {
				var e = this._latlng.lng, t = this._latlng.lat, n = this._map, r = n.options.crs;
				if (r.distance === ce.distance) {
					var i = Math.PI / 180, a = this._mRadius / ce.R / i, o = n.project([t + a, e]), s = n.project([t - a, e]), c = o.add(s).divideBy(2), l = n.unproject(c).lat, u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
					(isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y;
				} else {
					var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x;
				}
				this._updateBounds();
			}
		});
		function mr(e, t, n) {
			return new pr(e, t, n);
		}
		var hr = ur.extend({
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			initialize: function(e, t) {
				p(this, t), this._setLatLngs(e);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(e) {
				return this._setLatLngs(e), this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(e) {
				for (var t = Infinity, n = null, r = Hn, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Gn(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(e, t) {
				return t ||= this._defaultShape(), e = N(e), t.push(e), this._bounds.extend(e), this.redraw();
			},
			_setLatLngs: function(e) {
				this._bounds = new j(), this._latlngs = this._convertLatLngs(e);
			},
			_defaultShape: function() {
				return Un(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = Un(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = N(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
				return t;
			},
			_project: function() {
				var e = new k();
				this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds());
			},
			_updateBounds: function() {
				var e = this._clickTolerance(), t = new D(e, e);
				this._rawPxBounds && (this._pxBounds = new k([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]));
			},
			_projectLatlngs: function(e, t, n) {
				var r = e[0] instanceof M, i = e.length, a, o;
				if (r) {
					for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
					t.push(o);
				} else for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n);
			},
			_clipPoints: function() {
				var e = this._renderer._bounds;
				if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(e))) {
					if (this.options.noClip) {
						this._parts = this._rings;
						return;
					}
					var t = this._parts, n, r, i, a, o, s, c;
					for (n = 0, i = 0, a = this._rings.length; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = Rn(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = jn(e[n], t);
			},
			_update: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(e, t) {
				var n, r, i, a, o, s, c = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if (!(!t && r === 0) && Mn(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function gr(e, t) {
			return new hr(e, t);
		}
		hr._flat = Wn;
		var _r = hr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return On(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = hr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof M && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				hr.prototype._setLatLngs.call(this, e), Un(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return Un(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new D(t, t);
				if (e = new k(e.min.subtract(n), e.max.add(n)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(e))) {
					if (this.options.noClip) {
						this._parts = this._rings;
						return;
					}
					for (var r = 0, i = this._rings.length, a; r < i; r++) a = Dn(this._rings[r], e, !0), a.length && this._parts.push(a);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, !0);
			},
			_containsPoint: function(e) {
				var t = !1, n, r, i, a, o, s, c, l;
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (a = 0, c = this._parts.length; a < c; a++) for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
				return t || hr.prototype._containsPoint.call(this, e, !0);
			}
		});
		function vr(e, t) {
			return new _r(e, t);
		}
		var yr = nr.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {}, e && this.addData(e);
			},
			addData: function(e) {
				var t = _(e) ? e : e.features, n, r, i;
				if (t) {
					for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
					return this;
				}
				var a = this.options;
				if (a.filter && !a.filter(e)) return this;
				var o = br(e, a);
				return o ? (o.feature = Dr(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
			},
			resetStyle: function(e) {
				return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this);
			},
			setStyle: function(e) {
				return this.eachLayer(function(t) {
					this._setLayerStyle(t, e);
				}, this);
			},
			_setLayerStyle: function(e, t) {
				e.setStyle && (typeof t == "function" && (t = t(e.feature)), e.setStyle(t));
			}
		});
		function br(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || Sr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), xr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(xr(a, e, s, t));
					return new nr(i);
				case "LineString":
				case "MultiLineString": return c = Cr(r, n.type === "LineString" ? 0 : 1, o), new hr(c, t);
				case "Polygon":
				case "MultiPolygon": return c = Cr(r, n.type === "Polygon" ? 1 : 2, o), new _r(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = br({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new nr(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = br(n.features[l], t);
						f && i.push(f);
					}
					return new nr(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function xr(e, t, n, r) {
			return e ? e(t, n) : new cr(n, r && r.markersInheritOptions && r);
		}
		function Sr(e) {
			return new M(e[1], e[0], e[2]);
		}
		function Cr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? Cr(e[i], t - 1, n) : (n || Sr)(e[i]), r.push(o);
			return r;
		}
		function wr(e, t) {
			return e = N(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function Tr(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? Tr(e[a], Un(e[a]) ? 0 : t - 1, n, r) : wr(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function Er(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : Dr(t);
		}
		function Dr(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var Or = { toGeoJSON: function(e) {
			return Er(this, {
				type: "Point",
				coordinates: wr(this.getLatLng(), e)
			});
		} };
		cr.include(Or), pr.include(Or), dr.include(Or), hr.include({ toGeoJSON: function(e) {
			var t = !Un(this._latlngs), n = Tr(this._latlngs, +!!t, !1, e);
			return Er(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), _r.include({ toGeoJSON: function(e) {
			var t = !Un(this._latlngs), n = t && !Un(this._latlngs[0]), r = Tr(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), Er(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), er.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), Er(this, {
					type: "MultiPoint",
					coordinates: t
				});
			},
			toGeoJSON: function(e) {
				var t = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (t === "MultiPoint") return this.toMultiPoint(e);
				var n = t === "GeometryCollection", r = [];
				return this.eachLayer(function(t) {
					if (t.toGeoJSON) {
						var i = t.toGeoJSON(e);
						if (n) r.push(i.geometry);
						else {
							var a = Dr(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? Er(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function kr(e, t) {
			return new yr(e, t);
		}
		var Ar = kr, jr = $n.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: !1,
				crossOrigin: !1,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(e, t, n) {
				this._url = e, this._bounds = oe(t), p(this, n);
			},
			onAdd: function() {
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (V(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				B(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && wt(this._image), this;
			},
			bringToBack: function() {
				return this._map && Tt(this._image), this;
			},
			setUrl: function(e) {
				return this._url = e, this._image && (this._image.src = e), this;
			},
			setBounds: function(e) {
				return this._bounds = oe(e), this._map && this._reset(), this;
			},
			getEvents: function() {
				var e = {
					zoom: this._reset,
					viewreset: this._reset
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : z("img");
				if (V(t, "leaflet-image-layer"), this._zoomAnimated && V(t, "leaflet-zoom-animated"), this.options.className && V(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e) {
					this._url = t.src;
					return;
				}
				t.src = this._url, t.alt = this.options.alt;
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				Nt(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new k(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				Pt(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				At(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
			},
			_overlayOnError: function() {
				this.fire("error");
				var e = this.options.errorOverlayUrl;
				e && this._url !== e && (this._url = e, this._image.src = e);
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		}), Mr = function(e, t, n) {
			return new jr(e, t, n);
		}, Nr = jr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : z("video");
				if (V(t, "leaflet-image-layer"), this._zoomAnimated && V(t, "leaflet-zoom-animated"), this.options.className && V(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
					return;
				}
				_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
				for (var o = 0; o < this._url.length; o++) {
					var s = z("source");
					s.src = this._url[o], t.appendChild(s);
				}
			}
		});
		function Pr(e, t, n) {
			return new Nr(e, t, n);
		}
		var Fr = jr.extend({ _initImage: function() {
			var e = this._image = this._url;
			V(e, "leaflet-image-layer"), this._zoomAnimated && V(e, "leaflet-zoom-animated"), this.options.className && V(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function Ir(e, t, n) {
			return new Fr(e, t, n);
		}
		var Lr = $n.extend({
			options: {
				interactive: !1,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(e, t) {
				e && (e instanceof M || _(e)) ? (this._latlng = N(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content);
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this;
			},
			close: function() {
				return this._map && this._map.removeLayer(this), this;
			},
			toggle: function(e) {
				return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this;
			},
			onAdd: function(e) {
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && At(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && At(this._container, 1), this.bringToFront(), this.options.interactive && (V(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (At(this._container, 0), this._removeTimeout = setTimeout(i(B, void 0, this._container), 200)) : B(this._container), this.options.interactive && (Dt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				return this._latlng = N(e), this._map && (this._updatePosition(), this._adjustPan()), this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(e) {
				return this._content = e, this.update(), this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
			},
			getEvents: function() {
				var e = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				return this._map && wt(this._container), this;
			},
			bringToBack: function() {
				return this._map && Tt(this._container), this;
			},
			_prepareOpen: function(e) {
				var t = this._source;
				if (!t._map) return !1;
				if (t instanceof nr) {
					t = null;
					var n = this._source._layers;
					for (var r in n) if (n[r]._map) {
						t = n[r];
						break;
					}
					if (!t) return !1;
					this._source = t;
				}
				if (!e) if (t.getCenter) e = t.getCenter();
				else if (t.getLatLng) e = t.getLatLng();
				else if (t.getBounds) e = t.getBounds().getCenter();
				else throw Error("Unable to get source layer LatLng.");
				return this.setLatLng(e), this._map && this.update(), !0;
			},
			_updateContent: function() {
				if (this._content) {
					var e = this._contentNode, t = typeof this._content == "function" ? this._content(this._source || this) : this._content;
					if (typeof t == "string") e.innerHTML = t;
					else {
						for (; e.hasChildNodes();) e.removeChild(e.firstChild);
						e.appendChild(t);
					}
					this.fire("contentupdate");
				}
			},
			_updatePosition: function() {
				if (this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng), t = O(this.options.offset), n = this._getAnchor();
					this._zoomAnimated ? Pt(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		W.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), $n.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var Rr = Lr.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: !0,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: !1,
				closeButton: !0,
				autoClose: !0,
				closeOnEscapeKey: !0,
				className: ""
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, Lr.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				Lr.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof ur || this._source.on("preclick", en));
			},
			onRemove: function(e) {
				Lr.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof ur || this._source.off("preclick", en));
			},
			getEvents: function() {
				var e = Lr.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = z("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = z("div", e + "-content-wrapper", t);
				if (this._contentNode = z("div", e + "-content", n), nn(t), tn(this._contentNode), H(t, "contextmenu", en), this._tipContainer = z("div", e + "-tip-container", t), this._tip = z("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = z("a", e + "-close-button", t);
					r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = "<span aria-hidden=\"true\">&#215;</span>", H(r, "click", function(e) {
						rn(e), this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var e = this._contentNode, t = e.style;
				t.width = "", t.whiteSpace = "nowrap";
				var n = e.offsetWidth;
				n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + "px", t.whiteSpace = "", t.height = "";
				var r = e.offsetHeight, i = this.options.maxHeight, a = "leaflet-popup-scrolled";
				i && r > i ? (t.height = i + "px", V(e, a)) : Dt(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				Pt(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
						this._autopanning = !1;
						return;
					}
					var e = this._map, t = parseInt(St(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new D(this._containerLeft, -n - this._containerBottom);
					i._add(Ft(this._container));
					var a = e.layerPointToContainerPoint(i), o = O(this.options.autoPanPadding), s = O(this.options.autoPanPaddingTopLeft || o), c = O(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
					a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
				}
			},
			_getAnchor: function() {
				return O(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), zr = function(e, t) {
			return new Rr(e, t);
		};
		W.mergeOptions({ closePopupOnClick: !0 }), W.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(Rr, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), $n.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(Rr, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), !0), this;
			},
			unbindPopup: function() {
				return this._popup &&= (this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), this._popupHandlersAdded = !1, null), this;
			},
			openPopup: function(e) {
				return this._popup && (this instanceof nr || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this;
			},
			closePopup: function() {
				return this._popup && this._popup.close(), this;
			},
			togglePopup: function() {
				return this._popup && this._popup.toggle(this), this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : !1;
			},
			setPopupContent: function(e) {
				return this._popup && this._popup.setContent(e), this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (!(!this._popup || !this._map)) {
					an(e);
					var t = e.layer || e.target;
					if (this._popup._source === t && !(t instanceof ur)) {
						this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng);
						return;
					}
					this._popup._source = t, this.openPopup(e.latlng);
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var Br = Lr.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				Lr.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				Lr.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = Lr.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				this._contentNode = this._container = z("div", "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide")), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = O(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(O(t, n, !0)).add(u).add(d), Dt(i, "leaflet-tooltip-right"), Dt(i, "leaflet-tooltip-left"), Dt(i, "leaflet-tooltip-top"), Dt(i, "leaflet-tooltip-bottom"), V(i, "leaflet-tooltip-" + s), Pt(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && At(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return O(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Vr = function(e, t) {
			return new Br(e, t);
		};
		W.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Br, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), $n.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Br, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
			},
			unbindTooltip: function() {
				return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this;
			},
			_initTooltipInteractions: function(e) {
				if (!(!e && this._tooltipHandlersAdded)) {
					var t = e ? "off" : "on", n = {
						remove: this.closeTooltip,
						move: this._moveTooltip
					};
					this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e;
				}
			},
			openTooltip: function(e) {
				return this._tooltip && (this instanceof nr || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				return this._tooltip && this._tooltip.toggle(this), this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(e) {
				return this._tooltip && this._tooltip.setContent(e), this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && (H(t, "focus", function() {
					this._tooltip._source = e, this.openTooltip();
				}, this), H(t, "blur", this.closeTooltip, this));
			},
			_setAriaDescribedByOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && t.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (!(!this._tooltip || !this._map)) {
					if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
						this._openOnceFlag = !0;
						var t = this;
						this._map.once("moveend", function() {
							t._openOnceFlag = !1, t._openTooltip(e);
						});
						return;
					}
					this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
				}
			},
			_moveTooltip: function(e) {
				var t = e.latlng, n, r;
				this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t);
			}
		});
		var Hr = ir.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (Ct(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = O(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Ur(e) {
			return new Hr(e);
		}
		ir.Default = or;
		var Wr = $n.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: R.mobile,
				updateWhenZooming: !0,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: !1,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(e) {
				p(this, e);
			},
			onAdd: function() {
				this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
			},
			beforeAdd: function(e) {
				e._addZoomLimit(this);
			},
			onRemove: function(e) {
				this._removeAllTiles(), B(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (wt(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (Tt(this._container), this._setAutoZIndex(Math.min)), this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._updateOpacity(), this;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var e = this._clampZoom(this._map.getZoom());
					e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update();
				}
				return this;
			},
			getEvents: function() {
				var e = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var e = this.options.tileSize;
				return e instanceof D ? e : new D(e, e);
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
			},
			_setAutoZIndex: function(e) {
				for (var t = this.getPane().children, n = -e(-Infinity, Infinity), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
				isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex());
			},
			_updateOpacity: function() {
				if (this._map && !R.ielt9) {
					At(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (!(!i.current || !i.loaded)) {
							var a = Math.min(1, (e - i.loaded) / 200);
							At(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (te(this._fadeFrame), this._fadeFrame = ee(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = z("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (B(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = z("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
				}
			},
			_onUpdateLevel: l,
			_onRemoveLevel: l,
			_onCreateLevel: l,
			_pruneTiles: function() {
				if (this._map) {
					var e, t, n = this._map.getZoom();
					if (n > this.options.maxZoom || n < this.options.minZoom) {
						this._removeAllTiles();
						return;
					}
					for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
					for (e in this._tiles) if (t = this._tiles[e], t.current && !t.active) {
						var r = t.coords;
						this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
					}
					for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
				}
			},
			_removeTilesAtZoom: function(e) {
				for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t);
			},
			_removeAllTiles: function() {
				for (var e in this._tiles) this._removeTile(e);
			},
			_invalidateAll: function() {
				for (var e in this._levels) B(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
				this._removeAllTiles(), this._tileZoom = void 0;
			},
			_retainParent: function(e, t, n, r) {
				var i = Math.floor(e / 2), a = Math.floor(t / 2), o = n - 1, s = new D(+i, +a);
				s.z = +o;
				var c = this._tileCoordsToKey(s), l = this._tiles[c];
				return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r ? this._retainParent(i, a, o, r) : !1);
			},
			_retainChildren: function(e, t, n, r) {
				for (var i = 2 * e; i < 2 * e + 2; i++) for (var a = 2 * t; a < 2 * t + 2; a++) {
					var o = new D(i, a);
					o.z = n + 1;
					var s = this._tileCoordsToKey(o), c = this._tiles[s];
					if (c && c.active) {
						c.retain = !0;
						continue;
					} else c && c.loaded && (c.retain = !0);
					n + 1 < r && this._retainChildren(i, a, n + 1, r);
				}
			},
			_resetView: function(e) {
				var t = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, !0, e.noUpdate);
			},
			_clampZoom: function(e) {
				var t = this.options;
				return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e;
			},
			_setView: function(e, t, n, r) {
				var i = Math.round(t);
				i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
				var a = this.options.updateWhenZooming && i !== this._tileZoom;
				(!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t);
			},
			_setZoomTransforms: function(e, t) {
				for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t);
			},
			_setZoomTransform: function(e, t, n) {
				var r = this._map.getZoomScale(n, e.zoom), i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
				R.any3d ? Nt(e.el, i, r) : Pt(e.el, i);
			},
			_resetGrid: function() {
				var e = this._map, t = e.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, i = this._map.getPixelWorldBounds(this._tileZoom);
				i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)];
			},
			_onMoveEnd: function() {
				!this._map || this._map._animatingZoom || this._update();
			},
			_getTiledPixelBounds: function(e) {
				var t = this._map, n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(), r = t.getZoomScale(n, this._tileZoom), i = t.project(e, this._tileZoom).floor(), a = t.getSize().divideBy(r * 2);
				return new k(i.subtract(a), i.add(a));
			},
			_update: function(e) {
				var t = this._map;
				if (t) {
					var n = this._clampZoom(t.getZoom());
					if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
						var r = this._getTiledPixelBounds(e), i = this._pxBoundsToTileRange(r), a = i.getCenter(), o = [], s = this.options.keepBuffer, c = new k(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
						if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error("Attempted to load an infinite number of tiles");
						for (var l in this._tiles) {
							var u = this._tiles[l].coords;
							(u.z !== this._tileZoom || !c.contains(new D(u.x, u.y))) && (this._tiles[l].current = !1);
						}
						if (Math.abs(n - this._tileZoom) > 1) {
							this._setView(e, n);
							return;
						}
						for (var d = i.min.y; d <= i.max.y; d++) for (var f = i.min.x; f <= i.max.x; f++) {
							var p = new D(f, d);
							if (p.z = this._tileZoom, this._isValidTile(p)) {
								var m = this._tiles[this._tileCoordsToKey(p)];
								m ? m.current = !0 : o.push(p);
							}
						}
						if (o.sort(function(e, t) {
							return e.distanceTo(a) - t.distanceTo(a);
						}), o.length !== 0) {
							this._loading || (this._loading = !0, this.fire("loading"));
							var h = document.createDocumentFragment();
							for (f = 0; f < o.length; f++) this._addTile(o[f], h);
							this._level.el.appendChild(h);
						}
					}
				}
			},
			_isValidTile: function(e) {
				var t = this._map.options.crs;
				if (!t.infinite) {
					var n = this._globalTileRange;
					if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1;
				}
				if (!this.options.bounds) return !0;
				var r = this._tileCoordsToBounds(e);
				return oe(this.options.bounds).overlaps(r);
			},
			_keyToBounds: function(e) {
				return this._tileCoordsToBounds(this._keyToTileCoords(e));
			},
			_tileCoordsToNwSe: function(e) {
				var t = this._map, n = this.getTileSize(), r = e.scaleBy(n), i = r.add(n);
				return [t.unproject(r, e.z), t.unproject(i, e.z)];
			},
			_tileCoordsToBounds: function(e) {
				var t = this._tileCoordsToNwSe(e), n = new j(t[0], t[1]);
				return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
			},
			_tileCoordsToKey: function(e) {
				return e.x + ":" + e.y + ":" + e.z;
			},
			_keyToTileCoords: function(e) {
				var t = e.split(":"), n = new D(+t[0], +t[1]);
				return n.z = +t[2], n;
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				t && (B(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				V(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, R.ielt9 && this.options.opacity < 1 && At(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && ee(i(this._tileReady, this, e, null, a)), Pt(a, n), this._tiles[r] = {
					el: a,
					coords: e,
					current: !0
				}, t.appendChild(a), this.fire("tileloadstart", {
					tile: a,
					coords: e
				});
			},
			_tileReady: function(e, t, n) {
				t && this.fire("tileerror", {
					error: t,
					tile: n,
					coords: e
				});
				var r = this._tileCoordsToKey(e);
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (At(n.el, 0), te(this._fadeFrame), this._fadeFrame = ee(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (V(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), R.ielt9 || !this._map._fadeAnimated ? ee(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
			},
			_getTilePos: function(e) {
				return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(e) {
				var t = new D(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
				return t.z = e.z, t;
			},
			_pxBoundsToTileRange: function(e) {
				var t = this.getTileSize();
				return new k(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
				return !0;
			}
		});
		function Gr(e) {
			return new Wr(e);
		}
		var Kr = Wr.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: !1,
				zoomReverse: !1,
				detectRetina: !1,
				crossOrigin: !1,
				referrerPolicy: !1
			},
			initialize: function(e, t) {
				this._url = e, t = p(this, t), t.detectRetina && R.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(e, t) {
				return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this;
			},
			createTile: function(e, t) {
				var n = document.createElement("img");
				return H(n, "load", i(this._tileOnLoad, this, t, n)), H(n, "error", i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(e), n;
			},
			getTileUrl: function(e) {
				var t = {
					r: R.retina ? "@2x" : "",
					s: this._getSubdomain(e),
					x: e.x,
					y: e.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var r = this._globalTileRange.max.y - e.y;
					this.options.tms && (t.y = r), t["-y"] = r;
				}
				return g(this._url, n(t, this.options));
			},
			_tileOnLoad: function(e, t) {
				R.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
			},
			_tileOnError: function(e, t, n) {
				var r = this.options.errorTileUrl;
				r && t.getAttribute("src") !== r && (t.src = r), e(n, t);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var e = this._tileZoom, t = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
				return n && (e = t - e), e + r;
			},
			_getSubdomain: function(e) {
				var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
				return this.options.subdomains[t];
			},
			_abortLoading: function() {
				var e, t;
				for (e in this._tiles) if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
					t.src = y;
					var n = this._tiles[e].coords;
					B(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", y), Wr.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === y)) return Wr.prototype._tileReady.call(this, e, t, n);
			}
		});
		function qr(e, t) {
			return new Kr(e, t);
		}
		var Jr = Kr.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: !1
			},
			initialize: function(e, t) {
				this._url = e;
				var r = n({}, this.defaultWmsParams);
				for (var i in t) i in this.options || (r[i] = t[i]);
				t = p(this, t);
				var a = t.detectRetina && R.retina ? 2 : 1, o = this.getTileSize();
				r.width = o.x * a, r.height = o.y * a, this.wmsParams = r;
			},
			onAdd: function(e) {
				this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[t] = this._crs.code, Kr.prototype.onAdd.call(this, e);
			},
			getTileUrl: function(e) {
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = A(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Zn ? [
					i.y,
					i.x,
					a.y,
					a.x
				] : [
					i.x,
					i.y,
					a.x,
					a.y
				]).join(","), s = Kr.prototype.getTileUrl.call(this, e);
				return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o;
			},
			setParams: function(e, t) {
				return n(this.wmsParams, e), t || this.redraw(), this;
			}
		});
		function Yr(e, t) {
			return new Jr(e, t);
		}
		Kr.WMS = Jr, qr.wms = Yr;
		var Xr = $n.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), V(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this), this._destroyContainer();
			},
			getEvents: function() {
				var e = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
			},
			_onAnimZoom: function(e) {
				this._updateTransform(e.center, e.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(e, t) {
				var n = this._map.getZoomScale(t, this._zoom), r = this._map.getSize().multiplyBy(.5 + this.options.padding), i = this._map.project(this._center, t), a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
				R.any3d ? Nt(this._container, a, n) : Pt(this._container, a);
			},
			_reset: function() {
				for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset();
			},
			_onZoomEnd: function() {
				for (var e in this._layers) this._layers[e]._project();
			},
			_updatePaths: function() {
				for (var e in this._layers) this._layers[e]._update();
			},
			_update: function() {
				var e = this.options.padding, t = this._map.getSize(), n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
				this._bounds = new k(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
			}
		}), Zr = Xr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Xr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Xr.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				H(e, "mousemove", this._onMouseMove, this), H(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), H(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				te(this._redrawRequest), delete this._ctx, B(this._container), U(this._container), delete this._container;
			},
			_updatePaths: function() {
				if (!this._postponeUpdatePaths) {
					var e;
					for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
					this._redraw();
				}
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Xr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = R.retina ? 2 : 1;
					Pt(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", R.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Xr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
			},
			_initPath: function(e) {
				this._updateDashArray(e), this._layers[o(e)] = e;
				var t = e._order = {
					layer: e,
					prev: this._drawLast,
					next: null
				};
				this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(e) {
				this._requestRedraw(e);
			},
			_removePath: function(e) {
				var t = e._order, n = t.next, r = t.prev;
				n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e);
			},
			_updatePath: function(e) {
				this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e);
			},
			_updateStyle: function(e) {
				this._updateDashArray(e), this._requestRedraw(e);
			},
			_updateDashArray: function(e) {
				if (typeof e.options.dashArray == "string") {
					var t = e.options.dashArray.split(/[, ]+/), n = [], r, i;
					for (i = 0; i < t.length; i++) {
						if (r = Number(t[i]), isNaN(r)) return;
						n.push(r);
					}
					e.options._dashArray = n;
				} else e.options._dashArray = e.options.dashArray;
			},
			_requestRedraw: function(e) {
				this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || ee(this._redraw, this));
			},
			_extendRedrawBounds: function(e) {
				if (e._pxBounds) {
					var t = (e.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new k(), this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
			},
			_clear: function() {
				var e = this._redrawBounds;
				if (e) {
					var t = e.getSize();
					this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y);
				} else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
			},
			_draw: function() {
				var e, t = this._redrawBounds;
				if (this._ctx.save(), t) {
					var n = t.getSize();
					this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip();
				}
				this._drawing = !0;
				for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
				this._drawing = !1, this._ctx.restore();
			},
			_updatePoly: function(e, t) {
				if (this._drawing) {
					var n, r, i, a, o = e._parts, s = o.length, c = this._ctx;
					if (s) {
						for (c.beginPath(), n = 0; n < s; n++) {
							for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? "lineTo" : "moveTo"](a.x, a.y);
							t && c.closePath();
						}
						this._fillStroke(c, e);
					}
				}
			},
			_updateCircle: function(e) {
				if (!(!this._drawing || e._empty())) {
					var t = e._point, n = this._ctx, r = Math.max(Math.round(e._radius), 1), i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
					i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e);
				}
			},
			_fillStroke: function(e, t) {
				var n = t.options;
				n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke());
			},
			_onClick: function(e) {
				for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(n)) && (r = n);
				this._fireEvent(r ? [r] : !1, e);
			},
			_onMouseMove: function(e) {
				if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
					var t = this._map.mouseEventToLayerPoint(e);
					this._handleMouseHover(e, t);
				}
			},
			_handleMouseOut: function(e) {
				var t = this._hoveredLayer;
				t && (Dt(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (V(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
						this._mouseHoverThrottled = !1;
					}, this), 32);
				}
			},
			_fireEvent: function(e, t, n) {
				this._map._fireDOMEvent(t, n || t.type, e);
			},
			_bringToFront: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (n) n.prev = r;
					else return;
					r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e);
				}
			},
			_bringToBack: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (r) r.next = n;
					else return;
					n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e);
				}
			}
		});
		function Qr(e) {
			return R.canvas ? new Zr(e) : null;
		}
		var $r = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), ei = {
			_initContainer: function() {
				this._container = z("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Xr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = $r("shape");
				V(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = $r("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				B(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = $r("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = $r("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				wt(e._container);
			},
			_bringToBack: function(e) {
				Tt(e._container);
			}
		}, ti = R.vml ? $r : me, ni = Xr.extend({
			_initContainer: function() {
				this._container = ti("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = ti("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				B(this._container), U(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Xr.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					(!this._svgSize || !this._svgSize.equals(t)) && (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), Pt(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = ti("path");
				e.options.className && V(t, e.options.className), e.options.interactive && V(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				B(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, he(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				wt(e._path);
			},
			_bringToBack: function(e) {
				Tt(e._path);
			}
		});
		R.vml && ni.include(ei);
		function ri(e) {
			return R.svg || R.vml ? new ni(e) : null;
		}
		W.include({
			getRenderer: function(e) {
				var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
				return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t;
			},
			_getPaneRenderer: function(e) {
				if (e === "overlayPane" || e === void 0) return !1;
				var t = this._paneRenderers[e];
				return t === void 0 && (t = this._createRenderer({ pane: e }), this._paneRenderers[e] = t), t;
			},
			_createRenderer: function(e) {
				return this.options.preferCanvas && Qr(e) || ri(e);
			}
		});
		var ii = _r.extend({
			initialize: function(e, t) {
				_r.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
			},
			setBounds: function(e) {
				return this.setLatLngs(this._boundsToLatLngs(e));
			},
			_boundsToLatLngs: function(e) {
				return e = oe(e), [
					e.getSouthWest(),
					e.getNorthWest(),
					e.getNorthEast(),
					e.getSouthEast()
				];
			}
		});
		function ai(e, t) {
			return new ii(e, t);
		}
		ni.create = ti, ni.pointsToPath = he, yr.geometryToLayer = br, yr.coordsToLatLng = Sr, yr.coordsToLatLngs = Cr, yr.latLngToCoords = wr, yr.latLngsToCoords = Tr, yr.getFeature = Er, yr.asFeature = Dr, W.mergeOptions({ boxZoom: !0 });
		var oi = Cn.extend({
			initialize: function(e) {
				this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on("unload", this._destroy, this);
			},
			addHooks: function() {
				H(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				U(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				B(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), It(), Bt(), this._startPoint = this._map.mouseEventToContainerPoint(e), H(document, {
					contextmenu: an,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = z("div", "leaflet-zoom-box", this._container), V(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new k(this._point, this._startPoint), n = t.getSize();
				Pt(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (B(this._box), Dt(this._container, "leaflet-crosshair")), Lt(), Vt(), U(document, {
					contextmenu: an,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if (!(e.which !== 1 && e.button !== 1) && (this._finish(), this._moved)) {
					this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
					var t = new j(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
					this._map.fitBounds(t).fire("boxzoomend", { boxZoomBounds: t });
				}
			},
			_onKeyDown: function(e) {
				e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
			}
		});
		W.addInitHook("addHandler", "boxZoom", oi), W.mergeOptions({ doubleClickZoom: !0 });
		var si = Cn.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var t = this._map, n = t.getZoom(), r = t.options.zoomDelta, i = e.originalEvent.shiftKey ? n - r : n + r;
				t.options.doubleClickZoom === "center" ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i);
			}
		});
		W.addInitHook("addHandler", "doubleClickZoom", si), W.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var ci = Cn.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new En(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				V(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				Dt(this._map._container, "leaflet-grab"), Dt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var e = this._map;
				if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var t = oe(this._map.options.maxBounds);
					this._offsetLimit = A(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = []);
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var t = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(n), this._times.push(t), this._prunePositions(t);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(e) {
				for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift();
			},
			_onZoomEnd: function() {
				var e = this._map.getSize().divideBy(2);
				this._initialWorldOffset = this._map.latLngToLayerPoint([0, 0]).subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(e, t) {
				return e - (e - t) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (!(!this._viscosity || !this._offsetLimit)) {
					var e = this._draggable._newPos.subtract(this._draggable._startPos), t = this._offsetLimit;
					e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e);
				}
			},
			_onPreDragWrap: function() {
				var e = this._worldWidth, t = Math.round(e / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, i = (r - t + n) % e + t - n, a = (r + t + n) % e - t - n, o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
				this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o;
			},
			_onDragEnd: function(e) {
				var t = this._map, n = t.options, r = !n.inertia || e.noInertia || this._times.length < 2;
				if (t.fire("dragend", e), r) t.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var i = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, o = n.easeLinearity, s = i.multiplyBy(o / a), c = s.distanceTo([0, 0]), l = Math.min(n.inertiaMaxSpeed, c), u = s.multiplyBy(l / c), d = l / (n.inertiaDeceleration * o), f = u.multiplyBy(-d / 2).round();
					!f.x && !f.y ? t.fire("moveend") : (f = t._limitOffset(f, t.options.maxBounds), ee(function() {
						t.panBy(f, {
							duration: d,
							easeLinearity: o,
							noMoveStart: !0,
							animate: !0
						});
					}));
				}
			}
		});
		W.addInitHook("addHandler", "dragging", ci), W.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var li = Cn.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(e) {
				this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta);
			},
			addHooks: function() {
				var e = this._map._container;
				e.tabIndex <= 0 && (e.tabIndex = "0"), H(e, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks(), U(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var e = document.body, t = document.documentElement, n = e.scrollTop || t.scrollTop, r = e.scrollLeft || t.scrollLeft;
					this._map._container.focus(), window.scrollTo(r, n);
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur");
			},
			_setPanDelta: function(e) {
				var t = this._panKeys = {}, n = this.keyCodes, r, i;
				for (r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
				for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
				for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
				for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e];
			},
			_setZoomDelta: function(e) {
				var t = this._zoomKeys = {}, n = this.keyCodes, r, i;
				for (r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
				for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
			},
			_addHooks: function() {
				H(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				U(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (!(e.altKey || e.ctrlKey || e.metaKey)) {
					var t = e.keyCode, n = this._map, r;
					if (t in this._panKeys) {
						if (!n._panAnim || !n._panAnim._inProgress) if (r = this._panKeys[t], e.shiftKey && (r = O(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(O(r), n.options.maxBounds)), n.options.worldCopyJump) {
							var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
							n.panTo(i);
						} else n.panBy(r);
					} else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
					else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
					else return;
					an(e);
				}
			}
		});
		W.addInitHook("addHandler", "keyboard", li), W.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ui = Cn.extend({
			addHooks: function() {
				H(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				U(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = ln(e), n = this._map.options.wheelDebounceTime;
				this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +/* @__PURE__ */ new Date();
				var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), an(e);
			},
			_performZoom: function() {
				var e = this._map, t = e.getZoom(), n = this._map.options.zoomSnap || 0;
				e._stop();
				var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, a = n ? Math.ceil(i / n) * n : i, o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
				this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === "center" ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o));
			}
		});
		W.addInitHook("addHandler", "scrollWheelZoom", ui);
		var di = 600;
		W.mergeOptions({
			tapHold: R.touchNative && R.safari && R.mobile,
			tapTolerance: 15
		});
		var fi = Cn.extend({
			addHooks: function() {
				H(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				U(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
					var t = e.touches[0];
					this._startPos = this._newPos = new D(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
						this._cancel(), this._isTapValid() && (H(document, "touchend", rn), H(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", t));
					}, this), di), H(document, "touchend touchcancel contextmenu", this._cancel, this), H(document, "touchmove", this._onMove, this);
				}
			},
			_cancelClickPrevent: function e() {
				U(document, "touchend", rn), U(document, "touchend touchcancel", e);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout), U(document, "touchend touchcancel contextmenu", this._cancel, this), U(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var t = e.touches[0];
				this._newPos = new D(t.clientX, t.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(e, t) {
				var n = new MouseEvent(e, {
					bubbles: !0,
					cancelable: !0,
					view: window,
					screenX: t.screenX,
					screenY: t.screenY,
					clientX: t.clientX,
					clientY: t.clientY
				});
				n._simulated = !0, t.target.dispatchEvent(n);
			}
		});
		W.addInitHook("addHandler", "tapHold", fi), W.mergeOptions({
			touchZoom: R.touch,
			bounceAtZoomLimits: !0
		});
		var pi = Cn.extend({
			addHooks: function() {
				V(this._map._container, "leaflet-touch-zoom"), H(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				Dt(this._map._container, "leaflet-touch-zoom"), U(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var t = this._map;
				if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
					var n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]);
					this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== "center" && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), H(document, "touchmove", this._onTouchMove, this), H(document, "touchend touchcancel", this._onTouchEnd, this), rn(e);
				}
			},
			_onTouchMove: function(e) {
				if (!(!e.touches || e.touches.length !== 2 || !this._zooming)) {
					var t = this._map, n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]), a = n.distanceTo(r) / this._startDist;
					if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === "center") {
						if (this._center = this._startLatLng, a === 1) return;
					} else {
						var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
						if (a === 1 && o.x === 0 && o.y === 0) return;
						this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom);
					}
					this._moved ||= (t._moveStart(!0, !1), !0), te(this._animRequest), this._animRequest = ee(i(t._move, t, this._center, this._zoom, {
						pinch: !0,
						round: !1
					}, void 0), this, !0), rn(e);
				}
			},
			_onTouchEnd: function() {
				if (!this._moved || !this._zooming) {
					this._zooming = !1;
					return;
				}
				this._zooming = !1, te(this._animRequest), U(document, "touchmove", this._onTouchMove, this), U(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
			}
		});
		W.addInitHook("addHandler", "touchZoom", pi), W.BoxZoom = oi, W.DoubleClickZoom = si, W.Drag = ci, W.Keyboard = li, W.ScrollWheelZoom = ui, W.TapHold = fi, W.TouchZoom = pi, e.Bounds = k, e.Browser = R, e.CRS = se, e.Canvas = Zr, e.Circle = pr, e.CircleMarker = dr, e.Class = T, e.Control = mn, e.DivIcon = Hr, e.DivOverlay = Lr, e.DomEvent = dn, e.DomUtil = Jt, e.Draggable = En, e.Evented = ie, e.FeatureGroup = nr, e.GeoJSON = yr, e.GridLayer = Wr, e.Handler = Cn, e.Icon = ir, e.ImageOverlay = jr, e.LatLng = M, e.LatLngBounds = j, e.Layer = $n, e.LayerGroup = er, e.LineUtil = Kn, e.Map = W, e.Marker = cr, e.Mixin = wn, e.Path = ur, e.Point = D, e.PolyUtil = An, e.Polygon = _r, e.Polyline = hr, e.Popup = Rr, e.PosAnimation = fn, e.Projection = Yn, e.Rectangle = ii, e.Renderer = Xr, e.SVG = ni, e.SVGOverlay = Fr, e.TileLayer = Kr, e.Tooltip = Br, e.Transformation = ue, e.Util = ne, e.VideoOverlay = Nr, e.bind = i, e.bounds = A, e.canvas = Qr, e.circle = mr, e.circleMarker = fr, e.control = hn, e.divIcon = Ur, e.extend = n, e.featureGroup = rr, e.geoJSON = kr, e.geoJson = Ar, e.gridLayer = Gr, e.icon = ar, e.imageOverlay = Mr, e.latLng = N, e.latLngBounds = oe, e.layerGroup = tr, e.map = pn, e.marker = lr, e.point = O, e.polygon = vr, e.polyline = gr, e.popup = zr, e.rectangle = ai, e.setOptions = p, e.stamp = o, e.svg = ri, e.svgOverlay = Ir, e.tileLayer = qr, e.tooltip = Vr, e.transformation = de, e.version = t, e.videoOverlay = Pr;
		var mi = window.L;
		e.noConflict = function() {
			return window.L = mi, this;
		}, window.L = e;
	}));
})), b = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), x = /* @__PURE__ */ o(((e, t) => {
	t.exports = b();
})), S = /* @__PURE__ */ c(y()), C = x(), w = "受害者本人", ee = "受害者的代理人", te = "__other_option__", ne = "__custom_other_sex__", T = 6, E = 2400, re = "nct:easter-egg-activate", ie = "/media/easter-eggs/futarinomahou.png", D = "/media/easter-eggs/futarinomahou.mid", ae = .75, O = .75, k = 1, A = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", j = "#36a2eb", oe = "#fca5a5", M = "#ff0000", N = .75, se = 6, ce = {
	dark: [
		{
			name: "carto-dark",
			options: {
				attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
				subdomains: "abcd"
			},
			url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
		},
		{
			name: "carto-light",
			options: {
				attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
				subdomains: "abcd"
			},
			url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
		},
		{
			name: "osm-standard",
			options: { attribution: "© OpenStreetMap" },
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		}
	],
	light: [{
		name: "osm-standard",
		options: { attribution: "© OpenStreetMap" },
		url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	}, {
		name: "carto-light",
		options: {
			attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
			subdomains: "abcd"
		},
		url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
	}]
}, P = [
	{
		value: "",
		key: [
			"map",
			"tags",
			"all"
		],
		fallback: "All"
	},
	{
		value: w,
		key: [
			"map",
			"tags",
			"self"
		],
		fallback: "Self"
	},
	{
		value: ee,
		key: [
			"map",
			"tags",
			"agent"
		],
		fallback: "Agent"
	},
	{
		value: "批量数据",
		key: [
			"map",
			"tags",
			"bulk"
		],
		fallback: "Bulk"
	}
], le = null, ue = null, de = null, fe = null, pe = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Map(), he = null;
function F(e, t, n = "") {
	let r = e;
	for (let e of t) {
		if (!r || typeof r != "object") return n;
		r = r[e];
	}
	return r ?? n;
}
function ge(e, t = {}) {
	return String(e || "").replace(/\{(\w+)\}/g, (e, n) => Object.prototype.hasOwnProperty.call(t, n) ? String(t[n]) : `{${n}}`);
}
function _e(e) {
	return String(e || "").trim().toLowerCase().replace(/\s+/g, "");
}
function ve(e) {
	return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function ye(e) {
	return Math.round(e).toString(16).padStart(2, "0");
}
function be(e, t, n) {
	let r = Math.min(1, Math.max(0, Number(n) || 0)), i = [
		parseInt(e.slice(1, 3), 16),
		parseInt(e.slice(3, 5), 16),
		parseInt(e.slice(5, 7), 16)
	], a = [
		parseInt(t.slice(1, 3), 16),
		parseInt(t.slice(3, 5), 16),
		parseInt(t.slice(5, 7), 16)
	];
	return `#${i.map((e, t) => ye(e + (a[t] - e) * r)).join("")}`;
}
function xe(e, t) {
	return !(e > 0) || !(t > 0) ? "transparent" : be("#fed976", "#800026", e / t);
}
function Se(e) {
	return Math.round(e * ae);
}
function Ce(e) {
	let t = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path
        d="M12.5 0C5.596 0 0 5.596 0 12.5C0 20.774 12.5 41 12.5 41C12.5 41 25 20.774 25 12.5C25 5.596 19.404 0 12.5 0Z"
        fill="${e}"
        stroke="rgba(255,255,255,0.95)"
        stroke-width="1.5"
      />
      <circle cx="12.5" cy="12.5" r="4.5" fill="rgba(255,255,255,0.92)" />
    </svg>
  `;
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(t)}`;
}
function we(e) {
	return S.default.icon({
		className: "school-marker-icon",
		iconAnchor: [Se(12), Se(41)],
		iconSize: [Se(25), Se(41)],
		iconUrl: Ce(e),
		popupAnchor: [Se(1), Se(-34)],
		shadowAnchor: [Se(13), Se(41)],
		shadowSize: [Se(41), Se(41)],
		shadowUrl: A,
		tooltipAnchor: [Se(16), Se(-28)]
	});
}
function Te(e) {
	return pe.has(e) || pe.set(e, we(e)), pe.get(e);
}
function Ee(e) {
	return Number(e && e.selfCount || 0) + Number(e && e.agentCount || 0);
}
function De(e, t) {
	let n = Ee(e);
	return n > 0 && t > 0 ? Math.min(1, n / t) : 0;
}
function Oe(e, t) {
	let n = De(e, t);
	return n > 0 ? be(oe, M, n) : j;
}
function ke(e, t) {
	let n = De(e, t);
	return O + (k - O) * n;
}
function Ae() {
	return typeof window.matchMedia == "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function je(e) {
	if (typeof window.matchMedia != "function") return () => {};
	let t = window.matchMedia("(prefers-color-scheme: dark)");
	return typeof t.addEventListener == "function" ? (t.addEventListener("change", e), () => t.removeEventListener("change", e)) : typeof t.addListener == "function" ? (t.addListener(e), () => t.removeListener(e)) : () => {};
}
function Me() {
	return Ae() === "dark" ? {
		error: "#e6eef7",
		mapOutline: "#d6e4f0"
	} : {
		error: "#2c3e50",
		mapOutline: "#ffffff"
	};
}
function Ne(e, t) {
	e && e.classList.toggle("map--tiles-unavailable", !!t);
}
function Pe(e) {
	return ce[Ae()].map((t) => ({
		...t,
		options: {
			...t.options,
			maxZoom: 20,
			minZoom: e
		}
	}));
}
function Fe({ map: e, mapElement: t, minZoom: n, providerIndexRef: r, tileLayerRef: i }) {
	let a = Pe(n), o = Math.min(r.current, Math.max(a.length - 1, 0)), s = a[o];
	if (!s) return;
	r.current = o, i.current && (i.current.off(), e.removeLayer(i.current)), Ne(t, !1);
	let c = S.default.tileLayer(s.url, s.options), l = !1, u = 0, d = !1;
	c.on("tileload", () => {
		l = !0, u = 0, Ne(t, !1);
	}), c.on("tileerror", () => {
		if (l || d || (u += 1, u < se)) return;
		d = !0;
		let s = o + 1;
		if (s >= a.length) {
			Ne(t, !0);
			return;
		}
		r.current = s, Fe({
			map: e,
			mapElement: t,
			minZoom: n,
			providerIndexRef: r,
			tileLayerRef: i
		});
	}), c.addTo(e), i.current = c;
}
function Ie() {
	return F(window, ["__NCT_BOOTSTRAP__", "assetVersion"], "");
}
async function Le() {
	if (de) return de;
	if (fe) return fe;
	let e = Ie(), t = e ? `/cn.json?v=${encodeURIComponent(e)}` : "/cn.json";
	return fe = window.fetch(t, { headers: { Accept: "application/json" } }).then(async (e) => {
		if (!e.ok) throw Error(`Failed to load province layer: ${e.status}`);
		let t = await e.json();
		return de = t, t;
	}).finally(() => {
		fe = null;
	}), fe;
}
function Re(e) {
	let t = /* @__PURE__ */ new Map();
	return (Array.isArray(e) ? e : []).forEach((e) => {
		let n = String(e && (e.provinceCode || e.province || e.summaryRecord && (e.summaryRecord.provinceCode || e.summaryRecord.province)) || "").trim(), r = Number(e && e.count), i = e && Object.prototype.hasOwnProperty.call(e, "count") ? r : 1;
		!n || !(i > 0) || t.set(n, (t.get(n) || 0) + i);
	}), t;
}
function ze(e) {
	return String(e && e.properties && e.properties.code || "").trim();
}
function Be(e, t) {
	let n = e && e.properties && e.properties.center;
	return Array.isArray(n) && n.length >= 2 ? S.default.latLng(Number(n[1]), Number(n[0])) : t.getBounds().getCenter();
}
function Ve(e, t) {
	let n = e && e.properties || {};
	return n[`fullname_${t}`] || n[`name_${t}`] || n.fullname || n.name || "";
}
function He(e, t, n) {
	let r = Ve(e, n);
	if (!r) return;
	let i = Be(e, t);
	t.bindTooltip(ve(r), {
		className: "map-province-label",
		direction: "center",
		interactive: !1,
		opacity: 1,
		permanent: !0
	}), t.openTooltip(i);
}
function Ue(e) {
	let t = Math.max(0, Math.floor(e.getSize().x || 0)), n = Math.max(0, Math.floor(window.innerWidth || 0)), r = n > 0 && n <= 650 ? 24 : 56, i = Math.floor(t * .46), a = Math.max(180, n - r), o = Math.max(180, Math.min(i, a));
	return {
		maxWidth: o,
		minWidth: o
	};
}
function We(e, t, n, r) {
	let i = e && (e.summaryRecord || (Array.isArray(e.pages) ? e.pages[0] : null)) || {}, a = tt(t, i), o = {
		agent: Array.isArray(e && e.pages) ? e.pages.filter((e) => e.inputType === ee).length : 0,
		self: Array.isArray(e && e.pages) ? e.pages.filter((e) => e.inputType === w).length : 0
	};
	return `
    <div class="leaflet-popup-card">
      <div class="leaflet-popup-card__header">
        <strong>${ve(i.name || "")}</strong>
        ${a ? `<p>${ve(a)}</p>` : ""}
      </div>
      <div class="leaflet-popup-card__counts">
        <span>${ve(F(t, [
		"map",
		"list",
		"reportCounts",
		"self"
	], "Self"))} ${o.self}</span>
        <span>${ve(F(t, [
		"map",
		"list",
		"reportCounts",
		"agent"
	], "Agent"))} ${o.agent}</span>
      </div>
      <div class="leaflet-popup-card__meta">
        ${i.addr ? `<p>${ve(i.addr)}</p>` : ""}
        ${i.contact ? `<p>${ve(i.contact)}</p>` : ""}
      </div>
      <a class="leaflet-popup-card__link" href="${ve(ct(i, {
		lang: n,
		query: r
	}))}">
        ${ve(F(t, [
		"map",
		"list",
		"viewDetails"
	], "Open detail"))}
      </a>
    </div>
  `;
}
function Ge(e, t) {
	let n = t, r = 0;
	for (; n < e.length;) {
		let t = e[n];
		if (r = r << 7 | t & 127, n += 1, !(t & 128)) break;
	}
	return {
		nextOffset: n,
		value: r
	};
}
function Ke(e, t) {
	let n = Array.isArray(e) && e.length > 0 ? [...e].sort((e, t) => e.tick - t.tick) : [{
		microsecondsPerQuarter: 5e5,
		tick: 0
	}], r = 0;
	return n.map((e, i) => {
		if (i > 0) {
			let a = n[i - 1];
			r += (e.tick - a.tick) * a.microsecondsPerQuarter / (t * 1e6);
		}
		return {
			...e,
			secondsAtTick: r
		};
	});
}
function qe(e, t, n) {
	let r = Array.isArray(t) && t.length > 0 ? t : [{
		microsecondsPerQuarter: 5e5,
		secondsAtTick: 0,
		tick: 0
	}], i = r[0];
	for (let t = 1; t < r.length && !(e < r[t].tick); t += 1) i = r[t];
	return i.secondsAtTick + (e - i.tick) * i.microsecondsPerQuarter / (n * 1e6);
}
function Je(e) {
	let t = new DataView(e), n = new Uint8Array(e), r = 0;
	function i() {
		let e = String.fromCharCode(n[r], n[r + 1], n[r + 2], n[r + 3]);
		return r += 4, e;
	}
	function a() {
		let e = t.getUint32(r);
		return r += 4, e;
	}
	if (i() !== "MThd") throw Error("Unsupported MIDI header.");
	let o = a(), s = t.getUint16(r), c = t.getUint16(r + 2), l = t.getUint16(r + 4);
	if (r += o, s > 1) throw Error("Only MIDI format 0 and 1 are supported.");
	let u = [], d = [{
		microsecondsPerQuarter: 5e5,
		tick: 0
	}];
	for (let e = 0; e < c; e += 1) {
		if (i() !== "MTrk") throw Error("Invalid MIDI track.");
		let e = a(), t = r + e, o = 0, s = null, c = /* @__PURE__ */ new Map();
		for (; r < t;) {
			let e = Ge(n, r);
			r = e.nextOffset, o += e.value;
			let t = n[r];
			if (t < 128 && s != null ? t = s : (r += 1, s = t), t === 255) {
				let e = n[r];
				r += 1;
				let t = Ge(n, r);
				if (r = t.nextOffset, e === 81 && t.value === 3) {
					let e = n[r] << 16 | n[r + 1] << 8 | n[r + 2];
					d.push({
						microsecondsPerQuarter: e,
						tick: o
					});
				}
				r += t.value, s = null;
				continue;
			}
			if (t === 240 || t === 247) {
				let e = Ge(n, r);
				r = e.nextOffset + e.value, s = null;
				continue;
			}
			let i = t & 240, a = t & 15;
			if (i === 128 || i === 144) {
				let e = n[r], t = n[r + 1];
				r += 2;
				let s = `${a}:${e}`;
				if (i === 144 && t > 0) c.set(s, {
					noteNumber: e,
					startTick: o,
					velocity: t
				});
				else if (c.has(s)) {
					let t = c.get(s);
					u.push({
						channel: a,
						durationTick: Math.max(o - t.startTick, 1),
						noteNumber: e,
						startTick: t.startTick,
						velocity: t.velocity
					}), c.delete(s);
				}
				continue;
			}
			r += i === 192 || i === 208 ? 1 : 2;
		}
	}
	let f = Ke(d, l), p = u.filter((e) => e.channel !== 9).map((e) => ({
		durationSeconds: Math.max(qe(e.startTick + e.durationTick, f, l) - qe(e.startTick, f, l), .05),
		frequency: 440 * 2 ** ((e.noteNumber - 69) / 12),
		startSeconds: qe(e.startTick, f, l),
		velocity: e.velocity / 127
	})).sort((e, t) => e.startSeconds - t.startSeconds);
	return {
		durationSeconds: p.reduce((e, t) => Math.max(e, t.startSeconds + t.durationSeconds), 0),
		notes: p
	};
}
async function Ye(e) {
	if (me.has(e)) return me.get(e);
	let t = fetch(e).then((e) => {
		if (!e.ok) throw Error(`Failed to load MIDI asset: ${e.status}`);
		return e.arrayBuffer();
	}).then((e) => Je(e));
	return me.set(e, t), t;
}
async function Xe(e) {
	let t = window.AudioContext || window.webkitAudioContext;
	if (!t) return;
	let n = await Ye(e);
	he && typeof he.stop == "function" && he.stop();
	let r = new t();
	await r.resume();
	let i = r.currentTime + .04, a = [], o = !1;
	n.notes.forEach((e) => {
		let t = r.createOscillator(), n = r.createGain(), o = i + e.startSeconds, s = o + e.durationSeconds, c = Math.min(.16, .03 + e.velocity * .08);
		t.type = "triangle", t.frequency.setValueAtTime(e.frequency, o), n.gain.setValueAtTime(1e-4, o), n.gain.linearRampToValueAtTime(c, o + .02), n.gain.exponentialRampToValueAtTime(1e-4, s + .06), t.connect(n), n.connect(r.destination), t.start(o), t.stop(s + .08), a.push(t, n);
	});
	let s = { stop() {
		o || (o = !0, a.forEach((e) => {
			if (typeof e.disconnect == "function") try {
				e.disconnect();
			} catch {}
		}), r.close());
	} };
	he = s, window.setTimeout(() => {
		he === s && (he.stop(), he = null);
	}, Math.ceil((n.durationSeconds + .25) * 1e3));
}
function I(e, t) {
	let n = new URL(e, window.location.origin);
	return n.searchParams.set("lang", t), `${n.pathname}${n.search}${n.hash}`;
}
function Ze(e, t) {
	let n = new URL(e || "/", window.location.origin);
	return n.searchParams.set("lang", t), `${n.pathname}${n.search}${n.hash}`;
}
function R(e, t) {
	return e ? typeof e == "number" ? new Intl.DateTimeFormat(t, {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(e)) : String(e) : "";
}
function Qe(e, t) {
	let n = Number(e);
	if (!Number.isFinite(n) || n <= 0) return "";
	let r = n - Date.now(), i = Math.round(r / 6e4), a = new Intl.RelativeTimeFormat(t, { numeric: "auto" });
	if (Math.abs(i) < 60) return a.format(i, "minute");
	let o = Math.round(i / 60);
	if (Math.abs(o) < 24) return a.format(o, "hour");
	let s = Math.round(o / 24);
	return a.format(s, "day");
}
function $e(e, t) {
	return F(e, [
		"data",
		"provinceNames",
		t
	], t || "");
}
function et(e, t) {
	return t ? t === w ? F(e, [
		"data",
		"inputTypes",
		"self"
	], t) : t === ee ? F(e, [
		"data",
		"inputTypes",
		"agent"
	], t) : t === "批量数据" ? F(e, [
		"data",
		"inputTypes",
		"bulk"
	], t) : t : F(e, [
		"data",
		"inputTypes",
		"bulk"
	], "Bulk");
}
function tt(e, t) {
	return [
		$e(e, t && t.province),
		t && (t.city || t.prov),
		t && t.county
	].filter(Boolean).join(" / ");
}
function nt(e) {
	let t = _e(e && e.name), n = _e(e && e.province), r = _e(e && e.addr);
	return t && n ? `${t}::${n}` : t || (n || r ? `${n}::${r}` : "");
}
function rt(e) {
	let t = /* @__PURE__ */ new Map();
	return (Array.isArray(e) ? e : []).forEach((e) => {
		let n = nt(e);
		if (!n) return;
		t.has(n) || t.set(n, {
			selfCount: 0,
			agentCount: 0
		});
		let r = t.get(n);
		e && e.inputType === w ? r.selfCount += 1 : e && e.inputType === ee && (r.agentCount += 1);
	}), t;
}
function it(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	return (Array.isArray(e) ? e : []).forEach((e, r) => {
		let i = nt(e) || `unknown-${r}`, a = n.get(i);
		a || (a = {
			schoolKey: i,
			summaryRecord: e,
			pages: []
		}, n.set(i, a), t.push(a)), a.pages.push(e);
	}), t;
}
function at(e) {
	return [
		e && e.inputType,
		e && e.name,
		e && e.province,
		e && (e.city || e.prov),
		e && e.county,
		e && e.dateStart,
		e && e.dateEnd,
		e && e.addr,
		e && e.HMaster,
		e && e.contact,
		e && e.experience,
		e && e.scandal,
		e && e.else
	].map((e) => _e(e)).join("::");
}
function ot(e) {
	let t = 5381, n = 52711;
	for (let r of String(e || "")) {
		let e = r.codePointAt(0) || 0;
		t = (t << 5) + t ^ e, n = (n << 5) + n ^ e * 97;
	}
	return `${(t >>> 0).toString(16).padStart(8, "0")}${(n >>> 0).toString(16).padStart(8, "0")}`;
}
function st(e) {
	return ot(at(e));
}
function ct(e, { lang: t, query: n = {} } = {}) {
	let r = new URL(`/map/record/${encodeURIComponent(st(e))}`, window.location.origin);
	return Object.entries(n || {}).forEach(([e, t]) => {
		t != null && `${t}` != "" && r.searchParams.set(e, t);
	}), r.searchParams.set("lang", t), `${r.pathname}${r.search}`;
}
function lt(e, t) {
	let n = String(t && t.dateStart || "").trim(), r = String(t && t.dateEnd || "").trim();
	return n && r ? `${n} -> ${r}` : n || r || F(e, [
		"map",
		"list",
		"dateUnknown"
	], "Date unavailable");
}
function ut(e, t) {
	let n = String(t || "").trim();
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = Array.isArray(r && r.pages) ? r.pages : [];
		for (let e = 0; e < i.length; e += 1) {
			let a = i[e];
			if (st(a) === n) return {
				group: r,
				groupIndex: t,
				pageIndex: e,
				record: a
			};
		}
	}
	return null;
}
function dt(e) {
	try {
		let t = `react-map-cache:${e}`, n = window.sessionStorage.getItem(t);
		if (!n) return null;
		let r = JSON.parse(n);
		return !r || !r.payload || !Array.isArray(r.payload.data) || Date.now() - Number(r.savedAt || 0) > 300 * 1e3 ? null : r.payload;
	} catch {
		return null;
	}
}
function ft(e, t) {
	try {
		let n = `react-map-cache:${e}`;
		window.sessionStorage.setItem(n, JSON.stringify({
			payload: t,
			savedAt: Date.now()
		}));
	} catch {}
}
async function pt(e) {
	if (le) return le;
	let t = dt(e);
	return t ? (le = t, t) : ue || (ue = window.fetch(e, { headers: { Accept: "application/json" } }).then(async (t) => {
		let n = await t.json();
		if (!t.ok) throw Error(n && n.error ? n.error : "Map data unavailable");
		return le = n, ft(e, n), n;
	}).finally(() => {
		ue = null;
	}), ue);
}
async function mt(e, t, n) {
	let r = new URL("/api/area-options", window.location.origin);
	r.searchParams.set(e, t), r.searchParams.set("lang", n);
	let i = await window.fetch(r.toString(), { headers: { Accept: "application/json" } }), a = await i.json();
	if (!i.ok) throw Error(a && a.error ? a.error : "Failed to load area options");
	return Array.isArray(a.options) ? a.options : [];
}
function ht(e) {
	let t = /* @__PURE__ */ new Map();
	return (Array.isArray(e) ? e : []).forEach((e) => {
		let n = String(e && e.name || "").trim(), r = String(e && e.addr || "").trim();
		if (!n && !r) return;
		let i = _e(n), a = _e(r), o = `${i}::${a}`;
		t.has(o) || t.set(o, {
			addr: r,
			name: n,
			normalizedAddr: a,
			normalizedName: i
		});
	}), [...t.values()];
}
function gt(e, t, n) {
	let r = _e(t);
	if (!r) return [];
	function i(e) {
		let t = n === "address" ? e.normalizedAddr : e.normalizedName, i = n === "address" ? e.normalizedName : e.normalizedAddr, a = `${e.normalizedName} ${e.normalizedAddr}`.trim();
		return t.startsWith(r) ? 0 : t.includes(r) ? 1 : i.startsWith(r) ? 2 : i.includes(r) ? 3 : a.includes(r) ? 4 : Infinity;
	}
	return e.map((e) => ({
		record: e,
		score: i(e)
	})).filter((e) => Number.isFinite(e.score)).sort((e, t) => e.score - t.score).slice(0, 8).map((e) => e.record);
}
function _t(e) {
	let [t, n] = (0, _.useState)(le), [r, i] = (0, _.useState)(!le), [a, o] = (0, _.useState)("");
	return (0, _.useEffect)(() => {
		let t = !1;
		return i(!le), pt(e).then((e) => {
			t || (n(e), o(""), i(!1));
		}).catch((e) => {
			t || (o(e.message || "Map data unavailable"), i(!1));
		}), () => {
			t = !0;
		};
	}, [e]), {
		error: a,
		loading: r,
		payload: t
	};
}
function vt({ initialProvinces: e, lang: t }) {
	let [n, r] = (0, _.useState)(""), [i, a] = (0, _.useState)(""), [o, s] = (0, _.useState)(""), [c, l] = (0, _.useState)([]), [u, d] = (0, _.useState)([]), [f, p] = (0, _.useState)(!1), [m, h] = (0, _.useState)(!1);
	return (0, _.useEffect)(() => {
		let e = !1;
		if (!n) {
			l([]), d([]), a(""), s("");
			return;
		}
		return p(!0), mt("provinceCode", n, t).then((t) => {
			e || (l(t), a(""), s(""), d([]));
		}).catch(() => {
			e || (l([]), a(""), d([]), s(""));
		}).finally(() => {
			e || p(!1);
		}), () => {
			e = !0;
		};
	}, [n, t]), (0, _.useEffect)(() => {
		let e = !1;
		if (!i) {
			d([]), s("");
			return;
		}
		return h(!0), mt("cityCode", i, t).then((t) => {
			e || (d(t), s(""));
		}).catch(() => {
			e || (d([]), s(""));
		}).finally(() => {
			e || h(!1);
		}), () => {
			e = !0;
		};
	}, [i, t]), {
		cityCode: i,
		cityOptions: c,
		countyCode: o,
		countyOptions: u,
		initialProvinces: e,
		loadingCityOptions: f,
		loadingCountyOptions: m,
		provinceCode: n,
		setCityCode: a,
		setCountyCode: s,
		setProvinceCode: r
	};
}
function yt(e) {
	let [t, n] = (0, _.useState)([]);
	return (0, _.useEffect)(() => {
		let t = !1;
		return pt(e).then((e) => {
			t || n(ht(e && e.data));
		}).catch(() => {
			t || n([]);
		}), () => {
			t = !0;
		};
	}, [e]), t;
}
function bt({ currentPath: e, lang: t, options: n }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "language-switcher-pill",
		"aria-label": "Language",
		children: n.map((n) => /* @__PURE__ */ (0, C.jsx)("button", {
			className: `language-switcher-pill__button${n.code === t ? " is-active" : ""}`,
			onClick: () => {
				window.location.href = Ze(e, n.code);
			},
			type: "button",
			children: n.label
		}, n.code))
	});
}
function xt({ bootstrap: e, easterEggActive: t }) {
	let { currentPath: n, i18n: r, lang: i, languageOptions: a } = e, o = [
		{
			href: "/map",
			label: F(r, ["index", "viewMap"], "Map")
		},
		{
			href: "/form",
			label: F(r, ["index", "fillForm"], "Form")
		},
		{
			href: "/blog",
			label: F(r, ["index", "blogLibrary"], "Blog")
		},
		{
			href: "/privacy",
			label: F(r, ["navigation", "privacy"], "Privacy")
		}
	];
	return /* @__PURE__ */ (0, C.jsx)("header", {
		className: "site-header",
		children: /* @__PURE__ */ (0, C.jsxs)("div", {
			className: "site-header__glass",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("a", {
					className: "brand-lockup",
					href: I("/", i),
					children: [/* @__PURE__ */ (0, C.jsx)("span", {
						className: `brand-lockup__mark${t ? " is-easter-egg" : ""}`,
						children: t ? /* @__PURE__ */ (0, C.jsx)("img", {
							alt: "Futari no Mahou",
							src: ie
						}) : "NCT"
					}), /* @__PURE__ */ (0, C.jsxs)("span", {
						className: "brand-lockup__text",
						children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: F(r, ["common", "siteName"], "NO CONVERSION THERAPY") }), /* @__PURE__ */ (0, C.jsx)("small", { children: "Liquid glass edition" })]
					})]
				}),
				/* @__PURE__ */ (0, C.jsx)("nav", {
					className: "site-nav",
					"aria-label": "Primary",
					children: o.map((e) => /* @__PURE__ */ (0, C.jsx)("a", {
						className: n.startsWith(e.href) && e.href !== "/" ? "is-active" : "",
						href: I(e.href, i),
						children: e.label
					}, e.href))
				}),
				/* @__PURE__ */ (0, C.jsx)(bt, {
					currentPath: n,
					lang: i,
					options: a
				})
			]
		})
	});
}
function St({ bootstrap: e }) {
	let { i18n: t, lang: n } = e;
	return /* @__PURE__ */ (0, C.jsx)("footer", {
		className: "site-footer-react",
		children: /* @__PURE__ */ (0, C.jsxs)("div", {
			className: "site-footer-react__glass",
			children: [/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["common", "footerBy"], "© 2026 N·C·T Project.") }), /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "site-footer-react__links",
				children: [
					/* @__PURE__ */ (0, C.jsx)("a", {
						href: I("/map", n),
						children: F(t, ["map", "title"], "Map")
					}),
					/* @__PURE__ */ (0, C.jsx)("a", {
						href: I("/blog", n),
						children: F(t, ["blog", "title"], "Blog")
					}),
					/* @__PURE__ */ (0, C.jsx)("a", {
						href: I("/privacy", n),
						children: F(t, ["navigation", "privacy"], "Privacy")
					})
				]
			})]
		})
	});
}
function z({ bootstrap: e, children: t }) {
	let [n, r] = (0, _.useState)(!1);
	return (0, _.useEffect)(() => {
		function e() {
			r(!0), Xe(D).catch(() => {});
		}
		return window.addEventListener(re, e), () => {
			window.removeEventListener(re, e);
		};
	}, []), /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "page-shell",
		children: [
			/* @__PURE__ */ (0, C.jsx)("div", { className: "page-shell__aurora page-shell__aurora--one" }),
			/* @__PURE__ */ (0, C.jsx)("div", { className: "page-shell__aurora page-shell__aurora--two" }),
			/* @__PURE__ */ (0, C.jsx)("div", { className: "page-shell__grid" }),
			/* @__PURE__ */ (0, C.jsx)(xt, {
				bootstrap: e,
				easterEggActive: n
			}),
			/* @__PURE__ */ (0, C.jsx)("main", {
				className: "page-shell__content",
				children: t
			}),
			/* @__PURE__ */ (0, C.jsx)(St, { bootstrap: e })
		]
	});
}
function B({ eyebrow: e, title: t, description: n, children: r, onTitleClick: i, titleClassName: a = "" }) {
	return /* @__PURE__ */ (0, C.jsx)("section", {
		className: "hero-block",
		children: /* @__PURE__ */ (0, C.jsxs)("div", {
			className: "hero-block__glass",
			children: [
				e ? /* @__PURE__ */ (0, C.jsx)("p", {
					className: "hero-block__eyebrow",
					children: e
				}) : null,
				/* @__PURE__ */ (0, C.jsx)("h1", {
					className: `${a}${i ? " is-clickable" : ""}`.trim(),
					onClick: i,
					children: t
				}),
				n ? /* @__PURE__ */ (0, C.jsx)("p", {
					className: "hero-block__description",
					children: n
				}) : null,
				r
			]
		})
	});
}
function Ct({ bootstrap: e }) {
	let { i18n: t, lang: n } = e, r = (0, _.useRef)([]);
	function i() {
		let e = Date.now(), t = r.current.filter((t) => e - t <= E);
		t.push(e), r.current = t, t.length >= T && (r.current = [], window.dispatchEvent(new Event(re)));
	}
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, ["index", "tagline"], ""),
			eyebrow: "Victims Union",
			onTitleClick: i,
			title: F(t, ["common", "siteName"], "NO CONVERSION THERAPY"),
			titleClassName: "hero-block__title--home",
			children: /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "hero-actions",
				children: [
					/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button glass-button--primary",
						href: I("/form", n),
						children: F(t, ["index", "fillForm"], "Form")
					}),
					/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I("/map", n),
						children: F(t, ["index", "viewMap"], "Map")
					}),
					/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I("/blog", n),
						children: F(t, ["index", "blogLibrary"], "Blog")
					})
				]
			})
		}), /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "showcase-grid",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("article", {
					className: "glass-card",
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", {
							className: "glass-card__badge",
							children: "01"
						}),
						/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["map", "title"], "Map") }),
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["map", "note"], "A public view of institutions and records.") }),
						/* @__PURE__ */ (0, C.jsx)("a", {
							href: I("/map", n),
							children: F(t, [
								"map",
								"sections",
								"map"
							], "Open map")
						})
					]
				}),
				/* @__PURE__ */ (0, C.jsxs)("article", {
					className: "glass-card",
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", {
							className: "glass-card__badge",
							children: "02"
						}),
						/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["form", "title"], "Form") }),
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["form", "subtitle"], "Documenting harm helps make resistance visible.") }),
						/* @__PURE__ */ (0, C.jsx)("a", {
							href: I("/form", n),
							children: F(t, [
								"form",
								"buttons",
								"submit"
							], "Open form")
						})
					]
				}),
				/* @__PURE__ */ (0, C.jsxs)("article", {
					className: "glass-card",
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", {
							className: "glass-card__badge",
							children: "03"
						}),
						/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["blog", "title"], "Blog") }),
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["blog", "subtitle"], "A library of memory, evidence, and guidance.") }),
						/* @__PURE__ */ (0, C.jsx)("a", {
							href: I("/blog", n),
							children: F(t, ["index", "blogLibrary"], "Open blog")
						})
					]
				})
			]
		})]
	});
}
function wt({ activeSection: e, i18n: t, lang: n, onNavigate: r }) {
	let i = {
		blog: n === "zh-TW" ? "文庫" : n === "zh-CN" ? "文库" : "Blog",
		form: n === "zh-TW" ? "表單" : n === "zh-CN" ? "表单" : "Form",
		map: n === "zh-TW" ? "地圖" : n === "zh-CN" ? "地图" : "Map"
	};
	return /* @__PURE__ */ (0, C.jsx)("nav", {
		className: "portal-tabs",
		"aria-label": "Portal sections",
		children: [
			{
				id: "map",
				href: "/map",
				label: i.map
			},
			{
				id: "form",
				href: "/form",
				label: i.form
			},
			{
				id: "blog",
				href: "/blog",
				label: i.blog
			}
		].map((t) => /* @__PURE__ */ (0, C.jsx)("a", {
			className: `portal-tabs__item${e === t.id ? " is-active" : ""}`,
			href: I(t.href, n),
			onClick: (e) => {
				e.preventDefault(), r(t.id, t.href);
			},
			children: t.label
		}, t.id))
	});
}
function Tt({ label: e, value: t, hint: n }) {
	let r = (t == null ? "" : String(t)).length > 12;
	return /* @__PURE__ */ (0, C.jsxs)("article", {
		className: "stat-chip",
		children: [
			/* @__PURE__ */ (0, C.jsx)("p", {
				className: "stat-chip__label",
				children: e
			}),
			/* @__PURE__ */ (0, C.jsx)("strong", {
				className: `stat-chip__value${r ? " is-compact" : ""}`,
				children: t
			}),
			n ? /* @__PURE__ */ (0, C.jsx)("small", { children: n }) : null
		]
	});
}
function Et({ allRecords: e, groups: t, i18n: n, lang: r, onSelectSchool: i, query: a, selectedSchoolKey: o }) {
	let s = (0, _.useRef)(null), c = (0, _.useRef)(null), l = (0, _.useRef)(null), u = (0, _.useRef)(null), d = (0, _.useRef)(0), f = (0, _.useRef)(null), p = (0, _.useRef)(null), m = (0, _.useRef)(/* @__PURE__ */ new Map()), h = (0, _.useRef)(/* @__PURE__ */ new Map());
	return (0, _.useEffect)(() => {
		if (!s.current || c.current) return;
		let e = S.default.map(s.current, {
			preferCanvas: !0,
			zoomControl: !1
		}).setView([37.5, 109], 4);
		S.default.control.zoom({ position: "bottomright" }).addTo(e), e.getPane("provinceFillPane") || e.createPane("provinceFillPane"), e.getPane("provinceBorderPane") || e.createPane("provinceBorderPane"), e.getPane("schoolMarkerPane") || e.createPane("schoolMarkerPane"), e.getPane("schoolTooltipPane") || e.createPane("schoolTooltipPane"), e.getPane("provinceFillPane").style.zIndex = "625", e.getPane("provinceFillPane").style.pointerEvents = "none", e.getPane("provinceBorderPane").style.zIndex = "640", e.getPane("provinceBorderPane").style.pointerEvents = "none", e.getPane("schoolMarkerPane").style.zIndex = "675", e.getPane("schoolTooltipPane").style.zIndex = "800", e.getPane("schoolTooltipPane").style.pointerEvents = "none", Fe({
			map: e,
			mapElement: s.current,
			minZoom: 4,
			providerIndexRef: d,
			tileLayerRef: u
		}), c.current = e, l.current = S.default.layerGroup().addTo(e), requestAnimationFrame(() => {
			e.invalidateSize();
		});
		let t = je(() => {
			c.current && (d.current = 0, Fe({
				map: e,
				mapElement: s.current,
				minZoom: 4,
				providerIndexRef: d,
				tileLayerRef: u
			}), f.current && f.current.setStyle({ color: Me().mapOutline }));
		});
		return () => {
			t(), e.remove(), c.current = null, l.current = null, u.current = null, f.current = null, p.current = null, m.current = /* @__PURE__ */ new Map(), h.current = /* @__PURE__ */ new Map();
		};
	}, []), (0, _.useEffect)(() => {
		let o = c.current, s = l.current;
		if (!o || !s) return;
		s.clearLayers(), m.current = /* @__PURE__ */ new Map(), h.current = /* @__PURE__ */ new Map();
		let u = rt(e), d = Math.max(0, ...Array.from(u.values()).map((e) => Ee(e)));
		t.forEach((e) => {
			let t = e && e.summaryRecord, c = Number(t && t.lat), l = Number(t && t.lng);
			if (!Number.isFinite(c) || !Number.isFinite(l)) return;
			let f = u.get(e.schoolKey) || {
				agentCount: 0,
				selfCount: 0
			}, p = Oe(f, d), g = ke(f, d), _ = S.default.marker([c, l], {
				icon: Te(p),
				opacity: g,
				pane: "schoolMarkerPane"
			});
			_.bindTooltip(`<strong>${ve(t.name || "")}</strong>`, {
				direction: "top",
				pane: "schoolTooltipPane",
				sticky: !0
			}), _.bindPopup(We(e, n, r, a), Ue(o)), _.on("click", () => {
				i(e.schoolKey);
			}), _.addTo(s), m.current.set(e.schoolKey, {
				color: p,
				opacity: g
			}), h.current.set(e.schoolKey, _);
		});
		let g = !1;
		return Le().then((e) => {
			if (g || !c.current) return;
			p.current &&= (o.removeLayer(p.current), null), f.current &&= (o.removeLayer(f.current), null);
			let n = Re(t), i = Math.max(0, ...n.values(), 0);
			p.current = S.default.geoJSON(e, {
				interactive: !1,
				pane: "provinceFillPane",
				style(e) {
					let t = ze(e), r = n.get(t) || 0;
					return {
						color: "transparent",
						fillColor: xe(r, i),
						fillOpacity: r > 0 ? N : 0,
						opacity: 0,
						weight: 0
					};
				}
			}).addTo(o), f.current = S.default.geoJSON(e, {
				interactive: !1,
				onEachFeature(e, t) {
					He(e, t, r);
				},
				pane: "provinceBorderPane",
				style() {
					return {
						color: Me().mapOutline,
						dashArray: "3",
						fillOpacity: 0,
						opacity: 1,
						weight: 2
					};
				}
			}).addTo(o), typeof p.current.bringToFront == "function" && p.current.bringToFront(), typeof f.current.bringToFront == "function" && f.current.bringToFront();
			let a = f.current.getBounds();
			a && typeof a.isValid == "function" && a.isValid() && o.fitBounds(a.pad(.03), {
				animate: !1,
				maxZoom: 4
			}), requestAnimationFrame(() => {
				o.invalidateSize();
			});
		}).catch(() => {
			requestAnimationFrame(() => {
				o.invalidateSize();
			});
		}), () => {
			g = !0;
		};
	}, [
		e,
		t,
		n,
		r,
		i,
		a
	]), (0, _.useEffect)(() => {
		h.current.forEach((e, t) => {
			let n = m.current.get(t) || {}, r = !!o && t === o;
			e.setIcon(Te(r ? "#1f6fff" : n.color || j)), e.setOpacity(r ? 1 : Number.isFinite(n.opacity) ? n.opacity : O), e.setZIndexOffset(r ? 1200 : 0);
		});
		let e = h.current.get(o);
		e && typeof e.openPopup == "function" && e.openPopup();
	}, [o]), /* @__PURE__ */ (0, C.jsx)("div", {
		className: "map-surface",
		ref: s
	});
}
function V({ group: e, i18n: t, lang: n, query: r, selected: i, onSelect: a }) {
	let o = e.summaryRecord || {}, s = {
		self: e.pages.filter((e) => e.inputType === w).length,
		agent: e.pages.filter((e) => e.inputType === ee).length
	};
	return /* @__PURE__ */ (0, C.jsxs)("article", {
		className: `map-record-card${i ? " is-selected" : ""}`,
		id: `school-${e.schoolKey}`,
		onMouseEnter: () => a(e.schoolKey),
		children: [
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "map-record-card__header",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h3", { children: o.name || F(t, [
					"map",
					"record",
					"eyebrow"
				], "Institution") }), /* @__PURE__ */ (0, C.jsx)("p", { children: tt(t, o) })] }), /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "map-record-card__counts",
					children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						F(t, [
							"map",
							"list",
							"reportCounts",
							"self"
						], "Self"),
						" ",
						s.self
					] }), /* @__PURE__ */ (0, C.jsxs)("span", { children: [
						F(t, [
							"map",
							"list",
							"reportCounts",
							"agent"
						], "Agent"),
						" ",
						s.agent
					] })]
				})]
			}),
			o.addr ? /* @__PURE__ */ (0, C.jsx)("p", {
				className: "map-record-card__line",
				children: o.addr
			}) : null,
			o.contact ? /* @__PURE__ */ (0, C.jsx)("p", {
				className: "map-record-card__line",
				children: o.contact
			}) : null,
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "map-record-card__entries",
				children: e.pages.map((i, a) => /* @__PURE__ */ (0, C.jsxs)("details", {
					className: "map-record-entry",
					children: [/* @__PURE__ */ (0, C.jsxs)("summary", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: et(t, i.inputType) }), /* @__PURE__ */ (0, C.jsx)("strong", { children: lt(t, i) })] }), /* @__PURE__ */ (0, C.jsxs)("div", {
						className: "map-record-entry__body",
						children: [
							i.experience ? /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h4", { children: F(t, [
								"form",
								"fields",
								"experience"
							], "Experience") }), /* @__PURE__ */ (0, C.jsx)("p", { children: i.experience })] }) : null,
							i.scandal ? /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h4", { children: F(t, [
								"form",
								"fields",
								"scandal"
							], "Scandal") }), /* @__PURE__ */ (0, C.jsx)("p", { children: i.scandal })] }) : null,
							i.else ? /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h4", { children: F(t, [
								"form",
								"fields",
								"other"
							], "Other") }), /* @__PURE__ */ (0, C.jsx)("p", { children: i.else })] }) : null,
							/* @__PURE__ */ (0, C.jsx)("a", {
								className: "inline-link",
								href: ct(i, {
									lang: n,
									query: r
								}),
								children: "Open detail"
							})
						]
					})]
				}, `${e.schoolKey}-${a}`))
			})
		]
	});
}
function Dt({ apiUrl: e, i18n: t, initialQuery: n, lang: r }) {
	let { error: i, loading: a, payload: o } = _t(e), [s, c] = (0, _.useState)(""), [l, u] = (0, _.useState)(n.inputType || ""), [d, f] = (0, _.useState)(n.search || ""), p = (0, _.useDeferredValue)(d), m = o && Array.isArray(o.data) ? o.data : [], h = it(m.filter((e) => {
		let t = l ? l === "批量数据" ? !e.inputType : e.inputType === l : !0, n = _e(p), r = [
			e.name,
			e.addr,
			e.experience,
			e.scandal,
			e.contact,
			e.else,
			e.province,
			e.city,
			e.county
		].map((e) => _e(e)).join(" "), i = !n || r.includes(n);
		return t && i;
	})), g = [...Re(h).entries()].map(([e, t]) => ({
		province: e,
		count: t
	})).sort((e, t) => Number(t && t.count || 0) - Number(e && e.count || 0)).slice(0, 6);
	return (0, _.useEffect)(() => {
		!s && h.length > 0 && c(h[0].schoolKey);
	}, [h, s]), /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "section-stack",
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, ["map", "note"], ""),
				eyebrow: "Map / Liquid Glass",
				title: F(t, ["map", "title"], "Map"),
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "stat-grid",
					children: [
						/* @__PURE__ */ (0, C.jsx)(Tt, {
							hint: Qe(o && o.last_synced, r),
							label: F(t, [
								"map",
								"stats",
								"lastSynced"
							], "Last synced"),
							value: a ? F(t, ["common", "loading"], "Loading") : R(o && o.last_synced, r)
						}),
						/* @__PURE__ */ (0, C.jsx)(Tt, {
							label: F(t, [
								"map",
								"stats",
								"schoolNum"
							], "Schools"),
							value: a ? "..." : Number(o && o.schoolNum || h.length)
						}),
						/* @__PURE__ */ (0, C.jsx)(Tt, {
							label: F(t, [
								"map",
								"stats",
								"submittedForms"
							], "Submissions"),
							value: a ? "..." : Number(o && o.formNum || m.length)
						}),
						/* @__PURE__ */ (0, C.jsx)(Tt, {
							label: F(t, [
								"map",
								"stats",
								"averageAge"
							], "Average age"),
							value: a ? "..." : Number(o && o.avg_age || 0)
						})
					]
				})
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "section-heading",
						children: /* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
							"map",
							"sections",
							"tags"
						], "Filters") })
					}),
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "chip-row chip-row--filters",
						children: P.map((e) => /* @__PURE__ */ (0, C.jsx)("button", {
							className: `filter-chip${l === e.value ? " is-active" : ""}`,
							onClick: () => u(e.value),
							type: "button",
							children: F(t, e.key, e.fallback)
						}, e.value || "all"))
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(t, [
							"map",
							"list",
							"searchPlaceholder"
						], "Search") }), /* @__PURE__ */ (0, C.jsx)("input", {
							onChange: (e) => {
								(0, _.startTransition)(() => {
									f(e.target.value);
								});
							},
							placeholder: F(t, [
								"map",
								"list",
								"searchPlaceholder"
							], "Search institutions, places, or details"),
							type: "text",
							value: d
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
						"map",
						"sections",
						"map"
					], "Map") }), /* @__PURE__ */ (0, C.jsx)("p", { children: i || `${h.length} visible institutions` })]
				}), /* @__PURE__ */ (0, C.jsx)(Et, {
					allRecords: m,
					groups: h,
					i18n: t,
					lang: r,
					onSelectSchool: c,
					query: {
						inputType: l,
						search: d
					},
					selectedSchoolKey: s
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsx)("div", {
					className: "section-heading",
					children: /* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
						"map",
						"stats",
						"provinceStats"
					], "Province distribution") })
				}), /* @__PURE__ */ (0, C.jsx)("div", {
					className: "ranking-grid",
					children: g.map((e) => /* @__PURE__ */ (0, C.jsxs)("article", {
						className: "ranking-card",
						children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: $e(t, e.province) }), /* @__PURE__ */ (0, C.jsx)("span", { children: Number(e.count || 0) })]
					}, e.province))
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "section-heading",
						children: /* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
							"map",
							"api",
							"summary"
						], "API") })
					}),
					/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, [
						"map",
						"api",
						"privacy"
					], "") }),
					/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, [
						"map",
						"api",
						"implementationBody"
					], "") }),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "panel-actions",
						children: [/* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: I("/map/correction", r),
							children: F(t, [
								"map",
								"api",
								"correctionButton"
							], "Correction")
						}), /* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: "/api/map-data",
							rel: "noreferrer",
							target: "_blank",
							children: F(t, [
								"map",
								"api",
								"link"
							], "Open API")
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
						"map",
						"sections",
						"allData"
					], "All data") }), /* @__PURE__ */ (0, C.jsx)("p", { children: a ? F(t, ["common", "loading"], "Loading") : `${h.length} institutions` })]
				}), /* @__PURE__ */ (0, C.jsx)("div", {
					className: "records-list",
					children: h.map((e) => /* @__PURE__ */ (0, C.jsx)(V, {
						group: e,
						i18n: t,
						lang: r,
						onSelect: c,
						query: {
							inputType: l,
							search: d
						},
						selected: e.schoolKey === s
					}, e.schoolKey))
				})]
			})
		]
	});
}
function Ot({ suggestions: e, onSelect: t }) {
	return e.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "suggestion-list",
		children: e.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
			className: "suggestion-list__item",
			onMouseDown: (n) => {
				n.preventDefault(), t(e);
			},
			type: "button",
			children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: e.name || e.addr }), e.addr ? /* @__PURE__ */ (0, C.jsx)("small", { children: e.addr }) : null]
		}, `${e.name}-${e.addr}`))
	}) : null;
}
var kt = (0, _.memo)(function({ visible: e, onPick: t }) {
	let n = (0, _.useRef)(null), r = (0, _.useRef)(null), i = (0, _.useRef)(null), a = (0, _.useRef)(null), o = (0, _.useRef)(0), s = (0, _.useEffectEvent)(t);
	return (0, _.useEffect)(() => {
		if (!e || !n.current || r.current) return;
		let t = S.default.map(n.current).setView([37.5, 109], 3);
		Fe({
			map: t,
			mapElement: n.current,
			minZoom: 3,
			providerIndexRef: o,
			tileLayerRef: a
		});
		let c = je(() => {
			r.current && (o.current = 0, Fe({
				map: t,
				mapElement: n.current,
				minZoom: 3,
				providerIndexRef: o,
				tileLayerRef: a
			}));
		});
		return t.on("click", (e) => {
			let { lat: n, lng: r } = e.latlng;
			i.current && t.removeLayer(i.current), i.current = S.default.circleMarker([n, r], {
				className: "picker-selected-point",
				color: "#1f6fff",
				fillColor: "#5cb6ff",
				fillOpacity: .95,
				radius: 8,
				weight: 3
			}).addTo(t), i.current.bindPopup(`${Number(n).toFixed(6)}, ${Number(r).toFixed(6)}`).openPopup(), t.setView([n, r], Math.max(t.getZoom(), 15), { animate: !0 }), s(n, r);
		}), r.current = t, requestAnimationFrame(() => {
			t.invalidateSize();
		}), () => {
			c(), t.remove(), r.current = null, a.current = null, i.current = null;
		};
	}, [e]), e ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "picker-map",
		ref: n
	}) : null;
}, (e, t) => e.visible === t.visible);
function At({ apiUrl: e, formConfig: t, i18n: n, lang: r }) {
	let i = yt(e), [a, o] = (0, _.useState)(!1), [s, c] = (0, _.useState)([]), [l, u] = (0, _.useState)([]), [d, f] = (0, _.useState)(!1), [p, m] = (0, _.useState)(""), [h, g] = (0, _.useState)({
		birth_year: "",
		cityCode: "",
		contact_information: "",
		countyCode: "",
		date_end: "",
		date_start: "",
		experience: "",
		headmaster_name: "",
		identity: t.identityOptions[0] ? t.identityOptions[0].value : w,
		other: "",
		provinceCode: "",
		scandal: "",
		school_address: "",
		school_name: "",
		sex: "",
		sex_other: "",
		sex_other_type: ""
	}), v = vt({
		initialProvinces: t.areaOptions.provinces || [],
		lang: r
	}), y = (0, _.useRef)(null), b = (0, _.useRef)(null), x = (0, _.useEffectEvent)((e, t) => {
		re(e, t);
	});
	(0, _.useEffect)(() => {
		v.setProvinceCode(h.provinceCode);
	}, [h.provinceCode]), (0, _.useEffect)(() => {
		v.setCityCode(h.cityCode);
	}, [h.cityCode]), (0, _.useEffect)(() => {
		c(gt(i, h.school_name, "school"));
	}, [i, h.school_name]), (0, _.useEffect)(() => {
		u(gt(i, h.school_address, "address"));
	}, [i, h.school_address]), (0, _.useEffect)(() => {
		h.sex !== te && g((e) => ({
			...e,
			sex_other: "",
			sex_other_type: ""
		}));
	}, [h.sex]);
	let S = h.identity === ee, T = n.form || {};
	function E(e, t) {
		g((n) => ({
			...n,
			[e]: t
		}));
	}
	function re(e, t) {
		let n = Number(e).toFixed(6), r = Number(t).toFixed(6);
		E("school_address", `latlng${n},${r}`), m(ge(F(T, ["location", "filled"], "Current location captured: {lat}, {lng}"), {
			lat: n,
			lng: r
		}));
	}
	function ie(e) {
		let t = e.currentTarget;
		if (h.sex === te && !h.sex_other_type) {
			e.preventDefault(), b.current && (b.current.setCustomValidity(F(T, ["validation", "specifyOtherSex"], "Please choose an option")), b.current.reportValidity());
			return;
		}
		if (h.sex === te && h.sex_other_type === ne && !h.sex_other.trim()) {
			e.preventDefault(), b.current && (b.current.setCustomValidity(F(T, ["validation", "fillOtherSex"], "Please enter the custom value")), b.current.reportValidity());
			return;
		}
		if (h.date_start && h.date_end && h.date_end < h.date_start) {
			e.preventDefault(), window.alert(F(T, ["validation", "endDateBeforeStart"], "End date cannot be earlier than the start date."));
			return;
		}
		if (!t.checkValidity()) {
			e.preventDefault(), t.reportValidity();
			return;
		}
		o(!0);
	}
	return /* @__PURE__ */ (0, C.jsxs)("form", {
		action: "/submit",
		className: "report-form",
		method: "POST",
		onSubmit: ie,
		ref: y,
		children: [
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "form-honeypot",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, C.jsx)("label", {
					htmlFor: "website",
					children: "Website"
				}), /* @__PURE__ */ (0, C.jsx)("input", {
					autoComplete: "off",
					id: "website",
					name: "website",
					spellCheck: "false",
					tabIndex: "-1",
					type: "text"
				})]
			}),
			/* @__PURE__ */ (0, C.jsx)("input", {
				name: "form_token",
				type: "hidden",
				value: t.formProtectionToken
			}),
			/* @__PURE__ */ (0, C.jsx)("p", {
				className: "form-privacy-note",
				children: F(T, ["privacyNotice"], "")
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "form-grid",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "identity"], "Identity") }), /* @__PURE__ */ (0, C.jsx)("select", {
							name: "identity",
							onChange: (e) => E("identity", e.target.value),
							required: !0,
							value: h.identity,
							children: t.identityOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e.value,
								children: e.label
							}, e.value))
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: S ? F(T, ["fields", "victimBirthYear"], "Victim birth year") : F(T, ["fields", "birthYear"], "Birth year") }), /* @__PURE__ */ (0, C.jsxs)("select", {
							name: "birth_year",
							onChange: (e) => E("birth_year", e.target.value),
							required: !0,
							value: h.birth_year,
							children: [/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: F(T, ["placeholders", "birthYear"], "Choose a year")
							}), Array.from({ length: t.formRules.birthYear.max - t.formRules.birthYear.min + 1 }, (e, n) => t.formRules.birthYear.max - n).map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: S ? F(T, ["fields", "victimSex"], "Victim sex") : F(T, ["fields", "sex"], "Sex") }), /* @__PURE__ */ (0, C.jsxs)("select", {
							name: "sex",
							onChange: (e) => E("sex", e.target.value),
							required: !0,
							value: h.sex,
							children: [/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: F(T, ["sexOptions", "placeholder"], "Choose")
							}), t.sexOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e.value,
								children: e.label
							}, e.value))]
						})]
					}),
					h.sex === te ? /* @__PURE__ */ (0, C.jsxs)("div", {
						className: "field field--full",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["hints", "otherSex"], "Choose an option or enter a custom value") }), /* @__PURE__ */ (0, C.jsxs)("div", {
							className: "choice-row",
							children: [t.otherSexTypeOptions.map((e) => /* @__PURE__ */ (0, C.jsxs)("label", {
								className: "choice-pill",
								children: [/* @__PURE__ */ (0, C.jsx)("input", {
									checked: h.sex_other_type === e.value,
									name: "sex_other_type",
									onChange: (e) => E("sex_other_type", e.target.value),
									type: "radio",
									value: e.value
								}), /* @__PURE__ */ (0, C.jsx)("span", { children: e.label })]
							}, e.value)), /* @__PURE__ */ (0, C.jsxs)("label", {
								className: "choice-pill choice-pill--input",
								children: [/* @__PURE__ */ (0, C.jsx)("input", {
									checked: h.sex_other_type === ne,
									name: "sex_other_type",
									onChange: (e) => E("sex_other_type", e.target.value),
									type: "radio",
									value: ne
								}), /* @__PURE__ */ (0, C.jsx)("input", {
									maxLength: t.formRules.sexOther.maxLength,
									name: "sex_other",
									onChange: (e) => {
										b.current && b.current.setCustomValidity(""), E("sex_other", e.target.value), E("sex_other_type", ne);
									},
									placeholder: F(T, ["placeholders", "otherSex"], "Other"),
									ref: b,
									type: "text",
									value: h.sex_other
								})]
							})]
						})]
					}) : null,
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "dateStart"], "Start date") }), /* @__PURE__ */ (0, C.jsx)("input", {
							name: "date_start",
							onChange: (e) => E("date_start", e.target.value),
							required: !0,
							type: "date",
							value: h.date_start
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "dateEnd"], "End date") }), /* @__PURE__ */ (0, C.jsx)("input", {
							name: "date_end",
							onChange: (e) => E("date_end", e.target.value),
							type: "date",
							value: h.date_end
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field field--full",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "experience"], "Experience") }), /* @__PURE__ */ (0, C.jsx)("textarea", {
							maxLength: t.formRules.experience.maxLength,
							name: "experience",
							onChange: (e) => E("experience", e.target.value),
							placeholder: F(T, ["placeholders", "experience"], "Describe what happened"),
							rows: "5",
							value: h.experience
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "field field--full",
						children: [
							/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "schoolName"], "Institution") }),
							/* @__PURE__ */ (0, C.jsx)("input", {
								maxLength: t.formRules.schoolName.maxLength,
								name: "school_name",
								onChange: (e) => E("school_name", e.target.value),
								placeholder: F(T, ["placeholders", "schoolName"], "Institution name"),
								required: !0,
								type: "text",
								value: h.school_name
							}),
							/* @__PURE__ */ (0, C.jsx)(Ot, {
								onSelect: (e) => {
									E("school_name", e.name), E("school_address", e.addr), c([]);
								},
								suggestions: s
							})
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "province"], "Province") }), /* @__PURE__ */ (0, C.jsxs)("select", {
							name: "provinceCode",
							onChange: (e) => {
								E("provinceCode", e.target.value), E("cityCode", ""), E("countyCode", "");
							},
							required: !0,
							value: h.provinceCode,
							children: [/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: F(T, ["placeholders", "province"], "Select province")
							}), v.initialProvinces.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e.code,
								children: e.name
							}, e.code))]
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "city"], "City") }), /* @__PURE__ */ (0, C.jsxs)("select", {
							disabled: !h.provinceCode,
							name: "cityCode",
							onChange: (e) => {
								E("cityCode", e.target.value), E("countyCode", "");
							},
							required: !0,
							value: h.cityCode,
							children: [/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: v.loadingCityOptions ? F(n, ["common", "loading"], "Loading") : F(T, ["placeholders", "city"], "Select city")
							}), v.cityOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e.code,
								children: e.name
							}, e.code))]
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "county"], "County") }), /* @__PURE__ */ (0, C.jsxs)("select", {
							disabled: !h.cityCode,
							name: "countyCode",
							onChange: (e) => E("countyCode", e.target.value),
							value: h.countyCode,
							children: [/* @__PURE__ */ (0, C.jsx)("option", {
								value: "",
								children: v.loadingCountyOptions ? F(n, ["common", "loading"], "Loading") : F(T, ["placeholders", "countyInitial"], "Optional")
							}), v.countyOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
								value: e.code,
								children: e.name
							}, e.code))]
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "field field--full",
						children: [
							/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "schoolAddress"], "Address") }),
							/* @__PURE__ */ (0, C.jsx)("input", {
								maxLength: t.formRules.schoolAddress.maxLength,
								name: "school_address",
								onChange: (e) => E("school_address", e.target.value),
								placeholder: F(T, ["placeholders", "schoolAddress"], "Address"),
								type: "text",
								value: h.school_address
							}),
							/* @__PURE__ */ (0, C.jsx)(Ot, {
								onSelect: (e) => {
									E("school_name", e.name), E("school_address", e.addr), u([]);
								},
								suggestions: l
							}),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "inline-actions",
								children: [/* @__PURE__ */ (0, C.jsx)("button", {
									className: "glass-button glass-button--small",
									onClick: () => f((e) => !e),
									type: "button",
									children: F(T, ["buttons", "openMap"], "Open map")
								}), /* @__PURE__ */ (0, C.jsx)("button", {
									className: "glass-button glass-button--small",
									onClick: async () => {
										try {
											let e = await new Promise((e, t) => {
												if (!navigator.geolocation) {
													t(/* @__PURE__ */ Error("unsupported"));
													return;
												}
												navigator.geolocation.getCurrentPosition(e, t, {
													enableHighAccuracy: !0,
													maximumAge: 3e4,
													timeout: 15e3
												});
											});
											re(e.coords.latitude, e.coords.longitude);
										} catch (e) {
											m(F(T, ["location", "failed"], e.message || "Location unavailable"));
										}
									},
									type: "button",
									children: F(T, ["buttons", "getCurrentLocation"], "Use current location")
								})]
							}),
							p ? /* @__PURE__ */ (0, C.jsx)("p", {
								className: "field-note",
								children: p
							}) : null,
							/* @__PURE__ */ (0, C.jsx)(kt, {
								onPick: x,
								visible: d
							})
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "contactInformation"], "Contact") }), /* @__PURE__ */ (0, C.jsx)("input", {
							maxLength: t.formRules.contactInformation.maxLength,
							name: "contact_information",
							onChange: (e) => E("contact_information", e.target.value),
							placeholder: F(T, ["placeholders", "contactInformation"], "Contact information"),
							required: !0,
							type: "text",
							value: h.contact_information
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "headmasterName"], "Headmaster") }), /* @__PURE__ */ (0, C.jsx)("input", {
							maxLength: t.formRules.headmasterName.maxLength,
							name: "headmaster_name",
							onChange: (e) => E("headmaster_name", e.target.value),
							placeholder: F(T, ["placeholders", "headmasterName"], "Headmaster"),
							type: "text",
							value: h.headmaster_name
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field field--full",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "scandal"], "Scandal") }), /* @__PURE__ */ (0, C.jsx)("textarea", {
							maxLength: t.formRules.scandal.maxLength,
							name: "scandal",
							onChange: (e) => E("scandal", e.target.value),
							placeholder: F(T, ["placeholders", "scandal"], "Details"),
							rows: "4",
							value: h.scandal
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "field field--full",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(T, ["fields", "other"], "Other") }), /* @__PURE__ */ (0, C.jsx)("textarea", {
							maxLength: t.formRules.other.maxLength,
							name: "other",
							onChange: (e) => E("other", e.target.value),
							placeholder: F(T, ["placeholders", "other"], "Other notes"),
							rows: "3",
							value: h.other
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)("button", {
				className: "glass-submit",
				disabled: a,
				type: "submit",
				children: a ? F(T, ["buttons", "submitting"], "Submitting...") : F(T, ["buttons", "submit"], "Submit")
			})
		]
	});
}
function jt({ blog: e, i18n: t, lang: n }) {
	let [r, i] = (0, _.useState)(e.activeTag || ""), a = r ? e.entries.filter((e) => Array.isArray(e.tagid) && e.tagid.includes(r)) : e.entries;
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "section-stack",
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, ["blog", "subtitle"], ""),
				eyebrow: "Blog / Liquid Glass",
				title: F(t, ["blog", "title"], "Blog")
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "glass-panel",
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "chip-row",
					children: [/* @__PURE__ */ (0, C.jsx)("button", {
						className: `filter-chip${r === "" ? " is-active" : ""}`,
						onClick: () => i(""),
						type: "button",
						children: F(t, ["blog", "all"], "All")
					}), Object.entries(e.tags).map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("button", {
						className: `filter-chip${r === e ? " is-active" : ""}`,
						onClick: () => i(e),
						type: "button",
						children: ["#", t]
					}, e))]
				})
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "blog-grid",
				children: a.length === 0 ? /* @__PURE__ */ (0, C.jsx)("article", {
					className: "glass-card",
					children: /* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["blog", "empty"], "No articles yet") })
				}) : a.map((r) => /* @__PURE__ */ (0, C.jsx)("article", {
					className: "blog-card",
					children: /* @__PURE__ */ (0, C.jsxs)("a", {
						href: I(`/port/${encodeURIComponent(r.filename)}`, n),
						children: [
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "blog-card__meta",
								children: [
									r.author ? /* @__PURE__ */ (0, C.jsxs)("span", { children: [F(t, ["blog", "author"], "Author: "), r.author] }) : null,
									/* @__PURE__ */ (0, C.jsxs)("span", { children: [F(t, ["blog", "creationDate"], "Date: "), r.localizedCreationDate || r.CreationDate] }),
									/* @__PURE__ */ (0, C.jsxs)("span", { children: [F(t, ["blog", "language"], "Language: "), r.localizedLanguage || r.Language] })
								]
							}),
							/* @__PURE__ */ (0, C.jsx)("h3", { children: r.title }),
							r.translatedTitle ? /* @__PURE__ */ (0, C.jsx)("p", {
								className: "blog-card__translation",
								children: r.translatedTitle
							}) : null,
							/* @__PURE__ */ (0, C.jsx)("div", {
								className: "chip-row chip-row--compact",
								children: Array.isArray(r.tagid) && r.tagid.length > 0 ? r.tagid.map((t) => /* @__PURE__ */ (0, C.jsxs)("span", {
									className: "inline-tag",
									children: ["#", e.tags[t] || t]
								}, t)) : /* @__PURE__ */ (0, C.jsx)("span", {
									className: "inline-tag",
									children: F(t, ["blog", "noTag"], "#No tag")
								})
							})
						]
					})
				}, `${r.filename}-${r.CreationDate}`))
			})
		]
	});
}
function Mt({ bootstrap: e }) {
	let { apiUrl: t, i18n: n, lang: r, pageProps: i } = e, [a, o] = (0, _.useState)(i.initialSection || "map"), s = (0, _.useRef)(null), c = (0, _.useRef)(null), l = (0, _.useRef)(null), u = {
		blog: l,
		form: c,
		map: s
	};
	(0, _.useEffect)(() => {
		let e = !1;
		async function t() {
			let t = u[i.initialSection || "map"];
			if (document.fonts && document.fonts.ready) try {
				await document.fonts.ready;
			} catch {}
			!e && t && t.current && t.current.scrollIntoView({
				behavior: "auto",
				block: "start"
			});
		}
		let n = window.setTimeout(() => {
			t();
		}, 120);
		return () => {
			e = !0, window.clearTimeout(n);
		};
	}, [i.initialSection]), (0, _.useEffect)(() => {
		let e = Object.entries(u).map(([e, t]) => ({
			element: t.current,
			sectionId: e
		})).filter((e) => e.element), t = new IntersectionObserver((e) => {
			let t = e.filter((e) => e.isIntersecting).sort((e, t) => t.intersectionRatio - e.intersectionRatio)[0];
			t && t.target.dataset.sectionId && o(t.target.dataset.sectionId);
		}, {
			rootMargin: "-15% 0px -55% 0px",
			threshold: [
				.2,
				.4,
				.6
			]
		});
		return e.forEach((e) => {
			t.observe(e.element);
		}), () => {
			t.disconnect();
		};
	}, []);
	function d(e, t) {
		o(e), window.history.replaceState({}, "", I(t, r));
		let n = u[e];
		n && n.current && n.current.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(n, ["index", "tagline"], ""),
				eyebrow: "Stacked Portal",
				title: "Map / Form / Blog"
			}),
			/* @__PURE__ */ (0, C.jsx)(wt, {
				activeSection: a,
				i18n: n,
				lang: r,
				onNavigate: d
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "portal-section",
				"data-section-id": "map",
				ref: s,
				children: /* @__PURE__ */ (0, C.jsx)(Dt, {
					apiUrl: t,
					i18n: n,
					initialQuery: i.mapQuery,
					lang: r
				})
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "portal-section",
				"data-section-id": "form",
				ref: c,
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "section-stack",
					children: [/* @__PURE__ */ (0, C.jsx)(B, {
						description: F(n, ["form", "subtitle"], ""),
						eyebrow: "Form / Liquid Glass",
						title: F(n, ["form", "title"], "Form")
					}), /* @__PURE__ */ (0, C.jsx)("section", {
						className: "glass-panel",
						children: /* @__PURE__ */ (0, C.jsx)(At, {
							apiUrl: t,
							formConfig: i.form,
							i18n: n,
							lang: r
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "portal-section",
				"data-section-id": "blog",
				ref: l,
				children: /* @__PURE__ */ (0, C.jsx)(jt, {
					blog: i.blog,
					i18n: n,
					lang: r
				})
			})
		]
	});
}
function Nt({ bootstrap: e }) {
	let { apiUrl: t, i18n: n, lang: r, pageProps: i } = e, a = yt(t), [o, s] = (0, _.useState)(!1), [c, l] = (0, _.useState)([]), [u, d] = (0, _.useState)([]), [f, p] = (0, _.useState)(!1), [m, h] = (0, _.useState)(""), [g, v] = (0, _.useState)({
		cityCode: "",
		contact_information: "",
		correction_content: "",
		countyCode: "",
		headmaster_name: "",
		provinceCode: "",
		school_address: "",
		school_name: i.initialSchoolName || ""
	}), y = vt({
		initialProvinces: i.areaOptions.provinces || [],
		lang: r
	}), b = n.institutionCorrection || {}, x = (0, _.useEffectEvent)((e, t) => {
		w(e, t);
	});
	(0, _.useEffect)(() => {
		y.setProvinceCode(g.provinceCode);
	}, [g.provinceCode]), (0, _.useEffect)(() => {
		y.setCityCode(g.cityCode);
	}, [g.cityCode]), (0, _.useEffect)(() => {
		l(gt(a, g.school_name, "school"));
	}, [a, g.school_name]), (0, _.useEffect)(() => {
		d(gt(a, g.school_address, "address"));
	}, [a, g.school_address]);
	function S(e, t) {
		v((n) => ({
			...n,
			[e]: t
		}));
	}
	function w(e, t) {
		let n = Number(e).toFixed(6), r = Number(t).toFixed(6);
		S("school_address", `latlng${n},${r}`), h(ge(F(b, ["location", "filled"], "Current location captured: {lat}, {lng}"), {
			lat: n,
			lng: r
		}));
	}
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(b, ["subtitle"], ""),
			eyebrow: "Correction",
			title: F(b, ["title"], "Institution correction"),
			children: /* @__PURE__ */ (0, C.jsx)("div", {
				className: "panel-actions",
				children: /* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button",
					href: I("/map", r),
					children: F(b, ["backToMap"], "Back to map")
				})
			})
		}), /* @__PURE__ */ (0, C.jsx)("section", {
			className: "glass-panel",
			children: /* @__PURE__ */ (0, C.jsxs)("form", {
				action: i.correctionFormAction,
				className: "report-form",
				method: "POST",
				onSubmit: (e) => {
					if (!e.currentTarget.checkValidity()) {
						e.preventDefault(), e.currentTarget.reportValidity();
						return;
					}
					s(!0);
				},
				children: [
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "form-honeypot",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, C.jsx)("label", {
							htmlFor: "website-correction",
							children: "Website"
						}), /* @__PURE__ */ (0, C.jsx)("input", {
							autoComplete: "off",
							id: "website-correction",
							name: "website",
							spellCheck: "false",
							tabIndex: "-1",
							type: "text"
						})]
					}),
					/* @__PURE__ */ (0, C.jsx)("input", {
						name: "form_token",
						type: "hidden",
						value: i.formProtectionToken
					}),
					/* @__PURE__ */ (0, C.jsx)("p", {
						className: "form-privacy-note",
						children: F(b, ["privacyNotice"], "")
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "form-grid",
						children: [
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "field field--full",
								children: [
									/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "schoolName"], "Institution") }),
									/* @__PURE__ */ (0, C.jsx)("input", {
										maxLength: i.institutionCorrectionRules.schoolName.maxLength,
										name: "school_name",
										onChange: (e) => S("school_name", e.target.value),
										placeholder: F(b, ["placeholders", "schoolName"], "Institution name"),
										required: !0,
										type: "text",
										value: g.school_name
									}),
									/* @__PURE__ */ (0, C.jsx)(Ot, {
										onSelect: (e) => {
											S("school_name", e.name), S("school_address", e.addr), l([]);
										},
										suggestions: c
									})
								]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "province"], "Province") }), /* @__PURE__ */ (0, C.jsxs)("select", {
									name: "provinceCode",
									onChange: (e) => {
										S("provinceCode", e.target.value), S("cityCode", ""), S("countyCode", "");
									},
									value: g.provinceCode,
									children: [/* @__PURE__ */ (0, C.jsx)("option", {
										value: "",
										children: F(b, ["placeholders", "province"], "Optional")
									}), y.initialProvinces.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
										value: e.code,
										children: e.name
									}, e.code))]
								})]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "city"], "City") }), /* @__PURE__ */ (0, C.jsxs)("select", {
									disabled: !g.provinceCode,
									name: "cityCode",
									onChange: (e) => {
										S("cityCode", e.target.value), S("countyCode", "");
									},
									value: g.cityCode,
									children: [/* @__PURE__ */ (0, C.jsx)("option", {
										value: "",
										children: F(b, ["placeholders", "city"], "Optional")
									}), y.cityOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
										value: e.code,
										children: e.name
									}, e.code))]
								})]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "county"], "County") }), /* @__PURE__ */ (0, C.jsxs)("select", {
									disabled: !g.cityCode,
									name: "countyCode",
									onChange: (e) => S("countyCode", e.target.value),
									value: g.countyCode,
									children: [/* @__PURE__ */ (0, C.jsx)("option", {
										value: "",
										children: F(b, ["placeholders", "countyInitial"], "Optional")
									}), y.countyOptions.map((e) => /* @__PURE__ */ (0, C.jsx)("option", {
										value: e.code,
										children: e.name
									}, e.code))]
								})]
							}),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "field field--full",
								children: [
									/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "schoolAddress"], "Address") }),
									/* @__PURE__ */ (0, C.jsx)("input", {
										maxLength: i.institutionCorrectionRules.schoolAddress.maxLength,
										name: "school_address",
										onChange: (e) => S("school_address", e.target.value),
										placeholder: F(b, ["placeholders", "schoolAddress"], "Address"),
										type: "text",
										value: g.school_address
									}),
									/* @__PURE__ */ (0, C.jsx)(Ot, {
										onSelect: (e) => {
											S("school_name", e.name), S("school_address", e.addr), d([]);
										},
										suggestions: u
									}),
									/* @__PURE__ */ (0, C.jsxs)("div", {
										className: "inline-actions",
										children: [/* @__PURE__ */ (0, C.jsx)("button", {
											className: "glass-button glass-button--small",
											onClick: () => p((e) => !e),
											type: "button",
											children: F(b, ["buttons", "openMap"], "Open map")
										}), /* @__PURE__ */ (0, C.jsx)("button", {
											className: "glass-button glass-button--small",
											onClick: async () => {
												try {
													let e = await new Promise((e, t) => {
														if (!navigator.geolocation) {
															t(/* @__PURE__ */ Error("unsupported"));
															return;
														}
														navigator.geolocation.getCurrentPosition(e, t, {
															enableHighAccuracy: !0,
															maximumAge: 3e4,
															timeout: 15e3
														});
													});
													w(e.coords.latitude, e.coords.longitude);
												} catch (e) {
													h(F(b, ["location", "failed"], e.message || "Location unavailable"));
												}
											},
											type: "button",
											children: F(b, ["buttons", "getCurrentLocation"], "Use current location")
										})]
									}),
									m ? /* @__PURE__ */ (0, C.jsx)("p", {
										className: "field-note",
										children: m
									}) : null,
									/* @__PURE__ */ (0, C.jsx)(kt, {
										onPick: x,
										visible: f
									})
								]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "contactInformation"], "Contact") }), /* @__PURE__ */ (0, C.jsx)("input", {
									maxLength: i.institutionCorrectionRules.contactInformation.maxLength,
									name: "contact_information",
									onChange: (e) => S("contact_information", e.target.value),
									placeholder: F(b, ["placeholders", "contactInformation"], "Contact"),
									type: "text",
									value: g.contact_information
								})]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "headmasterName"], "Headmaster") }), /* @__PURE__ */ (0, C.jsx)("input", {
									maxLength: i.institutionCorrectionRules.headmasterName.maxLength,
									name: "headmaster_name",
									onChange: (e) => S("headmaster_name", e.target.value),
									placeholder: F(b, ["placeholders", "headmasterName"], "Headmaster"),
									type: "text",
									value: g.headmaster_name
								})]
							}),
							/* @__PURE__ */ (0, C.jsxs)("label", {
								className: "field field--full",
								children: [/* @__PURE__ */ (0, C.jsx)("span", { children: F(b, ["fields", "correctionContent"], "Correction") }), /* @__PURE__ */ (0, C.jsx)("textarea", {
									maxLength: i.institutionCorrectionRules.correctionContent.maxLength,
									name: "correction_content",
									onChange: (e) => S("correction_content", e.target.value),
									placeholder: F(b, ["placeholders", "correctionContent"], "Correction content"),
									rows: "6",
									value: g.correction_content
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, C.jsx)("button", {
						className: "glass-submit",
						disabled: o,
						type: "submit",
						children: o ? F(b, ["buttons", "submitting"], "Submitting...") : F(b, ["buttons", "submit"], "Submit")
					})
				]
			})
		})]
	});
}
function Pt({ bootstrap: e }) {
	let { i18n: t, pageProps: n } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, ["index", "tagline"], ""),
				eyebrow: "About",
				title: F(t, ["about", "title"], "About")
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "glass-panel prose-grid",
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "glass-copy",
					children: [
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["about", "ownership"], "") }),
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["about", "origin"], "") }),
						/* @__PURE__ */ (0, C.jsx)("p", { children: F(t, ["about", "thanks"], "") })
					]
				})
			}),
			/* @__PURE__ */ (0, C.jsx)("section", {
				className: "friends-grid-react",
				children: n.friends.map((e) => /* @__PURE__ */ (0, C.jsx)("article", {
					className: "friend-card-react",
					children: /* @__PURE__ */ (0, C.jsxs)("a", {
						href: e.url,
						rel: "noreferrer",
						target: "_blank",
						children: [
							/* @__PURE__ */ (0, C.jsx)("div", {
								className: "friend-card-react__avatar-wrap",
								style: { "--friend-accent": e.color },
								children: /* @__PURE__ */ (0, C.jsx)("img", {
									alt: e.name,
									src: e.avatar
								})
							}),
							/* @__PURE__ */ (0, C.jsx)("h3", { children: e.name }),
							e.desc ? /* @__PURE__ */ (0, C.jsx)("p", { children: e.desc }) : null,
							e.signature ? /* @__PURE__ */ (0, C.jsx)("small", { children: e.signature }) : null
						]
					})
				}, e.url))
			})
		]
	});
}
function Ft({ item: e }) {
	return /* @__PURE__ */ (0, C.jsxs)("article", {
		className: `glass-card debug-card-react${e.wide ? " is-wide" : ""}`,
		children: [
			/* @__PURE__ */ (0, C.jsx)("p", {
				className: "glass-card__badge",
				children: e.label
			}),
			e.badgeTone ? /* @__PURE__ */ (0, C.jsx)("span", {
				className: `debug-badge-react debug-badge-react--${e.badgeTone}`,
				children: e.value
			}) : /* @__PURE__ */ (0, C.jsx)("code", {
				className: `debug-value-react${e.multiline ? " is-multiline" : ""}`,
				children: e.value
			}),
			e.hint ? /* @__PURE__ */ (0, C.jsx)("p", { children: e.hint }) : null
		]
	});
}
function It({ bootstrap: e }) {
	let { i18n: t, lang: n, pageProps: r } = e, i = Array.isArray(r.debugSections) ? r.debugSections : [], a = Array.isArray(r.debugTools) ? r.debugTools : [];
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, ["debug", "intro"], ""),
				eyebrow: "Debug / Liquid Glass",
				title: F(t, ["debug", "title"], "Debug"),
				children: /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "hero-actions",
					children: [/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button glass-button--primary",
						href: I("/", n),
						children: F(t, ["navigation", "home"], "Home")
					}), /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I("/map", n),
						children: F(t, ["map", "title"], "Map")
					})]
				})
			}),
			i.map((e) => /* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsx)("div", {
					className: "section-heading",
					children: /* @__PURE__ */ (0, C.jsx)("h2", { children: e.title })
				}), /* @__PURE__ */ (0, C.jsx)("div", {
					className: "debug-grid-react",
					children: (Array.isArray(e.items) ? e.items : []).map((t) => /* @__PURE__ */ (0, C.jsx)(Ft, { item: t }, `${e.title}-${t.label}`))
				})]
			}, e.title)),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsx)("div", {
					className: "section-heading",
					children: /* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, [
						"debug",
						"sections",
						"tools"
					], "Debug tools") })
				}), /* @__PURE__ */ (0, C.jsx)("div", {
					className: "debug-tool-grid",
					children: a.map((e) => /* @__PURE__ */ (0, C.jsxs)("article", {
						className: "glass-card debug-tool-card",
						children: [
							/* @__PURE__ */ (0, C.jsx)("span", {
								className: "glass-card__badge",
								children: e.label
							}),
							/* @__PURE__ */ (0, C.jsx)("a", {
								className: "glass-button glass-button--small",
								href: I(e.href, n),
								children: e.label
							}),
							/* @__PURE__ */ (0, C.jsx)("code", {
								className: "debug-value-react is-multiline",
								children: e.href
							})
						]
					}, e.href))
				})]
			})
		]
	});
}
function Lt({ bootstrap: e }) {
	let { i18n: t } = e, n = t.privacy || {};
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: n.intro,
				eyebrow: F(t, ["navigation", "privacy"], "Privacy"),
				title: n.title || F(t, ["navigation", "privacy"], "Privacy")
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "showcase-grid",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("article", {
						className: "glass-card",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: n.sections && n.sections.summary }), /* @__PURE__ */ (0, C.jsx)("p", { children: n.summary })]
					}),
					/* @__PURE__ */ (0, C.jsxs)("article", {
						className: "glass-card",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: n.sections && n.sections.formSubmission }), /* @__PURE__ */ (0, C.jsx)("p", { children: n.formLead })]
					}),
					/* @__PURE__ */ (0, C.jsxs)("article", {
						className: "glass-card",
						children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: n.sections && n.sections.contact }), /* @__PURE__ */ (0, C.jsx)("p", { children: n.contactBody })]
					})
				]
			}),
			[
				["summary", n.overviewItems],
				["formSubmission", n.formItems],
				["thirdParty", n.thirdPartyItems],
				["retention", n.retentionItems],
				["security", n.securityItems],
				["manage", n.manageItems]
			].map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [/* @__PURE__ */ (0, C.jsx)("div", {
					className: "section-heading",
					children: /* @__PURE__ */ (0, C.jsx)("h2", { children: n.sections && n.sections[e] })
				}), /* @__PURE__ */ (0, C.jsx)("div", {
					className: "bullet-list",
					children: (Array.isArray(t) ? t : []).map((e) => /* @__PURE__ */ (0, C.jsx)("p", { children: e }, e))
				})]
			}, e))
		]
	});
}
function Rt({ columns: e, rows: t }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "table-shell",
		children: /* @__PURE__ */ (0, C.jsxs)("table", {
			className: "glass-table",
			children: [/* @__PURE__ */ (0, C.jsx)("thead", { children: /* @__PURE__ */ (0, C.jsx)("tr", { children: e.map((e) => /* @__PURE__ */ (0, C.jsx)("th", { children: e.label }, e.key)) }) }), /* @__PURE__ */ (0, C.jsx)("tbody", { children: t.map((t, n) => /* @__PURE__ */ (0, C.jsx)("tr", { children: e.map((e) => /* @__PURE__ */ (0, C.jsx)("td", { children: t[e.key] }, e.key)) }, `row-${n}`)) })]
		})
	});
}
function zt({ diagnostics: e, i18n: t }) {
	return !e || !e.attemptedTargets ? null : /* @__PURE__ */ (0, C.jsxs)("article", {
		className: "glass-card diagnostics-card",
		children: [
			/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["submitStatus", "title"], "Submission status") }),
			/* @__PURE__ */ (0, C.jsxs)("p", { children: [
				/* @__PURE__ */ (0, C.jsx)("strong", { children: F(t, ["submitStatus", "mode"], "Mode") }),
				" ",
				e.attemptedTargets.map((e) => e.label).join(" / ")
			] }),
			/* @__PURE__ */ (0, C.jsxs)("p", { children: [
				/* @__PURE__ */ (0, C.jsx)("strong", { children: F(t, ["submitStatus", "successfulTargets"], "Successful") }),
				" ",
				e.successfulTargets.length > 0 ? e.successfulTargets.map((e) => e.label).join(" / ") : F(t, ["submitStatus", "none"], "None")
			] }),
			/* @__PURE__ */ (0, C.jsxs)("p", { children: [
				/* @__PURE__ */ (0, C.jsx)("strong", { children: F(t, ["submitStatus", "failedTargets"], "Failed") }),
				" ",
				e.failedTargets.length > 0 ? e.failedTargets.map((e) => e.label).join(" / ") : F(t, ["submitStatus", "none"], "None")
			] }),
			e.failedTargets.length > 0 ? /* @__PURE__ */ (0, C.jsx)("div", {
				className: "bullet-list",
				children: e.failedTargets.map((e) => /* @__PURE__ */ (0, C.jsxs)("p", { children: [
					/* @__PURE__ */ (0, C.jsx)("strong", { children: e.label }),
					" ",
					F(t, ["submitStatus", "error"], "Error: "),
					e.error
				] }, e.id))
			}) : null
		]
	});
}
function Bt({ bootstrap: e }) {
	let { i18n: t, pageProps: n, lang: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, ["submitSuccess", "message"], ""),
			eyebrow: "Submission",
			title: F(t, ["submitSuccess", "title"], "Submitted"),
			children: /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "hero-actions",
				children: [/* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button glass-button--primary",
					href: I("/", r),
					children: F(t, ["submitSuccess", "backHome"], "Back home")
				}), /* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button",
					href: "https://github.com/HosinoEJ/No-Torsion",
					children: F(t, ["submitSuccess", "petition"], "Project")
				})]
			})
		}), /* @__PURE__ */ (0, C.jsx)(zt, {
			diagnostics: n.submissionDiagnostics,
			i18n: t
		})]
	});
}
function Vt({ bootstrap: e }) {
	let { i18n: t, pageProps: n, lang: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, ["submitPreview", "intro"], ""),
			eyebrow: "Submission Preview",
			title: F(t, ["submitPreview", "title"], "Preview")
		}), /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "glass-panel",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("p", { children: [
					/* @__PURE__ */ (0, C.jsx)("strong", { children: F(t, ["submitPreview", "targetUrl"], "Target URL") }),
					" ",
					/* @__PURE__ */ (0, C.jsx)("code", { children: n.googleFormUrl })
				] }),
				/* @__PURE__ */ (0, C.jsx)(Rt, {
					columns: [
						{
							key: "entryId",
							label: F(t, [
								"submitPreview",
								"columns",
								"entry"
							], "Entry")
						},
						{
							key: "label",
							label: F(t, [
								"submitPreview",
								"columns",
								"field"
							], "Field")
						},
						{
							key: "value",
							label: F(t, [
								"submitPreview",
								"columns",
								"value"
							], "Value")
						}
					],
					rows: n.fields || []
				}),
				/* @__PURE__ */ (0, C.jsx)("h2", { children: F(t, ["submitPreview", "payload"], "Payload") }),
				/* @__PURE__ */ (0, C.jsx)("pre", {
					className: "code-block",
					children: n.encodedPayload
				}),
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "panel-actions",
					children: /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I(n.backFormUrl || "/form", r),
						children: F(t, ["submitPreview", "backForm"], "Back")
					})
				})
			]
		})]
	});
}
function Ht({ bootstrap: e }) {
	let { i18n: t, pageProps: n, lang: r } = e, [i, a] = (0, _.useState)(!1);
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, ["submitConfirm", "intro"], ""),
			eyebrow: "Submission Confirm",
			title: F(t, ["submitConfirm", "title"], "Confirm")
		}), /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "glass-panel",
			children: [/* @__PURE__ */ (0, C.jsx)(Rt, {
				columns: [{
					key: "label",
					label: F(t, [
						"submitConfirm",
						"columns",
						"field"
					], "Field")
				}, {
					key: "value",
					label: F(t, [
						"submitConfirm",
						"columns",
						"value"
					], "Value")
				}],
				rows: n.fields || []
			}), /* @__PURE__ */ (0, C.jsxs)("form", {
				action: n.confirmAction || "/submit/confirm",
				className: "confirm-form",
				method: "POST",
				onSubmit: () => {
					a(!0);
				},
				children: [
					/* @__PURE__ */ (0, C.jsx)("input", {
						name: "confirmation_token",
						type: "hidden",
						value: n.confirmationToken
					}),
					/* @__PURE__ */ (0, C.jsx)("textarea", {
						hidden: !0,
						name: "confirmation_payload",
						readOnly: !0,
						value: n.confirmationPayload
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "panel-actions",
						children: [/* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: I(n.backFormUrl || "/form", r),
							children: F(t, ["submitConfirm", "backForm"], "Back")
						}), /* @__PURE__ */ (0, C.jsx)("button", {
							className: "glass-submit glass-submit--inline",
							type: "submit",
							children: i ? F(t, ["submitConfirm", "confirming"], F(t, ["common", "loading"], "Loading")) : F(t, ["submitConfirm", "confirm"], "Confirm")
						})]
					})
				]
			})]
		})]
	});
}
function Ut({ bootstrap: e }) {
	let { i18n: t, pageProps: n, lang: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, ["submitError", "intro"], ""),
				eyebrow: "Submission Error",
				title: F(t, ["submitError", "title"], "Submission failed")
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [n.errorMessage ? /* @__PURE__ */ (0, C.jsx)("p", { children: n.errorMessage }) : null, n.fallbackUrl ? /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "panel-actions",
					children: [/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button glass-button--primary",
						href: n.fallbackUrl,
						rel: "noreferrer",
						target: "_blank",
						children: F(t, ["submitError", "openFallback"], "Open fallback")
					}), /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I(n.backFormUrl || "/form", r),
						children: F(t, ["submitError", "backForm"], "Back to form")
					})]
				}), /* @__PURE__ */ (0, C.jsx)("pre", {
					className: "code-block",
					children: n.fallbackUrl
				})] }) : /* @__PURE__ */ (0, C.jsx)("div", {
					className: "panel-actions",
					children: /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I(n.backFormUrl || "/form", r),
						children: F(t, ["submitError", "backForm"], "Back to form")
					})
				})]
			}),
			/* @__PURE__ */ (0, C.jsx)(zt, {
				diagnostics: n.submissionDiagnostics,
				i18n: t
			})
		]
	});
}
function Wt({ bootstrap: e }) {
	let { i18n: t, lang: n, pageProps: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, [
				"institutionCorrection",
				"success",
				"message"
			], ""),
			eyebrow: "Correction Success",
			title: F(t, [
				"institutionCorrection",
				"success",
				"title"
			], "Correction received"),
			children: /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "hero-actions",
				children: [/* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button glass-button--primary",
					href: I("/map", n),
					children: F(t, [
						"institutionCorrection",
						"success",
						"backToMap"
					], "Back to map")
				}), /* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button",
					href: I("/", n),
					children: F(t, ["submitSuccess", "backHome"], "Back home")
				})]
			})
		}), /* @__PURE__ */ (0, C.jsx)(zt, {
			diagnostics: r.submissionDiagnostics,
			i18n: t
		})]
	});
}
function Gt({ bootstrap: e }) {
	let { i18n: t, lang: n, pageProps: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [
			/* @__PURE__ */ (0, C.jsx)(B, {
				description: F(t, [
					"institutionCorrection",
					"errorPage",
					"intro"
				], ""),
				eyebrow: "Correction Error",
				title: F(t, [
					"institutionCorrection",
					"errorPage",
					"title"
				], "Correction failed")
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "glass-panel",
				children: [r.errorMessage ? /* @__PURE__ */ (0, C.jsx)("p", { children: r.errorMessage }) : null, r.fallbackUrl ? /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "panel-actions",
					children: [/* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button glass-button--primary",
						href: r.fallbackUrl,
						rel: "noreferrer",
						target: "_blank",
						children: F(t, [
							"institutionCorrection",
							"errorPage",
							"openFallback"
						], "Open fallback")
					}), /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I(r.backFormUrl || "/map/correction", n),
						children: F(t, [
							"institutionCorrection",
							"errorPage",
							"backToForm"
						], "Back to form")
					})]
				}), /* @__PURE__ */ (0, C.jsx)("pre", {
					className: "code-block",
					children: r.fallbackUrl
				})] }) : /* @__PURE__ */ (0, C.jsx)("div", {
					className: "panel-actions",
					children: /* @__PURE__ */ (0, C.jsx)("a", {
						className: "glass-button",
						href: I(r.backFormUrl || "/map/correction", n),
						children: F(t, [
							"institutionCorrection",
							"errorPage",
							"backToForm"
						], "Back to form")
					})
				})]
			}),
			/* @__PURE__ */ (0, C.jsx)(zt, {
				diagnostics: r.submissionDiagnostics,
				i18n: t
			})
		]
	});
}
function Kt({ bootstrap: e }) {
	let { i18n: t, lang: n, pageProps: r } = e;
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: F(t, ["blog", "subtitle"], ""),
			eyebrow: "Blog Article",
			title: r.articleId || F(t, ["blog", "title"], "Article"),
			children: /* @__PURE__ */ (0, C.jsx)("div", {
				className: "panel-actions",
				children: /* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button",
					href: I("/blog", n),
					children: F(t, ["navigation", "allArticles"], "All articles")
				})
			})
		}), /* @__PURE__ */ (0, C.jsx)("section", {
			className: "glass-panel blog-article-shell",
			children: /* @__PURE__ */ (0, C.jsx)("div", { dangerouslySetInnerHTML: { __html: r.articleHtml || "" } })
		})]
	});
}
function qt({ bootstrap: e }) {
	let { apiUrl: t, i18n: n, lang: r, pageProps: i } = e, { error: a, loading: o, payload: s } = _t(t), c = ut(it(s && s.data || []), i.recordSlug);
	if (o) return /* @__PURE__ */ (0, C.jsx)(z, {
		bootstrap: e,
		children: /* @__PURE__ */ (0, C.jsx)(B, {
			eyebrow: "Record",
			title: F(n, ["common", "loading"], "Loading")
		})
	});
	if (a || !c) return /* @__PURE__ */ (0, C.jsx)(z, {
		bootstrap: e,
		children: /* @__PURE__ */ (0, C.jsx)(B, {
			description: a || F(n, [
				"map",
				"record",
				"notFoundBody"
			], "Record not found"),
			eyebrow: "Record",
			title: F(n, [
				"map",
				"record",
				"notFoundTitle"
			], "Record unavailable"),
			children: /* @__PURE__ */ (0, C.jsx)("div", {
				className: "panel-actions",
				children: /* @__PURE__ */ (0, C.jsx)("a", {
					className: "glass-button",
					href: I("/map", r),
					children: F(n, [
						"map",
						"record",
						"backToMap"
					], "Back to map")
				})
			})
		})
	});
	let l = c.group.pages || [], u = c.pageIndex > 0 ? l[c.pageIndex - 1] : null, d = c.pageIndex < l.length - 1 ? l[c.pageIndex + 1] : null, f = rt(s && s.data || []).get(c.group.schoolKey) || {
		selfCount: 0,
		agentCount: 0
	}, p = {
		inputType: i.inputType || "",
		search: i.search || ""
	};
	return /* @__PURE__ */ (0, C.jsxs)(z, {
		bootstrap: e,
		children: [/* @__PURE__ */ (0, C.jsx)(B, {
			description: tt(n, c.record),
			eyebrow: F(n, [
				"map",
				"record",
				"eyebrow"
			], "Record"),
			title: c.record.name || F(n, [
				"map",
				"record",
				"eyebrow"
			], "Record"),
			children: /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "chip-row chip-row--compact",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "inline-tag",
						children: [
							F(n, [
								"map",
								"list",
								"reportCounts",
								"self"
							], "Self"),
							" ",
							f.selfCount
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "inline-tag",
						children: [
							F(n, [
								"map",
								"list",
								"reportCounts",
								"agent"
							], "Agent"),
							" ",
							f.agentCount
						]
					}),
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "inline-tag",
						children: et(n, c.record.inputType)
					})
				]
			})
		}), /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "glass-panel",
			children: [
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "detail-grid",
					children: [
						[F(n, [
							"form",
							"fields",
							"dateStart"
						], "Start date"), c.record.dateStart],
						[F(n, [
							"form",
							"fields",
							"dateEnd"
						], "End date"), c.record.dateEnd],
						[F(n, [
							"form",
							"fields",
							"schoolAddress"
						], "Address"), c.record.addr],
						[F(n, [
							"form",
							"fields",
							"contactInformation"
						], "Contact"), c.record.contact],
						[F(n, [
							"form",
							"fields",
							"headmasterName"
						], "Headmaster"), c.record.HMaster]
					].filter((e) => e[1]).map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("article", {
						className: "detail-card",
						children: [/* @__PURE__ */ (0, C.jsx)("small", { children: e }), /* @__PURE__ */ (0, C.jsx)("p", { children: t })]
					}, e))
				}),
				c.record.experience ? /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "prose-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: F(n, [
						"form",
						"fields",
						"experience"
					], "Experience") }), /* @__PURE__ */ (0, C.jsx)("p", { children: c.record.experience })]
				}) : null,
				c.record.scandal ? /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "prose-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: F(n, [
						"form",
						"fields",
						"scandal"
					], "Scandal") }), /* @__PURE__ */ (0, C.jsx)("p", { children: c.record.scandal })]
				}) : null,
				c.record.else ? /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "prose-panel",
					children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: F(n, [
						"form",
						"fields",
						"other"
					], "Other") }), /* @__PURE__ */ (0, C.jsx)("p", { children: c.record.else })]
				}) : null,
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "panel-actions",
					children: [
						/* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: I(`/map${window.location.search || ""}`, r),
							children: F(n, [
								"map",
								"record",
								"backToMap"
							], "Back to map")
						}),
						u ? /* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: ct(u, {
								lang: r,
								query: p
							}),
							children: F(n, [
								"map",
								"list",
								"pagination",
								"previous"
							], "Previous")
						}) : null,
						d ? /* @__PURE__ */ (0, C.jsx)("a", {
							className: "glass-button",
							href: ct(d, {
								lang: r,
								query: p
							}),
							children: F(n, [
								"map",
								"list",
								"pagination",
								"next"
							], "Next")
						}) : null
					]
				})
			]
		})]
	});
}
function Jt({ bootstrap: e }) {
	return /* @__PURE__ */ (0, C.jsx)(z, {
		bootstrap: e,
		children: /* @__PURE__ */ (0, C.jsx)(B, {
			description: "This page type is not configured in the React frontend.",
			eyebrow: "Frontend",
			title: "Page unavailable"
		})
	});
}
function H({ bootstrap: e }) {
	let t = {
		...e,
		apiUrl: e.apiUrl || "/api/map-data",
		currentPath: e.currentPath || window.location.pathname,
		i18n: e.i18n || {},
		lang: e.lang || "zh-CN",
		languageOptions: Array.isArray(e.languageOptions) ? e.languageOptions : [],
		pageProps: e.pageProps || {}
	};
	return {
		about: /* @__PURE__ */ (0, C.jsx)(Pt, { bootstrap: t }),
		article: /* @__PURE__ */ (0, C.jsx)(Kt, { bootstrap: t }),
		correction: /* @__PURE__ */ (0, C.jsx)(Nt, { bootstrap: t }),
		"correction-error": /* @__PURE__ */ (0, C.jsx)(Gt, { bootstrap: t }),
		"correction-success": /* @__PURE__ */ (0, C.jsx)(Wt, { bootstrap: t }),
		debug: /* @__PURE__ */ (0, C.jsx)(It, { bootstrap: t }),
		home: /* @__PURE__ */ (0, C.jsx)(Ct, { bootstrap: t }),
		portal: /* @__PURE__ */ (0, C.jsx)(Mt, { bootstrap: t }),
		privacy: /* @__PURE__ */ (0, C.jsx)(Lt, { bootstrap: t }),
		record: /* @__PURE__ */ (0, C.jsx)(qt, { bootstrap: t }),
		"submit-confirm": /* @__PURE__ */ (0, C.jsx)(Ht, { bootstrap: t }),
		"submit-error": /* @__PURE__ */ (0, C.jsx)(Ut, { bootstrap: t }),
		"submit-preview": /* @__PURE__ */ (0, C.jsx)(Vt, { bootstrap: t }),
		"submit-success": /* @__PURE__ */ (0, C.jsx)(Bt, { bootstrap: t })
	}[t.pageType] || /* @__PURE__ */ (0, C.jsx)(Jt, { bootstrap: t });
}
//#endregion
//#region frontend/src/main.jsx
var Yt = document.getElementById("root");
Yt && v.createRoot(Yt).render(/* @__PURE__ */ (0, C.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, C.jsx)(H, { bootstrap: window.__NCT_BOOTSTRAP__ || {} }) }));
//#endregion
