import React from 'react';
const GeneralContext = React.createContext();
function GeneralProvider (props) {
    const [dignidadesParaVotar,setDignidadesParaVotar]=React.useState([]);
    return(
        <GeneralContext.Provider value={{
            dignidadesParaVotar,
            setDignidadesParaVotar
        }}>
            {props.children}
        </GeneralContext.Provider>
    )
}export { GeneralContext,GeneralProvider }