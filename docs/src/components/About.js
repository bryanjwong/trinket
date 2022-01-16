import Grid from "@material-ui/core/Grid";
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import peb from '../images/0_2.gif';

const useStyles = makeStyles({
  wrapper: {
    padding: "20px",
    display: "flex",
  },
  background: {
    backgroundColor: "white",
    borderRadius: "60px",
    width: "100%",
    height: "70vh"
  },
  textbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: "26px",
    padding: "0px 50px 0px 50px",
  },
  pebPic: {
    width: "50%"
  }
});

function About(props) {
  const classes = useStyles();

  return (
    <container style={{width: "92%", marginTop: "50px"}}>
      <Grid container spacing={10} className={classes.root}>
        <Grid item lg={8}>
          <Paper style={{borderRadius: "60px", height: "65vh"}} className={classes.textbox}>
            <div style={{display: "flex", flexWrap: "wrap"}}>
              <img src={peb} style={{align: "left", flex: "40%"}}/>
              <div style={{flex: "60%", fontSize: "14px", paddingTop: "20px"}}>
                <Typography style={{fontWeight: "bolder", fontSize: "50px", fontFamily: "Roboto", textAlign: "left"}}>About Trinket</Typography>
                <Typography style={{fontSize: "22px", fontFamily: "Roboto", textAlign: "left"}}>
                  Trinket is a gamified hiking companion that incentivizes fitness and exploration through randomized goal-setting and collectible rewards.
                </Typography>
                <br/>
                <Typography style={{fontSize: "22px", fontFamily: "Roboto", textAlign: "left"}}>
                  Trinket has two components: a physical TrinketTracker device and the Trinket website. Bring your TrinketTracker with you on your adventures to log all your data and knock out objectives. Once you complete an objective, you are rewarded with a new Trinket. On the Trinket website, you can view your objectives and your Trinket collection.
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <Paper style={{borderRadius: "45px", height: "30vh"}} className={classes.textbox}>
            <div style={{padding: "15px"}}>
              <Typography style={{fontSize: "22px", fontFamily: "Roboto", textAlign: "left"}}>
                Trinket was created for IDEA Hacks at UCLA in January 2022 by Fred Chu, Justin Jianto, Caleb Terrill, Alanna Tran, and Bryan Wong.
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </container>
  );
}

export default About;