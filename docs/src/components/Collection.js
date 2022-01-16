import Box from '@mui/material/Box';
import Grid from "@material-ui/core/Grid";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../images', true, /\.(png|jpe?g|svg|gif)$/));

const useStyles = makeStyles({
  collection: {
    marginTop: "25px",
    height: "100%",
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
  activeOverlay: {
    position: "absolute",
    marginLeft: "60px",
    marginTop: "40px",
    fontSize: "20px",
  },
  pin: {
    height: "20px",
  },
  activeText: {
    width: "100%"
  },
  fields: {
    textAlign: "left",
  }, 
  values: {
    textAlign: "left",
  }, 
  textbox: {
    padding: "40px",
    paddingRight: "100px",
    backgroundColor: "white",
    borderRadius: "25px",
  },
  name: {
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "700",
    marginBottom: "20px"
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

function Collection(props) {
  const classes = useStyles();
  
  var active = props.trinkets[props.activeId];
  var activeImageSrc = images[active.speciesId+"_"+active.evolveLevel+".gif"];
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
      var altImageSrc = images[v.speciesId+"_"+v.evolveLevel+".gif"];
      row.push((id === props.activeId) ? 
         <Button disableRipple variant="contained" class={classes.altTrinketActive} 
                 startIcon={<img src={altImageSrc} className={classes.altTrinketPic}/>}></Button> 
        : <Button disableRipple variant="contained" class={classes.altTrinket} onClick={() => props.swapActiveId(id)}
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
      res.push(<div className={classes.altTrinketWrapper}>{row}</div>);
    }
    return res;
  }

  return (
    <Box display="flex" width="100vw" className={classes.collection}>
      <Grid container direction="row">
        {/* Header Title */}
        <Grid item lg={6} >
          <Typography style={{paddingLeft: "20px", marginLeft: "20px", marginTop: "20px", 
                              marginBottom: "20px", textAlign: "left", fontWeight: "bold",
                              fontSize: "26px"}} className={classes.title}>My Collection</Typography>
        </Grid>
        <Grid item lg={6}></Grid>

        {/* Active Trinket Image */}
        <Grid item lg={4} className={classes.wrapper}>
          <img src={activeImageSrc} className={classes.activeTrinket}/>
          <div className={classes.activeOverlay}>
            <img src={images["pin.png"]} className={classes.pin}/><span>Active Trinket</span>
          </div>
        </Grid>
        
        {/* Adding the the current Trinket Description and stats */}
        <Grid item lg={3} className={classes.wrapper}>
          
          <Grid item className={classes.textbox}>
            <Typography variant="h3" className={classes.name}>{name}</Typography>
            <Typography style={{fontWeight: "bold", fontSize: "17px"}} className={classes.fields}>Completed Objective:</Typography>
            <Typography style={{fontWeight: "lighter", fontSize: "20px"}} className={classes.values}>{active.objName}</Typography><br />
            <Typography style={{fontWeight: "bold", fontSize: "17px"}} className={classes.fields}>Level</Typography>
            <Typography style={{fontWeight: "lighter", fontSize: "20px"}} className={classes.values}>{active.level}</Typography><br />
            <Typography style={{fontWeight: "bold", fontSize: "17px"}} className={classes.fields}>Steps Taken</Typography>
            <Typography style={{fontWeight: "lighter", fontSize: "20px"}} className={classes.values}>{active.totalSteps}</Typography><br />
            <Typography style={{fontWeight: "bold", fontSize: "17px"}} className={classes.fields}>Time Adventuring</Typography>
            <Typography style={{fontWeight: "lighter", fontSize: "20px"}} className={classes.values}>{active.totalDuration}</Typography><br />
            <Typography style={{fontWeight: "bold", fontSize: "17px"}} className={classes.fields}>Adventures Completed</Typography>
            <Typography style={{fontWeight: "lighter", fontSize: "20px"}} className={classes.values}>{active.totalTrips}</Typography>
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