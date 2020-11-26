import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';

import app from '../../src/index';
import { User } from '../../src/database/models';
import { encode } from '../../src/utils/jwtFunctions';
import bcrypt from 'bcryptjs';

config();

chai.use(chaiHttp);
chai.should();
let token;
let user;

const verifyToken = encode({ email: 'test5@test.com' });

describe('Trips', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      salt
    );
    user = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test5@test.com',
      phoneNumber: '789078834',
      password: hashedPassword,
      isVerified: true
    };
    await User.create(user);
    await chai.request(app).get(`/api/auth/verify/${verifyToken}`);
    const response = await chai.request(app).post('/api/auth/login').send({
      email: process.env.TEST_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD
    });
    token = response.body.token;
    const newTrip = {
      origin: 1,
      destination: 2,
      from: '2020-10-05',
      till: '2020-10-15',
      travelReasons: 'School trip',
      accomodationId: 1
    };
    await chai
      .request(app)
      .post('/api/trip/return-trip')
      .set({ 'x-auth-token': token })
      .send(newTrip);
  });
  it('Should get all the requested trips', (done) => {
    chai
      .request(app)
      .get('/api/trips')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('msg').eql('Retrieved success');
        done();
      });
  });
});
