import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Pago extends Model {
  declare pago_id: number;
  declare venta_id: number;
  declare metodo_pago_id: number;
  declare pago_monto: number;
  declare pago_referencia: string | null;
  declare pago_estado: string;
  declare pago_fecha: Date;
}

Pago.init(
  {
    pago_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metodo_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pago_monto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pago_referencia: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    pago_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    pago_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "pagos",
    modelName: "Pago",
    timestamps: false,
  }
);

export default Pago;