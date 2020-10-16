import chai from 'chai';
import chaiHttp from 'chai-http';
import sgMail from '@sendgrid/mail';
import msgToReset from '../src/helpers/msgToResetPwd';
import app from '../src/index';
import { encode } from '../src/utils/jwtFunctions';
import { User } from '../src/database/models';

chai.should();
chai.use(chaiHttp);

describe('Forgot password', () => {
  const email = 'flongtest@gmail.com';
  const token = encode({ email });
  before(async () => {
    await User.destroy({
      truncate: { cascade: true }
    });
  });
  before('Creating user to use to test', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .set({ 'Accept-Language': 'en' })
      .send({
        firstName: 'Firstname',
        lastName: 'Lastname',
        email: 'flongtest@gmail.com',
        phoneNumber: '0780000000',
        password: 'Password123'
      })
      .end((err) => {
        if (err) {
          done(err);
        }
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
  it('Should return an error if email does NOT exist in DB', (done) => {
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
          .eq('Email does NOT exist in our database !!!');
        done();
      });
  });
  it('Should return an 404 error if the token is invalid', (done) => {
    chai
      .request(app)
      .post('/api/resetPassword/123')
      .send({ password: 'bravo123@andela', confirmPassword: 'bravo123@andela' })
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
      .send({ password: 'bravo123@andela' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err').eq('Confirmation is required');
        done();
      });
  });
  it('Should return an error if passwords do NOT match', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({
        password: 'bravo123@andela',
        confirmPassword: 'bravo123@project'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have
          .property('error')
          .eq('The passwords do NOT match !!!');
        done();
      });
  });
  it('Should return 200 status if password is well reset', (done) => {
    chai
      .request(app)
      .post(`/api/resetPassword/${token}`)
      .send({ password: 'bravo123@andela', confirmPassword: 'bravo123@andela' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eq('Password well reset');
        done();
      });
  });
});
