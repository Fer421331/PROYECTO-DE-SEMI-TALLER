import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class CambioPassword extends Model {
  declare cpcod: number;
  declare usercod: number;
  declare cpcodigo: string;
  declare cppswd: string;
  declare cpfchcrea: Date;
  declare cpfchexp: Date;
  declare cpintentos: number;
  declare cpest: string;
}

CambioPassword.init(
  {
    cpcod: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    usercod: { type: DataTypes.BIGINT, allowNull: false },
    cpcodigo: { type: DataTypes.STRING(128), allowNull: false },
    cppswd: { type: DataTypes.STRING(128), allowNull: false },
    cpfchcrea: { type: DataTypes.DATE, allowNull: false },
    cpfchexp: { type: DataTypes.DATE, allowNull: false },
    cpintentos: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    cpest: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: "PEN" },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "cambio_password",
    modelName: "CambioPassword",
    timestamps: false,
  },
);

export default CambioPassword;
