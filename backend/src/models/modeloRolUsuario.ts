import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class RolUsuario extends Model {
  declare usercod: number;
  declare rolescod: string;
  declare roleuserest: string;
  declare roleuserfch: Date;
  declare roleuserexp: Date | null;
}

RolUsuario.init(
  {
    usercod: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    rolescod: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    roleuserest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    roleuserfch: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    roleuserexp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "roles_usuarios",
    modelName: "RolUsuario",
    timestamps: false,
  }
);

export default RolUsuario;