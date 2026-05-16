import { createActor } from "@/backend";
import { UserRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
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
    principal: identity?.getPrincipal() ?? null,
    login: handleLogin,
    logout: handleLogout,
  };
}

export function useCallerRole() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useRole() {
  const { data: role } = useCallerRole();
  return role ?? UserRole.guest;
}

export function useIsAdmin() {
  const role = useRole();
  return role === UserRole.admin;
}

export function useIsVendor() {
  const role = useRole();
  // Vendor mode is stored in localStorage during vendor registration flow
  const hasVendorProfile =
    typeof window !== "undefined" &&
    window.localStorage.getItem("stallo_vendor_mode") === "true";
  return role === UserRole.user && hasVendorProfile;
}

export function useIsCustomer() {
  const role = useRole();
  const hasVendorProfile =
    typeof window !== "undefined" &&
    window.localStorage.getItem("stallo_vendor_mode") === "true";
  // Customer = logged-in user without a vendor profile
  return role === UserRole.user && !hasVendorProfile;
}
