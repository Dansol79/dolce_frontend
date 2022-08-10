import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//Importar clienteAxios
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import Spinner from '../layout/Spinner'

//importar el contexto
import { CMRcontext } from '../../context/CRMcontext'


const Clientes = () => {

  const navegate = useNavigate()

  const [clientes, guardarClientes] = useState([])

  //usar el contexto
  const [autenticar, guardarAuth] = useContext(CMRcontext);
 
  //Query a la API o consulta a la API

  useEffect(() => {
    if (autenticar.token !== '') {
      const consultarAPI = async () => {
        try {
          //Consultar la API
          const clientesConsulta = await clienteAxios.get('/clientes', {
            headers: {
              Authorization: `Bearer ${autenticar.token}`
            }
          })
          // console.log(consultaClientes.data)

          //Guardar el resultado en el state
          guardarClientes(clientesConsulta.data)

        } catch (error) {
          if (error.response.status === 500) {
            navegate('/iniciar-sesion')
          }
        }

      }
      consultarAPI();
    } else {
      navegate('/iniciar-sesion');
    }

  }, []);

  if(!autenticar.autenticar){
    navegate('/iniciar-sesion');
  }

  if (!clientes.length) return <Spinner />


  return (
    <>
      <h1>Clientes</h1>


      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className='listado-clientes'>

        {clientes.map(cliente => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}

      </ul>
    </>
  )
}

export default Clientes