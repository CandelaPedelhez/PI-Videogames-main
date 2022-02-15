/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });


  describe('GET /videogame/:id', () => {
    it('GET response with 200 if it finds a videogame with the id provided', function () {
        agent.get('/videogame/25')
        .expect(function(res) {
          expect(res.status).equal(200);
        })
      })
  })
  
  describe('GET /videogames?name=', () => {
    it('GET response with 200 if it finds a videogame with the name provided', function () {
      agent.get('/videogames?name=grand')
      .expect(function(res) {
        expect(res.status).equal(200);
      })
    })
  })
  
  describe('GET /genres', () => {
    it('GET response with 200 if it finds the genres of the videogames', function () {
      agent.get('/genres')
      .expect(function(res) {
        expect(res.status).equal(200);
      })
    })
  })

});
