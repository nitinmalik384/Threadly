import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; 
import NotificationListener from "./components/NotificationListener"; // Assuming you have a NotificationContext component

function App() {
  return (<>
    <NotificationListener />
    <BrowserRouter>

      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/channel">Channel</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/channel" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
