import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const NuevoProducto = () => {

  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''

  });
  //Archivo = state y guardarArchivo = setState

  const [archivo, guardarArchivo] = useState('');

  //Almacena nuevo producto en la base de datos
  const agregarProducto = async e => {
    e.preventDefault();
    //crear un formdata
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    //Almacenar en la base de datos
    try {
       const res = await clienteAxios.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     //Lanzar alerta
     if(res.status === 200){
      Swal.fire(
        'Producto creado correctamente',
        res.data.mensaje,
        'success'
      )
     }
    } catch (error) {
      console.log(error);
      //lanzar alerta de error
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Vuelve a intentarlo'
      });
    }
  }

  // Leer los datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      //Obtener una copia del state y agregar uno nuevo
      ...producto,
      [e.target.name]: e.target.value
    })

  }

  //Colaca la imagen en el state
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  }

  return (

    <>
      <h2>Nuevo Producto</h2>

      <form
        onSubmit={agregarProducto}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number"
            name="precio"
            min="0.00"
            step="0.10"
            placeholder="Precio"
            onChange={leerInformacionProducto}

          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file"
            name="imagen"
            onChange={leerArchivo}
          />
        </div>

        <div className="enviar">
          <input type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
         
        </div>
      </form>


    </>
  )
}


export default NuevoProducto;