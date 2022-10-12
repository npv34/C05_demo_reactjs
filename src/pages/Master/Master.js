import {Route, Outlet} from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Master() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        let userLogin = JSON.parse(localStorage.getItem('user'));
        if (!userLogin) {
            setIsLogin(true)
            navigate("/login");
        }
    }, [])

    return (
        <>
            {isLogin ?
                <>
                <Navbar/>
                <Outlet/>
                </>
            : ""}
        </>

    )

}

export default Master
