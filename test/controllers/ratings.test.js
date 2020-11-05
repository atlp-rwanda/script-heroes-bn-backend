import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { encode } from '../../src/utils/jwtFunctions';
import { User, UserRole, Ratings } from '../../src/database/models';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);
let token;
let ratingId;
let accomodationId;
let roomId;

describe('Accomodation rating', () => {
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

  beforeEach('Should create an accommodation', (done) => {
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
        accomodationId = res.body.accomodation.accomodation.id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  beforeEach('Should create a room within an accommodation', (done) => {
    chai
      .request(app)
      .post(`/api/accommodations/${accomodationId}/rooms`)
      .send({ roomType: 'Classic' })
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        roomId = res.body.room.id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('room');
        done();
      });
  });
  beforeEach('Should book an accommodation', (done) => {
    const bookingInfo = {
      roomId,
      accomodationId,
      checkInDate: 'January 20, 2020',
      checkOutDate: 'Feb 31, 2020'
    };
    chai
      .request(app)
      .post('/api/accomodations/book')
      .send(bookingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  after(async () => {
    await Ratings.destroy({ where: { id: ratingId } });
  });
  it('Should rate an accomodation', (done) => {
    const ratingInfo = {
      accomodationId,
      ratingValue: 5
    };
    chai
      .request(app)
      .post('/api/ratings')
      .send(ratingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        if (res.body.createdRating) {
          ratingId = res.body.createdRating.id;
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should return 404 if an accommodation to rate is not found', (done) => {
    const ratingInfo = {
      accomodationId: 2000,
      ratingValue: 5
    };
    chai
      .request(app)
      .post('/api/ratings')
      .send(ratingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        if (res.body.createdRating) {
          ratingId = res.body.createdRating.id;
        }
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should return 400 if request body is invalid', (done) => {
    const ratingInfo = {
      ratingValue: 'hhh',
    };
    chai
      .request(app)
      .post('/api/ratings')
      .send(ratingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should get all ratings', (done) => {
    chai
      .request(app)
      .get('/api/ratings')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should get a rating by id', (done) => {
    chai
      .request(app)
      .get(`/api/ratings/${ratingId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should get a rating by accommodation', (done) => {
    chai
      .request(app)
      .get(`/api/ratings/accommodation/${accomodationId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should edit a rating', (done) => {
    const ratingInfo = {
      ratingValue: 1,
    };
    chai
      .request(app)
      .patch(`/api/ratings/${ratingId}`)
      .send(ratingInfo)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should delete a rating', (done) => {
    chai
      .request(app)
      .delete(`/api/ratings/${ratingId}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
