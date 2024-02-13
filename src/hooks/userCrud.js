import axios from "axios";
import { useState } from "react";

const useCrud = (urlBase) => {
  const [apiData, setApiData] = useState();

  // Método GET para obtener datos
  const getApi = (path) => {
    axios
      .get(`${urlBase}${path}/`)
      .then((res) => setApiData(res.data))
      .catch((err) => console.log(err));
  };

  // Método POST para crear datos
  const postApi = (path, data) => {
    axios
      .post(`${urlBase}${path}/`, data)
      .then((res) => {
        setApiData([...apiData, res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Método DELETE para eliminar datos
  const deleteApi = (path, id) => {
    axios
      .delete(`${urlBase}${path}/${id}/`)
      .then(() => {
        const updatedData = apiData.filter((item) => item.id !== id);
        setApiData(updatedData);
        console.log(`Usuario con id ${id} eliminado.`);
      })
      .catch((err) => console.log(err));
  };

  // Método PATCH para actualizar datos
  const updateApi = (id, path, newData) => {
    axios
      .patch(`${urlBase}${path}/${id}/`, newData)
      .then((res) => {
        const updatedData = apiData.map((item) => {
          if (item.id === id) {
            return res.data;
          }
          return item;
        });
        setApiData(updatedData);
        console.log(`Usuario con id ${id} actualizado.`);
      })
      .catch((err) => console.log(err));
  };

  return [apiData, getApi, postApi, deleteApi, updateApi];
};

export default useCrud;
