import { useEffect, useState } from 'react';
import { AuthContext } from './contextContainer';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    const createUser = (email , password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signInUser = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser) =>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            return unsubscribe();
        }
    },[])

    const userInfo = {
        user ,
        loading,
        createUser,
        signInUser,
        logOut
    }
    return (
        <AuthContext.Provider value={userInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;