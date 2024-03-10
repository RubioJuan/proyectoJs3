class GestorTipoActi extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform6"class="container-tasks">
                <h2>Tipo Activo</h2>
                <div class="container-task_name">
                <h3>Ingrese el Id</h3>
                <input name="id" placeholder="CC o Nit">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre3" id="Nombre3" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Ingrese el Email</h3>
                        <input name="Email1" id="Email1" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer6 = document.getElementById("taskform6");
                formContainer6.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn6").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer6.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-tipoact', GestorTipoActi);

const btn6 = document.querySelector('input[type="submit"]');
const taskform6 = document.querySelector('#taskform6')

const getData6 = () => {
    const datos6 = new FormData(taskform6);
    const datosProcesados6 = Object.fromEntries(datos6.entries());

    // Añadir los valores de los elementos select
    datosProcesados6.Nombre3 = taskform6.querySelector('#Nombre3').value;
    datosProcesados6.Email1 = taskform6.querySelector('#Email1').value;

    taskform6.reset();
    return datosProcesados6;
}
const postData6 = async () => {
    const newUser = getData6();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/TypePersons',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse4 = await response.json();
            console.log('Respuesta recibida:', jsonResponse4);
            const {Id,Nombre} = jsonResponse4;
            console.log(`Registro consedido: ${Id}, ${Nombre}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform6.addEventListener('submit', (event) => {
    event.preventDefault();
    postData6();
});