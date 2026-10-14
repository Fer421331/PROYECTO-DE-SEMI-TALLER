import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Bitacora extends Model {
  declare bitacoracod: number;
  declare bitcorafch: Date;
  declare bitprograma: string;
  declare bitdescripcion: string;
  declare bitobservacion?: string;
  declare bittipo: string;
  declare bitusuario: number;
}

Bitacora.init(
  {
    bitacoracod: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bitcorafch: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bitprograma: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bitdescripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bitobservacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bittipo: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    bitusuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "bitacora",
    modelName: "Bitacora",
    timestamps: false,
  }
);

export default Bitacora;