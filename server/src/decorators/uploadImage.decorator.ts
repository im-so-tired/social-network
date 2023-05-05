import { UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

export const createFileInterceptor = (
  fieldName: string,
  storagePath: string,
) => {
  return UseInterceptors(
    FileInterceptor(fieldName, {
      storage: diskStorage({
        destination: storagePath,
        filename(
          req,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  );
};
