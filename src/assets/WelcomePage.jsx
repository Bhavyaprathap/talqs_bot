import React, { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import {
  FaUserTie,
  FaGavel,
  FaUserGraduate,
  FaUniversity,
  FaBuilding,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WelcomePage = () => {
  const [username, setUsername] = useState("Guest");
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    const email = localStorage.getItem("account_email");
    if (email) {
      const nameFromEmail = email.split('@')[0];
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      setUsername(formattedName);
    }

    // Check if this is the first visit after login
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
      setShowContent(true);
      return;
    }

    // Mark that the user has seen the intro
    localStorage.setItem("hasSeenIntro", "true");

    // Animation sequence for first visit
    const sequence = [
      // Card appears (0.5s)
      { action: () => setCardVisible(true), delay: 500 },
      // Card opens (1s)
      { action: () => setCardOpen(true), delay: 1000 },
      // Card stays open (3s)
      { action: () => {}, delay: 3000 },
      // Card closes (1s)
      { action: () => setCardOpen(false), delay: 1000 },
      // Card disappears (0.5s)
      { action: () => setCardVisible(false), delay: 500 },
      // Hide intro and show content (0.5s)
      { action: () => setShowIntro(false), delay: 500 },
      { action: () => setShowContent(true), delay: 500 },
    ];

    let delay = 0;
    sequence.forEach((step) => {
      delay += step.delay;
      setTimeout(step.action, delay);
    });

    return () => {
      sequence.forEach((step) => {
        clearTimeout(step.action);
      });
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const [text] = useTypewriter({
    words: ["Welcome to TALQS — your legal assistant"],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  const icons = [
    { icon: <FaUserTie />, label: "Lawyer", color: "#00ffff" },
    { icon: <FaGavel />, label: "Judge", color: "#ff00ff" },
    { icon: <FaUserGraduate />, label: "Student", color: "#7b61ff" },
    { icon: <FaUniversity />, label: "Academia", color: "#00ff99" },
    { icon: <FaBuilding />, label: "Corporate", color: "#ff8800" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === icons.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? icons.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      {/* Background elements */}
      <div className="floating-elements">
        <div className="scales-animation">⚖️</div>
        <div className="gavel-animation">🔨</div>
        <div className="lawbook-animation">📚</div>
        <div className="grid-overlay"></div>
        <div className="legal-pattern"></div>
      </div>

      {/* Greeting Card Animation */}
      <AnimatePresence>
        {showIntro && (
          <div className="greeting-animation-container">
            {/* Card */}
            <AnimatePresence>
              {cardVisible && (
                <motion.div
                  className="card-container"
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: cardOpen ? 1 : [1, 0.8, 1],
                    opacity: 1,
                    y: cardOpen ? 0 : 20,
                    transition: { 
                      duration: cardOpen ? 0.5 : 0.5,
                      ease: cardOpen ? "easeOut" : "easeIn"
                    }
                  }}
                  exit={{ 
                    scale: 0.8,
                    opacity: 0,
                    y: 20,
                    transition: { 
                      duration: 0.5,
                      ease: "easeIn"
                    }
                  }}
                >
                  <motion.div
                    className="card-content"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: cardOpen ? 1 : 0,
                      transition: { 
                        duration: cardOpen ? 0.5 : 0.3,
                        delay: cardOpen ? 0.3 : 0
                      }
                    }}
                  >
                    <div className="message-content">
                      <div className="welcome-bot">
                        <FaRobot className="bot-icon" />
                        <h3>Welcome to TALQS!</h3>
                      </div>
                      <p>Hello {username}, enjoy your journey with our legal AI assistant.</p>
                      <p>Get instant answers, document summaries, and legal insights.</p>
                      <div className="message-progress">
                        <motion.div
                          className="progress-bar"
                          initial={{ scaleX: 0 }}
                          animate={{ 
                            scaleX: 1,
                            transition: { 
                              duration: 3,
                              ease: "linear",
                              delay: cardOpen ? 0.5 : 0
                            }
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="main-content-container"
          >
            <div className="typewriter legal-text mt-12">
              {text}
              <span className="cursor">|</span>
            </div>

            <div className="hero-content">
              {/* Left Panel */}
              <div className="left-panel">
                <h1 className="welcome-guest">
                  Welcome, <span className="username">{username}</span>
                </h1>
                <p className="intro">
                  TALQS is your AI-powered legal assistant.
                  <br />
                  Get instant guidance, generate documents, and explore legal insights
                  effortlessly.
                </p>
                <ul className="features">
                  <li>
                    <span className="feature-icon">⚖️</span> Instant Legal Q/A
                  </li>
                  <li>
                    <span className="feature-icon">📄</span> Document Summaries
                  </li>
                  <li>
                    <span className="feature-icon">✍️</span> Contract Drafting
                  </li>
                  <li>
                    <span className="feature-icon">🔒</span> Private & Secure
                  </li>
                </ul>
                
              </div>

              {/* Right Panel - Desktop Orbit */}
              {!isMobile && (
                <div className="orbit-container">
                  {icons.map((it, idx) => (
                    <div
                      key={idx}
                      className="orbit-icon"
                      style={{
                        "--i": idx,
                        color: it.color,
                      }}
                    >
                      <div className="icon-wrapper">
                        <div className="icon">{it.icon}</div>
                        <span className="icon-label">{it.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Carousel */}
              {isMobile && (
                <div className="mobile-carousel-container">
                  <div className="mobile-carousel">
                    <button className="carousel-button prev" onClick={prevSlide}>
                      <FaChevronLeft />
                    </button>
                    
                    <div className="carousel-slide">
                      <div className="mobile-icon" style={{ color: icons[currentSlide].color }}>
                        <div className="icon">{icons[currentSlide].icon}</div>
                        <span className="icon-label">{icons[currentSlide].label}</span>
                      </div>
                    </div>
                    
                    <button className="carousel-button next" onClick={nextSlide}>
                      <FaChevronRight />
                    </button>
                  </div>
                  <div className="carousel-dots">
                    {icons.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${currentSlide === idx ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(idx)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* Greeting Animation Styles */
        .greeting-animation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          pointer-events: none;
        }

        /* Card Styles */
        .card-container {
          position: relative;
          width: 350px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform-origin: center;
        }

        .card-content {
          padding: 1.5rem;
        }

        .welcome-bot {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 1rem;
        }

        .bot-icon {
          font-size: 2rem;
          color: #7b61ff;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .message-content h3 {
          font-size: 1.5rem;
          margin: 0;
          background: linear-gradient(90deg, #7b61ff, #00ffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .message-content p {
          font-size: 1rem;
          margin: 0.5rem 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .message-progress {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 1.5rem;
        }

        .progress-bar {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #7b61ff, #00ffff);
          transform-origin: left center;
        }

        /* Main Content Container */
        .main-content-container {
          width: 100%;
          max-width: 1400px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        /* Hero Styles */
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: radial-gradient(ellipse at bottom, #0a0e17 0%, #090a0f 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .scales-animation {
          position: absolute;
          top: 25%;
          left: 25%;
          font-size: 8rem;
          color: rgba(255, 255, 255, 0.15);
          z-index: 0;
          animation: 
            scalesRotate 12s infinite ease-in-out,
            scalesFloat 12s infinite ease-in-out,
            scalesPulse 12s infinite ease-in-out;
        }

        @keyframes scalesRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }

        @keyframes scalesFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        @keyframes scalesPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .gavel-animation {
          position: absolute;
          bottom: 33%;
          right: 25%;
          font-size: 7rem;
          color: rgba(255, 255, 255, 0.15);
          z-index: 0;
          animation: 
            gavelHammer 2s infinite ease-in-out,
            gavelRotate 2s infinite ease-in-out;
        }

        @keyframes gavelHammer {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }

        @keyframes gavelRotate {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(0deg); }
        }

        .lawbook-animation {
          position: absolute;
          top: 33%;
          right: 20%;
          font-size: 6rem;
          color: rgba(255, 255, 255, 0.1);
          z-index: 0;
          animation: 
            bookFloat 8s infinite ease-in-out,
            bookTilt 8s infinite ease-in-out;
        }

        @keyframes bookFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }

        @keyframes bookTilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 30s infinite linear;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }

        .legal-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(66, 153, 225, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(66, 153, 225, 0.05) 0%, transparent 20%);
          z-index: -1;
          animation: patternMove 20s linear infinite alternate;
        }

        @keyframes patternMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          margin-top: 2rem;
        }

        .typewriter {
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 1rem;
          text-align: center;
          padding-top: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #fdf0ff;
          text-shadow: 
            0 0 5px #ff00ff,
            0 0 10px #ff66ff,
            0 0 15px #cc66ff,
            0 0 20px #9933ff,
            0 0 25px #cc66ff;
          position: relative;
          z-index: 10;
        }

        .legal-text {
          position: relative;
        }

        .legal-text::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: #4299e1;
          box-shadow: 0 0 10px #4299e1;
          animation: underlineGrow 1.5s ease-out forwards;
        }

        @keyframes underlineGrow {
          0% {
            width: 0;
          }
          100% {
            width: 100px;
          }
        }

        .cursor {
          color: #fff;
          font-weight: normal;
          animation: blink 1s infinite;
          text-shadow: 0 0 5px #4299e1;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .left-panel {
          flex: 0 0 50%;
          min-width: 300px;
          max-width: 600px;
          padding: 20px;
          z-index: 10;
        }

        .welcome-guest {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-shadow: 0 0 5px #4299e1, 0 0 15px #4299e1;
        }

        .username {
          color: #00ffff;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 5px #00ffff, 0 0 15px #00ffff;
        }

        .username::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00ffff;
          box-shadow: 0 0 5px #00ffff;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .username:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .intro {
          font-size: clamp(1rem, 1.5vw, 1.3rem);
          margin-bottom: 2rem;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .features {
          list-style: none;
          margin-bottom: 2.5rem;
          color: #e2e8f0;
          padding-left: 0;
        }

        .features li {
          margin: 1rem 0;
          font-size: clamp(1rem, 1.3vw, 1.3rem);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.2s ease;
        }

        .features li:hover {
          transform: translateX(5px);
          color: #fff;
        }

        .feature-icon {
          font-size: 1.5em;
          color: #4299e1;
          text-shadow: 0 0 5px #4299e1;
        }

        .btn-start {
          font-size: clamp(1rem, 1.3vw, 1.3rem);
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 250px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 2px 10px rgba(66, 153, 225, 0.5);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .btn-start::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: 0.5s;
          z-index: -1;
        }

        .btn-start:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(66, 153, 225, 0.7);
        }

        .btn-start:hover::before {
          left: 100%;
        }

        .arrow {
          transition: transform 0.3s;
        }

        .btn-start:hover .arrow {
          transform: translateX(5px);
        }

        /* Orbit Container - Desktop */
        .orbit-container {
          position: relative;
          width: clamp(350px, 40vw, 550px);
          height: clamp(350px, 40vw, 550px);
          min-width: 350px;
          margin: 2rem 0;
        }

        .orbit-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #4299e1;
          border-radius: 50%;
          box-shadow: 0 0 10px #4299e1;
        }

        .orbit-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          animation: orbitMove 25s linear infinite;
          transform-origin: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transform: rotate(calc(-1 * var(--icon-angle)));
        }

        .icon {
          font-size: inherit;
          background: rgba(255, 255, 255, 0.9);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 10px currentColor;
          transition: all 0.3s ease;
          border: 2px solid currentColor;
        }

        .orbit-icon:hover .icon {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 0 15px currentColor;
        }

        .icon-label {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          color: #fff;
          display: block;
          text-align: center;
          font-weight: 500;
          background: rgba(26, 32, 44, 0.8);
          padding: 4px 10px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .orbit-icon:hover .icon-label {
          transform: translateY(5px);
          background: rgba(26, 32, 44, 0.9);
        }

        @keyframes orbitMove {
          0% {
            transform: rotate(calc(var(--i) * 72deg)) translate(calc(clamp(180px, 22vw, 240px))) rotate(calc(-1 * (var(--i) * 72deg)));
          }
          100% {
            transform: rotate(calc(360deg + var(--i) * 72deg)) translate(calc(clamp(180px, 22vw, 240px))) rotate(calc(-360deg - (var(--i) * 72deg)));
          }
        }

        /* Mobile Carousel */
        .mobile-carousel-container {
          width: 100%;
          max-width: 400px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mobile-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          margin-bottom: 1rem;
        }

        .carousel-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(5px);
        }

        .carousel-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .prev {
          margin-right: 20px;
        }

        .next {
          margin-left: 20px;
        }

        .carousel-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          transition: all 0.3s ease;
        }

        .mobile-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 20px;
        }

        .mobile-icon .icon {
          font-size: 3rem;
          background: rgba(255, 255, 255, 0.9);
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 10px currentColor;
          border: 2px solid currentColor;
        }

        .mobile-icon .icon-label {
          font-size: 1.2rem;
          color: #fff;
          background: rgba(26, 32, 44, 0.8);
          padding: 6px 12px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(2px);
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #4299e1;
          transform: scale(1.2);
        }

        /* Responsive Styles */
        @media (max-width: 992px) {
          .hero-content {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 15px;
          }

          .hero-content {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 0;
          }

          .left-panel {
            text-align: center;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 100%;
          }

          .features {
            text-align: left;
            display: inline-block;
            margin-bottom: 1.5rem;
          }

          .features li {
            font-size: 1.1rem;
          }

          .btn-start {
            margin: 0 auto;
            padding: 0.8rem 1.5rem;
            font-size: 1.1rem;
          }

          .orbit-container {
            display: none;
          }

          .mobile-carousel-container {
            display: flex;
          }

          .typewriter {
            font-size: 1.5rem;
            padding-top: 10px;
          }

          .welcome-guest {
            font-size: 2.2rem;
          }

          .intro {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .typewriter {
            font-size: 1.3rem;
            padding-top: 5px;
            margin-bottom: 0.5rem;
          }

          .welcome-guest {
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }

          .intro {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .features li {
            font-size: 1rem;
            margin: 0.8rem 0;
          }

          .card-container {
            width: 280px;
          }

          .message-content h3 {
            font-size: 1.3rem;
          }

          .mobile-icon .icon {
            width: 80px;
            height: 80px;
            font-size: 2.5rem;
          }

          .mobile-icon .icon-label {
            font-size: 1rem;
          }

          .carousel-button {
            width: 35px;
            height: 35px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WelcomePage;
