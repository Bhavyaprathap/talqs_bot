import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// A slick, card-based Legal Resources page
export default function LegalResources() {
  const resources = [
    {
      title: 'Legal Aid Services',
      url: 'https://nalsa.gov.in/',
      description: 'Free legal assistance for low-income individuals.',
    },
    {
      title: 'Free Legal Advice',
      url: 'https://lawrato.com/free-legal-advice',
      description: 'Access to legal information and resources by state.',
    },
    {
      title: 'Indian Government Legal Resources',
      url: 'https://www.india.gov.in/topics/law-justice',
      description: 'Official government portal for legal guides and forms.',
    },
  ];

  const guides = [
    {
      title: 'How to File a Lawsuit',
      path: '/guides/filing-lawsuit',
    },
    {
      title: 'How to Draft a Contract',
      path: '/guides/drafting-contract',
    },
    {
      title: 'Understanding Power of Attorney',
      path: '/guides/power-of-attorney',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-6">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold text-center text-cyan-400 mb-16">
        Legal Resources
      </h1>

      {/* Resources Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center">
          Helpful Legal Links
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((res, idx) => (
            <motion.a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between bg-[#111] p-6 rounded-2xl shadow-lg border border-cyan-400 hover:scale-105 transform transition"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {res.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {res.description}
                </p>
              </div>
              <ExternalLink className="w-6 h-6 text-cyan-300 self-end mt-4" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Guides Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center">
          Legal Process Guides
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {guides.map((guide, idx) => (
            <motion.div
              key={idx}
              className="bg-[#111] p-6 rounded-2xl shadow-lg border border-pink-500 hover:shadow-pink-500/50 transform hover:-translate-y-1 transition"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Link to={guide.path} className="flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {guide.title}
                </span>
                <ExternalLink className="w-5 h-5 text-cyan-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
