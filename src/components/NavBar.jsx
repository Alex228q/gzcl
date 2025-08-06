import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GZCLP Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Тренировки
        </Button>
        <Button color="inherit" component={Link} to="/progress">
          Прогресс
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
