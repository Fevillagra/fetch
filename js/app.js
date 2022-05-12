const formulario = document.querySelector('#formulario');
const divResultado = document.querySelector('#resultado');


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFormulario();
})

function validarFormulario(){
    const termino = document.querySelector('#termino').value;
    
    if (!termino) {
        mostrarAlerta("Termino", 'error');
        return;
    }
    
    consultarApi(termino);
}

function consultarApi(termino){
    const api_key = "18819943-d82658bbc45d965508c8bc146"
    const url = `https://pixabay.com/api/?key=${api_key}&q=${termino}`;
    
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( data => {
            data.hits.length > 0 ? mostrarImagenes(data.hits) : mostrarAlerta("No hay datos para mostrar", "error")
        });

}

function mostrarImagenes(imagenes){

    limpiarHmtl();
    imagenes.forEach( imagen => {
        const div = document.createElement('div');
        div.classList.add('card');

        const img = document.createElement('img');
        img.src = imagen.previewURL;

        const likes = document.createElement('p');
        likes.textContent = `Likes : ${imagen.likes}`

        const vistas = document.createElement('p');
        vistas.textContent = `Likes : ${imagen.views}`

        const verImagen = document.createElement('a');
        verImagen.textContent = "Ver Imagen"
        verImagen.href = imagen.largeImageURL;
        verImagen.target = "_blank";
        verImagen.classList.add('btn-imagen')

        div.appendChild(img)
        div.appendChild(likes)
        div.appendChild(vistas)
        div.appendChild(verImagen)

        divResultado.appendChild(div)
    });
}

function limpiarHmtl () {
    divResultado.innerHTML = "";
}

function mostrarAlerta(mensaje, tipo){
    const existAlert = document.querySelector('.alerta');
    if (!existAlert) {
        const alerta = document.createElement('div');
        alerta.classList.add('alerta');

        if (tipo === "error") {
            alerta.classList.add('error');
        }else{
            alerta.classList.add('exito');
        }

        const p = document.createElement('p');
        p.textContent = mensaje;

        alerta.appendChild(p);

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
    
}
