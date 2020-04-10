import * as React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { view } from '@risingstack/react-easy-state';
import { AppStore } from '../../store/AppStore';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useEffect } from 'react';
const { getCurrentWindow } = require('electron').remote;

function SettingsDialog() {
    const isDark = AppStore.editorColor;
    let darkEditorInit;
    if (isDark === 'dark') {
        darkEditorInit = true
    } else {
        darkEditorInit = false
    }
    const [state, setState] = React.useState({
        open: AppStore.showSettingsDialog,
        apiKey: AppStore.apiKey,
        authDomain: AppStore.authDomain,
        projectId: AppStore.projectId,
        darkEditor: darkEditorInit
    });


    const handleClose = () => {
        AppStore.showSettingsDialog = false;
        setState({ ...state, open: AppStore.showSettingsDialog });
    };

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log(id)
        setState({ ...state, [id]: value });
    }

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleCloseAndSave = () => {
        console.log(state);
        if (state.apiKey && state.authDomain && state.projectId) {
            localStorage.setItem("apiKey", state.apiKey),
                localStorage.setItem("authDomain", state.authDomain),
                localStorage.setItem("projectId", state.projectId)
            if (!state.darkEditor) {
                localStorage.setItem("light", "true")
            } else {
                if (localStorage.getItem("light")) {
                    localStorage.removeItem("light")
                }
            }
            setState({ ...state, open: AppStore.showSettingsDialog });
            getCurrentWindow().reload()
        }
    };


    return (
        <Dialog open={AppStore.showSettingsDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This settings are saved locally after save the app will be reload
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="apiKey"
                    label="apiKey"
                    type="text"
                    fullWidth
                    value={AppStore.apiKey}
                    onChange={changeValue}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="authDomain"
                    label="authDomain"
                    type="text"
                    fullWidth
                    value={AppStore.authDomain}
                    onChange={changeValue}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="projectId"
                    label="projectId"
                    type="text"
                    fullWidth
                    value={AppStore.projectId}
                    onChange={changeValue}
                />
                <FormControlLabel
                    control={<Switch checked={state.darkEditor} onChange={handleThemeChange} name="darkEditor" />}
                    label="Dark Editor"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleCloseAndSave} color="primary">
                    Save
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default view(SettingsDialog);