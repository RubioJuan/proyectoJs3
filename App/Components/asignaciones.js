class Asignaciones extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform7"class="container-tasks">
                <h2>Asignaciones    </h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese La fecha</h3>
                        <input name="fecha1" id="fecha1" placeholder="Escribir...">
                    </div>
                    <div class="dates-begin">
                        <h3>Ingrese el Id Responsable</h3>
                        <input name="idResponsable" id="idResponsable" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer7 = document.getElementById("taskform7");
                formContainer7.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("otro").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer7.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-asign', Asignaciones);

const btn7 = document.querySelector('input[type="submit"]');
const taskform7 = document.querySelector('#taskform7')

const getData7 = () => {
    const datos7 = new FormData(taskform7);
    const datosProcesados7 = Object.fromEntries(datos7.entries());

    // Añadir los valores de los elementos select
    datosProcesados7.fecha1 = taskform7.querySelector('#fecha1').value;
    datosProcesados7.idResponsable = taskform7.querySelector('#idResponsable').value;
   

    taskform7.reset();
    return datosProcesados7;
}
const postData7 = async () => {
    const newUser = getData7();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Assignments',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse7 = await response.json();
            console.log('Respuesta recibida:', jsonResponse7);
            const {fecha1,idResponsable} = jsonResponse7;
            console.log(`Registro consedido: ${fecha1},${idResponsable}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform7.addEventListener('submit', (event) => {
    event.preventDefault();
    postData7();
});