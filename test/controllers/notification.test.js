import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { User, UserRole, Notification } from '../../src/database/models';
import {
  createNotification,
  createRequest
} from '../../src/helpers/notification';

chai.should();
chai.use(chaiHttp);

let notification;
let token;
let user;

describe('NOTIFICATIONS', () => {
  before('Creating User to get token', async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password1', salt);
    const role = await UserRole.create({
      name: 'TRAVEL_ADMIN',
      description: 'travel admin'
    });
    const newUser = {
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'notification@mail.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true,
      roleId: role.id
    };
    user = await User.create(newUser);
    await Notification.destroy({
      truncate: true
    });
  });
  beforeEach('Signing in to get user token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'notification@mail.com', password: 'Password1' })
      .set({ 'Accept-Language': 'en' })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        done();
      });
  });
  it('Should create a notification when all parameters are given', async () => {
    notification = await createNotification(
      user.id,
      1,
      user.firstName,
      1,
      createRequest
    );
    notification.should.be.a('object');
    notification.should.have.property('id');
    notification.should.have.property('title');
    notification.should.have.property('notification');
  });
  it('Should get all notification for a user', (done) => {
    chai
      .request(app)
      .get('/api/notifications')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body[0].id.should.equal(notification.id);
        res.body.forEach((item) => {
          item.should.have.property('id');
          item.should.have.property('notification');
          item.should.have.property('title');
        });
        done();
      });
  });
  it('Should get all unseen notifications', (done) => {
    chai
      .request(app)
      .get('/api/notifications/count')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('number');
        done();
      });
  });
  it('Should get single single notification with the provided id', (done) => {
    chai
      .request(app)
      .get(`/api/notifications/${notification.id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('notification');
        done();
      });
  });
  it('Should delete a notification with the provided id', (done) => {
    chai
      .request(app)
      .delete(`/api/notifications/${notification.id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should return 404 if there is no notification with such id', (done) => {
    chai
      .request(app)
      .get(`/api/notifications/${notification.id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('No notification found');
        done();
      });
  });
  it('Should return 404 there is no notification for that user', (done) => {
    chai
      .request(app)
      .get('/api/notifications')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('No notification found');
        done();
      });
  });
  it('Should mark all notifications as read', (done) => {
    chai
      .request(app)
      .patch('/api/notifications')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
