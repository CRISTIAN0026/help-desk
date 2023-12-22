import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'
import { useMutation, useQuery  } from '@apollo/client';
import { SEND_MESSAGE, GET_CONVERSATIONS_BY_REQUEST_ID } from '../../queries.js';


export default function ChatData({ dataState, userId, rol, _id}){
    const [chatMessage, setChatMessage] = React.useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const requestId = dataState[0]._id
  const [dataChat, setDataChat] = React.useState([]);
  const [id, setId] = React.useState()

  const {  data, refetch} = useQuery(GET_CONVERSATIONS_BY_REQUEST_ID, {
    variables: { requestId },
  });


  React.useEffect(() => {
    if (data && data?.getConversationsByRequestId[0]?.messages) {
      setDataChat(data?.getConversationsByRequestId[0]?.messages);
      setId(data?.getConversationsByRequestId[0]._id)
    }
    scrollToBottom();
  }, [data, dataChat]);
  
  const handleChange = (event) => {
    setChatMessage(event.target.value);
  };

  const handleChat = async () => {
    if (chatMessage.trim() !== '') {
      try {
        const { data } = await sendMessage({
          variables: {
            conversationId:id ? id : "658558a68c35",
            message:chatMessage,
            userId,
            requestId: dataState[0]._id
          },
        });

        refetch();
        setChatMessage(" ")
        console.log('Mensaje enviado:', data.sendMessage);
      } catch (error) {
        console.error('Error al enviar el mensaje:', error.message);
      }
    }else{
    alert("Campo vacio")
    }
  };

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };



    return(
      <Grid item xs={9}>
      <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
        {dataChat?.map((c) => (
          <List key={c.date}>
            <ListItem align={c.sender?._id ===  _id ? 'right' : 'left' }>
              <ListItemText
                primary={ <span
                  style={{
                    textAlign: c.sender?._id === _id ? 'right' : 'left',
                    display: 'block', 
                  }}
                >
                  {c.text}
                </span>}
                secondary={ <span
                  style={{
                    textAlign: c.sender?._id === _id ? 'right' : 'left',
                    display: 'block', 
                  }}
                >
                  {c.date}
                </span>}
                style={{
                  background: c.sender?._id ===  _id  ? '#e0f7fa' : '#b2dfdb',
                  borderRadius: '10px',
                  padding: '8px',
                }}
              />
            </ListItem>
          </List>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Divider />

      <Grid container style={{ padding: '20px', display: 'flex' }}>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            label="Envia tu mensaje"
            fullWidth
            value={chatMessage}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={2} align="right">
          <Button onClick={handleChat}>
            <Fab color="primary" aria-label="add">
              <SendIcon />
            </Fab>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}