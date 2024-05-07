import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { API_BASE_URL } from '../environment';

interface User {
    name: string;
}

const Navbar = () => {
    const auth = useAuth()
    const [user, setUser] = useState<User | null>(null);

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const token = auth.user!.access_token; 
                const res = await getCurrentUser(token);
                setUser(res);
            } catch (error) {
                console.error("couldn't fetch user: ", error)
            }
        };
        fetchUser();
    }, []);
    const navStyle = {
        display: "flex",
        width: "100%",
        background: "#333",
        color: "#fff",
        padding: "10px",
    }
    const ulStyle = {
        display: "flex",
        justifyContent: "space-between",
        listStyle: "none",
    }
    const liStyle = {
        color: "#fff",
        textDecoration: "none",
    }
    return (
        <>
        <nav style={navStyle}>
            <div className='logo'>
                <h1>Logo</h1>
            </div>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <Link to="/pages/home">Min Oversikt</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/pages/home">Ansattfordeler</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/pages/home">Mine Kontakter</Link>
                </li>
            </ul>
            <button className='temp' onClick={() => void console.log('clicked')}>{user ? user.name : 'Loading...'}</button>
        </nav>
        </>
    )
}


async function getCurrentUser(token: string) {
    const res = await fetch(API_BASE_URL + '/biz/users?action=current-session', {
        headers: { Authorization: 'Bearer ' + token }
    });

    if (res.ok) {
        const user = await res.json();
        //window.alert('Current user: ' + (user.Name || user.UserName || user.Email));
        return user;
    } else {
        console.log('Error: ' + await res.text());
    }
}

export default Navbar;