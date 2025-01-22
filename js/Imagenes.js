const imagenes = ['img/hero.jpg',
                'img/submenu1.jpg',   
                'img/submenu3.jpeg'];
let indice = 0;
const img = document.querySelector('#hero');

const cambiarImg = () => {   
    img.style.background = `url('${imagenes[indice]}')`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    indice = (indice + 1)% imagenes.length;
}
setInterval(cambiarImg, 10000);
cambiarImg();



