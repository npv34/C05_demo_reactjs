import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {useState} from "react";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="container">
            <UserList/>
        </div>

    </div>
  );
}

export default App;
