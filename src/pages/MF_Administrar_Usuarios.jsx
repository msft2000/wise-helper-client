import React from "react";
import ax from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import toast, { Toaster } from "react-hot-toast";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../sass/mf_administrar_usuarios.scss";

function AdministrarUsuarios() {
  const [users, setUsers] = React.useState([]);
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [edad, setEdad] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [modal, setModal] = React.useState(false);
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
  const registerAdmin = async () => {
    const config = {
      method: "post",
      url: "https://wise-helper-backend.onrender.com/api/v1/auth/register",
      headers: {},
      data: {
        cedula: cedula,
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        contrasenia: password,
        direccion: direccion,
        edad: edad,
        descripcion: descripcion,
        tipo: "admin",
        token_chat: "123",
      },
    };
    ax.request(config)
      .then((response) => {
        setCedula("");
        setNombre("");
        setApellidos("");
        setEmail("");
        setPassword("");
        setDireccion("");
        setEdad("");
        setDescripcion("");
        toast.success("Admin registrado");
        getUsers();
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
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
          <button type="button" onClick={()=>setModal(true)}>
            <AddCircleIcon />
          </button>
        </h1>
        {modal ? (
          <div
            id="modal-add"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Agregar Administrador
                  </h1>
                </div>
                <div className="modal-body">
                  <div className="form-container">
                    <div className="input--container">
                      <label htmlFor="cedula">Cedula</label>
                      <input
                        type="text"
                        name="cedula"
                        id="cedula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="apellidos">Apellidos</label>
                      <input
                        type="text"
                        name="apellidos"
                        id="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="direccion">Direccion</label>
                      <input
                        type="text"
                        name="direccion"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="edad">Edad</label>
                      <input
                        type="number"
                        name="edad"
                        id="edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                      />
                    </div>
                    <hr />
                    <div className="input--container">
                      <label htmlFor="descripcion">Descripcion</label>
                      <input
                        type="text"
                        name="descripcion"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => registerAdmin()}
                  >
                    Registrar Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="users--container">
          {Object.keys(users).length > 0 ? (
            users.map((user) => {
              return (
                <React.Fragment key={user._id}>
                  <div className="user--card" key={user._id}>
                    <div className="user--card__info">
                      <h3 style={user.tipo === "admin" ? { color: "red" } : {}}>
                        {user.nombre} {user.apellidos}
                      </h3>
                      <p>{user.email}</p>
                    </div>
                    <div className="user--card__buttons">
                      {/* <button className="btn--edit">Editar</button> */}
                      <button className="btn" onClick={() => deleteUser(user._id)}>
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
