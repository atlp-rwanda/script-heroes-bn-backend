import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { encode } from '../src/utils/jwtFunctions';

chai.should();
chai.use(chaiHttp);

describe('Forgot password', () => {
  const email = 'paul@email.com';
  const token = encode({ email });
  it('Should return 201 if user is created successfully', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'paul@email.com',
      phoneNumber: '0787002000',
      password: 'Password123'
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
  it('Should return an error if email is not provided', (done) => {
    chai
      .request(app)
      .post('/api/forgotPassword')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('email is required');
        done();
      });
  });
  it('Should return an error if email does not exist in DB', (done) => {
    const theEmail = 'email@email.com';
    chai
      .request(app)
      .post('/api/forgotPassword')
      .send({ email: theEmail })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have
          .property('err')
          .eq('Email does not exist in our database');
        done();
      });
  });
  it('Should return an 200 if a link is well sent', (done) => {
    const theEmail = 'paul@email.com';
    chai
      .request(app)
      .post('/api/forgotPassword')
      .send({ email: theEmail })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eq(
            'A link to reset your password has been sent to your email address !!!'
          );
        done();
      });
  });
  it('Should return an 404 error if the token is invalid', (done) => {
    chai
      .request(app)
      .post('/api/resetPassword/123')
      .send({ password: 'Password123', confirmPassword: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('Invalid token');
        done();
      });
  });
  it('Should return an error if password is mal formated', (done) => {
    const password = '';
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send(password)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('Password is required');
        done();
      });
  });
  it('Should return an error if password is not provided', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({ confirmPassword: '11111111' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('Password is required');
        done();
      });
  });
  it('Should return an error if password confirm is not provided', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({ password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('Repeat password field is required');
        done();
      });
  });
  it('Should return an error if passwords do not match', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({
        password: 'Password123',
        confirmPassword: 'Password123456'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should return 200 status if password is well reset', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({ password: 'Password123', confirmPassword: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
