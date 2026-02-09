import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx"
import Home from "./pages/home/Home.jsx";
import About from "./pages/About.jsx";
import Result from "./pages/Result.jsx";
import Privacy from "./pages/Privacy.jsx";
import Footer from "./components/layout/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/result" element={<Result/>}/>
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
