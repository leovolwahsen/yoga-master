import React, { createContext, ReactNode, useEffect, useState } from "react";
import { app } from "../../config/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

interface AuthContextValue {
    user: User | null;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (name: string, photo: string) => Promise<void>;
    googleLogin: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextValue = {
    user: null,
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    updateUser: async () => {},
    googleLogin: async () => {},
};

const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue);

interface AuthenticationProviderProps {
    children: ReactNode;
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const auth = getAuth(app);

    // Sign up a new user
    const signup = async (email: string, password: string): Promise<void> => {
        try {
            setLoader(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Log in user
    const login = async (email: string, password: string): Promise<void> => {
        try {
            setLoader(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Log out user
    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error: any) {
            setError(error.message);
            throw error;
        }
    };

    // Update user profile
    const updateUser = async (name: string, photo: string): Promise<void> => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo,
                });
                setUser(auth.currentUser);
            }
        } catch (error: any) {
            setError(error.message);
            throw error;
        }
    };

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async (): Promise<void> => {
        try {
            setLoader(true);
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // observer for users 
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged((user) => {
    //         setUser(user);

    //         if (user) {
    //             axios.post("/")
    //         } else {

    //         }
    //     })
    // }, [])

    const contextValue: AuthContextValue = {
        user,
        signup,
        login,
        logout,
        updateUser,
        googleLogin
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthenticationProvider;
export { AuthContext };