import fs from 'fs';
import path from 'path';

const org_imgs_path = path.join(__dirname, '..', '..', 'public', 'images');
const resized_imgs_path = path.join(__dirname, '..', '..', 'public', 'resized');

async function ls(read_path: string): Promise<string[]> {
    const files = await fs.readdirSync(read_path);
    return files;
}

const read_org_imgs = async (): Promise<string[]> => await ls(org_imgs_path);
const read_resized_imgs = async (): Promise<string[]> => await ls(resized_imgs_path);

export { read_resized_imgs, read_org_imgs, resized_imgs_path, org_imgs_path };
