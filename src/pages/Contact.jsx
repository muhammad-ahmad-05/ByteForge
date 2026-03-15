import { useState } from 'react';

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Validation Logic
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.message || formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Formspree Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        // TODO: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree endpoint string
        const response = await fetch('https://formspree.io/f/mvzwbdob', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' }); // Clear form
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being typed in
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-12 animate-fade-in-down max-w-6xl mx-auto">
      
      {/* 1. HEADER COMPONENT */}
      <div className="text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Touch</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Need help with your ByteForge gear? Have a business inquiry? Drop us a line and our support team will get back to you in a flash.
        </p>
      </div>

      {/* 2. CONTACT INFO CARDS COMPONENT (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Email Us', info: 'support@byteforge.com', icon: '✉️' },
          { title: 'Call Us', info: '+1 (555) 123-4567', icon: '📞' },
          { title: 'Visit Us', info: '123 Tech Lane, Silicon Valley', icon: '🏢' },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-3">{card.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{card.title}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{card.info}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* 3. CONTACT FORM COMPONENT (Formspree + Validation) */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg border border-green-200 dark:border-green-800">
              ✅ Thanks for reaching out! We'll be in touch soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800">
              ❌ Oops! Something went wrong submitting the form. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none`}
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right Column: Map & Socials */}
        <div className="flex flex-col gap-8">
          {/* 4. LOCATION / MAP COMPONENT */}
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden h-64 md:h-80 relative shadow-inner border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            {/* Placeholder for an actual iframe map */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">ByteForge HQ</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Interactive Map Integration Placeholder</p>
            </div>
          </div>

          {/* 5. SOCIAL MEDIA COMPONENT */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect With Our Community</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Follow us for the latest gear drops and tech news.</p>
            <div className="flex justify-center gap-4">
              {['Twitter', 'Discord', 'Instagram', 'YouTube'].map((social) => (
                <button key={social} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors font-medium">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}