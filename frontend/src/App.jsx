import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChannelView from "./pages/ChannelView"; 

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/channel">Channel</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/channel" element={<ChannelView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
