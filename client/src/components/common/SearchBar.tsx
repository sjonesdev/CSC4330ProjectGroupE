import * as React from 'react';

interface SearchBarProps {
    
}
 
interface SearchBarState {
    
}
 
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return (
            <div className="SearchBar">
                <h3>This is a search bar</h3>
            </div>
        );
    }
}
 
export default SearchBar;