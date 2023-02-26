import { config } from 'dotenv';
import { Art } from 'src/core/arts/entities/art.entity';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Like } from 'src/core/likes/entities/like.entity';
import { Tag } from 'src/core/tags/entities/tag.entity';
import { User } from 'src/core/users/entities/user.entity';
import { DataSource } from 'typeorm';

// todo cross-env NODE_ENV=development
config();

export const dataBaseConfig = {
  type: process.env.DATABASE_TYPE as 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Art, Tag, Like, Collection],
  synchronize: process.env.NODE_ENV === 'development',
  migrations: ['dist/database/migrations/*{.js}'],
  migrationsTableName: 'migrations',
  // logging: true,
};

const connection = new DataSource(dataBaseConfig);

export default connection;
