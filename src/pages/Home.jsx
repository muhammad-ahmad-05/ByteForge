import { useState } from 'react';
import PromoDeal from '../components/PromoDeal';



export default function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data abhi kay liay
  const products = [
    { id: 1, name: 'Quantum Pro Laptop', price: '$1,299', tag: 'New', image: '💻' },
    { id: 2, name: 'Sonic Noise-Canceling Pods', price: '$249', tag: 'Sale', image: '🎧' },
    { id: 3, name: 'MechKey RGB Keyboard', price: '$129', tag: 'Hot', image: '⌨️' },
  ];

  return (
    <div className="flex flex-col gap-12 pb-10">
      
      
      {showAlert && (
        <div className="relative flex items-center justify-between p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 animate-fade-in-down" role="alert">
          <span className="font-medium">Special Offer!</span> Get 20% off all RGB accessories this weekend.
          <button onClick={() => setShowAlert(false)} className="ml-auto font-bold hover:text-blue-600">X</button>
        </div>
      )}

      

      {/* 2. HERO SECTION COMPONENT */}
      <section className="relative bg-white dark:bg-gray-900 overflow-hidden rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Next-Gen Tech for</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Modern Creators</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Upgrade your setup with our premium selection of laptops, peripherals, and smart accessories. Built for performance, designed for style.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition-all transform hover:scale-105">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 3. MEGA MENU */}
      <div className="flex flex-wrap gap-4 justify-center">
        {['Laptops', 'Audio', 'Keyboards', 'Monitors', 'Components'].map((cat) => (
          <button key={cat} className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors font-medium">
            {cat}
          </button>
        ))}
      </div>

      {/* 4. PRODUCT CARDS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Featured Gear</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              {/* Badge Component */}
              <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold rounded-full shadow-sm">
                {product.tag}
              </span>
              <div className="text-6xl text-center mb-6 group-hover:scale-110 transition-transform duration-300">{product.image}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
              
              {/* 6. POPOVER / TOOLTIP SIMULATION */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                <div className="group/tooltip relative flex items-center cursor-pointer">
                  <span className="text-gray-400 text-sm border border-gray-400 rounded-full w-5 h-5 flex items-center justify-center">i</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max bg-gray-900 text-white text-xs rounded py-1 px-2 shadow-lg">
                    Includes Free Shipping
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Quick View
              </button>
            </div>
          ))}
        </div>
            <div className="animate-fade-in-down">

      <PromoDeal />

    </div>
      </section>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative transform scale-100">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold">&times;</button>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product Quick View</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">This is a fully functional modal using React state. Imagine a high-res tech image and specs here!</p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">Add to Cart</button>
          </div>
        </div>
      )}

      {/* 8. GALLERY COMPONENT (Bento Grid Style) */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Setup Inspiration</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
          <div className="col-span-2 row-span-2 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:opacity-90 transition-opacity cursor-pointer shadow-inner">Gamer Setup</div>
          <div className="bg-blue-200 dark:bg-blue-900 rounded-xl flex items-center justify-center text-blue-800 dark:text-blue-200 hover:opacity-90 transition-opacity cursor-pointer shadow-inner">Minimalist</div>
          <div className="bg-purple-200 dark:bg-purple-900 rounded-xl flex items-center justify-center text-purple-800 dark:text-purple-200 hover:opacity-90 transition-opacity cursor-pointer shadow-inner">Productivity</div>
          <div className="col-span-2 bg-pink-200 dark:bg-pink-900 rounded-xl flex items-center justify-center text-pink-800 dark:text-pink-200 hover:opacity-90 transition-opacity cursor-pointer shadow-inner">Creator Studio</div>
        </div>
      </section>

      {/* 9. REVIEWS / TESTIMONIALS COMPONENT */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 shadow-inner">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What Techies Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <div className="flex text-yellow-400 mb-2">★★★★★</div>
            <p className="text-gray-600 dark:text-gray-400 italic">"The best RGB keyboard I've ever owned. The switches are incredibly responsive."</p>
            <p className="mt-4 font-bold text-gray-900 dark:text-white">- Alex D., Software Engineer</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <div className="flex text-yellow-400 mb-2">★★★★★</div>
            <p className="text-gray-600 dark:text-gray-400 italic">"Fast shipping and the laptop arrived in perfect condition. Will buy again!"</p>
            <p className="mt-4 font-bold text-gray-900 dark:text-white">- Sarah J., Digital Artist</p>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER INPUT COMPONENT */}
      <section className="py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join the Insider Club</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Get early access to tech drops and exclusive discounts.</p>
        <div className="flex w-full max-w-md gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
}