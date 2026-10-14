import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class Venta extends Model {
  declare venta_id: number;
  declare usercod: number;
  declare direccion_id: number;
  declare metodo_pago_id: number;
  declare venta_fecha: Date;
  declare venta_subtotal: string;
  declare venta_impuesto: string;
  declare venta_descuento: string;
  declare venta_total: string;
  declare venta_estado: string;
  declare venta_observaciones: string | null;
}

Venta.init(
  {
    venta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercod: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    direccion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metodo_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venta_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    venta_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    venta_impuesto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    venta_descuento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    venta_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    venta_estado: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    venta_observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "ventas",
    modelName: "Venta",
    timestamps: false,
  }
);

export default Venta;