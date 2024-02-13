import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from 'react-bootstrap/Modal';

const CustomConsultationForm = ({
  createUser,
  editUser,
  updateUser,
  isEditMode,
  show, handleClose
   
}) => {
  const formatBirthday = (birthdayObj) => {
    if (!birthdayObj) return ""; // Manejar el caso de una fecha nula o indefinida

    const year = birthdayObj["$y"];
    const month = (birthdayObj["$M"] + 1).toString().padStart(2, "0");
    const day = birthdayObj["$D"].toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(null);

  //Modal controlls

  const [showPassword, setShowPassword] = useState(false);
  //   const [startDate, setStartDate] = useState(new Date());

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBirthdayChange = (newValue) => {
    setBirthday(formatBirthday(newValue));
  };

  const handleDataUsageChange = (event) => {
    setDataUsageAuthorized(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setBirthday(null);
  };

  useEffect(() => {
    if (editUser) {
      setName(editUser.first_name || "");
      setLastName(editUser.last_name || "");
      setEmail(editUser.email || "");
      setPassword(editUser.password || " ");
      setBirthday(editUser.birthday || null);
    }
  }, [editUser]);
  useEffect(() => {
    if (isEditMode === false) {
      resetForm(); // Assuming resetForm clears form data
    }
  }, [isEditMode]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Obtener la fecha de nacimiento del usuario en el formato correcto o null si no está definida

    const userData = {
      email: email,
      password: password,
      first_name: name,
      last_name: lastName,
      birthday: birthday,
      image_url: "string", // Aquí puedes establecer una URL de imagen predeterminada si es necesario
    };
    console.log(userData);
    if (isEditMode) {
      // Modo de edición
      updateUser(editUser.id, "users", userData);
      handleClose();
    } else {
      // Modo de creación
      createUser("users", userData);
      resetForm(); 
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Editar Usuario " : "Nuevo Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <div className="row justify-content-center">
          {/* ... (los campos del formulario) */}
          <div className="col-sm-12 col-md-6 mt-3">
            <TextField
              id="name"
              label="Nombre"
              variant="outlined"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              fullWidth
            />
          </div>

          <div className="col-sm-12 col-md-6 mt-3">
            <TextField
              id="lastName"
              label="Apellidos"
              variant="outlined"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              id="email"
              label="Correo electrónico"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Cumpleaños"
                value={birthday}
                onChange={handleBirthdayChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="w-100"></div>

          <div className="w-100"></div>
          {/* Submit button */}
          <div className="col-sm-12 mt-3">
            <Button type="submit" variant="contained" fullWidth>
              {isEditMode ? "Editar este usuario" : "Agregar nuevo usuario"}
            </Button>
          </div>
        </div>
      </Container>
    </form></Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  
  );
};

export default CustomConsultationForm;
