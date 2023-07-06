import React from "react";
import ax from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import toast, { Toaster } from "react-hot-toast";
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
  React.useEffect(() => {
    getUsers();
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div id="administrar-usuarios">
        <h1>Lista de Usuarios</h1>
        <div className="users--container">
          {Object.keys(users).length > 0 ? (
            users.map((user) => {
              return (
                <div className="user--card" hey={user._id}>
                  <div className="user--card__info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                  </div>
                  <div className="user--card__buttons">
                    <button className="btn--edit">Editar</button>
                    <button className="btn--delete">Eliminar</button>
                  </div>
                </div>
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
