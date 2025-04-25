import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Send, MessageCircle } from 'lucide-react';

export default function Testimonials() {
  const defaultTestimonials = [
    {
      name: 'Sarah K.',
      role: 'Freelance Designer',
      text: 'TALQS saved me hours of legal research. The chatbot answered my contract questions instantly and accurately!',
    },
    {
      name: 'Mark R.',
      role: 'Startup Founder',
      text: 'The NDA generator was a lifesaver during fundraising. Quick, reliable, and professional documents every time.',
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
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
    const newReview = { name: name.trim(), role: role.trim(), text: text.trim() };
    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('testimonials', JSON.stringify(updated));
    setName('');
    setRole('');
    setText('');
    setTimeout(() => {
      commentBoxRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const shareWebsite = () => {
    const shareData = {
      title: 'TALQS - Legal Assistant',
      text: 'Check out TALQS! It’s a legal assistant that helps with contracts, questions, and more.',
      url: window.location.href
    };
    navigator.share?.(shareData).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" /> Feedback & Comments
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-neutral-900 p-6 rounded-xl shadow-xl mb-6"
      >
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Write your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mt-4 px-4 py-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 px-5 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md transition"
        >
          <Send className="w-4 h-4" /> Submit
        </button>
      </form>

      <div className="w-full max-w-2xl relative">
        <div
          ref={commentBoxRef}
          className="h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-neutral-900 p-4 rounded-lg border border-neutral-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <p className="text-sm text-neutral-300 italic mb-2">“{t.text}”</p>
              <div className="text-xs text-neutral-400">— {t.name}, {t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={shareWebsite}
        className="mt-8 px-6 py-2 flex items-center gap-2 text-sm text-neutral-300 border border-neutral-700 rounded-md hover:bg-neutral-800 transition"
      >
        <Share2 className="w-4 h-4" /> Share TALQS
      </button>
    </div>
  );
}
