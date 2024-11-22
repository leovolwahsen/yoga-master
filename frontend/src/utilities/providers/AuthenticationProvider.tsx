import React, { createContext, useEffect, useState } from "react";
import { app } from "../../config/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";
import { IAuthenticationProviderProps } from "../../types/interfaces";

interface IAuthContextValue {
    user: User | null;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (name: string, photo: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    error: Error | string | null;
    setError: React.Dispatch<React.SetStateAction<Error | string | null>>;
}

const defaultAuthContextValue: IAuthContextValue = {
    user: null,
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    updateUser: async () => {},
    googleLogin: async () => {},
    error: null,
    setError: () => {}
};

const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

const AuthenticationProvider: React.FC<IAuthenticationProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<Error | string | null>(null);

    const auth = getAuth(app);

    // when catching error this helps to not have to define type error to be any
    const handleError = (err: unknown): Error | string => {
        if (err instanceof Error) {
            return err;
        }
        return "An unknown error occurred.";
    };

    const extractErrorMessage = (err: Error | string | null): string => {
        return err instanceof Error ? err.message : err || "";
    };

    // Sign up a new user
    const signup = async (email: string, password: string): Promise<void> => {
        try {
            setLoader(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (err) {
            const processedError = handleError(err);
            setError(processedError);
            throw new Error(extractErrorMessage(processedError));
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
        } catch (err) {
            const processedError = handleError(err);
            setError(processedError);
            throw new Error(extractErrorMessage(processedError));
        } finally {
            setLoader(false);
        }
    };

    // Log out user
    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            const processedError = handleError(err);
            setError(processedError);
            throw new Error(extractErrorMessage(processedError));
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
        } catch (err) {
            const processedError = handleError(err);
            setError(processedError);
            throw new Error(extractErrorMessage(processedError));
        }
    };

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async (): Promise<void> => {
        try {
            setLoader(true);
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        } catch (err) {
            const processedError = handleError(err);
            setError(processedError);
            throw new Error(extractErrorMessage(processedError));
        } finally {
            setLoader(false);
        }
    };

    // observer for users 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (user) {
                axios.post("http://localhost:5000/set-token", { email: user.email, name: user.displayName })
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setLoader(false)
                    }
                })
            } else {
                localStorage.removeItem('token');
                setLoader(false);
            }
        })
        return () => unsubscribe()
    }, [])

    const contextValue: IAuthContextValue = { user, signup, login, logout, updateUser, googleLogin, error, setError };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthenticationProvider;
export { AuthContext };