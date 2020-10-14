import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.should();
chai.use(chaiHttp);

describe('Catching errors', () => {
  it('Should return 500 if got an errors', (done) => {
    const verifyToken = 'anyInvalidToken';
    chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done();
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });
});
