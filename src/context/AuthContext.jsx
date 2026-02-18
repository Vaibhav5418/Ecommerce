import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = storage.getUser();
        const token = storage.getToken();

        if (storedUser && token && token.expiry) {
            // Check session expiry
            const now = new Date().getTime();
            if (now > token.expiry) {
                logout();
            } else {
                setUser(storedUser);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = storage.getUsers();
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Create session (5 minutes)
            const expiry = new Date().getTime() + 5 * 60 * 1000;
            const token = { expiry };

            storage.setToken(token);
            storage.setUser(foundUser);
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = (name, email, password) => {
        const users = storage.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        storage.setUsers(users);
        return { success: true };
    };

    const logout = () => {
        storage.clearToken();
        storage.clearUser();
        setUser(null);
    };

    const updateUser = (updatedData) => {
        const users = storage.getUsers();
        const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...updatedData } : u);
        storage.setUsers(updatedUsers);

        const updatedUser = { ...user, ...updatedData };
        storage.setUser(updatedUser);
        setUser(updatedUser);
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
