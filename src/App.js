import './App.css';
import Register from "./pages/Register/Register";
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
    <div className="container">
        <Register/>
    </div>
  );
}

export default App;
