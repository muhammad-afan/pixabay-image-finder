import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Slide,
    Stack,
} from "@mui/material";
import {
    ZoomIn,
    Close,
    Download,
    NavigateBefore,
    NavigateNext,
} from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalState";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageResult = ({ images }) => {
    const {
        cols,
        open,
        currentImgIndex,
        rightDisabled,
        leftDisabled,
        handleNextImage,
        handlePreviousImage,
        handleClickOpen,
        handleClose,
        handleDownload,
    } = useContext(GlobalContext);
    return (
        <div>
            <ImageList cols={cols} gap={16} variant="masonry">
                {images.map((img, idx) => (
                    <ImageListItem key={img.id}>
                        <img src={img.largeImageURL} alt={img.tags} width={'100%'} height={'100%'} />
                        <Stack
                            alignItems={"center"}
                            justifyContent={"center"}
                            direction={"column"}
                        >
                            <ImageListItemBar
                                title={"@" + img.user}
                                subtitle={img.tags
                                    .split(",")
                                    .map((tag) => `#${tag.trim() + " "}`)}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                        aria-label={`info about ${img.user}`}
                                        onClick={() => handleClickOpen(idx, img.largeImageURL)}
                                    >
                                        <ZoomIn />
                                    </IconButton>
                                }
                            />
                        </Stack>
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog
                sx={{ height: "max-content" }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <Button onClick={handleClose}>
                        <Close />
                    </Button>
                </DialogActions>
                <DialogContent>
                    <img
                        src={images[currentImgIndex]?.largeImageURL}
                        alt=""
                        width={"100%"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDownload}>
                        <Download />
                    </Button>
                </DialogActions>
                {open && (
                    <>
                        <IconButton
                            disabled={leftDisabled}
                            style={{
                                position: "fixed",
                                left: 25,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#000",
                                backgroundColor: "#fff",
                                zIndex: 999,
                            }}
                            onClick={handlePreviousImage}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <IconButton
                            disabled={rightDisabled}
                            style={{
                                position: "fixed",
                                right: 25,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#000",
                                backgroundColor: "#fff",
                                zIndex: 999,
                            }}
                            onClick={handleNextImage}
                        >
                            <NavigateNext />
                        </IconButton>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default ImageResult;
