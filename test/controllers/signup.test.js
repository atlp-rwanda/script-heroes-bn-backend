import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

describe('signup', () => {
  before(async () => {
    await User.destroy({
      truncate: true
    });
  });
  it('should return 201 if user is created successfully', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'email4@example.com',
      phoneNumber: '078737',
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
      email: 'email4@example.com',
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
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
