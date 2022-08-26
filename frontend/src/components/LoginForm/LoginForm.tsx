import {Alert, Avatar, Button, Container, CssBaseline, Snackbar, TextField} from "@mui/material"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


const LoginForm = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch('https://djangodemoauth.herokuapp.com/api/auth/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        if (!res.ok) {
            setOpenAlert(true);
            return;
        }
        navigate('/')
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={openAlert} autoHideDuration={6000}
                      onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
                    Sorry, Invalid username or password Please try again.
                </Alert>
            </Snackbar>
            <CssBaseline/>
            <div style={{
                margin: "4rem 0 0 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
            >
                <Avatar sx={{margin: "0 0 1rem 0"}}></Avatar>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type='text'
                        name="username"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={handleChange}
                        label="Username"
                    />
                    <TextField
                        variant="outlined"
                        required
                        onChange={handleChange}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        sx={{"margin": "1rem 0"}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{margin: "1rem 0 0 0"}}
                    >
                        <Link to='/register'>
                            Go to register page
                        </Link>
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{margin: "1rem 0 0 0"}}
                    >
                        <Link to='/'>
                            Go to home page
                        </Link>
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default LoginForm;
