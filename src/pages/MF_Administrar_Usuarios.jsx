import React from "react";
import ax from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import toast, { Toaster } from "react-hot-toast";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../sass/mf_administrar_usuarios.scss";

function AdministrarUsuarios() {
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://wise-helper-backend.onrender.com/api/v1/auth/all",
      headers: {},
      data: "",
    };
    ax.request(config)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        toast.error("Error al obtener los usuarios");
      });
  };
  const deleteUser = async (id) => {
    const config = {
      method: "delete",
      url: `https://wise-helper-backend.onrender.com/api/v1/auth/delete/${id}`,
      headers: {},
      data: "",
    };
    ax.request(config)
      .then((response) => {
        toast.success("Usuario eliminado");
        getUsers();
      })
      .catch((error) => {
        toast.error("Error al eliminar el usuario");
      });
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div id="administrar-usuarios">
        <h1>
          Lista de Usuarios
          <button type="button" data-bs-toggle="modal" data-bs-target="#modal-add">
            <AddCircleIcon />
          </button>
        </h1>
        <div
          className="modal fade"
          id="modal-add"
          tabIndex="100"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Agregar Administrador
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-container">
                  <div className="input--container">
                    <label htmlFor="cedula">Cedula</label>
                    <input type="text" name="cedula" id="cedula" />
                  </div>
                  <div className="input--container">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" />
                  </div>
                  <div className="input--container">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" name="apellidos" id="apellidos" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="users--container">
          {Object.keys(users).length > 0 ? (
            users.map((user) => {
              return (
                <React.Fragment key={user._id}>
                  <div className="user--card" key={user._id}>
                    <div className="user--card__info">
                      <h3>
                        {user.nombre} {user.apellidos}
                      </h3>
                      <p>{user.email}</p>
                    </div>
                    <div className="user--card__buttons">
                      {/* <button className="btn--edit">Editar</button> */}
                      <button
                        className="btn--delete"
                        onClick={() => deleteUser(user._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              );
            })
          ) : (
            <div className="user--card">
              <div className="user--card__info">
                <h2>No hay usuarios</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export { AdministrarUsuarios };
