import React from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";

//Componentes
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";

import Productos from "./componentes/productos/Productos";
import EditarProducto from "./componentes/productos/EditarProducto";
import NuevoProducto from "./componentes/productos/NuevoProducto";


import Pedidos from "./componentes/pedidos/Pedidos";
import NuevoPedido from "./componentes/pedidos/NuevoPedido";

import Login from "./componentes/auth/Login";

import {CMRcontext, CMRprovider} from './context/CRMcontext'



function App() {

  //Utilizar el contexto de CRMcontext.js

  const [autenticar, guardarAuth] = useContext(CMRcontext);
  return (

    <BrowserRouter>
      <>
        <CMRprovider value={[autenticar, guardarAuth]}>
        <Header />
        <div className="grid contenedor contenido-principal">

          <Navegacion />

          <main className="caja-contenido col-9">
            <Routes>
                  <Route  path="/"  element={<Clientes/>} />
                  <Route  path="/clientes/nuevo"  element={<NuevoCliente/>} />
                  <Route  path="/clientes/editar/:id" element={<EditarCliente/>} />

                  <Route  path="/productos"  element={<Productos/>} />
                  <Route  path="/productos/nuevo"  element={<NuevoProducto/>} />
                  <Route  path="/productos/editar/:id"  element={<EditarProducto/>} />

                  <Route  path="/pedidos"  element={<Pedidos/>} />
                  <Route  path="/pedidos/nuevo/:id"  element={<NuevoPedido />} />

                  <Route  path="/iniciar-sesion"  element={<Login />} />

            </Routes>
          </main>

        </div>
        </CMRprovider>

      </>
    </BrowserRouter>
  )
}


export default App;
