import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../src/index';
import { encode } from '../../src/utils/jwtFunctions';
import { User, UserRole } from '../../src/database/models';


const should = chai.should();
chai.use(chaiHttp);
let token;
let id;
let roomId;

describe('Accomodation booking', () => {
    before('Creating User to get token', async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Password1', salt);
        const role = await UserRole.create({
            name: 'TRAVEL_ADMIN',
            description: 'travel admin'
        });

        const user = {
            firstName: 'First',
            lastName: 'Last',
            email: 'mail3@mail.com',
            phoneNumber: '3444444444',
            password: hashedPassword,
            isVerified: true,
            roleId: role.id
        };
        await User.create(user);
        const verifyToken = encode({ email: 'mail3@mail.com' });
        await chai
            .request(app)
            .get(`/api/auth/verify/${verifyToken}`)
            .set({ 'Accept-Language': 'en' });
    });
    beforeEach('Signing in to get the token', (done) => {
        chai
            .request(app)
            .post('/api/auth/login')
            .send({ email: 'mail3@mail.com', password: 'Password1' })
            .set({ 'Accept-Language': 'en' })
            .end((err, res) => {
                if (err) done(err);
                token = res.body.token;
                done();
            });
    });

    beforeEach('Should create an accomodation', (done) => {
        const accomodation = {
            facilityName: 'facility name',
            locationId: 1,
            description: 'This is the description of my accomodation',
            photoUrl: 'https://photourl',
            roomType: 'Classic'
        };
        chai
            .request(app)
            .post('/api/accommodations')
            .send(accomodation)
            .set({ 'Accept-Language': 'en', 'x-auth-token': token })
            .end((err, res) => {
                if (err) done(err);
                id = res.body.accomodation.accomodation.id;
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });

    it('Should book an accomodation', (done) => {
        const accommodationInfo = {
            accommodationId: 2,
            roomId: 1,
            checkInDate: "January 1, 2020",
            checkOutDate: "February 5, 2020"
        };
        chai
            .request(app)
            .post('/api/accommodations/book')
            .send(accommodationInfo)
            .set({ 'Accept-Language': 'en', 'x-auth-token': token })
            .end((err, res) => {
                if (err) done(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('requester');
                done();
            });
    });
    it('Should return 404 if an accomodation is not found', (done) => {
        const accommodationInfo = {
            accommodationId: 300,
            roomId: 1000,
            checkInDate: "January 1, 2020",
            checkOutDate: "February 5, 2020"
        };
        chai
            .request(app)
            .post('/api/accommodations/book')
            .send(accommodationInfo)
            .set({ 'Accept-Language': 'en', 'x-auth-token': token })
            .end((err, res) => {
                if (err) done(err);
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    })

    it('Should return 400 if request body is invalid', (done) => {
        const accommodationInfo = {
            accommodationId: "hhh",
            roomId: "hhh"
        }
        chai
            .request(app)
            .post('/api/accommodations/book')
            .send(accommodationInfo)
            .set({ 'Accept-Language': 'en', 'x-auth-token': token })
            .end((err, res) => {
                if (err) done(err);
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    })

});
