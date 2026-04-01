import { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

// ==========================================
// 1. PREMADE DEFAULT DATA (The "Seed" Database)
// ==========================================
const DEFAULT_IMAGES = [
  { id: 1, title: 'Neon Workstation', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1920&q=80', category: 'Hero', status: 'Active', tag: 'Premium' },
  { id: 2, title: 'Minimalist Desk', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80', category: 'Hero', status: 'Active', tag: 'Workspace' },
  { id: 3, title: 'Mechanical Keyboard', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', category: 'Gallery', status: 'Active', tag: 'Gear' },
  { id: 4, title: 'Dual Monitor Setup', url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80', category: 'Gallery', status: 'Active', tag: 'Productivity' },
  { id: 5, title: 'RGB PC Build', url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80', category: 'Gallery', status: 'Active', tag: 'Gaming' },
  { id: 6, title: 'Studio Audio', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80', category: 'Gallery', status: 'Active', tag: 'Audio' }
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Quantum Pro Laptop', price: '$1,299', tag: 'New', image: '💻', status: 'Active' },
  { id: 2, name: 'Sonic Noise-Canceling Pods', price: '$249', tag: 'Sale', image: '🎧', status: 'Active' },
  { id: 3, name: 'MechKey RGB Keyboard', price: '$129', tag: 'Hot', image: '⌨️', status: 'Active' },
];

const DEFAULT_SETTINGS = {
  promoActive: true,
  promoText: 'Special Offer! Get 20% off all RGB accessories this weekend.',
  newsletterTitle: 'Join the Insider Club',
  newsletterSubtitle: 'Get early access to tech drops and exclusive discounts.',
};

export function SiteProvider({ children }) {
  // ==========================================
  // 2. STATE INITIALIZATION (Checks LocalStorage first)
  // ==========================================
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('byteforge_images');
    return saved ? JSON.parse(saved) : DEFAULT_IMAGES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('byteforge_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('byteforge_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // ==========================================
  // 3. AUTO-SAVE TO LOCALSTORAGE ON CHANGE
  // ==========================================
  useEffect(() => {
    localStorage.setItem('byteforge_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('byteforge_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('byteforge_settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SiteContext.Provider value={{ 
      images, setImages, 
      products, setProducts, 
      settings, setSettings 
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteContext);