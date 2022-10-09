import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { db, auth } from "../firebase";

export function useAuth() {
    const [authUser, setAuthUser] = useState(null);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null);
            return;
        }

        const userRef = doc(db, "users", authState.uid);
        const userSnap = await getDoc(userRef);
        setAuthUser({ id: userSnap.id, ...userSnap.data });
        sessionStorage.setItem(
            "userData",
            JSON.stringify({ id: userSnap.id, ...userSnap.data })
        );
    };

    const fetchUser =async (userId) => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        console.log(userSnap.data())
        setAuthUser({ id: userSnap.id, ...userSnap.data() });
        sessionStorage.setItem(
            "userData",
            JSON.stringify({ id: userSnap.id, ...userSnap.data() })
        );
    }

    const logout = () => {
        signOut(auth).then(() => {
            setAuthUser(null);
            sessionStorage.removeItem("userData");
            document.location.href = '/login'
        });
    };

    useEffect(
        () => onAuthStateChanged(auth, (user) => authStateChanged(user)),
        []
    );

    useEffect(() => {
        if (!authUser && sessionStorage.getItem('userData')){
            setAuthUser(JSON.parse(sessionStorage.getItem('userData')))
        }
    },  [authUser])

    return { authUser, logout, fetchUser };
}
