import {  Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Navbar from "./pages/Navbar.jsx";
import React, { useState, useEffect } from "react";
import WelcomePage from './assets/WelcomePage';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotePage from "./pages/NotePage.jsx";
// import HeroSection from "./assets/herosection.jsx";
import ExploreModelsFlow from "./assets/qasumm.jsx";
import ExploreModelFlow from "./assets/contents.jsx";
import QABotChat from "./pages/qachatbot.jsx";
import Summarization from "./pages/summarization.jsx";
import NeonFlowPage from "./assets/Neonflow.jsx";
import Footer from "./pages/footer.jsx";
import LegalDictionary from "./pages/LegalDictionary.jsx";
import Ndatemplate from "./pages/Ndatemplate.jsx";
import Features from "./pages/features.jsx";
import LegalCaseSimulation from "./pages/nextpage.jsx";
import IPCSections from "./pages/ipcsecs.jsx";


function App() {
  const [username, setUsername] = useState('');

  // Use effect to retrieve the username when the component is mounted
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return(
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 to-purple-800">
        <Routes>
          <Route path="/" element={
            <>

                <Navbar/>
                <WelcomePage username={username || "Guest"} />
                {/* <HeroSection username={localStorage.getItem("username") || "Guest"} /> */}

                <ExploreModelsFlow/>
                <NeonFlowPage/>
                <ExploreModelFlow/>
                <Features/>
                <LegalCaseSimulation/>
                <Footer/>
               
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/talqs" element={<TALQSReveal />} /> */}
          <Route path="/qachatbot" element={<QABotChat/>}/>
          <Route path="/summarization" element={<Summarization/>}/>
          <Route path="/dictionary" element={<LegalDictionary/>}/>
          <Route path="/NDAtemplate" element={<Ndatemplate/>}/>
          <Route path="/IPCSections" element={<IPCSections/>}/>
          <Route path="/NotePage" element={<NotePage/>}/>
          
          
        </Routes>
      </div>
          
     
  )};
export default App;
        
