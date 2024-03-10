class GestorPersonas extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform2"class="container-tasks">
                <h2>Persona</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="CC o Nit">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre" id="Nombre" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Ingrese el Email</h3>
                        <input name="Email" id="Email" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer2 = document.getElementById("taskform2");
                formContainer2.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn2").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer2.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-personas', GestorPersonas);

const btn2 = document.querySelector('input[type="submit"]');
const taskform2 = document.querySelector('#taskform2')

const getData2 = () => {
    const datos2 = new FormData(taskform2);
    const datosProcesados2 = Object.fromEntries(datos2.entries());

    // Añadir los valores de los elementos select
    datosProcesados2.Nombre = taskform2.querySelector('#Nombre').value;
    datosProcesados2.Email = taskform2.querySelector('#Email').value;

    taskform2.reset();
    return datosProcesados2;
}
const postData2 = async () => {
    const newUser = getData2();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Persons',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse2 = await response.json();
            console.log('Respuesta recibida:', jsonResponse2);
            const {Id,IdMarca, Email} = jsonResponse2;
            console.log(`Registro consedido: ${Id}, ${IdMarca},${Email}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform2.addEventListener('submit', (event) => {
    event.preventDefault();
    postData2();
});