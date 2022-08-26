import {
    Alert,
    Avatar,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Snackbar,
    TextField
} from "@mui/material"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";


const RegisterForm = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    })

    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch('https://djangodemoauth.herokuapp.com/api/auth/register/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
            })
        })
        const data = await res.json();
        if (!res.ok) {
            data.email && setErrorMessage(data.email[0]);
            data.username && setErrorMessage(data.username[0]);
            setOpenAlert(true);
            return;
        }
        navigate('/login')
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={openAlert} autoHideDuration={6000}
                      onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
                    Sorry, {errorMessage} Please try again
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
                        type='email'
                        required
                        onChange={handleChange}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        sx={{margin: "1rem 0"}}
                    />
                    <TextField
                        variant="outlined"
                        type='text'
                        required
                        onChange={handleChange}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                    />
                    <TextField
                        variant="outlined"
                        required
                        onChange={handleChange}
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        type="text"
                        id="lastName"
                        sx={{"margin": "1rem 0"}}
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
                        sx={{"margin": "0 0 1rem 0"}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{margin: "1rem 0 0 0"}}
                    >
                        <Link to='/login'>
                            Go to login page
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

export default RegisterForm;
