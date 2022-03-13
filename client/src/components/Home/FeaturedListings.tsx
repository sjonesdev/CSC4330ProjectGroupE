import * as React from 'react';

import Listing from '../Listing/Listing';

interface FeaturedListingsProps {
    
}
 
interface FeaturedListingsState {
    
}
 
class FeaturedListings extends React.Component<FeaturedListingsProps, FeaturedListingsState> {

    constructor(props: FeaturedListingsProps) {
        super(props);
        this.state = {  };
    }

    getLatestListings() {
        return (
            <Listing />
        );
    }

    render() { 
        return ( 
            <div className='FeaturedListings'>
                {this.getLatestListings()}
            </div> 
        );
    }
}
 
export default FeaturedListings;