import request from 'supertest';
import app from '../../app';
import { read_resized_imgs } from '../../utils/read_imgs';
import sharp  from 'sharp';
import path from 'path';


describe('Invalid Query string parameters', () => {
    describe('Wrong query string', () => {
        it('should respond with 400 -> missing filename query', (done) => {
            request(app)
                .get('/api/images')
                .expect(400)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('should respond with 400 -> missing height & width', (done) => {
            request(app)
                .get('/api/images?filename=icelandwaterfall.jpg')
                .expect(400)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('should respond with 400 -> wrong filename', (done) => {
            request(app)
                .get('/api/images?filename=wrongFileName.jpg&width=200&height=200')
                .expect(400)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('should result in wrong path error', async() => {
            const read_path = path.join(__dirname, '..', '..', '..', 'public', 'images', 'fjsord.jpg');
                await expectAsync(sharp(read_path)
                .rotate().resize(100, 100)
                .jpeg({ mozjpeg: true }).toBuffer()).toBeRejected()
        })
    });
});



describe('Valid Requests', () => {
    describe('resized version creation', () => {
        const read_path = path.join(__dirname, '..', '..', '..', 'public', 'images', 'fjord.jpg');
        it('should test if resized image created successfully without throwing errors', async() => {
            await expectAsync( sharp(read_path)
            .rotate().resize(100, 100)
            .jpeg({ mozjpeg: true }).toBuffer()).toBeResolved();
        });


        it('should respond with 200 -> image resized and cached successfully', (done) => {
            request(app)
                .get('/api/images?filename=icelandwaterfall.jpg&width=200&height=200')
                .expect(200)
                .expect('Content-Type', 'image/jpg')
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('checks if sharp created an image and cached or not', async() => {
            const resized_img_list: string[] = await read_resized_imgs();
            const resized_img_name: string = 'icelandwaterfall.jpg' + '_' + '200' + 'x' + '200';

            let found_img = false;
            for (const img of resized_img_list) {
                if (img == resized_img_name) {
                    found_img = true;
                    break;
                }
            }

            expect(found_img).toBe(true);
        });
    });
});