import { encode, decode } from '../src/utils/jwtFunctions';

let token;

describe('JWT function', () => {
  it('encode should encode the payload', () => {
    const payload = { email: 'example@mail.com', id: 1 };
    token = encode(payload);
    token.should.be.a('string');
  });
  it('decode should decode the token', () => {
    decode(token).should.be.a('object');
    decode(token).should.have.property('email');
  });
});
