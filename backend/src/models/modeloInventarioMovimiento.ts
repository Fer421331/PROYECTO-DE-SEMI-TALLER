import { DataTypes, Model } from "sequelize";
import { DB_LACTAXUME } from "../config/db.js";

class InventarioMovimiento extends Model {
  declare movimiento_id: number;
  declare producto_id: number;
  declare usercod: number;
  declare movimiento_tipo: "ENTRADA" | "SALIDA" | "AJUSTE";
  declare movimiento_cantidad: number;
  declare movimiento_stock_anterior: number;
  declare movimiento_stock_nuevo: number;
  declare movimiento_observacion: string | null;
  declare movimiento_fecha: Date;
}

InventarioMovimiento.init(
  {
    movimiento_id: {
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
    movimiento_tipo: {
      type: DataTypes.ENUM("ENTRADA", "SALIDA", "AJUSTE"),
      allowNull: false,
    },
    movimiento_cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movimiento_stock_anterior: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movimiento_stock_nuevo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movimiento_observacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    movimiento_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_LACTAXUME,
    tableName: "inventario_movimientos",
    modelName: "InventarioMovimiento",
    timestamps: false,
  }
);

export default InventarioMovimiento;