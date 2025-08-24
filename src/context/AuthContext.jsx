import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () =>  useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [firstName, setFirstName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (user) => {
        setIsLoggedIn(true);
        setFirstName(user.firstname);
    }

    const logout = () => {
        setIsLoggedIn(false);
        setFirstName('');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, firstName, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}
