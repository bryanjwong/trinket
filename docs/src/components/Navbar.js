import * as React from 'react';
import { makeStyles } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../images/logo.png';

const useStyles = makeStyles({
  logo: {
    height: "40px"
  }
});

function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <img src={logo} className={classes.logo}></img>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => props.setPageState(index)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>    

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;