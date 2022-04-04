import axios from 'axios';
const axiosInstance = axios.create({baseURL: 'https://localhost:8000'});

interface ProfileProps {
    email: string,
    password: string,
    name: string,
    phone: number
}

interface ListingProps {
    title: string,
    desc: string,
    username: string,
    price: number,
    contact: string
}

interface SearchProps {
    keywords: string,
    minPrice: number,
    maxPrice: number,
    tag: string,
    maxAgeHours: number
}

export default class APIRequestHandler {

    static instance = new APIRequestHandler();
    
    private constructor() {}


    // GET Requests
    
    login(username: string, password: string): Promise<boolean> {
        return axios.get('/login', {
            params: {
                username,
                password
            }
        });
    }

    getProfile(username: string): Promise<ProfileProps> {
        return axiosInstance.get('/profile/' + username);
    }

    getListing(listingID: string): Promise<ListingProps> {
        return axiosInstance.get('/listing/' + listingID);
    }

    getListings(searchParams: SearchProps): Promise<ListingProps[]> {
        return axiosInstance.get(
            '/listing', 
            {
                params: searchParams
            }
        );
    }


    // POST Requests
    
    createProfile(profile: ProfileProps) {
        axiosInstance.post('/profile', {...profile});
    }
    
    createListing(listing: ListingProps) {
        axiosInstance.post('/listing', {...listing});
    }

    addWishlistListing(username: string, listingID: string) {
        axios.get('/wishlist/' + username).then(
            response => {
                let curListings = response.data.listings
                curListings.push(listingID);
                axios.put('/wishlist/' + username, {listings: curListings});
            }
        );
    }
    
    updateProfile(username: string, newProfile: ProfileProps) {
        axios.put('/profile/' + username, {...newProfile});
    }

    updateListing(listingID: string, newListing: ListingProps) {
        axios.put('/profile/' + listingID, {...newListing});
    }

    removeWishlistListing(username: string, listingID: string) {
        axios.get('/wishlist/' + username).then(
            response => {
                let curListings = response.data.listings;
                for(let i in curListings) {
                    let listing = curListings[i];
                    if(listing === listingID) {
                        curListings.splice(i, 1);
                    }
                }
                axios.put('/wishlist/' + username, {listings: curListings});
            }
        )
    }


    // DELETE Requests

    deleteProfile(username: string) {
        axios.delete('/profile/' + username);
    }

    deleteListing(listingID: string) {
        axios.delete('/listing/' + listingID);
    }

}