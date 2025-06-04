import {  Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Navbar from "./pages/Navbar.jsx";
import React, { useState, useEffect } from "react";
import WelcomePage from './assets/WelcomePage';
// import { ToastContainer } from 'react-toastify'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import LegalBotWebsite from "./pages/Legalbotwebsite.jsx";
// import TalqsLegalBot from "./pages/VisualLegalAssistan.jsx";
import LegalQuiz from "./pages/VisualLegalAssistan.jsx";
// import NotePage from "./pages/notepage.jsx";
import LegalTeamPage from "./pages/Team.jsx";
// import WelcomePage1 from "./assets/welcomwpage1.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NotePage from "./pages/NotePage.jsx";
// import HeroSection from "./assets/herosection.jsx";
import ExploreModelsFlow from "./assets/qasumm.jsx";
import ExploreModelFlow from "./assets/contents.jsx";
// import QAChatBot from "./pages/qachatbot.jsx";
import Summarization from "./pages/summarization.jsx";
import NeonFlowPage from "./assets/Neonflow.jsx";
import Footer from "./pages/footer.jsx";
import LegalDictionary from "./pages/LegalDictionary.jsx";
import Ndatemplate from "./pages/Ndatemplate.jsx";
import Features from "./pages/features.jsx";
import LegalCaseSimulation from "./pages/nextpage.jsx";
import IPCSections from "./pages/ipcsecs.jsx";
// import BlogPage from "./pages/BlogPage.jsx";
import NotePage from "./pages/NotePages.jsx";
import QAInternetBot from "./pages/qachatbot.jsx";




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
                {/* <WelcomePage1 username={username || "Guest"}/> */}
                <ExploreModelsFlow/>
                <NeonFlowPage/>
                <ExploreModelFlow/>
                <Features/>
                <LegalCaseSimulation/>                
                <LegalQuiz/>
                <Footer/>
               
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/talqs" element={<TALQSReveal />} /> */}
          {/* <Route path="/qachatbot" element={<QAChatBot/>}/> */}
          <Route path="/api/summarize" element={<Summarization/>}/>
          <Route path="/dictionary" element={<LegalDictionary/>}/>
          <Route path="/NDAtemplate" element={<Ndatemplate/>}/>
          <Route path="/IPCSections" element={<IPCSections/>}/>
          <Route path="/notepage" element={<NotePage/>}/>
          <Route path="/api/search" element={<QAInternetBot/>}/>
        
          <Route path="/Team" element={<LegalTeamPage />} />


         
         
          
          
          
        </Routes>
      </div>
          
     
  )};
export default App;
        
