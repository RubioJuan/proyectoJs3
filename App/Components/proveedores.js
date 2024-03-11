class Proveedores extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform10"class="container-tasks">
                <h2>Proveedores</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre5" id="Nombre5" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Email</h3>
                        <input name="Email2" id="Email" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer10 = document.getElementById("taskform10");
                formContainer10.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("otro3").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer10.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-proveedores', Proveedores);

const btn10 = document.querySelector('input[type="submit"]');
const taskform10 = document.querySelector('#taskform10')

const getData10 = () => {
    const datos10 = new FormData(taskform10);
    const datosProcesados10 = Object.fromEntries(datos10.entries());

    // Añadir los valores de los elementos select
    datosProcesados10.Nombre5 = taskform10.querySelector('#Nombre5').value;
    datosProcesados10.Email2 = taskform10.querySelector('#Email2').value;
    
   

    taskform10.reset();
    return datosProcesados10;
}
const postData10 = async () => {
    const newUser = getData10();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Suppliers',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse10 = await response.json();
            console.log('Respuesta recibida:', jsonResponse10);
            const {Id,Nombre5,Email2} = jsonResponse10;
            console.log(`Registro consedido: ${Id},${Nombre5},${Email2}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform10.addEventListener('submit', (event) => {
    event.preventDefault();
    postData10();
});