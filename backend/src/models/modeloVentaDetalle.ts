import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class VentaDetalle extends Model {
  declare detalle_venta_id: number;
  declare venta_id: number;
  declare producto_id: number;
  declare producto_nombre: string;
  declare precio_unitario: string;
  declare cantidad: number;
  declare descuento: string;
  declare subtotal: string;
}

VentaDetalle.init(
  {
    detalle_venta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "venta_detalle",
    modelName: "VentaDetalle",
    timestamps: false,
  }
);

export default VentaDetalle;