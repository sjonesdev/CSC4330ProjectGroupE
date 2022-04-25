import * as React from 'react';
import APIRequestHandler, { ListingProps } from '../common/APIRequestHandler';
import ListingPreview from '../common/ListingPreview';
import SearchBar from '../common/SearchBar';

interface SearchProps {
    defaultSearch: string
}
 
interface SearchState {
    defaultSearch: string
    minPrice: number
    maxPrice: number
    tags: string[]
    maxAgeHours: number
    listings: ListingProps[]
}
 
class Search extends React.Component<SearchProps, SearchState> {
    
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            ...props,
            minPrice: -Infinity,
            maxPrice: Infinity,
            tags: [],
            maxAgeHours: Infinity,
            listings: [],
        };
        this.getUpdatedSearchResults();
        this.getSearch = this.getSearch.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
    }

    getUpdatedSearchResults() {
        const req: {[key: string]: any} = {};
        if(this.state.defaultSearch.length !== 0) req.defaultSearch = this.state.defaultSearch;
        if(this.state.tags.length !== 0) req.tags = this.state.tags;
        if(this.state.minPrice !== -Infinity) req.minPrice = this.state.minPrice;
        if(this.state.maxPrice !== Infinity) req.maxPrice = this.state.maxPrice;
        if(this.state.maxAgeHours !== Infinity) req.maxAgeHours = this.state.maxAgeHours;
        const prof = this;
        APIRequestHandler.instance.getListings(req).then( (res) => {
            prof.setState({
                listings: res
            })
        });
    }

    getSearch(keyword: string) {
        this.setState({ defaultSearch: keyword })
        this.getUpdatedSearchResults();
    }

    displaySearch() {
        const out = [];
        let key = 0;
        for(const listing of this.state.listings) {
            out.push(<ListingPreview key={key++} {...listing} />);
        }
        if(out.length === 0) return (<div>No Listings</div>);
        return out;
    }

    render() { 
        return (
            <div className="search">
                <SearchBar setSearchKeyword={this.getSearch} defaultValue={this.state.defaultSearch} inSearchPage={true} />
                <div className="search-body">
                    <form className="form search-params">
                        <fieldset>
                            <legend>Max Listing Age</legend>
                            <select name="search-age-limit" id="search-age-limit">
                                <option value="none">None</option>
                                <option value="1hour">1 hour</option>
                                <option value="2hour">2 hours</option>
                                <option value="4hour">4 hours</option>
                                <option value="8hour">8 hours</option>
                                <option value="16hour">16 hours</option>
                                <option value="24hour">24 hours</option>
                                <option value="3day">3 days</option>
                                <option value="1week">1 week</option>
                                <option value="1month">1 month</option>
                                <option value="6month">6 month</option>
                                <option value="1year">1 year</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="input-wrapper">
                                <label htmlFor="other">Custom</label>
                                <input type="text" name="other" />
                                <select name="custom-time-unit" id="custom-time-unit">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Months">Months</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Price Range</legend>
                            <div className="input-wrapper">
                                <label htmlFor="min-price">$</label>
                                <input type="text" name="min-price" />
                                <label htmlFor="max-price"> to $</label>
                                <input type="text" name="max-price" />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Category</legend>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="all" value="All" />
                                <label htmlFor="all">All</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="electronics" value="Electronics" />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="collectibles-art" value="Collectibles & Art" />
                                <label htmlFor="collectibles-art">Collectibles & Art</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="home-garden" value="Home & Garden" />
                                <label htmlFor="collectibles-art">Home & Garden</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="clothing-accessories" value="Clothing & Accessories" />
                                <label htmlFor="collectibles-art">Clothing & Accessories</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="toys" value="Toys" />
                                <label htmlFor="collectibles-art">Collectibles & Art</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="sporting-goods" value="Sporting Goods" />
                                <label htmlFor="collectibles-art">Sporting Goods</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="business-industrial" value="Business & Industrial" />
                                <label htmlFor="collectibles-art">Business & Industrial</label>
                            </div>
                            <div className="input-wrapper">
                                <input type="radio" name="tag" id="jewelry-watches" value="Jewelry & Watches" />
                                <label htmlFor="collectibles-art">Jewelry & Watches</label>
                            </div>
                        </fieldset>
                    </form>
                    <div className="listings-container">{this.displaySearch()}</div>
                </div>
            </div>
        );
    }
}
 
export default Search;