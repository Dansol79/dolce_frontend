import React from 'react'
import { useState } from 'react'

const CMRcontext = React.createContext([{}, () => {}]);
const CMRprovider = props => {
    //definir el state inicial
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false,
    });

    return(
        <CMRcontext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CMRcontext.Provider>
    )

}

export { CMRcontext, CMRprovider };


