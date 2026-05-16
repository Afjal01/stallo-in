var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { g as useQuery, h as useActor, i as createActor } from "./useAuth-Bhs8pioH.js";
import { p as Subscribable, s as shallowEqualObjects, q as hashKey, v as getDefaultState, w as notifyManager, x as useQueryClient, r as reactExports, y as noop, z as shouldThrowError } from "./index-DIzWvAoP.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useBackendActor() {
  return useActor(createActor);
}
function useVendors(filter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vendors", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVendors(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
function useVendor(vendorId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return null;
      return actor.getVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId
  });
}
function useVendorPackages(vendorId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["packages", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.listPackagesByVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId
  });
}
function useVendorReviews(vendorId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["reviews", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.getReviewsByVendor(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId
  });
}
function useUnavailableDates(vendorId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["unavailableDates", vendorId],
    queryFn: async () => {
      if (!actor || !vendorId) return [];
      return actor.getUnavailableDates(vendorId);
    },
    enabled: !!actor && !isFetching && !!vendorId
  });
}
function useBookings(filter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["bookings", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookings(filter);
    },
    enabled: !!actor && !isFetching
  });
}
function useBooking(bookingId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return null;
      return actor.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId
  });
}
function useBookingsByDateRange(from, to) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["bookingsByDateRange", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByDateRange(from, to);
    },
    enabled: !!actor && !isFetching
  });
}
function useRevenueByDateRange(from, to) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["revenueByDateRange", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueByDateRange(from, to);
    },
    enabled: !!actor && !isFetching
  });
}
function useAnalyticsSummary() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["analyticsSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAnalyticsSummary();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1e3
  });
}
function usePlatformConfig() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["platformConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlatformConfig();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function useCreateBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createBooking(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}
function useUpdateBookingStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: (_, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    }
  });
}
function useCancelBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.cancelBooking(bookingId);
    },
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    }
  });
}
function useCreateVendorProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createVendorProfile(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    }
  });
}
function useUpdateVendorProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vendorId, req }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVendorProfile(vendorId, req);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", vendorId] });
    }
  });
}
function useApproveVendor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vendorId, commissionRate }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approveVendor(vendorId, commissionRate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    }
  });
}
function useRejectVendor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vendorId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectVendor(vendorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    }
  });
}
function useToggleFeatured() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vendorId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.toggleFeatured(vendorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    }
  });
}
function useCreatePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vendorId, pkg }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPackage(vendorId, pkg);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["packages", vendorId] });
    }
  });
}
function useDeletePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (packageId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePackage(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    }
  });
}
function useUpdatePackage() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ packageId, pkg }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePackage(packageId, pkg);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({ queryKey: ["packages", vendorId] });
    }
  });
}
function useMarkUnavailableDate() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vendorId, date }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markUnavailableDate(vendorId, date);
    },
    onSuccess: (_, { vendorId }) => {
      queryClient.invalidateQueries({
        queryKey: ["unavailableDates", vendorId]
      });
    }
  });
}
function useCreateReview() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, rating, comment }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createReview(bookingId, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    }
  });
}
function useUpdatePlatformConfig() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePlatformConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platformConfig"] });
    }
  });
}
function useCreateCheckoutSession() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({ items, successUrl, cancelUrl }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    }
  });
}
export {
  useVendor as a,
  useVendorPackages as b,
  useVendorReviews as c,
  useCreateBooking as d,
  useCreateCheckoutSession as e,
  useCreateVendorProfile as f,
  useBookings as g,
  useBooking as h,
  useCancelBooking as i,
  useCreateReview as j,
  useUpdateBookingStatus as k,
  useCreatePackage as l,
  useUpdatePackage as m,
  useDeletePackage as n,
  useUpdateVendorProfile as o,
  useUnavailableDates as p,
  useMarkUnavailableDate as q,
  useAnalyticsSummary as r,
  useApproveVendor as s,
  useToggleFeatured as t,
  useVendors as u,
  useRejectVendor as v,
  useBookingsByDateRange as w,
  useRevenueByDateRange as x,
  usePlatformConfig as y,
  useUpdatePlatformConfig as z
};
