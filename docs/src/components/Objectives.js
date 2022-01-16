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
        height: "25vh",
        borderRadius: "30px",
        fontFamily: "Roboto",
        fontSize: "100%",
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
    },
    button: {
        display: "flex",
        justifyContent: "right",
        padding: "0px 60px",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "center",
    }
});

function Collection() {
  const classes = useStyles();

  return (
    <container>
        <Grid container>
            <Grid item lg = {6}>
                <Typography variant="h2" className={classes.title}>Active Objectives</Typography>
            </Grid>
            <Grid item lg = {6} className={classes.button}>
                <Button variant="contained">Shuffle</Button>
            </Grid>
        </Grid>

        <Grid container spacing={6} className={classes.root}>
            <Grid item lg={3} >
                <Paper className={classes.activeObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.activeObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.activeObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.activeObjectives}>Walk 5000 Steps</Paper>
            </Grid>
        </Grid>
        <Typography variant="h2" className={classes.title}>Completed Objectives</Typography>
        <Grid container spacing={2} className={classes.root}>
            <Grid item lg={3} >
                <Paper className={classes.completedObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.completedObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.completedObjectives}>Walk 5000 Steps</Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper className={classes.completedObjectives}>Walk 5000 Steps</Paper>
            </Grid>
        </Grid>
    </container> 
  )
}

export default Collection;




