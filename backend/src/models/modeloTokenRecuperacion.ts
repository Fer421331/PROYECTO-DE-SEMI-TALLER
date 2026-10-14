import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class TokenRecuperacion extends Model {
  declare token_id: number;
  declare usercod: number;
  declare token_hash: string;
  declare token_expiration: Date;
  declare token_usado: boolean;
  declare token_fecha_creacion: Date;
}

TokenRecuperacion.init(
  {
    token_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token_expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token_usado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    token_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "tokens_recuperacion",
    modelName: "TokenRecuperacion",
    timestamps: false,
  }
);

export default TokenRecuperacion;