import * as React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const {getCurrentWindow} = require('electron').remote;

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndSave = () => {
        localStorage.setItem("apiKey", ""),
        localStorage.setItem("authDomain", ""),
        localStorage.setItem("projectId", "")
        getCurrentWindow().reload()
        setOpen(false);
    };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="authDomain"
            label="authDomain"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="projectId"
            label="projectId"
            type="text"
            fullWidth
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
    </div>
  );
}