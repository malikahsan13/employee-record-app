import "./App.css";
import Home from "./Home";
import Employee from "./Employee";
import Department from "./Department";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn=light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/employee" exact element={<Employee />} />
          <Route path="/department" exact element={<Department />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
