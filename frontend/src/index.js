import axios from 'axios';

window.readVideogames = function() {
    axios.get('http://localhost:8080/videogames')
        .then((response) => {
            const videogameList = response.data;
            const videogameUl = document.getElementById('videogames');

            videogameList.forEach(videogame => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(videogame.title + ' (' + videogame.year + ') ' + videogame.type));
                videogameUl.appendChild(li);
            })
        });
}