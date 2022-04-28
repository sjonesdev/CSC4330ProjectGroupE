import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListingProps } from './APIRequestHandler';

interface ListingPreviewProps {
    listing: ListingProps
    comparePrice?: number
}

class ListingPreview extends React.Component<ListingPreviewProps, any> {
    
    constructor(props: ListingPreviewProps) {
        super(props);
        this.state = { };
    }

    getTags() {
        const out = [];
        let key = 0;
        for(const tag of this.props.listing.tags) {
            out.push(
                <Link key={key++} to={`/search/${encodeURIComponent(tag)}`}>{tag}</Link>,
                <span className='no-margin'>{", "}</span>
            )
        }
        return out.splice(0, out.length-1);
    }

    getNotification() {
        if(this.props.comparePrice && this.props.listing.price < this.props.comparePrice) {
            return (
                <span className='preview-span preview-notification'>
                    <FontAwesomeIcon className='fa-2xl' icon={["fas", "circle-exclamation"]} />{" "}
                    <span className='big-span'>Was ${this.props.comparePrice}</span>
                </span>
            );
        }
    }

    render() { 
        return ( 
            <div className="listing-preview">
                <img src="" alt="" className="preview-img" />
                <div className="preview-header">
                    <Link to={`/listing/${encodeURIComponent(this.props.listing.username)}/${this.props.listing.title}`} ><h4 className="preview-title">{this.props.listing.title}</h4></Link>
                    <span className='preview-span preview-tags'>{this.getTags()}</span>
                </div>
                {/* <h4 className="preview-post-date"></h4> */}
                <div className="listing-info">
                    <span className="preview-span preview-desc">{this.props.listing.description}</span>
                    <span className='preview-span price'>{this.getNotification()} ${parseFloat("" + this.props.listing.price).toFixed(2)}</span>
                </div>
            </div>
        );
    }
}
 
export default ListingPreview;