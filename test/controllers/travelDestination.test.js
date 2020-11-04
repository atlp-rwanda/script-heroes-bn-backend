import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { encode, decode } from '../../src/utils/jwtFunctions';
import bcrypt from 'bcryptjs';
import {
  User,
  Trip,
  Accomodation,
  Type,
  Request,
  Location,
  UserRole,
  sequelize
} from '../../src/database/models';

chai.use(chaiHttp);
chai.should();

let user;
let token;
let request;

const verifyToken = encode({ email: 'test3@test.com' });

describe('Most Traveled Destination', () => {
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
      email: 'test3@test.com',
      phoneNumber: '789078834',
      password: hashedPassword,
      isVerified: true,
      roleId: role.id
    };
    const newUser = await User.create(user);
    await chai.request(app).get(`/api/auth/verify/${verifyToken}`);

    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test3@test.com', password: 'Password2020' });

    token = response.body.token;
    request = await Request.create({
      type: 1,
      userId: newUser.id,
      status: 'pending'
    });
    await Trip.create({
      origin: 1,
      destination: 1,
      from: '29-10-2020',
      till: '01-11-2020',
      requestId: request.id,
      accomodationId: 1,
      travelReasons: 'trip'
    });
  });
  it('Should get most traveled destination', (done) => {
    chai
      .request(app)
      .get('/api/most-traveled/destinations')
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
});
