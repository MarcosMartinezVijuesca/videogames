import axios from 'axios';
import {notifyError, notifySuccess} from'../util/warningUtil.js';
import { element } from '../util/documentUtil.js';


window.addVideogame = function() {
   const name = element('name').value;
   const type = element('type').value;
   const year = element('year').value;

   //validación de datos
    if (name == '') {
        notifyError('El nombre es un campo obligatorio.');
        return;
    }
    
    if(!year || isNaN(year)){
        notifyError('Introduzca una fecha válida.');
        return;
    }


   axios.post('http://localhost:8080/videogames',{
        name: name,
        type: type,
        year: year
   });

   //confirmar al usuario que todo ha ido bien
   notifySuccess('Videogame registrado correctamente.');
        

   //vaciar el formulario
   element('name').value = '';
   element('type').value = '';
   element('year').value = '';


};

