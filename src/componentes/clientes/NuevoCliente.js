import React from 'react'
import { useState, useContext } from 'react'
import { CMRcontext } from '../../context/CRMcontext'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2';

const NuevoCliente = () => {
    const navegate = useNavigate();

    const [autenticar, guardarAuth] = useContext(CMRcontext);

    //cliente = state, guardarCliente = funcion para guardar el cliente
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })
    // leer los datos del formulario
    const actualizarState = e => {
        // almacenar lo que el usuario escriba en el state
        guardarCliente({
            //obtener una copia del state
            ...cliente, // Si no obtengo una copia me va borrando los valores anteriores
            [e.target.name]: e.target.value

        })
    }

    //Validar formulario
    const validarCliente = () => {
        // aplicar destructuring
       const {nombre, apellido, empresa, email, telefono} = cliente
         // validar que los campos no esten vacios
       let validar = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

       //retorna true o false
       return validar;

    }

    //Añade en la restApi un nuevo cliente
    const agregarCliente = e => {
        e.preventDefault();

        //enviar peticion a Axios
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                //validar si hay un error en mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error', 
                        text: 'Ese cliente ya esta registrado'                    
                    })
                  

                }else{
                    Swal.fire(
                        'El Cliente Agregado Con Exito!',
                        res.data.mensaje,
                        'success'
                      )
                }
                //redireccionar
                


                
            });
    }

    //Verificar si el usuario esta autenticado
    if (!autenticar.autenticar) {
        navegate('/iniciar-sesion');
    }
    
    return (
        <>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="nombre" 
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                           placeholder="Apellido Cliente" 
                           name="apellido" 
                           onChange={actualizarState}

                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                           placeholder="Empresa Cliente" 
                           name="empresa" 
                           onChange={actualizarState}

                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                           placeholder="Email Cliente" 
                           name="email" 
                           onChange={actualizarState}

                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                           placeholder="Teléfono Cliente" 
                           name="telefono" 
                           onChange={actualizarState}

                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                           className="btn btn-azul" 
                           value="Agregar Cliente" 
                           disabled={validarCliente()}
                    />
                </div>

            </form>


        </>
    )
}

export default  NuevoCliente