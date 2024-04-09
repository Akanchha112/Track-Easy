import {BrowserRouter,Route,Routes} from "react-router-dom";
import Signup from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/homepage" element={<div>trackeasy</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
