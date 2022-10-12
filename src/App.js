import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<PrivateRoutes component={<Home />} />} />
        <Route
          path="/profile"
          element={<PrivateRoutes component={<Profile />} />}
        />
        <Route path="/edit" element={<PrivateRoutes component={<Edit />} />} />
        <Route
          path="/user-profile/:id"
          element={<PrivateRoutes component={<UserProfile />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
