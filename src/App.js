import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { GlobalProvider } from "./context/GlobalState";
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  })

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
      </ThemeProvider>
      <GlobalProvider>
        <Search />
      </GlobalProvider>
    </>
  );
}

export default App;
