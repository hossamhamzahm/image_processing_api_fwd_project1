import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { read_resized_imgs } from '../utils/read_imgs';


const resizeImage = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { filename, width, height } = req.query;


    // handling missing data
    if (!filename) return next(Error('You must include a filename parameter in the query string'));
    if (!width) return next(Error('You must include a width parameter in the query string'));
    if (!height) return next(Error('You must include a height parameter in the query string'));


    // get all resized images
    const resized_img_list: string[] = await read_resized_imgs();

    const resized_img_name: string = filename + '_' + width + 'x' + height;
    const read_path = path.join(__dirname, '..', '..', 'public', 'images', <string>filename);
    const resized_img_path = path.join(__dirname, '..', '..', 'public', 'resized', resized_img_name);

    // looking for a cached version of the resized image
    let found_img = false;
    for (const img of resized_img_list) {
        if (img == resized_img_name) {
            found_img = true;
            break;
        }
    }

    // create a resized version then caching it
    if (found_img == false) {
        const img_buffer = await sharp(read_path)
            .rotate()
            .resize(parseInt(width as string), parseInt(height as string))
            .jpeg({ mozjpeg: true })
            .toBuffer();

        await fs.writeFileSync(resized_img_path, img_buffer);
    }

    // respond with the image
    res.contentType('image/jpg');
    res.sendFile(resized_img_path);
}


export default resizeImage;