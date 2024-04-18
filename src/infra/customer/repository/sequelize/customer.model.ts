import { BOOLEAN, TEXT } from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class CustomerModel extends Model {
  @PrimaryKey
  @Column({ type: TEXT })
  declare id: string;

  @Column({ allowNull: false, type: TEXT })
  declare name: string;

  @Column({ defaultValue: false, type: BOOLEAN })
  declare active: boolean;

  @Column({ allowNull: false, type: TEXT })
  declare street: string;

  @Column({ allowNull: false, type: TEXT })
  declare number: string;

  @Column({ allowNull: false, type: TEXT })
  declare zip: string;

  @Column({ allowNull: false, type: TEXT })
  declare city: string;
}
