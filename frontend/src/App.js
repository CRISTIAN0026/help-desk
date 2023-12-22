import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import SignIn from "./components/Session/SignIn.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, REGISTER_USER } from '../src/queries';
import { useState } from "react";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [state, setState] = useState(true)

  const email  = user?.email

  const { data } = useQuery(GET_USER, {
    variables: { email },
  });

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async () => {
    try {
      const result = await registerUser({
        variables: {
          name: user?.name ? user?.name : user?.nickname,
          email: user?.email,
          role: user?.email === "cristiancr9enri@gmail.com" ?'admin':"user",
        },
      });
      console.log(result)
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  if(user?.email && !data?.getUser && state){
    console.log("Heyyyyyyy")
    handleRegister();
    setState(false)
  }

  console.log(user)
  console.log(data)
  return (
    <div className="App">
      {user === undefined && !isLoading  && (
        <div>
          <SignIn />
        </div>
      )}
      {isAuthenticated && (
        <>
          <Dashboard />
        </>
      )}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight:"600px", alignContent:"center", alignItems:"center" }}>
          <CircularProgress sx={{ width: '100px', height: '100px' }}/>
          <Typography variant="h4">Cargando </Typography>
        </Box>
      )}
    </div>
  );
}

export default App;
