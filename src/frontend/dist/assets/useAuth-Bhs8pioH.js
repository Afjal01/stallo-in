var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, D as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, F as Certificate, G as lookupResultToBuffer, H as RequestStatusResponseStatus, U as UnknownError, I as RequestStatusDoneNoReplyErrorCode, J as RejectError, K as CertifiedRejectErrorCode, N as UNREACHABLE_ERROR, O as InputError, Q as InvalidReadStateRequestErrorCode, V as ReadRequestType, W as Principal, X as IDL, Y as MissingCanisterIdErrorCode, Z as HttpAgent, _ as encode, $ as QueryResponseStatus, a0 as UncertifiedRejectErrorCode, a1 as isV3ResponseBody, a2 as isV2ResponseBody, a3 as UncertifiedRejectUpdateErrorCode, a4 as UnexpectedErrorCode, a5 as decode, p as Subscribable, a6 as pendingThenable, a7 as resolveEnabled, s as shallowEqualObjects, a8 as resolveStaleTime, y as noop, a9 as environmentManager, aa as isValidTimeout, ab as timeUntilStale, ac as timeoutManager, ad as focusManager, ae as fetchState, af as replaceData, w as notifyManager, r as reactExports, z as shouldThrowError, x as useQueryClient, ag as useInternetIdentity, ah as createActorWithConfig, j as jsxRuntimeExports, B as React, l as clsx, d as cn, ai as Record, aj as Opt, ak as Variant, al as Vec, am as Service, an as Func, ao as Text, ap as Int, aq as Nat8, ar as Bool, as as Principal$1, at as Null, au as Nat, av as Float64 } from "./index-DIzWvAoP.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const ChefHat = createLucideIcon("chef-hat", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a2, _b;
  let getter = (_a2 = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a2.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const VendorId = Text;
const UserRole$1 = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const BookingId = Text;
const PaymentStatus$1 = Variant({
  "pending": Null,
  "paid": Null,
  "refunded": Null,
  "partiallyPaid": Null,
  "failed": Null
});
const Timestamp = Int;
const BookingStatus$1 = Variant({
  "preparing": Null,
  "cancelled": Null,
  "pending": Null,
  "completed": Null,
  "dispatched": Null,
  "confirmed": Null
});
const UserId = Principal$1;
const PackageId = Text;
const Booking = Record({
  "id": BookingId,
  "paymentStatus": PaymentStatus$1,
  "guestCount": Nat,
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "bookingStatus": BookingStatus$1,
  "cancellationFeePercent": Nat,
  "advanceAmount": Nat,
  "vendorId": VendorId,
  "notes": Opt(Text),
  "eventVenue": Text,
  "customerId": UserId,
  "stripePaymentIntentId": Opt(Text),
  "totalPrice": Nat,
  "packageId": PackageId,
  "eventDate": Timestamp
});
const CreateBookingRequest = Record({
  "guestCount": Nat,
  "vendorId": VendorId,
  "notes": Opt(Text),
  "eventVenue": Text,
  "packageId": PackageId,
  "eventDate": Timestamp
});
const ShoppingItem = Record({
  "productName": Text,
  "currency": Text,
  "quantity": Nat,
  "priceInCents": Nat,
  "productDescription": Text
});
const StallPackage = Record({
  "id": PackageId,
  "name": Text,
  "travelCharge": Nat,
  "isActive": Bool,
  "inclusions": Vec(Text),
  "setupCharge": Nat,
  "vendorId": VendorId,
  "price": Nat,
  "guestMax": Nat,
  "guestMin": Nat
});
const ReviewId = Text;
const Review = Record({
  "id": ReviewId,
  "bookingId": BookingId,
  "createdAt": Timestamp,
  "comment": Text,
  "vendorId": VendorId,
  "customerId": UserId,
  "rating": Nat
});
const ExternalBlob = Vec(Nat8);
const CreateVendorRequest = Record({
  "serviceArea": Text,
  "ownerName": Text,
  "businessName": Text,
  "description": Text,
  "email": Text,
  "category": Text,
  "phone": Text,
  "photos": Vec(ExternalBlob)
});
const VendorStatus$1 = Variant({
  "pending": Null,
  "approved": Null,
  "rejected": Null,
  "suspended": Null
});
const Vendor = Record({
  "id": VendorId,
  "serviceArea": Text,
  "ownerName": Text,
  "ownerId": UserId,
  "createdAt": Timestamp,
  "businessName": Text,
  "description": Text,
  "email": Text,
  "isFeatured": Bool,
  "category": Text,
  "commissionRate": Float64,
  "rating": Float64,
  "phone": Text,
  "reviewCount": Nat,
  "verificationStatus": VendorStatus$1,
  "photos": Vec(ExternalBlob)
});
const AnalyticsSummary = Record({
  "commissionRevenue": Nat,
  "cancelledBookings": Nat,
  "totalBookings": Nat,
  "completedBookings": Nat,
  "totalRevenue": Nat,
  "totalCustomers": Nat,
  "totalVendors": Nat,
  "activeVendors": Nat
});
const DateRangeResult = Record({
  "revenue": Nat,
  "date": Timestamp,
  "count": Nat
});
const CancellationPolicy = Record({
  "tier1Days": Nat,
  "tier1FeePercent": Nat,
  "tier3FeePercent": Nat,
  "tier2FeePercent": Nat,
  "tier2Days": Nat
});
const PlatformConfig = Record({
  "advancePaymentPercent": Nat,
  "cancellationPolicy": CancellationPolicy,
  "globalCommissionPercent": Float64
});
const StripeSessionStatus = Variant({
  "completed": Record({
    "userPrincipal": Opt(Text),
    "response": Text
  }),
  "failed": Record({ "error": Text })
});
const ApprovalStatus = Variant({
  "pending": Null,
  "approved": Null,
  "rejected": Null
});
const UserApprovalInfo = Record({
  "status": ApprovalStatus,
  "principal": Principal$1
});
const BookingFilter = Record({
  "status": Opt(BookingStatus$1),
  "toDate": Opt(Timestamp),
  "vendorId": Opt(VendorId),
  "fromDate": Opt(Timestamp),
  "customerId": Opt(UserId)
});
const VendorFilter = Record({
  "serviceArea": Opt(Text),
  "status": Opt(VendorStatus$1),
  "featured": Opt(Bool),
  "category": Opt(Text)
});
const StripeConfiguration = Record({
  "allowedCountries": Vec(Text),
  "secretKey": Text
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const UpdateVendorRequest = Record({
  "serviceArea": Opt(Text),
  "ownerName": Opt(Text),
  "businessName": Opt(Text),
  "description": Opt(Text),
  "email": Opt(Text),
  "category": Opt(Text),
  "phone": Opt(Text),
  "photos": Opt(Vec(ExternalBlob))
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "approveVendor": Func([VendorId, Float64], [], []),
  "assignCallerUserRole": Func([Principal$1, UserRole$1], [], []),
  "calculateCancellationFee": Func([BookingId], [Nat], ["query"]),
  "cancelBooking": Func([BookingId], [Booking], []),
  "confirmPayment": Func([BookingId, Text], [Booking], []),
  "createBooking": Func([CreateBookingRequest], [Booking], []),
  "createCheckoutSession": Func(
    [Vec(ShoppingItem), Text, Text],
    [Text],
    []
  ),
  "createPackage": Func(
    [
      VendorId,
      Record({
        "name": Text,
        "travelCharge": Nat,
        "inclusions": Vec(Text),
        "setupCharge": Nat,
        "price": Nat,
        "guestMax": Nat,
        "guestMin": Nat
      })
    ],
    [StallPackage],
    []
  ),
  "createReview": Func([BookingId, Nat, Text], [Review], []),
  "createVendorProfile": Func([CreateVendorRequest], [Vendor], []),
  "deletePackage": Func([PackageId], [], []),
  "getAnalyticsSummary": Func([], [AnalyticsSummary], ["query"]),
  "getBooking": Func([BookingId], [Opt(Booking)], ["query"]),
  "getBookingsByDateRange": Func(
    [Timestamp, Timestamp],
    [Vec(DateRangeResult)],
    ["query"]
  ),
  "getCallerUserRole": Func([], [UserRole$1], ["query"]),
  "getPackage": Func([PackageId], [Opt(StallPackage)], ["query"]),
  "getPlatformConfig": Func([], [PlatformConfig], ["query"]),
  "getRevenueByDateRange": Func(
    [Timestamp, Timestamp],
    [Vec(DateRangeResult)],
    ["query"]
  ),
  "getReviewsByVendor": Func([VendorId], [Vec(Review)], ["query"]),
  "getStripeSessionStatus": Func([Text], [StripeSessionStatus], []),
  "getUnavailableDates": Func([VendorId], [Vec(Timestamp)], ["query"]),
  "getVendor": Func([VendorId], [Opt(Vendor)], ["query"]),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "isCallerApproved": Func([], [Bool], ["query"]),
  "isStripeConfigured": Func([], [Bool], ["query"]),
  "listApprovals": Func([], [Vec(UserApprovalInfo)], ["query"]),
  "listBookings": Func([BookingFilter], [Vec(Booking)], ["query"]),
  "listPackagesByVendor": Func(
    [VendorId],
    [Vec(StallPackage)],
    ["query"]
  ),
  "listVendors": Func([VendorFilter], [Vec(Vendor)], ["query"]),
  "markUnavailableDate": Func([VendorId, Timestamp], [], []),
  "processRefund": Func([BookingId], [], []),
  "rejectVendor": Func([VendorId], [], []),
  "requestApproval": Func([], [], []),
  "sendBookingConfirmationEmail": Func(
    [BookingId, Text, Text],
    [],
    []
  ),
  "sendCancellationEmail": Func(
    [BookingId, Text, Text, Nat],
    [],
    []
  ),
  "sendNewBookingNotificationToVendor": Func(
    [Text, Text, BookingId],
    [],
    []
  ),
  "sendPaymentConfirmationEmail": Func(
    [BookingId, Text, Text, Nat],
    [],
    []
  ),
  "sendVendorApprovalEmail": Func([Text, Text, Bool], [], []),
  "setApproval": Func([Principal$1, ApprovalStatus], [], []),
  "setStripeConfiguration": Func([StripeConfiguration], [], []),
  "toggleFeatured": Func([VendorId], [], []),
  "transform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "updateBookingStatus": Func([BookingId, BookingStatus$1], [Booking], []),
  "updatePackage": Func(
    [
      PackageId,
      Record({
        "name": Opt(Text),
        "travelCharge": Opt(Nat),
        "isActive": Opt(Bool),
        "inclusions": Opt(Vec(Text)),
        "setupCharge": Opt(Nat),
        "price": Opt(Nat),
        "guestMax": Opt(Nat),
        "guestMin": Opt(Nat)
      })
    ],
    [StallPackage],
    []
  ),
  "updatePlatformConfig": Func([PlatformConfig], [], []),
  "updateVendorProfile": Func(
    [VendorId, UpdateVendorRequest],
    [Vendor],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const VendorId2 = IDL2.Text;
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const BookingId2 = IDL2.Text;
  const PaymentStatus2 = IDL2.Variant({
    "pending": IDL2.Null,
    "paid": IDL2.Null,
    "refunded": IDL2.Null,
    "partiallyPaid": IDL2.Null,
    "failed": IDL2.Null
  });
  const Timestamp2 = IDL2.Int;
  const BookingStatus2 = IDL2.Variant({
    "preparing": IDL2.Null,
    "cancelled": IDL2.Null,
    "pending": IDL2.Null,
    "completed": IDL2.Null,
    "dispatched": IDL2.Null,
    "confirmed": IDL2.Null
  });
  const UserId2 = IDL2.Principal;
  const PackageId2 = IDL2.Text;
  const Booking2 = IDL2.Record({
    "id": BookingId2,
    "paymentStatus": PaymentStatus2,
    "guestCount": IDL2.Nat,
    "createdAt": Timestamp2,
    "updatedAt": Timestamp2,
    "bookingStatus": BookingStatus2,
    "cancellationFeePercent": IDL2.Nat,
    "advanceAmount": IDL2.Nat,
    "vendorId": VendorId2,
    "notes": IDL2.Opt(IDL2.Text),
    "eventVenue": IDL2.Text,
    "customerId": UserId2,
    "stripePaymentIntentId": IDL2.Opt(IDL2.Text),
    "totalPrice": IDL2.Nat,
    "packageId": PackageId2,
    "eventDate": Timestamp2
  });
  const CreateBookingRequest2 = IDL2.Record({
    "guestCount": IDL2.Nat,
    "vendorId": VendorId2,
    "notes": IDL2.Opt(IDL2.Text),
    "eventVenue": IDL2.Text,
    "packageId": PackageId2,
    "eventDate": Timestamp2
  });
  const ShoppingItem2 = IDL2.Record({
    "productName": IDL2.Text,
    "currency": IDL2.Text,
    "quantity": IDL2.Nat,
    "priceInCents": IDL2.Nat,
    "productDescription": IDL2.Text
  });
  const StallPackage2 = IDL2.Record({
    "id": PackageId2,
    "name": IDL2.Text,
    "travelCharge": IDL2.Nat,
    "isActive": IDL2.Bool,
    "inclusions": IDL2.Vec(IDL2.Text),
    "setupCharge": IDL2.Nat,
    "vendorId": VendorId2,
    "price": IDL2.Nat,
    "guestMax": IDL2.Nat,
    "guestMin": IDL2.Nat
  });
  const ReviewId2 = IDL2.Text;
  const Review2 = IDL2.Record({
    "id": ReviewId2,
    "bookingId": BookingId2,
    "createdAt": Timestamp2,
    "comment": IDL2.Text,
    "vendorId": VendorId2,
    "customerId": UserId2,
    "rating": IDL2.Nat
  });
  const ExternalBlob2 = IDL2.Vec(IDL2.Nat8);
  const CreateVendorRequest2 = IDL2.Record({
    "serviceArea": IDL2.Text,
    "ownerName": IDL2.Text,
    "businessName": IDL2.Text,
    "description": IDL2.Text,
    "email": IDL2.Text,
    "category": IDL2.Text,
    "phone": IDL2.Text,
    "photos": IDL2.Vec(ExternalBlob2)
  });
  const VendorStatus2 = IDL2.Variant({
    "pending": IDL2.Null,
    "approved": IDL2.Null,
    "rejected": IDL2.Null,
    "suspended": IDL2.Null
  });
  const Vendor2 = IDL2.Record({
    "id": VendorId2,
    "serviceArea": IDL2.Text,
    "ownerName": IDL2.Text,
    "ownerId": UserId2,
    "createdAt": Timestamp2,
    "businessName": IDL2.Text,
    "description": IDL2.Text,
    "email": IDL2.Text,
    "isFeatured": IDL2.Bool,
    "category": IDL2.Text,
    "commissionRate": IDL2.Float64,
    "rating": IDL2.Float64,
    "phone": IDL2.Text,
    "reviewCount": IDL2.Nat,
    "verificationStatus": VendorStatus2,
    "photos": IDL2.Vec(ExternalBlob2)
  });
  const AnalyticsSummary2 = IDL2.Record({
    "commissionRevenue": IDL2.Nat,
    "cancelledBookings": IDL2.Nat,
    "totalBookings": IDL2.Nat,
    "completedBookings": IDL2.Nat,
    "totalRevenue": IDL2.Nat,
    "totalCustomers": IDL2.Nat,
    "totalVendors": IDL2.Nat,
    "activeVendors": IDL2.Nat
  });
  const DateRangeResult2 = IDL2.Record({
    "revenue": IDL2.Nat,
    "date": Timestamp2,
    "count": IDL2.Nat
  });
  const CancellationPolicy2 = IDL2.Record({
    "tier1Days": IDL2.Nat,
    "tier1FeePercent": IDL2.Nat,
    "tier3FeePercent": IDL2.Nat,
    "tier2FeePercent": IDL2.Nat,
    "tier2Days": IDL2.Nat
  });
  const PlatformConfig2 = IDL2.Record({
    "advancePaymentPercent": IDL2.Nat,
    "cancellationPolicy": CancellationPolicy2,
    "globalCommissionPercent": IDL2.Float64
  });
  const StripeSessionStatus2 = IDL2.Variant({
    "completed": IDL2.Record({
      "userPrincipal": IDL2.Opt(IDL2.Text),
      "response": IDL2.Text
    }),
    "failed": IDL2.Record({ "error": IDL2.Text })
  });
  const ApprovalStatus2 = IDL2.Variant({
    "pending": IDL2.Null,
    "approved": IDL2.Null,
    "rejected": IDL2.Null
  });
  const UserApprovalInfo2 = IDL2.Record({
    "status": ApprovalStatus2,
    "principal": IDL2.Principal
  });
  const BookingFilter2 = IDL2.Record({
    "status": IDL2.Opt(BookingStatus2),
    "toDate": IDL2.Opt(Timestamp2),
    "vendorId": IDL2.Opt(VendorId2),
    "fromDate": IDL2.Opt(Timestamp2),
    "customerId": IDL2.Opt(UserId2)
  });
  const VendorFilter2 = IDL2.Record({
    "serviceArea": IDL2.Opt(IDL2.Text),
    "status": IDL2.Opt(VendorStatus2),
    "featured": IDL2.Opt(IDL2.Bool),
    "category": IDL2.Opt(IDL2.Text)
  });
  const StripeConfiguration2 = IDL2.Record({
    "allowedCountries": IDL2.Vec(IDL2.Text),
    "secretKey": IDL2.Text
  });
  const http_header2 = IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text });
  const http_request_result2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const TransformationInput2 = IDL2.Record({
    "context": IDL2.Vec(IDL2.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL2.Record({
    "status": IDL2.Nat,
    "body": IDL2.Vec(IDL2.Nat8),
    "headers": IDL2.Vec(http_header2)
  });
  const UpdateVendorRequest2 = IDL2.Record({
    "serviceArea": IDL2.Opt(IDL2.Text),
    "ownerName": IDL2.Opt(IDL2.Text),
    "businessName": IDL2.Opt(IDL2.Text),
    "description": IDL2.Opt(IDL2.Text),
    "email": IDL2.Opt(IDL2.Text),
    "category": IDL2.Opt(IDL2.Text),
    "phone": IDL2.Opt(IDL2.Text),
    "photos": IDL2.Opt(IDL2.Vec(ExternalBlob2))
  });
  return IDL2.Service({
    "_immutableObjectStorageBlobsAreLive": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [IDL2.Vec(IDL2.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControl": IDL2.Func([], [], []),
    "approveVendor": IDL2.Func([VendorId2, IDL2.Float64], [], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "calculateCancellationFee": IDL2.Func([BookingId2], [IDL2.Nat], ["query"]),
    "cancelBooking": IDL2.Func([BookingId2], [Booking2], []),
    "confirmPayment": IDL2.Func([BookingId2, IDL2.Text], [Booking2], []),
    "createBooking": IDL2.Func([CreateBookingRequest2], [Booking2], []),
    "createCheckoutSession": IDL2.Func(
      [IDL2.Vec(ShoppingItem2), IDL2.Text, IDL2.Text],
      [IDL2.Text],
      []
    ),
    "createPackage": IDL2.Func(
      [
        VendorId2,
        IDL2.Record({
          "name": IDL2.Text,
          "travelCharge": IDL2.Nat,
          "inclusions": IDL2.Vec(IDL2.Text),
          "setupCharge": IDL2.Nat,
          "price": IDL2.Nat,
          "guestMax": IDL2.Nat,
          "guestMin": IDL2.Nat
        })
      ],
      [StallPackage2],
      []
    ),
    "createReview": IDL2.Func([BookingId2, IDL2.Nat, IDL2.Text], [Review2], []),
    "createVendorProfile": IDL2.Func([CreateVendorRequest2], [Vendor2], []),
    "deletePackage": IDL2.Func([PackageId2], [], []),
    "getAnalyticsSummary": IDL2.Func([], [AnalyticsSummary2], ["query"]),
    "getBooking": IDL2.Func([BookingId2], [IDL2.Opt(Booking2)], ["query"]),
    "getBookingsByDateRange": IDL2.Func(
      [Timestamp2, Timestamp2],
      [IDL2.Vec(DateRangeResult2)],
      ["query"]
    ),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getPackage": IDL2.Func([PackageId2], [IDL2.Opt(StallPackage2)], ["query"]),
    "getPlatformConfig": IDL2.Func([], [PlatformConfig2], ["query"]),
    "getRevenueByDateRange": IDL2.Func(
      [Timestamp2, Timestamp2],
      [IDL2.Vec(DateRangeResult2)],
      ["query"]
    ),
    "getReviewsByVendor": IDL2.Func([VendorId2], [IDL2.Vec(Review2)], ["query"]),
    "getStripeSessionStatus": IDL2.Func([IDL2.Text], [StripeSessionStatus2], []),
    "getUnavailableDates": IDL2.Func(
      [VendorId2],
      [IDL2.Vec(Timestamp2)],
      ["query"]
    ),
    "getVendor": IDL2.Func([VendorId2], [IDL2.Opt(Vendor2)], ["query"]),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isCallerApproved": IDL2.Func([], [IDL2.Bool], ["query"]),
    "isStripeConfigured": IDL2.Func([], [IDL2.Bool], ["query"]),
    "listApprovals": IDL2.Func([], [IDL2.Vec(UserApprovalInfo2)], ["query"]),
    "listBookings": IDL2.Func([BookingFilter2], [IDL2.Vec(Booking2)], ["query"]),
    "listPackagesByVendor": IDL2.Func(
      [VendorId2],
      [IDL2.Vec(StallPackage2)],
      ["query"]
    ),
    "listVendors": IDL2.Func([VendorFilter2], [IDL2.Vec(Vendor2)], ["query"]),
    "markUnavailableDate": IDL2.Func([VendorId2, Timestamp2], [], []),
    "processRefund": IDL2.Func([BookingId2], [], []),
    "rejectVendor": IDL2.Func([VendorId2], [], []),
    "requestApproval": IDL2.Func([], [], []),
    "sendBookingConfirmationEmail": IDL2.Func(
      [BookingId2, IDL2.Text, IDL2.Text],
      [],
      []
    ),
    "sendCancellationEmail": IDL2.Func(
      [BookingId2, IDL2.Text, IDL2.Text, IDL2.Nat],
      [],
      []
    ),
    "sendNewBookingNotificationToVendor": IDL2.Func(
      [IDL2.Text, IDL2.Text, BookingId2],
      [],
      []
    ),
    "sendPaymentConfirmationEmail": IDL2.Func(
      [BookingId2, IDL2.Text, IDL2.Text, IDL2.Nat],
      [],
      []
    ),
    "sendVendorApprovalEmail": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Bool],
      [],
      []
    ),
    "setApproval": IDL2.Func([IDL2.Principal, ApprovalStatus2], [], []),
    "setStripeConfiguration": IDL2.Func([StripeConfiguration2], [], []),
    "toggleFeatured": IDL2.Func([VendorId2], [], []),
    "transform": IDL2.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "updateBookingStatus": IDL2.Func([BookingId2, BookingStatus2], [Booking2], []),
    "updatePackage": IDL2.Func(
      [
        PackageId2,
        IDL2.Record({
          "name": IDL2.Opt(IDL2.Text),
          "travelCharge": IDL2.Opt(IDL2.Nat),
          "isActive": IDL2.Opt(IDL2.Bool),
          "inclusions": IDL2.Opt(IDL2.Vec(IDL2.Text)),
          "setupCharge": IDL2.Opt(IDL2.Nat),
          "price": IDL2.Opt(IDL2.Nat),
          "guestMax": IDL2.Opt(IDL2.Nat),
          "guestMin": IDL2.Opt(IDL2.Nat)
        })
      ],
      [StallPackage2],
      []
    ),
    "updatePlatformConfig": IDL2.Func([PlatformConfig2], [], []),
    "updateVendorProfile": IDL2.Func(
      [VendorId2, UpdateVendorRequest2],
      [Vendor2],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var BookingStatus = /* @__PURE__ */ ((BookingStatus2) => {
  BookingStatus2["preparing"] = "preparing";
  BookingStatus2["cancelled"] = "cancelled";
  BookingStatus2["pending"] = "pending";
  BookingStatus2["completed"] = "completed";
  BookingStatus2["dispatched"] = "dispatched";
  BookingStatus2["confirmed"] = "confirmed";
  return BookingStatus2;
})(BookingStatus || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["pending"] = "pending";
  PaymentStatus2["paid"] = "paid";
  PaymentStatus2["refunded"] = "refunded";
  PaymentStatus2["partiallyPaid"] = "partiallyPaid";
  PaymentStatus2["failed"] = "failed";
  return PaymentStatus2;
})(PaymentStatus || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["admin"] = "admin";
  UserRole2["user"] = "user";
  UserRole2["guest"] = "guest";
  return UserRole2;
})(UserRole || {});
var VendorStatus = /* @__PURE__ */ ((VendorStatus2) => {
  VendorStatus2["pending"] = "pending";
  VendorStatus2["approved"] = "approved";
  VendorStatus2["rejected"] = "rejected";
  VendorStatus2["suspended"] = "suspended";
  return VendorStatus2;
})(VendorStatus || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async approveVendor(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.approveVendor(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.approveVendor(arg0, arg1);
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n8(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async calculateCancellationFee(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.calculateCancellationFee(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.calculateCancellationFee(arg0);
      return result;
    }
  }
  async cancelBooking(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.cancelBooking(arg0);
        return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.cancelBooking(arg0);
      return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async confirmPayment(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.confirmPayment(arg0, arg1);
        return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.confirmPayment(arg0, arg1);
      return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async createBooking(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createBooking(to_candid_CreateBookingRequest_n17(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createBooking(to_candid_CreateBookingRequest_n17(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async createCheckoutSession(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
      return result;
    }
  }
  async createPackage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.createPackage(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createPackage(arg0, arg1);
      return result;
    }
  }
  async createReview(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createReview(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createReview(arg0, arg1, arg2);
      return result;
    }
  }
  async createVendorProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createVendorProfile(await to_candid_CreateVendorRequest_n19(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Vendor_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createVendorProfile(await to_candid_CreateVendorRequest_n19(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Vendor_n23(this._uploadFile, this._downloadFile, result);
    }
  }
  async deletePackage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deletePackage(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deletePackage(arg0);
      return result;
    }
  }
  async getAnalyticsSummary() {
    if (this.processError) {
      try {
        const result = await this.actor.getAnalyticsSummary();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnalyticsSummary();
      return result;
    }
  }
  async getBooking(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBooking(arg0);
        return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBooking(arg0);
      return from_candid_opt_n29(this._uploadFile, this._downloadFile, result);
    }
  }
  async getBookingsByDateRange(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getBookingsByDateRange(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBookingsByDateRange(arg0, arg1);
      return result;
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n30(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n30(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPackage(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getPackage(arg0);
        return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPackage(arg0);
      return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPlatformConfig() {
    if (this.processError) {
      try {
        const result = await this.actor.getPlatformConfig();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPlatformConfig();
      return result;
    }
  }
  async getRevenueByDateRange(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getRevenueByDateRange(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRevenueByDateRange(arg0, arg1);
      return result;
    }
  }
  async getReviewsByVendor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getReviewsByVendor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getReviewsByVendor(arg0);
      return result;
    }
  }
  async getStripeSessionStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStripeSessionStatus(arg0);
        return from_candid_StripeSessionStatus_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStripeSessionStatus(arg0);
      return from_candid_StripeSessionStatus_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUnavailableDates(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUnavailableDates(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUnavailableDates(arg0);
      return result;
    }
  }
  async getVendor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getVendor(arg0);
        return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getVendor(arg0);
      return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async isCallerApproved() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerApproved();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerApproved();
      return result;
    }
  }
  async isStripeConfigured() {
    if (this.processError) {
      try {
        const result = await this.actor.isStripeConfigured();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isStripeConfigured();
      return result;
    }
  }
  async listApprovals() {
    if (this.processError) {
      try {
        const result = await this.actor.listApprovals();
        return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listApprovals();
      return from_candid_vec_n37(this._uploadFile, this._downloadFile, result);
    }
  }
  async listBookings(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listBookings(to_candid_BookingFilter_n42(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n46(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listBookings(to_candid_BookingFilter_n42(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n46(this._uploadFile, this._downloadFile, result);
    }
  }
  async listPackagesByVendor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listPackagesByVendor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listPackagesByVendor(arg0);
      return result;
    }
  }
  async listVendors(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listVendors(to_candid_VendorFilter_n47(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listVendors(to_candid_VendorFilter_n47(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n51(this._uploadFile, this._downloadFile, result);
    }
  }
  async markUnavailableDate(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.markUnavailableDate(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.markUnavailableDate(arg0, arg1);
      return result;
    }
  }
  async processRefund(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.processRefund(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.processRefund(arg0);
      return result;
    }
  }
  async rejectVendor(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.rejectVendor(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.rejectVendor(arg0);
      return result;
    }
  }
  async requestApproval() {
    if (this.processError) {
      try {
        const result = await this.actor.requestApproval();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.requestApproval();
      return result;
    }
  }
  async sendBookingConfirmationEmail(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.sendBookingConfirmationEmail(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendBookingConfirmationEmail(arg0, arg1, arg2);
      return result;
    }
  }
  async sendCancellationEmail(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.sendCancellationEmail(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendCancellationEmail(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async sendNewBookingNotificationToVendor(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.sendNewBookingNotificationToVendor(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendNewBookingNotificationToVendor(arg0, arg1, arg2);
      return result;
    }
  }
  async sendPaymentConfirmationEmail(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.sendPaymentConfirmationEmail(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendPaymentConfirmationEmail(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async sendVendorApprovalEmail(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.sendVendorApprovalEmail(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendVendorApprovalEmail(arg0, arg1, arg2);
      return result;
    }
  }
  async setApproval(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setApproval(arg0, to_candid_ApprovalStatus_n52(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setApproval(arg0, to_candid_ApprovalStatus_n52(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async setStripeConfiguration(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setStripeConfiguration(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setStripeConfiguration(arg0);
      return result;
    }
  }
  async toggleFeatured(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleFeatured(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleFeatured(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updateBookingStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateBookingStatus(arg0, to_candid_BookingStatus_n44(this._uploadFile, this._downloadFile, arg1));
        return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateBookingStatus(arg0, to_candid_BookingStatus_n44(this._uploadFile, this._downloadFile, arg1));
      return from_candid_Booking_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async updatePackage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updatePackage(arg0, to_candid_record_n54(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updatePackage(arg0, to_candid_record_n54(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async updatePlatformConfig(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updatePlatformConfig(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updatePlatformConfig(arg0);
      return result;
    }
  }
  async updateVendorProfile(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateVendorProfile(arg0, await to_candid_UpdateVendorRequest_n55(this._uploadFile, this._downloadFile, arg1));
        return from_candid_Vendor_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateVendorProfile(arg0, await to_candid_UpdateVendorRequest_n55(this._uploadFile, this._downloadFile, arg1));
      return from_candid_Vendor_n23(this._uploadFile, this._downloadFile, result);
    }
  }
}
function from_candid_ApprovalStatus_n40(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n41(_uploadFile, _downloadFile, value);
}
function from_candid_BookingStatus_n14(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function from_candid_Booking_n10(_uploadFile, _downloadFile, value) {
  return from_candid_record_n11(_uploadFile, _downloadFile, value);
}
async function from_candid_ExternalBlob_n28(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_PaymentStatus_n12(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n13(_uploadFile, _downloadFile, value);
}
function from_candid_StripeSessionStatus_n33(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n34(_uploadFile, _downloadFile, value);
}
function from_candid_UserApprovalInfo_n38(_uploadFile, _downloadFile, value) {
  return from_candid_record_n39(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n30(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n31(_uploadFile, _downloadFile, value);
}
function from_candid_VendorStatus_n25(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n26(_uploadFile, _downloadFile, value);
}
async function from_candid_Vendor_n23(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n24(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n29(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Booking_n10(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n32(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n36(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Vendor_n23(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    paymentStatus: from_candid_PaymentStatus_n12(_uploadFile, _downloadFile, value.paymentStatus),
    guestCount: value.guestCount,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    bookingStatus: from_candid_BookingStatus_n14(_uploadFile, _downloadFile, value.bookingStatus),
    cancellationFeePercent: value.cancellationFeePercent,
    advanceAmount: value.advanceAmount,
    vendorId: value.vendorId,
    notes: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.notes)),
    eventVenue: value.eventVenue,
    customerId: value.customerId,
    stripePaymentIntentId: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.stripePaymentIntentId)),
    totalPrice: value.totalPrice,
    packageId: value.packageId,
    eventDate: value.eventDate
  };
}
async function from_candid_record_n24(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    serviceArea: value.serviceArea,
    ownerName: value.ownerName,
    ownerId: value.ownerId,
    createdAt: value.createdAt,
    businessName: value.businessName,
    description: value.description,
    email: value.email,
    isFeatured: value.isFeatured,
    category: value.category,
    commissionRate: value.commissionRate,
    rating: value.rating,
    phone: value.phone,
    reviewCount: value.reviewCount,
    verificationStatus: from_candid_VendorStatus_n25(_uploadFile, _downloadFile, value.verificationStatus),
    photos: await from_candid_vec_n27(_uploadFile, _downloadFile, value.photos)
  };
}
function from_candid_record_n35(_uploadFile, _downloadFile, value) {
  return {
    userPrincipal: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.userPrincipal)),
    response: value.response
  };
}
function from_candid_record_n39(_uploadFile, _downloadFile, value) {
  return {
    status: from_candid_ApprovalStatus_n40(_uploadFile, _downloadFile, value.status),
    principal: value.principal
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_variant_n13(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "paid" in value ? "paid" : "refunded" in value ? "refunded" : "partiallyPaid" in value ? "partiallyPaid" : "failed" in value ? "failed" : value;
}
function from_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return "preparing" in value ? "preparing" : "cancelled" in value ? "cancelled" : "pending" in value ? "pending" : "completed" in value ? "completed" : "dispatched" in value ? "dispatched" : "confirmed" in value ? "confirmed" : value;
}
function from_candid_variant_n26(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "approved" in value ? "approved" : "rejected" in value ? "rejected" : "suspended" in value ? "suspended" : value;
}
function from_candid_variant_n31(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n34(_uploadFile, _downloadFile, value) {
  return "completed" in value ? {
    __kind__: "completed",
    completed: from_candid_record_n35(_uploadFile, _downloadFile, value.completed)
  } : "failed" in value ? {
    __kind__: "failed",
    failed: value.failed
  } : value;
}
function from_candid_variant_n41(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "approved" in value ? "approved" : "rejected" in value ? "rejected" : value;
}
async function from_candid_vec_n27(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_ExternalBlob_n28(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n37(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_UserApprovalInfo_n38(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n46(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Booking_n10(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n51(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Vendor_n23(_uploadFile, _downloadFile, x)));
}
function to_candid_ApprovalStatus_n52(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n53(_uploadFile, _downloadFile, value);
}
function to_candid_BookingFilter_n42(_uploadFile, _downloadFile, value) {
  return to_candid_record_n43(_uploadFile, _downloadFile, value);
}
function to_candid_BookingStatus_n44(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n45(_uploadFile, _downloadFile, value);
}
function to_candid_CreateBookingRequest_n17(_uploadFile, _downloadFile, value) {
  return to_candid_record_n18(_uploadFile, _downloadFile, value);
}
async function to_candid_CreateVendorRequest_n19(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n20(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n22(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
async function to_candid_UpdateVendorRequest_n55(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n56(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n8(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function to_candid_VendorFilter_n47(_uploadFile, _downloadFile, value) {
  return to_candid_record_n48(_uploadFile, _downloadFile, value);
}
function to_candid_VendorStatus_n49(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n50(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    guestCount: value.guestCount,
    vendorId: value.vendorId,
    notes: value.notes ? candid_some(value.notes) : candid_none(),
    eventVenue: value.eventVenue,
    packageId: value.packageId,
    eventDate: value.eventDate
  };
}
async function to_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    serviceArea: value.serviceArea,
    ownerName: value.ownerName,
    businessName: value.businessName,
    description: value.description,
    email: value.email,
    category: value.category,
    phone: value.phone,
    photos: await to_candid_vec_n21(_uploadFile, _downloadFile, value.photos)
  };
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
function to_candid_record_n43(_uploadFile, _downloadFile, value) {
  return {
    status: value.status ? candid_some(to_candid_BookingStatus_n44(_uploadFile, _downloadFile, value.status)) : candid_none(),
    toDate: value.toDate ? candid_some(value.toDate) : candid_none(),
    vendorId: value.vendorId ? candid_some(value.vendorId) : candid_none(),
    fromDate: value.fromDate ? candid_some(value.fromDate) : candid_none(),
    customerId: value.customerId ? candid_some(value.customerId) : candid_none()
  };
}
function to_candid_record_n48(_uploadFile, _downloadFile, value) {
  return {
    serviceArea: value.serviceArea ? candid_some(value.serviceArea) : candid_none(),
    status: value.status ? candid_some(to_candid_VendorStatus_n49(_uploadFile, _downloadFile, value.status)) : candid_none(),
    featured: value.featured ? candid_some(value.featured) : candid_none(),
    category: value.category ? candid_some(value.category) : candid_none()
  };
}
function to_candid_record_n54(_uploadFile, _downloadFile, value) {
  return {
    name: value.name ? candid_some(value.name) : candid_none(),
    travelCharge: value.travelCharge ? candid_some(value.travelCharge) : candid_none(),
    isActive: value.isActive ? candid_some(value.isActive) : candid_none(),
    inclusions: value.inclusions ? candid_some(value.inclusions) : candid_none(),
    setupCharge: value.setupCharge ? candid_some(value.setupCharge) : candid_none(),
    price: value.price ? candid_some(value.price) : candid_none(),
    guestMax: value.guestMax ? candid_some(value.guestMax) : candid_none(),
    guestMin: value.guestMin ? candid_some(value.guestMin) : candid_none()
  };
}
async function to_candid_record_n56(_uploadFile, _downloadFile, value) {
  return {
    serviceArea: value.serviceArea ? candid_some(value.serviceArea) : candid_none(),
    ownerName: value.ownerName ? candid_some(value.ownerName) : candid_none(),
    businessName: value.businessName ? candid_some(value.businessName) : candid_none(),
    description: value.description ? candid_some(value.description) : candid_none(),
    email: value.email ? candid_some(value.email) : candid_none(),
    category: value.category ? candid_some(value.category) : candid_none(),
    phone: value.phone ? candid_some(value.phone) : candid_none(),
    photos: value.photos ? candid_some(await to_candid_vec_n21(_uploadFile, _downloadFile, value.photos)) : candid_none()
  };
}
function to_candid_variant_n45(_uploadFile, _downloadFile, value) {
  return value == "preparing" ? {
    preparing: null
  } : value == "cancelled" ? {
    cancelled: null
  } : value == "pending" ? {
    pending: null
  } : value == "completed" ? {
    completed: null
  } : value == "dispatched" ? {
    dispatched: null
  } : value == "confirmed" ? {
    confirmed: null
  } : value;
}
function to_candid_variant_n50(_uploadFile, _downloadFile, value) {
  return value == "pending" ? {
    pending: null
  } : value == "approved" ? {
    approved: null
  } : value == "rejected" ? {
    rejected: null
  } : value == "suspended" ? {
    suspended: null
  } : value;
}
function to_candid_variant_n53(_uploadFile, _downloadFile, value) {
  return value == "pending" ? {
    pending: null
  } : value == "approved" ? {
    approved: null
  } : value == "rejected" ? {
    rejected: null
  } : value;
}
function to_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
async function to_candid_vec_n21(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await to_candid_ExternalBlob_n22(_uploadFile, _downloadFile, x)));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const handleLogin = () => {
    login();
  };
  const handleLogout = () => {
    clear();
    queryClient.clear();
  };
  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principal: (identity == null ? void 0 : identity.getPrincipal()) ?? null,
    login: handleLogin,
    logout: handleLogout
  };
}
function useCallerRole() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 5 * 60 * 1e3,
    retry: false
  });
}
export {
  Button as B,
  ChefHat as C,
  PaymentStatus as P,
  Slot as S,
  UserRole as U,
  VendorStatus as V,
  useCallerRole as a,
  useComposedRefs as b,
  createLucideIcon as c,
  BookingStatus as d,
  buttonVariants as e,
  createSlot as f,
  useQuery as g,
  useActor as h,
  createActor as i,
  cva as j,
  composeRefs as k,
  useAuth as u
};
