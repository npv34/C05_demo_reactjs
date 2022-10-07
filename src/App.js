import './App.css';
import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import Footer from "./components/Footer/Footer";
const users = [
    {
        id: 1,
        name: 'admin',
        email: 'admin@example.com'
    },
    {
        id: 2,
        name: 'user',
        email: 'user@example.com'
    },
    {
        id: 3,
        name: 'teo',
        email: 'teo@example.com'
    }
];
function App() {
    const pageTitle = "User Manager";
    const message = "Xin  chao"

    const viewUser = (index) => {
        alert(index)
    }

  return (
    <div className="App">
        <Navbar />
        <div className="container">
            <UserList title={pageTitle} message={message} data={users} findUser={viewUser}/>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
