import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { User } from '../../src/database/models';
import app from '../../src/index';

chai.should();
chai.use(chaiHttp);

let user1;
let user2;
let token;
let token2;
let requestId;

describe('Requests', () => {
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
      linemanager: -1
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
      .send({ email: 'test2@mail.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        done();
      });
  });

  it('should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test1@mail.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        token2 = res.body.token;
        done();
      });
  });

  it('should get request types', (done) => {
    chai
      .request(app)
      .get('/api/request-types')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.message.should.equal('Request types fetched successfully');
        done();
      });
  });

  it('should fail to create a multi-city trip, when no line manager is found', (done) => {
    chai
      .request(app)
      .post('/api/trips/multi-city')
      .send({
        trips: [
          {
            origin: 1,
            destination: 2,
            from: '2020-10-02',
            till: '2020-10-04'
          },
          {
            origin: 2,
            destination: 4,
            from: '2020-10-04',
            till: '2020-10-06'
          },
          {
            origin: 4,
            destination: 3,
            from: '2020-10-06',
            till: '2020-10-08'
          }
        ]
      })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.error.should.equal('Can not find your line manager');
        done();
      });
  });

  it('should create a multi-city trip', (done) => {
    chai
      .request(app)
      .post('/api/trips/multi-city')
      .send({
        trips: [
          {
            origin: 1,
            destination: 2,
            from: '2020-10-02',
            till: '2020-10-04'
          },
          {
            origin: 2,
            destination: 4,
            from: '2020-10-04',
            till: '2020-10-06'
          },
          {
            origin: 4,
            destination: 3,
            from: '2020-10-06',
            till: '2020-10-08'
          }
        ]
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        requestId = res.body.request.id;
        res.should.have.status(201);
        res.body.message.should.equal('Request successfully sent for approval');
        done();
      });
  });

  it('should fail to create a multi-city trip, when sent incomplete or misformatted data', (done) => {
    chai
      .request(app)
      .post('/api/trips/multi-city')
      .send({ trips: [] })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.error.should.be.a('string');
        done();
      });
  });

  it('should get request by id', (done) => {
    chai
      .request(app)
      .get(`/api/requests/${requestId}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Request fetched successfully');
        done();
      });
  });

  it('should get all requests', (done) => {
    chai
      .request(app)
      .get('/api/requests')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Requests fetched successfully');
        done();
      });
  });

  it('should update a request still open', (done) => {
    chai
      .request(app)
      .patch(`/api/requests/open/${requestId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .send({
        origin: 2,
        destination: 1,
        from: '2020-12-12',
        till: '2020-12-12'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should delete a request', (done) => {
    chai
      .request(app)
      .delete(`/api/requests/${requestId}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Request deleted successfully');
        done();
      });
  });
});
