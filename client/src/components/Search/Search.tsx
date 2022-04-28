import * as React from 'react';
import APIRequestHandler, { ListingProps } from '../common/APIRequestHandler';
import ListingPreview from '../common/ListingPreview';
import SearchBar from '../common/SearchBar';

interface SearchProps {
    defaultSearch: string
    defaultCategory?: string
}
 
interface SearchState {
    defaultSearch: string
    defaultCategory: string
    priceL: number
    priceH: number
    maxAgeHours: number
    listings: ListingProps[]
    selectedCategory: number
}
 
class Search extends React.Component<SearchProps, SearchState> {
    
    static categories = [
        "All", 
        "Electronics", 
        "Collectibles", 
        "Art",
        "Home", 
        "Garden",
        "Clothing",
        "Accessories", 
        "Sports",
        "Business",
        "Industrial",
        "Jewelry"
    ]

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            defaultSearch: props.defaultSearch,
            defaultCategory: props.defaultCategory ? props.defaultCategory : "All",
            priceL: -Infinity,
            priceH: Infinity,
            maxAgeHours: Infinity,
            listings: [],
            selectedCategory: typeof props.defaultCategory === "string" ? Search.categories.findIndex((val) => val === props.defaultCategory) : 0
        };
        this.getUpdatedSearchResults = this.getUpdatedSearchResults.bind(this);
        this.getSearch = this.getSearch.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    componentDidMount() {
        this.getUpdatedSearchResults();
    }

    getUpdatedSearchResults(event?: React.FormEvent<HTMLFormElement>) {
        if(event) event.preventDefault();
        const req: {[key: string]: any} = {};
        if(this.state.defaultSearch.length !== 0) req.keywords = this.state.defaultSearch;
        if(this.state.selectedCategory !== -1 && this.state.selectedCategory < Search.categories.length) {
            if(Search.categories[this.state.selectedCategory] !== "All")
                req.tag = Search.categories[this.state.selectedCategory];
        }
        if(this.state.priceL !== -Infinity) req.priceL = this.state.priceL;
        if(this.state.priceH !== Infinity) req.priceH = this.state.priceH;
        // if(this.state.maxAgeHours !== Infinity) req.maxAgeHours = this.state.maxAgeHours;
        const prof = this;
        APIRequestHandler.instance.getListings(req).then( (res) => {
            prof.setState({
                listings: res
            })
        });
    }

    getSearch(keyword: string) {
        this.setState({ defaultSearch: keyword }, () => this.getUpdatedSearchResults());
    }

    displaySearch() {
        const out = [];
        let key = 0;
        if(!this.state.listings) return;
        for(const listing of this.state.listings) {
            out.push(<ListingPreview key={key++} listing={listing} />);
        }
        if(out.length === 0) return (<div>No Listings</div>);
        return out;
    }

    changeCategory(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(
            { 
                defaultCategory: e.target.value, 
                selectedCategory: Search.categories.findIndex((val) => val === e.target.value) 
            }
        );
    }

    getCategories() {
        const out = [];
        let key = 0;
        for(const cat of Search.categories) {
            out.push(
                <div key={key} className="input-wrapper">
                    <input
                    id={`tag-input${key}`}
                    type="radio"
                    name="tag"
                    value={cat}
                    checked={key === this.state.selectedCategory}
                    onChange={this.changeCategory}
                    />
                    <label htmlFor={`tag-input-${key}`}>{cat}</label>
                </div>
            );
            key++;
        }

        return out;
    }

    render() { 
        return (
            <div className="search">
                <h2>Search</h2>
                <SearchBar setSearchKeyword={this.getSearch} defaultValue={this.state.defaultSearch} inSearchPage={true} />
                <div className="search-body">
                    <form className="form search-params" onSubmit={this.getUpdatedSearchResults}>
                        <fieldset>
                            <h3>Filters</h3>
                            {/* <fieldset>
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
                            </fieldset> */}
                            <fieldset>
                                <legend>Price Range</legend>
                                <div className="input-wrapper">
                                    <label htmlFor="min-price">$</label>
                                    <input type="text" name="min-price" onChange={(e) => this.setState({ priceL: e.target.value.length === 0 ? -Infinity : parseFloat(e.target.value) })} />
                                    <label htmlFor="max-price"> to $</label>
                                    <input type="text" name="max-price" onChange={(e) => this.setState({ priceH: e.target.value.length === 0 ? Infinity : parseFloat(e.target.value) })} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Category</legend>
                                {this.getCategories()}
                            </fieldset>
                            <button type="submit">Apply</button>
                        </fieldset>
                    </form>
                    <div className="listings-container">{this.displaySearch()}</div>
                </div>
            </div>
        );
    }
}
 
export default Search;