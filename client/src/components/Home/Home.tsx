import * as React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../common/Footer';
import SearchBar from '../common/SearchBar';
import FeaturedListings from './FeaturedListings';

interface HomeProps {
    
}
 
interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <><div className="Home">
                <SearchBar />
                <div className="welcome">
                    <h2>Welcome to</h2>
                    <h1>Columbus List</h1>
                    <div className="btn-container">
                        <Link to="/signin"><button>Sign In</button></Link>
                        <Link to="/signup"><button>Sign Up</button></Link>
                    </div>
                </div>
                <FeaturedListings />
            </div><Footer /></>
        );
    }
}
 
export default Home;