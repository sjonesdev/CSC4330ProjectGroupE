import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    showEditForm: boolean
    newTitle: string
    newContact: string
    newDesc: string
    newPrice: number
    newTags: string[]
    newNumTags: number
    deleted: boolean
    redirectToUpdated: boolean
}
 
class Listing extends React.Component<ListingPlusProps, ListingState> {
    
    constructor(props: ListingPlusProps) {
        super(props);
        this.state = {
            ...props,
            listing: {
                listingID: "",
                title: "",
                description: "",
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
            showEditForm: false,
            newTitle: "",
            newContact: "",
            newDesc: "",
            newPrice: Infinity,
            newTags: [],
            newNumTags: 0,
            deleted: false,
            redirectToUpdated: false,
        };
        this.addToWishlist = this.addToWishlist.bind(this);
        this.handleEditListing = this.handleEditListing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getUpdatedInfo();
        // this.setState({ 
        //     newTitle: this.state.listing.title,
        //     newContact: this.state.listing.contact,
        //     newDesc: this.state.listing.desc,
        //     newPrice: this.state.listing.price,
        //     newTags: this.state.listing.tags, 
        //     newNumTags: this.state.listing.tags.length
        // });
    }

    getUpdatedInfo() {
        if(!this.state.username || !this.state.title) return;
        const list = this;
        APIRequestHandler.instance.getProfile(this.state.username).then((res) => {
            list.setState({ user: res });
        });
        APIRequestHandler.instance.getListing(this.state.username, this.state.title).then((res) => {
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

    addToWishlist() {
        APIRequestHandler.instance.addWishlistListing(
            APIRequestHandler.instance.getLoggedIn(), 
            this.state.listing.username, this.state.listing.title
        );
    }

    handleEditListing(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        for(const tag of this.state.newTags.slice(0, this.state.newNumTags)) {
            if(!tag) throw new Error("Invalid tag");
        }
        const req: ListingProps = {
            listingID: "",
            title: this.state.newTitle.length === 0 ? this.state.title : this.state.newTitle,
            description: this.state.newDesc.length === 0 ? this.state.listing.description : this.state.newDesc,
            contact: this.state.newContact.length === 0 ? this.state.listing.contact : this.state.newContact,
            username: this.state.username,
            price: this.state.newPrice === Infinity ? this.state.listing.price : this.state.newPrice,
            tags: this.state.newNumTags === 0 ? this.state.listing.tags : this.state.newTags.slice(0, this.state.newNumTags)
        }
        const prof = this;
        APIRequestHandler.instance.updateListing(this.state.username, this.state.title, req).then(() => {
            //prof.getUpdatedInfo();
            this.setState({ redirectToUpdated: true })
        });
    }

    changeTag(index: number, event: React.FormEvent<HTMLInputElement>) {
        const tags = [...this.state.newTags];
        tags[index] = event.currentTarget.value;
        this.setState({ newTags: tags });
    }

    getEditListingForm() {
        if(this.state.showEditForm) {
            const tagInputs = [];
            for(let i = 0; i < this.state.newNumTags; i++) {
                tagInputs.push(<input className='tag-input' type="text" key={i} name={`tag${i+1}`} onChange={e => this.changeTag(i, e)} />)
            }
            return (
                <form className='form' onSubmit={this.handleEditListing}>
                    <h3>Only fill out the fields you would like to edit.</h3>
                    <label htmlFor="newTitle">New Title</label>
                    <input type="text" name="newTitle"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newTitle: event.target.value})} />
                    <label htmlFor="newContact">New Contact</label>
                    <input type="text" name="newContact"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newContact: event.target.value})} />
                    <label htmlFor="newDesc">New Description</label>
                    <input type="text" name="newDesc"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newDesc: event.target.value})} />
                    <label htmlFor="newPrice">New Price</label>
                    <input type="text" name="newPrice"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newPrice: event.target.value.length === 0 ? -1.0 : parseFloat(event.target.value)})} />
                    <div>
                    <label>Tags</label>
                        <button type="button" className='connect-btn connect-btn-left' onClick={() => {this.setState({ newNumTags: this.state.newNumTags === 0 ? 0 : this.state.newNumTags - 1 })}}>
                            <FontAwesomeIcon icon={["fas", "minus"]} />
                        </button>
                        <button type="button" className='connect-btn connect-btn-right' onClick={() => {this.setState({ newNumTags: this.state.newNumTags === 3 ? 3 : this.state.newNumTags + 1 })}}>
                            <FontAwesomeIcon icon={["fas", "plus"]} />
                        </button>
                    </div>
                    <div className="tag-inputs">{tagInputs}</div>
                    <button className="submit" onClick={() => this.setState({ showEditForm: false })}>Cancel</button>
                    <button type="submit" className='submit'>Save</button>
                </form>
            );
        } else {
            return (
                <button onClick={() => this.setState({ showEditForm: true })}>Edit</button>
            )
        }
    }

    handleDelete() {
        APIRequestHandler.instance.deleteListing(this.state.username, this.state.listing.title);
        this.setState({ deleted: true });
    }

    getExtras() {
        if(APIRequestHandler.instance.getLoggedIn() === this.state.username) {
            return (
                <>
                    {this.getEditListingForm()}
                    <button onClick={this.handleDelete}>Delete</button>
                </>
            );
        }
    }

    render() { 
        if(this.state.redirectToUpdated) 
            return (
                <Navigate to={"/profile"} />//" + encodeURIComponent(this.state.username) + "/" + encodeURIComponent(this.state.newTitle)} />
            );
        if(!this.state.username || !this.state.title) return (<Navigate to="/notfound" />);
        if(this.state.deleted) return (<Navigate to="/" />)
        return ( 
            <div className="content-container">
                <div className="listing">
                    <div className="listing-carousel">
                        <img src="" alt="" className="listing-preview" />
                    </div>
                    <h3 className="listing-title">
                        {this.state.listing.title}
                    </h3>
                    <button onClick={this.addToWishlist}>Add To Wishlist</button>
                    <div className="listing-poster-info">
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
                        <p className="listing-desc-text">
                            ${parseFloat("" + this.state.listing.price).toFixed(2)}
                            <br/>
                            {this.state.listing.description}
                        </p>
                    </div>
                    {this.getExtras()}
                </div>
            </div>
        );
    }
}
 
export default Listing;