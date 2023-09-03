import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router";
import Products from "../Components/Products";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const Container = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  /* gap: 48px; */
  padding: 50px;
  justify-content: center;
`;

const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

const FilterProducts = styled.div`
  display: flex;
  align-items: center;
`;

const SortProducts = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  margin-right: 16px;
  font-weight: 500;
  font-size: 20px;
`;

const Filters = styled.div`
  display: flex;
  gap: 16px;
`;

const Filter = styled.div``;

const ProductsList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  // console.log(filters);
  // console.log(sort);
  // console.log(cat);

  return (
    <>
      <Navbar />
      <FilterBox>
        <FilterProducts>
          <Title>Filter Products:</Title>
          <Filters>
            <Filter>
              <Box sx={{ width: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select gender
                  </InputLabel>
                  <Select
                    defaultValue=""
                    MenuProps={{ disableScrollLock: true }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    onChange={handleFilters}
                    // value={selectGender}
                    label="selectGender"
                  >
                    <MenuItem value={"Man"}>Man</MenuItem>
                    <MenuItem value={"Woman"}>Woman</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Filter>
            <Filter>
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
                    <MenuItem value={"red"}>Red</MenuItem>
                    <MenuItem value={"blue"}>Blue</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Filter>
          </Filters>
        </FilterProducts>
        <SortProducts>
          <Title>Sort Products:</Title>
          <Filters>
            <Filter>
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
            </Filter>
          </Filters>
        </SortProducts>
      </FilterBox>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </>
  );
};

export default ProductsList;
