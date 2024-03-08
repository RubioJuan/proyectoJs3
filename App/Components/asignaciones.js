import { Dato } from '../../APIS/active'

export class addActive extends HTMLElement{
    constructor(){
        super();
        this.render();
        addData();
    }
    render(){
        this.innerHTML = /* html*/`
             <style rel="stylesheet">
                 @import "App/Components/categorias.js";
             </style>
             <form id="task-form"class="container-tasks">
                 <h2>Nueva tarea</h2>
                 <div class="container-task_name">
                     <h3>Nombre de la tarea</h3>
                     <input id="name" placeholder="Escribir...">
                 </div>
                 <div class="container-task_dates">
                     <div class="dates-begin">
                         <h3>Fecha Inicio</h3>
                         <input id="fechaInicio" type="date">
                     </div>
                     <div class="dates-end">
                         <h3>Fecha Fin</h3>
                         <input id="fechaFin" type="date">
                     </div>
                 </div>
                 <div class="container-task_responsable">
                     <h3>Responsable de la tarea</h3>
                     <input id="responsable" placeholder="nombre del responsable">
                 </div>
                 <div class="container-task_priority">
                     <h3>Nivel de prioridad</h3>
                     <select id="priority">
                         <option value="empty">selecciona...</option>
                         <option value="inmediata">Inmediata</option>
                         <option value="alta">Alta</option>
                         <option value="media">Media</option>
                         <option value="baja">Baja</option>
                     </select>
                 </div>
                 <br>
                 <input type="submit" value="añadir">
             </form>
        `
    }
     addData = () => {
     document.addEventListener('DOMContentLoaded', function() {
            const URL_API = " http://localhost:3001/Actives"
            const bookForm = document.querySelector('#activesForm')
            

            bookForm.addEventListener('submit', (e) => {
                e.preventDefault()

                const titleInput = bookForm.querySelector('#title').value
                const authorInput = bookForm.querySelector('#author').value
                const cover = bookForm.querySelector('#cover').value
                const object = bookForm.querySelector('#object').value
                const variat = bookForm.querySelector('#variat').value
                const descInput = bookForm.querySelector('#description').value
                const elementList = parentNode.querySelectorAll('#selectors').value
                const container = document.querySelector("#test").value
                const main = document.querySelector("#main").value
                const element = parentNode.querySelectorAll('#element').value
                let newId = 0

                fetch(`${URL_API}`)
                    .then(response => response.json())
                    .then(activesData =>{
                        newId = activesData.length + 1;


            const data = {
                "Id": titleInput,
                "CodTransaccion": authorInput,
                "nroFOrmulario": cover,
                "IdMarca": descInput,
                "IdCategoria": main,
                "IdTIpo": object,
                "valorUnitario": elementList,
                "IdProveedor": container,
                "nroSerial": variat,
                "IdEMpresaResponsable": element,
                "IdEstado": 0
            } 
            Dato(URL_API, data)
           })

            
     });
    }
 )}
}
customElements.define("add-active", addActive); 