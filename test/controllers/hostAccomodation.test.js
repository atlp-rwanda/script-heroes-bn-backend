import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { encode, decode } from '../../src/utils/jwtFunctions';
import {
  User,
  Trip,
  Accomodation,
  Type,
  Request,
  Location,
  UserRole
} from '../../src/database/models';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let id;
const verifyToken = encode({ email: 'test2@test.com' });

describe('Host Accomodation', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password2020', salt);
    const role = await UserRole.create({
      name: 'HOST',
      description: 'pre screened host or supplier'
    });
    user = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test2@test.com',
      phoneNumber: '789078834',
      password: hashedPassword,
      isVerified: true,
      roleId: role.id
    };
    await User.create(user);
    await chai.request(app).get(`/api/auth/verify/${verifyToken}`);

    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'Password2020' });

    token = response.body.token;
  });

  it('Should create an accommodation when you are a host or supplier', (done) => {
    chai
      .request(app)
      .post('/api/host/accomodations')
      .set({ 'x-auth-token': token })
      .send({
        facilityName: 'Serena Hotel',
        description: 'nice hotel',
        locationId: 1,
        photoUrl: 'https://picsum.photos/200/300',
        roomNumbers: 5,
        price: 100,
        services: 'restaurent and bar',
        amenities: 'pool game'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have
          .property('msg')
          .eql('Successfully created accomodation');
        done();
      });
  });
  it('Should get all accomodations', (done) => {
    chai
      .request(app)
      .get('/api/host/accomodations')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.accomodations[0].id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('retrieved success');
        done();
      });
  });
  it('Should get single accomodation given id', (done) => {
    chai
      .request(app)
      .get(`/api/host/accomodations/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('retrieved success');
        done();
      });
  });
  it('Should update accomodation given id', (done) => {
    chai
      .request(app)
      .put(`/api/host/accomodations/${id}`)
      .set({ 'x-auth-token': token })
      .send({
        facilityName: 'Marriot Hotel',
        description: 'nice hotel',
        locationId: 1,
        photoUrl: 'https://picsum.photos/200/300',
        roomNumbers: 5,
        price: 100,
        services: 'restaurent and bar',
        amenities: 'swimming pool'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have
          .property('msg')
          .eql('Successfully updated accomodation');
        done();
      });
  });
  it('Should delete accomodation given id', (done) => {
    chai
      .request(app)
      .delete(`/api/host/accomodations/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have
          .property('msg')
          .eql('Accommodation deleted successfully');
        done();
      });
  });
});
