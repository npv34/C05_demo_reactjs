import {useEffect, useState} from "react";
import Message from "../share/Message/Message";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import axios from "axios";
import async from "async";

function UserList(props) {

    const [users, setUsers] = useState({
        id: '',
        name: '',
        email: ''
    });
    const [message, setMessage] = useState();
    const [showBtnUpdate, setShowBtnUpdate] = useState(true);
    const [indexEdit, setIndexEdit] = useState();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [weather, setWeather] = useState(0)

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
                    <Button variant="contained" color="error" onClick={() => handleDelete(users[i].id)}>Delete</Button>
                    <button className="btn btn-primary" onClick={() => handleClickOpen(i)}>View</button>
                    <button className="btn btn-success" onClick={() => handleUpdate(i)}>Edit</button>
                </td>
            </tr>
        );
        htmlElements.push(html)
    }
    const search = (e) => {
        let input = e.target.value;
        if (input) {
            let dataFilter= users.filter(item => {
                return item.name.includes(input)
            });
            setUsers([...dataFilter])
        } else {
            setUsers([...users])
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

    const handleUpdate = (index) => {
        setForm(users[index]);
        setShowBtnUpdate(false);
        setIndexEdit(index)
    }

    const handleEdit = () => {
        users[indexEdit] = form;
        setUsers([...users]);
        setForm({
            name: '',
            email: '',
        })
        setShowBtnUpdate(true);
    }

    const handleClickOpen = (index) => {
        setOpen(true);
        setUser(users[index])
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getWeather = async () => {
        return await axios.get('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=02e3323f29bc461c2346db2fe3989729');
    }

    const getUserApi = async () => {
        return await axios.get('https://jsonplaceholder.typicode.com/users')
    }

    const handleDelete = (id) => {

    }

    useEffect(() => {
        getWeather().then(response => {
            let weather = response.data.main.temp - 273;
            setWeather(Math.floor(weather))
        })
    },[])

    useEffect(() => {
        getUserApi().then(res => {
            let data = res.data;
            setUsers(data)
        })
    },[])

    useEffect(() => {
        console.log('run useEffect open')
    },[open])

    return (
        <>
            <Message message={message}/>
            {"Current Weather: " + weather + " C"}
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
                                <Button hidden={showBtnUpdate} color="success" variant="contained" onClick={handleEdit}>Edit</Button>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"User information"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Name: {user.name}
                       Email: {user.email}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserList
