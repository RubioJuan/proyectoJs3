
class GestorActivos extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.agregarFormulario = this.agregarFormulario.bind(this);
    }
    agregarFormulario() {
        const formulario = this.querySelector('.agregar-activo');
        formulario.style.display = 'block';
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="task-form"class="container-tasks">
                 <h2>Activos</h2>
                 <div class="container-task_name">
                     <h3>Ingrese el Id</h3>
                     <input id="name" placeholder="Escribir...">
                 </div>
                 <div class="container-task_dates">
                     <div class="dates-begin">
                         <h3>Ingrese el Codigo de Tansacción</h3>
                         <input id="fechaInicio" placeholder="Escribir...">
                     </div>
                     <div class="dates-end">
                         <h3>Nro de Formulario</h3>
                         <input id="fechaFin" placeholder="Escribir...">
                     </div>
                 </div>
                 <div class="container-task_responsable">
                     <h3>Id Marca</h3>
                     <select id="priority">
                     <option value="empty">seleccionar...</option>
                     <option value="LG">LG</option>
                     <option value="COMPUMAX">COMPUMAX</option>
                     <option value="LOGITECH">LOGITECH</option>
                     <option value="BENQ">BENQ</option>
                     <option value="ASUS">ASUS</option>
                     <option value="LENOVO">LENOVO</option>
                     <option value="HP">HP</option>
                 </select>
                 </div>
                 <div class="container-task_priority">
                     <h3>Id Categoria</h3>
                     <select id="priority">
                         <option value="empty">seleccionar...</option>
                         <option value="Equipo de computo">Equipo de computo</option>
                         <option value="Electrodomestico">Electrodomestico</option>
                         <option value="Juego">Juego</option>
                     </select>
                 </div>
                 <div class="container-task_priority">
                     <h3>Id Tipo</h3>
                     <select id="priority">
                         <option value="empty">seleccionar...</option>
                         <option value="Monitor">Monitor</option>
                         <option value="CPU">CPU</option>
                         <option value="Teclado">Teclado</option>
                         <option value="Mouse">Mouse</option>
                         <option value="Aire Acondicionado">Aire Acondicionado</option>
                         <option value="Portatil">Portatil</option>
                         <option value="Impresora">Impresora</option>
                     </select>
                 </div>
                 <br>
                 <input type="submit" value="añadir">
            </form>`;
    }

}
customElements.define('gestor-activos', GestorActivos);

document.addEventListener('DOMContentLoaded', () => {
    const contenido = document.querySelector('.content');
    if (contenido) {
        const addAsing = contenido.querySelector('gestor-activos');

        const opcionesMenu = document.querySelectorAll('.side-dropdown li a');
        opcionesMenu.forEach(opcion => {
            opcion.addEventListener('click', (event) => {
                const opcionSeleccionada = event.target.dataset.form;
                if (opcionSeleccionada === querySelector('#agregarTo')) {
                    addAsing.agregarActives();
                }
            });
        });
    }
});