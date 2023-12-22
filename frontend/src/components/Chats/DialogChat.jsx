import React from "react";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Chat from './Chat';
import Button from '@mui/material/Button'


export default function DialogChat({open, data, handleClose, rol, userId, _id}){

    return(
        <Grid>
        <Dialog open={open && data.length === 1} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Chat</DialogTitle>
        <DialogContent>
          <Chat _id={_id} data={data} rol={rol} userId={userId}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      </Grid>
    )
}