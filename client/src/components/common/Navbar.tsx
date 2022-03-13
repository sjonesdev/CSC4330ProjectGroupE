import * as React from 'react';

interface NavBarProps {
    
}
 
interface NavBarState {
    
}
 
class NavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( 
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
 
export default NavBar;