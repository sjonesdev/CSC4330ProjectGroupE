import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListingProps } from './APIRequestHandler';

class ListingPreview extends React.Component<ListingProps, any> {
    
    constructor(props: ListingProps) {
        super(props);
        this.state = { };
    }

    getTags() {
        const out = [];
        let key = 0;
        for(const tag of this.props.tags) {
            out.push(
                <Link key={key++} to={`/search/${encodeURIComponent(tag)}`}>{tag}</Link>
            )
        }

        return out;
    }

    render() { 
        return ( 
            <div className="listing-preview">
                <img src="" alt="" className="preview-img" />
                <div className="preview-header">
                    <Link to={`/listing/${encodeURIComponent(this.props.username)}/${this.props.title}`} ><h4 className="preview-title">{this.props.title}</h4></Link>
                    <span className='preview-tags'>{this.getTags()}</span>
                </div>
                {/* <h4 className="preview-post-date"></h4> */}
                <div className="listing-info">
                    <span className="preview-desc">{this.props.desc}</span>
                    <span className='price'>${this.props.price.toFixed(2)}</span>
                </div>
            </div>
        );
    }
}
 
export default ListingPreview;