import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { User } from '../../src/database/models';
import app from '../../src/index';

chai.should();
chai.use(chaiHttp);
let user1;
let user2;
let token1;
let token2;
let tripId;

describe('Oneway API Routes', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);

    user1 = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'example1@email.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true
    });

    user2 = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'example2@email.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: user1.id
    });
    after(async () => {
      await User.destroy({ where: { id: user1.id } });
      await User.destroy({ where: { id: user2.id } });
    });
  });
  it('Signing in to user1 get the token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'example1@email.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token1 = res.body.token;
        done();
      });
  });
  it('Signing in to get user2 the token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'example2@email.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token2 = res.body.token;
        done();
      });
  });
  it('should not create trip when linemanager is not found', (done) => {
    chai
      .request(app)
      .post('/api/trips/oneway')
      .send({
        origin: 1,
        destination: 2,
        from: '2020-10-02',
        till: '2020-10-04',
        accomodationId: 1,
        travelReasons: 'Many reasons'
      })
      .set({ 'Accept-Language': 'en', 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('Can not find your line manager');
        done();
      });
  });
  it('should create trip when linemanager is found', (done) => {
    chai
      .request(app)
      .post('/api/trips/oneway')
      .send({
        origin: 1,
        destination: 2,
        from: '2020-10-02',
        till: '2020-10-04',
        accomodationId: 1,
        travelReasons: 'Many reasons'
      })
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('trip');
        res.body.message.should.equal('Request successfully sent');
        tripId= res.body.trip.id;
        done();
      });
  });
  it('should retrieve one trip when found', (done) => {
    chai
      .request(app)
      .get(`/api/trips/oneway/${tripId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('Trip');
        res.body.message.should.equal('Trip retrieved succesfully');
        done();
      });
  });
  it('should retrieve all trips when found', (done) => {
    chai
      .request(app)
      .get('/api/trips/oneway')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .end((err, res) => {
        console.log(err);
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('Trips');
        res.body.message.should.equal('Trips retrieved succesfully');
        done();
      });
  });
  it('should return error if trip is not found', (done) => {
    chai
      .request(app)
      .get('/api/trips/oneway/0')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('Trip does not exist');
        done();
      });
  });
  it('should update trip', (done) => {
    chai
      .request(app)
      .patch(`/api/trips/oneway/${tripId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .send({
        origin: 1,
        destination: 2,
        from: '2020-10-02',
        till: '2020-10-04',
        accomodationId: 1,
        travelReasons: 'Updated Trip'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Trip updated succesfully');
        done();
      });
  });
  it('should delete trip', (done) => {
    chai
      .request(app)
      .delete(`/api/trips/oneway/${tripId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('Trip');
        res.body.message.should.equal('Trip deleted succesfully');
        done();
      });
  });
});
