import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <div className="search-bar">
                <form action="" method="get">
                    <input type="search" id="search" />
                    <button type="submit">
                        <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBar;