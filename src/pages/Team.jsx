// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
// import { FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

// const LegalTeamPage = () => {
//   const navigate = useNavigate();
  
//   // Typewriter effect for "Team G354 TALQS"
//   const [text] = useTypewriter({
//     words: ['Team G354 TALQS', 'Legal Excellence', 'Innovative Solutions', 'Client Focused'],
//     loop: true,
//     typeSpeed: 70,
//     deleteSpeed: 50,
//     delaySpeed: 1500,
//   });

//   // Team members data
//   const teamMembers = [
//     {
//       id: 1,
//       name: 'AKSHARA',
//       title: 'Summary Model',
//       bio: 'With over 15 years of experience in corporate law, Sarah specializes in mergers and acquisitions. She has successfully negotiated deals worth over $2 billion.',
//       // image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//       social: {
//         linkedin: 'https://linkedin.com/in/sarahjohnson',
//         instagram: 'https://instagram.com/aksharareddy25',
//         twitter: 'https://twitter.com/sarahjohnson'
//       }
//     },
//     {
//       id: 2,
//       name: 'BHAVYA SREE',
//       title: 'Backend developer',
//       bio: 'we have integrated the backend using flask',
//       // image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//       social: {
//         linkedin: 'https://linkedin.com/in/michaelchen',
//         instagram: 'https://instagram.com/_bhavya_prathap',
//         twitter: 'https://twitter.com/michaelchen'
//       }
//     },
//     {
//       id: 3,
//       name: 'BHAAVYA',
//       title: 'Q/A model',
//       bio: 'David helps protect your innovations with patents and trademarks. He has registered over 500 IP assets for clients in tech and creative industries.',
//       // image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//       social: {
//         linkedin: 'https://linkedin.com/in/davidrodriguez',
//         instagram: 'https://instagram.com/bhaavyaramakrishnan',
//         twitter: 'https://twitter.com/davidrodriguez'
//       }
//     },
//     {
//       id: 4,
//       name: 'RAM CHARAN TEJA',
//       title: 'Summary model',
//       bio: 'Emily provides compassionate yet effective representation in divorce, child custody, and domestic relations matters.',
//       image: 'src/pages/images/Screenshot 2025-06-02 115651.png',
//       social: {
//         linkedin: 'https://linkedin.com/in/emilywilson',
//         instagram: 'https://instagram.com/ramcharan_0905',
//         twitter: 'https://twitter.com/emilywilson'
//       }
//     },
//     {
//       id: 5,
//       name: 'INDIRA',
//       title: 'Summary model',
//       bio: 'James has successfully defended clients in high-profile criminal cases with an exceptional acquittal rate.',
//       // image: 'src/pages/image copy.png',
//       social: {
//         linkedin: 'https://linkedin.com/in/jamespeterson',
//         instagram: 'https://instagram.com/indira_6_p',
//         twitter: 'https://twitter.com/jamespeterson'
//       }
//     },
//     {
//       id: 6,
//       name: 'RESHVANTH',
//       title: 'Q/A model',
//       bio: 'Lisa specializes in complex immigration cases and has helped hundreds of families achieve their American dream.',
//       image: 'src/pages/images/Screenshot 2025-06-02 115651.png',
//       social: {
//         linkedin: 'https://linkedin.com/in/lisawong',
//         instagram: 'https://instagram.com/lisawong',
//         twitter: 'https://twitter.com/lisawong'
//       }
//     },
//     {
//       id: 7,
//       name: 'VARSHINI',
//       title: 'Q/A model',
//       bio: 'Robert advises startups and established businesses on corporate governance, compliance, and transactions.',
//       // image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//       social: {
//         linkedin: 'https://linkedin.com/in/robertkim',
//         instagram: 'https://instagram.com/_varshini_pulichintha',
//         twitter: 'https://twitter.com/robertkim'
//       }
//     }
//   ];

//   // Auto-scrolling carousel settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ],
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />
//   };

//   function CustomPrevArrow(props) {
//     const { onClick } = props;
//     return (
//       <button 
//         onClick={onClick}
//         className="absolute left-0 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-lg hover:bg-opacity-80 transition-all"
//         style={{ top: '50%', transform: 'translateY(-50%)' }}
//         aria-label="Previous slide"
//       >
//         <FaChevronLeft className="text-gray-700" />
//       </button>
//     );
//   }

//   function CustomNextArrow(props) {
//     const { onClick } = props;
//     return (
//       <button 
//         onClick={onClick}
//         className="absolute right-0 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-lg hover:bg-opacity-80 transition-all"
//         style={{ top: '50%', transform: 'translateY(-50%)' }}
//         aria-label="Next slide"
//       >
//         <FaChevronRight className="text-gray-700" />
//       </button>
//     );
//   }

//   // Floating icons state
//   const [icons, setIcons] = useState([]);

//   useEffect(() => {
//     // Generate floating icons
//     const legalIcons = ['⚖️', '📜', '👨‍⚖️', '🏛️', '🔍', '📚', '💼', '🔐'];
//     const generatedIcons = [];
    
//     for (let i = 0; i < 20; i++) {
//       generatedIcons.push({
//         id: i,
//         icon: legalIcons[Math.floor(Math.random() * legalIcons.length)],
//         left: Math.random() * 100,
//         top: Math.random() * 100,
//         size: Math.random() * 20 + 15,
//         duration: Math.random() * 20 + 10,
//         delay: Math.random() * 5
//       });
//     }
    
//     setIcons(generatedIcons);
//   }, []);

//   // Handle exit
//   const handleExit = () => {
//     navigate('/'); // Navigate to home or previous page
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 relative overflow-hidden">
//       {/* Floating legal icons background */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {icons.map((icon) => (
//           <div
//             key={icon.id}
//             className="absolute text-gray-300 opacity-20"
//             style={{
//               left: `${icon.left}%`,
//               top: `${icon.top}%`,
//               fontSize: `${icon.size}px`,
//               animation: `float ${icon.duration}s infinite ${icon.delay}s linear`
//             }}
//           >
//             {icon.icon}
//           </div>
//         ))}
//       </div>

//       {/* Exit button - fixed at top right */}
//       <button 
//         onClick={handleExit}
//         className="fixed top-4 right-4 z-50 p-3 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
//         aria-label="Exit team page"
//       >
//         <FaTimes className="text-gray-700 text-xl" />
//       </button>

//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-4 text-center relative z-10">
//         <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Legal Team</h1>
//         <div className="text-2xl font-mono bg-blue-800 bg-opacity-50 inline-block px-4 py-2 rounded-lg">
//           <span className="text-blue-200">{text}</span>
//           <Cursor cursorColor="#e74c3c" />
//         </div>
//       </header>

//       {/* Team Carousel */}
//       <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Expert Attorneys</h2>
        
//         <div className="relative">
//           <Slider {...settings}>
//             {teamMembers.map((member) => (
//               <div key={member.id} className="px-4">
//                 <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-opacity-80">
//                   <div 
//                     className="h-64 bg-cover bg-center relative"
//                     style={{ backgroundImage: `url(${member.image})` }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
//                     <div className="absolute bottom-0 left-0 p-6">
//                       <h3 className="text-2xl font-bold text-white">{member.name}</h3>
//                       <p className="text-red-300 font-semibold">{member.title}</p>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-gray-700 mb-4">{member.bio}</p>
//                     <div className="flex space-x-4">
//                       <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                         <FaLinkedin size={20} />
//                       </a>
//                       <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
//                         <FaInstagram size={20} />
//                       </a>
//                       <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
//                         <FaTwitter size={20} />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-8 px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Team G354 TALQS</h3>
//             <p className="mb-4">Providing exceptional legal services with integrity and innovation.</p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaLinkedin size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaInstagram size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaTwitter size={20} />
//               </a>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Practice Areas</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-white">Corporate Law</a></li>
//               <li><a href="#" className="hover:text-white">Litigation</a></li>
//               <li><a href="#" className="hover:text-white">Intellectual Property</a></li>
//               <li><a href="#" className="hover:text-white">Family Law</a></li>
//               <li><a href="#" className="hover:text-white">Immigration</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
//             <address className="not-italic">
//               <p className="mb-2">123 Legal Avenue</p>
//               <p className="mb-2">Suite 500</p>
//               <p className="mb-2">New York, NY 10001</p>
//               <p className="mb-2">Phone: (555) 123-4567</p>
//               <p>Email: info@teamg354talqs.com</p>
//             </address>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-800 text-center text-sm">
//           <p>&copy; {new Date().getFullYear()} Team G354 TALQS. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LegalTeamPage;
