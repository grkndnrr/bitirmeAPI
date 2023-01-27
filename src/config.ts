import { config } from 'dotenv';
import { join } from 'path';

let path;

switch (process.env.NODE_ENV) {
  case 'development':
    path = join(__dirname, '../.env.development');
    break;
  case 'production':
    path = join(__dirname, '../.env.production');
    break;
  default:
    path = join(__dirname, '../.env.development');
}
config({ path });
