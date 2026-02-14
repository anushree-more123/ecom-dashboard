import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import Footer from "./components/footer/Footer";
import "./App.css";
import SignUp from "./components/sign-up/SignUP";
import AppIndex from "./AppIndex";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route element={<AppIndex />}>
          <Route
            path="/productList"
            element={<h1>Product Listing componnet</h1>}
          />
          <Route path="/add" element={<h1>Add Product Component</h1>} />
          <Route path="/update" element={<h1>update Product componnet</h1>} />
          <Route path="/profile" element={<h1>Profile componnet</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
