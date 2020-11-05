import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { encode } from '../../src/utils/jwtFunctions';
import { User, Request } from '../../src/database/models';

chai.should();
chai.use(chaiHttp);

let token;
let request;
let id;
let newUser;

describe('Comment', () => {
  before('Creating User to get token', async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password1', salt);

    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'example@example.com',
      phoneNumber: '3444444444',
      password: hashedPassword,
      isVerified: true
    };
    newUser = await User.create(user);
    request = await Request.create({
      type: 1,
      userId: newUser.id,
      status: 'Pending'
    });
    await User.create(user);
    const verifyToken = encode({ email: 'mail2@mail.com' });
    await chai
      .request(app)
      .get(`/api/auth/verify/${verifyToken}`)
      .set({ 'Accept-Language': 'en' });
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'example@example.com', password: 'Password1' });
    token = response.body.token;
  });
  it('Should create a Comment', (done) => {
    const comment = {
      comment: 'This is your comment'
    };
    chai
      .request(app)
      .post(`/api/request/${request.id}/comments`)
      .set({ 'x-auth-token': token })
      .send(comment)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        done();
      });
  });
  it('Should return 400 if there is a missing field in comment', (done) => {
    const comment = {
      comment: 'This is your comment'
    };
    chai
      .request(app)
      .post(`/api/request/${request.id}/comments`)
      .send(comment)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        done();
      });
  });
  it('Should get all comments created', (done) => {
    const comments = {
      comment: 'These are your comments'
    };
    chai
      .request(app)
      .get(`/api/request/${newUser.id}/comments`)
      .send(comments)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.comments[0].id;
        res.should.have.status(201);
        done();
      });
  });
  it('Should get a single comment with a given id', (done) => {
    const comment = {
      comment: 'This is one of your comments'
    };
    chai
      .request(app)
      .get(`/api/request/${newUser.id}/comments/${id}`)
      .send(comment)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should update the comment with the given id', (done) => {
    const comment = {
      comment: 'This is the updated comment'
    };
    chai
      .request(app)
      .put(`/api/request/${newUser.id}/comments/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .send(comment)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  it('Should delete a comment on the travel request', (done) => {
    const comment = {
      comment: 'You have deleted a comment'
    };
    chai
      .request(app)
      .delete(`/api/request/${newUser.id}/comments/${id}`)
      .set({ 'Accept-Language': 'en', 'x-auth-token': token })
      .send(comment)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
