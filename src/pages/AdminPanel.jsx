import { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteContext';

export default function AdminPanel() {
  const { images, setImages, products, setProducts, settings, setSettings } = useSiteData();
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState('assets'); // 'assets', 'products', 'settings'

  // ==========================================
  // ASSET (IMAGE) CRUD STATE
  // ==========================================
  const [imageForm, setImageForm] = useState({ id: null, title: '', url: '', category: 'Gallery', status: 'Active', tag: '' });
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (isEditingImage) {
      setImages(images.map(img => img.id === imageForm.id ? imageForm : img));
      setIsEditingImage(false);
    } else {
      setImages([...images, { ...imageForm, id: Date.now() }]);
    }
    setImageForm({ id: null, title: '', url: '', category: 'Gallery', status: 'Active', tag: '' });
  };

  // ==========================================
  // PRODUCT CRUD STATE
  // ==========================================
  const [productForm, setProductForm] = useState({ id: null, name: '', price: '', tag: '', image: '', status: 'Active' });
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (isEditingProduct) {
      setProducts(products.map(p => p.id === productForm.id ? productForm : p));
      setIsEditingProduct(false);
    } else {
      setProducts([...products, { ...productForm, id: Date.now() }]);
    }
    setProductForm({ id: null, name: '', price: '', tag: '', image: '', status: 'Active' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-down">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Admin Control Panel</h1>
        
        {/* DASHBOARD NAVIGATION */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {['assets', 'products', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* TAB 1: ASSET MANAGER (IMAGES) */}
      {/* ========================================== */}
      {activeTab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{isEditingImage ? '✏️ Edit Asset' : '🖼️ Add Image'}</h2>
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={imageForm.title} onChange={e => setImageForm({...imageForm, title: e.target.value})} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
              <input type="url" placeholder="Image URL" value={imageForm.url} onChange={e => setImageForm({...imageForm, url: e.target.value})} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
              <div className="grid grid-cols-2 gap-4">
                <select value={imageForm.category} onChange={e => setImageForm({...imageForm, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white">
                  <option value="Hero">Hero</option>
                  <option value="Gallery">Gallery</option>
                </select>
                <select value={imageForm.status} onChange={e => setImageForm({...imageForm, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                {isEditingImage ? 'Update Asset' : 'Add Asset'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map(img => (
              <div key={img.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700 flex flex-col gap-2">
                <img src={img.url} alt={img.title} className="h-32 w-full object-cover rounded-lg" />
                <h3 className="font-bold text-gray-900 dark:text-white">{img.title}</h3>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => {setImageForm(img); setIsEditingImage(true)}} className="flex-1 py-1 bg-yellow-100 text-yellow-800 rounded">Edit</button>
                  <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="flex-1 py-1 bg-red-100 text-red-800 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: PRODUCT MANAGER */}
      {/* ========================================== */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{isEditingProduct ? '✏️ Edit Product' : '📦 Add Product'}</h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <input type="text" placeholder="Product Name" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
              <input type="text" placeholder="Price (e.g. $199)" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
              <input type="text" placeholder="Icon/Emoji (e.g. 🎧)" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Tag (e.g. Sale)" value={productForm.tag} onChange={e => setProductForm({...productForm, tag: e.target.value})} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white" />
                <select value={productForm.status} onChange={e => setProductForm({...productForm, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">
                {isEditingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{p.image}</span>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${p.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>{p.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mt-4">{p.name}</h3>
                <p className="text-gray-500">{p.price}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => {setProductForm(p); setIsEditingProduct(true)}} className="flex-1 py-1 bg-yellow-100 text-yellow-800 rounded">Edit</button>
                  <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="flex-1 py-1 bg-red-100 text-red-800 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: GLOBAL SITE SETTINGS */}
      {/* ========================================== */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">⚙️ Site Settings</h2>
          
          <div className="space-y-6">
            <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900">
              <label className="flex items-center space-x-3 mb-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.promoActive} 
                  onChange={e => setSettings({...settings, promoActive: e.target.checked})}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                />
                <span className="font-bold text-gray-900 dark:text-white">Enable Top Promo Banner</span>
              </label>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Promo Text</label>
              <input 
                type="text" 
                value={settings.promoText} 
                onChange={e => setSettings({...settings, promoText: e.target.value})} 
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white" 
              />
            </div>

            <div className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Newsletter Section</h3>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input 
                type="text" 
                value={settings.newsletterTitle} 
                onChange={e => setSettings({...settings, newsletterTitle: e.target.value})} 
                className="w-full px-4 py-2 mb-4 rounded-lg border dark:bg-gray-800 dark:text-white" 
              />
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Subtitle</label>
              <input 
                type="text" 
                value={settings.newsletterSubtitle} 
                onChange={e => setSettings({...settings, newsletterSubtitle: e.target.value})} 
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}