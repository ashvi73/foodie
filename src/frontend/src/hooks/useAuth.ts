import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";

export function useAuth() {
  const {
    identity,
    loginStatus,
    login: iiLogin,
    clear,
    isInitializing,
  } = useInternetIdentity();

  const isAuthenticated =
    loginStatus === "success" && identity !== null && identity !== undefined;
  const isLoading = loginStatus === "logging-in" || isInitializing;

  const principal = identity?.getPrincipal().toText() ?? null;

  const login = useCallback(() => {
    iiLogin();
  }, [iiLogin]);

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  return {
    isAuthenticated,
    isLoading,
    identity,
    principal,
    login,
    logout,
    loginStatus,
  };
}
