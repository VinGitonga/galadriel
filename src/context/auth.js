import { createContext, useContext } from "react";
import { useAuth as useFirebase } from "../hooks/useAuth";

const AuthUserContext = createContext({
    authUser: null,
    logout: async () => {},
    fetchUser: async () => {}
});

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebase();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);
