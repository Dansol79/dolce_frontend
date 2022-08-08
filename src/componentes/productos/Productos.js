import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import { CMRcontext } from '../../context/CRMcontext'

import Producto from './Producto'

const Productos = () => {
  const navegate = useNavigate();

  const [auth, guardarAuth] = useContext(CMRcontext);

  //Productos = al state, guardarProductos = a la funcion para guaradar el state
  const [productos, guardarProductos] = useState([])

  // UseEffect para consultar la API
  useEffect(() => {
    // Consultar la API  = query a la api
    if (auth.token !== '') {
      const consultarApi = async () => {

        try {
          const productosConsulta = await clienteAxios.get('/productos', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
            });
          guardarProductos(productosConsulta.data)
        } catch (error) {
          if (error.response.status === 500) {
            navegate('/iniciar-sesion')
          }
        }
      }

      // Llamado api
      consultarApi()
    } else {
      navegate('/iniciar-sesion')

    }
  }, [productos])

  if(!auth.auth){
    navegate('/iniciar-sesion');
  }

  //Spinner de carga
  if (!productos.length) return <Spinner />


  return (

    <>
      <h2>Producto</h2>
      <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map(producto => (
          <Producto
            key={producto._id}
            producto={producto}
          />
        ))}
      </ul>


    </>
  )
}

export default Productos