 // Variables
 const carrito = document.querySelector('#carrito');
 const contenedorCarrito = document.querySelector('#lista-carrito tbody');
 const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
 const total = document.querySelector('#total');
 const listaCursos = document.querySelector('#lista-cursos');
 const inputSearch = document.querySelector('#buscador');
 const search = document.querySelector('#submit-buscador');
 const card = document.querySelectorAll('.card');

 let articulosCarrito = [], cantidadPagar = 0;

eventListeners();

function eventListeners(){
    //Agregar Carrito
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);
     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', () => {
        //reiniciar el arreglo
        articulosCarrito = [];

        //limpiarHTML
        vaciarCarrito();

        total.setAttribute('hidden', true);
    });

    articulosCarrito = JSON.parse(localStorage.getItem('articulo')) || [];
    carritoHTML();
}

function agregarCurso(e){
    e.preventDefault();

    //mostrar div total
    total.removeAttribute('hidden');
    
    // console.log('Agregando Curso');
    if(e.target.classList.contains('agregar-carrito')){
        //Obtener targeta
        const curso = e.target.parentElement.parentElement;
        // leer datos de la targeta
        leerDatos(curso);
    }
}
//Obtener datos de la targeta
function leerDatos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Aumentar 'cantidad' si se agrega un curso existente y llenar arreglo
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if( existe ){
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [ ...cursos ];
        // console.log(articulosCarrito[0].cantidad);
    }else{
        articulosCarrito = [ ...articulosCarrito, infoCurso];
        // console.log(articulosCarrito[0].cantidad);
    }


    //Agregar info al carrito
    carritoHTML();
}


function carritoHTML(){

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso; //DestructuringObjeto (sacar valores) 
                                                            //esto para que queden solo las variables 
                                                            //ejemplo curso.titulo -> titulo
        const row = document.createElement('tr');

        //Convertir a num para hacer suma
        let  precioT = parseInt(precio.slice(1)) * cantidad;
        
        //preco a pagar
        cantidadPagar += precioT;
        total.innerHTML = `Total: $${cantidadPagar}`;
        curso.total = cantidadPagar;//agregar propiedad al objet0


        row.innerHTML =`
            <td>
                <img src='${imagen}' width=100>
            </td>
            <td>${titulo}</td>
            <td style="text-align: center;">${precio}</td>
            <td style="text-align: center;">${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'>x
            </td>`;
            contenedorCarrito.appendChild(row);
    });

    sincronizacionStorage();
}

function sincronizacionStorage(){
    localStorage.setItem('articulo', JSON.stringify(articulosCarrito));
}


//EliminarCurso
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar el arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }

}

//Limpiar carrito de targetas anteriores
function vaciarCarrito(){

    cantidadPagar = 0;

    while(contenedorCarrito.firstElementChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



//Buscador
// function searchCursos(){
//     const query = inputSearch.value.toLowerCase();

//     console.log(query);

//     card.forEach(curso =>{
//         const nombreCurso = curso.dataset.name.toLowerCase();
//         if(nombreCurso.includes(query)){
//             curso.classList.remove('hidden');
//         }else{
//             curso.classList.add('hidden')
//         }
//     })
// }

// search.addEventListener('click', searchCursos);
// inputSearch.addEventListener('input',searchCursos);