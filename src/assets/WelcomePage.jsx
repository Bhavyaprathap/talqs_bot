import React, { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import {
  FaUserTie,
  FaGavel,
  FaUserGraduate,
  FaUniversity,
  FaBuilding,
} from "react-icons/fa";

const WelcomePage = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const stored = localStorage.getItem("talqsUser");
    if (stored) setUsername(stored);
  }, []);

  const [text] = useTypewriter({
    words: ["Welcome to TALQS — your legal assistant"],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  const icons = [
    { icon: <FaUserTie />, label: "Lawyer", angle: 0, color: "#00ffff" },
    { icon: <FaGavel />, label: "Judge", angle: 72, color: "#ff00ff" },
    { icon: <FaUserGraduate />, label: "Student", angle: 144, color: "#7b61ff" },
    { icon: <FaUniversity />, label: "Academia", angle: 216, color: "#00ff99" },
    { icon: <FaBuilding />, label: "Corporate", angle: 288, color: "#ff8800" },
  ];

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

      <div className="typewriter legal-text mt-12">
        {text}
        <span className="cursor ">|</span>
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
          <button className="btn-start">
            Get Started <span className="arrow">→</span>
          </button>
        </div>

        {/* Right Panel */}
        <div className="orbit-container">
          <div className="orbit-center">
            </div>
          {icons.map((it, idx) => (
            <div
              key={idx}
              className="orbit-icon"
              style={{
                "--i": idx,
                // "--icon-angle": `${it.angle}deg`,
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
      </div>

      <style jsx>{`
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

        /* Floating elements container */
        .floating-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        /* Scales of justice animation */
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

        /* Gavel animation */
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

        /* Law book animation */
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

        /* Grid overlay */
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

        /* Content container */
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
          margin-top: 2rem;
        }

        .typewriter {
          font-size: clamp(1.8rem, 4vw, 2rem);
          margin-bottom: 1rem;
          text-align: center;
          padding-top: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: "#fdf0ff",
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
          font-size: clamp(2.5rem, 6vw, 3.5rem);
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
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
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
          font-size: clamp(1.1rem, 1.3vw, 1.3rem);
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
          font-size: clamp(1.1rem, 1.3vw, 1.3rem);
          padding: 1rem 2rem;
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

        /* Orbit section */
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

        /* Legal pattern background */
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

        /* Responsive */
        @media (max-width: 992px) {
          .hero-content {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            align-items: center;
            gap: 3rem;
          }

          .left-panel {
            text-align: center;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .features {
            text-align: left;
            display: inline-block;
          }

          .btn-start {
            margin: 0 auto;
          }

          .orbit-container {
            width: 320px;
            height: 320px;
          }
        }

        @media (max-width: 480px) {
          .typewriter {
            padding-top: 10px;
            margin-bottom: 0.5rem;
          }

          .welcome-guest {
            font-size: 2.2rem;
          }

          .orbit-container {
            width: 280px;
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default WelcomePage;