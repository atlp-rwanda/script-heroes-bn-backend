import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { User } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

let user;
let token;
let locationId;
const unavailableId = -3;

describe('Locations', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);

    user = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'test@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true
    });
  });

  after(async () => {
    await User.destroy({ where: { id: user.id } });
  });

  it('should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@mail.com', password: 'Password123' })
      .end(async (err, res) => {
        if (err) done(err);
        token = await res.body.token;
        done();
      });
  });

  it('should fail to create location, when sent incomplete data', (done) => {
    chai
      .request(app)
      .post('/api/locations')
      .set('x-auth-token', token)
      .send({
        city: 'Kigali'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.error.should.be.a('string');
        done();
      });
  });

  it('should create location', (done) => {
    chai
      .request(app)
      .post('/api/locations')
      .set('x-auth-token', token)
      .send({
        city: 'Kigali',
        country: 'Rwanda'
      })
      .end((err, res) => {
        if (err) done(err);
        locationId = res.body.location.id;
        res.should.have.status(201);
        res.body.message.should.equal('Location added successfully');
        done();
      });
  });

  it('should get locations', (done) => {
    chai
      .request(app)
      .get('/api/locations')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Locations fetched successfully');
        done();
      });
  });

  it('should fail to get location by id, when provided the unavailable id', (done) => {
    chai
      .request(app)
      .get(`/api/locations/${unavailableId}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.error.should.equal('Location not found');
        done();
      });
  });

  it('should get location by id', (done) => {
    chai
      .request(app)
      .get(`/api/locations/${locationId}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Location fetched successfully');
        done();
      });
  });

  it('should update a location', (done) => {
    chai
      .request(app)
      .put(`/api/locations/${locationId}`)
      .set('x-auth-token', token)
      .send({
        city: 'Gisenyi',
        country: 'Rwanda'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.message.should.equal('Location updated successfully');
        done();
      });
  });

  it('should delete a location', (done) => {
    chai
      .request(app)
      .delete(`/api/locations/${locationId}`)
      .set('x-auth-token', token)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.message.should.equal('Location is successfully deleted');
        done();
      });
  });
});
