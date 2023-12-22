import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ChatData from "./ChatData";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Chat = ({ data, rol, userId, _id }) => {
  const [dataChat, setDataChat] = React.useState([]);
  const [state, setState] = React.useState(data[0].state)

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
          <ListItem button key="RemySharp">
    <ListItemIcon>
      <Avatar alt="Remy Sharp" />
    </ListItemIcon>
    <ListItemText style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {data[0].userId}
    </ListItemText>
  </ListItem>
          </List>
          <Divider />
          <Grid
            container
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid item xs={12} spacing={2} marginBottom="20px">
            <Box sx={{ minWidth: 120, marginBottom:"20px" }}>
      <FormControl disabled={true} fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"Activo"}>Activo</MenuItem>
          <MenuItem value={"Inactivo"}>Inactivo</MenuItem>
          <MenuItem value={"Resuelto"}>Resuelto</MenuItem>
        </Select>
      </FormControl>
    </Box>
              <TextField
                id="outlined-basic-email"
                label="Tipo de consulta"
                variant="outlined"
                fullWidth
                multiline
                value={data[0].queryType}
                disabled
                InputProps={{
                  style: { height: "auto" },
                }}
              />
            </Grid>
            <Grid item xs={12} spacing={2}>
              <TextField
                id="outlined-basic-email"
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                value={data[0].description}
                disabled
                InputProps={{
                  style: { height: "auto" }
                }}
              />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <ChatData _id={_id} rol={rol} userId={userId} dataState={data} dataChat={dataChat} setDataChat={setDataChat} />
      </Grid>
    </div>
  );
};

export default Chat;
