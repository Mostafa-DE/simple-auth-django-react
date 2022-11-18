import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import { User } from "../../types";

type UserObj<T> = {
  user: T;
};

const Header: any = ({ user }: UserObj<User>) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await fetch(`${URL}/api/auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auth-Demo
          </Typography>
          {!user && (
            <Box>
              <Button color="inherit">
                <Link to="/register">Register</Link>
              </Button>
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
          )}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
