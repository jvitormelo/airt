export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    type: process.env.DATABASE_TYPE as 'postgres',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: {
      name: process.env.AWS_BUCKET_NAME,
      region: process.env.AWS_BUCKET_REGION,
    },
  },
  jwtSecret: process.env.JWT_SECRET,
});

export type EnvVariables = ReturnType<typeof configuration>;
