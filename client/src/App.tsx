import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Navbar from './components/Navbar';
import FeaturedListings from './components/FeaturedListings';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/users" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home(): JSX.Element {
  return (
    <div className="Home">
      <SearchBar />
      <FeaturedListings />
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;