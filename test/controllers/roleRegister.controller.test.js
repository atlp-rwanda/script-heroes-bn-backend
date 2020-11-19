import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { User } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

let user1, user2, token1;

describe('user role settings', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);

    user1 = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'test1@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: -1,
      roleId: 2
    });

    user2 = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'test2@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: user1.id
    });
  });

  after(async () => {
    await User.destroy({ where: { id: user1.id } });
    await User.destroy({ where: { id: user2.id } });
  });

  it('should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test1@mail.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        token1 = res.body.token;
        done();
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
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should fail to create if role exist', (done) => {
    const role = {
      name: 'TEST_MANAGER',
      description: 'This is the description test'
    };
    chai
      .request(app)
      .post('/api/role/register')
      .send(role)
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
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
      .set({ 'x-auth-token': token1 })
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
      .set({ 'x-auth-token': token1 })
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
      .set({ 'x-auth-token': token1 })
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
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should assign role', (done) => {
    const params = {
      email: 'test2@mail.com',
      userRole: 'TEST_MANAGER'
    };
    chai
      .request(app)
      .post('/api/role/assign')
      .send(params)
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg');
        done();
      });
  });

  it('should get a role', (done) => {
    chai
      .request(app)
      .get('/api/role/1')
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should not get a role, with invalid id', (done) => {
    chai
      .request(app)
      .get('/api/role/-1')
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
