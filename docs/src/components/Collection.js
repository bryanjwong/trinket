import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import peb from '../images/peb_1.png';
import { Typography } from "@mui/material";
import {Button} from "@mui/material";

const useStyles = makeStyles({
  activeTrinket: {
    width: "100%",
    borderRadius: "25px"
  },

  title: {
    textAlign: "left"
  },

  fields: {
    fontWeight: "bold",
    fontSize: "medium"
  }, 
  altTrinkets: {
    width: "60%",
    borderRadius: "2.5px"
  },
  gridwrapper: {
    border: "40px solid grey",
    backgroundColor: "grey",
    borderRadius: "25px",

  }
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Collection() {
  const classes = useStyles();

  return (
    <Box display="flex" width="90vw">
      <Grid container spacing={8}>
        {/* Header Title */}
        <Grid item lg={6} >
          <Typography variant="h1" class={classes.title}>My Collection</Typography>
        </Grid>
        <Grid item lg={6}></Grid>
        {/* Active Trinket Image */}
        <Grid item lg={4}>
          <img src={peb} class={classes.activeTrinket}/>
        </Grid>
        {/* Adding the the current Trinket Description and stats */}
        <Grid item lg={2} class={classes.gridwrapper}>
          <span>&nbsp;</span>
          <Typography variant="h3">PEB</Typography>
          <span>&nbsp;</span>
          <Typography class={classes.fields}>Completed Objective:</Typography>
          <Typography>Walk 500 steps</Typography>
          <Typography class={classes.fields}>Level:</Typography>
          <Typography>50</Typography>
          <Typography class={classes.fields}>Steps Taken:</Typography>
          <Typography>5964</Typography>
          <Typography class={classes.fields}>Hikes Completed</Typography>
          <Typography>4</Typography>
        </Grid>
        {/* Alternate Trinkets */}
        <Grid item lg ={2}>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
        </Grid>
        <Grid item lg ={2}>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
        </Grid>
        <Grid item lg ={2}>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
          <span>&nbsp;</span>
          <Button variant="contained"><img src={peb} class={classes.altTrinkets} ></img></Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Collection;