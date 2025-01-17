import axios from 'axios';
import { element, icon, td } from '../util/documentUtil.js';
import { notifySuccess } from '../util/warningUtil.js';



window.showUsers = function() {
    axios.get('http://localhost:8080/users')
        .then((response) => {
            const userList = response.data;
            const userTable = element('tableBody');

            userList.forEach(user => {
                const row =  document.createElement('tr');
                row.id = 'user-' + user.id;
                row.innerHTML = td(user.name) + 
                                td(user.password) +
                                '<a class="btn btn-info" href="/users/modify-user.html?id='+ user.id +'">' +
                                icon('edit') +
                                '</a> ' +  '<a class="btn btn-danger" href="javascript:removeUser('+ user.id + ')">' + 
                                icon('delete') +
                                '</a>';
                userTable.appendChild(row);
            })
        });
};

window.removeUser = function(id) {
    if(confirm('¿Seguro que deseas eliminar este Usuario?')){
    axios.delete('http://localhost:8080/users/' + id)
        .then((response) => {
            if (response.status == 204){
                notifySuccess('Usuario eliminado satisfactoriamente.');
                element('user-' + id).remove();
                
            }
        });
    }
};