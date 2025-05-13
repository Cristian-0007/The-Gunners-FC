//----codigo del nav 

function desplazarSeccion(evento) {

    evento.preventDefault();
 
    const idDestino = evento.target.getAttribute('href').substring(1);

    const seccionDestino = document.getElementById(idDestino);
 
    seccionDestino.scrollIntoView({

        behavior: 'smooth'   

    });

}
 
const enlaceNav = document.querySelectorAll('nav a');

enlaceNav.forEach(enlace => {

    enlace.addEventListener('click', desplazarSeccion);

});
 
const enlaceFooter = document.querySelector('.inicio a');

enlaceFooter.addEventListener('click', desplazarSeccion);
 