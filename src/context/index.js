import React from "react";
const GeneralContext = React.createContext();
function GeneralProvider(props) {
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
        setTarea
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
}
export { GeneralContext, GeneralProvider };
