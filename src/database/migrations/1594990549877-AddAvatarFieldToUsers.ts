/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export default class AddAvatarFieldToUsers1594990549877
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
