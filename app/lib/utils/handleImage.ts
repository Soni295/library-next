import { join } from 'node:path';
import { writeFileSync } from 'node:fs';

class HandlerImage {
  readonly directory: string;

  constructor(directory: string) {
    this.directory = join('uploads', directory);
  }

  private isImage(file: File) {
    if (file == null) return false;
    if (file.name === 'undefined') return false;
    return file.type.startsWith('image/');
  }

  private createImageFileName(preFileName: string) {
    const ext = preFileName.split('.').at(-1);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}.${ext}`;
  }

  async saveFile(file: File) {
    if (!this.isImage(file)) return '';
    const info = Buffer.from(await file.arrayBuffer());
    const fileName = this.createImageFileName(file.name);
    const pathName = join(process.cwd(), 'public', this.directory, fileName);

    try {
      writeFileSync(pathName, info);
    } catch (err) {
      console.log(err);
      return '';
    }
    return '/' + join(this.directory, fileName);
  }
}

export const handlerImgProduct = new HandlerImage('products');
export const handlerImgMark = new HandlerImage('marks');
