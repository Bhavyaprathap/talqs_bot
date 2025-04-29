// // src/components/HeroSection.jsx
// import React from "react";
// import { useTypewriter } from "react-simple-typewriter";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import styles from "./HeroSection.module.css";

// import { FaGavel, FaUserGraduate, FaUniversity, FaBuilding } from "react-icons/fa";

// const HeroSection = () => {
//   const [text] = useTypewriter({
//     words: ["Welcome to TALQS - Your Legal Assistant"],
//     loop: {},
//     delaySpeed: 100,
//   });

//   const [sliderRef] = useKeenSlider({
//     loop: true,
//     slides: {
//       perView: 4,
//       spacing: 15,
//     },
//     mode: "free-snap",
//   });

//   return (
//     <div className={styles.heroSection}>
//       {/* Top Center Typing Text */}
//       <div className={styles.typingText}>{text}|</div>

//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         {/* Left Side */}
//         <div className={styles.leftContent}>
//           <h1 className={styles.welcomeText}>Welcome Guest</h1>
//           <p className={styles.description}>
//             TALQS is your AI-powered legal assistant. Explore legal resources, generate documents, and connect with professional models.
//           </p>
//           <ul className={styles.pointsList}>
//             <li>Instant Legal Advice</li>
//             <li>Contract Drafting Tools</li>
//             <li>Ask Law-Related Questions</li>
//             <li>Access Trusted Resources</li>
//           </ul>
//           <button className={styles.getStartedButton}>Get Started</button>
//         </div>

//         {/* Center Icons Carousel */}
//         <div className={styles.centerContent}>
//           <div ref={sliderRef} className="keen-slider">
//             <div className="keen-slider__slide">
//               <FaGavel className={styles.icon} />
//               <p>Judiciary</p>
//             </div>
//             <div className="keen-slider__slide">
//               <FaUserGraduate className={styles.icon} />
//               <p>Students</p>
//             </div>
//             <div className="keen-slider__slide">
//               <FaUniversity className={styles.icon} />
//               <p>Academia</p>
//             </div>
//             <div className="keen-slider__slide">
//               <FaBuilding className={styles.icon} />
//               <p>Corporate</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Decorations */}
//       <div className={styles.floatingLeft}></div>
//       <div className={styles.floatingRight}></div>
//       <div className={styles.stars}></div> {/* Animated stars */}
//     </div>
//   );
// };

// export default HeroSection;
