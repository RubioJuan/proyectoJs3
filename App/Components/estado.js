class GestorEstado extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform3"class="container-tasks">
                <h2>EStado</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre1" id="Nombre1" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer3 = document.getElementById("taskform3");
                formContainer3.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn3").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer3.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
    }
}

customElements.define('gestor-estado', GestorEstado);

const btn3 = document.querySelector('input[type="submit"]');
const taskform3 = document.querySelector('#taskform3')

const getData3 = () => {
    const datos3 = new FormData(taskform3);
    const datosProcesados3 = Object.fromEntries(datos3.entries());

    // Añadir los valores de los elementos select
    datosProcesados3.Nombre1 = taskform3.querySelector('#Nombre1').value;

    taskform3.reset();
    return datosProcesados3;
}
const postData3 = async () => {
    const newUser = getData3();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/status',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse3 = await response.json();
            console.log('Respuesta recibida:', jsonResponse3);
            const {Id,Nombre} = jsonResponse3;
            console.log(`Registro consedido: ${Id}, ${Nombre}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform3.addEventListener('submit', (event) => {
    event.preventDefault();
    postData3();
});