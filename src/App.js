import './App.css';
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login/Login";
import Master from "./pages/Master/Master";
import UserList from "./components/UserList/UserList";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (

    <div className="container">
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Master/>} >
                <Route path="" element={<Dashboard/>} />
                <Route path="users" element={<UserList/>} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
