const formularioBuscador = document.getElementById('formulario');
const terminoInput = document.querySelector('.termino');
const divResultado = document.querySelector('#resultado');

const url_base = "https://pixabay.com/api/?";
const api_key = "18819943-d82658bbc45d965508c8bc146"


formularioBuscador.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminoFormateado = terminoInput.value.trim()
    if (!terminoFormateado) { 
        console.log("El campo termino de busqueda es obligatoriooooo");
        return 
    }
    
    obtenerImagenesApi(terminoFormateado);
    terminoInput.value = "";
})


async function obtenerImagenesApi (busqueda) {
    
    const URL = `${url_base}key=${api_key}&q=${busqueda}`;

    const respuesta = await fetch(URL);
    const data = await respuesta.json();

    const { hits } = data;

    mostrarImagenes(hits);

}

function mostrarImagenes(imagenes = []) {

    limpiarHTMLPrevio()

    imagenes.forEach( imagen => {
        
        const {previewURL, likes, views, largeImageURL} = imagen 

        const divImagen = document.createElement('div');
        divImagen.classList.add('card');

        const img = document.createElement('img');
        img.src = previewURL;

        const likesP = document.createElement('p');
        likesP.textContent = "Likes : "+likes;

        const viewsP = document.createElement('p');
        viewsP.textContent = "Views : "+views;

        const btnImagen = document.createElement('a');
        btnImagen.classList.add('btn-imagen')
        btnImagen.textContent = "Ver imagen"
        btnImagen.href = largeImageURL;
        btnImagen.target = "_blank"

        divImagen.appendChild(img);
        divImagen.appendChild(likesP);
        divImagen.appendChild(viewsP);
        divImagen.appendChild(btnImagen);

        divResultado.appendChild(divImagen)

        console.log(divImagen);
    })
}

function limpiarHTMLPrevio () {
    divResultado.innerHTML = ""
}