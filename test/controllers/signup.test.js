import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../src/index';

chai.should();
chai.use(chaiHttp);

describe('signup', () => {
  it('should return 201 if user is created successfully', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'email3@example.com',
      phoneNumber: '078737',
      password: 'Password'
    };
    chai
      .request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not POST without first name and return status 200', (done) => {
    const user = {
      // firstName: 'First',
      lastName: 'last',
      email: 'email@example.com',
      phoneNumber: '0893839',
      password: 'EnterPassword'
    };
    chai
      .request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('err');
        done();
      });
  });
  it('should not POST when email exists and return 400', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'last',
      email: 'email@example.com',
      phoneNumber: '0893839',
      password: 'EnterPassword'
    };
    chai
      .request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
