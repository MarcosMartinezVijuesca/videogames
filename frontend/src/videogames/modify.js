import axios from 'axios';
import { element } from '../util/documentUtil.js';
import { notifySuccess, notifyError } from '../util/warningUtil.js';



window.showVideogames = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    axios.get('http://localhost:8080/videogames/' + id)
        .then((response) => {
            const videogame = response.data;

            // Configurar los placeholders de los campos
            document.getElementById('name').placeholder = videogame.name;
            document.getElementById('type').placeholder = videogame.type;
            document.getElementById('year').placeholder = videogame.year;
        })
        .catch((error) => {
            console.error('Error al obtener los detalles del videojuego:', error);
        });
};


window.saveChanges = function(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    const name = element('name').value
    const type = element('type').value
    const year = element('year').value

if(!name || !type || !year){
    notifyError('Todos los campos son obligatorios');
    return;
}
    
axios.put('http://localhost:8080/videogames/' + id, {
    name: name,
    type: type,
    year: year
})

.then(response => {
    console.log('Respuesta del servidor:', response);  // Verifica la respuesta
if (response.status === 204) {
    notifySuccess('Videojuego modificado satisfactoriamente.');
    }
})

};


