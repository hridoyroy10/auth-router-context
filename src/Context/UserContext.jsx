import { useState } from "react";
import { createContext } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from './../components/firebase/firebase.config';
import { useEffect } from "react";
export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    const googleSingIn = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const singIn =( email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
            console.log('auth state changed', currentUser);
        })
        return()=>{
            unsubscribe();
        }
    })

    const logOut = () =>{
        return signOut(auth);
    }

    const authInfo = {user, loading, createUser, singIn, logOut, googleSingIn};

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;