import { useState } from 'react';

export default function About() {
  
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: 'Where is ByteForge located?', answer: 'We are headquartered in Silicon Valley, with distribution centers globally.' },
    { question: 'Do you design your own hardware?', answer: 'Yes! Our engineering team designs our custom mechanical keyboards and audio gear in-house.' },
    { question: 'What is your sustainability goal?', answer: 'ByteForge is committed to 100% carbon-neutral shipping and recycled packaging by 2028.' },
  ];

  return (
    <div className="flex flex-col gap-16 pb-12 animate-fade-in-down">
      
      
      <div className="text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">ByteForge</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Forging the future of high-performance tech gear for developers, gamers, and creators.
        </p>
      </div>

      
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: 'Happy Customers', value: '50k+' },
          { label: 'Products Forged', value: '120+' },
          { label: 'Countries Served', value: '45' },
          { label: 'Uptime', value: '99.9%' },
        ].map((stat, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </section>

      
      <section className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Journey</h2>
        <div className="space-y-8 border-l-2 border-blue-200 dark:border-blue-900 ml-4 md:ml-0 pl-6 md:pl-8 relative">
          {[
            { year: '2023', title: 'The Spark', desc: 'ByteForge was founded in a small garage by two hardware enthusiasts.' },
            { year: '2024', title: 'First Product Launch', desc: 'Released the critically acclaimed MechKey Pro.' },
            { year: '2026', title: 'Global Expansion', desc: 'Opened our global storefront to serve creators worldwide.' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              
              <div className="absolute -left-[35px] md:-left-[41px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-950"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.year} - {item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet the Forgers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Ada Lovelace', role: 'Chief Engineer', emoji: '👩‍💻' },
            { name: 'Alan Turing', role: 'Lead Designer', emoji: '👨‍🎨' },
            { name: 'Grace Hopper', role: 'Operations', emoji: '👩‍💼' },
          ].map((member, idx) => (
            <div key={idx} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">
                {member.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-100">Industry Recognition</h2>
        <blockquote className="text-xl md:text-2xl font-medium italic mb-6 max-w-4xl mx-auto leading-relaxed">
          "ByteForge isn't just making tech; they are crafting precision instruments for the modern digital artisan. Their attention to detail is unmatched in the industry."
        </blockquote>
        <div className="font-bold">- Tech Hardware Quarterly</div>
      </section>

      
      <section className="max-w-2xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                {faq.question}
                <span className={`transform transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {/* Conditional rendering for Accordion content */}
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === idx ? 'max-h-40 py-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}