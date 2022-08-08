import React from 'react'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

const EditarProducto = () => {

  //Obtener el id del producto
  const { id } = useParams();

  //State para editar producto

  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''

  });
  const [archivo, guardarArchivo] = useState('');



  //Cuanod carga el componente, va a ejecutar la funcion
  useEffect(() => {
    //Consultar la api para obtener un producto en especifico
    const consultarApi = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      guardarProducto(productoConsulta.data);
    }
    consultarApi();
  }, [id]);

  const editarProducto = async e => {
    e.preventDefault();
        //crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);
    
        //Almacenar en la base de datos
        try {
           const res = await clienteAxios.put(`/productos/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
         //Lanzar alerta
         if(res.status === 200){
          Swal.fire(
            'Editado correctamente',
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

  //Extraer los valores del state
  const { nombre, precio, imagen } = producto;

  if(!nombre) return <Spinner />


  return (

    <>
    <h2>Editar Producto</h2>

    <form
        onSubmit={editarProducto}
    >
      <legend>Llena todos los campos</legend>

      <div className="campo">
        <label>Nombre:</label>
        <input type="text"
          placeholder="Nombre Producto"
          name="nombre"
          onChange={leerInformacionProducto}
          defaultValue={nombre}
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
          defaultValue={precio}
        />
      </div>

      <div className="campo">
        <label>Imagen:</label>
        {imagen ? (
          <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt={nombre}  width="200" />
        ) : null}
        <input type="file"
          name="imagen"
          onChange={leerArchivo}
          
         
        />
      </div>

      <div className="enviar">
        <input type="submit"
          className="btn btn-azul"
          value="Editar Producto"
        />
       
      </div>
    </form>


  </>

  )
}

export default EditarProducto;