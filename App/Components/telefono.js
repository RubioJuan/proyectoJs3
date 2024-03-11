class Telefono extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform11"class="container-tasks">
                <h2>Telefono Persona</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Numero</h3>
                        <input name="nro" id="nro" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese la Ubicación</h3>
                        <input name="Ubicación" id="Ubicación" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Id del Resonsable</h3>
                        <input name="IdResponsable2" id="IdResponsable2" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer11 = document.getElementById("taskform11");
                formContainer11.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("otro4").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer11.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-telefono', Telefono);

const btn11 = document.querySelector('input[type="submit"]');
const taskform11 = document.querySelector('#taskform11')

const getData11 = () => {
    const datos11 = new FormData(taskform11);
    const datosProcesados11 = Object.fromEntries(datos11.entries());

    // Añadir los valores de los elementos select
    datosProcesados11.nro = taskform11.querySelector('#nro').value;
    datosProcesados11.Ubicación = taskform11.querySelector('#Ubicación').value;
    datosProcesados11.IdResponsable2 = taskform11.querySelector('#IdResponsable2').value;   

    taskform11.reset();
    return datosProcesados11;
}
const postData11 = async () => {
    const newUser = getData11();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/TelephonePersons',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse11 = await response.json();
            console.log('Respuesta recibida:', jsonResponse11);
            const {Id,nro,Ubicación,IdResponsable2} = jsonResponse11;
            console.log(`Registro consedido: ${Id},${nro},${Ubicación},${IdResponsable2}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform11.addEventListener('submit', (event) => {
    event.preventDefault();
    postData11();
});