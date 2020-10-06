import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User } from '../../src/database/models';
import { encode } from '../../src/utils/jwtFunctions';

chai.should();
chai.use(chaiHttp);

let token;
const verifyToken = encode({ email: 'mail@mail.com' });
describe('Auth', () => {
  before(async () => {
    await User.destroy({
      truncate: true
    });
  });

  it('should return 201 if user is created successfully', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'mail@mail.com',
      phoneNumber: '3444444444',
      password: 'Password1'
    };
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should not POST without first name and return status 400', (done) => {
    const user = {
      lastName: 'last',
      email: 'email@example.com',
      phoneNumber: '0893839',
      password: 'Password123'
    };
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not POST when email exists and return 409', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'last',
      email: 'mail@mail.com',
      phoneNumber: '4440893839',
      password: 'EnterPassword1'
    };
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
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
  it('Should verify email before loggging in', (done) => {
    chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  it('Should return 200 if login secceed', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'mail@mail.com', password: 'Password1' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Should return 404 if passwords masmatch', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'mail@mail.com', password: 'wrongPass123' })
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

  it('Should fail to logout user when no-token provided', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.message.should.equal('Please Login');
        done();
      });
  });

  it('Should fail to logout user when provided the invalid token', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set('x-auth-token', 'invalid token')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.message.should.equal('Token no longer valid');
        done();
      });
  });

  it('Should logout user', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set('x-auth-token', token)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
