import chai from 'chai';
import chaiHttp from 'chai-http';
import sgMail from '@sendgrid/mail';
import app from '../../src/index';
import { User, Trip, Accomodation, Type, Request, Location } from '../../src/database/models';
import { encode, decode } from '../../src/utils/jwtFunctions';
import autoMsg from '../../src/helpers/newRequestEmail';

chai.use(chaiHttp);
chai.should();

const user = {
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.com',
  phoneNumber: '789078834',
  password: 'Password2020'
};

let token;
let id;

const verifyToken = encode({ email: 'test@test.com' });

describe('Request Trip With Return Date', () => {
  before(async () => {
    await chai.request(app).post('/api/auth/signup').send(user);
    await chai.request(app).get(`/api/auth/verify/${verifyToken}`);

    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'Password2020' });

    token = response.body.token;

    await chai
      .request(app)
      .put('/api/profile/complete')
      .send({
        gender: 'Male',
        birthdate: '1856-02-09',
        language: 'Kinyarwanda',
        currency: 'US$',
        country: 'Rwanda',
        department: 'IT',
        linemanager: decode(token).id
      })
      .set({ 'x-auth-token': token });
  });
  it('Should request a trip', (done) => {
    const newTrip = {
      origin: 1,
      destination: 2,
      from: '2020-10-05',
      till: '2020-10-15',
      travelReasons: 'School trip',
      accomodationId: 1
    };
    chai
      .request(app)
      .post('/api/trip/return-trip')
      .send(newTrip)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Trip requested success');
        done();
      });
  });
  it('Should get all the requested trips', (done) => {
    chai
      .request(app)
      .get('/api/trip/return-trip')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        id = res.body.trips[0].id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Retrieved success');
        done();
      });
  });

  it('Should update requested trip given id', (done) => {
    const newUser = decode(token);
    const updtTrip = {
      origin: 1,
      destination: 2,
      from: '10/10/2020',
      till: '10/11/2020',
      travelReasons: 'Academic',
      accomodationId: 1
    };
    chai
      .request(app)
      .put(`/api/trip/return-trip/${id}`)
      .set({ 'x-auth-token': token })
      .send(updtTrip)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Success updated');
        done();
      });
  });
  it('Should delete trip given id', (done) => {
    chai
      .request(app)
      .delete(`/api/trip/return-trip/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Successfully deleted trip');
        done();
      });
  });
});
