import * as React from 'react';

interface ListingPreviewProps {
    
}
 
interface ListingPreviewState {
    
}
 
class ListingPreview extends React.Component<ListingPreviewProps, ListingPreviewState> {
    constructor(props: ListingPreviewProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 
            <div className="listing-preview">
                <img src="" alt="" className="preview-img" />
                <h3 className="preview-title">Listing</h3>
                <h4 className="preview-post-date">2 hours ago</h4>
                <p className="preview-desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non suscipit, consectetur praesentium odio cumque sit culpa consequatur cupiditate natus! Nobis sed at nam vitae autem ex nemo illum hic soluta?</p>
            </div>
        );
    }
}
 
export default ListingPreview;