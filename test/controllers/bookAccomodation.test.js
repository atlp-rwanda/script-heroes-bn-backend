/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { encode } from '../../src/utils/jwtFunctions';
import { User, UserRole } from '../../src/database/models';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);
let token;
let id;
let roomId;

describe('Accomodation booking', () => {
  before('Creating User to get token', async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password1', salt);
    const role = await UserRole.create({
      name: 'TRAVEL_ADMIN',
      description: 'travel admin'
    });

    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'mail3@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      roleId: role.id
    };
    await User.create(user);
    const verifyToken = encode({ email: 'mail3@mail.com' });
    await chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .set({ 'Accept-Language': 'en' });
  });
  beforeEach('Signing in to get the token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'mail3@mail.com', password: 'Password1' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        done();
      });
  });

  beforeEach('Should create a booking', (done) => {
    const accomodation = {
      facilityName: 'facility name',
      locationId: 1,
      description: 'This is the description of my accomodation',
      photoUrl: 'https://photourl',
      roomType: 'Classic'
    };
    chai
      .request(app)
      .post('/api/accommodations')
      .send(accomodation)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should book an accomodation', (done) => {
    const bookingInfo = {
      accomodationId: 2,
      roomId: 1,
      checkInDate: 'January 1, 2020',
      checkOutDate: 'February 5, 2020'
    };
    chai
      .request(app)
      .post('/api/accomodations/book')
      .send(bookingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.createdBooking.id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should return 404 if the room to book is not found', (done) => {
    const bookingInfo = {
      accomodationId: 2,
      roomId: 200,
      checkInDate: 'January 1, 2020',
      checkOutDate: 'February 5, 2020'
    };
    chai
      .request(app)
      .post('/api/accomodations/book')
      .send(bookingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should return 400 if request body is invalid', (done) => {
    const bookingInfo = {
      accommodationId: 'hhh',
      roomId: 'hhh'
    };
    chai
      .request(app)
      .post('/api/accomodations/book')
      .send(bookingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should get all bookings', (done) => {
    chai
      .request(app)
      .get('/api/accomodations/book')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should get a booking by id', (done) => {
    chai
      .request(app)
      .get(`/api/accomodations/book/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should edit a booking', (done) => {
    const bookingInfo = {
      accomodationId: 2,
      roomId: 1,
      checkInDate: 'January 1, 2020',
      checkOutDate: 'February 5, 2020'
    };
    chai
      .request(app)
      .patch(`/api/accomodations/book/${id}`)
      .send(bookingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should delete a booking', (done) => {
    chai
      .request(app)
      .delete(`/api/accomodations/book/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should delete all bookings', (done) => {
    chai
      .request(app)
      .delete('/api/accomodations/book')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
