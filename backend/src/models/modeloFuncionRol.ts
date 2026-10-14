import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class FuncionRol extends Model {
  declare rolescod: string;
  declare fncod: string;
  declare fnrolest: string;
  declare fnexp: Date | null;
}

FuncionRol.init(
  {
    rolescod: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    fncod: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    fnrolest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    fnexp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "funciones_roles",
    modelName: "FuncionRol",
    timestamps: false,
  }
);

export default FuncionRol;
