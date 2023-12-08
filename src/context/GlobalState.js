import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import React, { createContext } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const cols = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;
    const [open, setOpen] = React.useState(false);
    const [download, setDownload] = React.useState("");
    const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
    const [rightDisabled, setRightDisabled] = React.useState(false);
    const [leftDisabled, setLeftDisabled] = React.useState(false);
    // const [page, setPage] = React.useState(1);

    const textFieldStyle = {
        color: '#fff', // Set the text color
        '& .MuiInputBase-input': {
            borderBottomColor: '#fff', // Set the underline color when focused
            color: '#fff',
        },
        '& .MuiFormLabel-root': {
            color: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'blue', // Set the border color
            },
            '&:hover fieldset': {
                borderColor: 'blue', // Set the border color on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: 'blue', // Set the border color when focused
            },
        },
    };

    // Search

    const initialState = {
        searchText: "",
        amount: 15,
        apiUrl: "https://pixabay.com/api/",
        apiKey: "24891106-f5dbfaca45f37777ed6fb4966",
        images: [],
        page: 1,
    };
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);
    const onTextChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onAmountChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    React.useLayoutEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${state.apiUrl}?key=${state.apiKey}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=true&page=${state.page}`
                );
                setState((prevState) => ({
                    ...prevState,
                    images: response.data.hits,
                }));
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        if (state.searchText.trim() !== "" && parseInt(state.amount, 10) > 0) {
            fetchData();
        } else {
            setState((prevState) => ({
                ...prevState,
                images: [],
            }));
        }
    }, [state.searchText, state.amount, state.apiUrl, state.apiKey, state.page]);

    const handleNextImage = () => {
        if (currentImgIndex >= state.images.length - 1) {
            setRightDisabled(true);
        } else {
            setRightDisabled(false);
            setCurrentImgIndex((prevIndex) => prevIndex + 1);
        }
    };
    const handlePreviousImage = () => {
        console.log(currentImgIndex);
        if (currentImgIndex !== 0) {
            setLeftDisabled(false);
            setCurrentImgIndex((prevIndex) => prevIndex - 1);
        } else {
            setLeftDisabled(true);
        }
    };

    const handleClickOpen = (index, downloadURL) => {
        console.log(currentImgIndex);
        setOpen(true);
        setDownload(downloadURL);
        setCurrentImgIndex(index);
        if (currentImgIndex <= state.images.length - 1 || currentImgIndex === 0) {
            setRightDisabled(false);
        }
        if (currentImgIndex === 0) {
            setLeftDisabled(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(download);
            const blob = await response.blob();

            // Create a data URL for the blob
            const dataUrl = URL.createObjectURL(blob);

            // Create a link and trigger a click to download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'downloaded-image'; // You can set the default downloaded file name here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the object URL to free up resources
            URL.revokeObjectURL(dataUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    const handleChange = (e, p) => {
        console.log(e, p);
        setState((prevState) => ({
            ...prevState,
            page: p,
        }));
    }
    return (
        <GlobalContext.Provider
            value={{
                cols,
                open,
                download,
                currentImgIndex,
                rightDisabled,
                leftDisabled,
                state,
                loading,
                textFieldStyle,
                onTextChange,
                onAmountChange,
                handleNextImage,
                handlePreviousImage,
                handleClickOpen,
                handleClose,
                handleDownload,
                handleChange,
            }
            }
        >
            {children}
        </GlobalContext.Provider >
    );
};
