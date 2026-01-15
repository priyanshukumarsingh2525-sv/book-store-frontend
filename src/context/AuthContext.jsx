import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { auth } from "../firebase/firebse.config";



const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}
const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({children}) => {

    const[currentUser,setCurrentUser ] = useState(null);
    const [loading,setLoading] = useState(true);

    // register a user 

    const registerUser = async (email,password) => {
      return await createUserWithEmailAndPassword(auth,email, password);
    }

    // const register 
    const loginUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth,email,password);
    }

    const signInWithGoogle = async () =>{
        return await signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    // manager user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user){
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username:displayName , photo: photoURL
                }
            }
        })
        return () => unsubscribe();
    },[])

    const value = {
       currentUser,
       loading,
       registerUser,
       loginUser,
       signInWithGoogle,
       logOut
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}