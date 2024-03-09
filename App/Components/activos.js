class GestorActivos extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform"class="container-tasks">
                <h2>Activos</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Codigo de Tansacción</h3>
                        <input name="CodTransaccion" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Nro de Formulario</h3>
                        <input name="nroFormulario" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_responsable">
                    <h3>Id Marca</h3>
                    <select id="marca">
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
                    <select id="categoria">
                        <option value="empty">seleccionar...</option>
                        <option value="Equipo de computo">Equipo de computo</option>
                        <option value="Electrodomestico">Electrodomestico</option>
                        <option value="Juego">Juego</option>
                    </select>
                </div>
                <div class="container-task_priority">
                    <h3>Id Tipo</h3>
                    <select id="tipo">
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
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Valor Unitario</h3>
                        <input id="valorUnitario" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Id proveedor</h3>
                        <input id="idProveedor" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Numero Serial</h3>
                        <input id="numeroSerial" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Id Empresa Responsable</h3>
                        <input id="idEmpresaResponsable" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_priority">
                    <h3>Id Estado</h3>
                    <select id="estado">
                        <option value="empty">seleccionar...</option>
                        <option value="No-Asignado">No Asignado</option>
                        <option value="Asignado">Asignado</option>
                        <option value="Daño">Dado de baja por daño</option>
                        <option value="Reparación">Reparación y/o Garantia</option>
                    </select>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer = document.getElementById("taskform");
                formContainer.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
                });
            });
  }
}

customElements.define('gestor-activos', GestorActivos);

const btn = document.querySelector('input[type="submit"]');
const taskform = document.querySelector('#taskform')

const getData = () => {
    const datos = new FormData(taskform);
    const datosProcesados = Object.fromEntries(datos.entries());

    // Añadir los valores de los elementos select
    datosProcesados.IdMarca = taskform.querySelector('#marca').value;
    datosProcesados.IdCategoria = taskform.querySelector('#categoria').value;
    datosProcesados.IdTipo = taskform.querySelector('#tipo').value;
    datosProcesados.IdEstado = taskform.querySelector('#estado').value;

    // Añadir los valores de los campos de entrada
    datosProcesados.ValorUnitario = taskform.querySelector('#valorUnitario').value;
    datosProcesados.IdProveedor = taskform.querySelector('#idProveedor').value;
    datosProcesados.NumeroSerial = taskform.querySelector('#numeroSerial').value;
    datosProcesados.IdEmpresaResponsable = taskform.querySelector('#idEmpresaResponsable').value;

    taskform.reset();
    return datosProcesados;
}
const postData = async () => {
    const newUser = getData();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Actives',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse = await response.json();
            console.log('Respuesta recibida:', jsonResponse);
            const {Id, CodTransaccion, IdMarca} = jsonResponse;
            console.log(`Registro consedido: ${Id}, ${CodTransaccion}, ${IdMarca}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform.addEventListener('submit', (event) => {
    event.preventDefault();
    postData();
});