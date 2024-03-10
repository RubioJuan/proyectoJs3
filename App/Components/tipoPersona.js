class GestorTipoPer extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform4"class="container-tasks">
                <h2>Tipo Persona</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="CC o Nit">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre2" id="Nombre2" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer4 = document.getElementById("taskform4");
                formContainer4.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn4").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer4.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-tipoper', GestorTipoPer);

const btn4 = document.querySelector('input[type="submit"]');
const taskform4 = document.querySelector('#taskform4')

const getData4 = () => {
    const datos4 = new FormData(taskform4);
    const datosProcesados4 = Object.fromEntries(datos4.entries());

    // Añadir los valores de los elementos select
    datosProcesados4.Nombre2 = taskform4.querySelector('#Nombre2').value;

    taskform4.reset();
    return datosProcesados4;
}
const postData4 = async () => {
    const newUser = getData4();
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

taskform4.addEventListener('submit', (event) => {
    event.preventDefault();
    postData4();
});