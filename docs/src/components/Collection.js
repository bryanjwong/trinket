import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import peb from '../images/peb_1.png';
import { Typography } from "@mui/material";
import {Button} from "@mui/material";

const useStyles = makeStyles({
  collection: {
    marginTop: "25px"
  },

  wrapper: {
    padding: "20px",
    display: "flex"
  },
  activeTrinket: {
    width: "100%",
    borderRadius: "25px",
  },

  activeText: {
    width: "100%",
  },

  title: {
    textAlign: "left"
  },

  fields: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "medium"
  }, 
  values: {
    textAlign: "left",
    fontWeight: "normal",
    fontSize: "medium"
  }, 

  textbox: {
    padding: "20px",
    border: "40px solid grey",
    backgroundColor: "grey",
    borderRadius: "25px",
  },

  altTrinkets: {
    padding: "20px",
    border: "40px solid grey",
    backgroundColor: "grey",
    borderRadius: "25px",
    width: "100%"
  },

  scrollbox: {
    padding: "20px",
    border: "40px solid grey",
    backgroundColor: "grey",
    borderRadius: "25px",
    flexGrow: 1,
    overflow: "auto",
    maxHeight: "60vh",
  }

});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Collection(props) {
  const classes = useStyles();
  
  var active = props.trinkets[props.activeId];
  var name;
  switch(active.evolveLevel) {
    case 1:
      name = active.name1;
      break;
    case 2:
      name = active.name2;
      break;
    case 3:
      name = active.name3;
      break;
    default:
      name = "?";
  }

  return (
    <Box display="flex" width="100vw" className={classes.collection}>
      <Grid container direction="row">
        {/* Header Title */}
        <Grid item lg={6} >
          <Typography variant="h1" className={classes.title}>My Collection</Typography>
        </Grid>
        <Grid item lg={6}></Grid>

        {/* Active Trinket Image */}
        <Grid item lg={4} className={classes.wrapper}>
          <img src={peb} className={classes.activeTrinket}/>
        </Grid>
        {/* Adding the the current Trinket Description and stats */}
        <Grid item lg={3} className={classes.wrapper}>
          
          <Grid item className={classes.textbox}>
            <Typography variant="h3" className={classes.title}>{name}</Typography>
            <Typography className={classes.fields}>Completed Objective:</Typography>
            <Typography className={classes.values}>{active.objName}</Typography><br />
            <Typography className={classes.fields}>Level:</Typography>
            <Typography className={classes.values}>{active.level}</Typography><br />
            <Typography className={classes.fields}>Steps Taken:</Typography>
            <Typography className={classes.values}>{active.totalSteps}</Typography><br />
            <Typography className={classes.fields}>Time Adventuring:</Typography>
            <Typography className={classes.values}>{active.totalDuration}</Typography><br />
            <Typography className={classes.fields}>Adventures Completed</Typography>
            <Typography className={classes.values}>{active.totalTrips}</Typography>
          </Grid>
        </Grid>
        {/* Alternate Trinkets */}
        <Grid item lg={5} className={classes.wrapper}>
          <Grid item className={classes.scrollbox}>  
          <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>end line</h1></Grid>
        </Grid>
        {/* <Grid item lg ={2}>
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
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Collection;