import * as React from 'react';
import ListingPreview from '../common/ListingPreview';

interface SearchProps {
    
}
 
interface SearchState {
    
}
 
class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return (
            <ListingPreview/>
        );
    }
}
 
export default Search;