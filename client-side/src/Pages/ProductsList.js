import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useLocation } from "react-router";
import Products from "../Components/Products";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const ProductsList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let changedFilter = { ...filters, [name]: value };
    if (!value) {
      delete changedFilter[name];
    }
    setFilters(changedFilter);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  return (
    <>
      <Navbar />
      <div className="filters-container">
        <div className="products-filter">
          <div className="title">Filter Products:</div>
          <div className="filters">
            <div className="filter">
              <Box sx={{ width: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select size
                  </InputLabel>
                  <Select
                    defaultValue=""
                    MenuProps={{ disableScrollLock: true }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="size"
                    onChange={handleFilters}
                    // value={selectGender}
                    label="selectSize"
                  >
                    <MenuItem value="">
                      <em>Select size</em>
                    </MenuItem>
                    <MenuItem value={"XS"}>XS</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="filter">
              <Box sx={{ width: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select color
                  </InputLabel>
                  <Select
                    defaultValue=""
                    MenuProps={{ disableScrollLock: true }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="color"
                    // value={selectColor}
                    label="selectColor"
                    onChange={handleFilters}
                  >
                    <MenuItem value="">
                      <em>Select color</em>
                    </MenuItem>
                    <MenuItem value={"red"}>Red</MenuItem>
                    <MenuItem value={"blue"}>Blue</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
        <div className="products-sort">
          <div className="title">Sort Products:</div>
          <div className="filters">
            <div className="filter">
              <Box sx={{ width: 150 }}>
                <FormControl fullWidth>
                  <InputLabel></InputLabel>
                  <Select
                    defaultValue="newest"
                    MenuProps={{ disableScrollLock: true }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={sortByPrice}
                    label=""
                    onChange={handleSort}
                  >
                    <MenuItem value={"newest"}>Newest</MenuItem>
                    <MenuItem value={"priceAsc"}>Price (asc)</MenuItem>
                    <MenuItem value={"priceDesc"}>Price (desc)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </>
  );
};

export default ProductsList;
