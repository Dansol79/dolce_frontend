import React from 'react'
import { useEffect, useState, useContext } from 'react'
import clienteAxios from '../../config/axios'
import DetallesPedido from './DetallesPedido'
import { useNavigate } from 'react-router-dom'
import { CMRcontext } from '../../context/CRMcontext'


const Pedidos = () => {

  const navegate = useNavigate();
  const [pedidos, guardarPedidos] = useState([]);
  const [auth, guardarAuth] = useContext(CMRcontext);


  useEffect(() => {

    if (auth.token !== '') {
    const consultarAPi = async () => {
      //Obtenemos todos los pedidos
      const resultado = await clienteAxios.get('/pedidos');
      //console.log(resultado);
      guardarPedidos(resultado.data);
    }
    consultarAPi();
    } else {
      navegate('/iniciar-sesion')
    }

  }, []);
  return (

    <>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido
            key={pedido._id}
            pedido={pedido}
          />  
        ))}

      </ul>
    </>
  )
}

export default Pedidos