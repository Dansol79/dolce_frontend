import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2';

const EditarCliente = () => {

    const { id } = useParams();
    //cliente = state, guardarCliente = funcion para guardar el cliente
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })

    //useEffect para cargar el cliente

    useEffect(() => {

          //Query a la API para traer un cliente en especifico
        const consultarApi = async () => {

        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        datosCliente(clienteConsulta.data)
        // guardarCliente(clienteConsulta.data.cliente)
    }
        consultarApi();
    },[id])

    // leer los datos del formulario
    const actualizarState = e => {
        // almacenar lo que el usuario escriba en el state
        datosCliente({
            //obtener una copia del state
            ...cliente, // Si no obtengo una copia me va borrando los valores anteriores
            [e.target.name]: e.target.value

        })
    }

    //Envia una peticion por axios para actualizar el cliente

    const actualizarCliente = e => {
        e.preventDefault();

        //Enviar la peticion por axios

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
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
                            'Correcto!!',
                            'El Cliente Se Actualizo Con Exito!',
                            'success'
                          )
                    }

                    //redireccionar
            })

    }

    //Validar formulario
    const validarCliente = () => {
        // aplicar destructuring
        const { nombre, apellido, empresa, email, telefono } = cliente
        // validar que los campos no esten vacios
        let validar = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        //retorna true o false
        return validar;

    }


    //Añade en la restApi un nuevo cliente

    return (
        <>
            <h2>Editar</h2>

            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}

                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}

                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}

                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>

            </form>


        </>
    )
}

export default EditarCliente