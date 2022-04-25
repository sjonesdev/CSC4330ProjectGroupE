import * as React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import FeaturedListings from './FeaturedListings';

interface HomeProps {
    signedIn: boolean
    setDefaultSearchKeyword: Function
}
 
class Home extends React.Component<HomeProps, Object> {
    
    constructor(props: HomeProps) {
        super(props);
        this.state = { };
    }

    getHomeInputs() {
        if(this.props.signedIn) {
            return (
                <div className="inputs-container">
                    <SearchBar setSearchKeyword={this.props.setDefaultSearchKeyword} defaultValue={""} inSearchPage={false} />
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