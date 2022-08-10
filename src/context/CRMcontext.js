import React from 'react'
import { useState, createContext} from 'react'

const CMRcontext = createContext([{}, () => {}]);
const CMRprovider = props => {
    //definir el state inicial
    const [autenticar, guardarAuth ] = useState({
        token:'',
        autenticar:false,
    });
  
    return(
        <CMRcontext.Provider value={[autenticar, guardarAuth]}>
            {props.children}
        </CMRcontext.Provider>
    )

}

export { CMRcontext, CMRprovider };


