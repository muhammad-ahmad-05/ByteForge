import { useState } from 'react';
import { useSiteData } from '../context/SiteContext';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { images, products, usersList, currentUser, isAdmin } = useSiteData();
  
  // --- PRODUCT STATE ---
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productTag, setProductTag] = useState('New');
  const [productEmoji, setProductEmoji] = useState('💻');
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // --- IMAGE STATE ---
  const [imageTitle, setImageTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCategory, setImageCategory] = useState('Gallery');
  const [loadingImage, setLoadingImage] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);

  // 🔒 Strict Security Check: Must be logged in AND have the 'admin' role
  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // --- PRODUCT FUNCTIONS ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoadingProduct(true);
    const productData = { name: productName, price: productPrice, tag: productTag, image: productEmoji, status: 'Active' };
    try {
      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }
      resetProductForm();
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product.");
    } finally {
      setLoadingProduct(false);
    }
  };

  const startEditProduct = (product) => {
    setProductName(product.name); setProductPrice(product.price); setProductTag(product.tag); setProductEmoji(product.image); setEditingProductId(product.id);
  };

  const resetProductForm = () => {
    setProductName(''); setProductPrice(''); setProductTag('New'); setProductEmoji('💻'); setEditingProductId(null);
  };

  // --- IMAGE FUNCTIONS ---
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoadingImage(true);
    const imageData = { title: imageTitle, url: imageUrl, category: imageCategory, status: 'Active' };
    try {
      if (editingImageId) {
        await updateDoc(doc(db, 'images', editingImageId), imageData);
      } else {
        await addDoc(collection(db, 'images'), imageData);
      }
      resetImageForm();
    } catch (error) {
      console.error("Error saving image: ", error);
      alert("Failed to save image.");
    } finally {
      setLoadingImage(false);
    }
  };

  const startEditImage = (image) => {
    setImageTitle(image.title); setImageUrl(image.url); setImageCategory(image.category); setEditingImageId(image.id);
  };

  const resetImageForm = () => {
    setImageTitle(''); setImageUrl(''); setImageCategory('Gallery'); setEditingImageId(null);
  };

  // --- USER ROLE FUNCTION ---
  const handleRoleChange = async (userId, newRole) => {
    if (window.confirm(`Are you sure you want to make this user an ${newRole}?`)) {
      try {
        await updateDoc(doc(db, 'users', userId), { role: newRole });
      } catch (error) {
        console.error("Error updating user role:", error);
        alert("Failed to update role.");
      }
    }
  };

  // --- UNIVERSAL DELETE FUNCTION ---
  const handleDelete = async (collectionName, id) => {
    if (window.confirm(`Are you sure you want to delete this ${collectionName.slice(0, -1)}?`)) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        if (collectionName === 'products' && editingProductId === id) resetProductForm();
        if (collectionName === 'images' && editingImageId === id) resetImageForm();
      } catch (error) {
        console.error(`Error deleting ${collectionName}: `, error);
        alert("Failed to delete item.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 mb-20">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage platform data and user permissions</p>
        </div>
        <div className="text-sm font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-green-200 dark:border-green-800">
          <span>👑</span> Admin: {currentUser.email}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* --- PRODUCTS MANAGEMENT --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
            <span>📦</span> {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleProductSubmit} className="space-y-4 mb-8">
            <div className="flex gap-4">
              <input type="text" placeholder="Emoji (e.g. 🎧)" required maxLength="5" className="w-20 px-4 py-2 text-center text-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={productEmoji} onChange={(e) => setProductEmoji(e.target.value)} />
              <input type="text" placeholder="Product Name" required className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Price (e.g. $1,299)" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={productTag} onChange={(e) => setProductTag(e.target.value)}>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Hot">Hot</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loadingProduct} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-sm">
                {loadingProduct ? 'Saving...' : (editingProductId ? 'Update Product' : 'Save Product')}
              </button>
              {editingProductId && (
                <button type="button" onClick={resetProductForm} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-xl transition-colors">Cancel</button>
              )}
            </div>
          </form>

          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">Active Products</h3>
          <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {products.map(product => (
              <li key={product.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{product.image}</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">{product.name}</span>
                    <span className="text-xs font-medium text-gray-500">{product.price} • {product.tag}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEditProduct(product)} className="text-blue-600 hover:text-blue-800 text-sm font-bold bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg transition-colors">Edit</button>
                  <button onClick={() => handleDelete('products', product.id)} className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-lg transition-colors">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --- IMAGES MANAGEMENT --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
            <span>🖼️</span> {editingImageId ? 'Edit Image URL' : 'Add Image URL'}
          </h2>
          <form onSubmit={handleImageSubmit} className="space-y-4 mb-8">
            <input type="text" placeholder="Image Title" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} />
            <input type="url" placeholder="https://unsplash.com/..." required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white" value={imageCategory} onChange={(e) => setImageCategory(e.target.value)}>
              <option value="Hero">Hero Banner</option>
              <option value="Gallery">Gallery Item</option>
            </select>
            <div className="flex gap-3">
              <button type="submit" disabled={loadingImage} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-sm">
                {loadingImage ? 'Saving...' : (editingImageId ? 'Update Image' : 'Save Image')}
              </button>
              {editingImageId && (
                <button type="button" onClick={resetImageForm} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-xl transition-colors">Cancel</button>
              )}
            </div>
          </form>

          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">Active Images</h3>
          <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {images.map(image => (
              <li key={image.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden pr-4">
                  <img src={image.url} alt={image.title} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                  <div className="truncate">
                    <span className="font-bold text-gray-900 dark:text-white block truncate">{image.title}</span>
                    <span className="text-xs font-medium text-gray-500">{image.category}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEditImage(image)} className="text-blue-600 hover:text-blue-800 text-sm font-bold bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg transition-colors">Edit</button>
                  <button onClick={() => handleDelete('images', image.id)} className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-lg transition-colors">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --- USERS MANAGEMENT (FULL WIDTH SPAN) --- */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 xl:col-span-2">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <span>👥</span> User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider">User / Email</th>
                  <th className="py-3 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider">Joined Date</th>
                  <th className="py-3 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider">Role</th>
                  <th className="py-3 px-4 font-bold text-gray-400 uppercase text-xs tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">{user.displayName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <select 
                        value={user.role || 'user'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.email === currentUser.email} // Prevent demoting yourself
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 dark:text-white disabled:opacity-50 font-medium"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => handleDelete('users', user.id)}
                        disabled={user.email === currentUser.email} // Prevent deleting yourself
                        className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Delete Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}