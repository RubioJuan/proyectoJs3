class GestorMarcas extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform1"class="container-tasks">
                <h2>Marcas</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Nombre</h3>
                        <input name="Nombre" id="Nombre" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer1 = document.getElementById("taskform1");
                formContainer1.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn1").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer1.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
    }
}

customElements.define('gestor-marcas', GestorMarcas);

const taskform1 = document.querySelector('#taskform1')

const getData1 = () => {
    const datos1 = new FormData(taskform1);
    const datosProcesados1 = Object.fromEntries(datos1.entries());

    // Añadir los valores de los elementos select
    datosProcesados1.Nombre = taskform1.querySelector('#Nombre').value;

    taskform1.reset();
    return datosProcesados1;
}
const postData1 = async () => {
    const newUser = getData1();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Brands',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse1 = await response.json();
            console.log('Respuesta recibida:', jsonResponse1);
            const {Id,IdMarca} = jsonResponse1;
            console.log(`Registro consedido: ${Id}, ${IdMarca}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform1.addEventListener('submit', (event) => {
    event.preventDefault();
    postData1();
});