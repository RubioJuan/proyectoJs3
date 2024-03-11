class Historial extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform9"class="container-tasks">
                <h2>Historial del Activo</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Id del Activo</h3>
                        <input name="IdActivo" id="IdActivo" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese la Fecha</h3>
                        <input name="fecha4" id="fecha4" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Id del Responsable</h3>
                        <input name="IdResponsable1" id="IdResponsable1" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Id del Estado</h3>
                        <input name="idEstado" id="idEstado" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer9 = document.getElementById("taskform9");
                formContainer9.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("otro2").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer9.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-historial', Historial);

const btn9 = document.querySelector('input[type="submit"]');
const taskform9 = document.querySelector('#taskform9')

const getData9 = () => {
    const datos9 = new FormData(taskform9);
    const datosProcesados9 = Object.fromEntries(datos9.entries());

    // Añadir los valores de los elementos select
    datosProcesados9.IdActivo = taskform9.querySelector('#IdActivo').value;
    datosProcesados9.fecha4 = taskform9.querySelector('#fecha4').value;
    datosProcesados9.IdResponsable1 = taskform9.querySelector('#IdResponsable1').value;
    datosProcesados9.idEstado = taskform9.querySelector('#idEstado').value;
   

    taskform9.reset();
    return datosProcesados9;
}
const postData9 = async () => {
    const newUser = getData9();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/historyActives',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse9 = await response.json();
            console.log('Respuesta recibida:', jsonResponse9);
            const {IdActivo,fecha4,IdResponsable1,idEstado} = jsonResponse9;
            console.log(`Registro consedido: ${IdActivo},${fecha4},${IdResponsable1},${idEstado}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform9.addEventListener('submit', (event) => {
    event.preventDefault();
    postData9();
});