import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { InternalServerErrorException } from '@nestjs/common';
import Jimp from 'jimp';

export const downloadImageAsPng = async (url: string, fullPath:boolean = false) => {
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

  return fullPath ? completePath : imageNamePng;
};


export const downloadBase64ImageAsPng = async (base64Image: string ,fullPath:boolean = false) => {

  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}-64.png`;

  const completePath = path.join(folderPath, imageNamePng);

  const image = await Jimp.read(imageBuffer);
  await image.writeAsync(completePath);

  return fullPath ? completePath : imageNamePng;
}
