import axios, { AxiosResponse } from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

interface UserProfileProps {
    email: string,
    name: string,
    contact: string
}

interface ListingProps {
    listingID: string,
    title: string,
    description: string,
    username: string,
    price: number,
    contact: string
    tags: string[]
}

interface SearchProps {
    username?: string
    keywords?: string,
    priceLower?: number,
    priceUpper?: number,
    description?: string,
    tag?: string,
    //maxAgeHours?: number,
}

interface WishlistProps {
    username: string
    title: string
    price: number
}

const setCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/; samesite=strict; secure";
    console.log("set cookie to " + document.cookie);
}

const getCookie = (cname: string): string => {
    let name = cname + "=";
    let cookie = document.cookie;
    let ca = cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class DummyAPIRequestHandler {
    private static loggedInUser: number;
    static loggedIn = false;

    static testTimeout = 300;//ms
    private static database = {
        profiles: [
            {
                email: 'email@columbus.edu',
                password: 'pass',
                name: 'john doe',
                contact: '9995550000'
            }
        ],
        listings: [
            {
                listingID: 'abc123',
                title: 'example',
                description: 'this is a listing',
                username: 'email@columbus.edu',
                price: 999,
                contact: 'N/A',
                tags: ["Electronics"]
            },
            {
                listingID: 'abc12',
                title: 'example2',
                description: 'this is a listing2',
                username: 'email@columbus.edu',
                price: 100,
                contact: 'N/A',
                tags: ["Electronics"]
            },
            {
                listingID: 'abc1',
                title: 'example3',
                description: 'this is a listing3',
                username: 'email@columbus.edu',
                price: 2,
                contact: 'no thanks',
                tags: ["Electronics"]
            },
            {
                listingID: 'abc',
                title: 'example4',
                description: 'this is a listing4',
                username: 'email@columbus.edu',
                price: 4.50,
                contact: 'email',
                tags: ["Sports"]
            },
            {
                listingID: 'ab',
                title: 'example5',
                description: 'this is a listing5',
                username: 'email@columbus.edu',
                price: 27089.283094739,
                contact: '9997774444',
                tags: ["Jewelery"]
            }
        ],
        wishlists: [
            {
                username: 'email@columbus.com',
                info: [
                    {
                        username: "email@columbus.edu",
                        title: "example5",
                        price: 27089.283094739
                    }, 
                    {
                        username: "email@columbus.edu",
                        title: "example4",
                        price: 5
                    }
                ]
            }
        ]
    };

    constructor() {
        const u = getCookie('username')
        if(u) {
            DummyAPIRequestHandler.loggedInUser = this.findProfile(u);
            DummyAPIRequestHandler.loggedIn = true;
        }
    }

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

    private findListing(listingUsername: string, listingTitle: string): number {
        let i, found = false;
        for(i = 0; i < DummyAPIRequestHandler.database.listings.length; i++) {
            if(DummyAPIRequestHandler.database.listings[i].username === listingUsername 
                    && DummyAPIRequestHandler.database.listings[i].title === listingTitle) {
                found = true;
                break;
            }
        }
        return found ? i : -1;
    }

    private findWishlist(username: string): WishlistProps[] {
        let wishlist: WishlistProps[] = [];
        for(let i = 0; i < DummyAPIRequestHandler.database.wishlists.length; i++) {
            if(DummyAPIRequestHandler.database.listings[i].username === username) {
                wishlist = DummyAPIRequestHandler.database.wishlists[i].info;
                break;
            }
        }
        return wishlist;
    }

    private findListingInWishlist(username: string, listingUsername: string, listingTitle: string): number {
        let found = false, i, wishlist = this.findWishlist(username);
        if(wishlist === null) return -2;
        for(i = 0; i < wishlist.length; i++) {
            if(wishlist[i].username === listingUsername && wishlist[i].title === listingTitle) {
                found = true;
                break;
            }
        }
        return found ? i : -1;
    }

    // GET Requests
    
    getLoggedIn() {
        return getCookie("username");
    }

    login(username: string, password: string): Promise<boolean> {
        console.log("login");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userIndex = this.findProfile(username);
                let valid = false;
                if(DummyAPIRequestHandler.database.profiles[userIndex].password === password) {
                    valid = true;
                    DummyAPIRequestHandler.loggedInUser = userIndex;
                    DummyAPIRequestHandler.loggedIn = true;
                    setCookie("username", username, 14);
                    setCookie("token", "dummytoken", 14);
                }
                if(valid) resolve(true); 
                else throw new Error("Invalid login info");
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    logout(username?: string): Promise<boolean> {
        console.log("logout");
        if(!username) username = this.getLoggedIn();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let valid = false;
                console.log("lg1")
                
                if(DummyAPIRequestHandler.loggedInUser >= 0 && DummyAPIRequestHandler.database.profiles[DummyAPIRequestHandler.loggedInUser].email === username) {
                    console.log("lg")
                    valid = true;
                    DummyAPIRequestHandler.loggedInUser = -1;
                    DummyAPIRequestHandler.loggedIn = false;
                    setCookie("username", "", 0);
                    setCookie("token", "", 0);
                }
                valid ? resolve(true) : resolve(false);
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getProfile(username: string): Promise<UserProfileProps> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const prof = this.findProfile(username);
                if(prof >= 0) resolve(DummyAPIRequestHandler.database.profiles[prof]);
                else reject(new Error(`No user ${username}`));
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    // getListing(listingID: string): Promise<ListingProps> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve({
    //                 listingID: 'abc123',
    //                 title: 'example',
    //                 desc: 'this is a listing',
    //                 username: 'email@example.com',
    //                 price: 999,
    //                 contact: 'N/A'
    //             });
    //         }, DummyAPIRequestHandler.testTimeout);
    //     });
    // }

    getListing(username: string, title: string): Promise<ListingProps> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const prof = this.findProfile(username);
                if(prof >= 0) {
                    const username = DummyAPIRequestHandler.database.profiles[prof].email;
                    for(const listing of DummyAPIRequestHandler.database.listings) {
                        if(listing.username === username && listing.title === title) {
                            resolve(listing);
                            return;
                        }
                    }
                }
                reject(new Error("User or listing does not exist"));
            }, DummyAPIRequestHandler.testTimeout);
        });
    }

    getListings(searchParams: SearchProps): Promise<ListingProps[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const out = [];
                for(const list of DummyAPIRequestHandler.database.listings) {
                    let add = true;
                    if(searchParams.tag && !list.tags.includes(searchParams.tag) && searchParams.tag !== "All") add = false;
                    if(searchParams.keywords && !list.title.includes(searchParams.keywords)) add = false;
                    if(searchParams.priceLower && list.price < searchParams.priceLower) add = false;
                    if(searchParams.priceUpper && list.price > searchParams.priceUpper) add = false;
                    if(add) out.push(list);
                }
                resolve(out);

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

    getUserWishlist(username: string): Promise<WishlistProps[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const wishlist = this.findWishlist(username);
                // const listings = [];
                // for(let wishlistItem of wishlist) {
                //     const idx = this.findListing(wishL);
                //     if(idx >= 0) listings.push(DummyAPIRequestHandler.database.listings[idx]);
                // }
                // resolve(listings);
                resolve(wishlist);
            })
        })
    }


    // POST Requests
    
    createProfile(profile: UserProfileProps, password: string): Promise<boolean> {
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
        let listingID = "" + DummyAPIRequestHandler.database.listings.length;//crypto.randomUUID();
        DummyAPIRequestHandler.database.listings.push({...listing, listingID});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, DummyAPIRequestHandler.testTimeout);
        })
    }

    addWishlistListing(username: string, listingUsername: string, listingTitle: string): Promise<boolean> {
        let list = this.findWishlist(username);
        let listingIdx = this.findListing(listingUsername, listingTitle);
        if(listingIdx >= 0) {
            const listing = DummyAPIRequestHandler.database.listings[listingIdx];
            list.push({
                username: listing.username,
                title: listing.title,
                price: listing.price
            });
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
    
    updateProfile(username: string, newProfile: UserProfileProps): Promise<boolean> {
        let prof = this.findProfile(username);
        console.log(username, prof);
        if(prof >= 0) {
            console.log("changing database");
            DummyAPIRequestHandler.database.profiles[prof] = {...newProfile, password: DummyAPIRequestHandler.database.profiles[prof].password};
            console.log(DummyAPIRequestHandler.database.profiles[prof]);
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

    updateListing(username: string, title: string, newListing: ListingProps): Promise<boolean> {
        let l = this.findListing(username, title);
        if(l >= 0) {
            const listing = DummyAPIRequestHandler.database.listings[l];
            if(listing.username === newListing.username) {
                DummyAPIRequestHandler.database.listings[l] = {...newListing, listingID: listing.listingID};
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

    removeWishlistListing(username: string, listingUsername: string, listingTitle: string): Promise<boolean> {
        let i = this.findListingInWishlist(username, listingUsername, listingTitle);
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

    deleteListing(username: string, title: string): Promise<boolean> {
        let l = this.findListing(username, title);
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
    static sessionLengthDays = 14;
    
    private constructor() {
        if(getCookie('username')) APIRequestHandler.loggedIn = true;
        if(useDummyAPI) return new DummyAPIRequestHandler();
    }

    getLoggedIn() {
        return getCookie('username');
    }


    // GET Requests

    getProfile(username: string): Promise<UserProfileProps> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.get('/users/',
            {
                params: {
                    username: encodeURIComponent(username)
                },
                data: {
                    token: getCookie("token")
                }
            }
        );
    }

    getUserListings(username: string): Promise<ListingProps[]> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.get('/listings/',
            {
                params: {
                    username: encodeURIComponent(username)
                },
                data: {
                    token: getCookie("token")
                }
            }
        );
    }

    // getListing(listingID: string): Promise<ListingProps> {
    //     if(!APIRequestHandler.loggedIn) new Promise(() => null);
    //     return axiosInstance.get(encodeURIComponent('/listing/' + listingID),
    //         {
    //             params: {
    //                 token: getCookie("token")
    //             }
    //         }
    //     );
    // }

    getListing(username: string, title: string): Promise<ListingProps> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.get('/listing/',
            {
                params: {
                    username: encodeURIComponent(username),
                    title: encodeURIComponent(title)
                },
                data: {
                    token: getCookie("token")
                }
            }
        );
    }

    async getListings(searchParams: SearchProps): Promise<ListingProps[]> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        // let searchStr = ""
        let key: keyof typeof searchParams;
        // for(key in searchParams) {
        //     if(searchParams[key] !== undefined) {
        //         searchStr += `?${encodeURIComponent(key)}=${encodeURIComponent("" + searchParams[key])}`
        //     }
        // }
        const params: {[key: string]: any} = {};
        for(key in searchParams) {
            if(searchParams[key] !== undefined) {
                params[key] = encodeURIComponent("" + searchParams[key])
            }
        }
        return await axiosInstance.get(
            '/listings/',// + searchStr,
            {
                params,
                data: {
                    token: getCookie("token")
                }
            }
        ).then((res) => {
            console.log(res);
            return res.data;
        });
        
    }

    getUserWishlist(username: string): Promise<WishlistProps[]> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.get('/wishlist/',
            {
                params: {
                    username: encodeURIComponent(username)
                },  
                data: {
                    token: getCookie("token")
                }
            }
        );
    }


    // POST Requests
    
    //give username and password in request body, get user_info with id, username, and something else and token for auth in response
    async login(username: string, password: string): Promise<boolean> {
        let loggedIn = this.getLoggedIn();
        if(loggedIn.length !== 0) throw new Error(`Already logged in with username ${loggedIn}.`);
        let err = false;
        let token = await axiosInstance.post('/login/', {
            data: { //TODO check
                username,
                password
            }
        }).then((response: AxiosResponse<any,any>) => {
            APIRequestHandler.loggedIn = true;
            return response.data['token'];
        }).catch((error) => {
            err = true;
            return error;
        });
        if(!err) {
            setCookie("username", username, 14);
            setCookie("token", token, 14);
            return true;
        } 
        console.log(token);
        return false;
    }

    async logout(username?: string): Promise<boolean> {
        if(!username) username = this.getLoggedIn();
        if(username === this.getLoggedIn()) {
            let err = false;
            await axiosInstance.post('/logout/', {
                data: {
                    username: username, 
                    token: getCookie('token')
                }
            }).then((response) => {
                console.log(response);
                APIRequestHandler.loggedIn = false;
                setCookie("username", "", -1);
                setCookie("token", "", -1);
                return response;
            }).catch((error) => {
                console.log(error);
                err = true;
                return error;
            });
            return !err;
        }
        return false
    }

    createProfile(profile: UserProfileProps, password: string): Promise<boolean> {
        return axiosInstance.post('/users/', {
            data: {
                username: profile.email, 
                password: password
            }
        });
    }
    
    createListing(listing: ListingProps): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.post('/listing', {
            data: {
                ...listing,
                description: listing.description,
                token: getCookie('token')
            }
        });
    }

    async addWishlistListing(username: string, listingUsername: string, listingTitle: string): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        const response = await axiosInstance.get('/wishlist/', {
            data: {
                token: getCookie('token')
            },
            params: {
                username: encodeURIComponent(username)
            }
        });
        const listing = await axiosInstance.get('/listing/', {
            data: {
                token: getCookie('token')
            },
            params: {
                username: encodeURIComponent(listingUsername),
                title: encodeURIComponent(listingTitle)
            }
        });
        let curListings = response.data.listings;
        curListings.push({
            username: listingUsername,
            title: listingTitle,
            price: listing.data['price']
        });
        return axiosInstance.put('/wishlist/', { 
            params: {
                username: encodeURIComponent(username)
            },
            data: {
                listings: curListings,
                token: getCookie('token')
            },
            
         });
    }      

    async removeWishlistListing(username: string, listingUsername: string, listingTitle: string): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        const response = await axiosInstance.get('/wishlist/', {
            params: {
                username: encodeURIComponent(username)
            }
        });
        let curListings = response.data.listings;
        for (let i in curListings) {
            let listing = curListings[i];
            if (listing.username === listingUsername && listing.title === listingTitle) {
                curListings.splice(i, 1);
            }
        }
        return axiosInstance.put('/wishlist/', { 
            params: {
                username: encodeURIComponent(username)
            },
            data: {
                listings: curListings,
                token: getCookie('token')
            }
         });
    }


    // PUT Requests
    updateListing(username: string, title: string, newListing: ListingProps): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.put('/profile/', {
            params: {
                username: encodeURIComponent(username),
                title: encodeURIComponent(title)
            },
            data: {
                ...newListing,
                token: getCookie('token')
            }
        });
    }

    updateProfile(username: string, newProfile: UserProfileProps): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.put('/profile/', {
            params: {
                username: encodeURIComponent(username)
            },
            data: {
                ...newProfile,
                token: getCookie('token')
            }
        });
    } 


    // DELETE Requests

    deleteProfile(username: string): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.delete('/profile/', {
            data: {
                token: getCookie("token")
            },
            params: {
                username: encodeURIComponent(username)
            }
        });
    }

    deleteListing(username: string, title: string): Promise<boolean> {
        if(!APIRequestHandler.loggedIn) new Promise(() => null);
        return axiosInstance.delete('/listing/', {
            params: {
                username: encodeURIComponent(username),
                title: encodeURIComponent(title)
            },
            data: {
                token: getCookie("token")
            }
        });
    }

}

export type { UserProfileProps, ListingProps, SearchProps, WishlistProps };