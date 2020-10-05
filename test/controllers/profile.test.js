import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User } from '../../src/database/models';
import { encode } from '../../src/utils/jwtFunctions';

chai.should();
chai.use(chaiHttp);
let token;
const wrongToken = encode({ email: 'unexistingemail@email.com' });
describe('/api/profile/complete', () => {
  before(async () => {
    await User.destroy({
      truncate: { cascade: true }
    });
  });
  before('Creating user to use to test', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .set({ 'Accept-Language': 'en' })
      .send({
        firstName: 'Firstname',
        lastName: 'Lastname',
        email: 'email@example.com',
        phoneNumber: '0780000000',
        password: 'Password123'
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
  before(async () => {
    await User.update(
      { isVerified: true },
      { where: { email: 'email@example.com' } }
    );
  });
  before('Logging in  user to use to test ', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'email@example.com', password: 'Password123' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it("should return 40 if a user doesn't have the authorization token", (done) => {
    const profile = {
      gender: 'Male',
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/complete')
      .send(profile)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 400 if completing profile of unexisting user', (done) => {
    const profile = {
      gender: 'Male',
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/complete')
      .send(profile)
      .set({ 'auth-token': wrongToken })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 400 if user profile gender is not filled', (done) => {
    const profile = {
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/complete')
      .send(profile)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return 200 if user profile is displayed successfully', (done) => {
    chai
      .request(app)
      .get('/api/profile')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 400 if displaying user profile with unexisting email', (done) => {
    chai
      .request(app)
      .get('/api/profile')
      .set({ 'x-auth-token': wrongToken })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 400 if displaying user with wrong token', (done) => {
    chai
      .request(app)
      .get('/api/profile')
      .set({ 'x-auth-token': wrongToken })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 201 if a user profile updated successfuly', (done) => {
    const profile = {
      firstName: 'name',
      lastName: 'lastName',
      phoneNumber: '12345678',
      gender: 'Male',
      birthdate: '1978-05-04T00:00:00.000Z',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/update')
      .send(profile)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return 400 if user profile gender is not filled', (done) => {
    const profile = {
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/update')
      .send(profile)
      .set({ 'auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it("should return 400 if updating user who doesn't exist", (done) => {
    const profile = {
      gender: 'Male',
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Burundi',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/update')
      .send(profile)
      .set({
        'x-auth-token': token
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return 201 if user profile is completed', (done) => {
    const profile = {
      gender: 'Male',
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12234
    };
    chai
      .request(app)
      .put('/api/profile/complete')
      .set({ 'x-auth-token': token })
      .send(profile)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  }).timeout(30000);
  it('should return 400 if user profile is already complete', (done) => {
    const profile = {
      gender: 'Male',
      birthdate: '1856-02-09',
      language: 'Kinyarwanda',
      currency: 'US$',
      country: 'Rwanda',
      department: 'IT',
      linemanager: 12
    };
    chai
      .request(app)
      .put('/api/profile/complete')
      .set({ 'x-auth-token': token })
      .send(profile)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
