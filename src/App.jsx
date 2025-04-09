import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import HomePage from "./pages/home.jsx";

import HeroSection from "./assets/herosection.jsx";
import ExploreModelsFlow from "./assets/qasumm.jsx";
import ExploreModelFlow from "./assets/contents.jsx";
import QABotChat from "./pages/qachatbot.jsx";
import Summarization from "./pages/summarization.jsx";
import NeonFlowPage from "./assets/Neonflow.jsx";
import Footer from "./pages/footer.jsx";
import LegalDictionary from "./pages/LegalDictionary.jsx";
import Ndatemplate from "./pages/Ndatemplate.jsx";



function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 to-purple-800">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <HeroSection username="bhavya" />
                <ExploreModelsFlow/>
                <NeonFlowPage/>
                <ExploreModelFlow/>
                <Footer/>
               
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qachatbot" element={<QABotChat/>}/>
          <Route path="/summarization" element={<Summarization/>}/>
          <Route path="/dictionary" element={<LegalDictionary/>}/>
          <Route path="/NDAtemplate" element={<Ndatemplate/>}/>
          
          
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
