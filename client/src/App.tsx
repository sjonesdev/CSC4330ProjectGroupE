import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';


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
import APIRequestHandler from './components/common/APIRequestHandler';
library.add(faMagnifyingGlass);

interface AppState {
  signedIn: boolean
  defaultSearchKeyword: string
}

const sessionsEnabled = true;
class App extends React.Component<Object, AppState> {

  constructor(props?: Object) {
    super(props ? props : {});
    this.state = {
      signedIn: APIRequestHandler.instance.getLoggedIn() !== "",
      defaultSearchKeyword: "",
    };
    if(!sessionsEnabled && this.state.signedIn) APIRequestHandler.instance.logout(APIRequestHandler.instance.getLoggedIn());
    this.setSignedIn = this.setSignedIn.bind(this);
    this.setDefaultSearch = this.setDefaultSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  setSignedIn(signedIn: boolean) {
    this.setState({ signedIn });//, () => { this.forceUpdate(); console.log(this.state); } );
  }

  setDefaultSearch(defaultSearchKeyword: string) {
    this.setState({defaultSearchKeyword})
  }

  handleLogout() {
    console.log("logging out");
    APIRequestHandler.instance.logout();
    this.setSignedIn(false);
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
            <li>
              <button
                  onClick={this.handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home signedIn={this.state.signedIn} setDefaultSearchKeyword={this.setDefaultSearch} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile username={APIRequestHandler.instance.getLoggedIn()} signedIn={this.state.signedIn} />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/signin" element={this.state.signedIn ? <Navigate to="/" /> : <SignIn signedIn={this.state.signedIn} setSignedIn={(signedIn: boolean) => this.setSignedIn(signedIn)} />} />
          <Route path="/signup" element={this.state.signedIn ? <Navigate to="/" /> : <SignUp signedIn={this.state.signedIn} setSignedIn={(signedIn: boolean) => this.setSignedIn(signedIn)} />} />
          <Route path="/search" element={this.state.signedIn ? <Search defaultSearch={this.state.defaultSearchKeyword} /> : <Navigate to="/signin" /> } />
        </Routes>

        <Footer />
      </Router>

    );
  }
}

export default App;