// const OPTIONS = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json' // Establece el tipo de contenido JSON
//   }
// }

// const fetchIpInfo = ip => {
//     return fetch(`http://localhost:3001/${ip}`, OPTIONS)
//     .then(res => res.json())
//     .catch(err => console.error(err))
// }

// const $form = document.querySelector('#form')
// const $input = document.querySelector('#input')
// const $submit = document.querySelector('#submit')
// const $results = document.querySelector('#results')

// $form.addEventListener('submit', async (event) => {
//     event.preventDefault()
//     const { value } = $input
//     if (!value) return

//     $submit.setAttribute('disabled', '') // Corregido el atributo 'disable' a 'disabled'
//     $submit.setAttribute('aria-busy', 'true')
    
//     $results.innerHTML = value; // Imprimir el valor ingresado en el campo de entrada en el área de resultados
    
//     $submit.removeAttribute('disabled') // Corregido el atributo 'disable' a 'disabled'
//     $submit.removeAttribute('aria-busy')
// })
const URL_API = 'http://localhost:3001/';

const OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json' // Establece el tipo de contenido JSON
    }
};

const fetchIpInfo = ip => {
    return fetch(`http://localhost:3001/${ip}`, OPTIONS)
        .then(res => res.json())
        .catch(err => console.error(err));
};

const Dato = async (data, endpoint) => {
    try {
        return await fetch(`${URL_API}/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $submit = document.querySelector('#submit');
const $results = document.querySelector('#results');

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { value } = $input;
    if (!value) return;

    $submit.setAttribute('disabled', ''); // Deshabilitar el botón de envío mientras se procesa la solicitud
    $submit.setAttribute('aria-busy', 'true');
    
    // Mostrar el valor ingresado en el campo de entrada en el área de resultados
    $results.textContent = value;

    // Crear un objeto con la información ingresada por el usuario
    const newData = {
        "Id": "NEW_ID", // Puedes generar un ID único aquí
        "Data": value
    };

    try {
        // Realizar una solicitud POST al endpoint adecuado con los datos del usuario
        const response = await Dato(newData, 'guardarInformacion');
        if (response.ok) {
            console.log('Información guardada exitosamente en el JSON.');
        } else {
            console.error('Error al guardar la información en el JSON:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    } finally {
        // Habilitar el botón de envío después de que se complete la solicitud
        $submit.removeAttribute('disabled');
        $submit.removeAttribute('aria-busy');
    }
});
