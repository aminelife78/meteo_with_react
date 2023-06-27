import "./App.css";
import Container from "@mui/material/Container";
import CardMeteo from "./CardMeteo";
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily:["lora"]
    },
  });

  return  (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xs"   sx={{ bgcolor:"#66b4ff", height:"100vh",maxWidth:"100%", display:"flex", flexDirection:"column",justifyContent:"center"  }} className="App">
       <CardMeteo />
  </Container>
  </ThemeProvider>
  );
}

export default App;
