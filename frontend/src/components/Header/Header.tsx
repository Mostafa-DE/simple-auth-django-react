import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";

export default function Header({user}: any): JSX.Element {
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await fetch('https://djangodemoauth.herokuapp.com/api/auth/logout/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.ok) navigate('/login');
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Auth-Demo
                    </Typography>
                    {!user && (
                        <Box>
                            <Button color="inherit"><Link to='/register'>Register</Link></Button>
                            <Button color="inherit"><Link to='/login'>Login</Link></Button>
                        </Box>
                    )}
                    {user && (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
