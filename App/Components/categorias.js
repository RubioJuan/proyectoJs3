class Categorias extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform8"class="container-tasks">
                <h2>Categorias de Activos</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre4" id="Nombre4" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer8 = document.getElementById("taskform8");
                formContainer8.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("otro1").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer8.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-categorias', Categorias);

const btn8 = document.querySelector('input[type="submit"]');
const taskform8 = document.querySelector('#taskform8')

const getData8 = () => {
    const datos8 = new FormData(taskform8);
    const datosProcesados8 = Object.fromEntries(datos8.entries());

    // Añadir los valores de los elementos select
    datosProcesados8.Nombre4 = taskform8.querySelector('#Nombre4').value;
   

    taskform8.reset();
    return datosProcesados8;
}
const postData8 = async () => {
    const newUser = getData8();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/CategoryActives',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse8 = await response.json();
            console.log('Respuesta recibida:', jsonResponse8);
            const {Id,Nombre} = jsonResponse8;
            console.log(`Registro consedido: ${Id},${Nombre}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform8.addEventListener('submit', (event) => {
    event.preventDefault();
    postData8();
});