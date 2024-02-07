/* import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { InternalServerErrorException } from '@nestjs/common';

export const downloadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Network response was not ok');
  }

  const folderPath = path.resolve('./', './generated/images');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}.png`;

  const buffer = Buffer.from(await response.arrayBuffer());

  // fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);
  const completePath = path.join(folderPath, imageNamePng);

  await sharp(buffer).png().ensureAlpha().toFile(completePath);

  return path.join(folderPath, imageNamePng);
};
 */

import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { InternalServerErrorException } from '@nestjs/common';
import Jimp from 'jimp';

export const downloadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Network response was not ok');
  }

  const folderPath = path.resolve('./', './generated/images');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}.png`;

  const buffer = Buffer.from(await response.arrayBuffer());

  const completePath = path.join(folderPath, imageNamePng);

  const image = await Jimp.read(buffer);
  await image.writeAsync(completePath);

  return completePath;
};
