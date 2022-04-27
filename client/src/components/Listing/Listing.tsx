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
}
 
class Listing extends React.Component<ListingPlusProps, ListingState> {
    
    constructor(props: ListingPlusProps) {
        super(props);
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
            showEditForm: false,
            newTitle: "",
            newContact: "",
            newDesc: "",
            newPrice: 0,
            newTags: [],
            newNumTags: 0,
        };
        this.handleEditListing = this.handleEditListing.bind(this);
    }

    componentDidMount() {
        this.getUpdatedInfo();
        this.setState({ 
            newTitle: this.state.listing.title,
            newContact: this.state.listing.contact,
            newDesc: this.state.listing.desc,
            newPrice: this.state.listing.price,
            newTags: this.state.listing.tags, 
            newNumTags: this.state.listing.tags.length
        });
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

    handleEditListing(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        for(const tag of this.state.newTags.slice(0, this.state.newNumTags)) {
            if(!tag) throw new Error("Invalid tag");
        }
        const req: ListingProps = {
            listingID: "",
            title: this.state.newTitle,
            desc: this.state.newDesc,
            username: this.state.username,
            price: this.state.newPrice,
            contact: this.state.newContact,
            tags: this.state.newTags.slice(0, this.state.newNumTags)
        }
        const prof = this;
        APIRequestHandler.instance.createListing(req).then(() => {
            prof.componentDidMount();
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
                    <label htmlFor="newTitle">New Title</label>
                    <input type="text" name="newTitle" value={this.state.newTitle}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newTitle: event.target.value})} />
                    <label htmlFor="newContact">New Contact</label>
                    <input type="text" name="newContact" value={this.state.newContact} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newContact: event.target.value})} />
                    <label htmlFor="newDesc">New Description</label>
                    <input type="text" name="newDesc" value={this.state.newDesc}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newDesc: event.target.value})} />
                    <label htmlFor="newPrice">New Price</label>
                    <input type="text" name="newPrice" value={"" + this.state.newPrice}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newPrice: parseFloat(event.target.value)})} />
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

    getExtras() {
        if(APIRequestHandler.instance.getLoggedIn() === this.state.username) {
            return this.getEditListingForm();
        }
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
                            ${this.state.listing.price.toFixed(2)}
                            <br/>
                            {this.state.listing.desc}
                        </p>
                    </div>
                    {this.getExtras()}
                </div>
            </div>
        );
    }
}
 
export default Listing;