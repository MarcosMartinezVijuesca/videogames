const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();


describe('GET /videogames', () => {
    it('should return all videogames', (done) => { 
        chai.request(app)
            .get('/videogames')
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.be.an('array'); // El cuerpo de la respuesta es un array
                expect(res.body.length).to.be.greaterThan(0); // Hay al menos un videojuego
                done();
            });
    });
});

describe('POST /videogames', () => {
    it('should create a new videogame (success)', (done) =>  {
        chai.request(app)
            .post('/videogames')
            .send({ 
                name: 'GTA VI',
                type: 'Action',
                year: 2013
                })
            .end((err, res) => {
                expect(res).to.have.status(201); // Espera que la respuesta sea 201 (creado)
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('year'); // El objeto devuelto tiene el nombre correcto
                done();
            });
    });

    it('should fail to create a videogame with missing name', (done) => {
        chai.request(app)
            .post('/videogames')
            .send({ 
                name: '', 
                type: 'Action',
                year: 2024 
            }) // Falta el campo nombre
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Name of videogame is obligatory'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

 it('should fail to create a videogame with missing type', (done) => {
        chai.request(app)
            .post('/videogames')
            .send({ 
                name: 'GTA V', 
                type: '',
                year: '2013' 
            }) // Falta el campo tipo
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Type is necessary'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });

 it('should fail to create a videogame with missing year', (done) => {
        chai.request(app)
            .post('/videogames')
            .send({ 
                name: 'GTA V', 
                type: 'Action',
                year: '' 
            }) // Falta el campo year
            .end((err, res) => {
                expect(res).to.have.status(400); // Espera error 400 (petición incorrecta)
                expect(res.body.status).to.equal('bad-request');
                expect(res.body.message).to.equal('Year is necessary'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });



describe('PUT /videogames/:id', () => {
    it('should update a videogame (success)', (done) => {
        chai.request(app)
            .put('/videogames/7') // ID del videojuego a actualizar
            .send({ 
                name: 'Updated Game', 
                type: 'AUTO', 
                year: 2023 
            })
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('year');
                done();
            });
    });

    it('should fail to update a non-existent videogame', (done) => {
        chai.request(app)
            .put('/videogames/9999') // ID que no existe
            .send({ 
                name: 'No Game', 
                type: 'RPG', 
                year: 2023 })
            .end((err, res) => {
                expect(res).to.have.status(404); // Espera error 404 (no encontrado)
                expect(res.body.error).to.equal('Videogame not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});

describe('DELETE /videogames/:id', () => {
    it('should delete a videogame (success)', (done) => {
        chai.request(app)
            .delete('/videogames/1')
            .end((err, res) => {
                expect(res).to.have.status(200); // Espera éxito
                expect(res.body).to.have.property('message'); // El cuerpo debe tener un mensaje de éxito
                done();
            });
    });

    it('should fail to delete a non-existent videogame', (done) => {
        chai.request(app)
            .delete('/videogames/9999') // ID que no existe
            .end((err, res) => {
                expect(res).to.have.status(404); // Espera error 404
                expect(res.body.error).to.equal('Videogame not found'); // El cuerpo debe tener un mensaje de error
                done();
            });
    });
});
