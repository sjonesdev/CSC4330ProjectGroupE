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
                <div className="inputs-container">
                    <SearchBar />
                </div>
            );
        } else {
            return (
                <div className="inputs-container">
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
                    {this.getHomeInputs()}
                    <FeaturedListings />
                </div>
            </div>
        );
    }
}
 
export default Home;