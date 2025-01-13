import axios from 'axios';

window.readVideogames = function() {
    axios.get('http://localhost:8080/videogames')
        .then((response) => {
            const videogameList = response.data;
            const videogameUl = document.getElementById('videogames');

            videogameList.forEach(videogame => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.appendChild(document.createTextNode(videogame.name + ' ' + '|' + ' (' + videogame.year + ') ' + '|' + ' ' + videogame.type));
                videogameUl.appendChild(listItem);
            })
        });
}