import * as React from 'react';
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
                <h3 className="preview-title">{this.props.title}</h3>
                {/* <h4 className="preview-post-date"></h4> */}
                <p className="preview-desc">{this.props.desc}</p>
            </div>
        );
    }
}
 
export default ListingPreview;