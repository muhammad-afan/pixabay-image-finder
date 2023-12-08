import {
    Container,
    Pagination,
    PaginationItem,
    Stack,
} from "@mui/material";
import "../App.css";
import React, { useContext } from "react";
import { Circles } from "react-loader-spinner";
import ImageResult from "./ImageResult";
import { GlobalContext } from "../context/GlobalState";
import SearchIcon from "@mui/icons-material/Search";
import SearchWrapper from "../Search/SearchWrapper";
import SearchIconWrapper from "../Search/SearchIconWrapper";
import StyledInputBase from "../Search/StyledInput";

const Search = () => {
    const { state, loading, onTextChange, handleChange } =
        useContext(GlobalContext);
    return (
        <div>
            <Container maxWidth="lg">
                <Stack justifyContent={"center"} alignItems={"center"}>
                    <SearchWrapper>
                        <SearchIconWrapper>
                            <SearchIcon color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                            name="searchText"
                            value={state.searchText}
                            onChange={onTextChange}
                        />
                    </SearchWrapper>
                </Stack>
                {/* <br /> */}
                {/* <FormControl
                    sx={{ m: 1, width: "15%", color: "#fff" }}
                    variant="standard"
                >
                    <InputLabel id="demo-customized-select-label">Amount</InputLabel>
                    <Select
                        name="amount"
                        value={state.amount || 15}
                        onChange={onAmountChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl> */}
                <br />

                {loading && state.searchText !== "" ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "calc(100vh - 218px)",
                        }}
                    >
                        <Circles
                            color="#00BFFF"
                            ariaLabel="circles-loading"
                            height={100}
                            width={100}
                            wrapperStyle={{ margin: "0 auto" }}
                        />
                    </div>
                ) : state.images.length > 0 ? (
                    <>
                        <Stack sx={{
                            flexGrow: 1,
                            overflow: "hidden",
                            height: "100%",
                        }} direction={'column'}>
                            <ImageResult images={state.images} />
                        </Stack>
                    </>
                ) : null}
                {state.searchText !== "" ? (
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ mt: "50px", mb: "35px" }}
                    >
                        {/* <Pagination count={10} color="secondary" onChange={handleChange} /> */}
                        <Pagination
                            count={10}
                            onChange={handleChange}
                            color="primary"
                        />
                    </Stack>
                ) : null}
            </Container>
        </div >
    );
};

export default Search;
