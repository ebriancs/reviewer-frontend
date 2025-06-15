import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import CSE from './component/CSE';
import AFPSAT from './component/AFPSAT';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text">
        <Navbar />

        <main className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/cse" element={<CSE />} />
            <Route path="/afpsat" element={<AFPSAT />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
