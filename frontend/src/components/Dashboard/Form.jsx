import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { FormControl } from '@mui/material';
import { CREATE_REQUEST } from '../../queries.js'
import { useMutation } from '@apollo/client';

const defaultTheme = createTheme();

export default function Form({open, handleClose, setOpen, setRows, userId, refetch}) {

  const [formValues, setFormValues] = React.useState({
    queryType: '',
    description: '',
  });
  const [createRequest] = useMutation(CREATE_REQUEST);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (formValues.queryType.trim() === '' || formValues.description.trim() === '') {
      alert('Campos obligatorios no completados');
    } else {
      const state = "Activo"
      const { queryType, description } = formValues
      let  date = new Date()
      const mount = date.getMonth() + 1; 
      const day = date.getDate();
      const year = date.getFullYear();

      date = `${day}/${mount}/${year}`
      const handleCreateRequest = async () => {
        try {
          const { data } = await createRequest({
            variables: { date, state, queryType, description, userId },
          });
    
          refetch();
          console.log('Solicitud creada exitosamente', data.createRequest);
        } catch (error) {
          console.error(error.message);
        }
      };
      handleCreateRequest()
      handleClose()  
      alert('Campos llenos. Realizar acción de envío...');

    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:"20px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CircleNotificationsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear una nueva solicitud
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitForm} sx={{ mt: 3 }}>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="queryType"
              required
              fullWidth
              id="queryType"
              label="Tipo de consulta"
              autoFocus
              value={formValues.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Descripción"
              name="description"
              autoComplete="family-name"
              multiline
              rows={4}
              variant="outlined"
              style={{ fontSize: '16px' }}
              value={formValues.lastName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear
        </Button>
      </FormControl>
    </Box>
        </Box>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}