import { registerAs } from '@nestjs/config';
import { StorageConfiguration } from '@app/common/types/storage/storage.type';

export const storageConfigLoader = registerAs(
  'storage',
  (): StorageConfiguration => ({
    endpoint: process.env.STORAGE_ENDPOINT,
    publicKey: process.env.STORAGE_PUBLIC_KEY,
    privateKey: process.env.STORAGE_PRIVATE_KEY,
    repository: process.env.STORAGE_REPOSITORY,
  }),
);
