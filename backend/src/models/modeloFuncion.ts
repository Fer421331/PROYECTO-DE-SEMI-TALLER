import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Funcion extends Model {
  declare fncod: string;
  declare fndsc: string;
  declare fnest: string;
  declare fntyp: string;
}

Funcion.init(
  {
    fncod: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    fndsc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fnest: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    fntyp: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "funciones",
    modelName: "Funcion",
    timestamps: false,
  }
);

export default Funcion;