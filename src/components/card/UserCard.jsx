import * as React from "react";
import {
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const UserCard = ({user, id, name, email, birthday, deleteUser, setEditUser, setIsEditMode, onShowModal  }) => {
  const handleDelete = () => {
    deleteUser('users',id); 
  };

  const handleEdit = () =>{
    setEditUser(user); 
    setIsEditMode(true); 
    console.log(user); 
    onShowModal();
  }

  return (
    <Box  sx={{ minWidth: 275 }}>
      <Card className="mt-4" variant="outlined">
        {" "}
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Usuario
            </Typography>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {email}
            </Typography>
            <Typography variant="body2">
              {birthday}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="error" size="small" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button size="small" onClick={handleEdit}>Editar</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default UserCard;
