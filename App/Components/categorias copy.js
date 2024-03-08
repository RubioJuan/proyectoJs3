import { Dato } from '../../APIS/active'

export class addActive extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.addData();
    }
    render(){
        this.innerHTML = /* html*/`
             <style rel="stylesheet">
                 @import "/../App/Components/css/styles.css";
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
            const URL_API = "http://localhost:3001/CategoryActives"
            const titleInput = bookForm.querySelector('#title').value
            const authorInput = bookForm.querySelector('#author').value
            const data = {
                "Id": titleInput,
                "CodTransaccion": authorInput
            } 
            Dato(URL_API, data)
     });
    }
    
 }
  
 customElements.define("add-active", addActive);