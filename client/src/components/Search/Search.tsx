import * as React from 'react';
import ListingPreview from '../common/ListingPreview';
import SearchBar from '../common/SearchBar';

interface SearchProps {
    defaultSearch: string
}
 
interface SearchState {
    defaultSearch: string
}
 
class Search extends React.Component<SearchProps, SearchState> {
    
    constructor(props: SearchProps) {
        super(props);
        this.state = {...props};
        this.getSearch = this.getSearch.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
    }

    getSearch(keyword: string) {
        console.log(keyword);
    }

    displaySearch() {
        
    }

    render() { 
        return (
            <>
                <SearchBar setSearchKeyword={this.getSearch} defaultValue={this.state.defaultSearch} />
                {this.displaySearch()}
            </>
        );
    }
}
 
export default Search;