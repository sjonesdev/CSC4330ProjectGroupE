import * as React from 'react';
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
            <div className="Home">
                <SearchBar />
                <FeaturedListings />
            </div>
        );
    }
}
 
export default Home;