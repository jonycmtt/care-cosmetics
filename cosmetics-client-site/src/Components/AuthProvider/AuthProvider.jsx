import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase.config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateProfileInfo = (name,photoUrl) => {
        setLoading(true)
        return updateProfile(name,photoUrl);
      }

    const loginUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth,provider)
    }
    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,currentUser => {      
            // console.log('use the current user ' , currentUser)     
             setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        updateProfileInfo,
        logOutUser,loginUser,googleLogin,
        setLoading
    }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
