class GestorActivos extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform"class="container-tasks">
                <h2>Activos</h2>
                <div class="container-task_name">
                    <h3>Ingrese el Id</h3>
                    <input class="imputs" name="id" placeholder="Escribir...">
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Ingrese el Codigo de Tansacción</h3>
                        <input class="imputs" name="CodTransaccion" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Nro de Formulario</h3>
                        <input name="nroFormulario" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_responsable">
                    <h3>Id Marca</h3>
                    <select id="marca">
                    <option value="empty">seleccionar...</option>
                    <option value="LG">LG</option>
                    <option value="COMPUMAX">COMPUMAX</option>
                    <option value="LOGITECH">LOGITECH</option>
                    <option value="BENQ">BENQ</option>
                    <option value="ASUS">ASUS</option>
                    <option value="LENOVO">LENOVO</option>
                    <option value="HP">HP</option>
                </select>
                </div>
                <div class="container-task_priority">
                    <h3>Id Categoria</h3>
                    <select id="categoria">
                        <option value="empty">seleccionar...</option>
                        <option value="Equipo de computo">Equipo de computo</option>
                        <option value="Electrodomestico">Electrodomestico</option>
                        <option value="Juego">Juego</option>
                    </select>
                </div>
                <div class="container-task_priority">
                    <h3>Id Tipo</h3>
                    <select id="tipo">
                        <option value="empty">seleccionar...</option>
                        <option value="Monitor">Monitor</option>
                        <option value="CPU">CPU</option>
                        <option value="Teclado">Teclado</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Aire Acondicionado">Aire Acondicionado</option>
                        <option value="Portatil">Portatil</option>
                        <option value="Impresora">Impresora</option>
                    </select>
                </div>
                <div class="container-task_dates">
                    <div class="dates-begin">
                        <h3>Valor Unitario</h3>
                        <input id="valorUnitario" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Id proveedor</h3>
                        <input id="idProveedor" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Numero Serial</h3>
                        <input id="numeroSerial" placeholder="Escribir...">
                    </div>
                    <div class="dates-end">
                        <h3>Id Empresa Responsable</h3>
                        <input id="idEmpresaResponsable" placeholder="Escribir...">
                    </div>
                </div>
                <div class="container-task_priority">
                    <h3>Id Estado</h3>
                    <select id="estado">
                        <option value="empty">seleccionar...</option>
                        <option value="No-Asignado">No Asignado</option>
                        <option value="Asignado">Asignado</option>
                        <option value="Daño">Dado de baja por daño</option>
                        <option value="Reparación">Reparación y/o Garantia</option>
                    </select>
                </div>
                <br>
                <input type="submit" value="Guardar"></input>
                </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer = document.getElementById("taskform");
                formContainer.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("guardarbtn").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });
  }
}

customElements.define('gestor-activos', GestorActivos);

const taskform = document.querySelector('#taskform')

const getData = () => {
    const datos = new FormData(taskform);
    const datosProcesados = Object.fromEntries(datos.entries());

    // Añadir los valores de los elementos select
    datosProcesados.IdMarca = taskform.querySelector('#marca').value;
    datosProcesados.IdCategoria = taskform.querySelector('#categoria').value;
    datosProcesados.IdTipo = taskform.querySelector('#tipo').value;
    datosProcesados.IdEstado = taskform.querySelector('#estado').value;

    // Añadir los valores de los campos de entrada
    datosProcesados.ValorUnitario = taskform.querySelector('#valorUnitario').value;
    datosProcesados.IdProveedor = taskform.querySelector('#idProveedor').value;
    datosProcesados.NumeroSerial = taskform.querySelector('#numeroSerial').value;
    datosProcesados.IdEmpresaResponsable = taskform.querySelector('#idEmpresaResponsable').value;

    taskform.reset();
    return datosProcesados;
}
const postData = async () => {
    const newUser = getData();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://localhost:3000/Actives',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse = await response.json();
            console.log('Respuesta recibida:', jsonResponse);
            const {Id, CodTransaccion, IdMarca} = jsonResponse;
            console.log(`Registro consedido: ${Id}, ${CodTransaccion}, ${IdMarca}`);
        }
    } catch (error){
        console.log(error);
    }
}
const buscarDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/Actives/${id}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            mostrarDatos(jsonResponse); // Llamar a la función mostrarDatos para mostrar los datos en la página
        } else {
            console.log('Error al buscar datos:', response.status);
        }
    } catch (error) {
        console.log('Error de red:', error);
    }
}

// Función para mostrar los datos en la página
const mostrarDatos = (datos) => {
    const container = document.getElementById('resultados');
    container.innerHTML = ''; // Limpiar resultados anteriores
    const elemento = document.createElement('div');
    elemento.textContent = `ID: ${datos.id}, Código de Transacción: ${datos.CodTransaccion}, Marca: ${datos.IdMarca}, Categoria: ${datos.Idcategoria} Tipo ${datos.IdTipo},
    valor Unitario ${datos.ValorUnitario}, 
    idProveedor ${datos.IdProveedor}, Numero Serial ${datos.NumeroSerial},Id Empresa Responsable ${datos.IdEmpresaResponsable}, Id Estado ${datos.IdEstado}`;
    container.appendChild(elemento);
    /*Crea un elemento HTML especificado por su tagName */
    /*En HTML, tagName devuelve el nombre del elemento en forma canonica, es decir con todas sus letras en mayúscula. */
}

// Agregar evento de clic al botón de buscar
document.getElementById("btnbuscar").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Solicitar al usuario que ingrese el ID
    const id = prompt('Ingrese el ID:');
    if (id) {
        // Realizar la búsqueda de datos por ID
        await buscarDatosPorId(id);
    } else {
        console.log('ID no válido.');
    }
});

// Función para eliminar datos por ID en el servidor
const eliminarDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/Actives/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Datos eliminados exitosamente.');
            alert('Los datos se eliminaron exitosamente.');
        } else {
            console.log('Error al eliminar datos:', response.status);
            alert('Hubo un error al eliminar los datos.');
        }
    } catch (error) {
        console.log('Error de red:', error);
        alert('Hubo un error de red al eliminar los datos.');
    }
}

// Agregar evento de clic al botón de eliminar
document.querySelector(".btonEliminar").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Solicitar al usuario que ingrese el ID a eliminar
    const id = prompt('Ingrese el ID a eliminar:');
    if (id) {
        // Confirmar si el usuario está seguro de eliminar los datos
        const confirmacion = confirm('¿Está seguro de eliminar estos datos?');
        if (confirmacion) {
            // Realizar la eliminación de datos por ID
            await eliminarDatosPorId(id);
        }
    } else {
        console.log('ID no válido.');
    }
});
// Función para obtener los datos por ID desde el servidor
const obtenerDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/Actives/${id}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            console.log('Error al buscar datos:', response.status);
            return null;
        }
    } catch (error) {
        console.log('Error de red:', error);
        return null;
    }
};
document.addEventListener('DOMContentLoaded', function() {

// Función para mostrar los datos para editar
const mostrarDatosParaEditar = (datos) => {
    // Obtener el formulario de edición
    const formEditar = document.getElementById('formEditar');

    // Rellenar los campos del formulario con los datos obtenidos
    formEditar.querySelector('input[name="id"]').value = datos.id;
    formEditar.querySelector('input[name="CodTransaccion"]').value = datos.CodTransaccion;
    // Rellenar los demás campos según sea necesario

    // Mostrar el formulario de edición
    formEditar.style.display = "block";
}

// Agregar evento de clic al botón de editar
document.querySelector(".btnEditar").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Solicitar al usuario que ingrese el ID a editar
    const id = prompt('Ingrese el ID a editar:');
    if (id) {
        // Confirmar si el usuario está seguro de editar los datos
        const confirmacion = confirm('¿Está seguro de editar estos datos?');
        if (confirmacion) {
            // Obtener los datos por ID
            const datos = await obtenerDatosPorId(id);
            if (datos) {
                // Mostrar los datos para editar
                mostrarDatosParaEditar(datos);
            } else {
                alert('No se encontraron datos con ese ID.');
            }
        }
    } else {
        console.log('ID no válido.');
    }
});
});

// Agregar evento de clic al botón de guardar del formulario
taskform.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Enviar los datos al servidor
    const datosGuardados = await postData();
    // Mostrar los datos guardados en la pantalla
    mostrarDatos(datosGuardados);
});