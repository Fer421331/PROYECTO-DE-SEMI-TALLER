import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Rol extends Model {
  declare rolescod: string;
  declare rolesdsc: string;
  declare rolesest: string;
}

Rol.init(
  {
    rolescod: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    rolesdsc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rolesest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "roles",
    modelName: "Rol",
    timestamps: false,
  }
);

export default Rol;