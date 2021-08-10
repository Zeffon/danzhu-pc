import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount, getUrlParam } from "../utils";
import { User } from "types/user";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

interface AuthForm {
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  const s = getUrlParam("s");
  const res = await http(`link/valid/${s}`);
  user = res.wx_info;
  let valid = false;
  if (token && res) {
    const data = await http(`token/verify2`, { token });
    valid = data.is_valid;
    user.token = token;
    user.valid = valid;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // point free
  const login = (form: AuthForm) =>
    auth
      .login(form)
      .then((token) => {
        // @ts-ignore
        user.token = token;
        // @ts-ignore
        user.valid = true;
        setUser(user);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider children={children} value={{ user, login, logout }} />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
