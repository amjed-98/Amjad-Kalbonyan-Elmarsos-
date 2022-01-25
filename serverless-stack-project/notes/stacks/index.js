import StorageStack from './StorageStack';
import AuthStack from './AuthStack';
import ApiStack from './ApiStack';

export default function main(app) {
  const storageStack = new StorageStack(app, 'storage');

  const apiStack = new ApiStack(app, 'api', {
    table: storageStack.table,
  });

  // eslint-disable-next-line no-new
  new AuthStack(app, 'auth', {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
}
