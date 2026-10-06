import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configuraciones/database';

interface UsuarioAttributes {
  usercod: number;
  useremail: string;
  username: string;
  userpswd: string;
  userfching: Date;
  userpswdest: string;
  userpswdexp: Date | null;
  userest: string;
  useractcod: string | null;
  userpswdchg: string | null;
  usertipo: string;
}

type UsuarioCreationAttributes = Optional<UsuarioAttributes, 'usercod'>;

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  declare usercod: number;
  declare useremail: string;
  declare username: string;
  declare userpswd: string;
  declare userfching: Date;
  declare userpswdest: string;
  declare userpswdexp: Date | null;
  declare userest: string;
  declare useractcod: string | null;
  declare userpswdchg: string | null;
  declare usertipo: string;
}

Usuario.init(
  {
    usercod: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    useremail: { type: DataTypes.STRING(80), allowNull: false },
    username: { type: DataTypes.STRING(80), allowNull: false },
    userpswd: { type: DataTypes.STRING(128), allowNull: false },
    userfching: { type: DataTypes.DATE, allowNull: false },
    userpswdest: { type: DataTypes.CHAR(3), allowNull: false },
    userpswdexp: { type: DataTypes.DATE, allowNull: true },
    userest: { type: DataTypes.CHAR(3), allowNull: false },
    useractcod: { type: DataTypes.STRING(128), allowNull: true },
    userpswdchg: { type: DataTypes.STRING(128), allowNull: true },
    usertipo: { type: DataTypes.CHAR(3), allowNull: false }
  },
  {
    sequelize,
    tableName: 'usuario',
    timestamps: false
  }
);

export default Usuario;
