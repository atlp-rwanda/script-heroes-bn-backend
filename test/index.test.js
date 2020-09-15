import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const should = chai.should();
chai.use(chaiHttp);

describe('landing page', () => {
  it('Should return a welcoming message on / route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should return a 404 if the routes is not found', (done) => {
    chai
      .request(app)
      .get('/notFound')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });
});
