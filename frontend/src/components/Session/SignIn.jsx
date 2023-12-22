import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';


const defaultTheme = createTheme();

export default function SignInSide() {

  const { loginWithRedirect, user } = useAuth0();

console.log(user)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
                    <div
          style={{
            position: 'absolute',
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h1" fontWeight="bold" gutterBottom>
          Help desk
          </Typography>
          <Button onClick={() => loginWithRedirect()} variant='contained'>Iniciar sesión</Button>
        </div>
      </Grid>
      </Grid>
    </ThemeProvider>
  );
}