import React from "react";
const GeneralContext = React.createContext();
function GeneralProvider(props) {
  const [usuario, setUsuario] = React.useState(
    localStorage.getItem("usuario")
      ? JSON.parse(localStorage.getItem("usuario"))
      : {}
  );
  const [usuarioLogeado, setUsuarioLogeado] = React.useState(
    Object.keys(usuario).length !== 0
  );
  const validarLogeado = () => {
    if (localStorage.getItem("usuario")) {
      setUsuario(JSON.parse(localStorage.getItem("usuario")));
    } else {
      setUsuario({});
    }
  };
  const [tarea, setTarea] = React.useState(null);
  const [selectedIdx, setSelectedIdx] = React.useState(null);
  const [tareasDisplay, setTareasDisplay] = React.useState("flex");
  const [detalleDisplay, setDetalleDisplay] = React.useState("none");
  const [open, setOpen] = React.useState(false);
  const [refPanel, setRefPanel] = React.useState(React.useRef(null));
  return (
    <GeneralContext.Provider
      value={{
        refPanel,
        setRefPanel,
        open,
        setOpen,
        detalleDisplay,
        setDetalleDisplay,
        tareasDisplay,
        setTareasDisplay,
        selectedIdx,
        setSelectedIdx,
        tarea,
        setTarea,
        usuario,
        setUsuario,
        usuarioLogeado,
        setUsuarioLogeado,
        validarLogeado,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
}
export { GeneralContext, GeneralProvider };
