import axios from 'axios';
import crypto from 'crypto';
const axiosInstance = axios.create({baseURL: 'https://localhost:8000'});

interface ProfileProps {
    email: string,
    name: string,
    phone: string
}

interface ListingProps {
    listingID: string,
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

class DummyAPIRequestHandler {
    private static loggedInUser: number;
    static loggedIn = false;
    static loggedInUsername = "";

    static testTimeout = 300;//ms
    private static database = {
        profiles: [
            {
                email: 'email@example.com',
                password: 'pass',
                name: 'john doe',
                phone: '9995550000'
            }
        ],
        listings: [
            {
                listingID: 'abc123',
                title: 'example',
                desc: 'this is a listing',
                username: 'email@example.com',
                price: 999,
                contact: 'N/A'
            },
            {
                listingID: 'abc12',
                title: 'example2',
                desc: 'this is a listing2',
                username: 'email@example.com',
                price: 100,
                contact: 'N/A'
            },
            {
                listingID: 'abc1',
                title: 'example3',
                desc: 'this is a listing3',
                username: 'email@example.com',
                price: 2,
                contact: 'no thanks'
            },
            {
                listingID: 'abc',
                title: 'example4',
                desc: 'this is a listing4',
                username: 'email@example.com',
                price: 4.50,
                contact: 'email'
            },
            {
                listingID: 'ab',
                title: 'example5',
                desc: 'this is a listing5',
                username: 'email@example.com',
                price: 27089.283094739,
                contact: '9997774444'
            }
        ],
        wishlists: [
            {
                username: 'email@example.com',
                listingIDs: ['ab', 'abc']
            }
        ]
    };

    private findProfile(username: string): number {
        let found = false, i;
        for(i = 0; i < DummyAPIRequestHandler.database.profiles.length; i++) {
            if(DummyAPIRequestHandler.database.profiles[i].email === username) {
                found = true;
                break;
            }
        }
        return found ? i : -1;
    }

    private findListing(listingID: string): number {
        let i, found = false;
        for(i = 0; i < DummyAPIRequestHandler.database.listings.length; i++) {
            if(DummyAPIRequestHandler.database.listings[i].listingID === listingID) {
                found = true;
                break;
            }
        }
        return found ? i : -1;
    }

    private findWishlist(username: string): Object[] {
        let wishlist: Object[] = [];
        for(let i = 0; i < DummyAPIRequestHandler.database.wishlists.length; i++) {
            if(DummyAPIRequestHandler.database.listings[i].username === username) {
                wishlist = DummyAPIRequestHandler.database.wishlists[i].listingIDs;
                break;
            }
        }
        return wishlist;
    }

    private findListingInWishlist(username: string, listingID: string): number {
        let found = false, i, wishlist = this.findWishlist(username);
        if(wishlist === null) return -2;
        for(i = 0; i < wishlist.length; i++) {
            if(wishlist[i] === listingID) {
                found = true;
                break;
            }
        }
        return found ? i : -1;
    }

    // GET Requests
    
    getLoggedIn() {
        return DummyAPIRequestHandler.loggedInUsername;
    }

    login(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userIndex = this.findProfile(username);
                let valid = false;
                if(DummyAPIRequestHandler.database.profiles[userIndex].password === password) {
                    valid = true;
                    DummyAPIRequestHandler.loggedInUser = userIndex;
                    DummyAPIRequestHandler.loggedIn = true;
                    DummyAPIRequestHandler.loggedInUsername = username;
                }
                valid ? resolve(true) : resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    logout(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let valid = false;
                if(DummyAPIRequestHandler.loggedInUser >= 0 && DummyAPIRequestHandler.database.profiles[DummyAPIRequestHandler.loggedInUser].email === username) {
                    valid = true;
                    DummyAPIRequestHandler.loggedInUser = -1;
                    DummyAPIRequestHandler.loggedIn = false;
                    DummyAPIRequestHandler.loggedInUsername = "";
                }
                valid ? resolve(true) : resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getProfile(username: string): Promise<ProfileProps> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    email: 'email@example.com',
                    name: 'john doe',
                    phone: '9995550000'
                });
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getListing(listingID: string): Promise<ListingProps> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    listingID: 'abc123',
                    title: 'example',
                    desc: 'this is a listing',
                    username: 'email@example.com',
                    price: 999,
                    contact: 'N/A'
                });
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getListings(searchParams: SearchProps): Promise<ListingProps[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(DummyAPIRequestHandler.database.listings);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getUserListings(username: string): Promise<ListingProps[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let listings = [];
                for(let listing of DummyAPIRequestHandler.database.listings) {
                    if(listing.username === username) listings.push(listing);
                }
                resolve(listings);
            })
        });
    }


    // POST Requests
    
    createProfile(profile: ProfileProps, password: string): Promise<boolean> {
        let found = this.findProfile(profile.email);
        if(found < 0) {
            DummyAPIRequestHandler.database.profiles.push({...profile, password});
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(false);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
    }
    
    createListing(listing: ListingProps): Promise<boolean> {
        let listingID = crypto.randomUUID();
        DummyAPIRequestHandler.database.listings.push({...listing, listingID});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, DummyAPIRequestHandler.testTimeout);
        })
    }

    addWishlistListing(username: string, listingID: string): Promise<boolean> {
        let list = this.findWishlist(username);
        if(this.findListing(listingID) >= 0) {
            list.push(listingID);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(false);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
    }
    
    updateProfile(username: string, newProfile: ProfileProps): Promise<boolean> {
        let prof = this.findProfile(username);
        if(prof >= 0) {
            DummyAPIRequestHandler.database.profiles[prof] = {...newProfile, password: DummyAPIRequestHandler.database.profiles[prof].password};
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(false);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
    }

    updatePassword(username: string, newPassword: string): Promise<boolean> {
        let u = this.findProfile(username);
        if(DummyAPIRequestHandler.loggedInUser === u) {
            DummyAPIRequestHandler.database.profiles[u].password = newPassword;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(false);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
    }

    updateListing(listingID: string, newListing: ListingProps): Promise<boolean> {
        let l = this.findListing(listingID);
        if(l >= 0) {
            if(DummyAPIRequestHandler.database.listings[l].listingID === newListing.listingID) {
                DummyAPIRequestHandler.database.listings[l] = {...newListing};
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true);
                    }, DummyAPIRequestHandler.testTimeout);
                });
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    removeWishlistListing(username: string, listingID: string): Promise<boolean> {
        let i = this.findListingInWishlist(username, listingID);
        if(i >= 0) {
            this.findWishlist(username).splice(i, 1);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }


    // DELETE Requests

    deleteProfile(username: string): Promise<boolean> {
        let u = this.findProfile(username);
        if(u === DummyAPIRequestHandler.loggedInUser) {
            DummyAPIRequestHandler.database.profiles.splice(u, 1);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    deleteListing(listingID: string): Promise<boolean> {
        let l = this.findListing(listingID);
        if(l < 0) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(false);
                }, DummyAPIRequestHandler.testTimeout);
            });
        }
        let user = DummyAPIRequestHandler.database.listings[l].username;
        let u = this.findProfile(user);
        if(u === DummyAPIRequestHandler.loggedInUser) {
            DummyAPIRequestHandler.database.listings.splice(l, 1);
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }
}

let useDummyAPI = true;
export default class APIRequestHandler {

    static instance: APIRequestHandler = new APIRequestHandler();
    static loggedIn = false;
    static loggedInUsername = "";
    
    private constructor() {
        if(useDummyAPI) {
            APIRequestHandler.instance = new DummyAPIRequestHandler();
        }
    }


    // GET Requests

    getLoggedIn() {
        return APIRequestHandler.loggedInUsername;
    }

    //give username and password in request body, get user_info with id, username, and something else and token for auth in response
    login(username: string, password: string): Promise<boolean> {
        APIRequestHandler.loggedInUsername = username;
        return axios.get('/login', {
            params: {
                username,
                password
            }
        });
    }

    logout(username: string): Promise<boolean> {
        APIRequestHandler.loggedInUsername = "";
        return axios.get('/logout', {
            params: {username}
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
    
    createProfile(profile: ProfileProps, password: string): Promise<boolean> {
        return axiosInstance.post('/profile', {...profile, password});
    }
    
    createListing(listing: ListingProps): Promise<boolean> {
        return axiosInstance.post('/listing', {...listing});
    }

    async addWishlistListing(username: string, listingID: string): Promise<boolean> {
        const response = await axios.get('/wishlist/' + username);
        let curListings = response.data.listings;
        curListings.push(listingID);
        return axios.put('/wishlist/' + username, { listings: curListings });
    }
    
    updateProfile(username: string, newProfile: ProfileProps): Promise<boolean> {
        return axios.put('/profile/' + username, {...newProfile});
    }

    updateListing(listingID: string, newListing: ListingProps): Promise<boolean> {
        return axios.put('/profile/' + listingID, {...newListing});
    }

    async removeWishlistListing(username: string, listingID: string): Promise<boolean> {
        const response = await axios.get('/wishlist/' + username);
        let curListings = response.data.listings;
        for (let i in curListings) {
            let listing = curListings[i];
            if (listing === listingID) {
                curListings.splice(i, 1);
            }
        }
        return axios.put('/wishlist/' + username, { listings: curListings });
    }


    // DELETE Requests

    deleteProfile(username: string): Promise<boolean> {
        return axios.delete('/profile/' + username);
    }

    deleteListing(listingID: string): Promise<boolean> {
        return axios.delete('/listing/' + listingID);
    }

}