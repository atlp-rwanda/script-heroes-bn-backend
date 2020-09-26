import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { UserRole } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

describe('user role settings', () => {
  before(async () => {
    await UserRole.destroy({
      truncate: true
    });
  });
});

it('should return 200 if userRole created successfully', (done) => {
  const role = {
    name: 'TEST_MANAGER',
    description: 'This is the description test'
  };
  chai
    .request(app)
    .post('/api/role/register')
    .send(role)
    .set({ 'Accept-Language': 'en' })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
});

it('should not POST without role name and return status 400', (done) => {
  const role = {
    description: 'test description'
  };
  chai
    .request(app)
    .post('/api/role/register')
    .send(role)
    .set({ 'Accept-Language': 'en' })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
});

it('should not POST without role description and return status 400', (done) => {
  const role = {
    name: 'TEST_MANAGER'
  };
  chai
    .request(app)
    .post('/api/role/register')
    .send(role)
    .set({ 'Accept-Language': 'en' })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
});

it('should not POST without user email for assign role and return status 400', (done) => {
  const params = {
    userRole: 'TEST_MANAGER'
  };
  chai
    .request(app)
    .post('/api/role/assign')
    .send(params)
    .set({ 'Accept-Language': 'en' })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
});

it('should not POST without userRole name for assign role and return status 400', (done) => {
  const params = {
    email: 'testing@gmail.com'
  };
  chai
    .request(app)
    .post('/api/role/assign')
    .send(params)
    .set({ 'Accept-Language': 'en' })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
});
