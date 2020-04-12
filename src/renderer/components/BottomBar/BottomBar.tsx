import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppStore } from '../../store/AppStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    firetitle: {
        flexGrow: 1,
    }
  }),
);

export default function BottomBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{minHeight:"0px"}}>
          <Typography variant="caption" color="inherit" className={classes.firetitle}>
            Firebase Version: {AppStore.firebaseVersion}
          </Typography>
          <Typography variant="caption" color="inherit">
            App Version: {AppStore.appVersion}-beta
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}