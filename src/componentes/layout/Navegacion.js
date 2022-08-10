import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CMRcontext } from '../../context/CRMcontext'


const Navegacion = () => {

    const [autenticar, guardarAuth] = useContext(CMRcontext);

    if(!autenticar.autenticar) return null;
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes">Clientes</Link>
                <Link to={"/productos"} className="productos">Productos</Link>
                <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
            </nav>
        </aside>


    )
}

export default Navegacion