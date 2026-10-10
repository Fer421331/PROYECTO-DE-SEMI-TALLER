import { DataTypes, Model} from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Usuario extends Model {
  declare usercod: number;
  declare useremail: string;
  declare username: string;
  declare userpswd: string;
  declare userfching: Date;
  declare userpswdest: string;
  declare userpswdexp?: Date;
  declare userest: string;
  declare useractcod?: string;
  declare userpswdchg?: string;
  declare usertipo: string;
}

Usuario.init(
  {
    usercod: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    useremail: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    userpswd: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    userfching: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "Fecha de creación del usuario",
    },
    userpswdest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      comment: "Estado de la contraseña",
    },
    userpswdexp: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Fecha de expiración de la contraseña",
    },
    userest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      comment: "Estado del usuario",
    },
    useractcod: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: "Código de activación",
    },
    userpswdchg: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: "Código de cambio de contraseña",
    },
    usertipo: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      comment: "Tipo de usuario",
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "usuario",
    modelName: "Usuario",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "usercod" }],
      },
      {
        name: "uq_usuario_email",
        unique: true,
        using: "BTREE",
        fields: [{ name: "useremail" }],
      },
    ],
  }
);

export default Usuario;