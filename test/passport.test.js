import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { AccessToken } from '../src/database/models';
import { encode } from '../src/utils/jwtFunctions';

chai.use(chaiHttp);

describe('facebook oauth', () => {
  it('Should return available facebook accounts for selection', (done) => {
    chai
      .request(app)
      .get('/users/auth/facebook')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  it('Should return available google accounts for selection', (done) => {
    chai
      .request(app)
      .get('/users/auth/google')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  it('Should get facebook callback path', (done) => {
    chai
      .request(app)
      .get('/users/auth/facebook/callback')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should get google callback path', (done) => {
    chai
      .request(app)
      .get('/users/auth/google/callback')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should Login with Google', (done) => {
    chai
      .request(app)
      .get('/users/auth/google/callback')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should Login with Facebook', (done) => {
    chai
      .request(app)
      .get('/users/auth/facebook/callback')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
