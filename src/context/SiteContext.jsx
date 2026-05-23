import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore'; // Added getDoc
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase'; 

const SiteContext = createContext();

const DEFAULT_SETTINGS = {
  // ... your existing default settings
};

export function SiteProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [usersList, setUsersList] = useState([]); // NEW: Store all users
  const [isAdmin, setIsAdmin] = useState(false);  // NEW: Track admin status
  const [settings, setSettings] = useState(DEFAULT_SETTINGS); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // --- FIRESTORE USER SYNC ---
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // No duplicate records: Only create if they don't exist
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || 'New User',
            role: 'user', // Default role for new signups
            photoURL: user.photoURL || '',
            createdAt: new Date().toISOString()
          });
          setIsAdmin(false);
        } else {
          // Check if the database says they are an admin
          setIsAdmin(userSnap.data().role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
      
      setCurrentUser(user);
      setLoading(false); 
    });

    const unsubscribeImages = onSnapshot(collection(db, 'images'), (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // NEW: Listen to the users collection
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsersList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeImages();
      unsubscribeProducts();
      unsubscribeUsers();
    };
  }, []);

  // ... your existing saveImageToDb function

  return (
    <SiteContext.Provider value={{ 
      currentUser,
      images, 
      products, 
      usersList, // Export new state
      isAdmin,   // Export new state
      settings,
      loading
    }}>
      {!loading && children}
    </SiteContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteContext);