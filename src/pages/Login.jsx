import React from "react";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import styles from "../css/login2.css";
import { useNavigate } from "react-router-dom";

function ErrorMsg() {
  return (
    <>
      <p>*</p>
    </>
  );
}

function Login() {
  const navigate=useNavigate();
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  let [flag1, setFlag1] = React.useState(false);
  let [flag2, setFlag2] = React.useState(false);
  return (
    <div className="Login">
      <div className="content">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            user == "" ? setFlag1(true) : setFlag1(false);
            pass == "" ? setFlag2(true) : setFlag2(false);
          }}
          validate
        >
          <h2>Correo Electrónico</h2>
          <div>
            <MdPerson />
            <input
              type="email"
              placeholder="Ingrese su usuario"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
            />
            {flag1 && <ErrorMsg />}
          </div>
          <h2>Contraseña</h2>
          <div>
            <MdOutlineLock />
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              required
            />
            {flag2 && <ErrorMsg />}
          </div>
          <input type="submit" value="LOGIN" />
        </form>
        <h3>O registrate</h3>
        <a onClick={()=>navigate("/register")}>Registrate</a>
        <article style={{fontSize:"10px",marginTop:"20px"}}>
          <p style={{marginBottom:"5px"}} onClick={()=>navigate("/volunter")}>Ingresar como voluntario</p>
          <p onClick={()=>navigate("/adult")}>Ingresar como adulto mayor</p>
        </article>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}

export { Login };
