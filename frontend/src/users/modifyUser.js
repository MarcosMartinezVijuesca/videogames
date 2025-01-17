import axios from 'axios';
import { element } from '../util/documentUtil.js';
import { notifySuccess, notifyError } from '../util/warningUtil.js';



window.showUsers = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    axios.get('http://localhost:8080/users/' + id)
        .then((response) => {
            const user = response.data;

            // Configurar los placeholders de los campos
            document.getElementById('name').placeholder = user.name;
            document.getElementById('password').placeholder = user.password;

        })
        .catch((error) => {
            console.error('Error al obtener los detalles del usuario:', error);
        });
};


window.saveChanges = function(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    const name = element('name').value
    const password = element('password').value
    

if(!name || !password ){
    notifyError('Todos los campos son obligatorios');
    return;
}
    
axios.put('http://localhost:8080/users/' + id, {
    name: name,
    password: password
})

.then(response => {
    console.log('Respuesta del servidor:', response);  // Verifica la respuesta
if (response.status === 204) {
    notifySuccess('Usuario modificado satisfactoriamente.');
    
    }
})



};
