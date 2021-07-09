import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebase } from "./firebaseClient";

const AuthContext = createContext<{
  user: firebase.User | null;
  uid: string | null;
}>({
  user: null,
  uid: null,
});

export function AuthProvider({ children, initialUid }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [uid, setUid] = useState(initialUid);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setUid(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {
          path: "/",
        });
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      setUid(user.uid);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {
        path: "/",
      });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
