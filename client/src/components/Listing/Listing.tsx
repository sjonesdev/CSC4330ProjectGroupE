import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import APIRequestHandler, { ListingProps, UserProfileProps } from '../common/APIRequestHandler';
 
interface ListingPlusProps {
    username: string
    title: string
}

interface ListingState {
    username: string
    title: string
    listing: ListingProps
    user: UserProfileProps
}
 
class Listing extends React.Component<ListingPlusProps, ListingState> {
    
    constructor(props: ListingPlusProps) {
        super(props);
        console.log(props);
        this.state = {
            ...props,
            listing: {
                listingID: "",
                title: "",
                desc: "",
                username: "",
                price: Infinity,
                contact: "",
                tags: [],
            },
            user: {
                email: "",
                name: "",
                contact: "",
            },
        };
        this.getUpdatedInfo();
    }

    getUpdatedInfo() {
        if(!this.state.username || !this.state.title) return;
        const list = this;
        APIRequestHandler.instance.getProfile(this.state.username).then((res) => {
            console.log(res);
            list.setState({ user: res });
        });
        APIRequestHandler.instance.getListing(this.state.username, this.state.title).then((res) => {
            console.log(res);
            list.setState({ listing: res });
        });
    }

    getTags() {
        const out = [];
        let key = 0;
        for(const tag of this.state.listing.tags) {
            out.push(
                <Link key={key++} to={`/search/${encodeURIComponent(tag)}`}>{tag}</Link>
            )
        }

        return out;
    }

    render() { 
        if(!this.state.username || !this.state.title) return (<Navigate to="/notfound" />);
        return ( 
            <div className="content-container">
                <div className="listing">
                    <div className="listing-carousel">
                        <img src="" alt="" className="listing-preview" />
                    </div>
                    <h3 className="listing-title">
                        {this.state.listing.title}
                    </h3>
                    <div className="listing-poster-info">
                        <h3 className="poster-info-title">Poster Info</h3>
                        <h4 className="poster-name">
                            {this.state.user.name}
                        </h4>
                        <h4 className="poster-email">
                            Email: {this.state.listing.username}
                        </h4>
                        <h4 className="poster-phone">
                            {this.state.user.contact}
                        </h4>
                    </div>
                    <div className="listing-description">
                        <div className="listing-tags-container">
                            {this.getTags()}
                        </div>
                        {/* <p className="listing-desc-text">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eos iusto explicabo adipisci quos, amet totam tempora voluptas beatae voluptatum at assumenda? Ab est dicta eum velit fuga quas hic.
                        </p> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Listing;