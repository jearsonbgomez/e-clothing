import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, upsertUser } from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const value = { user, setUser };

  useEffect(() => {

    const unsubscribe = onAuthStateChangedListener((user) => {

      if(user) {
        upsertUser(user);
      }
      setUser(user)
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}