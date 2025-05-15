const expect = require('chai').expect;
const knex = require('knex');
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'videogames.db'
    },
    useNullAsDefault: true
});


    // Unit tests for videogame data fields
    describe('videogame data fields', () => {
        it('should validate videogame name is a non-empty string', () => {
            const videogame = { name: 'Skyrim' };
            expect(videogame.name).to.be.a('string');
            expect(videogame.name.length).to.be.greaterThan(0);
        });

        it('should validate videogame type is a valid string', () => {
            const videogame = { type: 'Adventure' };
            expect(videogame.type).to.be.a('string');
            expect(['Adventure', 'Action', 'RPG', 'Sports', 'Puzzle']).to.include(videogame.type);
        });

        it('should validate videogame year is a valid number', () => {
            const videogame = { year: 2020 };
            expect(videogame.year).to.be.a('number');
            expect(videogame.year).to.be.within(1970, new Date().getFullYear());
        });
    });

    // Unit tests for videogame data retrieval
    describe('videogame data retrieval', () => {
        it('should retrieve a videogame by name', async () => {
            const name = 'Skyrim';
            const response = await db('videogames').select('*').where({ name }).first();
            expect(response).to.have.property('name', name);
        });  
        afterAll(async () => {
    await db.destroy();
});
    });
    