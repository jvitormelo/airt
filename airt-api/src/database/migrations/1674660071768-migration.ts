import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1674660071768 implements MigrationInterface {
  name = 'migration1674660071768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "id" TYPE integer USING ("id"::integer);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "id" TYPE integer USING ("id"::integer);`,
    );
  }
}
