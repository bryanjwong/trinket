import * as React from 'react';
import { makeStyles } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../images/logo.png';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg|gif)$/));

const useStyles = makeStyles({
  bar: {
    backgroundColor: "white"
  },
  logo: {
    height: "90px"
  },
  buddy: {
    position: "relative",
    height: "150px",
    transform: "scaleX(-1)",
    top: "-20px"
  }
});

function Navbar(props) {
  const classes = useStyles();
  var active = props.trinkets[props.activeId];
  var activeImageSrc = images[active.speciesId+"_"+active.evolveLevel+".gif"];

  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <img src={logo} className={classes.logo}></img>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => props.setPageState(index)}
                sx={{ my: 5, ml: 6, color: 'black', display: 'block', fontSize: '20px' }}
              >
                {page}
              </Button>
            ))}
          </Box>    

          <img src={activeImageSrc} className={classes.buddy}></img>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;