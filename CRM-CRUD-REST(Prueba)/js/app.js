// Proyecto CRM CRUD de CLientes con REST y Async Await
// Este proyecto usa Tailwind como Framework CSS

// Imports
import { obtenerClientes, eliminarCliente } from './API.js';

// Snippets para aprender
// enf = export const functionName = (params) => { ... };   // Function Expression
// imd = import {  } from 'module';
// edf = export default function app(params) { ... };       // Function Declaration   

// IIFE
(function(){

    // Selector
    const listado = document.querySelector ('#listado-clientes');

    // Eventos
    document.addEventListener('DOMContentLoaded', mostrarClientes );
    listado.addEventListener('click', confirmarEliminar );    

    // Funciones
    // Funcion que muestra los registros existentes
    async function mostrarClientes () {
    
        // Obtiene todos los clientes
        const clientes = await obtenerClientes(); // Espera hasta obtener los clientes

        clientes.forEach( cliente => {
            const { nombre, email, telefono, empresa, id } = cliente;

            const row = document.createElement ('tr');

            row.innerHTML += `
                <td> ${nombre} </td>
                <td> ${email} </td>
                <td> ${telefono} </td>
                <td> ${empresa} </td>
                <td>
                   
                </td>
            `;
            
            // Se agrega el HTML creado al contenedor
            listado.appendChild( row );

        });
    }

    // Confirma la eliminacion del cliente
    function confirmarEliminar ( e ) {
    
        // Valida si donde ha hecho click fue en el elemento que tiene la clase eliminar
        if( e.target.classList.contains('eliminar') ){

            // Lee el data-cliente que es el id al que dio clic que esta en el dataset
            const clienteId = parseInt( e.target.dataset.cliente );

            const confirmar = confirm('¿Desea eliminar este registro? ');

            if ( confirmar ) {
                
                // Elimina el Cliente de la REST API
                eliminarCliente( clienteId );

            }
        }
    }
})();    

