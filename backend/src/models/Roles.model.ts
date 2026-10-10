import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Role extends Model {
  declare rolescod: string;
  declare rolesdsc: string;
  declare rolesest: string;
}

Role.init(
  {
    rolescod: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
    },
    rolesdsc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      comment: "Descripción del rol",
    },
    rolesest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      comment: "Estado del rol",
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "roles",
    modelName: "Role",
    timestamps: false,
    comment: "Tabla de roles del sistema",
  }
);

export default Role;