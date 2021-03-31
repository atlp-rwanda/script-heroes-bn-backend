import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { User } from '../../src/database/models';
import app from '../../src/index';

chai.should();
chai.use(chaiHttp);

let user;
let token;

describe('Requests', () => {
  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);

    user = await User.create({
      firstName: 'First',
      lastName: 'Last',
      email: 'test1@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      linemanager: 1
    });
  });

  after(async () => {
    await User.destroy({ where: { id: user.id } });
  });

  it('should login first', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'john@email.com', password: 'Password123' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        done();
      });
  });

  it('should send message', (done) => {
    chai
      .request(app)
      .post('/api/chat')
      .set({ 'x-auth-token': token })
      .send({ message: 'cool' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.message.should.equal('message sent successfully');
        res.body.data.sender.should.be.an('object');
        done();
      });
  });

  it('should get all previous messages', (done) => {
    chai
      .request(app)
      .get('/api/chat')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
