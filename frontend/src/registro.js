import axios from 'axios';

window.addVideogame = function() {
   const name = document.getElementById('name').value;
   const type = document.getElementById('type').value;
   const year = document.getElementById('year').value;

   //TODO Añadir validación de datos
    if (name == '') {
        alert('El nombre es un campo necesario');
        return;
    }


   axios.post('http://localhost:8080/videogames',{
        name: name,
        type: type,
        year: year
   });
};