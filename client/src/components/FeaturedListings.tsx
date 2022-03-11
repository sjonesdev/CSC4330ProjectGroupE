import React from 'react';
import Listing from './Listing';

export default class FeaturedListings extends React.Component {

    constructor(props: Object) {
        super(props);
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