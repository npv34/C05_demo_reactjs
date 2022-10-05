import {useState} from "react";

const data = [
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

function UserList() {
    const [users, setUsers] = useState(data)

    let htmlElements = [];

    for (let i = 0; i < users.length; i++) {
        let html = (
            <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{users[i].name}</td>
                <td>{users[i].email}</td>
                <td>
                    <button onClick={() => deleteUser(i)} className="btn btn-danger">Delete</button></td>
            </tr>
        );
        htmlElements.push(html)
    }

    const deleteUser = (index) => {
        if (window.confirm('Are you sure you want to delete')) {
            users.splice(index, 1);
            setUsers([...users])
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
            <div className="card mt-2">
                <div className="card-header">
                    UserList
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
