import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './logo.svg';


// Component Imports
import Profile from './components/Profile/Profile';
import Listing from './components/Listing/Listing';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/common/Footer';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass);

interface AppState {
  signedIn: boolean
}

class App extends React.Component<Object, AppState> {

  constructor(props?: Object) {
    super(props ? props : {});
    this.state = {
      signedIn: false
    };
  }

  setSignedIn(signedIn: boolean) {
    this.setState({ signedIn });
  }

  render() {
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
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/listing">Listings</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home signedIn={this.state.signedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/signin" element={this.state.signedIn ? <Navigate to="/" /> : <SignIn signedIn={this.state.signedIn} setSignedIn={(signedIn: boolean) => this.setSignedIn(signedIn)} />} />
          <Route path="/signup" element={this.state.signedIn ? <Navigate to="/" /> : <SignUp signedIn={this.state.signedIn} setSignedIn={(signedIn: boolean) => this.setSignedIn(signedIn)} />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        
        <Footer />
      </Router>

    );
  }
}

export default App;