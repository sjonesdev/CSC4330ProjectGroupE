import * as React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import FeaturedListings from './FeaturedListings';

interface HomeProps {
    signedIn: boolean
}
 
interface HomeState {
    signedIn: boolean
}
 
class Home extends React.Component<HomeProps, HomeState> {
    
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            ...props
        };
    }

    getHomeInputs() {
        if(this.state.signedIn) {
            return (
                <SearchBar />
            );
        } else {
            return (
                <div className="btn-container">
                    <Link to="/signin"><button>Sign In</button></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                </div>
            );
        }
    }

    render() { 
        return (
            <div className="Home">
                <div className="welcome">
                    <h2>Welcome to</h2>
                    <h1>Columbus List</h1>
                </div>
                {this.getHomeInputs()}
                <FeaturedListings />
            </div>
        );
    }
}
 
export default Home;