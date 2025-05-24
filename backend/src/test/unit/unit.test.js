const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/videogames');

const videogameController = require('../../controller/videogames');

const videogameService = require('../../service/videogames');
const mockedFindVideogames = jest.spyOn(videogameService, 'findVideogames');
const mockedRegisterVideogame = jest.spyOn(videogameService, "registerVideogame");
const { mockVideogameArray, mockVideogameToPost, mockVideogameResponse, mockVideogameToRegister } = require('./mocks/videogames');

afterEach(() => {
    jest.clearAllMocks();
});

describe('videogames', () => {
    it('GET /videogames should get a videogame list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/videogames';

        const mockedVideogameList = jest.fn(async () => {
            return mockVideogameArray;
        });
        mockedFindVideogames.mockImplementation(mockedVideogameList);

        await videogameController.getVideogames(request, response);
        expect(mockedFindVideogames).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(10);
    });

    it('POST /videogames should register a new videogame', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/videogames';
        request.body = mockVideogameToRegister;

        const mockedRegisterVideogameResponse = jest.fn(async () => {
            return mockVideogameResponse;
        });
        mockedRegisterVideogame.mockImplementation(mockedRegisterVideogameResponse);

        await videogameController.postVideogame(request, response);
        expect(mockedRegisterVideogame).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(1);
        expect(response._getJSONData().name).toEqual('Elden Ring');
        expect(response._getJSONData().type).toEqual('souls');
        expect(response._getJSONData().year).toEqual(2021);

    });

    it('PUT /videogames/:videogameId should update a videogame', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/videogames/1';
        request.params = { videogameId: 1 };
        request.body = {
            name: 'Updated Game',
            type: 'AUTO',
            year: 2023
        };

        const mockedModifyVideogameResponse = jest.fn(async () => {
            return true;
        });
        jest.spyOn(videogameService, 'modifyVideogame').mockImplementation(mockedModifyVideogameResponse);

        await videogameController.putVideogame(request, response);
        expect(videogameService.modifyVideogame).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
    });

    it('DELETE /videogames/:videogameId should delete a videogame', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/videogames/1';
        request.params = { videogameId: 1 };

        const mockedDeleteVideogameResponse = jest.fn(async () => {
            return true;
        });
        jest.spyOn(videogameService, 'removeVideogame').mockImplementation(mockedDeleteVideogameResponse);

        await videogameController.deleteVideogame(request, response);
        expect(videogameService.removeVideogame).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
    });

});