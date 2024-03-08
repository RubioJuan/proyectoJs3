const myHeaders = {
    'Content-Type': 'application/json' // Establece el tipo de contenido JSON
};

export const Dato = async (URL_API, data ) => {
    try {
        return await fetch(`${URL_API}`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};