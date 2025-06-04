import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Send, MessageCircle, Star, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Testimonials() {
  const defaultTestimonials = [
    {
      name: 'Sarah K.',
      role: 'Freelance Designer',
      text: 'TALQS saved me hours of legal research. The chatbot answered my contract questions instantly and accurately!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Mark R.',
      role: 'Startup Founder',
      text: 'The NDA generator was a lifesaver during fundraising. Quick, reliable, and professional documents every time.',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const commentBoxRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('testimonials');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
      setTestimonials(defaultTestimonials);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !role.trim() || !text.trim()) {
      setError('All fields are required.');
      return;
    }
    const newReview = { 
      name: name.trim(), 
      role: role.trim(), 
      text: text.trim(),
      rating,
      avatar: `https://ui-avatars.com/api/?name=${name.trim()}&background=random`
    };
    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));
    setName('');
    setRole('');
    setText('');
    setRating(5);
    setTimeout(() => {
      commentBoxRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const shareWebsite = () => {
    const shareData = {
      title: 'TALQS - Legal Assistant',
      text: 'Check out TALQS! It is a legal assistant that helps with contracts, questions, and more.',
      url: window.location.href
    };
    navigator.share?.(shareData).catch(console.error);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 to-black-900 py-20 px-4 flex flex-col items-center bg-black">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <MessageCircle className="w-8 h-8 text-purple-300" /> 
          <span className="bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text text-transparent">
            User Feedback
          </span>
        </h1>

        {/* Featured Testimonial Carousel */}
        <div className="relative mb-16 h-96 w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-lg"
            >
              {testimonials.length > 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <img 
                    src={testimonials[currentSlide].avatar} 
                    alt={testimonials[currentSlide].name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-300 mb-4"
                  />
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${i < testimonials[currentSlide].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xl italic text-purple-100 mb-6">
                    "{testimonials[currentSlide].text}"
                  </p>
                  <div>
                    <p className="font-medium text-white">{testimonials[currentSlide].name}</p>
                    <p className="text-sm text-purple-200">{testimonials[currentSlide].role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {testimonials.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-700/80 hover:bg-purple-600 p-2 rounded-full shadow-lg z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-700/80 hover:bg-purple-600 p-2 rounded-full shadow-lg z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Feedback Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 p-6 rounded-2xl border border-purple-500/20 shadow-xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-300" /> Share Your Experience
            </h2>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mb-4 p-2 bg-red-900/30 rounded-md"
              >
                {error}
              </motion.p>
            )}
            
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm text-purple-200 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-950/70 text-white rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-purple-200 mb-1">Role</label>
                  <input
                    type="text"
                    placeholder="Your profession"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-purple-950/70 text-white rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-purple-200 mb-1">Rating</label>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 transition ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-purple-200 mb-1">Your Feedback</label>
                <textarea
                  rows={4}
                  placeholder="Share your experience with TALQS..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 bg-purple-950/70 text-white rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
              >
                <Send className="w-5 h-5" /> Submit Feedback
              </button>
            </div>
          </motion.form>

          {/* Testimonials List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-[500px] overflow-hidden"
          >
            <div 
              ref={commentBoxRef}
              className="h-full overflow-y-auto pr-3 custom-scrollbar space-y-4"
            >
              <AnimatePresence>
                {testimonials.map((t, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-5 rounded-xl border border-purple-700/30 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-purple-500"
                      />
                      <div>
                        <p className="font-medium text-white">{t.name}</p>
                        <p className="text-xs text-purple-300">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-purple-100">"{t.text}"</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={shareWebsite}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-800/50 hover:bg-purple-700/50 text-purple-100 border border-purple-700 rounded-full font-medium transition-all shadow-lg hover:shadow-purple-500/10"
          >
            <Share2 className="w-5 h-5" /> Share TALQS with Others
          </button>
        </div>
      </motion.div>
    </div>
  );
}
