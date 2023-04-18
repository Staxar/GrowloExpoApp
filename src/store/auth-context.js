import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token, userid) => {},
  logout: () => {},
  uid: "",
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [uid, setUid] = useState();

  function authenticate(token, userid) {
    setAuthToken(token);
    setUid(userid);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("uid", userid);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("uid");
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    uid: uid,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
