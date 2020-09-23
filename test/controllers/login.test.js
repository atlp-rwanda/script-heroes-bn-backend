import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

describe('LOGIN', () => {
  beforeEach('Creating user to use to test login', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .set({ 'Accept-Language': 'en' })
      .send({
        firstName: 'Firstname',
        lastName: 'Lastname',
        email: 'email@example.com',
        phoneNumber: '0780000000',
        password: 'Password123'
      })
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
  before('Removing all user from db', async () => {
    await User.destroy({
      truncate: true
    });
  });
  it('Should return 404 if no account found', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@email.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should return 200 if login secceed', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'email@example.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return 404 if passwords masmatch', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'email@example.com', password: 'wrongPass123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should return error if email is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: '', password: 'Passowrd123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
