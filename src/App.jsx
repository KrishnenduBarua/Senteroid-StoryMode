//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';
import StoryMode from './StoryMode.jsx';
import NavBar from './NavBar.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storymode" element={<StoryMode />} />
      </Routes>
    </Router>
  );
}

export default App;
