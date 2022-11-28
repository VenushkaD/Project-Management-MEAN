import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const resize = async (file, folderName) => {
  await sharp(file.path)
    .resize(400)
    .jpeg({ quality: 100 })
    .toFile(
      path.resolve(
        file.destination + folderName + '/',
        file.filename + file.originalname
      )
    );
  fs.unlinkSync(file.path);
  const imageUrl =
    `http://localhost:${process.env.PORT}/` +
    `uploads/${folderName}/` +
    file.filename +
    file.originalname;
  return imageUrl;
};
