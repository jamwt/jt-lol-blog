import { createContext, useContext } from "react";

const AdminSecretContext = createContext<string | null>(null);

export const AdminSecretProvider = AdminSecretContext.Provider;

export function useAdminSecret() {
  const secret = useContext(AdminSecretContext);
  if (!secret) {
    throw new Error("useAdminSecret must be used within an AdminSecretProvider");
  }
  return secret;
}
