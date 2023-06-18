import "./App.css";
import Container from "@mui/material/Container";
import CardMeteo from "./CardMeteo";


function App() {

  return  (
    <Container maxWidth="xs"   sx={{ bgcolor:"#66b4ff", height:"100vh",maxWidth:"100%", display:"flex", flexDirection:"column",justifyContent:"center"  }} className="App">
       <CardMeteo />
  </Container>
  );
}

export default App;
