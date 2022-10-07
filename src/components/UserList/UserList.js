import {useState} from "react";
import Message from "../share/Message/Message";
import {Box, Button, TextField} from "@mui/material";

function UserList(props) {
    const data = props.data;
    const [users, setUsers] = useState(props.data);
    const [message, setMessage] = useState();
    const [form, setForm] = useState({
        name: '',
        email: '',
    });

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

    const handleClick = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }


    const submit = () => {
        users.push(form);
        setUsers([...users]);
        setForm({
            name: '',
            email: ''
        })
    }


    return (
        <>
            <Message message={message}/>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card mt-2">
                        <div className="card-header">
                            Add user
                        </div>
                        <div className="card-body">
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                {form.name ?
                                    <TextField
                                        id="outlined-basic" name="name" onChange={handleClick} value={form.name} label="Name" variant="outlined" />
                                :
                                    <TextField error
                                        id="outlined-basic" name="name" onChange={handleClick} value={form.name} label="Name" variant="outlined" />
                                }

                                <TextField id="outlined-basic" name="email" onChange={handleClick} value={form.email} label="Email" variant="outlined" />
                                <Button disabled={(!form.name || !form.email)} onClick={submit} variant="contained">Save</Button>
                            </Box>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
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
                </div>
            </div>

        </>
    )
}

export default UserList
