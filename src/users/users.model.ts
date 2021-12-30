import { UserRoles } from './../roles/user-roles.model';
import { Role } from './../roles/roles.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @ApiProperty({ example: '0000', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({ example: 'true', description: 'If user is banned or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;
  @ApiProperty({ example: 'Cheating', description: 'Reason of the ban' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
