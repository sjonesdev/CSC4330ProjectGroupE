import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import APIRequestHandler, { ListingProps, UserProfileProps } from '../common/APIRequestHandler';
import ListingPreview from '../common/ListingPreview';
interface ProfileProps {
    username: string
    signedIn: boolean
}
 
interface ProfileState {
    username: string
    name: string
    contact: string
    desc: string
    signedIn: boolean
    showEditForm: boolean
    showNewListingForm: boolean
    newName: string
    newPhone: string
    newPassword: string
    confirmPassword: string
    listTitle: string
    listDesc: string
    listPrice: string
    numTags: number
    listTags: string[]
    userListings: ListingProps[]
    userWishlist: ListingProps[]
}

interface ProfileStateChange {
    [key: string]: string
}

 
class Profile extends React.Component<ProfileProps, ProfileState> {
    
    constructor(props: ProfileProps) {
        super(props);
        this.state = {   
            ...props,
            name: "",
            contact: "",
            desc: "",
            showEditForm: false,
            showNewListingForm: false,
            newName: "",
            newPhone: "",
            newPassword: "",
            confirmPassword: "",
            listTitle: "",
            listDesc: "",
            listPrice: "",
            numTags: 0,
            listTags: [],
            userListings: [],
            userWishlist: [],
        };
        this.getUpdatedProfileInfo();
        this.newListingClick = this.newListingClick.bind(this);
        this.editProfileClick = this.editProfileClick.bind(this);
        this.handleNewListing = this.handleNewListing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayListings = this.displayListings.bind(this);
        this.displayWishlist = this.displayWishlist.bind(this);
    }

    getUpdatedProfileInfo() {
        let prof = this;
        APIRequestHandler.instance.getProfile(APIRequestHandler.instance.getLoggedIn()).then((res) => {
            prof.setState({
                username: res.email,
                name: res.name,
                contact: res.contact
            });
        });
        APIRequestHandler.instance.getListings({ username: this.state.username }).then((res) => {
            prof.setState({
                userListings: res
            });
        });
        if(APIRequestHandler.instance.getLoggedIn() === this.state.username) {
            APIRequestHandler.instance.getUserWishlist(this.state.username).then((res) => {
                prof.setState({
                    userWishlist: res
                });
            });
        }
    }

    newListingClick() {
        this.setState({showNewListingForm: !this.state.showNewListingForm});
    }

    editProfileClick() {
        this.setState({showEditForm: !this.state.showEditForm});
    }

    handleNewListing(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        for(const tag of this.state.listTags.slice(0, this.state.numTags)) {
            if(!tag) throw new Error("Invalid tag");
        }
        const req: ListingProps = {
            listingID: "",
            title: this.state.listTitle,
            desc: this.state.listDesc,
            username: this.state.username,
            price: parseFloat(this.state.listPrice),
            contact: this.state.contact,
            tags: this.state.listTags.slice(0, this.state.numTags)
        }
        const prof = this;
        APIRequestHandler.instance.createListing(req).then(() => {
            prof.getUpdatedProfileInfo();
        });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const req: UserProfileProps = {
            email: this.state.username,
            name: this.state.newName.length === 0 ? this.state.name : this.state.newName,
            contact: this.state.newPhone.length === 0 ? this.state.contact : this.state.newPhone,
        };
        const prof = this;
        APIRequestHandler.instance.updateProfile(this.props.username, req).then(() => {
            prof.getUpdatedProfileInfo();
        });
    }

    displayListings() {
        const out = [], wishlist = this.state.userWishlist;//await APIRequestHandler.instance.getUserWishlist(this.state.username);
        let key = 0;
        for(let listing of this.state.userListings) {
            out.push(
                <ListingPreview key={key++} {...listing} />
            );
        }
        if(out.length === 0) out.push(<p key={0}>No Listings</p>);
        return out;
    }

    displayWishlist() {
        const out = [];
        let key = 0;
        for(let listing of this.state.userWishlist) {
            out.push(
                <ListingPreview key={key++} {...listing} />
            );
        }
        if(out.length === 0) out.push(<p key={0}>No Wishlist</p>);
        return out;
    }

    changeTag(index: number, event: React.FormEvent<HTMLInputElement>) {
        const tags = [...this.state.listTags];
        tags[index] = event.currentTarget.value;
        this.setState({ listTags: tags });
    }

    getNewListingForm() {
        if(this.state.showNewListingForm) {
            const tagInputs = [];
            for(let i = 0; i < this.state.numTags; i++) {
                tagInputs.push(<input className='tag-input' type="text" key={i} name={`tag${i+1}`} onChange={e => this.changeTag(i, e)} />)
            }
            return (
                <form className='form' onSubmit={this.handleNewListing}>
                    <label htmlFor="listTitle">Title</label>
                    <input type="text" name="listTitle" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({listTitle: event.target.value})} />
                    <label htmlFor="listDesc">Description</label>
                    <input type="text" name="newPhone" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({listDesc: event.target.value})} />
                    <label htmlFor="listPrice">Price</label>
                    <input type="number" name="listPrice" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({listPrice: event.target.value})} />
                    <div>
                        <label>Tags</label>
                        <button className='connect-btn connect-btn-left' onClick={() => {this.setState({ numTags: this.state.numTags === 0 ? 0 : this.state.numTags - 1 })}}>
                            <FontAwesomeIcon icon={["fas", "minus"]} />
                        </button>
                        <button className='connect-btn connect-btn-right' onClick={() => {this.setState({ numTags: this.state.numTags === 3 ? 3 : this.state.numTags + 1 })}}>
                            <FontAwesomeIcon icon={["fas", "plus"]} />
                        </button>
                    </div>
                    <div className="tag-inputs">{tagInputs}</div>
                    <button className="submit" onClick={this.newListingClick}>Cancel</button>
                    <button type="submit" className='submit'>Post</button>
                </form>
            );
        } else {
            return (
                <div className="listing-creator">
                    <button onClick={this.newListingClick}>New Listing</button>
                </div>
            );
        }
    }

    getEditForm() {
        if(this.state.showEditForm) {
            return (
                <form className='form' onSubmit={this.handleSubmit}>
                    <label htmlFor="newName">New Name</label>
                    <input type="text" name="newName" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newName: event.target.value})} />
                    <label htmlFor="newPhone">New Phone Number</label>
                    <input type="text" name="newPhone" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newPhone: event.target.value})} />
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" name="newPassword" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({newPassword: event.target.value})} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({confirmPassword: event.target.value})} />
                    <button className="submit" onClick={this.editProfileClick}>Cancel</button>
                    <button type="submit" className='submit'>Save</button>
                </form>
            );
        } else {
            return (
                <div className="profile-editor">
                    <button onClick={this.editProfileClick}>Edit Profile</button>
                </div>
            );
        }
    }

    getExtras() {
        if(APIRequestHandler.instance.getLoggedIn() === this.state.username) {
            return (
                <>
                    {this.getNewListingForm()}
                    <h3>Wishlist</h3>
                    {this.displayWishlist()}

                    {this.getEditForm()}
                </>
            )
        }
    }

    render() { 
        return (
            <div className="content-container">
                {this.state.signedIn ? <></> : <Navigate to="/signin" />}
                <div className="profile-info">
                    <img src="" alt="" className="profile-img" />
                    <h2 className='profile-name'>{this.state.name}</h2>
                    <h4 className="profile-email">{this.state.username}</h4>
                    <h4 className="profile-contact">Contact: <span className="profile-contact-pref">{this.state.contact}</span></h4>
                    {/* <p className="profile-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti esse deleniti rerum harum ipsa doloribus. Possimus, ipsam libero. Deleniti mollitia nulla iusto excepturi porro voluptate, animi non optio sed tempora.
                    </p> */}

                </div>
                <div className = "Listings">
                    <h3>Listings</h3>
                    {this.displayListings()}
                </div>
                {this.getExtras()}
            </div>
        );
    }
}
 
export default Profile;