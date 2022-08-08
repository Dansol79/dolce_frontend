import React from 'react'
import { useState, useContext } from 'react'
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
//importar el contexto
import { CMRcontext } from '../../context/CRMcontext';

const Login = () => {

    const navegate = useNavigate();
    const [credenciales, guardarCredenciales] = useState({})

    //usar el contexto
    const [auth, guardarAuth] = useContext(CMRcontext);

    //almacenar lo que el usuario escribe en el formulario

    const iniciarSesion = async e => {

        e.preventDefault();
        
        // Autenticar al usuario
        try{
            const repuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            // Guardar token en localstorage
            const {token} = repuesta.data;
            localStorage.setItem('token', token);

            // Actualizar el state de auth
            guardarAuth({
                token,
                auth: true
            });

            //enviar alerta y ridireccionar
            Swal.fire('Bienvenido', 'Has iniciado sesión correctamente', 'success');

            navegate('/');

        }catch(error){
            if(error.response){
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje  
               })
            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'Ocurrió un error inesperado'  
                });

            }
        }
    }
    const leerDatos = (e) => {

        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
         
    }
    return (
        <>
            <div className='login'>
                <h2>Iniciar Sesión</h2>

                <div className='contenedor-formulario'>
                    <form
                        onSubmit={iniciarSesion}
                    >
                        <div className='campo'>
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email para Iniciar Sesión'
                                required
                                onChange={leerDatos}
                            />
                        </div>

                        <div className='campo'>
                            <label>Password</label>
                            <input
                                type='password'
                                name='password'
                                placeholder='Ingresa tu contraseña'
                                required
                                onChange={leerDatos}
                            />
                        </div>
                        <input
                            type='submit'
                            value='Iniciar Sesión'
                            className='btn btn-verde btn-block'
                        />
                    </form>


                </div>

            </div>
        </>
    )
}

export default Login