import { alpha } from "@mui/material";
import { styled } from "@mui/system";

const SearchWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha("#c8d4e8", 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: 30,
    width: 300,
}))

export default SearchWrapper