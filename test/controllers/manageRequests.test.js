import bcrypt from 'bcryptjs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User, Request, UserRole } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);
let manager1;
let manager2;
let _user1;
let _user2;
let tokman1;
let tokman2;
let tokuser1;
let tokuser2;
let reqId1;
let reqId2;

describe('Manage requests', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const role = await UserRole.create({
      name: 'MANAGER',
      description: 'travel manager'
    });
    manager1 = await User.findOne({ where: { email: 'manager1@gmail.com' } });
    await manager1.update({ roleId: role.id });
    manager2 = await User.findOne({ where: { email: 'manager2@gmail.com' } });
    await manager2.update({ roleId: role.id });
    const user1 = {
      firstName: 'First',
      lastName: 'Last',
      email: 'user1@gmail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: manager1.id
    };
    const user2 = {
      firstName: 'First',
      lastName: 'Last',
      email: 'user2@gmail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: manager2.id
    };
    await User.create(user1);
    await User.create(user2);
    _user1 = await User.findOne({ where: { email: 'user1@gmail.com' } });
    _user2 = await User.findOne({ where: { email: 'user2@gmail.com' } });
    const request2 = await Request.create({
      userId: _user1.id,
      status: 'pending',
      type: 3,
      linemanager: manager1.id,
      reason: 'Dancing'
    });
    const request1 = await Request.create({
      userId: _user2.id,
      status: 'pending',
      type: 3,
      linemanager: manager2.id,
      reason: 'Dancing'
    });
    const req1 = await Request.findOne({ where: { userId: _user1.id } });
    reqId1 = req1.id;
    const req2 = await Request.findOne({ where: { userId: _user2.id } });
    reqId2 = req2.id;
  });
  after(async () => {
    await User.destroy({ where: { id: _user1.id } });
    await User.destroy({ where: { id: _user2.id } });
    await User.destroy({ where: { id: manager1.id } });
    await User.destroy({ where: { id: manager2.id } });
    await Request.destroy({ where: { id: reqId1 } });
    await Request.destroy({ where: { id: reqId2 } });
  });
  it('Should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'manager1@gmail.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        tokman1 = res.body.token;
        done();
      });
  });
  it('Should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'manager2@gmail.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        tokman2 = res.body.token;
        done();
      });
  });
  it('Should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'user1@gmail.com', password: 'password123' })
      .end((err, res) => {
        if (err) done(err);
        tokuser1 = res.body.token;
        done();
      });
  });
  it('Should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'user2@gmail.com', password: 'password123' })
      .end((err, res) => {
        if (err) done(err);
        tokuser2 = res.body.token;
        done();
      });
  });

  it('Should approve a request', (done) => {
    chai
      .request(app)
      .put(`/api/request/manager/${reqId1}/approve`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': tokman1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'Request approved successfully'
        );
        res.body.should.have.property('request');
        done();
      });
  });
  it("Should display manager's direct requests", (done) => {
    chai
      .request(app)
      .get('/api/request/manager')
      .set({ 'Accept-Language': 'en', 'x-auth-token': tokman1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'Requests fetched successfully'
        );
        res.body.should.have.property('directRequests');
        done();
      });
  });
  it('Should not display direct requests if not a manager', (done) => {
    chai
      .request(app)
      .get('/api/request/manager')
      .set({ 'Accept-Language': 'en', 'x-auth-token': tokuser1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('msg', 'Unauthorized request');
        done();
      });
  });
  it('Should not  approve or decline direct request of another manager', (done) => {
    chai
      .request(app)
      .put(`/api/request/manager/${reqId2}/approve`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': tokman1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error', 'Unauthorized request');
        done();
      });
  });
});
