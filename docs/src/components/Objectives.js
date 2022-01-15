import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import peb from '../images/peb_1.png';
import { Typography } from "@mui/material";
import {Button} from "@mui/material";
import { Card } from '@mui/material';

const useStyles = makeStyles({
  activeObjectives: {
    width: "80%",
    height: "100%",
    borderRadius: "15px",
    backgroundColor: "grey",
    border: "30px solid grey",
    flexGrow: 1,
    textAlign: "center",
  },
  testing:{
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: "30px",
    border: "60px solid grey",
    backgroundColor: "grey",
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
    <container>
        <Box display="flex" width="90vw">
            <Grid container spacing={4}>
                {/* Header Title */}
                <Grid item lg={6} >
                    <Typography variant="h1" class={classes.title}>Active Objectives</Typography>
                </Grid>
                <Grid item lg={6}></Grid>
                {/* Active Objectives */}
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
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
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper class={classes.testing}><Typography>Walk 5000 steps</Typography></Paper>
                </Grid>
            </Grid>
        </Box> 
    </container> 
  )
}

export default Collection;


