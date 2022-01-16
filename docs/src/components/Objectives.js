import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import peb from '../images/peb_1.png';
import { Typography } from "@mui/material";
import {Button} from "@mui/material";
import { Card } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyContent: "center",
    color: theme.palette.text.secondary,
  }));

const useStyles = makeStyles({
    root: {
        padding: "10px 60px",
        height: "100vh",
        flexGrow:"1"
    },
    activeObjectives: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: "30px",
        border: "60px solid white",
        backgroundColor: "white",
    },
    completedObjectives: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: "30px",
        border: "40px solid white",
        backgroundColor: "white",
    },
    button: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: "30px",
        justifyContent: "center",
        backgroundColor: "#73D4FF",
        borderRadius: "15px"
    },
    title: {
        textAlign: "left"
    },
    testing: {
        alignContent: 'center',
    }
});

function Collection() {
  const classes = useStyles();

  return (
    <container>
        <Grid class={classes.root}>
            <Grid container>
                {/* Header Title */}
                <Grid item lg={6}>
                    <Typography variant="h1" class={classes.title}>Active Objectives</Typography>
                </Grid>
                <Grid item lg={4}></Grid>
                <Grid item lg={2}>
                    <Button variant="contained" class={classes.testing}>Shuffle</Button>
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                {/* Active Objectives */}
                <Grid item lg={4} s={12}>
                    <Paper class={classes.activeObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4} s={12}>
                    <Paper class={classes.activeObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4} s={12}>
                    <Paper class={classes.activeObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={12}></Grid>
                <Grid item lg={12}></Grid>
                <Grid item lg={12}></Grid>
                <Grid item lg={12}></Grid>
                {/* Completed Objectives Title */}
                <Grid item lg={6}>
                    <Typography variant="h1" class={classes.title}>Completed Objectives</Typography>
                </Grid>
                <Grid item lg={6}></Grid>
                {/* Completed Objectives */}
                <Grid item lg={4} s={12}>
                    <Paper class={classes.completedObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4} s={12}>
                    <Paper class={classes.completedObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4} s={12}>
                    <Paper class={classes.completedObjectives}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
            </Grid>
        </Grid> 
    </container> 
  )
}

export default Collection;


