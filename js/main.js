const formulario = document.querySelector('#formulario');
const inputBusqueda = document.querySelector('.termino');
const divResultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFormulario();
})

function validarFormulario() {
    const terminoBusqueda = inputBusqueda.value;  //  ""
    if (!terminoBusqueda) {

        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
        return;
    }

    buscarImagenes(terminoBusqueda);
    inputBusqueda.value = "";
}

function buscarImagenes(termino){
    const URL_BASE = "https://pixabay.com/api/";
    const API_KEY = "18819943-d82658bbc45d965508c8bc146";  ``
    const URL = `${URL_BASE}?key=${API_KEY}&q=${termino}&image_type=photo`;  

    fetch(URL)
        .then( respuesta => respuesta.json())
        .then( data => {
            data.hits.length === 0 ? mostrarAlerta("No hay imagenes para el termino que buscaste, intenta con otro") : mostrarResultados(data.hits)
        })
}

function mostrarResultados(imagenes = []) {

    divResultado.innerHTML = "";

    imagenes.forEach( imagen => {
        const {previewURL, likes,  views} = imagen; 

        const divImagen = document.createElement('div');
        divImagen.classList.add('card');

        const img = document.createElement('img');
        img.src = previewURL;

        const likesText = document.createElement("p");
        likesText.textContent = "Likes :" + likes;

        const viewsText = document.createElement("p");
        viewsText.textContent = `Views : ${views}`;

        const link = document.createElement('a');
        link.classList.add('btn-imagen');
        link.target = "_blank";
        link.textContent = "Ver Más";
        link.href = imagen.largeImageURL;

        divImagen.appendChild(img)
        divImagen.appendChild(likesText)
        divImagen.appendChild(viewsText)
        divImagen.appendChild(link);

        divResultado.appendChild(divImagen);

    })
}

function mostrarAlerta(mensaje){

    const divAlert = document.createElement('div');
    divAlert.classList.add('alerta', 'error');

    const mensajeAlerta = document.createElement('p');
    mensajeAlerta.textContent = mensaje;

    divAlert.appendChild(mensajeAlerta);
    formulario.appendChild(divAlert);

    setTimeout(() => {
        divAlert.remove();
    }, 2000);

    console.log(mensaje)
}
