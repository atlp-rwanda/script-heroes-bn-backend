import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { encode } from '../../src/utils/jwtFunctions';
import { User, UserRole } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

let token;
let id;
let roomId;

describe('Accomodation', () => {
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
      email: 'mail2@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      roleId: role.id
    };
    await User.create(user);
    const verifyToken = encode({ email: 'mail2@mail.com' });
    await chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .set({ 'Accept-Language': 'en' });
  });
  beforeEach('Signing in to get the token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'mail2@mail.com', password: 'Password1' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        done();
      });
  });
  it('Should create an accomodation', (done) => {
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
        id = res.body.accomodation.accomodation.id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('accomodation');
        done();
      });
  });
  it('Should return 400 if there is a missing fields on accomodation', (done) => {

    chai
      .request(app)
      .post('/api/accommodations')
      .send({ photoUrl: 'https://photourl', roomType: 'Type' })
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('Should create a room within an accommodation', (done) => {
    chai
      .request(app)
      .post(`/api/accommodations/${id}/rooms`)
      .send({ roomType: 'Classic' })
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('room');
        done();
      });
  });
  it('Should get all accomodations created thus far', (done) => {
    chai
      .request(app)
      .get('/api/accommodations')
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done();
        res.should.have.status(200);
        res.body.forEach((accomodation) => {
          accomodation.should.have.property('id');
          accomodation.should.have.property('rooms');
        });
        done();
      });
  });
  it('Should get a single accomodation with the given id', (done) => {
    chai
      .request(app)
      .get(`/api/accommodations/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('facilityName');
        res.body.should.have.property('rooms');
        done();
      });
  });
  it('Should update the accommodation with the given id', (done) => {
    chai
      .request(app)
      .put(`/api/accommodations/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .send({
        facilityName: 'Updated facility name',
        location: 'Updated location',
        description: 'The updated description'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Accomodation successfully updated');
        done();
      });
  });
  it('Should get all rooms in the accomodations', (done) => {
    chai
      .request(app)
      .get(`/api/accommodations/${id}/rooms`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        roomId = res.body[0].id;
        res.body.forEach((room) => {
          room.should.be.a('object');
          room.should.have.property('accomodationId');
          room.accomodationId.should.equal(id);
        });
        done();
      });
  });
  it('Should delete a room within an accomodation', (done) => {
    chai
      .request(app)
      .delete(`/api/accommodations/${id}/rooms`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .send({ id: roomId })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Room Deleted successfully');
        done();
      });
  });
  it('Should delete an accommodation with the given id', (done) => {
    chai
      .request(app)
      .delete(`/api/accommodations/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Accomodation deleted successfully');
        done();
      });
  });
});
