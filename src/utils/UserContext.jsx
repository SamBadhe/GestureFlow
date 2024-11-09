import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Import Firebase auth functions

export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [User, setUser] = useState(null); // User state to store authenticated user

  // Firebase authentication state listener
  useEffect(() => {
    const auth = getAuth();  // Get Firebase authentication instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user object when user is logged in
      } else {
        setUser(null); // Set user to null when logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component is unmounted
  }, []);  // Empty array to run only once on component mount

  return (
    <AuthContext.Provider value={{ User, setUser }}>
      {children} {/* Render children (App component) */}
    </AuthContext.Provider>
  );
}
