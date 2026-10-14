import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class ReservaStock extends Model {
  declare reserva_id: number;
  declare producto_id: number;
  declare usercod: number;
  declare cantidad_reservada: number;
  declare reserva_estado: string;
  declare reserva_fecha_creacion: Date;
  declare reserva_fecha_expiracion: Date | null;
  declare reserva_fecha_confirmacion: Date | null;
  declare reserva_fecha_liberacion: Date | null;
}

ReservaStock.init(
  {
    reserva_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cantidad_reservada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reserva_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    reserva_fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    reserva_fecha_expiracion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reserva_fecha_confirmacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reserva_fecha_liberacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "reservas_stock",
    modelName: "ReservaStock",
    timestamps: false,
  }
);

export default ReservaStock;