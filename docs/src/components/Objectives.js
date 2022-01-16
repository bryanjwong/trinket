import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import { Typography } from "@mui/material";
import {Button} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const useStyles = makeStyles({
    root: {
        padding: "10px 50px",
        flexGrow:"1"
    },
    activeObjectives: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "middle",
        height: "35vh",
        borderRadius: "30px",
        fontFamily: "Roboto",
        fontSize: "26px",
        padding: "0px 50px 0px 50px",
        // maxWidth: "250px"
    },
    completedObjectives: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "middle",
        height: "12vh",
        borderRadius: "30px",
        fontFamily: "Roboto",
        fontSize: "100%",
        padding: "0px 50px 0px 50px",
        // maxWidth: "300px"
    },
    title: {
        textAlign: "left",
        padding: "25px 30px",
        fontSize: "17px",
        fontWeight: "bold"
    },
    button: {
        display: "flex",
        justifyContent: "right",
        padding: "0px 60px",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "center",
    },
    scrollbox: {
        borderRadius: "25px",
        flexGrow: 1,
        overflow: "auto",
        maxHeight: "70vh",
    }
});

function timeToString(time) {
    var d = new Date(time);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return mo+" "+da+", "+ye;
}

function Collection(props) {
  const classes = useStyles();
  var obj = props.objectives;

  function generateComplObjectives() {
      var res = [];
      for (const [id, v] of Object.entries(props.complObjectives)) {
          res.push(
          <Grid item lg={4} >
            <Paper style={{borderRadius: "20px"}} className={classes.completedObjectives}>
                <div>
                    <p style={{fontWeight: "bold", fontSize: "22px"}}>{v.name}</p>
                    <p style={{marginTop: "-20px"}}>{timeToString(v.completion_time)}</p>
                </div>
                
            </Paper>
          </Grid>)
      }
      return res;
  }

  return (
    <container style={{width: "90%"}}>
        <Grid container>
            <Grid item lg = {6}>
                <Typography style={{fontSize: "26px", fontWeight: "bold"}} className={classes.title}>Active Objectives</Typography>
            </Grid>
            <Grid item lg = {6} className={classes.button}>
                <Button style={{background: "#73D4FF", borderRadius: "20px", color: "black"}} variant="contained">Shuffle</Button>
            </Grid>
        </Grid>

        <Grid container spacing={10} className={classes.root}>
            <Grid item lg={4} >
                <Paper style={{borderRadius: "30px"}} className={classes.activeObjectives}>{obj.obj1.name}</Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper style={{borderRadius: "30px"}} className={classes.activeObjectives}>{obj.obj2.name}</Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper style={{borderRadius: "30px"}} className={classes.activeObjectives}>{obj.obj3.name}</Paper>
            </Grid>
        </Grid>

        <Typography style={{fontSize: "26px", fontWeight: "bold"}} className={classes.title}>Completed Objectives</Typography>
        <Grid container spacing={3} className={classes.scrollbox}>
            {generateComplObjectives()}
        </Grid>
    </container> 
  )
}

export default Collection;
