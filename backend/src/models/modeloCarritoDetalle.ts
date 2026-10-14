import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class CarritoDetalle extends Model {
  declare detalle_id: number;
  declare carrito_id: number;
  declare producto_id: number;
  declare cantidad: number;
  declare precio_unitario: number;
  declare subtotal: number;
}

CarritoDetalle.init(
  {
    detalle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    carrito_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
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
    tableName: "carrito_detalle",
    modelName: "CarritoDetalle",
    timestamps: false,
  }
);

export default CarritoDetalle;