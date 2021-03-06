import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import TopBar from './TopBar/TopBar';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from 'react-router-dom';
import FirestorePage from '../pages/FirestorePage/FirestorePage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import SettingsDialog from './SettingsDialog/SettingsDialog';
import BottomBar from './BottomBar/BottomBar';

const theme = createMuiTheme({
    palette: {
        primary: orange
    }
});

const Application = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar />
        <SettingsDialog/>
        <FirestorePage/>
        <BottomBar/>
    </ThemeProvider>

);

export default hot(Application);
