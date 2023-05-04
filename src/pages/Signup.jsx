/* eslint-disable no-unused-vars */
import React from "react";
import "../css/signup2.css";
import img3 from "../assets/img/img3.png";
import img4 from "../assets/img/img4.png";
import Alert from '@mui/material/Alert';
import {isValidDNI} from "ec-dni-validator"

function Signup() {
    const [flag1,setFlag1] = React.useState(true);
    const [flag2,setFlag2] = React.useState(false);
    const [pass,setPass]=React.useState("");
    const [id,setID]=React.useState("");
    const [flag3,setFlag3]=React.useState(false);
    const refForm=React.useRef(0);
  return (

    <div className="Signup">
      {flag3 && pass.length<8 ? <Alert severity="error">La contraseña debe tener como mínimo 8 caracteres.</Alert>: <></>}
      {flag3 && isValidDNI(id)===false ? <Alert severity="error">La cedula no es válida.</Alert>: <></>}
  
      <div className="container"> 
        <div className="form">
          <h1>Sign Up</h1>
          <form onSubmit={(e)=>{e.preventDefault();setFlag3(!flag3);} } validate>
            <div>
              <input type="text" placeholder="Nombres*" required/>
              <input type="text" placeholder="Apellidos*" required/>
            </div>
            <input type="email" placeholder="Correo Electrónico*" required/>
            <input type="text" placeholder="Cédula*" required onChange={(e)=>{setID(e.target.value)}}/>
            <input type="password" placeholder="Crea una Contraseña*" required onChange={(e)=>{setPass(e.target.value)}}/>
            <h2>La contraseña debe tener mínimo 8 caracteres</h2>
            <div className="btnUser">
              <p className={flag1 ? "selected":""} onClick={() =>{setFlag1(true); setFlag2(false);}}>Voluntario</p>
              <p>O</p>
              <p className={flag2 ? "selected":""} onClick={() =>{setFlag2(true); setFlag1(false);}}>Usuario</p>
            </div>
            <input type="submit" value="Sign Up" />
          </form>
          <footer style={{marginTop:"60px"}}>Realizado por Renato Berrezueta</footer>
        </div>
        <div className="photos">
          <div class="elipse1">
            <img src={img4} alt="" />
          </div>
          <div class="elipse2">
            <img src={img3} alt="" />
          </div>
        </div>
  
      </div>
      
    </div>
  );
}

export { Signup };
