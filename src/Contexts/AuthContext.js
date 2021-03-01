import React, { useContext, useState, useEffect } from 'react';
import UpdateProfile from '../components/pages/UpdateProfile';
import { auth } from "../firebase"
import { firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, pass, username, userlastName, numTel, role) {
        return auth.createUserWithEmailAndPassword(email, pass).then((resp) => {
            return firestore.collection('Users').doc(resp.user.uid).set({
                prenom: username,
                nom: userlastName,
                numtel: numTel,
                role: role,
                email: email,
            })
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }
    return (

        <
        AuthContext.Provider value = { value } > {!loading && children } < /AuthContext.Provider>
    );
}