import "./App.css";
import { useState, useEffect } from "react";
import UserCard from "./components/card/UserCard";
import ButtonAppBar from "./components/ButtonNavBar/ButtonNavBar";
import CustomConsultationForm from "./components/form/UserForm";
import useCrud from "./hooks/userCrud";

function App() {
  const [editUser, setEditUser] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const urlBase = "https://users-crud.academlo.tech/";
  const [users, getUsers, createUser, deleteUser, updateUser] =
    useCrud(urlBase);

  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(true);
  };
  useEffect(() => {
    getUsers("users");
  }, []); // Se ejecuta solo una vez al montar el componente

  const resetForm = () => {
    setEditUser(null); // Limpiar el estado de editUser
    setIsEditMode(false); // Establecer isEditMode en false
  };
  return (
    <>
      <ButtonAppBar setIsEditMode={setIsEditMode} resetForm={resetForm} onShowModal={handleShowModal} />
      <CustomConsultationForm
        isEditMode={isEditMode}
        createUser={createUser}
        editUser={editUser}
        updateUser={updateUser}
        handleShowModal={handleShowModal}
        show={show} handleClose={() => setShow(false)}
      />
    <div className="container d-flex justify-content-center pt-2">
        <div className="row row-cols-1 row-cols-md-3">
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <UserCard 
                key={index}
                user={user}
                id={user.id}
                name={`${user.first_name} ${user.last_name}`}
                email={user.email}
                birthday={user.birthday}
                deleteUser={deleteUser}
                setEditUser={setEditUser}
                setIsEditMode={setIsEditMode}
                onShowModal={handleShowModal}
              />
            ))
          ) : (
            <div className="col text-center mt-4" style={{minWidth: "300px"}}>
              <p>Todavía no existe ningún usuario</p>
            </div>
          )}
        </div>
      </div>
     
    </>
  );
}

export default App;
