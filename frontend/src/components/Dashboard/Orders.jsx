import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { tableCellClasses } from '@mui/material/TableCell';
import DialogChat from '../Chats/DialogChat';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from './Form';
import { useQuery } from '@apollo/client';
import { GET_REQUESTS_USER, GET_REQUESTS  } from '../../queries.js';

function createData(id, date, state, queryType, description) {
  return { id, date, state, queryType, description };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Orders({typeUser}) {
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [dataState, setDataState] = React.useState()
  const [rows, setRows] = React.useState([])


   const { data: userRequestsData, refetch: refetchUserRequests, loading: loandingUsers } = useQuery(GET_REQUESTS_USER, {
    variables: { createdBy: typeUser?.getUser?._id },
    skip: typeUser?.getUser?.role !== 'user', 
  });

  console.log(loandingUsers)
  const { data: adminRequestsData, refetch: refetchAdminRequests, loading: loandingAdmin } = useQuery(GET_REQUESTS, {
    skip: typeUser?.getUser?.role !== 'admin', 
  });

  React.useEffect(() => {
    if (userRequestsData) {
      setRows(userRequestsData.getRequestsUser || []);
    } else if (adminRequestsData) {
      setRows(adminRequestsData.getRequests || []);
    }
  }, [userRequestsData, adminRequestsData]);


  const handleClickRefetch = ()=>{
    if(userRequestsData){
     return refetchUserRequests()
    }else if (adminRequestsData){
     return refetchAdminRequests()
    }
  }

  const handleClickOpen = (id) => {
    const data = rows.filter(e => {
      if(e._id === id){
        return e
      }
    })
    setDataState(data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFrom = () => {
    setOpenCreate(false);
  };

  const handleForm = () => {
    setOpenCreate(true)
  }

  return (
    <React.Fragment>
      {rows.length > 0 && <Grid>
      {typeUser?.getUser?.role === "user"&& <Title>Mis solicitudes Solicitudes</Title>}
      {typeUser?.getUser?.role === "admin"&& <Title>Solicitudes de ayuda</Title>}
      <Table size="medium">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Tipo de consulta</StyledTableCell>
            <StyledTableCell>Usuario</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
            <StyledTableCell align="right">Estado</StyledTableCell>
            <StyledTableCell align="right">Respuesta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.queryType}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right"><Link style={{ color:`${row.state === "Activo" ? "red": "green"}`}} variant='contained'>{row.state}</Link></TableCell>
              <TableCell align="right"><Button onClick={() => handleClickOpen(row._id)} variant='contained'>{typeUser?.getUser?.role === "admin"? "Responder" : "Ver"}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid> } 
      
     {typeUser?.getUser?.role === "user" && <Grid>
        <Typography variant='h5'>{rows.length > 0 ?  " " :"Sin solicitudes"}</Typography>
        <Button variant='contained' onClick={handleForm}>Crear solisitud</Button>
        <Form   refetch={handleClickRefetch} userId={typeUser?.getUser?._id} setOpen={setOpenCreate} createData={createData} open={openCreate} handleClose={handleCloseFrom} setRows={setRows}/>
      </Grid>}
       <DialogChat _id={typeUser?.getUser?._id} userId={typeUser?.getUser?._id} rol={typeUser?.getUser?.role} open={open} data={dataState} handleClose={handleClose}/>
    </React.Fragment>
  );
}