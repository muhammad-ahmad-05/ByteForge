import { useState, useEffect } from 'react';
import PromoDeal from '../components/PromoDeal';
import { useSiteData } from '../context/SiteContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // 1. Fetch EVERYTHING from the new Global CMS Context
  const { images, products, settings, setSettings } = useSiteData();

  // 2. Filter Active Data
  const heroImages = images.filter(img => img.category === 'Hero' && img.status === 'Active');
  const galleryImages = images.filter(img => img.category === 'Gallery' && img.status === 'Active');
  const activeProducts = products.filter(p => p.status === 'Active');

  // 3. Carousel State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-scroll Carousel
  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* 1. DYNAMIC PROMO BANNER */}
      {settings.promoActive && (
        <div className="relative flex items-center justify-between p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 animate-fade-in-down" role="alert">
          <span className="font-medium">{settings.promoText}</span>
          <button onClick={() => setSettings({...settings, promoActive: false})} className="ml-auto font-bold hover:text-blue-600">X</button>
        </div>
      )}

     {/* 2. DYNAMIC FULL-BLEED CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl shadow-2xl min-h-[500px] md:min-h-[600px] flex items-center group border border-gray-800">
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          {heroImages.length > 0 ? (
            heroImages.map((img, idx) => (
              <img
                key={img.id}
                src={img.url}
                alt={img.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                  idx === currentHeroIndex 
                    ? 'opacity-100 scale-100 z-10' 
                    : 'opacity-0 scale-105 z-0' 
                }`}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-900">
              No Hero Images Available (Add via Admin)
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 sm:via-gray-900/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl pt-10 pb-16 md:py-20 animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              New Collection
            </span>

            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              <span className="block mb-2">Next-Gen Tech for</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-2">
                Modern Creators
              </span>
            </h1>
            
            <p className="mt-4 text-base text-gray-300 sm:mt-6 sm:text-lg md:text-xl drop-shadow-md max-w-xl">
              Upgrade your setup with our premium selection. Professionally curated gear designed to elevate your workflow and aesthetics.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Shop Now
              </button>
              <button className="px-8 py-3.5 border border-gray-400/30 text-base font-bold rounded-xl text-white backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all">
                View Specs
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 flex space-x-3 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`transition-all duration-500 rounded-full ${
                idx === currentHeroIndex 
                  ? 'w-8 h-2.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' 
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC PRODUCT CARDS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Featured Gear</h2>
        {activeProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            No active products. Add some in the Admin Panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {activeProducts.map((product) => (
              <div key={product.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                {product.tag && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold rounded-full shadow-sm">
                    {product.tag}
                  </span>
                )}
                <div className="text-6xl text-center mb-6 group-hover:scale-110 transition-transform duration-300">{product.image}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
                
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
                  onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                  className="mt-6 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Quick View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* RESTORED: PromoDeal Component */}
        <div className="animate-fade-in-down">
          <PromoDeal />
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative transform scale-100">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold">&times;</button>
            <div className="text-6xl text-center mb-4">{selectedProduct.image}</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedProduct.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">This is a fully functional modal using React state. Imagine a high-res tech image and specs here!</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">{selectedProduct.price}</p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">Add to Cart</button>
          </div>
        </div>
      )}

      {/* 4. DYNAMIC GALLERY COMPONENT (Bento Grid Style RESTORED) */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">Setup Inspiration</h2>
        
        {galleryImages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            Add Gallery Images in the Admin Panel to see them here!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {galleryImages.slice(0, 4).map((img, idx) => (
              <div 
                key={img.id} 
                className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img 
                  src={img.url} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={img.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                  {img.tag && <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white uppercase tracking-wider mb-2 block w-max">{img.tag}</span>}
                  <p className={`${idx === 0 ? 'text-2xl' : 'text-lg'} font-bold text-white`}>{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. REVIEWS / TESTIMONIALS COMPONENT (RESTORED) */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 shadow-inner border border-gray-200 dark:border-gray-700">
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

      {/* 6. DYNAMIC NEWSLETTER INPUT COMPONENT */}
      <section className="py-12 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{settings.newsletterTitle}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{settings.newsletterSubtitle}</p>
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