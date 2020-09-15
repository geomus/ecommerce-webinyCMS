import React from 'react';
import { ReactComponent as SearchIcon } from "../search-solid.svg";
import './ProductSearch.scss'

const ProductSearch = () => {
    return (
<form action="" method="get" className="product-search-form">
    <div className="form-group">
        <input type="text" name="search" id="searchField" placeholder="Search any product..."/>
        <button type="submit">
            <SearchIcon/>
        </button>
    </div>
</form>
    );
}

export default ProductSearch;

