import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CMRcontext } from '../../context/CRMcontext'

const Header = () => {

    const navegate = useNavigate();
    const [auth, guardarAuth] = useContext(CMRcontext);

    const cerrarSesion = () => {
        //auth.auth = false el token se borra 
        guardarAuth({
            token: '',
            auth: false,
        });
        localStorage.setItem('token', '');
        
        //redireccionar a iniciar sesion
        navegate('/iniciar-sesion');
    }
    return (
        <>
            <header className="barra">
                <div className="contenedor">
                    <div className='contenido-barra'>
                        <h1>Dolce Ragaza - Administrador de Clientes</h1>

                        {auth.auth ? (
                            <button 
                                className='btn btn-rojo' 
                                type='button'
                                onClick={cerrarSesion}
                            >
                                <i className='far fa-times-circle '></i>
                                Cerrar Sesion
                            </button>


                        ) : null}


                    </div>
                </div>
            </header>
        </>
    )
}

export default Header