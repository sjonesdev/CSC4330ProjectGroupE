import * as React from 'react';
import { Link } from 'react-router-dom';
interface ProfileProps {
    
}
 
interface ProfileState {
  
    user: boolean
    error: any
  
}

 
class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {   ...props,
            user: true,
            error: null };
    }
    render() { 
        return ( <>
     
            <div
                className = "Name">

            </div>

            <div
                className = "Listings">
                <img src="" alt="" />
            </div>

            <div
                className = "WishList">
                <img src="" alt="" />
            </div>

            <div
                className = "AddToWishList">
               <Link to="/WishList"><button>Add to WishList</button></Link>
            </div>

            <div
                className = "ChangePassword">
               <Link to="/ChangePassword"><button>Change your password</button></Link>
            </div>



       

       

       
                

        
        
        </> );
    }
}
 
export default Profile;