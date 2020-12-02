import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { encode } from '../src/utils/jwtFunctions';

chai.should();
chai.use(chaiHttp);

describe('Requests', () => {
  let token;
  let requestId;
  let userId;
  const verifyToken = encode({ email: 'jean@email.com' });
  it('Should return 201 if user is created successfully', (done) => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'jean@email.com',
      phoneNumber: '0787002000',
      password: 'Password123'
    };
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should verify email before log in', (done) => {
    chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return 200 if logged in successfully', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'jean@email.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        userId = res.body.id;
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 201 if profil well updated', (done) => {
    chai
      .request(app)
      .put('/api/profile/update')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '0789121324',
        gender: 'Male',
        birthdate: '12/12/1998',
        language: 'English',
        currency: 'USD',
        country: 'USA',
        department: 'IT',
        linemanager: userId
      })
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        done();
      });
  });
  it('Should return status 200 if a trip is created', (done) => {
    chai
      .request(app)
      .post('/api/trip/return-trip')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .send({
        origin: 1,
        destination: 2,
        from: '2020-10-02',
        till: '2020-10-08',
        travelReasons: 'Accademic research',
        accomodationId: 1
      })
      .end((err, res) => {
        if (err) done(err);
        requestId = res.body.requestId;
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 200 if request is found by status', (done) => {
    chai
      .request(app)
      .get('/api/allRequestsByStatus/search?status=pending')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eq('Retrieved success');
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 404 if Status is invalid', (done) => {
    chai
      .request(app)
      .get('/api/allRequestsByStatus/search?status=invalidStatus')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have
          .property('error')
          .eq('Status must be either rejected or pending or approved.');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 200 if request is found by id', (done) => {
    chai
      .request(app)
      .get(`/api/getRequestById/search?id=${requestId}`)
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 200 if request is found by user id', (done) => {
    chai
      .request(app)
      .get(`/api/getRequestByUser/search?id=${userId}`)
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 200 if trip is found by Start date', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByStartDate/search?startDate=2020-10-02')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 404 if Start date is not provided', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByStartDate/search?startDate=')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eq('Start date is required !!!');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 200 if trip is found by End date', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByEndDate/search?endDate=2020-10-08')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 404 if End date is not provided', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByEndDate/search?endDate=')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eq('End date is required !!!');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 404 if trips is found by Origin', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByOrigin/search?origin=Kenya')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eq('Trips not found');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 200 if trip is found by Origin', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByOrigin/search?origin=Rwanda')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 200 if trip is found by Destination', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByDest/search?destination=Kenya')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eq('Retrieved success');
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 200 if trip is found by Origin & Destination', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByOriginDest/search?origin=Rwanda&destination=Kenya')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eq('Retrieved success');
        res.should.have.status(200);
        done();
      });
  });
  it('Should return status 404 if Origin does NOT exist', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByOrigin/search?origin=countryOri')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have
          .property('err')
          .eq('Origin location does NOT exist !!!');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 404 if Destination does NOT exist', (done) => {
    chai
      .request(app)
      .get('/api/allTripsByDest/search?destination=countryDest')
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.be.a('object');
        res.body.should.have
          .property('err')
          .eq('Destination location does NOT exist !!!');
        res.should.have.status(404);
        done();
      });
  });
  it('Should return status 404 if Origin exists and Destination does NOT exist', (done) => {
    chai
      .request(app)
      .get(
        '/api/allTripsByOriginDest/search?origin=Rwanda&destination=countryDest'
      )
      .set({
        'x-auth-token': token,
        'content-Type': 'application/json',
        'Accept-Language': 'en'
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have
          .property('err')
          .eq('Destination does NOT exist !!!');
        done();
      });
  });
});
