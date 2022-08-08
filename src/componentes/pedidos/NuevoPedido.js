import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';


const NuevoPedido = () => {

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);


    //extraer el id del cliente
    const {id} = useParams();

    useEffect(() => {
        //Obtenemos el cliente
        const consultarApi = async () => {
            //Consultar cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }
        consultarApi();

        actualizarTotal()
        
    },[productos])

    const buscarProducto = async e => {

        e.preventDefault();

        //Obtener los datos del formulario
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        //Validar que existan resultados
        if(resultadoBusqueda.data[0]){

            let productoResultado = resultadoBusqueda.data[0];
            // Agregar llave producto(copia exacta de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            // Agregar llave cantidad
            productoResultado.cantidad = 0;
            // Ponerlo en el state
            guardarProductos([...productos, productoResultado]);

        }else{
            Swal.fire({
                title: 'Error',
                text: 'No se encontraron resultados',
                icon: 'error'
            })
        }
    }

    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }

    //Actualizar la cantidad de productos
    const restarProducto = (i) => {

        //Tomar una copia del arreglo original productos
       const todosProductos = [...productos];
       //validar que la cantidad no sea menor a 0
            if(todosProductos[i].cantidad === 0){
                return;
            }else{
                //Restar uno a la cantidad
                todosProductos[i].cantidad--;
                //Actualizar el state
                guardarProductos(todosProductos);
            }
    }
   
    const sumarProducto = (i) => {
       //Tomar una copia del arreglo original productos
         const todosProductos = [...productos];
            //Sumar uno a la cantidad
            todosProductos[i].cantidad++;
            //Actualizar el state
            guardarProductos(todosProductos);

    }

    //Eliminar productos del state
    const eliminarProductoPedido = id => {
       const todosProductos = productos.filter(producto => producto.producto !== id);
         guardarProductos(todosProductos);
    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        //Si el arreglo productos esta = 0 el total es 0
        if(productos.length === 0){
            guardarTotal(0);
            return;
        }
        //Calcular nuevo Total
        let nuevoTotal = 0;

        //recorrer el arreglo de productos
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //Almacenar el total
        guardarTotal(nuevoTotal);

    }

    //Almacenar el pedido en la base de datos
    const realizarPedido = async e => {
        e.preventDefault();
       // extraer el id del cliente
        
               //construir el objeto
        const pedido ={
            "cliente": id,
            "pedido": productos,
            "total": total

        }
        const resultado = await clienteAxios.post('/pedidos', pedido);

        if(resultado.status === 200){
            Swal.fire({
                title: 'Correcto',
                text: resultado.data.mensaje,
                icon: 'success'
            })
        }else{
            Swal.fire({
                title: 'Error',
                text: resultado.data.mensaje,
                icon: 'error'
            })
        }


    }


    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>

            </div>
            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}

            /> 

                <ul className="resumen">
                    {productos.map( (producto, index) => (
                        <FormCantidadProducto
                            key={producto.producto}
                            producto={producto}
                            restarProducto={restarProducto}
                            sumarProducto={sumarProducto}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}
              

                </ul>
                <p className="total">Total a Pagar: <span>$ {total} </span></p>
               { total > 0 ? (
                     <form
                        onSubmit={realizarPedido}
                    
                    >
                        <input 
                            type="submit" 
                            className="btn btn-verde" 
                            value="Realizar Pedido" />
                    </form>
                     ) : null}
                   
               
               
        </>
    )
}

export default NuevoPedido