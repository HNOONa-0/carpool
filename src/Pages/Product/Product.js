import { List } from "@mui/material";
import React, { useState } from "react";
import FilterPanel from "./FilterPanel";
import ProductList from "./ProductList";
import './ProductStyle.css'
const curatedList=({brand,selectedPrice,selectedRating},searchText)=>{
    // get all products from an api call
    let allProduct=[];
    let arr=[];

    for(let i=0;i<allProduct.length;i++){
        let ok=1;
        for(let j=0;j<brand.length;j++)if(brand[j].checked===false&&allProduct[i].brand===brand[j].value)ok=0;
        if(ok&&allProduct[i].rating>=selectedRating&&(searchText===""||allProduct[i].name.includes(searchText) )&&
        allProduct[i].price>=selectedPrice[0]&&allProduct[i].price<=selectedPrice[1]) arr.push(allProduct[i] );
    }
    return arr;
}
const Product=({filterData,setFilterData,searchText,setTempCartProduct} )=>{
// filters    
    const {selectedRating,selectedPrice,brand}= filterData;
    
    const handleChangeChecked = (id) => {
        const brandStateList = brand;
        const changeCheckedBrand = brandStateList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        // setBrand(changeCheckedBrand);
        setFilterData({...filterData,brand:changeCheckedBrand})
    };
    const handleChangePrice = (event, value) => {
        // setSelectedPrice(value);
        setFilterData({...filterData,selectedPrice:value} )
    };
    const setSelectedRating=(id)=>{
        setFilterData({...filterData,selectedRating:id} )
    }
    const list=curatedList(filterData,searchText)
    return(
        <div className="product rest-height flex flex-col" >
            <div className="product-panel-list-wrap flex flex1 overflow-y-auto" >
                <FilterPanel
                    brand={brand}
                    changeChecked={handleChangeChecked}
                    selectedPrice={selectedPrice}
                    changePrice={handleChangePrice}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                />
                <ProductList
                    setTempCartProduct={setTempCartProduct}
                />
            </div>
        </div>
    )
}
export default Product;