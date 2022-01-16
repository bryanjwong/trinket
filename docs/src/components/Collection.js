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
    marginTop: "25px",
    height: "100%"
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
    padding: "40px",
    backgroundColor: "grey",
    borderRadius: "25px",
  },

  altTrinket: {
    width: "33%",
    borderRadius: "25px",
  },

  altTrinketPic: {
    width: "100%",
    borderRadius: "25px",
  },

  scrollbox: {
    padding: "20px",
    backgroundColor: "grey",
    borderRadius: "25px",
    flexGrow: 1,
    overflow: "auto",
    maxHeight: "60vh",
  },

  invis: {
    width: "33%",
    visibility: "hidden"
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

  function generateAltTrinkets() {
    var res = [];
    var row = [];
    for (const [id, v] of Object.entries(props.trinkets)) {
      row.push(<Button variant="contained" class={classes.altTrinket} onClick={() => props.swapActiveId(id)}
                         startIcon={<img src={peb} className={classes.altTrinketPic}/>}></Button>);
      if (row.length === 3) {
        res.push(<div className={classes.altTrinketWrapper}>{row}</div>);
        row = [];
      }
    }
    if (row) {
      while (row.length < 3) {
        row.push(<Button variant="contained" class={classes.invis}></Button>);
      }
      console.log(row);
      res.push(<div className={classes.altTrinketWrapper}>{row}</div>);
    }
    return res;
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
            {generateAltTrinkets()}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Collection;