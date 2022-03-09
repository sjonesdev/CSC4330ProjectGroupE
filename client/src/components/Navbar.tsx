import React from 'react';

class Navbar extends React.Component {

    constructor(props: {}) {
        super(props);
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

export default Navbar;