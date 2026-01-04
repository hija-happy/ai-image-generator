import LandingPage from "./pages/Landing";
import './index.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PromptPage from "./pages/PromptPage";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/prompt" element={<PromptPage />} /> 
      
    </Routes>
    // <div>
    //   <PromptPage />
    // </div>
  );
}

export default App;
