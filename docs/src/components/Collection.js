import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import { Typography } from "@mui/material";
import {Button} from "@mui/material";
import peb from '../images/0_1.png'

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg|gif)$/));

const useStyles = makeStyles({
  title: {
    paddingLeft: "20px",
    marginLeft: "20px",
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "700"
  },

  collection: {
    marginTop: "25px",
    height: "100%"
  },

  wrapper: {
    padding: "20px",
    display: "flex"
  },
  activeTrinket: {
    marginLeft: "20px",
    width: "100%",
    borderRadius: "25px",
  },

  activeText: {
    width: "100%",
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
    backgroundColor: "white",
    borderRadius: "25px",
  },
  name: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "700"
  },

  altTrinket: {
    width: "33%",
    padding: "25px",
    backgroundColor: "transparent",
    border: 0,
  },

  altTrinketActive: {
    width: "33%",
    padding: "25px",
    backgroundColor: "#73D4FF",
    borderRadius: "25px",
    border: 0
  },

  altTrinketPic: {
    width: "100%",
    borderRadius: "10px",
  },

  scrollbox: {
    alignContent: "right",
    marginRight: "20px",
    backgroundColor: "#DCEFCA",
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
  var activeImageSrc = images[active.speciesId+"_"+active.evolveLevel+".gif"];
  console.log(active.speciesId+"_"+active.evolveLevel+".gif");
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
      var altImageSrc = images[v.speciesId+"_"+v.evolveLevel+".png"];
      row.push((id === props.activeId) ? 
         <Button variant="contained" class={classes.altTrinketActive}
                 startIcon={<img src={altImageSrc} className={classes.altTrinketPic}/>}></Button> 
        : <Button variant="contained" class={classes.altTrinket} onClick={() => props.swapActiveId(id)}
                  startIcon={<img src={altImageSrc} className={classes.altTrinketPic}/>}></Button>);
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
          <img src={activeImageSrc} className={classes.activeTrinket}/>
        </Grid>
        
        {/* Adding the the current Trinket Description and stats */}
        <Grid item lg={3} className={classes.wrapper}>
          
          <Grid item className={classes.textbox}>
            <Typography variant="h3" className={classes.name}>{name}</Typography>
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