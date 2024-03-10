class GestorTipoMov extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform5"class="container-tasks">
                <h2>Detalle Movimiento</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input name="id" placeholder="CC o Nit">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese La fecha</h3>
                        <input name="fecha" id="fecha" placeholder="Escribir...">
                    </div>
                    <div class="dates-begin">
                        <h3>Ingrese el Id Activo</h3>
                        <input name="idActivo" id="idActivo" placeholder="Escribir...">
                    </div>
                    <div class="dates-begin">
                        <h3>Ingrese un Comentario</h3>
                        <input name="comentario" id="comentario" placeholder="Escribir...">
                    </div>
                    <div class="dates-begin">
                        <h3>Ingrese el Id de Asignación</h3>
                        <input name="asinacion" id="asinacion" placeholder="Escribir...">
                    </div>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer5 = document.getElementById("taskform5");
                formContainer5.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn5").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer5.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-movimiento', GestorTipoMov);

const btn5 = document.querySelector('input[type="submit"]');
const taskform5 = document.querySelector('#taskform5')

const getData5 = () => {
    const datos5 = new FormData(taskform5);
    const datosProcesados5 = Object.fromEntries(datos5.entries());

    // Añadir los valores de los elementos select
    datosProcesados5.fecha = taskform5.querySelector('#fecha').value;
    datosProcesados5.idActivo = taskform5.querySelector('#idActivo').value;
    datosProcesados5.comentario = taskform5.querySelector('#comentario').value;
    datosProcesados5.asinacion = taskform5.querySelector('#asinacion').value;

    taskform5.reset();
    return datosProcesados5;
}
const postData5 = async () => {
    const newUser = getData5();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/detailMovements',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse5 = await response.json();
            console.log('Respuesta recibida:', jsonResponse5);
            const {Id,fecha,idActivo,comentario,idAsignacion} = jsonResponse5;
            console.log(`Registro consedido: ${Id}, ${fecha},${idActivo}, ${comentario},${idAsignacion}`);
        }
    } catch (error){
        console.log(error);
    }
}

taskform5.addEventListener('submit', (event) => {
    event.preventDefault();
    postData5();
});