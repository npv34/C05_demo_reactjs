import {useState} from "react";
import Message from "../share/Message/Message";
import {Button} from "@mui/material";



function UserList(props) {
    const data = props.data;
    const [users, setUsers] = useState(props.data);
    const [message, setMessage] = useState('');

    let htmlElements = [];

    for (let i = 0; i < users.length; i++) {
        let html = (
            <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{users[i].name}</td>
                <td>{users[i].email}</td>
                <td>
                    <Button variant="contained" color="error" onClick={() => deleteUser(i)}>Delete</Button>
                    <button className="btn btn-primary" onClick={() => props.findUser(i)}>View</button>
                </td>
            </tr>
        );
        htmlElements.push(html)
    }

    const deleteUser = (index) => {
        if (window.confirm('Are you sure you want to delete')) {
            users.splice(index, 1);
            setUsers([...users])
            setMessage('Delete user successfully')
        }
    }

    const search = (e) => {
        let input = e.target.value;
        if (input) {
            let dataFilter= users.filter(item => {
                return item.name.includes(input)
            });
            setUsers([...dataFilter])
        } else {
            setUsers([...data])
        }
    }

    return (
        <>
            <Message message={message}/>
            <div className="card mt-2">
                <div className="card-header">
                    {props.title}
                    <input type="text" onKeyUp={(e) => search(e)}/>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {htmlElements}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserList
