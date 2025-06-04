import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Gavel, Scale, BookOpen, FileText, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalResources() {
  const resources = [
    {
      title: 'Legal Aid Services',
      url: 'https://nalsa.gov.in/',
      description: 'Free legal assistance for low-income individuals',
      icon: <Scale className="w-8 h-8 text-amber-400" />,
      bg: 'bg-gradient-to-br from-amber-900/50 to-amber-800/30'
    },
    {
      title: 'Free Legal Advice',
      url: 'https://lawrato.com/free-legal-advice',
      description: 'Access to legal information and resources by state',
      icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
      bg: 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/30'
    },
    {
      title: 'Government Legal Portal',
      url: 'https://www.india.gov.in/topics/law-justice',
      description: 'Official government portal for legal guides and forms',
      icon: <Landmark className="w-8 h-8 text-blue-400" />,
      bg: 'bg-gradient-to-br from-blue-900/50 to-blue-800/30'
    },
    {
      title: 'Supreme Court Cases',
      url: 'https://main.sci.gov.in/',
      description: 'Browse landmark Supreme Court judgments',
      icon: <Gavel className="w-8 h-8 text-purple-400" />,
      bg: 'bg-gradient-to-br from-purple-900/50 to-purple-800/30'
    },
    {
      title: 'Legal Forms Library',
      url: 'https://www.legalforms.com/',
      description: 'Ready-to-use legal document templates',
      icon: <FileText className="w-8 h-8 text-rose-400" />,
      bg: 'bg-gradient-to-br from-rose-900/50 to-rose-800/30'
    },
  ];

  const guides = [
    {
      title: 'Filing a Lawsuit',
      path: '/guides/filing-lawsuit',
      icon: '⚖️',
      color: 'bg-amber-500/20'
    },
    {
      title: 'Drafting Contracts',
      path: '/guides/drafting-contract',
      icon: '📝',
      color: 'bg-emerald-500/20'
    },
    {
      title: 'Power of Attorney',
      path: '/guides/power-of-attorney',
      icon: '📜',
      color: 'bg-blue-500/20'
    },
    {
      title: 'Property Disputes',
      path: '/guides/property-disputes',
      icon: '🏠',
      color: 'bg-purple-500/20'
    },
    {
      title: 'Divorce Procedures',
      path: '/guides/divorce',
      icon: '💔',
      color: 'bg-rose-500/20'
    },
    {
      title: 'Consumer Rights',
      path: '/guides/consumer-rights',
      icon: '🛒',
      color: 'bg-cyan-500/20'
    },
  ];

  // Floating legal icons animation
  const LegalIcon = ({ icon, style }) => (
    <motion.div
      className="absolute text-4xl opacity-10"
      style={style}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 overflow-hidden relative">
      {/* Floating legal icons */}
      {['⚖️', '🔨', '📜', '👨‍⚖️', '🏛️'].map((icon, i) => (
        <LegalIcon 
          key={i} 
          icon={icon} 
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90 + 5}%`,
            fontSize: `${Math.random() * 30 + 20}px`
          }} 
        />
      ))}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 leading-tight">
          Legal Resources Hub
        </h1>
       
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Your comprehensive gateway to legal knowledge, tools, and guidance
        </p>
      </motion.div>

      {/* Resources Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20 relative z-10"
      >
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 border-t border-gray-700"></div>
          <h2 className="px-4 text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
            <Gavel className="inline mr-3 w-6 h-6" />
            External Legal Resources
            <Scale className="inline ml-3 w-6 h-6" />
          </h2>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((res, idx) => (
            <motion.a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-xl p-6 shadow-xl border border-gray-700 hover:border-cyan-400 transition-all ${res.bg}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-4 -top-4 opacity-20 group-hover:opacity-30 transition-opacity">
                {React.cloneElement(res.icon, { className: "w-24 h-24" })}
              </div>
              <div className="relative z-10">
                <div className="mb-4">
                  {React.cloneElement(res.icon, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{res.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{res.description}</p>
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="mr-2 text-sm font-medium">Visit Resource</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Guides Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10"
      >
        

       
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-0.5 rounded-full">
          <div className="bg-gray-900/80 px-6 py-3 rounded-full">
            <h3 className="text-xl font-semibold text-white mb-2">Need personalized legal help?</h3>
            <Link 
              to="/Team"
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Contact Our Legal Team
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
