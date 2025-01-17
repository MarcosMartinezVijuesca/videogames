import axios from 'axios';
import { element, icon, td } from '../util/documentUtil.js';
import { notifySuccess } from '../util/warningUtil.js';



window.addUser = function() {
    const name = element('name').value;
    const password = element('password').value;

    if (name == '') {
        notifyError('El nombre es un campo obligatorio.');
        return;
    }

    axios.post('http://localhost:8080/users',{
        name: name,
        password: password
   });


   notifySuccess('Usuario registrado correctamente.');

   element('name').value = '';
   element('password').value = '';
};