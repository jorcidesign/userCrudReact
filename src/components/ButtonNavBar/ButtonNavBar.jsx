import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function ButtonAppBar({ setIsEditMode,  resetForm, onShowModal }) {

  const handleCreateUser = () => {
    setIsEditMode(false); // Establecer el modo de edición en false
    resetForm();
    onShowModal(); 
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Usuarios
          </Typography>
          <Button data-toggle="modal" color="inherit" onClick={handleCreateUser}>
            <AddIcon sx={{ mr: 1 }} />
            Crear Nuevo Usuario
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
