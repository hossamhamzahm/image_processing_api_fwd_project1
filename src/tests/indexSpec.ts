import request from 'supertest';
import app from '../app';

describe('Invalid Requests URL', () => {
    describe('Wrong paths', () => {
        it('wrong path1: visit /api\nshould result in 404', (done) => {
            request(app)
                .get('/api')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('wrong path2: visit /api/image\nshould result in 404', (done) => {
            request(app)
                .get('/api/image')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });
    });
});
