import axios from 'axios';
import { element, icon, td } from '../util/documentUtil.js';
import { notifySuccess } from '../util/warningUtil.js';


window.readVideogames = function() {
    axios.get('http://localhost:8080/videogames')
        .then((response) => {
            const videogameList = response.data;
            const videogameTable = element('tableBody');

            videogameList.forEach(videogame => {
                const row =  document.createElement('tr');
                row.id = 'videogame-' + videogame.id;
                row.innerHTML = td(videogame.name) + 
                                td(videogame.type) + 
                                td (videogame.year) + 
                                '<a class="btn btn-info" href="/videogames/modify.html?id='+ videogame.id+'">' +
                                icon('edit') +
                                '</a> ' +  '<a class="btn btn-danger" href="javascript:removeVideogame('+ videogame.id + ')">' + 
                                icon('delete') +
                                '</a>';
                videogameTable.appendChild(row);
            })
        });
};

window.removeVideogame = function(id) {
    if(confirm('¿Seguro que deseas eliminar este videogame?')){
    axios.delete('http://localhost:8080/videogames/' + id)
        .then((response) => {
            if (response.status == 204){
                notifySuccess('Videogame eliminado satisfactoriamente.');
                element('videogame-' + id).remove();
            }
        });
    }
};