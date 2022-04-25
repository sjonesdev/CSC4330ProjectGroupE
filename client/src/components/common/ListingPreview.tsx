import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListingProps } from './APIRequestHandler';

class ListingPreview extends React.Component<ListingProps, any> {
    constructor(props: ListingProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return ( 
            <div className="listing-preview">
                <img src="" alt="" className="preview-img" />
                <Link to={`/listing/${encodeURIComponent(this.props.username)}/${this.props.title}`} ><h3 className="preview-title">{this.props.title}</h3></Link>
                {/* <h4 className="preview-post-date"></h4> */}
                <p className="preview-desc">{this.props.desc}</p>
                <span className='price'>{this.props.price}</span>
            </div>
        );
    }
}
 
export default ListingPreview;