import React, {useEffect, useState} from "react";
import Header from "../Header";

interface User {
    created: string;
    email: string;
    id: number;
    is_active: boolean;
    updated: string;
    username: string;
}

function Home() {
    const [user, setUser] = useState<User>();
    const fetchUser = async () => {
        const res = await fetch('https://djangodemoauth.herokuapp.com/api/auth/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (!res.ok) console.log("Oops, something went wrong!!");
        if (res.ok) setUser(data);
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <>
            <Header user={user}/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <h1>Welcome in Auth-Demo</h1>
                <p>
                    This demo auth made via Django {"{drf, Knox}"}, feel free to clone this project and add your custom
                    authentication
                </p>
                <h2>{!user && 'You are not logged in yet, login now to see your info...'}</h2>

                {user && (
                    <>
                        <h2>Your Details:-</h2>
                        <ul style={{listStyle: "none", fontSize: "1.5rem"}}>
                            <li><b>User Name:</b> {user.username}</li>
                            <li><b>Email Address:</b> {user.email}</li>
                            <li><b>Account Status:</b> {user.is_active && 'Active'}</li>
                            <li><b>Created date:</b> {user.created}</li>
                        </ul>
                    </>
                )}

                <h3 style={{margin: "8rem 0 0 0", backgroundColor: "#333", color: "#fafafa", padding: "1rem"}}>
                    Please note that this app is for demo purposes, please don't register with sensitive info :)
                </h3>
            </div>
        </>
    )
}

export default Home
