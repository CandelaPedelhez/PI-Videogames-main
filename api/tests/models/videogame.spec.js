const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });


  describe('description', () => {
    it('should throw an error if description is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid description')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'You will need a keyboard' });
    });
  })
  describe('rating', () => {
    it('should throw an error if rating is not a number', (done) => {
      Videogame.create({ rating: 'Hi' })
        .then(() => done(new Error('It requires a number')))
        .catch(() => done());
    });
    it('should work when its a number', () => {
      Videogame.create({ rating: 4 });
    });
  })
  describe('released', () => {
    it('should throw an error if released is not a text', (done) => {
      Videogame.create({ released: 9 })
        .then(() => done(new Error('It requires a valid released date')))
        .catch(() => done());
    });
    it('should work when its a text', () => {
      Videogame.create({ released: "21/05/1998" });
    });
  })

});
