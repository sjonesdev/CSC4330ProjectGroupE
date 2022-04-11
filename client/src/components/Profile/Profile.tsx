import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import APIRequestHandler from '../common/APIRequestHandler';
import ListingPreview from '../common/ListingPreview';
interface ProfileProps {
    username: string
    signedIn: boolean
}
 
interface ProfileState {
    username: string
    signedIn: boolean
    showEditForm: boolean
    newName: string
    newPhone: string
    newPassword: string
    confirmPassword: string
}

interface ProfileStateChange {
    [key: string]: string
}

 
class Profile extends React.Component<ProfileProps, ProfileState> {
    
    constructor(props: ProfileProps) {
        super(props);
        this.state = {   
            ...props,
            showEditForm: false,
            newName: "",
            newPhone: "",
            newPassword: "",
            confirmPassword: "",
        };
        this.editProfileClick = this.editProfileClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    editProfileClick() {
        this.setState({showEditForm: !this.state.showEditForm});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    getExtras() {
        if(APIRequestHandler.instance.getLoggedIn() == this.state.username) {
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
                        <input type="submit" className='submit' value="Save" />
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
    }

    render() { 
        return (
            <div className="content-container">
                {this.state.signedIn ? <></> : <Navigate to="/signin" />}
                <div className="profile-info">
                    <img src="" alt="" className="profile-img" />
                    <h2 className='profile-name'>John Doe</h2>
                    <h3 className="profile-email">email@example.com</h3>
                    <h3 className="profile-contact">Contact: <span className="profile-contact-pref">No preference</span></h3>
                    <p className="profile-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti esse deleniti rerum harum ipsa doloribus. Possimus, ipsam libero. Deleniti mollitia nulla iusto excepturi porro voluptate, animi non optio sed tempora.
                    </p>

                </div>
                <div className = "Listings">
                    <h3>Listings</h3>
                    <ListingPreview />
                </div>
                <div className = "WishList">
                    <h3>Wishlist</h3>
                    <ListingPreview />
                </div>
                {this.getExtras()}
            </div>
        );
    }
}
 
export default Profile;