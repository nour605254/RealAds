import React, { useContext, useState, useEffect } from 'react';
import UpdateProfile from '../components/pages/UpdateProfile';
import { auth } from "../firebase"
import firebase from "firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
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

    function deleteUser() {
        return currentUser.delete()

    }
    function updatePhone(phone) {
        // 'recaptcha-container' is the ID of an element in the DOM.
        var applicationVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container');
        var provider = new firebase.auth.PhoneAuthProvider();
        provider.verifyPhoneNumber(phone, applicationVerifier)
            .then(function (verificationId) {
                var verificationCode = window.prompt('Please enter the verification ' +
                    'code that was sent to your mobile device.');
                firebase.auth.PhoneAuthProvider.credential(verificationId,
                    verificationCode);
            })
            .then(function (phoneCredential) {
                console.log(currentUser)
                return currentUser.updatePhoneNumber(phoneCredential);
            });
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
        updatePhone,
        deleteUser
    }
        return (

            <AuthContext.Provider value={value}>
            {!loading && children}
            </AuthContext.Provider>
        );
}