import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import peb from '../images/peb_1.png';
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  activeTrinket: {
    width: "100%",
    borderRadius: "25px"
  },

  title: {
    textAlign: "left"
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
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <Typography variant="h1" class={classes.title}>My Collection</Typography>
        </Grid>
        <Grid item lg={6}></Grid>

        <Grid item lg={4}>
          <img src={peb} class={classes.activeTrinket}/>
        </Grid>
        <Grid item lg={8}>
          <Item>Hello</Item>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Collection;