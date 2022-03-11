import React from "react";

export default class Listing extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    render() {
        return (
            <div className="Listing">
                <h3>This is a listing</h3>
            </div>
        );
    }
}