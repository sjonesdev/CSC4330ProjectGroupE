import * as React from 'react';
import { Link } from 'react-router-dom';

interface ListingProps {
    
}
 
interface ListingState {
    
}
 
class Listing extends React.Component<ListingProps, ListingState> {
    constructor(props: ListingProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 
            <div className="listing">
                <div className="listing-carousel">
                    <img src="" alt="" className="listing-preview" />
                </div>
                <h3 className="listing-title">
                    Listing Title
                </h3>
                <div className="listing-poster-info">
                    <h3 className="poster-info-title">Poster Info</h3>
                    <h4 className="poster-name">
                        John Doe
                    </h4>
                    <h4 className="poster-email">
                        Email: email@example.com
                    </h4>
                    <h4 className="poster-phone">
                        Phone: None
                    </h4>
                </div>
                <div className="listing-description">
                    <div className="listing-tags-container">
                        <div className="listing-tag">
                            <Link to="/search" className="listing-tag-link">
                                No Tag
                            </Link>
                        </div>
                    </div>
                    <p className="listing-desc-text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eos iusto explicabo adipisci quos, amet totam tempora voluptas beatae voluptatum at assumenda? Ab est dicta eum velit fuga quas hic.
                    </p>
                </div>
            </div> 
        );
    }
}
 
export default Listing;